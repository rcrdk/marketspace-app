import {
  storageAuthTokenGet,
  storageAuthTokenSave,
} from '@storage/storageAuthToken'
import { AppError } from '@utils/AppError'
import type { AxiosError } from 'axios'
import axios, { type AxiosInstance } from 'axios'

type SignOut = () => void

type PromisseType = {
  onSuccess: (token: string) => void
  onFailure: (error: AxiosError) => void
}

type ApiInstanceProps = AxiosInstance & {
  registerInterceptTokenManager: (signOut: SignOut) => () => void
}

const API = axios.create({
  baseURL: 'http://192.168.1.6:3333',
}) as ApiInstanceProps

// API.interceptors.response.use(async (response) => {
//   await new Promise((resolve) => setTimeout(resolve, 2000))

//   return response.data
// })

let failedQueue: PromisseType[] = []
let isRefreshing = false

API.registerInterceptTokenManager = (signOut) => {
  const interceptTokenManager = API.interceptors.response.use(
    (response) => response,
    async (requestError) => {
      const isUnauthorizedError = requestError?.response?.status === 401
      const isTokenError =
        requestError.response?.data?.message === 'token.expired' ||
        requestError.response?.data?.message === 'token.invalid'

      if (isUnauthorizedError) {
        if (isTokenError) {
          const { refresh_token } = await storageAuthTokenGet()

          if (!refresh_token) {
            signOut()
            return Promise.reject(requestError)
          }

          const originalRequestConfig = requestError.config

          if (isRefreshing) {
            return new Promise((resolve, reject) => {
              failedQueue.push({
                onSuccess(token) {
                  originalRequestConfig.headers = {
                    Authorization: `Bearer ${token}`,
                  }
                  resolve(API(originalRequestConfig))
                },
                onFailure(error) {
                  reject(error)
                },
              })
            })
          }

          isRefreshing = true

          return new Promise(async (resolve, reject) => {
            try {
              const { data } = await API.post('/sessions/refresh-token', {
                refresh_token,
              })
              await storageAuthTokenSave({
                token: data.token,
                refresh_token: data.refresh_token,
              })

              if (originalRequestConfig.data) {
                originalRequestConfig.data = JSON.parse(
                  originalRequestConfig.data,
                )
              }

              originalRequestConfig.headers = {
                Authorization: `Bearer ${data.token}`,
              }
              API.defaults.headers.common.Authorization = `Bearer ${data.token}`

              failedQueue.forEach((request) => request.onSuccess(data.token))
              resolve(API(originalRequestConfig))
            } catch (error: any) {
              failedQueue.forEach((request) => request.onFailure(error))
              signOut()
              reject(error)
            } finally {
              isRefreshing = false
              failedQueue = []
            }
          })
        }

        signOut()
      }

      if (requestError.response && requestError.response.data) {
        const errorMessage = new AppError(
          requestError.response.data.message,
          requestError.response.status ?? 400,
        )
        return Promise.reject(errorMessage)
      }

      return Promise.reject(requestError)
    },
  )

  return () => API.interceptors.response.eject(interceptTokenManager)
}

export { API }

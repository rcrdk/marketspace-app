import type { UserDTO } from '@dtos/UserDTO'
import { authenticateUser } from '@http/authenticate-user'
import { API } from '@services/api'
import {
  storageAuthTokenGet,
  storageAuthTokenRemove,
  storageAuthTokenSave,
} from '@storage/storageAuthToken'
import {
  storageUserGet,
  storageUserRemove,
  storageUserSave,
} from '@storage/storageUser'
import { createContext, type ReactNode, useEffect, useState } from 'react'

type AuthContextOnSignInProps = {
  email: string
  password: string
}

type AuthContextStorageUserAndTokenProps = {
  user: UserDTO
  token: string
  refresh_token: string
}

export type AuthContextProps = {
  user: UserDTO
  onSignIn: (data: AuthContextOnSignInProps) => Promise<any>
  onSignOut: () => Promise<void>
  onGetUserData: () => Promise<void>
  isLoadingUserStorageData: boolean
}

type AuthContextProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps,
)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO)
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true)

  function userAndTokenUpdate({
    token,
    user,
  }: AuthContextStorageUserAndTokenProps) {
    API.defaults.headers.common['Authorization'] = `Bearer ${token}`

    setUser(user)
  }

  async function storageUserAndTokenSave({
    user,
    token,
    refresh_token,
  }: AuthContextStorageUserAndTokenProps) {
    try {
      setIsLoadingUserStorageData(true)
      await storageUserSave(user)
      await storageAuthTokenSave({ token, refresh_token })
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  async function onSignIn({ email, password }: AuthContextOnSignInProps) {
    try {
      setIsLoadingUserStorageData(true)

      const { user, token, refresh_token } = await authenticateUser({
        email,
        password,
      })

      if (user && token && refresh_token) {
        setIsLoadingUserStorageData(true)
        await storageUserAndTokenSave({ user, token, refresh_token })
        userAndTokenUpdate({ user, token, refresh_token })
      }
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  async function onSignOut() {
    try {
      setIsLoadingUserStorageData(true)
      setUser({} as UserDTO)
      await storageUserRemove()
      await storageAuthTokenRemove()
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  async function onGetUserData() {
    try {
      setIsLoadingUserStorageData(true)

      const loggedUser = await storageUserGet()
      const { token, refresh_token } = await storageAuthTokenGet()

      if (token && loggedUser)
        userAndTokenUpdate({ user: loggedUser, token, refresh_token })
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  useEffect(() => {
    onGetUserData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const subscribe = API.registerInterceptTokenManager(onSignOut)

    return () => subscribe()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        onSignIn,
        onSignOut,
        onGetUserData,
        isLoadingUserStorageData,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

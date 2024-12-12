import { API } from '@services/api'

type GetUserProductsRequest = {
  isActive?: boolean
}

export type GetUserProductsResponse = {
  id: string
  user_id: string
  name: string
  description: string
  is_new: boolean
  price: number
  accept_trade: boolean
  is_active: boolean
  created_at: string
  updated_at: string
  payment_methods: {
    key: string
    name: string
  }[]
  product_images: {
    id: string
    path: string
  }[]
  user?: {
    avatar?: string
  }
}

export async function getUserProducts({ isActive }: GetUserProductsRequest) {
  const response = await API.get<GetUserProductsResponse[]>('users/products', {
    params: {
      is_active: isActive,
    },
  })

  return response
}

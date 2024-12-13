import { API } from '@services/api'

type GetProductRequest = {
  id: string
}

export type GetProductResponse = {
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
  user: {
    avatar: string
    name: string
    tel: string
  }
}

export async function getProduct({ id }: GetProductRequest) {
  const response = await API.get<GetProductResponse>(`products/${id}`)

  return response
}

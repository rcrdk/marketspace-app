import { API } from '@services/api'

type CreateProductRequest = {
  name: string
  description: string
  isNew: boolean
  price: number
  acceptTrade: boolean
  paymentMethods: string[]
}

export type CreateProductResponse = {
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
}

export async function createProduct({
  name,
  description,
  isNew,
  price,
  acceptTrade,
  paymentMethods,
}: CreateProductRequest) {
  const response = await API.post<CreateProductResponse>('products', {
    name,
    description,
    price,
    is_new: isNew,
    accept_trade: acceptTrade,
    payment_methods: paymentMethods,
  })

  return response
}

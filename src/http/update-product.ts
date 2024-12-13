import { API } from '@services/api'

type UpdateProductRequest = {
  id: string
  name: string
  description: string
  isNew: boolean
  price: number
  acceptTrade: boolean
  paymentMethods: string[]
}

export type UpdateProductResponse = void

export async function updateProduct({
  id,
  name,
  description,
  isNew,
  price,
  acceptTrade,
  paymentMethods,
}: UpdateProductRequest) {
  await API.put<UpdateProductResponse>(`products/${id}`, {
    name,
    description,
    price,
    is_new: isNew,
    accept_trade: acceptTrade,
    payment_methods: paymentMethods,
  })
}

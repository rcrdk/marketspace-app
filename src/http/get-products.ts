import type { ProductDTO } from '@dtos/ProductDTO'
import { API } from '@services/api'

type PaymentMethods = 'pix' | 'card' | 'boleto' | 'cash' | 'deposit'

type GetProductsRequest = {
  query?: string
  isNew?: boolean
  acceptTrade?: boolean
  paymentMethods?: PaymentMethods[]
}

type GetProductsResponse = ProductDTO[]

export async function getProducts({
  query,
  isNew,
  acceptTrade,
  paymentMethods,
}: GetProductsRequest) {
  const response = await API.get<GetProductsResponse>('products', {
    params: {
      query,
      is_new: isNew,
      accept_trade: acceptTrade,
      payment_methods: paymentMethods,
    },
  })

  return response
}

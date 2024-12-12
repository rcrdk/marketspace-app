import { API } from '@services/api'

type PaymentMethods = 'pix' | 'card' | 'boleto' | 'cash' | 'deposit'

type GetProductsRequest = {
  query?: string
  isNew?: boolean
  acceptTrade?: boolean
  paymentMethods?: PaymentMethods[]
}

export type GetProductsResponse = {
  id: string
  name: string
  price: number
  accept_trade: boolean
  is_new: boolean
  is_active?: boolean
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
  }
}

export async function getProducts({
  query,
  isNew,
  acceptTrade,
  paymentMethods,
}: GetProductsRequest) {
  const response = await API.get<GetProductsResponse[]>('products', {
    params: {
      query,
      is_new: isNew,
      accept_trade: acceptTrade,
      payment_methods: paymentMethods,
    },
  })

  return response
}

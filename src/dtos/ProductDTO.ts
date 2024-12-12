export type ProductImageDTO = {
  id: string
  path: string
}

export type ProductPaymentMethodDTO = {
  key: 'pix' | 'card' | 'boleto' | 'cash' | 'deposit'
  name: string
}

export type ProductDTO = {
  id: string
  user_id: string
  name: string
  description: string
  price: number
  is_new: boolean
  is_active?: boolean
  accept_trade: boolean
  created_at: string
  updated_at: string
  product_images: ProductImageDTO[]
  payment_methods: ProductPaymentMethodDTO[]
  user?: {
    avatar: string
  }
}

export type ProductDetailsDTO = {
  id: string
  user_id: string
  name: string
  description: string
  is_new: true
  price: number
  accept_trade: boolean
  is_active: boolean
  created_at: number
  updated_at: number
  product_images: ProductImageDTO[]
  payment_methods: ProductPaymentMethodDTO[]
  user: {
    avatar: string
    name: string
    tel: string
  }
}

import type { ProductDetailsDTO } from '@dtos/ProductDTO'
import { API } from '@services/api'

type GetProductRequest = {
  id: string
}

type GetProductResponse = ProductDetailsDTO

export async function getProduct({ id }: GetProductRequest) {
  const response = await API.get<GetProductResponse>(`products/${id}`)

  return response
}

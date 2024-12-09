import type { ProductDTO } from '@dtos/ProductDTO'
import { API } from '@services/api'

type GetUserProductsRequest = {
  isActive?: boolean
}

type GetUserProductsResponse = ProductDTO[]

export async function getUserProducts({ isActive }: GetUserProductsRequest) {
  const response = await API.get<GetUserProductsResponse>('users/products', {
    params: {
      is_active: isActive,
    },
  })

  return response
}

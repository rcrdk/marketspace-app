import { API } from '@services/api'

type UpdateProductStatusRequest = {
  id: string
  isActive: boolean
}

type UpdateProductStatusResponse = void

export async function updateProductStatus({
  id,
  isActive,
}: UpdateProductStatusRequest) {
  await API.patch<UpdateProductStatusResponse>(`products/${id}`, {
    is_active: isActive,
  })
}

import { API } from '@services/api'

type DeleteProductRequest = {
  id: string
}

type DeleteProductResponse = void

export async function deleteProduct({ id }: DeleteProductRequest) {
  await API.delete<DeleteProductResponse>(`products/${id}`)
}

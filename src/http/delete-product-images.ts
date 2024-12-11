import { API } from '@services/api'

type DeleteProductImagesRequest = {
  images: string[]
}

type DeleteProductImagesResponse = void

export async function deleteProductImages({
  images,
}: DeleteProductImagesRequest) {
  await API.delete<DeleteProductImagesResponse>('products/images', {
    data: {
      productImagesIds: images,
    },
  })
}

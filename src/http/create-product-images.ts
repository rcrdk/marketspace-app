import type { ProductImageSelected } from '@contexts/ProductFormContext'
import { API } from '@services/api'

type CreateProductImagesRequest = {
  productId: string
  images: ProductImageSelected[]
}

type CreateProductImagesResponse = void

export async function createProductImages({
  productId,
  images,
}: CreateProductImagesRequest): Promise<CreateProductImagesResponse> {
  const data = new FormData()

  data.append('product_id', productId)
  images.map((image) => data.append('images', image as any))

  await API.post('products/images', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

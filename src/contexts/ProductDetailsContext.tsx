import type { ProductDetailsDTO } from '@dtos/ProductDTO'
import { deleteProduct } from '@http/delete-product'
import { deleteProductImages } from '@http/delete-product-images'
import { getProduct } from '@http/get-product'
import { updateProductStatus } from '@http/update-product-status'
import { useNavigation } from '@react-navigation/native'
import type { AppNavigatorRoutesProps } from '@routes/app.routes'
import { AppError } from '@utils/AppError'
import { wait } from '@utils/wait'
import { createContext, type ReactNode, useMemo, useState } from 'react'
import { Alert } from 'react-native'

export type ProductDetailsContextProps = {
  product: ProductDetailsDTO
  isProductActive: boolean
  isLoadingProduct: boolean
  isLoadingProductStatus: boolean
  isLoadingProductRemoval: boolean
  onFetchProductDetails: (id: string) => void
  onUpdateProductStatus: () => void
  onDeleteProduct: () => void
}

type ProductDetailsContextProviderProps = {
  children: ReactNode
}

export const ProductDetailsContext = createContext<ProductDetailsContextProps>(
  {} as ProductDetailsContextProps,
)

export function ProductDetailsContextProvider({
  children,
}: ProductDetailsContextProviderProps) {
  const [product, setProduct] = useState({} as ProductDetailsDTO)
  const [isProductActive, setIsProductActive] = useState(false)

  const [isLoadingProduct, setIsLoadingProduct] = useState(true)
  const [isLoadingProductStatus, setIsLoadingProductStatus] = useState(false)
  const [isLoadingProductRemoval, setIsLoadingProductRemoval] = useState(false)

  const navigator = useNavigation<AppNavigatorRoutesProps>()

  const imagesAvailableToDelete = useMemo(
    () => product?.product_images?.map((item) => item.id) ?? [],
    [product],
  )

  async function onFetchProductDetails(id: string) {
    setIsLoadingProduct(true)

    try {
      await wait()
      const { data } = await getProduct({ id })

      setProduct(data)
      setIsProductActive(data.is_active)
    } catch (error) {
      let message =
        'Não foi possível carregar os detalhes do produto. Tente novamente mais tarde.'

      if (error instanceof AppError) {
        message = error.message
      }

      Alert.alert('Erro', message)

      navigator.goBack()
    } finally {
      setIsLoadingProduct(false)
    }
  }

  async function onUpdateProductStatus() {
    setIsLoadingProductStatus(true)

    try {
      await wait()
      await updateProductStatus({ id: product.id, isActive: !isProductActive })

      setIsProductActive((prev) => !prev)
    } catch (error) {
      let message =
        'Não foi possível atualizar a disponibilidade do anúncio. Tente novamente mais tarde.'

      if (error instanceof AppError) {
        message = error.message
      }

      Alert.alert('Erro', message)
    } finally {
      setIsLoadingProductStatus(false)
    }
  }

  async function onDeleteProduct() {
    setIsLoadingProductRemoval(true)

    try {
      await wait()

      await deleteProduct({ id: product.id })
      await deleteProductImages({ images: imagesAvailableToDelete })

      navigator.navigate('products')
    } catch (error) {
      let message =
        'Não foi possível atualizar a disponibilidade do anúncio. Tente novamente mais tarde.'

      if (error instanceof AppError) {
        message = error.message
      }

      Alert.alert('Erro', message)
    } finally {
      setIsLoadingProductRemoval(false)
    }
  }

  return (
    <ProductDetailsContext.Provider
      value={{
        product,
        isProductActive,
        isLoadingProduct,
        isLoadingProductStatus,
        isLoadingProductRemoval,
        onFetchProductDetails,
        onUpdateProductStatus,
        onDeleteProduct,
      }}
    >
      {children}
    </ProductDetailsContext.Provider>
  )
}

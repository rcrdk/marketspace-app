import { deleteProduct } from '@http/delete-product'
import { deleteProductImages } from '@http/delete-product-images'
import { getProduct, type GetProductResponse } from '@http/get-product'
import { updateProductStatus } from '@http/update-product-status'
import { useNavigation } from '@react-navigation/native'
import type { AppNavigatorRoutesProps } from '@routes/app.routes'
import type { ProductFormSchema } from '@schemas/productFormSchema'
import { AppError } from '@utils/AppError'
import { wait } from '@utils/wait'
import { createContext, type ReactNode, useMemo, useState } from 'react'
import { Alert } from 'react-native'

import type { ProductImage } from './ProductFormContext'

export type ProductDetailsContextProps = {
  product: GetProductResponse
  isProductActive: boolean
  isLoadingProduct: boolean
  isLoadingProductStatus: boolean
  isLoadingProductRemoval: boolean
  onFetchProductDetails: (id: string) => Promise<void>
  onUpdateProductStatus: () => Promise<void>
  onDeleteProduct: () => Promise<void>
  // eslint-disable-next-line prettier/prettier
  onPreviewProductDetails: (data: ProductFormSchema, images: ProductImage[]) => void
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
  const [product, setProduct] = useState({} as GetProductResponse)
  const [isProductActive, setIsProductActive] = useState(false)

  const [isLoadingProduct, setIsLoadingProduct] = useState(true)
  const [isLoadingProductStatus, setIsLoadingProductStatus] = useState(false)
  const [isLoadingProductRemoval, setIsLoadingProductRemoval] = useState(false)

  const navigator = useNavigation<AppNavigatorRoutesProps>()

  const getPaymentMethods = useMemo(
    () => [
      { key: 'pix', name: 'Pix' },
      { key: 'card', name: 'Cartão de crédito' },
      { key: 'boleto', name: 'Boleto' },
      { key: 'cash', name: 'Dinheiro' },
      { key: 'deposit', name: 'Depósito' },
    ],
    [],
  )

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

      setIsProductActive(data.is_active !== false)
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

  function onPreviewProductDetails(
    data: ProductFormSchema,
    images: ProductImage[],
  ) {
    setIsLoadingProduct(false)

    const productDetails: GetProductResponse = {
      id: '',
      user_id: '',
      name: data.name,
      description: data.description,
      is_new: data.isNew,
      price: data.price,
      accept_trade: data.acceptTrade,
      is_active: true,
      created_at: '',
      updated_at: '',
      payment_methods: getPaymentMethods.filter((item) =>
        data.paymentMethods.includes(item.key),
      ),
      product_images: images.map((item, index) => {
        return {
          id: item.existentImage ? item.id : String(index),
          path: item.existentImage?.path ?? item.selectedImage?.uri ?? '',
        }
      }),
      user: {
        avatar: '',
        name: '',
        tel: '',
      },
    }

    setProduct(productDetails)
    setIsProductActive(true)
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
        onPreviewProductDetails,
      }}
    >
      {children}
    </ProductDetailsContext.Provider>
  )
}

/* eslint-disable prettier/prettier */
import { createProduct } from '@http/create-product'
import { createProductImages } from '@http/create-product-images'
import { deleteProductImages } from '@http/delete-product-images'
import { getProduct } from '@http/get-product'
import { updateProduct } from '@http/update-product'
import type { ProductFormSchema } from '@schemas/productFormSchema'
import { AppError } from '@utils/AppError'
import { wait } from '@utils/wait'
import * as FileSystem from 'expo-file-system'
import * as ImagePicker from 'expo-image-picker'
import mime from 'mime'
import { createContext, type ReactNode, useMemo, useState } from 'react'
import { Alert } from 'react-native'
import uuid from 'react-native-uuid'

export type ProductImageSelected = {
  id: string
  name: string
  uri: string
  type: string
}

export type ProductImageExistent = {
  id: string
  path: string
}

export type ProductImage = {
  id: string
  existentImage: ProductImageExistent | null
  selectedImage: ProductImageSelected | null
}

export type ProductFormContextProps = {
  productPreviewData?: ProductFormSchema
  onSaveProductPreviewData: (data: ProductFormSchema) => void

  productEditData?: ProductFormSchema
  isLoadingProductEditData: boolean
  onGetProductEditData: (id: string) => Promise<void>
  onPublishProduct: () => Promise<void>
  onUpdateProduct: (productId: string, data: ProductFormSchema) => Promise<void>
  
  getProductImages: ProductImage[]
  onSelectProductImage: () => Promise<ProductImageSelected | any>
  onDeleteProductImage: (data: ProductImage) => void
  
  isSubmittingProduct: boolean
  shouldResetForm: number
  onResetProductForm: () => void
}

type ProductFormContextProviderProps = {
  children: ReactNode
}

export const ProductFormContext = createContext<ProductFormContextProps>(
  {} as ProductFormContextProps,
)

export function ProductFormContextProvider({
  children,
}: ProductFormContextProviderProps) {
  const [productPreviewData, setProductPreviewData] = useState<ProductFormSchema>()
  const [productEditData , setProductEditData] = useState<ProductFormSchema>()
  const [isLoadingProductEditData, setIsLoadingProductEditData] = useState(true)

  const [isSubmittingProduct, setIsSubmittingProduct] = useState(false)
  const [shouldResetForm, setShouldResetForm] = useState(0)

  const [currentImagesIdsToDelete, setCurrentImagesIdsToDelete] = useState<string[]>([])
  const [selectedImages, setSelectedImages] = useState<ProductImageSelected[]>([])
  const [currentImages, setCurrentImages] = useState<ProductImageExistent[]>([])

  async function onSelectProductImage(): Promise<ProductImageSelected | any> {
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        quality: 1,
        allowsEditing: true,
      })

      if (photoSelected.canceled) return

      const photoURI = photoSelected.assets[0].uri

      if (!photoURI) return

      const photoInfo = (await FileSystem.getInfoAsync(photoURI)) as {
        size: number
      }

      if (photoInfo.size && photoInfo.size / 1024 / 1024 > 5) {
        return Alert.alert(
          'Imagem grande',
          'A imagem selecionada é muito grande. Escolha outra com até 5MB.',
        )
      }

      const fileExtension = photoURI.split('.').at(-1)
      const fileNameExtractor = photoURI.split('/').at(-1)!
      const fileName = fileNameExtractor
        .split('.')
        .at(0)!
        .replaceAll(' ', '-')
        .normalize('NFC')
        .toLowerCase()

      const fileSelected: ProductImageSelected = {
        id: uuid.v4(),
        name: `${fileName}.${fileExtension}`,
        uri: photoURI,
        type: mime.getType(photoSelected.assets[0].uri) ?? '',
      }

      setSelectedImages((prev) => [...prev, fileSelected])
    } catch {
      const message =
        'Não foi possível adicionar sua imagem. Tente novamente mais tarde.'

      Alert.alert('Erro', message)
    }
  }

  function onDeleteProductImage(imageToDelete: ProductImage) {
    if (imageToDelete.selectedImage) {
      setSelectedImages((prev) =>
        prev.filter((item) => item.id !== imageToDelete.id),
      )
    }

    if (imageToDelete.existentImage) {
      setCurrentImagesIdsToDelete((prev) => [...prev, imageToDelete.id])
    }
  }

  function onSaveProductPreviewData(data: ProductFormSchema) {
    setProductPreviewData(data)
  }

  function onResetProductForm() {
    setProductPreviewData(undefined)
    setProductEditData(undefined)
    setShouldResetForm((prev) => prev + 1)
    setCurrentImages([])
    setSelectedImages([])
    setCurrentImagesIdsToDelete([])
  }

  async function onGetProductEditData(id: string) {
    setIsLoadingProductEditData(true)

    try {
      await wait()

      const { data } = await getProduct({ id })

      setCurrentImages(data.product_images)

      setProductEditData({
        name: data.name,
        description: data.description,
        price: data.price,
        acceptTrade: data.accept_trade,
        isNew: data.is_new,
        paymentMethods: data.payment_methods.map((item) => item.key),
      })

      setIsLoadingProductEditData(false)
    } catch (error) {
      let message =
        'Não foi possível carregar o anúncio para edição. Tente novamente mais tarde.'

      if (error instanceof AppError) {
        message = error.message
      }

      Alert.alert('Erro', message)

      onResetProductForm()
    }
  }

  async function onPublishProduct() {
    setIsSubmittingProduct(true)

    try {
      await wait()

      if (!productPreviewData) {
        throw new AppError('Nenhuma informação do produto foi encontrada.', 400)
      }

      const {
        data: { id: productId },
      } = await createProduct({
        name: productPreviewData.name,
        description: productPreviewData.description,
        acceptTrade: productPreviewData.acceptTrade,
        isNew: productPreviewData.isNew,
        price: productPreviewData.price,
        paymentMethods: productPreviewData.paymentMethods,
      })

      if (selectedImages.length > 0) {
        await createProductImages({ productId, images: selectedImages })
      }

      onResetProductForm()
    } catch (error) {
      let message =
        'Não foi possível cadastrar o anúncio. Tente novamente mais tarde.'

      if (error instanceof AppError) {
        message = error.message
      }

      Alert.alert('Erro', message)
    } finally {
      setIsSubmittingProduct(false)
    }
  }

  async function onUpdateProduct(productId: string, data: ProductFormSchema) {
    setIsSubmittingProduct(true)

    try {
      await wait()

      await updateProduct({
        id: productId,
        name: data.name,
        description: data.description,
        acceptTrade: data.acceptTrade,
        isNew: data.isNew,
        price: data.price,
        paymentMethods: data.paymentMethods,
      })

      if (currentImagesIdsToDelete.length > 0) {
        await deleteProductImages({ images: currentImagesIdsToDelete })
      }

      if (selectedImages.length > 0) {
        await createProductImages({ productId, images: selectedImages })
      }

      onResetProductForm()
    } catch (error) {
      let message =
        'Não foi possível editar o anúncio. Tente novamente mais tarde.'

      if (error instanceof AppError) {
        message = error.message
      }

      Alert.alert('Erro', message)
    } finally {
      setIsSubmittingProduct(false)
    }
  }

  const getProductImages = useMemo(() => {
    const items: ProductImage[] = []

    currentImages.map((image) =>
      items.push({ id: image.id, existentImage: image, selectedImage: null }),
    )
    selectedImages.map((image) =>
      items.push({ id: image.id, existentImage: null, selectedImage: image }),
    )

    return items.filter((item) => !currentImagesIdsToDelete.includes(item.id))
  }, [currentImages, currentImagesIdsToDelete, selectedImages])

  return (
    <ProductFormContext.Provider
      value={{
        productPreviewData,
        onSaveProductPreviewData,

        productEditData,
        isLoadingProductEditData,
        onGetProductEditData,
        onPublishProduct,
        onUpdateProduct,

        getProductImages,
        onSelectProductImage,
        onDeleteProductImage,

        isSubmittingProduct,
        shouldResetForm,
        onResetProductForm,
      }}
    >
      {children}
    </ProductFormContext.Provider>
  )
}

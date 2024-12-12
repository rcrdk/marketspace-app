import type { ProductFormSchema } from '@schemas/productFormSchema'
import * as FileSystem from 'expo-file-system'
import * as ImagePicker from 'expo-image-picker'
import mime from 'mime'
import { createContext, type ReactNode, useMemo, useState } from 'react'
import { Alert } from 'react-native'
import uuid from 'react-native-uuid'

type ProductImageSelected = {
  id: string
  name: string
  uri: string
  type: string
}

type ProductImageExistent = {
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
  getProductImages: ProductImage[]
  onSelectProductImage: () => Promise<ProductImageSelected | any>
  onDeleteProductImage: (data: ProductImage) => void
  onSaveProductPreviewData: (data: ProductFormSchema) => void
  onPublishProduct: () => void
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
  const [productPreviewData, setProductPreviewData] =
    useState<ProductFormSchema>()

  const [currentImagesIdsToDelete, setCurrentImagesIdsToDelete] = useState<
    string[]
  >([])

  const [currentImages, setCurrentImages] = useState<ProductImageExistent[]>([])

  const [selectedImages, setSelectedImages] = useState<ProductImageSelected[]>(
    [],
  )

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

  function onPublishProduct() {
    // handle publish
  }

  // handle update

  function onResetProductForm() {
    setProductPreviewData(undefined)
    setCurrentImages([])
    setSelectedImages([])
    setCurrentImagesIdsToDelete([])
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
        getProductImages,
        onSelectProductImage,
        onDeleteProductImage,
        onSaveProductPreviewData,
        onPublishProduct,
        onResetProductForm,
      }}
    >
      {children}
    </ProductFormContext.Provider>
  )
}

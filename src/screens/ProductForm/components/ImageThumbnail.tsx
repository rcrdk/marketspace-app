import { Box } from '@components/ui/box'
import { Icon } from '@components/ui/icon'
import { Pressable } from '@components/ui/pressable'
import type { ProductImage } from '@contexts/ProductFormContext'
import { useProductForm } from '@hooks/useProductForm'
import { API } from '@services/api'
import { X } from 'phosphor-react-native'
import { useCallback, useMemo } from 'react'
import { Alert, Image } from 'react-native'

type Props = {
  image: ProductImage
}

export default function ImageThumbnail({ image }: Props) {
  const { onDeleteProductImage } = useProductForm()

  const handleRemoveImage = useCallback(() => {
    Alert.alert(
      'Remover a imagem',
      image.existentImage
        ? 'Deseja remover a imagem? A remoção será feita após salvar os dados do anúncio.'
        : 'Deseja remover esta imagem do anúncio?',
      [
        {
          style: 'cancel',
          text: 'Cancelar',
        },
        {
          style: 'destructive',
          text: 'Remover',
          onPress: () => onDeleteProductImage(image),
        },
      ],
    )
  }, [image, onDeleteProductImage])

  const getImageUri = useMemo(() => {
    if (image.existentImage) {
      return `${API.defaults.baseURL}/images/${image.existentImage.path}`
    }

    if (image.selectedImage) {
      return image.selectedImage.uri
    }
  }, [image])

  return (
    <Box className="relative w-28 h-28 rounded-md bg-app-gray-700">
      <Image
        source={{
          uri: getImageUri,
        }}
        className="w-full h-full rounded-md"
      />

      <Pressable
        onPress={handleRemoveImage}
        className="absolute top-0 right-0 w-7 h-7 items-center justify-center"
      >
        <Box className="w-5 h-5 rounded-full bg-app-gray-100/50 items-center justify-center">
          <Icon as={X} className="fill-white stroke-none w-4 h-4" />
        </Box>
      </Pressable>
    </Box>
  )
}

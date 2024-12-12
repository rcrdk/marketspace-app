import { HStack } from '@components/ui/hstack'
import { Text } from '@components/ui/text'
import { VStack } from '@components/ui/vstack'
import { useProductForm } from '@hooks/useProductForm'

import ImageSelector from './ImageSelector'
import ImageThumbnail from './ImageThumbnail'

export function ImageFields() {
  const { onSelectProductImage, getProductImages } = useProductForm()

  const shouldDisplayAddButton = getProductImages.length !== 3

  return (
    <VStack className="gap-2">
      <Text className="text-lg" bold>
        Imagens
      </Text>
      <Text className="text-md text-app-gray-300">
        Escolha até 3 imagens para mostrar o quando o seu produto é incrível!
      </Text>

      <HStack className="gap-3 mt-3">
        {getProductImages.map((item) => (
          <ImageThumbnail image={item} key={item.id} />
        ))}

        {shouldDisplayAddButton && (
          <ImageSelector onPress={onSelectProductImage} />
        )}
      </HStack>
    </VStack>
  )
}

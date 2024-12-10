import type { ProductDTO } from '@dtos/ProductDTO'
import { useNavigation } from '@react-navigation/native'
import type { AppNavigatorRoutesProps } from '@routes/app.routes'
import { API } from '@services/api'
import { themeColors } from '@styles/colors'
import { ImageSquare as ImageIcon } from 'phosphor-react-native'
import { useMemo } from 'react'
import { Image } from 'react-native'

import { Avatar } from './Avatar'
import { Badge } from './Badge'
import { Box } from './ui/box'
import { Pressable } from './ui/pressable'
import { Skeleton, SkeletonText } from './ui/skeleton'
import { Text } from './ui/text'
import { VStack } from './ui/vstack'

type Props = {
  product: ProductDTO
  showSellerAvatar?: boolean
}

export function ProductThumbnail({ product, showSellerAvatar = false }: Props) {
  const navigator = useNavigation<AppNavigatorRoutesProps>()

  function handleShowProductDetails() {
    navigator.navigate('productDetails', { id: product.id })
  }

  const formattedPrice = useMemo(() => {
    return (product.price / 100).toLocaleString()
  }, [product])

  return (
    <Pressable className="mb-6 w-[47%]" onPress={handleShowProductDetails}>
      <Box className="flex items-center justify-center relative aspect-[3/2] rounded-md overflow-hidden bg-app-gray-700">
        {product.product_images[0] ? (
          <Image
            className="w-full h-full"
            source={{
              uri: `${API.defaults.baseURL}/images/${product.product_images[0].path}`,
            }}
          />
        ) : (
          <ImageIcon color={themeColors['gray-500']} size={48} />
        )}

        <Badge
          label={product.is_new ? 'Novo' : 'Usado'}
          variant={product.is_new ? 'branded' : 'primary'}
          className="absolute top-2 right-2"
        />

        {showSellerAvatar && (
          <Avatar
            uri={product.user?.avatar}
            size="tiny"
            variants="light"
            className="absolute top-2 left-2"
          />
        )}

        {product.is_active && (
          <Box className="items-start justify-end absolute bg-app-gray-100/45 top-0 left-0 w-full h-full rounded-md">
            <Text
              className="text-app-gray-700 uppercase text-sm leading-4 pb-2 ps-2"
              bold
            >
              Anúncio desativado
            </Text>
          </Box>
        )}
      </Box>

      <Text
        className={`text-md pt-2 pb-1 ${product.is_active && 'text-app-gray-400'}`}
      >
        {product.name}
      </Text>
      <Text
        className={`text-lg ${product.is_active && 'text-app-gray-400'}`}
        bold
      >
        <Text
          className={`text-sm ${product.is_active && 'text-app-gray-400'}`}
          bold
        >
          R$
        </Text>
        {formattedPrice}
      </Text>
    </Pressable>
  )
}

export function ProductThumbnailSkeleton() {
  return (
    <VStack className="mb-6 flex-1">
      <Skeleton className="aspect-[3/2] w-auto h-auto" />
      <SkeletonText className="w-2/3 h-3 mt-2 mb-1" />
      <SkeletonText className="w-1/2 h-4" />
    </VStack>
  )
}

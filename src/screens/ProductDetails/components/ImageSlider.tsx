import { Box } from '@components/ui/box'
import { Icon } from '@components/ui/icon'
import { Spinner } from '@components/ui/spinner'
import { Text } from '@components/ui/text'
import { useProductDetails } from '@hooks/useProductDetails'
import { API } from '@services/api'
import { themeColors } from '@styles/colors'
import { ImagesSquare } from 'phosphor-react-native'
import { useRef } from 'react'
import { Dimensions, Image } from 'react-native'
import { useSharedValue } from 'react-native-reanimated'
import type { ICarouselInstance } from 'react-native-reanimated-carousel'
import Carousel, { Pagination } from 'react-native-reanimated-carousel'

export function ImageSlider() {
  const progress = useSharedValue<number>(0)
  const { product, isLoadingProduct, isProductActive } = useProductDetails()

  const ref = useRef<ICarouselInstance>(null)

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      count: index - progress.value,
      animated: false,
    })
  }

  const windowWidth = Dimensions.get('window').width

  if (isLoadingProduct) {
    return (
      <Box className="items-center justify-center w-full aspect-[3/2] bg-app-gray-500">
        <Spinner size="large" />
      </Box>
    )
  }

  if (product.product_images.length === 0) {
    return (
      <Box className="items-center justify-center relative aspect-[3/2] bg-app-gray-500">
        <Icon
          as={ImagesSquare}
          className="fill-app-gray-400 stroke-none w-36 h-36"
        />
      </Box>
    )
  }

  return (
    <Box className="relative aspect-[3/2]">
      <Carousel
        ref={ref}
        data={product.product_images}
        renderItem={({ item }) => (
          <Box className="w-full aspect-[3/2]">
            <Image
              source={{
                uri:
                  item.id.length === 1
                    ? item.path
                    : `${API.defaults.baseURL}/images/${item.path}`,
              }}
              className="absolute inset-0 w-100 h-100"
            />
          </Box>
        )}
        width={windowWidth}
        loop={product.product_images.length > 1}
        snapEnabled
        onProgressChange={progress}
        style={{
          aspectRatio: '3/2',
          width: '100%',
          backgroundColor: themeColors['gray-500'],
        }}
      />

      {product.product_images.length > 1 && (
        <Box className="absolute bottom-3 left-6 right-6">
          <Pagination.Basic
            progress={progress}
            data={product.product_images}
            dotStyle={{
              width: 75,
              height: 3,
              backgroundColor: themeColors['gray-700'],
            }}
            activeDotStyle={{
              width: 75,
              overflow: 'hidden',
              backgroundColor: themeColors['blue-light'],
            }}
            containerStyle={{ gap: 8, height: 3 }}
            horizontal
            onPress={onPressPagination}
          />
        </Box>
      )}

      {!isProductActive && (
        <Box className="absolute top-0 left-0 w-full h-full bg-app-gray-100/60 items-center justify-center">
          <Text className="uppercase text-md text-app-gray-700" bold>
            Anúncio desativado
          </Text>
        </Box>
      )}
    </Box>
  )
}

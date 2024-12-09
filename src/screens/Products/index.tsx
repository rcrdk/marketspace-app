import { Header } from '@components/Header'
import {
  ProductThumbnail,
  ProductThumbnailSkeleton,
} from '@components/ProductThumbnail'
import { Select } from '@components/Select'
import { Box } from '@components/ui/box'
import { HStack } from '@components/ui/hstack'
import { SkeletonText } from '@components/ui/skeleton'
import { Text } from '@components/ui/text'
import type { ProductDTO } from '@dtos/ProductDTO'
import { getUserProducts } from '@http/get-user-products'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import type { AppNavigatorRoutesProps } from '@routes/app.routes'
import { themeColors } from '@styles/colors'
import { AppError } from '@utils/AppError'
import { Plus } from 'phosphor-react-native'
import { useCallback, useEffect, useState } from 'react'
import { Alert, FlatList } from 'react-native'

export function Products() {
  const [isLoading, setIsLoading] = useState(true)
  const [filterActive, setFilterActive] = useState('Todos')
  const [products, setProducts] = useState<ProductDTO[]>([])
  const navigator = useNavigation<AppNavigatorRoutesProps>()

  function handleNewProduct() {
    navigator.navigate('newProduct')
  }

  async function fetchUserProducts() {
    function getFilterActiveValue() {
      if (filterActive === 'Ativos') return true
      if (filterActive === 'Inativos') return false
      return undefined
    }

    setIsLoading(true)

    try {
      const { data } = await getUserProducts({
        isActive: getFilterActiveValue(),
      })

      setProducts(data)
    } catch (error) {
      let message =
        'Não foi possível carregar seus anúncios. Tente novamente mais tarde.'

      if (error instanceof AppError) {
        message = error.message
      }

      Alert.alert('Erro', message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchUserProducts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterActive])

  useFocusEffect(
    useCallback(() => {
      fetchUserProducts()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  )

  const skeletons = Array.from({ length: 12 }).map((_, i) => i.toString())

  return (
    <>
      <Header
        title="Meus anúncios"
        rightButton={{
          onPress: handleNewProduct,
          children: <Plus color={themeColors['gray-100']} />,
        }}
      />

      <HStack className="items-center justify-between px-6">
        {isLoading ? (
          <SkeletonText className="h-4 w-24" />
        ) : (
          <Text className="text-app-gray-300">
            {products?.length === 1
              ? '1 anúncio'
              : `${products?.length} anúncios`}
          </Text>
        )}

        <Select
          selectedValue={filterActive}
          onValueChange={setFilterActive}
          options={['Todos', 'Ativos', 'Inativos']}
        />
      </HStack>

      <Box className="flex-1 px-6 pt-6">
        {isLoading ? (
          <FlatList
            data={skeletons}
            keyExtractor={(item) => item}
            renderItem={() => <ProductThumbnailSkeleton />}
            showsVerticalScrollIndicator={false}
            contentContainerClassName="pb-6"
            numColumns={2}
            columnWrapperClassName="gap-6"
            scrollEnabled={false}
          />
        ) : (
          <FlatList
            data={products}
            keyExtractor={(products) => products.id}
            renderItem={({ item }) => <ProductThumbnail product={item} />}
            showsVerticalScrollIndicator={false}
            contentContainerClassName="pb-6"
            numColumns={2}
            columnWrapperClassName="gap-6 justify-between"
          />
        )}
      </Box>
    </>
  )
}

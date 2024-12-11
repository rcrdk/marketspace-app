import { Empty } from '@components/Empty'
import { Header } from '@components/Header'
import {
  ProductThumbnail,
  ProductThumbnailSkeleton,
} from '@components/ProductThumbnail'
import { Box } from '@components/ui/box'
import { Icon } from '@components/ui/icon'
import type { ProductDTO } from '@dtos/ProductDTO'
import { getUserProducts } from '@http/get-user-products'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import type { AppNavigatorRoutesProps } from '@routes/app.routes'
import { AppError } from '@utils/AppError'
import { wait } from '@utils/wait'
import { Plus } from 'phosphor-react-native'
import { useCallback, useState } from 'react'
import { Alert, FlatList } from 'react-native'

import { Filters } from './components/Filters'

export function Products() {
  const [isLoading, setIsLoading] = useState(true)
  const [filterSelected, setFilterSelected] = useState<boolean>()
  const [products, setProducts] = useState<ProductDTO[]>([])

  const navigator = useNavigation<AppNavigatorRoutesProps>()

  function handleNewProduct() {
    navigator.navigate('productCreate')
  }

  function handleChangeFilterSelected(status?: boolean) {
    setFilterSelected(status)
  }

  async function fetchUserProducts() {
    setIsLoading(true)

    try {
      await wait()

      const { data } = await getUserProducts({
        isActive: filterSelected,
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

  useFocusEffect(
    useCallback(() => {
      fetchUserProducts()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterSelected]),
  )

  return (
    <>
      <Header
        title="Meus anúncios"
        rightButton={{
          onPress: handleNewProduct,
          children: <Icon as={Plus} className="fill-app-gray-100 w-7 h-7" />,
        }}
      />

      <Filters
        filterStatus={filterSelected}
        onFilterStatusChange={handleChangeFilterSelected}
        isLoading={isLoading}
        productsCount={products?.length ?? 0}
      />

      <Box className="flex-1 px-6 pt-6">
        {isLoading ? (
          <FlatList
            data={Array.from({ length: 12 }).map((_, i) => i.toString())}
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
            contentContainerStyle={{ flexGrow: 1 }}
            ListEmptyComponent={() => (
              <Empty
                title="Você ainda não tem anúncios"
                text="Comece a anunciar produtos agora mesmo!"
                button={{
                  label: 'Anunciar novo produto',
                  onPress: handleNewProduct,
                }}
              />
            )}
          />
        )}
      </Box>
    </>
  )
}

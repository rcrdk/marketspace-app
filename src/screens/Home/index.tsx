import { Empty } from '@components/Empty'
import {
  ProductThumbnail,
  ProductThumbnailSkeleton,
} from '@components/ProductThumbnail'
import { VStack } from '@components/ui/vstack'
import { zodResolver } from '@hookform/resolvers/zod'
import { getProducts, type GetProductsResponse } from '@http/get-products'
import {
  type ProductsFilterSchema,
  productsFilterSchema,
} from '@schemas/productsFiltersSchema'
import { AppError } from '@utils/AppError'
import { isBooleanOrUndefined } from '@utils/isBooleanOrUndefined'
import { wait } from '@utils/wait'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Alert, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Filters } from './components/Filters'
import { UserHeader } from './components/UserHeader'
import { UserProducts } from './components/UserProducts'

export function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [filtersSelected, setFiltersSelected] = useState(
    {} as ProductsFilterSchema,
  )
  const [products, setProducts] = useState<GetProductsResponse[]>([])

  const methods = useForm<ProductsFilterSchema>({
    resolver: zodResolver(productsFilterSchema),
    defaultValues: {
      query: '',
      acceptTrade: undefined,
      isNew: undefined,
      paymentMethods: [],
    },
  })

  const handleChangeFilters = (data: ProductsFilterSchema) => {
    setFiltersSelected(data)
  }

  async function fetchProducts() {
    setIsLoading(true)

    try {
      await wait()

      const isNewValue = isBooleanOrUndefined(filtersSelected.isNew)

      const { data } = await getProducts({
        query: filtersSelected?.query,
        isNew: isNewValue,
        acceptTrade: filtersSelected?.acceptTrade,
        paymentMethods: filtersSelected?.paymentMethods,
      })

      setProducts(data)
    } catch (error) {
      let message =
        'Não foi possível carregar os anúncios. Tente novamente mais tarde.'

      if (error instanceof AppError) {
        message = error.message
      }

      Alert.alert('Erro', message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtersSelected])

  return (
    <FormProvider {...methods}>
      <SafeAreaView className="flex-1" edges={['top', 'left', 'right']}>
        <VStack className="py-6 px-6 gap-8">
          <UserHeader />
          <UserProducts />
        </VStack>

        {isLoading ? (
          <FlatList
            data={Array.from({ length: 12 }).map((_, i) => i.toString())}
            keyExtractor={(item) => item}
            renderItem={() => <ProductThumbnailSkeleton />}
            showsVerticalScrollIndicator={false}
            className="flex-grow"
            numColumns={2}
            contentContainerClassName="px-6"
            columnWrapperClassName="justify-between"
            ListHeaderComponent={() => (
              <Filters onChangeFilters={handleChangeFilters} />
            )}
            scrollEnabled={false}
          />
        ) : (
          <FlatList
            data={products}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ProductThumbnail product={item} showSellerAvatar />
            )}
            showsVerticalScrollIndicator={false}
            className="flex-grow"
            numColumns={2}
            contentContainerClassName="px-6"
            columnWrapperClassName="justify-between"
            ListHeaderComponent={() => (
              <Filters onChangeFilters={handleChangeFilters} />
            )}
            ListEmptyComponent={() => (
              <Empty
                title="Nenhum produto encontrado"
                text="Altere os filtros de busca para encontrar outros produtos anunciados."
              />
            )}
            contentContainerStyle={{ flexGrow: 1 }}
          />
        )}
      </SafeAreaView>
    </FormProvider>
  )
}

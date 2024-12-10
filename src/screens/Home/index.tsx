import { ProductThumbnail } from '@components/ProductThumbnail'
import { VStack } from '@components/ui/vstack'
import type { ProductDTO } from '@dtos/ProductDTO'
import { zodResolver } from '@hookform/resolvers/zod'
import { getProducts } from '@http/get-products'
import {
  type ProductsFilterSchema,
  productsFilterSchema,
} from '@schemas/productsFiltersSchema'
import { AppError } from '@utils/AppError'
import { wait } from '@utils/wait'
import { useCallback, useEffect, useState } from 'react'
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
  const [products, setProducts] = useState<ProductDTO[]>([])

  const methods = useForm<ProductsFilterSchema>({
    resolver: zodResolver(productsFilterSchema),
    defaultValues: {
      query: undefined,
      acceptTrade: undefined,
      isNew: undefined,
      paymentMethods: undefined,
    },
  })

  const handleChangeFilters = useCallback((data: ProductsFilterSchema) => {
    setFiltersSelected(data)
  }, [])

  async function fetchProducts() {
    // create a loading
    // create skeletons
    // create empty component por lists

    setIsLoading(true)

    try {
      await wait()

      const { data } = await getProducts({
        query: filtersSelected?.query ?? undefined,
        isNew: filtersSelected?.isNew ?? undefined,
        acceptTrade: filtersSelected?.acceptTrade ?? undefined,
        paymentMethods: filtersSelected.paymentMethods ?? [],
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

        <FlatList
          data={products}
          ListHeaderComponent={() => (
            <Filters onChangeFilters={handleChangeFilters} />
          )}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ProductThumbnail product={item} showSellerAvatar />
          )}
          showsVerticalScrollIndicator={false}
          className="flex-grow"
          numColumns={2}
          contentContainerClassName="px-6"
          columnWrapperClassName="justify-between"
        />
      </SafeAreaView>
    </FormProvider>
  )
}

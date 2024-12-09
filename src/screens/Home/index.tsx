import { ProductThumbnail } from '@components/ProductThumbnail'
import { VStack } from '@components/ui/vstack'
import type { ProductDTO } from '@dtos/ProductDTO'
import { getProducts } from '@http/get-products'
import { useFocusEffect } from '@react-navigation/native'
import { useCallback, useState } from 'react'
import { FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Filters } from './components/Filters'
import { UserHeader } from './components/UserHeader'
import { UserProducts } from './components/UserProducts'

export function Home() {
  const [products, setProducts] = useState<ProductDTO[]>([])

  async function fetchProducts() {
    // create a loading
    // make actionsheet with filters
    // add zod and react hook form
    // create skeletons
    // create empty component por lists
    // fix errors
    try {
      const { data } = await getProducts({
        acceptTrade: undefined,
        isNew: undefined,
        query: undefined,
        paymentMethods: ['pix'],
      })

      setProducts(data)
    } catch (error) {
      console.error(error)
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchProducts()
    }, []),
  )

  return (
    <SafeAreaView className="flex-1" edges={['top', 'left', 'right']}>
      <FlatList
        data={products}
        ListHeaderComponent={() => (
          <>
            <VStack className="py-6 gap-8">
              <UserHeader />
              <UserProducts />
              <Filters />
            </VStack>
          </>
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
  )
}

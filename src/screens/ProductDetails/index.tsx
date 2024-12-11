import { Header } from '@components/Header'
import { Icon } from '@components/ui/icon'
import { ProductDetailsContextProvider } from '@contexts/ProductDetailsContext'
import { useAuth } from '@hooks/useAuth'
import { useProductDetails } from '@hooks/useProductDetails'
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native'
import type { AppNavigatorRoutesProps } from '@routes/app.routes'
import { ArrowLeft, PencilLine } from 'phosphor-react-native'
import { useCallback } from 'react'
import { ScrollView } from 'react-native'

import { BottomActions } from './components/BottomActions'
import { ImageSlider } from './components/ImageSlider'
import { Info } from './components/Info'

type RouteParams = {
  id: string
}

function ProductDetailsComponent() {
  const navigator = useNavigation<AppNavigatorRoutesProps>()

  const { params } = useRoute()
  const { id } = params as RouteParams

  const { user } = useAuth()
  const { product, onFetchProductDetails, isLoadingProduct } =
    useProductDetails()

  const authUserOwnsProduct = user.id === product.user_id
  const shouldDisplayEditButton =
    (authUserOwnsProduct && !isLoadingProduct) || !isLoadingProduct

  function handleGoBack() {
    if (authUserOwnsProduct) {
      return navigator.navigate('products')
    }

    return navigator.navigate('home')
  }

  function handleEditProduct() {
    navigator.navigate('productEdit', { id })
  }

  useFocusEffect(
    useCallback(() => {
      onFetchProductDetails(id)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]),
  )

  return (
    <>
      <Header
        title="Detalhes do anúncio"
        leftButton={{
          onPress: handleGoBack,
          children: (
            <Icon as={ArrowLeft} className="fill-app-gray-100 w-7 h-7" />
          ),
        }}
        rightButton={{
          onPress: handleEditProduct,
          children: (
            <Icon as={PencilLine} className="fill-app-gray-100 w-7 h-7" />
          ),
          style: !shouldDisplayEditButton ? { display: 'none' } : undefined,
        }}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        scrollEnabled={!isLoadingProduct}
      >
        <ImageSlider />
        <Info />
      </ScrollView>

      <BottomActions isEditMode={authUserOwnsProduct} />
    </>
  )
}

export function ProductDetails() {
  return (
    <ProductDetailsContextProvider>
      <ProductDetailsComponent />
    </ProductDetailsContextProvider>
  )
}

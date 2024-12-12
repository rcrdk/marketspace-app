import { ProductDetailsContextProvider } from '@contexts/ProductDetailsContext'
import { useAuth } from '@hooks/useAuth'
import { useProductDetails } from '@hooks/useProductDetails'
import { useFocusEffect, useRoute } from '@react-navigation/native'
import { useCallback, useMemo } from 'react'
import { ScrollView } from 'react-native'

import { BottomActions } from './components/BottomActions'
import { Header } from './components/Header'
import { ImageSlider } from './components/ImageSlider'
import { Info } from './components/Info'

type RouteParams = {
  id?: string
  preview: boolean
}

function ProductDetailsComponent() {
  const { params } = useRoute()
  const { id, preview } = params as RouteParams

  const { user } = useAuth()
  const { product, onFetchProductDetails, isLoadingProduct } =
    useProductDetails()

  const authUserOwnsProduct = useMemo(
    () => user.id === product?.user_id,
    [product, user],
  )

  useFocusEffect(
    useCallback(() => {
      if (id && !preview) {
        onFetchProductDetails(id)
      }

      if (!id && preview) {
        // ON 'useProductDetails' CREATE A FUNTION TO GENERATE A 'product' OBJECT
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, preview]),
  )

  return (
    <>
      <Header isEditMode={authUserOwnsProduct} isPreviewMode={preview} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        scrollEnabled={!isLoadingProduct}
      >
        <ImageSlider />
        <Info />
      </ScrollView>

      <BottomActions isEditMode={authUserOwnsProduct} isPreviewMode={preview} />
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

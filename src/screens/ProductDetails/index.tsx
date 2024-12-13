import { Box } from '@components/ui/box'
import { ProductDetailsContextProvider } from '@contexts/ProductDetailsContext'
import { useAuth } from '@hooks/useAuth'
import { useProductDetails } from '@hooks/useProductDetails'
import { useProductForm } from '@hooks/useProductForm'
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
  // eslint-disable-next-line prettier/prettier
  const { product, onFetchProductDetails, onPreviewProductDetails, isLoadingProduct } = useProductDetails()
  const { productPreviewData, getProductImages } = useProductForm()

  const authUserOwnsProduct = useMemo(
    () => user.id === product?.user_id,
    [product, user],
  )

  useFocusEffect(
    useCallback(() => {
      if (id && !preview) {
        onFetchProductDetails(id)
      }

      if (!id && preview && productPreviewData && getProductImages) {
        onPreviewProductDetails(productPreviewData, getProductImages)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, preview, productPreviewData, getProductImages]),
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

      <Box>
        <BottomActions
          isEditMode={authUserOwnsProduct}
          isPreviewMode={preview}
        />
      </Box>
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

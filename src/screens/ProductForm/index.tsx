import { Header } from '@components/Header'
import { Icon } from '@components/ui/icon'
import { zodResolver } from '@hookform/resolvers/zod'
import { useProductForm } from '@hooks/useProductForm'
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native'
import type { AppNavigatorRoutesProps } from '@routes/app.routes'
import {
  type ProductFormSchema,
  productFormSchema,
} from '@schemas/productFormSchema'
import { ArrowLeft } from 'phosphor-react-native'
import { useCallback, useEffect, useMemo, useRef } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { ActivityIndicator, Alert, ScrollView } from 'react-native'

import { BottomActions } from './components/BottomActions'
import { ImageFields } from './components/ImageFields'
import { InfoFields } from './components/InfoFields'
import { SaleFields } from './components/SaleFields'

type RouteParams = {
  id?: string
}

export function ProductForm() {
  const ref = useRef<ScrollView>(null)

  const navigator = useNavigation<AppNavigatorRoutesProps>()
  const isFocused = useIsFocused()

  const {
    onSaveProductPreviewData,
    onResetProductForm,
    onUpdateProduct,
    getProductImages,
    shouldResetForm,
    isSubmittingProduct,
    onGetProductEditData,
    isLoadingProductEditData,
    productEditData,
  } = useProductForm()

  const { params } = useRoute()
  const { id } = params as RouteParams

  const defaultValues = useMemo(() => {
    if (id && productEditData) {
      return {
        name: productEditData.name,
        description: productEditData.description,
        isNew: productEditData.isNew,
        acceptTrade: productEditData.acceptTrade,
        price: productEditData.price / 100,
        paymentMethods: productEditData.paymentMethods,
      }
    }

    return {
      name: '',
      description: '',
      isNew: true,
      acceptTrade: false,
      price: undefined,
      paymentMethods: [],
    }
  }, [id, productEditData])

  const methods = useForm<ProductFormSchema>({
    resolver: zodResolver(productFormSchema),
    defaultValues,
  })

  const {
    handleSubmit,
    formState: { isDirty },
    reset,
  } = methods

  function handleSaveProductPreview(data: ProductFormSchema) {
    if (getProductImages.length === 0) {
      ref.current?.scrollTo({ y: 0, x: 0, animated: true })

      return Alert.alert(
        'Produto sem imagens',
        'Para poder anunciar, o produto precisa ter ao menos uma imagem.',
      )
    }

    onSaveProductPreviewData(data)

    navigator.navigate('productDetails', { id: undefined, preview: true })
  }

  async function handleUpdateProductData(data: ProductFormSchema) {
    try {
      await onUpdateProduct(id!, data)

      return navigator.navigate('productDetails', {
        id,
        preview: false,
      })
    } catch {}
  }

  const handleCancel = useCallback(() => {
    if (isDirty) {
      return Alert.alert(
        'Descartar alterações',
        'Ao cancelar ou voltar você pode perder as informações inseridas.',
        [
          {
            style: 'cancel',
            text: 'Cancelar',
          },
          {
            style: 'default',
            text: 'Descartar alterações',
            onPress: () => {
              reset()
              onResetProductForm()

              if (id) {
                return navigator.navigate('productDetails', {
                  id,
                  preview: false,
                })
              }

              navigator.goBack()
            },
          },
        ],
      )
    }

    reset()
    onResetProductForm()

    if (id) {
      return navigator.navigate('productDetails', { id, preview: false })
    }

    navigator.goBack()
  }, [id, isDirty, navigator, onResetProductForm, reset])

  useEffect(() => {
    reset(defaultValues)
  }, [defaultValues, reset])

  useEffect(() => {
    reset()
  }, [shouldResetForm, reset])

  useFocusEffect(
    useCallback(() => {
      if (id) {
        onGetProductEditData(id)
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]),
  )

  useEffect(() => {
    if (isFocused) ref.current?.scrollTo({ y: 0, x: 0, animated: true })
  }, [isFocused])

  return (
    <FormProvider {...methods}>
      <Header
        title={id ? 'Editar anúncio' : 'Criar anúncio'}
        leftButton={{
          onPress: handleCancel,
          children: (
            <Icon as={ArrowLeft} className="fill-app-gray-100 w-7 h-7" />
          ),
        }}
      />

      <ScrollView
        contentContainerClassName="flex-grow px-6 pb-12 gap-8 justify-center"
        showsVerticalScrollIndicator={false}
        automaticallyAdjustKeyboardInsets
        ref={ref}
      >
        {isLoadingProductEditData ? (
          <ActivityIndicator size="large" />
        ) : (
          <>
            <ImageFields />
            <InfoFields />
            <SaleFields />
          </>
        )}
      </ScrollView>

      <BottomActions
        onCancel={handleCancel}
        actionButton={{
          label: id ? 'Salvar anúncio' : 'Avançar',
          onPress: id
            ? handleSubmit(handleUpdateProductData)
            : handleSubmit(handleSaveProductPreview),
          loading: isSubmittingProduct,
          disabled: isSubmittingProduct || isLoadingProductEditData,
        }}
      />
    </FormProvider>
  )
}

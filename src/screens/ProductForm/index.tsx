import { Header } from '@components/Header'
import { Icon } from '@components/ui/icon'
import { zodResolver } from '@hookform/resolvers/zod'
import { useProductForm } from '@hooks/useProductForm'
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native'
import type { AppNavigatorRoutesProps } from '@routes/app.routes'
import {
  type ProductFormSchema,
  productFormSchema,
} from '@schemas/productFormSchema'
import { ArrowLeft } from 'phosphor-react-native'
import { useCallback, useEffect, useMemo, useRef } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Alert, ScrollView } from 'react-native'

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
  } = useProductForm()

  const { params } = useRoute()
  const { id } = params as RouteParams

  const defaultValues = useMemo(() => {
    // originalProductData === true
    // if (id) {
    //   return {
    //     name: '',
    //     description: '',
    //     isNew: true,
    //     acceptTrade: false,
    //     price: undefined,
    //     paymentMethods: [],
    //   }
    // }

    return {
      name: '',
      description: '',
      isNew: true,
      acceptTrade: false,
      price: undefined,
      paymentMethods: [],
    }
  }, [])

  const methods = useForm<ProductFormSchema>({
    resolver: zodResolver(productFormSchema),
    defaultValues,
  })

  const {
    handleSubmit,
    formState: { isSubmitting, isDirty },
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

  // useEffect(() => {
  //   reset(originalProductData)
  // }, [originalProductData])

  useEffect(() => {
    reset()
  }, [shouldResetForm, reset])

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
        contentContainerClassName="px-6 pb-12 gap-8"
        showsVerticalScrollIndicator={false}
        automaticallyAdjustKeyboardInsets
        ref={ref}
      >
        <ImageFields />
        <InfoFields />
        <SaleFields />
      </ScrollView>

      <BottomActions
        onCancel={handleCancel}
        actionButton={{
          label: id ? 'Salvar anúncio' : 'Avançar',
          onPress: id
            ? handleSubmit(handleUpdateProductData)
            : handleSubmit(handleSaveProductPreview),
          loading: isSubmitting,
          disabled: isSubmitting,
        }}
      />
    </FormProvider>
  )
}

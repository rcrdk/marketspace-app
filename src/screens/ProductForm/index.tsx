import { Header } from '@components/Header'
import { Icon } from '@components/ui/icon'
import { zodResolver } from '@hookform/resolvers/zod'
import { useProductForm } from '@hooks/useProductForm'
import { useNavigation, useRoute } from '@react-navigation/native'
import type { AppNavigatorRoutesProps } from '@routes/app.routes'
import {
  type ProductFormSchema,
  productFormSchema,
} from '@schemas/productFormSchema'
import { ArrowLeft } from 'phosphor-react-native'
import { useCallback } from 'react'
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
  const navigator = useNavigation<AppNavigatorRoutesProps>()

  const { onSaveProductPreviewData, onResetProductForm } = useProductForm()

  const { params } = useRoute()
  const { id } = params as RouteParams

  const methods = useForm<ProductFormSchema>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: '',
      description: '',
      isNew: true,
      acceptTrade: false,
      price: undefined,
      paymentMethods: [],
    },
  })

  const {
    handleSubmit,
    formState: { isSubmitting, isDirty },
    reset,
  } = methods

  async function handleSaveProductPreview(data: ProductFormSchema) {
    onSaveProductPreviewData(data)

    navigator.navigate('productDetails', { id: undefined, preview: true })
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
              // scroll create view to top

              reset()
              onResetProductForm()

              if (id) {
                return navigator.navigate('productDetails', {
                  id,
                  preview: false,
                })
              } else {
                navigator.goBack()
              }
            },
          },
        ],
      )
    }

    reset()
    onResetProductForm()

    if (id) {
      navigator.navigate('productDetails', { id, preview: false })
    } else {
      navigator.goBack()
    }
    navigator.goBack()
  }, [id, isDirty, navigator, onResetProductForm, reset])

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
      >
        <ImageFields />
        <InfoFields />
        <SaleFields />
      </ScrollView>

      <BottomActions
        onCancel={handleCancel}
        actionButton={{
          label: id ? 'Salvar anúncio' : 'Avançar',
          onPress: handleSubmit(handleSaveProductPreview),
          loading: isSubmitting,
          disabled: isSubmitting,
        }}
      />
    </FormProvider>
  )
}

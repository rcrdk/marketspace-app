import { Button } from '@components/Button'
import { HStack } from '@components/ui/hstack'
import { Skeleton } from '@components/ui/skeleton'
import { Text } from '@components/ui/text'
import { VStack } from '@components/ui/vstack'
import { useProductDetails } from '@hooks/useProductDetails'
import { themeColors } from '@styles/colors'
import { navigateToWhatsAppConversation } from '@utils/navigateToWhatsAppConversation'
import { Power, Trash, WhatsappLogo } from 'phosphor-react-native'
import { useCallback, useMemo } from 'react'
import { Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

type Props = {
  isEditMode: boolean
}

export function BottomActions({ isEditMode }: Props) {
  const {
    product,
    isProductActive,
    isLoadingProduct,
    isLoadingProductStatus,
    isLoadingProductRemoval,
    onDeleteProduct,
    onUpdateProductStatus,
  } = useProductDetails()

  const handleSendMessageOnWhatsApp = useCallback(() => {
    navigateToWhatsAppConversation(
      product.user.tel,
      `Olá, tenho interesse em comprar "${product.name} no Marketspace."`,
    )
  }, [product])

  const handleProductStatus = useCallback(() => {
    Alert.alert(
      'Visibilidade do anúncio',
      `Deseja ${isProductActive ? 'dasabilitar' : 'habilitar'} a visibilidade deste anúncio?`,
      [
        {
          style: 'cancel',
          text: 'Cancelar',
        },
        {
          style: 'default',
          text: isProductActive ? 'Desativar anúncio' : 'Ativar anúncio',
          onPress: onUpdateProductStatus,
        },
      ],
    )
  }, [isProductActive, onUpdateProductStatus])

  const handleDeleteProduct = useCallback(() => {
    Alert.alert(
      'Excluir anúncio',
      'Deseja mesmo remover o anúncio deste produto?',
      [
        {
          style: 'cancel',
          text: 'Cancelar',
        },
        {
          style: 'destructive',
          text: 'Excluir anúncio',
          onPress: onDeleteProduct,
        },
      ],
    )
  }, [onDeleteProduct])

  const getProductPriceFormatted = useMemo(() => {
    const productPrice = product?.price ?? 0
    return (productPrice / 100).toLocaleString('pt-BR')
  }, [product])

  if (isLoadingProduct) {
    return (
      <SafeAreaView
        className="bg-app-gray-700 px-6 pt-6 ios:pb-0 android:pb-6"
        edges={['bottom', 'left', 'right']}
      >
        <HStack className="item-center justify-between">
          <Skeleton className="w-32 h-12" />
          <Skeleton className="w-44 h-12" />
        </HStack>
      </SafeAreaView>
    )
  }

  if (isEditMode) {
    return (
      <SafeAreaView
        className="bg-app-gray-700 px-6 pt-6 ios:pb-0 android:pb-6"
        edges={['bottom', 'left', 'right']}
      >
        <VStack className="gap-2">
          <Button
            label={isProductActive ? 'Desativar anúncio' : 'Reativar anúncio'}
            variants={isProductActive ? 'primary' : 'branded'}
            iconBefore={
              <Power color={themeColors['gray-700']} weight="bold" size={16} />
            }
            onPress={handleProductStatus}
            loading={isLoadingProductStatus}
            disabled={isLoadingProductStatus}
          />

          <Button
            label="Excluir anúncio"
            iconBefore={
              <Trash color={themeColors['gray-100']} weight="bold" size={16} />
            }
            variants="secondary"
            onPress={handleDeleteProduct}
            loading={isLoadingProductRemoval}
            disabled={isLoadingProductRemoval}
          />
        </VStack>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView
      className="bg-app-gray-700 px-6 pt-6 ios:pb-0 android:pb-6"
      edges={['bottom', 'left', 'right']}
    >
      <HStack className="item-center justify-between">
        <HStack className="items-baseline gap-1 pt-1">
          <Text className="text-app-blue text-xl" bold>
            R$
          </Text>
          <Text className="text-app-blue text-3xl" bold>
            {getProductPriceFormatted}
          </Text>
        </HStack>

        <Button
          label="Entrar em contato"
          iconBefore={
            <WhatsappLogo
              color={themeColors['gray-700']}
              weight="fill"
              size={25}
            />
          }
          className="px-4"
          onPress={handleSendMessageOnWhatsApp}
        />
      </HStack>
    </SafeAreaView>
  )
}

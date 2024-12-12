import { Header as HeaderComponent } from '@components/Header'
import { Icon } from '@components/ui/icon'
import { Text } from '@components/ui/text'
import { VStack } from '@components/ui/vstack'
import { useProductDetails } from '@hooks/useProductDetails'
import { useNavigation } from '@react-navigation/native'
import type { AppNavigatorRoutesProps } from '@routes/app.routes'
import { ArrowLeft, PencilLine } from 'phosphor-react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

type Props = {
  isPreviewMode: boolean
  isEditMode: boolean
}

export function Header({ isPreviewMode, isEditMode }: Props) {
  const { product, isLoadingProduct } = useProductDetails()
  const navigator = useNavigation<AppNavigatorRoutesProps>()

  const hideEditButton = isLoadingProduct || !isEditMode

  function handleGoBack() {
    if (isEditMode) {
      return navigator.navigate('products')
    }

    return navigator.navigate('home')
  }

  function handleEditProduct() {
    navigator.navigate('productForm', { id: product.id })
  }

  if (isPreviewMode) {
    return (
      <SafeAreaView
        className="bg-app-blue-light"
        edges={['top', 'left', 'right']}
      >
        <VStack className="px-6 pt-6 pb-8 gap-1">
          <Text className="text-center text-lg text-app-gray-700" bold>
            Pré visualização do anúncio
          </Text>
          <Text className="text-center text-md text-app-gray-700">
            É assim que seu produto vai aparecer!
          </Text>
        </VStack>
      </SafeAreaView>
    )
  }

  return (
    <HeaderComponent
      title="Detalhes do anúncio"
      leftButton={{
        onPress: handleGoBack,
        children: <Icon as={ArrowLeft} className="fill-app-gray-100 w-7 h-7" />,
      }}
      rightButton={{
        onPress: handleEditProduct,
        children: (
          <Icon as={PencilLine} className="fill-app-gray-100 w-7 h-7" />
        ),
        style: hideEditButton ? { display: 'none' } : undefined,
      }}
    />
  )
}

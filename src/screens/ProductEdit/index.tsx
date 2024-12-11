import { Header } from '@components/Header'
import { Icon } from '@components/ui/icon'
import { useNavigation, useRoute } from '@react-navigation/native'
import type { AppNavigatorRoutesProps } from '@routes/app.routes'
import { ArrowLeft } from 'phosphor-react-native'

type RouteParams = {
  id: string
}

export function ProductEdit() {
  const navigator = useNavigation<AppNavigatorRoutesProps>()

  const { params } = useRoute()
  const { id } = params as RouteParams

  function handleCancel() {
    navigator.navigate('productDetails', { id })
  }

  return (
    <>
      <Header
        title="Editar anúncio"
        leftButton={{
          onPress: handleCancel,
          children: (
            <Icon as={ArrowLeft} className="fill-app-gray-100 w-7 h-7" />
          ),
        }}
      />
    </>
  )
}

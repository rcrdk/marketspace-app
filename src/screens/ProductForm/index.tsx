import { Header } from '@components/Header'
import { Icon } from '@components/ui/icon'
import { useNavigation } from '@react-navigation/native'
import type { AppNavigatorRoutesProps } from '@routes/app.routes'
import { ArrowLeft } from 'phosphor-react-native'

export function ProductForm() {
  const navigator = useNavigation<AppNavigatorRoutesProps>()

  function handleCancel() {
    navigator.goBack()
  }

  return (
    <>
      <Header
        title="Criar anúncio"
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

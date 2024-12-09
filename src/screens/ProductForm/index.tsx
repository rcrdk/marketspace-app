import { Header } from '@components/Header'
import { useNavigation } from '@react-navigation/native'
import type { AppNavigatorRoutesProps } from '@routes/app.routes'
import { themeColors } from '@styles/colors'
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
          children: <ArrowLeft color={themeColors['gray-100']} />,
        }}
      />
    </>
  )
}

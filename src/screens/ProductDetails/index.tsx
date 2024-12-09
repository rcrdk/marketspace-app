import { Header } from '@components/Header'
// import { useAuth } from '@hooks/useAuth'
import { useNavigation } from '@react-navigation/native'
import type { AppNavigatorRoutesProps } from '@routes/app.routes'
import { themeColors } from '@styles/colors'
import { ArrowLeft } from 'phosphor-react-native'

export function ProductDetails() {
  const navigator = useNavigation<AppNavigatorRoutesProps>()
  // const { user } = useAuth()

  function handleGoBack() {
    navigator.goBack()
  }

  return (
    <>
      <Header
        leftButton={{
          onPress: handleGoBack,
          children: <ArrowLeft color={themeColors['gray-100']} />,
        }}
      />
    </>
  )
}

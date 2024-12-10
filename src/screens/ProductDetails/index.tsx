import { Header } from '@components/Header'
import { Icon } from '@components/ui/icon'
// import { useAuth } from '@hooks/useAuth'
import { useNavigation } from '@react-navigation/native'
import type { AppNavigatorRoutesProps } from '@routes/app.routes'
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
          children: (
            <Icon as={ArrowLeft} className="fill-app-gray-100 w-7 h-7" />
          ),
        }}
      />
    </>
  )
}

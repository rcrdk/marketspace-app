import { useAuth } from '@hooks/useAuth'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { AuthRoutes } from '@routes/auth.routes'
import { themeColors } from '@styles/colors'

import { AppRoutes } from './app.routes'

export function Routes() {
  const theme = DefaultTheme
  theme.colors.background = themeColors['gray-600']

  const { user, isLoadingUserStorageData } = useAuth()

  if (isLoadingUserStorageData) {
    return null
  }

  return (
    <NavigationContainer theme={theme}>
      {user.id ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  )
}

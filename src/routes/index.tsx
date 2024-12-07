import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { AuthRoutes } from '@routes/auth.routes'
import { themeColors } from '@styles/colors'

export function Routes() {
  const theme = DefaultTheme
  theme.colors.background = themeColors['gray-600']

  return (
    <NavigationContainer theme={theme}>
      <AuthRoutes />
      {/* <AppRoutes /> */}
    </NavigationContainer>
  )
}

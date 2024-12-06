import '@styles/global.css'

import { GluestackUIProvider } from '@components/ui/gluestack-ui-provider'
import {
  Karla_400Regular,
  Karla_700Bold,
  useFonts,
} from '@expo-google-fonts/karla'
import { Routes } from '@routes/index'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import { StatusBar } from 'react-native'

SplashScreen.preventAutoHideAsync()

export default function App() {
  const [isFontLoaded, hasFontError] = useFonts({
    Karla_400Regular,
    Karla_700Bold,
  })

  useEffect(() => {
    if (isFontLoaded || hasFontError) {
      SplashScreen.hideAsync()
    }
  }, [hasFontError, isFontLoaded])

  if (!isFontLoaded && !hasFontError) {
    return null
  }

  return (
    <GluestackUIProvider mode="light">
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      <Routes />
    </GluestackUIProvider>
  )
}

import '@styles/global.css'

import { Box } from '@components/ui/box'
import { GluestackUIProvider } from '@components/ui/gluestack-ui-provider'
import { Text } from '@components/ui/text'

export default function App() {
  return (
    <GluestackUIProvider mode="light">
      <Box className="flex-1 items-center justify-center bg-gray-900">
        <Text className="color-white">My first GlueStack V2 App!</Text>
      </Box>
    </GluestackUIProvider>
  )
}

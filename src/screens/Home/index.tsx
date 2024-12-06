import { Center } from '@components/ui/center'
import { Text } from '@components/ui/text'
import { SafeAreaView } from 'react-native-safe-area-context'

export function Home() {
  return (
    <>
      <SafeAreaView edges={['top', 'left', 'right']}></SafeAreaView>

      <Center className="flex-1">
        <Text>[TBD]</Text>
      </Center>
    </>
  )
}

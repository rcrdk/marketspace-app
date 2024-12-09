import { Input } from '@components/Input'
import { Box } from '@components/ui/box'
import { HStack } from '@components/ui/hstack'
import { Pressable } from '@components/ui/pressable'
import { Text } from '@components/ui/text'
import { VStack } from '@components/ui/vstack'
import { themeColors } from '@styles/colors'
import { MagnifyingGlass, Sliders } from 'phosphor-react-native'

export function Filters() {
  return (
    <VStack className="gap-3">
      <Text className="text-app-gray-300" size="md">
        Compre produtos variados
      </Text>

      <Box className="relative">
        <Input placeholder="Buscar anúncio" className="pr-24" />

        <HStack className="absolute top-0 right-0 h-full items-center">
          <Pressable className="w-12 h-full items-center justify-center">
            <MagnifyingGlass size={24} color={themeColors['gray-100']} />
          </Pressable>

          <Box className="w-px h-6 bg-app-gray-500" />

          <Pressable className="w-12 h-full items-center justify-center">
            <Sliders size={24} color={themeColors['gray-100']} />
          </Pressable>
        </HStack>
      </Box>
    </VStack>
  )
}

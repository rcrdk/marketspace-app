import type { ComponentProps } from 'react'
import { Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Box } from './ui/box'
import { HStack } from './ui/hstack'
import { Text } from './ui/text'

type Props = {
  title?: string
  leftButton?: ComponentProps<typeof Pressable>
  rightButton?: ComponentProps<typeof Pressable>
}

export function Header({ title, leftButton, rightButton }: Props) {
  return (
    <SafeAreaView edges={['top', 'left', 'right']}>
      <HStack className="items-center px-6 pt-6 pb-8">
        <Box className="w-6 h-6">
          {leftButton && (
            <Pressable
              {...leftButton}
              className="w-6 h-6 items-center justify-center"
            />
          )}
        </Box>

        <Text
          className="flex-1 px-6 text-center"
          bold
          size="lg"
          numberOfLines={1}
        >
          {title}
        </Text>

        <Box className="w-6 h-6">
          {rightButton && (
            <Pressable
              {...rightButton}
              className="w-6 h-6 items-center justify-center"
            />
          )}
        </Box>
      </HStack>
    </SafeAreaView>
  )
}

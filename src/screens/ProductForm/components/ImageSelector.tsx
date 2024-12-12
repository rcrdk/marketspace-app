import { Box } from '@components/ui/box'
import { Icon } from '@components/ui/icon'
import { Plus } from 'phosphor-react-native'
import type { ComponentProps } from 'react'
import { Pressable } from 'react-native-gesture-handler'

type Props = ComponentProps<typeof Pressable>

export default function ImageSelector({ ...props }: Props) {
  return (
    <Pressable {...props}>
      <Box className="w-28 h-28 bg-app-gray-500 items-center justify-center rounded-md">
        <Icon as={Plus} className="fill-app-gray-300 w-7 h-7" />
      </Box>
    </Pressable>
  )
}

import { Ghost } from 'phosphor-react-native'
import type { ComponentProps } from 'react'

import { Button } from './Button'
import { Icon } from './ui/icon'
import { Text } from './ui/text'
import { VStack } from './ui/vstack'

type Props = {
  title: string
  text: string
  button?: ComponentProps<typeof Button>
}

export function Empty({ title, text, button }: Props) {
  return (
    <VStack className="flex-1 justify-center gap-1 pb-10">
      <Icon
        as={Ghost}
        className="fill-app-gray-500 stroke-none mx-auto w-36 h-36 mb-8"
      />

      <Text className="text-center text-2xl" bold>
        {title}
      </Text>

      <Text className="text-center text-lg">{text}</Text>

      {button && <Button {...button} className="mt-4" />}
    </VStack>
  )
}

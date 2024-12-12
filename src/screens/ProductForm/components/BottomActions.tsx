import { Button } from '@components/Button'
import { HStack } from '@components/ui/hstack'
import type { ComponentProps } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

type Props = {
  onCancel: () => void
  actionButton: ComponentProps<typeof Button>
}

export function BottomActions({ onCancel, actionButton }: Props) {
  return (
    <SafeAreaView
      className="bg-app-gray-700 px-6 pt-6 ios:pb-0 android:pb-6"
      edges={['bottom', 'left', 'right']}
    >
      <HStack className="item-center justify-between gap-4">
        <Button
          label="Cancelar"
          variants="secondary"
          className="flex-1"
          onPress={onCancel}
        />

        <Button {...actionButton} variants="primary" className="flex-1" />
      </HStack>
    </SafeAreaView>
  )
}

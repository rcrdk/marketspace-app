import {
  Radio as RadioComponent,
  RadioIcon,
  RadioIndicator,
  RadioLabel,
} from '@components/ui/radio'
import { Circle } from 'phosphor-react-native'
import type { ComponentProps } from 'react'

type Props = ComponentProps<typeof RadioComponent> & {
  value: string
  label: string
}

export function Radio({ value, label, ...props }: Props) {
  return (
    <RadioComponent {...props} value={value} size="lg">
      <RadioIndicator>
        {/* @ts-ignore: Unreachable code error */}
        <RadioIcon as={Circle} weight="fill" />
      </RadioIndicator>

      <RadioLabel>{label}</RadioLabel>
    </RadioComponent>
  )
}

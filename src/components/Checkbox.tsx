import {
  Checkbox as CheckboxComponent,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
} from '@components/ui/checkbox'
import { Check } from 'phosphor-react-native'
import type { ComponentProps } from 'react'

type Props = ComponentProps<typeof CheckboxComponent> & {
  value: string
  label: string
}

export function Checkbox({ value, label, ...props }: Props) {
  return (
    <CheckboxComponent {...props} value={value} key={value} size="lg">
      <CheckboxIndicator>
        <CheckboxIcon as={Check} size="lg" />
      </CheckboxIndicator>

      <CheckboxLabel>{label}</CheckboxLabel>
    </CheckboxComponent>
  )
}

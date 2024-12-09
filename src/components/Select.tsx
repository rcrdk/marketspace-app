import { themeColors } from '@styles/colors'
import { CaretDown } from 'phosphor-react-native'
import type { ComponentProps } from 'react'

import {
  Select as SelectComponent,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from './ui/select'

type Props = ComponentProps<typeof SelectComponent> & {
  placeholder?: string
  options: string[]
}

export function Select({ placeholder, options, ...props }: Props) {
  return (
    <SelectComponent {...props}>
      <SelectTrigger variant="outline" size="sm">
        <SelectInput
          placeholder={placeholder ?? 'Selecione uma opção'}
          className="font-karlaRegular text-md"
        />

        <SelectIcon
          className="mr-3"
          as={CaretDown}
          color={themeColors['gray-100']}
        />
      </SelectTrigger>

      <SelectPortal>
        <SelectBackdrop />

        <SelectContent>
          <SelectDragIndicatorWrapper>
            <SelectDragIndicator />
          </SelectDragIndicatorWrapper>

          {options.map((item) => (
            <SelectItem label={item} value={item} key={item} />
          ))}
        </SelectContent>
      </SelectPortal>
    </SelectComponent>
  )
}

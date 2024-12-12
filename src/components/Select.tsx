import { CaretDown } from 'phosphor-react-native'
import { useCallback, useMemo } from 'react'

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

type Props = {
  options: {
    label: string
    value?: boolean
  }[]
  onChange: (status?: boolean) => void
}

export function Select({ options, onChange }: Props) {
  const defaultValueSelected = useMemo(() => options.at(0), [options])

  const handleSelectChange = useCallback(
    (label: string) => {
      const valueToSet = options.find((item) => item.label === label)?.value
      onChange(valueToSet)
    },
    [onChange, options],
  )

  return (
    <SelectComponent
      defaultValue={defaultValueSelected?.label}
      onValueChange={handleSelectChange}
    >
      <SelectTrigger size="sm">
        <SelectInput size="md" style={{ fontSize: 13 }} />
        <SelectIcon as={CaretDown} size="lg" />
      </SelectTrigger>

      <SelectPortal>
        <SelectBackdrop />

        <SelectContent>
          <SelectDragIndicatorWrapper>
            <SelectDragIndicator />
          </SelectDragIndicatorWrapper>

          {options?.map((item) => (
            <SelectItem
              label={item.label}
              value={item.label}
              key={item.label}
            />
          ))}
        </SelectContent>
      </SelectPortal>
    </SelectComponent>
  )
}

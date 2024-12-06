import {
  Input as InputComponent,
  InputField,
  InputIcon,
  InputSlot,
} from '@components/ui/input'
import { themeColors } from '@styles/colors'
import { type IconProps, WarningCircle } from 'phosphor-react-native'
import type { ComponentProps, ElementType } from 'react'

import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
} from './ui/form-control'

type Props = ComponentProps<typeof InputField> & {
  placeholder?: string
  errorMessage?: string | null
  icon?: ElementType<IconProps>
  onIconPress?: () => void
  disabled?: boolean
}

export function Input({
  placeholder,
  icon,
  onIconPress,
  errorMessage,
  disabled = false,
  ...props
}: Props) {
  return (
    <FormControl isInvalid={!!errorMessage}>
      <InputComponent
        className="h-14 px-3 py-2 text-lg bg-app-gray-700 rounded-md border-app-gray-700 data-[focus=true]:border-app-blue-light"
        isDisabled={disabled}
      >
        <InputField
          placeholder={placeholder}
          placeholderTextColor={
            !errorMessage ? themeColors['gray-400'] : themeColors['red-light']
          }
          className="text-lg font-karlaRegular"
          {...props}
        />
        {icon && onIconPress && (
          <InputSlot onPress={onIconPress}>
            <InputIcon
              as={icon}
              className=" fill-app-gray-300 w-7 h-7"
              size="xl"
            />
          </InputSlot>
        )}
      </InputComponent>

      <FormControlError>
        <FormControlErrorIcon
          className="fill-app-red-light"
          as={WarningCircle}
        />
        <FormControlErrorText className="color-app-red-light">
          {errorMessage}
        </FormControlErrorText>
      </FormControlError>
    </FormControl>
  )
}

import {
  Textarea as TextareaComponent,
  TextareaInput,
} from '@components/ui/textarea'
import { themeColors } from '@styles/colors'
import { WarningCircle } from 'phosphor-react-native'
import type { ComponentProps } from 'react'
import type { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form'

import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
} from './ui/form-control'

type Props = ComponentProps<typeof TextareaInput> & {
  placeholder?: string
  errorMessage?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>
  disabled?: boolean
}

export function Textarea({
  placeholder,
  errorMessage,
  disabled = false,
  ...props
}: Props) {
  return (
    <FormControl isInvalid={!!errorMessage}>
      <TextareaComponent
        className="px-3 pt-1 pb-2 text-lg bg-app-gray-700 rounded-md border-app-gray-700 data-[focus=true]:border-app-blue-light data-[invalid=true]:data-[focus=true]:border-app-red-light"
        isDisabled={disabled}
      >
        <TextareaInput
          placeholder={placeholder}
          placeholderTextColor={
            !errorMessage ? themeColors['gray-400'] : themeColors['red-light']
          }
          className="text-lg font-karlaRegular"
          {...props}
        />
      </TextareaComponent>

      <FormControlError>
        <FormControlErrorIcon
          className="fill-app-red-light"
          as={WarningCircle}
        />
        <FormControlErrorText className="color-app-red-light">
          {errorMessage?.message?.toString()}
        </FormControlErrorText>
      </FormControlError>
    </FormControl>
  )
}

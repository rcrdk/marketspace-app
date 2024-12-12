import { WarningCircle } from 'phosphor-react-native'
import type { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form'

import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
} from './ui/form-control'

type Props = {
  message?:
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<any>>
    | Merge<FieldError, (FieldError | undefined)[]>
}

export function ErrorMessage({ message }: Props) {
  return (
    <FormControl isInvalid={!!message}>
      <FormControlError>
        <FormControlErrorIcon
          className="fill-app-red-light"
          as={WarningCircle}
        />
        <FormControlErrorText className="color-app-red-light">
          {message?.message?.toString()}
        </FormControlErrorText>
      </FormControlError>
    </FormControl>
  )
}

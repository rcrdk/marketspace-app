import { Pressable } from '@components/ui/pressable'
import type { IconProps } from 'phosphor-react-native'
import type { ComponentProps, ElementType } from 'react'

import { Spinner } from './ui/spinner'
import { Text } from './ui/text'

type Props = ComponentProps<typeof Pressable> & {
  label: string
  variants?: 'branded' | 'primary' | 'secondary'
  loading?: boolean
  iconBefore?: ElementType<IconProps, any>
  iconAfter?: ElementType<IconProps, any>
}

export function Button({
  label,
  variants = 'branded',
  loading = false,
  iconBefore,
  iconAfter,
  ...props
}: Props) {
  const baseStyles = {
    container: `${props.className ?? ''} items-center justify-center flex-row gap-3 h-12 rounded-md`,
    text: 'color-app-gray-100',
  }

  function setVariantStyles() {
    if (variants === 'branded') {
      return {
        container: `${baseStyles.container} bg-app-blue-light`,
        text: `${baseStyles.text} color-app-gray-700`,
      }
    }

    if (variants === 'primary') {
      return {
        container: `${baseStyles.container} bg-app-gray-100`,
        text: `${baseStyles.text} color-app-gray-700`,
      }
    }

    return {
      container: `${baseStyles.container} bg-app-gray-500`,
      text: `${baseStyles.text} color-app-gray-200`,
    }
  }

  const { container, text } = setVariantStyles()

  return (
    <Pressable {...props} className={container}>
      {loading ? (
        <Spinner className={text} />
      ) : (
        <>
          {iconBefore}
          <Text className={text} size="md" bold>
            {label}
          </Text>
          {iconAfter}
        </>
      )}
    </Pressable>
  )
}

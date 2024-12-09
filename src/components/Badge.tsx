import type { ComponentProps } from 'react'

import { Text } from './ui/text'

type Props = ComponentProps<typeof Text> & {
  label: string
  variant?: 'default' | 'primary' | 'branded'
}

export function Badge({ label, variant = 'default', ...props }: Props) {
  function getVariantStyles() {
    switch (variant) {
      case 'default':
        return 'text-app-gray-200 bg-app-gray-500'
      case 'primary':
        return 'text-app-gray-700 bg-app-gray-200'
      case 'branded':
        return 'text-app-gray-700 bg-app-blue'
    }
  }

  return (
    <Text
      {...props}
      className={`px-2 py-1 rounded-full uppercase text-xs ${getVariantStyles()} ${props.className}`}
      bold
    >
      {label}
    </Text>
  )
}

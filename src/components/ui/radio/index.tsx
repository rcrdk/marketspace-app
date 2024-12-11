'use client'
import { PrimitiveIcon, UIIcon } from '@gluestack-ui/icon'
import type { VariantProps } from '@gluestack-ui/nativewind-utils'
import { tva } from '@gluestack-ui/nativewind-utils/tva'
import {
  useStyleContext,
  withStyleContext,
} from '@gluestack-ui/nativewind-utils/withStyleContext'
import { createRadio } from '@gluestack-ui/radio'
import { cssInterop } from 'nativewind'
import React from 'react'
import { Platform, Pressable, Text, View } from 'react-native'

const SCOPE = 'Radio'

const UIRadio = createRadio({
  Root: (Platform.OS === 'web'
    ? withStyleContext(View, SCOPE)
    : withStyleContext(Pressable, SCOPE)) as ReturnType<
    typeof withStyleContext<typeof Pressable>
  >,
  Group: View,
  Icon: UIIcon,
  Indicator: View,
  Label: Text,
})

cssInterop(PrimitiveIcon, {
  className: {
    target: 'style',
    nativeStyleToProp: {
      height: true,
      width: true,
      fill: true,
      color: 'classNameColor',
      stroke: true,
    },
  },
})

const radioStyle = tva({
  base: 'group/radio flex-row justify-start items-center web:cursor-pointer data-[disabled=true]:web:cursor-not-allowed',
  variants: {
    size: {
      sm: 'gap-1.5',
      md: 'gap-2',
      lg: 'gap-2',
    },
  },
})

const radioGroupStyle = tva({
  base: 'gap-2',
})

const radioIconStyle = tva({
  base: 'rounded-full justify-center items-center text-app-gray-700 fill-app-gray-700',

  parentVariants: {
    size: {
      sm: 'h-[9px] w-[9px]',
      md: 'h-3 w-3',
      lg: 'h-4 w-4',
    },
  },
})

const radioIndicatorStyle = tva({
  base: 'justify-center items-center bg-app-gray-500 rounded-full data-[checked=true]:bg-app-blue-light data-[hover=true]:bg-transparent',
  parentVariants: {
    size: {
      sm: 'h-4 w-4',
      md: 'h-5 w-5',
      lg: 'h-6 w-6',
    },
  },
})

const radioLabelStyle = tva({
  base: 'text-app-gray-100 data-[checked=true]:text-app-gray-100 data-[hover=true]:text-app-gray-100 data-[hover=true]:data-[disabled=true]:text-app-gray-100 data-[hover=true]:data-[disabled=true]:data-[checked=true]:text-app-gray-100 data-[active=true]:text-app-gray-100 data-[active=true]:data-[checked=true]:text-app-gray-100 data-[disabled=true]:opacity-40 web:select-none font-body',
  parentVariants: {
    size: {
      '2xs': 'text-2xs',
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl',
      '4xl': 'text-4xl',
      '5xl': 'text-5xl',
      '6xl': 'text-6xl',
    },
  },
})

type IRadioProps = Omit<React.ComponentProps<typeof UIRadio>, 'context'> &
  VariantProps<typeof radioStyle>
const Radio = React.forwardRef<React.ElementRef<typeof UIRadio>, IRadioProps>(
  ({ className, size = 'md', ...props }, ref) => {
    return (
      <UIRadio
        className={radioStyle({ class: className, size })}
        {...props}
        ref={ref}
        context={{ size }}
      />
    )
  },
)

type IRadioGroupProps = React.ComponentProps<typeof UIRadio.Group> &
  VariantProps<typeof radioGroupStyle>
const RadioGroup = React.forwardRef<
  React.ElementRef<typeof UIRadio.Group>,
  IRadioGroupProps
>(({ className, ...props }, ref) => {
  return (
    <UIRadio.Group
      className={radioGroupStyle({ class: className })}
      {...props}
      ref={ref}
    />
  )
})

type IRadioIndicatorProps = React.ComponentProps<typeof UIRadio.Indicator> &
  VariantProps<typeof radioIndicatorStyle>
const RadioIndicator = React.forwardRef<
  React.ElementRef<typeof UIRadio.Indicator>,
  IRadioIndicatorProps
>(({ className, ...props }, ref) => {
  const { size } = useStyleContext(SCOPE)
  return (
    <UIRadio.Indicator
      className={radioIndicatorStyle({
        parentVariants: { size },
        class: className,
      })}
      ref={ref}
      {...props}
    />
  )
})

type IRadioLabelProps = React.ComponentProps<typeof UIRadio.Label> &
  VariantProps<typeof radioIndicatorStyle>
const RadioLabel = React.forwardRef<
  React.ElementRef<typeof UIRadio.Label>,
  IRadioLabelProps
>(({ className, ...props }, ref) => {
  const { size } = useStyleContext(SCOPE)
  return (
    <UIRadio.Label
      className={radioLabelStyle({
        parentVariants: { size },
        class: className,
      })}
      ref={ref}
      {...props}
    />
  )
})

type IRadioIconProps = React.ComponentProps<typeof UIRadio.Icon> &
  VariantProps<typeof radioIconStyle> & {
    height?: number
    width?: number
  }
const RadioIcon = React.forwardRef<
  React.ElementRef<typeof UIRadio.Icon>,
  IRadioIconProps
>(({ className, size, ...props }, ref) => {
  const { size: parentSize } = useStyleContext(SCOPE)

  if (typeof size === 'number') {
    return (
      <UIRadio.Icon
        ref={ref}
        {...props}
        className={radioIconStyle({ class: className })}
        size={size}
      />
    )
  } else if (
    (props.height !== undefined || props.width !== undefined) &&
    size === undefined
  ) {
    return (
      <UIRadio.Icon
        ref={ref}
        {...props}
        className={radioIconStyle({ class: className })}
      />
    )
  }

  return (
    <UIRadio.Icon
      {...props}
      className={radioIconStyle({
        parentVariants: {
          size: parentSize,
        },
        size,
        class: className,
      })}
      ref={ref}
    />
  )
})

Radio.displayName = 'Radio'
RadioGroup.displayName = 'RadioGroup'
RadioIndicator.displayName = 'RadioIndicator'
RadioLabel.displayName = 'RadioLabel'
RadioIcon.displayName = 'RadioIcon'

export { Radio, RadioGroup, RadioIndicator, RadioLabel, RadioIcon }
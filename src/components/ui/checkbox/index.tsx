/* eslint-disable react/display-name */
'use client'
import { createCheckbox } from '@gluestack-ui/checkbox'
import type { IPrimitiveIcon } from '@gluestack-ui/icon'
import { PrimitiveIcon, UIIcon } from '@gluestack-ui/icon'
import type { VariantProps } from '@gluestack-ui/nativewind-utils'
import { tva } from '@gluestack-ui/nativewind-utils/tva'
import {
  useStyleContext,
  withStyleContext,
} from '@gluestack-ui/nativewind-utils/withStyleContext'
import { cssInterop } from 'nativewind'
import React from 'react'
import type { TextProps, ViewProps } from 'react-native'
import { Platform, Pressable, Text, View } from 'react-native'

const IndicatorWrapper = React.forwardRef<
  React.ElementRef<typeof View>,
  ViewProps
>(({ ...props }, ref) => {
  return <View {...props} ref={ref} />
})

const LabelWrapper = React.forwardRef<React.ElementRef<typeof Text>, TextProps>(
  ({ ...props }, ref) => {
    return <Text {...props} ref={ref} />
  },
)

const IconWrapper = React.forwardRef<
  React.ElementRef<typeof PrimitiveIcon>,
  IPrimitiveIcon
>(({ ...props }, ref) => {
  return <UIIcon {...props} ref={ref} />
})

const SCOPE = 'CHECKBOX'
const UICheckbox = createCheckbox({
  // @ts-expect-error
  Root:
    Platform.OS === 'web'
      ? withStyleContext(View, SCOPE)
      : withStyleContext(Pressable, SCOPE),
  Group: View,
  Icon: IconWrapper,
  Label: LabelWrapper,
  Indicator: IndicatorWrapper,
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

const checkboxStyle = tva({
  base: 'group/checkbox flex-row items-center justify-start web:cursor-pointer data-[disabled=true]:cursor-not-allowed',
  variants: {
    size: {
      lg: 'gap-2',
      md: 'gap-2',
      sm: 'gap-1.5',
    },
  },
})

const checkboxIndicatorStyle = tva({
  base: 'justify-center items-center bg-app-gray-500 rounded data-[checked=true]:bg-app-blue-light data-[hover=true]:data-[checked=true]:data-[disabled=true]:bg-app-blue-light data-[hover=true]:data-[checked=true]:data-[disabled=true]:opacity-40 data-[disabled=true]:opacity-40 data-[invalid=true]:bg-app-red-light data-[invalid=true]:opacity-40',
  parentVariants: {
    size: {
      lg: 'w-6 h-6',
      md: 'w-5 h-5',
      sm: 'w-4 h-4',
    },
  },
})

const checkboxLabelStyle = tva({
  base: 'font-body text-app-gray-200 data-[checked=true]:text-app-gray-200 data-[hover=true]:text-app-gray-200 data-[hover=true]:data-[checked=true]:text-app-gray-200 data-[hover=true]:data-[checked=true]:data-[disabled=true]:text-app-gray-200 data-[hover=true]:data-[disabled=true]:text-typography-400 data-[active=true]:text-app-gray-200 data-[active=true]:data-[checked=true]:text-app-gray-200 data-[disabled=true]:opacity-40 web:select-none data-[invalid=true]:text-app-red-light',
  parentVariants: {
    size: {
      lg: 'text-lg',
      md: 'text-base',
      sm: 'text-sm',
    },
  },
})

const checkboxIconStyle = tva({
  base: 'text-app-gray-700 fill-app-gray-700 ',

  parentVariants: {
    size: {
      sm: 'h-3 w-3',
      md: 'h-4 w-4',
      lg: 'h-5 w-5',
    },
  },
})

const CheckboxGroup = UICheckbox.Group

type ICheckboxProps = React.ComponentPropsWithoutRef<typeof UICheckbox> &
  VariantProps<typeof checkboxStyle>

const Checkbox = React.forwardRef<
  React.ElementRef<typeof UICheckbox>,
  ICheckboxProps
>(({ className, size = 'md', ...props }, ref) => {
  return (
    <UICheckbox
      className={checkboxStyle({
        class: className,
        size,
      })}
      {...props}
      context={{
        size,
      }}
      ref={ref}
    />
  )
})

type ICheckboxIndicatorProps = React.ComponentPropsWithoutRef<
  typeof UICheckbox.Indicator
> &
  VariantProps<typeof checkboxIndicatorStyle>

const CheckboxIndicator = React.forwardRef<
  React.ElementRef<typeof UICheckbox.Indicator>,
  ICheckboxIndicatorProps
>(({ className, ...props }, ref) => {
  const { size: parentSize } = useStyleContext(SCOPE)

  return (
    <UICheckbox.Indicator
      className={checkboxIndicatorStyle({
        parentVariants: {
          size: parentSize,
        },
        class: className,
      })}
      {...props}
      ref={ref}
    />
  )
})

type ICheckboxLabelProps = React.ComponentPropsWithoutRef<
  typeof UICheckbox.Label
> &
  VariantProps<typeof checkboxLabelStyle>
const CheckboxLabel = React.forwardRef<
  React.ElementRef<typeof UICheckbox.Label>,
  ICheckboxLabelProps
>(({ className, ...props }, ref) => {
  const { size: parentSize } = useStyleContext(SCOPE)
  return (
    <UICheckbox.Label
      className={checkboxLabelStyle({
        parentVariants: {
          size: parentSize,
        },
        class: className,
      })}
      {...props}
      ref={ref}
    />
  )
})

type ICheckboxIconProps = React.ComponentPropsWithoutRef<
  typeof UICheckbox.Icon
> &
  VariantProps<typeof checkboxIconStyle>

const CheckboxIcon = React.forwardRef<
  React.ElementRef<typeof UICheckbox.Icon>,
  ICheckboxIconProps
>(({ className, size, ...props }, ref) => {
  const { size: parentSize } = useStyleContext(SCOPE)

  if (typeof size === 'number') {
    return (
      <UICheckbox.Icon
        ref={ref}
        {...props}
        className={checkboxIconStyle({ class: className })}
        size={size}
      />
    )
  } else if (
    (props.height !== undefined || props.width !== undefined) &&
    size === undefined
  ) {
    return (
      <UICheckbox.Icon
        ref={ref}
        {...props}
        className={checkboxIconStyle({ class: className })}
      />
    )
  }

  return (
    <UICheckbox.Icon
      className={checkboxIconStyle({
        parentVariants: {
          size: parentSize,
        },
        class: className,
        size,
      })}
      {...props}
      ref={ref}
    />
  )
})

Checkbox.displayName = 'Checkbox'
CheckboxIndicator.displayName = 'CheckboxIndicator'
CheckboxLabel.displayName = 'CheckboxLabel'
CheckboxIcon.displayName = 'CheckboxIcon'

export {
  Checkbox,
  CheckboxIndicator,
  CheckboxLabel,
  CheckboxIcon,
  CheckboxGroup,
}

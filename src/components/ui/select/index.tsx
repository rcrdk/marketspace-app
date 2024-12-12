/* eslint-disable react/display-name */
'use client'

import { PrimitiveIcon, UIIcon } from '@gluestack-ui/icon'
import type { VariantProps } from '@gluestack-ui/nativewind-utils'
import { tva } from '@gluestack-ui/nativewind-utils/tva'
import {
  useStyleContext,
  withStyleContext,
} from '@gluestack-ui/nativewind-utils/withStyleContext'
import { createSelect } from '@gluestack-ui/select'
import { cssInterop } from 'nativewind'
import React from 'react'
import { Pressable, TextInput, View } from 'react-native'

import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetFlatList,
  ActionsheetItem,
  ActionsheetItemText,
  ActionsheetScrollView,
  ActionsheetSectionHeaderText,
  ActionsheetSectionList,
  ActionsheetVirtualizedList,
} from './select-actionsheet'

const SelectTriggerWrapper = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  React.ComponentProps<typeof Pressable>
>(({ ...props }, ref) => {
  return <Pressable {...props} ref={ref} />
})

const selectIconStyle = tva({
  base: 'fill-app-gray-100 stroke-none',
  parentVariants: {
    size: {
      '2xs': 'h-3 w-3',
      xs: 'h-3.5 w-3.5',
      sm: 'h-4 w-4',
      md: 'h-[18px] w-[18px]',
      lg: 'h-5 w-5',
      xl: 'h-6 w-6',
    },
  },
})

const selectStyle = tva({
  base: '',
})

const selectTriggerStyle = tva({
  base: 'px-3 border border-app-gray-500 rounded-md flex-row items-center gap-2 overflow-hidden  data-[disabled=true]:opacity-40',
  variants: {
    size: {
      xl: 'h-12',
      lg: 'h-11',
      md: 'h-10',
      sm: 'h-9',
    },
    variant: {
      underlined:
        'border-0 border-b rounded-none data-[hover=true]:border-primary-700 data-[focus=true]:border-primary-700 data-[focus=true]:web:shadow-[inset_0_-1px_0_0] data-[focus=true]:web:shadow-primary-700 data-[invalid=true]:border-error-700 data-[invalid=true]:web:shadow-error-700',
      outline:
        'data-[focus=true]:border-primary-700 data-[focus=true]:web:shadow-[inset_0_0_0_1px] data-[focus=true]:data-[hover=true]:web:shadow-primary-600 data-[invalid=true]:web:shadow-[inset_0_0_0_1px] data-[invalid=true]:border-error-700 data-[invalid=true]:web:shadow-error-700 data-[invalid=true]:data-[hover=true]:border-error-700',
      rounded:
        'rounded-full data-[focus=true]:border-primary-700 data-[focus=true]:web:shadow-[inset_0_0_0_1px] data-[focus=true]:web:shadow-primary-700 data-[invalid=true]:border-error-700 data-[invalid=true]:web:shadow-error-700',
    },
  },
})

const selectInputStyle = tva({
  base: 'py-auto h-full text-app-gray-100 pointer-events-none ios:leading-[0px]',
  parentVariants: {
    size: {
      xl: 'text-xl',
      lg: 'text-lg',
      md: 'text-lg',
      sm: 'text-sm',
    },
    variant: {
      underlined: 'px-0',
      outline: '',
      rounded: 'px-4',
    },
  },
})

const UISelect = createSelect(
  {
    Root: View,
    Trigger: withStyleContext(SelectTriggerWrapper),
    Input: TextInput,
    Icon: UIIcon,
  },
  {
    Portal: Actionsheet,
    Backdrop: ActionsheetBackdrop,
    Content: ActionsheetContent,
    DragIndicator: ActionsheetDragIndicator,
    DragIndicatorWrapper: ActionsheetDragIndicatorWrapper,
    Item: ActionsheetItem,
    ItemText: ActionsheetItemText,
    ScrollView: ActionsheetScrollView,
    VirtualizedList: ActionsheetVirtualizedList,
    FlatList: ActionsheetFlatList,
    SectionList: ActionsheetSectionList,
    SectionHeaderText: ActionsheetSectionHeaderText,
  },
)

cssInterop(UISelect, { className: 'style' })
cssInterop(UISelect.Input, {
  className: { target: 'style', nativeStyleToProp: { textAlign: true } },
})
cssInterop(SelectTriggerWrapper, { className: 'style' })

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

type ISelectProps = VariantProps<typeof selectStyle> &
  React.ComponentProps<typeof UISelect> & { className?: string }

const Select = React.forwardRef<
  React.ElementRef<typeof UISelect>,
  ISelectProps
>(({ className, ...props }, ref) => {
  return (
    <UISelect
      className={selectStyle({
        class: className,
      })}
      ref={ref}
      {...props}
    />
  )
})

type ISelectTriggerProps = VariantProps<typeof selectTriggerStyle> &
  React.ComponentProps<typeof UISelect.Trigger> & { className?: string }

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof UISelect.Trigger>,
  ISelectTriggerProps
>(({ className, size = 'md', variant = 'outline', ...props }, ref) => {
  return (
    <UISelect.Trigger
      className={selectTriggerStyle({
        class: className,
        size,
        variant,
      })}
      ref={ref}
      context={{ size, variant }}
      {...props}
    />
  )
})

type ISelectInputProps = VariantProps<typeof selectInputStyle> &
  React.ComponentProps<typeof UISelect.Input> & { className?: string }

const SelectInput = React.forwardRef<
  React.ElementRef<typeof UISelect.Input>,
  ISelectInputProps
>(({ className, ...props }, ref) => {
  const { size: parentSize, variant: parentVariant } = useStyleContext()
  return (
    <UISelect.Input
      className={selectInputStyle({
        class: className,
        parentVariants: {
          size: parentSize,
          variant: parentVariant,
        },
      })}
      ref={ref}
      {...props}
    />
  )
})

type ISelectIcon = VariantProps<typeof selectIconStyle> &
  React.ComponentProps<typeof UISelect.Icon> & { className?: string }

const SelectIcon = React.forwardRef<
  React.ElementRef<typeof UISelect.Icon>,
  ISelectIcon
>(({ className, size, ...props }, ref) => {
  const { size: parentSize } = useStyleContext()
  if (typeof size === 'number') {
    return (
      <UISelect.Icon
        ref={ref}
        {...props}
        className={selectIconStyle({ class: className })}
        size={size}
      />
    )
  } else if (
    (props?.height !== undefined || props?.width !== undefined) &&
    size === undefined
  ) {
    return (
      <UISelect.Icon
        ref={ref}
        {...props}
        className={selectIconStyle({ class: className })}
      />
    )
  }
  return (
    <UISelect.Icon
      className={selectIconStyle({
        class: className,
        size,
        parentVariants: {
          size: parentSize,
        },
      })}
      ref={ref}
      {...props}
    />
  )
})

Select.displayName = 'Select'
SelectTrigger.displayName = 'SelectTrigger'
SelectInput.displayName = 'SelectInput'
SelectIcon.displayName = 'SelectIcon'

// Actionsheet Components
const SelectPortal = UISelect.Portal
const SelectBackdrop = UISelect.Backdrop
const SelectContent = UISelect.Content
const SelectDragIndicator = UISelect.DragIndicator
const SelectDragIndicatorWrapper = UISelect.DragIndicatorWrapper
const SelectItem = UISelect.Item
const SelectScrollView = UISelect.ScrollView
const SelectVirtualizedList = UISelect.VirtualizedList
const SelectFlatList = UISelect.FlatList
const SelectSectionList = UISelect.SectionList
const SelectSectionHeaderText = UISelect.SectionHeaderText

export {
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectItem,
  SelectScrollView,
  SelectVirtualizedList,
  SelectFlatList,
  SelectSectionList,
  SelectSectionHeaderText,
}
import { HStack } from '@components/ui/hstack'
import { Icon } from '@components/ui/icon'
import { Menu, MenuItem, MenuItemLabel } from '@components/ui/menu'
import { Pressable } from '@components/ui/pressable'
import { SkeletonText } from '@components/ui/skeleton'
import { Text } from '@components/ui/text'
import { CaretDown } from 'phosphor-react-native'
import { useMemo } from 'react'

type Props = {
  filterStatus?: boolean
  onFilterStatusChange: (status?: boolean) => void
  isLoading: boolean
  productsCount: number
}

export function Filters({
  filterStatus,
  onFilterStatusChange,
  productsCount,
  isLoading,
}: Props) {
  const availableStateFilters = useMemo(
    () => [
      {
        key: 'all',
        label: 'Todos',
        value: undefined,
      },
      {
        key: 'active',
        label: 'Ativos',
        value: true,
      },
      {
        key: 'inactive',
        label: 'Inativos',
        value: false,
      },
    ],
    [],
  )

  const activeStateFilter = useMemo(
    () => availableStateFilters.find((item) => item.value === filterStatus),
    [availableStateFilters, filterStatus],
  )

  return (
    <HStack className="items-center justify-between px-6">
      {isLoading ? (
        <SkeletonText className="h-4 w-24" />
      ) : (
        <Text className="text-app-gray-300">
          {productsCount === 1 ? '1 anúncio' : `${productsCount} anúncios`}
        </Text>
      )}

      <Menu
        placement="bottom right"
        offset={8}
        trigger={({ ...props }) => (
          <Pressable
            className="flex-row items-center border border-app-gray-500 rounded-md gap-2 ps-3 pe-2 py-1"
            {...props}
          >
            <Text>{activeStateFilter?.label}</Text>
            <Icon as={CaretDown} className="fill-app-gray-100 w-5 h-5" />
          </Pressable>
        )}
      >
        {availableStateFilters.map((item) => (
          <MenuItem
            onPress={() => onFilterStatusChange(item.value)}
            key={item.key}
            textValue={item.label}
            className="justify-center"
          >
            <MenuItemLabel className="text-center">{item.label}</MenuItemLabel>
          </MenuItem>
        ))}
      </Menu>
    </HStack>
  )
}

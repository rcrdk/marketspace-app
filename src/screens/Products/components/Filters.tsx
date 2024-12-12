import { Select } from '@components/Select'
import { HStack } from '@components/ui/hstack'
import { SkeletonText } from '@components/ui/skeleton'
import { Text } from '@components/ui/text'
import { useMemo } from 'react'

type FiltersType = 'Todos' | 'Ativos' | 'Inativos'

type FilterItem = {
  label: FiltersType
  value?: boolean
}

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
  const availableStateFilters: FilterItem[] = useMemo(
    () => [
      {
        label: 'Todos',
        value: undefined,
      },
      {
        label: 'Ativos',
        value: true,
      },
      {
        label: 'Inativos',
        value: false,
      },
    ],
    [],
  )

  return (
    <HStack className="items-center justify-between px-6">
      {isLoading ? (
        <SkeletonText className="h-4 w-24" />
      ) : (
        <Text className="text-app-gray-300 flex-1">
          {productsCount === 1 ? '1 anúncio' : `${productsCount} anúncios`}
        </Text>
      )}

      <Select options={availableStateFilters} onChange={onFilterStatusChange} />
    </HStack>
  )
}

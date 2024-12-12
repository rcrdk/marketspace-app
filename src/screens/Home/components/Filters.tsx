import { ActionSheet } from '@components/ActionSheet'
import { Button } from '@components/Button'
import { Checkbox } from '@components/Checkbox'
import { Input } from '@components/Input'
import { Radio } from '@components/Radio'
import { Box } from '@components/ui/box'
import { CheckboxGroup } from '@components/ui/checkbox'
import { HStack } from '@components/ui/hstack'
import { Icon } from '@components/ui/icon'
import { Pressable } from '@components/ui/pressable'
import { RadioGroup } from '@components/ui/radio'
import { Switch } from '@components/ui/switch'
import { Text } from '@components/ui/text'
import { VStack } from '@components/ui/vstack'
import { type ProductsFilterSchema } from '@schemas/productsFiltersSchema'
import { themeColors } from '@styles/colors'
import { MagnifyingGlass, Sliders, X } from 'phosphor-react-native'
import { useCallback, useMemo, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

type Props = {
  onChangeFilters: (data: ProductsFilterSchema) => void
}

export function Filters({ onChangeFilters }: Props) {
  const [showFilters, setShowFilters] = useState(false)

  const { control, handleSubmit, reset, getValues } =
    useFormContext<ProductsFilterSchema>()

  function handleToggleFiltersVisibility() {
    setShowFilters((prev) => !prev)
  }

  const handleResetFilters = useCallback(() => {
    reset()
    onChangeFilters({} as ProductsFilterSchema)
    setShowFilters(false)
  }, [onChangeFilters, reset])

  const handleApplyFilters = useCallback(() => {
    const data = getValues()

    setShowFilters(false)
    onChangeFilters(data)
  }, [getValues, onChangeFilters])

  const getPaymentMethods = useMemo(
    () => [
      { key: 'pix', label: 'Pix' },
      { key: 'card', label: 'Cartão de crédito' },
      { key: 'boleto', label: 'Boleto' },
      { key: 'cash', label: 'Dinheiro' },
      { key: 'deposit', label: 'Depósito' },
    ],
    [],
  )

  return (
    <VStack className="gap-3 mb-6">
      <Text className="text-app-gray-300" size="md">
        Compre produtos variados
      </Text>

      <Box className="relative">
        <Controller
          control={control}
          name="query"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Buscar anúncio"
              className="pr-24"
              onChangeText={onChange}
              value={value}
              enterKeyHint="search"
              onSubmitEditing={handleSubmit(onChangeFilters)}
            />
          )}
        />

        <HStack className="absolute top-0 right-0 h-full items-center">
          <Pressable
            className="w-12 h-full items-center justify-center"
            onPress={handleApplyFilters}
          >
            <Icon as={MagnifyingGlass} className="fill-app-gray-100 w-7 h-7" />
          </Pressable>

          <Box className="w-px h-6 bg-app-gray-500" />

          <Pressable
            className="w-12 h-full items-center justify-center"
            onPress={handleToggleFiltersVisibility}
          >
            <Icon as={Sliders} className="fill-app-gray-100 w-7 h-7" />
          </Pressable>
        </HStack>
      </Box>

      <ActionSheet show={showFilters} onDismiss={handleToggleFiltersVisibility}>
        <VStack className="gap-6 w-full">
          <HStack className="pb-2 items-center justify-between">
            <Text className="text-2xl" bold>
              Filtrar anúncios
            </Text>

            <Pressable onPress={handleToggleFiltersVisibility}>
              <Icon as={X} className="fill-slate-400 w-6 h-6" />
            </Pressable>
          </HStack>

          <VStack className="gap-3">
            <Text className="text-app-gray-200 text-md" bold>
              Condição:
            </Text>

            <Controller
              control={control}
              name="isNew"
              render={({ field: { value, onChange } }) => (
                <RadioGroup
                  value={String(value ?? 'all')}
                  onChange={onChange}
                  className="gap-2"
                >
                  <Radio value="all" label="Novos e usados" />
                  <Radio value="true" label="Novos" />
                  <Radio value="false" label="Usados" />
                </RadioGroup>
              )}
            />
          </VStack>

          <VStack className="gap-3">
            <Text className="text-app-gray-200 text-md" bold>
              Aceita troca?
            </Text>

            <Controller
              control={control}
              name="acceptTrade"
              render={({ field: { onChange, value } }) => (
                <Switch
                  onToggle={onChange}
                  value={value}
                  isChecked={value}
                  trackColor={{ true: themeColors['blue-light'] }}
                />
              )}
            />
          </VStack>

          <VStack className="gap-3">
            <Text className="text-app-gray-200 text-md" bold>
              Meios de pagamento aceitos:
            </Text>

            <Controller
              control={control}
              name="paymentMethods"
              render={({ field: { value, onChange } }) => (
                <CheckboxGroup
                  value={value as string[]}
                  onChange={onChange}
                  className="gap-2"
                >
                  {getPaymentMethods.map((item) => (
                    <Checkbox
                      value={item.key}
                      label={item.label}
                      key={item.key}
                    />
                  ))}
                </CheckboxGroup>
              )}
            />
          </VStack>

          <HStack className="gap-3 pt-3">
            <Button
              label="Resetar filtros"
              className="flex-1"
              variants="secondary"
              onPress={handleResetFilters}
            />

            <Button
              label="Aplicar filtros"
              className="flex-1"
              variants="primary"
              onPress={handleApplyFilters}
            />
          </HStack>
        </VStack>
      </ActionSheet>
    </VStack>
  )
}

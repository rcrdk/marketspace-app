import { Checkbox } from '@components/Checkbox'
import { ErrorMessage } from '@components/ErrorMessage'
import { Input } from '@components/Input'
import { CheckboxGroup } from '@components/ui/checkbox'
import { Switch } from '@components/ui/switch'
import { Text } from '@components/ui/text'
import { VStack } from '@components/ui/vstack'
import type { ProductFormSchema } from '@schemas/productFormSchema'
import { themeColors } from '@styles/colors'
import { useMemo } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import CurrencyInput from 'react-native-currency-input'

export function SaleFields() {
  const {
    control,
    formState: { errors },
  } = useFormContext<ProductFormSchema>()

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
    <VStack className="gap-4">
      <Text className="text-lg" bold>
        Venda
      </Text>

      <Controller
        control={control}
        name="price"
        render={({ field: { onChange, value } }) => (
          <CurrencyInput
            value={value}
            onChangeValue={onChange}
            renderTextInput={(props) => (
              <Input
                placeholder="Valor do produto"
                errorMessage={errors.price}
                preffix={<Text size="lg">R$</Text>}
                keyboardType="decimal-pad"
                {...props}
              />
            )}
            delimiter="."
            separator=","
            precision={2}
          />
        )}
      />

      <VStack className="gap-3">
        <Text className="text-md text-app-gray-200" bold>
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
        <Text className="text-md text-app-gray-200" bold>
          Meios de pagamento:
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
                  isInvalid={!!errors.paymentMethods}
                />
              ))}
            </CheckboxGroup>
          )}
        />

        <ErrorMessage message={errors.paymentMethods} />
      </VStack>
    </VStack>
  )
}

import { Input } from '@components/Input'
import { Radio } from '@components/Radio'
import { Textarea } from '@components/Textarea'
import { RadioGroup } from '@components/ui/radio'
import { Text } from '@components/ui/text'
import { VStack } from '@components/ui/vstack'
import type { ProductFormSchema } from '@schemas/productFormSchema'
import { Controller, useFormContext } from 'react-hook-form'

export function InfoFields() {
  const {
    control,
    formState: { errors },
  } = useFormContext<ProductFormSchema>()

  return (
    <VStack className="gap-4">
      <Text className="text-lg" bold>
        Sobre o produto
      </Text>

      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value } }) => (
          <Input
            placeholder="Título do anúncio"
            onChangeText={onChange}
            value={value}
            errorMessage={errors.name}
            autoCapitalize="words"
          />
        )}
      />

      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, value } }) => (
          <Textarea
            placeholder="Descrição do anúncio"
            onChangeText={onChange}
            value={value}
            numberOfLines={3}
            errorMessage={errors.description}
          />
        )}
      />

      <Controller
        control={control}
        name="isNew"
        render={({ field: { value, onChange } }) => (
          <RadioGroup
            value={String(value)}
            onChange={onChange}
            className="flex-row gap-3"
          >
            <Radio label="Produto novo" value="true" />
            <Radio label="Produto usado" value="false" />
          </RadioGroup>
        )}
      />
    </VStack>
  )
}

/* eslint-disable prettier/prettier */
import { Avatar } from '@components/Avatar'
import { Badge } from '@components/Badge'
import { HStack } from '@components/ui/hstack'
import { Icon } from '@components/ui/icon'
import { Skeleton } from '@components/ui/skeleton'
import { Text } from '@components/ui/text'
import { VStack } from '@components/ui/vstack'
import { useProductDetails } from '@hooks/useProductDetails'
import { Bank, Barcode, CreditCard, Money, QrCode } from 'phosphor-react-native'
import { useMemo } from 'react'

export function Info() {
  const { product, isLoadingProduct } = useProductDetails()

  const getProductPriceFormatted = useMemo(() => {
    const productPrice = product?.price ?? 0
    return (productPrice / 100).toLocaleString('pt-BR')
  }, [product])

  if (isLoadingProduct) {
    return (
      <VStack className="gap-6 px-6 pb-6 pt-5">
        <Skeleton className="h-7 w-48" />

        <VStack className="gap-2">
          <Skeleton className="h-5 w-14" />

          <HStack className="items-start justify-between">
            <Skeleton className="w-48 h-9" />
            <Skeleton className="w-28 h-9" />
          </HStack>
        </VStack>

        <VStack className="gap-4">
          <Skeleton className="h-3" />
          <Skeleton className="h-3 w-2/3" />
          <Skeleton className="h-3 w-1/2" />
          <Skeleton className="h-3 w-5/12" />
        </VStack>

        <Skeleton className="h-3 w-24" />

        <VStack className="gap-2">
          <Skeleton className="h-3 w-44" />

          <Skeleton className="h-3 w-64" />
          <Skeleton className="h-3 w-64" />
          <Skeleton className="h-3 w-64" />
          <Skeleton className="h-3 w-64" />
          <Skeleton className="h-3 w-64" />
        </VStack>
      </VStack>
    )
  }

  return (
    <VStack className="gap-6 px-6 pb-12 pt-5">
      <HStack className="items-center gap-2">
        <Avatar uri={product.user.avatar} size="tiny" variants="branded" />
        <Text className="text-md">{product.user.name}</Text>
      </HStack>

      <VStack className="gap-2">
        <Badge
          label={product.is_new ? 'Novo' : 'Usado'}
          variant={product.is_new ? 'branded' : 'default'}
          className="self-start"
        />

        <HStack className="items-start justify-between">
          <Text className="text-3xl flex-1 tracking-tight leading-tight" bold>
            {product.name}
          </Text>

          <HStack className="items-baseline gap-1">
            <Text className="text-app-blue-light" bold>
              R$
            </Text>
            <Text className="text-app-blue-light text-3xl" bold>
              {getProductPriceFormatted}
            </Text>
          </HStack>
        </HStack>

        <Text className="text-app-gray-200 text-lg">{product.description}</Text>
      </VStack>

      <HStack className="gap-2">
        <Text className="text-app-gray-200 text-lg" bold>
          Aceita troca?
        </Text>

        <Text className="text-app-gray-200 text-lg">
          {product.accept_trade ? 'Sim' : 'Não'}
        </Text>
      </HStack>

      <VStack className="gap-2">
        <Text className="text-app-gray-200 text-lg" bold>
          Meios de pagamento:
        </Text>

        {product.payment_methods.map((item) => (
          <HStack key={item.key} className='items-center gap-2'>
            {item.key === 'boleto' && <Icon as={Barcode} className='fill-app-gray-200 stroke-none w-6 h-6' />}
            {item.key === 'pix' && <Icon as={QrCode} className='fill-app-gray-200 stroke-none w-6 h-6' />}
            {item.key === 'card' && <Icon as={CreditCard} className='fill-app-gray-200 stroke-none w-6 h-6' />}
            {item.key === 'deposit' && <Icon as={Bank} className='fill-app-gray-200 stroke-none w-6 h-6' />}
            {item.key === 'cash' && <Icon as={Money} className='fill-app-gray-200 stroke-none w-6 h-6' />}
            <Text className="text-app-gray-200 text-lg">{item.name}</Text>
          </HStack>
        ))}
      </VStack>
    </VStack>
  )
}

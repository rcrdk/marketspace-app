import { HStack } from '@components/ui/hstack'
import { Skeleton } from '@components/ui/skeleton'
import { Text } from '@components/ui/text'
import { VStack } from '@components/ui/vstack'
import { getUserProducts } from '@http/get-user-products'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import type { AppNavigatorRoutesProps } from '@routes/app.routes'
import { themeColors } from '@styles/colors'
import { AppError } from '@utils/AppError'
import { wait } from '@utils/wait'
import { ArrowRight, Tag } from 'phosphor-react-native'
import { useCallback, useState } from 'react'
import { Alert, Pressable } from 'react-native'

export function UserProducts() {
  const [isLoading, setIsLoading] = useState(true)
  const [productsCount, setProductsCount] = useState(0)

  const navigator = useNavigation<AppNavigatorRoutesProps>()

  function handleShowUserProducts() {
    navigator.navigate('products')
  }

  async function fetchUserProducts() {
    setIsLoading(true)

    try {
      await wait()

      const { data: products } = await getUserProducts({
        isActive: true,
      })

      setProductsCount(products.length)
    } catch (error) {
      let message =
        'Não foi possível carregar seus anúncios. Tente novamente mais tarde.'

      if (error instanceof AppError) {
        message = error.message
      }

      Alert.alert('Erro', message)
    } finally {
      setIsLoading(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchUserProducts()
    }, []),
  )

  return (
    <VStack className="gap-3">
      <Text className="text-app-gray-300" size="md">
        Seus produtos anunciados para venda
      </Text>

      <Pressable onPress={handleShowUserProducts}>
        <HStack className="bg-app-blue-soft-light p-4 rounded-md items-center">
          <Tag size={32} color={themeColors.blue} />

          <VStack className="flex-1 pl-3 pr-2">
            {isLoading ? (
              <Skeleton startColor="bg-app-gray-700" className="w-16 h-8" />
            ) : (
              <Text className="text-2xl" bold>
                {productsCount}
              </Text>
            )}
            <Text className="text-app-gray-300" size="sm">
              {productsCount === 1 ? 'anúncio ativo' : 'anúncios ativos'}
            </Text>
          </VStack>

          <HStack className="gap-2 items-center">
            <Text className="text-app-blue" bold size="sm">
              Meus anúncios
            </Text>
            <ArrowRight size={16} color={themeColors.blue} weight="bold" />
          </HStack>
        </HStack>
      </Pressable>
    </VStack>
  )
}

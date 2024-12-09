import { Avatar } from '@components/Avatar'
import { Button } from '@components/Button'
import { HStack } from '@components/ui/hstack'
import { Text } from '@components/ui/text'
import { VStack } from '@components/ui/vstack'
import { useAuth } from '@hooks/useAuth'
import { useNavigation } from '@react-navigation/native'
import type { AppNavigatorRoutesProps } from '@routes/app.routes'
import { themeColors } from '@styles/colors'
import { Plus } from 'phosphor-react-native'
import { useMemo } from 'react'

export function UserHeader() {
  const { user } = useAuth()
  const navigator = useNavigation<AppNavigatorRoutesProps>()

  const getUserFirstName = useMemo(() => {
    return user.name.split(' ').at(0)
  }, [user])

  function handleCreteNewProduct() {
    navigator.navigate('newProduct')
  }

  return (
    <HStack className="items-center justify-between gap-1">
      <HStack className="items-center gap-3">
        <Avatar uri={user.avatar} size="lead" variants="branded" />

        <VStack>
          <Text className="text-md color-app-gray-100">Boas vindas,</Text>
          <Text className="text-md color-app-gray-100" bold>
            {getUserFirstName}!
          </Text>
        </VStack>
      </HStack>

      <Button
        label="Criar anúncio"
        variants="primary"
        iconBefore={
          <Plus color={themeColors['gray-700']} weight="bold" size={16} />
        }
        className="px-4"
        onPress={handleCreteNewProduct}
      />
    </HStack>
  )
}

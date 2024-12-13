import BrandImage from '@assets/brand.png'
import { Button } from '@components/Button'
import { Input } from '@components/Input'
import { Box } from '@components/ui/box'
import { Text } from '@components/ui/text'
import { VStack } from '@components/ui/vstack'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '@hooks/useAuth'
import { useNavigation } from '@react-navigation/native'
import type { AuthNavigatorRoutesProps } from '@routes/auth.routes'
import { type SignInFormSchema, signInFormSchema } from '@schemas/signInSchema'
import { AppError } from '@utils/AppError'
import { wait } from '@utils/wait'
import { Eye, EyeSlash } from 'phosphor-react-native'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Alert, Image, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export function SignIn() {
  const [displayPassword, setDisplayPassword] = useState(false)

  const navigator = useNavigation<AuthNavigatorRoutesProps>()
  const { onSignIn } = useAuth()

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm<SignInFormSchema>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  function handleNavigateToSignUp() {
    navigator.navigate('signUp')
  }

  function handleToggleDisplayPassword() {
    setDisplayPassword((prev) => !prev)
  }

  async function handleSignInForm({ email, password }: SignInFormSchema) {
    try {
      await wait()
      await onSignIn({ email, password })
    } catch (error) {
      let message =
        'Não foi possível acessar sua conta. Tente novamente mais tarde.'

      if (error instanceof AppError) {
        message = error.message
      }

      Alert.alert('Erro', message)
    }
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      automaticallyAdjustKeyboardInsets
      showsVerticalScrollIndicator={false}
    >
      <Box className="flex-1 bg-app-gray-700">
        <Box className="flex-1 py-8 px-12 justify-evenly bg-app-gray-600 rounded-b-3xl">
          <Image
            source={BrandImage}
            defaultSource={BrandImage}
            className="w-[192px] h-[132px] self-center mb-12"
          />

          <VStack space="lg">
            <Text className="color-app-gray-200 text-center">
              Acesse sua conta
            </Text>

            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="E-mail"
                  keyboardType="email-address"
                  autoComplete="email"
                  autoCapitalize="none"
                  value={value}
                  onChangeText={onChange}
                  errorMessage={errors.email}
                  disabled={isSubmitting}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Senha"
                  keyboardType="visible-password"
                  icon={!displayPassword ? Eye : EyeSlash}
                  onIconPress={handleToggleDisplayPassword}
                  enterKeyHint="send"
                  secureTextEntry={!displayPassword}
                  autoComplete="password"
                  onSubmitEditing={handleSubmit(handleSignInForm)}
                  value={value}
                  onChangeText={onChange}
                  errorMessage={errors.password}
                  disabled={isSubmitting}
                />
              )}
            />

            <Button
              label="Entrar"
              variants="branded"
              className="mt-6"
              onPress={handleSubmit(handleSignInForm)}
              disabled={isSubmitting}
              loading={isSubmitting}
            />
          </VStack>
        </Box>

        <Box className="py-12 px-12">
          <SafeAreaView edges={['bottom', 'left', 'right']}>
            <VStack space="md">
              <Text className="color-app-gray-200 text-center">
                Ainda não tem acesso?
              </Text>

              <Button
                label="Criar uma conta"
                variants="secondary"
                onPress={handleNavigateToSignUp}
              />
            </VStack>
          </SafeAreaView>
        </Box>
      </Box>
    </ScrollView>
  )
}

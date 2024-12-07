import BrandImage from '@assets/brand-icon.png'
import { Avatar, type AvatarFile } from '@components/Avatar'
import { Button } from '@components/Button'
import { Input } from '@components/Input'
import { Box } from '@components/ui/box'
import { Text } from '@components/ui/text'
import { VStack } from '@components/ui/vstack'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigation } from '@react-navigation/native'
import type { AuthNavigatorRoutesProps } from '@routes/auth.routes'
import { type SignUpFormSchema, signUpFormSchema } from '@schemas/signUpSchema'
import { wait } from '@utils/wait'
import { Eye, EyeSlash } from 'phosphor-react-native'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Image, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export function SignUp() {
  const [displayPassword, setDisplayPassword] = useState(false)
  const [displayConfirmPassword, setDisplayConfirmPassword] = useState(false)
  const [avatarSelected, setAvatarSelected] = useState<AvatarFile>()

  const navigator = useNavigation<AuthNavigatorRoutesProps>()

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm<SignUpFormSchema>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirm_password: '',
    },
  })

  function handleNavigateToSignIn() {
    navigator.goBack()
  }

  function handleToggleDisplayPassword(field: 'password' | 'confirmation') {
    if (field === 'password') setDisplayPassword((prev) => !prev)
    if (field === 'confirmation') setDisplayConfirmPassword((prev) => !prev)
  }

  async function handleSelectAvatar(avatar?: AvatarFile) {
    setAvatarSelected(avatar)
  }

  /**
   * To be implemented
   */
  async function handleSignUpForm(data: SignUpFormSchema) {
    try {
      await wait()
      // first try to save user data
      // then the avatar, in case avatar goes wrong
      console.log(data)
      console.log(avatarSelected)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      automaticallyAdjustKeyboardInsets
      showsVerticalScrollIndicator={false}
    >
      <SafeAreaView className="flex-1">
        <Box className="flex-1 py-12 px-12 justify-between">
          <VStack>
            <Image
              source={BrandImage}
              className="w-[60px] h-[40px] self-center"
            />

            <Text className="text-center text-2xl text-app-gray-100 my-2" bold>
              Boas vindas!
            </Text>
            <Text className="text-center text-md text-gray-200 leading-6">
              Crie sua conta e use o espaço para comprar itens variados e vender
              seus produtos
            </Text>
          </VStack>

          <VStack space="lg" className="py-12">
            <Avatar
              avatar={avatarSelected?.uri}
              onSelectAvatar={handleSelectAvatar}
            />

            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Nome"
                  autoComplete="name"
                  autoCapitalize="words"
                  value={value}
                  onChangeText={onChange}
                  errorMessage={errors.name?.message}
                  disabled={isSubmitting}
                />
              )}
            />

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
                  errorMessage={errors.email?.message}
                  disabled={isSubmitting}
                />
              )}
            />

            <Controller
              control={control}
              name="phone"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Telefone"
                  keyboardType="phone-pad"
                  value={value}
                  onChangeText={onChange}
                  errorMessage={errors.phone?.message}
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
                  onIconPress={() => handleToggleDisplayPassword('password')}
                  enterKeyHint="send"
                  secureTextEntry={!displayPassword}
                  autoComplete="new-password"
                  onSubmitEditing={handleSubmit(handleSignUpForm)}
                  value={value}
                  onChangeText={onChange}
                  errorMessage={errors.password?.message}
                  disabled={isSubmitting}
                />
              )}
            />

            <Controller
              control={control}
              name="confirm_password"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Confirmar senha"
                  keyboardType="visible-password"
                  icon={!displayConfirmPassword ? Eye : EyeSlash}
                  onIconPress={() =>
                    handleToggleDisplayPassword('confirmation')
                  }
                  enterKeyHint="send"
                  secureTextEntry={!displayConfirmPassword}
                  autoComplete="new-password"
                  onSubmitEditing={handleSubmit(handleSignUpForm)}
                  value={value}
                  onChangeText={onChange}
                  errorMessage={errors.confirm_password?.message}
                  disabled={isSubmitting}
                />
              )}
            />

            <Button
              label="Criar conta"
              variants="primary"
              className="mt-6"
              onPress={handleSubmit(handleSignUpForm)}
              disabled={isSubmitting}
              loading={isSubmitting}
            />
          </VStack>

          <VStack space="md">
            <Text className="color-app-gray-200 text-center">
              Já tem uma conta?
            </Text>

            <Button
              label="Ir para o Login"
              variants="secondary"
              onPress={handleNavigateToSignIn}
            />
          </VStack>
        </Box>
      </SafeAreaView>
    </ScrollView>
  )
}

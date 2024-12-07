import { themeColors } from '@styles/colors'
import * as FileSystem from 'expo-file-system'
import * as ImagePicker from 'expo-image-picker'
import mime from 'mime'
import { Pencil, User } from 'phosphor-react-native'
import { Alert } from 'react-native'

import { Avatar as AvatarContainer, AvatarImage } from './ui/avatar'
import { Box } from './ui/box'
import { Pressable } from './ui/pressable'

export type AvatarFile = {
  name: string
  uri: string
  type: string
}

type Props = {
  avatar?: string
  onSelectAvatar: (avatar: AvatarFile) => Promise<AvatarFile | any>
}

export function AvatarSelector({ avatar, onSelectAvatar }: Props) {
  async function handleSelectAvatarImage(): Promise<AvatarFile | any> {
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      })

      if (photoSelected.canceled) return

      const photoURI = photoSelected.assets[0].uri

      if (!photoURI) return

      const photoInfo = (await FileSystem.getInfoAsync(photoURI)) as {
        size: number
      }

      if (photoInfo.size && photoInfo.size / 1024 / 1024 > 5) {
        return Alert.alert(
          'Imagem grande',
          'A imagem selecionada é muito grande. Escolha outra com até 5MB.',
        )
      }

      const fileExtension = photoURI.split('.').at(-1)
      const fileNameExtractor = photoURI.split('/').at(-1)!
      const fileName = fileNameExtractor
        .split('.')
        .at(0)!
        .replaceAll(' ', '-')
        .normalize('NFC')
        .toLowerCase()

      const avatarFile: AvatarFile = {
        name: `${fileName}.${fileExtension}`,
        uri: photoURI,
        type: mime.getType(photoSelected.assets[0].uri) ?? '',
      }

      onSelectAvatar(avatarFile)
    } catch {
      const message =
        'Não foi possível atualizar seu avatar. Tente novamente mais tarde.'

      Alert.alert('Erro', message)
    }
  }

  return (
    <Pressable
      className="self-center mb-1 relative"
      onPress={handleSelectAvatarImage}
    >
      <AvatarContainer className="bg-app-gray-700" size="2xl">
        {avatar && <AvatarImage source={{ uri: avatar }} className="z-10" />}
        <User size={56} color={themeColors['gray-500']} />
      </AvatarContainer>

      <Box className="border-2 border-app-gray-600 z-20 flex items-center justify-center w-12 h-12 absolute bottom-0 right-0 rounded-full bg-app-blue">
        <Pencil color={themeColors['gray-700']} />
      </Box>
    </Pressable>
  )
}

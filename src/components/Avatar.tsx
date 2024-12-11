import { API } from '@services/api'
import { themeColors } from '@styles/colors'
import { User } from 'phosphor-react-native'

import { Avatar as AvatarContainer, AvatarImage } from './ui/avatar'

type Props = {
  uri?: string
  size: 'tiny' | 'lead'
  variants: 'branded' | 'light'
  className?: string
}

export function Avatar({ uri, size, variants, className }: Props) {
  return (
    <AvatarContainer
      className={`border-2 ${variants === 'branded' ? 'border-app-blue-light bg-app-blue-light' : 'border-app-gray-700 bg-app-gray-700'} ${className ?? ''}`}
      size={size === 'lead' ? 'md' : 'xs'}
    >
      {uri && (
        <AvatarImage
          source={{ uri: `${API.defaults.baseURL}/images/${uri}` }}
          className="z-10"
        />
      )}
      <User
        size={size === 'lead' ? 28 : 14}
        color={themeColors[variants === 'branded' ? 'gray-700' : 'gray-500']}
      />
    </AvatarContainer>
  )
}

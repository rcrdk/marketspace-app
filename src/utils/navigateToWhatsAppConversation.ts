import { Alert, Linking, Platform } from 'react-native'

export async function navigateToWhatsAppConversation(
  phone: string,
  message?: string,
) {
  const phoneWithOnlyNumbers = parseInt(phone.replace(/\D+/g, ''))
  const phoneWithSymbolByOS =
    Platform.OS === 'ios' ? phoneWithOnlyNumbers : `+${phoneWithOnlyNumbers}`

  const formattedURL = `whatsapp://send?phone=${phoneWithSymbolByOS}&text=${encodeURI(message ?? '')}`

  try {
    await Linking.openURL(formattedURL)
  } catch {
    Alert.alert(
      'Erro',
      'Não foi possível abrir o WhatsApp. Verifique se você tem o aplicativo instalado e tente novamente.',
    )
  }
}

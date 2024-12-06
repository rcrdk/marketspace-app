import {
  type BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs'
import { Home } from '@screens/Home'
import { Products } from '@screens/Products'
import { themeColors } from '@styles/colors'
import { House, SignOut, Tag } from 'phosphor-react-native'
import { Alert, Platform } from 'react-native'

type AppRoutesType = {
  home: undefined
  products: undefined
  signOut: undefined
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutesType>

const { Navigator, Screen } = createBottomTabNavigator<AppRoutesType>()

const SignOutComponent = () => null

function handleSignOut() {
  Alert.alert('Sair do app', 'Deseja mesmo finalizar a sessão?', [
    { style: 'cancel', text: 'Cancelar' },
    { style: 'destructive', text: 'Sair', onPress: () => {} },
  ])
}

export function AppRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: themeColors['gray-200'],
        tabBarInactiveTintColor: themeColors['gray-400'],
        tabBarStyle: {
          paddingTop: 16,
          paddingBottom: 16,
          alignItems: 'center',
          borderTopWidth: 0,
          backgroundColor: themeColors['gray-700'],
          height: Platform.OS === 'ios' ? 96 : 'auto',
        },
      }}
    >
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => <House color={color} size={size} />,
        }}
      />

      <Screen
        name="products"
        component={Products}
        options={{
          tabBarIcon: ({ color, size }) => <Tag color={color} size={size} />,
        }}
      />

      <Screen
        name="signOut"
        component={SignOutComponent}
        options={{
          tabBarInactiveTintColor: themeColors['gray-100'],
          tabBarIcon: ({ size }) => (
            <SignOut color={themeColors['red-light']} size={size} />
          ),
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault()
            handleSignOut()
          },
        }}
      />
    </Navigator>
  )
}

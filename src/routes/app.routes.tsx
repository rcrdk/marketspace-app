import { useAuth } from '@hooks/useAuth'
import {
  type BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs'
import { Home } from '@screens/Home'
import { ProductDetails } from '@screens/ProductDetails'
import { ProductForm } from '@screens/ProductForm'
import { Products } from '@screens/Products'
import { themeColors } from '@styles/colors'
import { House, SignOut, Tag } from 'phosphor-react-native'
import { Alert, Platform } from 'react-native'

type AppRoutesType = {
  home: undefined
  products: undefined
  signOut: undefined
  productForm: {
    id?: string
  }
  productDetails: {
    id?: string
    preview: boolean
  }
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutesType>

const { Navigator, Screen } = createBottomTabNavigator<AppRoutesType>()

const SignOutComponent = () => null

export function AppRoutes() {
  const { onSignOut } = useAuth()

  function handleSignOut() {
    Alert.alert('Sair do app', 'Deseja mesmo finalizar a sessão?', [
      { style: 'cancel', text: 'Cancelar' },
      { style: 'destructive', text: 'Sair', onPress: () => onSignOut() },
    ])
  }

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

      <Screen
        name="productForm"
        component={ProductForm}
        options={{
          tabBarButton: () => <></>,
          tabBarItemStyle: { display: 'none' },
          tabBarStyle: {
            display: 'none',
          },
        }}
      />

      <Screen
        name="productDetails"
        component={ProductDetails}
        options={{
          tabBarButton: () => <></>,
          tabBarItemStyle: { display: 'none' },
          tabBarStyle: {
            display: 'none',
          },
        }}
      />
    </Navigator>
  )
}

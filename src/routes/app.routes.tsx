import { useAuth } from '@hooks/useAuth'
import {
  type BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Home } from '@screens/Home'
import { ProductDetails } from '@screens/ProductDetails'
import { ProductForm } from '@screens/ProductForm'
import { Products } from '@screens/Products'
import { themeColors } from '@styles/colors'
import { House, SignOut, Tag } from 'phosphor-react-native'
import { Alert, Platform } from 'react-native'

type AppStackRoutesType = {
  mainTabs: undefined
  productForm: {
    id?: string
  }
  productDetails: {
    id?: string
    preview: boolean
  }
}

type AppTabsRoutesType = {
  home: undefined
  products: undefined
  signOut: undefined
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<
  AppStackRoutesType & AppTabsRoutesType
>

const Stack = createNativeStackNavigator<AppStackRoutesType>()
const Tab = createBottomTabNavigator<AppTabsRoutesType>()

function MainTabs() {
  const { onSignOut } = useAuth()

  function handleSignOut() {
    Alert.alert('Sair do app', 'Deseja mesmo finalizar a sessão?', [
      { style: 'cancel', text: 'Cancelar' },
      { style: 'destructive', text: 'Sair', onPress: () => onSignOut() },
    ])
  }

  return (
    <Tab.Navigator
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
      <Tab.Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => <House color={color} size={size} />,
        }}
      />

      <Tab.Screen
        name="products"
        component={Products}
        options={{
          tabBarIcon: ({ color, size }) => <Tag color={color} size={size} />,
        }}
      />

      <Tab.Screen
        name="signOut"
        component={() => <></>}
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
    </Tab.Navigator>
  )
}

export function AppRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="mainTabs"
        component={MainTabs}
        options={{ headerShown: false }}
      />

      <Stack.Screen name="productForm" component={ProductForm} />
      <Stack.Screen name="productDetails" component={ProductDetails} />
    </Stack.Navigator>
  )
}

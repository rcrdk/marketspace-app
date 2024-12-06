import {
  createNativeStackNavigator,
  type NativeStackNavigationProp,
} from '@react-navigation/native-stack'
import { SignIn } from '@screens/SignIn'
import { SignUp } from '@screens/SignUp'

type AuthRoutesType = {
  signIn: undefined
  signUp: undefined
}

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutesType>()

export type AuthNavigatorRoutesProps = NativeStackNavigationProp<AuthRoutesType>

export function AuthRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="signIn" component={SignIn} />
      <Screen name="signUp" component={SignUp} />
    </Navigator>
  )
}

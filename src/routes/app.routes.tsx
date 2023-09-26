import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Groups } from '@screens/Groups'
import { Players } from '@screens/Players'
import { NewGroup } from '@screens/NewGroup'


const NativeStack = createNativeStackNavigator()

export function AppRoutes() {
  return (
    <NativeStack.Navigator>
      <NativeStack.Screen
        name='groups'
        component={Groups}
      />

      <NativeStack.Screen
        name='new'
        component={NewGroup}
      />

      <NativeStack.Screen
        name='players'
        component={Players}
      />
    </NativeStack.Navigator>
  )
}
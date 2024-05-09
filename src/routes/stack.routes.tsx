import { createNativeStackNavigator } from "@react-navigation/native-stack";


import TabRoutes from "./tab.routes";
import Profile from "../screens/Profile";
import Notes from "../screens/Notes";

const Stack = createNativeStackNavigator();

export default function StackRoutes() {
  return (
    <Stack.Navigator screenOptions={{title:''}}>
      <Stack.Screen
        name="profile"
        component={Profile}

      />
      <Stack.Screen
        name="notes"
        component={Notes}
      />
    </Stack.Navigator>
  );
}

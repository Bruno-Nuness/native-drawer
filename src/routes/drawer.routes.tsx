import { createDrawerNavigator } from "@react-navigation/drawer";
import { Feather } from "@expo/vector-icons";

import TabRoutes from "./tab.routes";
import StackRoutes from "./stack.routes";
import Notes from "../screens/Notes";
const Drawer = createDrawerNavigator();

export default function DrawerRoutes() {
  return (
    <Drawer.Navigator screenOptions={{ title: "" }}>
      <Drawer.Screen
        name="home"
        component={TabRoutes}
        options={{
          drawerIcon: ({ color, size }) => (
            <Feather name="home" color={color} size={size} />
          ),
          drawerLabel: "Inicio",
        }}
      />
      <Drawer.Screen
        name="profile"
        component={StackRoutes}
        options={{
          drawerIcon: ({ color, size }) => (
            <Feather name="user" color={color} size={size} />
          ),
          drawerLabel: "Meu perfil",
        }}
      />
      <Drawer.Screen
        name="notes"
        component={Notes}
        options={{
          drawerIcon: ({ color, size }) => (
            <Feather name="archive" color={color} size={size} />
          ),
          drawerLabel: "Minhas notas",
        }}
      />
    </Drawer.Navigator>
  );
}

// Routes.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import DrawerRoutes from "./drawer.routes";

export default function Routes() {
  return (
    <NavigationContainer>
      <DrawerRoutes />
    </NavigationContainer>
  );
}

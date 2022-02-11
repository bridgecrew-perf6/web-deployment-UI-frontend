import Homepage from "./screens/Homepage";
import Website from "./screens/Website";
import {NavigationContainer} from "@react-navigation/native";
import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import CommandRunning from "./screens/CommandRunning";

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={Homepage}
                    options={{ title: 'Welcome' }}
                />
                <Stack.Screen
                    name="Website"
                    component={Website}
                    options={{ title: 'Website', website: '' }}
                />
                <Stack.Screen
                    name="CommandRunning"
                    component={CommandRunning}
                    options={{ title: 'Running Command', website: '' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
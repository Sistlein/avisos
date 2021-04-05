import React, { Component } from 'react';
import { DrawerStack } from './src/navigation'
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native'
import { Login, AvisosCerrados, Avisos } from './src/screens'
import { Fecha } from './src/component'


const Stack = createStackNavigator();

class App extends Component {
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false
                    }}
                    initialRouteName={'Login'}
                >
                    <Stack.Screen
                        name="Login"
                        component={Login} />
                    <Stack.Screen
                        name="DrawerNavigator"
                        component={DrawerStack}
                    />

                </Stack.Navigator>
            </NavigationContainer>

        )
    }
}
export default App;
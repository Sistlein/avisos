import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {Avisos} from "../screens";


const Stack = createStackNavigator();

function StackAvisos() {
    return (
            <Stack.Navigator>
                <Stack.Screen
                    name="Avisos"
                    component={Avisos}
                    options={{
                        headerShown: false,
                    }}
                    
                />
            </Stack.Navigator>
    );
}

export default StackAvisos;
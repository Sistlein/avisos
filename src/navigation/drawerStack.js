import React, { Component } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {Avisos, AvisosCerrados,AvisosPendientes,Home} from "../screens";
import AsyncStorage from '@react-native-community/async-storage'
import { BackHandler } from 'react-native'
const Drawer = createDrawerNavigator();
class DrawerNavigator extends Component{
  constructor(props){
    super(props)
  }
  render(){
  const tipo=this.props.route.params.tipo
  console.log(this.props.route.params.tipo)
  
  if (tipo==='tecnico'){
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Cerrar Avisos" component={Avisos} />
      <Drawer.Screen name="Avisos Cerrados" component={AvisosCerrados} />
      <Drawer.Screen name="Avisos Pendientes" component={AvisosPendientes} />
      <Drawer.Screen name="Salir" component={salir} />
    </Drawer.Navigator>
  );
}else{
  return (
  <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Avisos Cerrados" component={AvisosCerrados} />
      <Drawer.Screen name="Avisos Pendientes" component={AvisosPendientes} />
      <Drawer.Screen name="Salir" component={salir} />
    </Drawer.Navigator>
  )
}
  }
};
export default DrawerNavigator;

const salir = () => {
  async function eliminar(){
    try {
      await AsyncStorage.removeItem('user_id')
      console.log('e')
      BackHandler.exitApp();
    }
    catch(exception){
      console.log(exception)
    }
  }
  eliminar()
  
  return null;
}
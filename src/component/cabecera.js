import React, { Component } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text
} from 'react-native';


class Cabecera extends Component {

  render() {
    const { texto, navigation } = this.props;
    if (texto === '') {
      return (
        <View style={{ flexDirection: 'row', }}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Image source={require('../images/menu.png')} style={{ height: 45, width: 45, margin: 10 }} />
          </TouchableOpacity>
          <Image resizeMode='contain' style={{ width: 280, height: 60, alignSelf: 'center' }} source={require('../images/logogrande.png')} />
        </View>
      )
    } else {
      return (
        <View>
          <View style={{ flexDirection: 'row', }}>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Image source={require('../images/menu.png')} style={{ height: 45, width: 45, margin: 10 }} />
            </TouchableOpacity>
            <Image resizeMode='contain' style={{ width: 280, height: 60, alignSelf: 'center' }} source={require('../images/logogrande.png')} />

          </View>
          <Text style={{ alignSelf: 'center', fontSize: 25, fontWeight: 'bold' }}>{texto}</Text>
        </View>
      );
    }
  }
};

export default Cabecera;
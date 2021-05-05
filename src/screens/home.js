import React, { Component } from 'react'
import { ImageBackground, View } from 'react-native'
import {Cabecera} from '../component'

export default class Home extends Component {
    render() {
        console.log('estamos en home')
        return (
            <View style={{ flex: 1 }}>
                <Cabecera navigation={this.props.navigation} texto='' />
                <ImageBackground source={{ uri: 'https://sistelin.es/wp-content/uploads/2019/05/cropped-Sistelin-2.jpg' }}
                    style={{ flex: 1, resizeMode: "cover", justifyContent: "center" }}>
                </ImageBackground>
            </View>
        );
    }
}
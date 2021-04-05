import React, { Component } from "react"
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    Button
} from 'react-native'

export default class Equipo extends Component {
    ocultar = () => {
        this.props.ocultar()
      }
    render() {
        return (
            <Modal
                transparent={true}
                visible={!this.props.visible}
            >
                <View style={{ backgroundColor: '#000000aa', flex: 1 }}>
                    <View style={{ backgroundColor: '#ffffff', margin: 50, padding: 20 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10 }}>
                            Equipo
                            </Text>
                        <Text style={{ fontSize: 15, marginHorizontal: 10 }}>
                            Portatil
                            </Text>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10 }}>
                            Marca
                            </Text>
                        <Text style={{ fontSize: 15, marginHorizontal: 10 }}>
                            Hp
                            </Text>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10 }}>
                            Modelo
                            </Text>
                        <Text style={{ fontSize: 15, marginHorizontal: 10 }}>
                            elitebook
                            </Text>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10 }}>
                            Serial Number
                            </Text>
                        <Text style={{ fontSize: 15, marginHorizontal: 10 }}>
                            CNC125487D
                            </Text>
                            <TouchableOpacity
                            style={{ marginTop: 20 }}>
                            <Button
                                onPress={() => this.ocultar()}
                                title="Cerrar"
                                color="#841584"
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        )
    }
}
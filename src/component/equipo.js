import React, { Component } from "react"
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    Button
} from 'react-native'
import firestore from '@react-native-firebase/firestore'

export default class Equipo extends Component {
    constructor(props) {
        super(props);
        this.state = {
          equipo:{}
        }
      }
    ocultar = () => {
        this.props.ocultar()
      }

      async componentDidMount() {
        firestore().collection('equipos').doc(this.props.equipo).onSnapshot((equipos) => {
                this.setState({equipo:equipos.data()})
        })
    }

    render() {
        const {equipo}=this.state
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
                            {equipo.tipo}
                            </Text>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10 }}>
                            Marca
                            </Text>
                        <Text style={{ fontSize: 15, marginHorizontal: 10 }}>
                            {equipo.marca}
                            </Text>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10 }}>
                            Modelo
                            </Text>
                        <Text style={{ fontSize: 15, marginHorizontal: 10 }}>
                            {equipo.modelo}
                            </Text>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10 }}>
                            Serial Number
                            </Text>
                        <Text style={{ fontSize: 15, marginHorizontal: 10 }}>
                            {equipo.sn}
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
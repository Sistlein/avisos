import React,{ Component } from "react"
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    Button
} from 'react-native'
import {Cliente,Equipo} from './'

export default class Averia extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hideCliente: true,
            hideEquipo: true,
        }
    }
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
                    <TouchableOpacity
                        onPress={() => this.setState({ hideCliente: false })}
                    >
                            <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10 }}>
                                Nombre Cliente
                            </Text>
                            <Text style={{ fontSize: 15, marginHorizontal: 10 }}>
                                Sistelin
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                        onPress={() => this.setState({ hideEquipo: false })}
                    >
                            <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10 }}>
                                Datos de Equipo
                            </Text>
                        </TouchableOpacity>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10 }}>
                            Averia
                            </Text>
                        <Text style={{ fontSize: 15, marginHorizontal: 10 }}>
                            No enciende
                            </Text>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10 }}>
                            Entrada
                            </Text>
                        <Text style={{ fontSize: 15, marginHorizontal: 10 }}>
                            21/12/12
                            </Text>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10 }}>
                            Salida
                            </Text>
                        <Text style={{ fontSize: 15, marginHorizontal: 10 }}>
                            21/12/12
                            </Text>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10 }}>
                            Solucion
                            </Text>
                        <Text style={{ fontSize: 15, marginHorizontal: 10 }}>
                            Cambio de fuente
                            </Text>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10 }}>
                            Firma
                            </Text>
                        <Text style={{ fontSize: 15, marginHorizontal: 10 }}>
                            Imagen de firma
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
                <Cliente visible={this.state.hideCliente} ocultar={this.ocultarCliente} />
                <Equipo visible={this.state.hideEquipo} ocultar={this.ocultarEquipo} />
                </Modal>
        )
    }
    
    ocultarCliente = () => {
        this.setState({
            hideCliente: true
        })
    }

    ocultarEquipo = () => {
        this.setState({
            hideEquipo: true
        })
    }
}
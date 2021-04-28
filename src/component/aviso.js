import { Component } from "react";
import { View, Text, TouchableOpacity } from 'react-native'
import { Fecha, Cliente, Firma,  Equipo } from '../component'



export default class Aviso extends Component {
    render() {
        return (
            <View>
                <View>
                    <TouchableOpacity
                        onPress={() => this.setState({ hideCliente: false })}
                    >
                        <View style={{ marginHorizontal: 20, margin: 10 }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                                Cliente
                    </Text>
                            <Text style={{ marginHorizontal: 30 }}>
                                Nombre de cliente
                    </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.setState({ hideEquipo: false })}
                    >

                        <Text style={{ marginHorizontal: 20, margin: 10, fontSize: 20, fontWeight: 'bold' }}>
                            Datos Equipo
                    </Text>
                    </TouchableOpacity>
                </View>

                <Text style={{ fontSize: 20, fontWeight: 'bold', marginHorizontal: 20, margin: 10 }}>Averia</Text>
                <Text style={{ marginHorizontal: 30 }}>{aviso.averia}</Text>

                <View>
                    <View style={{ width: '100%' }}>
                        <TouchableOpacity onPress={() => this.setState({ showEntrada: true })}>
                            <Fecha visible={this.state.showEntrada} tipo='Entrada:' ocultar={this.ocultarEntrada} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.setState({ showSalida: true })}>
                            <Fecha visible={this.state.showSalida} tipo='Salida:' ocultar={this.ocultarSalida} />

                        </TouchableOpacity>
                    </View>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginHorizontal: 20, margin: 10 }}>Descripcion</Text>
                    <TextInput
                        multiline={true}
                        style={{
                            height: 200,
                            marginHorizontal: 30,
                            marginVertical: 10,
                            borderWidth: 1,
                            textAlignVertical: 'top'
                        }} />
                    <Firma />
                    <View style={{ marginHorizontal: 30, marginBottom: 20 }}>
                        <Button title="Grabar" onPress={() => this.grabar()} />
                    </View>
                </View>
                <Modal
                transparent={true}
                visible={!this.props.visible}
            >
                <View style={{ backgroundColor: '#000000aa', flex: 1 }}>
                    <View style={{ backgroundColor: '#ffffff', margin: 50, padding: 20 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10 }}>
                            Nombre de cliente
                            </Text>
                        <Text style={{ fontSize: 15, marginHorizontal: 10 }}>
                            {cliente.nombre}
                        </Text>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10 }}>
                            Dirección
                            </Text>
                        <Text style={{ fontSize: 15, marginHorizontal: 10 }}>
                            {cliente.direccion}
                        </Text>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10 }}>
                            Localidad
                            </Text>
                        <Text style={{ fontSize: 15, marginHorizontal: 10 }}>
                            {cliente.localidad} ({cliente.provincia})
                            </Text>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10 }}>
                            Telefono
                            </Text>
                        <Text style={{ fontSize: 15, marginHorizontal: 10 }}>
                            {cliente.telefono}
                        </Text>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10 }}>
                            E-mail
                            </Text>
                        <Text style={{ fontSize: 15, marginHorizontal: 10 }}>
                            {cliente.email}
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
                <Equipo equipo={aviso.equipo} visible={this.state.hideEquipo} ocultar={this.ocultarEquipo} />
            </View>
        )
    }
}
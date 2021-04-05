import React, { Component } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Button,
    TextInput,
    ScrollView
} from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';
import { Fecha, Cliente, Equipo, Firma, Cabecera } from '../component'

export default class Avisos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            aviso: '',
            hideCliente: true,
            hideEquipo: true,
            showEntrada: false,
            showSalida: false,
            entrada: new Date(),
            salida: new Date(),
        }
    }
    render() {
        console.log(this.state.showEntrada)
        return (
            <View>
                <Cabecera navigation={this.props.navigation} texto='Cerrar Averia' />
                <ScrollView style={{ marginBottom: 100 }}>
                    <View>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', margin: 20 }}>Seleccione el aviso a cumplimentar</Text>
                        <View style={{ marginHorizontal: 30 }}>
                            <DropDownPicker
                                placeholder="seleccione un aviso"
                                items={[
                                    { label: '1234', value: '1234' },
                                    { label: '4567', value: '4567' },
                                    { label: '2523', value: '2524', },
                                ]}
                                containerStyle={{ height: 40 }}
                                style={{ backgroundColor: '#fafafa' }}
                                itemStyle={{
                                    justifyContent: 'flex-start'
                                }}
                                dropDownStyle={{ backgroundColor: '#fafafa' }}
                                onChangeItem={item => this.setState({
                                    aviso: item.value
                                })}
                            />
                        </View>
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
                        <Text style={{ marginHorizontal: 30 }}>probando el texto de una averia que puede ser uqe algo falla</Text>

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

                        <Cliente visible={this.state.hideCliente} ocultar={this.ocultarCliente} />
                        <Equipo visible={this.state.hideEquipo} ocultar={this.ocultarEquipo} />
                    </View>
                </ScrollView>
            </View>
        )
    }

    grabar() {
        console.log(this.state.entrada + '---' + this.state.salida)
        if (this.state.salida > this.state.entrada) {
            alert('salida mayor')
        } else {
            alert('salida menor')
        }
    }
    ocultarCliente = () => {
        this.setState({
            hideCliente: true
        })
    }
    ocultarEntrada = (selectedDate) => {
        this.setState({
            showEntrada: false,
            entrada: selectedDate
        })
    }
    ocultarSalida = (selectedDate) => {
        this.setState({
            showSalida: false,
            salida: selectedDate
        })
    }

    ocultarEquipo = () => {
        this.setState({
            hideEquipo: true
        })
    }
}

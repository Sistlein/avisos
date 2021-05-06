import React, { Component } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Button,
    TextInput,
    ScrollView,
    Modal
} from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';
import { Fecha, Firma, Cabecera } from '../component'
import firestore from '@react-native-firebase/firestore'

export default class Avisos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            avisos: [],
            numeroAviso: '',
            aviso: {},
            hideCliente: true,
            hideEquipo: true,
            showEntrada: false,
            showSalida: false,
            firmado: false,
        }
    }

    async componentDidMount() {
        firestore().collection("avisos").where("salida", "==", "").onSnapshot((avisos) => {
            const avisosCerrados = []
            avisos.forEach(aviso => {
                avisosCerrados.push({ label: aviso.data().numero, value: aviso.data().numero })
            })
            this.setState({ avisos: avisosCerrados })
        })
    }

    async cargarAviso() {
        console.log(this.state.numeroAviso)
        firestore().collection("avisos").where("numero", "==", this.state.numeroAviso).onSnapshot((avisos) => {
            avisos.forEach(aviso => {
                console.log(aviso.data())
                this.setState({ aviso: aviso.data() })
            })
        })
    }


    render() {
        const { aviso } = this.state
        return (
            <View>
                <Cabecera navigation={this.props.navigation} texto='Cerrar Averia' />
                <ScrollView style={{ marginBottom: 100 }}>
                    <View>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', margin: 20 }}>Seleccione el aviso a cumplimentar</Text>
                        <View style={{ marginHorizontal: 30 }}>
                            <DropDownPicker
                                //defaultValue={this.state.avisos[0].value}
                                placeholder="seleccione un aviso"
                                items={this.state.avisos}
                                containerStyle={{ height: 40 }}
                                style={{ backgroundColor: '#fafafa' }}
                                itemStyle={{
                                    justifyContent: 'flex-start'
                                }}
                                dropDownStyle={{ backgroundColor: '#fafafa' }}
                                onChangeItem={item => {
                                    this.setState({
                                        numeroAviso: item.value
                                    }, () => {
                                        this.cargarAviso()
                                    })
                                }
                                }
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
                                        {this.state.aviso.nombre
                                        }
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
                                value={this.state.aviso.descripcion}
                                onChangeText={(descripcion) => {
                                    this.setState({
                                        aviso: {
                                            ...this.state.aviso,
                                            descripcion: descripcion
                                        }
                                    })
                                }}
                                style={{
                                    height: 200,
                                    marginHorizontal: 30,
                                    marginVertical: 10,
                                    borderWidth: 1,
                                    textAlignVertical: 'top'
                                }} />
                            <Firma aviso={aviso.numero} signed={() => this.signed()} ref={element => { this.firma = element }} />
                            <View style={{
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'space-between', 
                                marginHorizontal: 30, 
                                marginBottom: 20
                            }}>
                                {this.botonGrabar()}<Button title="Reset Firma" onPress={() => {
                                    this.firma.resetSign()
                                    this.setState({ firmado: false })
                                }} />
                            </View>
                        </View>
                        <Modal
                            transparent={true}
                            visible={!this.state.hideCliente}
                        >
                            <View style={{ backgroundColor: '#000000aa', flex: 1 }}>
                                <View style={{ backgroundColor: '#ffffff', margin: 50, padding: 20 }}>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10 }}>
                                        Nombre de cliente
                            </Text>
                                    <Text style={{ fontSize: 15, marginHorizontal: 10 }}>
                                        {console.log(this.state.cliente),
                                            this.state.aviso.nombre}
                                    </Text>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10 }}>
                                        Dirección
                            </Text>
                                    <Text style={{ fontSize: 15, marginHorizontal: 10 }}>
                                        {this.state.aviso.direccion}
                                    </Text>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10 }}>
                                        Localidad
                            </Text>
                                    <Text style={{ fontSize: 15, marginHorizontal: 10 }}>
                                        {this.state.aviso.localidad}
                                    </Text>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10 }}>
                                        Telefono
                            </Text>
                                    <Text style={{ fontSize: 15, marginHorizontal: 10 }}>
                                        {this.state.aviso.telefono}
                                    </Text>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10 }}>
                                        E-mail
                            </Text>
                                    <Text style={{ fontSize: 15, marginHorizontal: 10 }}>
                                        {this.state.aviso.email}
                                    </Text>
                                    <TouchableOpacity
                                        style={{ marginTop: 20 }}>
                                        <Button
                                            onPress={() => this.setState({ hideCliente: true })}
                                            title="Cerrar"
                                            color="#841584"
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>
                        <Modal
                            transparent={true}
                            visible={!this.state.hideEquipo}
                        >
                            <View style={{ backgroundColor: '#000000aa', flex: 1 }}>
                                <View style={{ backgroundColor: '#ffffff', margin: 50, padding: 20 }}>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10 }}>
                                        Tipo
                            </Text>
                                    <Text style={{ fontSize: 15, marginHorizontal: 10 }}>
                                        {this.state.aviso.tipo}
                                    </Text>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10 }}>
                                        Marca
                            </Text>
                                    <Text style={{ fontSize: 15, marginHorizontal: 10 }}>
                                        {this.state.aviso.marca}
                                    </Text>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10 }}>
                                        Modelo
                            </Text>
                                    <Text style={{ fontSize: 15, marginHorizontal: 10 }}>
                                        {this.state.aviso.modelo}
                                    </Text>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10 }}>
                                        SN
                            </Text>
                                    <Text style={{ fontSize: 15, marginHorizontal: 10 }}>
                                        {this.state.aviso.sn}
                                    </Text>
                                    <TouchableOpacity
                                        style={{ marginTop: 20 }}>
                                        <Button
                                            onPress={() => this.setState({ hideEquipo: true })}
                                            title="Cerrar"
                                            color="#841584"
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>

                    </View>
                </ScrollView>
            </View>
        )
    }

    botonGrabar() {
        if (this.state.numeroAviso != '' && this.state.firmado && this.state.aviso.descripcion != '' && this.state.aviso.entrada != '' && this.state.aviso.salida != '') {
            return (
                <Button title="Grabar" onPress={() => this.grabar()} />
            )
        } else {
            return (
                <Button disabled title="Grabar" />
            )
        }
    }

    signed = () => {
        this.setState({
            firmado: true
        })
    }

    grabar() {

        if (this.state.aviso.salida <= this.state.aviso.entrada) {
            alert('La fecha de salida no puede ser igual o anterior a la fecha de entrada')
        } else {
            if (this.firma.state.firmado) {
                firestore().collection("avisos").doc(this.state.numeroAviso).update(this.state.aviso)
                this.firma.saveSign()
                this.props.navigation.replace("Avisos")
            }

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
            aviso: {
                ...this.state.aviso,
                entrada: selectedDate
            }
        })
    }
    ocultarSalida = (selectedDate) => {
        this.setState({
            showSalida: false,
            aviso: {
                ...this.state.aviso,
                salida: selectedDate
            }
        })
    }

    ocultarEquipo = () => {
        this.setState({
            hideEquipo: true
        })
    }
}

import React, { Component } from "react"
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    Button
} from 'react-native'
import { Cliente, Equipo } from './'
import firestore from '@react-native-firebase/firestore'

export default class Averia extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ocultarAveria: true,
            hideCliente: true,
            hideEquipo: true,
            averia: {}
        }
    }
    ocultar = () => {
        this.props.ocultar()
    }

    async componentDidMount() {
        console.log(this.props.averia.numero)
        firestore().collection("avisos").where("numero", "==", this.props.averia.numero).onSnapshot((avisos) => {
            const avisosCerrados = []
            avisos.forEach(aviso => {
                this.setState({ averia: aviso.data() })
            })
            this.setState({ avisos: avisosCerrados })
        })
    }

    render() {
        const { averia } = this.props
        return (
            <View>
                <TouchableOpacity onPress={() => this.setState({ ocultarAveria: false})}>
                    <View>
                        <Text style={{ marginHorizontal: 20, fontSize: 20, fontWeight: 'bold' }}>Aviso: {averia.numero}</Text>
                        <Text style={{ marginHorizontal: 50 }}>fecha: {averia.entrada}</Text>
                        <Text style={{ marginHorizontal: 50 }}>Cliente: {averia.cliente}</Text>
                    </View>
                </TouchableOpacity>

                <Modal
                    transparent={true}
                    visible={!this.state.ocultarAveria}
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
                                    {averia.cliente}
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
                                {averia.averia}
                            </Text>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10 }}>
                                Entrada
                            </Text>
                            <Text style={{ fontSize: 15, marginHorizontal: 10 }}>
                                {averia.entrada}
                            </Text>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10 }}>
                                Salida
                            </Text>
                            <Text style={{ fontSize: 15, marginHorizontal: 10 }}>
                                {averia.salida}
                            </Text>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10 }}>
                                Solucion
                            </Text>
                            <Text style={{ fontSize: 15, marginHorizontal: 10 }}>
                                {averia.descripcion}
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
                                   onPress={() => this.setState({ ocultarAveria: true})}
                                    title="Cerrar"
                                    color="#841584"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Cliente cliente={this.state.averia.cliente} visible={this.state.hideCliente} ocultar={this.ocultarCliente} />
                    <Equipo equipo={this.state.averia.equipo} visible={this.state.hideEquipo} ocultar={this.ocultarEquipo} />
                </Modal>
            </View>
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
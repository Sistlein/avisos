import React, { Component } from "react"
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    Button,
    Image
} from 'react-native'
import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'
import Moment from 'moment';

export default class Averia extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ocultarAveria: true,
            hideCliente: true,
            hideEquipo: true,
            averia: {},
            imageRef:''
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
        storage().ref('/'+this.props.averia.numero+'.jpg')
            .getDownloadURL()
            .then((url) => {
                this.setState({imageRef:url})
            })
            .catch((e) => console.log('getting downloadURL of image error => ', e));
    }



    render() {
        console.log('---'+this.state.imageRef+'firma')
        const { averia } = this.props
        return (
            <View>
                <TouchableOpacity onPress={() => this.setState({ ocultarAveria: false })}>
                    <View>
                        <Text style={{ marginHorizontal: 20, fontSize: 20, fontWeight: 'bold' }}>Aviso: {averia.numero}</Text>
                        <Text style={{ marginHorizontal: 50 }}>fecha Salida: {Moment(averia.salida).format("H:mm:ss D M Y")}</Text>
                        <Text style={{ marginHorizontal: 50 }}>Cliente: {averia.nombre}</Text>
                        
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
                                    {averia.nombre}
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
                                {Moment(averia.entrada).format("H:mm:ss D M Y")}
                            </Text>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10 }}>
                                Salida
                            </Text>
                            <Text style={{ fontSize: 15, marginHorizontal: 10 }}>
                                {Moment(averia.salida).format("H:mm:ss D M Y")}
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
                            <Image  source={{ uri: this.state.imageRef }}
                            resizeMode='contain' style={{ width: '80%', height: 200, alignSelf: 'center' }}/>
                            <TouchableOpacity
                                style={{ marginTop: 20 }}>
                                <Button
                                    onPress={() => this.setState({ ocultarAveria: true })}
                                    title="Cerrar"
                                    color="#841584"
                                />
                            </TouchableOpacity>
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
                                    {averia.nombre}
                                </Text>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10 }}>
                                    Direcci??n
                            </Text>
                                <Text style={{ fontSize: 15, marginHorizontal: 10 }}>
                                    {averia.direccion}
                                </Text>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10 }}>
                                    Localidad
                            </Text>
                                <Text style={{ fontSize: 15, marginHorizontal: 10 }}>
                                    {averia.localidad}
                                </Text>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10 }}>
                                    Telefono
                            </Text>
                                <Text style={{ fontSize: 15, marginHorizontal: 10 }}>
                                    {averia.telefono}
                                </Text>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10 }}>
                                    E-mail
                            </Text>
                                <Text style={{ fontSize: 15, marginHorizontal: 10 }}>
                                    {averia.email}
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
                                    {averia.tipo}
                                </Text>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10 }}>
                                    Marca
                            </Text>
                                <Text style={{ fontSize: 15, marginHorizontal: 10 }}>
                                    {averia.marca}
                                </Text>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10 }}>
                                    Modelo
                            </Text>
                                <Text style={{ fontSize: 15, marginHorizontal: 10 }}>
                                    {averia.modelo}
                                </Text>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10 }}>
                                    SN
                            </Text>
                                <Text style={{ fontSize: 15, marginHorizontal: 10 }}>
                                    {averia.sn}
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
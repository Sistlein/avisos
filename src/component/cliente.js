import React, { Component } from "react"
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    Button
} from 'react-native'
import firestore from '@react-native-firebase/firestore'

export default class Cliente extends Component {
    constructor(props) {
        super(props);
        this.state = {
          cliente:{}
        }
      }
    ocultar = () => {
        this.props.ocultar()
    }


    async componentDidMount() {
        firestore().collection('clientes').where("nombre","==",this.props.cliente).onSnapshot((usuarios) => {
            usuarios.forEach((usuario)=>{
                this.setState({cliente:usuario.data()})
            })
            
            
        })
    }

    render() {
        const {cliente}=this.state
        return (
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
        )
    }
}
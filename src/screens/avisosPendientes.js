import React, { Component } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView
} from 'react-native'
import {
    AveriaP, Cabecera
} from '../component'
import AsyncStorage from '@react-native-community/async-storage'
import firestore from '@react-native-firebase/firestore'


export default class AvisosCerrados extends Component {
    constructor(props) {
        super(props);
        this.state = {
            avisos: [],
            clientes: []
        }
    }

    async componentDidMount() {
        let tipo
        let nombre
        AsyncStorage.getItem('user_name', (err, user) => {
            if (user) {
                nombre = user
            }
        })
        AsyncStorage.getItem('user_tipo', (err, user) => {
            if (user) {
                tipo = user
            }
        })
        firestore().collection("avisos").where("salida", "==", "").onSnapshot((avisos) => {
            console.log('o')
            const avisosCerrados = []
            avisos.forEach(aviso => {
                if (tipo==='true') {
                    if (aviso.data().nombre == nombre) {
                        console.log('p')
                        avisosCerrados.push(aviso.data())
                    }
                } else {
                    avisosCerrados.push(aviso.data())
                }
            })
            this.setState({ avisos: avisosCerrados })
        })

    }
    render() {
        const { avisos, clientes } = this.state
        console.log(clientes)
        return (
            <View style={{ marginTop: 10 }}>

                <Cabecera navigation={this.props.navigation} texto='Listado de Avisos pendientes' />
                <ScrollView>
                    {avisos.map((aviso) => {
                        console.log(aviso)
                        return (
                            <AveriaP key={aviso.numero} averia={aviso} />
                        )
                    })}

                </ScrollView>
            </View>
        )
    }
}
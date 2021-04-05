import React, { Component } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView
} from 'react-native'
import {
    Averia, Cabecera
} from '../component'


export default class AvisosPendientes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            avisoSelecionado: '2225',
            hideAveria: true
        }
    }
    ocultarAveria = () => {
        this.setState({
            hideAveria: true
        })
    }
    render() {
        return (
            <View style={{marginTop:10}}>
                <Averia visible={this.state.hideAveria} ocultar={this.ocultarAveria} />
                <Cabecera navigation={this.props.navigation} texto='Listado de avisos pendientes'/>
                <ScrollView>
                    <TouchableOpacity onPress={() => this.setState({ hideAveria: false, avisoSelecionado: 12345 })}>
                        <View>
                            <Text style={{ marginHorizontal: 20, fontSize: 20, fontWeight: 'bold' }}>Aviso: 12345</Text>
                            <Text style={{ marginHorizontal: 50 }}>Cliente: Telefonica</Text>
                        </View>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        )
    }
}
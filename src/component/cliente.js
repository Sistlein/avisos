import React,{ Component } from "react"
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    Button
} from 'react-native'

export default class Cliente extends Component {
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
                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10 }}>
                            Nombre de cliente
                            </Text>
                        <Text style={{ fontSize: 15, marginHorizontal: 10 }}>
                            Sistelin
                            </Text>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10 }}>
                            Dirección
                            </Text>
                        <Text style={{ fontSize: 15, marginHorizontal: 10 }}>
                            C/ biologia, 12
                            </Text>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10 }}>
                            Localidad
                            </Text>
                        <Text style={{ fontSize: 15, marginHorizontal: 10 }}>
                            Sevilla (Sevilla)
                            </Text>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10 }}>
                            Telefono
                            </Text>
                        <Text style={{ fontSize: 15, marginHorizontal: 10 }}>
                            954123456
                            </Text>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10 }}>
                            E-mail
                            </Text>
                        <Text style={{ fontSize: 15, marginHorizontal: 10 }}>
                            sl@sistelin.es
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
import React from 'react';
import { View, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Component } from 'react';
import Moment from 'moment';
import 'moment/locale/es';

export default class Fecha extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            mode: 'date',
            show: this.props.visible,
            mostrar: this.props.tipo
        }
    }
    ocultar = (selectedDate) => {
        this.props.ocultar(Moment(selectedDate).format('DD/MM/yy HH:mm') )
      }

    render() {
        if (this.props.visible) {
            return (
                <View>
                    <DateTimePicker
                        testID={this.state.mostrar}
                        value={this.state.date}
                        mode={this.state.mode}
                        is24Hour={true}
                        display="default"
                        onChange={(event, selectedDate) => {
                            const currentDate = selectedDate || this.state.date;
                            this.setState({date:currentDate});
                            this.setState({mode:'time'})
                            this.ocultar(selectedDate)
                            this.setState({mode:'date'})
                            console.log(selectedDate)
                          }}
                    />

                </View>
            );
        } else {
            return (
                <View>
                   <Text style={{ fontSize: 20, fontWeight: 'bold', marginHorizontal: 20, margin: 10 }}>{this.state.mostrar}</Text>
                   <Text style={{marginHorizontal:30}}>{Moment(this.state.date).format('DD/MM/yy HH:mm') }</Text>
                </View>
            );
        }
    }
}
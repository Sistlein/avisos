
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import SignatureCapture from 'react-native-signature-capture';

class Firma extends Component {
  constructor(props) {
    super(props);
    this.state={
      path: 2,
      firmado: false,
      fichero:''
    }
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginHorizontal: 20  }}>Firma de cliente</Text>
        <SignatureCapture
          style={[{ flex: 1 }, styles.signature]}
          ref="sign"
          onSaveEvent={this.onSaveEvent}
          onDragEvent={this.onDragEvent}
          showNativeButtons={false}
          showTitleLabel={false}
          viewMode={"portrait"} /></View>
    );
  }

  saveSign() {
    this.refs["sign"].saveImage();
  }

  resetSign() {
    this.refs["sign"].resetImage();
    this.setState({firmado: false})
  }

  onSaveEvent=(result)=> {
    //
    //result.encoded - for the base64 encoded png
    //result.pathName - for the file path name
    const{numPedido}=this.props
    var RNFS = require('react-native-fs');
    var path = RNFS.DocumentDirectoryPath + '/test.png';
    RNFS.writeFile(path, result.encoded, "base64")
      .then((success) => {
        console.log('FILE WRITTEN!');
      })
      .catch((err) => {
        console.log(err.message);
      });
    const file = {
      uri: path,
      name: Date.now()+'_'+numPedido+'.jpg',
      type: 'image/jpg'
    }
    this.setState({fichero: file})
    RNFS.unlink(path)
  }
  onDragEvent=()=> {
    // This callback will be called when the user enters signature
    this.setState({firmado: true})
    console.log("dragged");
  }

}
export default Firma;

const styles = StyleSheet.create({
  signature: {
    height:200,
    marginHorizontal:30,
    margin:20,
    borderColor: '#000033',
    borderWidth: 1,
  },
});
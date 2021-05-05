// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, { Fragment } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Keyboard,
  TouchableOpacity,
  Image,
  Modal,
  ImageBackground
} from 'react-native';
import { Component } from 'react';
import firebase from '@react-native-firebase/app'
import '@react-native-firebase/auth'
import '@react-native-firebase/firestore'
import AsyncStorage from '@react-native-community/async-storage';



class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userEmail: 'tecnico@ciclo.es',
      userPassword: '123456',
      isVisible: true,
      visible: true,
      loading: false
    }
  }
  Hide_Splash_Screen = () => {
    this.setState({
      isVisible: false
    });
  }

  componentDidMount() {
    var that = this;
    setTimeout(function () {
      that.Hide_Splash_Screen();
    }, 3000);
    AsyncStorage.getItem('user_id', (err, user) => {
      if (user){
        this.comprobarUsuario(user)
      }
    });
  }

  comprobarUsuario(user_id){
    console.log('comprobamos usuario')
    const { navigation } = this.props
    console.log(user_id)
    firebase.firestore().collection('clientes').doc(user_id).onSnapshot((usuario) => {
      this.setState({ visible: false })
      console.log(usuario.data())
      if (usuario.data()) {
        AsyncStorage.setItem('user_id', user_id);
        AsyncStorage.setItem('user_name', usuario.data().nombre);
        AsyncStorage.setItem('user_tipo', JSON.stringify(usuario.data().cliente));
        if (!usuario.data().cliente) {
          navigation.navigate('DrawerNavigator', { tipo: 'tecnico' });
        } else {
          navigation.navigate('DrawerNavigator', { tipo: 'cliente' });
        }
      }
    })
  }

  async handleSubmitPress() {
    
    this.setState({ loading: true })
    const { userPassword, userEmail } = this.state

    if (!userEmail) {
      alert('Introduce tu usuario');
      return;
    }
    if (!userPassword) {
      alert('Introduce tu password');
      return;
    }
    await firebase.auth().signInWithEmailAndPassword(userEmail, userPassword)
      .then((userCredential) => {
        this.comprobarUsuario(userCredential.user.email)
      })
      .catch((error) => {
        alert(error)

      });
    this.setState({ loading: false })
  }
  render() {
    const { errortext, loading } = this.state
    let Splash_Screen = (
      <View style={styles.SplashScreen_RootView}>
        <View style={styles.SplashScreen_ChildView}>
          <Image source={{ uri: 'https://sistelin.es/wp-content/uploads/2019/05/cropped-Sistelin-2.jpg' }}
            style={{ width: '100%', height: '100%', resizeMode: 'cover' }} />
        </View>
      </View>)
    return (
      <Fragment>
        <View style={styles.container}>
          {(this.state.isVisible === true) ? Splash_Screen : (
            <ImageBackground source={{ uri: 'https://sistelin.es/wp-content/uploads/2019/05/cropped-Sistelin-2.jpg' }} style={styles.image}>
              <Modal
                transparent={true}
                visible={this.state.visible}
              >
                <View style={{ backgroundColor: '#000000aa', flex: 1, justifyContent: 'center' }}>
                  <View style={styles.inputView}>
                    <TextInput
                      style={styles.inputText}
                      onChangeText={(userEmail) => this.setState({ userEmail: userEmail })}
                      placeholder="Enter User"
                      placeholderTextColor="white"
                      keyboardType="default"
                      onSubmitEditing={Keyboard.dismiss}
                      blurOnSubmit={false}
                      underlineColorAndroid="#f000"
                      returnKeyType="next"
                    />
                  </View>
                  <View style={styles.inputView}>
                    <TextInput
                      style={styles.inputText}
                      onChangeText={(userPassword) => this.setState({ userPassword: userPassword })}
                      placeholder="Enter Password"
                      placeholderTextColor="white"
                      keyboardType="default"
                      onSubmitEditing={Keyboard.dismiss}
                      blurOnSubmit={false}
                      secureTextEntry={true}
                      underlineColorAndroid="#f000"
                      returnKeyType="next"
                    />
                  </View>
                  {errortext != '' ? (
                    <Text style={styles.errorTextStyle}>
                      {errortext}
                    </Text>
                  ) : null}
                  <TouchableOpacity
                    style={styles.loginBtn}
                    activeOpacity={0.5}
                    onPress={() => this.handleSubmitPress()}>
                    <Text style={styles.buttonTextStyle}>LOGIN</Text>
                  </TouchableOpacity>
                </View>
              </Modal>
            </ImageBackground>
          )}
        </View>
      </Fragment >


    );
  }
};
export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  logo: {
    marginBottom: 40,
    width: 350,
    height: 50,
    resizeMode: 'contain'
  },
  inputView: {
    alignSelf: 'center',
    width: "80%",
    borderBottomWidth: 3,
    borderColor: '#385895',
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20
  },
  inputText: {
    height: 50,
    color: "#FFF"
  },
  forgot: {
    color: "white",
    fontSize: 11
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#385895",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    alignSelf: 'center',
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10
  },
  buttonTextStyle: {
    color: 'white'
  },
  loginText: {
    color: "white"
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    opacity: 50
  },
});
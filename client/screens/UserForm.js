import React, { Fragment, Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage'
import { connect } from 'react-redux'
import { repopulate } from '../store/action'
import { ToastAndroid, KeyboardAvoidingView} from 'react-native';

const mapDispatchToProps = { repopulate }

import {
  Content,
  List,
  ListItem,
  InputGroup,
  Input,
  Button,
  Item
} from 'native-base';

import {
  Image,
  StyleSheet,
  View,
  Text,
} from 'react-native';

import server from '../api/server'

class LinksScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      view: 'login',
      email: '',
      password: '',
    }
  }

  async componentDidMount() {
    if (this.props.navigation.getParam('type', null) === 'signin') {
      this.goToSignIn()
    } else {
      this.goToSignUp()
    }
  }

  login() {
    let userToken
    server({
      method: 'post',
      url: '/user/signIn',
      data: {
        email: this.state.email,
        password: this.state.password
      }
    })
      .then(({ data }) => {
        userToken = data.token
        return AsyncStorage.setItem('tokenActiv8Me', data.token.toString())
      })
      .then(() => {
        return server({
          method: 'get',
          url: '/alarm/',
          headers: {
            token: userToken
          }
        })
      })
      .then(async ({ data }) => {
        let promise = []
        let fcmToken = await AsyncStorage.getItem('fcmToken')
        console.log(fcmToken)
        for (let i = 0; i < data.length; i++) {
          promise.push(new Promise((resolve, reject) => {
            let newData = {...data[i]}
            newData.fcmToken = fcmToken
            newData.time = newData.originTime
            resolve (server({
              method: 'patch',
              url: `/alarm/${data[i]._id}`,
              data: {
                ...newData,
                type: 'update'
              },
              headers: {
                token: userToken
              }
            }))
          }))
        }
        return Promise.all(promise)
      })
      .then(() => {
        return server({
          method: 'get',
          url: '/alarm/',
          headers: {
            token: userToken
          }
        })
      })
      .then(async ({data}) => {
        await AsyncStorage.setItem('alarmActiv8Me', JSON.stringify(data))
        this.props.navigation.navigate('AlarmList')
      })
      .catch(err => {
        console.log(err)
        ToastAndroid.showWithGravityAndOffset(
          'Failed To Login!',
          ToastAndroid.LONG,
          ToastAndroid.CENTER,
          25,
          50,
        );
      })
  }

  signUp() {
    let userToken
    server({
      method: 'post',
      url: '/user/signUp',
      data: {
        email: this.state.email,
        password: this.state.password
      }
    })
      .then(() => {
        return server({
          method: 'post',
          url: '/user/signIn',
          data: {
            email: this.state.email,
            password: this.state.password
          }
        })
      })
      .then(({ data }) => {
        userToken = data.token
        return AsyncStorage.setItem('tokenActiv8Me', data.token.toString())
      })
      .then(() => {
        return server({
          method: 'get',
          url: '/alarm/',
          headers: {
            token: userToken
          }
        })
      })
      .then(({ data }) => {
        return AsyncStorage.setItem('alarmActiv8Me', JSON.stringify(data))
      })
      .then(() => {
        this.props.navigation.navigate('AlarmList')
      })
      .catch(err => {
        console.log(err)
        ToastAndroid.showWithGravityAndOffset(
          'Failed To Register!',
          ToastAndroid.LONG,
          ToastAndroid.CENTER,
          25,
          50,
        );
      })
  }

  goToSignIn() {
    this.setState({
      view: 'login'
    })
  }

  goToSignUp() {
    this.setState({
      view: 'register'
    })
  }

  render() {
    return (
        <KeyboardAvoidingView style={styles.container}>
          <View style={styles.container2}>
            <View style={[styles.container2, { marginVertical: '5%' }]}>
              <Image
                source={require('../assets/logos/LogoApps.png')}
                style={{ height: 55, width: 55 }}
              />
              <Text style={styles.TextBold}>Activ8Me</Text>
              {
                (this.state.view === 'login') ?
                  <Text>Login</Text> :
                  <Text>Register</Text>
              }
            </View>
            <Item rounded style={{ top:'8%',bottom: '2%', width:'85%'}}>
              <Input placeholder='Rounded Textbox'
                onChangeText={(text) => this.setState({ email: text })}
                value={this.state.email}
                placeholder={"Email Address"}
              />
            </Item>
            <Item rounded style={{ top:'10%',bottom: '2%', width:'85%'}}>
              <Input
                onChangeText={(text) => this.setState({ password: text })}
                value={this.state.password}
                secureTextEntry={true}
                placeholder={"Password"} />
            </Item>
          <View style={{marginVertical:'20%'}}>
            {
              (this.state.view === 'login') ?
                <Button style={styles.primaryButton} onPress={this.login.bind(this)}>
                  <View>
                    <Text style={{ fontSize: 17, color: 'white' }}>Login</Text>
                  </View>
                </Button> :
                <Button style={styles.primaryButton} onPress={this.signUp.bind(this)}>
                  <View>
                    <Text style={{ fontSize: 17, color: 'white' }}>Register</Text>
                  </View>
                </Button>
            }
            {
              (this.state.view === 'login') ?
                <Button style={styles.primaryButton2} onPress={this.goToSignUp.bind(this)}>
                  <View>
                    <Text style={{ fontSize: 17, color: 'white' }}>Go To Register</Text>
                  </View>
                </Button> :
                <Button style={styles.primaryButton2} onPress={this.goToSignIn.bind(this)}>
                  <View>
                    <Text style={{ fontSize: 17, color: 'white' }}>Go To Login</Text>
                  </View>
                </Button>
            }
          </View>
          </View>
        </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  body: {
    flex: 9,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  primaryButton: {
    margin: 10,
    padding: 15,
    justifyContent: 'center',
    backgroundColor: "#FF8B17",
    width: 300,
    borderRadius: 10,
  },
  primaryButton2: {
    margin: 10,
    padding: 15,
    justifyContent: 'center',
    backgroundColor: "#CCCCCC",
    width: 300,
    borderRadius: 10,
  },
  container2: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    justifyContent: 'center',
    width: 300,
    height: 55,
    borderRadius: 10,
    color: "#FF8B17",
    bottom: "5%",
  },
  button2: {
    justifyContent: 'center',
    width: 300,
    height: 55,
    color: 'white',
    backgroundColor: '#CCCCCC',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  HeadText: {
    color: 'black',
    fontSize: 20,
  },
  Text: {
    color: '#ffffff',
    fontSize: 20,
  },
  TextBold: {
    color: 'black',
    fontSize: 25,
    fontWeight: "bold",
  }
});

export default connect(null, mapDispatchToProps)(LinksScreen)
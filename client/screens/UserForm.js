import React, { Fragment, Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage'

import {
  Content,
  List,
  ListItem,
  InputGroup,
  Input,
  Button
} from 'native-base';

import {
  Image,
  StyleSheet,
  View,
  Text,
} from 'react-native';

import server from '../api/server'

export default class LinksScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      view:'login',
      email: '',
      password: ''
    }
  }

  async componentDidMount() {
    if (this.props.navigation.getParam('type', null) === 'signin'){
      this.goToSignIn()
    } else {
      this.goToSignUp()
    }
  }
  
  login() {
    server({
      method: 'post',
      url: '/user/signIn',
      data: {
        email: this.state.email,
        password: this.state.password
      }
    })
    .then (({data}) => {
      return AsyncStorage.setItem('tokenActiv8Me', data.token.toString() )
    })
    .then(async () => {
      this.props.navigation.navigate('AlarmList')
    })
    .catch (err => {
      console.log(err)
    })
  }
  
  signUp(){
    server({
      method: 'post',
      url: '/user/signUp',
      data: {
        email: this.state.email,
        password: this.state.password
      }
    })
    .then (() => {
      return server({
        method: 'post',
        url: '/user/signIn',
        data: {
          email: this.state.email,
          password: this.state.password
        }
      })
    })
    .then (({data}) => {
      return AsyncStorage.setItem('tokenActiv8Me', data.token.toString() )
    })
    .then(async () => {
      this.props.navigation.navigate('AlarmList')
    })
    .catch (err => {
      console.log(err)
    })
  }
  
  goToSignIn(){
    this.setState({
      view:'login'
    })
  }
  
  goToSignUp(){
    this.setState({
      view:'register'
    })
  }
  
  render() {
    return (
      <Fragment>
        <View style={styles.container}>
          <View style={styles.container2}>
            <Image
              source={{ uri: "https://www.sketch.com/images/pages/press/sketch-press-kit/app-icons/sketch-mac-icon@2x.png" }}
              style={{ height: 55, width: 55 }}
              />
            <Text style={styles.TextBold}>Activ8Me</Text>
            {
              (this.state.view === 'login') ?
              <Text>Login</Text> :
              <Text>Register</Text>
            }
          </View>
        </View>
        <Content style={{ bottom: '15%' }}>
          <List>
            <ListItem>
              <InputGroup>
                <Input
                  onChangeText={(text) => this.setState({ email: text })}
                  value={this.state.email}
                  placeholder={"Email Address"} />
              </InputGroup>
            </ListItem>
            <ListItem>
              <InputGroup>
                <Input
                  onChangeText={(text) => this.setState({ password: text })}
                  value={this.state.password}
                  secureTextEntry={true}
                  placeholder={"Password"} />
              </InputGroup>
            </ListItem>
          </List>
          <View style={{alignSelf:'center'}}> 
                {
                  (this.state.view === 'login') ?
                  <Button style={styles.primaryButton} onPress={this.login.bind(this)}>
                    <View>
                      <Text style={{fontSize:17,color:'white'}}>Login</Text>
                    </View>
                  </Button> :
                  <Button style={styles.primaryButton} onPress={this.signUp.bind(this)}>
                    <View>
                      <Text style={{fontSize:17,color:'white'}}>Register</Text>
                    </View>
                  </Button>
                }
                {
                  (this.state.view === 'login') ?
                  <Button style={styles.primaryButton} onPress={this.goToSignUp.bind(this)}>
                    <View>
                      <Text style={{fontSize:17,color:'white'}}>Go To Register</Text> 
                    </View>
                  </Button> :
                  <Button style={styles.primaryButton} onPress={this.goToSignIn.bind(this)}>
                    <View>
                      <Text style={{fontSize:17,color:'white'}}>Go To Login</Text>
                    </View>
                  </Button> 
                }
          </View>
        </Content>
      </Fragment>
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
    fontWeight: "bold"
  }
});

LinksScreen.navigationOptions = {
  title: 'UserForm',
};
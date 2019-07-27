/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Fragment, Component } from 'react';

import {
  Container,
  Title,
  Content,
  List,
  ListItem,
  InputGroup,
  Input,
  Text,
  Piacker,
  Button
} from 'native-base';

import {
  Image,
  TouchableHighlight,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
  AppRegistry,
  AsyncStorage,
  ToolbarAndroid,
  ActivityIndicator,
  Icon
} from 'react-native';

import {
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

// import Icon from 'react-native-vector-icons/FontAwesome';

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      view:'login',
      email: '',
      password: ''
    }
  }

  componentDidUpdate(){
    console.log('okee')
  }

  login() {

  }

  signUp(){

  }

  goToSignup(){
    console.log('trigger')
    this.setState({
      view:'login'
    },() => {
      console.log(this.state.view)
    })
  }

  goToSignIn(){
    console.log('trigger')
    this.setState({
      view:'register'
    },() => {
      console.log(this.state.view)
    })
  }

  render() {
    return (
      (this.state.view === 'login') ?
      <Fragment>
        <View style={styles.container}>
          <View style={styles.container2}>
            <Image
              source={{ uri: "https://www.sketch.com/images/pages/press/sketch-press-kit/app-icons/sketch-mac-icon@2x.png" }}
              style={{ height: 55, width: 55 }}
            />
            <Text style={styles.TextBold}>Activ8Me</Text>
            <Text>Login</Text>
          </View>
        </View>
        <Content style={{ bottom: '15%' }}>
          <List>
            <ListItem>
              <InputGroup>
                {/* <Icon name="users" style={{ color: '#0A69FE' }} /> */}
                <Input
                  onChangeText={(text) => this.setState({ email: text })}
                  value={this.state.email}
                  placeholder={"Email Address"} />
              </InputGroup>
            </ListItem>
            <ListItem>
              <InputGroup>
                {/* <Icon name="ios-unlock" style={{ color: '#0A69FE' }} /> */}
                <Input
                  onChangeText={(text) => this.setState({ password: text })}
                  value={this.state.password}
                  secureTextEntry={true}
                  placeholder={"Password"} />
              </InputGroup>
            </ListItem>
          </List>
          <View style={{alignSelf:'center'}}> 
            <Button style={styles.primaryButton} onPress={this.login.bind(this)}>
              <View>
                <Text style={{fontSize:17}}>
                  Login
                </Text>
              </View>
            </Button>
            <Button style={styles.primaryButton} onPress={this.goToSignIn.bind(this)}>
              <View>
                <Text style={{fontSize:17}}>
                  Go To Register
                </Text>
              </View>
            </Button>
          </View>
        </Content>
      </Fragment>
      :  <Fragment>
      <View style={styles.container}>
        <View style={styles.container2}>
          <Image
            source={{ uri: "https://www.sketch.com/images/pages/press/sketch-press-kit/app-icons/sketch-mac-icon@2x.png" }}
            style={{ height: 55, width: 55 }}
          />
          <Text style={styles.TextBold}>Activ8Me</Text>
          <Text>Register</Text>
        </View>
      </View>
      <Content style={{ bottom: '15%' }}>
        <List>
          <ListItem>
            <InputGroup>
              {/* <Icon name="users" style={{ color: '#0A69FE' }} /> */}
              <Input
                onChangeText={(text) => this.setState({ email: text })}
                value={this.state.email}
                placeholder={"Email Address"} />
            </InputGroup>
          </ListItem>
          <ListItem>
            <InputGroup>
              {/* <Icon name="ios-unlock" style={{ color: '#0A69FE' }} /> */}
              <Input
                onChangeText={(text) => this.setState({ password: text })}
                value={this.state.password}
                secureTextEntry={true}
                placeholder={"Password"} />
            </InputGroup>
          </ListItem>
        </List>
        <View style={{alignSelf:'center'}}> 
          <Button style={styles.primaryButton} onPress={this.login.bind(this)}>
            <View>
              <Text style={{fontSize:17}}>
                Register
              </Text>
            </View>
          </Button>
          <Button onPress={this.goToSignup.bind(this)} style={styles.primaryButton}>
            <View>
              <Text style={{fontSize:17}}>
                Go To Login
              </Text>
            </View>
          </Button>
        </View>
      </Content>
    </Fragment>
    )
  }
}
import React, { Fragment, Component } from 'react';

import {
    Container,
    Title,
    Content,
    List,
    ListItem,
    InputGroup,
    Input,
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
    Text,
    StatusBar,
    AppRegistry,
    AsyncStorage,
    ToolbarAndroid,
    ActivityIndicator,
    Icon,
  } from 'react-native';
  
  import {
    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions,
  } from 'react-native/Libraries/NewAppScreen';


  
  export default class LinksScreen extends Component {
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
      this.props.navigation.navigate('AlarmList')
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
                    <Text style={{fontSize:17,color:'white'}}>
                      Login
                    </Text>
                  </View>
                </Button>
                <Button style={styles.primaryButton} onPress={this.goToSignIn.bind(this)}>
                  <View>
                    <Text style={{fontSize:17,color:'white'}}>
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
                  <Text style={{fontSize:17,color:'white'}}>
                    Register
                  </Text>
                </View>
              </Button>
              <Button onPress={this.goToSignup.bind(this)} style={styles.primaryButton}>
                <View>
                  <Text style={{fontSize:17,color:'white'}}>
                    Go To Login
                  </Text>
                </View>
              </Button>
            </View>
          </Content>
        </Fragment>)
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
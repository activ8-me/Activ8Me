import React, { Component, Fragment } from 'react'
import { Container, Content, Form, Item, Input, Button } from 'native-base';
import {
  Image,
  TouchableHighlight,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

export default function LinksScreen(props) {
  return (
    <Fragment>
      <View style={styles.container}>
        <View style={styles.container2}>
          <Image
            source={{ uri: "https://www.sketch.com/images/pages/press/sketch-press-kit/app-icons/sketch-mac-icon@2x.png" }}
            style={{ height: 55, width: 55, bottom: "20%", top: "5%" }}
          />
          <Text style={styles.TextBold}>Activ8Me</Text>
        </View>
        <View style={styles.container2}>
          <Image
            source={require('../assets/pics/kitten.png')}
            style={{ height: 240, width: 300 }}
          />
          <Text style={styles.HeadText}>
            Welcome to Your Ultimate
            </Text>
          <Text style={styles.TextBold} >
            Wake-up Call
            </Text>
        </View>
        <View style={styles.buttonList}>
          <Button warning large style={styles.button} onPress={() => {
            props.navigation.navigate('Form', {
              type:'signin'
            })
          }}><Text style={styles.Text}> Let Me In </Text></Button>
          <Button large style={styles.button2} onPress={() => {
            props.navigation.navigate('Form', {
              type:'signup'
            })
          }}><Text style={styles.Text}> Sign Up </Text></Button>
        </View>
      </View>
    </Fragment>
  );
}

LinksScreen.navigationOptions = {
  title: 'Landing',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white'
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
    backgroundColor: "#FF8B17",
  },
  button2: {
    justifyContent: 'center',
    width: 300,
    height: 55,
    color: 'white',
    backgroundColor: "#CCCCCC",
    borderRadius: 10,
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

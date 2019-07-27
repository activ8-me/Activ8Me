import React from 'react';
import { ScrollView, 
  StyleSheet, 
  Dimensions,
  View,
  Text, 
  Image,
  Button } from 'react-native';
import {connect} from 'react-redux'
import {resetWin} from '../store/action'

const mapStateToProps = state => {
  return {
    snooze: state.snooze
  }
}
const mapDispatchToProps = {resetWin}

function LinksScreen(props) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.viewStyle}>
        <Text style={styles.clock}>You WIN</Text>
        {
          props.snooze ?
          <Text style={styles.meridiem}>You may sleep for 10 more minutes</Text> :
          <Text style={styles.meridiem}>Glad you awake</Text>
        }
        <Image
          source={require('../assets/pics/wakeUp.png')}
          style={{width:200, height:200, margin: 10, marginLeft: 20}}
        />
        <Button
          onPress={() => {
            props.resetWin()
            props.navigation.navigate('AlarmList')
          }}
          title="List Alarm"
          color="#ff8b17"
          style={styles.buttonStyle}
        />
        <View style={{margin: 30}}></View>
        <Button
          onPress={() => {
            props.resetWin()
            props.navigation.navigate('AlarmLanding')
          }}
          title="Alarm page"
          color="#ff8b17"
          style={styles.buttonStyle}
        />
      </View>
    </ScrollView>
  );
}

LinksScreen.navigationOptions = {
  title: 'Result',
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#ff8b17',
  },
  viewStyle: {
    display: 'flex',
    marginTop: 100,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5
  },
  clock: {
    fontSize: 80,
    fontFamily: "Iceberg-Regular"
  },
  meridiem: {
    fontSize: 50,
    marginTop: 20,
    fontFamily: "Iceberg-Regular",
    textAlign: 'center'
  },
  buttonStyle: {
    margin: 30,
  }
});

export default connect (mapStateToProps, mapDispatchToProps) (LinksScreen)

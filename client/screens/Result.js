import React, {useEffect} from 'react';
import { ScrollView, 
  StyleSheet,
  View,
  Text, 
  Image,
  Button,
  BackHandler } from 'react-native';
import {connect} from 'react-redux'
import {resetWin, repopulate} from '../store/action'
import server from '../api/server'
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment'

const mapStateToProps = state => {
  return {
    snooze: state.snooze,
    alarmId: state.alarmId
  }
}
const mapDispatchToProps = {resetWin, repopulate}

function LinksScreen(props) {
  useEffect(() => {props.resetWin()}, [])

  function updateAlarm() {
    let type, userToken
    if (props.snooze) {
      type = 'snooze'
    } else {
      type = 'reset'
    }
    AsyncStorage.getItem('tokenActiv8Me')
    .then(token => {
      userToken = token
      return server({
        method: 'patch',
        url: `/alarm/${props.alarmId}`,
        data: {
          type,
          time: moment().add(10, "minutes").format('LT')
        },
        headers: {
          token
        }
      })
    })
    .then(() => {
      return server ({
        method: 'get',
        url: '/alarm/',
        headers: {
          token: userToken
        }
      })
    })
    .then(({data}) => {
      return AsyncStorage.setItem('alarmActiv8Me', JSON.stringify(data))
    })
    .then(() => {

      return AsyncStorage.removeItem('alarmTrigger')
    })
    .then(() => {
      BackHandler.exitApp()
    })
    .catch(err => {
      console.log(err)
    })
  }
  return (
    <ScrollView style={styles.container}>
      <View style={styles.viewStyle}>
        <Text style={styles.clock}>YOU WIN!</Text>
        {
          props.snooze ?
          <Text style={styles.meridiem}>You may sleep for 10 more minutes</Text> :
          <Text style={styles.meridiem}>Glad you're awake</Text>
        }
        <Image
          source={require('../assets/pics/wakeUp.png')}
          style={{width:200, height:200, margin: 10, marginLeft: 20}}
        />
        <Button
          onPress={updateAlarm}
          title="OK"
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

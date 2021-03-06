import React, {useEffect} from 'react';
import { ScrollView, 
  StyleSheet,
  View,
  Text, 
  Image,
  BackHandler } from 'react-native';
import {connect} from 'react-redux'
import {resetWin, repopulate} from '../store/action'
import server from '../api/server'
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment'
import Sound from 'react-native-sound'
import * as Animatable from 'react-native-animatable';
import { Button } from 'native-base';

const mapStateToProps = state => {
  return {
    snooze: state.snooze,
    alarmId: state.alarmId
  }
}
const mapDispatchToProps = {resetWin, repopulate}

function LinksScreen(props) {
  useEffect(() => {
    props.resetWin()
    let win = new Sound('win.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      win.play()
    });
  }, [])

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
    <View style={styles.container}>
        <Animatable.View animation="bounceIn" easing="ease-out" duration={3000} delay={1} style={styles.card}>
          <Image
            style={{ width: '80%', height: 200, padding:3}}
            source={require('../assets/pics/sleap.jpg')}
          />
          <View>
          <Text style={{alignSelf:'center', fontWeight:'bold', fontSize:20}}>Well played!</Text>
            {
              props.snooze 
              ? <Text style={{alignSelf:'center', fontSize:12}}>You can sleep for 10 more minutes</Text>
              : <Text style={{alignSelf:'center', fontWeight:'bold', fontSize:20}}>Glad you're awake</Text>
            }
          </View>
           <Button block warning style={{borderRadius:10}} onPress={updateAlarm} title="OK">
            <Text style={{color:'white'}}>Confirm</Text>
          </Button>
        </Animatable.View>
    </View>
  );
}

LinksScreen.navigationOptions = {
  title: 'Result',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: 'row',
    backgroundColor: '#cccccc',
  },
  card: {
    backgroundColor: "white",
    borderRadius: 20,
    height: 350,
    width: "80%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
    alignItems: "center",
    justifyContent: "space-between",
  }
})

export default connect (mapStateToProps, mapDispatchToProps) (LinksScreen)
import React, {useEffect, useState} from 'react';
import { ScrollView, 
  StyleSheet, 
  View,
  Text, 
  Image,
  Button } from 'react-native';
import {connect} from 'react-redux'
import {snooze, awake, ring, stop, setAlarmSound} from '../store/action'
import SoundPlayer from 'react-native-sound-player'
import AsyncStorage from '@react-native-community/async-storage';

const mapStateToProps = state => {
  return {
    alarm: state.alarm,
    alarmId: state.alarmId,
    alarmSound: state.alarmSound,
  }
}
 
const mapDispatchToProps = {snooze, awake, ring, stop, setAlarmSound}

function LinksScreen(props) {
  const [time, setTime] = useState('')
  const [title, setTitle] = useState('')

  useEffect(() => {
    AsyncStorage.getItem('alarmActiv8Me')
    .then(alarms => {
      let alarmList = JSON.parse(alarms)
      for (let i = 0; i < alarmList.length; i++){
        if (alarmList[i]._id === props.alarmId) {
          let now = alarmList[i].time 
          now = now.split(':')
          if (parseInt(now[0]) < 10){
            now[0] = '0' + now[0]
          }
          now = now.join(':')
          setTime(now)
          setTitle(alarmList[i].title)
        }
      }
    })
  }, [props.alarmId])

  useEffect(() => {
    const sound = ['siren', 'airhorn', 'vitas', 'star']
    let ind = Math.floor(Math.random() * Math.floor(sound.length))
    if (props.alarmSound === '') {
      props.setAlarmSound(sound[ind])
    }
    if (!props.alarm && props.alarmSound !== '') {
      try { 
        console.log(props.alarmSound)
        SoundPlayer.playSoundFile(props.alarmSound, ext[sound.indexOf(props.alarmSound)])
        // SoundPlayer.playSoundFile('star', 'wav')
        props.ring()
      } catch (e) {
          console.log(`cannot play the sound file`, e)
      }
    } else {
      try {
        SoundPlayer.addEventListener('FinishedPlaying', ({ success }) => {
          if (success) {
            props.stop()
          }
        })
      } catch (e) {
          console.log(`cannot play the sound file`, e)
      }
    }
  }, [props.alarm, props.alarmSound])

  return (
    <ScrollView style={styles.container}>
      <View style={styles.viewStyle}>
        <View style={{display:'flex', flexDirection:'row', alignContent: 'center'}}>
          <Text style={styles.clock}>{`${time.slice(0,2)} : ${time.slice(3,5)}`}</Text>
          <Text style={styles.meridiem}>{time.slice(6)}</Text>
          <Text>{title}</Text>
        </View>
        <Image
          source={require('../assets/pics/wakeUp.png')}
          style={{width:250, height:250, margin: 50}}
        />
        <Button
          onPress={() => {
            props.snooze()
            props.navigation.navigate('Game')
          }}
          title="Snooze"
          color="#ff8f4d"
          style={styles.buttonStyle}
        />
        <View style={{margin: 30}}></View>
        <Button
          onPress={() => {
            props.awake()
            props.navigation.navigate('Game')
          }}
          title="I'm awake"
          color="red"
          style={styles.buttonStyle}
        />
      </View>
    </ScrollView>
  );
}

LinksScreen.navigationOptions = {
  title: 'AlarmLanding',
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#ff8b17',
  },
  viewStyle: {
    padding: 10,
    marginTop: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  clock: {
    fontSize: 80,
    fontFamily: "Iceberg-Regular"
  },
  meridiem: {
    fontSize: 50,
    marginTop: 20,
    fontFamily: "Iceberg-Regular"
  },
  buttonStyle: {
    margin: 30
  }
});

export default connect (mapStateToProps, mapDispatchToProps) (LinksScreen)

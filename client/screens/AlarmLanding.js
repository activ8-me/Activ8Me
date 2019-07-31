import React, {useEffect, useState} from 'react';
import { ScrollView, 
  StyleSheet, 
  View,
  Text, 
  Image,
  Button,
  Animated,
  TouchableHighlight
 } from 'react-native';
import {connect} from 'react-redux'
import {snooze, awake, ring, stop, setAlarmSound} from '../store/action'
import Sound from 'react-native-sound'
import AsyncStorage from '@react-native-community/async-storage';
import { keyframes, stagger } from 'popmotion';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import Swipeable from 'react-native-swipeable';

const COUNT = 5;
const DURATION = 4000;
const initialPhase = {
  scale: 0,
  opacity: 1
};

const constructorAnimations = () => [...Array(COUNT).keys()].map(() => (initialPhase));
MyCustomComponent = Animatable.createAnimatableComponent(<Icon name="bell-o" size={30} color={"#ffffff"} style={{
  color: '#ffffff',
  fontSize: 30
}}></Icon>);


const leftButtons = [
  <TouchableHighlight
    style={{
      alignItems: 'flex-end',
      backgroundColor: 'black',
      height: 120,
      justifyContent: 'center',
      borderRadius:30,
      width:'100%',
      backgroundColor:'white'
    }}
  >
    <Text style={{ fontSize: 30, color: 'black', paddingRight:15}}> Snooze </Text>
  </TouchableHighlight>
];

const rightButtons = [
  <TouchableHighlight
    style={{
      alignItems: 'flex-start',
      backgroundColor: 'black',
      height: 120,
      justifyContent: 'center',
      borderRadius:30,
      width:'100%',
      backgroundColor:'white'
    }}
  >
    <Text style={{ fontSize: 30, color: 'black', paddingLeft:15}}> Awake </Text>
  </TouchableHighlight>
];

const mapStateToProps = state => {
  return {
    alarm: state.alarm,
    alarmId: state.alarmId,
    alarmSound: state.alarmSound,
  }
}
 
const mapDispatchToProps = {snooze, awake, ring, stop, setAlarmSound}
Sound.setCategory('Playback');
let alarm, alarmPlay

function LinksScreen(props) {
  const [time, setTime] = useState('')
  const [title, setTitle] = useState('')
  const [animations, setAnimations] = useState('')

  setAnimations(constructorAnimations())

  animateCircles = () => {
    const actions = Array(COUNT).fill(
      keyframes({
        values: [
          initialPhase,
          {
            scale: 2,
            opacity: 0
          }],
        duration: DURATION,
        loop: Infinity,
        yoyo: Infinity
      })
    )

  useEffect(() => {

  },[])

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
    const sound = ['vitas.wav', 'star.wav', 'crab.wav']
    let ind = Math.floor(Math.random() * Math.floor(sound.length))
    if (props.alarmSound === '') {
      props.setAlarmSound(sound[ind])
      alarm = new Sound(sound[ind], Sound.MAIN_BUNDLE, (error) => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }
          alarm.play()
          alarm.setNumberOfLoops(-1)
          alarmPlay = setInterval(() => {
            alarm.stop(() => {
              alarm.play()
            })
          }, alarm.getDuration()*1000)
      });
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
            props.navigation.navigate('Game', {alarm, alarmPlay})
          }}
          title="Snooze"
          color="#ff8f4d"
          style={styles.buttonStyle}
        />
        <View style={{margin: 30}}></View>
        <Button
          onPress={() => {
            props.awake()
            props.navigation.navigate('Game', {alarm, alarmPlay})
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

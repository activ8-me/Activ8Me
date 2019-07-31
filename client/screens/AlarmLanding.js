import React, { Component } from 'react';
import { Animated, Text, View, StyleSheet, TouchableHighlight, ScrollView, Image, Button, Dimensions} from 'react-native';
import { keyframes, stagger } from 'popmotion';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import Swipeable from 'react-native-swipeable';
import {connect} from 'react-redux';
import {snooze, awake, ring, stop, setAlarmSound} from '../store/action'
import Sound from 'react-native-sound';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';

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
      backgroundColor:'white',
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
      backgroundColor:'white',
    }}
  >
    <Text style={{ fontSize: 30, color: 'black', paddingLeft:15}}> Awake </Text>
  </TouchableHighlight>
];

Sound.setCategory('Playback');
let alarm, alarmPlay

class LinksScreen extends Component {
  constructor(props){
    super(props)
    this.state = {
      animations: constructorAnimations(),
      time:'',
      title:''
    }  
  }

  componentDidMount() {
    this.animateCircles()
  }

  componentDidUpdate(prevProps){
    console.log(prevProps)
    if(this.props.alarmId !== prevProps.alarmId){
      AsyncStorage.getItem('alarmActiv8Me')
      .then(alarms => {
        let alarmList = JSON.parse(alarms)
        for (let i = 0; i < alarmList.length; i++){
          if (alarmList[i]._id === this.props.alarmId) {
            let now = alarmList[i].time 
            now = now.split(':')
            if (parseInt(now[0]) < 10){
              now[0] = '0' + now[0]
            }
            now = now.join(':')
            this.setState({
              time:now,
              title:alarmList[i].title
            })
          }
        }
      })
    }
    
      const sound = ['vitas.wav', 'star.wav', 'crab.wav']
      let ind = Math.floor(Math.random() * Math.floor(sound.length))
      if (this.props.alarmSound === '') {
        this.props.setAlarmSound(sound[ind])
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
  }

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

    stagger(actions, DURATION / COUNT).start(animations => {
      this.setState({
        animations
      })
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{  marginBottom:100,
                        alignItems: 'center',
                        justifyContent: 'center'}}>
          <Animatable.Text style={styles.title}>{this.state.title ? this.state.title : 'Wake up Time'}</Animatable.Text>
          <Text style={styles.title2}>wakey wakey, sleepy head!</Text>
          <View style={{display:'flex', flexDirection:'row', alignContent: 'center'}}>
              <Text style={styles.clock}>{this.state.time ? `${this.state.time.slice(0,2)}:${this.state.time.slice(3,5)}` : moment().format('LT')[1] === ':' ? `0${moment().format('LT').slice(0,1)}:${moment().format('LT').slice(2,4)}` : `${moment().format('LT').slice(0,2)}:${moment().format('LT').slice(3,5)}`}</Text>
              <Text style={styles.meridiem}>{this.state.time ? this.state.time.slice(6) : moment().format('LT')[1] === ':' ? moment().format('LT').slice(5) : moment().format('LT').slice(6) }</Text>
            </View>
        </View>
        {
          this.state.animations.map(({ opacity, scale }, index) => {
            return <Animated.View
              key={index}
              style={[styles.circle, {
                transform: [{ scale }],
                opacity
              }]}
            />
          })
        }
        <View style={styles.midCircle}>
          <Animatable.Text animation="swing" easing="ease-out" iterationCount="infinite" style={styles.Icon}>🔔</Animatable.Text>
          <Text style={styles.text}>Ringing...</Text>
        </View>
        <Swipeable style={{marginTop:150}} leftButtons={leftButtons} rightButtons={rightButtons} 
        leftActionActivationDistance={150} rightActionActivationDistance={150} 
        onRightActionRelease={() => {
          this.props.awake()
          this.props.navigation.navigate('Game', {alarm, alarmPlay})
        }} 
        onLeftActionRelease={() => {
          this.props.snooze()
          this.props.navigation.navigate('Game', {alarm, alarmPlay})
        }}>
        <View style={{width: Dimensions.get('window').width, height: 120, justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
          <Animatable.Text style={styles.title3} animation="pulse" easing="ease-out" iterationCount="infinite">Swipe Me</Animatable.Text>
        </View>
        </Swipeable>
      </View>
    )
  }
}

LinksScreen.navigationOptions = {
  title: 'AlarmLanding',
};

const getCircle = (radius, backgroundColor = "#ffbf3f") => ({
  backgroundColor,
  width: radius * 2,
  height: radius * 2,
  borderRadius: radius,
  position: 'absolute'
})

const mapStateToProps = state => {
  return {
    alarm: state.alarm,
    alarmId: state.alarmId,
    alarmSound: state.alarmSound,
  }
}

const mapDispatchToProps = {snooze, awake, ring, stop, setAlarmSound}

const styles = StyleSheet.create({
  welcome: {
    backgroundColor: 'red'
  },
  instructions: {
    backgroundColor: 'blue'
  },
  instructions: {
    backgroundColor: 'green'
  },
  title: {
    fontSize: 35,
    color: 'black',
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  title2: {
    fontSize: 20,
    color: 'black',
    alignSelf: 'center',
  },
  title3: {
    fontSize: 40,
    color: 'white',
    alignSelf: 'center',
    fontWeight:'bold',
  },
  circle: getCircle(120),
  Icon: {
    color: '#ffffff',
    fontSize: 50
  },
  text: {
    paddingTop: '5%',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
  midCircle: {
    ...getCircle(75),
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: '#29323c',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffecd2'
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'black',
    height: 120,
    width: '100%',
    justifyContent: 'center',
  },
  clock: {
    fontSize: 80,
  },
  meridiem: {
    fontSize: 50,
    marginTop: 20,
  },
})
export default connect(mapStateToProps, mapDispatchToProps)(LinksScreen)
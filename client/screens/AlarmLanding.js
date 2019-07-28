import React, {useEffect} from 'react';
import { ScrollView, 
  StyleSheet, 
  View,
  Text, 
  Image,
  Button } from 'react-native';
import {connect} from 'react-redux'
import {snooze, awake, ring, stop} from '../store/action'
import SoundPlayer from 'react-native-sound-player'

const mapStateToProps = state => {
  return {
    alarm: state.alarm
  }
}
 
const mapDispatchToProps = {snooze, awake, ring, stop}

function LinksScreen(props) {

  useEffect(() => {
    if (!props.alarm) {
      try {
        SoundPlayer.playSoundFile('siren', 'wav')
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
  }, [props.alarm])

  return (
    <ScrollView style={styles.container}>
      <View style={styles.viewStyle}>
        <View style={{display:'flex', flexDirection:'row', alignContent: 'center'}}>
          <Text style={styles.clock}>08 : 00   </Text>
          <Text style={styles.meridiem}>AM</Text>
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

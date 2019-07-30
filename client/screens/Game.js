import React, {useEffect} from 'react';
import { View, StyleSheet } from 'react-native';
import {connect} from 'react-redux'
import {randomGame, ring, stop} from '../store/action'
import SoundPlayer from 'react-native-sound-player'

import WakeMeUp from '../game-list/wakemeup'
import MemoryGame from '../game-list/memorygame'
import FindMe from '../game-list/findme'
import MathGame from '../game-list/mathgame'

const mapStateToProps = state => {
  return {
    winning: state.winning,
    gameSelect: state.gameSelect,
    gameDone: state.gameDone,
    alarm: state.alarm,
    alarmSound: state.alarmSound,
  }
}

const mapDispatchToProps = {randomGame, ring, stop}

function LinksScreen (props) {
  let game = ['none','WakeMeUp', 'MemoryGame', 'FindMe', 'MathGame']
  // let game = ["MathGame"]
  // let game = ['none', 'WakeMeUp']

  useEffect(() => {
    if (props.winning === 1) {
      SoundPlayer.stop()
      props.stop()
      props.navigation.navigate('Result')
    } else {
      props.randomGame(game.length, props.gameDone)
    }
  }, [props.winning])

  useEffect(() => {
    if (!props.alarm) {
      try {
        SoundPlayer.playSoundFile(props.alarmSound, 'wav')
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
    <View style={styles.container}>
      {
        game[props.gameSelect] === "WakeMeUp" ? <WakeMeUp {...props} gameId={props.gameSelect}/> :
          game[props.gameSelect] === "MemoryGame" ? <MemoryGame {...props} gameId={props.gameSelect}/> :
          game[props.gameSelect] === "MathGame" ? <MathGame {...props} gameId={props.gameSelect}/> :
          game[props.gameSelect] === "FindMe" && <FindMe {...props} gameId={props.gameSelect}/>
        // <WakeMeUp {...props} gameId={props.gameSelect} />
      }
    </View>
  );
}

LinksScreen.navigationOptions = {
  title: 'Game',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    backgroundColor: '#ff8b17',
  },
});

export default connect (mapStateToProps, mapDispatchToProps) (LinksScreen)

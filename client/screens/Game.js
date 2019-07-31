import React, {useEffect} from 'react';
import { View, StyleSheet } from 'react-native';
import {connect} from 'react-redux'
import {randomGame, ring, stop} from '../store/action'

import WakeMeUp from '../game-list/wakemeup'
import MemoryGame from '../game-list/memorygame'
import FindMe from '../game-list/findme'
import MathGame from '../game-list/mathgame'
import BoxFall from '../game-list/boxfall'

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
  let game = ['none','WakeMeUp', 'MemoryGame', 'FindMe', 'MathGame', 'BoxFall']
  // let game = ['none', 'BoxFall']
  let alarm = props.navigation.getParam('alarm', null)
  let alarmPlay = props.navigation.getParam('alarmPlay', null)
  // let alarm2 = props.navigation.getParam('alarm2', null)
  // let alarm2Play = props.navigation.getParam('alarm2Play', null)
  useEffect(() => {
    if (props.winning === 5) {
      // console.log(alarm2Play, '======')
      console.log(alarmPlay, '++++')
      // clearInterval(alarm2Play)
      clearInterval(alarmPlay)
      // alarm2.stop()
      alarm.stop()
      props.stop()
      props.navigation.navigate('Result')
    } else {
      props.randomGame(game.length, props.gameDone)
    }
  }, [props.winning])

  return (
    <View style={styles.container}>
      {
          game[props.gameSelect] === "WakeMeUp" ? <WakeMeUp {...props} gameId={props.gameSelect}/> :
          game[props.gameSelect] === "MemoryGame" ? <MemoryGame {...props} gameId={props.gameSelect}/> :
          game[props.gameSelect] === "MathGame" ? <MathGame {...props} gameId={props.gameSelect}/> :
          game[props.gameSelect] === "BoxFall" ? <BoxFall {...props} gameId={props.gameSelect}/> :
          game[props.gameSelect] === "FindMe" && <FindMe {...props} gameId={props.gameSelect}/>
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

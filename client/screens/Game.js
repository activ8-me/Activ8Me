import React, {useEffect} from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import {connect} from 'react-redux'
import {randomGame} from '../store/action'

import WakeMeUp from '../game-list/wakemeup'
import MemoryGame from '../game-list/memorygame'

const mapStateToProps = state => {
  return {
    winning: state.winning,
    gameSelect: state.gameSelect,
    gameDone: state.gameDone
  }
}

const mapDispatchToProps = {randomGame}

function LinksScreen (props) {
  let game = ['WakeMeUp', 'MemoryGame']

  useEffect(() => {
    if (props.winning === 2){
      props.navigation.navigate('Result')
    } else {
      props.randomGame(game.length, props.gameDone)
    }
  }, [props.winning])

  return (
    <ScrollView style={styles.container}>
      {
        game[props.gameSelect] === "WakeMeUp" && <WakeMeUp {...props} gameId={props.gameSelect}/>
      }
      {
        game[props.gameSelect] === "MemoryGame" && <MemoryGame {...props} gameId={props.gameSelect}/>
      }
    </ScrollView>
  );
}

LinksScreen.navigationOptions = {
  title: 'Game',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});

export default connect (mapStateToProps, mapDispatchToProps) (LinksScreen)

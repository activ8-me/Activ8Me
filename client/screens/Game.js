import React, {useEffect, useState} from 'react';
import { ScrollView, StyleSheet, Text, Button } from 'react-native';
import {connect} from 'react-redux'
import {randomGame} from '../store/action'

import WakeMeUp from '../game-list/wakemeup'

const mapStateToProps = state => {
  return {
    winning: state.winning,
    gameSelect: state.gameSelect
  }
}

const mapDispatchToProps = {randomGame}

function LinksScreen (props) {
  let game = ["none", 'WakeMeUp']

  useEffect(() => {
    if (props.winning === 1){
      props.navigation.navigate('Result')
    }
    props.randomGame(game.length, props.gameSelect)
  }, [props.winning])

  return (
    <ScrollView style={styles.container}>
      {/**
       * Go ahead and delete ExpoLinksView and replace it with your content;
       * we just wanted to provide you with some helpful links.
       */
      }
      {
        game[props.gameSelect] === "WakeMeUp" && <WakeMeUp/>
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

import React from 'react';
import { ScrollView, StyleSheet, Text, Button } from 'react-native';

import WakeMeUp from '../game-list/wakemeup'

export default function LinksScreen(props) {
  let game = ["WakeMeUp"]

  return (
    <ScrollView style={styles.container}>
      {/**
       * Go ahead and delete ExpoLinksView and replace it with your content;
       * we just wanted to provide you with some helpful links.
       */}
       <WakeMeUp/>
      <Text style={{marginTop: 100, height: 80}}>Ini Game (tempat main)</Text>
      <Button
        onPress={() => {
            props.navigation.navigate('Result')
        }}
        title="Kalau dah menang, ke Result"
      />
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

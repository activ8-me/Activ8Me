import React from 'react';
import { ScrollView, StyleSheet, Text, Button } from 'react-native';

export default function LinksScreen(props) {
  return (
    <ScrollView style={styles.container}>
      {/**
       * Go ahead and delete ExpoLinksView and replace it with your content;
       * we just wanted to provide you with some helpful links.
       */}
      <Text>Ini AlarmList page</Text>
      <Button
        onPress={() => {
            props.navigation.navigate('AlarmForm')
        }}
        title="ke form alarm"
      />
      <Text>Tes alarm</Text>
      <Button
        onPress={() => {
            props.navigation.navigate('AlarmLanding')
        }}
        title="ke alarm landing"
      />
    </ScrollView>
  );
}

LinksScreen.navigationOptions = {
  title: 'AlarmList',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});

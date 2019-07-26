import React from 'react';
import { ScrollView, StyleSheet, Text, Button } from 'react-native';

export default function LinksScreen(props) {
  return (
    <ScrollView style={styles.container}>
      {/**
       * Go ahead and delete ExpoLinksView and replace it with your content;
       * we just wanted to provide you with some helpful links.
       */}
      <Text>Ini AlarmForm page</Text>
      <Button
        onPress={() => {
            props.navigation.navigate('AlarmList')
        }}
        title="balik ke list alarm (ceritanya ini submit)"
      />
    </ScrollView>
  );
}

LinksScreen.navigationOptions = {
  title: 'AlarmForm',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});

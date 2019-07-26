import React from 'react';
import { ScrollView, 
  StyleSheet, 
  Dimensions,
  View,
  Text, 
  Image,
  Button } from 'react-native';

export default function LinksScreen(props) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.viewStyle}>
        <Text style={styles.clock}>You WIN</Text>
        <Text style={styles.meridiem}>Sila tidur 10 menit lagi</Text>
        <Image
          source={require('../assets/pics/wakeUp.png')}
          style={{width:200, height:200, margin: 10, marginLeft: 20}}
        />
        <Button
          onPress={() => {
              props.navigation.navigate('AlarmList')
          }}
          title="List Alarm"
          color="#ff8b17"
          style={styles.buttonStyle}
        />
        <Button
          onPress={() => {
              props.navigation.navigate('AlarmLanding')
          }}
          title="Alarm page"
          color="#ff8b17"
          style={styles.buttonStyle}
        />
      </View>
    </ScrollView>
  );
}

LinksScreen.navigationOptions = {
  title: 'Result',
};

const win = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: win.width,
    height: win.height,
    backgroundColor: '#ff8b17',
  },
  viewStyle: {
    margin: 15,
    marginTop: 100,
    width: win.width,
    alignContent: 'center',
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
    margin: 30,
  }
});

import React from 'react';
import { ScrollView, 
  StyleSheet, 
  Dimensions,
  View,
  Text, 
  Image,
  Button } from 'react-native';
import {connect} from 'react-redux'
import {snooze, awake} from '../store/action'

const mapDispatchToProps = {snooze, awake}

function LinksScreen(props) {
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

export default connect (null, mapDispatchToProps) (LinksScreen)

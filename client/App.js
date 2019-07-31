import React, {Component} from 'react';
import Navigation from './navigation/AppNavigation'
import {Provider} from 'react-redux'
import store from './store'
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'react-native-firebase';

export default class App extends Component {
  async componentDidMount() {
    // console.log('masuk didmount')
    this.checkPermission();
    this.createNotificationListeners();
    console.disableYellowBox = true;
  }

  componentWillUnmount() {
    // console.log('keluar')
    this.messageListener();
  }

  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  }

  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    // console.log('fcmtoken', fcmToken, '======================')
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }
  }

  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
    } catch (error) {
      // User has rejected permissions
      console.log('Permission rejected');
    }
  }


async createNotificationListeners() {
  this.messageListener = firebase.messaging().onMessage(async (notification) => {
    const { alarmId } = notification.data;
    let payload = { alarmId: JSON.parse(alarmId), from: 1 }
    this.handleNotif(payload);
  });
}

async handleNotif(payload) {
  // console.log(payload.from)
  // console.log(payload.alarmId)
  let trigger = {
    alarmId: payload.alarmId
  }
  // console.log(trigger, "trigerrrr")
  await AsyncStorage.setItem('alarmTrigger', JSON.stringify(trigger))
}

  render() {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    );
  }
}
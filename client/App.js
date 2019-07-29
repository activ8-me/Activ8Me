import React, {Component} from 'react';
import Navigation from './navigation/AppNavigation'
import {Provider} from 'react-redux'
import store from './store'
import AsyncStorage from '@react-native-community/async-storage';
import { Alert } from 'react-native';
import firebase from 'react-native-firebase';
import moment from 'moment'

export default class App extends Component {

  async componentDidMount() {
    this.checkPermission();
    this.createNotificationListeners(); //add this line
  }
  componentWillUnmount() {
    this.notificationListener();
    this.notificationOpenedListener();
  }

  //1
async checkPermission() {
  const enabled = await firebase.messaging().hasPermission();
  if (enabled) {
      this.getToken();
  } else {
      this.requestPermission();
  }
}

  //3
async getToken() {
  let fcmToken = await AsyncStorage.getItem('fcmToken');
  if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
          // user has a device token
          console.log(fcmToken)
          await AsyncStorage.setItem('fcmToken', fcmToken);
      }
  }
}

  //2
async requestPermission() {
  try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
  } catch (error) {
      // User has rejected permissions
      console.log('permission rejected');
  }
}


async createNotificationListeners() {
  /*
  * Triggered when a particular notification has been received in foreground
  * */
  this.notificationListener = firebase.notifications().onNotification((notification) => {
      const { alarmId } = notification.data;
      console.log(alarmId)
      let payload = { alarmId: JSON.parse(alarmId), from: 1 }
      this.handleNotif(payload);
  });

  /*
  * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
  * */
  this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
    console.log('masuk notification opened listener')
    const { title, body } = notificationOpen.notification;
    const payload = {title, body, from: 2}
    this.handleNotif(payload);
  });

  /*
  * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
  * */
  const notificationOpen = await firebase.notifications().getInitialNotification();
  if (notificationOpen) {
    console.log('masuk notification open')
    const { title, body } = notificationOpen.notification;
    const payload = {title, body, from: 3}
    this.handleNotif(payload)
  }
  /*
  * Triggered for data only payload in foreground
  * */
  this.messageListener = firebase.messaging().onMessage((message) => {
    console.log(JSON.stringify(message));
  });
}

async handleNotif(payload) {
  console.log(payload.from)
  console.log(payload.alarmId)
  let trigger = {
    alarmId: payload.alarmId
  }

  console.log(trigger, "trigerrrr")

  await AsyncStorage.setItem('alarmTrigger', JSON.stringify(trigger))
  // Alert.alert(
  //   title, body,
  //   [
  //       { text: 'OK', onPress: () => console.log('OK Pressed') },
  //   ],
  //   { cancelable: false },
  // );
}

  render() {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    );
  }
}
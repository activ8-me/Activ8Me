// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  * @flow
//  */

// import React, {Fragment} from 'react';
// import {
//   SafeAreaView,
//   StyleSheet,
//   ScrollView,
//   View,
//   Text,
//   StatusBar,
// } from 'react-native';

// import {
//   Header,
//   LearnMoreLinks,
//   Colors,
//   DebugInstructions,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

// const App = () => {
//   return (
//     <Fragment>
//       <StatusBar barStyle="dark-content" />
//       <SafeAreaView>
//         <ScrollView
//           contentInsetAdjustmentBehavior="automatic"
//           style={styles.scrollView}>
//           <Header />
//           {global.HermesInternal == null ? null : (
//             <View style={styles.engine}>
//               <Text style={styles.footer}>Engine: Hermes</Text>
//             </View>
//           )}
//           <View style={styles.body}>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Step One</Text>
//               <Text style={styles.sectionDescription}>
//                 Edit <Text style={styles.highlight}>App.js</Text> to change this
//                 screen and then come back to see your edits.
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>See Your Changes</Text>
//               <Text style={styles.sectionDescription}>
//                 <ReloadInstructions />
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Debug</Text>
//               <Text style={styles.sectionDescription}>
//                 <DebugInstructions />
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Learn More</Text>
//               <Text style={styles.sectionDescription}>
//                 Read the docs to discover what to do next:
//               </Text>
//             </View>
//             <LearnMoreLinks />
//           </View>
//         </ScrollView>
//       </SafeAreaView>
//     </Fragment>
//   );
// };

// const styles = StyleSheet.create({
//   scrollView: {
//     backgroundColor: Colors.lighter,
//   },
//   engine: {
//     position: 'absolute',
//     right: 0,
//   },
//   body: {
//     backgroundColor: Colors.white,
//   },
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//     color: Colors.black,
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//     color: Colors.dark,
//   },
//   highlight: {
//     fontWeight: '700',
//   },
//   footer: {
//     color: Colors.dark,
//     fontSize: 12,
//     fontWeight: '600',
//     padding: 4,
//     paddingRight: 12,
//     textAlign: 'right',
//   },
// });

// export default App;

// import React, {Fragment} from 'react';
// import Navigation from './navigation/AppNavigation'

// export default function App() {
//   return (
//     <Fragment>
//       <Navigation />
//     </Fragment>
//   );
// }

import React, {Fragment, useEffect} from 'react';
import Navigation from './navigation/AppNavigation'
import {Provider} from 'react-redux'
import store from './store'
import { AsyncStorage } from 'react-native';
import firebase from 'react-native-firebase';

const App = () => {
  useEffect(() => {
    checkPermission();
    createNotificationListeners();
  }, [])

  useEffect(() => {
    return willUnmount()
  }, [])

  const willUnmount = () => {
    notificationListener()
    notificationOpenedListener()
  }

  const checkPermission = async () => {
    console.log('masuk ke checkpermission ==================')
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      console.log('masuk ke checkPermission enabled ==================')
        getToken();
    } else {
      console.log('checkPermission GAK enabled ==================')
        requestPermission();
    }
  }

  const getToken = async () => {
    console.log('masuk ke getToken ==================')
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
      console.log('masuk ke getToken gak pny fcmToken ==================')
        fcmToken = await firebase.messaging().getToken();
        if (fcmToken) {
            // user has a device token
            await AsyncStorage.setItem('fcmToken', fcmToken);
        }
    }
  }

  const requestPermission = async () => {
    console.log('masuk ke requestPermission ===========================')
    try {
        await firebase.messaging().requestPermission();
        // User has authorised
        getToken();
    } catch (error) {
        // User has rejected permissions
        console.log('permission rejected');
    }
  }

  const createNotificationListeners = async () => {
    console.log('masuk ke createNotificationListeners ==================')
    /*
    * Triggered when a particular notification has been received in foreground
    * */
    notificationListener = firebase.notifications().onNotification((notification) => {
      console.log('masuk ke notificationListener ===========================')
      const { title, body } = notification;
      showAlert(title, body);
    });
  
    /*
    * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
    * */
    notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
      console.log('masuk ke notificationOpenedListener ===========================')
      const { title, body } = notificationOpen.notification;
      showAlert(title, body);
    });
  
    /*
    * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
    * */
    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
      console.log('masuk ke notificationOpen ==================')
      const { title, body } = notificationOpen.notification;
      showAlert(title, body);
    }
    /*
    * Triggered for data only payload in foreground
    * */
    messageListener = firebase.messaging().onMessage((message) => {
      //process data message
      console.log(JSON.stringify(message));
    });
  }
  
  const showAlert = (title, body) => {
    console.log('masuk ke showAlert ==================')
    
    Alert.alert(
      title, body,
      [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false },
    );
  }
  
  

  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};

export default App;
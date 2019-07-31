// import SendIntentAndroid from 'react-native-send-intent';
import SajjadLaunchApplication from 'react-native-launch-application';

import AsyncStorage from '@react-native-community/async-storage';

export default async (notification) => {
    const { alarmId } = notification.data;
    let payload = { alarmId: JSON.parse(alarmId), from: 1 }
    let trigger = {
        alarmId: payload.alarmId
    }
    await AsyncStorage.setItem('alarmTrigger', JSON.stringify(trigger))
    // await SendIntentAndroid.openApp('com.activ8me')
    SajjadLaunchApplication.open('com.activ8me');
    return Promise.resolve();    
}
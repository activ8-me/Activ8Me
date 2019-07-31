import SendIntentAndroid from 'react-native-send-intent';
import AsyncStorage from '@react-native-community/async-storage';

export default async (notification) => {
    await SendIntentAndroid.openApp('com.activ8me')
    const { alarmId } = notification.data;
    let payload = { alarmId: JSON.parse(alarmId), from: 1 }
    let trigger = {
        alarmId: payload.alarmId
    }
    await AsyncStorage.setItem('alarmTrigger', JSON.stringify(trigger))
    return Promise.resolve();    
}
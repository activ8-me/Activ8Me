import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator
} from 'react-navigation'
import Landing from '../screens/Landing'
import UserForm from '../screens/UserForm'
import AlarmList from '../screens/AlarmList'
import AlarmForm from '../screens/AlarmForm'
import AlarmLanding from '../screens/AlarmLanding'
import Game from '../screens/Game'
import Result from '../screens/Result'
import {Text, View} from 'react-native'
import React from 'react'
import {Button} from 'native-base'

const StackNavigatorUser = createStackNavigator(
  {
    Landing: {
      screen: Landing,
      navigationOptions: {
        header: null,
        // headerTitle: 'Activ8Me',
        // headerStyle: {
        //   backgroundColor: '#FF8B17',
        // },
        // headerTintColor: '#fff',
        // headerTitleStyle: {
        //   fontWeight: 'bold',
        //   textAlign: 'center',
        //   flex: 1
        // }
      }
    },
    Form: {
      screen: UserForm,
      navigationOptions: {        
        header: null,
      }
      // ({navigation}) => ({
      //   headerLeft: () => {
      //     return (
      //       <View>
      //         <Button 
      //         onPress={() => navigation.navigate('Landing')} 
      //         style={{
      //           marginLeft: 5,
      //           padding: 15,
      //           justifyContent: 'center',
      //           borderColor: "white",
      //           borderWidth: 2,
      //           backgroundColor:'#FF9831',
      //           borderRadius: 10,
      //         }}>
      //             <Text style={{ fontSize: 15, color: 'white', }}>BACK</Text>
      //           </Button>
      //       </View>)
      //   },
      //   headerStyle: {
      //     backgroundColor: '#FF8B17',
      //   },
      //   headerTintColor: '#fff',
      //   headerTitleStyle: {
      //     fontWeight: 'bold',
      //     flex: 1,
      //     justifyContent: 'flex-start'
      //   }
      // })
    }
  },
  {
    initialRouteName: 'Landing',
  }
);

const StackNavigatorAlarm = createStackNavigator(
  {
    AlarmList: {
      screen: AlarmList,
      navigationOptions: () => ({
        headerTitle: 'Your Alarms',
        headerStyle: {
          backgroundColor: '#FF8B17',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          textAlign: 'center',
          fontFamily: "FredokaOne-Regular",
          flex: 1
        }
      }),
    },
    AlarmForm: {
      screen: AlarmForm,
      navigationOptions: () => ({
        headerTitle: 'Alarm Form',
        headerLeft: null,
        headerStyle: {
          backgroundColor: '#FF8B17',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          textAlign: 'center',
          fontFamily: "FredokaOne-Regular",
          flex: 1
        }
      }),
    }
  },
  {
    initialRouteName: 'AlarmList',
    defaultNavigationOptions: {
      headerTitle: 'Your Alarms',
      headerStyle: {
        backgroundColor: '#FF8B17',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
        textAlign: 'center',
        flex: 1
      }
    }
  }
);

const SwitchNavigator1 = createSwitchNavigator(
  {
    StackNavigatorUser,
    StackNavigatorAlarm
  },
  {
    initialRouteName: 'StackNavigatorAlarm',
    defaultNavigationOptions: {
      title: 'Activ8Me',
    }
  }
);
  
const SwitchNavigator2 = createSwitchNavigator(
  {
    AlarmLanding,
    Game,
    Result
  },
  {
    initialRouteName: 'AlarmLanding',
    defaultNavigationOptions: {
      title: 'Activ8Me',
    }
  }
)

export default createAppContainer(createSwitchNavigator(
  {
    SwitchNavigator1,
    SwitchNavigator2
  },
  {
    initialRouteName: 'SwitchNavigator1',
  }
));

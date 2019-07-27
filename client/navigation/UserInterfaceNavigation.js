import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator
} from 'react-navigation'
import Landing from '../screens/Landing'
import UserForm from '../screens/UserForm'
import AlarmList from '../screens/AlarmList'
import AlarmForm from '../screens/AlarmForm'

const StackNavigatorUser = createStackNavigator(
  {
    Landing: {
      screen: Landing
    },
    Form: {
      screen: UserForm
    }
  },
  {
    initialRouteName: 'Landing'
  }
);

const StackNavigatorAlarm = createStackNavigator(
  {
    AlarmList: {
      screen: AlarmList
    },
    AlarmForm: {
      screen: AlarmForm
    }
  },
  {
    initialRouteName: 'AlarmList'
  }
);


const SwitchNavigator = createSwitchNavigator(
  {
    StackNavigatorUser,
    StackNavigatorAlarm
  },
  {
    initialRouteName: 'StackNavigatorUser'
  }
);
  

export default createAppContainer(SwitchNavigator);
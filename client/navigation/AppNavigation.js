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
    initialRouteName: 'Landing',
    defaultNavigationOptions: {
      title: 'Activ8Me',
    }
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
    initialRouteName: 'AlarmList',
    defaultNavigationOptions: {
      title: 'Activ8Me',
    }
  }
);


const SwitchNavigator1 = createSwitchNavigator(
  {
    StackNavigatorUser,
    StackNavigatorAlarm
  },
  {
    initialRouteName: 'StackNavigatorUser',
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
    defaultNavigationOptions: {
      title: 'Activ8Me',
    }
  }
));

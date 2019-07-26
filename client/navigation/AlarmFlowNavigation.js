import {
    createAppContainer,
    createSwitchNavigator
} from 'react-navigation'
import AlarmLanding from '../screens/AlarmLanding'
import Game from '../screens/Game'
import Result from '../screens/Result'

export default createAppContainer(createSwitchNavigator(
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
));
  
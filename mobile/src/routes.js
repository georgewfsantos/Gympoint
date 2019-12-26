import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import Sign from '~/pages/Sign';

import Checkin from '~/pages/Checkin';
import HelpOrders from '~/pages/HelpOrders';

export default (signedIn = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        SignRoute: createSwitchNavigator({
          Sign,
        }),
        App: createBottomTabNavigator(
          {
            Checkin,
            HelpOrders,
          },
          {
            tabBarOptions: {
              keyboardHidesTabBar: true,
              activeTintColor: '#ee4d64',
              inactiveTintColor: '#999999',
              style: {
                backgroundColor: '#ffffff',
                borderColor: '#999999',
              },
            },
          },
        ),
      },
      {
        initialRouteName: signedIn ? 'App' : 'SignRoute',
      },
    ),
  );

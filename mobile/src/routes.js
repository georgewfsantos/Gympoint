import React from 'react';
import Image from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Sign from '~/pages/Sign';

import Checkin from '~/pages/Checkin';
import HelpOrderList from '~/pages/HelpOrders/HelpOrderList';
import HelpOrderDetail from '~/pages/HelpOrders/HelpOrderDetail';
import NewHelpOrder from '~/pages/HelpOrders/NewHelpOrder';
import LogoTitle from './components/LogoTitle';

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
            HelpOrders: {
              screen: createStackNavigator(
                {
                  HelpOrderList,
                  HelpOrderDetail,
                  NewHelpOrder,
                },
                {
                  headerLayoutPreset: 'center',
                  defaultNavigationOptions: {
                    headerTitle: () => <LogoTitle />,
                    headerLeftContainerStyle: {
                      marginLeft: 20,
                    },
                  },
                },
              ),
              navigationOptions: {
                tabBarLabel: 'Pedir ajuda ',
                tabBarIcon: ({tintColor}) => (
                  <Icon name="live-help" size={20} color={tintColor} />
                ),
              },
            },
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

import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Sign from '~/pages/Sign';

import CheckIns from '~/pages/Checkin/CheckIns';
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
            Checkin: {
              screen: createStackNavigator(
                {
                  CheckIns,
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
                tabBarLabel: 'Check-ins  ',
                tabBarIcon: ({tintColor}) => (
                  <Icon name="edit-location" size={20} color={tintColor} />
                ),
              },
            },
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

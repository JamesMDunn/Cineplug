import React from 'react';
import {View, Text} from 'react-native';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import HomeScreen from '../screens/HomeScreen';

const BottomTabNavigator = createBottomTabNavigator(
  {
    Home: HomeScreen,
  },
  {
    tabBarOptions: {
      showLabel: true,
      style: {
        shadowColor: 'rgba(58,55,55,0.1)',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 1,
        fontColor: 'white',
        elevation: 3,
        borderTopColor: 'transparent',
        backgroundColor: '#141414',
        height: 50,
      },
      labelStyle: {
        color: 'white',
      },
    },
  },
);

export default BottomTabNavigator;

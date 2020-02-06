import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from '../screens/HomeScreen';
import MoviePage from '../screens/MoviePage';
import Search from '../screens/Search';
import Actor from '../screens/Actor';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHome} from '@fortawesome/free-solid-svg-icons';

const movieFlow = createStackNavigator({
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: {header: null},
  },
  SearchScreen: {
    screen: Search,
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#141414',
      },
      headerTintColor: 'white',
    },
  },
  MoviePage: {
    screen: MoviePage,
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#141414',
      },
      headerTintColor: 'white',
    },
  },
  ActorPage: {
    screen: Actor,
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#141414',
      },
      headerTintColor: 'white',
    },
  },
});

movieFlow.navigationOptions = {
  tabBarIcon: <FontAwesomeIcon icon={faHome} color={'grey'} />,
};

const switchNavigator = createSwitchNavigator({
  mainFlow: createBottomTabNavigator(
    {
      Home: movieFlow,
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
  ),
});
export default createAppContainer(switchNavigator);

import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';

const ActorCard = props => {
  return (
    <TouchableOpacity
      onPress={() =>
        props.navigation.navigate('ActorPage', {
          currentActor: props.actor,
          movieClick: props.movieClick,
        })
      }
      style={{marginRight: 15, height: 240}}>
      <FastImage
        resizeMode={'contain'}
        style={{height: 150, width: 100, borderRadius: 10}}
        source={{
          uri: `https://image.tmdb.org/t/p/w500${props.actor.profile_path}`,
        }}
      />
      <View style={{flex: 1}}>
        <Text
          style={{
            fontWeight: 'bold',
            color: 'white',
            width: 100,
            flexWrap: 'wrap',
          }}>
          {props.actor.name}
        </Text>
        <Text
          style={{color: 'white', width: 100, flexWrap: 'wrap', fontSize: 12}}>
          {props.actor.character}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ActorCard;

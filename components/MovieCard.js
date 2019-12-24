import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import FastImage from 'react-native-fast-image';

const MovieCard = props => {
  return (
    <TouchableOpacity
      onPress={() => props.handleMovieClick(props.movie)}
      style={{}}>
      <FastImage
        resizeMode={'contain'}
        source={{
          priority: FastImage.priority.normal,
          uri: `https://image.tmdb.org/t/p/original${props.movie.poster_path}`,
        }}
        style={{width: 200, height: 200, borderRadius: 10}}></FastImage>
      <Text>{props.movie.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    color: 'white',
  },
});

export default MovieCard;

import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';

const NewMoviesCard = props => {
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
        style={{width: 255, height: 360, borderRadius: 10}}></FastImage>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    color: 'white',
  },
});

export default NewMoviesCard;

import React from 'react';
import {StyleSheet, Image, TouchableOpacity} from 'react-native';

const NewMoviesCard = props => {
  return (
    <TouchableOpacity
      onPress={() => props.handleMovieClick(props.movie)}
      style={{flex: 1, marginRight: 0}}>
      <Image
        resizeMode={'contain'}
        source={{
          uri: `https://image.tmdb.org/t/p/original${props.movie.poster_path}`,
        }}
        style={{width: 255, height: 360, borderRadius: 10}}></Image>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    color: 'white',
  },
});

export default NewMoviesCard;

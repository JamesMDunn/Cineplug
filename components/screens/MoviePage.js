import React from 'react';
import {StyleSheet, View, Text, FlatList, ScrollView} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {WebView} from 'react-native-webview';
import ActorCard from '../ActorCard';
import FastImage from 'react-native-fast-image';

const MoviePage = props => {
  const {
    movie,
    cast,
    movieVideos,
    genres,
    movieClick,
  } = props.navigation.state.params;
  const genre = genres.filter(genre => genre.id === movie.genre_ids[0]);

  // console.log('MOVIE PAGE ----> ', props.navigation.state.params.movieClick);

  return (
    <ScrollView style={{flex: 1, backgroundColor: '#000000'}}>
      <View style={styles.posterContainer}>
        <FastImage
          resizeMode={'stretch'}
          source={{
            priority: FastImage.priority.normal,
            uri: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
          }}
          style={{
            width: 410,
            height: 500,
            opacity: 0.5,
          }}></FastImage>
      </View>
      <View style={{marginLeft: 14}}>
        <Text style={styles.title}>{movie.title}</Text>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Text style={{color: '#7C7C7C'}}>
            {genre[0].name} {'  '}
            {movie.release_date.substring(0, 4)}
          </Text>
          <Text style={{color: '#7C7C7C', marginLeft: 10}}>
            {movie.vote_average * 10}%
          </Text>
        </View>
        <Text style={{color: 'white', marginTop: 10}}>Synopsis</Text>
        <Text style={{color: '#7C7C7C', marginTop: 10}}>{movie.overview}</Text>
        <Text style={{color: 'white', marginTop: 10}}>Videos</Text>
        <ScrollView horizontal={true} style={{flex: 1, marginTop: 10}}>
          {movieVideos.map(video => (
            <View style={{marginRight: 20}}>
              <WebView
                mediaPlaybackRequiresUserAction={true}
                javaScriptEnabled={true}
                allowsFullscreenVideo={true}
                domStorageEnabled={true}
                source={{uri: `https://www.youtube.com/embed/${video.key}`}}
                style={{
                  alignSelf: 'center',
                  height: 170,
                  width: 300,
                  backgroundColor: 'white',
                }}
              />
            </View>
          ))}
        </ScrollView>
        <Text style={{color: 'white', marginTop: 10, marginBottom: 10}}>
          Cast and crew
        </Text>
        <View style={{flex: 1}}>
          <FlatList
            horizontal={true}
            data={cast}
            keyExtractor={(item, index) => item.cast_id}
            renderItem={({item}) => (
              <ActorCard
                actor={item}
                navigation={props.navigation}
                movieClick={movieClick}
              />
            )}></FlatList>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  posterContainer: {
    height: 400,
    overflow: 'hidden',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  title: {
    color: 'white',
    fontSize: 30,
  },
});

export default MoviePage;

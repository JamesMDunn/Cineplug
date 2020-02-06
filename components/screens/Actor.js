import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import MovieCard from '../MovieCard';

import {REACT_APP_MOVIE_API} from 'react-native-dotenv';
import {ScrollView} from 'react-native-gesture-handler';
import {act} from 'react-test-renderer';

const Actor = props => {
  const [currentActor, setCurrentActor] = useState(
    props.navigation.state.params.currentActor,
  );
  const [actorDetails, setActorDetails] = useState({});
  const [actorMovies, setActorMovies] = useState([]);

  useEffect(() => {
    getActorDetails();
    getActorMovies();
  }, []);

  const getActorDetails = () => {
    fetch(
      `https://api.themoviedb.org/3/person/${currentActor.id}?api_key=${REACT_APP_MOVIE_API}&language=en-US`,
    )
      .then(res => res.json())
      .then(res => setActorDetails(res));
  };
  const getActorMovies = () => {
    fetch(
      `https://api.themoviedb.org/3/credit/${currentActor.credit_id}?api_key=${REACT_APP_MOVIE_API}`,
    )
      .then(res => res.json())
      .then(res => setActorMovies(res.person.known_for));
  };

  //   console.log(props.navigation.state.params.movieClick);
  return (
    <ScrollView style={styles.container}>
      <View style={{marginTop: 10, flex: 1, flexDirection: 'row'}}>
        <FastImage
          resizeMode={'contain'}
          style={{height: 300, width: 220, borderRadius: 10}}
          source={{
            uri: `https://image.tmdb.org/t/p/w500${currentActor.profile_path}`,
          }}
        />
        <View>
          <Text
            style={{
              color: 'white',
              fontSize: 30,
              width: 200,
              flexWrap: 'wrap',
            }}>
            {currentActor.name}
          </Text>
          {actorDetails.deathday === null ? (
            <>
              <Text style={{color: 'white', fontSize: 15}}>
                Birthday {moment(actorDetails.birthday).format('MM-DD-YYYY')}
              </Text>
              <Text style={{color: 'white', fontSize: 20}}>
                Age {moment().diff(actorDetails.birthday, 'years')}
              </Text>
            </>
          ) : (
            <>
              <Text style={{color: 'white', fontSize: 15}}>
                {moment(actorDetails.birthday).format('MM-DD-YYYY')} -{' '}
                {moment(actorDetails.deathday).format('MM-DD-YYYY')}
              </Text>
              <Text style={{color: 'white', fontSize: 20}}>
                Died at Age{' '}
                {moment(actorDetails.deathday).diff(
                  actorDetails.birthday,
                  'years',
                )}
              </Text>
            </>
          )}
        </View>
      </View>
      <View style={{marginTop: 10}}>
        <Text style={{color: 'white'}}>{actorDetails.biography}</Text>
      </View>
      {actorMovies ? (
        <View style={{flex: 1, marginTop: 15}}>
          <Text style={{color: 'white', fontSize: 20}}>Mostly Known For</Text>
          <FlatList
            horizontal={true}
            data={actorMovies}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <MovieCard
                handleMovieClick={props.navigation.state.params.movieClick}
                movie={item}
              />
            )}></FlatList>
        </View>
      ) : (
        <> </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
});

export default Actor;

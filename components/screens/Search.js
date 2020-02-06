import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import MovieCard from '../MovieCard';
import Loading from '../Loading';
import {REACT_APP_MOVIE_API} from 'react-native-dotenv';

const Search = props => {
  const [searchText, setSearchText] = useState('');
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const searchChange = text => {
    setIsLoading(true);
    setSearchText(text);
    if (text.length > 0) {
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${REACT_APP_MOVIE_API}&language=en-US&query=${text}&page=1&include_adult=false`,
      )
        .then(res => res.json())
        .then(res => {
          setMovies(res.results);
          setIsLoading(false);
        });
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={{
          height: 40,
          borderColor: 'white',
          borderWidth: 1,
          backgroundColor: 'white',
        }}
        onChangeText={text => searchChange(text)}
        value={searchText}></TextInput>
      <View style={{flex: 1, marginTop: 20}}>
        {isLoading ? (
          <Loading />
        ) : (
          <FlatList
            numColumns={2}
            horizontal={false}
            data={movies}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <MovieCard
                handleMovieClick={props.navigation.state.params.movieFunction}
                movie={item}
              />
            )}></FlatList>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
});

export default Search;

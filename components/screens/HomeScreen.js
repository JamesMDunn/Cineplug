import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  FlatList,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHome} from '@fortawesome/free-solid-svg-icons';
import NewMoviesCard from '../NewMoviesCard';
import MoviePage from './MoviePage';

import {REACT_APP_MOVIE_API} from 'react-native-dotenv';

const TabIcon = props => (
  <FontAwesomeIcon icon={faHome} color={props.focused ? 'grey' : 'darkgrey'} />
);

class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      newReleases: [],
      currentMovie: {},
      genres: [],
      movieVideos: [],
      castList: [],
      movieSelected: false,
    };
    this.handleMovieClick = this.handleMovieClick.bind(this);
    this.handleMovieBackButton = this.handleMovieBackButton.bind(this);
  }
  static navigationOptions = {
    tabBarIcon: TabIcon,
  };

  componentDidMount() {
    this.getNewReleases();
    this.getGenres();
  }

  handleMovieBackButton() {
    this.setState({movieSelected: false});
  }

  getCastList(id) {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${REACT_APP_MOVIE_API}`,
    )
      .then(res => res.json())
      .then(res => this.setState({castList: res.cast}));
  }

  getGenres() {
    fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${REACT_APP_MOVIE_API}&language=en-US`,
    )
      .then(res => res.json())
      .then(res => this.setState({genres: res.genres}));
  }

  getMovieVideos(id) {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${REACT_APP_MOVIE_API}&language=en-US`,
    )
      .then(res => res.json())
      .then(res => this.setState({movieVideos: res.results}));
  }

  handleMovieClick(movie) {
    this.getMovieVideos(movie.id);
    this.getCastList(movie.id);
    this.setState({
      currentMovie: movie,
      movieSelected: true,
    });
  }

  getNewReleases() {
    fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${REACT_APP_MOVIE_API}&language=en-US&page=1`,
    )
      .then(res => res.json())
      .then(res => this.setState({newReleases: res.results}))
      .catch(err => console.error(err));
  }

  render() {
    return (
      <>
        <View style={styles.container}>
          {this.state.movieSelected ? (
            <MoviePage
              castList={this.state.castList}
              movieVideos={this.state.movieVideos}
              handleMovieBackButton={this.handleMovieBackButton}
              genres={this.state.genres}
              movie={this.state.currentMovie}
            />
          ) : (
            <>
              <View style={styles.logoContainer}>
                <Text style={styles.logo}>MVIES</Text>
              </View>
              <View style={{flex: 1}}>
                <FlatList
                  horizontal={true}
                  data={this.state.newReleases}
                  keyExtractor={item => item.id}
                  renderItem={({item}) => (
                    <NewMoviesCard
                      handleMovieClick={this.handleMovieClick}
                      movie={item}
                    />
                  )}></FlatList>
              </View>
            </>
          )}
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  logoContainer: {
    flex: 0.1,
    alignContent: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
  },
  logo: {
    color: 'white',
    fontSize: 30,
  },
});

export default HomeScreen;

import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ScrollView,
  SectionList,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHome, faSearch} from '@fortawesome/free-solid-svg-icons';
import NewMoviesCard from '../NewMoviesCard';
import MovieCard from '../MovieCard';

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
      mostPopular: [],
      genres: [],
      movieVideos: [],
      castList: [],
    };
    this.handleMovieClick = this.handleMovieClick.bind(this);
  }

  static navigationOptions = {
    tabBarIcon: TabIcon,
  };

  componentDidMount() {
    this.getNewReleases();
    this.getGenres();
    this.getMostPopular();
  }

  async getCastList(id) {
    let response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${REACT_APP_MOVIE_API}`,
    );
    let json = await response.json();
    return json.cast;
  }

  getGenres() {
    fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${REACT_APP_MOVIE_API}&language=en-US`,
    )
      .then(res => res.json())
      .then(res => this.setState({genres: res.genres}));
  }

  async getMovieVideos(id) {
    let response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${REACT_APP_MOVIE_API}&language=en-US`,
    );
    let json = await response.json();
    return json.results;
  }

  async handleMovieClick(movie) {
    let movieVideos = await this.getMovieVideos(movie.id);
    let castList = await this.getCastList(movie.id);
    this.setState(
      {
        currentMovie: movie,
        castList: castList,
        movieVideos: movieVideos,
      },
      () => {
        this.props.navigation.navigate('MoviePage', {
          movie: this.state.currentMovie,
          genres: this.state.genres,
          cast: this.state.castList,
          movieVideos: this.state.movieVideos,
        });
      },
    );
  }

  getMostPopular() {
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${REACT_APP_MOVIE_API}&language=en-US&page=1`,
    )
      .then(res => res.json())
      .then(res => this.setState({mostPopular: res.results}));
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
          <StatusBar backgroundColor="#000000" />
          <ScrollView>
            <View style={styles.logoContainer}>
              <Text style={styles.logo}>CinePlug</Text>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('SearchScreen', {
                    movieFunction: this.handleMovieClick,
                  })
                }>
                <FontAwesomeIcon
                  icon={faSearch}
                  color={'white'}
                  size={30}
                  style={{marginTop: 20, marginRight: 10}}
                />
              </TouchableOpacity>
            </View>
            <View style={{flex: 1}}>
              <Text style={{color: 'white', marginLeft: 10, marginBottom: 10}}>
                New Releases
              </Text>
              <View style={{marginBottom: 10}}>
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
              <Text style={{color: 'white', marginLeft: 10, marginBottom: 10}}>
                Most Popular
              </Text>
              <View style={{flex: 1}}>
                <FlatList
                  numColumns={2}
                  horizontal={false}
                  data={this.state.mostPopular}
                  keyExtractor={item => item.id}
                  renderItem={({item}) => (
                    <MovieCard
                      handleMovieClick={this.handleMovieClick}
                      movie={item}
                    />
                  )}></FlatList>
              </View>
            </View>
          </ScrollView>
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
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingLeft: 10,
  },
  logo: {
    color: 'white',
    fontSize: 30,
    marginTop: 10,
  },
});

export default HomeScreen;

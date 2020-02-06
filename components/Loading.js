import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import MovieDBLogo from './MDBlogo.png';

const Loading = props => {
  console.log(props);
  return (
    <View style={styles.container}>
      <FastImage
        resizeMode={'contain'}
        style={{
          height: 150,
          width: 100,
          borderRadius: 10,
          justifyContent: 'center',
          alignSelf: 'center',
        }}
        source={MovieDBLogo}
      />
      <ActivityIndicator size="large" color="#00D474" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000000',
  },
});

export default Loading;

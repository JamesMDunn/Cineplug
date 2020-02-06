import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  TouchableOpacity,
} from 'react-native';

class Login extends React.Component {
  state = {email: '', password: '', errorMessage: null};
  handleLogin = () => {
    // TODO: For Firebase athu
    console.log('handleSignUp');
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={{color: 'white', fontSize: 40}}>Login</Text>
        {this.state.errorMessage && (
          <Text style={{color: 'red'}}>{this.state.errorMessage}</Text>
        )}
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          placeholderTextColor="white"
          style={styles.textInput}
          onChangeText={email => this.setState({email})}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          placeholderTextColor="white"
          style={styles.textInput}
          onChangeText={password => this.setState({password})}
          value={this.state.password}
        />
        <Button title="Sign Up" color="#e93766" onPress={this.handleLogin} />
        <View>
          <Text style={{color: 'white'}}>
            {' '}
            Don't have an account?{' '}
            <Text
              onPress={() => this.props.navigation.navigate('Signup')}
              style={{color: 'white', fontSize: 18}}>
              {' '}
              Sign Up{' '}
            </Text>
          </Text>
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  textInput: {
    height: 40,
    fontSize: 20,
    width: '90%',
    color: 'white',
    placeholderTextColor: 'white',
    borderColor: 'white',
    borderBottomWidth: 1,
    marginTop: 8,
    marginVertical: 15,
  },
};

export default Login;

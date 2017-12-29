/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

import FBSDK from 'react-native-fbsdk';

const { AccessToken, LoginManager } = FBSDK;


export default class LogOut extends React.PureComponent {

  componentDidMount() {
    AccessToken.getCurrentAccessToken().then((data) => {
      console.log('token', data);   
    });
  }
  handlerLogOutFb = () => {
    LoginManager.logOut();
  }
  render() {
    return (
      <View style={styles.container} >
        <Button
          onPress={this.handlerLogOutFb}
          title="Log Out"
          color="#3b5998"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
});

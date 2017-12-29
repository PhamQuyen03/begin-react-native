/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

import FBSDK from 'react-native-fbsdk';
import firebase from 'firebase';
import { FACEBOOK_PERMISSIONS } from '../../../redux/constants';

const { LoginButton, AccessToken, LoginManager } = FBSDK;
const configure = {
  apiKey: 'AIzaSyAi6LKa1ub-sm5evTr2NoJeRwJOKHibs2M',
  authDomain: 'sample-49071.firebaseapp.com',
  databaseURL: 'https://sample-49071.firebaseio.com',
  projectId: 'sample-49071',
  storageBucket: 'sample-49071.appspot.com',
  messagingSenderId: '654960816099'
};
firebase.initializeApp(configure);

export default class ButtonLoginFB extends React.PureComponent {

  componentDidMount() {
      AccessToken.getCurrentAccessToken().then((data) => {
        console.log('token', data);      
      });
  }
  handlerLoginFb = () => {
    LoginManager.logInWithReadPermissions(FACEBOOK_PERMISSIONS).then(
      (result) => {
        if (result.isCancelled) {
          alert('Login was cancelled');
        } else {
          AccessToken.getCurrentAccessToken().then((data) => {
            const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
            firebase.auth().signInWithCredential(credential).then(result => {
              console.log('result', result);
            }, (error) => {
            // do something
              console.log('error1', error);
            });
            // alert(data.accessToken.toString())
          }, (error) => {
            // do something
            console.log('error2', error);            
          }
        );
        }
      },
      (error) => {
        alert(`Login failed with error: ${error}`);
      }
    );
  }
  render() {
    return (
      <View style={styles.container}>
        {/* <LoginButton
          publishPermissions={['publish_actions']}
          onLoginFinished={
            (error, result) => {
              if (error) {
                alert('login has error: ' + result.error);
              } else if (result.isCancelled) {
                alert('login is cancelled.');
              } else {
                AccessToken.getCurrentAccessToken().then((data) => {
                    const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
                    firebase.auth().signInWithCredential(credential).then(result => {
                      LoginManager.logInWithReadPermissions(FACEBOOK_PERMISSIONS);
                    }, (error) => {
                    // do something
                    });
                    // alert(data.accessToken.toString())
                  }, (error) => {
                    // do something
                  }
                );
              }
            }
          }
          onLogoutFinished={() => {}}
        /> */}
        <Button
          onPress={this.handlerLoginFb}
          title="Login Facebook"
          color="#3b5998"
          accessibilityLabel="Learn more about this purple button"
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
    marginBottom: 10,
  },
});

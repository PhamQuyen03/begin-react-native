/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
// import {
//   StyleSheet,
// } from 'react-native';
import { Provider } from 'react-redux';
import buildStore from './redux/store/index';
import BookingCar from './app/index';

const store = buildStore();

export default class App extends React.PureComponent {
  render() {
    return (
      <Provider store={store}>      
        <BookingCar />
      </Provider>

    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });
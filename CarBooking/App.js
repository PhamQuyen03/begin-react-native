/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import { View, StyleSheet} from 'react-native';
import { Provider } from 'react-redux';
import buildStore from './redux/store/index';
import BookingCar from './app/index';
import { FirebaseController } from './app/controllers';

const store = buildStore();

export default class App extends React.PureComponent {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>   
          <BookingCar />
          <FirebaseController />
        </View>      
      </Provider>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

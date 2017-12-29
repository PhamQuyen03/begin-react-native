/**
 * Sample React Native BookingCar
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import { StyleSheet, Text, View, StatusBar, Dimensions, Platform } from 'react-native';
import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import Camera from 'react-native-camera';
// import MapView from 'react-native-maps';

import withConnect from './withConnect';
import ButtonLoginFB from './components/FBLogin/ButtonLoginFB';
import LogOut from './components/FBLogin/LogOut';
// // 
// import React, { PureComponent } from 'react';
// import { View, StyleSheet, Dimensions } from 'react-native';
const { constants } = Camera;
const initialLayout = {
  height: 10,
  width: Dimensions.get('window').width,
};

// const FirstRoute = () => <View style={[styles.container, { backgroundColor: '#ff4081' }]} />;
// const SecondRoute = () => <View style={[styles.container, { backgroundColor: '#673ab7' }]} />;
const Third = () => <View style={[styles.container, { backgroundColor: 'black' }]} />;
const Four = () => <View style={[styles.container, { backgroundColor: 'pink' }]} />;
const options = {
  enableHighAccuracy: true,
  maximumAge: 1000,
  timeout: 20000,
  distanceFilter: 20,
};
@withConnect
export default class BookingCar extends React.PureComponent {
  static propTypes = {
    getArticles: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.getArticles = this.props.getArticles.bind(this);
    this.state = {
      index: 0,
      routes: [
        { key: 'first', title: 'First' },
        { key: 'second', title: 'Second' },
        { key: 'third', title: 'Third' },
        { key: 'four', title: 'Four' },
      ],
    };
  }
  componentDidMount() {
    this.getArticles('full-size-articles');
    // this.getCurrentPosition();
    console.log('statusBarHeight: ', StatusBar.currentHeight);
    global.navigator.geolocation.getCurrentPosition(this.onSuccess, this.onFail, options);
    global.navigator.geolocation.watchPosition(
      (position) => {
        console.log('position', position);
      },
      (error) => this.setState({ error: error.message }),
      options
    );
  }
  // mapType = {Platform.OS === 'android' ? 'none' : 'standard'}

  onSuccess = location => {
    // const data = Location.build(location.coords);
    console.log('location', location);
  };

  onFail = error => console.log(error);;
  
  onBarCodeRead(e) {
    console.log('Barcode Found!', `Type: ${e.type} \nData: ${e.data}`);
  }

  FirstRoute = () => 
    <View style={styles.container}>
      <LinearGradient 
      colors={['#292941', '#2c2944', '#362B4C', '#472D5A', '#5F306D', '#83358b']}
      end={{ x: 1, y: 1 }}
      start={{ x: 0, y: 0 }}
      locations={[0.2, 0.35, 0.5, 0.65, 0.8, 1]}
      style={styles.linearGradient}
      >
        <StatusBar
          backgroundColor='transparent'
          translucent
          // hidden
          // translucent={false}
          barStyle='light-content'
        />
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit BookingCar.js
        </Text>
        <Text style={styles.instructions}>
          {'instructions'}
        </Text>
        <ButtonLoginFB />
        <LogOut />
      </LinearGradient>
    </View>

  SecondRoute = () => 
    <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          onBarCodeRead={this.onBarCodeRead.bind(this)}
          style={styles.preview}
          aspect={constants.Aspect.fill}
        >
          <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
        </Camera>
    </View>
  // Third = () => 
  // <View style={styles.container}>
  //     <MapView
  //       initialRegion={{
  //         latitude: 37.78825,
  //         longitude: -122.4324,
  //         latitudeDelta: 0.0922,
  //         longitudeDelta: 0.0421,
  //       }}
  //     />
  // </View>
  takePicture() {
    const optionsCam = {};
    //options.location = ...
    this.camera.capture({ metadata: optionsCam })
      .then((data) => console.log(data))
      .catch(err => console.error(err));
  }

  _handleIndexChange = index => {
    this.setState({ index });
    console.log('index', index);
  };
  _renderScene = SceneMap({
    first: this.FirstRoute,
    second: this.SecondRoute,
    third: Third,
    four: Four
  });

  _renderHeader = props => <TabBar 
    {...props} 
    renderLabel={this.renderLabel}
    scrollEnabled
  />;
  
  renderLabel = ({ focused, route }) => {
    const { title } = route;
    return <Text style={[styles.tabLabel, focused && styles.tabLabelFocused]}>{title}</Text>;
  };

  render() {
    return (
      <TabViewAnimated
        style={styles.container}
        navigationState={this.state}
        renderScene={this._renderScene}
        renderHeader={this._renderHeader}
        onIndexChange={this._handleIndexChange}
        lazy={false}
        initialLayout={initialLayout}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: 'transparent',
  },
  linearGradient: {
    flex: 1,
  },
  Camere: {
    flex: 1,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  tabLabelFocused: {
    color: 'white',
  },
  tabLabel: {
    alignItems: 'center',
    color: 'black',
    fontSize: 17,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 25,
    color: '#000',
    padding: 15,
    margin: 40
  },
});

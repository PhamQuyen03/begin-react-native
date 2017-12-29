/**
 * @providesModule WeFit.Controllers.FirebaseController
 */

/* eslint-disable no-unused-vars */
import React from 'react';
/* eslint-enable no-unused-vars */
// import PropTypes from 'prop-types';
import { AppState, Platform } from 'react-native';
import FCM, { FCMEvent } from 'react-native-fcm';
// import Firebase from 'firebase';
// Constants
import BaseController from '../BaseController';

export default class FirebaseController extends BaseController {

  componentDidMount() {
    console.log('getFCMToken', FCM.getFCMToken());
    AppState.addEventListener('change', this.onAppStateChanged);

    // Add some extra handlings before dispatch `receiveNotification` action
    FCM.on(FCMEvent.Notification, this.onReceiveRawNotif);

    // Directly dispatch received token to Redux store
    // FCM.on(FCMEvent.RefreshToken, this.refreshToken);

    // Clear badge count
    FCM.setBadgeNumber(0);
  }
  
  componentWillUnmount() {
    AppState.removeEventListener('change', this.onAppStateChanged);
  }


  // Clear badge count
  onAppStateChanged = nextAppState => (nextAppState === 'active' && FCM.setBadgeNumber(0));

  onReceiveRawNotif = rawNotif => {
      console.log('data', rawNotif);
      // const {
      //   [OPENED_FROM_TRAY]: rawOpenFromTray,
      //   [PAYLOAD]: rawPayload,
      //   [TYPE]: type,
      // } = rawNotif;
  
      // const notifKey = Platform.select({ android: FCM_ANDROID, ios: APNS });
      // const { [notifKey]: notification } = rawNotif;
      // const { body: message, title } = notification.alert || notification || {};
  
      // const openedFromTray = rawOpenFromTray === 1;
      // const payload = {};
  };
}

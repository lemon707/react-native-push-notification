import React from 'react';
import PushNotification from 'react-native-push-notification'
import { StyleSheet, Text, View, PushNotificationIOS } from 'react-native';

export default class App extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      error: null,
    }
  }

  componentDidMount() {
    this.pushNotification()
    PushNotification.localNotification({
      title: 'Hello There',
      message: 'What a beautiful day!'
    })
  }

  pushNotification() {
    PushNotification.configure({

        // (optional) Called when Token is generated (iOS and Android)
        onRegister: function(token) {
          console.log( 'TOKEN:', token );
          console.log( 'TOKEN.token:', token.token );
        },

        // (required) Called when a remote or local notification is opened or received
        onNotification: function(notification) {
            console.log( 'NOTIFICATION:', notification );

            // process the notification

            // required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
            notification.finish(PushNotificationIOS.FetchResult.NoData);
        },

        // ANDROID ONLY: GCM or FCM Sender ID (product_number) (optional - not required for local notifications, but is need to receive remote push notifications)
        senderID: "993599321616",

        // IOS ONLY (optional): default: all - Permissions to register.
        permissions: {
            alert: true,
            badge: true,
            sound: true
        },

        // Should the initial notification be popped automatically
        // default: true
        popInitialNotification: true,

        /**
          * (optional) default: true
          * - Specified if permissions (ios) and token (android and ios) will requested or not,
          * - if not, you must call PushNotificationsHandler.requestPermissions() later
          */
        requestPermissions: true,
    });

  }

  render() {
    return (
      <View style={styles.container}>
        {
          this.state.error &&
            <View>
              <Text>{this.state.error}</Text>
            </View>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

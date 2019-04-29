import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Appbar } from 'react-native-paper';
import Blink from './src/components/Blink';

// class Blink extends React.Component {
//   render() {
//     return(
//       <View>
//         <Text>Blink</Text>
//       </View>
//     );
//   }
// }

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Blink/>
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
  }
});

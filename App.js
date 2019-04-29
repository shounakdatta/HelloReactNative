import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Title } from 'react-native-paper';
import Blink from './src/components/Blink';

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      points: 100,
      left: 0,
      top: 0,
      width: Math.round(Dimensions.get('window').width),
      height: Math.round(Dimensions.get('window').height * 0.6)
    }
  }

  getRandLeft() {
    this.setState({ left: Math.floor(Math.random() * this.state.width)});
  }

  getRandTop() {
    this.setState({ top: Math.floor(Math.random() * this.state.height)});
  }

  render() {
    const {points} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Title style={{fontSize: 30}}>Tabz</Title>
        </View>
        <View style={styles.grid}>
          <Blink left={0} top={0} getLeft={this.getRandLeft} getTop={this.getRandTop}/>
        </View>
        <View style={styles.bottom}>
          <Title>Points: {points}</Title>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: "space-between"
  },
  title: {
    alignItems: "center",
    paddingTop: 50
  },
  bottom: {
    alignItems: "center",
    paddingBottom: 20
  },
  grid: {
    position: 'relative',
    width: "100%",
    height: "60%",
    backgroundColor: "orange"
  }
});

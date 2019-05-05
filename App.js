import React from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  View,
  Dimensions,
  Button,
  ToastAndroid
} from 'react-native';
import { Title } from 'react-native-paper';
import Tab from './src/components/Tab';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      points: 0,
      highscore: 0,
      left: 0,
      top: 0,
      width: Math.round(Dimensions.get('window').width - 125),
      height: Math.round(Dimensions.get('window').height * 0.6 - 125),
      pointColor: 'black',
      liveTime: 1000,
      lastReset: new Date()
    }
  }

  componentDidMount() {
    setInterval(() => {
      const { liveTime, lastReset } = this.state;
      const now = new Date();
      const diff = now.getTime() - lastReset.getTime();
      if (diff > liveTime) {
        this.resetTab(-100);
      }
    }, 1000)
  }

  adjustLiveTime() {
    const { points, liveTime } = this.state;
    let adjTime = 1000;
    for (let i = 0; i < Math.floor(points / 500); i++) {
      adjTime -= adjTime * 0.1;
    }
    if (adjTime != liveTime) {
      this.showToast(adjTime);
      this.setState({
        liveTime: adjTime
      });
    }
  }

  showToast(adjTime) {
    const { liveTime } = this.state;
    const text = adjTime > liveTime ?
      "Slowing Down..." : "Speeding Up"
    ToastAndroid.show(
      text,
      ToastAndroid.SHORT,
    );
  }

  getRandLeft() {
    return Math.floor(Math.random() * this.state.width);
  }

  getRandTop() {
    return Math.floor(Math.random() * this.state.height);
  }

  handleGridTap(e) {
    let { left, top } = this.state;
    const clickX = e.nativeEvent.locationX;
    const clickY = e.nativeEvent.locationY
    if (
      clickX >= left && clickX <= left + 125 &&
      clickY >= top && clickY <= top + 125
    ) {
      this.resetTab(100);
    }
    else {
      this.resetTab(-100);
    }
  }

  resetTab(diff) {
    let { highscore, points } = this.state;
    const pointColor = diff > 0 ? 'green' : 'red';
    if (points === 0 && diff < 0) return;

    highscore = (diff > 0 && highscore <= points) ?
      points + diff : highscore;
    left = this.getRandLeft();
    top = this.getRandTop();
    this.setState(prevState => {
      return {
        left,
        top,
        points: prevState.points + diff,
        pointColor,
        highscore,
        lastReset: new Date()
      }
    });
    this.adjustLiveTime();
  }

  resetPoints() {
    this.setState({
      points: 0,
      pointColor: 'black'
    })
  }

  render() {
    const { points, highscore, left, top, pointColor } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Title style={{ fontSize: 30 }}>Tabz</Title>
        </View>
        <TouchableHighlight
          onPress={(e) => this.handleGridTap(e)}
          underlayColor={'#FFF'}
        >
          <View style={styles.grid}>
            <Tab
              left={left}
              top={top}
              handleTabTap={this.resetTab.bind(this)}
            />
          </View>
        </TouchableHighlight>
        <View style={styles.bottom}>
          <TouchableHighlight
            onPress={() => this.reset()}
          >
            <Button
              onPress={this.resetPoints.bind(this)}
              title="RESET"
              color="#841584"
            />
          </TouchableHighlight>
        </View>
        <View style={styles.bottom}>
          <Title style={{ color: pointColor }}>Points: {points}</Title>
          <Title>High Score: {highscore}</Title>
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
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    paddingBottom: 20
  },
  grid: {
    position: 'relative',
    width: "100%",
    height: "60%",
  }
});

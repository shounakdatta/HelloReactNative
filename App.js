import React from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  View,
  Dimensions
} from 'react-native';
import { Title } from 'react-native-paper';
import Tab from './src/components/Tab';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      points: 100,
      highscore: 100,
      left: 0,
      top: 0,
      width: Math.round(Dimensions.get('window').width - 125),
      height: Math.round(Dimensions.get('window').height * 0.6 - 125),
      pointColor: 'black',
      liveTime: 10000,
      lastReset: new Date()
    }
  }

  componentDidMount() {
    setInterval(() => {
      const { liveTime, lastReset } = this.state;
      const now = new Date();
      const diff = now.getTime() - lastReset.getTime();
      if (diff > liveTime) {
        this.setState({
          lastReset: now
        }, () => {
          this.resetTab(-100);
        });
      }
    }, 1000)
  }

  adjustLiveTime() {
    const { points, liveTime } = this.state;
    const adjTime = 10000 - Math.floor(points / 1000) * 1000
    if (adjTime != liveTime) {
      this.setState({
        liveTime: adjTime
      });
    }
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
      }
    });
    this.adjustLiveTime();
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

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
      width: Math.round(Dimensions.get('window').width-125),
      height: Math.round(Dimensions.get('window').height*0.6-125)
    }
  }

  getRandLeft() {
    return Math.floor(Math.random() * this.state.width);
  }

  getRandTop() {
    return Math.floor(Math.random() * this.state.height);
  }

  handleTabTap() {
    let {highscore, points} = this.state;
    const left = this.getRandLeft();
    const top = this.getRandTop();
    highscore = (highscore <= points) ? points + 100 : highscore;
    this.setState( prevState => {
      return {
        left,
        top,
        points: prevState.points + 100,
        highscore
      }
    })
  }
  handleGridTap(e) {
    let {left, top} = this.state;
    const clickX = e.nativeEvent.locationX;
    const clickY = e.nativeEvent.locationY
    // console.log(left, top);
    // console.log(clickX, clickY);
    // console.log(clickX >= left && clickX <= left+125 &&
    //   clickY >= top && clickY <= top+125)
    // console.log('------')
    if (
      clickX >= left && clickX <= left+125 &&
      clickY >= top && clickY <= top+125
    ) {
      this.handleTabTap();
    }
    else {
      left = this.getRandLeft();
      top = this.getRandTop();
      this.setState( prevState => {
        return {
          left,
          top,
          points: prevState.points - 100
        }
      })
    }
  }

  render() {
    const {points, highscore, left, top} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Title style={{fontSize: 30}}>Tabz</Title>
        </View>
        <TouchableHighlight
          onPress={(e) => this.handleGridTap(e)}
        >
          <View style={styles.grid}>
            <Tab 
              left={left} 
              top={top} 
              handleTabTap={this.handleTabTap.bind(this)}
            />
          </View>
        </TouchableHighlight>
        <View style={styles.bottom}>
          <Title>Points: {points}</Title>
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

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Blink from './src/components/Blink';

class Grid extends React.Component {
    container() {
        super();
        
        this.state = {
            tabX: 0,
            tabY: 0
        }
    }

    render() {
        const {tabX, tabY} = this.state;
        return (
            <View style={styles.container}>
                <Blink left={tabX} top={tabY}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'orange',
      justifyContent: 'center'
    }
  });

export default Grid;
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

class Blink extends React.Component {
    constructor() {
        super();

        this.state = {
            visible: true
        }

        // Toggle the state every second
        setInterval(() => (
            this.setState(previousState => (
            { visible: !previousState.visible }
            ))
        ), 1000);
    }

    render() {
        const { visible } = this.state; 
        
        if(visible) {
            return(
                <View style={styles.container}>
                    <Text>Hello! Welcome to React Native</Text>
                </View>
            );
        }
        return null;
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

export default Blink;
import React from 'react';
import { 
    StyleSheet, 
    View, 
    TouchableHighlight 
} from 'react-native';

class Blink extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {left, top} = this.props;
        return(
            <View>
                <TouchableHighlight>
                    <View 
                        style={{
                            ...styles.tab,
                            position: "absolute",
                            left,
                            top
                        }}
                    />
                </TouchableHighlight>
            </View>
        );
    }
        
}

const styles = StyleSheet.create({
    tab: {
      backgroundColor: 'powderblue',
      minWidth: 100,
      minHeight: 100
    },
    button: {
        
    }
  });

export default Blink;
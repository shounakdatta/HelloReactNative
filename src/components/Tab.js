import React from 'react';
import {
    StyleSheet,
    View,
    TouchableHighlight
} from 'react-native';

class Tab extends React.Component {
    constructor(props) {
        super(props);
    }

    handleTabTapLocal() {
        this.props.handleTabTap(100);
    }

    render() {
        const { left, top } = this.props;
        return (
            <View>
                <TouchableHighlight
                    style={{ ...styles.button, left, top }}
                    onPress={() => this.handleTabTapLocal()}
                    underlayColor={'#FFF'}
                >
                    <View
                        style={styles.tab}
                    />
                </TouchableHighlight>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    tab: {
        backgroundColor: 'powderblue',
        width: 100,
        height: 100
    },
    button: {
        position: "absolute",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#FFF',
        width: 125,
        height: 125
    }
});

export default Tab;
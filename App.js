/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

type Props = {};
export default class App extends Component<Props> {

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.subOne}></View>
                <View style={styles.subTwo}></View>
            </View>
        );
    }
}

// CSS布局

/*
    margin:外间距:
    如果是第一个子控件,参照与父控件相对位置。如果不是第一个子控件,参照上一个，如subOne的参照是container，subTwo的参照是subOne
    注意:margin可能跟width,height冲突
 */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red',
    },
    subOne: {
        marginTop: 50,
        width: 200,
        height: 200,
        backgroundColor: 'yellow',
    },
    subTwo: {
        marginTop: 50,
        width: 200,
        height: 200,
        backgroundColor: 'blue',
    },
});
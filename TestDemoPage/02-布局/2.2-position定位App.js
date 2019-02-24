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
                <View style={styles.subOne}>
                    <View style={styles.subSubOne}></View>
                </View>

                <View style={styles.subOne}>
                    <View style={styles.subSubTwo}></View>
                </View>

            </View>
        );
    }
}

// CSS布局

/*
* 1 position：'relative'相对 和 'absolute'绝对定位(默认是relative)
* relative 相对定位，参考对象是自己本身
* absolute 绝对定位，参考对象是父控件
* */
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
    subSubOne: {
        width: 50,
        height: 50,
        backgroundColor: 'black',
        // 设置到右下角，下面方式不行
        // marginBottom: 0,
        // marginRight: 0,
        position: 'absolute', // 绝对定位，参考对象是父控件
        right: 0,
        bottom: 0,
    },
    subSubTwo: {
        width: 50,
        height: 50,
        backgroundColor: 'black',
        position: 'relative', // 相对定位，参考对象是自己本身
        top: '100%',
        left: 10,
    },
});
/**
 * 2.4-三角形.js
 * RN_Test
 *
 * Created by PSBC on 2019/4/25.
 * Copyright © 2019年 youcash. All rights reserved.
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {StyleSheet, Text, View} from 'react-native';

/*
* 利用border生成三角形，原理是上下左右border的占比
*
* */

export default class MsgPopPage extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.msg}>Hello MSG</Text>
                <View style={styles.triangle}></View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    msg: {
        fontSize: 20,
        textAlign: 'center',
        padding: 10,
        backgroundColor: 'chartreuse',
        borderRadius: 8,
    },
    triangle: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderLeftWidth: 30,
        borderRightWidth: 30,
        borderBottomWidth: 8,
        borderTopWidth: 8,
        borderLeftColor: 'chartreuse',
        borderRightColor: 'transparent',
        borderTopColor: 'transparent',
        borderBottomColor: 'transparent',
    },
    // 下面样式更能体现border的占比原理
    // triangle: {
    //     width: 0,
    //     height: 0,
    //     backgroundColor: 'red',
    //     borderLeftWidth: 100,
    //     borderRightWidth: 100,
    //     borderBottomWidth: 50,
    //     borderTopWidth: 50,
    //     borderLeftColor: 'chartreuse',
    //     borderRightColor: 'gray',
    //     borderTopColor: 'blue',
    //     borderBottomColor: 'yellow',
    // },
});

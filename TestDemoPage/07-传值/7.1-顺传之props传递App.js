/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

// 传值

// 1 顺传，父传子 如：props的属性值传递

class Son extends Component {
    render() {
        return (
            // 这是从父控件中创建子控件时，通过props进行初始化传值
            <Text style={styles.myStyle}>获得初始名称是：{this.props.name}</Text>
        );
    }
}


class Father extends Component {
    render() {
        return (
            // 初始化子控件时传值
            <Son name={'子控件Son'} ></Son>
        );
    }
}

type Props = {};
export default class App extends Component<Props> {

    render() {
        return (
            <View style={styles.container}>
                <Father/>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        marginTop: 80,
        flex: 1, // 比例数值
        backgroundColor: '#f8f8f8',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    myStyle: {
        backgroundColor:'red',
        marginTop: 10,
    }

});

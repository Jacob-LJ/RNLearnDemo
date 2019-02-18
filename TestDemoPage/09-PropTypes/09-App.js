/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet} from 'react-native';

// 注意导入文件的路径，可以不带类型后缀(.js)
import JAView from './TestDemoPage/09-PropTypes/JAView'

// PropTypes，属性定义在JAView中

export default class 0 extends Component {

    render() {
        return (
            // 当使用空格时(效果为<JAView'空格'></JAView>)，即可看到属性提示框
            <JAView></JAView>
        );
    }
}

const styles = StyleSheet.create({
    AppStyle: {
        flex: 1,
        marginTop: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

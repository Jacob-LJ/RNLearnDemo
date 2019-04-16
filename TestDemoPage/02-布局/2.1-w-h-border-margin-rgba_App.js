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
                <View style={styles.subTwo}></View>
            </View>
        );
    }
}

// CSS布局

/*
* 1 width height ：number 或 百分比
* */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red',
    },
    subOne: {activeOpacity
        marginTop: 50,
        width: 200,
        height: 200,
        backgroundColor: 'yellow',
    },
    subSubOne: {
        width: '70%', // 百分比参照对象就是父控件对应值
        height: 100,
        backgroundColor: 'white',
    },
    subTwo: {
        marginTop: 50,
        width: '80%', // 参考reactnative中文网，是可以设置百分比, ，但是只能通过字符串形式设置，相对于父控件
        height: 200,
        backgroundColor: 'blue',
    },
});


/*
    2 margin:外间距:
    如果是第一个子控件,参照与父控件相对位置。如果不是第一个子控件,参照上一个，如subOne的参照是container，subTwo的参照是subOne
    注意:margin可能跟width,height冲突
 */
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: 'red',
//     },
//     subOne: {
//         marginTop: 50, // 控件顶部外间距
//         width: 200,
//         height: 200,
//         backgroundColor: 'yellow',
//     },
//     subTwo: {
//         marginTop: 50,
//         width: 200,
//         height: 200,
//         backgroundColor: 'blue',
//     },
// });

/*
* 3 margin 与 width 或 height 不能同时设置例子
* */
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: 'red',
//     },
//     subOne: {
//         marginTop: 50,
//         // marginLeft: 20,
//         // marginRight: 20,
//         // width: 200, // 此时如果设置了width的话上述margin的left和right就会无效
//         height: 200,
//         backgroundColor: 'yellow',
//     },
//     subTwo: {
//         marginTop: 50,
//         width: 200,
//         height: 200,
//         backgroundColor: 'blue',
//     },
// });

/*
4 border边框：

borderColor 边框颜色
border<Bottom|Left|Right|Top>Color 各方向边框的颜色,<>表示连着一起，例如borderBottomColor

borderWidth number 边框宽度
border<Bottom|Left|Right|Top>Width

*/

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: 'red',
//     },
//     subOne: {
//         marginTop: 50,
//         marginLeft: 50,
//         width: 200,
//         height: 200,
//         backgroundColor: 'yellow',
//         borderWidth: 10, // 边框宽度
//         borderColor: 'black', // 边框颜色
//     },
//     subTwo: {
//         marginTop: 50,
//         marginLeft: 50,
//         width: 200,
//         height: 200,
//         backgroundColor: 'blue',
//         borderRightWidth: 10,
//         borderLeftWidth: 10,
//         borderRightColor: 'white', // 单个方向边框宽度
//         borderLeftColor: 'black', // 单个方向边框颜色
//     },
// });


/*
* 5 borderRadius：number 圆角
* */
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: 'red',
//     },
//     subOne: {
//         marginTop: 50,
//         width: 200,
//         height: 200,
//         backgroundColor: 'yellow',
//         borderRadius: 100, // 圆角
//     },
//     subTwo: {
//         marginTop: 50,
//         width: 200,
//         height: 200,
//         backgroundColor: 'blue',
//     },
// });

/*
* 6 rgba、rgb颜色设置
* */
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: 'red',
//     },
//     subOne: {
//         marginTop: 50,
//         width: 200,
//         height: 200,
//         backgroundColor: 'rgba(55,55,55,0.2)',
//
//     },
//     subTwo: {
//         marginTop: 50,
//         width: 200,
//         height: 200,
//         backgroundColor: 'rgb(111,111,111)',
//     },
// });
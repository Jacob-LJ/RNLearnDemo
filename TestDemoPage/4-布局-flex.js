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
                <View style={[styles.subView,{backgroundColor: 'powderblue'}]} />
                <View style={[styles.subView,{backgroundColor: 'skyblue'}]} />
                <View style={[styles.subView,{backgroundColor: 'black'},styles.specialView]} />
                <View style={[styles.subView,{backgroundColor: 'steelblue'}]} />
            </View>
        );
    }
}

// flex布局

/*
* 1 flexDirection：'row'水平 和 '默认是column'垂直(默认是row)
* 【column】          垂直（默认）
* 【row】             水平
* 【row-reverse】     水平反向
* 【column-reverse】  垂直反向
* */
// const styles = StyleSheet.create({
//     container: {
//         marginTop: 80,
//         flex: 1, // 比例数值
//         backgroundColor: 'red',
//         flexDirection: 'row' // 布局方向为水平， 默认是column垂直, 内部子控件的布局方向
//     },
//     subView: {
//         width: 50,
//         height: 50,
//     }
// });

/*
* 2 justifyContent：可以决定其子元素沿着主轴的排列方式
* 对应的这些可选项有(按flexDirection:row做注释)：
* 【flex-start】      靠左（默认）
* 【center】          居中
* 【flex-end】        靠右
* 【space-around】    所有间距均分
* 【space-between】   左右贴边，中间间距均分
* 【space-evenly】    间距与控件一致
* */
// const styles = StyleSheet.create({
//     container: {
//         marginTop: 80,
//         flex: 1, // 比例数值
//         backgroundColor: 'red',
//         flexDirection: 'row', // 布局方向为水平， 默认是column垂直, 内部子控件的布局方向
//         justifyContent: 'space-evenly',
//     },
//     subView: {
//         width: 50,
//         height: 50,
//     }
// });


/*
* 3 alignItems：可以决定其子元素沿着次轴（与主轴垂直的轴，比如若主轴方向为row，则次轴方向为column）的排列方式
* 对应的这些可选项有(按flexDirection:row做注释)：
* 【flex-start】  靠左（默认）
* 【center】      居中
* 【flex-end】    靠右
* 【stretch】     拉伸，要使stretch选项生效的话，子元素在次轴方向上不能有固定的尺寸。下面例子中，设置alignItems: 'stretch',需要将控件的高度注释
* */
// const styles = StyleSheet.create({
//     container: {
//         marginTop: 80,
//         flex: 1, // 比例数值
//         backgroundColor: 'red',
//         flexDirection: 'row', // 布局方向为水平， 默认是column垂直, 内部子控件的布局方向
//         justifyContent: 'space-evenly',
//         alignItems: 'stretch',
//     },
//     subView: {
//         width: 50,
//         // height: 50,
//     }
// });


/*
* 4 flexWrap:决定子控件在父视图内是否允许多行排列
* 对应的这些可选项有(按flexDirection:row做注释)：
* 【nowrap】 组件只排列在一行上，可能导致溢出。
  【wrap】   组件在一行排列不下时，就进行多行排列
* */
// const styles = StyleSheet.create({
//     container: {
//         marginTop: 80,
//         flex: 1, // 比例数值
//         backgroundColor: 'red',
//         flexDirection: 'row',
//         flexWrap: 'wrap', // defalut 'nowrap'
//     },
//     subView: {
//         width: 200,
//         height: 50,
//     }
// });


/*
* 5 alignSelf:自定义自己的侧轴布局，用于一个子组件设置
* 对应的这些可选项有(按flexDirection:row做注释)：
【auto】          继承它的父容器的alignItems属性。如果没有父容器则为 "stretch"
【flex-start】    子组件向侧轴起点对齐
【flex-end】      子组件向侧轴终点对齐
【center】        子组件在侧轴居中
【stretch】       子组件在侧轴方向被拉伸到与容器相同的高度或宽度
* */
// const styles = StyleSheet.create({
//     container: {
//         marginTop: 80,
//         flex: 1, // 比例数值
//         backgroundColor: 'red',
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     subView: {
//         width: 50,
//         height: 50,
//     },
//     specialView: { // 使用这个style的View会独立出来，不受负空间的alignItems的设置影响
//         alignSelf: 'flex-start',
//     },
// });


/*
* 6 flex: 决定子控件在主轴中占据几等分
* 对应的这些可选项有(按flexDirection:row做注释)：
【auto】          继承它的父容器的alignItems属性。如果没有父容器则为 "stretch"
【flex-start】    子组件向侧轴起点对齐
【flex-end】      子组件向侧轴终点对齐
【center】        子组件在侧轴居中
【stretch】       子组件在侧轴方向被拉伸到与容器相同的高度或宽度
* */
const styles = StyleSheet.create({
    container: {
        marginTop: 80,
        flex: 1, // 比例数值
        backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center',
    },
    subView: {
        flex: 1, // 子空间就各占1份，此时上面有4个子控件，即平分成4份
        width: 50,
        height: 50,
    },
    specialView: {
        flex: 1, // 子空间就各占1份
    },
});

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

// state
/*
我们使用两种数据来控制一个组件：props和state。
props是在父组件中指定，而且一经指定，在被指定的组件的生命周期中则不再改变。

对于需要改变的数据，我们需要使用state。

一般来说，你需要在 constructor 中初始化state（译注：这是 ES6 的写法，早期的很多 ES5 的例子使用的是 getInitialState 方法来初始化 state，这一做法会逐渐被淘汰），然后在需要修改时调用setState方法。

State 的工作原理和 React.js 完全一致，所以对于处理 state 的一些更深入的细节，你可以参阅React.Component API。
[React.Component – React](https://reactjs.org/docs/react-component.html#setstate)


注意点：
1、一切界面变化都是状态state变化
2、state的修改必须通过setState()方法
3、this.state.likes = 100; // 这样的直接赋值修改无效！
4、setState 是一个 merge 合并操作，只修改指定属性，不影响其他属性
5、setState 是异步操作，修改不会马上生效

概念及其他使用参考

*/

class House extends Component {


    constructor(props) {
        super(props);

        // 在constructor中初始化state中的属性
        this.state = {
            count: 0,
        };

        // 方式1
        // 设置定时器 1秒 = 1000
        // 这里必须绑定,bind会生成了一个新的函数,并且由绑定者调用,否则this不明确
        // setInterval(this.timeUpdate.bind(this),1000);
        // 或者使用下面方法直接调用
        // setInterval(() => {
        //     this.timeUpdate();
        // }, 1000);


        // 方式2
        // 将setInterva和setState组合在一起写时，timeUpdate方法再被调用
        setInterval(() => {
            // 这里是 setInterval 的callBack作用域
            this.setState(previousState => {
                // 这里是 setState 的callBack作用域
                return { count: ++previousState.count };
            });
        }, 1000);
    }

    timeUpdate() {
        var newCount = this.state.count;
        newCount += 1;

        this.setState({
            count:newCount,
        });
    }

    render() {
        return (
            <Text style={styles.myText}>当前{this.props.name}人数为：{this.state.count}人</Text>
        );
    }



}

type Props = {};
export default class App extends Component<Props> {

    render() {
        return (
            <View style={styles.container}>
                <House name={'Jacob-House'}/>
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
    myText: {
        backgroundColor:'red',
        marginTop: 10,
    }

});

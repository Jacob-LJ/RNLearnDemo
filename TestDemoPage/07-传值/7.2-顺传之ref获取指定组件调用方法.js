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

// 2 顺传，有时候需要拿到组件传值，通过ref拿到控件给控件传值。
/*
参考：
1、[对组件的引用（refs） | 论坛 - React Native中文社区](http://bbs.reactnative.cn/topic/608/%E5%AF%B9%E7%BB%84%E4%BB%B6%E7%9A%84%E5%BC%95%E7%94%A8-refs)
    1.1 _永远_不要在组件的render方法中或者当render方法还在调用栈中任意位置执行的时候——访问引用。此时你得到的是undefined
    1.2 如果你定义了ref="myRefString'，你必须以this.refs.myRefString 的形式来访问引用

2、[Refs和DOM - React](https://reactjs.org/docs/refs-and-the-dom.html)

*/

class Son extends Component {

    constructor(props) {
        super(props);
        this.state = {
            money:0,
        };
    }

    getMoney(moneyFormFather) {
        this.setState(lastState => {
            return {money: lastState.money + moneyFormFather};
        });
    }

    render() {
        return (
            // 这是从父控件中创建子控件时，通过props进行初始化传值
            <Text style={styles.SonStyle}>{this.props.name} money：{this.state.money}</Text>
        );
    }
}


class Father extends Component {
    render() {
        return (
            // 初始化子控件时传值
            <View style={styles.FatherStyle}>
                <Text style={{backgroundColor: 'cyan'}} >父控件</Text>

                <Text style={styles.clickStyle} onPress={()=>{
                    // 调用ref中保存的控件，注意调用时的名称是refs，多了个s，保存时是ref没有s
                    // this.refs.Son.getMoney(100);
                    this.Son.getMoney(100);
                }}>点击给son发钱</Text>

                {/* 通过ref拿到Son控件传值，再通过refs获取这个控件实例。这种字符串形式现在已经基本被弃用 */}
                {/*<Son ref='Son' name={'子控件Son'}/>*/}

                {/*
                只有在组件的render方法被调用时，ref才会被调用，组件才会返回ref。
                如果你在调用this.refs.xx时render方法还没被调用，那么你得到的是undefined。

                ref 属性不仅接受 string 类型的参数，而且它还接受一个function作为callback，如下方式也是可以的
                */}
                <Son ref={(ref) => {this.Son = ref}}/>

            </View>

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
    FatherStyle: {
        width: 200,
        height: 400,
        backgroundColor:'red',
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    SonStyle: {
        width: 100,
        height: 200,
        backgroundColor:'orange',
        marginTop: 10,
        textAlign: 'center',
    },
    clickStyle: {
        width: 200,
        height: 50,
        backgroundColor: 'gray',
        textAlign: 'center',
    }

});

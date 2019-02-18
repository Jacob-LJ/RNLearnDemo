/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

// props
/*
1 解构赋值 是ES6语法的新特性

概念及其他使用参考
1、[【探秘ES6】系列专栏（六）：解构赋值](https://www.csdn.net/article/2015-07-07/2825149-es6-in-depth-destructuring)

2、[【探秘ES6】系列专栏 - awp0011的专栏 - CSDN博客](https://blog.csdn.net/awp0011/article/details/46801111)
*/

class MyText extends Component {

    static defaultProps = {
        name : 'MyText name',
        age: 1,
        sex: 'MyText sex',
    };

    render() {
        return (
            <Text style={styles.myText}>{this.props.name}-{this.props.sex}-{this.props.age}</Text>
        );
    }
}

type Props = {};
export default class App extends Component<Props> {

    render() {

        const params = {name: '小明明', age: 10101, sex: '不男不女'};

        // 如果只想把 params 的 name 和 sex 传递过去，可以有如下写法：
        // const {name: name, sex: sex} = params;
        /*
        1、{}内的冒号【左边】的name和sex：是我们新定义的名为 name 和 sex 的新变量，
        2、{}内的冒号【右边】的name和sex：是 params 中的属性key，
        这行代码 const {name: name, sex: sex} = params; 的意思是：
            我们新定义了两个变量 name 和 sex，它们的值分别是 params.name 和 params.sex
        3、在属性名称和变量名称相同时，我们可以简写成如下形式：const {name, sex} = params;
        */
        const {name, sex} = params;

        return (
            <View style={styles.container}>

                <MyText name={name} sex={sex}/>

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

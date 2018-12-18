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
1 ...：延展操作符 是 ES6 语法的新特性

概念及其他使用参考
1、【扩展运算符(数组)】
http://es6.ruanyifeng.com/?search=%E5%BB%B6%E5%B1%95%E6%93%8D%E4%BD%9C%E7%AC%A6&x=0&y=0#docs/array#%E6%89%A9%E5%B1%95%E8%BF%90%E7%AE%97%E7%AC%A6

2、【对象的扩展运算符】
http://es6.ruanyifeng.com/?search=%E5%BB%B6%E5%B1%95%E6%93%8D%E4%BD%9C%E7%AC%A6&x=0&y=0#docs/object#%E5%AF%B9%E8%B1%A1%E7%9A%84%E6%89%A9%E5%B1%95%E8%BF%90%E7%AE%97%E7%AC%A6
*/

class MyText2 extends Component {

    static defaultProps = {
        name : 'MyText name',
        age: 1111,
        sex: 'MyText sex',
    };

    render() {
        return (
            <Text style={styles.myText}>{this.props.name}-{this.props.sex}-{this.props.age}</Text>
        );
    }
}



class MyText extends Component {

    static defaultProps = {
        name : 'MyText2 name',
        age: 2222,
        sex: 'MyText2 sex',
    };

    render() {
        return (
            // 通过 {...this.props} 将 MyView 获取到的所有属性传递给了 MyText2 。
            <MyText2 {...this.props} />
        );
    }
}




type Props = {};
export default class App extends Component<Props> {

    render() {

        const params = {name: '小明明', age: 10101, sex: '不男不女'};

        return (
            <View style={styles.container}>
                {/* 定义了一个对象 params，它包含了好几个属性。{...params} 表示的是将 params 中所有的属性传递给 MyText */}
                <MyText {...params}/>

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

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
1 props(属性) 概念
大多数组件在创建的时候就可以用各种参数来进行定制。
用于定制的这些参数就称为props（属性）。
所谓props，就是属性传递，而且是单向传递的。
属性多的时候，可以传递一个对象，这是es6中的语法。
*/
class MyText extends Component {
    render() {
        return (
            // 这是简单单向传值
            <Text style={styles.myText}>Hello {this.props.name}</Text> //调用props
        );
    }
}


type Props = {};
export default class App extends Component<Props> {

    render() {
        return (
            <View style={styles.container}>
                {/*这种注释方式是在控件之间的特定注释方式*/}

                {/*如果想设置MyText的style只能在其内部return的控件上设置，在这里设置无效*/}
                <MyText name='Jacob'/>
                <MyText name='Cathy'/>

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

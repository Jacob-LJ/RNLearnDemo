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
1 默认属性

*/

class MyText extends Component {

    static defaultProps = {
        name : 'your name',
    };

    render() {
        return (
            // 如果控件创建时没有给属性进行赋值，则会使用定义的默认值
            <Text style={styles.myText}>Hello {this.props.name}</Text>
        );
    }
}

type Props = {};
export default class App extends Component<Props> {

    render() {
        return (
            <View style={styles.container}>
                {/*这种注释方式是在控件之间的特定注释方式*/}
                {/*不能再控件后面写注释，报错*/}
                {/*在控件内部也不能使用 // 这个注释方式*/}


                {/*如果想设置MyText的 style 只能在其内部return的控件上设置，在这里设置无效*/}
                <MyText name='Jacob'/>
                <MyText name='Cathy'/>

                {/* 使用defaultProps内的值 */}
                <MyText />


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

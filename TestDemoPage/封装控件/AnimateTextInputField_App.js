/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry, Text, TextInput, View, Keyboard, TouchableWithoutFeedback, Animated } from 'react-native';
import AnimateTextInputField from './TestDemoPage/封装控件/AnimateTextInputField';

export default class PizzaTranslator extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
                >
                    <AnimateTextInputField
                        style={{width: '70%',}} // backgroundColor: 'cyan'
                        placeHolderText={'手机号/账号/邮箱'}
                        // showErrorTip={true}
                    />
                    <AnimateTextInputField
                        style={{width: '70%', marginTop: 10,}} //backgroundColor: 'gray'
                        placeHolderText={'请输入密码'}
                        secureTextEntry={true}
                    />
                </View>
            </TouchableWithoutFeedback>

        );
    }
}

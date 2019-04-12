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
                        style={{width: 200}}
                    />
                </View>
            </TouchableWithoutFeedback>

        );
    }
}

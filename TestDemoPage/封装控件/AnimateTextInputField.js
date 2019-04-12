/**
 *
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */


import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, TextInput, View, LayoutAnimation, Animated, Easing} from 'react-native';

export default class AnimateTextInputField extends Component {

    static propTypes = {

    }

    static  defaultProps = {

    }

    constructor(props) {
        super(props)

        const duration = 1000;

        this.state = {
            didTextScaleAtTop: false,
            animatedValue: new Animated.Value(20),
        }

        this.fontSmallAnimated = Animated.timing(
            this.state.animatedValue,
            {
                toValue: 15,
                duration: duration,
                easing: Easing.linear,
            }
        );
        this.fontNormalAnimated = Animated.timing(
            this.state.animatedValue,
            {
                toValue: 20,
                duration: duration,
                easing: Easing.linear,
            }
        );
    }

    render() {

        return (
            <View style={[this.props.style, {height: 50},]}>
                <TextInput
                    style={styles.TextInputStyle}
                    // 当文本框获得焦点的时候调用此回调函数。回调参数为{ nativeEvent: { target } }。
                    onFocus={(event) => {
                        // console.log(event.nativeEvent.target);

                        this.setState({
                            didTextScaleAtTop: true,
                        });
                        this.fontSmallAnimated.start();

                    }}
                    // 当文本输入结束后调用此回调函数。回调参数为{ nativeEvent: { eventCount, target, text} }。
                    onEndEditing={(event) => {
                        // console.log(event.nativeEvent.text);
                        this.setState({
                            didTextScaleAtTop: false,
                        });
                        this.fontNormalAnimated.start();
                    }}

                />
                <View
                    style={this.state.didTextScaleAtTop?styles.placeHolderTextContainterVAtTopStyle:styles.placeHolderTextContainterVStyle}
                    accessible={false} pointerEvents='none'
                >
                    <Animated.Text style={[styles.placeholderTextStyle, {fontSize: this.state.animatedValue}]}>手机号/身份证号/邮箱</Animated.Text>
                </View>
            </View>);
    }

}

const styles = StyleSheet.create({
    placeHolderTextContainterVStyle: {
        position:'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        backgroundColor:'red',
    },
    placeholderTextStyle: {
        fontSize: 20,
        top: 13, // 类似于 fontSize 一样将其变成动画值，然后使用多动画同时执行函数同时处理两个值，类似🐶戴的眼镜图，它是同时旋转和水平位移
        fontWeight: 'bold',
        color: '#333333',
    },
    TextInputStyle: {
        flex: 1,
        fontSize: 20,
        backgroundColor:'gray',
    },
});
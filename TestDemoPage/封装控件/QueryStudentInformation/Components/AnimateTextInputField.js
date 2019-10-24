/**
 * AnimateTextInputField.js
 * RN
 *
 * Created by PSBC on 2019/4/16.
 * Copyright © 2019年 xxx. All rights reserved.
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, TextInput, View, Animated, Easing, Image} from 'react-native';

export default class AnimateTextInputField extends Component {

    static propTypes = {
        // 对外公开 属性
        placeHolderText: PropTypes.string,          // 占位文本内容
        secureTextEntry: PropTypes.bool,            // 是否密文
        showErrorTip: PropTypes.bool,               // 输入错误时的标识
        leftImageName: PropTypes.string,            // 左 Icon图名称
        rightImageName: PropTypes.string,           // 右 Icon图名称

        // 布局属性
        containerH: PropTypes.number,               // 当前控件总容器的默认高度
        textInputContainerH: PropTypes.number,      // textInput控件的默认高度
        // 动画属性
        duration: PropTypes.number,                 // 动画时长（毫秒）
        fontMax: PropTypes.number,                  // 占位字体 大
        fontMin: PropTypes.number,                  // 占位字体 小
        topMax: PropTypes.number,                   // 占位文本顶部间距 大
        topMin: PropTypes.number,                   // 占位文本顶部间距 小
        lineMax: PropTypes.number,                  // 底部指示线 显示
        lineMin: PropTypes.number,                  // 底部指示线 隐藏
    };

    static defaultProps = {
        secureTextEntry: false,
        showErrorTip:false,
        // leftImageName: 'glasses.png',
        // rightImageName: 'macpro.png',

        containerH: 45,
        textInputContainerH: 30,

        duration: 600,
        fontMax: 18,
        fontMin: 14,
        topMax: 18,
        topMin: 2,
        lineMax: 500, // 设置保证底部指示线能够适应最大屏幕宽度
        lineMin: 0,
    };

    constructor(props) {
        super(props);

        this.state = {
            smallerPlaceholder: false,
            showBtmTipLine: false,
            animatedValue: new Animated.Value(1),
            btmTipLineAnimatedValue: new Animated.Value(1),
        };

        this.changePlaceholderAnimated = Animated.timing(
            this.state.animatedValue,
            {
                toValue: 1,
                duration: this.props.duration,
                easing: Easing.linear,
            }
        );

        this.changeBtmTipLineAnimated = Animated.timing(
            this.state.btmTipLineAnimatedValue,
            {
                toValue: 1,
                duration: this.props.duration,
                easing: Easing.linear,
            }
        );
    }

    render() {
        return (
            <View style={[this.props.style, styles.containerDefaultStyle, {height: this.props.containerH, borderBottomColor: this.props.showErrorTip?'red':'#c2c2c2',}]}>
                {/* 左边图像 */}
                {this._imageComponent(this.props.leftImageName)}
                {/* 输入框 Container */}
                <View style={{flex:7}}>
                    <TextInput
                        style={[styles.TextInputStyle, {height: this.props.textInputContainerH, fontSize: this.props.fontMax}]}
                        secureTextEntry={this.props.secureTextEntry}
                        clearButtonMode={'while-editing'}
                        onFocus={(event) => {
                            this._startAnimateAction(event.nativeEvent.text, true);
                        }}
                        onEndEditing={(event) => {
                            this._startAnimateAction(event.nativeEvent.text, false);
                        }}
                    />
                    <Animated.Text
                        style={{fontSize: this._getAnimatedValueInterpolate('fontSize'), color: '#c2c2c2', top: this._getAnimatedValueInterpolate('top')}}
                        accessible={false} pointerEvents='none' // 禁止响应事件, 让底层的 TextInput 可以响应事件
                    >{this.props.placeHolderText}
                    </Animated.Text>
                </View>
                {/* 右边图像 */}
                {this._imageComponent(this.props.rightImageName)}
                {/* 底部动画指示线 */}
                <Animated.View style={[styles.btmTipLineStyle, {right:this._getAnimatedValueInterpolate('right')}]}/>
            </View>
        );
    }


    _getAnimatedValueInterpolate(propertyName) {
        let outputRange;
        if (propertyName === 'fontSize') {
            outputRange = this.state.smallerPlaceholder ? [this.props.fontMax, this.props.fontMin] : [this.props.fontMin, this.props.fontMax];

        } else if (propertyName === 'top') {
            outputRange = this.state.smallerPlaceholder ? [this.props.topMax, this.props.topMin] : [this.props.topMin, this.props.topMax];

        }  else if (propertyName === 'right') {
            outputRange = this.state.showBtmTipLine ? [this.props.lineMax, this.props.lineMin] : [this.props.lineMin, this.props.lineMax];
            return this.state.btmTipLineAnimatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: outputRange,
            });
        }

        return this.state.animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: outputRange,
        });
    };

    _startAnimateAction(text, smallerPlaceholder) {
        if (!text.length) {
            this.setState({
                smallerPlaceholder: smallerPlaceholder,
            });
            this.state.animatedValue.setValue(0);
            this.changePlaceholderAnimated.start();
        }

        const showBtmTipLine = this.state.showBtmTipLine;
        this.setState({
            showBtmTipLine: !showBtmTipLine,
        });
        this.state.btmTipLineAnimatedValue.setValue(0);
        this.changeBtmTipLineAnimated.start();
    };

    _imageComponent(imageName) {
        return  (imageName && imageName.length) ? (<Image style={styles.leftRightImageStyle} source={{uri:imageName}}/>) : null;
    };
}

const styles = StyleSheet.create({
    containerDefaultStyle: {
        flexDirection: 'row',
        borderBottomWidth: 0.5,
    },
    leftRightImageStyle: {
        flex:1,
        resizeMode:'contain',
    },
    TextInputStyle: {
        position:'absolute',
        left: 0,
        right: 0,
        bottom: 0,
    },
    btmTipLineStyle: {
        position:'absolute',
        left:0,
        bottom:0,
        height:1,
        backgroundColor:'red'
    },
});

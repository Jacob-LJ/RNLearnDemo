/**
 *
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, TextInput, View, LayoutAnimation, Animated, Easing, Image} from 'react-native';
import TextInputFieldType from './ATIFEnumType';

export default class AnimateTextInputField extends Component {

    static propTypes = {
        // 对外公开属性
        inputFieldType: PropTypes.string,           // 输入框类型
        placeHolderText: PropTypes.string,          // 占位文本内容
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
        inputFieldType: TextInputFieldType.Account,
        leftImageName: 'glasses.png',
        rightImageName: 'macpro.png',

        containerH: 45,
        textInputContainerH: 30,

        duration: 600,
        fontMax: 18,
        fontMin: 12,
        topMax: 18,
        topMin: 2,
        lineMax: 500, // 设置保证底部指示线能够适应最大屏幕宽度
        lineMin: 0,
    };

    constructor(props) {
        super(props);

        this.state = {
            atTop: false,
            animatedValue: new Animated.Value(1),
        };

        this.changePlaceholderAnimated = Animated.timing(
            this.state.animatedValue,
            {
                toValue: 1,
                duration: this.props.duration,
                easing: Easing.linear,
            }
        );
    }

    render() {
        return (
            <View style={[this.props.style, styles.containerDefaultStyle, {height: this.props.containerH}]}>
                {/* 左边图像 */}
                {this._imageComponent(this.props.leftImageName)}

                {/* 输入框 Container */}
                <View style={{flex:7}}>
                    <TextInput
                        style={[styles.TextInputStyle, {height: this.props.textInputContainerH, fontSize: this.props.fontMax}]}
                        // placeholder='手'
                        secureTextEntry={this.props.inputFieldType === TextInputFieldType.Pwd}
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
                    >{this._getPlaceHolderTextByInputFieldType()}
                    </Animated.Text>
                    <Animated.View style={{position:'absolute', left:0, bottom:0, height:1, right:this._getAnimatedValueInterpolate('right'), backgroundColor:'red'}}/>
                </View>

                {/* 右边图像 */}
                {this._imageComponent(this.props.rightImageName)}
            </View>
        );
    }


    _getAnimatedValueInterpolate(propertyName) {
        var outputRange;
        if (propertyName === 'fontSize') {
            outputRange = this.state.atTop ? [this.props.fontMax, this.props.fontMin] : [this.props.fontMin, this.props.fontMax];
        } else if (propertyName === 'top') {
            outputRange = this.state.atTop ? [this.props.topMax, this.props.topMin] : [this.props.topMin, this.props.topMax];
        }  else if (propertyName === 'right') {
            outputRange = this.state.atTop ? [this.props.lineMax, this.props.lineMin] : [this.props.lineMin, this.props.lineMax];
        }

        return this.state.animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: outputRange,
        });
    };

    _startAnimateAction(text, atTop) {
        if (!text.length) {
            this.setState({
                atTop: atTop,
            });
            this.state.animatedValue.setValue(0);
            this.changePlaceholderAnimated.start();
        }
    };

    // 编译问题是因为方法体内未涉及实例的使用，编译器推荐将方法改为 static 类型
    _imageComponent(imageName) {
        return  (imageName && imageName.length) ? (<Image style={styles.leftRightImageStyle} source={{uri:imageName}}/>) : null;
    };
    
    _getPlaceHolderTextByInputFieldType() {
        var text = this.props.placeHolderText;
        if (text && text.length) {
            return text;
        } else  {
            switch (this.props.inputFieldType) {
                case TextInputFieldType.Account :
                    text = TextInputFieldType.Account;
                    break;
                case TextInputFieldType.Pwd :
                    text = TextInputFieldType.Pwd;
                    break;
            }
            return text;
        }
        
    }
}

const styles = StyleSheet.create({
    containerDefaultStyle: {
        flexDirection: 'row',
        // backgroundColor: '#eee8aa',
    },
    leftRightImageStyle: {
        flex:1,
        resizeMode:'contain',
        // backgroundColor: 'cyan',
    },
    TextInputStyle: {
        position:'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        borderBottomWidth: 1,
        borderBottomColor: '#c2c2c2',
        // backgroundColor:'gray',
    },
});

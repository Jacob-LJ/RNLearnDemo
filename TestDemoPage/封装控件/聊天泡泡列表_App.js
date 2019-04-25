/**
 * ChatBubble.js
 * RN_Test
 *
 * Created by PSBC on 2019/4/25.
 * Copyright © 2019年 youcash. All rights reserved.
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FlatList, StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';

export default class ChatBubble extends Component {

    render() {
        return (
            <View style={styles.defaultStyle}>
                <FlatList
                    data={[
                        {key: 'Q1'},
                        {key: 'A1'},
                        {key: 'Q2'},
                        {key: 'A2'},
                    ]}
                    renderItem={
                        ({item, index}) => {
                            let isLeft = index % 2 === 0;
                            let color = isLeft ? 'white': '#666666';
                            let style = [styles.textStyle, {color:color}];
                            if (item.key === 'Q1') {
                                return this._getItem(isLeft,
                                    (
                                        <Text
                                            style={style}
                                            numberOfLines={0}
                                        >
                                            忘记密码怎么办？
                                        </Text>
                                    )
                                );
                            } else if (item.key === 'A1') {
                                return this._getItem(isLeft,
                                    (
                                        <Text
                                            style={style}
                                            numberOfLines={0}
                                        >
                                            如果忘记密码，可通过
                                            <Text style={{color:'#488ff0'}} onPress={this._findPwdClickAction}>
                                                {' 找回密码 '}
                                            </Text>
                                            来找回学信网密码
                                        </Text>
                                    )
                                );
                            } else if (item.key === 'Q2') {
                                return this._getItem(isLeft,
                                    (
                                        <Text
                                            style={style}
                                            numberOfLines={0}
                                        >
                                            没有学信网账号？
                                        </Text>
                                    )
                                );
                            } else if (item.key === 'A2') {
                                return this._getItem(isLeft,
                                    (
                                        <Text
                                            style={style}
                                            numberOfLines={0}
                                        >
                                            已有学信网账号的，可直接登录，以避免重复注册为您带来的使用上的不便。没有账号，可以通过
                                            <Text style={{color:'#488ff0'}} onPress={this._registerClickAction}>
                                                {' 注册 '}
                                            </Text>
                                            来注册学信网账号。账号注册时请务必确保自己填写的手机号等信息准确有效；确保密码输入正确，并同时牢记自己的注册密码。
                                        </Text>
                                    )
                                );
                            }
                        }
                    }
                />
            </View>
        );
    }

    _getItem(isLeft, content) {
        return (
            <QSIFAQSessionBG
                isLeftDirection={isLeft}
                content={content}
            />
        );
    }

    // 找回密码 点击
    _findPwdClickAction() {
        alert('_findPwdClickAction');
    };

    // 常见问题 点击
    _registerClickAction() {
        alert('_registerClickAction');
    }
}


/*
*
* 会话背景气泡
* */

class QSIFAQSessionBG extends Component {

    static propTypes = {
        isLeftDirection: PropTypes.bool,
        content: PropTypes.object,
    };

    static defaultProps = {
        isLeftDirection: true,  // A、Q区别及箭头的方向
        content: null,          // 外界传入的文本组件
    }

    render () {
        return (
            this.props.isLeftDirection ? (this._leftBG()) : (this._rightBG())
        );
    }

    _leftBG() {
        return (
            <View style={{flex:1, flexDirection:'row', alignItems:'center',}}>
                {/* 圆形 */}
                <View style={{width:'10%', backgroundColor:'transparent'}}>
                    <View style={{marginLeft:16, width:28, height:28, borderRadius:14, backgroundColor:'#488ff0', justifyContent:'center', alignItems:'center'}}>
                        <Text style={{fontSize:18.5, color:'white'}}>Q</Text>
                    </View>
                </View>

                {/* 三角形 */}
                <View style={{width:'5%', backgroundColor:'transparent'}}>
                    <View style={styles.leftTriangle}/>
                </View>

                {/* 内容矩形 */}
                <View style={{width:'85%', marginLeft:-3, flexDirection:'row', alignItems:'center', paddingTop:20, paddingBottom:20, paddingRight:20, backgroundColor:'transparent', }}>
                    <View style={{borderRadius:5, backgroundColor:'#488ff0', padding:10}}>
                        {this.props.content}
                    </View>
                </View>
            </View>

        );
    };

    _rightBG() {
        return (
            <View style={{flex:1, flexDirection:'row-reverse', alignItems:'center',}}>
                {/* 圆形 */}
                <View style={{width:'10%', backgroundColor:'transparent'}}>
                    <View style={{marginRight:16, width:28, height:28, borderRadius:14, backgroundColor:'#e3e3e3', justifyContent:'center', alignItems:'center'}}>
                        <Text style={{fontSize:18.5, color:'#666666'}}>A</Text>
                    </View>
                </View>

                {/* 三角形 */}
                <View style={{width:'5%', backgroundColor:'transparent'}}>
                    <View style={styles.rightTriangle}/>
                </View>

                {/* 内容矩形 */}
                <View style={{width:'85%', marginRight:0, flexDirection:'row-reverse', alignItems:'center', paddingTop:20, paddingBottom:20, paddingRight:20, backgroundColor:'transparent', }}>
                    <View style={{borderRadius:5, backgroundColor:'#f5f5f5', padding:10}}>
                        {this.props.content}
                    </View>
                </View>
            </View>
        );
    };
}


const styles = StyleSheet.create({
    defaultStyle: {
        flex: 1,
        backgroundColor: 'white',
        marginTop:100,
        borderWidth:1,
        borderColor:'red',
    },
    textStyle: {
        flex:1,
        fontSize:18,
        lineHeight:25,
    },
    leftTriangle: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderLeftWidth: 9,
        borderRightWidth: 9,
        borderBottomWidth: 4,
        borderTopWidth: 4,
        borderLeftColor: 'transparent',
        borderRightColor: '#488ff0',
        borderTopColor: 'transparent',
        borderBottomColor: 'transparent',
    },
    rightTriangle: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderLeftWidth: 9,
        borderRightWidth: 9,
        borderBottomWidth: 4,
        borderTopWidth: 4,
        borderLeftColor: '#e3e3e3',
        borderRightColor: 'transparent',
        borderTopColor: 'transparent',
        borderBottomColor: 'transparent',
    },

});

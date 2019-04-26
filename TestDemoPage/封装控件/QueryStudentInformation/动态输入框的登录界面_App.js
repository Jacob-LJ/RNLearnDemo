/**
 * QSIQueryLogin_App.js
 * RN_Test
 *
 * Created by PSBC on 2019/4/19.
 * Copyright © 2019年 youcash. All rights reserved.
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, TouchableOpacity, View, FlatList, Dimensions, Image} from 'react-native';
import AnimateTextInputField from './TestDemoPage/封装控件/QueryStudentInformation/Components/AnimateTextInputField';
import SecurityCodePopUpDialog from './TestDemoPage/封装控件/QueryStudentInformation/Components/SecurityCodePopUpDialog';

const {width, height} = Dimensions.get('window');

export default class QSIQueryLogin extends Component {

    static propTypes = {
        propName: PropTypes.string,
    };

    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = {
            didCheckApprove: false,
            showSecurityCodePopUpDialog: false,
        };
    }

    render() {
        const bgCircleW = width*2;
        const borderRadius = bgCircleW/2;
        const left =  borderRadius/2;
        const marginTop = borderRadius*1.355;
        return (
            <View style={styles.defaultStyle}>
                <View style={{position: 'absolute', width:bgCircleW, height:bgCircleW, left:-left, marginTop:-marginTop,  backgroundColor:'#3093f4', borderRadius:borderRadius}}/>
                <FlatList
                    style={{backgroundColor:'transparent'}}
                    data={[
                        {key: 'inputActItem'},
                        {key: 'btnActItem'},
                        {key: 'tipItem'},
                    ]}
                    renderItem={
                        ({item}) => {
                            if (item.key === 'inputActItem') {
                                return this._inputActItem();
                            } else if (item.key === 'btnActItem') {
                                return this._btnActItem();
                            } else if (item.key === 'tipItem') {
                                return this._tipItem();
                            }
                        }
                    }
                />
                <SecurityCodePopUpDialog
                    defaultAnimationDialog={this.state.showSecurityCodePopUpDialog}
                    dialogStatusChangeFunc={() => {
                        this.setState({
                            showSecurityCodePopUpDialog: false,
                        });
                    }}
                />
            </View>
        );
    }

    /*
    *
    * 渲染行控件区
    *
    * */

    _inputActItem() {
        return (
            <View style={styles.inputContainerStyle}>
                <View style={{justifyContent: 'center', alignItems:'center', height:50, backgroundColor:'#ebf4fd', borderTopLeftRadius:15, borderTopRightRadius:15,}}>
                    <Text style={{fontSize: 18, color: '#4b90f0'}}>请输入学信网用户名、密码查询</Text>
                </View>
                <View style={{height:60, alignItems: 'center'}}>
                    <AnimateTextInputField
                        style={{width: '85%', position:'absolute', bottom:0}} // backgroundColor: 'cyan'
                        placeHolderText={'手机号/账号/邮箱'}
                        // showErrorTip={true}
                    />
                </View>
                <View style={{height:60, alignItems: 'center'}}>
                    <AnimateTextInputField
                        style={{width: '85%', position:'absolute', bottom:0}} // backgroundColor: 'gray'
                        placeHolderText={'请输入密码'}
                        secureTextEntry={true}
                    />
                </View>
                <View style={{width:'85%', height:76, justifyContent: 'center', alignItems:'center', flexDirection: 'row',}}>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => {
                            this.setState((state) => {
                                return {didCheckApprove: !state.didCheckApprove};
                            });
                        }}
                    >
                        <Image style={{width: 20, height: 20,}}
                               source={this.state.didCheckApprove?require('./TestDemoPage/封装控件/QueryStudentInformation/image/qsi_checkBox_yes.png'):require('./TestDemoPage/封装控件/QueryStudentInformation/image/qsi_checkBox_no.png')}
                        />
                    </TouchableOpacity>
                    <Text style={{fontSize:15, left:10, color:'#999999'}}>
                        已阅读并同意
                        <Text style={{color: '#4b90f0'}}
                              onPress={() => {
                                  alert('查看授权书');
                              }}
                        >
                            个人数据采集授权书
                        </Text>
                    </Text>
                </View>
            </View>
        );
    };

    _btnActItem() {
        return (
            <View style={{flex: 1, justifyContent: 'center'}}>
                <View style={{height: 100, justifyContent: 'center', alignItems:'center'}}>
                    <TouchableOpacity style={{marginTop: 30, width: '93%', height:44, backgroundColor: '#3093f4', borderRadius: 22}}
                                      activeOpacity={1}
                                      onPress={this._queryFreeClickAction.bind(this)}>
                        <View style={{flex: 1, justifyContent: 'center', alignItems:'center'}}>
                            <Text style={{color:'white', fontSize:18}}>免费查询</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row', height: 60, justifyContent: 'center', alignItems:'center'}}>
                    <Image style={{width: 20, height: 20,}}
                           source={require('./TestDemoPage/封装控件/QueryStudentInformation/image/qsi_FAQ.png')}
                    />
                    <Text style={{color:'#3093f4', fontSize:16, left:10}}
                          onPress={this._commonQuestionClickAction.bind(this)}
                    >
                        常见问题
                    </Text>
                </View>
            </View>
        );
    };

    _tipItem() {
        return (
            <View style={{flex: 1, height: 160, justifyContent: 'center', alignItems:'center'}}>
                <View style={{flex: 1, margin: 15, borderRadius: 15, backgroundColor: '#f3f8ff'}}>
                    <View style={{flexDirection: 'row', marginTop:25}}>
                        <Image style={{marginLeft:20, width: 17, height: 17}}
                               source={require('./TestDemoPage/封装控件/QueryStudentInformation/image/qsi_loginTip.png')}
                        />
                        <Text style={{color:'#3184bd', fontSize:16, left:10, lineHeight:18}}>温馨提示</Text>
                    </View>
                    <Text style={{color:'#666666', fontSize:14, marginTop:20, marginLeft:22, marginRight:22, lineHeight:25}} numberOfLines={20}>
                        查询范围：2001年以来国家承认的各类已毕业的高等教育学籍信息和学历信息。
                    </Text>
                </View>
            </View>
        )
    };

    /*
    *
    * 点击按钮时间区
    *
    * */
    // 免费查询 点击
    _queryFreeClickAction() {
        // alert('_qureyFreeClickAction');
        this.setState({
            showSecurityCodePopUpDialog: true,
        });
    };

    // 常见问题 点击
    _commonQuestionClickAction() {
        alert('_commonQuestionClickAction');
    }
}

const styles = StyleSheet.create({
    defaultStyle: {
        flex: 1,
        overflow:'hidden',
        backgroundColor: 'white',
    },
    inputContainerStyle: {
        marginTop:50,
        marginLeft:16,
        marginRight:16,
        borderRadius:15,
        height:247,
        justifyContent: 'center',
        backgroundColor:'white',
        shadowColor: 'gray',
        shadowOffset: { width: -2, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 6,
    },
});
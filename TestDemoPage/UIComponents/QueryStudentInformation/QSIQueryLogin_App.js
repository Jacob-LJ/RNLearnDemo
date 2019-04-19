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
import {StyleSheet, Text, TouchableOpacity, View, FlatList} from 'react-native';
import AnimateTextInputField from './TestDemoPage/UIComponents/QueryStudentInformation/Components/AnimateTextInputField';
import SecurityCodePopUpDialog from './TestDemoPage/UIComponents/QueryStudentInformation/Components/SecurityCodePopUpDialog';


export default class QSIQueryLogin extends Component {

    static propTypes = {
        propName: PropTypes.string,
    };

    static defaultProps = {};

    constructor(props) {
        super(props);

        this.state = {
            propertyName: true,
            showSecurityCodePopUpDialog: false,
        };
    }

    render() {
        return (
            <View style={styles.defaultStyle}>
                <FlatList
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
            <View style={{flex: 1, height: 300, justifyContent: 'center'}}>
                <View style={{flex: 1, borderBottomWidth:1, borderColor: '#666666'}}></View>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', borderBottomWidth:1, borderColor: '#666666'}}>
                    <AnimateTextInputField
                        style={{width: '80%', backgroundColor: 'cyan'}} // backgroundColor: 'cyan'
                        placeHolderText={'手机号/账号/邮箱'}
                        // showErrorTip={true}
                    />
                </View>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', borderBottomWidth:1, borderColor: '#666666'}}>
                    <AnimateTextInputField
                        style={{width: '80%', backgroundColor: 'gray'}} // backgroundColor: 'gray'
                        placeHolderText={'请输入密码'}
                        secureTextEntry={true}
                    />
                </View>
                <View style={{flex: 1, borderBottomWidth:1, borderColor: '#666666'}}></View>
            </View>
        );
    };

    _btnActItem() {
        return (
            <View style={{flex: 1, backgroundColor: 'blue', height: 150, justifyContent: 'center'}}>
                <View style={{flex: 1, justifyContent: 'center', alignItems:'center'}}>
                    <TouchableOpacity style={{width: '80%', height:50, backgroundColor: 'gray', borderRadius: 8}}
                                      activeOpacity={1}
                                      onPress={this._queryFreeClickAction.bind(this)}>
                        <View style={{flex: 1, justifyContent: 'center', alignItems:'center'}}>
                            <Text>免费查询</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{flex: 1, justifyContent: 'center', alignItems:'center', backgroundColor: 'cyan'}}>
                    <Text onPress={this._commonQuestionClickAction.bind(this)}>常见问题</Text>
                </View>
            </View>
        );
    };

    _tipItem() {
        return (
            <View style={{flex: 1, backgroundColor: 'gray', height: 150}}>
                <View style={{flex: 1, margin: 15, borderRadius: 8, backgroundColor: 'blue'}}>
                    <Text style={{flex: 1, margin: 15 }} numberOfLines={20}>
                        {"温馨提示\n\n\n\n查询范围：2001年以来国家承认的各类已毕业的高等教育学籍信息和学历信息。"}
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
        alert('_qureyFreeClickAction');
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
        // backgroundColor: 'gray',
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
});
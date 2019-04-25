/**
 * SecurityCodePopUpDialog.js
 * RN
 *
 * Created by PSBC on 2019/4/17.
 * Copyright © 2019年 youcash. All rights reserved.
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Button, View, Text, StyleSheet, TextInput, Image } from 'react-native';
import Dialog, {
    DialogTitle,
    DialogContent,
    DialogFooter,
    DialogButton,
} from '../../../react-native-popup-dialog/index';

export default class SecurityCodePopUpDialog extends Component {

    static propTypes = {
        defaultAnimationDialog: PropTypes.bool,
        dialogStatusChangeFunc: PropTypes.func,
    };

    static defaultProps = {
        defaultAnimationDialog: false,
    }

    render() {
        return (
            <Dialog
                    onDismiss={this.props.dialogStatusChangeFunc}
                    width={0.9}
                    visible={this.props.defaultAnimationDialog}
                    rounded
                    actionsBordered
                    // actionContainerStyle={{
                    //   height: 100,
                    //   flexDirection: 'column',
                    // }}
                    dialogTitle={
                        <DialogTitle
                            title="图形验证码"
                            style={{
                                backgroundColor: '#f2f2f8',
                            }}
                            hasTitleBar={false}
                            align="center"
                        />
                    }
                    footer={
                        <DialogFooter>
                            <DialogButton
                                text="取消"
                                bordered
                                onPress={this.props.dialogStatusChangeFunc}
                                key="button-1"
                            />
                            <DialogButton
                                text="确定"
                                bordered
                                onPress={this.props.dialogStatusChangeFunc}
                                key="button-2"
                            />
                        </DialogFooter>
                    }
                >
                    <DialogContent style={{backgroundColor: '#F7F7F8',}}>
                        <View style={{justifyContent: 'center', alignItems: 'center'}}>
                            <Image style={{height:100, width:200}}
                                   source={{uri:'100.jpg'}}
                            />
                            <Text>看不清楚？换一个（字母区分大小写）</Text>
                            <TextInput
                                style={{height: 55, width:'80%', borderBottomWidth: 1, borderBottomColor: '#e5e5e5', backgroundColor:'red', fontSize:18}}
                                clearButtonMode={'while-editing'}
                                placeholder="请输入图形验证码"
                            />
                        </View>
                    </DialogContent>
                </Dialog>
        );
    }
}


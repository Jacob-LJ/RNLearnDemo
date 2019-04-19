/**
 * demo1_App.js
 * RN_Test
 *
 * Created by PSBC on 2019/4/19.
 * Copyright © 2019年 youcash. All rights reserved.
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Button, View, Text, StyleSheet, TextInput, Image } from 'react-native';
import Dialog, {
    DialogTitle,
    DialogContent,
    DialogFooter,
    DialogButton,
} from './TestDemoPage/react-native-popup-dialog';


export default class App extends Component {
    state = {
        defaultAnimationDialog: false,
    };

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.container}>
                    <Button
                        title="Show Dialog - Default Animation"
                        onPress={() => {
                            this.setState({
                                defaultAnimationDialog: true,
                            });
                        }}
                    />
                </View>

                <Dialog
                    onDismiss={() => {
                        this.setState({ defaultAnimationDialog: false });
                    }}
                    width={0.9}
                    visible={this.state.defaultAnimationDialog}
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
                                onPress={() => {
                                    this.setState({ defaultAnimationDialog: false });
                                }}
                                key="button-1"
                            />
                            <DialogButton
                                text="确定"
                                bordered
                                onPress={() => {
                                    this.setState({ defaultAnimationDialog: false });
                                }}
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

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, DeviceEventEmitter} from 'react-native';

// 传值

// 4 通知，组件间传值

/*
1、导入 import {DeviceEventEmitter} from 'react-native';
2、在控件装载完成后，初始化监听者
    componentDidMount() {
        // 定义 通知监听 属性
        this.lister = DeviceEventEmitter.addListener('TwoViewSentNotice',(noticeValue)=>{
            this.setState({
                noticeValue: this.state.noticeValue + noticeValue,
            });
        })
    }


3、在控件移除时，移除监听者
    componentWillUnmount() {
        this.lister.remove();
    }
*/


class ViewOne extends Component {

    constructor(props) {
        super(props);
        this.state = {
            noticeValue: 0,
        };
    }

    componentDidMount() {
        // 定义 通知监听 属性
        this.lister = DeviceEventEmitter.addListener('TwoViewSentNotice',(noticeValue)=>{
            this.setState({
                noticeValue: this.state.noticeValue + noticeValue,
            });
        })
    }

    componentWillUnmount() {
        this.lister.remove();
    }


    sendNotice(num) {
        DeviceEventEmitter.emit('OneViewSentNotice',num);
    }

    render() {
        return (
            <View style={styles.OneStyle}>
                <Text
                    style={styles.clickStyle}
                    onPress={this.sendNotice.bind(this, 100)}
                >OneVeiw 发通知
                </Text>

                <Text>{this.props.name} 收到TwoView的通知值：{this.state.noticeValue}</Text>
            </View>
        );
    }
}


class ViewTwo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            noticeValue: 0,
        };
    }

    componentDidMount() {
        // 定义 通知监听 属性
        this.lister = DeviceEventEmitter.addListener('OneViewSentNotice',(noticeValue)=>{
            this.setState({
                noticeValue: this.state.noticeValue + noticeValue,
            });
        })
    }

    componentWillUnmount() {
        this.lister.remove();
    }


    sendNotice(num) {
        // TwoView 发送通知
        DeviceEventEmitter.emit('TwoViewSentNotice',num);
    }

    render() {
        return (
            <View style={styles.TwoStyle}>
                <Text
                    style={styles.clickStyle}
                    onPress={this.sendNotice.bind(this, 100)}
                >TwoVeiw 发通知
                </Text>

                <Text>{this.props.name} 收到OneView的通知值：{this.state.noticeValue}</Text>
            </View>
        );
    }
}

type Props = {};
export default class App extends Component<Props> {

    render() {
        return (
            <View style={styles.container}>
                <ViewOne name={'父控件'}></ViewOne>
                <ViewTwo name={'子控件'}></ViewTwo>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        marginTop: 80,
        flex: 1, // 比例数值
        backgroundColor: '#f8f8f8',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    OneStyle: {
        width: 200,
        height: 200,
        backgroundColor:'red',
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    TwoStyle: {
        width: 200,
        height: 200,
        backgroundColor:'orange',
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    clickStyle: {
        width: 200,
        height: 50,
        backgroundColor: 'gray',
        textAlign: 'center',
    }

});

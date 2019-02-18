/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

// 传值

// 2 顺传，有时候需要拿到组件传值，通过ref拿到控件给控件传值。

class Son extends Component {

    constructor(props) {
        super(props);
        this.state = {
            money:0,
        };
    }

    getMoney(moneyFormFather) {
        this.setState(lastState => {
            return {money: lastState.money + moneyFormFather};
        });
    }

    render() {
        return (
            // 这是从父控件中创建子控件时，通过props进行初始化传值
            <Text style={styles.SonStyle}>{this.props.name} money：{this.state.money}</Text>
        );
    }
}


class Father extends Component {
    render() {
        return (
            // 初始化子控件时传值
            <View style={styles.FatherStyle}>
                <Text style={{backgroundColor: 'cyan'}} >父控件</Text>

                <Text style={styles.clickStyle} onPress={()=>{
                    // 调用ref中保存的控件，注意调用时的名称是refs，多了个s，保存时是ref没有s
                    this.refs.Son.getMoney(100);
                }}>点击给son发钱</Text>

                {/* 通过ref拿到Son控件传值 */}
                <Son ref='Son' name={'子控件Son'}/>
            </View>

        );
    }
}

type Props = {};
export default class App extends Component<Props> {

    render() {
        return (
            <View style={styles.container}>
                <Father/>
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
    FatherStyle: {
        width: 200,
        height: 400,
        backgroundColor:'red',
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    SonStyle: {
        width: 100,
        height: 200,
        backgroundColor:'orange',
        marginTop: 10,
        textAlign: 'center',
    },
    clickStyle: {
        width: 200,
        height: 50,
        backgroundColor: 'gray',
        textAlign: 'center',
    }

});

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

// 3 逆传，通过props做桥接，将父控件的方法存放至子控件的props中，在子控件触发时，调用父控件方法

class Son extends Component {

    sendMoney(money) {
        this.props.faterGetMoneyMethod(money);
    }

    render() {
        return (
            // 这是从父控件中创建子控件时，通过props进行初始化传值

            /*
              <Text
                style={styles.SonStyle}
                onPress={()=>{
                    this.sendMoney(100);
                }}
               >{this.props.name} 点击给父控件钱</Text>
             */

            // 或者下面方式，bind的时候可以按顺序传入参数，函数默认第一参数是this
            <Text
                style={styles.SonStyle}
                onPress={this.sendMoney.bind(this,100)}
            >{this.props.name} 点击给父控件钱</Text>
        );
    }
}


class Father extends Component {

    constructor(props) {
        super(props);
        this.state = {
            money:0,
        };
    }

    getMoney(moneyFormSon) {
        this.setState(lastState => {
            return {money: lastState.money + moneyFormSon};
        });
    }

    render() {
        return (
            // 初始化子控件时传值
            <View style={styles.FatherStyle}>
                <Text style={{backgroundColor: 'cyan'}} >父控件</Text>
                <Text style={styles.clickStyle}>收到son：{this.state.money}元</Text>

                {/* 将父控件的方法保存至 子控件 的props中 */}
                <Son faterGetMoneyMethod={this.getMoney.bind(this)} name={'子控件Son'}/>
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

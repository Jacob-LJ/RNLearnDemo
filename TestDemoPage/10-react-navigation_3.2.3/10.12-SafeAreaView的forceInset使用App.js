
import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { SafeAreaView } from 'react-navigation';

/*

 [iPhone X support](https://reactnavigation.org/docs/zh-Hans/handling-iphonex.html)
 1、默认情况下，React Navigation 会帮助确保您的应用程序在iPhoneX上正确显示。其内部会使用 SafeAreaView 包装控件(带有导航栏或底部栏时)
 2、当没有使用导航栏和底部栏时，需要自己使用 SafeAreaView 进行包装，SafeAreaView 会自动根据设备而适配
 */

export default class App extends Component {
    state = {
        top: 'always',
        bottom: 'always',
    };

    toggleForceIncet = side => () => {
        this.setState({
            [side]: this.state[side] === 'always' ? 'never' : 'always',
        });
    };

    render() {
        return (
            <SafeAreaView
                style={styles.container}
                forceInset={{
                    top: this.state.top,
                    bottom: this.state.bottom,
                }}>
                <Text style={styles.paragraph}>
                    This is top text.
                </Text>
                <View>
                    <Button
                        title="Toggle top padding"
                        onPress={this.toggleForceIncet('top')}
                    />
                    <Button
                        title="Toggle bottom padding"
                        onPress={this.toggleForceIncet('bottom')}
                    />
                </View>
                <Text style={styles.paragraph}>
                    This is bottom text.
                </Text>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'gray',
        justifyContent: 'space-between',
    },
    paragraph: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#34495e',
        backgroundColor: 'orange'
    },
});

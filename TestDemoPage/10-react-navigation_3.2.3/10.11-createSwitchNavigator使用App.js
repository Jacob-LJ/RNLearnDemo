import React, { Component } from 'react';
import { AppRegistry, Text, Button, View , StyleSheet} from 'react-native';
import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';

/*
    createSwitchNavigator 使用场景：认证屏幕、广告页等。目前，SwitchNavigator不支持页面切换的动画效果。

    API：
    createSwitchNavigator(RouteConfigs, SwitchNavigatorConfig);

    SwitchNavigatorConfig
        * initialRouteName – 第一次加载时初始选项卡路由的routeName。
        * resetOnBlur – 切换离开屏幕时，重置所有嵌套导航器的状态。默认为true。
        * paths – 提供routeName到path config的映射，它覆盖routeConfigs中设置的路径。
        * backBehavior – 后退按钮是否会导致标签切换到初始路由？如果是，则设置为initialRoute，否则none。默认为none。

*/

class Home extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Home
                </Text>
                <Button
                    title='go'
                    // 这里的跳转会导致打印出现两次？为啥？
                    onPress={() => { this.props.navigation.navigate('Demo') }}
                />
            </View>
        );
    }
}

class Demo extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Demo
                </Text>
                <Button
                    title='go'
                    onPress={() => { this.props.navigation.navigate('Welcome') }}
                />
            </View>
        );
    }
}

class Welcome extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Welcome
                </Text>
                <Button
                    title='go'
                    onPress={() => { this.props.navigation.navigate('Welcome1') }}
                />
            </View>
        );
    }
}

class Welcome1 extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Welcome1
                </Text>
                <Button
                    title='go'
                    onPress={() => { this.props.navigation.navigate('Home') }}
                />
            </View>
        );
    }
}

const AppStack = createStackNavigator({
    Home,
    Demo
})

const RootStack = createSwitchNavigator({
    Welcome,
    Welcome1,
    App: AppStack
})

const AppContainer = createAppContainer(RootStack);

export default class App extends Component {
    render() {
        return (
            <AppContainer
                onNavigationStateChange={
                    (prevState, currentState) => { console.log(currentState)
                    }
                } />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
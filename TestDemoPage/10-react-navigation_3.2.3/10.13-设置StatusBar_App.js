

import React, { Component } from 'react';
import { Text, View, StyleSheet, SafeAreaView, Button, StatusBar, Platform } from 'react-native';
import { createStackNavigator, createAppContainer, createDrawerNavigator, createBottomTabNavigator } from 'react-navigation';

const isAndroid = Platform.OS === 'android';

class Home extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'gray'}}>
                <Text>Home Screen</Text>
                <Button
                    title="Go to Details"
                    // 点击触发，导航到名称为 Details 的路由
                    onPress={() => this.props.navigation.navigate('Details')}
                />
            </View>
        );
    }
}

class Details extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#6a51ae'}}>
                <Text>Details Screen</Text>
                <Button
                    title="Go to Details"
                    onPress={() => this.props.navigation.navigate('Home')}
                />
            </View>
        );
    }
}


const AppContainer = createAppContainer(
    createStackNavigator({
        Home: {
            screen: Home,
        },
        Details: {
            screen: Details,
        },
    }, {
        headerMode: 'none',
    })
);

// 监听导航器的状态
export default () => (
    <AppContainer
        onNavigationStateChange={(prevState, currentState, action) => {
            const currentScreen = getActiveRouteName(currentState);
            const prevScreen = getActiveRouteName(prevState);

            if (prevScreen !== currentScreen) {
                console.log('当前页面 ' + currentScreen);
                switch (currentScreen) {
                    case 'Home' : {
                        StatusBar.setBarStyle('dark-content');
                        // iOS 背景就是透明的，且setBackgroundColor只适用于Android
                        isAndroid && StatusBar.setBackgroundColor('orange');
                        break;
                    }
                    case 'Details': {
                        StatusBar.setBarStyle('light-content');
                        isAndroid && StatusBar.setBackgroundColor('#6a51ae');
                        break;
                    }
                }
            }
        }}
    />
);


// 通过当前状态获取页面标题
function getActiveRouteName(navigationState) {
    if (!navigationState) {
        return null;
    }
    const route = navigationState.routes[navigationState.index];
    // dive into nested navigators
    if (route.routes) {
        return getActiveRouteName(route);
    }
    return route.routeName;
}



// 下面是使用 createBottomTabNavigator 时，通过 配置 tabBarOnPress 来处理 StatusBar。还有可以通过监听形式处理

// 1、tabBarOnPress 形式
// export default createAppContainer(createBottomTabNavigator({
//   Screen1: {
//     screen: Screen1,
//     navigationOptions: {
//       tabBarOnPress: ({ previousScene, scene, jumpToIndex }) => {
//         // TODO: This doesn't handle the initial render because the second screen renders last. What to do?
//         StatusBar.setBarStyle('light-content');
//         isAndroid && StatusBar.setBackgroundColor('#6a51ae');
//         jumpToIndex(scene.index);
//       },
//     },
//   },
//   Screen2: {
//     screen: Screen2,
//     navigationOptions: {
//       tabBarOnPress: ({ previousScene, scene, jumpToIndex }) => {
//         StatusBar.setBarStyle('dark-content');
//         isAndroid && StatusBar.setBackgroundColor('#ecf0f1');
//         jumpToIndex(scene.index);
//       },
//     },
//   },
// }));

// 2、监听形式 文档中给出的就是此种
// class Screen1 extends React.Component {
//     componentDidMount() {
//         this._navListener = this.props.navigation.addListener('didFocus', () => {
//             StatusBar.setBarStyle('light-content');
//             isAndroid && StatusBar.setBackgroundColor('#6a51ae');
//         });
//     }
//
//     componentWillUnmount() {
//         this._navListener.remove();
//     }
//
// ...
//     class Screen2 extends React.Component {
//     componentDidMount() {
//         this._navListener = this.props.navigation.addListener('didFocus', () => {
//             StatusBar.setBarStyle('dark-content');
//             isAndroid && StatusBar.setBackgroundColor('#ecf0f1');
//         });
//     }
//
//     componentWillUnmount() {
//         this._navListener.remove();
//     }
//
// ...
// }
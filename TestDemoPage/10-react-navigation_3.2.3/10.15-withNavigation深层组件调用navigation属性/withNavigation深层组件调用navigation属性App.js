

import React, { Component } from 'react';
import { Text, View, StyleSheet, SafeAreaView, Button, StatusBar, Platform, Image } from 'react-native';
import { createStackNavigator, createAppContainer, createDrawerNavigator, createBottomTabNavigator } from 'react-navigation';
import Home from './TestDemoPage/10-react-navigation_3.2.3/10.15-withNavigation深层组件调用navigation属性/HomeScreen'
import Details from './TestDemoPage/10-react-navigation_3.2.3/10.15-withNavigation深层组件调用navigation属性/DetailsScreen'


/*
    withNavigation 的使用。目的方便深层组件获取 navigation 这个prop 来进行跳转操作。

注意：
1、作为 在 createStackNavigator 中 给其属性 screen 赋值的控件本省就可直接获取到 navigation这个prop的，即在Home中就可以通过this.props.navigation 来获取
2、而深层组件如MyButton，由于是在Home中进行的渲染，使用withNavigation包装导出的MyButton即可在其内部获通过上面方式获取navigation属性

参考：
官方文档描述也听清楚了
[Access the navigation prop from any component](https://reactnavigation.org/docs/zh-Hans/connecting-navigation-prop.html)
 */

const isAndroid = Platform.OS === 'android';


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


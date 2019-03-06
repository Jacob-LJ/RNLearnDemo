

import React, { Component } from 'react';
import { Text, View, StyleSheet, SafeAreaView, Button, StatusBar, Platform, Image } from 'react-native';
import { createStackNavigator, createAppContainer, createDrawerNavigator, createBottomTabNavigator } from 'react-navigation';
import Home from './TestDemoPage/10-react-navigation_3.2.3/10.15-withNavigation深层组件调用navigation属性/HomeScreen'
import Details from './TestDemoPage/10-react-navigation_3.2.3/10.15-withNavigation深层组件调用navigation属性/DetailsScreen'
import NavigationService from './TestDemoPage/10-react-navigation_3.2.3/10.16-全局导航封装/NavigationService';


/*
    全局导航的封装

注意：
1、导航器的封装 可以减少对navigation属性的依赖，也减少使用withNavigation组件的依赖，便于更深层次的控件控制跳转功能

参考：
官方文档描述也听清楚了
[Navigating without the navigation prop](https://reactnavigation.org/docs/zh-Hans/navigating-without-navigation-prop.html)
 */


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

        ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
        }}
    />
);

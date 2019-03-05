

import React, { Component } from 'react';
import { Text, View, StyleSheet, SafeAreaView, Button, StatusBar, Platform, Image } from 'react-native';
import { createStackNavigator, createAppContainer, createDrawerNavigator, createBottomTabNavigator } from 'react-navigation';


/*
2019年03月05日

Deep-Linking, 应用间跳转demo

步骤：
1、在xcode中选择 target - info - URL Types ，添加上 identifier 和 URL scheme
2、在 APPDelegate.m 中添加 openurl 的那个方法（参考ios项目源码）
3、设置对应的uriPrefix 和 path
4、在Safari中填写上 RNApp://details/Fry/18/174 查看效果

注意:
1、保证上述设置步骤都执行完成
2、注意 path 的写法
3、注意多参数的写法

参考：
    1、官方文档中的这种写法 path: 'details'，实际测试不行，浪费了我2个小时😂。下面参考文的写法引出思路，最后改为 path: `${prefix}details/` 就好了😋
     const AppNavigator = createSwitchNavigator({
        splash: SplashScreen,
        auth: {screen: AuthStack,  uriPrefix: `${prefix}auth/` },
        main: {screen: MainDrawer, uriPrefix:`${prefix}main/`}
    });
    [After putting deep linking with nested navigator, regular navigation does not work · Issue #4986 · react-navigation/react-navigation · GitHub](https://github.com/react-navigation/react-navigation/issues/4986)

    2、旧版中的，通过监听通知的方式手动导航参考（实际新版本3.x中的path和uriPath的使用原理也是通知的方式触发的，只不过控件内部做了处理而已）
    [深度链接您的React Native应用程序 - React Native Training - Medium](https://medium.com/react-native-training/deep-linking-your-react-native-app-d87c39a1ad5e)

 */

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

        const { userName, age, height } = this.props.navigation.state.params;
        if (!people[userName]) return <Text>Sorry, no data exists for this user</Text>

        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#6a51ae'}}>
                <Text>Details Screen</Text>
                <Button
                    title="Go to Home"
                    onPress={() => this.props.navigation.navigate('Home')}
                />
                <Image
                    resizeMode="contain"
                    style={{width:200, height:200}}
                    source={{ uri: people[userName].image }}
                />
            </View>
        );
    }
}

const prefix = 'RNApp://';
const AppContainer = createAppContainer(
    createStackNavigator({
        Home: {
            screen: Home,
            path: `${prefix}home/:params`,
        },
        Details: {
            screen: Details,
            path: `${prefix}details/:userName/:age/:height`,
            // details 或 Details 或 detAils 实测是可行的（应该是统一了做了大小写转换吧）
            // 注意多参数的获取写法
            // path: 'details', // 文档的这种写法是错的，实际测试不行的，浪费了我2个小时😂
        },
    }, {
        headerMode: 'none',
    })
);

// 监听导航器的状态
export default () => (
    <AppContainer
        uriPrefix={prefix}
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

const people = {
    Leela: {
        name: 'Leela',
        image: 'https://vignette1.wikia.nocookie.net/en.futurama/images/d/d4/Turanga_Leela.png/revision/latest?cb=20150218013044',
    },
    Bender: {
        name: 'Bender',
        image: 'https://vignette2.wikia.nocookie.net/en.futurama/images/4/43/Bender.png/revision/latest?cb=20150206072725',
    },
    Amy: {
        name: 'Amy',
        image: 'https://i.ytimg.com/vi/4sCtTq7K3yI/hqdefault.jpg',
    },
    Fry: {
        name: 'Fry',
        image: 'https://68.media.tumblr.com/6407f6763cc78a289ee88160838a29b4/tumblr_nqdq8jkmTS1uz53k3o1_400.jpg',
    }
}

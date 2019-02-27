import React from 'react';
import {Image, Text, View, Button} from 'react-native';
import { createBottomTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation';

/*
    createBottomTabNavigator 的使用

    注意点：
    1、每一个tab对应stack

    参考：

*/

class HomeScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Home!</Text>
                <Button
                    title="Go to Details in navigatorStack"
                    onPress={() => this.props.navigation.navigate('Details')}
                />
                <Button
                    title="Go to Settings in bottomTabNavigator"
                    onPress={() => this.props.navigation.navigate('Settings')}
                />
            </View>
        );
    }
}

class DetailsScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>DetailsScreen!</Text>
                <Button
                    title="Go to Settings in bottomTabNavigator"
                    onPress={() => this.props.navigation.navigate('Settings')}
                />
            </View>
        );
    }
}

class SettingsScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Settings!</Text>
                <Button
                    title="Go to Profile in navigatorStack"
                    onPress={() => this.props.navigation.navigate('Profile')}
                />
                <Button
                    title="Go to Home in bottomTabNavigator"
                    onPress={() => this.props.navigation.navigate('Home')}
                />
            </View>
        );
    }
}

class ProfileScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Profile!</Text>
            </View>
        );
    }
}


const HomeStack = createStackNavigator({
    Home: { screen: HomeScreen },
    Details: { screen: DetailsScreen },
});

const SettingsStack = createStackNavigator({
    Settings: { screen: SettingsScreen },
    Profile: { screen: ProfileScreen },
});

export default createAppContainer(
    createBottomTabNavigator(
        {
            Home: {
                screen: HomeStack,
                // 注意这里的 navigationOptions 设置的位置，还可以在 screen 里面写成 静态的navigationOptions、或 函数形式的写法
                navigationOptions: {
                    // 如果不设置 navigationOptions 中的 title 则默认使用router这个key名作(如Settings)为底部栏名称
                    title: '主页',
                    tabBarIcon: ({ focused, tintColor, horizontal }) => {
                        let sourceImg = focused ? require('./Img/hat_element.png') : require('./Img/flower_big.png')
                        return <IconWithBadge sourceImg={sourceImg} size={25} color={tintColor} badgeCount={10}/>
                    }
                }
            },
            Settings: {
                screen: SettingsStack,
                navigationOptions: {
                    title: '设置',
                    tabBarIcon: ({ focused, tintColor, horizontal }) => {
                        let sourceImg = focused ? require('./Img/mail_list.png') : require('./Img/more_icon.png')
                        return <IconWithBadge sourceImg={sourceImg} size={25} color={tintColor} badgeCount={10}/>
                    }
                }
            },
        },
        {
            tabBarOptions: {
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
            },
        }
    )
);


class IconWithBadge extends React.Component {
    render() {
        const { sourceImg, badgeCount, color, size } = this.props;
        console.log(sourceImg, badgeCount, color, size);

        return (
            <View style={{ width: size, height: size, margin: 5 }}>
                <Image
                    source={sourceImg} // 重点 require 内部不能使用变量参数
                    style={{ width: 20, height: 20 }}
                />
                {badgeCount > 0 && (
                    <View
                        style={{
                            // /If you're using react-native < 0.57 overflow outside of the parent
                            // will not work on Android, see https://git.io/fhLJ8
                            position: 'absolute',
                            right: -6,
                            top: -3,
                            backgroundColor: 'red',
                            borderRadius: 6,
                            width: 12,
                            height: 12,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
                            {badgeCount}
                        </Text>
                    </View>
                )}
            </View>
        );
    }
}


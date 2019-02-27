import React from 'react';
import {Image, Text, View, Button} from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';

/*
    简单tabbar设置，createBottomTabNavigator的使用

    注意点：
    1、每一个tab中的【标题名称】、【激活态的图片、标题颜色】设置
    2、代码方式导航到另一个tab
    3、自定义 tabBarIcon 属性
    4、bade的设置

    参考：
    [react-navigation图文攻略 - 掘金](https://juejin.im/post/5c3d9767e51d45522851f991#heading-4)
*/

class HomeScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Home!</Text>
                {/* 从一个 Tab 切换到另一个 Tab */}
                <Button
                    title="Go to Settings"
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
                    title="Go to Home"
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
                {/*<Button*/}
                {/*title="Go to Home"*/}
                {/*onPress={() => this.props.navigation.navigate('Home')}*/}
                {/*/>*/}
            </View>
        );
    }
}

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

const HomeIconWithBadge = props => {
    // You should pass down the badgeCount in some other ways like context, redux, mobx or event emitters.
    return <IconWithBadge {...props} badgeCount={3} />;
};

const getTabBarIcon = (navigation, focused, tintColor) => {
    const { routeName } = navigation.state;
    let sourceImg;
    if (routeName === 'Home') {
        sourceImg = focused ? require('./Img/like.png') : require('./Img/user.png');
    } else if (routeName === 'Settings') {
        sourceImg = focused ? require('./Img/like.png') : require('./Img/love.png');
    } else if (routeName === 'Profile') {
        sourceImg = focused ? require('./Img/like.png') : require('./Img/personIcon.png');
    }
    // You can return any component that you like here!
    return <HomeIconWithBadge sourceImg={sourceImg} size={25} color={tintColor} />;
};

export default createAppContainer(
    createBottomTabNavigator(
        {
            Home: {
                screen: HomeScreen,
                // 注意这里的 navigationOptions 设置的位置，还可以在 screen 里面写成 静态的navigationOptions、或 函数形式的写法
                navigationOptions: {
                    // 如果不设置 navigationOptions 中的 title 则默认使用router这个key名作(如Settings)为底部栏名称
                    title: '主页',
                }
            },
            Settings: {
                screen: SettingsScreen,
            },
            Profile: {
                screen: ProfileScreen,
                navigationOptions: {
                    title: '个人',
                    // 自定义 自己的 tabBarIcon，会覆盖 defaultNavigationOptions 中的设置 (其实这样也正常啊)
                    tabBarIcon: ({ focused, tintColor, horizontal }) => {
                        let sourceImg = focused ? require('./Img/mail_list.png') : require('./Img/more_icon.png')
                        return <IconWithBadge sourceImg={sourceImg} size={25} color={tintColor} badgeCount={10}/>
                    }
                }
            }
        },
        {
            defaultNavigationOptions: ({ navigation }) => ({
                /*
                 tabBarIcon 是 navigationOption上的一个属性，所以我们知道我们可以在我们的页面上使用它，
                 但在这种情况下，选择将它放在createBottomTabNavigator的配置中，是为了方便集中配置图标。
                 当设备处于横屏时，horizontal 是 true；否则就是false。
                 */
                tabBarIcon: ({ focused, tintColor, horizontal }) =>
                    getTabBarIcon(navigation, focused, tintColor)
                /*
                    这里不可以写成这样，即在返回值处添加大括号
                    tabBarIcon: ({ focused, tintColor, horizontal }) => {
                        getTabBarIcon(navigation, focused, tintColor)
                    }
                 */
            }),
            tabBarOptions: {
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
            },
        }
    )
);

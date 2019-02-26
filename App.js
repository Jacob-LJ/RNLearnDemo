import React from 'react';
import {Image, Text, View} from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';

class HomeScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Home!</Text>
            </View>
        );
    }
}

class SettingsScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Settings!</Text>
            </View>
        );
    }
}

class IconWithBadge extends React.Component {
    render() {
        const { name, badgeCount, color, size } = this.props;
        console.log(size, name, badgeCount, color);

        return (
            <View style={{ width: size, height: size, margin: 5 }}>
                <Image
                    source={require('./Img/user.png')} // 重点 require 内部不能使用变量参数
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
    let iconName;
    if (routeName === 'Home') {
        iconName = focused ? 'like' : 'love';
    } else if (routeName === 'Settings') {
        iconName =  focused ? 'like' : 'user';
    }
    // You can return any component that you like here!
    return <HomeIconWithBadge name={iconName} size={25} color={tintColor} />;
};

export default createAppContainer(
    createBottomTabNavigator(
        {
            Home: { screen: HomeScreen },
            Settings: { screen: SettingsScreen },
        },
        {
            defaultNavigationOptions: ({ navigation }) => ({
                tabBarIcon: ({ focused, tintColor }) =>
                    getTabBarIcon(navigation, focused, tintColor),
            }),
            tabBarOptions: {
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
            },
        }
    )
);

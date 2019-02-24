import React from 'react';
import { View, Text, Button, StatusBar, Platform, Image } from 'react-native';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';


const isAndroid = Platform.OS === 'android';
const isiOS = Platform.OS === 'ios';

// 监听导航器的状态

class HomeScreen extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'HOME', // 下一页的返回按钮显示 < HOME
        };
    };

    render() {

        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Home Screen</Text>
                <Button
                    title="Go to Details"
                    onPress={() => {
                        this.props.navigation.navigate('Details', {
                            screenTitle: 'DetailsScreen',
                            otherParam: 'anything you want here',
                        });
                    }}
                />
            </View>
        );
    }
}

class DetailsScreen extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('screenTitle', '默认值标题'),
        };
    };

    render() {

        /* 获取导航时传入的 param, 并提供一个默认值 */
        const { navigation } = this.props;
        const screenTitle = navigation.getParam('screenTitle', '默认值标题');
        const otherParam = navigation.getParam('otherParam', 'some default value');

        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Details Screen</Text>
                <Text>screenTitle: {JSON.stringify(screenTitle)}</Text>
                <Text>otherParam: {JSON.stringify(otherParam)}</Text>

                <Button
                    title="Go back"
                    onPress={() => this.props.navigation.goBack()}
                />

            </View>
        );
    }
}


const AppNavigator = createStackNavigator({
    Home: {
        screen: HomeScreen,
    },
    Details: {
        screen: DetailsScreen,
    },
}, {
    initialRouteName: 'Home', // 初始路由

    // 全局导航样式
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 30,
        },
    }
});


// 不监听时，直接导出即可
// export default createAppContainer(AppNavigator);


// 通过当前状态获取页面标题
// gets the current screen from navigation state
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

const AppContainer = createAppContainer(AppNavigator);

// 监听导航器的状态
export default () => (
    <AppContainer
        onNavigationStateChange={(prevState, currentState, action) => {
            const currentScreen = getActiveRouteName(currentState);
            const prevScreen = getActiveRouteName(prevState);

            console.log('这是 Action ' + action);

            if (prevScreen !== currentScreen) {
                // the line below uses the Google Analytics tracker
                // change the tracker here to use other Mobile analytics SDK.
                console.log('当前页面 ' + currentScreen);
            }
        }}
        uriPrefix="/app" // 用于深度链接，即 App 间跳转 [Deep linking · React Navigation](https://reactnavigation.org/docs/zh-Hans/deep-linking.html)

    />
);
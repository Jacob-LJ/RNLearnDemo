import React from 'react';
import { View, Text, Button, StatusBar, Platform } from 'react-native';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';


const isAndroid = Platform.OS === 'android';
const isiOS = Platform.OS === 'ios';

// 全局导航样式defaultNavigationOptions, 及个别自定义样式

class HomeScreen extends React.Component {

    static navigationOptions = {
        title: 'Home标题',
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
                    title="Go to DetailsScreen"
                    onPress={() => this.props.navigation.push('Screen1', {
                        screenTitle: 'Title' + JSON.stringify(+ Math.floor(Math.random() * 100)),
                    })}
                />
                <Button
                    title="Go back"
                    onPress={() => this.props.navigation.goBack()}
                />
                <Button
                    title="Back to Top"
                    onPress={() => this.props.navigation.popToTop()}
                />

            </View>
        );
    }
}


class Screen1 extends React.Component {

    static navigationOptions = ({ navigation, navigationOptions }) => {
        const { params } = navigation.state;

        return {
            title: params ? params.screenTitle : '默认Scree1标题',
            /* 用于覆盖全局样式 */
            headerStyle: {
                backgroundColor: navigationOptions.headerTintColor,
            },
            headerTintColor: navigationOptions.headerStyle.backgroundColor,
        };
    };

    render() {

        /* 获取导航时传入的 param, 并提供一个默认值 */
        const { navigation } = this.props;
        const screenTitle = navigation.getParam('screenTitle', '默认值标题');
        const otherParam = navigation.getParam('otherParam', 'some default value');

        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Screen1 Screen</Text>
                <Text>screenTitle: {JSON.stringify(screenTitle)}</Text>
                <Text>otherParam: {JSON.stringify(otherParam)}</Text>

                <Button
                    title="Go to DetailsScreen"
                    onPress={() => this.props.navigation.push('Details', {
                        screenTitle: JSON.stringify(Math.floor(Math.random() * 100)),
                    })}
                />
                <Button
                    title="Go back"
                    onPress={() => this.props.navigation.goBack()}
                />
                <Button
                    title="Back to Top"
                    onPress={() => this.props.navigation.popToTop()}
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
    Screen1:Screen1,
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
    // 注意:
    // 在 v2 及其以下版本, 您要用于执行此操作的属性是 navigationOptions`。
    // 在 v3 中，我们将其重命名为 `defaultNavigationOptions`.
});

export default createAppContainer(AppNavigator);
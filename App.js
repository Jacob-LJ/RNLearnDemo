import React from 'react';
import { View, Text, Button, StatusBar, Platform, Image } from 'react-native';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';


const isAndroid = Platform.OS === 'android';
const isiOS = Platform.OS === 'ios';

// 使用自定义组件替换标题

class LogoTitle extends React.Component {
    render() {
        // return (
        //     <Image
        //         source={require('./TestDemoPage/10-react-navigation_3.2.3/mail.png')}
        //         style={{ width: 30, height: 30 }}
        //     />
        // );

        return (
            <View style={{flexDirection: 'row', alignItems:'center'}}>
                <Image
                    source={require('./TestDemoPage/10-react-navigation_3.2.3/mail.png')}
                    style={{ width: 30, height: 30 }}
                />
                <Text style={{marginLeft:5, fontSize:30, color:'white', fontWeight:'bold'}}>图标题</Text>
            </View>
        );
    }
}

class HomeScreen extends React.Component {

    static navigationOptions = {
        title: 'Home标题',
        headerTitle: <LogoTitle />, // headerTitle instead of title
        // headerTitle: '这是标题' // headerTitle默认为一个Text组件，它显示title这个字符串，会覆盖 title 属性

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
    // 注意:
    // 在 v2 及其以下版本, 您要用于执行此操作的属性是 navigationOptions`。
    // 在 v3 中，我们将其重命名为 `defaultNavigationOptions`.
});

export default createAppContainer(AppNavigator);
import React from 'react';
import { View, Text, Button } from 'react-native';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';

// 传递参数给路由器
// 1. 需要将参数包装成一个对象，作为navigation.navigate方法的第二个参数传递给路由。
// 如： this.props.navigation.navigate('RouteName', { /* params go here */ })
//
// 2. 读取页面组件中的参数的方法：this.props.navigation.state.params。

class HomeScreen extends React.Component {

    render() {

        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Home Screen</Text>
                <Button
                    title="Go to Details"
                    onPress={() => {
                        /* 1. Navigate to the Details route with params */
                        this.props.navigation.navigate('Details', {
                            itemId: 86,
                            otherParam: 'anything you want here',
                        });
                    }}
                />
            </View>
        );
    }
}

class DetailsScreen extends React.Component {

    render() {

        /* 2. Get the param, provide a fallback value if not available */
        const { navigation } = this.props;
        const itemId = navigation.getParam('itemId', 'NO-ID'); // 如果获取不了则使用默认值代替
        const otherParam = navigation.getParam('otherParam', 'some default value');


        // 你也可以使用 this.props.navigation.state.params作为getParam的替代方案， 如果未指定参数，它的值是 null。
        // 为 null 会有啥影响呢？
        const params = this.props.navigation.state.params;
        // 然后直接 params.itemId 或 params.otherParam 获取值

        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Details Screen</Text>
                <Text>itemId: {JSON.stringify(itemId)}</Text>
                <Text>otherParam: {JSON.stringify(otherParam)}</Text>
                {/*
                我们推荐传递的参数是 JSON序列化的， 这样，您就可以使用state 持久化，并且您的屏幕组件将拥有实现深层链接的正确规范。
                */}

                <Button
                    title="Go to Details... again"
                    // navigate 和 push 都能可以接受第二个参数
                    onPress={() => this.props.navigation.push('Details', {
                        itemId: Math.floor(Math.random() * 100),
                    })}
                />
                <Button
                    title="Go to Home by navigate"
                    onPress={() => this.props.navigation.navigate('Home')}
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
}, {
    initialRouteName: 'Home', // 指定堆栈中的初始路由
});

export default createAppContainer(AppNavigator);
//  createStackNavigator 函数会返回一个React组件
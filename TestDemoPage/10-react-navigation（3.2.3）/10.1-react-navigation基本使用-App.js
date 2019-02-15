import React from 'react';
import { View, Text, Button } from 'react-native';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation'; // Version can be specified in package.json

class HomeScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Home Screen</Text>
                <Button
                    title="Go to Details"
                    // 点击触发，导航到名称为 Details 的路由
                    onPress={() => this.props.navigation.navigate('Details')}
                    // 如果我们使用未在 stack navigator 中定义的路由名称 调用this.props.navigation.navigate 方法，则不会发生任何事情。 换句话说，我们只能导航到已经在我们的 stack navigator 上定义的路由(当前有 Home 和 Details两个路由); 不能随便导航到任意组件。
                />

                {/*<Button*/}
                {/*title="Go to Details"*/}
                {/*onPress={() => {*/}
                {/*this.props.navigation.dispatch(StackActions.reset({*/}
                {/*index: 0,*/}
                {/*actions: [*/}
                {/*NavigationActions.navigate({ routeName: 'Details' })*/}
                {/*],*/}
                {/*}))*/}
                {/*}}*/}
                {/*/>*/}
            </View>
        );
    }
}

class DetailsScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Details Screen</Text>
                <Button
                    title="Go to Details... again"
                    // 注意，如已经在当前的 Details 路由上，this.props.navigation.navigate('Details') 方法并没任何效果，即什么都不做
                    // 当然，可以通过配置 params 形式导入想同路由的，请参考后面例子
                    // onPress={() => this.props.navigation.navigate('Details')}

                    // 强制导入想同路由，push
                    onPress={() => this.props.navigation.push('Details')}
                    // 每次调用 ` push ` 时, 我们会向导航堆栈中添加新路由。
                    // 当你调用 ` navigate ` 时, 它首先尝试查找具有该名称的现有路由, 并且只有在堆栈上没有一个新路由时才会推送该路由。

                    // 返回
                    // 如果当前页面可以执行返回操作，则 stack navigator 会自动提供一个包含返回按钮的标题栏
                    // 如果导航堆栈中只有一个页面，则没有任何可返回的内容，因此也不存在返回键
                    // 可以通过 this.props.navigation.goBack() 触发返回
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

                {/*
                在Android上，React Navigation 挂钩到硬件的返回按钮，并在用户按下返回按钮时触发` goBack()`方法，因此它的行为与用户期望的相同。

                另一个常见需求是能够跨越*多个*页面返回
                例如，如果你处在堆栈深处，上面有多个页面，此时你想要将上面所有的页面都销毁，并返回第一个页面。
                在这种情况下，我们知道我们要回到` Home `，所以我们可以使用` navigate('Home') `（而不是` push `！ 尝试一下，看看有什么不同）。 另一个选择是` navigation.popToTop() `，它可以返回到堆栈中的第一个页面。

                */}

            </View>
        );
    }
}

const AppNavigator = createStackNavigator({
    // 路由配置简写
    // Home:screen: HomeScreen, 如果对Home路由配置是唯一页面组件，则可进行简写。
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
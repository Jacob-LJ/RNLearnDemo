import React from 'react';
import { View, Text, Button } from 'react-native';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';

// 原理与iOS 的 UINavigationController 一样，在栈内的不销毁，pop出栈的即销毁

class HomeScreen extends React.Component {

    componentWillMount() {
        console.log('HomeScreen componentWillMount');
    }

    componentDidMount() {
        console.log('HomeScreen componentDidMount');
    }

    shouldComponentUpdate() {
        console.log('HomeScreen shouldComponentUpdate');
        return true;
    }

    componentWillReceiveProps() {
        console.log('HomeScreen componentWillReceiveProps');
    }

    componentWillUpdate() {
        console.log('HomeScreen componentWillUpdate');
    }

    componentDidUpdate() {
        console.log('HomeScreen componentDidUpdate');
    }

    componentWillUnmount() {
        console.log('HomeScreen componentWillUnmount');
    }


    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Home Screen</Text>
                <Button
                    title="Go to Details"
                    onPress={() => this.props.navigation.navigate('Details')}
                />
            </View>
        );
    }
}

class DetailsScreen extends React.Component {

    componentWillMount() {
        console.log('DetailsScreen componentWillMount');
    }

    componentDidMount() {
        console.log('DetailsScreen componentDidMount');
    }

    shouldComponentUpdate() {
        console.log('DetailsScreen shouldComponentUpdate');
        return true;
    }

    componentWillReceiveProps() {
        console.log('DetailsScreen componentWillReceiveProps');
    }

    componentWillUpdate() {
        console.log('DetailsScreen componentWillUpdate');
    }

    componentDidUpdate() {
        console.log('DetailsScreen componentDidUpdate');
    }

    componentWillUnmount() {
        console.log('DetailsScreen componentWillUnmount');
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Details Screen</Text>
                <Button
                    title="Go to Details... again"
                    onPress={() => this.props.navigation.push('Details')}
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
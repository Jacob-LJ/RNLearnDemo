import React from 'react';
import { View, Text, Button, StatusBar, Platform } from 'react-native';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';


const isAndroid = Platform.OS === 'android';
const isiOS = Platform.OS === 'ios';

// 设置标题栏显示的标题

class HomeScreen extends React.Component {

    // 1 每个页面组件可以有一个名为navigationOptions的静态属性，它是一个对象或一个返回包含各种配置选项的对象的函数。 我们用于设置标题栏的标题的是title这个属性
    // 静态属性形式
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

    // 2 在标题中使用参数
    // navigationOptions 中不能通过this.props动态配置信息，因为它是组件的静态属性，所以this不会指向一个组件的实例，因此 props 不可用
    // 相反，如果我们将navigationOptions作为一个函数，那么React Navigation将会用包含{navigation> navigationOptions，screenProps}的对象调用它
    // 在这种情况下，我们只用关心navigation，它是与传递给页面的this.props.navigation </ code>相同的对象。
    // 您可能还记得，我们可以通过<code> navigation.state.params从navigation中获取参数，因此我们执行下面的操作以提取 param 并将其用作标题。

    // 函数形式
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('DetailsScreen', '默认值标题'),
        };
    };

    /*
    传递给 navigationOptions 函数的参数是具有以下属性的对象：

    navigation - 页面的 导航属性 ，在页面中的路由为navigation.state。
    screenProps - 从导航器组件上层传递的 props
    navigationOptions - 如果未提供新值，将使用的默认或上一个选项
    在上面的示例中，我们只需要navigation 属性，但在某些情况下，你可能需要使用screenProps或navigationOptions。

      */

    render() {

        /* 获取导航时传入的 param, 并提供一个默认值 */
        const { navigation } = this.props;
        const screenTitle = navigation.getParam('DetailsScreen', '默认值标题');
        const otherParam = navigation.getParam('otherParam', 'some default value');

        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Details Screen</Text>
                <Text>itemId: {JSON.stringify(screenTitle)}</Text>
                <Text>otherParam: {JSON.stringify(otherParam)}</Text>

                <Button
                    title="Go to Screen_1"
                    onPress={() => this.props.navigation.push('Screen_1', {
                        screenTitle: 'Screen_1',
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

class Screen_1 extends React.Component {

    // 3 使用setParams更新navigationOptions
    // 通常有必要从已加载的页面组件本身更新当前页面的navigationOptions配置。 我们可以使用this.props.navigation.setParams来做到这一点
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('screenTitle', '默认值标题'),
        };
    };

    // 静态形式不能被 this.props.navigation.setParams({screenTitle: 'Updated标题'}) 方法修改
    // static navigationOptions = {
    //     title: '标题xx',
    // };

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Screen_1 Screen</Text>

                <Button
                    // 点击更新标题
                    title="Update the title"
                    onPress={() => this.props.navigation.setParams({screenTitle: 'Updated标题'})}
                />
                <Button
                    title="Go to Screen_2"
                    // navigate 和 push 都能可以接受第二个参数
                    onPress={() => this.props.navigation.push('Screen_2', {
                        screenTitle: 'Screen_2标题',
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

class Screen_2 extends React.Component {

    // 4 调整标题样式
    /*
        定制标题样式时有三个关键属性：headerStyle、headerTintColor和headerTitleStyle。

        headerStyle：一个应用于 header 的最外层 View 的 样式对象， 如果你设置 backgroundColor ，他就是header 的颜色。
        headerTintColor：返回按钮和标题都使用这个属性作为它们的颜色。
        headerTitleStyle：如果我们想为标题定制fontFamily，fontWeight和其他Text样式属性，我们可以用它来完成。

        参考 [Text组件使用详解（样式、属性、方法）](http://www.hangge.com/blog/cache/detail_1486.html)
     */

    static navigationOptions = {
        title: 'Screen_2',

        headerStyle: {
            backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 30,
        },
    };

    componentDidMount() {
        // 设置对应的 statusBar 颜色，设置过 SatusBar 之后，如果不进行重新运行程序，会有缓存一直保存该效果
        StatusBar.setBarStyle('light-content'); // dark-content
        isAndroid && StatusBar.setBackgroundColor('#6a51ae')  // setBackgroundColor 只用于 Android
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Screen_2 Screen</Text>

                <Button
                    // 点击更新标题
                    title="Update the title"
                    onPress={() => this.props.navigation.setParams({screenTitle: 'Updated标题'})}
                />
                <Button
                    title="Go to Screen_3"
                    // navigate 和 push 都能可以接受第二个参数
                    onPress={() => this.props.navigation.push('Screen_3', {
                        screenTitle: Math.floor(Math.random() * 100),
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
    Screen_1: Screen_1,
    Screen_2: Screen_2,
}, {
    initialRouteName: 'Home',
});

export default createAppContainer(AppNavigator);
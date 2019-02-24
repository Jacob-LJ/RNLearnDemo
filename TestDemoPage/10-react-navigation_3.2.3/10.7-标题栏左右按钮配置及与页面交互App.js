import React from 'react';
import { View, Text, Button, StatusBar, Platform, Image } from 'react-native';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';


const isAndroid = Platform.OS === 'android';
const isiOS = Platform.OS === 'ios';

// 标题栏 返回按钮、右边按钮配置及按钮与页面交互

class LogoTitle extends React.Component {
    render() {

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

    // 1 简单显示与简单点击行为
    // static navigationOptions = {
    //     headerTitle: <LogoTitle />,
    //
    //     // 右边按钮
    //     headerRight: (
    //         // 返回自定义组件
    //         <Button
    //             onPress={() => alert('This is a button!')}
    //             title="Info"
    //             color="#fff"
    //         />
    //     ),
    // };

    // 注意：在navigationOptions中this绑定的不是 HomeScreen 实例

    // 2 标题栏和其所属的页面之间的交互
    static navigationOptions = ({ navigation }) => {
        return {
            // headerTitle: 'HOME', // 下一页的返回按钮显示 < HOME
            headerTitle:  <LogoTitle />, // 下一页标题显示 < 返回
            headerRight: (
                <Button
                    onPress={navigation.getParam('increaseCount')}
                    title={navigation.getParam('title', '右边+1')}
                    color="#fff"
                />
            ),
            // 3 跳转后下一页的返回按钮显示文本设置
            headerBackTitle:'自定义', // 自定义在当前页跳转后的返回按钮显示标题，不设则默认显示合适的headerTitle内容
            // headerBackTitle: null, // 不显示
            // headerBackImage: 返回图片设置是在下一页的 navigationOptions 中设置的😖，但是返回标题文本则是当前页，为啥这么奇葩

            // 4 自定义左边按钮
            headerLeft: (
                <Button
                    onPress={navigation.getParam('increaseCount')}
                    title={navigation.getParam('title', '左边+1')}
                    color="#fff"
                />
            ),
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            count: 0,
        }
    }

    componentDidMount() {
        this.props.navigation.setParams({ increaseCount: this._increaseCount });
    }

    _increaseCount = () => {
        let count = this.state.count + 1;
        this.setState({ count: count });
        this.props.navigation.setParams({ title: `标题 ${count}`});
    };


    render() {

        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Home Screen = {this.state.count}</Text>
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

            // 设置返回按钮的图片
            headerBackImage: <Image
                source={require('./TestDemoPage/10-react-navigation_3.2.3/mail.png')}
                style={{ width: 20, height: 20, marginLeft: 9,
                    marginRight: 12,
                    marginVertical: 12,
                    resizeMode: 'contain', }}
            />,
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
        // 全局的默认返回按钮显示图片设置
        // headerBackImage: <Image
        //     source={require('./TestDemoPage/10-react-navigation_3.2.3/mail.png')}
        //     style={{ width: 20, height: 20, marginLeft: 9,
        //         marginRight: 12,
        //         marginVertical: 12,
        //         resizeMode: 'contain', }}
        // />,
    }
});

export default createAppContainer(AppNavigator);
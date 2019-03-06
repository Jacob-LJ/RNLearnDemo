import React, { Component } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import NavigationService from './TestDemoPage/10-react-navigation_3.2.3/10.16-全局导航封装/NavigationService';


export default class MyButton extends Component {
    render() {
        return (
            <Button
                title={this.props.title}
                // 点击触发，导航到名称为 Details 的路由
                onPress={() => {
                        NavigationService.navigate(this.props.routerName, { userName: 'Lucy' });
                    }}
            />
        )
    }
}

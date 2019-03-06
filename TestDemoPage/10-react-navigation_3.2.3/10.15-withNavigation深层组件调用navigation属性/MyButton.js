import React, { Component } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { withNavigation } from 'react-navigation';

class MyButton extends Component {
    render() {
        return (
            <Button
                title={this.props.title}
                // 点击触发，导航到名称为 Details 的路由
                onPress={() => this.props.navigation.navigate(this.props.routerName)}
            />
        )
    }
}

export default withNavigation(MyButton)
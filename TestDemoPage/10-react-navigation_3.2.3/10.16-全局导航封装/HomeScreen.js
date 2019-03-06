import React, { Component } from 'react';
import { Text, View, StyleSheet, SafeAreaView, Button, StatusBar, Platform, Image } from 'react-native';
import MyButton from './MyButton'

export default class Home extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'gray'}}>
                <Text>Home Screen</Text>
                <MyButton
                    title="Go to Details"
                    routerName='Details'
                />
            </View>
        );
    }
}

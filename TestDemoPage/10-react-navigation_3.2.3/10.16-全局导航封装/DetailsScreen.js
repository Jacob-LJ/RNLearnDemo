import React, { Component } from 'react';
import { Text, View, StyleSheet, SafeAreaView, Button, StatusBar, Platform, Image } from 'react-native';
import MyButton from './MyButton'


export default class Details extends React.Component {
    render() {

        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#6a51ae'}}>
                <Text>Details Screen</Text>
                <MyButton
                    title="Go to Home"
                    routerName='Home'
                />
            </View>
        );
    }
}


import React, { Component } from 'react'
import { StyleSheet, View, SectionList, Text, Platform, Alert, SafeAreaView, Dimensions, RefreshControl } from 'react-native';

import MovieListScreen from "./TestDemoPage/11-基础组件使用/11.3-SectionList/SectionListPullUp/screen/MovieListScreen";

type Props = {};
export default class App extends Component<Props> {
    render() {
        return (
            <SafeAreaView>
                <MovieListScreen/>
            </SafeAreaView>
        );
    }
}
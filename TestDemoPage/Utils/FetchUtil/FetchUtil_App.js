/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import { StyleSheet, View, SectionList, Text, Platform, Alert, SafeAreaView, Dimensions, RefreshControl } from 'react-native';
import FetchUtil from './TestDemoPage/Utils/FetchUtil/FetchUtil.js'

type Props = {};
export default class App extends Component<Props> {

    constructor(props) {
        super(props);
        console.log('constructor');

        FetchUtil.getFetch(this.queryMoviesStr('北京',1,10)).then((response) => {
            console.log(response);
        })
    }

    render() {
        return (
            <SafeAreaView>
                {/*<MovieListScreen/>*/}
            </SafeAreaView>
        );
    }

    queryMoviesStr(city, start, count) {
        // return "https://api.douban.com/v2/movie/in_theaters?city=" + city + "&start=" + start + "&count=" + count
        return "http://mock-api.com/WmnEyknJ.mock/api/v1/rest/count"
    }
}

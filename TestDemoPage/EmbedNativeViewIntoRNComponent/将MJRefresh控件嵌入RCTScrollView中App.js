/**
 * 将MJRefresh控件嵌入RCTScrollView中.js
 * RN_Test
 *
 * Created by PSBC on 2019/5/21.
 * Copyright © 2019年 youcash. All rights reserved.
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    findNodeHandle,
    SafeAreaView,
    NativeEventEmitter, NativeModules
} from 'react-native';
import LSRNBridge from './TestDemoPage/EmbedNativeViewIntoRNComponent/Bridge/LSRNBridge';


export default class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [
                {key: 'inputActItem'},
                {key: 'btnActItem'},
                {key: 'tipItem'},
                {key: 'tipItem2'},
            ],
            isRefreshing: false,
        };

    }

    componentDidMount() {
        // 添加footer
        const reactTag = findNodeHandle(this.flatList);
        this.flatListTag = reactTag;
        LSRNBridge.addFooterWithRefreshing(reactTag);

        // 监听footer刷新block
        this.pageCount = 1;
        const eventEmitter = new NativeEventEmitter(NativeModules.LSRNEventEmitterBridge);
        this.listener = eventEmitter.addListener('FooterWithRefreshingCallBack', (data) => {
            setTimeout(() => {
                this.pageCount++;
                if (this.pageCount == 4) {
                    LSRNBridge.endRefreshingWithNoMoreData();
                } else {
                    LSRNBridge.endRefreshing();
                }
            }, 2000);
        });

        // 首次进入页面请求数据
        this._refreshData();
    }

    componentWillUnmount() {
        this.listener.remove();
    }


    render() {
        return (
            <View style={styles.defaultStyle}>
                <FlatList
                    style={{flex: 1}}
                    ref={(ref) => {
                        this.flatList = ref
                    }}
                    data={this.state.data}
                    extraData={this.state}
                    renderItem={this._renderItem}
                    keyExtractor={(item, index) => String(index)}
                    ItemSeparatorComponent={this._ItemSeparatorComponent}
                    ListEmptyComponent={this._ListEmptyComponent}
                    ListHeaderComponent={this._ListHeaderComponent}
                    ListFooterComponent={this._ListFooterComponent}
                    /** 此处的 refreshHeader 已经被原生代码进行了Swizzle替换，将RCTRefreshControl替换为MJRefresh控件*/
                    refreshing={this.state.isRefreshing}
                    onRefresh={() => {
                        this._refreshData();
                    }}
                />
            </View>
        );
    }

    _renderItem = ({item, index}) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    alert('点击行' + index);
                }}
            >
                <View style={{height: 100, backgroundColor: this._randomHexColor()}}></View>
            </TouchableOpacity>

        );
    }

    _ItemSeparatorComponent = () => {
        return (
            <View style={{flex: 1, height: 26}}/>
        );
    };

    _ListEmptyComponent = () => {
        return (
            <View style={{height: 500, backgroundColor: 'red'}}/>
        );
    }

    _ListHeaderComponent = () => {
        return (
            <View style={{height: 200, backgroundColor: 'blue'}}/>
        );
    }

    _ListFooterComponent = () => {
        return (
            <View style={{height: 200, backgroundColor: 'cyan'}}/>
        );
    }

    _refreshData() {
        this.setState({
            isRefreshing: true,
        });

        setTimeout(() => {
            this.setState({
                isRefreshing: false,
            });
            this.pageCount = 1;
            LSRNBridge.resetNoMoreData();
        }, 3000);
    }

    //随机生成十六进制颜色
    _randomHexColor() {
        return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).substr(-6);
    }
}

const styles = StyleSheet.create({
    defaultStyle: {
        flex: 1,
        marginTop: 50,
        marginBottom: 40,
    },
});
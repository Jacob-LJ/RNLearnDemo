/**
 *
 * ——
 *
 * Created by —— on 2019/4/15.
 * Copyright © 2019年 ——. All rights reserved.
 *
 * @format
 * @flow
 */

// import React, {Component} from 'react';
// import PropTypes from 'prop-types';
// import {StyleSheet, View, Text, Dimensions} from 'react-native';
// import Popover from './TestDemoPage/Popover带三角形的缩放弹窗/Components/Popover'; // 这个是直接从第三方react-native-popup-menu中抽出的缩放效果容器控件
//
// const screenW = Dimensions.get('window').width;
// const screenH = Dimensions.get('window').height;
// const column = 5;
// const row = 10;
//
// export default class PopoverDemo extends Component {
//
//     constructor(props) {
//         super(props);
//
//         this.state = {
//             showPopover: false,
//         };
//
//         this.girds = this._gridsView();
//     }
//
//     render() {
//         return (
//             <View style={styles.defaultStyle}>
//                 {this.girds}
//                 {this.state.showPopover ? this._popView(this.popoverLayouts) : null}
//             </View>
//         );
//     }
//
//     _gridsView() {
//         const grids = [];
//         const colors = [];
//         const gridW = screenW / column;
//         const gridH = screenH / row;
//         for (let i = 0; i < column * row; i++) {
//             const color = this._randomHexColor();
//             colors.push(color);
//             grids.push(
//                 <Text
//                     ref={(ref) => {
//                         this['text' + i] = ref
//                     }}
//                     key={i}
//                     style={{
//                         width: gridW,
//                         height: gridH,
//                         backgroundColor: color,
//                         lineHeight: gridH,
//                         textAlign: 'center',
//                     }}
//                     onPress={() => {
//                         this._gridClick(i);
//                     }}
//                 >
//                     索引-{i}
//                 </Text>
//             );
//         }
//         return grids;
//     }
//
//     _popView(defaultLayouts) {
//         return (
//             <Popover
//                 ref={(ref) => {
//                     this.Popover = ref
//                 }}
//                 style={styles.popoverStyle}
//                 layouts={defaultLayouts}
//                 // placement='left' // 强制popover相对于trigger的位置，无论是否有效显示，即可能Popover会超出屏幕
//                 // preferredPlacement='bottom' // 偏好位置，当在可以有效显示时，优先摆放的方位. 【可以学习这个枚举传值提示写法】
//             >
//                 <Text style={{flex: 1}}>Some text</Text>
//                 <Text style={{flex: 1}}>Other text</Text>
//             </Popover>
//         );
//     }
//
//     _measure = ref => new Promise((resolve) => {
//         ref.measure((x, y, width, height, pageX, pageY) => {
//             resolve({
//                 x: pageX, y: pageY,
//                 width, height,
//             })
//         });
//     });
//
//     _gridClick(index) {
//         if (this.state.showPopover) {
//             // 已显示，则隐藏
//             this.Popover.close().then(({finished}) => {
//                 this.setState({
//                     showPopover: false,
//                 });
//             });
//         } else {
//             this._measure(this['text' + index]).then(triggerLayout => {
//                 this.popoverLayouts = {
//                     windowLayout: {width: screenW, height: screenH, x: 0, y: 0},   // popover容器所在的控件尺寸和位置
//                     triggerLayout: triggerLayout, // 触发弹出popover的控件尺寸和位置
//                     optionsLayout: {width: styles.popoverStyle.width, height: styles.popoverStyle.height}, // popover容器的尺寸
//                 };
//                 const show = this.state.showPopover;
//                 this.setState({
//                     showPopover: !show,
//                 });
//             });
//         }
//
//     }
//
//     //随机生成十六进制颜色
//     _randomHexColor() {
//         return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).substr(-6);
//     }
// }
//
// const styles = StyleSheet.create({
//     defaultStyle: {
//         flex: 1,
//         flexDirection:'row',
//         flexWrap: 'wrap',
//     },
//     popoverStyle: {
//         width: 200,
//         height: 200,
//         backgroundColor: 'yellow'
//     },
// });


// import React, { Component } from 'react'
// import { StyleSheet, View, SectionList, Text, Platform, Alert, SafeAreaView, Dimensions, RefreshControl } from 'react-native';
//
// import MovieListScreen from "./TestDemoPage/11-基础组件使用/11.2-FlatList/FlatListPullUp/screen/MovieListScreen";
//
// type Props = {};
// export default class App extends Component<Props> {
//     render() {
//         return (
//             <SafeAreaView>
//                 <MovieListScreen/>
//             </SafeAreaView>
//         );
//     }
// }

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
                    /** refreshHeader */
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
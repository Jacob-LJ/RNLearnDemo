/**
 * 自动计算方位的Popover_App.js
 * _
 *
 * Created by _ on 2019/5/11.
 * Copyright © 2019年 _. All rights reserved.
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, Dimensions} from 'react-native';
import Popover from './TestDemoPage/Popover带三角形的缩放弹窗/Components/Popover'; // 这个是直接从第三方react-native-popup-menu中抽出的缩放效果容器控件

const screenW = Dimensions.get('window').width;
const screenH = Dimensions.get('window').height;
const column = 5;
const row = 10;

export default class PopoverDemo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showPopover: false,
        };

        this.girds = this._gridsView();
    }

    render() {
        return (
            <View style={styles.defaultStyle}>
                {this.girds}
                {this.state.showPopover ? this._popView(this.popoverLayouts) : null}
            </View>
        );
    }

    _gridsView() {
        const grids = [];
        const colors = [];
        const gridW = screenW / column;
        const gridH = screenH / row;
        for (let i = 0; i < column * row; i++) {
            const color = this._randomHexColor();
            colors.push(color);
            grids.push(
                <Text
                    ref={(ref) => {
                        this['text' + i] = ref
                    }}
                    key={i}
                    style={{
                        width: gridW,
                        height: gridH,
                        backgroundColor: color,
                        lineHeight: gridH,
                        textAlign: 'center',
                    }}
                    onPress={() => {
                        this._gridClick(i);
                    }}
                >
                    索引-{i}
                </Text>
            );
        }
        return grids;
    }

    _popView(defaultLayouts) {
        return (
            <Popover
                ref={(ref) => {
                    this.Popover = ref
                }}
                style={styles.popoverStyle}
                layouts={defaultLayouts}
                // placement='left' // 强制popover相对于trigger的位置，无论是否有效显示，即可能Popover会超出屏幕
                // preferredPlacement='bottom' // 偏好位置，当在可以有效显示时，优先摆放的方位. 【可以学习这个枚举传值提示写法】
            >
                <Text style={{flex: 1}}>Some text</Text>
                <Text style={{flex: 1}}>Other text</Text>
            </Popover>
        );
    }

    _measure = ref => new Promise((resolve) => {
        ref.measure((x, y, width, height, pageX, pageY) => {
            resolve({
                x: pageX, y: pageY,
                width, height,
            })
        });
    });

    _gridClick(index) {
        if (this.state.showPopover) {
            // 已显示，则隐藏
            this.Popover.close().then(({finished}) => {
                this.setState({
                    showPopover: false,
                });
            });
        } else {
            this._measure(this['text' + index]).then(triggerLayout => {
                this.popoverLayouts = {
                    windowLayout: {width: screenW, height: screenH, x: 0, y: 0},   // popover容器所在的控件尺寸和位置
                    triggerLayout: triggerLayout, // 触发弹出popover的控件尺寸和位置
                    optionsLayout: {width: styles.popoverStyle.width, height: styles.popoverStyle.height}, // popover容器的尺寸
                };
                const show = this.state.showPopover;
                this.setState({
                    showPopover: !show,
                });
            });
        }

    }

    //随机生成十六进制颜色
    _randomHexColor() {
        return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).substr(-6);
    }
}

const styles = StyleSheet.create({
    defaultStyle: {
        flex: 1,
        flexDirection:'row',
        flexWrap: 'wrap',
    },
    popoverStyle: {
        width: 200,
        height: 200,
        backgroundColor: 'yellow'
    },
});

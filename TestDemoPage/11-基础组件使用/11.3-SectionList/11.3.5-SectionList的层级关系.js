/**
 * SectionList_Hierarchy.js
 * _
 *
 * Created by _ on 2019/5/10.
 * Copyright © 2019年 _. All rights reserved.
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, SectionList} from 'react-native';

export default class SectionList_Hierarchy extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
        };

        this.data = [
            {
                key: '1', title: 'section1', data: [
                    {key: '1', title: 'row1'},
                    {key: '2', title: 'row2'},
                    {key: '3', title: 'row3'}
                ]
            },
            {
                key: '2', title: 'section2', data: [
                    {key: '4', title: 'row1'},
                    {key: '5', title: 'row2'},
                    {key: '6', title: 'row3'}
                ]
            },
            {
                key: '3', title: 'section3', data: [
                    {key: '7', title: 'row1'},
                    {key: '8', title: 'row2'},
                    {key: '9', title: 'row3'}
                ]
            },
            {
                key: '4', title: 'section4', data: [
                    {key: '10', title: 'row1'},
                    {key: '11', title: 'row2'},
                    {key: '12', title: 'row3'}
                ]
            },
            {
                key: '5', title: 'section1', data: [
                    {key: '1', title: 'row1'},
                    {key: '2', title: 'row2'},
                    {key: '3', title: 'row3'}
                ]
            },
            {
                key: '6', title: 'section2', data: [
                    {key: '4', title: 'row1'},
                    {key: '5', title: 'row2'},
                    {key: '6', title: 'row3'}
                ]
            },
            {
                key: '7', title: 'section3', data: [
                    {key: '7', title: 'row1'},
                    {key: '8', title: 'row2'},
                    {key: '9', title: 'row3'}
                ]
            },
            {
                key: '8', title: 'section4', data: [
                    {key: '10', title: 'row1'},
                    {key: '11', title: 'row2'},
                    {key: '12', title: 'row3'}
                ]
            },

        ];
        // 给 section 添加折叠状态show属性
        for (let i = 0; i < this.data.length; i++) {
            const section = this.data[i];
            section.show = true;
        }
    }


    componentDidMount() {

        this.setState({
            data: this.data
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <SectionList
                    sections={this.state.data}
                    extraData={this.state}
                    keyExtractor={(item, index) => index}
                    renderItem={this._renderItem}
                    ListHeaderComponent={this._ListHeaderComponent}
                    ListFooterComponent={this._ListFooterComponent}
                    renderSectionHeader={this._renderSectionHeader}
                    renderSectionFooter={this._renderSectionFooter}
                    SectionSeparatorComponent={this._SectionSeparatorComponent}
                    ItemSeparatorComponent={this._ItemSeparatorComponent}

                />
            </View>
        );
    }


    _renderItem = ({item, section, index}) => {
        if (!section.show) return null;
        return (
            <View style={{height: 80, backgroundColor: 'white', justifyContent: 'center'}}>
                <Text style={{color: 'red', lineHeight: 80, textAlign: 'center'}}
                      onPress={() => {
                          this.setState({open: true})
                          alert('lallal');
                      }}
                >
                    {item.title}
                </Text>
            </View>
        );
    };

    _ListHeaderComponent = () => {
        return (
            <View style={{height: 80, backgroundColor: '#CD7F32', alignItems: 'center', justifyContent: 'center'}}>
                <Text>
                    SectionList Header
                </Text>
            </View>
        );

    };

    _ListFooterComponent = () => {
        return (
            <View style={{height: 80, backgroundColor: '#CD7F32', alignItems: 'center', justifyContent: 'center'}}>
                <Text>
                    SectionList Footer
                </Text>
            </View>

        );

    };


    _SectionSeparatorComponent = ({highlighted, leadingItem, leadingSection, section, trailingItem, trailingSection}) => {
        return (
            // 这里是 section 的上下都渲染，用于区分 section。很难判断只渲染顶部或底部
            <View style={{height: 15, backgroundColor: '#9370DB'}}>

            </View>
        );
    };


    _ItemSeparatorComponent = ({highlighted, leadingItem, leadingSection, section, trailingItem, trailingSection}) => {
        if (!section.show) {
            return null;
        } else {
            return (
                <View style={{height: 1, backgroundColor: 'blue'}}></View>
            );
        }
    };


    _renderSectionHeader = ({section}) => {
        return (
            <View style={{height: 50, backgroundColor: 'gray'}}>
                <Text style={{flex: 1, textAlign: 'center'}}
                      onPress={() => this._foldingSection(section)}
                >
                    {'header    ' + section.title}
                </Text>
                <View style={{
                    position: 'absolute',
                    left: section.key * 30,
                    bottom: 20,
                    height: 200,
                    width: 20,
                    backgroundColor: this._randomHexColor()
                }}/>
                <View style={{
                    position: 'absolute',
                    left: section.key * 90,
                    height: 200,
                    width: 20,
                    backgroundColor: this._randomHexColor()
                }}/>
            </View>
        );
    };

    _renderSectionFooter = ({section}) => {
        return (
            <View style={{height: 50, backgroundColor: 'blue'}}>
                <Text style={{flex: 1, textAlign: 'center'}}
                      onPress={() => this._foldingSection(section)}
                >
                    {'footer    ' + section.title}
                </Text>
                <View style={{
                    position: 'absolute',
                    left: section.key * 30,
                    height: 200,
                    width: 20,
                    backgroundColor: this._randomHexColor()
                }}/>
            </View>
        );
    };

    _foldingSection = (section) => {
        const data = this.state.data;
        const sectionIndex = data.indexOf(section);
        if (sectionIndex < 0) return; // 数据中不存在传入的section
        data[sectionIndex].show = !data[sectionIndex].show;
        this.setState({
            data: data,
        })
    };

    //随机生成十六进制颜色
    _randomHexColor() {
        return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).substr(-6);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30,
    }
});

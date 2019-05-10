/**
 * SectionList_Folding_SlideOut.js
 * RN_Test
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
import SwipeableRow from 'react-native/Libraries/Experimental/SwipeableRow/SwipeableRow';

export default class SectionList_Folding_SlideOut extends Component {

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
            section.show = false;
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
                    renderItem={this._renderItem}
                    extraData={this.state}
                    keyExtractor={(item, index) => index}
                    renderSectionHeader={this._renderSectionHeader}
                    SectionSeparatorComponent={this._SectionSeparatorComponent}
                    ItemSeparatorComponent={this._ItemSeparatorComponent}
                    ListHeaderComponent={this._ListHeaderComponent}
                    ListFooterComponent={this._ListFooterComponent}
                />
            </View>
        );
    }


    _renderItem = ({item, section, index}) => {
        if (!section.show) return null;
        return (
            <SwipeableRow
                isOpen={this.state.open}
                preventSwipeRight={true}
                maxSwipeDistance={100}
                slideoutView={this._slideoutView()}
            >
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
            </SwipeableRow>
        );
    };

    // 左滑删除控件
    _slideoutView() {
        return (
            <View style={{
                position: 'absolute',
                right: 0,
                bottom: 0,
                height: 80,
                width: 100,
                backgroundColor: 'red',
                justifyContent: 'center'
            }}>
                <Text style={{color: 'white', lineHeight: 80, textAlign: 'center'}}
                      onPress={() => {
                          alert('左滑点击删除');
                      }}
                >
                    删除
                </Text>
            </View>
        );
    }

    _ListHeaderComponent = () => {
        return (
            <View style={{height: 35, backgroundColor: '#CD7F32', alignItems: 'center', justifyContent: 'center'}}>
                <Text>
                    SectionList Header
                </Text>
            </View>
        );

    };

    _ListFooterComponent = () => {
        return (
            <View style={{height: 35, backgroundColor: '#CD7F32', alignItems: 'center', justifyContent: 'center'}}>
                <Text>
                    SectionList Footer
                </Text>
            </View>

        );

    };


    _SectionSeparatorComponent = ({highlighted, leadingItem, leadingSection, section, trailingItem, trailingSection}) => {
        return (
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
                <Text style={{flex: 1, color: 'red', textAlign: 'center'}}
                      onPress={() => this._foldingSection(section)}
                >
                    {section.title}
                </Text>
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
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30,
    }
});



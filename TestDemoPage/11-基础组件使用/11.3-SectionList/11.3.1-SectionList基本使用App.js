
import React, { Component } from 'react';
import { SectionList, StyleSheet, Text, View, SafeAreaView } from 'react-native';

/*
    SectionList 的简单使用
注意：
1、数据源的格式
2、必须的属性设置sections、renderItem、keyExtractor，记得函数有哪些参数
3、特殊数据源指定renderItem
 */

export default class SectionListBasics extends Component {
    render() {

        const overrideRenderItem = ({ item, index, section: { title, data } }) => <Text style={{backgroundColor:'orange'}}>Override{item}</Text>

        return (
            <SafeAreaView>
                <View style={styles.container1}>
                    {/* 方式1，通用型，所有数据使用同一个 renderItem 的方式 */}
                    <SectionList
                        sections={[
                            {title: 'D', data: ['Devin']},
                            {title: 'J', data: ['Jackson', 'James', 'Jillian', 'Jimmy']},
                        ]}
                        renderItem={({ item, index, section }) => <Text style={styles.item}>{item}</Text>}
                        renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
                        keyExtractor={(item, index) => index} // 用于为给定的item生成一个不重复的key。
                    />
                </View>

                <View style={styles.container2}>
                    {/* 方式2，指定个别数据使用另外一种 renderItem 的方式*/}
                    <SectionList
                        sections={[
                            { title: 'Title1', data: ['item1', 'item2'], renderItem: overrideRenderItem }, // 单独的渲染方式
                            { title: 'Title2', data: ['item3', 'item4'] },
                            { title: 'Title3', data: ['item5', 'item6'] },
                        ]}
                        renderItem={({ item, index, section }) => <Text style={styles.item}>{item}</Text>}
                        renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
                        keyExtractor={(item, index) => index}
                    />
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container1: {
        backgroundColor: 'red',
    },
    container2: {
        backgroundColor: 'gray',
    },
    sectionHeader: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 14,
        fontWeight: 'bold',
        backgroundColor: 'blue',//'rgba(247,247,247,1.0)',
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
        backgroundColor: 'rgba(27,127,67,1.0)',
    },
})
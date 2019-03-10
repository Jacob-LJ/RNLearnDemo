
import React, { Component } from 'react'

import { StyleSheet, View, SectionList, Text, Platform, Alert, SafeAreaView } from 'react-native';

/*
    SectionList设置点击事件_分割线App.js
注意：
1、点击事件的设置，实际就是导出的组件调用其 onPress 属性
2、分割线的设置
 */


export default class App extends Component<{}> {

    // 抽取行的点击事件
    GetSectionListItem = item => {
        Alert.alert(item);
    };

    // 抽取行分割线的生成函数
    FlatListItemSeparator = () => {
        return (
            //Item Separator
            <View
                style={{ height: 0.5, width: '100%', backgroundColor: '#C8C8C8' }}
            />
        );
    };

    render() {
        var A = [
            { id: '1', value: 'Afghanistan' },
            { id: '2', value: 'Afghanistan' },
            { id: '3', value: 'Afghanistan' },
        ];
        var B = [
            { id: '4', value: 'Benin' },
            { id: '5', value: 'Bhutan' },
            { id: '6', value: 'Bosnia' },
            { id: '7', value: 'Botswana' },
            { id: '8', value: 'Brazil' },
            { id: '9', value: 'Brunei' },
            { id: '10', value: 'Bulgaria' },
        ];
        var C = [
            { id: '11', value: 'Cambodia' },
            { id: '12', value: 'Cameroon' },
            { id: '13', value: 'Canada' },
            { id: '14', value: 'Cabo' },
        ];

        return (
            <SafeAreaView>
                <SectionList
                    // 分割线的设置
                    ItemSeparatorComponent={this.FlatListItemSeparator}
                    inverted = {true}

                    // 数据格式，title 和 data 必须是这样写吗？
                    sections={[
                        { title: 'Section Head For Data A', data: A },
                        { title: 'Section Head For Data B', data: B },
                        { title: 'Section Head For Data C', data: C },
                    ]}

                    // 分组
                    renderSectionHeader={({ section }) => (
                        <Text style={styles.SectionHeaderStyle}> {section.title} </Text>
                    )}

                    // 渲染行
                    renderItem={({ item }) => (
                        <Text
                            style={styles.SectionListItemStyle}
                            //Item Separator View
                            onPress={this.GetSectionListItem.bind(
                                this,
                                'Id: ' + item.id + ' Name: ' + item.value
                            )}>
                            {item.value}
                        </Text>
                    )}
                    keyExtractor={(item, index) => index}
                />
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    SectionHeaderStyle: {
        backgroundColor: '#CDDC89',
        fontSize: 20,
        padding: 5,
        color: '#fff',
    },

    SectionListItemStyle: {
        fontSize: 15,
        padding: 15,
        color: '#000',
        backgroundColor: '#F5F5F5',
    },
});
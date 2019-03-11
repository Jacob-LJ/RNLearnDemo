
import React, { Component } from 'react'

import { StyleSheet, View, SectionList, Text, Platform, Alert, SafeAreaView, Dimensions, RefreshControl } from 'react-native';

/*
    SectionList设置点击事件_分割线App.js
注意：
1、点击事件的设置，实际就是导出的组件调用其 onPress 属性
2、分割线的设置
3、其他常用 API 使用


参考：
1、ListEmptyComponent 不居中问题 和 onEndReachedThreshold 的设置像素还是设置比例问题
    [ReactNative 之FlatList踩坑封装总结 - 简书](https://www.jianshu.com/p/3203f413a887)

2、
 */


const ScreenW = Dimensions.get('window').width;
const ScreenH = Dimensions.get('window').height;

export default class App extends Component<{}> {


    constructor(props){
        super(props);
        this.state={
            refreshing:false
        }
    }

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
                    ref='SectionList'
                    // 数据格式，title 和 data 必须是这样写吗？
                    sections={[
                        { title: 'Section Head For Data A', data: A },
                        { title: 'Section Head For Data B', data: B },
                        { title: 'Section Head For Data C', data: C },
                        { title: 'Section Head For Data D', data: A },
                        { title: 'Section Head For Data E', data: B },
                        { title: 'Section Head For Data F', data: C },
                    ]}
                    // sections={[]}

                    // 渲染组头
                    renderSectionHeader={({ section }) => (
                        <Text style={styles.SectionHeaderStyle}> {section.title} </Text>
                    )}
                    // 渲染组尾
                    renderSectionFooter={({ section }) => (
                        <Text style={styles.SectionFooterStyle}> {section.title + ' section-footer'} </Text>
                    )}

                    // 渲染行
                    renderItem={({ item }) => (
                        <Text
                            style={styles.SectionListItemStyle}
                            //Item Separator View
                            onPress={this.getSectionListItem.bind(this, 'Id: ' + item.id + ' Name: ' + item.value)}
                        >
                            {item.value}
                        </Text>
                    )}
                    // 设置行唯一标识
                    keyExtractor={(item, index) => index}

                    // 分割线的设置
                    ItemSeparatorComponent={this.itemSeparatorComponent}

                    // Footer
                    // ListFooterComponent={this.listFooterComponent}
                    // Header
                    // ListHeaderComponent={this.listHeaderComponent}

                    // 数据反向渲染
                    // inverted = {true}

                    /*
                    是否使用 ListView 实现，如果为 true 则将 SectionList 实现机制转为 ListView 机制。
                    这里解决的问题是:
                        为了优化内存占用同时保持滑动的流畅，列表内容会在屏幕外异步绘制。这意味着如果用户滑动的速度超过渲染的速度，则会先看到空白的内容。
                        这是为了优化不得不作出的妥协，而我们也在设法持续改进。所以如果不想在滑动过快导致白屏出现，就只能使用ListView。
                    */
                    // legacyImplementation={true} // 当前设置为 true 后 Footer 和 Header 会消失

                    // 当 sections={[]} 即数据为空时，展示的占位视图组件
                    ListEmptyComponent={this.listEmptyComponent}

                    // 决定当距离内容最底部还有多远时触发onEndReached回调。
                    // 注意此参数是一个比值而非像素单位。比如，0.5表示距离内容最底部的距离为当前列表可见长度的一半时触发。
                    onEndReachedThreshold={0.1} // render刷新执行后又可以再促发一次
                    onEndReached={() => {
                        console.log('onEndReached');
                    }}

                    // 上下拉控件建议还是通过导入原生控件如MJRefresh来进行该操作
                    // 下拉刷新
                    // refreshControl={
                    //     <RefreshControl
                    //         refreshing={this.state.refreshing}
                    //         onRefresh={()=>{
                    //             this.setState({refreshing:true})
                    //             setTimeout(() => {
                    //                 this.setState({refreshing:false})
                    //             }, 2000);
                    //         }}
                    //     />
                    // }

                    // 这样写也是可以设置下拉刷新控件
                    refreshing={this.state.refreshing}
                    onRefresh={()=>{
                        this.setState({refreshing:true})
                        setTimeout(() => {
                            this.setState({refreshing:false})
                        }, 2000);
                    }}

                    // header是否粘连在屏幕的顶端(iOS)
                    stickySectionHeadersEnabled={false}

                    // 闪滚动条，参考行点击事件

                    //

                />
            </SafeAreaView>
        );
    }



    // 抽取行的点击事件
    getSectionListItem = item => {
        // Alert.alert(item);

        // 滚动条闪一下
        this.refs.SectionList.flashScrollIndicators();
    };

    // 抽取行分割线的生成函数
    itemSeparatorComponent = () => {
        return (
            //Item Separator
            <View
                style={{ height: 0.5, width: '100%', backgroundColor: '#C8C8C8' }}
            />
        );
    };

    listFooterComponent = () => {
        return (
            <View style={{ height:150, width: '100%', backgroundColor: '#c3c5c1' , justifyContent:'center', alignItems:'center'}}>
                <Text style={{fontSize: 30,}}>这是尾部 Footer</Text>
            </View>
        );
    };

    listHeaderComponent = () => {
        return (
            <View style={{ height:150, width: '100%', backgroundColor: '#c3c5c1' , justifyContent:'center', alignItems:'center'}}>
                <Text style={{fontSize: 30,}}>这是顶部 Header</Text>
            </View>
        );
    };

    listEmptyComponent = () => {
        return (
            <View
                // 必须设置具体的宽高值，flex 和 100% 等无效，至于问题解析可参考链接 [ReactNative 之FlatList踩坑封装总结 - 简书](https://www.jianshu.com/p/3203f413a887)
                style={{ height: ScreenH, width: ScreenW, backgroundColor: 'yellow' , justifyContent:'center', alignItems:'center'}}
            >
                <Text style={{fontSize: 20,}}>这是空数据时的占位组件</Text>
            </View>
        );
    };
}

const styles = StyleSheet.create({
    SectionHeaderStyle: {
        backgroundColor: '#CDDC89',
        fontSize: 20,
        padding: 5,
        color: '#fff',
    },
    SectionFooterStyle: {
        backgroundColor: '#646ddc',
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
/**
 * QSIStudentInfoQueryRecordList_App.js
 * RN_Test
 *
 * Created by PSBC on 2019/4/19.
 * Copyright © 2019年 youcash. All rights reserved.
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, TouchableOpacity, Image, FlatList, Dimensions} from 'react-native';

var screenW = Dimensions.get('window').width;
var screenH = Dimensions.get('window').height;

export default class QSIStudentInfoQueryRecordList extends Component {
    constructor(props) {
        super(props);
        // 布局常用固定值
        this.itemH = 200; // FlatList中Item的高度
        this.margin = 15; // FlatList中Item内控件的间隙

        this.state = {
            data: [],
            expandRecordArray: [],
        };
    }

    componentDidMount() {
        // setTimeout(()=>{
        // 假设从网络回调的数据
        let rawData = [
            {
                "userName":"张三",
                "highestEducationLevel":"研究生",
                "searchTime":"20190415",
                "studentInfoList":[
                    {
                        "studentId":{"name": "学号", "value": "123456789"},
                        "schoolName":{"name": "学校名称", "value": "科技大学"}
                    },
                    {
                        "studentId":{"name": "学号", "value": "9877232323"},
                        "schoolName":{"name": "学校名称", "value": "中山大学"}
                    }

                ],
                "educationList":[
                    {
                        "zhuanye":{"name": "专业", "value": "软件工程"},
                        "educationLevel":{"name": "学历", "value": "研究生"}
                    },
                    {
                        "zhuanye":{"name": "专业", "value": "计算机科学"},
                        "educationLevel":{"name": "学历", "value": "本科"}
                    }
                ]
            },
            {
                "userName":"李四",
                "highestEducationLevel":"研究生",
                "searchTime":"20190416",

                "studentInfoList":[
                    {
                        "studentId":{"name": "学号", "value": "99999999999"},
                        "schoolName":{"name": "学校名称", "value": "华中科技"}
                    },
                    {
                        "studentId":{"name": "学号", "value": "8888888888888"},
                        "schoolName":{"name": "学校名称", "value": "南方大学"}
                    }

                ],
                "educationList":[
                    {
                        "zhuanye":{"name": "专业", "value": "环境工程"},
                        "educationLevel":{"name": "学历", "value": "研究生"}
                    },
                    {
                        "studentId":{"name": "专业", "value": "化学"},
                        "schoolName":{"name": "学历", "value": "本科"}
                    }
                ]
            },
            {
                "userName":"张三",
                "highestEducationLevel":"研究生",
                "searchTime":"20190415",
                "studentInfoList":[
                    {
                        "studentId":{"name": "学号", "value": "123456789"},
                        "schoolName":{"name": "学校名称", "value": "科技大学"}
                    },
                    {
                        "studentId":{"name": "学号", "value": "9877232323"},
                        "schoolName":{"name": "学校名称", "value": "中山大学"}
                    }

                ],
                "educationList":[
                    {
                        "zhuanye":{"name": "专业", "value": "软件工程"},
                        "educationLevel":{"name": "学历", "value": "研究生"}
                    },
                    {
                        "zhuanye":{"name": "专业", "value": "计算机科学"},
                        "educationLevel":{"name": "学历", "value": "本科"}
                    }
                ]
            },
            {
                "userName":"李四",
                "highestEducationLevel":"研究生",
                "searchTime":"20190416",

                "studentInfoList":[
                    {
                        "studentId":{"name": "学号", "value": "99999999999"},
                        "schoolName":{"name": "学校名称", "value": "华中科技"}
                    },
                    {
                        "studentId":{"name": "学号", "value": "8888888888888"},
                        "schoolName":{"name": "学校名称", "value": "南方大学"}
                    }

                ],
                "educationList":[
                    {
                        "zhuanye":{"name": "专业", "value": "环境工程"},
                        "educationLevel":{"name": "学历", "value": "研究生"}
                    },
                    {
                        "studentId":{"name": "专业", "value": "化学"},
                        "schoolName":{"name": "学历", "value": "本科"}
                    }
                ]
            },
        ];
        // 处理展开状态的记录列表
        let expandRecordArray = [];
        rawData.forEach((item, index) => {
            expandRecordArray.push(index === 0 ? true : false); // 第一个默认展开
        });
        this.setState({
            data: rawData,
            expandRecordArray: expandRecordArray,
        });
        // }, 2000)
    }

    render() {
        return (
            <View style={styles.defaultStyle}>

                <FlatList
                    data={this.state.data}
                    extraData={this.state}
                    renderItem={this._renderItem}
                    keyExtractor={(item, index) => String(index)}
                    ItemSeparatorComponent={this._separatorComponent}
                    ListEmptyComponent={this._listEmptyComponent}
                />

            </View>
        );
    }

    // 跳转至【查询登录】页
    _goQueryLoginPage = () => {
        alert('_goQueryLoginPage');
    };

    // 跳转至【个人信息安全锁】页
    _goPersonInfoLockPage = () => {
        alert('_goPersonInfoLockPage');
    };

    // 组装 FlatList 的行 组件
    _renderItem = ({item, index}) => {
        return (
            <View style={{width:'100%', backgroundColor:'gray', padding: this.margin}}>
                <View style={{flex:1, flexDirection:'row', flexWrap:'wrap', borderColor:'#e5e5e5', borderWidth: 1, borderRadius:10, backgroundColor:'blue'}}>
                    <Text style={this._getItemBlockStyle()}>**弟</Text>
                    <Text style={this._getItemBlockStyle()}>最高学历：博士研究生</Text>
                    <Text style={this._getItemBlockStyle()}>查询时间：2019-05-11</Text>
                    <Text style={this._getItemBlockStyle()}
                          onPress={()=>{this._expandAction(index);}}
                    >点击展开和收起详情</Text>
                </View>
                {this._getExpandComponent(index)}
            </View>
        );
    }

    // FlatList行分割组件
    _separatorComponent = () => {
        return (
            <View style={{flex:1, height:10, backgroundColor:'#e5e5e5'}}/>
        );
    };

    // 没数据时展示组件
    _listEmptyComponent = () => {
        return <View style={{backgroundColor: 'red', height:screenH, width:screenW}}>
            <Text style={{
                flex: 1,
                alignItems: 'center',
                textAlign: 'center',
                color: 'white'}}
            >
                暂时没有数据
            </Text>
        </View>
    }

    _getItemBlockStyle = () => {
        const borderW = 1;
        const blockH = (this.itemH - this.margin * 2)/2 - borderW;
        const blockW = (screenW - this.margin * 2)/2 - borderW;
        const itemBlockStyle = {textAlign:'center', height:blockH, width:blockW, borderColor:'green', borderWidth: borderW,};
        return itemBlockStyle;
    }

    // 获取展开时的组件
    _getExpandComponent = (index) => {
        if (this.state.expandRecordArray[index]) {
            return (
                <View style={{flex:1, height:this.itemH, borderColor:'#e5e5e5', borderWidth: 1, borderTopWidth: 0, borderRadius:10, backgroundColor:'green'}}/>
            );
        }
        return null;
    }

    // 点击展开
    _expandAction = (index) => {
        const tempArray = this.state.expandRecordArray;
        tempArray[index] = !tempArray[index];
        this.setState({
            expandRecordArray:tempArray,
        });
    };
}

const styles = StyleSheet.create({
    defaultStyle: {
        flex: 1,
        marginTop: 80,
        marginBottom: 80,
    },
});

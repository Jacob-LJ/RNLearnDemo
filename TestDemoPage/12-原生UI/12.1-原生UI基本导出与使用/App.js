/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */


import React, {Component} from 'react';
import {Text, StyleSheet, View} from 'react-native';

import NativeBtn from './TestDemoPage/12-原生UI/12.1-原生UI基本导出与使用/NativeBtn'  // NativeBtn.js 中因为是 export default，所以不需要使用{}包住 NativeBtn

type Props = {};
export default class DemoApp extends Component<Props> {



    render() {

        const jsonObject = {
            name : 'jacob',
            age : 28,
            infoDict : { wife : 'cathy', age : 27},
        }

        return (
            <View style={styles.container}>
                <NativeBtn
                    // style={{width:100, height:100, backgroundColor: 'gray'}} // 不传的话内部使用默认style
                    property_string={'传入的字符串属性值'}
                    property_number={333}
                    property_bool={true}
                    property_array={[1,'jacob',3, true, {'name':'jack', 'age':12}]}
                    normalTitle={'normalTitle'}
                    selectedTitle={'selectedTitle'}
                    // complexProperty={JSON.stringify(jsonObject)} // 这样传到原生是一个字符串
                    complexProperty={jsonObject} // 这样传到原生是一个字典对象
                />
            </View>
        );

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, // 占据全屏
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component, PropTypes} from 'react';
// import PropTypes from 'prop-types';

// 注意: React.PropTypes 自 React v15.5 起已弃用。请使用 prop-types 库代替。
// 代码是不能正常运行的，除非使用 prop-types。

// [查看本地安装的react-native和react版本和最新版本 - 简书](https://www.jianshu.com/p/82eac458d88e)

/*
参考：
1、[使用 PropTypes 进行类型检查 - React](https://react.docschina.org/docs/typechecking-with-proptypes.html)
> PropTypes使用例子介绍，及默认属性值使用

2、[React把PropTypes放到一个独立包 - 知乎](https://zhuanlan.zhihu.com/p/26286646)

3、[ReactNative之PropTypes（七） - 简书](https://www.jianshu.com/p/73bb6f75ed31)
*/

import {StyleSheet, View} from 'react-native';

export default class JAView extends Component {

    static propTypes = {
        age: PropTypes.number,
        name: PropTypes.string,
    }

    static defaultProps = {
        age: 20,
        name: 'Jacob',
    }

    render(){
        return (
            <View style={styles.viewStyle} ></View>
        );
    }
}

const styles = StyleSheet.create({
    viewStyle: {
        flex: 1,
        backgroundColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
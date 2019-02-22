/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, requireNativeComponent } from 'react-native';


// requireNativeComponent 自动把'NativeBtn'解析为'NativeBtnManager' 而 NativeBtnManager 名称必须要原生的导出名称一致
// 注意 requireNativeComponent 的第二个参数为用于封装的组件 NativeBtn。这使得 React Native 的底层框架可以检查【原生属性】和【包装类的属性】是否一致，来减少出现问题的可能
const NativeBtnFromeNative = requireNativeComponent('NativeBtn', NativeBtn);

export default class NativeBtn extends React.Component {

    // 属性定义
    static propTypes = {
        // 下面是原生NativeBtnManager中导出的 view 的内部属性
        property_string: PropTypes.string.isRequired, // 必须传值，否则警告
        property_number: PropTypes.number,
        property_bool:PropTypes.bool,
        property_array:PropTypes.array,

        // 这个和 property_string 一样是原生NativeBtnManager中导出的view的内部属性，它的区别是func类型属性
        // 实际上它就是导出的view的block属性，封装的是js的回调代码，调用时机放在原生里而已
        onBubblingEventBlock:PropTypes.func, //

        // normalTitle 和 selectedTitle是原生 NativeBtnManager 的带方法体属性
        normalTitle:PropTypes.string,
        selectedTitle:PropTypes.string,

    }

    // 属性的默认值，如果设置了默认值，即使设了isRequired，也不会报警告提示
    static  defaultProps = {
        // property_string:'这是字符串属性',
        property_number:1010,
        property_bool:true,
    }


    _onChange = (event: Event) => {
        alert(`${event.nativeEvent["msg"]},当前按钮:${event.nativeEvent["isSelected"] ? "选中状态" : "正常状态"}`);
    }

    render() {
        return (
            <NativeBtnFromeNative
                {...this.props}
                style={this.props.style?this.props.style:styles.defaultStyle}
                onChange={this._onChange} // 将内部方法绑定到原生属性中
            />);
    }
}


const styles = StyleSheet.create({
    // 默认样式
    defaultStyle: {
        width: 200,
        height: 50,
        // backgroundColor:'gray',
    }
});
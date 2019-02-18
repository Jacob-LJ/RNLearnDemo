/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

// 组件生命周期
/*
1、参考文章地址：[ReactNaive组件生命周期（六）](https://www.jianshu.com/p/de6dc599b718)
组件声明周期方法调用流程图片
https://upload-images.jianshu.io/upload_images/304825-868a855fbb449f3d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1000/format/webp

2、各阶段方法调用顺序（实例化阶段、运行阶段、销毁阶段）
2.1、实例化阶段
constructor -> componentWillMount -> render -> componentDidMount

2.2、运行阶段
Props改变：
componentWillReceiveProps -> shouldComponentUpdate -> componentWillUpdate -> render -> componentDidUpdate

state改变：
shouldComponentUpdate -> componentWillUpdate -> render -> componentDidUpdate

2.3、销毁阶段
componentWillUnmount

*/

/*
下面案例逻辑，使用调试模式，观察console中的log日志即可。

1、根控件App中有一个子控件(自定义的)LifeComponent
2、通过修改App控件的state后，将该state中的值传入至LifeComponent的props中，这样就模拟出了props的修改
3、通过修改LifeComponent的state值，观察内部生命周期方法的调用
*/

class LifeComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            age:'Jacob',
        }

        console.log('constructor');
    }

    componentWillMount() {
        console.log('componentWillMount');
    }

    componentDidMount() {
        console.log('componentDidMount');
    }

    shouldComponentUpdate() {
        console.log('shouldComponentUpdate');
        return true;
    }

    componentWillReceiveProps() {
        console.log('componentWillReceiveProps');
    }

    componentWillUpdate() {
        console.log('componentWillUpdate');
        // this.setState({
        //     age: 1
        // });
    }

    componentDidUpdate() {
        console.log('componentDidUpdate');
    }

    componentWillUnmount() {
        console.log('componentWillUpdate');
    }

    render(){
        console.log('render');

        return (
            <View style={styles.lifeStyle} >

                {/* 点击修改自身的state时，会触发运行时state修改周期方法 */}
                <Text
                    style={styles.clickStyle}
                    onPress={()=>{
                        this.setState({
                            age: 1,
                        });
                    }}>点击修改LifeComponent(自己)的state</Text>
            </View>
        );
    }
}


export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name:'Jacob',
        }
    }

    render() {
        return (
            <View style={styles.AppStyle}>

                {/* 点击修改自身的state时，会触发render方法的调用，此时会将新的this.state.name传入至LifeComponent的props中 */}
                <Text
                    style={styles.clickStyle}
                    onPress={()=>{
                        this.setState({
                            name : 'Cathy'
                        })
                    }}>点击修改LifeComponet的props属性</Text>

                <LifeComponent name={this.state.name} />
                {/* 当新的props更新，触发LifeComponent声明周期方法 */}

            </View>
        );
    }
}

const styles = StyleSheet.create({
    AppStyle: {
        flex: 1,
        marginTop: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    lifeStyle: {
        flex: 1,
        backgroundColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center',
    },
    clickStyle: {
        marginTop: 20,
        backgroundColor:'orange',
        width: '50%',
        height: 50,
        textAlign: 'center',
    }
});

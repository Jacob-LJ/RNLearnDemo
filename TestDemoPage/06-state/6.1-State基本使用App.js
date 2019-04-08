/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

// state
/*
一、简述
    我们使用两种数据来控制一个组件：props和state。
    props是在父组件中指定，而且一经指定，在被指定的组件的生命周期中则不再改变。

    对于需要改变的数据，我们需要使用state。

    一般来说，你需要在 constructor 中初始化state（译注：这是 ES6 的写法，早期的很多 ES5 的例子使用的是 getInitialState 方法来初始化 state，这一做法会逐渐被淘汰），然后在需要修改时调用setState方法。


二、使用
1、setSate()函数语法:
    setState(updater[, callback])
    updater 是要改变的state对象，
    callback 是 state 导致的页面重新渲染的回调，等价于componentDidUpdate
        this.setState((state, props) => {
          return {counter: state.counter + props.step}; // 这个state与this.state并非同一个，具体参考第四点的第二个链接
        });
    一般而言，在设置页面某些state的时候，需要先设置好state，然后再对页面的一些参数进行修改的时候，可以使用setState的回调函数。

2、setState函数异步举例
    * 不在回调中使用参数，我们在设置state后立即使用state：
        this.state = {foo: 1};
        this.setState({foo: 123});
        console.log(this.state.foo); // 1

    * 在回调中调用设置好的state
        this.state = {foo: 2};
        this.setState({foo: 123}, ()=> {
            console.log(foo); // 123
        });

3、setState的简写例子
    [React Native - 状态设置setState()方法使用详解（附：最简写法）](http://www.hangge.com/blog/cache/detail_1737.html)


三、注意点：
1、一切界面变化都是状态state变化
2、state的修改必须通过setState()方法
3、this.state.likes = 100; // 这样的直接赋值修改无效！
4、setState 是一个 merge 合并操作，只修改指定属性，不影响其他属性
    * 名称相同的变量就用新值覆盖老的。
    * 有新增加的变量则直接增加。
    * 原来就有的状态机变量，但本次没有赋新值则保证不变。
5、setState 是异步操作，修改不会马上生效 (参考上面【三、使用】的第2点)



四、其他参考
1、[从 setState promise 化的探讨 体会 React 团队设计思想 | exp team](https://exp-team.github.io/blog/2017/11/04/js/setState-promise/)
2、【推荐查看】函数式setState用法 [setState：这个API设计到底怎么样 - 知乎](https://zhuanlan.zhihu.com/p/25954470)
    * 对象式的setState的弊端
    * 说明了 this.state的改变时机 【要等到render函数被重新执行时（或者shouldComponentUpdate函数返回false之后）才被改变】
3、State 的工作原理和 React.js 完全一致，所以对于处理 state 的一些更深入的细节，你可以参阅React.Component API。
    * [React.Component – React](https://reactjs.org/docs/react-component.html#setstate)
    * 链接中说明了setSate的使用注意事项，还有解答为什么不直接使用this.state来修改的连接
*/

class House extends Component {


    constructor(props) {
        super(props);

        // 在constructor中初始化state中的属性
        this.state = {
            count: 0,
        };

        // 方式1
        // 设置定时器 1秒 = 1000
        // 这里必须绑定,bind会生成了一个新的函数,并且由绑定者调用,否则this不明确
        // setInterval(this.timeUpdate.bind(this),1000);
        // 或者使用下面方法直接调用
        // setInterval(() => {
        //     this.timeUpdate();
        // }, 1000);


        // 方式2
        // 将setInterva和setState组合在一起写时，timeUpdate方法再被调用
        setInterval(() => {
            // 这里是 setInterval 的callBack作用域
            this.setState(previousState => {
                // 这里是 setState 的callBack作用域
                return { count: ++previousState.count };
            });
        }, 1000);

        // 方式3，使用比较深的例子在 RefreshListView.js 文件中。通过state来控制刷新状态
    }

    timeUpdate() {
        var newCount = this.state.count;
        newCount += 1;

        this.setState({
            count:newCount,
        });
    }

    render() {
        return (
            <Text style={styles.myText}>当前{this.props.name}人数为：{this.state.count}人</Text>
        );
    }



}

type Props = {};
export default class App extends Component<Props> {

    render() {
        return (
            <View style={styles.container}>
                <House name={'Jacob-House'}/>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        marginTop: 80,
        flex: 1, // 比例数值
        backgroundColor: '#f8f8f8',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    myText: {
        backgroundColor:'red',
        marginTop: 10,
    }

});

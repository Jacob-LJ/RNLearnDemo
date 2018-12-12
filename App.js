/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

// 什么时候使用{}
// 1.包装对象的时候使用{}
// 2.表达式都需要使用{}，如 <View style={styles.container}></View> 和 type Props = {};
// 3.变量也需要使用{}包起来,如 <Text style={styles.instructions}>{instructions}</Text> 中的{instructions}

// 什么时候使用(),包装组件标签的时候,必须使用(), 如return 组件时：
/*
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
      </View>
    );
 */

/*
 1分号这个也是需要学习的什么时候使用的；定义class类时不用带分号，语句结束带分号

 2、语句与表达式的区别 https://wangdoc.com/javascript/basic/grammar.html#%E8%AF%AD%E5%8F%A5
    2.1 语句（statement）：是为了完成某种任务而进行的操作。赋值语句 var a = 1 + 3;
    2.2 表达式（expression）：指一个为了得到返回值的计算式。如 1 + 3 就是一个表达式
 */



import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

// 带有平台选择的方式
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {  // 这里的<Props>的作用是什么？
  render() {
    return (
      //<View style={styles.container}> // 可以使用下面的方式将 style 属性设置对象值全部列出
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'red'}}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
      </View>
    );
  }
}

// 建议使用const的类型，注意var和const在ES6的区别
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  }, // 从这个地方可以看出，多一个分号是可以的，以前是会报错的
});

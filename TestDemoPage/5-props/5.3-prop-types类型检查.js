/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import PropTypes from 'prop-types';

// props
/*
1 prop-types,类型检查

1、导入 prop-types ：yarn add prop-types --save
2、import PropTypes from 'prop-types';
3、通过 static propTypes = {} 这种固定格式来设置属性的格式，比如说我们将 age 设置为 number 类型
4、当实际传入的类型值不符时（或如果有isRequired指定的话，不传时），运行时会有黄色警告提示
*/

class MyText extends Component {

    static propTypes = {
        name: PropTypes.string,
        age: PropTypes.number,
        sex: PropTypes.string.isRequired, // 表示 sex 是必须要传递的 string 类型的属性，由于 App 中只传递了 name 与 age，所以运行的时候会弹出下面的警告。不要忘记把 defaultProps 中的 sex 属性删除，有默认属性值的话，是永远不会有警告的。
    }

    static defaultProps = {
        name : 'your name',
        age: 999,
        // sex: 'other',
    };

    render() {
        return (
            // 如果控件创建时没有给属性进行赋值，则会使用定义的默认值
            <Text style={styles.myText}>{this.props.name}-{this.props.sex}-{this.props.age}</Text>
        );
    }
}

type Props = {};
export default class App extends Component<Props> {

    render() {
        return (
            <View style={styles.container}>
                {/*这种注释方式是在控件之间的特定注释方式*/}
                {/*不能再控件后面写注释，报错*/}
                {/*在控件内部也不能使用 // 这个注释方式*/}


                {/*如果想设置MyText的 style 只能在其内部return的控件上设置，在这里设置无效*/}
                <MyText name='Jacob' sex={'man'} age={27}/>

                {/* 运行时就会弹出一个黄色的警告 提示我们格式错误，age 期望是 number 类型，却得到了 string 类型。 */}
                <MyText name='Cathy' sex={'women'} age={'error'}/>

                {/* 使用defaultProps内的值 */}
                <MyText />


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

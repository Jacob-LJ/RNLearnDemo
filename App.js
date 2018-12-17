/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

// props
/*
1 默认属性

*/
class MyText extends Component {

    static defaultProps = {
        name : 'this is defalut name',
    };

    render() {
        return (
            // 这是简单单向传值
            <Text style={styles.myText}>Hello {this.props.name}</Text> //调用props
        );
    }
}


type Props = {
    age: number,
};
export default class App extends Component<Props> {

    render() {
        this.props.age;
        return (
            <View style={styles.container}>
                {/*这种注释方式是在控件之间的特定注释方式*/}

                {/*如果想设置MyText的style只能在其内部return的控件上设置，在这里设置无效*/}
                <MyText name='Jacob'/>
                {/*<MyText name='Cathy'/>*/}
                <MyText />

            </View>
        );
    }
}



/*
*
* */
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

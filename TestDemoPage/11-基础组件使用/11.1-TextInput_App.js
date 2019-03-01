import React, { Component } from 'react';
import { AppRegistry, Text, TextInput, View } from 'react-native';

export default class PizzaTranslator extends Component {
    constructor(props) {
        super(props);
        this.state = {text: ''};
    }

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text onPress={()=>{
                    this.refs.TextInput.clear();
                    let isFocused = this.refs.TextInput.isFocused();
                    console.log(isFocused);
                }}>点击清空输入框</Text>
                <TextInput
                    ref={'TextInput'}
                    // ⚠️ ⚠️ ⚠️ 属性 ⚠️ ⚠️ ⚠️
                    style={{width: 200, height: 40, backgroundColor: '#f8f8f8'}}
                    defaultValue='初始文本'
                    placeholder="Type here to translate!"
                    placeholderTextColor='blue'

                    // 如果为true，在componentDidMount后会获得焦点。默认值为false。
                    // autoFocus={true}

                    // 如果为true，文本框中可以输入多行文字。默认值为false。注意安卓上如果设置multiline = {true}，文本默认会垂直居中，可设置textAlignVertical: 'top'样式来使其居顶显示。
                    // multiline={true}

                    // 设置输入框的行数。当multiline设置为true时使用它，可以占据对应的行数。Android
                    // numberOfLines={}

                    // 如果为true，文本框会在提交的时候失焦。对于单行输入框默认值为true，多行则为false。注意：对于多行输入框来说，如果将blurOnSubmit设为true，则在按下回车键时就会失去焦点同时触发onSubmitEditing事件，而不会换行。
                    // blurOnSubmit={true}

                    // 如果为true，则隐藏光标。默认值为false。
                    // caretHidden={true}

                    // 'never', 'while-editing', 'unless-editing', 'always 是否要在文本框右侧显示“清除”按钮。仅在单行模式下可用。默认值为never。
                    clearButtonMode={'while-editing'}

                    // 如果为true，每次开始输入的时候都会清除文本框的内容。iOS
                    // clearTextOnFocus={true}

                    // false 不能编辑
                    // editable={false}

                    // 'default', 'light', 'dark' 指定键盘的颜色。iOS
                    keyboardAppearance={'dark'}

                    // 这些值在所有平台都可用： default number-pad decimal-pad numeric email-address phone-pad 下面的值仅iOS可用： ascii-capable numbers-and-punctuation url name-phone-pad twitter web-search \下面的值仅Android可用： visible-password
                    keyboardType={'default'}

                    // 限制文本框中最多的字符数。使用这个属性而不用JS逻辑去实现，可以避免闪烁的现象。
                    maxLength={20}

                    // 密文 默认值为false。multiline={true}时不可用。
                    // secureTextEntry={false}

                    // ⚠️ ⚠️ ⚠️ 方法 ⚠️ ⚠️ ⚠️
                    // 当文本框内容变化时调用此回调函数。改变后的文字内容会作为参数传递
                    // onChangeText={(text) => this.setState({text})}

                    // 当文本框内容变化时调用此回调函数。回调参数为{ nativeEvent: { eventCount, target, text} }。
                    // onChange={(event) => {
                    //     console.log(event.nativeEvent.text);
                    // }}

                    // 此回调函数当软键盘的确定/提交按钮被按下的时候调用此函数。如果multiline={true}，此属性不可用。
                    // onSubmitEditing={(text) => {
                    //     alert('onSubmitEditing - ' + text)
                    // }}

                    // 当文本框失去焦点的时候调用此回调函数。回调参数为{ nativeEvent: { eventCount, target, text} }。
                    // onBlur={(text) => {
                    //     alert('onBlur - ' + text)
                    // }}

                    // 当文本输入结束后调用此回调函数。回调参数为{ nativeEvent: { eventCount, target, text} }。
                    onEndEditing={(event) => {
                        console.log(event.nativeEvent.text);
                    }}

                    // 当文本框获得焦点的时候调用此回调函数。回调参数为{ nativeEvent: { target } }。
                    onFocus={(event) => {
                        console.log(event.nativeEvent.target);
                    }}

                    // 还有其他。。，
                />

                <Text style={{padding: 10, fontSize: 42}}>
                    {this.state.text}
                </Text>
            </View>
        );
    }
}

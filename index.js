/** @format */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
// 非默认组件 import 时，需要使用 {} 包住
// import App 时，不用{}包住App，是因为 App组件是通过export default 方式导出的，即默认组件不需要{}包住
// 使用 as 方式将 导出的 name 模块另命名为 appName
// 有些 from 后的文件名没有指定对应的路径，及缺少'./',是因为使用了。。后面补上



// 注册程序入口组件: 注册哪个组件,程序启动的时候,就会自动去加载注册组件
// 第一个参数:模块名称,随意填,与iOS delegate中填写的模块名称一至
/*
 NSURL *jsCodeLocation;

 jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];

 RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                     moduleName:@"RN_Test"
                                              initialProperties:nil
                                                  launchOptions:launchOptions];
 */
// 第二个参数:函数,箭头函数 ES6才有的语法， 需要返回组件类名
// 箭头函数: => 左边:函数参数,右边 函数返回值
AppRegistry.registerComponent(appName, () => App);



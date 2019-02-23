//
//  NativeBtnManager.m
//  RN_Test
//
//  Created by PSBC on 2019/2/22.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "NativeBtnManager.h"
#import "YYModel.h"

@implementation NativeBtnManager

RCT_EXPORT_MODULE();


/*
 导出属性分为两种
 1、视图已经存在的属性，使用 RCT_EXPORT_VIEW_PROPERTY
 2、在 ViewManager 中自定义的属性，使用 RCT_CUSTOM_VIEW_PROPERTY
 
 RCT_EXPORT_VIEW_PROPERTY(name, type)，第一个参数是该属性的名字，第二个参数是该属性的类型，这里的类型支持所有标准JSON类型：
    string (NSString)
    number (NSInteger, float, double, CGFloat, NSNumber)
    boolean (BOOL, NSNumber)
    array (NSArray) 包含本列表中任意类型
    object (NSDictionary) 包含string类型的键和本列表中任意类型的值
    function (RCTResponseSenderBlock)

 */


// 导出 view 的原有属性
RCT_EXPORT_VIEW_PROPERTY(property_string, NSString) // 导出的属性可以不在.h中，RN赋值属性时是在 -view方法会之后 （RN传值给原生）
RCT_EXPORT_VIEW_PROPERTY(property_bool, BOOL) // React Native 用RCTConvert来在 JavaScript 和原生代码之间完成类型转换。（RN传值给原生）
RCT_EXPORT_VIEW_PROPERTY(property_array, NSArray)
/*
  此处对 RCTBubblingEventBlock 的用法是，将js中的方法映射到原生的属性中，当原生触发事件后可以在原生生调起js的方法
 */
RCT_EXPORT_VIEW_PROPERTY(onBubblingEventBlock, RCTBubblingEventBlock) // （原生传值给RN） RCTBubblingEventBlock 这些块类型可用于将输入事件处理程序从JS映射到视图属性。与JS方法回调不同，这些回调可以多次调用。


// 导出 NativeBtnManager 的自定义属性
/*
 RCT_CUSTOM_VIEW_PROPERTY，当需要自己处理属性逻辑时，可以使用此宏。宏后紧跟一个方法体，它可以引用“json”、“view”和“defaultview”来实现所需的逻辑。
 h该宏定义如下，
 #define RCT_CUSTOM_VIEW_PROPERTY(name, type, viewClass) \
 RCT_REMAP_VIEW_PROPERTY(name, __custom__, type)         \
 - (void)set_##name:(id)json forView:(viewClass *)view withDefaultView:(viewClass *)defaultView RCT_DYNAMIC
 
 我们传入的是 （属性名称，属性类型，NativeBtnManager返回的 view 的类型）
 
 name：属性名称，对应生成方法的参数名称是：json，即JS中传递的尚未解析的原始值。
 type：属性类型，就是属性对应的类型
 viewClass：就是-（UIView *）view 中所返回的这个 view 的类型，用于在生成方法的方法体中调用 view 的方法提示
 生成方法中的 defaultView 参数：当 JS 传入的是 null 时，即 json 值为空时，defaultView 才不为空，
              当 defaultView 一次不为空后，后续在传入的数据不管是否有值，都不会为 nil，defaultView 上面的视图层次以及视图的属性值，都是最初的默认值。
 */
RCT_CUSTOM_VIEW_PROPERTY(normalTitle, NSString, NativeBtn){
    [view setTitle:json forState: UIControlStateNormal];
//    [view setBackgroundColor:[UIColor grayColor]]; // 由于 backgroundColor 在 js 组件中有一样的属性，所以这里变更无效
    [view setBackgroundImage:[UIImage imageNamed:@"orange"] forState:UIControlStateNormal]; // 设置图片可以
}
RCT_CUSTOM_VIEW_PROPERTY(selectedTitle, NSString, NativeBtn){
    [view setTitle:json forState: UIControlStateSelected];
//    [view setBackgroundColor:[UIColor redColor]]; // 由于 backgroundColor 在 js 组件中有一样的属性，所以这里变更无效
    [view setBackgroundImage:[UIImage imageNamed:@"green"] forState:UIControlStateSelected];
}
// 手动转换复杂自定义属性
RCT_CUSTOM_VIEW_PROPERTY(complexProperty, PropertyModel, NativeBtn){
  //1、将 rn 返回的json 数据转成 PropertyModel 类型的模型
  PropertyModel *propertyM = [PropertyModel yy_modelWithJSON:json]; // 无论json 是直接从 js 中传过来的字典(js对象)，还是 json 字符串(通过 JSON.stringify处理)，yymodel 都可以转为对象
  
  //2、再将模型赋值给 NativeBtn 的 complexProperty 属性
  view.complexProperty = propertyM;
}




- (UIView *)view {
    /*
     注意：
     请不要在-view中给UIView实例设置frame或是backgroundColor属性。
     为了和 JavaScript 端的布局属性一致，React Native 会覆盖你所设置的值。
     如果您需要这种粒度的操作的话，比较好的方法是用另一个UIView来封装你想操作的UIView实例，并返回外层的UIView。
     */
  
    NativeBtn *nativeBtn = [NativeBtn buttonWithType:UIButtonTypeCustom];
    [nativeBtn setTitle:@"这是初始化的按钮" forState:UIControlStateNormal];
    [nativeBtn addTarget:self action:@selector(btnSelected:) forControlEvents:UIControlEventTouchUpInside];
  
    return nativeBtn;
}


- (void)btnSelected:(NativeBtn *)sender{
  sender.selected = !sender.selected;
  if (!sender.onBubblingEventBlock){
    return;
  }
  // 这里实际上就是调用 rn 中的代码，类似于 block 属性，但是呢赋值给原生 block 属性的代码是在 rn 中完成的
  sender.onBubblingEventBlock(@{@"msg": @"我是测试信息", @"isSelected": @(sender.isSelected)});
  
}

@end

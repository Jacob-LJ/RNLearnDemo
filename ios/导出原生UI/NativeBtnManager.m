//
//  NativeBtnManager.m
//  RN_Test
//
//  Created by PSBC on 2019/2/22.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "NativeBtnManager.h"

@implementation NativeBtnManager

RCT_EXPORT_MODULE();

// 导出普通属性
RCT_EXPORT_VIEW_PROPERTY(property_string, NSString) // 导出的属性可以不在.h中，RN赋值属性时是在 -view方法会之后 （RN传值给原生）
RCT_EXPORT_VIEW_PROPERTY(property_bool, BOOL) // React Native 用RCTConvert来在 JavaScript 和原生代码之间完成类型转换。（RN传值给原生）
RCT_EXPORT_VIEW_PROPERTY(property_array, NSArray)
/*
  此处对 RCTBubblingEventBlock 的用法是，将js中的方法映射到原生的属性中，当原生触发事件后可以在原生生调起js的方法
 */
RCT_EXPORT_VIEW_PROPERTY(onBubblingEventBlock, RCTBubblingEventBlock) // （原生传值给RN） RCTBubblingEventBlock 这些块类型可用于将输入事件处理程序从JS映射到视图属性。与JS方法回调不同，这些回调可以多次调用。


// 导出自定义属性
/*
 RCT_CUSTOM_VIEW_PROPERTY，当需要自己处理属性逻辑时，可以使用此宏。宏后紧跟一个方法体，它可以引用“json”、“view”和“defaultview”来实现所需的逻辑。
 h该宏定义如下，
 #define RCT_CUSTOM_VIEW_PROPERTY(name, type, viewClass) \
 RCT_REMAP_VIEW_PROPERTY(name, __custom__, type)         \
 - (void)set_##name:(id)json forView:(viewClass *)view withDefaultView:(viewClass *)defaultView RCT_DYNAMIC
 
 我们传入的是 （数据，数据类型，viewClass）
 但是调用的时候，数据对应的参数名称是：json。view 就是-（UIView *）view 中所返回的这个view。defaultView 用于当JS给我们发送 null 的时候，可以把视图的这个属性重置回默认值。理解为defaultView中存有上一次状态的属性值
 */
RCT_CUSTOM_VIEW_PROPERTY(normalTitle, NSString, UIButton){
    [view setTitle:json forState: UIControlStateNormal];
//    [view setBackgroundColor:[UIColor grayColor]]; // 由于 backgroundColor 在 js 组件中有一样的属性，所以这里变更无效
    [view setBackgroundImage:[UIImage imageNamed:@"orange"] forState:UIControlStateNormal]; // 设置图片可以
}
RCT_CUSTOM_VIEW_PROPERTY(selectedTitle, NSString, UIButton){
    [view setTitle:json forState: UIControlStateSelected];
//    [view setBackgroundColor:[UIColor redColor]]; // 由于 backgroundColor 在 js 组件中有一样的属性，所以这里变更无效
    [view setBackgroundImage:[UIImage imageNamed:@"green"] forState:UIControlStateSelected];
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
  sender.onBubblingEventBlock(@{@"msg": @"我是测试信息", @"isSelected": @(sender.isSelected)});
  
}

@end

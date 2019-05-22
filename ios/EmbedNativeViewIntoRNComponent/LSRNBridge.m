//
//  LSRNBridge.m
//  _
//
//  Created by _ on 2019/5/20.
//  Copyright © 2019 _. All rights reserved.
//

#import "LSRNBridge.h"
#import <UIKit/UIKit.h>
#import <React/RCTUIManager.h>
#import <React/RCTScrollView.h>
#import "MJRefresh.h"
#import "LSRNEventEmitterBridge.h"

@interface LSRNBridge ()
@property (nonatomic, weak) UIScrollView *scrollV;
@property (nonatomic, weak) LSRNEventEmitterBridge *EventEmitterBridge;
@end

@implementation LSRNBridge
@synthesize bridge = _bridge; // 必须合成一个这个属性，否则会报错

RCT_EXPORT_MODULE()

// 方法methodQueue的说明参考 https://reactnative.cn/docs/native-modules-ios/#%E5%9B%9E%E8%B0%83%E5%87%BD%E6%95%B0中多线程一节
- (dispatch_queue_t)methodQueue {
    return self.bridge.uiManager.methodQueue;
}

// 这里不用 RCTResponseSenderBlock的回调函数原因是，这个回调函数只能回调一次，包括Promise。查阅网络资料，均只能通过发送事件通知方式实现
RCT_EXPORT_METHOD(addFooterWithRefreshing:(nonnull NSNumber *)reactTag) {
    MJWeakSelf;
    // 这个 addUIBlock 必须要在 self.bridge.uiManager.methodQueue中执行，上面这个方法methodQueue是共享方法，也就是当前这个RCT_EXPORT_MODULE 中 所有 RCT_EXPORT_METHOD方法都会在该qqueue中执行
    [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *,UIView *> *viewRegistry) {
      // 通过reactTag标识，获取RN中的Component组件
        RCTScrollView *rctScrollV = (RCTScrollView *)viewRegistry[reactTag];
        UIScrollView *scrollV = rctScrollV.scrollView;
        weakSelf.scrollV = scrollV;
        // 获取已注册的module
        weakSelf.EventEmitterBridge = [weakSelf.bridge moduleForClass:[LSRNEventEmitterBridge class]];
        scrollV.mj_footer = [MJRefreshBackNormalFooter footerWithRefreshingTarget:weakSelf.EventEmitterBridge
                                                                 refreshingAction:@selector(fireFooterRefreshBlock)];
    }];
}
    

RCT_EXPORT_METHOD(endRefreshing) {
    dispatch_async(dispatch_get_main_queue(), ^{
        [self.scrollV.mj_footer endRefreshing];
    });
}

RCT_EXPORT_METHOD(endRefreshingWithNoMoreData) {
    dispatch_async(dispatch_get_main_queue(), ^{
        [self.scrollV.mj_footer endRefreshingWithNoMoreData];
    });
}

RCT_EXPORT_METHOD(resetNoMoreData) {
    dispatch_async(dispatch_get_main_queue(), ^{
        [self.scrollV.mj_footer resetNoMoreData];
    });
}

@end

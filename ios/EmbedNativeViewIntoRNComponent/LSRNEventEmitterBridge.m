//
//  LSRNEventEmitterBridge.m
//  _
//
//  Created by _ on 2019/5/21.
//  Copyright © 2019 _. All rights reserved.
//

#import "LSRNEventEmitterBridge.h"



/**
 没有把这个一并何如到LSRNBridge这个类中，原因是
 1、共享queue问题，不一致，报错
 2、事件分发EventEmittermodule需要继承至 RCTEventEmitter 对象（可能有冲突暂未找到确切证明）
 */
@implementation LSRNEventEmitterBridge

RCT_EXPORT_MODULE()

- (NSArray<NSString *> *)supportedEvents {
    return @[@"FooterWithRefreshingCallBack"];
}

- (void)fireFooterRefreshBlock {
    dispatch_async(dispatch_get_main_queue(), ^{
        [self sendEventWithName:@"FooterWithRefreshingCallBack" body:nil];
    });
}

@end

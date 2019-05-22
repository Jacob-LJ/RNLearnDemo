//
//  LSRNEventEmitterBridge.h
//  _
//
//  Created by _ on 2019/5/21.
//  Copyright © 2019 _. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridge.h>
#import <React/RCTEventEmitter.h>

NS_ASSUME_NONNULL_BEGIN

@interface LSRNEventEmitterBridge : RCTEventEmitter<RCTBridgeModule>

- (void)fireFooterRefreshBlock;

@end

NS_ASSUME_NONNULL_END

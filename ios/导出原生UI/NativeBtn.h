//
//  NativeBtn.h
//  RN_Test
//
//  Created by _ on 2019/2/22.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <React/RCTViewManager.h>
#import "PropertyModel.h"

NS_ASSUME_NONNULL_BEGIN

@protocol NativeBtnDelegate <NSObject>

- (void)clickAction;

@end

@interface NativeBtn : UIButton

@property (nonatomic, weak) id<NativeBtnDelegate> delegate;

@property (nonatomic, strong) PropertyModel *complexProperty;
@property (nonatomic, copy) RCTBubblingEventBlock onBubblingEventBlock;

@end

NS_ASSUME_NONNULL_END

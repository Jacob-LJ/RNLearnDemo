//
//  PropertyModel.h
//  RN_Test
//
//  Created by Jacob_Liang on 2019/2/23.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface PropertyModel : NSObject

@property (nonatomic, assign) NSInteger age;
@property (nonatomic, copy) NSString *name;
@property (nonatomic, strong) NSDictionary *infoDict;

@end

NS_ASSUME_NONNULL_END

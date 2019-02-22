//
//  NativeBtn.m
//  RN_Test
//
//  Created by PSBC on 2019/2/22.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "NativeBtn.h"

@interface NativeBtn ()

@property (nonatomic, copy) NSString *property_string;
@property (nonatomic, assign) BOOL property_bool;
@property (nonatomic, assign) NSInteger property_number;
@property (nonatomic, strong) NSArray *property_array;

@end

@implementation NativeBtn


#pragma mark - getter & setter
// 用于拦截RN传值时 断点查看执行顺序
- (void)setProperty_string:(NSString *)property_string {
  _property_string = property_string;
}

- (void)setProperty_bool:(BOOL)property_bool {
  _property_bool = property_bool;
}

- (void)setProperty_array:(NSArray *)property_array {
  _property_array = property_array;
}

@end

//
//  SwizzleRefreshControl.m
//  RN_Test
//
//  Created by PSBC on 2019/5/22.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "SwizzleRefreshControl.h"
#import <UIKit/UIKit.h>
#import "MJRefresh.h"

#import <objc/runtime.h>
#import <React/RCTScrollView.h>
#import <React/RCTRefreshControlManager.h>
#import <React/RCTRefreshControl.h>
#import <React/RCTUIManager.h>


@interface OverrideRCTRefreshControl : UIView
{
  MJRefreshNormalHeader *_header;
}
@property (nonatomic, copy) RCTDirectEventBlock onRefresh;
@property (nonatomic, readonly, getter=isRefreshing) BOOL refreshing;
@property (nonatomic, copy) UIColor *tintColor;
@property (nonatomic, copy) NSString *title;
@property (nonatomic, copy) UIColor *titleColor;

@end

@implementation OverrideRCTRefreshControl

- (void)didMoveToSuperview {
  UIScrollView *scrollView = (UIScrollView *)self.superview;
  if (scrollView) {
    SEL selector = @selector(startRefresh);
    _header = [MJRefreshNormalHeader headerWithRefreshingTarget:self refreshingAction:selector];
    scrollView.mj_header = _header;
    if (self.isRefreshing) {
      scrollView.mj_header.refreshingAction = selector;
      [scrollView.mj_header beginRefreshing];
    }
  } else {
    [_header removeFromSuperview];
    _header = nil;
  }
}

- (void)startRefresh {
  _refreshing = YES;
  [self beginToRefresh];
}

- (void)beginToRefresh {
  if (_onRefresh) {
    _onRefresh(nil);
  }
}

- (void)setRefreshing:(BOOL)refreshing {
  if (_refreshing != refreshing) {
    _refreshing = refreshing;
    if (_header.superview) {
      if (_refreshing ==  NO) {
        [_header endRefreshing];
      } else {
        [_header beginRefreshing];
      }
    }
  }
}

- (void)beginRefreshing {
  if (!self.isRefreshing) {
    self.refreshing = YES;
  }
}

- (void)endRefreshing {
  if (self.isRefreshing) {
    self.refreshing = NO;
  }
}

@end



#pragma mark - RCTScrollView(swizzle)
@implementation RCTScrollView(swizzle)

static void swizzleClassMethod(Class c, SEL orig, SEL new) {
  
  Method origMethod = class_getInstanceMethod(c, orig);
  Method newMethod = class_getInstanceMethod(c, new);
  
  if (class_addMethod(c, orig, method_getImplementation(newMethod), method_getTypeEncoding(newMethod))) {
    class_replaceMethod(c, new, method_getImplementation(origMethod), method_getTypeEncoding(origMethod));
  } else {
    method_exchangeImplementations(origMethod, newMethod);
  }
}

+ (void)load {
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    Class class = [self class];
    swizzleClassMethod(class, @selector(insertReactSubview:atIndex:), @selector(siwizzleInsertReactSubview:atIndex:));
  });
}

- (void)siwizzleInsertReactSubview:(UIView *)view atIndex:(NSInteger)atIndex{
#if !TARGET_OS_TV
  if ([view isKindOfClass:OverrideRCTRefreshControl.class]) {
    [super insertReactSubview:view atIndex:atIndex];
    
    for (UIScrollView *subView in self.subviews) {
      if ([subView isKindOfClass:[UIScrollView class]]) {
        [subView addSubview:view];
        break;
      }
    }
  } else {
    [self siwizzleInsertReactSubview:view atIndex:atIndex];
  }
#endif
}

@end



#pragma mark - RCTRefreshControlManager(swizzle)
@implementation RCTRefreshControlManager(swizzle)
- (UIView *)view {
  return [OverrideRCTRefreshControl new];
}
@end

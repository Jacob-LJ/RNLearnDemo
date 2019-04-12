/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <React/RCTLinkingManager.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  
  
  /*
   项目启动端口8081占用问题修改参考 https://stackoverflow.com/a/41280629，
   将 xxx/node_modules/react-native/local-cli/util/Config.js 中的
   
   ...
   server: {
   port: process.env.RCT_METRO_PORT || 8081,
   },
   ...
   
   改为
   ...
   server: {
   port: 8089,
   },
   ...
   
   由于 node_modules 没有上传至git，所以拉取后需要手动修改 Config.js
   网上很多通过修改 server.js 的文章已经过时了。
   */
  
  
  NSURL *jsCodeLocation;

  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
  // 全局只有一个 RCTRootView 时，使用下面的方式进行创建，否则使用方法
  //  - (instancetype)initWithBridge:(RCTBridge *)bridge moduleName:(NSString *)moduleName initialProperties:(NSDictionary *)initialProperties 创建
  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"RN_Test"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  
  
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  return YES;
}


// 用于做RN的Deeplink，可以在Safari中填入 RNApp://details
- (BOOL)application:(UIApplication *)app openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey, id> *)options {
  return [RCTLinkingManager application:app openURL:url options:options];
}

@end

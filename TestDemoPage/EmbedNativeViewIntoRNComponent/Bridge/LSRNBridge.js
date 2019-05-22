/**
 * LSRNBridge.js
 *
 *
 * Created by _ on 2019/5/5.
 * Copyright © 2019年 _. All rights reserved.
 *
 * @format
 * @flow
 */

import React from 'react'
import {NativeModules} from 'react-native'


export default class LSRNBridge extends Object {

    static addFooterWithRefreshing = (reactTag) => {
        NativeModules.LSRNBridge.addFooterWithRefreshing(reactTag);
    }

    /**
     * refreshFooterState
     * */

    static endRefreshing = () => {
        NativeModules.LSRNBridge.endRefreshing();
    }

    static endRefreshingWithNoMoreData = () => {
        NativeModules.LSRNBridge.endRefreshingWithNoMoreData();
    }

    static resetNoMoreData = () => {
        NativeModules.LSRNBridge.resetNoMoreData();
    }
}
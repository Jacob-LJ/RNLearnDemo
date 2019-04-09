/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

/** 网络请求工具类的拓展类，便于后期网络层修改维护 **/

import FetchUtil from 'FetchUtil';
import { dataCache } from 'Cache';

// const API_URL = "https://api-m.mtime.cn";
// const API_URL = "http://apimanage.58corp.com/";

/**
 * GET
 * 从缓存中读取数据
 * @param isCache: 是否缓存
 * @param url 请求url
 * @param params 请求参数
 * @param isCache 是否缓存
 * @param callback 是否有回调函数
 * @returns {value\promise}
 * 返回的值如果从缓存中取到数据就直接换行数据，或则返回promise对象
 */
const fetchData = (isCache, type) => (url, params, callback) => {
    url = `${url}`;
    // url = `${API_URL}${url}`;

    const fetchFunc = () => {
        let promise =
            type === "get" ? FetchUtil.getRequest(url, params) : FetchUtil.postRequrst(url, params);
        if (callback && typeof callback === "function") {
            promise.then((response) => {
                return callback(response);
            });
        }
        return promise;
    };

    return dataCache(url, fetchFunc, isCache);
};

/**
 * GET 请求
 * @param url
 * @param params
 * @param source
 * @param callback
 * @returns {{promise: Promise}}
 */
const getFetch = fetchData(false, "get");

/**
 * POST 请求
 * @param url
 * @param params
 * @param callback
 * @returns {{promise: Promise}}
 */
const postFetch = fetchData(false, "post");

/**
 * GET 请求，带缓存策略
 * @param url
 * @param params
 * @param callback
 * @returns {{promise: Promise}}
 */
const getFetchFromCache = fetchData(true, "get");

export { getFetch, postFetch, getFetchFromCache };
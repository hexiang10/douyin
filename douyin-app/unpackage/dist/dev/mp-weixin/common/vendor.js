(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.createPlugin = createPlugin;exports.createSubpackageApp = createSubpackageApp;exports.default = void 0;var _uniI18n = __webpack_require__(/*! @dcloudio/uni-i18n */ 3);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 4));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var realAtob;

var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
var b64re = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;

if (typeof atob !== 'function') {
  realAtob = function realAtob(str) {
    str = String(str).replace(/[\t\n\f\r ]+/g, '');
    if (!b64re.test(str)) {throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");}

    // Adding the padding if missing, for semplicity
    str += '=='.slice(2 - (str.length & 3));
    var bitmap;var result = '';var r1;var r2;var i = 0;
    for (; i < str.length;) {
      bitmap = b64.indexOf(str.charAt(i++)) << 18 | b64.indexOf(str.charAt(i++)) << 12 |
      (r1 = b64.indexOf(str.charAt(i++))) << 6 | (r2 = b64.indexOf(str.charAt(i++)));

      result += r1 === 64 ? String.fromCharCode(bitmap >> 16 & 255) :
      r2 === 64 ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255) :
      String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255);
    }
    return result;
  };
} else {
  // 注意atob只能在全局对象上调用，例如：`const Base64 = {atob};Base64.atob('xxxx')`是错误的用法
  realAtob = atob;
}

function b64DecodeUnicode(str) {
  return decodeURIComponent(realAtob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}

function getCurrentUserInfo() {
  var token = wx.getStorageSync('uni_id_token') || '';
  var tokenArr = token.split('.');
  if (!token || tokenArr.length !== 3) {
    return {
      uid: null,
      role: [],
      permission: [],
      tokenExpired: 0 };

  }
  var userInfo;
  try {
    userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
  } catch (error) {
    throw new Error('获取当前用户信息出错，详细错误信息为：' + error.message);
  }
  userInfo.tokenExpired = userInfo.exp * 1000;
  delete userInfo.exp;
  delete userInfo.iat;
  return userInfo;
}

function uniIdMixin(Vue) {
  Vue.prototype.uniIDHasRole = function (roleId) {var _getCurrentUserInfo =


    getCurrentUserInfo(),role = _getCurrentUserInfo.role;
    return role.indexOf(roleId) > -1;
  };
  Vue.prototype.uniIDHasPermission = function (permissionId) {var _getCurrentUserInfo2 =


    getCurrentUserInfo(),permission = _getCurrentUserInfo2.permission;
    return this.uniIDHasRole('admin') || permission.indexOf(permissionId) > -1;
  };
  Vue.prototype.uniIDTokenValid = function () {var _getCurrentUserInfo3 =


    getCurrentUserInfo(),tokenExpired = _getCurrentUserInfo3.tokenExpired;
    return tokenExpired > Date.now();
  };
}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

function sortObject(obj) {
  var sortObj = {};
  if (isPlainObject(obj)) {
    Object.keys(obj).sort().forEach(function (key) {
      sortObj[key] = obj[key];
    });
  }
  return !Object.keys(sortObj) ? obj : sortObj;
}

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return new Promise(function (resolve, reject) {
      res.then(function (res) {
        if (res[0]) {
          reject(res[0]);
        } else {
          resolve(res[1]);
        }
      });
    });
  } };


var SYNC_API_RE =
/^\$|Window$|WindowStyle$|sendHostEvent|sendNativeEvent|restoreGlobal|requireGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64|getLocale|setLocale|invokePushCallback|getWindowInfo|getDeviceInfo|getAppBaseInfo|getSystemSetting|getAppAuthorizeSetting/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection', 'createPushMessage'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var LOCALE_ZH_HANS = 'zh-Hans';
var LOCALE_ZH_HANT = 'zh-Hant';
var LOCALE_EN = 'en';
var LOCALE_FR = 'fr';
var LOCALE_ES = 'es';

var messages = {};

var locale;

{
  locale = normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN;
}

function initI18nMessages() {
  if (!isEnableLocale()) {
    return;
  }
  var localeKeys = Object.keys(__uniConfig.locales);
  if (localeKeys.length) {
    localeKeys.forEach(function (locale) {
      var curMessages = messages[locale];
      var userMessages = __uniConfig.locales[locale];
      if (curMessages) {
        Object.assign(curMessages, userMessages);
      } else {
        messages[locale] = userMessages;
      }
    });
  }
}

initI18nMessages();

var i18n = (0, _uniI18n.initVueI18n)(
locale,
{});

var t = i18n.t;
var i18nMixin = i18n.mixin = {
  beforeCreate: function beforeCreate() {var _this = this;
    var unwatch = i18n.i18n.watchLocale(function () {
      _this.$forceUpdate();
    });
    this.$once('hook:beforeDestroy', function () {
      unwatch();
    });
  },
  methods: {
    $$t: function $$t(key, values) {
      return t(key, values);
    } } };


var setLocale = i18n.setLocale;
var getLocale = i18n.getLocale;

function initAppLocale(Vue, appVm, locale) {
  var state = Vue.observable({
    locale: locale || i18n.getLocale() });

  var localeWatchers = [];
  appVm.$watchLocale = function (fn) {
    localeWatchers.push(fn);
  };
  Object.defineProperty(appVm, '$locale', {
    get: function get() {
      return state.locale;
    },
    set: function set(v) {
      state.locale = v;
      localeWatchers.forEach(function (watch) {return watch(v);});
    } });

}

function isEnableLocale() {
  return typeof __uniConfig !== 'undefined' && __uniConfig.locales && !!Object.keys(__uniConfig.locales).length;
}

function include(str, parts) {
  return !!parts.find(function (part) {return str.indexOf(part) !== -1;});
}

function startsWith(str, parts) {
  return parts.find(function (part) {return str.indexOf(part) === 0;});
}

function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, '-');
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale === 'chinese') {
    // 支付宝
    return LOCALE_ZH_HANS;
  }
  if (locale.indexOf('zh') === 0) {
    if (locale.indexOf('-hans') > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf('-hant') > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  var lang = startsWith(locale, [LOCALE_EN, LOCALE_FR, LOCALE_ES]);
  if (lang) {
    return lang;
  }
}
// export function initI18n() {
//   const localeKeys = Object.keys(__uniConfig.locales || {})
//   if (localeKeys.length) {
//     localeKeys.forEach((locale) =>
//       i18n.add(locale, __uniConfig.locales[locale])
//     )
//   }
// }

function getLocale$1() {
  // 优先使用 $locale
  var app = getApp({
    allowDefault: true });

  if (app && app.$vm) {
    return app.$vm.$locale;
  }
  return normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN;
}

function setLocale$1(locale) {
  var app = getApp();
  if (!app) {
    return false;
  }
  var oldLocale = app.$vm.$locale;
  if (oldLocale !== locale) {
    app.$vm.$locale = locale;
    onLocaleChangeCallbacks.forEach(function (fn) {return fn({
        locale: locale });});

    return true;
  }
  return false;
}

var onLocaleChangeCallbacks = [];
function onLocaleChange(fn) {
  if (onLocaleChangeCallbacks.indexOf(fn) === -1) {
    onLocaleChangeCallbacks.push(fn);
  }
}

if (typeof global !== 'undefined') {
  global.getLocale = getLocale$1;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  getLocale: getLocale$1,
  setLocale: setLocale$1,
  onLocaleChange: onLocaleChange,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  } };


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


var UUID_KEY = '__DC_STAT_UUID';
var deviceId;
function useDeviceId(result) {
  deviceId = deviceId || wx.getStorageSync(UUID_KEY);
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
    wx.setStorage({
      key: UUID_KEY,
      data: deviceId });

  }
  result.deviceId = deviceId;
}

function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.screenHeight - safeArea.bottom };

  }
}

function populateParameters(result) {var _result$brand =





  result.brand,brand = _result$brand === void 0 ? '' : _result$brand,_result$model = result.model,model = _result$model === void 0 ? '' : _result$model,_result$system = result.system,system = _result$system === void 0 ? '' : _result$system,_result$language = result.language,language = _result$language === void 0 ? '' : _result$language,theme = result.theme,version = result.version,platform = result.platform,fontSizeSetting = result.fontSizeSetting,SDKVersion = result.SDKVersion,pixelRatio = result.pixelRatio,deviceOrientation = result.deviceOrientation;
  // const isQuickApp = "mp-weixin".indexOf('quickapp-webview') !== -1

  // osName osVersion
  var osName = '';
  var osVersion = '';
  {
    osName = system.split(' ')[0] || '';
    osVersion = system.split(' ')[1] || '';
  }
  var hostVersion = version;

  // deviceType
  var deviceType = getGetDeviceType(result, model);

  // deviceModel
  var deviceBrand = getDeviceBrand(brand);

  // hostName
  var _hostName = getHostName(result);

  // deviceOrientation
  var _deviceOrientation = deviceOrientation; // 仅 微信 百度 支持

  // devicePixelRatio
  var _devicePixelRatio = pixelRatio;

  // SDKVersion
  var _SDKVersion = SDKVersion;

  // hostLanguage
  var hostLanguage = language.replace(/_/g, '-');

  // wx.getAccountInfoSync

  var parameters = {
    appId: "__UNI__800FF13",
    appName: "Tiktok-app",
    appVersion: "1.0.0",
    appVersionCode: "100",
    appLanguage: getAppLanguage(hostLanguage),
    uniCompileVersion: "3.6.4",
    uniRuntimeVersion: "3.6.4",
    uniPlatform: undefined || "mp-weixin",
    deviceBrand: deviceBrand,
    deviceModel: model,
    deviceType: deviceType,
    devicePixelRatio: _devicePixelRatio,
    deviceOrientation: _deviceOrientation,
    osName: osName.toLocaleLowerCase(),
    osVersion: osVersion,
    hostTheme: theme,
    hostVersion: hostVersion,
    hostLanguage: hostLanguage,
    hostName: _hostName,
    hostSDKVersion: _SDKVersion,
    hostFontSizeSetting: fontSizeSetting,
    windowTop: 0,
    windowBottom: 0,
    // TODO
    osLanguage: undefined,
    osTheme: undefined,
    ua: undefined,
    hostPackageName: undefined,
    browserName: undefined,
    browserVersion: undefined };


  Object.assign(result, parameters);
}

function getGetDeviceType(result, model) {
  var deviceType = result.deviceType || 'phone';
  {
    var deviceTypeMaps = {
      ipad: 'pad',
      windows: 'pc',
      mac: 'pc' };

    var deviceTypeMapsKeys = Object.keys(deviceTypeMaps);
    var _model = model.toLocaleLowerCase();
    for (var index = 0; index < deviceTypeMapsKeys.length; index++) {
      var _m = deviceTypeMapsKeys[index];
      if (_model.indexOf(_m) !== -1) {
        deviceType = deviceTypeMaps[_m];
        break;
      }
    }
  }
  return deviceType;
}

function getDeviceBrand(brand) {
  var deviceBrand = brand;
  if (deviceBrand) {
    deviceBrand = brand.toLocaleLowerCase();
  }
  return deviceBrand;
}

function getAppLanguage(defaultLanguage) {
  return getLocale$1 ?
  getLocale$1() :
  defaultLanguage;
}

function getHostName(result) {
  var _platform = 'WeChat';
  var _hostName = result.hostName || _platform; // mp-jd
  {
    if (result.environment) {
      _hostName = result.environment;
    } else if (result.host && result.host.env) {
      _hostName = result.host.env;
    }
  }

  return _hostName;
}

var getSystemInfo = {
  returnValue: function returnValue(result) {
    useDeviceId(result);
    addSafeAreaInsets(result);
    populateParameters(result);
  } };


var showActionSheet = {
  args: function args(fromArgs) {
    if (typeof fromArgs === 'object') {
      fromArgs.alertText = fromArgs.title;
    }
  } };


var getAppBaseInfo = {
  returnValue: function returnValue(result) {var _result =
    result,version = _result.version,language = _result.language,SDKVersion = _result.SDKVersion,theme = _result.theme;

    var _hostName = getHostName(result);

    var hostLanguage = language.replace('_', '-');

    result = sortObject(Object.assign(result, {
      appId: "__UNI__800FF13",
      appName: "Tiktok-app",
      appVersion: "1.0.0",
      appVersionCode: "100",
      appLanguage: getAppLanguage(hostLanguage),
      hostVersion: version,
      hostLanguage: hostLanguage,
      hostName: _hostName,
      hostSDKVersion: SDKVersion,
      hostTheme: theme }));

  } };


var getDeviceInfo = {
  returnValue: function returnValue(result) {var _result2 =
    result,brand = _result2.brand,model = _result2.model;
    var deviceType = getGetDeviceType(result, model);
    var deviceBrand = getDeviceBrand(brand);
    useDeviceId(result);

    result = sortObject(Object.assign(result, {
      deviceType: deviceType,
      deviceBrand: deviceBrand,
      deviceModel: model }));

  } };


var getWindowInfo = {
  returnValue: function returnValue(result) {
    addSafeAreaInsets(result);

    result = sortObject(Object.assign(result, {
      windowTop: 0,
      windowBottom: 0 }));

  } };


var getAppAuthorizeSetting = {
  returnValue: function returnValue(result) {var
    locationReducedAccuracy = result.locationReducedAccuracy;

    result.locationAccuracy = 'unsupported';
    if (locationReducedAccuracy === true) {
      result.locationAccuracy = 'reduced';
    } else if (locationReducedAccuracy === false) {
      result.locationAccuracy = 'full';
    }
  } };


// import navigateTo from 'uni-helpers/navigate-to'

var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage: previewImage,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo,
  showActionSheet: showActionSheet,
  getAppBaseInfo: getAppBaseInfo,
  getDeviceInfo: getDeviceInfo,
  getWindowInfo: getWindowInfo,
  getAppAuthorizeSetting: getAppAuthorizeSetting };

var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("The '".concat(methodName, "' method of platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support option '").concat(key, "'"));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("Platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support '".concat(methodName, "'."));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail method '").concat(name, "' not supported") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail service not found' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


/**
                    * 框架内 try-catch
                    */
/**
                        * 开发者 try-catch
                        */
function tryCatch(fn) {
  return function () {
    try {
      return fn.apply(fn, arguments);
    } catch (e) {
      // TODO
      console.error(e);
    }
  };
}

function getApiCallbacks(params) {
  var apiCallbacks = {};
  for (var name in params) {
    var param = params[name];
    if (isFn(param)) {
      apiCallbacks[name] = tryCatch(param);
      delete params[name];
    }
  }
  return apiCallbacks;
}

var cid;
var cidErrMsg;
var enabled;

function normalizePushMessage(message) {
  try {
    return JSON.parse(message);
  } catch (e) {}
  return message;
}

function invokePushCallback(
args)
{
  if (args.type === 'enabled') {
    enabled = true;
  } else if (args.type === 'clientId') {
    cid = args.cid;
    cidErrMsg = args.errMsg;
    invokeGetPushCidCallbacks(cid, args.errMsg);
  } else if (args.type === 'pushMsg') {
    var message = {
      type: 'receive',
      data: normalizePushMessage(args.message) };

    for (var i = 0; i < onPushMessageCallbacks.length; i++) {
      var callback = onPushMessageCallbacks[i];
      callback(message);
      // 该消息已被阻止
      if (message.stopped) {
        break;
      }
    }
  } else if (args.type === 'click') {
    onPushMessageCallbacks.forEach(function (callback) {
      callback({
        type: 'click',
        data: normalizePushMessage(args.message) });

    });
  }
}

var getPushCidCallbacks = [];

function invokeGetPushCidCallbacks(cid, errMsg) {
  getPushCidCallbacks.forEach(function (callback) {
    callback(cid, errMsg);
  });
  getPushCidCallbacks.length = 0;
}

function getPushClientId(args) {
  if (!isPlainObject(args)) {
    args = {};
  }var _getApiCallbacks =




  getApiCallbacks(args),success = _getApiCallbacks.success,fail = _getApiCallbacks.fail,complete = _getApiCallbacks.complete;
  var hasSuccess = isFn(success);
  var hasFail = isFn(fail);
  var hasComplete = isFn(complete);

  Promise.resolve().then(function () {
    if (typeof enabled === 'undefined') {
      enabled = false;
      cid = '';
      cidErrMsg = 'uniPush is not enabled';
    }
    getPushCidCallbacks.push(function (cid, errMsg) {
      var res;
      if (cid) {
        res = {
          errMsg: 'getPushClientId:ok',
          cid: cid };

        hasSuccess && success(res);
      } else {
        res = {
          errMsg: 'getPushClientId:fail' + (errMsg ? ' ' + errMsg : '') };

        hasFail && fail(res);
      }
      hasComplete && complete(res);
    });
    if (typeof cid !== 'undefined') {
      invokeGetPushCidCallbacks(cid, cidErrMsg);
    }
  });
}

var onPushMessageCallbacks = [];
// 不使用 defineOnApi 实现，是因为 defineOnApi 依赖 UniServiceJSBridge ，该对象目前在小程序上未提供，故简单实现
var onPushMessage = function onPushMessage(fn) {
  if (onPushMessageCallbacks.indexOf(fn) === -1) {
    onPushMessageCallbacks.push(fn);
  }
};

var offPushMessage = function offPushMessage(fn) {
  if (!fn) {
    onPushMessageCallbacks.length = 0;
  } else {
    var index = onPushMessageCallbacks.indexOf(fn);
    if (index > -1) {
      onPushMessageCallbacks.splice(index, 1);
    }
  }
};

var api = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getPushClientId: getPushClientId,
  onPushMessage: onPushMessage,
  offPushMessage: offPushMessage,
  invokePushCallback: invokePushCallback });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  var oldTriggerEvent = mpInstance.triggerEvent;
  var newTriggerEvent = function newTriggerEvent(event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    // 事件名统一转驼峰格式，仅处理：当前组件为 vue 组件、当前组件为 vue 组件子组件
    if (this.$vm || this.dataset && this.dataset.comType) {
      event = customize(event);
    } else {
      // 针对微信/QQ小程序单独补充驼峰格式事件，以兼容历史项目
      var newEvent = customize(event);
      if (newEvent !== event) {
        oldTriggerEvent.apply(this, [newEvent].concat(args));
      }
    }
    return oldTriggerEvent.apply(this, [event].concat(args));
  };
  try {
    // 京东小程序 triggerEvent 为只读
    mpInstance.triggerEvent = newTriggerEvent;
  } catch (error) {
    mpInstance._triggerEvent = newTriggerEvent;
  }
}

function initHook(name, options, isComponent) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}
if (!MPPage.__$wrappered) {
  MPPage.__$wrappered = true;
  Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('onLoad', options);
    return MPPage(options);
  };
  Page.after = MPPage.after;

  Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('created', options);
    return MPComponent(options);
  };
}

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initUnknownHooks(mpOptions, vueOptions) {var excludes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  findHooks(vueOptions).forEach(function (hook) {return initHook$1(mpOptions, hook, excludes);});
}

function findHooks(vueOptions) {var hooks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  if (vueOptions) {
    Object.keys(vueOptions).forEach(function (name) {
      if (name.indexOf('on') === 0 && isFn(vueOptions[name])) {
        hooks.push(name);
      }
    });
  }
  return hooks;
}

function initHook$1(mpOptions, hook, excludes) {
  if (excludes.indexOf(hook) === -1 && !hasOwn(mpOptions, hook)) {
    mpOptions[hook] = function (args) {
      return this.$vm && this.$vm.__call_hook(hook, args);
    };
  }
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"NODE_ENV":"development","VUE_APP_NAME":"Tiktok-app","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';var options = arguments.length > 3 ? arguments[3] : undefined;
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    {
      if (options.virtualHost) {
        properties.virtualHostStyle = {
          type: null,
          value: '' };

        properties.virtualHostClass = {
          type: null,
          value: '' };

      }
    }
    // scopedSlotsCompiler auto
    properties.scopedSlotsCompiler = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event, __args__) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            extraObj['$' + index] = event.detail ? event.detail.__args__ || __args__ : __args__;
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象

  // fixed 用户直接触发 mpInstance.triggerEvent
  var __args__ = isPlainObject(event.detail) ?
  event.detail.__args__ || [event.detail] :
  [event.detail];

  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return __args__;
    }
  }

  var extraObj = processEventExtra(vm, extra, event, __args__);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this2 = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this2.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this2.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            var _type = _this2.$vm.mpType === 'page' ? 'Page' : 'Component';
            var path = _this2.route || _this2.is;
            throw new Error("".concat(_type, " \"").concat(path, "\" does not have a method \"").concat(methodName, "\""));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this2.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          params = Array.isArray(params) ? params : [];
          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          if (/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(handler.toString())) {
            // eslint-disable-next-line no-sparse-arrays
            params = params.concat([,,,,,,,,,, event]);
          }
          ret.push(handler.apply(handlerCtx, params));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var eventChannels = {};

var eventChannelStack = [];

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function initEventChannel() {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // 微信小程序使用自身getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
}

function initScopedSlotsParams() {
  var center = {};
  var parents = {};

  _vue.default.prototype.$hasScopedSlotsParams = function (vueId) {
    var has = center[vueId];
    if (!has) {
      parents[vueId] = this;
      this.$on('hook:destroyed', function () {
        delete parents[vueId];
      });
    }
    return has;
  };

  _vue.default.prototype.$getScopedSlotsParams = function (vueId, name, key) {
    var data = center[vueId];
    if (data) {
      var object = data[name] || {};
      return key ? object[key] : object;
    } else {
      parents[vueId] = this;
      this.$on('hook:destroyed', function () {
        delete parents[vueId];
      });
    }
  };

  _vue.default.prototype.$setScopedSlotsParams = function (name, value) {
    var vueIds = this.$options.propsData.vueId;
    if (vueIds) {
      var vueId = vueIds.split(',')[0];
      var object = center[vueId] = center[vueId] || {};
      object[name] = value;
      if (parents[vueId]) {
        parents[vueId].$forceUpdate();
      }
    }
  };

  _vue.default.mixin({
    destroyed: function destroyed() {
      var propsData = this.$options.propsData;
      var vueId = propsData && propsData.vueId;
      if (vueId) {
        delete center[vueId];
        delete parents[vueId];
      }
    } });

}

function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  initEventChannel();
  {
    initScopedSlotsParams();
  }
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }
  uniIdMixin(_vue.default);

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;
      if (this.mpType === 'page' && typeof getApp === 'function') {// hack vue-i18n
        var app = getApp();
        if (app.$vm && app.$vm.$i18n) {
          this._i18n = app.$vm.$i18n;
        }
      }
      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (wx.canIUse && !wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initAppLocale(_vue.default, vm, normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN);

  initHooks(appOptions, hooks);
  initUnknownHooks(appOptions, vm.$options);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector);
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || component;
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {return '%' + c.charCodeAt(0).toString(16);};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {return encodeURIComponent(str).
  replace(encodeReserveRE, encodeReserveReplacer).
  replace(commaRE, ',');};

function stringifyQuery(obj) {var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {return x.length > 0;}).join('&') : null;
  return res ? "?".concat(res) : '';
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file, options),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery) };

    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };
  initUnknownHooks(pageOptions.methods, vuePageOptions, ['onReady']);

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

function createSubpackageApp(vm) {
  var appOptions = parseApp(vm);
  var app = getApp({
    allowDefault: true });

  vm.$scope = app;
  var globalData = app.globalData;
  if (globalData) {
    Object.keys(appOptions.globalData).forEach(function (name) {
      if (!hasOwn(globalData, name)) {
        globalData[name] = appOptions.globalData[name];
      }
    });
  }
  Object.keys(appOptions).forEach(function (name) {
    if (!hasOwn(app, name)) {
      app[name] = appOptions[name];
    }
  });
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {args[_key5] = arguments[_key5];}
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {args[_key6] = arguments[_key6];}
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}

function createPlugin(vm) {
  var appOptions = parseApp(vm);
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {args[_key7] = arguments[_key7];}
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {args[_key8] = arguments[_key8];}
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;
wx.createSubpackageApp = createSubpackageApp;
wx.createPlugin = createPlugin;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 2)))

/***/ }),

/***/ 10:
/*!******************************************************!*\
  !*** D:/Project/Tiktok/tiktok-app/json/area_city.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var data = [
{
  "city_id": "1",
  "city_name": "北京市",
  "spell": "BEIJINGSHI",
  "easy_spell": "BJS",
  "zipcode": "100000",
  "province_id": "1" },

{
  "city_id": "2",
  "city_name": "天津市",
  "spell": "TIANJINSHI",
  "easy_spell": "TJS",
  "zipcode": "100000",
  "province_id": "2" },

{
  "city_id": "3",
  "city_name": "石家庄市",
  "spell": "SHIJIAZHUANGSHI",
  "easy_spell": "SJZS",
  "zipcode": "050000",
  "province_id": "3" },

{
  "city_id": "4",
  "city_name": "唐山市",
  "spell": "TANGSHANSHI",
  "easy_spell": "TSS",
  "zipcode": "063000",
  "province_id": "3" },

{
  "city_id": "5",
  "city_name": "秦皇岛市",
  "spell": "QINHUANGDAOSHI",
  "easy_spell": "QHDS",
  "zipcode": "066000",
  "province_id": "3" },

{
  "city_id": "6",
  "city_name": "邯郸市",
  "spell": "HANDANSHI",
  "easy_spell": "HDS",
  "zipcode": "056000",
  "province_id": "3" },

{
  "city_id": "7",
  "city_name": "邢台市",
  "spell": "XINGTAISHI",
  "easy_spell": "XTS",
  "zipcode": "054000",
  "province_id": "3" },

{
  "city_id": "8",
  "city_name": "保定市",
  "spell": "BAODINGSHI",
  "easy_spell": "BDS",
  "zipcode": "071000",
  "province_id": "3" },

{
  "city_id": "9",
  "city_name": "张家口市",
  "spell": "ZHANGJIAKOUSHI",
  "easy_spell": "ZJKS",
  "zipcode": "075000",
  "province_id": "3" },

{
  "city_id": "10",
  "city_name": "承德市",
  "spell": "CHENGDESHI",
  "easy_spell": "CDS",
  "zipcode": "067000",
  "province_id": "3" },

{
  "city_id": "11",
  "city_name": "沧州市",
  "spell": "CANGZHOUSHI",
  "easy_spell": "CZS",
  "zipcode": "061000",
  "province_id": "3" },

{
  "city_id": "12",
  "city_name": "廊坊市",
  "spell": "LANGFANGSHI",
  "easy_spell": "LFS",
  "zipcode": "065000",
  "province_id": "3" },

{
  "city_id": "13",
  "city_name": "衡水市",
  "spell": "HENGSHUISHI",
  "easy_spell": "HSS",
  "zipcode": "053000",
  "province_id": "3" },

{
  "city_id": "14",
  "city_name": "太原市",
  "spell": "TAIYUANSHI",
  "easy_spell": "TYS",
  "zipcode": "030000",
  "province_id": "4" },

{
  "city_id": "15",
  "city_name": "大同市",
  "spell": "DATONGSHI",
  "easy_spell": "DTS",
  "zipcode": "037000",
  "province_id": "4" },

{
  "city_id": "16",
  "city_name": "阳泉市",
  "spell": "YANGQUANSHI",
  "easy_spell": "YQS",
  "zipcode": "045000",
  "province_id": "4" },

{
  "city_id": "17",
  "city_name": "长治市",
  "spell": "CHANGZHISHI",
  "easy_spell": "CZS",
  "zipcode": "046000",
  "province_id": "4" },

{
  "city_id": "18",
  "city_name": "晋城市",
  "spell": "JINCHENGSHI",
  "easy_spell": "JCS",
  "zipcode": "048000",
  "province_id": "4" },

{
  "city_id": "19",
  "city_name": "朔州市",
  "spell": "SHUOZHOUSHI",
  "easy_spell": "SZS",
  "zipcode": "036000",
  "province_id": "4" },

{
  "city_id": "20",
  "city_name": "晋中市",
  "spell": "JINZHONGSHI",
  "easy_spell": "JZS",
  "zipcode": "030600",
  "province_id": "4" },

{
  "city_id": "21",
  "city_name": "运城市",
  "spell": "YUNCHENGSHI",
  "easy_spell": "YCS",
  "zipcode": "044000",
  "province_id": "4" },

{
  "city_id": "22",
  "city_name": "忻州市",
  "spell": "XINZHOUSHI",
  "easy_spell": "XZS",
  "zipcode": "034000",
  "province_id": "4" },

{
  "city_id": "23",
  "city_name": "临汾市",
  "spell": "LINFENSHI",
  "easy_spell": "LFS",
  "zipcode": "041000",
  "province_id": "4" },

{
  "city_id": "24",
  "city_name": "吕梁市",
  "spell": "LVLIANGSHI",
  "easy_spell": "LLS",
  "zipcode": "030500",
  "province_id": "4" },

{
  "city_id": "25",
  "city_name": "呼和浩特市",
  "spell": "HUHEHAOTESHI",
  "easy_spell": "HHHTS",
  "zipcode": "010000",
  "province_id": "5" },

{
  "city_id": "26",
  "city_name": "包头市",
  "spell": "BAOTOUSHI",
  "easy_spell": "BTS",
  "zipcode": "014000",
  "province_id": "5" },

{
  "city_id": "27",
  "city_name": "乌海市",
  "spell": "WUHAISHI",
  "easy_spell": "WHS",
  "zipcode": "016000",
  "province_id": "5" },

{
  "city_id": "28",
  "city_name": "赤峰市",
  "spell": "CHIFENGSHI",
  "easy_spell": "CFS",
  "zipcode": "024000",
  "province_id": "5" },

{
  "city_id": "29",
  "city_name": "通辽市",
  "spell": "TONGLIAOSHI",
  "easy_spell": "TLS",
  "zipcode": "028000",
  "province_id": "5" },

{
  "city_id": "30",
  "city_name": "鄂尔多斯市",
  "spell": "EERDUOSISHI",
  "easy_spell": "EEDSS",
  "zipcode": "010300",
  "province_id": "5" },

{
  "city_id": "31",
  "city_name": "呼伦贝尔市",
  "spell": "HULUNBEIERSHI",
  "easy_spell": "HLBES",
  "zipcode": "021000",
  "province_id": "5" },

{
  "city_id": "32",
  "city_name": "巴彦淖尔市",
  "spell": "BAYANNAOERSHI",
  "easy_spell": "BYNES",
  "zipcode": "014400",
  "province_id": "5" },

{
  "city_id": "33",
  "city_name": "乌兰察布市",
  "spell": "WULANCHABUSHI",
  "easy_spell": "WLCBS",
  "zipcode": "011800",
  "province_id": "5" },

{
  "city_id": "34",
  "city_name": "兴安盟",
  "spell": "XINGANMENG",
  "easy_spell": "XAM",
  "zipcode": "137500",
  "province_id": "5" },

{
  "city_id": "35",
  "city_name": "锡林郭勒盟",
  "spell": "XILINGUOLEMENG",
  "easy_spell": "XLGLM",
  "zipcode": "011100",
  "province_id": "5" },

{
  "city_id": "36",
  "city_name": "阿拉善盟",
  "spell": "ALASHANMENG",
  "easy_spell": "ALSM",
  "zipcode": "016000",
  "province_id": "5" },

{
  "city_id": "37",
  "city_name": "沈阳市",
  "spell": "SHENYANGSHI",
  "easy_spell": "SYS",
  "zipcode": "110000",
  "province_id": "6" },

{
  "city_id": "38",
  "city_name": "大连市",
  "spell": "DALIANSHI",
  "easy_spell": "DLS",
  "zipcode": "116000",
  "province_id": "6" },

{
  "city_id": "39",
  "city_name": "鞍山市",
  "spell": "ANSHANSHI",
  "easy_spell": "ASS",
  "zipcode": "114000",
  "province_id": "6" },

{
  "city_id": "40",
  "city_name": "抚顺市",
  "spell": "FUSHUNSHI",
  "easy_spell": "FSS",
  "zipcode": "113000",
  "province_id": "6" },

{
  "city_id": "41",
  "city_name": "本溪市",
  "spell": "BENXISHI",
  "easy_spell": "BXS",
  "zipcode": "117000",
  "province_id": "6" },

{
  "city_id": "42",
  "city_name": "丹东市",
  "spell": "DANDONGSHI",
  "easy_spell": "DDS",
  "zipcode": "118000",
  "province_id": "6" },

{
  "city_id": "43",
  "city_name": "锦州市",
  "spell": "JINZHOUSHI",
  "easy_spell": "JZS",
  "zipcode": "121000",
  "province_id": "6" },

{
  "city_id": "44",
  "city_name": "营口市",
  "spell": "YINGKOUSHI",
  "easy_spell": "YKS",
  "zipcode": "115000",
  "province_id": "6" },

{
  "city_id": "45",
  "city_name": "阜新市",
  "spell": "FUXINSHI",
  "easy_spell": "FXS",
  "zipcode": "123000",
  "province_id": "6" },

{
  "city_id": "46",
  "city_name": "辽阳市",
  "spell": "LIAOYANGSHI",
  "easy_spell": "LYS",
  "zipcode": "111000",
  "province_id": "6" },

{
  "city_id": "47",
  "city_name": "盘锦市",
  "spell": "PANJINSHI",
  "easy_spell": "PJS",
  "zipcode": "124000",
  "province_id": "6" },

{
  "city_id": "48",
  "city_name": "铁岭市",
  "spell": "TIELINGSHI",
  "easy_spell": "TLS",
  "zipcode": "112000",
  "province_id": "6" },

{
  "city_id": "49",
  "city_name": "朝阳市",
  "spell": "CHAOYANGSHI",
  "easy_spell": "CYS",
  "zipcode": "122000",
  "province_id": "6" },

{
  "city_id": "50",
  "city_name": "葫芦岛市",
  "spell": "HULUDAOSHI",
  "easy_spell": "HLDS",
  "zipcode": "125000",
  "province_id": "6" },

{
  "city_id": "51",
  "city_name": "长春市",
  "spell": "CHANGCHUNSHI",
  "easy_spell": "CCS",
  "zipcode": "130000",
  "province_id": "7" },

{
  "city_id": "52",
  "city_name": "吉林市",
  "spell": "JILINSHI",
  "easy_spell": "JLS",
  "zipcode": "132000",
  "province_id": "7" },

{
  "city_id": "53",
  "city_name": "四平市",
  "spell": "SIPINGSHI",
  "easy_spell": "SPS",
  "zipcode": "136000",
  "province_id": "7" },

{
  "city_id": "54",
  "city_name": "辽源市",
  "spell": "LIAOYUANSHI",
  "easy_spell": "LYS",
  "zipcode": "136200",
  "province_id": "7" },

{
  "city_id": "55",
  "city_name": "通化市",
  "spell": "TONGHUASHI",
  "easy_spell": "THS",
  "zipcode": "134000",
  "province_id": "7" },

{
  "city_id": "56",
  "city_name": "白山市",
  "spell": "BAISHANSHI",
  "easy_spell": "BSS",
  "zipcode": "134300",
  "province_id": "7" },

{
  "city_id": "57",
  "city_name": "松原市",
  "spell": "SONGYUANSHI",
  "easy_spell": "SYS",
  "zipcode": "131100",
  "province_id": "7" },

{
  "city_id": "58",
  "city_name": "白城市",
  "spell": "BAICHENGSHI",
  "easy_spell": "BCS",
  "zipcode": "137000",
  "province_id": "7" },

{
  "city_id": "59",
  "city_name": "延边朝鲜族自治州",
  "spell": "YANBIANCHAOXIANZUZIZHIZHOU",
  "easy_spell": "YBCXZZZZ",
  "zipcode": "133000",
  "province_id": "7" },

{
  "city_id": "60",
  "city_name": "哈尔滨市",
  "spell": "HAERBINSHI",
  "easy_spell": "HEBS",
  "zipcode": "150000",
  "province_id": "8" },

{
  "city_id": "61",
  "city_name": "齐齐哈尔市",
  "spell": "QIQIHAERSHI",
  "easy_spell": "QQHES",
  "zipcode": "161000",
  "province_id": "8" },

{
  "city_id": "62",
  "city_name": "鸡西市",
  "spell": "JIXISHI",
  "easy_spell": "JXS",
  "zipcode": "158100",
  "province_id": "8" },

{
  "city_id": "63",
  "city_name": "鹤岗市",
  "spell": "HEGANGSHI",
  "easy_spell": "HGS",
  "zipcode": "154100",
  "province_id": "8" },

{
  "city_id": "64",
  "city_name": "双鸭山市",
  "spell": "SHUANGYASHANSHI",
  "easy_spell": "SYSS",
  "zipcode": "155100",
  "province_id": "8" },

{
  "city_id": "65",
  "city_name": "大庆市",
  "spell": "DAQINGSHI",
  "easy_spell": "DQS",
  "zipcode": "163000",
  "province_id": "8" },

{
  "city_id": "66",
  "city_name": "伊春市",
  "spell": "YICHUNSHI",
  "easy_spell": "YCS",
  "zipcode": "152300",
  "province_id": "8" },

{
  "city_id": "67",
  "city_name": "佳木斯市",
  "spell": "JIAMUSISHI",
  "easy_spell": "JMSS",
  "zipcode": "154000",
  "province_id": "8" },

{
  "city_id": "68",
  "city_name": "七台河市",
  "spell": "QITAIHESHI",
  "easy_spell": "QTHS",
  "zipcode": "154600",
  "province_id": "8" },

{
  "city_id": "69",
  "city_name": "牡丹江市",
  "spell": "MUDANJIANGSHI",
  "easy_spell": "MDJS",
  "zipcode": "157000",
  "province_id": "8" },

{
  "city_id": "70",
  "city_name": "黑河市",
  "spell": "HEIHESHI",
  "easy_spell": "HHS",
  "zipcode": "164300",
  "province_id": "8" },

{
  "city_id": "71",
  "city_name": "绥化市",
  "spell": "SUIHUASHI",
  "easy_spell": "SHS",
  "zipcode": "152000",
  "province_id": "8" },

{
  "city_id": "72",
  "city_name": "大兴安岭地区",
  "spell": "DAXINGANLINGDIQU",
  "easy_spell": "DXALDQ",
  "zipcode": "165000",
  "province_id": "8" },

{
  "city_id": "73",
  "city_name": "上海市",
  "spell": "SHANGHAISHI",
  "easy_spell": "SHS",
  "zipcode": "200000",
  "province_id": "9" },

{
  "city_id": "74",
  "city_name": "南京市",
  "spell": "NANJINGSHI",
  "easy_spell": "NJS",
  "zipcode": "210000",
  "province_id": "10" },

{
  "city_id": "75",
  "city_name": "无锡市",
  "spell": "WUXISHI",
  "easy_spell": "WXS",
  "zipcode": "214000",
  "province_id": "10" },

{
  "city_id": "76",
  "city_name": "徐州市",
  "spell": "XUZHOUSHI",
  "easy_spell": "XZS",
  "zipcode": "221000",
  "province_id": "10" },

{
  "city_id": "77",
  "city_name": "常州市",
  "spell": "CHANGZHOUSHI",
  "easy_spell": "CZS",
  "zipcode": "213000",
  "province_id": "10" },

{
  "city_id": "78",
  "city_name": "苏州市",
  "spell": "SUZHOUSHI",
  "easy_spell": "SZS",
  "zipcode": "215000",
  "province_id": "10" },

{
  "city_id": "79",
  "city_name": "南通市",
  "spell": "NANTONGSHI",
  "easy_spell": "NTS",
  "zipcode": "226000",
  "province_id": "10" },

{
  "city_id": "80",
  "city_name": "连云港市",
  "spell": "LIANYUNGANGSHI",
  "easy_spell": "LYGS",
  "zipcode": "222000",
  "province_id": "10" },

{
  "city_id": "81",
  "city_name": "淮安市",
  "spell": "HUAIANSHI",
  "easy_spell": "HAS",
  "zipcode": "223200",
  "province_id": "10" },

{
  "city_id": "82",
  "city_name": "盐城市",
  "spell": "YANCHENGSHI",
  "easy_spell": "YCS",
  "zipcode": "224000",
  "province_id": "10" },

{
  "city_id": "83",
  "city_name": "扬州市",
  "spell": "YANGZHOUSHI",
  "easy_spell": "YZS",
  "zipcode": "225000",
  "province_id": "10" },

{
  "city_id": "84",
  "city_name": "镇江市",
  "spell": "ZHENJIANGSHI",
  "easy_spell": "ZJS",
  "zipcode": "212000",
  "province_id": "10" },

{
  "city_id": "85",
  "city_name": "泰州市",
  "spell": "TAIZHOUSHI",
  "easy_spell": "TZS",
  "zipcode": "225300",
  "province_id": "10" },

{
  "city_id": "86",
  "city_name": "宿迁市",
  "spell": "SUQIANSHI",
  "easy_spell": "SQS",
  "zipcode": "223800",
  "province_id": "10" },

{
  "city_id": "87",
  "city_name": "杭州市",
  "spell": "HANGZHOUSHI",
  "easy_spell": "HZS",
  "zipcode": "310000",
  "province_id": "11" },

{
  "city_id": "88",
  "city_name": "宁波市",
  "spell": "NINGBOSHI",
  "easy_spell": "NBS",
  "zipcode": "315000",
  "province_id": "11" },

{
  "city_id": "89",
  "city_name": "温州市",
  "spell": "WENZHOUSHI",
  "easy_spell": "WZS",
  "zipcode": "325000",
  "province_id": "11" },

{
  "city_id": "90",
  "city_name": "嘉兴市",
  "spell": "JIAXINGSHI",
  "easy_spell": "JXS",
  "zipcode": "314000",
  "province_id": "11" },

{
  "city_id": "91",
  "city_name": "湖州市",
  "spell": "HUZHOUSHI",
  "easy_spell": "HZS",
  "zipcode": "313000",
  "province_id": "11" },

{
  "city_id": "92",
  "city_name": "绍兴市",
  "spell": "SHAOXINGSHI",
  "easy_spell": "SXS",
  "zipcode": "312000",
  "province_id": "11" },

{
  "city_id": "93",
  "city_name": "金华市",
  "spell": "JINHUASHI",
  "easy_spell": "JHS",
  "zipcode": "321000",
  "province_id": "11" },

{
  "city_id": "94",
  "city_name": "衢州市",
  "spell": "ZUOZHOUSHI",
  "easy_spell": "ZZS",
  "zipcode": "324000",
  "province_id": "11" },

{
  "city_id": "95",
  "city_name": "舟山市",
  "spell": "ZHOUSHANSHI",
  "easy_spell": "ZSS",
  "zipcode": "316000",
  "province_id": "11" },

{
  "city_id": "96",
  "city_name": "台州市",
  "spell": "TAIZHOUSHI",
  "easy_spell": "TZS",
  "zipcode": "318000",
  "province_id": "11" },

{
  "city_id": "97",
  "city_name": "丽水市",
  "spell": "LISHUISHI",
  "easy_spell": "LSS",
  "zipcode": "323000",
  "province_id": "11" },

{
  "city_id": "98",
  "city_name": "合肥市",
  "spell": "HEFEISHI",
  "easy_spell": "HFS",
  "zipcode": "230000",
  "province_id": "12" },

{
  "city_id": "99",
  "city_name": "芜湖市",
  "spell": "WUHUSHI",
  "easy_spell": "WHS",
  "zipcode": "241000",
  "province_id": "12" },

{
  "city_id": "100",
  "city_name": "蚌埠市",
  "spell": "BANGBUSHI",
  "easy_spell": "BBS",
  "zipcode": "233000",
  "province_id": "12" },

{
  "city_id": "101",
  "city_name": "淮南市",
  "spell": "HUAINANSHI",
  "easy_spell": "HNS",
  "zipcode": "232000",
  "province_id": "12" },

{
  "city_id": "102",
  "city_name": "马鞍山市",
  "spell": "MAANSHANSHI",
  "easy_spell": "MASS",
  "zipcode": "243000",
  "province_id": "12" },

{
  "city_id": "103",
  "city_name": "淮北市",
  "spell": "HUAIBEISHI",
  "easy_spell": "HBS",
  "zipcode": "235000",
  "province_id": "12" },

{
  "city_id": "104",
  "city_name": "铜陵市",
  "spell": "TONGLINGSHI",
  "easy_spell": "TLS",
  "zipcode": "244000",
  "province_id": "12" },

{
  "city_id": "105",
  "city_name": "安庆市",
  "spell": "ANQINGSHI",
  "easy_spell": "AQS",
  "zipcode": "246000",
  "province_id": "12" },

{
  "city_id": "106",
  "city_name": "黄山市",
  "spell": "HUANGSHANSHI",
  "easy_spell": "HSS",
  "zipcode": "242700",
  "province_id": "12" },

{
  "city_id": "107",
  "city_name": "滁州市",
  "spell": "CHUZHOUSHI",
  "easy_spell": "CZS",
  "zipcode": "239000",
  "province_id": "12" },

{
  "city_id": "108",
  "city_name": "阜阳市",
  "spell": "FUYANGSHI",
  "easy_spell": "FYS",
  "zipcode": "236100",
  "province_id": "12" },

{
  "city_id": "109",
  "city_name": "宿州市",
  "spell": "SUZHOUSHI",
  "easy_spell": "SZS",
  "zipcode": "234100",
  "province_id": "12" },

{
  "city_id": "110",
  "city_name": "巢湖市",
  "spell": "CHAOHUSHI",
  "easy_spell": "CHS",
  "zipcode": "238000",
  "province_id": "12" },

{
  "city_id": "111",
  "city_name": "六安市",
  "spell": "LIUANSHI",
  "easy_spell": "LAS",
  "zipcode": "237000",
  "province_id": "12" },

{
  "city_id": "112",
  "city_name": "亳州市",
  "spell": "ZUOZHOUSHI",
  "easy_spell": "ZZS",
  "zipcode": "236800",
  "province_id": "12" },

{
  "city_id": "113",
  "city_name": "池州市",
  "spell": "CHIZHOUSHI",
  "easy_spell": "CZS",
  "zipcode": "247100",
  "province_id": "12" },

{
  "city_id": "114",
  "city_name": "宣城市",
  "spell": "XUANCHENGSHI",
  "easy_spell": "XCS",
  "zipcode": "366000",
  "province_id": "12" },

{
  "city_id": "115",
  "city_name": "福州市",
  "spell": "FUZHOUSHI",
  "easy_spell": "FZS",
  "zipcode": "350000",
  "province_id": "13" },

{
  "city_id": "116",
  "city_name": "厦门市",
  "spell": "XIAMENSHI",
  "easy_spell": "XMS",
  "zipcode": "361000",
  "province_id": "13" },

{
  "city_id": "117",
  "city_name": "莆田市",
  "spell": "PUTIANSHI",
  "easy_spell": "PTS",
  "zipcode": "351100",
  "province_id": "13" },

{
  "city_id": "118",
  "city_name": "三明市",
  "spell": "SANMINGSHI",
  "easy_spell": "SMS",
  "zipcode": "365000",
  "province_id": "13" },

{
  "city_id": "119",
  "city_name": "泉州市",
  "spell": "QUANZHOUSHI",
  "easy_spell": "QZS",
  "zipcode": "362000",
  "province_id": "13" },

{
  "city_id": "120",
  "city_name": "漳州市",
  "spell": "ZHANGZHOUSHI",
  "easy_spell": "ZZS",
  "zipcode": "363000",
  "province_id": "13" },

{
  "city_id": "121",
  "city_name": "南平市",
  "spell": "NANPINGSHI",
  "easy_spell": "NPS",
  "zipcode": "353000",
  "province_id": "13" },

{
  "city_id": "122",
  "city_name": "龙岩市",
  "spell": "LONGYANSHI",
  "easy_spell": "LYS",
  "zipcode": "364000",
  "province_id": "13" },

{
  "city_id": "123",
  "city_name": "宁德市",
  "spell": "NINGDESHI",
  "easy_spell": "NDS",
  "zipcode": "352100",
  "province_id": "13" },

{
  "city_id": "124",
  "city_name": "南昌市",
  "spell": "NANCHANGSHI",
  "easy_spell": "NCS",
  "zipcode": "330000",
  "province_id": "14" },

{
  "city_id": "125",
  "city_name": "景德镇市",
  "spell": "JINGDEZHENSHI",
  "easy_spell": "JDZS",
  "zipcode": "333000",
  "province_id": "14" },

{
  "city_id": "126",
  "city_name": "萍乡市",
  "spell": "PINGXIANGSHI",
  "easy_spell": "PXS",
  "zipcode": "337000",
  "province_id": "14" },

{
  "city_id": "127",
  "city_name": "九江市",
  "spell": "JIUJIANGSHI",
  "easy_spell": "JJS",
  "zipcode": "332000",
  "province_id": "14" },

{
  "city_id": "128",
  "city_name": "新余市",
  "spell": "XINYUSHI",
  "easy_spell": "XYS",
  "zipcode": "338000",
  "province_id": "14" },

{
  "city_id": "129",
  "city_name": "鹰潭市",
  "spell": "YINGTANSHI",
  "easy_spell": "YTS",
  "zipcode": "335000",
  "province_id": "14" },

{
  "city_id": "130",
  "city_name": "赣州市",
  "spell": "GANZHOUSHI",
  "easy_spell": "GZS",
  "zipcode": "341000",
  "province_id": "14" },

{
  "city_id": "131",
  "city_name": "吉安市",
  "spell": "JIANSHI",
  "easy_spell": "JAS",
  "zipcode": "343000",
  "province_id": "14" },

{
  "city_id": "132",
  "city_name": "宜春市",
  "spell": "YICHUNSHI",
  "easy_spell": "YCS",
  "zipcode": "336000",
  "province_id": "14" },

{
  "city_id": "133",
  "city_name": "抚州市",
  "spell": "FUZHOUSHI",
  "easy_spell": "FZS",
  "zipcode": "332900",
  "province_id": "14" },

{
  "city_id": "134",
  "city_name": "上饶市",
  "spell": "SHANGRAOSHI",
  "easy_spell": "SRS",
  "zipcode": "334000",
  "province_id": "14" },

{
  "city_id": "135",
  "city_name": "济南市",
  "spell": "JINANSHI",
  "easy_spell": "JNS",
  "zipcode": "250000",
  "province_id": "15" },

{
  "city_id": "136",
  "city_name": "青岛市",
  "spell": "QINGDAOSHI",
  "easy_spell": "QDS",
  "zipcode": "266000",
  "province_id": "15" },

{
  "city_id": "137",
  "city_name": "淄博市",
  "spell": "ZIBOSHI",
  "easy_spell": "ZBS",
  "zipcode": "255000",
  "province_id": "15" },

{
  "city_id": "138",
  "city_name": "枣庄市",
  "spell": "ZAOZHUANGSHI",
  "easy_spell": "ZZS",
  "zipcode": "277100",
  "province_id": "15" },

{
  "city_id": "139",
  "city_name": "东营市",
  "spell": "DONGYINGSHI",
  "easy_spell": "DYS",
  "zipcode": "257000",
  "province_id": "15" },

{
  "city_id": "140",
  "city_name": "烟台市",
  "spell": "YANTAISHI",
  "easy_spell": "YTS",
  "zipcode": "264000",
  "province_id": "15" },

{
  "city_id": "141",
  "city_name": "潍坊市",
  "spell": "WEIFANGSHI",
  "easy_spell": "WFS",
  "zipcode": "261000",
  "province_id": "15" },

{
  "city_id": "142",
  "city_name": "济宁市",
  "spell": "JININGSHI",
  "easy_spell": "JNS",
  "zipcode": "272100",
  "province_id": "15" },

{
  "city_id": "143",
  "city_name": "泰安市",
  "spell": "TAIANSHI",
  "easy_spell": "TAS",
  "zipcode": "271000",
  "province_id": "15" },

{
  "city_id": "144",
  "city_name": "威海市",
  "spell": "WEIHAISHI",
  "easy_spell": "WHS",
  "zipcode": "265700",
  "province_id": "15" },

{
  "city_id": "145",
  "city_name": "日照市",
  "spell": "RIZHAOSHI",
  "easy_spell": "RZS",
  "zipcode": "276800",
  "province_id": "15" },

{
  "city_id": "146",
  "city_name": "莱芜市",
  "spell": "LAIWUSHI",
  "easy_spell": "LWS",
  "zipcode": "271100",
  "province_id": "15" },

{
  "city_id": "147",
  "city_name": "临沂市",
  "spell": "LINYISHI",
  "easy_spell": "LYS",
  "zipcode": "276000",
  "province_id": "15" },

{
  "city_id": "148",
  "city_name": "德州市",
  "spell": "DEZHOUSHI",
  "easy_spell": "DZS",
  "zipcode": "253000",
  "province_id": "15" },

{
  "city_id": "149",
  "city_name": "聊城市",
  "spell": "LIAOCHENGSHI",
  "easy_spell": "LCS",
  "zipcode": "252000",
  "province_id": "15" },

{
  "city_id": "150",
  "city_name": "滨州市",
  "spell": "BINZHOUSHI",
  "easy_spell": "BZS",
  "zipcode": "256600",
  "province_id": "15" },

{
  "city_id": "151",
  "city_name": "荷泽市",
  "spell": "HEZESHI",
  "easy_spell": "HZS",
  "zipcode": "255000",
  "province_id": "15" },

{
  "city_id": "152",
  "city_name": "郑州市",
  "spell": "ZHENGZHOUSHI",
  "easy_spell": "ZZS",
  "zipcode": "450000",
  "province_id": "16" },

{
  "city_id": "153",
  "city_name": "开封市",
  "spell": "KAIFENGSHI",
  "easy_spell": "KFS",
  "zipcode": "475000",
  "province_id": "16" },

{
  "city_id": "154",
  "city_name": "洛阳市",
  "spell": "LUOYANGSHI",
  "easy_spell": "LYS",
  "zipcode": "471000",
  "province_id": "16" },

{
  "city_id": "155",
  "city_name": "平顶山市",
  "spell": "PINGDINGSHANSHI",
  "easy_spell": "PDSS",
  "zipcode": "467000",
  "province_id": "16" },

{
  "city_id": "156",
  "city_name": "安阳市",
  "spell": "ANYANGSHI",
  "easy_spell": "AYS",
  "zipcode": "454900",
  "province_id": "16" },

{
  "city_id": "157",
  "city_name": "鹤壁市",
  "spell": "HEBISHI",
  "easy_spell": "HBS",
  "zipcode": "456600",
  "province_id": "16" },

{
  "city_id": "158",
  "city_name": "新乡市",
  "spell": "XINXIANGSHI",
  "easy_spell": "XXS",
  "zipcode": "453000",
  "province_id": "16" },

{
  "city_id": "159",
  "city_name": "焦作市",
  "spell": "JIAOZUOSHI",
  "easy_spell": "JZS",
  "zipcode": "454100",
  "province_id": "16" },

{
  "city_id": "160",
  "city_name": "濮阳市",
  "spell": "ZUOYANGSHI",
  "easy_spell": "ZYS",
  "zipcode": "457000",
  "province_id": "16" },

{
  "city_id": "161",
  "city_name": "许昌市",
  "spell": "XUCHANGSHI",
  "easy_spell": "XCS",
  "zipcode": "461000",
  "province_id": "16" },

{
  "city_id": "162",
  "city_name": "漯河市",
  "spell": "ZUOHESHI",
  "easy_spell": "ZHS",
  "zipcode": "462000",
  "province_id": "16" },

{
  "city_id": "163",
  "city_name": "三门峡市",
  "spell": "SANMENXIASHI",
  "easy_spell": "SMXS",
  "zipcode": "472000",
  "province_id": "16" },

{
  "city_id": "164",
  "city_name": "南阳市",
  "spell": "NANYANGSHI",
  "easy_spell": "NYS",
  "zipcode": "473000",
  "province_id": "16" },

{
  "city_id": "165",
  "city_name": "商丘市",
  "spell": "SHANGQIUSHI",
  "easy_spell": "SQS",
  "zipcode": "476000",
  "province_id": "16" },

{
  "city_id": "166",
  "city_name": "信阳市",
  "spell": "XINYANGSHI",
  "easy_spell": "XYS",
  "zipcode": "464000",
  "province_id": "16" },

{
  "city_id": "167",
  "city_name": "周口市",
  "spell": "ZHOUKOUSHI",
  "easy_spell": "ZKS",
  "zipcode": "466000",
  "province_id": "16" },

{
  "city_id": "168",
  "city_name": "驻马店市",
  "spell": "ZHUMADIANSHI",
  "easy_spell": "ZMDS",
  "zipcode": "463000",
  "province_id": "16" },

{
  "city_id": "169",
  "city_name": "武汉市",
  "spell": "WUHANSHI",
  "easy_spell": "WHS",
  "zipcode": "430000",
  "province_id": "17" },

{
  "city_id": "170",
  "city_name": "黄石市",
  "spell": "HUANGSHISHI",
  "easy_spell": "HSS",
  "zipcode": "435000",
  "province_id": "17" },

{
  "city_id": "171",
  "city_name": "十堰市",
  "spell": "SHIYANSHI",
  "easy_spell": "SYS",
  "zipcode": "442000",
  "province_id": "17" },

{
  "city_id": "172",
  "city_name": "宜昌市",
  "spell": "YICHANGSHI",
  "easy_spell": "YCS",
  "zipcode": "443000",
  "province_id": "17" },

{
  "city_id": "173",
  "city_name": "襄樊市",
  "spell": "XIANGFANSHI",
  "easy_spell": "XFS",
  "zipcode": "441000",
  "province_id": "17" },

{
  "city_id": "174",
  "city_name": "鄂州市",
  "spell": "EZHOUSHI",
  "easy_spell": "EZS",
  "zipcode": "436000",
  "province_id": "17" },

{
  "city_id": "175",
  "city_name": "荆门市",
  "spell": "JINGMENSHI",
  "easy_spell": "JMS",
  "zipcode": "448000",
  "province_id": "17" },

{
  "city_id": "176",
  "city_name": "孝感市",
  "spell": "XIAOGANSHI",
  "easy_spell": "XGS",
  "zipcode": "432100",
  "province_id": "17" },

{
  "city_id": "177",
  "city_name": "荆州市",
  "spell": "JINGZHOUSHI",
  "easy_spell": "JZS",
  "zipcode": "434000",
  "province_id": "17" },

{
  "city_id": "178",
  "city_name": "黄冈市",
  "spell": "HUANGGANGSHI",
  "easy_spell": "HGS",
  "zipcode": "438000",
  "province_id": "17" },

{
  "city_id": "179",
  "city_name": "咸宁市",
  "spell": "XIANNINGSHI",
  "easy_spell": "XNS",
  "zipcode": "437000",
  "province_id": "17" },

{
  "city_id": "180",
  "city_name": "随州市",
  "spell": "SUIZHOUSHI",
  "easy_spell": "SZS",
  "zipcode": "441300",
  "province_id": "17" },

{
  "city_id": "181",
  "city_name": "恩施土家族苗族自治州",
  "spell": "ENSHITUJIAZUMIAOZUZIZHIZHOU",
  "easy_spell": "ESTJZMZZZZ",
  "zipcode": "445000",
  "province_id": "17" },

{
  "city_id": "182",
  "city_name": "神农架",
  "spell": "SHENNONGJIA",
  "easy_spell": "SNJ",
  "zipcode": "442400",
  "province_id": "17" },

{
  "city_id": "183",
  "city_name": "长沙市",
  "spell": "CHANGSHASHI",
  "easy_spell": "CSS",
  "zipcode": "410000",
  "province_id": "18" },

{
  "city_id": "184",
  "city_name": "株洲市",
  "spell": "ZHUZHOUSHI",
  "easy_spell": "ZZS",
  "zipcode": "412000",
  "province_id": "18" },

{
  "city_id": "185",
  "city_name": "湘潭市",
  "spell": "XIANGTANSHI",
  "easy_spell": "XTS",
  "zipcode": "411100",
  "province_id": "18" },

{
  "city_id": "186",
  "city_name": "衡阳市",
  "spell": "HENGYANGSHI",
  "easy_spell": "HYS",
  "zipcode": "421000",
  "province_id": "18" },

{
  "city_id": "187",
  "city_name": "邵阳市",
  "spell": "SHAOYANGSHI",
  "easy_spell": "SYS",
  "zipcode": "422000",
  "province_id": "18" },

{
  "city_id": "188",
  "city_name": "岳阳市",
  "spell": "YUEYANGSHI",
  "easy_spell": "YYS",
  "zipcode": "414000",
  "province_id": "18" },

{
  "city_id": "189",
  "city_name": "常德市",
  "spell": "CHANGDESHI",
  "easy_spell": "CDS",
  "zipcode": "415000",
  "province_id": "18" },

{
  "city_id": "190",
  "city_name": "张家界市",
  "spell": "ZHANGJIAJIESHI",
  "easy_spell": "ZJJS",
  "zipcode": "427000",
  "province_id": "18" },

{
  "city_id": "191",
  "city_name": "益阳市",
  "spell": "YIYANGSHI",
  "easy_spell": "YYS",
  "zipcode": "413000",
  "province_id": "18" },

{
  "city_id": "192",
  "city_name": "郴州市",
  "spell": "CHENZHOUSHI",
  "easy_spell": "CZS",
  "zipcode": "423000",
  "province_id": "18" },

{
  "city_id": "193",
  "city_name": "永州市",
  "spell": "YONGZHOUSHI",
  "easy_spell": "YZS",
  "zipcode": "425000",
  "province_id": "18" },

{
  "city_id": "194",
  "city_name": "怀化市",
  "spell": "HUAIHUASHI",
  "easy_spell": "HHS",
  "zipcode": "418000",
  "province_id": "18" },

{
  "city_id": "195",
  "city_name": "娄底市",
  "spell": "LOUDISHI",
  "easy_spell": "LDS",
  "zipcode": "417000",
  "province_id": "18" },

{
  "city_id": "196",
  "city_name": "湘西土家族苗族自治州",
  "spell": "XIANGXITUJIAZUMIAOZUZIZHIZHOU",
  "easy_spell": "XXTJZMZZZZ",
  "zipcode": "416000",
  "province_id": "18" },

{
  "city_id": "197",
  "city_name": "广州市",
  "spell": "GUANGZHOUSHI",
  "easy_spell": "GZS",
  "zipcode": "510000",
  "province_id": "19" },

{
  "city_id": "198",
  "city_name": "韶关市",
  "spell": "SHAOGUANSHI",
  "easy_spell": "SGS",
  "zipcode": "521000",
  "province_id": "19" },

{
  "city_id": "199",
  "city_name": "深圳市",
  "spell": "SHENZUOSHI",
  "easy_spell": "SZS",
  "zipcode": "518000",
  "province_id": "19" },

{
  "city_id": "200",
  "city_name": "珠海市",
  "spell": "ZHUHAISHI",
  "easy_spell": "ZHS",
  "zipcode": "519000",
  "province_id": "19" },

{
  "city_id": "201",
  "city_name": "汕头市",
  "spell": "SHANTOUSHI",
  "easy_spell": "STS",
  "zipcode": "515000",
  "province_id": "19" },

{
  "city_id": "202",
  "city_name": "佛山市",
  "spell": "FOSHANSHI",
  "easy_spell": "FSS",
  "zipcode": "528000",
  "province_id": "19" },

{
  "city_id": "203",
  "city_name": "江门市",
  "spell": "JIANGMENSHI",
  "easy_spell": "JMS",
  "zipcode": "529000",
  "province_id": "19" },

{
  "city_id": "204",
  "city_name": "湛江市",
  "spell": "ZHANJIANGSHI",
  "easy_spell": "ZJS",
  "zipcode": "524000",
  "province_id": "19" },

{
  "city_id": "205",
  "city_name": "茂名市",
  "spell": "MAOMINGSHI",
  "easy_spell": "MMS",
  "zipcode": "525000",
  "province_id": "19" },

{
  "city_id": "206",
  "city_name": "肇庆市",
  "spell": "ZHAOQINGSHI",
  "easy_spell": "ZQS",
  "zipcode": "526000",
  "province_id": "19" },

{
  "city_id": "207",
  "city_name": "惠州市",
  "spell": "HUIZHOUSHI",
  "easy_spell": "HZS",
  "zipcode": "516000",
  "province_id": "19" },

{
  "city_id": "208",
  "city_name": "梅州市",
  "spell": "MEIZHOUSHI",
  "easy_spell": "MZS",
  "zipcode": "514000",
  "province_id": "19" },

{
  "city_id": "209",
  "city_name": "汕尾市",
  "spell": "SHANWEISHI",
  "easy_spell": "SWS",
  "zipcode": "516600",
  "province_id": "19" },

{
  "city_id": "210",
  "city_name": "河源市",
  "spell": "HEYUANSHI",
  "easy_spell": "HYS",
  "zipcode": "517000",
  "province_id": "19" },

{
  "city_id": "211",
  "city_name": "阳江市",
  "spell": "YANGJIANGSHI",
  "easy_spell": "YJS",
  "zipcode": "529500",
  "province_id": "19" },

{
  "city_id": "212",
  "city_name": "清远市",
  "spell": "QINGYUANSHI",
  "easy_spell": "QYS",
  "zipcode": "511500",
  "province_id": "19" },

{
  "city_id": "213",
  "city_name": "东莞市",
  "spell": "DONGZUOSHI",
  "easy_spell": "DZS",
  "zipcode": "511700",
  "province_id": "19" },

{
  "city_id": "214",
  "city_name": "中山市",
  "spell": "ZHONGSHANSHI",
  "easy_spell": "ZSS",
  "zipcode": "528400",
  "province_id": "19" },

{
  "city_id": "215",
  "city_name": "潮州市",
  "spell": "CHAOZHOUSHI",
  "easy_spell": "CZS",
  "zipcode": "515600",
  "province_id": "19" },

{
  "city_id": "216",
  "city_name": "揭阳市",
  "spell": "JIEYANGSHI",
  "easy_spell": "JYS",
  "zipcode": "522000",
  "province_id": "19" },

{
  "city_id": "217",
  "city_name": "云浮市",
  "spell": "YUNFUSHI",
  "easy_spell": "YFS",
  "zipcode": "527300",
  "province_id": "19" },

{
  "city_id": "218",
  "city_name": "南宁市",
  "spell": "NANNINGSHI",
  "easy_spell": "NNS",
  "zipcode": "530000",
  "province_id": "20" },

{
  "city_id": "219",
  "city_name": "柳州市",
  "spell": "LIUZHOUSHI",
  "easy_spell": "LZS",
  "zipcode": "545000",
  "province_id": "20" },

{
  "city_id": "220",
  "city_name": "桂林市",
  "spell": "GUILINSHI",
  "easy_spell": "GLS",
  "zipcode": "541000",
  "province_id": "20" },

{
  "city_id": "221",
  "city_name": "梧州市",
  "spell": "WUZHOUSHI",
  "easy_spell": "WZS",
  "zipcode": "543000",
  "province_id": "20" },

{
  "city_id": "222",
  "city_name": "北海市",
  "spell": "BEIHAISHI",
  "easy_spell": "BHS",
  "zipcode": "536000",
  "province_id": "20" },

{
  "city_id": "223",
  "city_name": "防城港市",
  "spell": "FANGCHENGGANGSHI",
  "easy_spell": "FCGS",
  "zipcode": "538000",
  "province_id": "20" },

{
  "city_id": "224",
  "city_name": "钦州市",
  "spell": "QINZHOUSHI",
  "easy_spell": "QZS",
  "zipcode": "535000",
  "province_id": "20" },

{
  "city_id": "225",
  "city_name": "贵港市",
  "spell": "GUIGANGSHI",
  "easy_spell": "GGS",
  "zipcode": "537100",
  "province_id": "20" },

{
  "city_id": "226",
  "city_name": "玉林市",
  "spell": "YULINSHI",
  "easy_spell": "YLS",
  "zipcode": "537000",
  "province_id": "20" },

{
  "city_id": "227",
  "city_name": "百色市",
  "spell": "BAISESHI",
  "easy_spell": "BSS",
  "zipcode": "533000",
  "province_id": "20" },

{
  "city_id": "228",
  "city_name": "贺州市",
  "spell": "HEZHOUSHI",
  "easy_spell": "HZS",
  "zipcode": "542800",
  "province_id": "20" },

{
  "city_id": "229",
  "city_name": "河池市",
  "spell": "HECHISHI",
  "easy_spell": "HCS",
  "zipcode": "547000",
  "province_id": "20" },

{
  "city_id": "230",
  "city_name": "来宾市",
  "spell": "LAIBINSHI",
  "easy_spell": "LBS",
  "zipcode": "546100",
  "province_id": "20" },

{
  "city_id": "231",
  "city_name": "崇左市",
  "spell": "CHONGZUOSHI",
  "easy_spell": "CZS",
  "zipcode": "532200",
  "province_id": "20" },

{
  "city_id": "232",
  "city_name": "海口市",
  "spell": "HAIKOUSHI",
  "easy_spell": "HKS",
  "zipcode": "570000",
  "province_id": "21" },

{
  "city_id": "233",
  "city_name": "三亚市",
  "spell": "SANYASHI",
  "easy_spell": "SYS",
  "zipcode": "572000",
  "province_id": "21" },

{
  "city_id": "234",
  "city_name": "重庆市",
  "spell": "ZHONGQINGSHI",
  "easy_spell": "ZQS",
  "zipcode": "400000",
  "province_id": "22" },

{
  "city_id": "235",
  "city_name": "成都市",
  "spell": "CHENGDUSHI",
  "easy_spell": "CDS",
  "zipcode": "610000",
  "province_id": "23" },

{
  "city_id": "236",
  "city_name": "自贡市",
  "spell": "ZIGONGSHI",
  "easy_spell": "ZGS",
  "zipcode": "643000",
  "province_id": "23" },

{
  "city_id": "237",
  "city_name": "攀枝花市",
  "spell": "PANZHIHUASHI",
  "easy_spell": "PZHS",
  "zipcode": "617000",
  "province_id": "23" },

{
  "city_id": "238",
  "city_name": "泸州市",
  "spell": "ZUOZHOUSHI",
  "easy_spell": "ZZS",
  "zipcode": "646100",
  "province_id": "23" },

{
  "city_id": "239",
  "city_name": "德阳市",
  "spell": "DEYANGSHI",
  "easy_spell": "DYS",
  "zipcode": "618000",
  "province_id": "23" },

{
  "city_id": "240",
  "city_name": "绵阳市",
  "spell": "MIANYANGSHI",
  "easy_spell": "MYS",
  "zipcode": "621000",
  "province_id": "23" },

{
  "city_id": "241",
  "city_name": "广元市",
  "spell": "GUANGYUANSHI",
  "easy_spell": "GYS",
  "zipcode": "628000",
  "province_id": "23" },

{
  "city_id": "242",
  "city_name": "遂宁市",
  "spell": "SUININGSHI",
  "easy_spell": "SNS",
  "zipcode": "629000",
  "province_id": "23" },

{
  "city_id": "243",
  "city_name": "内江市",
  "spell": "NEIJIANGSHI",
  "easy_spell": "NJS",
  "zipcode": "641000",
  "province_id": "23" },

{
  "city_id": "244",
  "city_name": "乐山市",
  "spell": "LESHANSHI",
  "easy_spell": "LSS",
  "zipcode": "614000",
  "province_id": "23" },

{
  "city_id": "245",
  "city_name": "南充市",
  "spell": "NANCHONGSHI",
  "easy_spell": "NCS",
  "zipcode": "637000",
  "province_id": "23" },

{
  "city_id": "246",
  "city_name": "眉山市",
  "spell": "MEISHANSHI",
  "easy_spell": "MSS",
  "zipcode": "612100",
  "province_id": "23" },

{
  "city_id": "247",
  "city_name": "宜宾市",
  "spell": "YIBINSHI",
  "easy_spell": "YBS",
  "zipcode": "644000",
  "province_id": "23" },

{
  "city_id": "248",
  "city_name": "广安市",
  "spell": "GUANGANSHI",
  "easy_spell": "GAS",
  "zipcode": "638000",
  "province_id": "23" },

{
  "city_id": "249",
  "city_name": "达州市",
  "spell": "DAZHOUSHI",
  "easy_spell": "DZS",
  "zipcode": "635000",
  "province_id": "23" },

{
  "city_id": "250",
  "city_name": "雅安市",
  "spell": "YAANSHI",
  "easy_spell": "YAS",
  "zipcode": "625000",
  "province_id": "23" },

{
  "city_id": "251",
  "city_name": "巴中市",
  "spell": "BAZHONGSHI",
  "easy_spell": "BZS",
  "zipcode": "635500",
  "province_id": "23" },

{
  "city_id": "252",
  "city_name": "资阳市",
  "spell": "ZIYANGSHI",
  "easy_spell": "ZYS",
  "zipcode": "641300",
  "province_id": "23" },

{
  "city_id": "253",
  "city_name": "阿坝藏族羌族自治州",
  "spell": "ABACANGZUQIANGZUZIZHIZHOU",
  "easy_spell": "ABCZQZZZZ",
  "zipcode": "624600",
  "province_id": "23" },

{
  "city_id": "254",
  "city_name": "甘孜藏族自治州",
  "spell": "GANZICANGZUZIZHIZHOU",
  "easy_spell": "GZCZZZZ",
  "zipcode": "626000",
  "province_id": "23" },

{
  "city_id": "255",
  "city_name": "凉山彝族自治州",
  "spell": "LIANGSHANYIZUZIZHIZHOU",
  "easy_spell": "LSYZZZZ",
  "zipcode": "615000",
  "province_id": "23" },

{
  "city_id": "256",
  "city_name": "贵阳市",
  "spell": "GUIYANGSHI",
  "easy_spell": "GYS",
  "zipcode": "55000",
  "province_id": "24" },

{
  "city_id": "257",
  "city_name": "六盘水市",
  "spell": "LIUPANSHUISHI",
  "easy_spell": "LPSS",
  "zipcode": "553000",
  "province_id": "24" },

{
  "city_id": "258",
  "city_name": "遵义市",
  "spell": "ZUNYISHI",
  "easy_spell": "ZYS",
  "zipcode": "563000",
  "province_id": "24" },

{
  "city_id": "259",
  "city_name": "安顺市",
  "spell": "ANSHUNSHI",
  "easy_spell": "ASS",
  "zipcode": "561000",
  "province_id": "24" },

{
  "city_id": "260",
  "city_name": "铜仁地区",
  "spell": "TONGRENDIQU",
  "easy_spell": "TRDQ",
  "zipcode": "554300",
  "province_id": "24" },

{
  "city_id": "261",
  "city_name": "黔西南布依族苗族自治州",
  "spell": "QIANXINANBUYIZUMIAOZUZIZHIZHOU",
  "easy_spell": "QXNBYZMZZZZ",
  "zipcode": "551500",
  "province_id": "24" },

{
  "city_id": "262",
  "city_name": "毕节地区",
  "spell": "BIJIEDIQU",
  "easy_spell": "BJDQ",
  "zipcode": "551700",
  "province_id": "24" },

{
  "city_id": "263",
  "city_name": "黔东南苗族侗族自治州",
  "spell": "QIANDONGNANMIAOZUDONGZUZIZHIZHOU",
  "easy_spell": "QDNMZDZZZZ",
  "zipcode": "551500",
  "province_id": "24" },

{
  "city_id": "264",
  "city_name": "黔南布依族苗族自治州",
  "spell": "QIANNANBUYIZUMIAOZUZIZHIZHOU",
  "easy_spell": "QNBYZMZZZZ",
  "zipcode": "550100",
  "province_id": "24" },

{
  "city_id": "265",
  "city_name": "昆明市",
  "spell": "KUNMINGSHI",
  "easy_spell": "KMS",
  "zipcode": "650000",
  "province_id": "25" },

{
  "city_id": "266",
  "city_name": "曲靖市",
  "spell": "QUJINGSHI",
  "easy_spell": "QJS",
  "zipcode": "655000",
  "province_id": "25" },

{
  "city_id": "267",
  "city_name": "玉溪市",
  "spell": "YUXISHI",
  "easy_spell": "YXS",
  "zipcode": "653100",
  "province_id": "25" },

{
  "city_id": "268",
  "city_name": "保山市",
  "spell": "BAOSHANSHI",
  "easy_spell": "BSS",
  "zipcode": "678000",
  "province_id": "25" },

{
  "city_id": "269",
  "city_name": "昭通市",
  "spell": "ZHAOTONGSHI",
  "easy_spell": "ZTS",
  "zipcode": "657000",
  "province_id": "25" },

{
  "city_id": "270",
  "city_name": "丽江市",
  "spell": "LIJIANGSHI",
  "easy_spell": "LJS",
  "zipcode": "674100",
  "province_id": "25" },

{
  "city_id": "271",
  "city_name": "思茅市",
  "spell": "SIMAOSHI",
  "easy_spell": "SMS",
  "zipcode": "665000",
  "province_id": "25" },

{
  "city_id": "272",
  "city_name": "临沧市",
  "spell": "LINCANGSHI",
  "easy_spell": "LCS",
  "zipcode": "677000",
  "province_id": "25" },

{
  "city_id": "273",
  "city_name": "楚雄彝族自治州",
  "spell": "CHUXIONGYIZUZIZHIZHOU",
  "easy_spell": "CXYZZZZ",
  "zipcode": "675000",
  "province_id": "25" },

{
  "city_id": "274",
  "city_name": "红河哈尼族彝族自治州",
  "spell": "HONGHEHANIZUYIZUZIZHIZHOU",
  "easy_spell": "HHHNZYZZZZ",
  "zipcode": "654400",
  "province_id": "25" },

{
  "city_id": "275",
  "city_name": "文山壮族苗族自治州",
  "spell": "WENSHANZHUANGZUMIAOZUZIZHIZHOU",
  "easy_spell": "WSZZMZZZZ",
  "zipcode": "663000",
  "province_id": "25" },

{
  "city_id": "276",
  "city_name": "西双版纳傣族自治州",
  "spell": "XISHUANGBANNADAIZUZIZHIZHOU",
  "easy_spell": "XSBNDZZZZ",
  "zipcode": "666200",
  "province_id": "25" },

{
  "city_id": "277",
  "city_name": "大理白族自治州",
  "spell": "DALIBAIZUZIZHIZHOU",
  "easy_spell": "DLBZZZZ",
  "zipcode": "671000",
  "province_id": "25" },

{
  "city_id": "278",
  "city_name": "德宏傣族景颇族自治州",
  "spell": "DEHONGDAIZUJINGPOZUZIZHIZHOU",
  "easy_spell": "DHDZJPZZZZ",
  "zipcode": "678400",
  "province_id": "25" },

{
  "city_id": "279",
  "city_name": "怒江傈僳族自治州",
  "spell": "NUJIANGLISUZUZIZHIZHOU",
  "easy_spell": "NJLSZZZZ",
  "zipcode": "671400",
  "province_id": "25" },

{
  "city_id": "280",
  "city_name": "迪庆藏族自治州",
  "spell": "DIQINGCANGZUZIZHIZHOU",
  "easy_spell": "DQCZZZZ",
  "zipcode": "674400",
  "province_id": "25" },

{
  "city_id": "281",
  "city_name": "拉萨市",
  "spell": "LASASHI",
  "easy_spell": "LSS",
  "zipcode": "850000",
  "province_id": "26" },

{
  "city_id": "282",
  "city_name": "昌都地区",
  "spell": "CHANGDUDIQU",
  "easy_spell": "CDDQ",
  "zipcode": "854000",
  "province_id": "26" },

{
  "city_id": "283",
  "city_name": "山南地区",
  "spell": "SHANNANDIQU",
  "easy_spell": "SNDQ",
  "zipcode": "856000",
  "province_id": "26" },

{
  "city_id": "284",
  "city_name": "日喀则地区",
  "spell": "RIKAZEDIQU",
  "easy_spell": "RKZDQ",
  "zipcode": "857000",
  "province_id": "26" },

{
  "city_id": "285",
  "city_name": "那曲地区",
  "spell": "NAQUDIQU",
  "easy_spell": "NQDQ",
  "zipcode": "852000",
  "province_id": "26" },

{
  "city_id": "286",
  "city_name": "阿里地区",
  "spell": "ALIDIQU",
  "easy_spell": "ALDQ",
  "zipcode": "859100",
  "province_id": "26" },

{
  "city_id": "287",
  "city_name": "林芝地区",
  "spell": "LINZHIDIQU",
  "easy_spell": "LZDQ",
  "zipcode": "860100",
  "province_id": "26" },

{
  "city_id": "288",
  "city_name": "西安市",
  "spell": "XIANSHI",
  "easy_spell": "XAS",
  "zipcode": "710000",
  "province_id": "27" },

{
  "city_id": "289",
  "city_name": "铜川市",
  "spell": "TONGCHUANSHI",
  "easy_spell": "TCS",
  "zipcode": "727000",
  "province_id": "27" },

{
  "city_id": "290",
  "city_name": "宝鸡市",
  "spell": "BAOJISHI",
  "easy_spell": "BJS",
  "zipcode": "721000",
  "province_id": "27" },

{
  "city_id": "291",
  "city_name": "咸阳市",
  "spell": "XIANYANGSHI",
  "easy_spell": "XYS",
  "zipcode": "712000",
  "province_id": "27" },

{
  "city_id": "292",
  "city_name": "渭南市",
  "spell": "WEINANSHI",
  "easy_spell": "WNS",
  "zipcode": "714000",
  "province_id": "27" },

{
  "city_id": "293",
  "city_name": "延安市",
  "spell": "YANANSHI",
  "easy_spell": "YAS",
  "zipcode": "716000",
  "province_id": "27" },

{
  "city_id": "294",
  "city_name": "汉中市",
  "spell": "HANZHONGSHI",
  "easy_spell": "HZS",
  "zipcode": "723000",
  "province_id": "27" },

{
  "city_id": "295",
  "city_name": "榆林市",
  "spell": "YULINSHI",
  "easy_spell": "YLS",
  "zipcode": "719000",
  "province_id": "27" },

{
  "city_id": "296",
  "city_name": "安康市",
  "spell": "ANKANGSHI",
  "easy_spell": "AKS",
  "zipcode": "725000",
  "province_id": "27" },

{
  "city_id": "297",
  "city_name": "商洛市",
  "spell": "SHANGLUOSHI",
  "easy_spell": "SLS",
  "zipcode": "711500",
  "province_id": "27" },

{
  "city_id": "298",
  "city_name": "兰州市",
  "spell": "LANZHOUSHI",
  "easy_spell": "LZS",
  "zipcode": "730000",
  "province_id": "28" },

{
  "city_id": "299",
  "city_name": "嘉峪关市",
  "spell": "JIAYUGUANSHI",
  "easy_spell": "JYGS",
  "zipcode": "735100",
  "province_id": "28" },

{
  "city_id": "300",
  "city_name": "金昌市",
  "spell": "JINCHANGSHI",
  "easy_spell": "JCS",
  "zipcode": "737100",
  "province_id": "28" },

{
  "city_id": "301",
  "city_name": "白银市",
  "spell": "BAIYINSHI",
  "easy_spell": "BYS",
  "zipcode": "730900",
  "province_id": "28" },

{
  "city_id": "302",
  "city_name": "天水市",
  "spell": "TIANSHUISHI",
  "easy_spell": "TSS",
  "zipcode": "741000",
  "province_id": "28" },

{
  "city_id": "303",
  "city_name": "武威市",
  "spell": "WUWEISHI",
  "easy_spell": "WWS",
  "zipcode": "733000",
  "province_id": "28" },

{
  "city_id": "304",
  "city_name": "张掖市",
  "spell": "ZHANGYESHI",
  "easy_spell": "ZYS",
  "zipcode": "734000",
  "province_id": "28" },

{
  "city_id": "305",
  "city_name": "平凉市",
  "spell": "PINGLIANGSHI",
  "easy_spell": "PLS",
  "zipcode": "744000",
  "province_id": "28" },

{
  "city_id": "306",
  "city_name": "酒泉市",
  "spell": "JIUQUANSHI",
  "easy_spell": "JQS",
  "zipcode": "735000",
  "province_id": "28" },

{
  "city_id": "307",
  "city_name": "庆阳市",
  "spell": "QINGYANGSHI",
  "easy_spell": "QYS",
  "zipcode": "744500",
  "province_id": "28" },

{
  "city_id": "308",
  "city_name": "定西市",
  "spell": "DINGXISHI",
  "easy_spell": "DXS",
  "zipcode": "743000",
  "province_id": "28" },

{
  "city_id": "309",
  "city_name": "陇南市",
  "spell": "LONGNANSHI",
  "easy_spell": "LNS",
  "zipcode": "742100",
  "province_id": "28" },

{
  "city_id": "310",
  "city_name": "临夏回族自治州",
  "spell": "LINXIAHUIZUZIZHIZHOU",
  "easy_spell": "LXHZZZZ",
  "zipcode": "731100",
  "province_id": "28" },

{
  "city_id": "311",
  "city_name": "甘南藏族自治州",
  "spell": "GANNANCANGZUZIZHIZHOU",
  "easy_spell": "GNCZZZZ",
  "zipcode": "747000",
  "province_id": "28" },

{
  "city_id": "312",
  "city_name": "西宁市",
  "spell": "XININGSHI",
  "easy_spell": "XNS",
  "zipcode": "810000",
  "province_id": "29" },

{
  "city_id": "313",
  "city_name": "海东地区",
  "spell": "HAIDONGDIQU",
  "easy_spell": "HDDQ",
  "zipcode": "810600",
  "province_id": "29" },

{
  "city_id": "314",
  "city_name": "海北藏族自治州",
  "spell": "HAIBEICANGZUZIZHIZHOU",
  "easy_spell": "HBCZZZZ",
  "zipcode": "810300",
  "province_id": "29" },

{
  "city_id": "315",
  "city_name": "黄南藏族自治州",
  "spell": "HUANGNANCANGZUZIZHIZHOU",
  "easy_spell": "HNCZZZZ",
  "zipcode": "811300",
  "province_id": "29" },

{
  "city_id": "316",
  "city_name": "海南藏族自治州",
  "spell": "HAINANCANGZUZIZHIZHOU",
  "easy_spell": "HNCZZZZ",
  "zipcode": "813000",
  "province_id": "29" },

{
  "city_id": "317",
  "city_name": "果洛藏族自治州",
  "spell": "GUOLUOCANGZUZIZHIZHOU",
  "easy_spell": "GLCZZZZ",
  "zipcode": "814000",
  "province_id": "29" },

{
  "city_id": "318",
  "city_name": "玉树藏族自治州",
  "spell": "YUSHUCANGZUZIZHIZHOU",
  "easy_spell": "YSCZZZZ",
  "zipcode": "815000",
  "province_id": "29" },

{
  "city_id": "319",
  "city_name": "海西蒙古族藏族自治州",
  "spell": "HAIXIMENGGUZUCANGZUZIZHIZHOU",
  "easy_spell": "HXMGZCZZZZ",
  "zipcode": "817000",
  "province_id": "29" },

{
  "city_id": "320",
  "city_name": "银川市",
  "spell": "YINCHUANSHI",
  "easy_spell": "YCS",
  "zipcode": "750000",
  "province_id": "30" },

{
  "city_id": "321",
  "city_name": "石嘴山市",
  "spell": "SHIZUISHANSHI",
  "easy_spell": "SZSS",
  "zipcode": "753000",
  "province_id": "30" },

{
  "city_id": "322",
  "city_name": "吴忠市",
  "spell": "WUZHONGSHI",
  "easy_spell": "WZS",
  "zipcode": "751100",
  "province_id": "30" },

{
  "city_id": "323",
  "city_name": "固原市",
  "spell": "GUYUANSHI",
  "easy_spell": "GYS",
  "zipcode": "756000",
  "province_id": "30" },

{
  "city_id": "324",
  "city_name": "中卫市",
  "spell": "ZHONGWEISHI",
  "easy_spell": "ZWS",
  "zipcode": "751700",
  "province_id": "30" },

{
  "city_id": "325",
  "city_name": "乌鲁木齐市",
  "spell": "WULUMUQISHI",
  "easy_spell": "WLMQS",
  "zipcode": "830000",
  "province_id": "31" },

{
  "city_id": "326",
  "city_name": "克拉玛依市",
  "spell": "KELAMAYISHI",
  "easy_spell": "KLMYS",
  "zipcode": "834000",
  "province_id": "31" },

{
  "city_id": "327",
  "city_name": "吐鲁番地区",
  "spell": "TULUFANDIQU",
  "easy_spell": "TLFDQ",
  "zipcode": "838000",
  "province_id": "31" },

{
  "city_id": "328",
  "city_name": "哈密地区",
  "spell": "HAMIDIQU",
  "easy_spell": "HMDQ",
  "zipcode": "839000",
  "province_id": "31" },

{
  "city_id": "329",
  "city_name": "昌吉回族自治州",
  "spell": "CHANGJIHUIZUZIZHIZHOU",
  "easy_spell": "CJHZZZZ",
  "zipcode": "831100",
  "province_id": "31" },

{
  "city_id": "330",
  "city_name": "博尔塔拉蒙古自治州",
  "spell": "BOERTALAMENGGUZIZHIZHOU",
  "easy_spell": "BETLMGZZZ",
  "zipcode": "833400",
  "province_id": "31" },

{
  "city_id": "331",
  "city_name": "巴音郭楞蒙古自治州",
  "spell": "BAYINGUOLENGMENGGUZIZHIZHOU",
  "easy_spell": "BYGLMGZZZ",
  "zipcode": "841000",
  "province_id": "31" },

{
  "city_id": "332",
  "city_name": "阿克苏地区",
  "spell": "AKESUDIQU",
  "easy_spell": "AKSDQ",
  "zipcode": "843000",
  "province_id": "31" },

{
  "city_id": "333",
  "city_name": "克孜勒苏柯尔克孜自治州",
  "spell": "KEZILESUKEERKEZIZIZHIZHOU",
  "easy_spell": "KZLSKEKZZZZ",
  "zipcode": "835600",
  "province_id": "31" },

{
  "city_id": "334",
  "city_name": "喀什地区",
  "spell": "KASHIDIQU",
  "easy_spell": "KSDQ",
  "zipcode": "844000",
  "province_id": "31" },

{
  "city_id": "335",
  "city_name": "和田地区",
  "spell": "HETIANDIQU",
  "easy_spell": "HTDQ",
  "zipcode": "848000",
  "province_id": "31" },

{
  "city_id": "336",
  "city_name": "伊犁哈萨克自治州",
  "spell": "YILIHASAKEZIZHIZHOU",
  "easy_spell": "YLHSKZZZ",
  "zipcode": "833200",
  "province_id": "31" },

{
  "city_id": "337",
  "city_name": "塔城地区",
  "spell": "TACHENGDIQU",
  "easy_spell": "TCDQ",
  "zipcode": "834700",
  "province_id": "31" },

{
  "city_id": "338",
  "city_name": "阿勒泰地区",
  "spell": "ALETAIDIQU",
  "easy_spell": "ALTDQ",
  "zipcode": "836500",
  "province_id": "31" },

{
  "city_id": "339",
  "city_name": "石河子市",
  "spell": "SHIHEZISHI",
  "easy_spell": "SHZS",
  "zipcode": "832000",
  "province_id": "31" },

{
  "city_id": "340",
  "city_name": "阿拉尔市",
  "spell": "ALAERSHI",
  "easy_spell": "ALES",
  "zipcode": "843300",
  "province_id": "31" },

{
  "city_id": "341",
  "city_name": "图木舒克市",
  "spell": "TUMUSHUKESHI",
  "easy_spell": "TMSKS",
  "zipcode": "843900",
  "province_id": "31" },

{
  "city_id": "342",
  "city_name": "五家渠市",
  "spell": "WUJIAQUSHI",
  "easy_spell": "WJQS",
  "zipcode": "831300",
  "province_id": "31" },

{
  "city_id": "343",
  "city_name": "香港",
  "spell": "XIANGGANGTEBIEXINGZHENGQU",
  "easy_spell": "XGTBXZQ",
  "zipcode": "000000",
  "province_id": "32" },

{
  "city_id": "344",
  "city_name": "澳门",
  "spell": "AOMENTEBIEXINGZHENGQU",
  "easy_spell": "AMTBXZQ",
  "zipcode": "000000",
  "province_id": "33" },

{
  "city_id": "345",
  "city_name": "台湾",
  "spell": "TAIWANSHENG",
  "easy_spell": "TWS",
  "zipcode": "000000",
  "province_id": "34" }];


module.exports = data;

/***/ }),

/***/ 11:
/*!**********************************************************!*\
  !*** D:/Project/Tiktok/tiktok-app/json/area_district.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var data = [
{
  "district_id": "1",
  "district_name": "东城区",
  "spell": "dongchengqu",
  "easy_spell": "dcq",
  "city_id": "1" },

{
  "district_id": "2",
  "district_name": "西城区",
  "spell": "xichengqu",
  "easy_spell": "xcq",
  "city_id": "1" },

{
  "district_id": "3",
  "district_name": "崇文区",
  "spell": "chongwenqu",
  "easy_spell": "cwq",
  "city_id": "1" },

{
  "district_id": "4",
  "district_name": "宣武区",
  "spell": "xuanwuqu",
  "easy_spell": "xwq",
  "city_id": "1" },

{
  "district_id": "5",
  "district_name": "朝阳区",
  "spell": "chaoyangqu",
  "easy_spell": "cyq",
  "city_id": "1" },

{
  "district_id": "6",
  "district_name": "丰台区",
  "spell": "fengtaiqu",
  "easy_spell": "ftq",
  "city_id": "1" },

{
  "district_id": "7",
  "district_name": "石景山区",
  "spell": "shijingshanqu",
  "easy_spell": "sjsq",
  "city_id": "1" },

{
  "district_id": "8",
  "district_name": "海淀区",
  "spell": "haidianqu",
  "easy_spell": "hdq",
  "city_id": "1" },

{
  "district_id": "9",
  "district_name": "门头沟区",
  "spell": "mentougouqu",
  "easy_spell": "mtgq",
  "city_id": "1" },

{
  "district_id": "10",
  "district_name": "房山区",
  "spell": "fangshanqu",
  "easy_spell": "fsq",
  "city_id": "1" },

{
  "district_id": "11",
  "district_name": "通州区",
  "spell": "tongzhouqu",
  "easy_spell": "tzq",
  "city_id": "1" },

{
  "district_id": "12",
  "district_name": "顺义区",
  "spell": "shunyiqu",
  "easy_spell": "syq",
  "city_id": "1" },

{
  "district_id": "13",
  "district_name": "昌平区",
  "spell": "changpingqu",
  "easy_spell": "cpq",
  "city_id": "1" },

{
  "district_id": "14",
  "district_name": "大兴区",
  "spell": "daxingqu",
  "easy_spell": "dxq",
  "city_id": "1" },

{
  "district_id": "15",
  "district_name": "怀柔区",
  "spell": "huairouqu",
  "easy_spell": "hrq",
  "city_id": "1" },

{
  "district_id": "16",
  "district_name": "平谷区",
  "spell": "pingguqu",
  "easy_spell": "pgq",
  "city_id": "1" },

{
  "district_id": "17",
  "district_name": "密云县",
  "spell": "miyunxian",
  "easy_spell": "myx",
  "city_id": "1" },

{
  "district_id": "18",
  "district_name": "延庆县",
  "spell": "yanqingxian",
  "easy_spell": "yqx",
  "city_id": "1" },

{
  "district_id": "19",
  "district_name": "和平区",
  "spell": "hepingqu",
  "easy_spell": "hpq",
  "city_id": "2" },

{
  "district_id": "20",
  "district_name": "河东区",
  "spell": "hedongqu",
  "easy_spell": "hdq",
  "city_id": "2" },

{
  "district_id": "21",
  "district_name": "河西区",
  "spell": "hexiqu",
  "easy_spell": "hxq",
  "city_id": "2" },

{
  "district_id": "22",
  "district_name": "南开区",
  "spell": "nankaiqu",
  "easy_spell": "nkq",
  "city_id": "2" },

{
  "district_id": "23",
  "district_name": "河北区",
  "spell": "hebeiqu",
  "easy_spell": "hbq",
  "city_id": "2" },

{
  "district_id": "24",
  "district_name": "红桥区",
  "spell": "hongqiaoqu",
  "easy_spell": "hqq",
  "city_id": "2" },

{
  "district_id": "25",
  "district_name": "塘沽区",
  "spell": "tangguqu",
  "easy_spell": "tgq",
  "city_id": "2" },

{
  "district_id": "26",
  "district_name": "汉沽区",
  "spell": "hanguqu",
  "easy_spell": "hgq",
  "city_id": "2" },

{
  "district_id": "27",
  "district_name": "大港区",
  "spell": "dagangqu",
  "easy_spell": "dgq",
  "city_id": "2" },

{
  "district_id": "28",
  "district_name": "东丽区",
  "spell": "dongliqu",
  "easy_spell": "dlq",
  "city_id": "2" },

{
  "district_id": "29",
  "district_name": "西青区",
  "spell": "xiqingqu",
  "easy_spell": "xqq",
  "city_id": "2" },

{
  "district_id": "30",
  "district_name": "津南区",
  "spell": "jinnanqu",
  "easy_spell": "jnq",
  "city_id": "2" },

{
  "district_id": "31",
  "district_name": "北辰区",
  "spell": "beichenqu",
  "easy_spell": "bcq",
  "city_id": "2" },

{
  "district_id": "32",
  "district_name": "武清区",
  "spell": "wuqingqu",
  "easy_spell": "wqq",
  "city_id": "2" },

{
  "district_id": "33",
  "district_name": "宝坻区",
  "spell": "baozuoqu",
  "easy_spell": "bzq",
  "city_id": "2" },

{
  "district_id": "34",
  "district_name": "宁河县",
  "spell": "ninghexian",
  "easy_spell": "nhx",
  "city_id": "2" },

{
  "district_id": "35",
  "district_name": "静海县",
  "spell": "jinghaixian",
  "easy_spell": "jhx",
  "city_id": "2" },

{
  "district_id": "36",
  "district_name": "蓟县",
  "spell": "jixian",
  "easy_spell": "jx",
  "city_id": "2" },

{
  "district_id": "37",
  "district_name": "长安区",
  "spell": "changanqu",
  "easy_spell": "caq",
  "city_id": "3" },

{
  "district_id": "38",
  "district_name": "桥东区",
  "spell": "qiaodongqu",
  "easy_spell": "qdq",
  "city_id": "3" },

{
  "district_id": "39",
  "district_name": "桥西区",
  "spell": "qiaoxiqu",
  "easy_spell": "qxq",
  "city_id": "3" },

{
  "district_id": "40",
  "district_name": "新华区",
  "spell": "xinhuaqu",
  "easy_spell": "xhq",
  "city_id": "3" },

{
  "district_id": "41",
  "district_name": "井陉矿区",
  "spell": "jingzuokuangqu",
  "easy_spell": "jzkq",
  "city_id": "3" },

{
  "district_id": "42",
  "district_name": "裕华区",
  "spell": "yuhuaqu",
  "easy_spell": "yhq",
  "city_id": "3" },

{
  "district_id": "43",
  "district_name": "井陉县",
  "spell": "jingzuoxian",
  "easy_spell": "jzx",
  "city_id": "3" },

{
  "district_id": "44",
  "district_name": "正定县",
  "spell": "zhengdingxian",
  "easy_spell": "zdx",
  "city_id": "3" },

{
  "district_id": "45",
  "district_name": "栾城县",
  "spell": "zuochengxian",
  "easy_spell": "zcx",
  "city_id": "3" },

{
  "district_id": "46",
  "district_name": "行唐县",
  "spell": "xingtangxian",
  "easy_spell": "xtx",
  "city_id": "3" },

{
  "district_id": "47",
  "district_name": "灵寿县",
  "spell": "lingshouxian",
  "easy_spell": "lsx",
  "city_id": "3" },

{
  "district_id": "48",
  "district_name": "高邑县",
  "spell": "gaoyixian",
  "easy_spell": "gyx",
  "city_id": "3" },

{
  "district_id": "49",
  "district_name": "深泽县",
  "spell": "shenzexian",
  "easy_spell": "szx",
  "city_id": "3" },

{
  "district_id": "50",
  "district_name": "赞皇县",
  "spell": "zanhuangxian",
  "easy_spell": "zhx",
  "city_id": "3" },

{
  "district_id": "51",
  "district_name": "无极县",
  "spell": "wujixian",
  "easy_spell": "wjx",
  "city_id": "3" },

{
  "district_id": "52",
  "district_name": "平山县",
  "spell": "pingshanxian",
  "easy_spell": "psx",
  "city_id": "3" },

{
  "district_id": "53",
  "district_name": "元氏县",
  "spell": "yuanshixian",
  "easy_spell": "ysx",
  "city_id": "3" },

{
  "district_id": "54",
  "district_name": "赵县",
  "spell": "zhaoxian",
  "easy_spell": "zx",
  "city_id": "3" },

{
  "district_id": "55",
  "district_name": "辛集市",
  "spell": "xinjishi",
  "easy_spell": "xjs",
  "city_id": "3" },

{
  "district_id": "56",
  "district_name": "藁城市",
  "spell": "zuochengshi",
  "easy_spell": "zcs",
  "city_id": "3" },

{
  "district_id": "57",
  "district_name": "晋州市",
  "spell": "jinzhoushi",
  "easy_spell": "jzs",
  "city_id": "3" },

{
  "district_id": "58",
  "district_name": "新乐市",
  "spell": "xinleshi",
  "easy_spell": "xls",
  "city_id": "3" },

{
  "district_id": "59",
  "district_name": "鹿泉市",
  "spell": "luquanshi",
  "easy_spell": "lqs",
  "city_id": "3" },

{
  "district_id": "60",
  "district_name": "路南区",
  "spell": "lunanqu",
  "easy_spell": "lnq",
  "city_id": "4" },

{
  "district_id": "61",
  "district_name": "路北区",
  "spell": "lubeiqu",
  "easy_spell": "lbq",
  "city_id": "4" },

{
  "district_id": "62",
  "district_name": "古冶区",
  "spell": "guyequ",
  "easy_spell": "gyq",
  "city_id": "4" },

{
  "district_id": "63",
  "district_name": "开平区",
  "spell": "kaipingqu",
  "easy_spell": "kpq",
  "city_id": "4" },

{
  "district_id": "64",
  "district_name": "丰南区",
  "spell": "fengnanqu",
  "easy_spell": "fnq",
  "city_id": "4" },

{
  "district_id": "65",
  "district_name": "丰润区",
  "spell": "fengrunqu",
  "easy_spell": "frq",
  "city_id": "4" },

{
  "district_id": "66",
  "district_name": "滦县",
  "spell": "luanxian",
  "easy_spell": "lx",
  "city_id": "4" },

{
  "district_id": "67",
  "district_name": "滦南县",
  "spell": "luannanxian",
  "easy_spell": "lnx",
  "city_id": "4" },

{
  "district_id": "68",
  "district_name": "乐亭县",
  "spell": "letingxian",
  "easy_spell": "ltx",
  "city_id": "4" },

{
  "district_id": "69",
  "district_name": "迁西县",
  "spell": "qianxixian",
  "easy_spell": "qxx",
  "city_id": "4" },

{
  "district_id": "70",
  "district_name": "玉田县",
  "spell": "yutianxian",
  "easy_spell": "ytx",
  "city_id": "4" },

{
  "district_id": "71",
  "district_name": "唐海县",
  "spell": "tanghaixian",
  "easy_spell": "thx",
  "city_id": "4" },

{
  "district_id": "72",
  "district_name": "遵化市",
  "spell": "zunhuashi",
  "easy_spell": "zhs",
  "city_id": "4" },

{
  "district_id": "73",
  "district_name": "迁安市",
  "spell": "qiananshi",
  "easy_spell": "qas",
  "city_id": "4" },

{
  "district_id": "74",
  "district_name": "海港区",
  "spell": "haigangqu",
  "easy_spell": "hgq",
  "city_id": "5" },

{
  "district_id": "75",
  "district_name": "山海关区",
  "spell": "shanhaiguanqu",
  "easy_spell": "shgq",
  "city_id": "5" },

{
  "district_id": "76",
  "district_name": "北戴河区",
  "spell": "beidaihequ",
  "easy_spell": "bdhq",
  "city_id": "5" },

{
  "district_id": "77",
  "district_name": "青龙满族自治县",
  "spell": "qinglongmanzuzizhixian",
  "easy_spell": "qlmzzzx",
  "city_id": "5" },

{
  "district_id": "78",
  "district_name": "昌黎县",
  "spell": "changlixian",
  "easy_spell": "clx",
  "city_id": "5" },

{
  "district_id": "79",
  "district_name": "抚宁县",
  "spell": "funingxian",
  "easy_spell": "fnx",
  "city_id": "5" },

{
  "district_id": "80",
  "district_name": "卢龙县",
  "spell": "lulongxian",
  "easy_spell": "llx",
  "city_id": "5" },

{
  "district_id": "81",
  "district_name": "邯山区",
  "spell": "hanshanqu",
  "easy_spell": "hsq",
  "city_id": "6" },

{
  "district_id": "82",
  "district_name": "丛台区",
  "spell": "congtaiqu",
  "easy_spell": "ctq",
  "city_id": "6" },

{
  "district_id": "83",
  "district_name": "复兴区",
  "spell": "fuxingqu",
  "easy_spell": "fxq",
  "city_id": "6" },

{
  "district_id": "84",
  "district_name": "峰峰矿区",
  "spell": "fengfengkuangqu",
  "easy_spell": "ffkq",
  "city_id": "6" },

{
  "district_id": "85",
  "district_name": "邯郸县",
  "spell": "handanxian",
  "easy_spell": "hdx",
  "city_id": "6" },

{
  "district_id": "86",
  "district_name": "临漳县",
  "spell": "linzhangxian",
  "easy_spell": "lzx",
  "city_id": "6" },

{
  "district_id": "87",
  "district_name": "成安县",
  "spell": "chenganxian",
  "easy_spell": "cax",
  "city_id": "6" },

{
  "district_id": "88",
  "district_name": "大名县",
  "spell": "damingxian",
  "easy_spell": "dmx",
  "city_id": "6" },

{
  "district_id": "89",
  "district_name": "涉县",
  "spell": "shexian",
  "easy_spell": "sx",
  "city_id": "6" },

{
  "district_id": "90",
  "district_name": "磁县",
  "spell": "cixian",
  "easy_spell": "cx",
  "city_id": "6" },

{
  "district_id": "91",
  "district_name": "肥乡县",
  "spell": "feixiangxian",
  "easy_spell": "fxx",
  "city_id": "6" },

{
  "district_id": "92",
  "district_name": "永年县",
  "spell": "yongnianxian",
  "easy_spell": "ynx",
  "city_id": "6" },

{
  "district_id": "93",
  "district_name": "邱县",
  "spell": "qiuxian",
  "easy_spell": "qx",
  "city_id": "6" },

{
  "district_id": "94",
  "district_name": "鸡泽县",
  "spell": "jizexian",
  "easy_spell": "jzx",
  "city_id": "6" },

{
  "district_id": "95",
  "district_name": "广平县",
  "spell": "guangpingxian",
  "easy_spell": "gpx",
  "city_id": "6" },

{
  "district_id": "96",
  "district_name": "馆陶县",
  "spell": "guantaoxian",
  "easy_spell": "gtx",
  "city_id": "6" },

{
  "district_id": "97",
  "district_name": "魏县",
  "spell": "weixian",
  "easy_spell": "wx",
  "city_id": "6" },

{
  "district_id": "98",
  "district_name": "曲周县",
  "spell": "quzhouxian",
  "easy_spell": "qzx",
  "city_id": "6" },

{
  "district_id": "99",
  "district_name": "武安市",
  "spell": "wuanshi",
  "easy_spell": "was",
  "city_id": "6" },

{
  "district_id": "100",
  "district_name": "桥东区",
  "spell": "qiaodongqu",
  "easy_spell": "qdq",
  "city_id": "7" },

{
  "district_id": "101",
  "district_name": "桥西区",
  "spell": "qiaoxiqu",
  "easy_spell": "qxq",
  "city_id": "7" },

{
  "district_id": "102",
  "district_name": "邢台县",
  "spell": "xingtaixian",
  "easy_spell": "xtx",
  "city_id": "7" },

{
  "district_id": "103",
  "district_name": "临城县",
  "spell": "linchengxian",
  "easy_spell": "lcx",
  "city_id": "7" },

{
  "district_id": "104",
  "district_name": "内丘县",
  "spell": "neiqiuxian",
  "easy_spell": "nqx",
  "city_id": "7" },

{
  "district_id": "105",
  "district_name": "柏乡县",
  "spell": "baixiangxian",
  "easy_spell": "bxx",
  "city_id": "7" },

{
  "district_id": "106",
  "district_name": "隆尧县",
  "spell": "longyaoxian",
  "easy_spell": "lyx",
  "city_id": "7" },

{
  "district_id": "107",
  "district_name": "任县",
  "spell": "renxian",
  "easy_spell": "rx",
  "city_id": "7" },

{
  "district_id": "108",
  "district_name": "南和县",
  "spell": "nanhexian",
  "easy_spell": "nhx",
  "city_id": "7" },

{
  "district_id": "109",
  "district_name": "宁晋县",
  "spell": "ningjinxian",
  "easy_spell": "njx",
  "city_id": "7" },

{
  "district_id": "110",
  "district_name": "巨鹿县",
  "spell": "juluxian",
  "easy_spell": "jlx",
  "city_id": "7" },

{
  "district_id": "111",
  "district_name": "新河县",
  "spell": "xinhexian",
  "easy_spell": "xhx",
  "city_id": "7" },

{
  "district_id": "112",
  "district_name": "广宗县",
  "spell": "guangzongxian",
  "easy_spell": "gzx",
  "city_id": "7" },

{
  "district_id": "113",
  "district_name": "平乡县",
  "spell": "pingxiangxian",
  "easy_spell": "pxx",
  "city_id": "7" },

{
  "district_id": "114",
  "district_name": "威县",
  "spell": "weixian",
  "easy_spell": "wx",
  "city_id": "7" },

{
  "district_id": "115",
  "district_name": "清河县",
  "spell": "qinghexian",
  "easy_spell": "qhx",
  "city_id": "7" },

{
  "district_id": "116",
  "district_name": "临西县",
  "spell": "linxixian",
  "easy_spell": "lxx",
  "city_id": "7" },

{
  "district_id": "117",
  "district_name": "南宫市",
  "spell": "nangongshi",
  "easy_spell": "ngs",
  "city_id": "7" },

{
  "district_id": "118",
  "district_name": "沙河市",
  "spell": "shaheshi",
  "easy_spell": "shs",
  "city_id": "7" },

{
  "district_id": "119",
  "district_name": "新市区",
  "spell": "xinshiqu",
  "easy_spell": "xsq",
  "city_id": "8" },

{
  "district_id": "120",
  "district_name": "北市区",
  "spell": "beishiqu",
  "easy_spell": "bsq",
  "city_id": "8" },

{
  "district_id": "121",
  "district_name": "南市区",
  "spell": "nanshiqu",
  "easy_spell": "nsq",
  "city_id": "8" },

{
  "district_id": "122",
  "district_name": "满城县",
  "spell": "manchengxian",
  "easy_spell": "mcx",
  "city_id": "8" },

{
  "district_id": "123",
  "district_name": "清苑县",
  "spell": "qingyuanxian",
  "easy_spell": "qyx",
  "city_id": "8" },

{
  "district_id": "124",
  "district_name": "涞水县",
  "spell": "zuoshuixian",
  "easy_spell": "zsx",
  "city_id": "8" },

{
  "district_id": "125",
  "district_name": "阜平县",
  "spell": "fupingxian",
  "easy_spell": "fpx",
  "city_id": "8" },

{
  "district_id": "126",
  "district_name": "徐水县",
  "spell": "xushuixian",
  "easy_spell": "xsx",
  "city_id": "8" },

{
  "district_id": "127",
  "district_name": "定兴县",
  "spell": "dingxingxian",
  "easy_spell": "dxx",
  "city_id": "8" },

{
  "district_id": "128",
  "district_name": "唐县",
  "spell": "tangxian",
  "easy_spell": "tx",
  "city_id": "8" },

{
  "district_id": "129",
  "district_name": "高阳县",
  "spell": "gaoyangxian",
  "easy_spell": "gyx",
  "city_id": "8" },

{
  "district_id": "130",
  "district_name": "容城县",
  "spell": "rongchengxian",
  "easy_spell": "rcx",
  "city_id": "8" },

{
  "district_id": "131",
  "district_name": "涞源县",
  "spell": "zuoyuanxian",
  "easy_spell": "zyx",
  "city_id": "8" },

{
  "district_id": "132",
  "district_name": "望都县",
  "spell": "wangduxian",
  "easy_spell": "wdx",
  "city_id": "8" },

{
  "district_id": "133",
  "district_name": "安新县",
  "spell": "anxinxian",
  "easy_spell": "axx",
  "city_id": "8" },

{
  "district_id": "134",
  "district_name": "易县",
  "spell": "yixian",
  "easy_spell": "yx",
  "city_id": "8" },

{
  "district_id": "135",
  "district_name": "曲阳县",
  "spell": "quyangxian",
  "easy_spell": "qyx",
  "city_id": "8" },

{
  "district_id": "136",
  "district_name": "蠡县",
  "spell": "zuoxian",
  "easy_spell": "zx",
  "city_id": "8" },

{
  "district_id": "137",
  "district_name": "顺平县",
  "spell": "shunpingxian",
  "easy_spell": "spx",
  "city_id": "8" },

{
  "district_id": "138",
  "district_name": "博野县",
  "spell": "boyexian",
  "easy_spell": "byx",
  "city_id": "8" },

{
  "district_id": "139",
  "district_name": "雄县",
  "spell": "xiongxian",
  "easy_spell": "xx",
  "city_id": "8" },

{
  "district_id": "140",
  "district_name": "涿州市",
  "spell": "zuozhoushi",
  "easy_spell": "zzs",
  "city_id": "8" },

{
  "district_id": "141",
  "district_name": "定州市",
  "spell": "dingzhoushi",
  "easy_spell": "dzs",
  "city_id": "8" },

{
  "district_id": "142",
  "district_name": "安国市",
  "spell": "anguoshi",
  "easy_spell": "ags",
  "city_id": "8" },

{
  "district_id": "143",
  "district_name": "高碑店市",
  "spell": "gaobeidianshi",
  "easy_spell": "gbds",
  "city_id": "8" },

{
  "district_id": "144",
  "district_name": "桥东区",
  "spell": "qiaodongqu",
  "easy_spell": "qdq",
  "city_id": "9" },

{
  "district_id": "145",
  "district_name": "桥西区",
  "spell": "qiaoxiqu",
  "easy_spell": "qxq",
  "city_id": "9" },

{
  "district_id": "146",
  "district_name": "宣化区",
  "spell": "xuanhuaqu",
  "easy_spell": "xhq",
  "city_id": "9" },

{
  "district_id": "147",
  "district_name": "下花园区",
  "spell": "xiahuayuanqu",
  "easy_spell": "xhyq",
  "city_id": "9" },

{
  "district_id": "148",
  "district_name": "宣化县",
  "spell": "xuanhuaxian",
  "easy_spell": "xhx",
  "city_id": "9" },

{
  "district_id": "149",
  "district_name": "张北县",
  "spell": "zhangbeixian",
  "easy_spell": "zbx",
  "city_id": "9" },

{
  "district_id": "150",
  "district_name": "康保县",
  "spell": "kangbaoxian",
  "easy_spell": "kbx",
  "city_id": "9" },

{
  "district_id": "151",
  "district_name": "沽源县",
  "spell": "guyuanxian",
  "easy_spell": "gyx",
  "city_id": "9" },

{
  "district_id": "152",
  "district_name": "尚义县",
  "spell": "shangyixian",
  "easy_spell": "syx",
  "city_id": "9" },

{
  "district_id": "153",
  "district_name": "蔚县",
  "spell": "weixian",
  "easy_spell": "wx",
  "city_id": "9" },

{
  "district_id": "154",
  "district_name": "阳原县",
  "spell": "yangyuanxian",
  "easy_spell": "yyx",
  "city_id": "9" },

{
  "district_id": "155",
  "district_name": "怀安县",
  "spell": "huaianxian",
  "easy_spell": "hax",
  "city_id": "9" },

{
  "district_id": "156",
  "district_name": "万全县",
  "spell": "wanquanxian",
  "easy_spell": "wqx",
  "city_id": "9" },

{
  "district_id": "157",
  "district_name": "怀来县",
  "spell": "huailaixian",
  "easy_spell": "hlx",
  "city_id": "9" },

{
  "district_id": "158",
  "district_name": "涿鹿县",
  "spell": "zuoluxian",
  "easy_spell": "zlx",
  "city_id": "9" },

{
  "district_id": "159",
  "district_name": "赤城县",
  "spell": "chichengxian",
  "easy_spell": "ccx",
  "city_id": "9" },

{
  "district_id": "160",
  "district_name": "崇礼县",
  "spell": "chonglixian",
  "easy_spell": "clx",
  "city_id": "9" },

{
  "district_id": "161",
  "district_name": "双桥区",
  "spell": "shuangqiaoqu",
  "easy_spell": "sqq",
  "city_id": "10" },

{
  "district_id": "162",
  "district_name": "双滦区",
  "spell": "shuangluanqu",
  "easy_spell": "slq",
  "city_id": "10" },

{
  "district_id": "163",
  "district_name": "鹰手营子矿区",
  "spell": "yingshouyingzikuangqu",
  "easy_spell": "ysyzkq",
  "city_id": "10" },

{
  "district_id": "164",
  "district_name": "承德县",
  "spell": "chengdexian",
  "easy_spell": "cdx",
  "city_id": "10" },

{
  "district_id": "165",
  "district_name": "兴隆县",
  "spell": "xinglongxian",
  "easy_spell": "xlx",
  "city_id": "10" },

{
  "district_id": "166",
  "district_name": "平泉县",
  "spell": "pingquanxian",
  "easy_spell": "pqx",
  "city_id": "10" },

{
  "district_id": "167",
  "district_name": "滦平县",
  "spell": "luanpingxian",
  "easy_spell": "lpx",
  "city_id": "10" },

{
  "district_id": "168",
  "district_name": "隆化县",
  "spell": "longhuaxian",
  "easy_spell": "lhx",
  "city_id": "10" },

{
  "district_id": "169",
  "district_name": "丰宁满族自治县",
  "spell": "fengningmanzuzizhixian",
  "easy_spell": "fnmzzzx",
  "city_id": "10" },

{
  "district_id": "170",
  "district_name": "宽城满族自治县",
  "spell": "kuanchengmanzuzizhixian",
  "easy_spell": "kcmzzzx",
  "city_id": "10" },

{
  "district_id": "171",
  "district_name": "围场满族蒙古族自治县",
  "spell": "weichangmanzumengguzuzizhixian",
  "easy_spell": "wcmzmgzzzx",
  "city_id": "10" },

{
  "district_id": "172",
  "district_name": "新华区",
  "spell": "xinhuaqu",
  "easy_spell": "xhq",
  "city_id": "11" },

{
  "district_id": "173",
  "district_name": "运河区",
  "spell": "yunhequ",
  "easy_spell": "yhq",
  "city_id": "11" },

{
  "district_id": "174",
  "district_name": "沧县",
  "spell": "cangxian",
  "easy_spell": "cx",
  "city_id": "11" },

{
  "district_id": "175",
  "district_name": "青县",
  "spell": "qingxian",
  "easy_spell": "qx",
  "city_id": "11" },

{
  "district_id": "176",
  "district_name": "东光县",
  "spell": "dongguangxian",
  "easy_spell": "dgx",
  "city_id": "11" },

{
  "district_id": "177",
  "district_name": "海兴县",
  "spell": "haixingxian",
  "easy_spell": "hxx",
  "city_id": "11" },

{
  "district_id": "178",
  "district_name": "盐山县",
  "spell": "yanshanxian",
  "easy_spell": "ysx",
  "city_id": "11" },

{
  "district_id": "179",
  "district_name": "肃宁县",
  "spell": "suningxian",
  "easy_spell": "snx",
  "city_id": "11" },

{
  "district_id": "180",
  "district_name": "南皮县",
  "spell": "nanpixian",
  "easy_spell": "npx",
  "city_id": "11" },

{
  "district_id": "181",
  "district_name": "吴桥县",
  "spell": "wuqiaoxian",
  "easy_spell": "wqx",
  "city_id": "11" },

{
  "district_id": "182",
  "district_name": "献县",
  "spell": "xianxian",
  "easy_spell": "xx",
  "city_id": "11" },

{
  "district_id": "183",
  "district_name": "孟村回族自治县",
  "spell": "mengcunhuizuzizhixian",
  "easy_spell": "mchzzzx",
  "city_id": "11" },

{
  "district_id": "184",
  "district_name": "泊头市",
  "spell": "botoushi",
  "easy_spell": "bts",
  "city_id": "11" },

{
  "district_id": "185",
  "district_name": "任丘市",
  "spell": "renqiushi",
  "easy_spell": "rqs",
  "city_id": "11" },

{
  "district_id": "186",
  "district_name": "黄骅市",
  "spell": "huangzuoshi",
  "easy_spell": "hzs",
  "city_id": "11" },

{
  "district_id": "187",
  "district_name": "河间市",
  "spell": "hejianshi",
  "easy_spell": "hjs",
  "city_id": "11" },

{
  "district_id": "188",
  "district_name": "安次区",
  "spell": "anciqu",
  "easy_spell": "acq",
  "city_id": "12" },

{
  "district_id": "189",
  "district_name": "广阳区",
  "spell": "guangyangqu",
  "easy_spell": "gyq",
  "city_id": "12" },

{
  "district_id": "190",
  "district_name": "固安县",
  "spell": "guanxian",
  "easy_spell": "gax",
  "city_id": "12" },

{
  "district_id": "191",
  "district_name": "永清县",
  "spell": "yongqingxian",
  "easy_spell": "yqx",
  "city_id": "12" },

{
  "district_id": "192",
  "district_name": "香河县",
  "spell": "xianghexian",
  "easy_spell": "xhx",
  "city_id": "12" },

{
  "district_id": "193",
  "district_name": "大城县",
  "spell": "dachengxian",
  "easy_spell": "dcx",
  "city_id": "12" },

{
  "district_id": "194",
  "district_name": "文安县",
  "spell": "wenanxian",
  "easy_spell": "wax",
  "city_id": "12" },

{
  "district_id": "195",
  "district_name": "大厂回族自治县",
  "spell": "dachanghuizuzizhixian",
  "easy_spell": "dchzzzx",
  "city_id": "12" },

{
  "district_id": "196",
  "district_name": "霸州市",
  "spell": "bazhoushi",
  "easy_spell": "bzs",
  "city_id": "12" },

{
  "district_id": "197",
  "district_name": "三河市",
  "spell": "sanheshi",
  "easy_spell": "shs",
  "city_id": "12" },

{
  "district_id": "198",
  "district_name": "桃城区",
  "spell": "taochengqu",
  "easy_spell": "tcq",
  "city_id": "13" },

{
  "district_id": "199",
  "district_name": "枣强县",
  "spell": "zaoqiangxian",
  "easy_spell": "zqx",
  "city_id": "13" },

{
  "district_id": "200",
  "district_name": "武邑县",
  "spell": "wuyixian",
  "easy_spell": "wyx",
  "city_id": "13" },

{
  "district_id": "201",
  "district_name": "武强县",
  "spell": "wuqiangxian",
  "easy_spell": "wqx",
  "city_id": "13" },

{
  "district_id": "202",
  "district_name": "饶阳县",
  "spell": "raoyangxian",
  "easy_spell": "ryx",
  "city_id": "13" },

{
  "district_id": "203",
  "district_name": "安平县",
  "spell": "anpingxian",
  "easy_spell": "apx",
  "city_id": "13" },

{
  "district_id": "204",
  "district_name": "故城县",
  "spell": "guchengxian",
  "easy_spell": "gcx",
  "city_id": "13" },

{
  "district_id": "205",
  "district_name": "景县",
  "spell": "jingxian",
  "easy_spell": "jx",
  "city_id": "13" },

{
  "district_id": "206",
  "district_name": "阜城县",
  "spell": "fuchengxian",
  "easy_spell": "fcx",
  "city_id": "13" },

{
  "district_id": "207",
  "district_name": "冀州市",
  "spell": "jizhoushi",
  "easy_spell": "jzs",
  "city_id": "13" },

{
  "district_id": "208",
  "district_name": "深州市",
  "spell": "shenzhoushi",
  "easy_spell": "szs",
  "city_id": "13" },

{
  "district_id": "209",
  "district_name": "小店区",
  "spell": "xiaodianqu",
  "easy_spell": "xdq",
  "city_id": "14" },

{
  "district_id": "210",
  "district_name": "迎泽区",
  "spell": "yingzequ",
  "easy_spell": "yzq",
  "city_id": "14" },

{
  "district_id": "211",
  "district_name": "杏花岭区",
  "spell": "xinghualingqu",
  "easy_spell": "xhlq",
  "city_id": "14" },

{
  "district_id": "212",
  "district_name": "尖草坪区",
  "spell": "jiancaopingqu",
  "easy_spell": "jcpq",
  "city_id": "14" },

{
  "district_id": "213",
  "district_name": "万柏林区",
  "spell": "wanbailinqu",
  "easy_spell": "wblq",
  "city_id": "14" },

{
  "district_id": "214",
  "district_name": "晋源区",
  "spell": "jinyuanqu",
  "easy_spell": "jyq",
  "city_id": "14" },

{
  "district_id": "215",
  "district_name": "清徐县",
  "spell": "qingxuxian",
  "easy_spell": "qxx",
  "city_id": "14" },

{
  "district_id": "216",
  "district_name": "阳曲县",
  "spell": "yangquxian",
  "easy_spell": "yqx",
  "city_id": "14" },

{
  "district_id": "217",
  "district_name": "娄烦县",
  "spell": "loufanxian",
  "easy_spell": "lfx",
  "city_id": "14" },

{
  "district_id": "218",
  "district_name": "古交市",
  "spell": "gujiaoshi",
  "easy_spell": "gjs",
  "city_id": "14" },

{
  "district_id": "219",
  "district_name": "城区",
  "spell": "chengqu",
  "easy_spell": "cq",
  "city_id": "15" },

{
  "district_id": "220",
  "district_name": "矿区",
  "spell": "kuangqu",
  "easy_spell": "kq",
  "city_id": "15" },

{
  "district_id": "221",
  "district_name": "南郊区",
  "spell": "nanjiaoqu",
  "easy_spell": "njq",
  "city_id": "15" },

{
  "district_id": "222",
  "district_name": "新荣区",
  "spell": "xinrongqu",
  "easy_spell": "xrq",
  "city_id": "15" },

{
  "district_id": "223",
  "district_name": "阳高县",
  "spell": "yanggaoxian",
  "easy_spell": "ygx",
  "city_id": "15" },

{
  "district_id": "224",
  "district_name": "天镇县",
  "spell": "tianzhenxian",
  "easy_spell": "tzx",
  "city_id": "15" },

{
  "district_id": "225",
  "district_name": "广灵县",
  "spell": "guanglingxian",
  "easy_spell": "glx",
  "city_id": "15" },

{
  "district_id": "226",
  "district_name": "灵丘县",
  "spell": "lingqiuxian",
  "easy_spell": "lqx",
  "city_id": "15" },

{
  "district_id": "227",
  "district_name": "浑源县",
  "spell": "hunyuanxian",
  "easy_spell": "hyx",
  "city_id": "15" },

{
  "district_id": "228",
  "district_name": "左云县",
  "spell": "zuoyunxian",
  "easy_spell": "zyx",
  "city_id": "15" },

{
  "district_id": "229",
  "district_name": "大同县",
  "spell": "datongxian",
  "easy_spell": "dtx",
  "city_id": "15" },

{
  "district_id": "230",
  "district_name": "城区",
  "spell": "chengqu",
  "easy_spell": "cq",
  "city_id": "16" },

{
  "district_id": "231",
  "district_name": "矿区",
  "spell": "kuangqu",
  "easy_spell": "kq",
  "city_id": "16" },

{
  "district_id": "232",
  "district_name": "郊区",
  "spell": "jiaoqu",
  "easy_spell": "jq",
  "city_id": "16" },

{
  "district_id": "233",
  "district_name": "平定县",
  "spell": "pingdingxian",
  "easy_spell": "pdx",
  "city_id": "16" },

{
  "district_id": "234",
  "district_name": "盂县",
  "spell": "yuxian",
  "easy_spell": "yx",
  "city_id": "16" },

{
  "district_id": "235",
  "district_name": "城区",
  "spell": "chengqu",
  "easy_spell": "cq",
  "city_id": "17" },

{
  "district_id": "236",
  "district_name": "郊区",
  "spell": "jiaoqu",
  "easy_spell": "jq",
  "city_id": "17" },

{
  "district_id": "237",
  "district_name": "长治县",
  "spell": "changzhixian",
  "easy_spell": "czx",
  "city_id": "17" },

{
  "district_id": "238",
  "district_name": "襄垣县",
  "spell": "xiangyuanxian",
  "easy_spell": "xyx",
  "city_id": "17" },

{
  "district_id": "239",
  "district_name": "屯留县",
  "spell": "tunliuxian",
  "easy_spell": "tlx",
  "city_id": "17" },

{
  "district_id": "240",
  "district_name": "平顺县",
  "spell": "pingshunxian",
  "easy_spell": "psx",
  "city_id": "17" },

{
  "district_id": "241",
  "district_name": "黎城县",
  "spell": "lichengxian",
  "easy_spell": "lcx",
  "city_id": "17" },

{
  "district_id": "242",
  "district_name": "壶关县",
  "spell": "huguanxian",
  "easy_spell": "hgx",
  "city_id": "17" },

{
  "district_id": "243",
  "district_name": "长子县",
  "spell": "changzixian",
  "easy_spell": "czx",
  "city_id": "17" },

{
  "district_id": "244",
  "district_name": "武乡县",
  "spell": "wuxiangxian",
  "easy_spell": "wxx",
  "city_id": "17" },

{
  "district_id": "245",
  "district_name": "沁县",
  "spell": "qinxian",
  "easy_spell": "qx",
  "city_id": "17" },

{
  "district_id": "246",
  "district_name": "沁源县",
  "spell": "qinyuanxian",
  "easy_spell": "qyx",
  "city_id": "17" },

{
  "district_id": "247",
  "district_name": "潞城市",
  "spell": "luchengshi",
  "easy_spell": "lcs",
  "city_id": "17" },

{
  "district_id": "248",
  "district_name": "城区",
  "spell": "chengqu",
  "easy_spell": "cq",
  "city_id": "18" },

{
  "district_id": "249",
  "district_name": "沁水县",
  "spell": "qinshuixian",
  "easy_spell": "qsx",
  "city_id": "18" },

{
  "district_id": "250",
  "district_name": "阳城县",
  "spell": "yangchengxian",
  "easy_spell": "ycx",
  "city_id": "18" },

{
  "district_id": "251",
  "district_name": "陵川县",
  "spell": "lingchuanxian",
  "easy_spell": "lcx",
  "city_id": "18" },

{
  "district_id": "252",
  "district_name": "泽州县",
  "spell": "zezhouxian",
  "easy_spell": "zzx",
  "city_id": "18" },

{
  "district_id": "253",
  "district_name": "高平市",
  "spell": "gaopingshi",
  "easy_spell": "gps",
  "city_id": "18" },

{
  "district_id": "254",
  "district_name": "朔城区",
  "spell": "shuochengqu",
  "easy_spell": "scq",
  "city_id": "19" },

{
  "district_id": "255",
  "district_name": "平鲁区",
  "spell": "pingluqu",
  "easy_spell": "plq",
  "city_id": "19" },

{
  "district_id": "256",
  "district_name": "山阴县",
  "spell": "shanyinxian",
  "easy_spell": "syx",
  "city_id": "19" },

{
  "district_id": "257",
  "district_name": "应县",
  "spell": "yingxian",
  "easy_spell": "yx",
  "city_id": "19" },

{
  "district_id": "258",
  "district_name": "右玉县",
  "spell": "youyuxian",
  "easy_spell": "yyx",
  "city_id": "19" },

{
  "district_id": "259",
  "district_name": "怀仁县",
  "spell": "huairenxian",
  "easy_spell": "hrx",
  "city_id": "19" },

{
  "district_id": "260",
  "district_name": "榆次区",
  "spell": "yuciqu",
  "easy_spell": "ycq",
  "city_id": "20" },

{
  "district_id": "261",
  "district_name": "榆社县",
  "spell": "yushexian",
  "easy_spell": "ysx",
  "city_id": "20" },

{
  "district_id": "262",
  "district_name": "左权县",
  "spell": "zuoquanxian",
  "easy_spell": "zqx",
  "city_id": "20" },

{
  "district_id": "263",
  "district_name": "和顺县",
  "spell": "heshunxian",
  "easy_spell": "hsx",
  "city_id": "20" },

{
  "district_id": "264",
  "district_name": "昔阳县",
  "spell": "xiyangxian",
  "easy_spell": "xyx",
  "city_id": "20" },

{
  "district_id": "265",
  "district_name": "寿阳县",
  "spell": "shouyangxian",
  "easy_spell": "syx",
  "city_id": "20" },

{
  "district_id": "266",
  "district_name": "太谷县",
  "spell": "taiguxian",
  "easy_spell": "tgx",
  "city_id": "20" },

{
  "district_id": "267",
  "district_name": "祁县",
  "spell": "qixian",
  "easy_spell": "qx",
  "city_id": "20" },

{
  "district_id": "268",
  "district_name": "平遥县",
  "spell": "pingyaoxian",
  "easy_spell": "pyx",
  "city_id": "20" },

{
  "district_id": "269",
  "district_name": "灵石县",
  "spell": "lingshixian",
  "easy_spell": "lsx",
  "city_id": "20" },

{
  "district_id": "270",
  "district_name": "介休市",
  "spell": "jiexiushi",
  "easy_spell": "jxs",
  "city_id": "20" },

{
  "district_id": "271",
  "district_name": "盐湖区",
  "spell": "yanhuqu",
  "easy_spell": "yhq",
  "city_id": "21" },

{
  "district_id": "272",
  "district_name": "临猗县",
  "spell": "linzuoxian",
  "easy_spell": "lzx",
  "city_id": "21" },

{
  "district_id": "273",
  "district_name": "万荣县",
  "spell": "wanrongxian",
  "easy_spell": "wrx",
  "city_id": "21" },

{
  "district_id": "274",
  "district_name": "闻喜县",
  "spell": "wenxixian",
  "easy_spell": "wxx",
  "city_id": "21" },

{
  "district_id": "275",
  "district_name": "稷山县",
  "spell": "zuoshanxian",
  "easy_spell": "zsx",
  "city_id": "21" },

{
  "district_id": "276",
  "district_name": "新绛县",
  "spell": "xinzuoxian",
  "easy_spell": "xzx",
  "city_id": "21" },

{
  "district_id": "277",
  "district_name": "绛县",
  "spell": "zuoxian",
  "easy_spell": "zx",
  "city_id": "21" },

{
  "district_id": "278",
  "district_name": "垣曲县",
  "spell": "yuanquxian",
  "easy_spell": "yqx",
  "city_id": "21" },

{
  "district_id": "279",
  "district_name": "夏县",
  "spell": "xiaxian",
  "easy_spell": "xx",
  "city_id": "21" },

{
  "district_id": "280",
  "district_name": "平陆县",
  "spell": "pingluxian",
  "easy_spell": "plx",
  "city_id": "21" },

{
  "district_id": "281",
  "district_name": "芮城县",
  "spell": "zuochengxian",
  "easy_spell": "zcx",
  "city_id": "21" },

{
  "district_id": "282",
  "district_name": "永济市",
  "spell": "yongjishi",
  "easy_spell": "yjs",
  "city_id": "21" },

{
  "district_id": "283",
  "district_name": "河津市",
  "spell": "hejinshi",
  "easy_spell": "hjs",
  "city_id": "21" },

{
  "district_id": "284",
  "district_name": "忻府区",
  "spell": "xinfuqu",
  "easy_spell": "xfq",
  "city_id": "22" },

{
  "district_id": "285",
  "district_name": "定襄县",
  "spell": "dingxiangxian",
  "easy_spell": "dxx",
  "city_id": "22" },

{
  "district_id": "286",
  "district_name": "五台县",
  "spell": "wutaixian",
  "easy_spell": "wtx",
  "city_id": "22" },

{
  "district_id": "287",
  "district_name": "代县",
  "spell": "daixian",
  "easy_spell": "dx",
  "city_id": "22" },

{
  "district_id": "288",
  "district_name": "繁峙县",
  "spell": "fanzhixian",
  "easy_spell": "fzx",
  "city_id": "22" },

{
  "district_id": "289",
  "district_name": "宁武县",
  "spell": "ningwuxian",
  "easy_spell": "nwx",
  "city_id": "22" },

{
  "district_id": "290",
  "district_name": "静乐县",
  "spell": "jinglexian",
  "easy_spell": "jlx",
  "city_id": "22" },

{
  "district_id": "291",
  "district_name": "神池县",
  "spell": "shenchixian",
  "easy_spell": "scx",
  "city_id": "22" },

{
  "district_id": "292",
  "district_name": "五寨县",
  "spell": "wuzhaixian",
  "easy_spell": "wzx",
  "city_id": "22" },

{
  "district_id": "293",
  "district_name": "岢岚县",
  "spell": "zuozuoxian",
  "easy_spell": "zzx",
  "city_id": "22" },

{
  "district_id": "294",
  "district_name": "河曲县",
  "spell": "hequxian",
  "easy_spell": "hqx",
  "city_id": "22" },

{
  "district_id": "295",
  "district_name": "保德县",
  "spell": "baodexian",
  "easy_spell": "bdx",
  "city_id": "22" },

{
  "district_id": "296",
  "district_name": "偏关县",
  "spell": "pianguanxian",
  "easy_spell": "pgx",
  "city_id": "22" },

{
  "district_id": "297",
  "district_name": "原平市",
  "spell": "yuanpingshi",
  "easy_spell": "yps",
  "city_id": "22" },

{
  "district_id": "298",
  "district_name": "尧都区",
  "spell": "yaoduqu",
  "easy_spell": "ydq",
  "city_id": "23" },

{
  "district_id": "299",
  "district_name": "曲沃县",
  "spell": "quwoxian",
  "easy_spell": "qwx",
  "city_id": "23" },

{
  "district_id": "300",
  "district_name": "翼城县",
  "spell": "yichengxian",
  "easy_spell": "ycx",
  "city_id": "23" },

{
  "district_id": "301",
  "district_name": "襄汾县",
  "spell": "xiangfenxian",
  "easy_spell": "xfx",
  "city_id": "23" },

{
  "district_id": "302",
  "district_name": "洪洞县",
  "spell": "hongdongxian",
  "easy_spell": "hdx",
  "city_id": "23" },

{
  "district_id": "303",
  "district_name": "古县",
  "spell": "guxian",
  "easy_spell": "gx",
  "city_id": "23" },

{
  "district_id": "304",
  "district_name": "安泽县",
  "spell": "anzexian",
  "easy_spell": "azx",
  "city_id": "23" },

{
  "district_id": "305",
  "district_name": "浮山县",
  "spell": "fushanxian",
  "easy_spell": "fsx",
  "city_id": "23" },

{
  "district_id": "306",
  "district_name": "吉县",
  "spell": "jixian",
  "easy_spell": "jx",
  "city_id": "23" },

{
  "district_id": "307",
  "district_name": "乡宁县",
  "spell": "xiangningxian",
  "easy_spell": "xnx",
  "city_id": "23" },

{
  "district_id": "308",
  "district_name": "大宁县",
  "spell": "daningxian",
  "easy_spell": "dnx",
  "city_id": "23" },

{
  "district_id": "309",
  "district_name": "隰县",
  "spell": "zuoxian",
  "easy_spell": "zx",
  "city_id": "23" },

{
  "district_id": "310",
  "district_name": "永和县",
  "spell": "yonghexian",
  "easy_spell": "yhx",
  "city_id": "23" },

{
  "district_id": "311",
  "district_name": "蒲县",
  "spell": "puxian",
  "easy_spell": "px",
  "city_id": "23" },

{
  "district_id": "312",
  "district_name": "汾西县",
  "spell": "fenxixian",
  "easy_spell": "fxx",
  "city_id": "23" },

{
  "district_id": "313",
  "district_name": "侯马市",
  "spell": "houmashi",
  "easy_spell": "hms",
  "city_id": "23" },

{
  "district_id": "314",
  "district_name": "霍州市",
  "spell": "huozhoushi",
  "easy_spell": "hzs",
  "city_id": "23" },

{
  "district_id": "315",
  "district_name": "离石区",
  "spell": "lishiqu",
  "easy_spell": "lsq",
  "city_id": "24" },

{
  "district_id": "316",
  "district_name": "文水县",
  "spell": "wenshuixian",
  "easy_spell": "wsx",
  "city_id": "24" },

{
  "district_id": "317",
  "district_name": "交城县",
  "spell": "jiaochengxian",
  "easy_spell": "jcx",
  "city_id": "24" },

{
  "district_id": "318",
  "district_name": "兴县",
  "spell": "xingxian",
  "easy_spell": "xx",
  "city_id": "24" },

{
  "district_id": "319",
  "district_name": "临县",
  "spell": "linxian",
  "easy_spell": "lx",
  "city_id": "24" },

{
  "district_id": "320",
  "district_name": "柳林县",
  "spell": "liulinxian",
  "easy_spell": "llx",
  "city_id": "24" },

{
  "district_id": "321",
  "district_name": "石楼县",
  "spell": "shilouxian",
  "easy_spell": "slx",
  "city_id": "24" },

{
  "district_id": "322",
  "district_name": "岚县",
  "spell": "zuoxian",
  "easy_spell": "zx",
  "city_id": "24" },

{
  "district_id": "323",
  "district_name": "方山县",
  "spell": "fangshanxian",
  "easy_spell": "fsx",
  "city_id": "24" },

{
  "district_id": "324",
  "district_name": "中阳县",
  "spell": "zhongyangxian",
  "easy_spell": "zyx",
  "city_id": "24" },

{
  "district_id": "325",
  "district_name": "交口县",
  "spell": "jiaokouxian",
  "easy_spell": "jkx",
  "city_id": "24" },

{
  "district_id": "326",
  "district_name": "孝义市",
  "spell": "xiaoyishi",
  "easy_spell": "xys",
  "city_id": "24" },

{
  "district_id": "327",
  "district_name": "汾阳市",
  "spell": "fenyangshi",
  "easy_spell": "fys",
  "city_id": "24" },

{
  "district_id": "328",
  "district_name": "新城区",
  "spell": "xinchengqu",
  "easy_spell": "xcq",
  "city_id": "25" },

{
  "district_id": "329",
  "district_name": "回民区",
  "spell": "huiminqu",
  "easy_spell": "hmq",
  "city_id": "25" },

{
  "district_id": "330",
  "district_name": "玉泉区",
  "spell": "yuquanqu",
  "easy_spell": "yqq",
  "city_id": "25" },

{
  "district_id": "331",
  "district_name": "赛罕区",
  "spell": "saihanqu",
  "easy_spell": "shq",
  "city_id": "25" },

{
  "district_id": "332",
  "district_name": "土默特左旗",
  "spell": "tumotezuoqi",
  "easy_spell": "tmtzq",
  "city_id": "25" },

{
  "district_id": "333",
  "district_name": "托克托县",
  "spell": "tuoketuoxian",
  "easy_spell": "tktx",
  "city_id": "25" },

{
  "district_id": "334",
  "district_name": "和林格尔县",
  "spell": "helingeerxian",
  "easy_spell": "hlgex",
  "city_id": "25" },

{
  "district_id": "335",
  "district_name": "清水河县",
  "spell": "qingshuihexian",
  "easy_spell": "qshx",
  "city_id": "25" },

{
  "district_id": "336",
  "district_name": "武川县",
  "spell": "wuchuanxian",
  "easy_spell": "wcx",
  "city_id": "25" },

{
  "district_id": "337",
  "district_name": "东河区",
  "spell": "donghequ",
  "easy_spell": "dhq",
  "city_id": "26" },

{
  "district_id": "338",
  "district_name": "昆都仑区",
  "spell": "kundulunqu",
  "easy_spell": "kdlq",
  "city_id": "26" },

{
  "district_id": "339",
  "district_name": "青山区",
  "spell": "qingshanqu",
  "easy_spell": "qsq",
  "city_id": "26" },

{
  "district_id": "340",
  "district_name": "石拐区",
  "spell": "shiguaiqu",
  "easy_spell": "sgq",
  "city_id": "26" },

{
  "district_id": "341",
  "district_name": "白云矿区",
  "spell": "baiyunkuangqu",
  "easy_spell": "bykq",
  "city_id": "26" },

{
  "district_id": "342",
  "district_name": "九原区",
  "spell": "jiuyuanqu",
  "easy_spell": "jyq",
  "city_id": "26" },

{
  "district_id": "343",
  "district_name": "土默特右旗",
  "spell": "tumoteyouqi",
  "easy_spell": "tmtyq",
  "city_id": "26" },

{
  "district_id": "344",
  "district_name": "固阳县",
  "spell": "guyangxian",
  "easy_spell": "gyx",
  "city_id": "26" },

{
  "district_id": "345",
  "district_name": "达尔罕茂明安联合旗",
  "spell": "daerhanmaominganlianheqi",
  "easy_spell": "dehmmalhq",
  "city_id": "26" },

{
  "district_id": "346",
  "district_name": "海勃湾区",
  "spell": "haibowanqu",
  "easy_spell": "hbwq",
  "city_id": "27" },

{
  "district_id": "347",
  "district_name": "海南区",
  "spell": "hainanqu",
  "easy_spell": "hnq",
  "city_id": "27" },

{
  "district_id": "348",
  "district_name": "乌达区",
  "spell": "wudaqu",
  "easy_spell": "wdq",
  "city_id": "27" },

{
  "district_id": "349",
  "district_name": "红山区",
  "spell": "hongshanqu",
  "easy_spell": "hsq",
  "city_id": "28" },

{
  "district_id": "350",
  "district_name": "元宝山区",
  "spell": "yuanbaoshanqu",
  "easy_spell": "ybsq",
  "city_id": "28" },

{
  "district_id": "351",
  "district_name": "松山区",
  "spell": "songshanqu",
  "easy_spell": "ssq",
  "city_id": "28" },

{
  "district_id": "352",
  "district_name": "阿鲁科尔沁旗",
  "spell": "alukeerqinqi",
  "easy_spell": "alkeqq",
  "city_id": "28" },

{
  "district_id": "353",
  "district_name": "巴林左旗",
  "spell": "balinzuoqi",
  "easy_spell": "blzq",
  "city_id": "28" },

{
  "district_id": "354",
  "district_name": "巴林右旗",
  "spell": "balinyouqi",
  "easy_spell": "blyq",
  "city_id": "28" },

{
  "district_id": "355",
  "district_name": "林西县",
  "spell": "linxixian",
  "easy_spell": "lxx",
  "city_id": "28" },

{
  "district_id": "356",
  "district_name": "克什克腾旗",
  "spell": "keshiketengqi",
  "easy_spell": "ksktq",
  "city_id": "28" },

{
  "district_id": "357",
  "district_name": "翁牛特旗",
  "spell": "wengniuteqi",
  "easy_spell": "wntq",
  "city_id": "28" },

{
  "district_id": "358",
  "district_name": "喀喇沁旗",
  "spell": "kalaqinqi",
  "easy_spell": "klqq",
  "city_id": "28" },

{
  "district_id": "359",
  "district_name": "宁城县",
  "spell": "ningchengxian",
  "easy_spell": "ncx",
  "city_id": "28" },

{
  "district_id": "360",
  "district_name": "敖汉旗",
  "spell": "aohanqi",
  "easy_spell": "ahq",
  "city_id": "28" },

{
  "district_id": "361",
  "district_name": "科尔沁区",
  "spell": "keerqinqu",
  "easy_spell": "keqq",
  "city_id": "29" },

{
  "district_id": "362",
  "district_name": "科尔沁左翼中旗",
  "spell": "keerqinzuoyizhongqi",
  "easy_spell": "keqzyzq",
  "city_id": "29" },

{
  "district_id": "363",
  "district_name": "科尔沁左翼后旗",
  "spell": "keerqinzuoyihouqi",
  "easy_spell": "keqzyhq",
  "city_id": "29" },

{
  "district_id": "364",
  "district_name": "开鲁县",
  "spell": "kailuxian",
  "easy_spell": "klx",
  "city_id": "29" },

{
  "district_id": "365",
  "district_name": "库伦旗",
  "spell": "kulunqi",
  "easy_spell": "klq",
  "city_id": "29" },

{
  "district_id": "366",
  "district_name": "奈曼旗",
  "spell": "naimanqi",
  "easy_spell": "nmq",
  "city_id": "29" },

{
  "district_id": "367",
  "district_name": "扎鲁特旗",
  "spell": "zhaluteqi",
  "easy_spell": "zltq",
  "city_id": "29" },

{
  "district_id": "368",
  "district_name": "霍林郭勒市",
  "spell": "huolinguoleshi",
  "easy_spell": "hlgls",
  "city_id": "29" },

{
  "district_id": "369",
  "district_name": "东胜区",
  "spell": "dongshengqu",
  "easy_spell": "dsq",
  "city_id": "30" },

{
  "district_id": "370",
  "district_name": "达拉特旗",
  "spell": "dalateqi",
  "easy_spell": "dltq",
  "city_id": "30" },

{
  "district_id": "371",
  "district_name": "准格尔旗",
  "spell": "zhungeerqi",
  "easy_spell": "zgeq",
  "city_id": "30" },

{
  "district_id": "372",
  "district_name": "鄂托克前旗",
  "spell": "etuokeqianqi",
  "easy_spell": "etkqq",
  "city_id": "30" },

{
  "district_id": "373",
  "district_name": "鄂托克旗",
  "spell": "etuokeqi",
  "easy_spell": "etkq",
  "city_id": "30" },

{
  "district_id": "374",
  "district_name": "杭锦旗",
  "spell": "hangjinqi",
  "easy_spell": "hjq",
  "city_id": "30" },

{
  "district_id": "375",
  "district_name": "乌审旗",
  "spell": "wushenqi",
  "easy_spell": "wsq",
  "city_id": "30" },

{
  "district_id": "376",
  "district_name": "伊金霍洛旗",
  "spell": "yijinhuoluoqi",
  "easy_spell": "yjhlq",
  "city_id": "30" },

{
  "district_id": "377",
  "district_name": "海拉尔区",
  "spell": "hailaerqu",
  "easy_spell": "hleq",
  "city_id": "31" },

{
  "district_id": "378",
  "district_name": "阿荣旗",
  "spell": "arongqi",
  "easy_spell": "arq",
  "city_id": "31" },

{
  "district_id": "379",
  "district_name": "莫力达瓦达斡尔族自治旗",
  "spell": "molidawadawoerzuzizhiqi",
  "easy_spell": "mldwdwezzzq",
  "city_id": "31" },

{
  "district_id": "380",
  "district_name": "鄂伦春自治旗",
  "spell": "elunchunzizhiqi",
  "easy_spell": "elczzq",
  "city_id": "31" },

{
  "district_id": "381",
  "district_name": "鄂温克族自治旗",
  "spell": "ewenkezuzizhiqi",
  "easy_spell": "ewkzzzq",
  "city_id": "31" },

{
  "district_id": "382",
  "district_name": "陈巴尔虎旗",
  "spell": "chenbaerhuqi",
  "easy_spell": "cbehq",
  "city_id": "31" },

{
  "district_id": "383",
  "district_name": "新巴尔虎左旗",
  "spell": "xinbaerhuzuoqi",
  "easy_spell": "xbehzq",
  "city_id": "31" },

{
  "district_id": "384",
  "district_name": "新巴尔虎右旗",
  "spell": "xinbaerhuyouqi",
  "easy_spell": "xbehyq",
  "city_id": "31" },

{
  "district_id": "385",
  "district_name": "满洲里市",
  "spell": "manzhoulishi",
  "easy_spell": "mzls",
  "city_id": "31" },

{
  "district_id": "386",
  "district_name": "牙克石市",
  "spell": "yakeshishi",
  "easy_spell": "ykss",
  "city_id": "31" },

{
  "district_id": "387",
  "district_name": "扎兰屯市",
  "spell": "zhalantunshi",
  "easy_spell": "zlts",
  "city_id": "31" },

{
  "district_id": "388",
  "district_name": "额尔古纳市",
  "spell": "eergunashi",
  "easy_spell": "eegns",
  "city_id": "31" },

{
  "district_id": "389",
  "district_name": "根河市",
  "spell": "genheshi",
  "easy_spell": "ghs",
  "city_id": "31" },

{
  "district_id": "390",
  "district_name": "临河区",
  "spell": "linhequ",
  "easy_spell": "lhq",
  "city_id": "32" },

{
  "district_id": "391",
  "district_name": "五原县",
  "spell": "wuyuanxian",
  "easy_spell": "wyx",
  "city_id": "32" },

{
  "district_id": "392",
  "district_name": "磴口县",
  "spell": "zuokouxian",
  "easy_spell": "zkx",
  "city_id": "32" },

{
  "district_id": "393",
  "district_name": "乌拉特前旗",
  "spell": "wulateqianqi",
  "easy_spell": "wltqq",
  "city_id": "32" },

{
  "district_id": "394",
  "district_name": "乌拉特中旗",
  "spell": "wulatezhongqi",
  "easy_spell": "wltzq",
  "city_id": "32" },

{
  "district_id": "395",
  "district_name": "乌拉特后旗",
  "spell": "wulatehouqi",
  "easy_spell": "wlthq",
  "city_id": "32" },

{
  "district_id": "396",
  "district_name": "杭锦后旗",
  "spell": "hangjinhouqi",
  "easy_spell": "hjhq",
  "city_id": "32" },

{
  "district_id": "397",
  "district_name": "集宁区",
  "spell": "jiningqu",
  "easy_spell": "jnq",
  "city_id": "33" },

{
  "district_id": "398",
  "district_name": "卓资县",
  "spell": "zhuozixian",
  "easy_spell": "zzx",
  "city_id": "33" },

{
  "district_id": "399",
  "district_name": "化德县",
  "spell": "huadexian",
  "easy_spell": "hdx",
  "city_id": "33" },

{
  "district_id": "400",
  "district_name": "商都县",
  "spell": "shangduxian",
  "easy_spell": "sdx",
  "city_id": "33" },

{
  "district_id": "401",
  "district_name": "兴和县",
  "spell": "xinghexian",
  "easy_spell": "xhx",
  "city_id": "33" },

{
  "district_id": "402",
  "district_name": "凉城县",
  "spell": "liangchengxian",
  "easy_spell": "lcx",
  "city_id": "33" },

{
  "district_id": "403",
  "district_name": "察哈尔右翼前旗",
  "spell": "chahaeryouyiqianqi",
  "easy_spell": "cheyyqq",
  "city_id": "33" },

{
  "district_id": "404",
  "district_name": "察哈尔右翼中旗",
  "spell": "chahaeryouyizhongqi",
  "easy_spell": "cheyyzq",
  "city_id": "33" },

{
  "district_id": "405",
  "district_name": "察哈尔右翼后旗",
  "spell": "chahaeryouyihouqi",
  "easy_spell": "cheyyhq",
  "city_id": "33" },

{
  "district_id": "406",
  "district_name": "四子王旗",
  "spell": "siziwangqi",
  "easy_spell": "szwq",
  "city_id": "33" },

{
  "district_id": "407",
  "district_name": "丰镇市",
  "spell": "fengzhenshi",
  "easy_spell": "fzs",
  "city_id": "33" },

{
  "district_id": "408",
  "district_name": "乌兰浩特市",
  "spell": "wulanhaoteshi",
  "easy_spell": "wlhts",
  "city_id": "34" },

{
  "district_id": "409",
  "district_name": "阿尔山市",
  "spell": "aershanshi",
  "easy_spell": "aess",
  "city_id": "34" },

{
  "district_id": "410",
  "district_name": "科尔沁右翼前旗",
  "spell": "keerqinyouyiqianqi",
  "easy_spell": "keqyyqq",
  "city_id": "34" },

{
  "district_id": "411",
  "district_name": "科尔沁右翼中旗",
  "spell": "keerqinyouyizhongqi",
  "easy_spell": "keqyyzq",
  "city_id": "34" },

{
  "district_id": "412",
  "district_name": "扎赉特旗",
  "spell": "zhazuoteqi",
  "easy_spell": "zztq",
  "city_id": "34" },

{
  "district_id": "413",
  "district_name": "突泉县",
  "spell": "tuquanxian",
  "easy_spell": "tqx",
  "city_id": "34" },

{
  "district_id": "414",
  "district_name": "二连浩特市",
  "spell": "erlianhaoteshi",
  "easy_spell": "elhts",
  "city_id": "35" },

{
  "district_id": "415",
  "district_name": "锡林浩特市",
  "spell": "xilinhaoteshi",
  "easy_spell": "xlhts",
  "city_id": "35" },

{
  "district_id": "416",
  "district_name": "阿巴嘎旗",
  "spell": "abagaqi",
  "easy_spell": "abgq",
  "city_id": "35" },

{
  "district_id": "417",
  "district_name": "苏尼特左旗",
  "spell": "sunitezuoqi",
  "easy_spell": "sntzq",
  "city_id": "35" },

{
  "district_id": "418",
  "district_name": "苏尼特右旗",
  "spell": "suniteyouqi",
  "easy_spell": "sntyq",
  "city_id": "35" },

{
  "district_id": "419",
  "district_name": "东乌珠穆沁旗",
  "spell": "dongwuzhumuqinqi",
  "easy_spell": "dwzmqq",
  "city_id": "35" },

{
  "district_id": "420",
  "district_name": "西乌珠穆沁旗",
  "spell": "xiwuzhumuqinqi",
  "easy_spell": "xwzmqq",
  "city_id": "35" },

{
  "district_id": "421",
  "district_name": "太仆寺旗",
  "spell": "taipusiqi",
  "easy_spell": "tpsq",
  "city_id": "35" },

{
  "district_id": "422",
  "district_name": "镶黄旗",
  "spell": "xianghuangqi",
  "easy_spell": "xhq",
  "city_id": "35" },

{
  "district_id": "423",
  "district_name": "正镶白旗",
  "spell": "zhengxiangbaiqi",
  "easy_spell": "zxbq",
  "city_id": "35" },

{
  "district_id": "424",
  "district_name": "正蓝旗",
  "spell": "zhenglanqi",
  "easy_spell": "zlq",
  "city_id": "35" },

{
  "district_id": "425",
  "district_name": "多伦县",
  "spell": "duolunxian",
  "easy_spell": "dlx",
  "city_id": "35" },

{
  "district_id": "426",
  "district_name": "阿拉善左旗",
  "spell": "alashanzuoqi",
  "easy_spell": "alszq",
  "city_id": "36" },

{
  "district_id": "427",
  "district_name": "阿拉善右旗",
  "spell": "alashanyouqi",
  "easy_spell": "alsyq",
  "city_id": "36" },

{
  "district_id": "428",
  "district_name": "额济纳旗",
  "spell": "ejinaqi",
  "easy_spell": "ejnq",
  "city_id": "36" },

{
  "district_id": "429",
  "district_name": "和平区",
  "spell": "hepingqu",
  "easy_spell": "hpq",
  "city_id": "37" },

{
  "district_id": "430",
  "district_name": "沈河区",
  "spell": "shenhequ",
  "easy_spell": "shq",
  "city_id": "37" },

{
  "district_id": "431",
  "district_name": "大东区",
  "spell": "dadongqu",
  "easy_spell": "ddq",
  "city_id": "37" },

{
  "district_id": "432",
  "district_name": "皇姑区",
  "spell": "huangguqu",
  "easy_spell": "hgq",
  "city_id": "37" },

{
  "district_id": "433",
  "district_name": "铁西区",
  "spell": "tiexiqu",
  "easy_spell": "txq",
  "city_id": "37" },

{
  "district_id": "434",
  "district_name": "苏家屯区",
  "spell": "sujiatunqu",
  "easy_spell": "sjtq",
  "city_id": "37" },

{
  "district_id": "435",
  "district_name": "东陵区",
  "spell": "donglingqu",
  "easy_spell": "dlq",
  "city_id": "37" },

{
  "district_id": "436",
  "district_name": "新城子区",
  "spell": "xinchengziqu",
  "easy_spell": "xczq",
  "city_id": "37" },

{
  "district_id": "437",
  "district_name": "于洪区",
  "spell": "yuhongqu",
  "easy_spell": "yhq",
  "city_id": "37" },

{
  "district_id": "438",
  "district_name": "辽中县",
  "spell": "liaozhongxian",
  "easy_spell": "lzx",
  "city_id": "37" },

{
  "district_id": "439",
  "district_name": "康平县",
  "spell": "kangpingxian",
  "easy_spell": "kpx",
  "city_id": "37" },

{
  "district_id": "440",
  "district_name": "法库县",
  "spell": "fakuxian",
  "easy_spell": "fkx",
  "city_id": "37" },

{
  "district_id": "441",
  "district_name": "新民市",
  "spell": "xinminshi",
  "easy_spell": "xms",
  "city_id": "37" },

{
  "district_id": "442",
  "district_name": "中山区",
  "spell": "zhongshanqu",
  "easy_spell": "zsq",
  "city_id": "38" },

{
  "district_id": "443",
  "district_name": "西岗区",
  "spell": "xigangqu",
  "easy_spell": "xgq",
  "city_id": "38" },

{
  "district_id": "444",
  "district_name": "沙河口区",
  "spell": "shahekouqu",
  "easy_spell": "shkq",
  "city_id": "38" },

{
  "district_id": "445",
  "district_name": "甘井子区",
  "spell": "ganjingziqu",
  "easy_spell": "gjzq",
  "city_id": "38" },

{
  "district_id": "446",
  "district_name": "旅顺口区",
  "spell": "lvshunkouqu",
  "easy_spell": "lskq",
  "city_id": "38" },

{
  "district_id": "447",
  "district_name": "金州区",
  "spell": "jinzhouqu",
  "easy_spell": "jzq",
  "city_id": "38" },

{
  "district_id": "448",
  "district_name": "长海县",
  "spell": "changhaixian",
  "easy_spell": "chx",
  "city_id": "38" },

{
  "district_id": "449",
  "district_name": "瓦房店市",
  "spell": "wafangdianshi",
  "easy_spell": "wfds",
  "city_id": "38" },

{
  "district_id": "450",
  "district_name": "普兰店市",
  "spell": "pulandianshi",
  "easy_spell": "plds",
  "city_id": "38" },

{
  "district_id": "451",
  "district_name": "庄河市",
  "spell": "zhuangheshi",
  "easy_spell": "zhs",
  "city_id": "38" },

{
  "district_id": "452",
  "district_name": "铁东区",
  "spell": "tiedongqu",
  "easy_spell": "tdq",
  "city_id": "39" },

{
  "district_id": "453",
  "district_name": "铁西区",
  "spell": "tiexiqu",
  "easy_spell": "txq",
  "city_id": "39" },

{
  "district_id": "454",
  "district_name": "立山区",
  "spell": "lishanqu",
  "easy_spell": "lsq",
  "city_id": "39" },

{
  "district_id": "455",
  "district_name": "千山区",
  "spell": "qianshanqu",
  "easy_spell": "qsq",
  "city_id": "39" },

{
  "district_id": "456",
  "district_name": "台安县",
  "spell": "taianxian",
  "easy_spell": "tax",
  "city_id": "39" },

{
  "district_id": "457",
  "district_name": "岫岩满族自治县",
  "spell": "zuoyanmanzuzizhixian",
  "easy_spell": "zymzzzx",
  "city_id": "39" },

{
  "district_id": "458",
  "district_name": "海城市",
  "spell": "haichengshi",
  "easy_spell": "hcs",
  "city_id": "39" },

{
  "district_id": "459",
  "district_name": "新抚区",
  "spell": "xinfuqu",
  "easy_spell": "xfq",
  "city_id": "40" },

{
  "district_id": "460",
  "district_name": "东洲区",
  "spell": "dongzhouqu",
  "easy_spell": "dzq",
  "city_id": "40" },

{
  "district_id": "461",
  "district_name": "望花区",
  "spell": "wanghuaqu",
  "easy_spell": "whq",
  "city_id": "40" },

{
  "district_id": "462",
  "district_name": "顺城区",
  "spell": "shunchengqu",
  "easy_spell": "scq",
  "city_id": "40" },

{
  "district_id": "463",
  "district_name": "抚顺县",
  "spell": "fushunxian",
  "easy_spell": "fsx",
  "city_id": "40" },

{
  "district_id": "464",
  "district_name": "新宾满族自治县",
  "spell": "xinbinmanzuzizhixian",
  "easy_spell": "xbmzzzx",
  "city_id": "40" },

{
  "district_id": "465",
  "district_name": "清原满族自治县",
  "spell": "qingyuanmanzuzizhixian",
  "easy_spell": "qymzzzx",
  "city_id": "40" },

{
  "district_id": "466",
  "district_name": "平山区",
  "spell": "pingshanqu",
  "easy_spell": "psq",
  "city_id": "41" },

{
  "district_id": "467",
  "district_name": "溪湖区",
  "spell": "xihuqu",
  "easy_spell": "xhq",
  "city_id": "41" },

{
  "district_id": "468",
  "district_name": "明山区",
  "spell": "mingshanqu",
  "easy_spell": "msq",
  "city_id": "41" },

{
  "district_id": "469",
  "district_name": "南芬区",
  "spell": "nanfenqu",
  "easy_spell": "nfq",
  "city_id": "41" },

{
  "district_id": "470",
  "district_name": "本溪满族自治县",
  "spell": "benximanzuzizhixian",
  "easy_spell": "bxmzzzx",
  "city_id": "41" },

{
  "district_id": "471",
  "district_name": "桓仁满族自治县",
  "spell": "huanrenmanzuzizhixian",
  "easy_spell": "hrmzzzx",
  "city_id": "41" },

{
  "district_id": "472",
  "district_name": "元宝区",
  "spell": "yuanbaoqu",
  "easy_spell": "ybq",
  "city_id": "42" },

{
  "district_id": "473",
  "district_name": "振兴区",
  "spell": "zhenxingqu",
  "easy_spell": "zxq",
  "city_id": "42" },

{
  "district_id": "474",
  "district_name": "振安区",
  "spell": "zhenanqu",
  "easy_spell": "zaq",
  "city_id": "42" },

{
  "district_id": "475",
  "district_name": "宽甸满族自治县",
  "spell": "kuandianmanzuzizhixian",
  "easy_spell": "kdmzzzx",
  "city_id": "42" },

{
  "district_id": "476",
  "district_name": "东港市",
  "spell": "donggangshi",
  "easy_spell": "dgs",
  "city_id": "42" },

{
  "district_id": "477",
  "district_name": "凤城市",
  "spell": "fengchengshi",
  "easy_spell": "fcs",
  "city_id": "42" },

{
  "district_id": "478",
  "district_name": "古塔区",
  "spell": "gutaqu",
  "easy_spell": "gtq",
  "city_id": "43" },

{
  "district_id": "479",
  "district_name": "凌河区",
  "spell": "linghequ",
  "easy_spell": "lhq",
  "city_id": "43" },

{
  "district_id": "480",
  "district_name": "太和区",
  "spell": "taihequ",
  "easy_spell": "thq",
  "city_id": "43" },

{
  "district_id": "481",
  "district_name": "黑山县",
  "spell": "heishanxian",
  "easy_spell": "hsx",
  "city_id": "43" },

{
  "district_id": "482",
  "district_name": "义县",
  "spell": "yixian",
  "easy_spell": "yx",
  "city_id": "43" },

{
  "district_id": "483",
  "district_name": "凌海市",
  "spell": "linghaishi",
  "easy_spell": "lhs",
  "city_id": "43" },

{
  "district_id": "484",
  "district_name": "北宁市",
  "spell": "beiningshi",
  "easy_spell": "bns",
  "city_id": "43" },

{
  "district_id": "485",
  "district_name": "站前区",
  "spell": "zhanqianqu",
  "easy_spell": "zqq",
  "city_id": "44" },

{
  "district_id": "486",
  "district_name": "西市区",
  "spell": "xishiqu",
  "easy_spell": "xsq",
  "city_id": "44" },

{
  "district_id": "487",
  "district_name": "鲅鱼圈区",
  "spell": "zuoyuquanqu",
  "easy_spell": "zyqq",
  "city_id": "44" },

{
  "district_id": "488",
  "district_name": "老边区",
  "spell": "laobianqu",
  "easy_spell": "lbq",
  "city_id": "44" },

{
  "district_id": "489",
  "district_name": "盖州市",
  "spell": "gaizhoushi",
  "easy_spell": "gzs",
  "city_id": "44" },

{
  "district_id": "490",
  "district_name": "大石桥市",
  "spell": "dashiqiaoshi",
  "easy_spell": "dsqs",
  "city_id": "44" },

{
  "district_id": "491",
  "district_name": "海州区",
  "spell": "haizhouqu",
  "easy_spell": "hzq",
  "city_id": "45" },

{
  "district_id": "492",
  "district_name": "新邱区",
  "spell": "xinqiuqu",
  "easy_spell": "xqq",
  "city_id": "45" },

{
  "district_id": "493",
  "district_name": "太平区",
  "spell": "taipingqu",
  "easy_spell": "tpq",
  "city_id": "45" },

{
  "district_id": "494",
  "district_name": "清河门区",
  "spell": "qinghemenqu",
  "easy_spell": "qhmq",
  "city_id": "45" },

{
  "district_id": "495",
  "district_name": "细河区",
  "spell": "xihequ",
  "easy_spell": "xhq",
  "city_id": "45" },

{
  "district_id": "496",
  "district_name": "阜新蒙古族自治县",
  "spell": "fuxinmengguzuzizhixian",
  "easy_spell": "fxmgzzzx",
  "city_id": "45" },

{
  "district_id": "497",
  "district_name": "彰武县",
  "spell": "zhangwuxian",
  "easy_spell": "zwx",
  "city_id": "45" },

{
  "district_id": "498",
  "district_name": "白塔区",
  "spell": "baitaqu",
  "easy_spell": "btq",
  "city_id": "46" },

{
  "district_id": "499",
  "district_name": "文圣区",
  "spell": "wenshengqu",
  "easy_spell": "wsq",
  "city_id": "46" },

{
  "district_id": "500",
  "district_name": "宏伟区",
  "spell": "hongweiqu",
  "easy_spell": "hwq",
  "city_id": "46" },

{
  "district_id": "501",
  "district_name": "弓长岭区",
  "spell": "gongchanglingqu",
  "easy_spell": "gclq",
  "city_id": "46" },

{
  "district_id": "502",
  "district_name": "太子河区",
  "spell": "taizihequ",
  "easy_spell": "tzhq",
  "city_id": "46" },

{
  "district_id": "503",
  "district_name": "辽阳县",
  "spell": "liaoyangxian",
  "easy_spell": "lyx",
  "city_id": "46" },

{
  "district_id": "504",
  "district_name": "灯塔市",
  "spell": "dengtashi",
  "easy_spell": "dts",
  "city_id": "46" },

{
  "district_id": "505",
  "district_name": "双台子区",
  "spell": "shuangtaiziqu",
  "easy_spell": "stzq",
  "city_id": "47" },

{
  "district_id": "506",
  "district_name": "兴隆台区",
  "spell": "xinglongtaiqu",
  "easy_spell": "xltq",
  "city_id": "47" },

{
  "district_id": "507",
  "district_name": "大洼县",
  "spell": "dawaxian",
  "easy_spell": "dwx",
  "city_id": "47" },

{
  "district_id": "508",
  "district_name": "盘山县",
  "spell": "panshanxian",
  "easy_spell": "psx",
  "city_id": "47" },

{
  "district_id": "509",
  "district_name": "银州区",
  "spell": "yinzhouqu",
  "easy_spell": "yzq",
  "city_id": "48" },

{
  "district_id": "510",
  "district_name": "清河区",
  "spell": "qinghequ",
  "easy_spell": "qhq",
  "city_id": "48" },

{
  "district_id": "511",
  "district_name": "铁岭县",
  "spell": "tielingxian",
  "easy_spell": "tlx",
  "city_id": "48" },

{
  "district_id": "512",
  "district_name": "西丰县",
  "spell": "xifengxian",
  "easy_spell": "xfx",
  "city_id": "48" },

{
  "district_id": "513",
  "district_name": "昌图县",
  "spell": "changtuxian",
  "easy_spell": "ctx",
  "city_id": "48" },

{
  "district_id": "514",
  "district_name": "调兵山市",
  "spell": "diaobingshanshi",
  "easy_spell": "dbss",
  "city_id": "48" },

{
  "district_id": "515",
  "district_name": "开原市",
  "spell": "kaiyuanshi",
  "easy_spell": "kys",
  "city_id": "48" },

{
  "district_id": "516",
  "district_name": "双塔区",
  "spell": "shuangtaqu",
  "easy_spell": "stq",
  "city_id": "49" },

{
  "district_id": "517",
  "district_name": "龙城区",
  "spell": "longchengqu",
  "easy_spell": "lcq",
  "city_id": "49" },

{
  "district_id": "518",
  "district_name": "朝阳县",
  "spell": "chaoyangxian",
  "easy_spell": "cyx",
  "city_id": "49" },

{
  "district_id": "519",
  "district_name": "建平县",
  "spell": "jianpingxian",
  "easy_spell": "jpx",
  "city_id": "49" },

{
  "district_id": "520",
  "district_name": "喀喇沁左翼蒙古族自治县",
  "spell": "kalaqinzuoyimengguzuzizhixian",
  "easy_spell": "klqzymgzzzx",
  "city_id": "49" },

{
  "district_id": "521",
  "district_name": "北票市",
  "spell": "beipiaoshi",
  "easy_spell": "bps",
  "city_id": "49" },

{
  "district_id": "522",
  "district_name": "凌源市",
  "spell": "lingyuanshi",
  "easy_spell": "lys",
  "city_id": "49" },

{
  "district_id": "523",
  "district_name": "连山区",
  "spell": "lianshanqu",
  "easy_spell": "lsq",
  "city_id": "50" },

{
  "district_id": "524",
  "district_name": "龙港区",
  "spell": "longgangqu",
  "easy_spell": "lgq",
  "city_id": "50" },

{
  "district_id": "525",
  "district_name": "南票区",
  "spell": "nanpiaoqu",
  "easy_spell": "npq",
  "city_id": "50" },

{
  "district_id": "526",
  "district_name": "绥中县",
  "spell": "suizhongxian",
  "easy_spell": "szx",
  "city_id": "50" },

{
  "district_id": "527",
  "district_name": "建昌县",
  "spell": "jianchangxian",
  "easy_spell": "jcx",
  "city_id": "50" },

{
  "district_id": "528",
  "district_name": "兴城市",
  "spell": "xingchengshi",
  "easy_spell": "xcs",
  "city_id": "50" },

{
  "district_id": "529",
  "district_name": "南关区",
  "spell": "nanguanqu",
  "easy_spell": "ngq",
  "city_id": "51" },

{
  "district_id": "530",
  "district_name": "宽城区",
  "spell": "kuanchengqu",
  "easy_spell": "kcq",
  "city_id": "51" },

{
  "district_id": "531",
  "district_name": "朝阳区",
  "spell": "chaoyangqu",
  "easy_spell": "cyq",
  "city_id": "51" },

{
  "district_id": "532",
  "district_name": "二道区",
  "spell": "erdaoqu",
  "easy_spell": "edq",
  "city_id": "51" },

{
  "district_id": "533",
  "district_name": "绿园区",
  "spell": "lvyuanqu",
  "easy_spell": "lyq",
  "city_id": "51" },

{
  "district_id": "534",
  "district_name": "双阳区",
  "spell": "shuangyangqu",
  "easy_spell": "syq",
  "city_id": "51" },

{
  "district_id": "535",
  "district_name": "农安县",
  "spell": "nonganxian",
  "easy_spell": "nax",
  "city_id": "51" },

{
  "district_id": "536",
  "district_name": "九台市",
  "spell": "jiutaishi",
  "easy_spell": "jts",
  "city_id": "51" },

{
  "district_id": "537",
  "district_name": "榆树市",
  "spell": "yushushi",
  "easy_spell": "yss",
  "city_id": "51" },

{
  "district_id": "538",
  "district_name": "德惠市",
  "spell": "dehuishi",
  "easy_spell": "dhs",
  "city_id": "51" },

{
  "district_id": "539",
  "district_name": "昌邑区",
  "spell": "changyiqu",
  "easy_spell": "cyq",
  "city_id": "52" },

{
  "district_id": "540",
  "district_name": "龙潭区",
  "spell": "longtanqu",
  "easy_spell": "ltq",
  "city_id": "52" },

{
  "district_id": "541",
  "district_name": "船营区",
  "spell": "chuanyingqu",
  "easy_spell": "cyq",
  "city_id": "52" },

{
  "district_id": "542",
  "district_name": "丰满区",
  "spell": "fengmanqu",
  "easy_spell": "fmq",
  "city_id": "52" },

{
  "district_id": "543",
  "district_name": "永吉县",
  "spell": "yongjixian",
  "easy_spell": "yjx",
  "city_id": "52" },

{
  "district_id": "544",
  "district_name": "蛟河市",
  "spell": "zuoheshi",
  "easy_spell": "zhs",
  "city_id": "52" },

{
  "district_id": "545",
  "district_name": "桦甸市",
  "spell": "zuodianshi",
  "easy_spell": "zds",
  "city_id": "52" },

{
  "district_id": "546",
  "district_name": "舒兰市",
  "spell": "shulanshi",
  "easy_spell": "sls",
  "city_id": "52" },

{
  "district_id": "547",
  "district_name": "磐石市",
  "spell": "panshishi",
  "easy_spell": "pss",
  "city_id": "52" },

{
  "district_id": "548",
  "district_name": "铁西区",
  "spell": "tiexiqu",
  "easy_spell": "txq",
  "city_id": "53" },

{
  "district_id": "549",
  "district_name": "铁东区",
  "spell": "tiedongqu",
  "easy_spell": "tdq",
  "city_id": "53" },

{
  "district_id": "550",
  "district_name": "梨树县",
  "spell": "lishuxian",
  "easy_spell": "lsx",
  "city_id": "53" },

{
  "district_id": "551",
  "district_name": "伊通满族自治县",
  "spell": "yitongmanzuzizhixian",
  "easy_spell": "ytmzzzx",
  "city_id": "53" },

{
  "district_id": "552",
  "district_name": "公主岭市",
  "spell": "gongzhulingshi",
  "easy_spell": "gzls",
  "city_id": "53" },

{
  "district_id": "553",
  "district_name": "双辽市",
  "spell": "shuangliaoshi",
  "easy_spell": "sls",
  "city_id": "53" },

{
  "district_id": "554",
  "district_name": "龙山区",
  "spell": "longshanqu",
  "easy_spell": "lsq",
  "city_id": "54" },

{
  "district_id": "555",
  "district_name": "西安区",
  "spell": "xianqu",
  "easy_spell": "xaq",
  "city_id": "54" },

{
  "district_id": "556",
  "district_name": "东丰县",
  "spell": "dongfengxian",
  "easy_spell": "dfx",
  "city_id": "54" },

{
  "district_id": "557",
  "district_name": "东辽县",
  "spell": "dongliaoxian",
  "easy_spell": "dlx",
  "city_id": "54" },

{
  "district_id": "558",
  "district_name": "东昌区",
  "spell": "dongchangqu",
  "easy_spell": "dcq",
  "city_id": "55" },

{
  "district_id": "559",
  "district_name": "二道江区",
  "spell": "erdaojiangqu",
  "easy_spell": "edjq",
  "city_id": "55" },

{
  "district_id": "560",
  "district_name": "通化县",
  "spell": "tonghuaxian",
  "easy_spell": "thx",
  "city_id": "55" },

{
  "district_id": "561",
  "district_name": "辉南县",
  "spell": "huinanxian",
  "easy_spell": "hnx",
  "city_id": "55" },

{
  "district_id": "562",
  "district_name": "柳河县",
  "spell": "liuhexian",
  "easy_spell": "lhx",
  "city_id": "55" },

{
  "district_id": "563",
  "district_name": "梅河口市",
  "spell": "meihekoushi",
  "easy_spell": "mhks",
  "city_id": "55" },

{
  "district_id": "564",
  "district_name": "集安市",
  "spell": "jianshi",
  "easy_spell": "jas",
  "city_id": "55" },

{
  "district_id": "565",
  "district_name": "八道江区",
  "spell": "badaojiangqu",
  "easy_spell": "bdjq",
  "city_id": "56" },

{
  "district_id": "566",
  "district_name": "抚松县",
  "spell": "fusongxian",
  "easy_spell": "fsx",
  "city_id": "56" },

{
  "district_id": "567",
  "district_name": "靖宇县",
  "spell": "jingyuxian",
  "easy_spell": "jyx",
  "city_id": "56" },

{
  "district_id": "568",
  "district_name": "长白朝鲜族自治县",
  "spell": "changbaichaoxianzuzizhixian",
  "easy_spell": "cbcxzzzx",
  "city_id": "56" },

{
  "district_id": "569",
  "district_name": "江源县",
  "spell": "jiangyuanxian",
  "easy_spell": "jyx",
  "city_id": "56" },

{
  "district_id": "570",
  "district_name": "临江市",
  "spell": "linjiangshi",
  "easy_spell": "ljs",
  "city_id": "56" },

{
  "district_id": "571",
  "district_name": "宁江区",
  "spell": "ningjiangqu",
  "easy_spell": "njq",
  "city_id": "57" },

{
  "district_id": "572",
  "district_name": "前郭尔罗斯蒙古族自治县",
  "spell": "qianguoerluosimengguzuzizhixian",
  "easy_spell": "qgelsmgzzzx",
  "city_id": "57" },

{
  "district_id": "573",
  "district_name": "长岭县",
  "spell": "changlingxian",
  "easy_spell": "clx",
  "city_id": "57" },

{
  "district_id": "574",
  "district_name": "乾安县",
  "spell": "qiananxian",
  "easy_spell": "qax",
  "city_id": "57" },

{
  "district_id": "575",
  "district_name": "扶余县",
  "spell": "fuyuxian",
  "easy_spell": "fyx",
  "city_id": "57" },

{
  "district_id": "576",
  "district_name": "洮北区",
  "spell": "zuobeiqu",
  "easy_spell": "zbq",
  "city_id": "58" },

{
  "district_id": "577",
  "district_name": "镇赉县",
  "spell": "zhenzuoxian",
  "easy_spell": "zzx",
  "city_id": "58" },

{
  "district_id": "578",
  "district_name": "通榆县",
  "spell": "tongyuxian",
  "easy_spell": "tyx",
  "city_id": "58" },

{
  "district_id": "579",
  "district_name": "洮南市",
  "spell": "zuonanshi",
  "easy_spell": "zns",
  "city_id": "58" },

{
  "district_id": "580",
  "district_name": "大安市",
  "spell": "daanshi",
  "easy_spell": "das",
  "city_id": "58" },

{
  "district_id": "581",
  "district_name": "延吉市",
  "spell": "yanjishi",
  "easy_spell": "yjs",
  "city_id": "59" },

{
  "district_id": "582",
  "district_name": "图们市",
  "spell": "tumenshi",
  "easy_spell": "tms",
  "city_id": "59" },

{
  "district_id": "583",
  "district_name": "敦化市",
  "spell": "dunhuashi",
  "easy_spell": "dhs",
  "city_id": "59" },

{
  "district_id": "584",
  "district_name": "珲春市",
  "spell": "zuochunshi",
  "easy_spell": "zcs",
  "city_id": "59" },

{
  "district_id": "585",
  "district_name": "龙井市",
  "spell": "longjingshi",
  "easy_spell": "ljs",
  "city_id": "59" },

{
  "district_id": "586",
  "district_name": "和龙市",
  "spell": "helongshi",
  "easy_spell": "hls",
  "city_id": "59" },

{
  "district_id": "587",
  "district_name": "汪清县",
  "spell": "wangqingxian",
  "easy_spell": "wqx",
  "city_id": "59" },

{
  "district_id": "588",
  "district_name": "安图县",
  "spell": "antuxian",
  "easy_spell": "atx",
  "city_id": "59" },

{
  "district_id": "589",
  "district_name": "道里区",
  "spell": "daoliqu",
  "easy_spell": "dlq",
  "city_id": "60" },

{
  "district_id": "590",
  "district_name": "南岗区",
  "spell": "nangangqu",
  "easy_spell": "ngq",
  "city_id": "60" },

{
  "district_id": "591",
  "district_name": "道外区",
  "spell": "daowaiqu",
  "easy_spell": "dwq",
  "city_id": "60" },

{
  "district_id": "592",
  "district_name": "香坊区",
  "spell": "xiangfangqu",
  "easy_spell": "xfq",
  "city_id": "60" },

{
  "district_id": "593",
  "district_name": "动力区",
  "spell": "dongliqu",
  "easy_spell": "dlq",
  "city_id": "60" },

{
  "district_id": "594",
  "district_name": "平房区",
  "spell": "pingfangqu",
  "easy_spell": "pfq",
  "city_id": "60" },

{
  "district_id": "595",
  "district_name": "松北区",
  "spell": "songbeiqu",
  "easy_spell": "sbq",
  "city_id": "60" },

{
  "district_id": "596",
  "district_name": "呼兰区",
  "spell": "hulanqu",
  "easy_spell": "hlq",
  "city_id": "60" },

{
  "district_id": "597",
  "district_name": "依兰县",
  "spell": "yilanxian",
  "easy_spell": "ylx",
  "city_id": "60" },

{
  "district_id": "598",
  "district_name": "方正县",
  "spell": "fangzhengxian",
  "easy_spell": "fzx",
  "city_id": "60" },

{
  "district_id": "599",
  "district_name": "宾县",
  "spell": "binxian",
  "easy_spell": "bx",
  "city_id": "60" },

{
  "district_id": "600",
  "district_name": "巴彦县",
  "spell": "bayanxian",
  "easy_spell": "byx",
  "city_id": "60" },

{
  "district_id": "601",
  "district_name": "木兰县",
  "spell": "mulanxian",
  "easy_spell": "mlx",
  "city_id": "60" },

{
  "district_id": "602",
  "district_name": "通河县",
  "spell": "tonghexian",
  "easy_spell": "thx",
  "city_id": "60" },

{
  "district_id": "603",
  "district_name": "延寿县",
  "spell": "yanshouxian",
  "easy_spell": "ysx",
  "city_id": "60" },

{
  "district_id": "604",
  "district_name": "阿城市",
  "spell": "achengshi",
  "easy_spell": "acs",
  "city_id": "60" },

{
  "district_id": "605",
  "district_name": "双城市",
  "spell": "shuangchengshi",
  "easy_spell": "scs",
  "city_id": "60" },

{
  "district_id": "606",
  "district_name": "尚志市",
  "spell": "shangzhishi",
  "easy_spell": "szs",
  "city_id": "60" },

{
  "district_id": "607",
  "district_name": "五常市",
  "spell": "wuchangshi",
  "easy_spell": "wcs",
  "city_id": "60" },

{
  "district_id": "608",
  "district_name": "龙沙区",
  "spell": "longshaqu",
  "easy_spell": "lsq",
  "city_id": "61" },

{
  "district_id": "609",
  "district_name": "建华区",
  "spell": "jianhuaqu",
  "easy_spell": "jhq",
  "city_id": "61" },

{
  "district_id": "610",
  "district_name": "铁锋区",
  "spell": "tiefengqu",
  "easy_spell": "tfq",
  "city_id": "61" },

{
  "district_id": "611",
  "district_name": "昂昂溪区",
  "spell": "angangxiqu",
  "easy_spell": "aaxq",
  "city_id": "61" },

{
  "district_id": "612",
  "district_name": "富拉尔基区",
  "spell": "fulaerjiqu",
  "easy_spell": "flejq",
  "city_id": "61" },

{
  "district_id": "613",
  "district_name": "碾子山区",
  "spell": "nianzishanqu",
  "easy_spell": "nzsq",
  "city_id": "61" },

{
  "district_id": "614",
  "district_name": "梅里斯达斡尔族区",
  "spell": "meilisidawoerzuqu",
  "easy_spell": "mlsdwezq",
  "city_id": "61" },

{
  "district_id": "615",
  "district_name": "龙江县",
  "spell": "longjiangxian",
  "easy_spell": "ljx",
  "city_id": "61" },

{
  "district_id": "616",
  "district_name": "依安县",
  "spell": "yianxian",
  "easy_spell": "yax",
  "city_id": "61" },

{
  "district_id": "617",
  "district_name": "泰来县",
  "spell": "tailaixian",
  "easy_spell": "tlx",
  "city_id": "61" },

{
  "district_id": "618",
  "district_name": "甘南县",
  "spell": "gannanxian",
  "easy_spell": "gnx",
  "city_id": "61" },

{
  "district_id": "619",
  "district_name": "富裕县",
  "spell": "fuyuxian",
  "easy_spell": "fyx",
  "city_id": "61" },

{
  "district_id": "620",
  "district_name": "克山县",
  "spell": "keshanxian",
  "easy_spell": "ksx",
  "city_id": "61" },

{
  "district_id": "621",
  "district_name": "克东县",
  "spell": "kedongxian",
  "easy_spell": "kdx",
  "city_id": "61" },

{
  "district_id": "622",
  "district_name": "拜泉县",
  "spell": "baiquanxian",
  "easy_spell": "bqx",
  "city_id": "61" },

{
  "district_id": "623",
  "district_name": "讷河市",
  "spell": "zuoheshi",
  "easy_spell": "zhs",
  "city_id": "61" },

{
  "district_id": "624",
  "district_name": "鸡冠区",
  "spell": "jiguanqu",
  "easy_spell": "jgq",
  "city_id": "62" },

{
  "district_id": "625",
  "district_name": "恒山区",
  "spell": "hengshanqu",
  "easy_spell": "hsq",
  "city_id": "62" },

{
  "district_id": "626",
  "district_name": "滴道区",
  "spell": "didaoqu",
  "easy_spell": "ddq",
  "city_id": "62" },

{
  "district_id": "627",
  "district_name": "梨树区",
  "spell": "lishuqu",
  "easy_spell": "lsq",
  "city_id": "62" },

{
  "district_id": "628",
  "district_name": "城子河区",
  "spell": "chengzihequ",
  "easy_spell": "czhq",
  "city_id": "62" },

{
  "district_id": "629",
  "district_name": "麻山区",
  "spell": "mashanqu",
  "easy_spell": "msq",
  "city_id": "62" },

{
  "district_id": "630",
  "district_name": "鸡东县",
  "spell": "jidongxian",
  "easy_spell": "jdx",
  "city_id": "62" },

{
  "district_id": "631",
  "district_name": "虎林市",
  "spell": "hulinshi",
  "easy_spell": "hls",
  "city_id": "62" },

{
  "district_id": "632",
  "district_name": "密山市",
  "spell": "mishanshi",
  "easy_spell": "mss",
  "city_id": "62" },

{
  "district_id": "633",
  "district_name": "向阳区",
  "spell": "xiangyangqu",
  "easy_spell": "xyq",
  "city_id": "63" },

{
  "district_id": "634",
  "district_name": "工农区",
  "spell": "gongnongqu",
  "easy_spell": "gnq",
  "city_id": "63" },

{
  "district_id": "635",
  "district_name": "南山区",
  "spell": "nanshanqu",
  "easy_spell": "nsq",
  "city_id": "63" },

{
  "district_id": "636",
  "district_name": "兴安区",
  "spell": "xinganqu",
  "easy_spell": "xaq",
  "city_id": "63" },

{
  "district_id": "637",
  "district_name": "东山区",
  "spell": "dongshanqu",
  "easy_spell": "dsq",
  "city_id": "63" },

{
  "district_id": "638",
  "district_name": "兴山区",
  "spell": "xingshanqu",
  "easy_spell": "xsq",
  "city_id": "63" },

{
  "district_id": "639",
  "district_name": "萝北县",
  "spell": "luobeixian",
  "easy_spell": "lbx",
  "city_id": "63" },

{
  "district_id": "640",
  "district_name": "绥滨县",
  "spell": "suibinxian",
  "easy_spell": "sbx",
  "city_id": "63" },

{
  "district_id": "641",
  "district_name": "尖山区",
  "spell": "jianshanqu",
  "easy_spell": "jsq",
  "city_id": "64" },

{
  "district_id": "642",
  "district_name": "岭东区",
  "spell": "lingdongqu",
  "easy_spell": "ldq",
  "city_id": "64" },

{
  "district_id": "643",
  "district_name": "四方台区",
  "spell": "sifangtaiqu",
  "easy_spell": "sftq",
  "city_id": "64" },

{
  "district_id": "644",
  "district_name": "宝山区",
  "spell": "baoshanqu",
  "easy_spell": "bsq",
  "city_id": "64" },

{
  "district_id": "645",
  "district_name": "集贤县",
  "spell": "jixianxian",
  "easy_spell": "jxx",
  "city_id": "64" },

{
  "district_id": "646",
  "district_name": "友谊县",
  "spell": "youyixian",
  "easy_spell": "yyx",
  "city_id": "64" },

{
  "district_id": "647",
  "district_name": "宝清县",
  "spell": "baoqingxian",
  "easy_spell": "bqx",
  "city_id": "64" },

{
  "district_id": "648",
  "district_name": "饶河县",
  "spell": "raohexian",
  "easy_spell": "rhx",
  "city_id": "64" },

{
  "district_id": "649",
  "district_name": "萨尔图区",
  "spell": "saertuqu",
  "easy_spell": "setq",
  "city_id": "65" },

{
  "district_id": "650",
  "district_name": "龙凤区",
  "spell": "longfengqu",
  "easy_spell": "lfq",
  "city_id": "65" },

{
  "district_id": "651",
  "district_name": "让胡路区",
  "spell": "ranghuluqu",
  "easy_spell": "rhlq",
  "city_id": "65" },

{
  "district_id": "652",
  "district_name": "红岗区",
  "spell": "honggangqu",
  "easy_spell": "hgq",
  "city_id": "65" },

{
  "district_id": "653",
  "district_name": "大同区",
  "spell": "datongqu",
  "easy_spell": "dtq",
  "city_id": "65" },

{
  "district_id": "654",
  "district_name": "肇州县",
  "spell": "zhaozhouxian",
  "easy_spell": "zzx",
  "city_id": "65" },

{
  "district_id": "655",
  "district_name": "肇源县",
  "spell": "zhaoyuanxian",
  "easy_spell": "zyx",
  "city_id": "65" },

{
  "district_id": "656",
  "district_name": "林甸县",
  "spell": "lindianxian",
  "easy_spell": "ldx",
  "city_id": "65" },

{
  "district_id": "657",
  "district_name": "杜尔伯特蒙古族自治县",
  "spell": "duerbotemengguzuzizhixian",
  "easy_spell": "debtmgzzzx",
  "city_id": "65" },

{
  "district_id": "658",
  "district_name": "伊春区",
  "spell": "yichunqu",
  "easy_spell": "ycq",
  "city_id": "66" },

{
  "district_id": "659",
  "district_name": "南岔区",
  "spell": "nanchaqu",
  "easy_spell": "ncq",
  "city_id": "66" },

{
  "district_id": "660",
  "district_name": "友好区",
  "spell": "youhaoqu",
  "easy_spell": "yhq",
  "city_id": "66" },

{
  "district_id": "661",
  "district_name": "西林区",
  "spell": "xilinqu",
  "easy_spell": "xlq",
  "city_id": "66" },

{
  "district_id": "662",
  "district_name": "翠峦区",
  "spell": "cuiluanqu",
  "easy_spell": "clq",
  "city_id": "66" },

{
  "district_id": "663",
  "district_name": "新青区",
  "spell": "xinqingqu",
  "easy_spell": "xqq",
  "city_id": "66" },

{
  "district_id": "664",
  "district_name": "美溪区",
  "spell": "meixiqu",
  "easy_spell": "mxq",
  "city_id": "66" },

{
  "district_id": "665",
  "district_name": "金山屯区",
  "spell": "jinshantunqu",
  "easy_spell": "jstq",
  "city_id": "66" },

{
  "district_id": "666",
  "district_name": "五营区",
  "spell": "wuyingqu",
  "easy_spell": "wyq",
  "city_id": "66" },

{
  "district_id": "667",
  "district_name": "乌马河区",
  "spell": "wumahequ",
  "easy_spell": "wmhq",
  "city_id": "66" },

{
  "district_id": "668",
  "district_name": "汤旺河区",
  "spell": "tangwanghequ",
  "easy_spell": "twhq",
  "city_id": "66" },

{
  "district_id": "669",
  "district_name": "带岭区",
  "spell": "dailingqu",
  "easy_spell": "dlq",
  "city_id": "66" },

{
  "district_id": "670",
  "district_name": "乌伊岭区",
  "spell": "wuyilingqu",
  "easy_spell": "wylq",
  "city_id": "66" },

{
  "district_id": "671",
  "district_name": "红星区",
  "spell": "hongxingqu",
  "easy_spell": "hxq",
  "city_id": "66" },

{
  "district_id": "672",
  "district_name": "上甘岭区",
  "spell": "shangganlingqu",
  "easy_spell": "sglq",
  "city_id": "66" },

{
  "district_id": "673",
  "district_name": "嘉荫县",
  "spell": "jiayinxian",
  "easy_spell": "jyx",
  "city_id": "66" },

{
  "district_id": "674",
  "district_name": "铁力市",
  "spell": "tielishi",
  "easy_spell": "tls",
  "city_id": "66" },

{
  "district_id": "675",
  "district_name": "永红区",
  "spell": "yonghongqu",
  "easy_spell": "yhq",
  "city_id": "67" },

{
  "district_id": "676",
  "district_name": "向阳区",
  "spell": "xiangyangqu",
  "easy_spell": "xyq",
  "city_id": "67" },

{
  "district_id": "677",
  "district_name": "前进区",
  "spell": "qianjinqu",
  "easy_spell": "qjq",
  "city_id": "67" },

{
  "district_id": "678",
  "district_name": "东风区",
  "spell": "dongfengqu",
  "easy_spell": "dfq",
  "city_id": "67" },

{
  "district_id": "679",
  "district_name": "郊区",
  "spell": "jiaoqu",
  "easy_spell": "jq",
  "city_id": "67" },

{
  "district_id": "680",
  "district_name": "桦南县",
  "spell": "zuonanxian",
  "easy_spell": "znx",
  "city_id": "67" },

{
  "district_id": "681",
  "district_name": "桦川县",
  "spell": "zuochuanxian",
  "easy_spell": "zcx",
  "city_id": "67" },

{
  "district_id": "682",
  "district_name": "汤原县",
  "spell": "tangyuanxian",
  "easy_spell": "tyx",
  "city_id": "67" },

{
  "district_id": "683",
  "district_name": "抚远县",
  "spell": "fuyuanxian",
  "easy_spell": "fyx",
  "city_id": "67" },

{
  "district_id": "684",
  "district_name": "同江市",
  "spell": "tongjiangshi",
  "easy_spell": "tjs",
  "city_id": "67" },

{
  "district_id": "685",
  "district_name": "富锦市",
  "spell": "fujinshi",
  "easy_spell": "fjs",
  "city_id": "67" },

{
  "district_id": "686",
  "district_name": "新兴区",
  "spell": "xinxingqu",
  "easy_spell": "xxq",
  "city_id": "68" },

{
  "district_id": "687",
  "district_name": "桃山区",
  "spell": "taoshanqu",
  "easy_spell": "tsq",
  "city_id": "68" },

{
  "district_id": "688",
  "district_name": "茄子河区",
  "spell": "qiezihequ",
  "easy_spell": "qzhq",
  "city_id": "68" },

{
  "district_id": "689",
  "district_name": "勃利县",
  "spell": "bolixian",
  "easy_spell": "blx",
  "city_id": "68" },

{
  "district_id": "690",
  "district_name": "东安区",
  "spell": "donganqu",
  "easy_spell": "daq",
  "city_id": "69" },

{
  "district_id": "691",
  "district_name": "阳明区",
  "spell": "yangmingqu",
  "easy_spell": "ymq",
  "city_id": "69" },

{
  "district_id": "692",
  "district_name": "爱民区",
  "spell": "aiminqu",
  "easy_spell": "amq",
  "city_id": "69" },

{
  "district_id": "693",
  "district_name": "西安区",
  "spell": "xianqu",
  "easy_spell": "xaq",
  "city_id": "69" },

{
  "district_id": "694",
  "district_name": "东宁县",
  "spell": "dongningxian",
  "easy_spell": "dnx",
  "city_id": "69" },

{
  "district_id": "695",
  "district_name": "林口县",
  "spell": "linkouxian",
  "easy_spell": "lkx",
  "city_id": "69" },

{
  "district_id": "696",
  "district_name": "绥芬河市",
  "spell": "suifenheshi",
  "easy_spell": "sfhs",
  "city_id": "69" },

{
  "district_id": "697",
  "district_name": "海林市",
  "spell": "hailinshi",
  "easy_spell": "hls",
  "city_id": "69" },

{
  "district_id": "698",
  "district_name": "宁安市",
  "spell": "ninganshi",
  "easy_spell": "nas",
  "city_id": "69" },

{
  "district_id": "699",
  "district_name": "穆棱市",
  "spell": "mulengshi",
  "easy_spell": "mls",
  "city_id": "69" },

{
  "district_id": "700",
  "district_name": "爱辉区",
  "spell": "aihuiqu",
  "easy_spell": "ahq",
  "city_id": "70" },

{
  "district_id": "701",
  "district_name": "嫩江县",
  "spell": "nenjiangxian",
  "easy_spell": "njx",
  "city_id": "70" },

{
  "district_id": "702",
  "district_name": "逊克县",
  "spell": "xunkexian",
  "easy_spell": "xkx",
  "city_id": "70" },

{
  "district_id": "703",
  "district_name": "孙吴县",
  "spell": "sunwuxian",
  "easy_spell": "swx",
  "city_id": "70" },

{
  "district_id": "704",
  "district_name": "北安市",
  "spell": "beianshi",
  "easy_spell": "bas",
  "city_id": "70" },

{
  "district_id": "705",
  "district_name": "五大连池市",
  "spell": "wudalianchishi",
  "easy_spell": "wdlcs",
  "city_id": "70" },

{
  "district_id": "706",
  "district_name": "北林区",
  "spell": "beilinqu",
  "easy_spell": "blq",
  "city_id": "71" },

{
  "district_id": "707",
  "district_name": "望奎县",
  "spell": "wangkuixian",
  "easy_spell": "wkx",
  "city_id": "71" },

{
  "district_id": "708",
  "district_name": "兰西县",
  "spell": "lanxixian",
  "easy_spell": "lxx",
  "city_id": "71" },

{
  "district_id": "709",
  "district_name": "青冈县",
  "spell": "qinggangxian",
  "easy_spell": "qgx",
  "city_id": "71" },

{
  "district_id": "710",
  "district_name": "庆安县",
  "spell": "qinganxian",
  "easy_spell": "qax",
  "city_id": "71" },

{
  "district_id": "711",
  "district_name": "明水县",
  "spell": "mingshuixian",
  "easy_spell": "msx",
  "city_id": "71" },

{
  "district_id": "712",
  "district_name": "绥棱县",
  "spell": "suilengxian",
  "easy_spell": "slx",
  "city_id": "71" },

{
  "district_id": "713",
  "district_name": "安达市",
  "spell": "andashi",
  "easy_spell": "ads",
  "city_id": "71" },

{
  "district_id": "714",
  "district_name": "肇东市",
  "spell": "zhaodongshi",
  "easy_spell": "zds",
  "city_id": "71" },

{
  "district_id": "715",
  "district_name": "海伦市",
  "spell": "hailunshi",
  "easy_spell": "hls",
  "city_id": "71" },

{
  "district_id": "716",
  "district_name": "呼玛县",
  "spell": "humaxian",
  "easy_spell": "hmx",
  "city_id": "72" },

{
  "district_id": "717",
  "district_name": "塔河县",
  "spell": "tahexian",
  "easy_spell": "thx",
  "city_id": "72" },

{
  "district_id": "718",
  "district_name": "漠河县",
  "spell": "mohexian",
  "easy_spell": "mhx",
  "city_id": "72" },

{
  "district_id": "719",
  "district_name": "黄浦区",
  "spell": "huangpuqu",
  "easy_spell": "hpq",
  "city_id": "73" },

{
  "district_id": "720",
  "district_name": "卢湾区",
  "spell": "luwanqu",
  "easy_spell": "lwq",
  "city_id": "73" },

{
  "district_id": "721",
  "district_name": "徐汇区",
  "spell": "xuhuiqu",
  "easy_spell": "xhq",
  "city_id": "73" },

{
  "district_id": "722",
  "district_name": "长宁区",
  "spell": "changningqu",
  "easy_spell": "cnq",
  "city_id": "73" },

{
  "district_id": "723",
  "district_name": "静安区",
  "spell": "jinganqu",
  "easy_spell": "jaq",
  "city_id": "73" },

{
  "district_id": "724",
  "district_name": "普陀区",
  "spell": "putuoqu",
  "easy_spell": "ptq",
  "city_id": "73" },

{
  "district_id": "725",
  "district_name": "闸北区",
  "spell": "zhabeiqu",
  "easy_spell": "zbq",
  "city_id": "73" },

{
  "district_id": "726",
  "district_name": "虹口区",
  "spell": "hongkouqu",
  "easy_spell": "hkq",
  "city_id": "73" },

{
  "district_id": "727",
  "district_name": "杨浦区",
  "spell": "yangpuqu",
  "easy_spell": "ypq",
  "city_id": "73" },

{
  "district_id": "728",
  "district_name": "闵行区",
  "spell": "zuoxingqu",
  "easy_spell": "zxq",
  "city_id": "73" },

{
  "district_id": "729",
  "district_name": "宝山区",
  "spell": "baoshanqu",
  "easy_spell": "bsq",
  "city_id": "73" },

{
  "district_id": "730",
  "district_name": "嘉定区",
  "spell": "jiadingqu",
  "easy_spell": "jdq",
  "city_id": "73" },

{
  "district_id": "731",
  "district_name": "浦东新区",
  "spell": "pudongxinqu",
  "easy_spell": "pdxq",
  "city_id": "73" },

{
  "district_id": "732",
  "district_name": "金山区",
  "spell": "jinshanqu",
  "easy_spell": "jsq",
  "city_id": "73" },

{
  "district_id": "733",
  "district_name": "松江区",
  "spell": "songjiangqu",
  "easy_spell": "sjq",
  "city_id": "73" },

{
  "district_id": "734",
  "district_name": "青浦区",
  "spell": "qingpuqu",
  "easy_spell": "qpq",
  "city_id": "73" },

{
  "district_id": "735",
  "district_name": "南汇区",
  "spell": "nanhuiqu",
  "easy_spell": "nhq",
  "city_id": "73" },

{
  "district_id": "736",
  "district_name": "奉贤区",
  "spell": "fengxianqu",
  "easy_spell": "fxq",
  "city_id": "73" },

{
  "district_id": "737",
  "district_name": "崇明县",
  "spell": "chongmingxian",
  "easy_spell": "cmx",
  "city_id": "73" },

{
  "district_id": "738",
  "district_name": "玄武区",
  "spell": "xuanwuqu",
  "easy_spell": "xwq",
  "city_id": "74" },

{
  "district_id": "739",
  "district_name": "白下区",
  "spell": "baixiaqu",
  "easy_spell": "bxq",
  "city_id": "74" },

{
  "district_id": "740",
  "district_name": "秦淮区",
  "spell": "qinhuaiqu",
  "easy_spell": "qhq",
  "city_id": "74" },

{
  "district_id": "741",
  "district_name": "建邺区",
  "spell": "jianzuoqu",
  "easy_spell": "jzq",
  "city_id": "74" },

{
  "district_id": "742",
  "district_name": "鼓楼区",
  "spell": "gulouqu",
  "easy_spell": "glq",
  "city_id": "74" },

{
  "district_id": "743",
  "district_name": "下关区",
  "spell": "xiaguanqu",
  "easy_spell": "xgq",
  "city_id": "74" },

{
  "district_id": "744",
  "district_name": "浦口区",
  "spell": "pukouqu",
  "easy_spell": "pkq",
  "city_id": "74" },

{
  "district_id": "745",
  "district_name": "栖霞区",
  "spell": "qixiaqu",
  "easy_spell": "qxq",
  "city_id": "74" },

{
  "district_id": "746",
  "district_name": "雨花台区",
  "spell": "yuhuataiqu",
  "easy_spell": "yhtq",
  "city_id": "74" },

{
  "district_id": "747",
  "district_name": "江宁区",
  "spell": "jiangningqu",
  "easy_spell": "jnq",
  "city_id": "74" },

{
  "district_id": "748",
  "district_name": "六合区",
  "spell": "liuhequ",
  "easy_spell": "lhq",
  "city_id": "74" },

{
  "district_id": "749",
  "district_name": "溧水县",
  "spell": "zuoshuixian",
  "easy_spell": "zsx",
  "city_id": "74" },

{
  "district_id": "750",
  "district_name": "高淳县",
  "spell": "gaochunxian",
  "easy_spell": "gcx",
  "city_id": "74" },

{
  "district_id": "751",
  "district_name": "崇安区",
  "spell": "chonganqu",
  "easy_spell": "caq",
  "city_id": "75" },

{
  "district_id": "752",
  "district_name": "南长区",
  "spell": "nanchangqu",
  "easy_spell": "ncq",
  "city_id": "75" },

{
  "district_id": "753",
  "district_name": "北塘区",
  "spell": "beitangqu",
  "easy_spell": "btq",
  "city_id": "75" },

{
  "district_id": "754",
  "district_name": "锡山区",
  "spell": "xishanqu",
  "easy_spell": "xsq",
  "city_id": "75" },

{
  "district_id": "755",
  "district_name": "惠山区",
  "spell": "huishanqu",
  "easy_spell": "hsq",
  "city_id": "75" },

{
  "district_id": "756",
  "district_name": "滨湖区",
  "spell": "binhuqu",
  "easy_spell": "bhq",
  "city_id": "75" },

{
  "district_id": "757",
  "district_name": "江阴市",
  "spell": "jiangyinshi",
  "easy_spell": "jys",
  "city_id": "75" },

{
  "district_id": "758",
  "district_name": "宜兴市",
  "spell": "yixingshi",
  "easy_spell": "yxs",
  "city_id": "75" },

{
  "district_id": "759",
  "district_name": "鼓楼区",
  "spell": "gulouqu",
  "easy_spell": "glq",
  "city_id": "76" },

{
  "district_id": "760",
  "district_name": "云龙区",
  "spell": "yunlongqu",
  "easy_spell": "ylq",
  "city_id": "76" },

{
  "district_id": "761",
  "district_name": "九里区",
  "spell": "jiuliqu",
  "easy_spell": "jlq",
  "city_id": "76" },

{
  "district_id": "762",
  "district_name": "贾汪区",
  "spell": "jiawangqu",
  "easy_spell": "jwq",
  "city_id": "76" },

{
  "district_id": "763",
  "district_name": "泉山区",
  "spell": "quanshanqu",
  "easy_spell": "qsq",
  "city_id": "76" },

{
  "district_id": "764",
  "district_name": "丰县",
  "spell": "fengxian",
  "easy_spell": "fx",
  "city_id": "76" },

{
  "district_id": "765",
  "district_name": "沛县",
  "spell": "peixian",
  "easy_spell": "px",
  "city_id": "76" },

{
  "district_id": "766",
  "district_name": "铜山县",
  "spell": "tongshanxian",
  "easy_spell": "tsx",
  "city_id": "76" },

{
  "district_id": "767",
  "district_name": "睢宁县",
  "spell": "zuoningxian",
  "easy_spell": "znx",
  "city_id": "76" },

{
  "district_id": "768",
  "district_name": "新沂市",
  "spell": "xinyishi",
  "easy_spell": "xys",
  "city_id": "76" },

{
  "district_id": "769",
  "district_name": "邳州市",
  "spell": "zuozhoushi",
  "easy_spell": "zzs",
  "city_id": "76" },

{
  "district_id": "770",
  "district_name": "天宁区",
  "spell": "tianningqu",
  "easy_spell": "tnq",
  "city_id": "77" },

{
  "district_id": "771",
  "district_name": "钟楼区",
  "spell": "zhonglouqu",
  "easy_spell": "zlq",
  "city_id": "77" },

{
  "district_id": "772",
  "district_name": "戚墅堰区",
  "spell": "qishuyanqu",
  "easy_spell": "qsyq",
  "city_id": "77" },

{
  "district_id": "773",
  "district_name": "新北区",
  "spell": "xinbeiqu",
  "easy_spell": "xbq",
  "city_id": "77" },

{
  "district_id": "774",
  "district_name": "武进区",
  "spell": "wujinqu",
  "easy_spell": "wjq",
  "city_id": "77" },

{
  "district_id": "775",
  "district_name": "溧阳市",
  "spell": "zuoyangshi",
  "easy_spell": "zys",
  "city_id": "77" },

{
  "district_id": "776",
  "district_name": "金坛市",
  "spell": "jintanshi",
  "easy_spell": "jts",
  "city_id": "77" },

{
  "district_id": "777",
  "district_name": "沧浪区",
  "spell": "canglangqu",
  "easy_spell": "clq",
  "city_id": "78" },

{
  "district_id": "778",
  "district_name": "平江区",
  "spell": "pingjiangqu",
  "easy_spell": "pjq",
  "city_id": "78" },

{
  "district_id": "779",
  "district_name": "金阊区",
  "spell": "jinzuoqu",
  "easy_spell": "jzq",
  "city_id": "78" },

{
  "district_id": "780",
  "district_name": "虎丘区",
  "spell": "huqiuqu",
  "easy_spell": "hqq",
  "city_id": "78" },

{
  "district_id": "781",
  "district_name": "吴中区",
  "spell": "wuzhongqu",
  "easy_spell": "wzq",
  "city_id": "78" },

{
  "district_id": "782",
  "district_name": "相城区",
  "spell": "xiangchengqu",
  "easy_spell": "xcq",
  "city_id": "78" },

{
  "district_id": "783",
  "district_name": "常熟市",
  "spell": "changshushi",
  "easy_spell": "css",
  "city_id": "78" },

{
  "district_id": "784",
  "district_name": "张家港市",
  "spell": "zhangjiagangshi",
  "easy_spell": "zjgs",
  "city_id": "78" },

{
  "district_id": "785",
  "district_name": "昆山市",
  "spell": "kunshanshi",
  "easy_spell": "kss",
  "city_id": "78" },

{
  "district_id": "786",
  "district_name": "吴江市",
  "spell": "wujiangshi",
  "easy_spell": "wjs",
  "city_id": "78" },

{
  "district_id": "787",
  "district_name": "太仓市",
  "spell": "taicangshi",
  "easy_spell": "tcs",
  "city_id": "78" },

{
  "district_id": "788",
  "district_name": "崇川区",
  "spell": "chongchuanqu",
  "easy_spell": "ccq",
  "city_id": "79" },

{
  "district_id": "789",
  "district_name": "港闸区",
  "spell": "gangzhaqu",
  "easy_spell": "gzq",
  "city_id": "79" },

{
  "district_id": "790",
  "district_name": "海安县",
  "spell": "haianxian",
  "easy_spell": "hax",
  "city_id": "79" },

{
  "district_id": "791",
  "district_name": "如东县",
  "spell": "rudongxian",
  "easy_spell": "rdx",
  "city_id": "79" },

{
  "district_id": "792",
  "district_name": "启东市",
  "spell": "qidongshi",
  "easy_spell": "qds",
  "city_id": "79" },

{
  "district_id": "793",
  "district_name": "如皋市",
  "spell": "rugaoshi",
  "easy_spell": "rgs",
  "city_id": "79" },

{
  "district_id": "794",
  "district_name": "通州市",
  "spell": "tongzhoushi",
  "easy_spell": "tzs",
  "city_id": "79" },

{
  "district_id": "795",
  "district_name": "海门市",
  "spell": "haimenshi",
  "easy_spell": "hms",
  "city_id": "79" },

{
  "district_id": "796",
  "district_name": "连云区",
  "spell": "lianyunqu",
  "easy_spell": "lyq",
  "city_id": "80" },

{
  "district_id": "797",
  "district_name": "新浦区",
  "spell": "xinpuqu",
  "easy_spell": "xpq",
  "city_id": "80" },

{
  "district_id": "798",
  "district_name": "海州区",
  "spell": "haizhouqu",
  "easy_spell": "hzq",
  "city_id": "80" },

{
  "district_id": "799",
  "district_name": "赣榆县",
  "spell": "ganyuxian",
  "easy_spell": "gyx",
  "city_id": "80" },

{
  "district_id": "800",
  "district_name": "东海县",
  "spell": "donghaixian",
  "easy_spell": "dhx",
  "city_id": "80" },

{
  "district_id": "801",
  "district_name": "灌云县",
  "spell": "guanyunxian",
  "easy_spell": "gyx",
  "city_id": "80" },

{
  "district_id": "802",
  "district_name": "灌南县",
  "spell": "guannanxian",
  "easy_spell": "gnx",
  "city_id": "80" },

{
  "district_id": "803",
  "district_name": "清河区",
  "spell": "qinghequ",
  "easy_spell": "qhq",
  "city_id": "81" },

{
  "district_id": "804",
  "district_name": "楚州区",
  "spell": "chuzhouqu",
  "easy_spell": "czq",
  "city_id": "81" },

{
  "district_id": "805",
  "district_name": "淮阴区",
  "spell": "huaiyinqu",
  "easy_spell": "hyq",
  "city_id": "81" },

{
  "district_id": "806",
  "district_name": "清浦区",
  "spell": "qingpuqu",
  "easy_spell": "qpq",
  "city_id": "81" },

{
  "district_id": "807",
  "district_name": "涟水县",
  "spell": "lianshuixian",
  "easy_spell": "lsx",
  "city_id": "81" },

{
  "district_id": "808",
  "district_name": "洪泽县",
  "spell": "hongzexian",
  "easy_spell": "hzx",
  "city_id": "81" },

{
  "district_id": "809",
  "district_name": "盱眙县",
  "spell": "zuozuoxian",
  "easy_spell": "zzx",
  "city_id": "81" },

{
  "district_id": "810",
  "district_name": "金湖县",
  "spell": "jinhuxian",
  "easy_spell": "jhx",
  "city_id": "81" },

{
  "district_id": "811",
  "district_name": "亭湖区",
  "spell": "tinghuqu",
  "easy_spell": "thq",
  "city_id": "82" },

{
  "district_id": "812",
  "district_name": "盐都区",
  "spell": "yanduqu",
  "easy_spell": "ydq",
  "city_id": "82" },

{
  "district_id": "813",
  "district_name": "响水县",
  "spell": "xiangshuixian",
  "easy_spell": "xsx",
  "city_id": "82" },

{
  "district_id": "814",
  "district_name": "滨海县",
  "spell": "binhaixian",
  "easy_spell": "bhx",
  "city_id": "82" },

{
  "district_id": "815",
  "district_name": "阜宁县",
  "spell": "funingxian",
  "easy_spell": "fnx",
  "city_id": "82" },

{
  "district_id": "816",
  "district_name": "射阳县",
  "spell": "sheyangxian",
  "easy_spell": "syx",
  "city_id": "82" },

{
  "district_id": "817",
  "district_name": "建湖县",
  "spell": "jianhuxian",
  "easy_spell": "jhx",
  "city_id": "82" },

{
  "district_id": "818",
  "district_name": "东台市",
  "spell": "dongtaishi",
  "easy_spell": "dts",
  "city_id": "82" },

{
  "district_id": "819",
  "district_name": "大丰市",
  "spell": "dafengshi",
  "easy_spell": "dfs",
  "city_id": "82" },

{
  "district_id": "820",
  "district_name": "广陵区",
  "spell": "guanglingqu",
  "easy_spell": "glq",
  "city_id": "83" },

{
  "district_id": "821",
  "district_name": "邗江区",
  "spell": "zuojiangqu",
  "easy_spell": "zjq",
  "city_id": "83" },

{
  "district_id": "822",
  "district_name": "维扬区",
  "spell": "weiyangqu",
  "easy_spell": "wyq",
  "city_id": "83" },

{
  "district_id": "823",
  "district_name": "宝应县",
  "spell": "baoyingxian",
  "easy_spell": "byx",
  "city_id": "83" },

{
  "district_id": "824",
  "district_name": "仪征市",
  "spell": "yizhengshi",
  "easy_spell": "yzs",
  "city_id": "83" },

{
  "district_id": "825",
  "district_name": "高邮市",
  "spell": "gaoyoushi",
  "easy_spell": "gys",
  "city_id": "83" },

{
  "district_id": "826",
  "district_name": "江都市",
  "spell": "jiangdushi",
  "easy_spell": "jds",
  "city_id": "83" },

{
  "district_id": "827",
  "district_name": "京口区",
  "spell": "jingkouqu",
  "easy_spell": "jkq",
  "city_id": "84" },

{
  "district_id": "828",
  "district_name": "润州区",
  "spell": "runzhouqu",
  "easy_spell": "rzq",
  "city_id": "84" },

{
  "district_id": "829",
  "district_name": "丹徒区",
  "spell": "dantuqu",
  "easy_spell": "dtq",
  "city_id": "84" },

{
  "district_id": "830",
  "district_name": "丹阳市",
  "spell": "danyangshi",
  "easy_spell": "dys",
  "city_id": "84" },

{
  "district_id": "831",
  "district_name": "扬中市",
  "spell": "yangzhongshi",
  "easy_spell": "yzs",
  "city_id": "84" },

{
  "district_id": "832",
  "district_name": "句容市",
  "spell": "jurongshi",
  "easy_spell": "jrs",
  "city_id": "84" },

{
  "district_id": "833",
  "district_name": "海陵区",
  "spell": "hailingqu",
  "easy_spell": "hlq",
  "city_id": "85" },

{
  "district_id": "834",
  "district_name": "高港区",
  "spell": "gaogangqu",
  "easy_spell": "ggq",
  "city_id": "85" },

{
  "district_id": "835",
  "district_name": "兴化市",
  "spell": "xinghuashi",
  "easy_spell": "xhs",
  "city_id": "85" },

{
  "district_id": "836",
  "district_name": "靖江市",
  "spell": "jingjiangshi",
  "easy_spell": "jjs",
  "city_id": "85" },

{
  "district_id": "837",
  "district_name": "泰兴市",
  "spell": "taixingshi",
  "easy_spell": "txs",
  "city_id": "85" },

{
  "district_id": "838",
  "district_name": "姜堰市",
  "spell": "jiangyanshi",
  "easy_spell": "jys",
  "city_id": "85" },

{
  "district_id": "839",
  "district_name": "宿城区",
  "spell": "suchengqu",
  "easy_spell": "scq",
  "city_id": "86" },

{
  "district_id": "840",
  "district_name": "宿豫区",
  "spell": "suyuqu",
  "easy_spell": "syq",
  "city_id": "86" },

{
  "district_id": "841",
  "district_name": "沭阳县",
  "spell": "zuoyangxian",
  "easy_spell": "zyx",
  "city_id": "86" },

{
  "district_id": "842",
  "district_name": "泗阳县",
  "spell": "zuoyangxian",
  "easy_spell": "zyx",
  "city_id": "86" },

{
  "district_id": "843",
  "district_name": "泗洪县",
  "spell": "zuohongxian",
  "easy_spell": "zhx",
  "city_id": "86" },

{
  "district_id": "844",
  "district_name": "上城区",
  "spell": "shangchengqu",
  "easy_spell": "scq",
  "city_id": "87" },

{
  "district_id": "845",
  "district_name": "下城区",
  "spell": "xiachengqu",
  "easy_spell": "xcq",
  "city_id": "87" },

{
  "district_id": "846",
  "district_name": "江干区",
  "spell": "jiangganqu",
  "easy_spell": "jgq",
  "city_id": "87" },

{
  "district_id": "847",
  "district_name": "拱墅区",
  "spell": "gongshuqu",
  "easy_spell": "gsq",
  "city_id": "87" },

{
  "district_id": "848",
  "district_name": "西湖区",
  "spell": "xihuqu",
  "easy_spell": "xhq",
  "city_id": "87" },

{
  "district_id": "849",
  "district_name": "滨江区",
  "spell": "binjiangqu",
  "easy_spell": "bjq",
  "city_id": "87" },

{
  "district_id": "850",
  "district_name": "萧山区",
  "spell": "xiaoshanqu",
  "easy_spell": "xsq",
  "city_id": "87" },

{
  "district_id": "851",
  "district_name": "余杭区",
  "spell": "yuhangqu",
  "easy_spell": "yhq",
  "city_id": "87" },

{
  "district_id": "852",
  "district_name": "桐庐县",
  "spell": "tongluxian",
  "easy_spell": "tlx",
  "city_id": "87" },

{
  "district_id": "853",
  "district_name": "淳安县",
  "spell": "chunanxian",
  "easy_spell": "cax",
  "city_id": "87" },

{
  "district_id": "854",
  "district_name": "建德市",
  "spell": "jiandeshi",
  "easy_spell": "jds",
  "city_id": "87" },

{
  "district_id": "855",
  "district_name": "富阳市",
  "spell": "fuyangshi",
  "easy_spell": "fys",
  "city_id": "87" },

{
  "district_id": "856",
  "district_name": "临安市",
  "spell": "linanshi",
  "easy_spell": "las",
  "city_id": "87" },

{
  "district_id": "857",
  "district_name": "海曙区",
  "spell": "haishuqu",
  "easy_spell": "hsq",
  "city_id": "88" },

{
  "district_id": "858",
  "district_name": "江东区",
  "spell": "jiangdongqu",
  "easy_spell": "jdq",
  "city_id": "88" },

{
  "district_id": "859",
  "district_name": "江北区",
  "spell": "jiangbeiqu",
  "easy_spell": "jbq",
  "city_id": "88" },

{
  "district_id": "860",
  "district_name": "北仑区",
  "spell": "beilunqu",
  "easy_spell": "blq",
  "city_id": "88" },

{
  "district_id": "861",
  "district_name": "镇海区",
  "spell": "zhenhaiqu",
  "easy_spell": "zhq",
  "city_id": "88" },

{
  "district_id": "862",
  "district_name": "鄞州区",
  "spell": "zuozhouqu",
  "easy_spell": "zzq",
  "city_id": "88" },

{
  "district_id": "863",
  "district_name": "象山县",
  "spell": "xiangshanxian",
  "easy_spell": "xsx",
  "city_id": "88" },

{
  "district_id": "864",
  "district_name": "宁海县",
  "spell": "ninghaixian",
  "easy_spell": "nhx",
  "city_id": "88" },

{
  "district_id": "865",
  "district_name": "余姚市",
  "spell": "yuyaoshi",
  "easy_spell": "yys",
  "city_id": "88" },

{
  "district_id": "866",
  "district_name": "慈溪市",
  "spell": "cixishi",
  "easy_spell": "cxs",
  "city_id": "88" },

{
  "district_id": "867",
  "district_name": "奉化市",
  "spell": "fenghuashi",
  "easy_spell": "fhs",
  "city_id": "88" },

{
  "district_id": "868",
  "district_name": "鹿城区",
  "spell": "luchengqu",
  "easy_spell": "lcq",
  "city_id": "89" },

{
  "district_id": "869",
  "district_name": "龙湾区",
  "spell": "longwanqu",
  "easy_spell": "lwq",
  "city_id": "89" },

{
  "district_id": "870",
  "district_name": "瓯海区",
  "spell": "zuohaiqu",
  "easy_spell": "zhq",
  "city_id": "89" },

{
  "district_id": "871",
  "district_name": "洞头县",
  "spell": "dongtouxian",
  "easy_spell": "dtx",
  "city_id": "89" },

{
  "district_id": "872",
  "district_name": "永嘉县",
  "spell": "yongjiaxian",
  "easy_spell": "yjx",
  "city_id": "89" },

{
  "district_id": "873",
  "district_name": "平阳县",
  "spell": "pingyangxian",
  "easy_spell": "pyx",
  "city_id": "89" },

{
  "district_id": "874",
  "district_name": "苍南县",
  "spell": "cangnanxian",
  "easy_spell": "cnx",
  "city_id": "89" },

{
  "district_id": "875",
  "district_name": "文成县",
  "spell": "wenchengxian",
  "easy_spell": "wcx",
  "city_id": "89" },

{
  "district_id": "876",
  "district_name": "泰顺县",
  "spell": "taishunxian",
  "easy_spell": "tsx",
  "city_id": "89" },

{
  "district_id": "877",
  "district_name": "瑞安市",
  "spell": "ruianshi",
  "easy_spell": "ras",
  "city_id": "89" },

{
  "district_id": "878",
  "district_name": "乐清市",
  "spell": "leqingshi",
  "easy_spell": "lqs",
  "city_id": "89" },

{
  "district_id": "879",
  "district_name": "秀城区",
  "spell": "xiuchengqu",
  "easy_spell": "xcq",
  "city_id": "90" },

{
  "district_id": "880",
  "district_name": "秀洲区",
  "spell": "xiuzhouqu",
  "easy_spell": "xzq",
  "city_id": "90" },

{
  "district_id": "881",
  "district_name": "嘉善县",
  "spell": "jiashanxian",
  "easy_spell": "jsx",
  "city_id": "90" },

{
  "district_id": "882",
  "district_name": "海盐县",
  "spell": "haiyanxian",
  "easy_spell": "hyx",
  "city_id": "90" },

{
  "district_id": "883",
  "district_name": "海宁市",
  "spell": "hainingshi",
  "easy_spell": "hns",
  "city_id": "90" },

{
  "district_id": "884",
  "district_name": "平湖市",
  "spell": "pinghushi",
  "easy_spell": "phs",
  "city_id": "90" },

{
  "district_id": "885",
  "district_name": "桐乡市",
  "spell": "tongxiangshi",
  "easy_spell": "txs",
  "city_id": "90" },

{
  "district_id": "886",
  "district_name": "吴兴区",
  "spell": "wuxingqu",
  "easy_spell": "wxq",
  "city_id": "91" },

{
  "district_id": "887",
  "district_name": "南浔区",
  "spell": "nanzuoqu",
  "easy_spell": "nzq",
  "city_id": "91" },

{
  "district_id": "888",
  "district_name": "德清县",
  "spell": "deqingxian",
  "easy_spell": "dqx",
  "city_id": "91" },

{
  "district_id": "889",
  "district_name": "长兴县",
  "spell": "changxingxian",
  "easy_spell": "cxx",
  "city_id": "91" },

{
  "district_id": "890",
  "district_name": "安吉县",
  "spell": "anjixian",
  "easy_spell": "ajx",
  "city_id": "91" },

{
  "district_id": "891",
  "district_name": "越城区",
  "spell": "yuechengqu",
  "easy_spell": "ycq",
  "city_id": "92" },

{
  "district_id": "892",
  "district_name": "绍兴县",
  "spell": "shaoxingxian",
  "easy_spell": "sxx",
  "city_id": "92" },

{
  "district_id": "893",
  "district_name": "新昌县",
  "spell": "xinchangxian",
  "easy_spell": "xcx",
  "city_id": "92" },

{
  "district_id": "894",
  "district_name": "诸暨市",
  "spell": "zhuzuoshi",
  "easy_spell": "zzs",
  "city_id": "92" },

{
  "district_id": "895",
  "district_name": "上虞市",
  "spell": "shangyushi",
  "easy_spell": "sys",
  "city_id": "92" },

{
  "district_id": "896",
  "district_name": "嵊州市",
  "spell": "zuozhoushi",
  "easy_spell": "zzs",
  "city_id": "92" },

{
  "district_id": "897",
  "district_name": "婺城区",
  "spell": "zuochengqu",
  "easy_spell": "zcq",
  "city_id": "93" },

{
  "district_id": "898",
  "district_name": "金东区",
  "spell": "jindongqu",
  "easy_spell": "jdq",
  "city_id": "93" },

{
  "district_id": "899",
  "district_name": "武义县",
  "spell": "wuyixian",
  "easy_spell": "wyx",
  "city_id": "93" },

{
  "district_id": "900",
  "district_name": "浦江县",
  "spell": "pujiangxian",
  "easy_spell": "pjx",
  "city_id": "93" },

{
  "district_id": "901",
  "district_name": "磐安县",
  "spell": "pananxian",
  "easy_spell": "pax",
  "city_id": "93" },

{
  "district_id": "902",
  "district_name": "兰溪市",
  "spell": "lanxishi",
  "easy_spell": "lxs",
  "city_id": "93" },

{
  "district_id": "903",
  "district_name": "义乌市",
  "spell": "yiwushi",
  "easy_spell": "yws",
  "city_id": "93" },

{
  "district_id": "904",
  "district_name": "东阳市",
  "spell": "dongyangshi",
  "easy_spell": "dys",
  "city_id": "93" },

{
  "district_id": "905",
  "district_name": "永康市",
  "spell": "yongkangshi",
  "easy_spell": "yks",
  "city_id": "93" },

{
  "district_id": "906",
  "district_name": "柯城区",
  "spell": "kechengqu",
  "easy_spell": "kcq",
  "city_id": "94" },

{
  "district_id": "907",
  "district_name": "衢江区",
  "spell": "zuojiangqu",
  "easy_spell": "zjq",
  "city_id": "94" },

{
  "district_id": "908",
  "district_name": "常山县",
  "spell": "changshanxian",
  "easy_spell": "csx",
  "city_id": "94" },

{
  "district_id": "909",
  "district_name": "开化县",
  "spell": "kaihuaxian",
  "easy_spell": "khx",
  "city_id": "94" },

{
  "district_id": "910",
  "district_name": "龙游县",
  "spell": "longyouxian",
  "easy_spell": "lyx",
  "city_id": "94" },

{
  "district_id": "911",
  "district_name": "江山市",
  "spell": "jiangshanshi",
  "easy_spell": "jss",
  "city_id": "94" },

{
  "district_id": "912",
  "district_name": "定海区",
  "spell": "dinghaiqu",
  "easy_spell": "dhq",
  "city_id": "95" },

{
  "district_id": "913",
  "district_name": "普陀区",
  "spell": "putuoqu",
  "easy_spell": "ptq",
  "city_id": "95" },

{
  "district_id": "914",
  "district_name": "岱山县",
  "spell": "zuoshanxian",
  "easy_spell": "zsx",
  "city_id": "95" },

{
  "district_id": "915",
  "district_name": "嵊泗县",
  "spell": "zuozuoxian",
  "easy_spell": "zzx",
  "city_id": "95" },

{
  "district_id": "916",
  "district_name": "椒江区",
  "spell": "jiaojiangqu",
  "easy_spell": "jjq",
  "city_id": "96" },

{
  "district_id": "917",
  "district_name": "黄岩区",
  "spell": "huangyanqu",
  "easy_spell": "hyq",
  "city_id": "96" },

{
  "district_id": "918",
  "district_name": "路桥区",
  "spell": "luqiaoqu",
  "easy_spell": "lqq",
  "city_id": "96" },

{
  "district_id": "919",
  "district_name": "玉环县",
  "spell": "yuhuanxian",
  "easy_spell": "yhx",
  "city_id": "96" },

{
  "district_id": "920",
  "district_name": "三门县",
  "spell": "sanmenxian",
  "easy_spell": "smx",
  "city_id": "96" },

{
  "district_id": "921",
  "district_name": "天台县",
  "spell": "tiantaixian",
  "easy_spell": "ttx",
  "city_id": "96" },

{
  "district_id": "922",
  "district_name": "仙居县",
  "spell": "xianjuxian",
  "easy_spell": "xjx",
  "city_id": "96" },

{
  "district_id": "923",
  "district_name": "温岭市",
  "spell": "wenlingshi",
  "easy_spell": "wls",
  "city_id": "96" },

{
  "district_id": "924",
  "district_name": "临海市",
  "spell": "linhaishi",
  "easy_spell": "lhs",
  "city_id": "96" },

{
  "district_id": "925",
  "district_name": "莲都区",
  "spell": "lianduqu",
  "easy_spell": "ldq",
  "city_id": "97" },

{
  "district_id": "926",
  "district_name": "青田县",
  "spell": "qingtianxian",
  "easy_spell": "qtx",
  "city_id": "97" },

{
  "district_id": "927",
  "district_name": "缙云县",
  "spell": "zuoyunxian",
  "easy_spell": "zyx",
  "city_id": "97" },

{
  "district_id": "928",
  "district_name": "遂昌县",
  "spell": "suichangxian",
  "easy_spell": "scx",
  "city_id": "97" },

{
  "district_id": "929",
  "district_name": "松阳县",
  "spell": "songyangxian",
  "easy_spell": "syx",
  "city_id": "97" },

{
  "district_id": "930",
  "district_name": "云和县",
  "spell": "yunhexian",
  "easy_spell": "yhx",
  "city_id": "97" },

{
  "district_id": "931",
  "district_name": "庆元县",
  "spell": "qingyuanxian",
  "easy_spell": "qyx",
  "city_id": "97" },

{
  "district_id": "932",
  "district_name": "景宁畲族自治县",
  "spell": "jingningzuozuzizhixian",
  "easy_spell": "jnzzzzx",
  "city_id": "97" },

{
  "district_id": "933",
  "district_name": "龙泉市",
  "spell": "longquanshi",
  "easy_spell": "lqs",
  "city_id": "97" },

{
  "district_id": "934",
  "district_name": "瑶海区",
  "spell": "yaohaiqu",
  "easy_spell": "yhq",
  "city_id": "98" },

{
  "district_id": "935",
  "district_name": "庐阳区",
  "spell": "luyangqu",
  "easy_spell": "lyq",
  "city_id": "98" },

{
  "district_id": "936",
  "district_name": "蜀山区",
  "spell": "shushanqu",
  "easy_spell": "ssq",
  "city_id": "98" },

{
  "district_id": "937",
  "district_name": "包河区",
  "spell": "baohequ",
  "easy_spell": "bhq",
  "city_id": "98" },

{
  "district_id": "938",
  "district_name": "长丰县",
  "spell": "changfengxian",
  "easy_spell": "cfx",
  "city_id": "98" },

{
  "district_id": "939",
  "district_name": "肥东县",
  "spell": "feidongxian",
  "easy_spell": "fdx",
  "city_id": "98" },

{
  "district_id": "940",
  "district_name": "肥西县",
  "spell": "feixixian",
  "easy_spell": "fxx",
  "city_id": "98" },

{
  "district_id": "941",
  "district_name": "镜湖区",
  "spell": "jinghuqu",
  "easy_spell": "jhq",
  "city_id": "99" },

{
  "district_id": "942",
  "district_name": "马塘区",
  "spell": "matangqu",
  "easy_spell": "mtq",
  "city_id": "99" },

{
  "district_id": "943",
  "district_name": "新芜区",
  "spell": "xinwuqu",
  "easy_spell": "xwq",
  "city_id": "99" },

{
  "district_id": "944",
  "district_name": "鸠江区",
  "spell": "zuojiangqu",
  "easy_spell": "zjq",
  "city_id": "99" },

{
  "district_id": "945",
  "district_name": "芜湖县",
  "spell": "wuhuxian",
  "easy_spell": "whx",
  "city_id": "99" },

{
  "district_id": "946",
  "district_name": "繁昌县",
  "spell": "fanchangxian",
  "easy_spell": "fcx",
  "city_id": "99" },

{
  "district_id": "947",
  "district_name": "南陵县",
  "spell": "nanlingxian",
  "easy_spell": "nlx",
  "city_id": "99" },

{
  "district_id": "948",
  "district_name": "龙子湖区",
  "spell": "longzihuqu",
  "easy_spell": "lzhq",
  "city_id": "100" },

{
  "district_id": "949",
  "district_name": "蚌山区",
  "spell": "bangshanqu",
  "easy_spell": "bsq",
  "city_id": "100" },

{
  "district_id": "950",
  "district_name": "禹会区",
  "spell": "yuhuiqu",
  "easy_spell": "yhq",
  "city_id": "100" },

{
  "district_id": "951",
  "district_name": "淮上区",
  "spell": "huaishangqu",
  "easy_spell": "hsq",
  "city_id": "100" },

{
  "district_id": "952",
  "district_name": "怀远县",
  "spell": "huaiyuanxian",
  "easy_spell": "hyx",
  "city_id": "100" },

{
  "district_id": "953",
  "district_name": "五河县",
  "spell": "wuhexian",
  "easy_spell": "whx",
  "city_id": "100" },

{
  "district_id": "954",
  "district_name": "固镇县",
  "spell": "guzhenxian",
  "easy_spell": "gzx",
  "city_id": "100" },

{
  "district_id": "955",
  "district_name": "大通区",
  "spell": "datongqu",
  "easy_spell": "dtq",
  "city_id": "101" },

{
  "district_id": "956",
  "district_name": "田家庵区",
  "spell": "tianjiazuoqu",
  "easy_spell": "tjzq",
  "city_id": "101" },

{
  "district_id": "957",
  "district_name": "谢家集区",
  "spell": "xiejiajiqu",
  "easy_spell": "xjjq",
  "city_id": "101" },

{
  "district_id": "958",
  "district_name": "八公山区",
  "spell": "bagongshanqu",
  "easy_spell": "bgsq",
  "city_id": "101" },

{
  "district_id": "959",
  "district_name": "潘集区",
  "spell": "panjiqu",
  "easy_spell": "pjq",
  "city_id": "101" },

{
  "district_id": "960",
  "district_name": "凤台县",
  "spell": "fengtaixian",
  "easy_spell": "ftx",
  "city_id": "101" },

{
  "district_id": "961",
  "district_name": "金家庄区",
  "spell": "jinjiazhuangqu",
  "easy_spell": "jjzq",
  "city_id": "102" },

{
  "district_id": "962",
  "district_name": "花山区",
  "spell": "huashanqu",
  "easy_spell": "hsq",
  "city_id": "102" },

{
  "district_id": "963",
  "district_name": "雨山区",
  "spell": "yushanqu",
  "easy_spell": "ysq",
  "city_id": "102" },

{
  "district_id": "964",
  "district_name": "当涂县",
  "spell": "dangtuxian",
  "easy_spell": "dtx",
  "city_id": "102" },

{
  "district_id": "965",
  "district_name": "杜集区",
  "spell": "dujiqu",
  "easy_spell": "djq",
  "city_id": "103" },

{
  "district_id": "966",
  "district_name": "相山区",
  "spell": "xiangshanqu",
  "easy_spell": "xsq",
  "city_id": "103" },

{
  "district_id": "967",
  "district_name": "烈山区",
  "spell": "lieshanqu",
  "easy_spell": "lsq",
  "city_id": "103" },

{
  "district_id": "968",
  "district_name": "濉溪县",
  "spell": "zuoxixian",
  "easy_spell": "zxx",
  "city_id": "103" },

{
  "district_id": "969",
  "district_name": "铜官山区",
  "spell": "tongguanshanqu",
  "easy_spell": "tgsq",
  "city_id": "104" },

{
  "district_id": "970",
  "district_name": "狮子山区",
  "spell": "shizishanqu",
  "easy_spell": "szsq",
  "city_id": "104" },

{
  "district_id": "971",
  "district_name": "郊区",
  "spell": "jiaoqu",
  "easy_spell": "jq",
  "city_id": "104" },

{
  "district_id": "972",
  "district_name": "铜陵县",
  "spell": "tonglingxian",
  "easy_spell": "tlx",
  "city_id": "104" },

{
  "district_id": "973",
  "district_name": "迎江区",
  "spell": "yingjiangqu",
  "easy_spell": "yjq",
  "city_id": "105" },

{
  "district_id": "974",
  "district_name": "大观区",
  "spell": "daguanqu",
  "easy_spell": "dgq",
  "city_id": "105" },

{
  "district_id": "975",
  "district_name": "郊区",
  "spell": "jiaoqu",
  "easy_spell": "jq",
  "city_id": "105" },

{
  "district_id": "976",
  "district_name": "怀宁县",
  "spell": "huainingxian",
  "easy_spell": "hnx",
  "city_id": "105" },

{
  "district_id": "977",
  "district_name": "枞阳县",
  "spell": "zuoyangxian",
  "easy_spell": "zyx",
  "city_id": "105" },

{
  "district_id": "978",
  "district_name": "潜山县",
  "spell": "qianshanxian",
  "easy_spell": "qsx",
  "city_id": "105" },

{
  "district_id": "979",
  "district_name": "太湖县",
  "spell": "taihuxian",
  "easy_spell": "thx",
  "city_id": "105" },

{
  "district_id": "980",
  "district_name": "宿松县",
  "spell": "susongxian",
  "easy_spell": "ssx",
  "city_id": "105" },

{
  "district_id": "981",
  "district_name": "望江县",
  "spell": "wangjiangxian",
  "easy_spell": "wjx",
  "city_id": "105" },

{
  "district_id": "982",
  "district_name": "岳西县",
  "spell": "yuexixian",
  "easy_spell": "yxx",
  "city_id": "105" },

{
  "district_id": "983",
  "district_name": "桐城市",
  "spell": "tongchengshi",
  "easy_spell": "tcs",
  "city_id": "105" },

{
  "district_id": "984",
  "district_name": "屯溪区",
  "spell": "tunxiqu",
  "easy_spell": "txq",
  "city_id": "106" },

{
  "district_id": "985",
  "district_name": "黄山区",
  "spell": "huangshanqu",
  "easy_spell": "hsq",
  "city_id": "106" },

{
  "district_id": "986",
  "district_name": "徽州区",
  "spell": "huizhouqu",
  "easy_spell": "hzq",
  "city_id": "106" },

{
  "district_id": "987",
  "district_name": "歙县",
  "spell": "zuoxian",
  "easy_spell": "zx",
  "city_id": "106" },

{
  "district_id": "988",
  "district_name": "休宁县",
  "spell": "xiuningxian",
  "easy_spell": "xnx",
  "city_id": "106" },

{
  "district_id": "989",
  "district_name": "黟县",
  "spell": "zuoxian",
  "easy_spell": "zx",
  "city_id": "106" },

{
  "district_id": "990",
  "district_name": "祁门县",
  "spell": "qimenxian",
  "easy_spell": "qmx",
  "city_id": "106" },

{
  "district_id": "991",
  "district_name": "琅琊区",
  "spell": "langzuoqu",
  "easy_spell": "lzq",
  "city_id": "107" },

{
  "district_id": "992",
  "district_name": "南谯区",
  "spell": "nanzuoqu",
  "easy_spell": "nzq",
  "city_id": "107" },

{
  "district_id": "993",
  "district_name": "来安县",
  "spell": "laianxian",
  "easy_spell": "lax",
  "city_id": "107" },

{
  "district_id": "994",
  "district_name": "全椒县",
  "spell": "quanjiaoxian",
  "easy_spell": "qjx",
  "city_id": "107" },

{
  "district_id": "995",
  "district_name": "定远县",
  "spell": "dingyuanxian",
  "easy_spell": "dyx",
  "city_id": "107" },

{
  "district_id": "996",
  "district_name": "凤阳县",
  "spell": "fengyangxian",
  "easy_spell": "fyx",
  "city_id": "107" },

{
  "district_id": "997",
  "district_name": "天长市",
  "spell": "tianchangshi",
  "easy_spell": "tcs",
  "city_id": "107" },

{
  "district_id": "998",
  "district_name": "明光市",
  "spell": "mingguangshi",
  "easy_spell": "mgs",
  "city_id": "107" },

{
  "district_id": "999",
  "district_name": "颍州区",
  "spell": "zuozhouqu",
  "easy_spell": "zzq",
  "city_id": "108" },

{
  "district_id": "1000",
  "district_name": "颍东区",
  "spell": "zuodongqu",
  "easy_spell": "zdq",
  "city_id": "108" },

{
  "district_id": "1001",
  "district_name": "颍泉区",
  "spell": "zuoquanqu",
  "easy_spell": "zqq",
  "city_id": "108" },

{
  "district_id": "1002",
  "district_name": "临泉县",
  "spell": "linquanxian",
  "easy_spell": "lqx",
  "city_id": "108" },

{
  "district_id": "1003",
  "district_name": "太和县",
  "spell": "taihexian",
  "easy_spell": "thx",
  "city_id": "108" },

{
  "district_id": "1004",
  "district_name": "阜南县",
  "spell": "funanxian",
  "easy_spell": "fnx",
  "city_id": "108" },

{
  "district_id": "1005",
  "district_name": "颍上县",
  "spell": "zuoshangxian",
  "easy_spell": "zsx",
  "city_id": "108" },

{
  "district_id": "1006",
  "district_name": "界首市",
  "spell": "jieshoushi",
  "easy_spell": "jss",
  "city_id": "108" },

{
  "district_id": "1007",
  "district_name": "埇桥区",
  "spell": "qiaoqu",
  "easy_spell": "埇qq",
  "city_id": "109" },

{
  "district_id": "1008",
  "district_name": "砀山县",
  "spell": "zuoshanxian",
  "easy_spell": "zsx",
  "city_id": "109" },

{
  "district_id": "1009",
  "district_name": "萧县",
  "spell": "xiaoxian",
  "easy_spell": "xx",
  "city_id": "109" },

{
  "district_id": "1010",
  "district_name": "灵璧县",
  "spell": "lingzuoxian",
  "easy_spell": "lzx",
  "city_id": "109" },

{
  "district_id": "1011",
  "district_name": "泗县",
  "spell": "zuoxian",
  "easy_spell": "zx",
  "city_id": "109" },

{
  "district_id": "1012",
  "district_name": "居巢区",
  "spell": "juchaoqu",
  "easy_spell": "jcq",
  "city_id": "110" },

{
  "district_id": "1013",
  "district_name": "庐江县",
  "spell": "lujiangxian",
  "easy_spell": "ljx",
  "city_id": "110" },

{
  "district_id": "1014",
  "district_name": "无为县",
  "spell": "wuweixian",
  "easy_spell": "wwx",
  "city_id": "110" },

{
  "district_id": "1015",
  "district_name": "含山县",
  "spell": "hanshanxian",
  "easy_spell": "hsx",
  "city_id": "110" },

{
  "district_id": "1016",
  "district_name": "和县",
  "spell": "hexian",
  "easy_spell": "hx",
  "city_id": "110" },

{
  "district_id": "1017",
  "district_name": "金安区",
  "spell": "jinanqu",
  "easy_spell": "jaq",
  "city_id": "111" },

{
  "district_id": "1018",
  "district_name": "裕安区",
  "spell": "yuanqu",
  "easy_spell": "yaq",
  "city_id": "111" },

{
  "district_id": "1019",
  "district_name": "寿县",
  "spell": "shouxian",
  "easy_spell": "sx",
  "city_id": "111" },

{
  "district_id": "1020",
  "district_name": "霍邱县",
  "spell": "huoqiuxian",
  "easy_spell": "hqx",
  "city_id": "111" },

{
  "district_id": "1021",
  "district_name": "舒城县",
  "spell": "shuchengxian",
  "easy_spell": "scx",
  "city_id": "111" },

{
  "district_id": "1022",
  "district_name": "金寨县",
  "spell": "jinzhaixian",
  "easy_spell": "jzx",
  "city_id": "111" },

{
  "district_id": "1023",
  "district_name": "霍山县",
  "spell": "huoshanxian",
  "easy_spell": "hsx",
  "city_id": "111" },

{
  "district_id": "1024",
  "district_name": "谯城区",
  "spell": "zuochengqu",
  "easy_spell": "zcq",
  "city_id": "112" },

{
  "district_id": "1025",
  "district_name": "涡阳县",
  "spell": "woyangxian",
  "easy_spell": "wyx",
  "city_id": "112" },

{
  "district_id": "1026",
  "district_name": "蒙城县",
  "spell": "mengchengxian",
  "easy_spell": "mcx",
  "city_id": "112" },

{
  "district_id": "1027",
  "district_name": "利辛县",
  "spell": "lixinxian",
  "easy_spell": "lxx",
  "city_id": "112" },

{
  "district_id": "1028",
  "district_name": "贵池区",
  "spell": "guichiqu",
  "easy_spell": "gcq",
  "city_id": "113" },

{
  "district_id": "1029",
  "district_name": "东至县",
  "spell": "dongzhixian",
  "easy_spell": "dzx",
  "city_id": "113" },

{
  "district_id": "1030",
  "district_name": "石台县",
  "spell": "shitaixian",
  "easy_spell": "stx",
  "city_id": "113" },

{
  "district_id": "1031",
  "district_name": "青阳县",
  "spell": "qingyangxian",
  "easy_spell": "qyx",
  "city_id": "113" },

{
  "district_id": "1032",
  "district_name": "宣州区",
  "spell": "xuanzhouqu",
  "easy_spell": "xzq",
  "city_id": "114" },

{
  "district_id": "1033",
  "district_name": "郎溪县",
  "spell": "langxixian",
  "easy_spell": "lxx",
  "city_id": "114" },

{
  "district_id": "1034",
  "district_name": "广德县",
  "spell": "guangdexian",
  "easy_spell": "gdx",
  "city_id": "114" },

{
  "district_id": "1035",
  "district_name": "泾县",
  "spell": "zuoxian",
  "easy_spell": "zx",
  "city_id": "114" },

{
  "district_id": "1036",
  "district_name": "绩溪县",
  "spell": "jixixian",
  "easy_spell": "jxx",
  "city_id": "114" },

{
  "district_id": "1037",
  "district_name": "旌德县",
  "spell": "zuodexian",
  "easy_spell": "zdx",
  "city_id": "114" },

{
  "district_id": "1038",
  "district_name": "宁国市",
  "spell": "ningguoshi",
  "easy_spell": "ngs",
  "city_id": "114" },

{
  "district_id": "1039",
  "district_name": "鼓楼区",
  "spell": "gulouqu",
  "easy_spell": "glq",
  "city_id": "115" },

{
  "district_id": "1040",
  "district_name": "台江区",
  "spell": "taijiangqu",
  "easy_spell": "tjq",
  "city_id": "115" },

{
  "district_id": "1041",
  "district_name": "仓山区",
  "spell": "cangshanqu",
  "easy_spell": "csq",
  "city_id": "115" },

{
  "district_id": "1042",
  "district_name": "马尾区",
  "spell": "maweiqu",
  "easy_spell": "mwq",
  "city_id": "115" },

{
  "district_id": "1043",
  "district_name": "晋安区",
  "spell": "jinanqu",
  "easy_spell": "jaq",
  "city_id": "115" },

{
  "district_id": "1044",
  "district_name": "闽侯县",
  "spell": "minhouxian",
  "easy_spell": "mhx",
  "city_id": "115" },

{
  "district_id": "1045",
  "district_name": "连江县",
  "spell": "lianjiangxian",
  "easy_spell": "ljx",
  "city_id": "115" },

{
  "district_id": "1046",
  "district_name": "罗源县",
  "spell": "luoyuanxian",
  "easy_spell": "lyx",
  "city_id": "115" },

{
  "district_id": "1047",
  "district_name": "闽清县",
  "spell": "minqingxian",
  "easy_spell": "mqx",
  "city_id": "115" },

{
  "district_id": "1048",
  "district_name": "永泰县",
  "spell": "yongtaixian",
  "easy_spell": "ytx",
  "city_id": "115" },

{
  "district_id": "1049",
  "district_name": "平潭县",
  "spell": "pingtanxian",
  "easy_spell": "ptx",
  "city_id": "115" },

{
  "district_id": "1050",
  "district_name": "福清市",
  "spell": "fuqingshi",
  "easy_spell": "fqs",
  "city_id": "115" },

{
  "district_id": "1051",
  "district_name": "长乐市",
  "spell": "changleshi",
  "easy_spell": "cls",
  "city_id": "115" },

{
  "district_id": "1052",
  "district_name": "思明区",
  "spell": "simingqu",
  "easy_spell": "smq",
  "city_id": "116" },

{
  "district_id": "1053",
  "district_name": "海沧区",
  "spell": "haicangqu",
  "easy_spell": "hcq",
  "city_id": "116" },

{
  "district_id": "1054",
  "district_name": "湖里区",
  "spell": "huliqu",
  "easy_spell": "hlq",
  "city_id": "116" },

{
  "district_id": "1055",
  "district_name": "集美区",
  "spell": "jimeiqu",
  "easy_spell": "jmq",
  "city_id": "116" },

{
  "district_id": "1056",
  "district_name": "同安区",
  "spell": "tonganqu",
  "easy_spell": "taq",
  "city_id": "116" },

{
  "district_id": "1057",
  "district_name": "翔安区",
  "spell": "xianganqu",
  "easy_spell": "xaq",
  "city_id": "116" },

{
  "district_id": "1058",
  "district_name": "城厢区",
  "spell": "chengxiangqu",
  "easy_spell": "cxq",
  "city_id": "117" },

{
  "district_id": "1059",
  "district_name": "涵江区",
  "spell": "hanjiangqu",
  "easy_spell": "hjq",
  "city_id": "117" },

{
  "district_id": "1060",
  "district_name": "荔城区",
  "spell": "lichengqu",
  "easy_spell": "lcq",
  "city_id": "117" },

{
  "district_id": "1061",
  "district_name": "秀屿区",
  "spell": "xiuyuqu",
  "easy_spell": "xyq",
  "city_id": "117" },

{
  "district_id": "1062",
  "district_name": "仙游县",
  "spell": "xianyouxian",
  "easy_spell": "xyx",
  "city_id": "117" },

{
  "district_id": "1063",
  "district_name": "梅列区",
  "spell": "meiliequ",
  "easy_spell": "mlq",
  "city_id": "118" },

{
  "district_id": "1064",
  "district_name": "三元区",
  "spell": "sanyuanqu",
  "easy_spell": "syq",
  "city_id": "118" },

{
  "district_id": "1065",
  "district_name": "明溪县",
  "spell": "mingxixian",
  "easy_spell": "mxx",
  "city_id": "118" },

{
  "district_id": "1066",
  "district_name": "清流县",
  "spell": "qingliuxian",
  "easy_spell": "qlx",
  "city_id": "118" },

{
  "district_id": "1067",
  "district_name": "宁化县",
  "spell": "ninghuaxian",
  "easy_spell": "nhx",
  "city_id": "118" },

{
  "district_id": "1068",
  "district_name": "大田县",
  "spell": "datianxian",
  "easy_spell": "dtx",
  "city_id": "118" },

{
  "district_id": "1069",
  "district_name": "尤溪县",
  "spell": "youxixian",
  "easy_spell": "yxx",
  "city_id": "118" },

{
  "district_id": "1070",
  "district_name": "沙县",
  "spell": "shaxian",
  "easy_spell": "sx",
  "city_id": "118" },

{
  "district_id": "1071",
  "district_name": "将乐县",
  "spell": "jianglexian",
  "easy_spell": "jlx",
  "city_id": "118" },

{
  "district_id": "1072",
  "district_name": "泰宁县",
  "spell": "tainingxian",
  "easy_spell": "tnx",
  "city_id": "118" },

{
  "district_id": "1073",
  "district_name": "建宁县",
  "spell": "jianningxian",
  "easy_spell": "jnx",
  "city_id": "118" },

{
  "district_id": "1074",
  "district_name": "永安市",
  "spell": "yonganshi",
  "easy_spell": "yas",
  "city_id": "118" },

{
  "district_id": "1075",
  "district_name": "鲤城区",
  "spell": "lichengqu",
  "easy_spell": "lcq",
  "city_id": "119" },

{
  "district_id": "1076",
  "district_name": "丰泽区",
  "spell": "fengzequ",
  "easy_spell": "fzq",
  "city_id": "119" },

{
  "district_id": "1077",
  "district_name": "洛江区",
  "spell": "luojiangqu",
  "easy_spell": "ljq",
  "city_id": "119" },

{
  "district_id": "1078",
  "district_name": "泉港区",
  "spell": "quangangqu",
  "easy_spell": "qgq",
  "city_id": "119" },

{
  "district_id": "1079",
  "district_name": "惠安县",
  "spell": "huianxian",
  "easy_spell": "hax",
  "city_id": "119" },

{
  "district_id": "1080",
  "district_name": "安溪县",
  "spell": "anxixian",
  "easy_spell": "axx",
  "city_id": "119" },

{
  "district_id": "1081",
  "district_name": "永春县",
  "spell": "yongchunxian",
  "easy_spell": "ycx",
  "city_id": "119" },

{
  "district_id": "1082",
  "district_name": "德化县",
  "spell": "dehuaxian",
  "easy_spell": "dhx",
  "city_id": "119" },

{
  "district_id": "1083",
  "district_name": "金门县",
  "spell": "jinmenxian",
  "easy_spell": "jmx",
  "city_id": "119" },

{
  "district_id": "1084",
  "district_name": "石狮市",
  "spell": "shishishi",
  "easy_spell": "sss",
  "city_id": "119" },

{
  "district_id": "1085",
  "district_name": "晋江市",
  "spell": "jinjiangshi",
  "easy_spell": "jjs",
  "city_id": "119" },

{
  "district_id": "1086",
  "district_name": "南安市",
  "spell": "nananshi",
  "easy_spell": "nas",
  "city_id": "119" },

{
  "district_id": "1087",
  "district_name": "芗城区",
  "spell": "zuochengqu",
  "easy_spell": "zcq",
  "city_id": "120" },

{
  "district_id": "1088",
  "district_name": "龙文区",
  "spell": "longwenqu",
  "easy_spell": "lwq",
  "city_id": "120" },

{
  "district_id": "1089",
  "district_name": "云霄县",
  "spell": "yunxiaoxian",
  "easy_spell": "yxx",
  "city_id": "120" },

{
  "district_id": "1090",
  "district_name": "漳浦县",
  "spell": "zhangpuxian",
  "easy_spell": "zpx",
  "city_id": "120" },

{
  "district_id": "1091",
  "district_name": "诏安县",
  "spell": "zuoanxian",
  "easy_spell": "zax",
  "city_id": "120" },

{
  "district_id": "1092",
  "district_name": "长泰县",
  "spell": "changtaixian",
  "easy_spell": "ctx",
  "city_id": "120" },

{
  "district_id": "1093",
  "district_name": "东山县",
  "spell": "dongshanxian",
  "easy_spell": "dsx",
  "city_id": "120" },

{
  "district_id": "1094",
  "district_name": "南靖县",
  "spell": "nanjingxian",
  "easy_spell": "njx",
  "city_id": "120" },

{
  "district_id": "1095",
  "district_name": "平和县",
  "spell": "pinghexian",
  "easy_spell": "phx",
  "city_id": "120" },

{
  "district_id": "1096",
  "district_name": "华安县",
  "spell": "huaanxian",
  "easy_spell": "hax",
  "city_id": "120" },

{
  "district_id": "1097",
  "district_name": "龙海市",
  "spell": "longhaishi",
  "easy_spell": "lhs",
  "city_id": "120" },

{
  "district_id": "1098",
  "district_name": "延平区",
  "spell": "yanpingqu",
  "easy_spell": "ypq",
  "city_id": "121" },

{
  "district_id": "1099",
  "district_name": "顺昌县",
  "spell": "shunchangxian",
  "easy_spell": "scx",
  "city_id": "121" },

{
  "district_id": "1100",
  "district_name": "浦城县",
  "spell": "puchengxian",
  "easy_spell": "pcx",
  "city_id": "121" },

{
  "district_id": "1101",
  "district_name": "光泽县",
  "spell": "guangzexian",
  "easy_spell": "gzx",
  "city_id": "121" },

{
  "district_id": "1102",
  "district_name": "松溪县",
  "spell": "songxixian",
  "easy_spell": "sxx",
  "city_id": "121" },

{
  "district_id": "1103",
  "district_name": "政和县",
  "spell": "zhenghexian",
  "easy_spell": "zhx",
  "city_id": "121" },

{
  "district_id": "1104",
  "district_name": "邵武市",
  "spell": "shaowushi",
  "easy_spell": "sws",
  "city_id": "121" },

{
  "district_id": "1105",
  "district_name": "武夷山市",
  "spell": "wuyishanshi",
  "easy_spell": "wyss",
  "city_id": "121" },

{
  "district_id": "1106",
  "district_name": "建瓯市",
  "spell": "jianzuoshi",
  "easy_spell": "jzs",
  "city_id": "121" },

{
  "district_id": "1107",
  "district_name": "建阳市",
  "spell": "jianyangshi",
  "easy_spell": "jys",
  "city_id": "121" },

{
  "district_id": "1108",
  "district_name": "新罗区",
  "spell": "xinluoqu",
  "easy_spell": "xlq",
  "city_id": "122" },

{
  "district_id": "1109",
  "district_name": "长汀县",
  "spell": "changtingxian",
  "easy_spell": "ctx",
  "city_id": "122" },

{
  "district_id": "1110",
  "district_name": "永定县",
  "spell": "yongdingxian",
  "easy_spell": "ydx",
  "city_id": "122" },

{
  "district_id": "1111",
  "district_name": "上杭县",
  "spell": "shanghangxian",
  "easy_spell": "shx",
  "city_id": "122" },

{
  "district_id": "1112",
  "district_name": "武平县",
  "spell": "wupingxian",
  "easy_spell": "wpx",
  "city_id": "122" },

{
  "district_id": "1113",
  "district_name": "连城县",
  "spell": "lianchengxian",
  "easy_spell": "lcx",
  "city_id": "122" },

{
  "district_id": "1114",
  "district_name": "漳平市",
  "spell": "zhangpingshi",
  "easy_spell": "zps",
  "city_id": "122" },

{
  "district_id": "1115",
  "district_name": "蕉城区",
  "spell": "jiaochengqu",
  "easy_spell": "jcq",
  "city_id": "123" },

{
  "district_id": "1116",
  "district_name": "霞浦县",
  "spell": "xiapuxian",
  "easy_spell": "xpx",
  "city_id": "123" },

{
  "district_id": "1117",
  "district_name": "古田县",
  "spell": "gutianxian",
  "easy_spell": "gtx",
  "city_id": "123" },

{
  "district_id": "1118",
  "district_name": "屏南县",
  "spell": "pingnanxian",
  "easy_spell": "pnx",
  "city_id": "123" },

{
  "district_id": "1119",
  "district_name": "寿宁县",
  "spell": "shouningxian",
  "easy_spell": "snx",
  "city_id": "123" },

{
  "district_id": "1120",
  "district_name": "周宁县",
  "spell": "zhouningxian",
  "easy_spell": "znx",
  "city_id": "123" },

{
  "district_id": "1121",
  "district_name": "柘荣县",
  "spell": "zuorongxian",
  "easy_spell": "zrx",
  "city_id": "123" },

{
  "district_id": "1122",
  "district_name": "福安市",
  "spell": "fuanshi",
  "easy_spell": "fas",
  "city_id": "123" },

{
  "district_id": "1123",
  "district_name": "福鼎市",
  "spell": "fudingshi",
  "easy_spell": "fds",
  "city_id": "123" },

{
  "district_id": "1124",
  "district_name": "东湖区",
  "spell": "donghuqu",
  "easy_spell": "dhq",
  "city_id": "124" },

{
  "district_id": "1125",
  "district_name": "西湖区",
  "spell": "xihuqu",
  "easy_spell": "xhq",
  "city_id": "124" },

{
  "district_id": "1126",
  "district_name": "青云谱区",
  "spell": "qingyunpuqu",
  "easy_spell": "qypq",
  "city_id": "124" },

{
  "district_id": "1127",
  "district_name": "湾里区",
  "spell": "wanliqu",
  "easy_spell": "wlq",
  "city_id": "124" },

{
  "district_id": "1128",
  "district_name": "青山湖区",
  "spell": "qingshanhuqu",
  "easy_spell": "qshq",
  "city_id": "124" },

{
  "district_id": "1129",
  "district_name": "南昌县",
  "spell": "nanchangxian",
  "easy_spell": "ncx",
  "city_id": "124" },

{
  "district_id": "1130",
  "district_name": "新建县",
  "spell": "xinjianxian",
  "easy_spell": "xjx",
  "city_id": "124" },

{
  "district_id": "1131",
  "district_name": "安义县",
  "spell": "anyixian",
  "easy_spell": "ayx",
  "city_id": "124" },

{
  "district_id": "1132",
  "district_name": "进贤县",
  "spell": "jinxianxian",
  "easy_spell": "jxx",
  "city_id": "124" },

{
  "district_id": "1133",
  "district_name": "昌江区",
  "spell": "changjiangqu",
  "easy_spell": "cjq",
  "city_id": "125" },

{
  "district_id": "1134",
  "district_name": "珠山区",
  "spell": "zhushanqu",
  "easy_spell": "zsq",
  "city_id": "125" },

{
  "district_id": "1135",
  "district_name": "浮梁县",
  "spell": "fuliangxian",
  "easy_spell": "flx",
  "city_id": "125" },

{
  "district_id": "1136",
  "district_name": "乐平市",
  "spell": "lepingshi",
  "easy_spell": "lps",
  "city_id": "125" },

{
  "district_id": "1137",
  "district_name": "安源区",
  "spell": "anyuanqu",
  "easy_spell": "ayq",
  "city_id": "126" },

{
  "district_id": "1138",
  "district_name": "湘东区",
  "spell": "xiangdongqu",
  "easy_spell": "xdq",
  "city_id": "126" },

{
  "district_id": "1139",
  "district_name": "莲花县",
  "spell": "lianhuaxian",
  "easy_spell": "lhx",
  "city_id": "126" },

{
  "district_id": "1140",
  "district_name": "上栗县",
  "spell": "shanglixian",
  "easy_spell": "slx",
  "city_id": "126" },

{
  "district_id": "1141",
  "district_name": "芦溪县",
  "spell": "luxixian",
  "easy_spell": "lxx",
  "city_id": "126" },

{
  "district_id": "1142",
  "district_name": "庐山区",
  "spell": "lushanqu",
  "easy_spell": "lsq",
  "city_id": "127" },

{
  "district_id": "1143",
  "district_name": "浔阳区",
  "spell": "zuoyangqu",
  "easy_spell": "zyq",
  "city_id": "127" },

{
  "district_id": "1144",
  "district_name": "九江县",
  "spell": "jiujiangxian",
  "easy_spell": "jjx",
  "city_id": "127" },

{
  "district_id": "1145",
  "district_name": "武宁县",
  "spell": "wuningxian",
  "easy_spell": "wnx",
  "city_id": "127" },

{
  "district_id": "1146",
  "district_name": "修水县",
  "spell": "xiushuixian",
  "easy_spell": "xsx",
  "city_id": "127" },

{
  "district_id": "1147",
  "district_name": "永修县",
  "spell": "yongxiuxian",
  "easy_spell": "yxx",
  "city_id": "127" },

{
  "district_id": "1148",
  "district_name": "德安县",
  "spell": "deanxian",
  "easy_spell": "dax",
  "city_id": "127" },

{
  "district_id": "1149",
  "district_name": "星子县",
  "spell": "xingzixian",
  "easy_spell": "xzx",
  "city_id": "127" },

{
  "district_id": "1150",
  "district_name": "都昌县",
  "spell": "duchangxian",
  "easy_spell": "dcx",
  "city_id": "127" },

{
  "district_id": "1151",
  "district_name": "湖口县",
  "spell": "hukouxian",
  "easy_spell": "hkx",
  "city_id": "127" },

{
  "district_id": "1152",
  "district_name": "彭泽县",
  "spell": "pengzexian",
  "easy_spell": "pzx",
  "city_id": "127" },

{
  "district_id": "1153",
  "district_name": "瑞昌市",
  "spell": "ruichangshi",
  "easy_spell": "rcs",
  "city_id": "127" },

{
  "district_id": "1154",
  "district_name": "渝水区",
  "spell": "yushuiqu",
  "easy_spell": "ysq",
  "city_id": "128" },

{
  "district_id": "1155",
  "district_name": "分宜县",
  "spell": "fenyixian",
  "easy_spell": "fyx",
  "city_id": "128" },

{
  "district_id": "1156",
  "district_name": "月湖区",
  "spell": "yuehuqu",
  "easy_spell": "yhq",
  "city_id": "129" },

{
  "district_id": "1157",
  "district_name": "余江县",
  "spell": "yujiangxian",
  "easy_spell": "yjx",
  "city_id": "129" },

{
  "district_id": "1158",
  "district_name": "贵溪市",
  "spell": "guixishi",
  "easy_spell": "gxs",
  "city_id": "129" },

{
  "district_id": "1159",
  "district_name": "章贡区",
  "spell": "zhanggongqu",
  "easy_spell": "zgq",
  "city_id": "130" },

{
  "district_id": "1160",
  "district_name": "赣县",
  "spell": "ganxian",
  "easy_spell": "gx",
  "city_id": "130" },

{
  "district_id": "1161",
  "district_name": "信丰县",
  "spell": "xinfengxian",
  "easy_spell": "xfx",
  "city_id": "130" },

{
  "district_id": "1162",
  "district_name": "大余县",
  "spell": "dayuxian",
  "easy_spell": "dyx",
  "city_id": "130" },

{
  "district_id": "1163",
  "district_name": "上犹县",
  "spell": "shangyouxian",
  "easy_spell": "syx",
  "city_id": "130" },

{
  "district_id": "1164",
  "district_name": "崇义县",
  "spell": "chongyixian",
  "easy_spell": "cyx",
  "city_id": "130" },

{
  "district_id": "1165",
  "district_name": "安远县",
  "spell": "anyuanxian",
  "easy_spell": "ayx",
  "city_id": "130" },

{
  "district_id": "1166",
  "district_name": "龙南县",
  "spell": "longnanxian",
  "easy_spell": "lnx",
  "city_id": "130" },

{
  "district_id": "1167",
  "district_name": "定南县",
  "spell": "dingnanxian",
  "easy_spell": "dnx",
  "city_id": "130" },

{
  "district_id": "1168",
  "district_name": "全南县",
  "spell": "quannanxian",
  "easy_spell": "qnx",
  "city_id": "130" },

{
  "district_id": "1169",
  "district_name": "宁都县",
  "spell": "ningduxian",
  "easy_spell": "ndx",
  "city_id": "130" },

{
  "district_id": "1170",
  "district_name": "于都县",
  "spell": "yuduxian",
  "easy_spell": "ydx",
  "city_id": "130" },

{
  "district_id": "1171",
  "district_name": "兴国县",
  "spell": "xingguoxian",
  "easy_spell": "xgx",
  "city_id": "130" },

{
  "district_id": "1172",
  "district_name": "会昌县",
  "spell": "huichangxian",
  "easy_spell": "hcx",
  "city_id": "130" },

{
  "district_id": "1173",
  "district_name": "寻乌县",
  "spell": "xunwuxian",
  "easy_spell": "xwx",
  "city_id": "130" },

{
  "district_id": "1174",
  "district_name": "石城县",
  "spell": "shichengxian",
  "easy_spell": "scx",
  "city_id": "130" },

{
  "district_id": "1175",
  "district_name": "瑞金市",
  "spell": "ruijinshi",
  "easy_spell": "rjs",
  "city_id": "130" },

{
  "district_id": "1176",
  "district_name": "南康市",
  "spell": "nankangshi",
  "easy_spell": "nks",
  "city_id": "130" },

{
  "district_id": "1177",
  "district_name": "吉州区",
  "spell": "jizhouqu",
  "easy_spell": "jzq",
  "city_id": "131" },

{
  "district_id": "1178",
  "district_name": "青原区",
  "spell": "qingyuanqu",
  "easy_spell": "qyq",
  "city_id": "131" },

{
  "district_id": "1179",
  "district_name": "吉安县",
  "spell": "jianxian",
  "easy_spell": "jax",
  "city_id": "131" },

{
  "district_id": "1180",
  "district_name": "吉水县",
  "spell": "jishuixian",
  "easy_spell": "jsx",
  "city_id": "131" },

{
  "district_id": "1181",
  "district_name": "峡江县",
  "spell": "xiajiangxian",
  "easy_spell": "xjx",
  "city_id": "131" },

{
  "district_id": "1182",
  "district_name": "新干县",
  "spell": "xinganxian",
  "easy_spell": "xgx",
  "city_id": "131" },

{
  "district_id": "1183",
  "district_name": "永丰县",
  "spell": "yongfengxian",
  "easy_spell": "yfx",
  "city_id": "131" },

{
  "district_id": "1184",
  "district_name": "泰和县",
  "spell": "taihexian",
  "easy_spell": "thx",
  "city_id": "131" },

{
  "district_id": "1185",
  "district_name": "遂川县",
  "spell": "suichuanxian",
  "easy_spell": "scx",
  "city_id": "131" },

{
  "district_id": "1186",
  "district_name": "万安县",
  "spell": "wananxian",
  "easy_spell": "wax",
  "city_id": "131" },

{
  "district_id": "1187",
  "district_name": "安福县",
  "spell": "anfuxian",
  "easy_spell": "afx",
  "city_id": "131" },

{
  "district_id": "1188",
  "district_name": "永新县",
  "spell": "yongxinxian",
  "easy_spell": "yxx",
  "city_id": "131" },

{
  "district_id": "1189",
  "district_name": "井冈山市",
  "spell": "jinggangshanshi",
  "easy_spell": "jgss",
  "city_id": "131" },

{
  "district_id": "1190",
  "district_name": "袁州区",
  "spell": "yuanzhouqu",
  "easy_spell": "yzq",
  "city_id": "132" },

{
  "district_id": "1191",
  "district_name": "奉新县",
  "spell": "fengxinxian",
  "easy_spell": "fxx",
  "city_id": "132" },

{
  "district_id": "1192",
  "district_name": "万载县",
  "spell": "wanzaixian",
  "easy_spell": "wzx",
  "city_id": "132" },

{
  "district_id": "1193",
  "district_name": "上高县",
  "spell": "shanggaoxian",
  "easy_spell": "sgx",
  "city_id": "132" },

{
  "district_id": "1194",
  "district_name": "宜丰县",
  "spell": "yifengxian",
  "easy_spell": "yfx",
  "city_id": "132" },

{
  "district_id": "1195",
  "district_name": "靖安县",
  "spell": "jinganxian",
  "easy_spell": "jax",
  "city_id": "132" },

{
  "district_id": "1196",
  "district_name": "铜鼓县",
  "spell": "tongguxian",
  "easy_spell": "tgx",
  "city_id": "132" },

{
  "district_id": "1197",
  "district_name": "丰城市",
  "spell": "fengchengshi",
  "easy_spell": "fcs",
  "city_id": "132" },

{
  "district_id": "1198",
  "district_name": "樟树市",
  "spell": "zhangshushi",
  "easy_spell": "zss",
  "city_id": "132" },

{
  "district_id": "1199",
  "district_name": "高安市",
  "spell": "gaoanshi",
  "easy_spell": "gas",
  "city_id": "132" },

{
  "district_id": "1200",
  "district_name": "临川区",
  "spell": "linchuanqu",
  "easy_spell": "lcq",
  "city_id": "133" },

{
  "district_id": "1201",
  "district_name": "南城县",
  "spell": "nanchengxian",
  "easy_spell": "ncx",
  "city_id": "133" },

{
  "district_id": "1202",
  "district_name": "黎川县",
  "spell": "lichuanxian",
  "easy_spell": "lcx",
  "city_id": "133" },

{
  "district_id": "1203",
  "district_name": "南丰县",
  "spell": "nanfengxian",
  "easy_spell": "nfx",
  "city_id": "133" },

{
  "district_id": "1204",
  "district_name": "崇仁县",
  "spell": "chongrenxian",
  "easy_spell": "crx",
  "city_id": "133" },

{
  "district_id": "1205",
  "district_name": "乐安县",
  "spell": "leanxian",
  "easy_spell": "lax",
  "city_id": "133" },

{
  "district_id": "1206",
  "district_name": "宜黄县",
  "spell": "yihuangxian",
  "easy_spell": "yhx",
  "city_id": "133" },

{
  "district_id": "1207",
  "district_name": "金溪县",
  "spell": "jinxixian",
  "easy_spell": "jxx",
  "city_id": "133" },

{
  "district_id": "1208",
  "district_name": "资溪县",
  "spell": "zixixian",
  "easy_spell": "zxx",
  "city_id": "133" },

{
  "district_id": "1209",
  "district_name": "东乡县",
  "spell": "dongxiangxian",
  "easy_spell": "dxx",
  "city_id": "133" },

{
  "district_id": "1210",
  "district_name": "广昌县",
  "spell": "guangchangxian",
  "easy_spell": "gcx",
  "city_id": "133" },

{
  "district_id": "1211",
  "district_name": "信州区",
  "spell": "xinzhouqu",
  "easy_spell": "xzq",
  "city_id": "134" },

{
  "district_id": "1212",
  "district_name": "上饶县",
  "spell": "shangraoxian",
  "easy_spell": "srx",
  "city_id": "134" },

{
  "district_id": "1213",
  "district_name": "广丰县",
  "spell": "guangfengxian",
  "easy_spell": "gfx",
  "city_id": "134" },

{
  "district_id": "1214",
  "district_name": "玉山县",
  "spell": "yushanxian",
  "easy_spell": "ysx",
  "city_id": "134" },

{
  "district_id": "1215",
  "district_name": "铅山县",
  "spell": "qianshanxian",
  "easy_spell": "qsx",
  "city_id": "134" },

{
  "district_id": "1216",
  "district_name": "横峰县",
  "spell": "hengfengxian",
  "easy_spell": "hfx",
  "city_id": "134" },

{
  "district_id": "1217",
  "district_name": "弋阳县",
  "spell": "zuoyangxian",
  "easy_spell": "zyx",
  "city_id": "134" },

{
  "district_id": "1218",
  "district_name": "余干县",
  "spell": "yuganxian",
  "easy_spell": "ygx",
  "city_id": "134" },

{
  "district_id": "1219",
  "district_name": "鄱阳县",
  "spell": "zuoyangxian",
  "easy_spell": "zyx",
  "city_id": "134" },

{
  "district_id": "1220",
  "district_name": "万年县",
  "spell": "wannianxian",
  "easy_spell": "wnx",
  "city_id": "134" },

{
  "district_id": "1221",
  "district_name": "婺源县",
  "spell": "zuoyuanxian",
  "easy_spell": "zyx",
  "city_id": "134" },

{
  "district_id": "1222",
  "district_name": "德兴市",
  "spell": "dexingshi",
  "easy_spell": "dxs",
  "city_id": "134" },

{
  "district_id": "1223",
  "district_name": "历下区",
  "spell": "lixiaqu",
  "easy_spell": "lxq",
  "city_id": "135" },

{
  "district_id": "1224",
  "district_name": "市中区",
  "spell": "shizhongqu",
  "easy_spell": "szq",
  "city_id": "135" },

{
  "district_id": "1225",
  "district_name": "槐荫区",
  "spell": "huaiyinqu",
  "easy_spell": "hyq",
  "city_id": "135" },

{
  "district_id": "1226",
  "district_name": "天桥区",
  "spell": "tianqiaoqu",
  "easy_spell": "tqq",
  "city_id": "135" },

{
  "district_id": "1227",
  "district_name": "历城区",
  "spell": "lichengqu",
  "easy_spell": "lcq",
  "city_id": "135" },

{
  "district_id": "1228",
  "district_name": "长清区",
  "spell": "changqingqu",
  "easy_spell": "cqq",
  "city_id": "135" },

{
  "district_id": "1229",
  "district_name": "平阴县",
  "spell": "pingyinxian",
  "easy_spell": "pyx",
  "city_id": "135" },

{
  "district_id": "1230",
  "district_name": "济阳县",
  "spell": "jiyangxian",
  "easy_spell": "jyx",
  "city_id": "135" },

{
  "district_id": "1231",
  "district_name": "商河县",
  "spell": "shanghexian",
  "easy_spell": "shx",
  "city_id": "135" },

{
  "district_id": "1232",
  "district_name": "章丘市",
  "spell": "zhangqiushi",
  "easy_spell": "zqs",
  "city_id": "135" },

{
  "district_id": "1233",
  "district_name": "市南区",
  "spell": "shinanqu",
  "easy_spell": "snq",
  "city_id": "136" },

{
  "district_id": "1234",
  "district_name": "市北区",
  "spell": "shibeiqu",
  "easy_spell": "sbq",
  "city_id": "136" },

{
  "district_id": "1235",
  "district_name": "四方区",
  "spell": "sifangqu",
  "easy_spell": "sfq",
  "city_id": "136" },

{
  "district_id": "1236",
  "district_name": "黄岛区",
  "spell": "huangdaoqu",
  "easy_spell": "hdq",
  "city_id": "136" },

{
  "district_id": "1237",
  "district_name": "崂山区",
  "spell": "zuoshanqu",
  "easy_spell": "zsq",
  "city_id": "136" },

{
  "district_id": "1238",
  "district_name": "李沧区",
  "spell": "licangqu",
  "easy_spell": "lcq",
  "city_id": "136" },

{
  "district_id": "1239",
  "district_name": "城阳区",
  "spell": "chengyangqu",
  "easy_spell": "cyq",
  "city_id": "136" },

{
  "district_id": "1240",
  "district_name": "胶州市",
  "spell": "jiaozhoushi",
  "easy_spell": "jzs",
  "city_id": "136" },

{
  "district_id": "1241",
  "district_name": "即墨市",
  "spell": "jimoshi",
  "easy_spell": "jms",
  "city_id": "136" },

{
  "district_id": "1242",
  "district_name": "平度市",
  "spell": "pingdushi",
  "easy_spell": "pds",
  "city_id": "136" },

{
  "district_id": "1243",
  "district_name": "胶南市",
  "spell": "jiaonanshi",
  "easy_spell": "jns",
  "city_id": "136" },

{
  "district_id": "1244",
  "district_name": "莱西市",
  "spell": "laixishi",
  "easy_spell": "lxs",
  "city_id": "136" },

{
  "district_id": "1245",
  "district_name": "淄川区",
  "spell": "zichuanqu",
  "easy_spell": "zcq",
  "city_id": "137" },

{
  "district_id": "1246",
  "district_name": "张店区",
  "spell": "zhangdianqu",
  "easy_spell": "zdq",
  "city_id": "137" },

{
  "district_id": "1247",
  "district_name": "博山区",
  "spell": "boshanqu",
  "easy_spell": "bsq",
  "city_id": "137" },

{
  "district_id": "1248",
  "district_name": "临淄区",
  "spell": "linziqu",
  "easy_spell": "lzq",
  "city_id": "137" },

{
  "district_id": "1249",
  "district_name": "周村区",
  "spell": "zhoucunqu",
  "easy_spell": "zcq",
  "city_id": "137" },

{
  "district_id": "1250",
  "district_name": "桓台县",
  "spell": "huantaixian",
  "easy_spell": "htx",
  "city_id": "137" },

{
  "district_id": "1251",
  "district_name": "高青县",
  "spell": "gaoqingxian",
  "easy_spell": "gqx",
  "city_id": "137" },

{
  "district_id": "1252",
  "district_name": "沂源县",
  "spell": "yiyuanxian",
  "easy_spell": "yyx",
  "city_id": "137" },

{
  "district_id": "1253",
  "district_name": "市中区",
  "spell": "shizhongqu",
  "easy_spell": "szq",
  "city_id": "138" },

{
  "district_id": "1254",
  "district_name": "薛城区",
  "spell": "xuechengqu",
  "easy_spell": "xcq",
  "city_id": "138" },

{
  "district_id": "1255",
  "district_name": "峄城区",
  "spell": "zuochengqu",
  "easy_spell": "zcq",
  "city_id": "138" },

{
  "district_id": "1256",
  "district_name": "台儿庄区",
  "spell": "taierzhuangqu",
  "easy_spell": "tezq",
  "city_id": "138" },

{
  "district_id": "1257",
  "district_name": "山亭区",
  "spell": "shantingqu",
  "easy_spell": "stq",
  "city_id": "138" },

{
  "district_id": "1258",
  "district_name": "滕州市",
  "spell": "zuozhoushi",
  "easy_spell": "zzs",
  "city_id": "138" },

{
  "district_id": "1259",
  "district_name": "东营区",
  "spell": "dongyingqu",
  "easy_spell": "dyq",
  "city_id": "139" },

{
  "district_id": "1260",
  "district_name": "河口区",
  "spell": "hekouqu",
  "easy_spell": "hkq",
  "city_id": "139" },

{
  "district_id": "1261",
  "district_name": "垦利县",
  "spell": "kenlixian",
  "easy_spell": "klx",
  "city_id": "139" },

{
  "district_id": "1262",
  "district_name": "利津县",
  "spell": "lijinxian",
  "easy_spell": "ljx",
  "city_id": "139" },

{
  "district_id": "1263",
  "district_name": "广饶县",
  "spell": "guangraoxian",
  "easy_spell": "grx",
  "city_id": "139" },

{
  "district_id": "1264",
  "district_name": "芝罘区",
  "spell": "zhizuoqu",
  "easy_spell": "zzq",
  "city_id": "140" },

{
  "district_id": "1265",
  "district_name": "福山区",
  "spell": "fushanqu",
  "easy_spell": "fsq",
  "city_id": "140" },

{
  "district_id": "1266",
  "district_name": "牟平区",
  "spell": "moupingqu",
  "easy_spell": "mpq",
  "city_id": "140" },

{
  "district_id": "1267",
  "district_name": "莱山区",
  "spell": "laishanqu",
  "easy_spell": "lsq",
  "city_id": "140" },

{
  "district_id": "1268",
  "district_name": "长岛县",
  "spell": "changdaoxian",
  "easy_spell": "cdx",
  "city_id": "140" },

{
  "district_id": "1269",
  "district_name": "龙口市",
  "spell": "longkoushi",
  "easy_spell": "lks",
  "city_id": "140" },

{
  "district_id": "1270",
  "district_name": "莱阳市",
  "spell": "laiyangshi",
  "easy_spell": "lys",
  "city_id": "140" },

{
  "district_id": "1271",
  "district_name": "莱州市",
  "spell": "laizhoushi",
  "easy_spell": "lzs",
  "city_id": "140" },

{
  "district_id": "1272",
  "district_name": "蓬莱市",
  "spell": "penglaishi",
  "easy_spell": "pls",
  "city_id": "140" },

{
  "district_id": "1273",
  "district_name": "招远市",
  "spell": "zhaoyuanshi",
  "easy_spell": "zys",
  "city_id": "140" },

{
  "district_id": "1274",
  "district_name": "栖霞市",
  "spell": "qixiashi",
  "easy_spell": "qxs",
  "city_id": "140" },

{
  "district_id": "1275",
  "district_name": "海阳市",
  "spell": "haiyangshi",
  "easy_spell": "hys",
  "city_id": "140" },

{
  "district_id": "1276",
  "district_name": "潍城区",
  "spell": "weichengqu",
  "easy_spell": "wcq",
  "city_id": "141" },

{
  "district_id": "1277",
  "district_name": "寒亭区",
  "spell": "hantingqu",
  "easy_spell": "htq",
  "city_id": "141" },

{
  "district_id": "1278",
  "district_name": "坊子区",
  "spell": "fangziqu",
  "easy_spell": "fzq",
  "city_id": "141" },

{
  "district_id": "1279",
  "district_name": "奎文区",
  "spell": "kuiwenqu",
  "easy_spell": "kwq",
  "city_id": "141" },

{
  "district_id": "1280",
  "district_name": "临朐县",
  "spell": "linzuoxian",
  "easy_spell": "lzx",
  "city_id": "141" },

{
  "district_id": "1281",
  "district_name": "昌乐县",
  "spell": "changlexian",
  "easy_spell": "clx",
  "city_id": "141" },

{
  "district_id": "1282",
  "district_name": "青州市",
  "spell": "qingzhoushi",
  "easy_spell": "qzs",
  "city_id": "141" },

{
  "district_id": "1283",
  "district_name": "诸城市",
  "spell": "zhuchengshi",
  "easy_spell": "zcs",
  "city_id": "141" },

{
  "district_id": "1284",
  "district_name": "寿光市",
  "spell": "shouguangshi",
  "easy_spell": "sgs",
  "city_id": "141" },

{
  "district_id": "1285",
  "district_name": "安丘市",
  "spell": "anqiushi",
  "easy_spell": "aqs",
  "city_id": "141" },

{
  "district_id": "1286",
  "district_name": "高密市",
  "spell": "gaomishi",
  "easy_spell": "gms",
  "city_id": "141" },

{
  "district_id": "1287",
  "district_name": "昌邑市",
  "spell": "changyishi",
  "easy_spell": "cys",
  "city_id": "141" },

{
  "district_id": "1288",
  "district_name": "市中区",
  "spell": "shizhongqu",
  "easy_spell": "szq",
  "city_id": "142" },

{
  "district_id": "1289",
  "district_name": "任城区",
  "spell": "renchengqu",
  "easy_spell": "rcq",
  "city_id": "142" },

{
  "district_id": "1290",
  "district_name": "微山县",
  "spell": "weishanxian",
  "easy_spell": "wsx",
  "city_id": "142" },

{
  "district_id": "1291",
  "district_name": "鱼台县",
  "spell": "yutaixian",
  "easy_spell": "ytx",
  "city_id": "142" },

{
  "district_id": "1292",
  "district_name": "金乡县",
  "spell": "jinxiangxian",
  "easy_spell": "jxx",
  "city_id": "142" },

{
  "district_id": "1293",
  "district_name": "嘉祥县",
  "spell": "jiaxiangxian",
  "easy_spell": "jxx",
  "city_id": "142" },

{
  "district_id": "1294",
  "district_name": "汶上县",
  "spell": "zuoshangxian",
  "easy_spell": "zsx",
  "city_id": "142" },

{
  "district_id": "1295",
  "district_name": "泗水县",
  "spell": "zuoshuixian",
  "easy_spell": "zsx",
  "city_id": "142" },

{
  "district_id": "1296",
  "district_name": "梁山县",
  "spell": "liangshanxian",
  "easy_spell": "lsx",
  "city_id": "142" },

{
  "district_id": "1297",
  "district_name": "曲阜市",
  "spell": "qufushi",
  "easy_spell": "qfs",
  "city_id": "142" },

{
  "district_id": "1298",
  "district_name": "兖州市",
  "spell": "zuozhoushi",
  "easy_spell": "zzs",
  "city_id": "142" },

{
  "district_id": "1299",
  "district_name": "邹城市",
  "spell": "zouchengshi",
  "easy_spell": "zcs",
  "city_id": "142" },

{
  "district_id": "1300",
  "district_name": "泰山区",
  "spell": "taishanqu",
  "easy_spell": "tsq",
  "city_id": "143" },

{
  "district_id": "1301",
  "district_name": "岱岳区",
  "spell": "zuoyuequ",
  "easy_spell": "zyq",
  "city_id": "143" },

{
  "district_id": "1302",
  "district_name": "宁阳县",
  "spell": "ningyangxian",
  "easy_spell": "nyx",
  "city_id": "143" },

{
  "district_id": "1303",
  "district_name": "东平县",
  "spell": "dongpingxian",
  "easy_spell": "dpx",
  "city_id": "143" },

{
  "district_id": "1304",
  "district_name": "新泰市",
  "spell": "xintaishi",
  "easy_spell": "xts",
  "city_id": "143" },

{
  "district_id": "1305",
  "district_name": "肥城市",
  "spell": "feichengshi",
  "easy_spell": "fcs",
  "city_id": "143" },

{
  "district_id": "1306",
  "district_name": "环翠区",
  "spell": "huancuiqu",
  "easy_spell": "hcq",
  "city_id": "144" },

{
  "district_id": "1307",
  "district_name": "文登市",
  "spell": "wendengshi",
  "easy_spell": "wds",
  "city_id": "144" },

{
  "district_id": "1308",
  "district_name": "荣成市",
  "spell": "rongchengshi",
  "easy_spell": "rcs",
  "city_id": "144" },

{
  "district_id": "1309",
  "district_name": "乳山市",
  "spell": "rushanshi",
  "easy_spell": "rss",
  "city_id": "144" },

{
  "district_id": "1310",
  "district_name": "东港区",
  "spell": "donggangqu",
  "easy_spell": "dgq",
  "city_id": "145" },

{
  "district_id": "1311",
  "district_name": "岚山区",
  "spell": "zuoshanqu",
  "easy_spell": "zsq",
  "city_id": "145" },

{
  "district_id": "1312",
  "district_name": "五莲县",
  "spell": "wulianxian",
  "easy_spell": "wlx",
  "city_id": "145" },

{
  "district_id": "1313",
  "district_name": "莒县",
  "spell": "zuoxian",
  "easy_spell": "zx",
  "city_id": "145" },

{
  "district_id": "1314",
  "district_name": "莱城区",
  "spell": "laichengqu",
  "easy_spell": "lcq",
  "city_id": "146" },

{
  "district_id": "1315",
  "district_name": "钢城区",
  "spell": "gangchengqu",
  "easy_spell": "gcq",
  "city_id": "146" },

{
  "district_id": "1316",
  "district_name": "兰山区",
  "spell": "lanshanqu",
  "easy_spell": "lsq",
  "city_id": "147" },

{
  "district_id": "1317",
  "district_name": "罗庄区",
  "spell": "luozhuangqu",
  "easy_spell": "lzq",
  "city_id": "147" },

{
  "district_id": "1318",
  "district_name": "河东区",
  "spell": "hedongqu",
  "easy_spell": "hdq",
  "city_id": "147" },

{
  "district_id": "1319",
  "district_name": "沂南县",
  "spell": "yinanxian",
  "easy_spell": "ynx",
  "city_id": "147" },

{
  "district_id": "1320",
  "district_name": "郯城县",
  "spell": "zuochengxian",
  "easy_spell": "zcx",
  "city_id": "147" },

{
  "district_id": "1321",
  "district_name": "沂水县",
  "spell": "yishuixian",
  "easy_spell": "ysx",
  "city_id": "147" },

{
  "district_id": "1322",
  "district_name": "苍山县",
  "spell": "cangshanxian",
  "easy_spell": "csx",
  "city_id": "147" },

{
  "district_id": "1323",
  "district_name": "费县",
  "spell": "feixian",
  "easy_spell": "fx",
  "city_id": "147" },

{
  "district_id": "1324",
  "district_name": "平邑县",
  "spell": "pingyixian",
  "easy_spell": "pyx",
  "city_id": "147" },

{
  "district_id": "1325",
  "district_name": "莒南县",
  "spell": "zuonanxian",
  "easy_spell": "znx",
  "city_id": "147" },

{
  "district_id": "1326",
  "district_name": "蒙阴县",
  "spell": "mengyinxian",
  "easy_spell": "myx",
  "city_id": "147" },

{
  "district_id": "1327",
  "district_name": "临沭县",
  "spell": "linzuoxian",
  "easy_spell": "lzx",
  "city_id": "147" },

{
  "district_id": "1328",
  "district_name": "德城区",
  "spell": "dechengqu",
  "easy_spell": "dcq",
  "city_id": "148" },

{
  "district_id": "1329",
  "district_name": "陵县",
  "spell": "lingxian",
  "easy_spell": "lx",
  "city_id": "148" },

{
  "district_id": "1330",
  "district_name": "宁津县",
  "spell": "ningjinxian",
  "easy_spell": "njx",
  "city_id": "148" },

{
  "district_id": "1331",
  "district_name": "庆云县",
  "spell": "qingyunxian",
  "easy_spell": "qyx",
  "city_id": "148" },

{
  "district_id": "1332",
  "district_name": "临邑县",
  "spell": "linyixian",
  "easy_spell": "lyx",
  "city_id": "148" },

{
  "district_id": "1333",
  "district_name": "齐河县",
  "spell": "qihexian",
  "easy_spell": "qhx",
  "city_id": "148" },

{
  "district_id": "1334",
  "district_name": "平原县",
  "spell": "pingyuanxian",
  "easy_spell": "pyx",
  "city_id": "148" },

{
  "district_id": "1335",
  "district_name": "夏津县",
  "spell": "xiajinxian",
  "easy_spell": "xjx",
  "city_id": "148" },

{
  "district_id": "1336",
  "district_name": "武城县",
  "spell": "wuchengxian",
  "easy_spell": "wcx",
  "city_id": "148" },

{
  "district_id": "1337",
  "district_name": "乐陵市",
  "spell": "lelingshi",
  "easy_spell": "lls",
  "city_id": "148" },

{
  "district_id": "1338",
  "district_name": "禹城市",
  "spell": "yuchengshi",
  "easy_spell": "ycs",
  "city_id": "148" },

{
  "district_id": "1339",
  "district_name": "东昌府区",
  "spell": "dongchangfuqu",
  "easy_spell": "dcfq",
  "city_id": "149" },

{
  "district_id": "1340",
  "district_name": "阳谷县",
  "spell": "yangguxian",
  "easy_spell": "ygx",
  "city_id": "149" },

{
  "district_id": "1341",
  "district_name": "莘县",
  "spell": "zuoxian",
  "easy_spell": "zx",
  "city_id": "149" },

{
  "district_id": "1342",
  "district_name": "茌平县",
  "spell": "zuopingxian",
  "easy_spell": "zpx",
  "city_id": "149" },

{
  "district_id": "1343",
  "district_name": "东阿县",
  "spell": "dongaxian",
  "easy_spell": "dax",
  "city_id": "149" },

{
  "district_id": "1344",
  "district_name": "冠县",
  "spell": "guanxian",
  "easy_spell": "gx",
  "city_id": "149" },

{
  "district_id": "1345",
  "district_name": "高唐县",
  "spell": "gaotangxian",
  "easy_spell": "gtx",
  "city_id": "149" },

{
  "district_id": "1346",
  "district_name": "临清市",
  "spell": "linqingshi",
  "easy_spell": "lqs",
  "city_id": "149" },

{
  "district_id": "1347",
  "district_name": "滨城区",
  "spell": "binchengqu",
  "easy_spell": "bcq",
  "city_id": "150" },

{
  "district_id": "1348",
  "district_name": "惠民县",
  "spell": "huiminxian",
  "easy_spell": "hmx",
  "city_id": "150" },

{
  "district_id": "1349",
  "district_name": "阳信县",
  "spell": "yangxinxian",
  "easy_spell": "yxx",
  "city_id": "150" },

{
  "district_id": "1350",
  "district_name": "无棣县",
  "spell": "wuzuoxian",
  "easy_spell": "wzx",
  "city_id": "150" },

{
  "district_id": "1351",
  "district_name": "沾化县",
  "spell": "zhanhuaxian",
  "easy_spell": "zhx",
  "city_id": "150" },

{
  "district_id": "1352",
  "district_name": "博兴县",
  "spell": "boxingxian",
  "easy_spell": "bxx",
  "city_id": "150" },

{
  "district_id": "1353",
  "district_name": "邹平县",
  "spell": "zoupingxian",
  "easy_spell": "zpx",
  "city_id": "150" },

{
  "district_id": "1354",
  "district_name": "牡丹区",
  "spell": "mudanqu",
  "easy_spell": "mdq",
  "city_id": "151" },

{
  "district_id": "1355",
  "district_name": "曹县",
  "spell": "caoxian",
  "easy_spell": "cx",
  "city_id": "151" },

{
  "district_id": "1356",
  "district_name": "单县",
  "spell": "danxian",
  "easy_spell": "dx",
  "city_id": "151" },

{
  "district_id": "1357",
  "district_name": "成武县",
  "spell": "chengwuxian",
  "easy_spell": "cwx",
  "city_id": "151" },

{
  "district_id": "1358",
  "district_name": "巨野县",
  "spell": "juyexian",
  "easy_spell": "jyx",
  "city_id": "151" },

{
  "district_id": "1359",
  "district_name": "郓城县",
  "spell": "zuochengxian",
  "easy_spell": "zcx",
  "city_id": "151" },

{
  "district_id": "1360",
  "district_name": "鄄城县",
  "spell": "zuochengxian",
  "easy_spell": "zcx",
  "city_id": "151" },

{
  "district_id": "1361",
  "district_name": "定陶县",
  "spell": "dingtaoxian",
  "easy_spell": "dtx",
  "city_id": "151" },

{
  "district_id": "1362",
  "district_name": "东明县",
  "spell": "dongmingxian",
  "easy_spell": "dmx",
  "city_id": "151" },

{
  "district_id": "1363",
  "district_name": "中原区",
  "spell": "zhongyuanqu",
  "easy_spell": "zyq",
  "city_id": "152" },

{
  "district_id": "1364",
  "district_name": "二七区",
  "spell": "erqiqu",
  "easy_spell": "eqq",
  "city_id": "152" },

{
  "district_id": "1365",
  "district_name": "管城回族区",
  "spell": "guanchenghuizuqu",
  "easy_spell": "gchzq",
  "city_id": "152" },

{
  "district_id": "1366",
  "district_name": "金水区",
  "spell": "jinshuiqu",
  "easy_spell": "jsq",
  "city_id": "152" },

{
  "district_id": "1367",
  "district_name": "上街区",
  "spell": "shangjiequ",
  "easy_spell": "sjq",
  "city_id": "152" },

{
  "district_id": "1368",
  "district_name": "惠济区",
  "spell": "huijiqu",
  "easy_spell": "hjq",
  "city_id": "152" },

{
  "district_id": "1369",
  "district_name": "中牟县",
  "spell": "zhongmouxian",
  "easy_spell": "zmx",
  "city_id": "152" },

{
  "district_id": "1370",
  "district_name": "巩义市",
  "spell": "gongyishi",
  "easy_spell": "gys",
  "city_id": "152" },

{
  "district_id": "1371",
  "district_name": "荥阳市",
  "spell": "zuoyangshi",
  "easy_spell": "zys",
  "city_id": "152" },

{
  "district_id": "1372",
  "district_name": "新密市",
  "spell": "xinmishi",
  "easy_spell": "xms",
  "city_id": "152" },

{
  "district_id": "1373",
  "district_name": "新郑市",
  "spell": "xinzhengshi",
  "easy_spell": "xzs",
  "city_id": "152" },

{
  "district_id": "1374",
  "district_name": "登封市",
  "spell": "dengfengshi",
  "easy_spell": "dfs",
  "city_id": "152" },

{
  "district_id": "1375",
  "district_name": "龙亭区",
  "spell": "longtingqu",
  "easy_spell": "ltq",
  "city_id": "153" },

{
  "district_id": "1376",
  "district_name": "顺河回族区",
  "spell": "shunhehuizuqu",
  "easy_spell": "shhzq",
  "city_id": "153" },

{
  "district_id": "1377",
  "district_name": "鼓楼区",
  "spell": "gulouqu",
  "easy_spell": "glq",
  "city_id": "153" },

{
  "district_id": "1378",
  "district_name": "南关区",
  "spell": "nanguanqu",
  "easy_spell": "ngq",
  "city_id": "153" },

{
  "district_id": "1379",
  "district_name": "郊区",
  "spell": "jiaoqu",
  "easy_spell": "jq",
  "city_id": "153" },

{
  "district_id": "1380",
  "district_name": "杞县",
  "spell": "zuoxian",
  "easy_spell": "zx",
  "city_id": "153" },

{
  "district_id": "1381",
  "district_name": "通许县",
  "spell": "tongxuxian",
  "easy_spell": "txx",
  "city_id": "153" },

{
  "district_id": "1382",
  "district_name": "尉氏县",
  "spell": "weishixian",
  "easy_spell": "wsx",
  "city_id": "153" },

{
  "district_id": "1383",
  "district_name": "开封县",
  "spell": "kaifengxian",
  "easy_spell": "kfx",
  "city_id": "153" },

{
  "district_id": "1384",
  "district_name": "兰考县",
  "spell": "lankaoxian",
  "easy_spell": "lkx",
  "city_id": "153" },

{
  "district_id": "1385",
  "district_name": "老城区",
  "spell": "laochengqu",
  "easy_spell": "lcq",
  "city_id": "154" },

{
  "district_id": "1386",
  "district_name": "西工区",
  "spell": "xigongqu",
  "easy_spell": "xgq",
  "city_id": "154" },

{
  "district_id": "1387",
  "district_name": "廛河回族区",
  "spell": "zuohehuizuqu",
  "easy_spell": "zhhzq",
  "city_id": "154" },

{
  "district_id": "1388",
  "district_name": "涧西区",
  "spell": "jianxiqu",
  "easy_spell": "jxq",
  "city_id": "154" },

{
  "district_id": "1389",
  "district_name": "吉利区",
  "spell": "jiliqu",
  "easy_spell": "jlq",
  "city_id": "154" },

{
  "district_id": "1390",
  "district_name": "洛龙区",
  "spell": "luolongqu",
  "easy_spell": "llq",
  "city_id": "154" },

{
  "district_id": "1391",
  "district_name": "孟津县",
  "spell": "mengjinxian",
  "easy_spell": "mjx",
  "city_id": "154" },

{
  "district_id": "1392",
  "district_name": "新安县",
  "spell": "xinanxian",
  "easy_spell": "xax",
  "city_id": "154" },

{
  "district_id": "1393",
  "district_name": "栾川县",
  "spell": "zuochuanxian",
  "easy_spell": "zcx",
  "city_id": "154" },

{
  "district_id": "1394",
  "district_name": "嵩县",
  "spell": "zuoxian",
  "easy_spell": "zx",
  "city_id": "154" },

{
  "district_id": "1395",
  "district_name": "汝阳县",
  "spell": "ruyangxian",
  "easy_spell": "ryx",
  "city_id": "154" },

{
  "district_id": "1396",
  "district_name": "宜阳县",
  "spell": "yiyangxian",
  "easy_spell": "yyx",
  "city_id": "154" },

{
  "district_id": "1397",
  "district_name": "洛宁县",
  "spell": "luoningxian",
  "easy_spell": "lnx",
  "city_id": "154" },

{
  "district_id": "1398",
  "district_name": "伊川县",
  "spell": "yichuanxian",
  "easy_spell": "ycx",
  "city_id": "154" },

{
  "district_id": "1399",
  "district_name": "偃师市",
  "spell": "zuoshishi",
  "easy_spell": "zss",
  "city_id": "154" },

{
  "district_id": "1400",
  "district_name": "新华区",
  "spell": "xinhuaqu",
  "easy_spell": "xhq",
  "city_id": "155" },

{
  "district_id": "1401",
  "district_name": "卫东区",
  "spell": "weidongqu",
  "easy_spell": "wdq",
  "city_id": "155" },

{
  "district_id": "1402",
  "district_name": "石龙区",
  "spell": "shilongqu",
  "easy_spell": "slq",
  "city_id": "155" },

{
  "district_id": "1403",
  "district_name": "湛河区",
  "spell": "zhanhequ",
  "easy_spell": "zhq",
  "city_id": "155" },

{
  "district_id": "1404",
  "district_name": "宝丰县",
  "spell": "baofengxian",
  "easy_spell": "bfx",
  "city_id": "155" },

{
  "district_id": "1405",
  "district_name": "叶县",
  "spell": "yexian",
  "easy_spell": "yx",
  "city_id": "155" },

{
  "district_id": "1406",
  "district_name": "鲁山县",
  "spell": "lushanxian",
  "easy_spell": "lsx",
  "city_id": "155" },

{
  "district_id": "1407",
  "district_name": "郏县",
  "spell": "zuoxian",
  "easy_spell": "zx",
  "city_id": "155" },

{
  "district_id": "1408",
  "district_name": "舞钢市",
  "spell": "wugangshi",
  "easy_spell": "wgs",
  "city_id": "155" },

{
  "district_id": "1409",
  "district_name": "汝州市",
  "spell": "ruzhoushi",
  "easy_spell": "rzs",
  "city_id": "155" },

{
  "district_id": "1410",
  "district_name": "文峰区",
  "spell": "wenfengqu",
  "easy_spell": "wfq",
  "city_id": "156" },

{
  "district_id": "1411",
  "district_name": "北关区",
  "spell": "beiguanqu",
  "easy_spell": "bgq",
  "city_id": "156" },

{
  "district_id": "1412",
  "district_name": "殷都区",
  "spell": "yinduqu",
  "easy_spell": "ydq",
  "city_id": "156" },

{
  "district_id": "1413",
  "district_name": "龙安区",
  "spell": "longanqu",
  "easy_spell": "laq",
  "city_id": "156" },

{
  "district_id": "1414",
  "district_name": "安阳县",
  "spell": "anyangxian",
  "easy_spell": "ayx",
  "city_id": "156" },

{
  "district_id": "1415",
  "district_name": "汤阴县",
  "spell": "tangyinxian",
  "easy_spell": "tyx",
  "city_id": "156" },

{
  "district_id": "1416",
  "district_name": "滑县",
  "spell": "huaxian",
  "easy_spell": "hx",
  "city_id": "156" },

{
  "district_id": "1417",
  "district_name": "内黄县",
  "spell": "neihuangxian",
  "easy_spell": "nhx",
  "city_id": "156" },

{
  "district_id": "1418",
  "district_name": "林州市",
  "spell": "linzhoushi",
  "easy_spell": "lzs",
  "city_id": "156" },

{
  "district_id": "1419",
  "district_name": "鹤山区",
  "spell": "heshanqu",
  "easy_spell": "hsq",
  "city_id": "157" },

{
  "district_id": "1420",
  "district_name": "山城区",
  "spell": "shanchengqu",
  "easy_spell": "scq",
  "city_id": "157" },

{
  "district_id": "1421",
  "district_name": "淇滨区",
  "spell": "zuobinqu",
  "easy_spell": "zbq",
  "city_id": "157" },

{
  "district_id": "1422",
  "district_name": "浚县",
  "spell": "junxian",
  "easy_spell": "jx",
  "city_id": "157" },

{
  "district_id": "1423",
  "district_name": "淇县",
  "spell": "zuoxian",
  "easy_spell": "zx",
  "city_id": "157" },

{
  "district_id": "1424",
  "district_name": "红旗区",
  "spell": "hongqiqu",
  "easy_spell": "hqq",
  "city_id": "158" },

{
  "district_id": "1425",
  "district_name": "卫滨区",
  "spell": "weibinqu",
  "easy_spell": "wbq",
  "city_id": "158" },

{
  "district_id": "1426",
  "district_name": "凤泉区",
  "spell": "fengquanqu",
  "easy_spell": "fqq",
  "city_id": "158" },

{
  "district_id": "1427",
  "district_name": "牧野区",
  "spell": "muyequ",
  "easy_spell": "myq",
  "city_id": "158" },

{
  "district_id": "1428",
  "district_name": "新乡县",
  "spell": "xinxiangxian",
  "easy_spell": "xxx",
  "city_id": "158" },

{
  "district_id": "1429",
  "district_name": "获嘉县",
  "spell": "huojiaxian",
  "easy_spell": "hjx",
  "city_id": "158" },

{
  "district_id": "1430",
  "district_name": "原阳县",
  "spell": "yuanyangxian",
  "easy_spell": "yyx",
  "city_id": "158" },

{
  "district_id": "1431",
  "district_name": "延津县",
  "spell": "yanjinxian",
  "easy_spell": "yjx",
  "city_id": "158" },

{
  "district_id": "1432",
  "district_name": "封丘县",
  "spell": "fengqiuxian",
  "easy_spell": "fqx",
  "city_id": "158" },

{
  "district_id": "1433",
  "district_name": "长垣县",
  "spell": "changyuanxian",
  "easy_spell": "cyx",
  "city_id": "158" },

{
  "district_id": "1434",
  "district_name": "卫辉市",
  "spell": "weihuishi",
  "easy_spell": "whs",
  "city_id": "158" },

{
  "district_id": "1435",
  "district_name": "辉县市",
  "spell": "huixianshi",
  "easy_spell": "hxs",
  "city_id": "158" },

{
  "district_id": "1436",
  "district_name": "解放区",
  "spell": "jiefangqu",
  "easy_spell": "jfq",
  "city_id": "159" },

{
  "district_id": "1437",
  "district_name": "中站区",
  "spell": "zhongzhanqu",
  "easy_spell": "zzq",
  "city_id": "159" },

{
  "district_id": "1438",
  "district_name": "马村区",
  "spell": "macunqu",
  "easy_spell": "mcq",
  "city_id": "159" },

{
  "district_id": "1439",
  "district_name": "山阳区",
  "spell": "shanyangqu",
  "easy_spell": "syq",
  "city_id": "159" },

{
  "district_id": "1440",
  "district_name": "修武县",
  "spell": "xiuwuxian",
  "easy_spell": "xwx",
  "city_id": "159" },

{
  "district_id": "1441",
  "district_name": "博爱县",
  "spell": "boaixian",
  "easy_spell": "bax",
  "city_id": "159" },

{
  "district_id": "1442",
  "district_name": "武陟县",
  "spell": "wuzuoxian",
  "easy_spell": "wzx",
  "city_id": "159" },

{
  "district_id": "1443",
  "district_name": "温县",
  "spell": "wenxian",
  "easy_spell": "wx",
  "city_id": "159" },

{
  "district_id": "1444",
  "district_name": "济源市",
  "spell": "jiyuanshi",
  "easy_spell": "jys",
  "city_id": "159" },

{
  "district_id": "1445",
  "district_name": "沁阳市",
  "spell": "qinyangshi",
  "easy_spell": "qys",
  "city_id": "159" },

{
  "district_id": "1446",
  "district_name": "孟州市",
  "spell": "mengzhoushi",
  "easy_spell": "mzs",
  "city_id": "159" },

{
  "district_id": "1447",
  "district_name": "华龙区",
  "spell": "hualongqu",
  "easy_spell": "hlq",
  "city_id": "160" },

{
  "district_id": "1448",
  "district_name": "清丰县",
  "spell": "qingfengxian",
  "easy_spell": "qfx",
  "city_id": "160" },

{
  "district_id": "1449",
  "district_name": "南乐县",
  "spell": "nanlexian",
  "easy_spell": "nlx",
  "city_id": "160" },

{
  "district_id": "1450",
  "district_name": "范县",
  "spell": "fanxian",
  "easy_spell": "fx",
  "city_id": "160" },

{
  "district_id": "1451",
  "district_name": "台前县",
  "spell": "taiqianxian",
  "easy_spell": "tqx",
  "city_id": "160" },

{
  "district_id": "1452",
  "district_name": "濮阳县",
  "spell": "zuoyangxian",
  "easy_spell": "zyx",
  "city_id": "160" },

{
  "district_id": "1453",
  "district_name": "魏都区",
  "spell": "weiduqu",
  "easy_spell": "wdq",
  "city_id": "161" },

{
  "district_id": "1454",
  "district_name": "许昌县",
  "spell": "xuchangxian",
  "easy_spell": "xcx",
  "city_id": "161" },

{
  "district_id": "1455",
  "district_name": "鄢陵县",
  "spell": "zuolingxian",
  "easy_spell": "zlx",
  "city_id": "161" },

{
  "district_id": "1456",
  "district_name": "襄城县",
  "spell": "xiangchengxian",
  "easy_spell": "xcx",
  "city_id": "161" },

{
  "district_id": "1457",
  "district_name": "禹州市",
  "spell": "yuzhoushi",
  "easy_spell": "yzs",
  "city_id": "161" },

{
  "district_id": "1458",
  "district_name": "长葛市",
  "spell": "changgeshi",
  "easy_spell": "cgs",
  "city_id": "161" },

{
  "district_id": "1459",
  "district_name": "源汇区",
  "spell": "yuanhuiqu",
  "easy_spell": "yhq",
  "city_id": "162" },

{
  "district_id": "1460",
  "district_name": "郾城区",
  "spell": "zuochengqu",
  "easy_spell": "zcq",
  "city_id": "162" },

{
  "district_id": "1461",
  "district_name": "召陵区",
  "spell": "zhaolingqu",
  "easy_spell": "zlq",
  "city_id": "162" },

{
  "district_id": "1462",
  "district_name": "舞阳县",
  "spell": "wuyangxian",
  "easy_spell": "wyx",
  "city_id": "162" },

{
  "district_id": "1463",
  "district_name": "临颍县",
  "spell": "linzuoxian",
  "easy_spell": "lzx",
  "city_id": "162" },

{
  "district_id": "1464",
  "district_name": "市辖区",
  "spell": "shixiaqu",
  "easy_spell": "sxq",
  "city_id": "163" },

{
  "district_id": "1465",
  "district_name": "湖滨区",
  "spell": "hubinqu",
  "easy_spell": "hbq",
  "city_id": "163" },

{
  "district_id": "1466",
  "district_name": "渑池县",
  "spell": "zuochixian",
  "easy_spell": "zcx",
  "city_id": "163" },

{
  "district_id": "1467",
  "district_name": "陕县",
  "spell": "shanxian",
  "easy_spell": "sx",
  "city_id": "163" },

{
  "district_id": "1468",
  "district_name": "卢氏县",
  "spell": "lushixian",
  "easy_spell": "lsx",
  "city_id": "163" },

{
  "district_id": "1469",
  "district_name": "义马市",
  "spell": "yimashi",
  "easy_spell": "yms",
  "city_id": "163" },

{
  "district_id": "1470",
  "district_name": "灵宝市",
  "spell": "lingbaoshi",
  "easy_spell": "lbs",
  "city_id": "163" },

{
  "district_id": "1471",
  "district_name": "宛城区",
  "spell": "wanchengqu",
  "easy_spell": "wcq",
  "city_id": "164" },

{
  "district_id": "1472",
  "district_name": "卧龙区",
  "spell": "wolongqu",
  "easy_spell": "wlq",
  "city_id": "164" },

{
  "district_id": "1473",
  "district_name": "南召县",
  "spell": "nanzhaoxian",
  "easy_spell": "nzx",
  "city_id": "164" },

{
  "district_id": "1474",
  "district_name": "方城县",
  "spell": "fangchengxian",
  "easy_spell": "fcx",
  "city_id": "164" },

{
  "district_id": "1475",
  "district_name": "西峡县",
  "spell": "xixiaxian",
  "easy_spell": "xxx",
  "city_id": "164" },

{
  "district_id": "1476",
  "district_name": "镇平县",
  "spell": "zhenpingxian",
  "easy_spell": "zpx",
  "city_id": "164" },

{
  "district_id": "1477",
  "district_name": "内乡县",
  "spell": "neixiangxian",
  "easy_spell": "nxx",
  "city_id": "164" },

{
  "district_id": "1478",
  "district_name": "淅川县",
  "spell": "zuochuanxian",
  "easy_spell": "zcx",
  "city_id": "164" },

{
  "district_id": "1479",
  "district_name": "社旗县",
  "spell": "sheqixian",
  "easy_spell": "sqx",
  "city_id": "164" },

{
  "district_id": "1480",
  "district_name": "唐河县",
  "spell": "tanghexian",
  "easy_spell": "thx",
  "city_id": "164" },

{
  "district_id": "1481",
  "district_name": "新野县",
  "spell": "xinyexian",
  "easy_spell": "xyx",
  "city_id": "164" },

{
  "district_id": "1482",
  "district_name": "桐柏县",
  "spell": "tongbaixian",
  "easy_spell": "tbx",
  "city_id": "164" },

{
  "district_id": "1483",
  "district_name": "邓州市",
  "spell": "dengzhoushi",
  "easy_spell": "dzs",
  "city_id": "164" },

{
  "district_id": "1484",
  "district_name": "梁园区",
  "spell": "liangyuanqu",
  "easy_spell": "lyq",
  "city_id": "165" },

{
  "district_id": "1485",
  "district_name": "睢阳区",
  "spell": "zuoyangqu",
  "easy_spell": "zyq",
  "city_id": "165" },

{
  "district_id": "1486",
  "district_name": "民权县",
  "spell": "minquanxian",
  "easy_spell": "mqx",
  "city_id": "165" },

{
  "district_id": "1487",
  "district_name": "睢县",
  "spell": "zuoxian",
  "easy_spell": "zx",
  "city_id": "165" },

{
  "district_id": "1488",
  "district_name": "宁陵县",
  "spell": "ninglingxian",
  "easy_spell": "nlx",
  "city_id": "165" },

{
  "district_id": "1489",
  "district_name": "柘城县",
  "spell": "zuochengxian",
  "easy_spell": "zcx",
  "city_id": "165" },

{
  "district_id": "1490",
  "district_name": "虞城县",
  "spell": "yuchengxian",
  "easy_spell": "ycx",
  "city_id": "165" },

{
  "district_id": "1491",
  "district_name": "夏邑县",
  "spell": "xiayixian",
  "easy_spell": "xyx",
  "city_id": "165" },

{
  "district_id": "1492",
  "district_name": "永城市",
  "spell": "yongchengshi",
  "easy_spell": "ycs",
  "city_id": "165" },

{
  "district_id": "1493",
  "district_name": "浉河区",
  "spell": "hequ",
  "easy_spell": "浉hq",
  "city_id": "166" },

{
  "district_id": "1494",
  "district_name": "平桥区",
  "spell": "pingqiaoqu",
  "easy_spell": "pqq",
  "city_id": "166" },

{
  "district_id": "1495",
  "district_name": "罗山县",
  "spell": "luoshanxian",
  "easy_spell": "lsx",
  "city_id": "166" },

{
  "district_id": "1496",
  "district_name": "光山县",
  "spell": "guangshanxian",
  "easy_spell": "gsx",
  "city_id": "166" },

{
  "district_id": "1497",
  "district_name": "新县",
  "spell": "xinxian",
  "easy_spell": "xx",
  "city_id": "166" },

{
  "district_id": "1498",
  "district_name": "商城县",
  "spell": "shangchengxian",
  "easy_spell": "scx",
  "city_id": "166" },

{
  "district_id": "1499",
  "district_name": "固始县",
  "spell": "gushixian",
  "easy_spell": "gsx",
  "city_id": "166" },

{
  "district_id": "1500",
  "district_name": "潢川县",
  "spell": "zuochuanxian",
  "easy_spell": "zcx",
  "city_id": "166" },

{
  "district_id": "1501",
  "district_name": "淮滨县",
  "spell": "huaibinxian",
  "easy_spell": "hbx",
  "city_id": "166" },

{
  "district_id": "1502",
  "district_name": "息县",
  "spell": "xixian",
  "easy_spell": "xx",
  "city_id": "166" },

{
  "district_id": "1503",
  "district_name": "川汇区",
  "spell": "chuanhuiqu",
  "easy_spell": "chq",
  "city_id": "167" },

{
  "district_id": "1504",
  "district_name": "扶沟县",
  "spell": "fugouxian",
  "easy_spell": "fgx",
  "city_id": "167" },

{
  "district_id": "1505",
  "district_name": "西华县",
  "spell": "xihuaxian",
  "easy_spell": "xhx",
  "city_id": "167" },

{
  "district_id": "1506",
  "district_name": "商水县",
  "spell": "shangshuixian",
  "easy_spell": "ssx",
  "city_id": "167" },

{
  "district_id": "1507",
  "district_name": "沈丘县",
  "spell": "shenqiuxian",
  "easy_spell": "sqx",
  "city_id": "167" },

{
  "district_id": "1508",
  "district_name": "郸城县",
  "spell": "danchengxian",
  "easy_spell": "dcx",
  "city_id": "167" },

{
  "district_id": "1509",
  "district_name": "淮阳县",
  "spell": "huaiyangxian",
  "easy_spell": "hyx",
  "city_id": "167" },

{
  "district_id": "1510",
  "district_name": "太康县",
  "spell": "taikangxian",
  "easy_spell": "tkx",
  "city_id": "167" },

{
  "district_id": "1511",
  "district_name": "鹿邑县",
  "spell": "luyixian",
  "easy_spell": "lyx",
  "city_id": "167" },

{
  "district_id": "1512",
  "district_name": "项城市",
  "spell": "xiangchengshi",
  "easy_spell": "xcs",
  "city_id": "167" },

{
  "district_id": "1513",
  "district_name": "驿城区",
  "spell": "zuochengqu",
  "easy_spell": "zcq",
  "city_id": "168" },

{
  "district_id": "1514",
  "district_name": "西平县",
  "spell": "xipingxian",
  "easy_spell": "xpx",
  "city_id": "168" },

{
  "district_id": "1515",
  "district_name": "上蔡县",
  "spell": "shangcaixian",
  "easy_spell": "scx",
  "city_id": "168" },

{
  "district_id": "1516",
  "district_name": "平舆县",
  "spell": "pingyuxian",
  "easy_spell": "pyx",
  "city_id": "168" },

{
  "district_id": "1517",
  "district_name": "正阳县",
  "spell": "zhengyangxian",
  "easy_spell": "zyx",
  "city_id": "168" },

{
  "district_id": "1518",
  "district_name": "确山县",
  "spell": "queshanxian",
  "easy_spell": "qsx",
  "city_id": "168" },

{
  "district_id": "1519",
  "district_name": "泌阳县",
  "spell": "miyangxian",
  "easy_spell": "myx",
  "city_id": "168" },

{
  "district_id": "1520",
  "district_name": "汝南县",
  "spell": "runanxian",
  "easy_spell": "rnx",
  "city_id": "168" },

{
  "district_id": "1521",
  "district_name": "遂平县",
  "spell": "suipingxian",
  "easy_spell": "spx",
  "city_id": "168" },

{
  "district_id": "1522",
  "district_name": "新蔡县",
  "spell": "xincaixian",
  "easy_spell": "xcx",
  "city_id": "168" },

{
  "district_id": "1523",
  "district_name": "江岸区",
  "spell": "jianganqu",
  "easy_spell": "jaq",
  "city_id": "169" },

{
  "district_id": "1524",
  "district_name": "江汉区",
  "spell": "jianghanqu",
  "easy_spell": "jhq",
  "city_id": "169" },

{
  "district_id": "1525",
  "district_name": "硚口区",
  "spell": "changkouqu",
  "easy_spell": "ckq",
  "city_id": "169" },

{
  "district_id": "1526",
  "district_name": "汉阳区",
  "spell": "hanyangqu",
  "easy_spell": "hyq",
  "city_id": "169" },

{
  "district_id": "1527",
  "district_name": "武昌区",
  "spell": "wuchangqu",
  "easy_spell": "wcq",
  "city_id": "169" },

{
  "district_id": "1528",
  "district_name": "青山区",
  "spell": "qingshanqu",
  "easy_spell": "qsq",
  "city_id": "169" },

{
  "district_id": "1529",
  "district_name": "洪山区",
  "spell": "hongshanqu",
  "easy_spell": "hsq",
  "city_id": "169" },

{
  "district_id": "1530",
  "district_name": "东西湖区",
  "spell": "dongxihuqu",
  "easy_spell": "dxhq",
  "city_id": "169" },

{
  "district_id": "1531",
  "district_name": "汉南区",
  "spell": "hannanqu",
  "easy_spell": "hnq",
  "city_id": "169" },

{
  "district_id": "1532",
  "district_name": "蔡甸区",
  "spell": "caidianqu",
  "easy_spell": "cdq",
  "city_id": "169" },

{
  "district_id": "1533",
  "district_name": "江夏区",
  "spell": "jiangxiaqu",
  "easy_spell": "jxq",
  "city_id": "169" },

{
  "district_id": "1534",
  "district_name": "黄陂区",
  "spell": "huangzuoqu",
  "easy_spell": "hzq",
  "city_id": "169" },

{
  "district_id": "1535",
  "district_name": "新洲区",
  "spell": "xinzhouqu",
  "easy_spell": "xzq",
  "city_id": "169" },

{
  "district_id": "1536",
  "district_name": "黄石港区",
  "spell": "huangshigangqu",
  "easy_spell": "hsgq",
  "city_id": "170" },

{
  "district_id": "1537",
  "district_name": "西塞山区",
  "spell": "xisaishanqu",
  "easy_spell": "xssq",
  "city_id": "170" },

{
  "district_id": "1538",
  "district_name": "下陆区",
  "spell": "xialuqu",
  "easy_spell": "xlq",
  "city_id": "170" },

{
  "district_id": "1539",
  "district_name": "铁山区",
  "spell": "tieshanqu",
  "easy_spell": "tsq",
  "city_id": "170" },

{
  "district_id": "1540",
  "district_name": "阳新县",
  "spell": "yangxinxian",
  "easy_spell": "yxx",
  "city_id": "170" },

{
  "district_id": "1541",
  "district_name": "大冶市",
  "spell": "dayeshi",
  "easy_spell": "dys",
  "city_id": "170" },

{
  "district_id": "1542",
  "district_name": "茅箭区",
  "spell": "maojianqu",
  "easy_spell": "mjq",
  "city_id": "171" },

{
  "district_id": "1543",
  "district_name": "张湾区",
  "spell": "zhangwanqu",
  "easy_spell": "zwq",
  "city_id": "171" },

{
  "district_id": "1544",
  "district_name": "郧县",
  "spell": "yunxian",
  "easy_spell": "yx",
  "city_id": "171" },

{
  "district_id": "1545",
  "district_name": "郧西县",
  "spell": "yunxixian",
  "easy_spell": "yxx",
  "city_id": "171" },

{
  "district_id": "1546",
  "district_name": "竹山县",
  "spell": "zhushanxian",
  "easy_spell": "zsx",
  "city_id": "171" },

{
  "district_id": "1547",
  "district_name": "竹溪县",
  "spell": "zhuxixian",
  "easy_spell": "zxx",
  "city_id": "171" },

{
  "district_id": "1548",
  "district_name": "房县",
  "spell": "fangxian",
  "easy_spell": "fx",
  "city_id": "171" },

{
  "district_id": "1549",
  "district_name": "丹江口市",
  "spell": "danjiangkoushi",
  "easy_spell": "djks",
  "city_id": "171" },

{
  "district_id": "1550",
  "district_name": "西陵区",
  "spell": "xilingqu",
  "easy_spell": "xlq",
  "city_id": "172" },

{
  "district_id": "1551",
  "district_name": "伍家岗区",
  "spell": "wujiagangqu",
  "easy_spell": "wjgq",
  "city_id": "172" },

{
  "district_id": "1552",
  "district_name": "点军区",
  "spell": "dianjunqu",
  "easy_spell": "djq",
  "city_id": "172" },

{
  "district_id": "1553",
  "district_name": "猇亭区",
  "spell": "tingqu",
  "easy_spell": "猇tq",
  "city_id": "172" },

{
  "district_id": "1554",
  "district_name": "夷陵区",
  "spell": "yilingqu",
  "easy_spell": "ylq",
  "city_id": "172" },

{
  "district_id": "1555",
  "district_name": "远安县",
  "spell": "yuananxian",
  "easy_spell": "yax",
  "city_id": "172" },

{
  "district_id": "1556",
  "district_name": "兴山县",
  "spell": "xingshanxian",
  "easy_spell": "xsx",
  "city_id": "172" },

{
  "district_id": "1557",
  "district_name": "秭归县",
  "spell": "zuoguixian",
  "easy_spell": "zgx",
  "city_id": "172" },

{
  "district_id": "1558",
  "district_name": "长阳土家族自治县",
  "spell": "changyangtujiazuzizhixian",
  "easy_spell": "cytjzzzx",
  "city_id": "172" },

{
  "district_id": "1559",
  "district_name": "五峰土家族自治县",
  "spell": "wufengtujiazuzizhixian",
  "easy_spell": "wftjzzzx",
  "city_id": "172" },

{
  "district_id": "1560",
  "district_name": "宜都市",
  "spell": "yidushi",
  "easy_spell": "yds",
  "city_id": "172" },

{
  "district_id": "1561",
  "district_name": "当阳市",
  "spell": "dangyangshi",
  "easy_spell": "dys",
  "city_id": "172" },

{
  "district_id": "1562",
  "district_name": "枝江市",
  "spell": "zhijiangshi",
  "easy_spell": "zjs",
  "city_id": "172" },

{
  "district_id": "1563",
  "district_name": "襄城区",
  "spell": "xiangchengqu",
  "easy_spell": "xcq",
  "city_id": "173" },

{
  "district_id": "1564",
  "district_name": "樊城区",
  "spell": "fanchengqu",
  "easy_spell": "fcq",
  "city_id": "173" },

{
  "district_id": "1565",
  "district_name": "襄阳区",
  "spell": "xiangyangqu",
  "easy_spell": "xyq",
  "city_id": "173" },

{
  "district_id": "1566",
  "district_name": "南漳县",
  "spell": "nanzhangxian",
  "easy_spell": "nzx",
  "city_id": "173" },

{
  "district_id": "1567",
  "district_name": "谷城县",
  "spell": "guchengxian",
  "easy_spell": "gcx",
  "city_id": "173" },

{
  "district_id": "1568",
  "district_name": "保康县",
  "spell": "baokangxian",
  "easy_spell": "bkx",
  "city_id": "173" },

{
  "district_id": "1569",
  "district_name": "老河口市",
  "spell": "laohekoushi",
  "easy_spell": "lhks",
  "city_id": "173" },

{
  "district_id": "1570",
  "district_name": "枣阳市",
  "spell": "zaoyangshi",
  "easy_spell": "zys",
  "city_id": "173" },

{
  "district_id": "1571",
  "district_name": "宜城市",
  "spell": "yichengshi",
  "easy_spell": "ycs",
  "city_id": "173" },

{
  "district_id": "1572",
  "district_name": "梁子湖区",
  "spell": "liangzihuqu",
  "easy_spell": "lzhq",
  "city_id": "174" },

{
  "district_id": "1573",
  "district_name": "华容区",
  "spell": "huarongqu",
  "easy_spell": "hrq",
  "city_id": "174" },

{
  "district_id": "1574",
  "district_name": "鄂城区",
  "spell": "echengqu",
  "easy_spell": "ecq",
  "city_id": "174" },

{
  "district_id": "1575",
  "district_name": "东宝区",
  "spell": "dongbaoqu",
  "easy_spell": "dbq",
  "city_id": "175" },

{
  "district_id": "1576",
  "district_name": "掇刀区",
  "spell": "duodaoqu",
  "easy_spell": "ddq",
  "city_id": "175" },

{
  "district_id": "1577",
  "district_name": "京山县",
  "spell": "jingshanxian",
  "easy_spell": "jsx",
  "city_id": "175" },

{
  "district_id": "1578",
  "district_name": "沙洋县",
  "spell": "shayangxian",
  "easy_spell": "syx",
  "city_id": "175" },

{
  "district_id": "1579",
  "district_name": "钟祥市",
  "spell": "zhongxiangshi",
  "easy_spell": "zxs",
  "city_id": "175" },

{
  "district_id": "1580",
  "district_name": "孝南区",
  "spell": "xiaonanqu",
  "easy_spell": "xnq",
  "city_id": "176" },

{
  "district_id": "1581",
  "district_name": "孝昌县",
  "spell": "xiaochangxian",
  "easy_spell": "xcx",
  "city_id": "176" },

{
  "district_id": "1582",
  "district_name": "大悟县",
  "spell": "dawuxian",
  "easy_spell": "dwx",
  "city_id": "176" },

{
  "district_id": "1583",
  "district_name": "云梦县",
  "spell": "yunmengxian",
  "easy_spell": "ymx",
  "city_id": "176" },

{
  "district_id": "1584",
  "district_name": "应城市",
  "spell": "yingchengshi",
  "easy_spell": "ycs",
  "city_id": "176" },

{
  "district_id": "1585",
  "district_name": "安陆市",
  "spell": "anlushi",
  "easy_spell": "als",
  "city_id": "176" },

{
  "district_id": "1586",
  "district_name": "汉川市",
  "spell": "hanchuanshi",
  "easy_spell": "hcs",
  "city_id": "176" },

{
  "district_id": "1587",
  "district_name": "沙市区",
  "spell": "shashiqu",
  "easy_spell": "ssq",
  "city_id": "177" },

{
  "district_id": "1588",
  "district_name": "荆州区",
  "spell": "jingzhouqu",
  "easy_spell": "jzq",
  "city_id": "177" },

{
  "district_id": "1589",
  "district_name": "公安县",
  "spell": "gonganxian",
  "easy_spell": "gax",
  "city_id": "177" },

{
  "district_id": "1590",
  "district_name": "监利县",
  "spell": "jianlixian",
  "easy_spell": "jlx",
  "city_id": "177" },

{
  "district_id": "1591",
  "district_name": "江陵县",
  "spell": "jianglingxian",
  "easy_spell": "jlx",
  "city_id": "177" },

{
  "district_id": "1592",
  "district_name": "石首市",
  "spell": "shishoushi",
  "easy_spell": "sss",
  "city_id": "177" },

{
  "district_id": "1593",
  "district_name": "洪湖市",
  "spell": "honghushi",
  "easy_spell": "hhs",
  "city_id": "177" },

{
  "district_id": "1594",
  "district_name": "松滋市",
  "spell": "songzishi",
  "easy_spell": "szs",
  "city_id": "177" },

{
  "district_id": "1595",
  "district_name": "黄州区",
  "spell": "huangzhouqu",
  "easy_spell": "hzq",
  "city_id": "178" },

{
  "district_id": "1596",
  "district_name": "团风县",
  "spell": "tuanfengxian",
  "easy_spell": "tfx",
  "city_id": "178" },

{
  "district_id": "1597",
  "district_name": "红安县",
  "spell": "honganxian",
  "easy_spell": "hax",
  "city_id": "178" },

{
  "district_id": "1598",
  "district_name": "罗田县",
  "spell": "luotianxian",
  "easy_spell": "ltx",
  "city_id": "178" },

{
  "district_id": "1599",
  "district_name": "英山县",
  "spell": "yingshanxian",
  "easy_spell": "ysx",
  "city_id": "178" },

{
  "district_id": "1600",
  "district_name": "浠水县",
  "spell": "zuoshuixian",
  "easy_spell": "zsx",
  "city_id": "178" },

{
  "district_id": "1601",
  "district_name": "蕲春县",
  "spell": "zuochunxian",
  "easy_spell": "zcx",
  "city_id": "178" },

{
  "district_id": "1602",
  "district_name": "黄梅县",
  "spell": "huangmeixian",
  "easy_spell": "hmx",
  "city_id": "178" },

{
  "district_id": "1603",
  "district_name": "麻城市",
  "spell": "machengshi",
  "easy_spell": "mcs",
  "city_id": "178" },

{
  "district_id": "1604",
  "district_name": "武穴市",
  "spell": "wuxueshi",
  "easy_spell": "wxs",
  "city_id": "178" },

{
  "district_id": "1605",
  "district_name": "咸安区",
  "spell": "xiananqu",
  "easy_spell": "xaq",
  "city_id": "179" },

{
  "district_id": "1606",
  "district_name": "嘉鱼县",
  "spell": "jiayuxian",
  "easy_spell": "jyx",
  "city_id": "179" },

{
  "district_id": "1607",
  "district_name": "通城县",
  "spell": "tongchengxian",
  "easy_spell": "tcx",
  "city_id": "179" },

{
  "district_id": "1608",
  "district_name": "崇阳县",
  "spell": "chongyangxian",
  "easy_spell": "cyx",
  "city_id": "179" },

{
  "district_id": "1609",
  "district_name": "通山县",
  "spell": "tongshanxian",
  "easy_spell": "tsx",
  "city_id": "179" },

{
  "district_id": "1610",
  "district_name": "赤壁市",
  "spell": "chibishi",
  "easy_spell": "cbs",
  "city_id": "179" },

{
  "district_id": "1611",
  "district_name": "曾都区",
  "spell": "zengduqu",
  "easy_spell": "zdq",
  "city_id": "180" },

{
  "district_id": "1612",
  "district_name": "广水市",
  "spell": "guangshuishi",
  "easy_spell": "gss",
  "city_id": "180" },

{
  "district_id": "1613",
  "district_name": "恩施市",
  "spell": "enshishi",
  "easy_spell": "ess",
  "city_id": "181" },

{
  "district_id": "1614",
  "district_name": "利川市",
  "spell": "lichuanshi",
  "easy_spell": "lcs",
  "city_id": "181" },

{
  "district_id": "1615",
  "district_name": "建始县",
  "spell": "jianshixian",
  "easy_spell": "jsx",
  "city_id": "181" },

{
  "district_id": "1616",
  "district_name": "巴东县",
  "spell": "badongxian",
  "easy_spell": "bdx",
  "city_id": "181" },

{
  "district_id": "1617",
  "district_name": "宣恩县",
  "spell": "xuanenxian",
  "easy_spell": "xex",
  "city_id": "181" },

{
  "district_id": "1618",
  "district_name": "咸丰县",
  "spell": "xianfengxian",
  "easy_spell": "xfx",
  "city_id": "181" },

{
  "district_id": "1619",
  "district_name": "来凤县",
  "spell": "laifengxian",
  "easy_spell": "lfx",
  "city_id": "181" },

{
  "district_id": "1620",
  "district_name": "鹤峰县",
  "spell": "hefengxian",
  "easy_spell": "hfx",
  "city_id": "181" },

{
  "district_id": "1621",
  "district_name": "仙桃市",
  "spell": "xiantaoshi",
  "easy_spell": "xts",
  "city_id": "182" },

{
  "district_id": "1622",
  "district_name": "潜江市",
  "spell": "qianjiangshi",
  "easy_spell": "qjs",
  "city_id": "182" },

{
  "district_id": "1623",
  "district_name": "天门市",
  "spell": "tianmenshi",
  "easy_spell": "tms",
  "city_id": "182" },

{
  "district_id": "1624",
  "district_name": "神农架林区",
  "spell": "shennongjialinqu",
  "easy_spell": "snjlq",
  "city_id": "182" },

{
  "district_id": "1625",
  "district_name": "芙蓉区",
  "spell": "zuorongqu",
  "easy_spell": "zrq",
  "city_id": "183" },

{
  "district_id": "1626",
  "district_name": "天心区",
  "spell": "tianxinqu",
  "easy_spell": "txq",
  "city_id": "183" },

{
  "district_id": "1627",
  "district_name": "岳麓区",
  "spell": "yueluqu",
  "easy_spell": "ylq",
  "city_id": "183" },

{
  "district_id": "1628",
  "district_name": "开福区",
  "spell": "kaifuqu",
  "easy_spell": "kfq",
  "city_id": "183" },

{
  "district_id": "1629",
  "district_name": "雨花区",
  "spell": "yuhuaqu",
  "easy_spell": "yhq",
  "city_id": "183" },

{
  "district_id": "1630",
  "district_name": "长沙县",
  "spell": "changshaxian",
  "easy_spell": "csx",
  "city_id": "183" },

{
  "district_id": "1631",
  "district_name": "望城县",
  "spell": "wangchengxian",
  "easy_spell": "wcx",
  "city_id": "183" },

{
  "district_id": "1632",
  "district_name": "宁乡县",
  "spell": "ningxiangxian",
  "easy_spell": "nxx",
  "city_id": "183" },

{
  "district_id": "1633",
  "district_name": "浏阳市",
  "spell": "zuoyangshi",
  "easy_spell": "zys",
  "city_id": "183" },

{
  "district_id": "1634",
  "district_name": "荷塘区",
  "spell": "hetangqu",
  "easy_spell": "htq",
  "city_id": "184" },

{
  "district_id": "1635",
  "district_name": "芦淞区",
  "spell": "luzuoqu",
  "easy_spell": "lzq",
  "city_id": "184" },

{
  "district_id": "1636",
  "district_name": "石峰区",
  "spell": "shifengqu",
  "easy_spell": "sfq",
  "city_id": "184" },

{
  "district_id": "1637",
  "district_name": "天元区",
  "spell": "tianyuanqu",
  "easy_spell": "tyq",
  "city_id": "184" },

{
  "district_id": "1638",
  "district_name": "株洲县",
  "spell": "zhuzhouxian",
  "easy_spell": "zzx",
  "city_id": "184" },

{
  "district_id": "1639",
  "district_name": "攸县",
  "spell": "zuoxian",
  "easy_spell": "zx",
  "city_id": "184" },

{
  "district_id": "1640",
  "district_name": "茶陵县",
  "spell": "chalingxian",
  "easy_spell": "clx",
  "city_id": "184" },

{
  "district_id": "1641",
  "district_name": "炎陵县",
  "spell": "yanlingxian",
  "easy_spell": "ylx",
  "city_id": "184" },

{
  "district_id": "1642",
  "district_name": "醴陵市",
  "spell": "zuolingshi",
  "easy_spell": "zls",
  "city_id": "184" },

{
  "district_id": "1643",
  "district_name": "雨湖区",
  "spell": "yuhuqu",
  "easy_spell": "yhq",
  "city_id": "185" },

{
  "district_id": "1644",
  "district_name": "岳塘区",
  "spell": "yuetangqu",
  "easy_spell": "ytq",
  "city_id": "185" },

{
  "district_id": "1645",
  "district_name": "湘潭县",
  "spell": "xiangtanxian",
  "easy_spell": "xtx",
  "city_id": "185" },

{
  "district_id": "1646",
  "district_name": "湘乡市",
  "spell": "xiangxiangshi",
  "easy_spell": "xxs",
  "city_id": "185" },

{
  "district_id": "1647",
  "district_name": "韶山市",
  "spell": "shaoshanshi",
  "easy_spell": "sss",
  "city_id": "185" },

{
  "district_id": "1648",
  "district_name": "珠晖区",
  "spell": "zhuzuoqu",
  "easy_spell": "zzq",
  "city_id": "186" },

{
  "district_id": "1649",
  "district_name": "雁峰区",
  "spell": "yanfengqu",
  "easy_spell": "yfq",
  "city_id": "186" },

{
  "district_id": "1650",
  "district_name": "石鼓区",
  "spell": "shiguqu",
  "easy_spell": "sgq",
  "city_id": "186" },

{
  "district_id": "1651",
  "district_name": "蒸湘区",
  "spell": "zhengxiangqu",
  "easy_spell": "zxq",
  "city_id": "186" },

{
  "district_id": "1652",
  "district_name": "南岳区",
  "spell": "nanyuequ",
  "easy_spell": "nyq",
  "city_id": "186" },

{
  "district_id": "1653",
  "district_name": "衡阳县",
  "spell": "hengyangxian",
  "easy_spell": "hyx",
  "city_id": "186" },

{
  "district_id": "1654",
  "district_name": "衡南县",
  "spell": "hengnanxian",
  "easy_spell": "hnx",
  "city_id": "186" },

{
  "district_id": "1655",
  "district_name": "衡山县",
  "spell": "hengshanxian",
  "easy_spell": "hsx",
  "city_id": "186" },

{
  "district_id": "1656",
  "district_name": "衡东县",
  "spell": "hengdongxian",
  "easy_spell": "hdx",
  "city_id": "186" },

{
  "district_id": "1657",
  "district_name": "祁东县",
  "spell": "qidongxian",
  "easy_spell": "qdx",
  "city_id": "186" },

{
  "district_id": "1658",
  "district_name": "耒阳市",
  "spell": "zuoyangshi",
  "easy_spell": "zys",
  "city_id": "186" },

{
  "district_id": "1659",
  "district_name": "常宁市",
  "spell": "changningshi",
  "easy_spell": "cns",
  "city_id": "186" },

{
  "district_id": "1660",
  "district_name": "双清区",
  "spell": "shuangqingqu",
  "easy_spell": "sqq",
  "city_id": "187" },

{
  "district_id": "1661",
  "district_name": "大祥区",
  "spell": "daxiangqu",
  "easy_spell": "dxq",
  "city_id": "187" },

{
  "district_id": "1662",
  "district_name": "北塔区",
  "spell": "beitaqu",
  "easy_spell": "btq",
  "city_id": "187" },

{
  "district_id": "1663",
  "district_name": "邵东县",
  "spell": "shaodongxian",
  "easy_spell": "sdx",
  "city_id": "187" },

{
  "district_id": "1664",
  "district_name": "新邵县",
  "spell": "xinshaoxian",
  "easy_spell": "xsx",
  "city_id": "187" },

{
  "district_id": "1665",
  "district_name": "邵阳县",
  "spell": "shaoyangxian",
  "easy_spell": "syx",
  "city_id": "187" },

{
  "district_id": "1666",
  "district_name": "隆回县",
  "spell": "longhuixian",
  "easy_spell": "lhx",
  "city_id": "187" },

{
  "district_id": "1667",
  "district_name": "洞口县",
  "spell": "dongkouxian",
  "easy_spell": "dkx",
  "city_id": "187" },

{
  "district_id": "1668",
  "district_name": "绥宁县",
  "spell": "suiningxian",
  "easy_spell": "snx",
  "city_id": "187" },

{
  "district_id": "1669",
  "district_name": "新宁县",
  "spell": "xinningxian",
  "easy_spell": "xnx",
  "city_id": "187" },

{
  "district_id": "1670",
  "district_name": "城步苗族自治县",
  "spell": "chengbumiaozuzizhixian",
  "easy_spell": "cbmzzzx",
  "city_id": "187" },

{
  "district_id": "1671",
  "district_name": "武冈市",
  "spell": "wugangshi",
  "easy_spell": "wgs",
  "city_id": "187" },

{
  "district_id": "1672",
  "district_name": "岳阳楼区",
  "spell": "yueyanglouqu",
  "easy_spell": "yylq",
  "city_id": "188" },

{
  "district_id": "1673",
  "district_name": "云溪区",
  "spell": "yunxiqu",
  "easy_spell": "yxq",
  "city_id": "188" },

{
  "district_id": "1674",
  "district_name": "君山区",
  "spell": "junshanqu",
  "easy_spell": "jsq",
  "city_id": "188" },

{
  "district_id": "1675",
  "district_name": "岳阳县",
  "spell": "yueyangxian",
  "easy_spell": "yyx",
  "city_id": "188" },

{
  "district_id": "1676",
  "district_name": "华容县",
  "spell": "huarongxian",
  "easy_spell": "hrx",
  "city_id": "188" },

{
  "district_id": "1677",
  "district_name": "湘阴县",
  "spell": "xiangyinxian",
  "easy_spell": "xyx",
  "city_id": "188" },

{
  "district_id": "1678",
  "district_name": "平江县",
  "spell": "pingjiangxian",
  "easy_spell": "pjx",
  "city_id": "188" },

{
  "district_id": "1679",
  "district_name": "汨罗市",
  "spell": "zuoluoshi",
  "easy_spell": "zls",
  "city_id": "188" },

{
  "district_id": "1680",
  "district_name": "临湘市",
  "spell": "linxiangshi",
  "easy_spell": "lxs",
  "city_id": "188" },

{
  "district_id": "1681",
  "district_name": "武陵区",
  "spell": "wulingqu",
  "easy_spell": "wlq",
  "city_id": "189" },

{
  "district_id": "1682",
  "district_name": "鼎城区",
  "spell": "dingchengqu",
  "easy_spell": "dcq",
  "city_id": "189" },

{
  "district_id": "1683",
  "district_name": "安乡县",
  "spell": "anxiangxian",
  "easy_spell": "axx",
  "city_id": "189" },

{
  "district_id": "1684",
  "district_name": "汉寿县",
  "spell": "hanshouxian",
  "easy_spell": "hsx",
  "city_id": "189" },

{
  "district_id": "1685",
  "district_name": "澧县",
  "spell": "zuoxian",
  "easy_spell": "zx",
  "city_id": "189" },

{
  "district_id": "1686",
  "district_name": "临澧县",
  "spell": "linzuoxian",
  "easy_spell": "lzx",
  "city_id": "189" },

{
  "district_id": "1687",
  "district_name": "桃源县",
  "spell": "taoyuanxian",
  "easy_spell": "tyx",
  "city_id": "189" },

{
  "district_id": "1688",
  "district_name": "石门县",
  "spell": "shimenxian",
  "easy_spell": "smx",
  "city_id": "189" },

{
  "district_id": "1689",
  "district_name": "津市市",
  "spell": "jinshishi",
  "easy_spell": "jss",
  "city_id": "189" },

{
  "district_id": "1690",
  "district_name": "永定区",
  "spell": "yongdingqu",
  "easy_spell": "ydq",
  "city_id": "190" },

{
  "district_id": "1691",
  "district_name": "武陵源区",
  "spell": "wulingyuanqu",
  "easy_spell": "wlyq",
  "city_id": "190" },

{
  "district_id": "1692",
  "district_name": "慈利县",
  "spell": "cilixian",
  "easy_spell": "clx",
  "city_id": "190" },

{
  "district_id": "1693",
  "district_name": "桑植县",
  "spell": "sangzhixian",
  "easy_spell": "szx",
  "city_id": "190" },

{
  "district_id": "1694",
  "district_name": "资阳区",
  "spell": "ziyangqu",
  "easy_spell": "zyq",
  "city_id": "191" },

{
  "district_id": "1695",
  "district_name": "赫山区",
  "spell": "heshanqu",
  "easy_spell": "hsq",
  "city_id": "191" },

{
  "district_id": "1696",
  "district_name": "南县",
  "spell": "nanxian",
  "easy_spell": "nx",
  "city_id": "191" },

{
  "district_id": "1697",
  "district_name": "桃江县",
  "spell": "taojiangxian",
  "easy_spell": "tjx",
  "city_id": "191" },

{
  "district_id": "1698",
  "district_name": "安化县",
  "spell": "anhuaxian",
  "easy_spell": "ahx",
  "city_id": "191" },

{
  "district_id": "1699",
  "district_name": "沅江市",
  "spell": "zuojiangshi",
  "easy_spell": "zjs",
  "city_id": "191" },

{
  "district_id": "1700",
  "district_name": "北湖区",
  "spell": "beihuqu",
  "easy_spell": "bhq",
  "city_id": "192" },

{
  "district_id": "1701",
  "district_name": "苏仙区",
  "spell": "suxianqu",
  "easy_spell": "sxq",
  "city_id": "192" },

{
  "district_id": "1702",
  "district_name": "桂阳县",
  "spell": "guiyangxian",
  "easy_spell": "gyx",
  "city_id": "192" },

{
  "district_id": "1703",
  "district_name": "宜章县",
  "spell": "yizhangxian",
  "easy_spell": "yzx",
  "city_id": "192" },

{
  "district_id": "1704",
  "district_name": "永兴县",
  "spell": "yongxingxian",
  "easy_spell": "yxx",
  "city_id": "192" },

{
  "district_id": "1705",
  "district_name": "嘉禾县",
  "spell": "jiahexian",
  "easy_spell": "jhx",
  "city_id": "192" },

{
  "district_id": "1706",
  "district_name": "临武县",
  "spell": "linwuxian",
  "easy_spell": "lwx",
  "city_id": "192" },

{
  "district_id": "1707",
  "district_name": "汝城县",
  "spell": "ruchengxian",
  "easy_spell": "rcx",
  "city_id": "192" },

{
  "district_id": "1708",
  "district_name": "桂东县",
  "spell": "guidongxian",
  "easy_spell": "gdx",
  "city_id": "192" },

{
  "district_id": "1709",
  "district_name": "安仁县",
  "spell": "anrenxian",
  "easy_spell": "arx",
  "city_id": "192" },

{
  "district_id": "1710",
  "district_name": "资兴市",
  "spell": "zixingshi",
  "easy_spell": "zxs",
  "city_id": "192" },

{
  "district_id": "1711",
  "district_name": "芝山区",
  "spell": "zhishanqu",
  "easy_spell": "zsq",
  "city_id": "193" },

{
  "district_id": "1712",
  "district_name": "冷水滩区",
  "spell": "lengshuitanqu",
  "easy_spell": "lstq",
  "city_id": "193" },

{
  "district_id": "1713",
  "district_name": "祁阳县",
  "spell": "qiyangxian",
  "easy_spell": "qyx",
  "city_id": "193" },

{
  "district_id": "1714",
  "district_name": "东安县",
  "spell": "donganxian",
  "easy_spell": "dax",
  "city_id": "193" },

{
  "district_id": "1715",
  "district_name": "双牌县",
  "spell": "shuangpaixian",
  "easy_spell": "spx",
  "city_id": "193" },

{
  "district_id": "1716",
  "district_name": "道县",
  "spell": "daoxian",
  "easy_spell": "dx",
  "city_id": "193" },

{
  "district_id": "1717",
  "district_name": "江永县",
  "spell": "jiangyongxian",
  "easy_spell": "jyx",
  "city_id": "193" },

{
  "district_id": "1718",
  "district_name": "宁远县",
  "spell": "ningyuanxian",
  "easy_spell": "nyx",
  "city_id": "193" },

{
  "district_id": "1719",
  "district_name": "蓝山县",
  "spell": "lanshanxian",
  "easy_spell": "lsx",
  "city_id": "193" },

{
  "district_id": "1720",
  "district_name": "新田县",
  "spell": "xintianxian",
  "easy_spell": "xtx",
  "city_id": "193" },

{
  "district_id": "1721",
  "district_name": "江华瑶族自治县",
  "spell": "jianghuayaozuzizhixian",
  "easy_spell": "jhyzzzx",
  "city_id": "193" },

{
  "district_id": "1722",
  "district_name": "鹤城区",
  "spell": "hechengqu",
  "easy_spell": "hcq",
  "city_id": "194" },

{
  "district_id": "1723",
  "district_name": "中方县",
  "spell": "zhongfangxian",
  "easy_spell": "zfx",
  "city_id": "194" },

{
  "district_id": "1724",
  "district_name": "沅陵县",
  "spell": "zuolingxian",
  "easy_spell": "zlx",
  "city_id": "194" },

{
  "district_id": "1725",
  "district_name": "辰溪县",
  "spell": "chenxixian",
  "easy_spell": "cxx",
  "city_id": "194" },

{
  "district_id": "1726",
  "district_name": "溆浦县",
  "spell": "zuopuxian",
  "easy_spell": "zpx",
  "city_id": "194" },

{
  "district_id": "1727",
  "district_name": "会同县",
  "spell": "huitongxian",
  "easy_spell": "htx",
  "city_id": "194" },

{
  "district_id": "1728",
  "district_name": "麻阳苗族自治县",
  "spell": "mayangmiaozuzizhixian",
  "easy_spell": "mymzzzx",
  "city_id": "194" },

{
  "district_id": "1729",
  "district_name": "新晃侗族自治县",
  "spell": "xinhuangdongzuzizhixian",
  "easy_spell": "xhdzzzx",
  "city_id": "194" },

{
  "district_id": "1730",
  "district_name": "芷江侗族自治县",
  "spell": "zuojiangdongzuzizhixian",
  "easy_spell": "zjdzzzx",
  "city_id": "194" },

{
  "district_id": "1731",
  "district_name": "靖州苗族侗族自治县",
  "spell": "jingzhoumiaozudongzuzizhixian",
  "easy_spell": "jzmzdzzzx",
  "city_id": "194" },

{
  "district_id": "1732",
  "district_name": "通道侗族自治县",
  "spell": "tongdaodongzuzizhixian",
  "easy_spell": "tddzzzx",
  "city_id": "194" },

{
  "district_id": "1733",
  "district_name": "洪江市",
  "spell": "hongjiangshi",
  "easy_spell": "hjs",
  "city_id": "194" },

{
  "district_id": "1734",
  "district_name": "娄星区",
  "spell": "louxingqu",
  "easy_spell": "lxq",
  "city_id": "195" },

{
  "district_id": "1735",
  "district_name": "双峰县",
  "spell": "shuangfengxian",
  "easy_spell": "sfx",
  "city_id": "195" },

{
  "district_id": "1736",
  "district_name": "新化县",
  "spell": "xinhuaxian",
  "easy_spell": "xhx",
  "city_id": "195" },

{
  "district_id": "1737",
  "district_name": "冷水江市",
  "spell": "lengshuijiangshi",
  "easy_spell": "lsjs",
  "city_id": "195" },

{
  "district_id": "1738",
  "district_name": "涟源市",
  "spell": "lianyuanshi",
  "easy_spell": "lys",
  "city_id": "195" },

{
  "district_id": "1739",
  "district_name": "吉首市",
  "spell": "jishoushi",
  "easy_spell": "jss",
  "city_id": "196" },

{
  "district_id": "1740",
  "district_name": "泸溪县",
  "spell": "zuoxixian",
  "easy_spell": "zxx",
  "city_id": "196" },

{
  "district_id": "1741",
  "district_name": "凤凰县",
  "spell": "fenghuangxian",
  "easy_spell": "fhx",
  "city_id": "196" },

{
  "district_id": "1742",
  "district_name": "花垣县",
  "spell": "huayuanxian",
  "easy_spell": "hyx",
  "city_id": "196" },

{
  "district_id": "1743",
  "district_name": "保靖县",
  "spell": "baojingxian",
  "easy_spell": "bjx",
  "city_id": "196" },

{
  "district_id": "1744",
  "district_name": "古丈县",
  "spell": "guzhangxian",
  "easy_spell": "gzx",
  "city_id": "196" },

{
  "district_id": "1745",
  "district_name": "永顺县",
  "spell": "yongshunxian",
  "easy_spell": "ysx",
  "city_id": "196" },

{
  "district_id": "1746",
  "district_name": "龙山县",
  "spell": "longshanxian",
  "easy_spell": "lsx",
  "city_id": "196" },

{
  "district_id": "1747",
  "district_name": "东山区",
  "spell": "dongshanqu",
  "easy_spell": "dsq",
  "city_id": "197" },

{
  "district_id": "1748",
  "district_name": "荔湾区",
  "spell": "liwanqu",
  "easy_spell": "lwq",
  "city_id": "197" },

{
  "district_id": "1749",
  "district_name": "越秀区",
  "spell": "yuexiuqu",
  "easy_spell": "yxq",
  "city_id": "197" },

{
  "district_id": "1750",
  "district_name": "海珠区",
  "spell": "haizhuqu",
  "easy_spell": "hzq",
  "city_id": "197" },

{
  "district_id": "1751",
  "district_name": "天河区",
  "spell": "tianhequ",
  "easy_spell": "thq",
  "city_id": "197" },

{
  "district_id": "1752",
  "district_name": "芳村区",
  "spell": "fangcunqu",
  "easy_spell": "fcq",
  "city_id": "197" },

{
  "district_id": "1753",
  "district_name": "白云区",
  "spell": "baiyunqu",
  "easy_spell": "byq",
  "city_id": "197" },

{
  "district_id": "1754",
  "district_name": "黄埔区",
  "spell": "huangpuqu",
  "easy_spell": "hpq",
  "city_id": "197" },

{
  "district_id": "1755",
  "district_name": "番禺区",
  "spell": "fanzuoqu",
  "easy_spell": "fzq",
  "city_id": "197" },

{
  "district_id": "1756",
  "district_name": "花都区",
  "spell": "huaduqu",
  "easy_spell": "hdq",
  "city_id": "197" },

{
  "district_id": "1757",
  "district_name": "增城市",
  "spell": "zengchengshi",
  "easy_spell": "zcs",
  "city_id": "197" },

{
  "district_id": "1758",
  "district_name": "从化市",
  "spell": "conghuashi",
  "easy_spell": "chs",
  "city_id": "197" },

{
  "district_id": "1759",
  "district_name": "武江区",
  "spell": "wujiangqu",
  "easy_spell": "wjq",
  "city_id": "198" },

{
  "district_id": "1760",
  "district_name": "浈江区",
  "spell": "zuojiangqu",
  "easy_spell": "zjq",
  "city_id": "198" },

{
  "district_id": "1761",
  "district_name": "曲江区",
  "spell": "qujiangqu",
  "easy_spell": "qjq",
  "city_id": "198" },

{
  "district_id": "1762",
  "district_name": "始兴县",
  "spell": "shixingxian",
  "easy_spell": "sxx",
  "city_id": "198" },

{
  "district_id": "1763",
  "district_name": "仁化县",
  "spell": "renhuaxian",
  "easy_spell": "rhx",
  "city_id": "198" },

{
  "district_id": "1764",
  "district_name": "翁源县",
  "spell": "wengyuanxian",
  "easy_spell": "wyx",
  "city_id": "198" },

{
  "district_id": "1765",
  "district_name": "乳源瑶族自治县",
  "spell": "ruyuanyaozuzizhixian",
  "easy_spell": "ryyzzzx",
  "city_id": "198" },

{
  "district_id": "1766",
  "district_name": "新丰县",
  "spell": "xinfengxian",
  "easy_spell": "xfx",
  "city_id": "198" },

{
  "district_id": "1767",
  "district_name": "乐昌市",
  "spell": "lechangshi",
  "easy_spell": "lcs",
  "city_id": "198" },

{
  "district_id": "1768",
  "district_name": "南雄市",
  "spell": "nanxiongshi",
  "easy_spell": "nxs",
  "city_id": "198" },

{
  "district_id": "1769",
  "district_name": "罗湖区",
  "spell": "luohuqu",
  "easy_spell": "lhq",
  "city_id": "199" },

{
  "district_id": "1770",
  "district_name": "福田区",
  "spell": "futianqu",
  "easy_spell": "ftq",
  "city_id": "199" },

{
  "district_id": "1771",
  "district_name": "南山区",
  "spell": "nanshanqu",
  "easy_spell": "nsq",
  "city_id": "199" },

{
  "district_id": "1772",
  "district_name": "宝安区",
  "spell": "baoanqu",
  "easy_spell": "baq",
  "city_id": "199" },

{
  "district_id": "1773",
  "district_name": "龙岗区",
  "spell": "longgangqu",
  "easy_spell": "lgq",
  "city_id": "199" },

{
  "district_id": "1774",
  "district_name": "盐田区",
  "spell": "yantianqu",
  "easy_spell": "ytq",
  "city_id": "199" },

{
  "district_id": "1775",
  "district_name": "香洲区",
  "spell": "xiangzhouqu",
  "easy_spell": "xzq",
  "city_id": "200" },

{
  "district_id": "1776",
  "district_name": "斗门区",
  "spell": "doumenqu",
  "easy_spell": "dmq",
  "city_id": "200" },

{
  "district_id": "1777",
  "district_name": "金湾区",
  "spell": "jinwanqu",
  "easy_spell": "jwq",
  "city_id": "200" },

{
  "district_id": "1778",
  "district_name": "龙湖区",
  "spell": "longhuqu",
  "easy_spell": "lhq",
  "city_id": "201" },

{
  "district_id": "1779",
  "district_name": "金平区",
  "spell": "jinpingqu",
  "easy_spell": "jpq",
  "city_id": "201" },

{
  "district_id": "1780",
  "district_name": "濠江区",
  "spell": "zuojiangqu",
  "easy_spell": "zjq",
  "city_id": "201" },

{
  "district_id": "1781",
  "district_name": "潮阳区",
  "spell": "chaoyangqu",
  "easy_spell": "cyq",
  "city_id": "201" },

{
  "district_id": "1782",
  "district_name": "潮南区",
  "spell": "chaonanqu",
  "easy_spell": "cnq",
  "city_id": "201" },

{
  "district_id": "1783",
  "district_name": "澄海区",
  "spell": "chenghaiqu",
  "easy_spell": "chq",
  "city_id": "201" },

{
  "district_id": "1784",
  "district_name": "南澳县",
  "spell": "nanaoxian",
  "easy_spell": "nax",
  "city_id": "201" },

{
  "district_id": "1785",
  "district_name": "禅城区",
  "spell": "zuochengqu",
  "easy_spell": "zcq",
  "city_id": "202" },

{
  "district_id": "1786",
  "district_name": "南海区",
  "spell": "nanhaiqu",
  "easy_spell": "nhq",
  "city_id": "202" },

{
  "district_id": "1787",
  "district_name": "顺德区",
  "spell": "shundequ",
  "easy_spell": "sdq",
  "city_id": "202" },

{
  "district_id": "1788",
  "district_name": "三水区",
  "spell": "sanshuiqu",
  "easy_spell": "ssq",
  "city_id": "202" },

{
  "district_id": "1789",
  "district_name": "高明区",
  "spell": "gaomingqu",
  "easy_spell": "gmq",
  "city_id": "202" },

{
  "district_id": "1790",
  "district_name": "蓬江区",
  "spell": "pengjiangqu",
  "easy_spell": "pjq",
  "city_id": "203" },

{
  "district_id": "1791",
  "district_name": "江海区",
  "spell": "jianghaiqu",
  "easy_spell": "jhq",
  "city_id": "203" },

{
  "district_id": "1792",
  "district_name": "新会区",
  "spell": "xinhuiqu",
  "easy_spell": "xhq",
  "city_id": "203" },

{
  "district_id": "1793",
  "district_name": "台山市",
  "spell": "taishanshi",
  "easy_spell": "tss",
  "city_id": "203" },

{
  "district_id": "1794",
  "district_name": "开平市",
  "spell": "kaipingshi",
  "easy_spell": "kps",
  "city_id": "203" },

{
  "district_id": "1795",
  "district_name": "鹤山市",
  "spell": "heshanshi",
  "easy_spell": "hss",
  "city_id": "203" },

{
  "district_id": "1796",
  "district_name": "恩平市",
  "spell": "enpingshi",
  "easy_spell": "eps",
  "city_id": "203" },

{
  "district_id": "1797",
  "district_name": "赤坎区",
  "spell": "chikanqu",
  "easy_spell": "ckq",
  "city_id": "204" },

{
  "district_id": "1798",
  "district_name": "霞山区",
  "spell": "xiashanqu",
  "easy_spell": "xsq",
  "city_id": "204" },

{
  "district_id": "1799",
  "district_name": "坡头区",
  "spell": "potouqu",
  "easy_spell": "ptq",
  "city_id": "204" },

{
  "district_id": "1800",
  "district_name": "麻章区",
  "spell": "mazhangqu",
  "easy_spell": "mzq",
  "city_id": "204" },

{
  "district_id": "1801",
  "district_name": "遂溪县",
  "spell": "suixixian",
  "easy_spell": "sxx",
  "city_id": "204" },

{
  "district_id": "1802",
  "district_name": "徐闻县",
  "spell": "xuwenxian",
  "easy_spell": "xwx",
  "city_id": "204" },

{
  "district_id": "1803",
  "district_name": "廉江市",
  "spell": "lianjiangshi",
  "easy_spell": "ljs",
  "city_id": "204" },

{
  "district_id": "1804",
  "district_name": "雷州市",
  "spell": "leizhoushi",
  "easy_spell": "lzs",
  "city_id": "204" },

{
  "district_id": "1805",
  "district_name": "吴川市",
  "spell": "wuchuanshi",
  "easy_spell": "wcs",
  "city_id": "204" },

{
  "district_id": "1806",
  "district_name": "茂南区",
  "spell": "maonanqu",
  "easy_spell": "mnq",
  "city_id": "205" },

{
  "district_id": "1807",
  "district_name": "茂港区",
  "spell": "maogangqu",
  "easy_spell": "mgq",
  "city_id": "205" },

{
  "district_id": "1808",
  "district_name": "电白县",
  "spell": "dianbaixian",
  "easy_spell": "dbx",
  "city_id": "205" },

{
  "district_id": "1809",
  "district_name": "高州市",
  "spell": "gaozhoushi",
  "easy_spell": "gzs",
  "city_id": "205" },

{
  "district_id": "1810",
  "district_name": "化州市",
  "spell": "huazhoushi",
  "easy_spell": "hzs",
  "city_id": "205" },

{
  "district_id": "1811",
  "district_name": "信宜市",
  "spell": "xinyishi",
  "easy_spell": "xys",
  "city_id": "205" },

{
  "district_id": "1812",
  "district_name": "端州区",
  "spell": "duanzhouqu",
  "easy_spell": "dzq",
  "city_id": "206" },

{
  "district_id": "1813",
  "district_name": "鼎湖区",
  "spell": "dinghuqu",
  "easy_spell": "dhq",
  "city_id": "206" },

{
  "district_id": "1814",
  "district_name": "广宁县",
  "spell": "guangningxian",
  "easy_spell": "gnx",
  "city_id": "206" },

{
  "district_id": "1815",
  "district_name": "怀集县",
  "spell": "huaijixian",
  "easy_spell": "hjx",
  "city_id": "206" },

{
  "district_id": "1816",
  "district_name": "封开县",
  "spell": "fengkaixian",
  "easy_spell": "fkx",
  "city_id": "206" },

{
  "district_id": "1817",
  "district_name": "德庆县",
  "spell": "deqingxian",
  "easy_spell": "dqx",
  "city_id": "206" },

{
  "district_id": "1818",
  "district_name": "高要市",
  "spell": "gaoyaoshi",
  "easy_spell": "gys",
  "city_id": "206" },

{
  "district_id": "1819",
  "district_name": "四会市",
  "spell": "sihuishi",
  "easy_spell": "shs",
  "city_id": "206" },

{
  "district_id": "1820",
  "district_name": "惠城区",
  "spell": "huichengqu",
  "easy_spell": "hcq",
  "city_id": "207" },

{
  "district_id": "1821",
  "district_name": "惠阳区",
  "spell": "huiyangqu",
  "easy_spell": "hyq",
  "city_id": "207" },

{
  "district_id": "1822",
  "district_name": "博罗县",
  "spell": "boluoxian",
  "easy_spell": "blx",
  "city_id": "207" },

{
  "district_id": "1823",
  "district_name": "惠东县",
  "spell": "huidongxian",
  "easy_spell": "hdx",
  "city_id": "207" },

{
  "district_id": "1824",
  "district_name": "龙门县",
  "spell": "longmenxian",
  "easy_spell": "lmx",
  "city_id": "207" },

{
  "district_id": "1825",
  "district_name": "梅江区",
  "spell": "meijiangqu",
  "easy_spell": "mjq",
  "city_id": "208" },

{
  "district_id": "1826",
  "district_name": "梅县",
  "spell": "meixian",
  "easy_spell": "mx",
  "city_id": "208" },

{
  "district_id": "1827",
  "district_name": "大埔县",
  "spell": "dapuxian",
  "easy_spell": "dpx",
  "city_id": "208" },

{
  "district_id": "1828",
  "district_name": "丰顺县",
  "spell": "fengshunxian",
  "easy_spell": "fsx",
  "city_id": "208" },

{
  "district_id": "1829",
  "district_name": "五华县",
  "spell": "wuhuaxian",
  "easy_spell": "whx",
  "city_id": "208" },

{
  "district_id": "1830",
  "district_name": "平远县",
  "spell": "pingyuanxian",
  "easy_spell": "pyx",
  "city_id": "208" },

{
  "district_id": "1831",
  "district_name": "蕉岭县",
  "spell": "jiaolingxian",
  "easy_spell": "jlx",
  "city_id": "208" },

{
  "district_id": "1832",
  "district_name": "兴宁市",
  "spell": "xingningshi",
  "easy_spell": "xns",
  "city_id": "208" },

{
  "district_id": "1833",
  "district_name": "城区",
  "spell": "chengqu",
  "easy_spell": "cq",
  "city_id": "209" },

{
  "district_id": "1834",
  "district_name": "海丰县",
  "spell": "haifengxian",
  "easy_spell": "hfx",
  "city_id": "209" },

{
  "district_id": "1835",
  "district_name": "陆河县",
  "spell": "luhexian",
  "easy_spell": "lhx",
  "city_id": "209" },

{
  "district_id": "1836",
  "district_name": "陆丰市",
  "spell": "lufengshi",
  "easy_spell": "lfs",
  "city_id": "209" },

{
  "district_id": "1837",
  "district_name": "源城区",
  "spell": "yuanchengqu",
  "easy_spell": "ycq",
  "city_id": "210" },

{
  "district_id": "1838",
  "district_name": "紫金县",
  "spell": "zijinxian",
  "easy_spell": "zjx",
  "city_id": "210" },

{
  "district_id": "1839",
  "district_name": "龙川县",
  "spell": "longchuanxian",
  "easy_spell": "lcx",
  "city_id": "210" },

{
  "district_id": "1840",
  "district_name": "连平县",
  "spell": "lianpingxian",
  "easy_spell": "lpx",
  "city_id": "210" },

{
  "district_id": "1841",
  "district_name": "和平县",
  "spell": "hepingxian",
  "easy_spell": "hpx",
  "city_id": "210" },

{
  "district_id": "1842",
  "district_name": "东源县",
  "spell": "dongyuanxian",
  "easy_spell": "dyx",
  "city_id": "210" },

{
  "district_id": "1843",
  "district_name": "江城区",
  "spell": "jiangchengqu",
  "easy_spell": "jcq",
  "city_id": "211" },

{
  "district_id": "1844",
  "district_name": "阳西县",
  "spell": "yangxixian",
  "easy_spell": "yxx",
  "city_id": "211" },

{
  "district_id": "1845",
  "district_name": "阳东县",
  "spell": "yangdongxian",
  "easy_spell": "ydx",
  "city_id": "211" },

{
  "district_id": "1846",
  "district_name": "阳春市",
  "spell": "yangchunshi",
  "easy_spell": "ycs",
  "city_id": "211" },

{
  "district_id": "1847",
  "district_name": "清城区",
  "spell": "qingchengqu",
  "easy_spell": "qcq",
  "city_id": "212" },

{
  "district_id": "1848",
  "district_name": "佛冈县",
  "spell": "fogangxian",
  "easy_spell": "fgx",
  "city_id": "212" },

{
  "district_id": "1849",
  "district_name": "阳山县",
  "spell": "yangshanxian",
  "easy_spell": "ysx",
  "city_id": "212" },

{
  "district_id": "1850",
  "district_name": "连山壮族瑶族自治县",
  "spell": "lianshanzhuangzuyaozuzizhixian",
  "easy_spell": "lszzyzzzx",
  "city_id": "212" },

{
  "district_id": "1851",
  "district_name": "连南瑶族自治县",
  "spell": "liannanyaozuzizhixian",
  "easy_spell": "lnyzzzx",
  "city_id": "212" },

{
  "district_id": "1852",
  "district_name": "清新县",
  "spell": "qingxinxian",
  "easy_spell": "qxx",
  "city_id": "212" },

{
  "district_id": "1853",
  "district_name": "英德市",
  "spell": "yingdeshi",
  "easy_spell": "yds",
  "city_id": "212" },

{
  "district_id": "1854",
  "district_name": "连州市",
  "spell": "lianzhoushi",
  "easy_spell": "lzs",
  "city_id": "212" },

{
  "district_id": "1855",
  "district_name": "湘桥区",
  "spell": "xiangqiaoqu",
  "easy_spell": "xqq",
  "city_id": "215" },

{
  "district_id": "1856",
  "district_name": "潮安县",
  "spell": "chaoanxian",
  "easy_spell": "cax",
  "city_id": "215" },

{
  "district_id": "1857",
  "district_name": "饶平县",
  "spell": "raopingxian",
  "easy_spell": "rpx",
  "city_id": "215" },

{
  "district_id": "1858",
  "district_name": "榕城区",
  "spell": "zuochengqu",
  "easy_spell": "zcq",
  "city_id": "216" },

{
  "district_id": "1859",
  "district_name": "揭东县",
  "spell": "jiedongxian",
  "easy_spell": "jdx",
  "city_id": "216" },

{
  "district_id": "1860",
  "district_name": "揭西县",
  "spell": "jiexixian",
  "easy_spell": "jxx",
  "city_id": "216" },

{
  "district_id": "1861",
  "district_name": "惠来县",
  "spell": "huilaixian",
  "easy_spell": "hlx",
  "city_id": "216" },

{
  "district_id": "1862",
  "district_name": "普宁市",
  "spell": "puningshi",
  "easy_spell": "pns",
  "city_id": "216" },

{
  "district_id": "1863",
  "district_name": "云城区",
  "spell": "yunchengqu",
  "easy_spell": "ycq",
  "city_id": "217" },

{
  "district_id": "1864",
  "district_name": "新兴县",
  "spell": "xinxingxian",
  "easy_spell": "xxx",
  "city_id": "217" },

{
  "district_id": "1865",
  "district_name": "郁南县",
  "spell": "yunanxian",
  "easy_spell": "ynx",
  "city_id": "217" },

{
  "district_id": "1866",
  "district_name": "云安县",
  "spell": "yunanxian",
  "easy_spell": "yax",
  "city_id": "217" },

{
  "district_id": "1867",
  "district_name": "罗定市",
  "spell": "luodingshi",
  "easy_spell": "lds",
  "city_id": "217" },

{
  "district_id": "1868",
  "district_name": "兴宁区",
  "spell": "xingningqu",
  "easy_spell": "xnq",
  "city_id": "218" },

{
  "district_id": "1869",
  "district_name": "青秀区",
  "spell": "qingxiuqu",
  "easy_spell": "qxq",
  "city_id": "218" },

{
  "district_id": "1870",
  "district_name": "江南区",
  "spell": "jiangnanqu",
  "easy_spell": "jnq",
  "city_id": "218" },

{
  "district_id": "1871",
  "district_name": "西乡塘区",
  "spell": "xixiangtangqu",
  "easy_spell": "xxtq",
  "city_id": "218" },

{
  "district_id": "1872",
  "district_name": "良庆区",
  "spell": "liangqingqu",
  "easy_spell": "lqq",
  "city_id": "218" },

{
  "district_id": "1873",
  "district_name": "邕宁区",
  "spell": "zuoningqu",
  "easy_spell": "znq",
  "city_id": "218" },

{
  "district_id": "1874",
  "district_name": "武鸣县",
  "spell": "wumingxian",
  "easy_spell": "wmx",
  "city_id": "218" },

{
  "district_id": "1875",
  "district_name": "隆安县",
  "spell": "longanxian",
  "easy_spell": "lax",
  "city_id": "218" },

{
  "district_id": "1876",
  "district_name": "马山县",
  "spell": "mashanxian",
  "easy_spell": "msx",
  "city_id": "218" },

{
  "district_id": "1877",
  "district_name": "上林县",
  "spell": "shanglinxian",
  "easy_spell": "slx",
  "city_id": "218" },

{
  "district_id": "1878",
  "district_name": "宾阳县",
  "spell": "binyangxian",
  "easy_spell": "byx",
  "city_id": "218" },

{
  "district_id": "1879",
  "district_name": "横县",
  "spell": "hengxian",
  "easy_spell": "hx",
  "city_id": "218" },

{
  "district_id": "1880",
  "district_name": "城中区",
  "spell": "chengzhongqu",
  "easy_spell": "czq",
  "city_id": "219" },

{
  "district_id": "1881",
  "district_name": "鱼峰区",
  "spell": "yufengqu",
  "easy_spell": "yfq",
  "city_id": "219" },

{
  "district_id": "1882",
  "district_name": "柳南区",
  "spell": "liunanqu",
  "easy_spell": "lnq",
  "city_id": "219" },

{
  "district_id": "1883",
  "district_name": "柳北区",
  "spell": "liubeiqu",
  "easy_spell": "lbq",
  "city_id": "219" },

{
  "district_id": "1884",
  "district_name": "柳江县",
  "spell": "liujiangxian",
  "easy_spell": "ljx",
  "city_id": "219" },

{
  "district_id": "1885",
  "district_name": "柳城县",
  "spell": "liuchengxian",
  "easy_spell": "lcx",
  "city_id": "219" },

{
  "district_id": "1886",
  "district_name": "鹿寨县",
  "spell": "luzhaixian",
  "easy_spell": "lzx",
  "city_id": "219" },

{
  "district_id": "1887",
  "district_name": "融安县",
  "spell": "ronganxian",
  "easy_spell": "rax",
  "city_id": "219" },

{
  "district_id": "1888",
  "district_name": "融水苗族自治县",
  "spell": "rongshuimiaozuzizhixian",
  "easy_spell": "rsmzzzx",
  "city_id": "219" },

{
  "district_id": "1889",
  "district_name": "三江侗族自治县",
  "spell": "sanjiangdongzuzizhixian",
  "easy_spell": "sjdzzzx",
  "city_id": "219" },

{
  "district_id": "1890",
  "district_name": "秀峰区",
  "spell": "xiufengqu",
  "easy_spell": "xfq",
  "city_id": "220" },

{
  "district_id": "1891",
  "district_name": "叠彩区",
  "spell": "diecaiqu",
  "easy_spell": "dcq",
  "city_id": "220" },

{
  "district_id": "1892",
  "district_name": "象山区",
  "spell": "xiangshanqu",
  "easy_spell": "xsq",
  "city_id": "220" },

{
  "district_id": "1893",
  "district_name": "七星区",
  "spell": "qixingqu",
  "easy_spell": "qxq",
  "city_id": "220" },

{
  "district_id": "1894",
  "district_name": "雁山区",
  "spell": "yanshanqu",
  "easy_spell": "ysq",
  "city_id": "220" },

{
  "district_id": "1895",
  "district_name": "阳朔县",
  "spell": "yangshuoxian",
  "easy_spell": "ysx",
  "city_id": "220" },

{
  "district_id": "1896",
  "district_name": "临桂县",
  "spell": "linguixian",
  "easy_spell": "lgx",
  "city_id": "220" },

{
  "district_id": "1897",
  "district_name": "灵川县",
  "spell": "lingchuanxian",
  "easy_spell": "lcx",
  "city_id": "220" },

{
  "district_id": "1898",
  "district_name": "全州县",
  "spell": "quanzhouxian",
  "easy_spell": "qzx",
  "city_id": "220" },

{
  "district_id": "1899",
  "district_name": "兴安县",
  "spell": "xinganxian",
  "easy_spell": "xax",
  "city_id": "220" },

{
  "district_id": "1900",
  "district_name": "永福县",
  "spell": "yongfuxian",
  "easy_spell": "yfx",
  "city_id": "220" },

{
  "district_id": "1901",
  "district_name": "灌阳县",
  "spell": "guanyangxian",
  "easy_spell": "gyx",
  "city_id": "220" },

{
  "district_id": "1902",
  "district_name": "龙胜各族自治县",
  "spell": "longshenggezuzizhixian",
  "easy_spell": "lsgzzzx",
  "city_id": "220" },

{
  "district_id": "1903",
  "district_name": "资源县",
  "spell": "ziyuanxian",
  "easy_spell": "zyx",
  "city_id": "220" },

{
  "district_id": "1904",
  "district_name": "平乐县",
  "spell": "pinglexian",
  "easy_spell": "plx",
  "city_id": "220" },

{
  "district_id": "1905",
  "district_name": "荔蒲县",
  "spell": "lipuxian",
  "easy_spell": "lpx",
  "city_id": "220" },

{
  "district_id": "1906",
  "district_name": "恭城瑶族自治县",
  "spell": "gongchengyaozuzizhixian",
  "easy_spell": "gcyzzzx",
  "city_id": "220" },

{
  "district_id": "1907",
  "district_name": "万秀区",
  "spell": "wanxiuqu",
  "easy_spell": "wxq",
  "city_id": "221" },

{
  "district_id": "1908",
  "district_name": "蝶山区",
  "spell": "dieshanqu",
  "easy_spell": "dsq",
  "city_id": "221" },

{
  "district_id": "1909",
  "district_name": "长洲区",
  "spell": "changzhouqu",
  "easy_spell": "czq",
  "city_id": "221" },

{
  "district_id": "1910",
  "district_name": "苍梧县",
  "spell": "cangwuxian",
  "easy_spell": "cwx",
  "city_id": "221" },

{
  "district_id": "1911",
  "district_name": "藤县",
  "spell": "tengxian",
  "easy_spell": "tx",
  "city_id": "221" },

{
  "district_id": "1912",
  "district_name": "蒙山县",
  "spell": "mengshanxian",
  "easy_spell": "msx",
  "city_id": "221" },

{
  "district_id": "1913",
  "district_name": "岑溪市",
  "spell": "zuoxishi",
  "easy_spell": "zxs",
  "city_id": "221" },

{
  "district_id": "1914",
  "district_name": "海城区",
  "spell": "haichengqu",
  "easy_spell": "hcq",
  "city_id": "222" },

{
  "district_id": "1915",
  "district_name": "银海区",
  "spell": "yinhaiqu",
  "easy_spell": "yhq",
  "city_id": "222" },

{
  "district_id": "1916",
  "district_name": "铁山港区",
  "spell": "tieshangangqu",
  "easy_spell": "tsgq",
  "city_id": "222" },

{
  "district_id": "1917",
  "district_name": "合浦县",
  "spell": "hepuxian",
  "easy_spell": "hpx",
  "city_id": "222" },

{
  "district_id": "1918",
  "district_name": "港口区",
  "spell": "gangkouqu",
  "easy_spell": "gkq",
  "city_id": "223" },

{
  "district_id": "1919",
  "district_name": "防城区",
  "spell": "fangchengqu",
  "easy_spell": "fcq",
  "city_id": "223" },

{
  "district_id": "1920",
  "district_name": "上思县",
  "spell": "shangsixian",
  "easy_spell": "ssx",
  "city_id": "223" },

{
  "district_id": "1921",
  "district_name": "东兴市",
  "spell": "dongxingshi",
  "easy_spell": "dxs",
  "city_id": "223" },

{
  "district_id": "1922",
  "district_name": "钦南区",
  "spell": "qinnanqu",
  "easy_spell": "qnq",
  "city_id": "224" },

{
  "district_id": "1923",
  "district_name": "钦北区",
  "spell": "qinbeiqu",
  "easy_spell": "qbq",
  "city_id": "224" },

{
  "district_id": "1924",
  "district_name": "灵山县",
  "spell": "lingshanxian",
  "easy_spell": "lsx",
  "city_id": "224" },

{
  "district_id": "1925",
  "district_name": "浦北县",
  "spell": "pubeixian",
  "easy_spell": "pbx",
  "city_id": "224" },

{
  "district_id": "1926",
  "district_name": "港北区",
  "spell": "gangbeiqu",
  "easy_spell": "gbq",
  "city_id": "225" },

{
  "district_id": "1927",
  "district_name": "港南区",
  "spell": "gangnanqu",
  "easy_spell": "gnq",
  "city_id": "225" },

{
  "district_id": "1928",
  "district_name": "覃塘区",
  "spell": "zuotangqu",
  "easy_spell": "ztq",
  "city_id": "225" },

{
  "district_id": "1929",
  "district_name": "平南县",
  "spell": "pingnanxian",
  "easy_spell": "pnx",
  "city_id": "225" },

{
  "district_id": "1930",
  "district_name": "桂平市",
  "spell": "guipingshi",
  "easy_spell": "gps",
  "city_id": "225" },

{
  "district_id": "1931",
  "district_name": "玉州区",
  "spell": "yuzhouqu",
  "easy_spell": "yzq",
  "city_id": "226" },

{
  "district_id": "1932",
  "district_name": "容县",
  "spell": "rongxian",
  "easy_spell": "rx",
  "city_id": "226" },

{
  "district_id": "1933",
  "district_name": "陆川县",
  "spell": "luchuanxian",
  "easy_spell": "lcx",
  "city_id": "226" },

{
  "district_id": "1934",
  "district_name": "博白县",
  "spell": "bobaixian",
  "easy_spell": "bbx",
  "city_id": "226" },

{
  "district_id": "1935",
  "district_name": "兴业县",
  "spell": "xingyexian",
  "easy_spell": "xyx",
  "city_id": "226" },

{
  "district_id": "1936",
  "district_name": "北流市",
  "spell": "beiliushi",
  "easy_spell": "bls",
  "city_id": "226" },

{
  "district_id": "1937",
  "district_name": "右江区",
  "spell": "youjiangqu",
  "easy_spell": "yjq",
  "city_id": "227" },

{
  "district_id": "1938",
  "district_name": "田阳县",
  "spell": "tianyangxian",
  "easy_spell": "tyx",
  "city_id": "227" },

{
  "district_id": "1939",
  "district_name": "田东县",
  "spell": "tiandongxian",
  "easy_spell": "tdx",
  "city_id": "227" },

{
  "district_id": "1940",
  "district_name": "平果县",
  "spell": "pingguoxian",
  "easy_spell": "pgx",
  "city_id": "227" },

{
  "district_id": "1941",
  "district_name": "德保县",
  "spell": "debaoxian",
  "easy_spell": "dbx",
  "city_id": "227" },

{
  "district_id": "1942",
  "district_name": "靖西县",
  "spell": "jingxixian",
  "easy_spell": "jxx",
  "city_id": "227" },

{
  "district_id": "1943",
  "district_name": "那坡县",
  "spell": "napoxian",
  "easy_spell": "npx",
  "city_id": "227" },

{
  "district_id": "1944",
  "district_name": "凌云县",
  "spell": "lingyunxian",
  "easy_spell": "lyx",
  "city_id": "227" },

{
  "district_id": "1945",
  "district_name": "乐业县",
  "spell": "leyexian",
  "easy_spell": "lyx",
  "city_id": "227" },

{
  "district_id": "1946",
  "district_name": "田林县",
  "spell": "tianlinxian",
  "easy_spell": "tlx",
  "city_id": "227" },

{
  "district_id": "1947",
  "district_name": "西林县",
  "spell": "xilinxian",
  "easy_spell": "xlx",
  "city_id": "227" },

{
  "district_id": "1948",
  "district_name": "隆林各族自治县",
  "spell": "longlingezuzizhixian",
  "easy_spell": "llgzzzx",
  "city_id": "227" },

{
  "district_id": "1949",
  "district_name": "八步区",
  "spell": "babuqu",
  "easy_spell": "bbq",
  "city_id": "228" },

{
  "district_id": "1950",
  "district_name": "昭平县",
  "spell": "zhaopingxian",
  "easy_spell": "zpx",
  "city_id": "228" },

{
  "district_id": "1951",
  "district_name": "钟山县",
  "spell": "zhongshanxian",
  "easy_spell": "zsx",
  "city_id": "228" },

{
  "district_id": "1952",
  "district_name": "富川瑶族自治县",
  "spell": "fuchuanyaozuzizhixian",
  "easy_spell": "fcyzzzx",
  "city_id": "228" },

{
  "district_id": "1953",
  "district_name": "金城江区",
  "spell": "jinchengjiangqu",
  "easy_spell": "jcjq",
  "city_id": "229" },

{
  "district_id": "1954",
  "district_name": "南丹县",
  "spell": "nandanxian",
  "easy_spell": "ndx",
  "city_id": "229" },

{
  "district_id": "1955",
  "district_name": "天峨县",
  "spell": "tianexian",
  "easy_spell": "tex",
  "city_id": "229" },

{
  "district_id": "1956",
  "district_name": "凤山县",
  "spell": "fengshanxian",
  "easy_spell": "fsx",
  "city_id": "229" },

{
  "district_id": "1957",
  "district_name": "东兰县",
  "spell": "donglanxian",
  "easy_spell": "dlx",
  "city_id": "229" },

{
  "district_id": "1958",
  "district_name": "罗城仫佬族自治县",
  "spell": "luochengzuolaozuzizhixian",
  "easy_spell": "lczlzzzx",
  "city_id": "229" },

{
  "district_id": "1959",
  "district_name": "环江毛南族自治县",
  "spell": "huanjiangmaonanzuzizhixian",
  "easy_spell": "hjmnzzzx",
  "city_id": "229" },

{
  "district_id": "1960",
  "district_name": "巴马瑶族自治县",
  "spell": "bamayaozuzizhixian",
  "easy_spell": "bmyzzzx",
  "city_id": "229" },

{
  "district_id": "1961",
  "district_name": "都安瑶族自治县",
  "spell": "duanyaozuzizhixian",
  "easy_spell": "dayzzzx",
  "city_id": "229" },

{
  "district_id": "1962",
  "district_name": "大化瑶族自治县",
  "spell": "dahuayaozuzizhixian",
  "easy_spell": "dhyzzzx",
  "city_id": "229" },

{
  "district_id": "1963",
  "district_name": "宜州市",
  "spell": "yizhoushi",
  "easy_spell": "yzs",
  "city_id": "229" },

{
  "district_id": "1964",
  "district_name": "兴宾区",
  "spell": "xingbinqu",
  "easy_spell": "xbq",
  "city_id": "230" },

{
  "district_id": "1965",
  "district_name": "忻城县",
  "spell": "xinchengxian",
  "easy_spell": "xcx",
  "city_id": "230" },

{
  "district_id": "1966",
  "district_name": "象州县",
  "spell": "xiangzhouxian",
  "easy_spell": "xzx",
  "city_id": "230" },

{
  "district_id": "1967",
  "district_name": "武宣县",
  "spell": "wuxuanxian",
  "easy_spell": "wxx",
  "city_id": "230" },

{
  "district_id": "1968",
  "district_name": "金秀瑶族自治县",
  "spell": "jinxiuyaozuzizhixian",
  "easy_spell": "jxyzzzx",
  "city_id": "230" },

{
  "district_id": "1969",
  "district_name": "合山市",
  "spell": "heshanshi",
  "easy_spell": "hss",
  "city_id": "230" },

{
  "district_id": "1970",
  "district_name": "江洲区",
  "spell": "jiangzhouqu",
  "easy_spell": "jzq",
  "city_id": "231" },

{
  "district_id": "1971",
  "district_name": "扶绥县",
  "spell": "fusuixian",
  "easy_spell": "fsx",
  "city_id": "231" },

{
  "district_id": "1972",
  "district_name": "宁明县",
  "spell": "ningmingxian",
  "easy_spell": "nmx",
  "city_id": "231" },

{
  "district_id": "1973",
  "district_name": "龙州县",
  "spell": "longzhouxian",
  "easy_spell": "lzx",
  "city_id": "231" },

{
  "district_id": "1974",
  "district_name": "大新县",
  "spell": "daxinxian",
  "easy_spell": "dxx",
  "city_id": "231" },

{
  "district_id": "1975",
  "district_name": "天等县",
  "spell": "tiandengxian",
  "easy_spell": "tdx",
  "city_id": "231" },

{
  "district_id": "1976",
  "district_name": "凭祥市",
  "spell": "pingxiangshi",
  "easy_spell": "pxs",
  "city_id": "231" },

{
  "district_id": "1977",
  "district_name": "秀英区",
  "spell": "xiuyingqu",
  "easy_spell": "xyq",
  "city_id": "232" },

{
  "district_id": "1978",
  "district_name": "龙华区",
  "spell": "longhuaqu",
  "easy_spell": "lhq",
  "city_id": "232" },

{
  "district_id": "1979",
  "district_name": "琼山区",
  "spell": "qiongshanqu",
  "easy_spell": "qsq",
  "city_id": "232" },

{
  "district_id": "1980",
  "district_name": "美兰区",
  "spell": "meilanqu",
  "easy_spell": "mlq",
  "city_id": "232" },

{
  "district_id": "1981",
  "district_name": "五指山市",
  "spell": "wuzhishanshi",
  "easy_spell": "wzss",
  "city_id": "233" },

{
  "district_id": "1982",
  "district_name": "琼海市",
  "spell": "qionghaishi",
  "easy_spell": "qhs",
  "city_id": "233" },

{
  "district_id": "1983",
  "district_name": "儋州市",
  "spell": "zuozhoushi",
  "easy_spell": "zzs",
  "city_id": "233" },

{
  "district_id": "1984",
  "district_name": "文昌市",
  "spell": "wenchangshi",
  "easy_spell": "wcs",
  "city_id": "233" },

{
  "district_id": "1985",
  "district_name": "万宁市",
  "spell": "wanningshi",
  "easy_spell": "wns",
  "city_id": "233" },

{
  "district_id": "1986",
  "district_name": "东方市",
  "spell": "dongfangshi",
  "easy_spell": "dfs",
  "city_id": "233" },

{
  "district_id": "1987",
  "district_name": "定安县",
  "spell": "dinganxian",
  "easy_spell": "dax",
  "city_id": "233" },

{
  "district_id": "1988",
  "district_name": "屯昌县",
  "spell": "tunchangxian",
  "easy_spell": "tcx",
  "city_id": "233" },

{
  "district_id": "1989",
  "district_name": "澄迈县",
  "spell": "chengmaixian",
  "easy_spell": "cmx",
  "city_id": "233" },

{
  "district_id": "1990",
  "district_name": "临高县",
  "spell": "lingaoxian",
  "easy_spell": "lgx",
  "city_id": "233" },

{
  "district_id": "1991",
  "district_name": "白沙黎族自治县",
  "spell": "baishalizuzizhixian",
  "easy_spell": "bslzzzx",
  "city_id": "233" },

{
  "district_id": "1992",
  "district_name": "昌江黎族自治县",
  "spell": "changjianglizuzizhixian",
  "easy_spell": "cjlzzzx",
  "city_id": "233" },

{
  "district_id": "1993",
  "district_name": "乐东黎族自治县",
  "spell": "ledonglizuzizhixian",
  "easy_spell": "ldlzzzx",
  "city_id": "233" },

{
  "district_id": "1994",
  "district_name": "陵水黎族自治县",
  "spell": "lingshuilizuzizhixian",
  "easy_spell": "lslzzzx",
  "city_id": "233" },

{
  "district_id": "1995",
  "district_name": "保亭黎族苗族自治县",
  "spell": "baotinglizumiaozuzizhixian",
  "easy_spell": "btlzmzzzx",
  "city_id": "233" },

{
  "district_id": "1996",
  "district_name": "琼中黎族苗族自治县",
  "spell": "qiongzhonglizumiaozuzizhixian",
  "easy_spell": "qzlzmzzzx",
  "city_id": "233" },

{
  "district_id": "1997",
  "district_name": "西沙群岛",
  "spell": "xishaqundao",
  "easy_spell": "xsqd",
  "city_id": "233" },

{
  "district_id": "1998",
  "district_name": "南沙群岛",
  "spell": "nanshaqundao",
  "easy_spell": "nsqd",
  "city_id": "233" },

{
  "district_id": "1999",
  "district_name": "中沙群岛的岛礁及其海域",
  "spell": "zhongshaqundaodedaojiaojiqihaiyu",
  "easy_spell": "zsqdddjjqhy",
  "city_id": "233" },

{
  "district_id": "2000",
  "district_name": "万州区",
  "spell": "wanzhouqu",
  "easy_spell": "wzq",
  "city_id": "234" },

{
  "district_id": "2001",
  "district_name": "涪陵区",
  "spell": "fulingqu",
  "easy_spell": "flq",
  "city_id": "234" },

{
  "district_id": "2002",
  "district_name": "渝中区",
  "spell": "yuzhongqu",
  "easy_spell": "yzq",
  "city_id": "234" },

{
  "district_id": "2003",
  "district_name": "大渡口区",
  "spell": "dadukouqu",
  "easy_spell": "ddkq",
  "city_id": "234" },

{
  "district_id": "2004",
  "district_name": "江北区",
  "spell": "jiangbeiqu",
  "easy_spell": "jbq",
  "city_id": "234" },

{
  "district_id": "2005",
  "district_name": "沙坪坝区",
  "spell": "shapingbaqu",
  "easy_spell": "spbq",
  "city_id": "234" },

{
  "district_id": "2006",
  "district_name": "九龙坡区",
  "spell": "jiulongpoqu",
  "easy_spell": "jlpq",
  "city_id": "234" },

{
  "district_id": "2007",
  "district_name": "南岸区",
  "spell": "nananqu",
  "easy_spell": "naq",
  "city_id": "234" },

{
  "district_id": "2008",
  "district_name": "北碚区",
  "spell": "beizuoqu",
  "easy_spell": "bzq",
  "city_id": "234" },

{
  "district_id": "2009",
  "district_name": "万盛区",
  "spell": "wanshengqu",
  "easy_spell": "wsq",
  "city_id": "234" },

{
  "district_id": "2010",
  "district_name": "双桥区",
  "spell": "shuangqiaoqu",
  "easy_spell": "sqq",
  "city_id": "234" },

{
  "district_id": "2011",
  "district_name": "渝北区",
  "spell": "yubeiqu",
  "easy_spell": "ybq",
  "city_id": "234" },

{
  "district_id": "2012",
  "district_name": "巴南区",
  "spell": "bananqu",
  "easy_spell": "bnq",
  "city_id": "234" },

{
  "district_id": "2013",
  "district_name": "黔江区",
  "spell": "qianjiangqu",
  "easy_spell": "qjq",
  "city_id": "234" },

{
  "district_id": "2014",
  "district_name": "长寿区",
  "spell": "changshouqu",
  "easy_spell": "csq",
  "city_id": "234" },

{
  "district_id": "2015",
  "district_name": "綦江县",
  "spell": "zuojiangxian",
  "easy_spell": "zjx",
  "city_id": "234" },

{
  "district_id": "2016",
  "district_name": "潼南县",
  "spell": "zuonanxian",
  "easy_spell": "znx",
  "city_id": "234" },

{
  "district_id": "2017",
  "district_name": "铜梁县",
  "spell": "tongliangxian",
  "easy_spell": "tlx",
  "city_id": "234" },

{
  "district_id": "2018",
  "district_name": "大足县",
  "spell": "dazuxian",
  "easy_spell": "dzx",
  "city_id": "234" },

{
  "district_id": "2019",
  "district_name": "荣昌县",
  "spell": "rongchangxian",
  "easy_spell": "rcx",
  "city_id": "234" },

{
  "district_id": "2020",
  "district_name": "璧山县",
  "spell": "zuoshanxian",
  "easy_spell": "zsx",
  "city_id": "234" },

{
  "district_id": "2021",
  "district_name": "梁平县",
  "spell": "liangpingxian",
  "easy_spell": "lpx",
  "city_id": "234" },

{
  "district_id": "2022",
  "district_name": "城口县",
  "spell": "chengkouxian",
  "easy_spell": "ckx",
  "city_id": "234" },

{
  "district_id": "2023",
  "district_name": "丰都县",
  "spell": "fengduxian",
  "easy_spell": "fdx",
  "city_id": "234" },

{
  "district_id": "2024",
  "district_name": "垫江县",
  "spell": "dianjiangxian",
  "easy_spell": "djx",
  "city_id": "234" },

{
  "district_id": "2025",
  "district_name": "武隆县",
  "spell": "wulongxian",
  "easy_spell": "wlx",
  "city_id": "234" },

{
  "district_id": "2026",
  "district_name": "忠县",
  "spell": "zhongxian",
  "easy_spell": "zx",
  "city_id": "234" },

{
  "district_id": "2027",
  "district_name": "开县",
  "spell": "kaixian",
  "easy_spell": "kx",
  "city_id": "234" },

{
  "district_id": "2028",
  "district_name": "云阳县",
  "spell": "yunyangxian",
  "easy_spell": "yyx",
  "city_id": "234" },

{
  "district_id": "2029",
  "district_name": "奉节县",
  "spell": "fengjiexian",
  "easy_spell": "fjx",
  "city_id": "234" },

{
  "district_id": "2030",
  "district_name": "巫山县",
  "spell": "wushanxian",
  "easy_spell": "wsx",
  "city_id": "234" },

{
  "district_id": "2031",
  "district_name": "巫溪县",
  "spell": "wuxixian",
  "easy_spell": "wxx",
  "city_id": "234" },

{
  "district_id": "2032",
  "district_name": "石柱土家族自治县",
  "spell": "shizhutujiazuzizhixian",
  "easy_spell": "sztjzzzx",
  "city_id": "234" },

{
  "district_id": "2033",
  "district_name": "秀山土家族苗族自治县",
  "spell": "xiushantujiazumiaozuzizhixian",
  "easy_spell": "xstjzmzzzx",
  "city_id": "234" },

{
  "district_id": "2034",
  "district_name": "酉阳土家族苗族自治县",
  "spell": "youyangtujiazumiaozuzizhixian",
  "easy_spell": "yytjzmzzzx",
  "city_id": "234" },

{
  "district_id": "2035",
  "district_name": "彭水苗族土家族自治县",
  "spell": "pengshuimiaozutujiazuzizhixian",
  "easy_spell": "psmztjzzzx",
  "city_id": "234" },

{
  "district_id": "2036",
  "district_name": "江津市",
  "spell": "jiangjinshi",
  "easy_spell": "jjs",
  "city_id": "234" },

{
  "district_id": "2037",
  "district_name": "合川市",
  "spell": "hechuanshi",
  "easy_spell": "hcs",
  "city_id": "234" },

{
  "district_id": "2038",
  "district_name": "永川市",
  "spell": "yongchuanshi",
  "easy_spell": "ycs",
  "city_id": "234" },

{
  "district_id": "2039",
  "district_name": "南川市",
  "spell": "nanchuanshi",
  "easy_spell": "ncs",
  "city_id": "234" },

{
  "district_id": "2040",
  "district_name": "锦江区",
  "spell": "jinjiangqu",
  "easy_spell": "jjq",
  "city_id": "235" },

{
  "district_id": "2041",
  "district_name": "青羊区",
  "spell": "qingyangqu",
  "easy_spell": "qyq",
  "city_id": "235" },

{
  "district_id": "2042",
  "district_name": "金牛区",
  "spell": "jinniuqu",
  "easy_spell": "jnq",
  "city_id": "235" },

{
  "district_id": "2043",
  "district_name": "武侯区",
  "spell": "wuhouqu",
  "easy_spell": "whq",
  "city_id": "235" },

{
  "district_id": "2044",
  "district_name": "成华区",
  "spell": "chenghuaqu",
  "easy_spell": "chq",
  "city_id": "235" },

{
  "district_id": "2045",
  "district_name": "龙泉驿区",
  "spell": "longquanzuoqu",
  "easy_spell": "lqzq",
  "city_id": "235" },

{
  "district_id": "2046",
  "district_name": "青白江区",
  "spell": "qingbaijiangqu",
  "easy_spell": "qbjq",
  "city_id": "235" },

{
  "district_id": "2047",
  "district_name": "新都区",
  "spell": "xinduqu",
  "easy_spell": "xdq",
  "city_id": "235" },

{
  "district_id": "2048",
  "district_name": "温江区",
  "spell": "wenjiangqu",
  "easy_spell": "wjq",
  "city_id": "235" },

{
  "district_id": "2049",
  "district_name": "金堂县",
  "spell": "jintangxian",
  "easy_spell": "jtx",
  "city_id": "235" },

{
  "district_id": "2050",
  "district_name": "双流县",
  "spell": "shuangliuxian",
  "easy_spell": "slx",
  "city_id": "235" },

{
  "district_id": "2051",
  "district_name": "郫县",
  "spell": "zuoxian",
  "easy_spell": "zx",
  "city_id": "235" },

{
  "district_id": "2052",
  "district_name": "大邑县",
  "spell": "dayixian",
  "easy_spell": "dyx",
  "city_id": "235" },

{
  "district_id": "2053",
  "district_name": "蒲江县",
  "spell": "pujiangxian",
  "easy_spell": "pjx",
  "city_id": "235" },

{
  "district_id": "2054",
  "district_name": "新津县",
  "spell": "xinjinxian",
  "easy_spell": "xjx",
  "city_id": "235" },

{
  "district_id": "2055",
  "district_name": "都江堰市",
  "spell": "dujiangyanshi",
  "easy_spell": "djys",
  "city_id": "235" },

{
  "district_id": "2056",
  "district_name": "彭州市",
  "spell": "pengzhoushi",
  "easy_spell": "pzs",
  "city_id": "235" },

{
  "district_id": "2057",
  "district_name": "邛崃市",
  "spell": "zuozuoshi",
  "easy_spell": "zzs",
  "city_id": "235" },

{
  "district_id": "2058",
  "district_name": "崇州市",
  "spell": "chongzhoushi",
  "easy_spell": "czs",
  "city_id": "235" },

{
  "district_id": "2059",
  "district_name": "自流井区",
  "spell": "ziliujingqu",
  "easy_spell": "zljq",
  "city_id": "236" },

{
  "district_id": "2060",
  "district_name": "贡井区",
  "spell": "gongjingqu",
  "easy_spell": "gjq",
  "city_id": "236" },

{
  "district_id": "2061",
  "district_name": "大安区",
  "spell": "daanqu",
  "easy_spell": "daq",
  "city_id": "236" },

{
  "district_id": "2062",
  "district_name": "沿滩区",
  "spell": "yantanqu",
  "easy_spell": "ytq",
  "city_id": "236" },

{
  "district_id": "2063",
  "district_name": "荣县",
  "spell": "rongxian",
  "easy_spell": "rx",
  "city_id": "236" },

{
  "district_id": "2064",
  "district_name": "富顺县",
  "spell": "fushunxian",
  "easy_spell": "fsx",
  "city_id": "236" },

{
  "district_id": "2065",
  "district_name": "东区",
  "spell": "dongqu",
  "easy_spell": "dq",
  "city_id": "237" },

{
  "district_id": "2066",
  "district_name": "西区",
  "spell": "xiqu",
  "easy_spell": "xq",
  "city_id": "237" },

{
  "district_id": "2067",
  "district_name": "仁和区",
  "spell": "renhequ",
  "easy_spell": "rhq",
  "city_id": "237" },

{
  "district_id": "2068",
  "district_name": "米易县",
  "spell": "miyixian",
  "easy_spell": "myx",
  "city_id": "237" },

{
  "district_id": "2069",
  "district_name": "盐边县",
  "spell": "yanbianxian",
  "easy_spell": "ybx",
  "city_id": "237" },

{
  "district_id": "2070",
  "district_name": "江阳区",
  "spell": "jiangyangqu",
  "easy_spell": "jyq",
  "city_id": "238" },

{
  "district_id": "2071",
  "district_name": "纳溪区",
  "spell": "naxiqu",
  "easy_spell": "nxq",
  "city_id": "238" },

{
  "district_id": "2072",
  "district_name": "龙马潭区",
  "spell": "longmatanqu",
  "easy_spell": "lmtq",
  "city_id": "238" },

{
  "district_id": "2073",
  "district_name": "泸县",
  "spell": "zuoxian",
  "easy_spell": "zx",
  "city_id": "238" },

{
  "district_id": "2074",
  "district_name": "合江县",
  "spell": "hejiangxian",
  "easy_spell": "hjx",
  "city_id": "238" },

{
  "district_id": "2075",
  "district_name": "叙永县",
  "spell": "xuyongxian",
  "easy_spell": "xyx",
  "city_id": "238" },

{
  "district_id": "2076",
  "district_name": "古蔺县",
  "spell": "guzuoxian",
  "easy_spell": "gzx",
  "city_id": "238" },

{
  "district_id": "2077",
  "district_name": "旌阳区",
  "spell": "zuoyangqu",
  "easy_spell": "zyq",
  "city_id": "239" },

{
  "district_id": "2078",
  "district_name": "中江县",
  "spell": "zhongjiangxian",
  "easy_spell": "zjx",
  "city_id": "239" },

{
  "district_id": "2079",
  "district_name": "罗江县",
  "spell": "luojiangxian",
  "easy_spell": "ljx",
  "city_id": "239" },

{
  "district_id": "2080",
  "district_name": "广汉市",
  "spell": "guanghanshi",
  "easy_spell": "ghs",
  "city_id": "239" },

{
  "district_id": "2081",
  "district_name": "什邡市",
  "spell": "shizuoshi",
  "easy_spell": "szs",
  "city_id": "239" },

{
  "district_id": "2082",
  "district_name": "绵竹市",
  "spell": "mianzhushi",
  "easy_spell": "mzs",
  "city_id": "239" },

{
  "district_id": "2083",
  "district_name": "涪城区",
  "spell": "fuchengqu",
  "easy_spell": "fcq",
  "city_id": "240" },

{
  "district_id": "2084",
  "district_name": "游仙区",
  "spell": "youxianqu",
  "easy_spell": "yxq",
  "city_id": "240" },

{
  "district_id": "2085",
  "district_name": "三台县",
  "spell": "santaixian",
  "easy_spell": "stx",
  "city_id": "240" },

{
  "district_id": "2086",
  "district_name": "盐亭县",
  "spell": "yantingxian",
  "easy_spell": "ytx",
  "city_id": "240" },

{
  "district_id": "2087",
  "district_name": "安县",
  "spell": "anxian",
  "easy_spell": "ax",
  "city_id": "240" },

{
  "district_id": "2088",
  "district_name": "梓潼县",
  "spell": "zuozuoxian",
  "easy_spell": "zzx",
  "city_id": "240" },

{
  "district_id": "2089",
  "district_name": "北川羌族自治县",
  "spell": "beichuanqiangzuzizhixian",
  "easy_spell": "bcqzzzx",
  "city_id": "240" },

{
  "district_id": "2090",
  "district_name": "平武县",
  "spell": "pingwuxian",
  "easy_spell": "pwx",
  "city_id": "240" },

{
  "district_id": "2091",
  "district_name": "江油市",
  "spell": "jiangyoushi",
  "easy_spell": "jys",
  "city_id": "240" },

{
  "district_id": "2092",
  "district_name": "市中区",
  "spell": "shizhongqu",
  "easy_spell": "szq",
  "city_id": "241" },

{
  "district_id": "2093",
  "district_name": "元坝区",
  "spell": "yuanbaqu",
  "easy_spell": "ybq",
  "city_id": "241" },

{
  "district_id": "2094",
  "district_name": "朝天区",
  "spell": "chaotianqu",
  "easy_spell": "ctq",
  "city_id": "241" },

{
  "district_id": "2095",
  "district_name": "旺苍县",
  "spell": "wangcangxian",
  "easy_spell": "wcx",
  "city_id": "241" },

{
  "district_id": "2096",
  "district_name": "青川县",
  "spell": "qingchuanxian",
  "easy_spell": "qcx",
  "city_id": "241" },

{
  "district_id": "2097",
  "district_name": "剑阁县",
  "spell": "jiangexian",
  "easy_spell": "jgx",
  "city_id": "241" },

{
  "district_id": "2098",
  "district_name": "苍溪县",
  "spell": "cangxixian",
  "easy_spell": "cxx",
  "city_id": "241" },

{
  "district_id": "2099",
  "district_name": "船山区",
  "spell": "chuanshanqu",
  "easy_spell": "csq",
  "city_id": "242" },

{
  "district_id": "2100",
  "district_name": "安居区",
  "spell": "anjuqu",
  "easy_spell": "ajq",
  "city_id": "242" },

{
  "district_id": "2101",
  "district_name": "蓬溪县",
  "spell": "pengxixian",
  "easy_spell": "pxx",
  "city_id": "242" },

{
  "district_id": "2102",
  "district_name": "射洪县",
  "spell": "shehongxian",
  "easy_spell": "shx",
  "city_id": "242" },

{
  "district_id": "2103",
  "district_name": "大英县",
  "spell": "dayingxian",
  "easy_spell": "dyx",
  "city_id": "242" },

{
  "district_id": "2104",
  "district_name": "市中区",
  "spell": "shizhongqu",
  "easy_spell": "szq",
  "city_id": "243" },

{
  "district_id": "2105",
  "district_name": "东兴区",
  "spell": "dongxingqu",
  "easy_spell": "dxq",
  "city_id": "243" },

{
  "district_id": "2106",
  "district_name": "威远县",
  "spell": "weiyuanxian",
  "easy_spell": "wyx",
  "city_id": "243" },

{
  "district_id": "2107",
  "district_name": "资中县",
  "spell": "zizhongxian",
  "easy_spell": "zzx",
  "city_id": "243" },

{
  "district_id": "2108",
  "district_name": "隆昌县",
  "spell": "longchangxian",
  "easy_spell": "lcx",
  "city_id": "243" },

{
  "district_id": "2109",
  "district_name": "市中区",
  "spell": "shizhongqu",
  "easy_spell": "szq",
  "city_id": "244" },

{
  "district_id": "2110",
  "district_name": "沙湾区",
  "spell": "shawanqu",
  "easy_spell": "swq",
  "city_id": "244" },

{
  "district_id": "2111",
  "district_name": "五通桥区",
  "spell": "wutongqiaoqu",
  "easy_spell": "wtqq",
  "city_id": "244" },

{
  "district_id": "2112",
  "district_name": "金口河区",
  "spell": "jinkouhequ",
  "easy_spell": "jkhq",
  "city_id": "244" },

{
  "district_id": "2113",
  "district_name": "犍为县",
  "spell": "zuoweixian",
  "easy_spell": "zwx",
  "city_id": "244" },

{
  "district_id": "2114",
  "district_name": "井研县",
  "spell": "jingyanxian",
  "easy_spell": "jyx",
  "city_id": "244" },

{
  "district_id": "2115",
  "district_name": "夹江县",
  "spell": "jiajiangxian",
  "easy_spell": "jjx",
  "city_id": "244" },

{
  "district_id": "2116",
  "district_name": "沐川县",
  "spell": "zuochuanxian",
  "easy_spell": "zcx",
  "city_id": "244" },

{
  "district_id": "2117",
  "district_name": "峨边彝族自治县",
  "spell": "ebianyizuzizhixian",
  "easy_spell": "ebyzzzx",
  "city_id": "244" },

{
  "district_id": "2118",
  "district_name": "马边彝族自治县",
  "spell": "mabianyizuzizhixian",
  "easy_spell": "mbyzzzx",
  "city_id": "244" },

{
  "district_id": "2119",
  "district_name": "峨眉山市",
  "spell": "emeishanshi",
  "easy_spell": "emss",
  "city_id": "244" },

{
  "district_id": "2120",
  "district_name": "顺庆区",
  "spell": "shunqingqu",
  "easy_spell": "sqq",
  "city_id": "245" },

{
  "district_id": "2121",
  "district_name": "高坪区",
  "spell": "gaopingqu",
  "easy_spell": "gpq",
  "city_id": "245" },

{
  "district_id": "2122",
  "district_name": "嘉陵区",
  "spell": "jialingqu",
  "easy_spell": "jlq",
  "city_id": "245" },

{
  "district_id": "2123",
  "district_name": "南部县",
  "spell": "nanbuxian",
  "easy_spell": "nbx",
  "city_id": "245" },

{
  "district_id": "2124",
  "district_name": "营山县",
  "spell": "yingshanxian",
  "easy_spell": "ysx",
  "city_id": "245" },

{
  "district_id": "2125",
  "district_name": "蓬安县",
  "spell": "penganxian",
  "easy_spell": "pax",
  "city_id": "245" },

{
  "district_id": "2126",
  "district_name": "仪陇县",
  "spell": "yilongxian",
  "easy_spell": "ylx",
  "city_id": "245" },

{
  "district_id": "2127",
  "district_name": "西充县",
  "spell": "xichongxian",
  "easy_spell": "xcx",
  "city_id": "245" },

{
  "district_id": "2128",
  "district_name": "阆中市",
  "spell": "zuozhongshi",
  "easy_spell": "zzs",
  "city_id": "245" },

{
  "district_id": "2129",
  "district_name": "东坡区",
  "spell": "dongpoqu",
  "easy_spell": "dpq",
  "city_id": "246" },

{
  "district_id": "2130",
  "district_name": "仁寿县",
  "spell": "renshouxian",
  "easy_spell": "rsx",
  "city_id": "246" },

{
  "district_id": "2131",
  "district_name": "彭山县",
  "spell": "pengshanxian",
  "easy_spell": "psx",
  "city_id": "246" },

{
  "district_id": "2132",
  "district_name": "洪雅县",
  "spell": "hongyaxian",
  "easy_spell": "hyx",
  "city_id": "246" },

{
  "district_id": "2133",
  "district_name": "丹棱县",
  "spell": "danlengxian",
  "easy_spell": "dlx",
  "city_id": "246" },

{
  "district_id": "2134",
  "district_name": "青神县",
  "spell": "qingshenxian",
  "easy_spell": "qsx",
  "city_id": "246" },

{
  "district_id": "2135",
  "district_name": "翠屏区",
  "spell": "cuipingqu",
  "easy_spell": "cpq",
  "city_id": "247" },

{
  "district_id": "2136",
  "district_name": "宜宾县",
  "spell": "yibinxian",
  "easy_spell": "ybx",
  "city_id": "247" },

{
  "district_id": "2137",
  "district_name": "南溪县",
  "spell": "nanxixian",
  "easy_spell": "nxx",
  "city_id": "247" },

{
  "district_id": "2138",
  "district_name": "江安县",
  "spell": "jianganxian",
  "easy_spell": "jax",
  "city_id": "247" },

{
  "district_id": "2139",
  "district_name": "长宁县",
  "spell": "changningxian",
  "easy_spell": "cnx",
  "city_id": "247" },

{
  "district_id": "2140",
  "district_name": "高县",
  "spell": "gaoxian",
  "easy_spell": "gx",
  "city_id": "247" },

{
  "district_id": "2141",
  "district_name": "珙县",
  "spell": "zuoxian",
  "easy_spell": "zx",
  "city_id": "247" },

{
  "district_id": "2142",
  "district_name": "筠连县",
  "spell": "zuolianxian",
  "easy_spell": "zlx",
  "city_id": "247" },

{
  "district_id": "2143",
  "district_name": "兴文县",
  "spell": "xingwenxian",
  "easy_spell": "xwx",
  "city_id": "247" },

{
  "district_id": "2144",
  "district_name": "屏山县",
  "spell": "pingshanxian",
  "easy_spell": "psx",
  "city_id": "247" },

{
  "district_id": "2145",
  "district_name": "广安区",
  "spell": "guanganqu",
  "easy_spell": "gaq",
  "city_id": "248" },

{
  "district_id": "2146",
  "district_name": "岳池县",
  "spell": "yuechixian",
  "easy_spell": "ycx",
  "city_id": "248" },

{
  "district_id": "2147",
  "district_name": "武胜县",
  "spell": "wushengxian",
  "easy_spell": "wsx",
  "city_id": "248" },

{
  "district_id": "2148",
  "district_name": "邻水县",
  "spell": "linshuixian",
  "easy_spell": "lsx",
  "city_id": "248" },

{
  "district_id": "2149",
  "district_name": "华蓥市",
  "spell": "huazuoshi",
  "easy_spell": "hzs",
  "city_id": "248" },

{
  "district_id": "2150",
  "district_name": "通川区",
  "spell": "tongchuanqu",
  "easy_spell": "tcq",
  "city_id": "249" },

{
  "district_id": "2151",
  "district_name": "达县",
  "spell": "daxian",
  "easy_spell": "dx",
  "city_id": "249" },

{
  "district_id": "2152",
  "district_name": "宣汉县",
  "spell": "xuanhanxian",
  "easy_spell": "xhx",
  "city_id": "249" },

{
  "district_id": "2153",
  "district_name": "开江县",
  "spell": "kaijiangxian",
  "easy_spell": "kjx",
  "city_id": "249" },

{
  "district_id": "2154",
  "district_name": "大竹县",
  "spell": "dazhuxian",
  "easy_spell": "dzx",
  "city_id": "249" },

{
  "district_id": "2155",
  "district_name": "渠县",
  "spell": "quxian",
  "easy_spell": "qx",
  "city_id": "249" },

{
  "district_id": "2156",
  "district_name": "万源市",
  "spell": "wanyuanshi",
  "easy_spell": "wys",
  "city_id": "249" },

{
  "district_id": "2157",
  "district_name": "雨城区",
  "spell": "yuchengqu",
  "easy_spell": "ycq",
  "city_id": "250" },

{
  "district_id": "2158",
  "district_name": "名山县",
  "spell": "mingshanxian",
  "easy_spell": "msx",
  "city_id": "250" },

{
  "district_id": "2159",
  "district_name": "荥经县",
  "spell": "zuojingxian",
  "easy_spell": "zjx",
  "city_id": "250" },

{
  "district_id": "2160",
  "district_name": "汉源县",
  "spell": "hanyuanxian",
  "easy_spell": "hyx",
  "city_id": "250" },

{
  "district_id": "2161",
  "district_name": "石棉县",
  "spell": "shimianxian",
  "easy_spell": "smx",
  "city_id": "250" },

{
  "district_id": "2162",
  "district_name": "天全县",
  "spell": "tianquanxian",
  "easy_spell": "tqx",
  "city_id": "250" },

{
  "district_id": "2163",
  "district_name": "芦山县",
  "spell": "lushanxian",
  "easy_spell": "lsx",
  "city_id": "250" },

{
  "district_id": "2164",
  "district_name": "宝兴县",
  "spell": "baoxingxian",
  "easy_spell": "bxx",
  "city_id": "250" },

{
  "district_id": "2165",
  "district_name": "巴州区",
  "spell": "bazhouqu",
  "easy_spell": "bzq",
  "city_id": "251" },

{
  "district_id": "2166",
  "district_name": "通江县",
  "spell": "tongjiangxian",
  "easy_spell": "tjx",
  "city_id": "251" },

{
  "district_id": "2167",
  "district_name": "南江县",
  "spell": "nanjiangxian",
  "easy_spell": "njx",
  "city_id": "251" },

{
  "district_id": "2168",
  "district_name": "平昌县",
  "spell": "pingchangxian",
  "easy_spell": "pcx",
  "city_id": "251" },

{
  "district_id": "2169",
  "district_name": "雁江区",
  "spell": "yanjiangqu",
  "easy_spell": "yjq",
  "city_id": "252" },

{
  "district_id": "2170",
  "district_name": "安岳县",
  "spell": "anyuexian",
  "easy_spell": "ayx",
  "city_id": "252" },

{
  "district_id": "2171",
  "district_name": "乐至县",
  "spell": "lezhixian",
  "easy_spell": "lzx",
  "city_id": "252" },

{
  "district_id": "2172",
  "district_name": "简阳市",
  "spell": "jianyangshi",
  "easy_spell": "jys",
  "city_id": "252" },

{
  "district_id": "2173",
  "district_name": "汶川县",
  "spell": "zuochuanxian",
  "easy_spell": "zcx",
  "city_id": "253" },

{
  "district_id": "2174",
  "district_name": "理县",
  "spell": "lixian",
  "easy_spell": "lx",
  "city_id": "253" },

{
  "district_id": "2175",
  "district_name": "茂县",
  "spell": "maoxian",
  "easy_spell": "mx",
  "city_id": "253" },

{
  "district_id": "2176",
  "district_name": "松潘县",
  "spell": "songpanxian",
  "easy_spell": "spx",
  "city_id": "253" },

{
  "district_id": "2177",
  "district_name": "九寨沟县",
  "spell": "jiuzhaigouxian",
  "easy_spell": "jzgx",
  "city_id": "253" },

{
  "district_id": "2178",
  "district_name": "金川县",
  "spell": "jinchuanxian",
  "easy_spell": "jcx",
  "city_id": "253" },

{
  "district_id": "2179",
  "district_name": "小金县",
  "spell": "xiaojinxian",
  "easy_spell": "xjx",
  "city_id": "253" },

{
  "district_id": "2180",
  "district_name": "黑水县",
  "spell": "heishuixian",
  "easy_spell": "hsx",
  "city_id": "253" },

{
  "district_id": "2181",
  "district_name": "马尔康县",
  "spell": "maerkangxian",
  "easy_spell": "mekx",
  "city_id": "253" },

{
  "district_id": "2182",
  "district_name": "壤塘县",
  "spell": "rangtangxian",
  "easy_spell": "rtx",
  "city_id": "253" },

{
  "district_id": "2183",
  "district_name": "阿坝县",
  "spell": "abaxian",
  "easy_spell": "abx",
  "city_id": "253" },

{
  "district_id": "2184",
  "district_name": "若尔盖县",
  "spell": "ruoergaixian",
  "easy_spell": "regx",
  "city_id": "253" },

{
  "district_id": "2185",
  "district_name": "红原县",
  "spell": "hongyuanxian",
  "easy_spell": "hyx",
  "city_id": "253" },

{
  "district_id": "2186",
  "district_name": "康定县",
  "spell": "kangdingxian",
  "easy_spell": "kdx",
  "city_id": "254" },

{
  "district_id": "2187",
  "district_name": "泸定县",
  "spell": "zuodingxian",
  "easy_spell": "zdx",
  "city_id": "254" },

{
  "district_id": "2188",
  "district_name": "丹巴县",
  "spell": "danbaxian",
  "easy_spell": "dbx",
  "city_id": "254" },

{
  "district_id": "2189",
  "district_name": "九龙县",
  "spell": "jiulongxian",
  "easy_spell": "jlx",
  "city_id": "254" },

{
  "district_id": "2190",
  "district_name": "雅江县",
  "spell": "yajiangxian",
  "easy_spell": "yjx",
  "city_id": "254" },

{
  "district_id": "2191",
  "district_name": "道孚县",
  "spell": "daozuoxian",
  "easy_spell": "dzx",
  "city_id": "254" },

{
  "district_id": "2192",
  "district_name": "炉霍县",
  "spell": "luhuoxian",
  "easy_spell": "lhx",
  "city_id": "254" },

{
  "district_id": "2193",
  "district_name": "甘孜县",
  "spell": "ganzixian",
  "easy_spell": "gzx",
  "city_id": "254" },

{
  "district_id": "2194",
  "district_name": "新龙县",
  "spell": "xinlongxian",
  "easy_spell": "xlx",
  "city_id": "254" },

{
  "district_id": "2195",
  "district_name": "德格县",
  "spell": "degexian",
  "easy_spell": "dgx",
  "city_id": "254" },

{
  "district_id": "2196",
  "district_name": "白玉县",
  "spell": "baiyuxian",
  "easy_spell": "byx",
  "city_id": "254" },

{
  "district_id": "2197",
  "district_name": "石渠县",
  "spell": "shiquxian",
  "easy_spell": "sqx",
  "city_id": "254" },

{
  "district_id": "2198",
  "district_name": "色达县",
  "spell": "sedaxian",
  "easy_spell": "sdx",
  "city_id": "254" },

{
  "district_id": "2199",
  "district_name": "理塘县",
  "spell": "litangxian",
  "easy_spell": "ltx",
  "city_id": "254" },

{
  "district_id": "2200",
  "district_name": "巴塘县",
  "spell": "batangxian",
  "easy_spell": "btx",
  "city_id": "254" },

{
  "district_id": "2201",
  "district_name": "乡城县",
  "spell": "xiangchengxian",
  "easy_spell": "xcx",
  "city_id": "254" },

{
  "district_id": "2202",
  "district_name": "稻城县",
  "spell": "daochengxian",
  "easy_spell": "dcx",
  "city_id": "254" },

{
  "district_id": "2203",
  "district_name": "得荣县",
  "spell": "derongxian",
  "easy_spell": "drx",
  "city_id": "254" },

{
  "district_id": "2204",
  "district_name": "西昌市",
  "spell": "xichangshi",
  "easy_spell": "xcs",
  "city_id": "255" },

{
  "district_id": "2205",
  "district_name": "木里藏族自治县",
  "spell": "mulicangzuzizhixian",
  "easy_spell": "mlczzzx",
  "city_id": "255" },

{
  "district_id": "2206",
  "district_name": "盐源县",
  "spell": "yanyuanxian",
  "easy_spell": "yyx",
  "city_id": "255" },

{
  "district_id": "2207",
  "district_name": "德昌县",
  "spell": "dechangxian",
  "easy_spell": "dcx",
  "city_id": "255" },

{
  "district_id": "2208",
  "district_name": "会理县",
  "spell": "huilixian",
  "easy_spell": "hlx",
  "city_id": "255" },

{
  "district_id": "2209",
  "district_name": "会东县",
  "spell": "huidongxian",
  "easy_spell": "hdx",
  "city_id": "255" },

{
  "district_id": "2210",
  "district_name": "宁南县",
  "spell": "ningnanxian",
  "easy_spell": "nnx",
  "city_id": "255" },

{
  "district_id": "2211",
  "district_name": "普格县",
  "spell": "pugexian",
  "easy_spell": "pgx",
  "city_id": "255" },

{
  "district_id": "2212",
  "district_name": "布拖县",
  "spell": "butuoxian",
  "easy_spell": "btx",
  "city_id": "255" },

{
  "district_id": "2213",
  "district_name": "金阳县",
  "spell": "jinyangxian",
  "easy_spell": "jyx",
  "city_id": "255" },

{
  "district_id": "2214",
  "district_name": "昭觉县",
  "spell": "zhaojuexian",
  "easy_spell": "zjx",
  "city_id": "255" },

{
  "district_id": "2215",
  "district_name": "喜德县",
  "spell": "xidexian",
  "easy_spell": "xdx",
  "city_id": "255" },

{
  "district_id": "2216",
  "district_name": "冕宁县",
  "spell": "mianningxian",
  "easy_spell": "mnx",
  "city_id": "255" },

{
  "district_id": "2217",
  "district_name": "越西县",
  "spell": "yuexixian",
  "easy_spell": "yxx",
  "city_id": "255" },

{
  "district_id": "2218",
  "district_name": "甘洛县",
  "spell": "ganluoxian",
  "easy_spell": "glx",
  "city_id": "255" },

{
  "district_id": "2219",
  "district_name": "美姑县",
  "spell": "meiguxian",
  "easy_spell": "mgx",
  "city_id": "255" },

{
  "district_id": "2220",
  "district_name": "雷波县",
  "spell": "leiboxian",
  "easy_spell": "lbx",
  "city_id": "255" },

{
  "district_id": "2221",
  "district_name": "南明区",
  "spell": "nanmingqu",
  "easy_spell": "nmq",
  "city_id": "256" },

{
  "district_id": "2222",
  "district_name": "云岩区",
  "spell": "yunyanqu",
  "easy_spell": "yyq",
  "city_id": "256" },

{
  "district_id": "2223",
  "district_name": "花溪区",
  "spell": "huaxiqu",
  "easy_spell": "hxq",
  "city_id": "256" },

{
  "district_id": "2224",
  "district_name": "乌当区",
  "spell": "wudangqu",
  "easy_spell": "wdq",
  "city_id": "256" },

{
  "district_id": "2225",
  "district_name": "白云区",
  "spell": "baiyunqu",
  "easy_spell": "byq",
  "city_id": "256" },

{
  "district_id": "2226",
  "district_name": "小河区",
  "spell": "xiaohequ",
  "easy_spell": "xhq",
  "city_id": "256" },

{
  "district_id": "2227",
  "district_name": "开阳县",
  "spell": "kaiyangxian",
  "easy_spell": "kyx",
  "city_id": "256" },

{
  "district_id": "2228",
  "district_name": "息烽县",
  "spell": "xifengxian",
  "easy_spell": "xfx",
  "city_id": "256" },

{
  "district_id": "2229",
  "district_name": "修文县",
  "spell": "xiuwenxian",
  "easy_spell": "xwx",
  "city_id": "256" },

{
  "district_id": "2230",
  "district_name": "清镇市",
  "spell": "qingzhenshi",
  "easy_spell": "qzs",
  "city_id": "256" },

{
  "district_id": "2231",
  "district_name": "钟山区",
  "spell": "zhongshanqu",
  "easy_spell": "zsq",
  "city_id": "257" },

{
  "district_id": "2232",
  "district_name": "六枝特区",
  "spell": "liuzhitequ",
  "easy_spell": "lztq",
  "city_id": "257" },

{
  "district_id": "2233",
  "district_name": "水城县",
  "spell": "shuichengxian",
  "easy_spell": "scx",
  "city_id": "257" },

{
  "district_id": "2234",
  "district_name": "盘县",
  "spell": "panxian",
  "easy_spell": "px",
  "city_id": "257" },

{
  "district_id": "2235",
  "district_name": "红花岗区",
  "spell": "honghuagangqu",
  "easy_spell": "hhgq",
  "city_id": "258" },

{
  "district_id": "2236",
  "district_name": "汇川区",
  "spell": "huichuanqu",
  "easy_spell": "hcq",
  "city_id": "258" },

{
  "district_id": "2237",
  "district_name": "遵义县",
  "spell": "zunyixian",
  "easy_spell": "zyx",
  "city_id": "258" },

{
  "district_id": "2238",
  "district_name": "桐梓县",
  "spell": "tongzuoxian",
  "easy_spell": "tzx",
  "city_id": "258" },

{
  "district_id": "2239",
  "district_name": "绥阳县",
  "spell": "suiyangxian",
  "easy_spell": "syx",
  "city_id": "258" },

{
  "district_id": "2240",
  "district_name": "正安县",
  "spell": "zhenganxian",
  "easy_spell": "zax",
  "city_id": "258" },

{
  "district_id": "2241",
  "district_name": "道真仡佬族苗族自治县",
  "spell": "daozhenzuolaozumiaozuzizhixian",
  "easy_spell": "dzzlzmzzzx",
  "city_id": "258" },

{
  "district_id": "2242",
  "district_name": "务川仡佬族苗族自治县",
  "spell": "wuchuanzuolaozumiaozuzizhixian",
  "easy_spell": "wczlzmzzzx",
  "city_id": "258" },

{
  "district_id": "2243",
  "district_name": "凤冈县",
  "spell": "fenggangxian",
  "easy_spell": "fgx",
  "city_id": "258" },

{
  "district_id": "2244",
  "district_name": "湄潭县",
  "spell": "zuotanxian",
  "easy_spell": "ztx",
  "city_id": "258" },

{
  "district_id": "2245",
  "district_name": "余庆县",
  "spell": "yuqingxian",
  "easy_spell": "yqx",
  "city_id": "258" },

{
  "district_id": "2246",
  "district_name": "习水县",
  "spell": "xishuixian",
  "easy_spell": "xsx",
  "city_id": "258" },

{
  "district_id": "2247",
  "district_name": "赤水市",
  "spell": "chishuishi",
  "easy_spell": "css",
  "city_id": "258" },

{
  "district_id": "2248",
  "district_name": "仁怀市",
  "spell": "renhuaishi",
  "easy_spell": "rhs",
  "city_id": "258" },

{
  "district_id": "2249",
  "district_name": "西秀区",
  "spell": "xixiuqu",
  "easy_spell": "xxq",
  "city_id": "259" },

{
  "district_id": "2250",
  "district_name": "平坝县",
  "spell": "pingbaxian",
  "easy_spell": "pbx",
  "city_id": "259" },

{
  "district_id": "2251",
  "district_name": "普定县",
  "spell": "pudingxian",
  "easy_spell": "pdx",
  "city_id": "259" },

{
  "district_id": "2252",
  "district_name": "镇宁布依族苗族自治县",
  "spell": "zhenningbuyizumiaozuzizhixian",
  "easy_spell": "znbyzmzzzx",
  "city_id": "259" },

{
  "district_id": "2253",
  "district_name": "关岭布依族苗族自治县",
  "spell": "guanlingbuyizumiaozuzizhixian",
  "easy_spell": "glbyzmzzzx",
  "city_id": "259" },

{
  "district_id": "2254",
  "district_name": "紫云苗族布依族自治县",
  "spell": "ziyunmiaozubuyizuzizhixian",
  "easy_spell": "zymzbyzzzx",
  "city_id": "259" },

{
  "district_id": "2255",
  "district_name": "铜仁市",
  "spell": "tongrenshi",
  "easy_spell": "trs",
  "city_id": "260" },

{
  "district_id": "2256",
  "district_name": "江口县",
  "spell": "jiangkouxian",
  "easy_spell": "jkx",
  "city_id": "260" },

{
  "district_id": "2257",
  "district_name": "玉屏侗族自治县",
  "spell": "yupingdongzuzizhixian",
  "easy_spell": "ypdzzzx",
  "city_id": "260" },

{
  "district_id": "2258",
  "district_name": "石阡县",
  "spell": "shizuoxian",
  "easy_spell": "szx",
  "city_id": "260" },

{
  "district_id": "2259",
  "district_name": "思南县",
  "spell": "sinanxian",
  "easy_spell": "snx",
  "city_id": "260" },

{
  "district_id": "2260",
  "district_name": "印江土家族苗族自治县",
  "spell": "yinjiangtujiazumiaozuzizhixian",
  "easy_spell": "yjtjzmzzzx",
  "city_id": "260" },

{
  "district_id": "2261",
  "district_name": "德江县",
  "spell": "dejiangxian",
  "easy_spell": "djx",
  "city_id": "260" },

{
  "district_id": "2262",
  "district_name": "沿河土家族自治县",
  "spell": "yanhetujiazuzizhixian",
  "easy_spell": "yhtjzzzx",
  "city_id": "260" },

{
  "district_id": "2263",
  "district_name": "松桃苗族自治县",
  "spell": "songtaomiaozuzizhixian",
  "easy_spell": "stmzzzx",
  "city_id": "260" },

{
  "district_id": "2264",
  "district_name": "万山特区",
  "spell": "wanshantequ",
  "easy_spell": "wstq",
  "city_id": "260" },

{
  "district_id": "2265",
  "district_name": "兴义市",
  "spell": "xingyishi",
  "easy_spell": "xys",
  "city_id": "261" },

{
  "district_id": "2266",
  "district_name": "兴仁县",
  "spell": "xingrenxian",
  "easy_spell": "xrx",
  "city_id": "261" },

{
  "district_id": "2267",
  "district_name": "普安县",
  "spell": "puanxian",
  "easy_spell": "pax",
  "city_id": "261" },

{
  "district_id": "2268",
  "district_name": "晴隆县",
  "spell": "qinglongxian",
  "easy_spell": "qlx",
  "city_id": "261" },

{
  "district_id": "2269",
  "district_name": "贞丰县",
  "spell": "zhenfengxian",
  "easy_spell": "zfx",
  "city_id": "261" },

{
  "district_id": "2270",
  "district_name": "望谟县",
  "spell": "wangzuoxian",
  "easy_spell": "wzx",
  "city_id": "261" },

{
  "district_id": "2271",
  "district_name": "册亨县",
  "spell": "cehengxian",
  "easy_spell": "chx",
  "city_id": "261" },

{
  "district_id": "2272",
  "district_name": "安龙县",
  "spell": "anlongxian",
  "easy_spell": "alx",
  "city_id": "261" },

{
  "district_id": "2273",
  "district_name": "毕节市",
  "spell": "bijieshi",
  "easy_spell": "bjs",
  "city_id": "262" },

{
  "district_id": "2274",
  "district_name": "大方县",
  "spell": "dafangxian",
  "easy_spell": "dfx",
  "city_id": "262" },

{
  "district_id": "2275",
  "district_name": "黔西县",
  "spell": "qianxixian",
  "easy_spell": "qxx",
  "city_id": "262" },

{
  "district_id": "2276",
  "district_name": "金沙县",
  "spell": "jinshaxian",
  "easy_spell": "jsx",
  "city_id": "262" },

{
  "district_id": "2277",
  "district_name": "织金县",
  "spell": "zhijinxian",
  "easy_spell": "zjx",
  "city_id": "262" },

{
  "district_id": "2278",
  "district_name": "纳雍县",
  "spell": "nayongxian",
  "easy_spell": "nyx",
  "city_id": "262" },

{
  "district_id": "2279",
  "district_name": "威宁彝族回族苗族自治县",
  "spell": "weiningyizuhuizumiaozuzizhixian",
  "easy_spell": "wnyzhzmzzzx",
  "city_id": "262" },

{
  "district_id": "2280",
  "district_name": "赫章县",
  "spell": "hezhangxian",
  "easy_spell": "hzx",
  "city_id": "262" },

{
  "district_id": "2281",
  "district_name": "凯里市",
  "spell": "kailishi",
  "easy_spell": "kls",
  "city_id": "263" },

{
  "district_id": "2282",
  "district_name": "黄平县",
  "spell": "huangpingxian",
  "easy_spell": "hpx",
  "city_id": "263" },

{
  "district_id": "2283",
  "district_name": "施秉县",
  "spell": "shibingxian",
  "easy_spell": "sbx",
  "city_id": "263" },

{
  "district_id": "2284",
  "district_name": "三穗县",
  "spell": "sansuixian",
  "easy_spell": "ssx",
  "city_id": "263" },

{
  "district_id": "2285",
  "district_name": "镇远县",
  "spell": "zhenyuanxian",
  "easy_spell": "zyx",
  "city_id": "263" },

{
  "district_id": "2286",
  "district_name": "岑巩县",
  "spell": "zuogongxian",
  "easy_spell": "zgx",
  "city_id": "263" },

{
  "district_id": "2287",
  "district_name": "天柱县",
  "spell": "tianzhuxian",
  "easy_spell": "tzx",
  "city_id": "263" },

{
  "district_id": "2288",
  "district_name": "锦屏县",
  "spell": "jinpingxian",
  "easy_spell": "jpx",
  "city_id": "263" },

{
  "district_id": "2289",
  "district_name": "剑河县",
  "spell": "jianhexian",
  "easy_spell": "jhx",
  "city_id": "263" },

{
  "district_id": "2290",
  "district_name": "台江县",
  "spell": "taijiangxian",
  "easy_spell": "tjx",
  "city_id": "263" },

{
  "district_id": "2291",
  "district_name": "黎平县",
  "spell": "lipingxian",
  "easy_spell": "lpx",
  "city_id": "263" },

{
  "district_id": "2292",
  "district_name": "榕江县",
  "spell": "zuojiangxian",
  "easy_spell": "zjx",
  "city_id": "263" },

{
  "district_id": "2293",
  "district_name": "从江县",
  "spell": "congjiangxian",
  "easy_spell": "cjx",
  "city_id": "263" },

{
  "district_id": "2294",
  "district_name": "雷山县",
  "spell": "leishanxian",
  "easy_spell": "lsx",
  "city_id": "263" },

{
  "district_id": "2295",
  "district_name": "麻江县",
  "spell": "majiangxian",
  "easy_spell": "mjx",
  "city_id": "263" },

{
  "district_id": "2296",
  "district_name": "丹寨县",
  "spell": "danzhaixian",
  "easy_spell": "dzx",
  "city_id": "263" },

{
  "district_id": "2297",
  "district_name": "都匀市",
  "spell": "duyunshi",
  "easy_spell": "dys",
  "city_id": "264" },

{
  "district_id": "2298",
  "district_name": "福泉市",
  "spell": "fuquanshi",
  "easy_spell": "fqs",
  "city_id": "264" },

{
  "district_id": "2299",
  "district_name": "荔波县",
  "spell": "liboxian",
  "easy_spell": "lbx",
  "city_id": "264" },

{
  "district_id": "2300",
  "district_name": "贵定县",
  "spell": "guidingxian",
  "easy_spell": "gdx",
  "city_id": "264" },

{
  "district_id": "2301",
  "district_name": "瓮安县",
  "spell": "wenganxian",
  "easy_spell": "wax",
  "city_id": "264" },

{
  "district_id": "2302",
  "district_name": "独山县",
  "spell": "dushanxian",
  "easy_spell": "dsx",
  "city_id": "264" },

{
  "district_id": "2303",
  "district_name": "平塘县",
  "spell": "pingtangxian",
  "easy_spell": "ptx",
  "city_id": "264" },

{
  "district_id": "2304",
  "district_name": "罗甸县",
  "spell": "luodianxian",
  "easy_spell": "ldx",
  "city_id": "264" },

{
  "district_id": "2305",
  "district_name": "长顺县",
  "spell": "changshunxian",
  "easy_spell": "csx",
  "city_id": "264" },

{
  "district_id": "2306",
  "district_name": "龙里县",
  "spell": "longlixian",
  "easy_spell": "llx",
  "city_id": "264" },

{
  "district_id": "2307",
  "district_name": "惠水县",
  "spell": "huishuixian",
  "easy_spell": "hsx",
  "city_id": "264" },

{
  "district_id": "2308",
  "district_name": "三都水族自治县",
  "spell": "sandushuizuzizhixian",
  "easy_spell": "sdszzzx",
  "city_id": "264" },

{
  "district_id": "2309",
  "district_name": "五华区",
  "spell": "wuhuaqu",
  "easy_spell": "whq",
  "city_id": "265" },

{
  "district_id": "2310",
  "district_name": "盘龙区",
  "spell": "panlongqu",
  "easy_spell": "plq",
  "city_id": "265" },

{
  "district_id": "2311",
  "district_name": "官渡区",
  "spell": "guanduqu",
  "easy_spell": "gdq",
  "city_id": "265" },

{
  "district_id": "2312",
  "district_name": "西山区",
  "spell": "xishanqu",
  "easy_spell": "xsq",
  "city_id": "265" },

{
  "district_id": "2313",
  "district_name": "东川区",
  "spell": "dongchuanqu",
  "easy_spell": "dcq",
  "city_id": "265" },

{
  "district_id": "2314",
  "district_name": "呈贡县",
  "spell": "chenggongxian",
  "easy_spell": "cgx",
  "city_id": "265" },

{
  "district_id": "2315",
  "district_name": "晋宁县",
  "spell": "jinningxian",
  "easy_spell": "jnx",
  "city_id": "265" },

{
  "district_id": "2316",
  "district_name": "富民县",
  "spell": "fuminxian",
  "easy_spell": "fmx",
  "city_id": "265" },

{
  "district_id": "2317",
  "district_name": "宜良县",
  "spell": "yiliangxian",
  "easy_spell": "ylx",
  "city_id": "265" },

{
  "district_id": "2318",
  "district_name": "石林彝族自治县",
  "spell": "shilinyizuzizhixian",
  "easy_spell": "slyzzzx",
  "city_id": "265" },

{
  "district_id": "2319",
  "district_name": "嵩明县",
  "spell": "zuomingxian",
  "easy_spell": "zmx",
  "city_id": "265" },

{
  "district_id": "2320",
  "district_name": "禄劝彝族苗族自治县",
  "spell": "luquanyizumiaozuzizhixian",
  "easy_spell": "lqyzmzzzx",
  "city_id": "265" },

{
  "district_id": "2321",
  "district_name": "寻甸回族彝族自治县",
  "spell": "xundianhuizuyizuzizhixian",
  "easy_spell": "xdhzyzzzx",
  "city_id": "265" },

{
  "district_id": "2322",
  "district_name": "安宁市",
  "spell": "anningshi",
  "easy_spell": "ans",
  "city_id": "265" },

{
  "district_id": "2323",
  "district_name": "麒麟区",
  "spell": "zuozuoqu",
  "easy_spell": "zzq",
  "city_id": "266" },

{
  "district_id": "2324",
  "district_name": "马龙县",
  "spell": "malongxian",
  "easy_spell": "mlx",
  "city_id": "266" },

{
  "district_id": "2325",
  "district_name": "陆良县",
  "spell": "luliangxian",
  "easy_spell": "llx",
  "city_id": "266" },

{
  "district_id": "2326",
  "district_name": "师宗县",
  "spell": "shizongxian",
  "easy_spell": "szx",
  "city_id": "266" },

{
  "district_id": "2327",
  "district_name": "罗平县",
  "spell": "luopingxian",
  "easy_spell": "lpx",
  "city_id": "266" },

{
  "district_id": "2328",
  "district_name": "富源县",
  "spell": "fuyuanxian",
  "easy_spell": "fyx",
  "city_id": "266" },

{
  "district_id": "2329",
  "district_name": "会泽县",
  "spell": "huizexian",
  "easy_spell": "hzx",
  "city_id": "266" },

{
  "district_id": "2330",
  "district_name": "沾益县",
  "spell": "zhanyixian",
  "easy_spell": "zyx",
  "city_id": "266" },

{
  "district_id": "2331",
  "district_name": "宣威市",
  "spell": "xuanweishi",
  "easy_spell": "xws",
  "city_id": "266" },

{
  "district_id": "2332",
  "district_name": "红塔区",
  "spell": "hongtaqu",
  "easy_spell": "htq",
  "city_id": "267" },

{
  "district_id": "2333",
  "district_name": "江川县",
  "spell": "jiangchuanxian",
  "easy_spell": "jcx",
  "city_id": "267" },

{
  "district_id": "2334",
  "district_name": "澄江县",
  "spell": "chengjiangxian",
  "easy_spell": "cjx",
  "city_id": "267" },

{
  "district_id": "2335",
  "district_name": "通海县",
  "spell": "tonghaixian",
  "easy_spell": "thx",
  "city_id": "267" },

{
  "district_id": "2336",
  "district_name": "华宁县",
  "spell": "huaningxian",
  "easy_spell": "hnx",
  "city_id": "267" },

{
  "district_id": "2337",
  "district_name": "易门县",
  "spell": "yimenxian",
  "easy_spell": "ymx",
  "city_id": "267" },

{
  "district_id": "2338",
  "district_name": "峨山彝族自治县",
  "spell": "eshanyizuzizhixian",
  "easy_spell": "esyzzzx",
  "city_id": "267" },

{
  "district_id": "2339",
  "district_name": "新平彝族傣族自治县",
  "spell": "xinpingyizudaizuzizhixian",
  "easy_spell": "xpyzdzzzx",
  "city_id": "267" },

{
  "district_id": "2340",
  "district_name": "元江哈尼族彝族傣族自治县",
  "spell": "yuanjianghanizuyizudaizuzizhixian",
  "easy_spell": "yjhnzyzdzzzx",
  "city_id": "267" },

{
  "district_id": "2341",
  "district_name": "隆阳区",
  "spell": "longyangqu",
  "easy_spell": "lyq",
  "city_id": "268" },

{
  "district_id": "2342",
  "district_name": "施甸县",
  "spell": "shidianxian",
  "easy_spell": "sdx",
  "city_id": "268" },

{
  "district_id": "2343",
  "district_name": "腾冲县",
  "spell": "tengchongxian",
  "easy_spell": "tcx",
  "city_id": "268" },

{
  "district_id": "2344",
  "district_name": "龙陵县",
  "spell": "longlingxian",
  "easy_spell": "llx",
  "city_id": "268" },

{
  "district_id": "2345",
  "district_name": "昌宁县",
  "spell": "changningxian",
  "easy_spell": "cnx",
  "city_id": "268" },

{
  "district_id": "2346",
  "district_name": "昭阳区",
  "spell": "zhaoyangqu",
  "easy_spell": "zyq",
  "city_id": "269" },

{
  "district_id": "2347",
  "district_name": "鲁甸县",
  "spell": "ludianxian",
  "easy_spell": "ldx",
  "city_id": "269" },

{
  "district_id": "2348",
  "district_name": "巧家县",
  "spell": "qiaojiaxian",
  "easy_spell": "qjx",
  "city_id": "269" },

{
  "district_id": "2349",
  "district_name": "盐津县",
  "spell": "yanjinxian",
  "easy_spell": "yjx",
  "city_id": "269" },

{
  "district_id": "2350",
  "district_name": "大关县",
  "spell": "daguanxian",
  "easy_spell": "dgx",
  "city_id": "269" },

{
  "district_id": "2351",
  "district_name": "永善县",
  "spell": "yongshanxian",
  "easy_spell": "ysx",
  "city_id": "269" },

{
  "district_id": "2352",
  "district_name": "绥江县",
  "spell": "suijiangxian",
  "easy_spell": "sjx",
  "city_id": "269" },

{
  "district_id": "2353",
  "district_name": "镇雄县",
  "spell": "zhenxiongxian",
  "easy_spell": "zxx",
  "city_id": "269" },

{
  "district_id": "2354",
  "district_name": "彝良县",
  "spell": "yiliangxian",
  "easy_spell": "ylx",
  "city_id": "269" },

{
  "district_id": "2355",
  "district_name": "威信县",
  "spell": "weixinxian",
  "easy_spell": "wxx",
  "city_id": "269" },

{
  "district_id": "2356",
  "district_name": "水富县",
  "spell": "shuifuxian",
  "easy_spell": "sfx",
  "city_id": "269" },

{
  "district_id": "2357",
  "district_name": "古城区",
  "spell": "guchengqu",
  "easy_spell": "gcq",
  "city_id": "270" },

{
  "district_id": "2358",
  "district_name": "玉龙纳西族自治县",
  "spell": "yulongnaxizuzizhixian",
  "easy_spell": "ylnxzzzx",
  "city_id": "270" },

{
  "district_id": "2359",
  "district_name": "永胜县",
  "spell": "yongshengxian",
  "easy_spell": "ysx",
  "city_id": "270" },

{
  "district_id": "2360",
  "district_name": "华坪县",
  "spell": "huapingxian",
  "easy_spell": "hpx",
  "city_id": "270" },

{
  "district_id": "2361",
  "district_name": "宁蒗彝族自治县",
  "spell": "ningzuoyizuzizhixian",
  "easy_spell": "nzyzzzx",
  "city_id": "270" },

{
  "district_id": "2362",
  "district_name": "翠云区",
  "spell": "cuiyunqu",
  "easy_spell": "cyq",
  "city_id": "271" },

{
  "district_id": "2363",
  "district_name": "普洱哈尼族彝族自治县",
  "spell": "puerhanizuyizuzizhixian",
  "easy_spell": "pehnzyzzzx",
  "city_id": "271" },

{
  "district_id": "2364",
  "district_name": "墨江哈尼族自治县",
  "spell": "mojianghanizuzizhixian",
  "easy_spell": "mjhnzzzx",
  "city_id": "271" },

{
  "district_id": "2365",
  "district_name": "景东彝族自治县",
  "spell": "jingdongyizuzizhixian",
  "easy_spell": "jdyzzzx",
  "city_id": "271" },

{
  "district_id": "2366",
  "district_name": "景谷傣族彝族自治县",
  "spell": "jinggudaizuyizuzizhixian",
  "easy_spell": "jgdzyzzzx",
  "city_id": "271" },

{
  "district_id": "2367",
  "district_name": "镇沅彝族哈尼族拉祜族自治县",
  "spell": "zhenzuoyizuhanizulazuozuzizhixian",
  "easy_spell": "zzyzhnzlzzzzx",
  "city_id": "271" },

{
  "district_id": "2368",
  "district_name": "江城哈尼族彝族自治县",
  "spell": "jiangchenghanizuyizuzizhixian",
  "easy_spell": "jchnzyzzzx",
  "city_id": "271" },

{
  "district_id": "2369",
  "district_name": "孟连傣族拉祜族佤族自治县",
  "spell": "mengliandaizulazuozuzuozuzizhixian",
  "easy_spell": "mldzlzzzzzzx",
  "city_id": "271" },

{
  "district_id": "2370",
  "district_name": "澜沧拉祜族自治县",
  "spell": "lancanglazuozuzizhixian",
  "easy_spell": "lclzzzzx",
  "city_id": "271" },

{
  "district_id": "2371",
  "district_name": "西盟佤族自治县",
  "spell": "ximengzuozuzizhixian",
  "easy_spell": "xmzzzzx",
  "city_id": "271" },

{
  "district_id": "2372",
  "district_name": "临翔区",
  "spell": "linxiangqu",
  "easy_spell": "lxq",
  "city_id": "272" },

{
  "district_id": "2373",
  "district_name": "凤庆县",
  "spell": "fengqingxian",
  "easy_spell": "fqx",
  "city_id": "272" },

{
  "district_id": "2374",
  "district_name": "云县",
  "spell": "yunxian",
  "easy_spell": "yx",
  "city_id": "272" },

{
  "district_id": "2375",
  "district_name": "永德县",
  "spell": "yongdexian",
  "easy_spell": "ydx",
  "city_id": "272" },

{
  "district_id": "2376",
  "district_name": "镇康县",
  "spell": "zhenkangxian",
  "easy_spell": "zkx",
  "city_id": "272" },

{
  "district_id": "2377",
  "district_name": "双江拉祜族佤族布朗族傣族自治县",
  "spell": "shuangjianglazuozuzuozubulangzudaizuzizhixian",
  "easy_spell": "sjlzzzzblzdzzzx",
  "city_id": "272" },

{
  "district_id": "2378",
  "district_name": "耿马傣族佤族自治县",
  "spell": "gengmadaizuzuozuzizhixian",
  "easy_spell": "gmdzzzzzx",
  "city_id": "272" },

{
  "district_id": "2379",
  "district_name": "沧源佤族自治县",
  "spell": "cangyuanzuozuzizhixian",
  "easy_spell": "cyzzzzx",
  "city_id": "272" },

{
  "district_id": "2380",
  "district_name": "楚雄市",
  "spell": "chuxiongshi",
  "easy_spell": "cxs",
  "city_id": "273" },

{
  "district_id": "2381",
  "district_name": "双柏县",
  "spell": "shuangbaixian",
  "easy_spell": "sbx",
  "city_id": "273" },

{
  "district_id": "2382",
  "district_name": "牟定县",
  "spell": "moudingxian",
  "easy_spell": "mdx",
  "city_id": "273" },

{
  "district_id": "2383",
  "district_name": "南华县",
  "spell": "nanhuaxian",
  "easy_spell": "nhx",
  "city_id": "273" },

{
  "district_id": "2384",
  "district_name": "姚安县",
  "spell": "yaoanxian",
  "easy_spell": "yax",
  "city_id": "273" },

{
  "district_id": "2385",
  "district_name": "大姚县",
  "spell": "dayaoxian",
  "easy_spell": "dyx",
  "city_id": "273" },

{
  "district_id": "2386",
  "district_name": "永仁县",
  "spell": "yongrenxian",
  "easy_spell": "yrx",
  "city_id": "273" },

{
  "district_id": "2387",
  "district_name": "元谋县",
  "spell": "yuanmouxian",
  "easy_spell": "ymx",
  "city_id": "273" },

{
  "district_id": "2388",
  "district_name": "武定县",
  "spell": "wudingxian",
  "easy_spell": "wdx",
  "city_id": "273" },

{
  "district_id": "2389",
  "district_name": "禄丰县",
  "spell": "lufengxian",
  "easy_spell": "lfx",
  "city_id": "273" },

{
  "district_id": "2390",
  "district_name": "个旧市",
  "spell": "gejiushi",
  "easy_spell": "gjs",
  "city_id": "274" },

{
  "district_id": "2391",
  "district_name": "开远市",
  "spell": "kaiyuanshi",
  "easy_spell": "kys",
  "city_id": "274" },

{
  "district_id": "2392",
  "district_name": "蒙自县",
  "spell": "mengzixian",
  "easy_spell": "mzx",
  "city_id": "274" },

{
  "district_id": "2393",
  "district_name": "屏边苗族自治县",
  "spell": "pingbianmiaozuzizhixian",
  "easy_spell": "pbmzzzx",
  "city_id": "274" },

{
  "district_id": "2394",
  "district_name": "建水县",
  "spell": "jianshuixian",
  "easy_spell": "jsx",
  "city_id": "274" },

{
  "district_id": "2395",
  "district_name": "石屏县",
  "spell": "shipingxian",
  "easy_spell": "spx",
  "city_id": "274" },

{
  "district_id": "2396",
  "district_name": "弥勒县",
  "spell": "milexian",
  "easy_spell": "mlx",
  "city_id": "274" },

{
  "district_id": "2397",
  "district_name": "泸西县",
  "spell": "zuoxixian",
  "easy_spell": "zxx",
  "city_id": "274" },

{
  "district_id": "2398",
  "district_name": "元阳县",
  "spell": "yuanyangxian",
  "easy_spell": "yyx",
  "city_id": "274" },

{
  "district_id": "2399",
  "district_name": "红河县",
  "spell": "honghexian",
  "easy_spell": "hhx",
  "city_id": "274" },

{
  "district_id": "2400",
  "district_name": "金平苗族瑶族傣族自治县",
  "spell": "jinpingmiaozuyaozudaizuzizhixian",
  "easy_spell": "jpmzyzdzzzx",
  "city_id": "274" },

{
  "district_id": "2401",
  "district_name": "绿春县",
  "spell": "lvchunxian",
  "easy_spell": "lcx",
  "city_id": "274" },

{
  "district_id": "2402",
  "district_name": "河口瑶族自治县",
  "spell": "hekouyaozuzizhixian",
  "easy_spell": "hkyzzzx",
  "city_id": "274" },

{
  "district_id": "2403",
  "district_name": "文山县",
  "spell": "wenshanxian",
  "easy_spell": "wsx",
  "city_id": "275" },

{
  "district_id": "2404",
  "district_name": "砚山县",
  "spell": "yanshanxian",
  "easy_spell": "ysx",
  "city_id": "275" },

{
  "district_id": "2405",
  "district_name": "西畴县",
  "spell": "xichouxian",
  "easy_spell": "xcx",
  "city_id": "275" },

{
  "district_id": "2406",
  "district_name": "麻栗坡县",
  "spell": "malipoxian",
  "easy_spell": "mlpx",
  "city_id": "275" },

{
  "district_id": "2407",
  "district_name": "马关县",
  "spell": "maguanxian",
  "easy_spell": "mgx",
  "city_id": "275" },

{
  "district_id": "2408",
  "district_name": "丘北县",
  "spell": "qiubeixian",
  "easy_spell": "qbx",
  "city_id": "275" },

{
  "district_id": "2409",
  "district_name": "广南县",
  "spell": "guangnanxian",
  "easy_spell": "gnx",
  "city_id": "275" },

{
  "district_id": "2410",
  "district_name": "富宁县",
  "spell": "funingxian",
  "easy_spell": "fnx",
  "city_id": "275" },

{
  "district_id": "2411",
  "district_name": "景洪市",
  "spell": "jinghongshi",
  "easy_spell": "jhs",
  "city_id": "276" },

{
  "district_id": "2412",
  "district_name": "勐海县",
  "spell": "zuohaixian",
  "easy_spell": "zhx",
  "city_id": "276" },

{
  "district_id": "2413",
  "district_name": "勐腊县",
  "spell": "zuolaxian",
  "easy_spell": "zlx",
  "city_id": "276" },

{
  "district_id": "2414",
  "district_name": "大理市",
  "spell": "dalishi",
  "easy_spell": "dls",
  "city_id": "277" },

{
  "district_id": "2415",
  "district_name": "漾濞彝族自治县",
  "spell": "yangzuoyizuzizhixian",
  "easy_spell": "yzyzzzx",
  "city_id": "277" },

{
  "district_id": "2416",
  "district_name": "祥云县",
  "spell": "xiangyunxian",
  "easy_spell": "xyx",
  "city_id": "277" },

{
  "district_id": "2417",
  "district_name": "宾川县",
  "spell": "binchuanxian",
  "easy_spell": "bcx",
  "city_id": "277" },

{
  "district_id": "2418",
  "district_name": "弥渡县",
  "spell": "miduxian",
  "easy_spell": "mdx",
  "city_id": "277" },

{
  "district_id": "2419",
  "district_name": "南涧彝族自治县",
  "spell": "nanjianyizuzizhixian",
  "easy_spell": "njyzzzx",
  "city_id": "277" },

{
  "district_id": "2420",
  "district_name": "巍山彝族回族自治县",
  "spell": "weishanyizuhuizuzizhixian",
  "easy_spell": "wsyzhzzzx",
  "city_id": "277" },

{
  "district_id": "2421",
  "district_name": "永平县",
  "spell": "yongpingxian",
  "easy_spell": "ypx",
  "city_id": "277" },

{
  "district_id": "2422",
  "district_name": "云龙县",
  "spell": "yunlongxian",
  "easy_spell": "ylx",
  "city_id": "277" },

{
  "district_id": "2423",
  "district_name": "洱源县",
  "spell": "eryuanxian",
  "easy_spell": "eyx",
  "city_id": "277" },

{
  "district_id": "2424",
  "district_name": "剑川县",
  "spell": "jianchuanxian",
  "easy_spell": "jcx",
  "city_id": "277" },

{
  "district_id": "2425",
  "district_name": "鹤庆县",
  "spell": "heqingxian",
  "easy_spell": "hqx",
  "city_id": "277" },

{
  "district_id": "2426",
  "district_name": "瑞丽市",
  "spell": "ruilishi",
  "easy_spell": "rls",
  "city_id": "278" },

{
  "district_id": "2427",
  "district_name": "潞西市",
  "spell": "luxishi",
  "easy_spell": "lxs",
  "city_id": "278" },

{
  "district_id": "2428",
  "district_name": "梁河县",
  "spell": "lianghexian",
  "easy_spell": "lhx",
  "city_id": "278" },

{
  "district_id": "2429",
  "district_name": "盈江县",
  "spell": "yingjiangxian",
  "easy_spell": "yjx",
  "city_id": "278" },

{
  "district_id": "2430",
  "district_name": "陇川县",
  "spell": "longchuanxian",
  "easy_spell": "lcx",
  "city_id": "278" },

{
  "district_id": "2431",
  "district_name": "泸水县",
  "spell": "zuoshuixian",
  "easy_spell": "zsx",
  "city_id": "279" },

{
  "district_id": "2432",
  "district_name": "福贡县",
  "spell": "fugongxian",
  "easy_spell": "fgx",
  "city_id": "279" },

{
  "district_id": "2433",
  "district_name": "贡山独龙族怒族自治县",
  "spell": "gongshandulongzunuzuzizhixian",
  "easy_spell": "gsdlznzzzx",
  "city_id": "279" },

{
  "district_id": "2434",
  "district_name": "兰坪白族普米族自治县",
  "spell": "lanpingbaizupumizuzizhixian",
  "easy_spell": "lpbzpmzzzx",
  "city_id": "279" },

{
  "district_id": "2435",
  "district_name": "香格里拉县",
  "spell": "xianggelilaxian",
  "easy_spell": "xgllx",
  "city_id": "280" },

{
  "district_id": "2436",
  "district_name": "德钦县",
  "spell": "deqinxian",
  "easy_spell": "dqx",
  "city_id": "280" },

{
  "district_id": "2437",
  "district_name": "维西傈僳族自治县",
  "spell": "weixilisuzuzizhixian",
  "easy_spell": "wxlszzzx",
  "city_id": "280" },

{
  "district_id": "2438",
  "district_name": "城关区",
  "spell": "chengguanqu",
  "easy_spell": "cgq",
  "city_id": "281" },

{
  "district_id": "2439",
  "district_name": "林周县",
  "spell": "linzhouxian",
  "easy_spell": "lzx",
  "city_id": "281" },

{
  "district_id": "2440",
  "district_name": "当雄县",
  "spell": "dangxiongxian",
  "easy_spell": "dxx",
  "city_id": "281" },

{
  "district_id": "2441",
  "district_name": "尼木县",
  "spell": "nimuxian",
  "easy_spell": "nmx",
  "city_id": "281" },

{
  "district_id": "2442",
  "district_name": "曲水县",
  "spell": "qushuixian",
  "easy_spell": "qsx",
  "city_id": "281" },

{
  "district_id": "2443",
  "district_name": "堆龙德庆县",
  "spell": "duilongdeqingxian",
  "easy_spell": "dldqx",
  "city_id": "281" },

{
  "district_id": "2444",
  "district_name": "达孜县",
  "spell": "dazixian",
  "easy_spell": "dzx",
  "city_id": "281" },

{
  "district_id": "2445",
  "district_name": "墨竹工卡县",
  "spell": "mozhugongkaxian",
  "easy_spell": "mzgkx",
  "city_id": "281" },

{
  "district_id": "2446",
  "district_name": "昌都县",
  "spell": "changduxian",
  "easy_spell": "cdx",
  "city_id": "282" },

{
  "district_id": "2447",
  "district_name": "江达县",
  "spell": "jiangdaxian",
  "easy_spell": "jdx",
  "city_id": "282" },

{
  "district_id": "2448",
  "district_name": "贡觉县",
  "spell": "gongjuexian",
  "easy_spell": "gjx",
  "city_id": "282" },

{
  "district_id": "2449",
  "district_name": "类乌齐县",
  "spell": "leiwuqixian",
  "easy_spell": "lwqx",
  "city_id": "282" },

{
  "district_id": "2450",
  "district_name": "丁青县",
  "spell": "dingqingxian",
  "easy_spell": "dqx",
  "city_id": "282" },

{
  "district_id": "2451",
  "district_name": "察雅县",
  "spell": "chayaxian",
  "easy_spell": "cyx",
  "city_id": "282" },

{
  "district_id": "2452",
  "district_name": "八宿县",
  "spell": "basuxian",
  "easy_spell": "bsx",
  "city_id": "282" },

{
  "district_id": "2453",
  "district_name": "左贡县",
  "spell": "zuogongxian",
  "easy_spell": "zgx",
  "city_id": "282" },

{
  "district_id": "2454",
  "district_name": "芒康县",
  "spell": "mangkangxian",
  "easy_spell": "mkx",
  "city_id": "282" },

{
  "district_id": "2455",
  "district_name": "洛隆县",
  "spell": "luolongxian",
  "easy_spell": "llx",
  "city_id": "282" },

{
  "district_id": "2456",
  "district_name": "边坝县",
  "spell": "bianbaxian",
  "easy_spell": "bbx",
  "city_id": "282" },

{
  "district_id": "2457",
  "district_name": "乃东县",
  "spell": "naidongxian",
  "easy_spell": "ndx",
  "city_id": "283" },

{
  "district_id": "2458",
  "district_name": "扎囊县",
  "spell": "zhanangxian",
  "easy_spell": "znx",
  "city_id": "283" },

{
  "district_id": "2459",
  "district_name": "贡嘎县",
  "spell": "gonggaxian",
  "easy_spell": "ggx",
  "city_id": "283" },

{
  "district_id": "2460",
  "district_name": "桑日县",
  "spell": "sangrixian",
  "easy_spell": "srx",
  "city_id": "283" },

{
  "district_id": "2461",
  "district_name": "琼结县",
  "spell": "qiongjiexian",
  "easy_spell": "qjx",
  "city_id": "283" },

{
  "district_id": "2462",
  "district_name": "曲松县",
  "spell": "qusongxian",
  "easy_spell": "qsx",
  "city_id": "283" },

{
  "district_id": "2463",
  "district_name": "措美县",
  "spell": "cuomeixian",
  "easy_spell": "cmx",
  "city_id": "283" },

{
  "district_id": "2464",
  "district_name": "洛扎县",
  "spell": "luozhaxian",
  "easy_spell": "lzx",
  "city_id": "283" },

{
  "district_id": "2465",
  "district_name": "加查县",
  "spell": "jiachaxian",
  "easy_spell": "jcx",
  "city_id": "283" },

{
  "district_id": "2466",
  "district_name": "隆子县",
  "spell": "longzixian",
  "easy_spell": "lzx",
  "city_id": "283" },

{
  "district_id": "2467",
  "district_name": "错那县",
  "spell": "cuonaxian",
  "easy_spell": "cnx",
  "city_id": "283" },

{
  "district_id": "2468",
  "district_name": "浪卡子县",
  "spell": "langkazixian",
  "easy_spell": "lkzx",
  "city_id": "283" },

{
  "district_id": "2469",
  "district_name": "日喀则市",
  "spell": "rikazeshi",
  "easy_spell": "rkzs",
  "city_id": "284" },

{
  "district_id": "2470",
  "district_name": "南木林县",
  "spell": "nanmulinxian",
  "easy_spell": "nmlx",
  "city_id": "284" },

{
  "district_id": "2471",
  "district_name": "江孜县",
  "spell": "jiangzixian",
  "easy_spell": "jzx",
  "city_id": "284" },

{
  "district_id": "2472",
  "district_name": "定日县",
  "spell": "dingrixian",
  "easy_spell": "drx",
  "city_id": "284" },

{
  "district_id": "2473",
  "district_name": "萨迦县",
  "spell": "sazuoxian",
  "easy_spell": "szx",
  "city_id": "284" },

{
  "district_id": "2474",
  "district_name": "拉孜县",
  "spell": "lazixian",
  "easy_spell": "lzx",
  "city_id": "284" },

{
  "district_id": "2475",
  "district_name": "昂仁县",
  "spell": "angrenxian",
  "easy_spell": "arx",
  "city_id": "284" },

{
  "district_id": "2476",
  "district_name": "谢通门县",
  "spell": "xietongmenxian",
  "easy_spell": "xtmx",
  "city_id": "284" },

{
  "district_id": "2477",
  "district_name": "白朗县",
  "spell": "bailangxian",
  "easy_spell": "blx",
  "city_id": "284" },

{
  "district_id": "2478",
  "district_name": "仁布县",
  "spell": "renbuxian",
  "easy_spell": "rbx",
  "city_id": "284" },

{
  "district_id": "2479",
  "district_name": "康马县",
  "spell": "kangmaxian",
  "easy_spell": "kmx",
  "city_id": "284" },

{
  "district_id": "2480",
  "district_name": "定结县",
  "spell": "dingjiexian",
  "easy_spell": "djx",
  "city_id": "284" },

{
  "district_id": "2481",
  "district_name": "仲巴县",
  "spell": "zhongbaxian",
  "easy_spell": "zbx",
  "city_id": "284" },

{
  "district_id": "2482",
  "district_name": "亚东县",
  "spell": "yadongxian",
  "easy_spell": "ydx",
  "city_id": "284" },

{
  "district_id": "2483",
  "district_name": "吉隆县",
  "spell": "jilongxian",
  "easy_spell": "jlx",
  "city_id": "284" },

{
  "district_id": "2484",
  "district_name": "聂拉木县",
  "spell": "nielamuxian",
  "easy_spell": "nlmx",
  "city_id": "284" },

{
  "district_id": "2485",
  "district_name": "萨嘎县",
  "spell": "sagaxian",
  "easy_spell": "sgx",
  "city_id": "284" },

{
  "district_id": "2486",
  "district_name": "岗巴县",
  "spell": "gangbaxian",
  "easy_spell": "gbx",
  "city_id": "284" },

{
  "district_id": "2487",
  "district_name": "那曲县",
  "spell": "naquxian",
  "easy_spell": "nqx",
  "city_id": "285" },

{
  "district_id": "2488",
  "district_name": "嘉黎县",
  "spell": "jialixian",
  "easy_spell": "jlx",
  "city_id": "285" },

{
  "district_id": "2489",
  "district_name": "比如县",
  "spell": "biruxian",
  "easy_spell": "brx",
  "city_id": "285" },

{
  "district_id": "2490",
  "district_name": "聂荣县",
  "spell": "nierongxian",
  "easy_spell": "nrx",
  "city_id": "285" },

{
  "district_id": "2491",
  "district_name": "安多县",
  "spell": "anduoxian",
  "easy_spell": "adx",
  "city_id": "285" },

{
  "district_id": "2492",
  "district_name": "申扎县",
  "spell": "shenzhaxian",
  "easy_spell": "szx",
  "city_id": "285" },

{
  "district_id": "2493",
  "district_name": "索县",
  "spell": "suoxian",
  "easy_spell": "sx",
  "city_id": "285" },

{
  "district_id": "2494",
  "district_name": "班戈县",
  "spell": "bangexian",
  "easy_spell": "bgx",
  "city_id": "285" },

{
  "district_id": "2495",
  "district_name": "巴青县",
  "spell": "baqingxian",
  "easy_spell": "bqx",
  "city_id": "285" },

{
  "district_id": "2496",
  "district_name": "尼玛县",
  "spell": "nimaxian",
  "easy_spell": "nmx",
  "city_id": "285" },

{
  "district_id": "2497",
  "district_name": "普兰县",
  "spell": "pulanxian",
  "easy_spell": "plx",
  "city_id": "286" },

{
  "district_id": "2498",
  "district_name": "札达县",
  "spell": "zhadaxian",
  "easy_spell": "zdx",
  "city_id": "286" },

{
  "district_id": "2499",
  "district_name": "噶尔县",
  "spell": "gaerxian",
  "easy_spell": "gex",
  "city_id": "286" },

{
  "district_id": "2500",
  "district_name": "日土县",
  "spell": "rituxian",
  "easy_spell": "rtx",
  "city_id": "286" },

{
  "district_id": "2501",
  "district_name": "革吉县",
  "spell": "gejixian",
  "easy_spell": "gjx",
  "city_id": "286" },

{
  "district_id": "2502",
  "district_name": "改则县",
  "spell": "gaizexian",
  "easy_spell": "gzx",
  "city_id": "286" },

{
  "district_id": "2503",
  "district_name": "措勤县",
  "spell": "cuoqinxian",
  "easy_spell": "cqx",
  "city_id": "286" },

{
  "district_id": "2504",
  "district_name": "林芝县",
  "spell": "linzhixian",
  "easy_spell": "lzx",
  "city_id": "287" },

{
  "district_id": "2505",
  "district_name": "工布江达县",
  "spell": "gongbujiangdaxian",
  "easy_spell": "gbjdx",
  "city_id": "287" },

{
  "district_id": "2506",
  "district_name": "米林县",
  "spell": "milinxian",
  "easy_spell": "mlx",
  "city_id": "287" },

{
  "district_id": "2507",
  "district_name": "墨脱县",
  "spell": "motuoxian",
  "easy_spell": "mtx",
  "city_id": "287" },

{
  "district_id": "2508",
  "district_name": "波密县",
  "spell": "bomixian",
  "easy_spell": "bmx",
  "city_id": "287" },

{
  "district_id": "2509",
  "district_name": "察隅县",
  "spell": "chayuxian",
  "easy_spell": "cyx",
  "city_id": "287" },

{
  "district_id": "2510",
  "district_name": "朗县",
  "spell": "langxian",
  "easy_spell": "lx",
  "city_id": "287" },

{
  "district_id": "2511",
  "district_name": "新城区",
  "spell": "xinchengqu",
  "easy_spell": "xcq",
  "city_id": "288" },

{
  "district_id": "2512",
  "district_name": "碑林区",
  "spell": "beilinqu",
  "easy_spell": "blq",
  "city_id": "288" },

{
  "district_id": "2513",
  "district_name": "莲湖区",
  "spell": "lianhuqu",
  "easy_spell": "lhq",
  "city_id": "288" },

{
  "district_id": "2514",
  "district_name": "灞桥区",
  "spell": "zuoqiaoqu",
  "easy_spell": "zqq",
  "city_id": "288" },

{
  "district_id": "2515",
  "district_name": "未央区",
  "spell": "weiyangqu",
  "easy_spell": "wyq",
  "city_id": "288" },

{
  "district_id": "2516",
  "district_name": "雁塔区",
  "spell": "yantaqu",
  "easy_spell": "ytq",
  "city_id": "288" },

{
  "district_id": "2517",
  "district_name": "阎良区",
  "spell": "yanliangqu",
  "easy_spell": "ylq",
  "city_id": "288" },

{
  "district_id": "2518",
  "district_name": "临潼区",
  "spell": "linzuoqu",
  "easy_spell": "lzq",
  "city_id": "288" },

{
  "district_id": "2519",
  "district_name": "长安区",
  "spell": "changanqu",
  "easy_spell": "caq",
  "city_id": "288" },

{
  "district_id": "2520",
  "district_name": "蓝田县",
  "spell": "lantianxian",
  "easy_spell": "ltx",
  "city_id": "288" },

{
  "district_id": "2521",
  "district_name": "周至县",
  "spell": "zhouzhixian",
  "easy_spell": "zzx",
  "city_id": "288" },

{
  "district_id": "2522",
  "district_name": "户县",
  "spell": "huxian",
  "easy_spell": "hx",
  "city_id": "288" },

{
  "district_id": "2523",
  "district_name": "高陵县",
  "spell": "gaolingxian",
  "easy_spell": "glx",
  "city_id": "288" },

{
  "district_id": "2524",
  "district_name": "王益区",
  "spell": "wangyiqu",
  "easy_spell": "wyq",
  "city_id": "289" },

{
  "district_id": "2525",
  "district_name": "印台区",
  "spell": "yintaiqu",
  "easy_spell": "ytq",
  "city_id": "289" },

{
  "district_id": "2526",
  "district_name": "耀州区",
  "spell": "yaozhouqu",
  "easy_spell": "yzq",
  "city_id": "289" },

{
  "district_id": "2527",
  "district_name": "宜君县",
  "spell": "yijunxian",
  "easy_spell": "yjx",
  "city_id": "289" },

{
  "district_id": "2528",
  "district_name": "渭滨区",
  "spell": "weibinqu",
  "easy_spell": "wbq",
  "city_id": "290" },

{
  "district_id": "2529",
  "district_name": "金台区",
  "spell": "jintaiqu",
  "easy_spell": "jtq",
  "city_id": "290" },

{
  "district_id": "2530",
  "district_name": "陈仓区",
  "spell": "chencangqu",
  "easy_spell": "ccq",
  "city_id": "290" },

{
  "district_id": "2531",
  "district_name": "凤翔县",
  "spell": "fengxiangxian",
  "easy_spell": "fxx",
  "city_id": "290" },

{
  "district_id": "2532",
  "district_name": "岐山县",
  "spell": "zuoshanxian",
  "easy_spell": "zsx",
  "city_id": "290" },

{
  "district_id": "2533",
  "district_name": "扶风县",
  "spell": "fufengxian",
  "easy_spell": "ffx",
  "city_id": "290" },

{
  "district_id": "2534",
  "district_name": "眉县",
  "spell": "meixian",
  "easy_spell": "mx",
  "city_id": "290" },

{
  "district_id": "2535",
  "district_name": "陇县",
  "spell": "longxian",
  "easy_spell": "lx",
  "city_id": "290" },

{
  "district_id": "2536",
  "district_name": "千阳县",
  "spell": "qianyangxian",
  "easy_spell": "qyx",
  "city_id": "290" },

{
  "district_id": "2537",
  "district_name": "麟游县",
  "spell": "zuoyouxian",
  "easy_spell": "zyx",
  "city_id": "290" },

{
  "district_id": "2538",
  "district_name": "凤县",
  "spell": "fengxian",
  "easy_spell": "fx",
  "city_id": "290" },

{
  "district_id": "2539",
  "district_name": "太白县",
  "spell": "taibaixian",
  "easy_spell": "tbx",
  "city_id": "290" },

{
  "district_id": "2540",
  "district_name": "秦都区",
  "spell": "qinduqu",
  "easy_spell": "qdq",
  "city_id": "291" },

{
  "district_id": "2541",
  "district_name": "杨凌区",
  "spell": "yanglingqu",
  "easy_spell": "ylq",
  "city_id": "291" },

{
  "district_id": "2542",
  "district_name": "渭城区",
  "spell": "weichengqu",
  "easy_spell": "wcq",
  "city_id": "291" },

{
  "district_id": "2543",
  "district_name": "三原县",
  "spell": "sanyuanxian",
  "easy_spell": "syx",
  "city_id": "291" },

{
  "district_id": "2544",
  "district_name": "泾阳县",
  "spell": "zuoyangxian",
  "easy_spell": "zyx",
  "city_id": "291" },

{
  "district_id": "2545",
  "district_name": "乾县",
  "spell": "qianxian",
  "easy_spell": "qx",
  "city_id": "291" },

{
  "district_id": "2546",
  "district_name": "礼泉县",
  "spell": "liquanxian",
  "easy_spell": "lqx",
  "city_id": "291" },

{
  "district_id": "2547",
  "district_name": "永寿县",
  "spell": "yongshouxian",
  "easy_spell": "ysx",
  "city_id": "291" },

{
  "district_id": "2548",
  "district_name": "彬县",
  "spell": "binxian",
  "easy_spell": "bx",
  "city_id": "291" },

{
  "district_id": "2549",
  "district_name": "长武县",
  "spell": "changwuxian",
  "easy_spell": "cwx",
  "city_id": "291" },

{
  "district_id": "2550",
  "district_name": "旬邑县",
  "spell": "xunyixian",
  "easy_spell": "xyx",
  "city_id": "291" },

{
  "district_id": "2551",
  "district_name": "淳化县",
  "spell": "chunhuaxian",
  "easy_spell": "chx",
  "city_id": "291" },

{
  "district_id": "2552",
  "district_name": "武功县",
  "spell": "wugongxian",
  "easy_spell": "wgx",
  "city_id": "291" },

{
  "district_id": "2553",
  "district_name": "兴平市",
  "spell": "xingpingshi",
  "easy_spell": "xps",
  "city_id": "291" },

{
  "district_id": "2554",
  "district_name": "临渭区",
  "spell": "linweiqu",
  "easy_spell": "lwq",
  "city_id": "292" },

{
  "district_id": "2555",
  "district_name": "华县",
  "spell": "huaxian",
  "easy_spell": "hx",
  "city_id": "292" },

{
  "district_id": "2556",
  "district_name": "潼关县",
  "spell": "zuoguanxian",
  "easy_spell": "zgx",
  "city_id": "292" },

{
  "district_id": "2557",
  "district_name": "大荔县",
  "spell": "dalixian",
  "easy_spell": "dlx",
  "city_id": "292" },

{
  "district_id": "2558",
  "district_name": "合阳县",
  "spell": "heyangxian",
  "easy_spell": "hyx",
  "city_id": "292" },

{
  "district_id": "2559",
  "district_name": "澄城县",
  "spell": "chengchengxian",
  "easy_spell": "ccx",
  "city_id": "292" },

{
  "district_id": "2560",
  "district_name": "蒲城县",
  "spell": "puchengxian",
  "easy_spell": "pcx",
  "city_id": "292" },

{
  "district_id": "2561",
  "district_name": "白水县",
  "spell": "baishuixian",
  "easy_spell": "bsx",
  "city_id": "292" },

{
  "district_id": "2562",
  "district_name": "富平县",
  "spell": "fupingxian",
  "easy_spell": "fpx",
  "city_id": "292" },

{
  "district_id": "2563",
  "district_name": "韩城市",
  "spell": "hanchengshi",
  "easy_spell": "hcs",
  "city_id": "292" },

{
  "district_id": "2564",
  "district_name": "华阴市",
  "spell": "huayinshi",
  "easy_spell": "hys",
  "city_id": "292" },

{
  "district_id": "2565",
  "district_name": "宝塔区",
  "spell": "baotaqu",
  "easy_spell": "btq",
  "city_id": "293" },

{
  "district_id": "2566",
  "district_name": "延长县",
  "spell": "yanchangxian",
  "easy_spell": "ycx",
  "city_id": "293" },

{
  "district_id": "2567",
  "district_name": "延川县",
  "spell": "yanchuanxian",
  "easy_spell": "ycx",
  "city_id": "293" },

{
  "district_id": "2568",
  "district_name": "子长县",
  "spell": "zichangxian",
  "easy_spell": "zcx",
  "city_id": "293" },

{
  "district_id": "2569",
  "district_name": "安塞县",
  "spell": "ansaixian",
  "easy_spell": "asx",
  "city_id": "293" },

{
  "district_id": "2570",
  "district_name": "志丹县",
  "spell": "zhidanxian",
  "easy_spell": "zdx",
  "city_id": "293" },

{
  "district_id": "2571",
  "district_name": "吴旗县",
  "spell": "wuqixian",
  "easy_spell": "wqx",
  "city_id": "293" },

{
  "district_id": "2572",
  "district_name": "甘泉县",
  "spell": "ganquanxian",
  "easy_spell": "gqx",
  "city_id": "293" },

{
  "district_id": "2573",
  "district_name": "富县",
  "spell": "fuxian",
  "easy_spell": "fx",
  "city_id": "293" },

{
  "district_id": "2574",
  "district_name": "洛川县",
  "spell": "luochuanxian",
  "easy_spell": "lcx",
  "city_id": "293" },

{
  "district_id": "2575",
  "district_name": "宜川县",
  "spell": "yichuanxian",
  "easy_spell": "ycx",
  "city_id": "293" },

{
  "district_id": "2576",
  "district_name": "黄龙县",
  "spell": "huanglongxian",
  "easy_spell": "hlx",
  "city_id": "293" },

{
  "district_id": "2577",
  "district_name": "黄陵县",
  "spell": "huanglingxian",
  "easy_spell": "hlx",
  "city_id": "293" },

{
  "district_id": "2578",
  "district_name": "汉台区",
  "spell": "hantaiqu",
  "easy_spell": "htq",
  "city_id": "294" },

{
  "district_id": "2579",
  "district_name": "南郑县",
  "spell": "nanzhengxian",
  "easy_spell": "nzx",
  "city_id": "294" },

{
  "district_id": "2580",
  "district_name": "城固县",
  "spell": "chengguxian",
  "easy_spell": "cgx",
  "city_id": "294" },

{
  "district_id": "2581",
  "district_name": "洋县",
  "spell": "yangxian",
  "easy_spell": "yx",
  "city_id": "294" },

{
  "district_id": "2582",
  "district_name": "西乡县",
  "spell": "xixiangxian",
  "easy_spell": "xxx",
  "city_id": "294" },

{
  "district_id": "2583",
  "district_name": "勉县",
  "spell": "mianxian",
  "easy_spell": "mx",
  "city_id": "294" },

{
  "district_id": "2584",
  "district_name": "宁强县",
  "spell": "ningqiangxian",
  "easy_spell": "nqx",
  "city_id": "294" },

{
  "district_id": "2585",
  "district_name": "略阳县",
  "spell": "lueyangxian",
  "easy_spell": "lyx",
  "city_id": "294" },

{
  "district_id": "2586",
  "district_name": "镇巴县",
  "spell": "zhenbaxian",
  "easy_spell": "zbx",
  "city_id": "294" },

{
  "district_id": "2587",
  "district_name": "留坝县",
  "spell": "liubaxian",
  "easy_spell": "lbx",
  "city_id": "294" },

{
  "district_id": "2588",
  "district_name": "佛坪县",
  "spell": "fopingxian",
  "easy_spell": "fpx",
  "city_id": "294" },

{
  "district_id": "2589",
  "district_name": "榆阳区",
  "spell": "yuyangqu",
  "easy_spell": "yyq",
  "city_id": "295" },

{
  "district_id": "2590",
  "district_name": "神木县",
  "spell": "shenmuxian",
  "easy_spell": "smx",
  "city_id": "295" },

{
  "district_id": "2591",
  "district_name": "府谷县",
  "spell": "fuguxian",
  "easy_spell": "fgx",
  "city_id": "295" },

{
  "district_id": "2592",
  "district_name": "横山县",
  "spell": "hengshanxian",
  "easy_spell": "hsx",
  "city_id": "295" },

{
  "district_id": "2593",
  "district_name": "靖边县",
  "spell": "jingbianxian",
  "easy_spell": "jbx",
  "city_id": "295" },

{
  "district_id": "2594",
  "district_name": "定边县",
  "spell": "dingbianxian",
  "easy_spell": "dbx",
  "city_id": "295" },

{
  "district_id": "2595",
  "district_name": "绥德县",
  "spell": "suidexian",
  "easy_spell": "sdx",
  "city_id": "295" },

{
  "district_id": "2596",
  "district_name": "米脂县",
  "spell": "mizhixian",
  "easy_spell": "mzx",
  "city_id": "295" },

{
  "district_id": "2597",
  "district_name": "佳县",
  "spell": "jiaxian",
  "easy_spell": "jx",
  "city_id": "295" },

{
  "district_id": "2598",
  "district_name": "吴堡县",
  "spell": "wubaoxian",
  "easy_spell": "wbx",
  "city_id": "295" },

{
  "district_id": "2599",
  "district_name": "清涧县",
  "spell": "qingjianxian",
  "easy_spell": "qjx",
  "city_id": "295" },

{
  "district_id": "2600",
  "district_name": "子洲县",
  "spell": "zizhouxian",
  "easy_spell": "zzx",
  "city_id": "295" },

{
  "district_id": "2601",
  "district_name": "汉滨区",
  "spell": "hanbinqu",
  "easy_spell": "hbq",
  "city_id": "296" },

{
  "district_id": "2602",
  "district_name": "汉阴县",
  "spell": "hanyinxian",
  "easy_spell": "hyx",
  "city_id": "296" },

{
  "district_id": "2603",
  "district_name": "石泉县",
  "spell": "shiquanxian",
  "easy_spell": "sqx",
  "city_id": "296" },

{
  "district_id": "2604",
  "district_name": "宁陕县",
  "spell": "ningshanxian",
  "easy_spell": "nsx",
  "city_id": "296" },

{
  "district_id": "2605",
  "district_name": "紫阳县",
  "spell": "ziyangxian",
  "easy_spell": "zyx",
  "city_id": "296" },

{
  "district_id": "2606",
  "district_name": "岚皋县",
  "spell": "zuogaoxian",
  "easy_spell": "zgx",
  "city_id": "296" },

{
  "district_id": "2607",
  "district_name": "平利县",
  "spell": "pinglixian",
  "easy_spell": "plx",
  "city_id": "296" },

{
  "district_id": "2608",
  "district_name": "镇坪县",
  "spell": "zhenpingxian",
  "easy_spell": "zpx",
  "city_id": "296" },

{
  "district_id": "2609",
  "district_name": "旬阳县",
  "spell": "xunyangxian",
  "easy_spell": "xyx",
  "city_id": "296" },

{
  "district_id": "2610",
  "district_name": "白河县",
  "spell": "baihexian",
  "easy_spell": "bhx",
  "city_id": "296" },

{
  "district_id": "2611",
  "district_name": "商州区",
  "spell": "shangzhouqu",
  "easy_spell": "szq",
  "city_id": "297" },

{
  "district_id": "2612",
  "district_name": "洛南县",
  "spell": "luonanxian",
  "easy_spell": "lnx",
  "city_id": "297" },

{
  "district_id": "2613",
  "district_name": "丹凤县",
  "spell": "danfengxian",
  "easy_spell": "dfx",
  "city_id": "297" },

{
  "district_id": "2614",
  "district_name": "商南县",
  "spell": "shangnanxian",
  "easy_spell": "snx",
  "city_id": "297" },

{
  "district_id": "2615",
  "district_name": "山阳县",
  "spell": "shanyangxian",
  "easy_spell": "syx",
  "city_id": "297" },

{
  "district_id": "2616",
  "district_name": "镇安县",
  "spell": "zhenanxian",
  "easy_spell": "zax",
  "city_id": "297" },

{
  "district_id": "2617",
  "district_name": "柞水县",
  "spell": "zuoshuixian",
  "easy_spell": "zsx",
  "city_id": "297" },

{
  "district_id": "2618",
  "district_name": "城关区",
  "spell": "chengguanqu",
  "easy_spell": "cgq",
  "city_id": "298" },

{
  "district_id": "2619",
  "district_name": "七里河区",
  "spell": "qilihequ",
  "easy_spell": "qlhq",
  "city_id": "298" },

{
  "district_id": "2620",
  "district_name": "西固区",
  "spell": "xiguqu",
  "easy_spell": "xgq",
  "city_id": "298" },

{
  "district_id": "2621",
  "district_name": "安宁区",
  "spell": "anningqu",
  "easy_spell": "anq",
  "city_id": "298" },

{
  "district_id": "2622",
  "district_name": "红古区",
  "spell": "hongguqu",
  "easy_spell": "hgq",
  "city_id": "298" },

{
  "district_id": "2623",
  "district_name": "永登县",
  "spell": "yongdengxian",
  "easy_spell": "ydx",
  "city_id": "298" },

{
  "district_id": "2624",
  "district_name": "皋兰县",
  "spell": "gaolanxian",
  "easy_spell": "glx",
  "city_id": "298" },

{
  "district_id": "2625",
  "district_name": "榆中县",
  "spell": "yuzhongxian",
  "easy_spell": "yzx",
  "city_id": "298" },

{
  "district_id": "2626",
  "district_name": "金川区",
  "spell": "jinchuanqu",
  "easy_spell": "jcq",
  "city_id": "300" },

{
  "district_id": "2627",
  "district_name": "永昌县",
  "spell": "yongchangxian",
  "easy_spell": "ycx",
  "city_id": "300" },

{
  "district_id": "2628",
  "district_name": "白银区",
  "spell": "baiyinqu",
  "easy_spell": "byq",
  "city_id": "301" },

{
  "district_id": "2629",
  "district_name": "平川区",
  "spell": "pingchuanqu",
  "easy_spell": "pcq",
  "city_id": "301" },

{
  "district_id": "2630",
  "district_name": "靖远县",
  "spell": "jingyuanxian",
  "easy_spell": "jyx",
  "city_id": "301" },

{
  "district_id": "2631",
  "district_name": "会宁县",
  "spell": "huiningxian",
  "easy_spell": "hnx",
  "city_id": "301" },

{
  "district_id": "2632",
  "district_name": "景泰县",
  "spell": "jingtaixian",
  "easy_spell": "jtx",
  "city_id": "301" },

{
  "district_id": "2633",
  "district_name": "秦城区",
  "spell": "qinchengqu",
  "easy_spell": "qcq",
  "city_id": "302" },

{
  "district_id": "2634",
  "district_name": "北道区",
  "spell": "beidaoqu",
  "easy_spell": "bdq",
  "city_id": "302" },

{
  "district_id": "2635",
  "district_name": "清水县",
  "spell": "qingshuixian",
  "easy_spell": "qsx",
  "city_id": "302" },

{
  "district_id": "2636",
  "district_name": "秦安县",
  "spell": "qinanxian",
  "easy_spell": "qax",
  "city_id": "302" },

{
  "district_id": "2637",
  "district_name": "甘谷县",
  "spell": "ganguxian",
  "easy_spell": "ggx",
  "city_id": "302" },

{
  "district_id": "2638",
  "district_name": "武山县",
  "spell": "wushanxian",
  "easy_spell": "wsx",
  "city_id": "302" },

{
  "district_id": "2639",
  "district_name": "张家川回族自治县",
  "spell": "zhangjiachuanhuizuzizhixian",
  "easy_spell": "zjchzzzx",
  "city_id": "302" },

{
  "district_id": "2640",
  "district_name": "凉州区",
  "spell": "liangzhouqu",
  "easy_spell": "lzq",
  "city_id": "303" },

{
  "district_id": "2641",
  "district_name": "民勤县",
  "spell": "minqinxian",
  "easy_spell": "mqx",
  "city_id": "303" },

{
  "district_id": "2642",
  "district_name": "古浪县",
  "spell": "gulangxian",
  "easy_spell": "glx",
  "city_id": "303" },

{
  "district_id": "2643",
  "district_name": "天祝藏族自治县",
  "spell": "tianzhucangzuzizhixian",
  "easy_spell": "tzczzzx",
  "city_id": "303" },

{
  "district_id": "2644",
  "district_name": "甘州区",
  "spell": "ganzhouqu",
  "easy_spell": "gzq",
  "city_id": "304" },

{
  "district_id": "2645",
  "district_name": "肃南裕固族自治县",
  "spell": "sunanyuguzuzizhixian",
  "easy_spell": "snygzzzx",
  "city_id": "304" },

{
  "district_id": "2646",
  "district_name": "民乐县",
  "spell": "minlexian",
  "easy_spell": "mlx",
  "city_id": "304" },

{
  "district_id": "2647",
  "district_name": "临泽县",
  "spell": "linzexian",
  "easy_spell": "lzx",
  "city_id": "304" },

{
  "district_id": "2648",
  "district_name": "高台县",
  "spell": "gaotaixian",
  "easy_spell": "gtx",
  "city_id": "304" },

{
  "district_id": "2649",
  "district_name": "山丹县",
  "spell": "shandanxian",
  "easy_spell": "sdx",
  "city_id": "304" },

{
  "district_id": "2650",
  "district_name": "崆峒区",
  "spell": "zuozuoqu",
  "easy_spell": "zzq",
  "city_id": "305" },

{
  "district_id": "2651",
  "district_name": "泾川县",
  "spell": "zuochuanxian",
  "easy_spell": "zcx",
  "city_id": "305" },

{
  "district_id": "2652",
  "district_name": "灵台县",
  "spell": "lingtaixian",
  "easy_spell": "ltx",
  "city_id": "305" },

{
  "district_id": "2653",
  "district_name": "崇信县",
  "spell": "chongxinxian",
  "easy_spell": "cxx",
  "city_id": "305" },

{
  "district_id": "2654",
  "district_name": "华亭县",
  "spell": "huatingxian",
  "easy_spell": "htx",
  "city_id": "305" },

{
  "district_id": "2655",
  "district_name": "庄浪县",
  "spell": "zhuanglangxian",
  "easy_spell": "zlx",
  "city_id": "305" },

{
  "district_id": "2656",
  "district_name": "静宁县",
  "spell": "jingningxian",
  "easy_spell": "jnx",
  "city_id": "305" },

{
  "district_id": "2657",
  "district_name": "肃州区",
  "spell": "suzhouqu",
  "easy_spell": "szq",
  "city_id": "306" },

{
  "district_id": "2658",
  "district_name": "金塔县",
  "spell": "jintaxian",
  "easy_spell": "jtx",
  "city_id": "306" },

{
  "district_id": "2659",
  "district_name": "安西县",
  "spell": "anxixian",
  "easy_spell": "axx",
  "city_id": "306" },

{
  "district_id": "2660",
  "district_name": "肃北蒙古族自治县",
  "spell": "subeimengguzuzizhixian",
  "easy_spell": "sbmgzzzx",
  "city_id": "306" },

{
  "district_id": "2661",
  "district_name": "阿克塞哈萨克族自治县",
  "spell": "akesaihasakezuzizhixian",
  "easy_spell": "akshskzzzx",
  "city_id": "306" },

{
  "district_id": "2662",
  "district_name": "玉门市",
  "spell": "yumenshi",
  "easy_spell": "yms",
  "city_id": "306" },

{
  "district_id": "2663",
  "district_name": "敦煌市",
  "spell": "dunhuangshi",
  "easy_spell": "dhs",
  "city_id": "306" },

{
  "district_id": "2664",
  "district_name": "西峰区",
  "spell": "xifengqu",
  "easy_spell": "xfq",
  "city_id": "307" },

{
  "district_id": "2665",
  "district_name": "庆城县",
  "spell": "qingchengxian",
  "easy_spell": "qcx",
  "city_id": "307" },

{
  "district_id": "2666",
  "district_name": "环县",
  "spell": "huanxian",
  "easy_spell": "hx",
  "city_id": "307" },

{
  "district_id": "2667",
  "district_name": "华池县",
  "spell": "huachixian",
  "easy_spell": "hcx",
  "city_id": "307" },

{
  "district_id": "2668",
  "district_name": "合水县",
  "spell": "heshuixian",
  "easy_spell": "hsx",
  "city_id": "307" },

{
  "district_id": "2669",
  "district_name": "正宁县",
  "spell": "zhengningxian",
  "easy_spell": "znx",
  "city_id": "307" },

{
  "district_id": "2670",
  "district_name": "宁县",
  "spell": "ningxian",
  "easy_spell": "nx",
  "city_id": "307" },

{
  "district_id": "2671",
  "district_name": "镇原县",
  "spell": "zhenyuanxian",
  "easy_spell": "zyx",
  "city_id": "307" },

{
  "district_id": "2672",
  "district_name": "安定区",
  "spell": "andingqu",
  "easy_spell": "adq",
  "city_id": "308" },

{
  "district_id": "2673",
  "district_name": "通渭县",
  "spell": "tongweixian",
  "easy_spell": "twx",
  "city_id": "308" },

{
  "district_id": "2674",
  "district_name": "陇西县",
  "spell": "longxixian",
  "easy_spell": "lxx",
  "city_id": "308" },

{
  "district_id": "2675",
  "district_name": "渭源县",
  "spell": "weiyuanxian",
  "easy_spell": "wyx",
  "city_id": "308" },

{
  "district_id": "2676",
  "district_name": "临洮县",
  "spell": "linzuoxian",
  "easy_spell": "lzx",
  "city_id": "308" },

{
  "district_id": "2677",
  "district_name": "漳县",
  "spell": "zhangxian",
  "easy_spell": "zx",
  "city_id": "308" },

{
  "district_id": "2678",
  "district_name": "岷县",
  "spell": "zuoxian",
  "easy_spell": "zx",
  "city_id": "308" },

{
  "district_id": "2679",
  "district_name": "武都区",
  "spell": "wuduqu",
  "easy_spell": "wdq",
  "city_id": "309" },

{
  "district_id": "2680",
  "district_name": "成县",
  "spell": "chengxian",
  "easy_spell": "cx",
  "city_id": "309" },

{
  "district_id": "2681",
  "district_name": "文县",
  "spell": "wenxian",
  "easy_spell": "wx",
  "city_id": "309" },

{
  "district_id": "2682",
  "district_name": "宕昌县",
  "spell": "zuochangxian",
  "easy_spell": "zcx",
  "city_id": "309" },

{
  "district_id": "2683",
  "district_name": "康县",
  "spell": "kangxian",
  "easy_spell": "kx",
  "city_id": "309" },

{
  "district_id": "2684",
  "district_name": "西和县",
  "spell": "xihexian",
  "easy_spell": "xhx",
  "city_id": "309" },

{
  "district_id": "2685",
  "district_name": "礼县",
  "spell": "lixian",
  "easy_spell": "lx",
  "city_id": "309" },

{
  "district_id": "2686",
  "district_name": "徽县",
  "spell": "huixian",
  "easy_spell": "hx",
  "city_id": "309" },

{
  "district_id": "2687",
  "district_name": "两当县",
  "spell": "liangdangxian",
  "easy_spell": "ldx",
  "city_id": "309" },

{
  "district_id": "2688",
  "district_name": "临夏市",
  "spell": "linxiashi",
  "easy_spell": "lxs",
  "city_id": "310" },

{
  "district_id": "2689",
  "district_name": "临夏县",
  "spell": "linxiaxian",
  "easy_spell": "lxx",
  "city_id": "310" },

{
  "district_id": "2690",
  "district_name": "康乐县",
  "spell": "kanglexian",
  "easy_spell": "klx",
  "city_id": "310" },

{
  "district_id": "2691",
  "district_name": "永靖县",
  "spell": "yongjingxian",
  "easy_spell": "yjx",
  "city_id": "310" },

{
  "district_id": "2692",
  "district_name": "广河县",
  "spell": "guanghexian",
  "easy_spell": "ghx",
  "city_id": "310" },

{
  "district_id": "2693",
  "district_name": "和政县",
  "spell": "hezhengxian",
  "easy_spell": "hzx",
  "city_id": "310" },

{
  "district_id": "2694",
  "district_name": "东乡族自治县",
  "spell": "dongxiangzuzizhixian",
  "easy_spell": "dxzzzx",
  "city_id": "310" },

{
  "district_id": "2695",
  "district_name": "积石山保安族东乡族撒拉族自治县",
  "spell": "jishishanbaoanzudongxiangzusalazuzizhixian",
  "easy_spell": "jssbazdxzslzzzx",
  "city_id": "310" },

{
  "district_id": "2696",
  "district_name": "合作市",
  "spell": "hezuoshi",
  "easy_spell": "hzs",
  "city_id": "311" },

{
  "district_id": "2697",
  "district_name": "临潭县",
  "spell": "lintanxian",
  "easy_spell": "ltx",
  "city_id": "311" },

{
  "district_id": "2698",
  "district_name": "卓尼县",
  "spell": "zhuonixian",
  "easy_spell": "znx",
  "city_id": "311" },

{
  "district_id": "2699",
  "district_name": "舟曲县",
  "spell": "zhouquxian",
  "easy_spell": "zqx",
  "city_id": "311" },

{
  "district_id": "2700",
  "district_name": "迭部县",
  "spell": "diebuxian",
  "easy_spell": "dbx",
  "city_id": "311" },

{
  "district_id": "2701",
  "district_name": "玛曲县",
  "spell": "maquxian",
  "easy_spell": "mqx",
  "city_id": "311" },

{
  "district_id": "2702",
  "district_name": "碌曲县",
  "spell": "luquxian",
  "easy_spell": "lqx",
  "city_id": "311" },

{
  "district_id": "2703",
  "district_name": "夏河县",
  "spell": "xiahexian",
  "easy_spell": "xhx",
  "city_id": "311" },

{
  "district_id": "2704",
  "district_name": "城东区",
  "spell": "chengdongqu",
  "easy_spell": "cdq",
  "city_id": "312" },

{
  "district_id": "2705",
  "district_name": "城中区",
  "spell": "chengzhongqu",
  "easy_spell": "czq",
  "city_id": "312" },

{
  "district_id": "2706",
  "district_name": "城西区",
  "spell": "chengxiqu",
  "easy_spell": "cxq",
  "city_id": "312" },

{
  "district_id": "2707",
  "district_name": "城北区",
  "spell": "chengbeiqu",
  "easy_spell": "cbq",
  "city_id": "312" },

{
  "district_id": "2708",
  "district_name": "大通回族土族自治县",
  "spell": "datonghuizutuzuzizhixian",
  "easy_spell": "dthztzzzx",
  "city_id": "312" },

{
  "district_id": "2709",
  "district_name": "湟中县",
  "spell": "zuozhongxian",
  "easy_spell": "zzx",
  "city_id": "312" },

{
  "district_id": "2710",
  "district_name": "湟源县",
  "spell": "zuoyuanxian",
  "easy_spell": "zyx",
  "city_id": "312" },

{
  "district_id": "2711",
  "district_name": "平安县",
  "spell": "pinganxian",
  "easy_spell": "pax",
  "city_id": "313" },

{
  "district_id": "2712",
  "district_name": "民和回族土族自治县",
  "spell": "minhehuizutuzuzizhixian",
  "easy_spell": "mhhztzzzx",
  "city_id": "313" },

{
  "district_id": "2713",
  "district_name": "乐都县",
  "spell": "leduxian",
  "easy_spell": "ldx",
  "city_id": "313" },

{
  "district_id": "2714",
  "district_name": "互助土族自治县",
  "spell": "huzhutuzuzizhixian",
  "easy_spell": "hztzzzx",
  "city_id": "313" },

{
  "district_id": "2715",
  "district_name": "化隆回族自治县",
  "spell": "hualonghuizuzizhixian",
  "easy_spell": "hlhzzzx",
  "city_id": "313" },

{
  "district_id": "2716",
  "district_name": "循化撒拉族自治县",
  "spell": "xunhuasalazuzizhixian",
  "easy_spell": "xhslzzzx",
  "city_id": "313" },

{
  "district_id": "2717",
  "district_name": "门源回族自治县",
  "spell": "menyuanhuizuzizhixian",
  "easy_spell": "myhzzzx",
  "city_id": "314" },

{
  "district_id": "2718",
  "district_name": "祁连县",
  "spell": "qilianxian",
  "easy_spell": "qlx",
  "city_id": "314" },

{
  "district_id": "2719",
  "district_name": "海晏县",
  "spell": "haizuoxian",
  "easy_spell": "hzx",
  "city_id": "314" },

{
  "district_id": "2720",
  "district_name": "刚察县",
  "spell": "gangchaxian",
  "easy_spell": "gcx",
  "city_id": "314" },

{
  "district_id": "2721",
  "district_name": "同仁县",
  "spell": "tongrenxian",
  "easy_spell": "trx",
  "city_id": "315" },

{
  "district_id": "2722",
  "district_name": "尖扎县",
  "spell": "jianzhaxian",
  "easy_spell": "jzx",
  "city_id": "315" },

{
  "district_id": "2723",
  "district_name": "泽库县",
  "spell": "zekuxian",
  "easy_spell": "zkx",
  "city_id": "315" },

{
  "district_id": "2724",
  "district_name": "河南蒙古族自治县",
  "spell": "henanmengguzuzizhixian",
  "easy_spell": "hnmgzzzx",
  "city_id": "315" },

{
  "district_id": "2725",
  "district_name": "共和县",
  "spell": "gonghexian",
  "easy_spell": "ghx",
  "city_id": "316" },

{
  "district_id": "2726",
  "district_name": "同德县",
  "spell": "tongdexian",
  "easy_spell": "tdx",
  "city_id": "316" },

{
  "district_id": "2727",
  "district_name": "贵德县",
  "spell": "guidexian",
  "easy_spell": "gdx",
  "city_id": "316" },

{
  "district_id": "2728",
  "district_name": "兴海县",
  "spell": "xinghaixian",
  "easy_spell": "xhx",
  "city_id": "316" },

{
  "district_id": "2729",
  "district_name": "贵南县",
  "spell": "guinanxian",
  "easy_spell": "gnx",
  "city_id": "316" },

{
  "district_id": "2730",
  "district_name": "玛沁县",
  "spell": "maqinxian",
  "easy_spell": "mqx",
  "city_id": "317" },

{
  "district_id": "2731",
  "district_name": "班玛县",
  "spell": "banmaxian",
  "easy_spell": "bmx",
  "city_id": "317" },

{
  "district_id": "2732",
  "district_name": "甘德县",
  "spell": "gandexian",
  "easy_spell": "gdx",
  "city_id": "317" },

{
  "district_id": "2733",
  "district_name": "达日县",
  "spell": "darixian",
  "easy_spell": "drx",
  "city_id": "317" },

{
  "district_id": "2734",
  "district_name": "久治县",
  "spell": "jiuzhixian",
  "easy_spell": "jzx",
  "city_id": "317" },

{
  "district_id": "2735",
  "district_name": "玛多县",
  "spell": "maduoxian",
  "easy_spell": "mdx",
  "city_id": "317" },

{
  "district_id": "2736",
  "district_name": "玉树县",
  "spell": "yushuxian",
  "easy_spell": "ysx",
  "city_id": "318" },

{
  "district_id": "2737",
  "district_name": "杂多县",
  "spell": "zaduoxian",
  "easy_spell": "zdx",
  "city_id": "318" },

{
  "district_id": "2738",
  "district_name": "称多县",
  "spell": "chengduoxian",
  "easy_spell": "cdx",
  "city_id": "318" },

{
  "district_id": "2739",
  "district_name": "治多县",
  "spell": "zhiduoxian",
  "easy_spell": "zdx",
  "city_id": "318" },

{
  "district_id": "2740",
  "district_name": "囊谦县",
  "spell": "nangqianxian",
  "easy_spell": "nqx",
  "city_id": "318" },

{
  "district_id": "2741",
  "district_name": "曲麻莱县",
  "spell": "qumalaixian",
  "easy_spell": "qmlx",
  "city_id": "318" },

{
  "district_id": "2742",
  "district_name": "格尔木市",
  "spell": "geermushi",
  "easy_spell": "gems",
  "city_id": "319" },

{
  "district_id": "2743",
  "district_name": "德令哈市",
  "spell": "delinghashi",
  "easy_spell": "dlhs",
  "city_id": "319" },

{
  "district_id": "2744",
  "district_name": "乌兰县",
  "spell": "wulanxian",
  "easy_spell": "wlx",
  "city_id": "319" },

{
  "district_id": "2745",
  "district_name": "都兰县",
  "spell": "dulanxian",
  "easy_spell": "dlx",
  "city_id": "319" },

{
  "district_id": "2746",
  "district_name": "天峻县",
  "spell": "tianjunxian",
  "easy_spell": "tjx",
  "city_id": "319" },

{
  "district_id": "2747",
  "district_name": "兴庆区",
  "spell": "xingqingqu",
  "easy_spell": "xqq",
  "city_id": "320" },

{
  "district_id": "2748",
  "district_name": "西夏区",
  "spell": "xixiaqu",
  "easy_spell": "xxq",
  "city_id": "320" },

{
  "district_id": "2749",
  "district_name": "金凤区",
  "spell": "jinfengqu",
  "easy_spell": "jfq",
  "city_id": "320" },

{
  "district_id": "2750",
  "district_name": "永宁县",
  "spell": "yongningxian",
  "easy_spell": "ynx",
  "city_id": "320" },

{
  "district_id": "2751",
  "district_name": "贺兰县",
  "spell": "helanxian",
  "easy_spell": "hlx",
  "city_id": "320" },

{
  "district_id": "2752",
  "district_name": "灵武市",
  "spell": "lingwushi",
  "easy_spell": "lws",
  "city_id": "320" },

{
  "district_id": "2753",
  "district_name": "大武口区",
  "spell": "dawukouqu",
  "easy_spell": "dwkq",
  "city_id": "321" },

{
  "district_id": "2754",
  "district_name": "惠农区",
  "spell": "huinongqu",
  "easy_spell": "hnq",
  "city_id": "321" },

{
  "district_id": "2755",
  "district_name": "平罗县",
  "spell": "pingluoxian",
  "easy_spell": "plx",
  "city_id": "321" },

{
  "district_id": "2756",
  "district_name": "利通区",
  "spell": "litongqu",
  "easy_spell": "ltq",
  "city_id": "322" },

{
  "district_id": "2757",
  "district_name": "盐池县",
  "spell": "yanchixian",
  "easy_spell": "ycx",
  "city_id": "322" },

{
  "district_id": "2758",
  "district_name": "同心县",
  "spell": "tongxinxian",
  "easy_spell": "txx",
  "city_id": "322" },

{
  "district_id": "2759",
  "district_name": "青铜峡市",
  "spell": "qingtongxiashi",
  "easy_spell": "qtxs",
  "city_id": "322" },

{
  "district_id": "2760",
  "district_name": "原州区",
  "spell": "yuanzhouqu",
  "easy_spell": "yzq",
  "city_id": "323" },

{
  "district_id": "2761",
  "district_name": "西吉县",
  "spell": "xijixian",
  "easy_spell": "xjx",
  "city_id": "323" },

{
  "district_id": "2762",
  "district_name": "隆德县",
  "spell": "longdexian",
  "easy_spell": "ldx",
  "city_id": "323" },

{
  "district_id": "2763",
  "district_name": "泾源县",
  "spell": "zuoyuanxian",
  "easy_spell": "zyx",
  "city_id": "323" },

{
  "district_id": "2764",
  "district_name": "彭阳县",
  "spell": "pengyangxian",
  "easy_spell": "pyx",
  "city_id": "323" },

{
  "district_id": "2765",
  "district_name": "沙坡头区",
  "spell": "shapotouqu",
  "easy_spell": "sptq",
  "city_id": "324" },

{
  "district_id": "2766",
  "district_name": "中宁县",
  "spell": "zhongningxian",
  "easy_spell": "znx",
  "city_id": "324" },

{
  "district_id": "2767",
  "district_name": "海原县",
  "spell": "haiyuanxian",
  "easy_spell": "hyx",
  "city_id": "324" },

{
  "district_id": "2768",
  "district_name": "天山区",
  "spell": "tianshanqu",
  "easy_spell": "tsq",
  "city_id": "325" },

{
  "district_id": "2769",
  "district_name": "沙依巴克区",
  "spell": "shayibakequ",
  "easy_spell": "sybkq",
  "city_id": "325" },

{
  "district_id": "2770",
  "district_name": "新市区",
  "spell": "xinshiqu",
  "easy_spell": "xsq",
  "city_id": "325" },

{
  "district_id": "2771",
  "district_name": "水磨沟区",
  "spell": "shuimogouqu",
  "easy_spell": "smgq",
  "city_id": "325" },

{
  "district_id": "2772",
  "district_name": "头屯河区",
  "spell": "toutunhequ",
  "easy_spell": "tthq",
  "city_id": "325" },

{
  "district_id": "2773",
  "district_name": "达坂城区",
  "spell": "dazuochengqu",
  "easy_spell": "dzcq",
  "city_id": "325" },

{
  "district_id": "2774",
  "district_name": "东山区",
  "spell": "dongshanqu",
  "easy_spell": "dsq",
  "city_id": "325" },

{
  "district_id": "2775",
  "district_name": "乌鲁木齐县",
  "spell": "wulumuqixian",
  "easy_spell": "wlmqx",
  "city_id": "325" },

{
  "district_id": "2776",
  "district_name": "独山子区",
  "spell": "dushanziqu",
  "easy_spell": "dszq",
  "city_id": "326" },

{
  "district_id": "2777",
  "district_name": "克拉玛依区",
  "spell": "kelamayiqu",
  "easy_spell": "klmyq",
  "city_id": "326" },

{
  "district_id": "2778",
  "district_name": "白碱滩区",
  "spell": "baijiantanqu",
  "easy_spell": "bjtq",
  "city_id": "326" },

{
  "district_id": "2779",
  "district_name": "乌尔禾区",
  "spell": "wuerhequ",
  "easy_spell": "wehq",
  "city_id": "326" },

{
  "district_id": "2780",
  "district_name": "吐鲁番市",
  "spell": "tulufanshi",
  "easy_spell": "tlfs",
  "city_id": "327" },

{
  "district_id": "2781",
  "district_name": "鄯善县",
  "spell": "zuoshanxian",
  "easy_spell": "zsx",
  "city_id": "327" },

{
  "district_id": "2782",
  "district_name": "托克逊县",
  "spell": "tuokexunxian",
  "easy_spell": "tkxx",
  "city_id": "327" },

{
  "district_id": "2783",
  "district_name": "哈密市",
  "spell": "hamishi",
  "easy_spell": "hms",
  "city_id": "328" },

{
  "district_id": "2784",
  "district_name": "巴里坤哈萨克自治县",
  "spell": "balikunhasakezizhixian",
  "easy_spell": "blkhskzzx",
  "city_id": "328" },

{
  "district_id": "2785",
  "district_name": "伊吾县",
  "spell": "yiwuxian",
  "easy_spell": "ywx",
  "city_id": "328" },

{
  "district_id": "2786",
  "district_name": "昌吉市",
  "spell": "changjishi",
  "easy_spell": "cjs",
  "city_id": "329" },

{
  "district_id": "2787",
  "district_name": "阜康市",
  "spell": "fukangshi",
  "easy_spell": "fks",
  "city_id": "329" },

{
  "district_id": "2788",
  "district_name": "米泉市",
  "spell": "miquanshi",
  "easy_spell": "mqs",
  "city_id": "329" },

{
  "district_id": "2789",
  "district_name": "呼图壁县",
  "spell": "hutubixian",
  "easy_spell": "htbx",
  "city_id": "329" },

{
  "district_id": "2790",
  "district_name": "玛纳斯县",
  "spell": "manasixian",
  "easy_spell": "mnsx",
  "city_id": "329" },

{
  "district_id": "2791",
  "district_name": "奇台县",
  "spell": "qitaixian",
  "easy_spell": "qtx",
  "city_id": "329" },

{
  "district_id": "2792",
  "district_name": "吉木萨尔县",
  "spell": "jimusaerxian",
  "easy_spell": "jmsex",
  "city_id": "329" },

{
  "district_id": "2793",
  "district_name": "木垒哈萨克自治县",
  "spell": "muleihasakezizhixian",
  "easy_spell": "mlhskzzx",
  "city_id": "329" },

{
  "district_id": "2794",
  "district_name": "博乐市",
  "spell": "boleshi",
  "easy_spell": "bls",
  "city_id": "330" },

{
  "district_id": "2795",
  "district_name": "精河县",
  "spell": "jinghexian",
  "easy_spell": "jhx",
  "city_id": "330" },

{
  "district_id": "2796",
  "district_name": "温泉县",
  "spell": "wenquanxian",
  "easy_spell": "wqx",
  "city_id": "330" },

{
  "district_id": "2797",
  "district_name": "库尔勒市",
  "spell": "kuerleshi",
  "easy_spell": "kels",
  "city_id": "331" },

{
  "district_id": "2798",
  "district_name": "轮台县",
  "spell": "luntaixian",
  "easy_spell": "ltx",
  "city_id": "331" },

{
  "district_id": "2799",
  "district_name": "尉犁县",
  "spell": "weilixian",
  "easy_spell": "wlx",
  "city_id": "331" },

{
  "district_id": "2800",
  "district_name": "若羌县",
  "spell": "ruoqiangxian",
  "easy_spell": "rqx",
  "city_id": "331" },

{
  "district_id": "2801",
  "district_name": "且末县",
  "spell": "qiemoxian",
  "easy_spell": "qmx",
  "city_id": "331" },

{
  "district_id": "2802",
  "district_name": "焉耆回族自治县",
  "spell": "yanzuohuizuzizhixian",
  "easy_spell": "yzhzzzx",
  "city_id": "331" },

{
  "district_id": "2803",
  "district_name": "和静县",
  "spell": "hejingxian",
  "easy_spell": "hjx",
  "city_id": "331" },

{
  "district_id": "2804",
  "district_name": "和硕县",
  "spell": "heshuoxian",
  "easy_spell": "hsx",
  "city_id": "331" },

{
  "district_id": "2805",
  "district_name": "博湖县",
  "spell": "bohuxian",
  "easy_spell": "bhx",
  "city_id": "331" },

{
  "district_id": "2806",
  "district_name": "阿克苏市",
  "spell": "akesushi",
  "easy_spell": "akss",
  "city_id": "332" },

{
  "district_id": "2807",
  "district_name": "温宿县",
  "spell": "wensuxian",
  "easy_spell": "wsx",
  "city_id": "332" },

{
  "district_id": "2808",
  "district_name": "库车县",
  "spell": "kuchexian",
  "easy_spell": "kcx",
  "city_id": "332" },

{
  "district_id": "2809",
  "district_name": "沙雅县",
  "spell": "shayaxian",
  "easy_spell": "syx",
  "city_id": "332" },

{
  "district_id": "2810",
  "district_name": "新和县",
  "spell": "xinhexian",
  "easy_spell": "xhx",
  "city_id": "332" },

{
  "district_id": "2811",
  "district_name": "拜城县",
  "spell": "baichengxian",
  "easy_spell": "bcx",
  "city_id": "332" },

{
  "district_id": "2812",
  "district_name": "乌什县",
  "spell": "wushixian",
  "easy_spell": "wsx",
  "city_id": "332" },

{
  "district_id": "2813",
  "district_name": "阿瓦提县",
  "spell": "awatixian",
  "easy_spell": "awtx",
  "city_id": "332" },

{
  "district_id": "2814",
  "district_name": "柯坪县",
  "spell": "kepingxian",
  "easy_spell": "kpx",
  "city_id": "332" },

{
  "district_id": "2815",
  "district_name": "阿图什市",
  "spell": "atushishi",
  "easy_spell": "atss",
  "city_id": "333" },

{
  "district_id": "2816",
  "district_name": "阿克陶县",
  "spell": "aketaoxian",
  "easy_spell": "aktx",
  "city_id": "333" },

{
  "district_id": "2817",
  "district_name": "阿合奇县",
  "spell": "aheqixian",
  "easy_spell": "ahqx",
  "city_id": "333" },

{
  "district_id": "2818",
  "district_name": "乌恰县",
  "spell": "wuqiaxian",
  "easy_spell": "wqx",
  "city_id": "333" },

{
  "district_id": "2819",
  "district_name": "喀什市",
  "spell": "kashishi",
  "easy_spell": "kss",
  "city_id": "334" },

{
  "district_id": "2820",
  "district_name": "疏附县",
  "spell": "shufuxian",
  "easy_spell": "sfx",
  "city_id": "334" },

{
  "district_id": "2821",
  "district_name": "疏勒县",
  "spell": "shulexian",
  "easy_spell": "slx",
  "city_id": "334" },

{
  "district_id": "2822",
  "district_name": "英吉沙县",
  "spell": "yingjishaxian",
  "easy_spell": "yjsx",
  "city_id": "334" },

{
  "district_id": "2823",
  "district_name": "泽普县",
  "spell": "zepuxian",
  "easy_spell": "zpx",
  "city_id": "334" },

{
  "district_id": "2824",
  "district_name": "莎车县",
  "spell": "shachexian",
  "easy_spell": "scx",
  "city_id": "334" },

{
  "district_id": "2825",
  "district_name": "叶城县",
  "spell": "yechengxian",
  "easy_spell": "ycx",
  "city_id": "334" },

{
  "district_id": "2826",
  "district_name": "麦盖提县",
  "spell": "maigaitixian",
  "easy_spell": "mgtx",
  "city_id": "334" },

{
  "district_id": "2827",
  "district_name": "岳普湖县",
  "spell": "yuepuhuxian",
  "easy_spell": "yphx",
  "city_id": "334" },

{
  "district_id": "2828",
  "district_name": "伽师县",
  "spell": "zuoshixian",
  "easy_spell": "zsx",
  "city_id": "334" },

{
  "district_id": "2829",
  "district_name": "巴楚县",
  "spell": "bachuxian",
  "easy_spell": "bcx",
  "city_id": "334" },

{
  "district_id": "2830",
  "district_name": "塔什库尔干塔吉克自治县",
  "spell": "tashikuergantajikezizhixian",
  "easy_spell": "tskegtjkzzx",
  "city_id": "334" },

{
  "district_id": "2831",
  "district_name": "和田市",
  "spell": "hetianshi",
  "easy_spell": "hts",
  "city_id": "335" },

{
  "district_id": "2832",
  "district_name": "和田县",
  "spell": "hetianxian",
  "easy_spell": "htx",
  "city_id": "335" },

{
  "district_id": "2833",
  "district_name": "墨玉县",
  "spell": "moyuxian",
  "easy_spell": "myx",
  "city_id": "335" },

{
  "district_id": "2834",
  "district_name": "皮山县",
  "spell": "pishanxian",
  "easy_spell": "psx",
  "city_id": "335" },

{
  "district_id": "2835",
  "district_name": "洛浦县",
  "spell": "luopuxian",
  "easy_spell": "lpx",
  "city_id": "335" },

{
  "district_id": "2836",
  "district_name": "策勒县",
  "spell": "celexian",
  "easy_spell": "clx",
  "city_id": "335" },

{
  "district_id": "2837",
  "district_name": "于田县",
  "spell": "yutianxian",
  "easy_spell": "ytx",
  "city_id": "335" },

{
  "district_id": "2838",
  "district_name": "民丰县",
  "spell": "minfengxian",
  "easy_spell": "mfx",
  "city_id": "335" },

{
  "district_id": "2839",
  "district_name": "伊宁市",
  "spell": "yiningshi",
  "easy_spell": "yns",
  "city_id": "336" },

{
  "district_id": "2840",
  "district_name": "奎屯市",
  "spell": "kuitunshi",
  "easy_spell": "kts",
  "city_id": "336" },

{
  "district_id": "2841",
  "district_name": "伊宁县",
  "spell": "yiningxian",
  "easy_spell": "ynx",
  "city_id": "336" },

{
  "district_id": "2842",
  "district_name": "察布查尔锡伯自治县",
  "spell": "chabuchaerxibozizhixian",
  "easy_spell": "cbcexbzzx",
  "city_id": "336" },

{
  "district_id": "2843",
  "district_name": "霍城县",
  "spell": "huochengxian",
  "easy_spell": "hcx",
  "city_id": "336" },

{
  "district_id": "2844",
  "district_name": "巩留县",
  "spell": "gongliuxian",
  "easy_spell": "glx",
  "city_id": "336" },

{
  "district_id": "2845",
  "district_name": "新源县",
  "spell": "xinyuanxian",
  "easy_spell": "xyx",
  "city_id": "336" },

{
  "district_id": "2846",
  "district_name": "昭苏县",
  "spell": "zhaosuxian",
  "easy_spell": "zsx",
  "city_id": "336" },

{
  "district_id": "2847",
  "district_name": "特克斯县",
  "spell": "tekesixian",
  "easy_spell": "tksx",
  "city_id": "336" },

{
  "district_id": "2848",
  "district_name": "尼勒克县",
  "spell": "nilekexian",
  "easy_spell": "nlkx",
  "city_id": "336" },

{
  "district_id": "2849",
  "district_name": "塔城市",
  "spell": "tachengshi",
  "easy_spell": "tcs",
  "city_id": "337" },

{
  "district_id": "2850",
  "district_name": "乌苏市",
  "spell": "wusushi",
  "easy_spell": "wss",
  "city_id": "337" },

{
  "district_id": "2851",
  "district_name": "额敏县",
  "spell": "eminxian",
  "easy_spell": "emx",
  "city_id": "337" },

{
  "district_id": "2852",
  "district_name": "沙湾县",
  "spell": "shawanxian",
  "easy_spell": "swx",
  "city_id": "337" },

{
  "district_id": "2853",
  "district_name": "托里县",
  "spell": "tuolixian",
  "easy_spell": "tlx",
  "city_id": "337" },

{
  "district_id": "2854",
  "district_name": "裕民县",
  "spell": "yuminxian",
  "easy_spell": "ymx",
  "city_id": "337" },

{
  "district_id": "2855",
  "district_name": "和布克赛尔蒙古自治县",
  "spell": "hebukesaiermengguzizhixian",
  "easy_spell": "hbksemgzzx",
  "city_id": "337" },

{
  "district_id": "2856",
  "district_name": "阿勒泰市",
  "spell": "aletaishi",
  "easy_spell": "alts",
  "city_id": "338" },

{
  "district_id": "2857",
  "district_name": "布尔津县",
  "spell": "buerjinxian",
  "easy_spell": "bejx",
  "city_id": "338" },

{
  "district_id": "2858",
  "district_name": "富蕴县",
  "spell": "fuyunxian",
  "easy_spell": "fyx",
  "city_id": "338" },

{
  "district_id": "2859",
  "district_name": "福海县",
  "spell": "fuhaixian",
  "easy_spell": "fhx",
  "city_id": "338" },

{
  "district_id": "2860",
  "district_name": "哈巴河县",
  "spell": "habahexian",
  "easy_spell": "hbhx",
  "city_id": "338" },

{
  "district_id": "2861",
  "district_name": "青河县",
  "spell": "qinghexian",
  "easy_spell": "qhx",
  "city_id": "338" },

{
  "district_id": "2862",
  "district_name": "吉木乃县",
  "spell": "jimunaixian",
  "easy_spell": "jmnx",
  "city_id": "338" },

{
  "district_id": "2863",
  "district_name": "嘉峪关市",
  "spell": "JIAYUGUANSHI",
  "easy_spell": "JYGS",
  "city_id": "299" },

{
  "district_id": "2864",
  "district_name": "石河子市",
  "spell": "SHIHEZISHI",
  "easy_spell": "SHZS",
  "city_id": "339" },

{
  "district_id": "2865",
  "district_name": "阿拉尔市",
  "spell": "ALAERSHI",
  "easy_spell": "ALES",
  "city_id": "340" }];


module.exports = data;

/***/ }),

/***/ 125:
/*!****************************************************************************************************!*\
  !*** D:/Project/Tiktok/tiktok-app/uni_modules/Sansnn-uQRCode/components/uqrcode/common/uqrcode.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; //---------------------------------------------------------------------
// github https://github.com/Sansnn/uQRCode
// version 2.0.23
//---------------------------------------------------------------------

var uQRCode = {};

(function () {
  //---------------------------------------------------------------------
  // QRCode for JavaScript
  //
  // Copyright (c) 2009 Kazuhiko Arase
  //
  // URL: http://www.d-project.com/
  //
  // Licensed under the MIT license:
  //   http://www.opensource.org/licenses/mit-license.php
  //
  // The word "QR Code" is registered trademark of 
  // DENSO WAVE INCORPORATED
  //   http://www.denso-wave.com/qrcode/faqpatent-e.html
  //
  //---------------------------------------------------------------------

  //---------------------------------------------------------------------
  // QR8bitByte
  //---------------------------------------------------------------------

  function QR8bitByte(data) {
    this.mode = QRMode.MODE_8BIT_BYTE;
    this.data = data;
  }

  QR8bitByte.prototype = {

    getLength: function getLength(buffer) {
      return this.data.length;
    },

    write: function write(buffer) {
      for (var i = 0; i < this.data.length; i++) {
        // not JIS ...
        buffer.put(this.data.charCodeAt(i), 8);
      }
    } };


  //---------------------------------------------------------------------
  // QRCode
  //---------------------------------------------------------------------

  function QRCode(typeNumber, errorCorrectLevel) {
    this.typeNumber = typeNumber;
    this.errorCorrectLevel = errorCorrectLevel;
    this.modules = null;
    this.moduleCount = 0;
    this.dataCache = null;
    this.dataList = new Array();
  }

  QRCode.prototype = {

    addData: function addData(data) {
      var newData = new QR8bitByte(data);
      this.dataList.push(newData);
      this.dataCache = null;
    },

    isDark: function isDark(row, col) {
      if (row < 0 || this.moduleCount <= row || col < 0 || this.moduleCount <= col) {
        throw new Error(row + "," + col);
      }
      return this.modules[row][col];
    },

    getModuleCount: function getModuleCount() {
      return this.moduleCount;
    },

    make: function make() {
      // Calculate automatically typeNumber if provided is < 1
      if (this.typeNumber < 1) {
        var typeNumber = 1;
        for (typeNumber = 1; typeNumber < 40; typeNumber++) {
          var rsBlocks = QRRSBlock.getRSBlocks(typeNumber, this.errorCorrectLevel);

          var buffer = new QRBitBuffer();
          var totalDataCount = 0;
          for (var i = 0; i < rsBlocks.length; i++) {
            totalDataCount += rsBlocks[i].dataCount;
          }

          for (var i = 0; i < this.dataList.length; i++) {
            var data = this.dataList[i];
            buffer.put(data.mode, 4);
            buffer.put(data.getLength(), QRUtil.getLengthInBits(data.mode, typeNumber));
            data.write(buffer);
          }
          if (buffer.getLengthInBits() <= totalDataCount * 8)
          break;
        }
        this.typeNumber = typeNumber;
      }
      this.makeImpl(false, this.getBestMaskPattern());
    },

    makeImpl: function makeImpl(test, maskPattern) {

      this.moduleCount = this.typeNumber * 4 + 17;
      this.modules = new Array(this.moduleCount);

      for (var row = 0; row < this.moduleCount; row++) {

        this.modules[row] = new Array(this.moduleCount);

        for (var col = 0; col < this.moduleCount; col++) {
          this.modules[row][col] = null; //(col + row) % 3;
        }
      }

      this.setupPositionProbePattern(0, 0);
      this.setupPositionProbePattern(this.moduleCount - 7, 0);
      this.setupPositionProbePattern(0, this.moduleCount - 7);
      this.setupPositionAdjustPattern();
      this.setupTimingPattern();
      this.setupTypeInfo(test, maskPattern);

      if (this.typeNumber >= 7) {
        this.setupTypeNumber(test);
      }

      if (this.dataCache == null) {
        this.dataCache = QRCode.createData(this.typeNumber, this.errorCorrectLevel, this.dataList);
      }

      this.mapData(this.dataCache, maskPattern);
    },

    setupPositionProbePattern: function setupPositionProbePattern(row, col) {

      for (var r = -1; r <= 7; r++) {

        if (row + r <= -1 || this.moduleCount <= row + r) continue;

        for (var c = -1; c <= 7; c++) {

          if (col + c <= -1 || this.moduleCount <= col + c) continue;

          if (0 <= r && r <= 6 && (c == 0 || c == 6) ||
          0 <= c && c <= 6 && (r == 0 || r == 6) ||
          2 <= r && r <= 4 && 2 <= c && c <= 4) {
            this.modules[row + r][col + c] = true;
          } else {
            this.modules[row + r][col + c] = false;
          }
        }
      }
    },

    getBestMaskPattern: function getBestMaskPattern() {

      var minLostPoint = 0;
      var pattern = 0;

      for (var i = 0; i < 8; i++) {

        this.makeImpl(true, i);

        var lostPoint = QRUtil.getLostPoint(this);

        if (i == 0 || minLostPoint > lostPoint) {
          minLostPoint = lostPoint;
          pattern = i;
        }
      }

      return pattern;
    },

    createMovieClip: function createMovieClip(target_mc, instance_name, depth) {

      var qr_mc = target_mc.createEmptyMovieClip(instance_name, depth);
      var cs = 1;

      this.make();

      for (var row = 0; row < this.modules.length; row++) {

        var y = row * cs;

        for (var col = 0; col < this.modules[row].length; col++) {

          var x = col * cs;
          var dark = this.modules[row][col];

          if (dark) {
            qr_mc.beginFill(0, 100);
            qr_mc.moveTo(x, y);
            qr_mc.lineTo(x + cs, y);
            qr_mc.lineTo(x + cs, y + cs);
            qr_mc.lineTo(x, y + cs);
            qr_mc.endFill();
          }
        }
      }

      return qr_mc;
    },

    setupTimingPattern: function setupTimingPattern() {

      for (var r = 8; r < this.moduleCount - 8; r++) {
        if (this.modules[r][6] != null) {
          continue;
        }
        this.modules[r][6] = r % 2 == 0;
      }

      for (var c = 8; c < this.moduleCount - 8; c++) {
        if (this.modules[6][c] != null) {
          continue;
        }
        this.modules[6][c] = c % 2 == 0;
      }
    },

    setupPositionAdjustPattern: function setupPositionAdjustPattern() {

      var pos = QRUtil.getPatternPosition(this.typeNumber);

      for (var i = 0; i < pos.length; i++) {

        for (var j = 0; j < pos.length; j++) {

          var row = pos[i];
          var col = pos[j];

          if (this.modules[row][col] != null) {
            continue;
          }

          for (var r = -2; r <= 2; r++) {

            for (var c = -2; c <= 2; c++) {

              if (r == -2 || r == 2 || c == -2 || c == 2 ||
              r == 0 && c == 0) {
                this.modules[row + r][col + c] = true;
              } else {
                this.modules[row + r][col + c] = false;
              }
            }
          }
        }
      }
    },

    setupTypeNumber: function setupTypeNumber(test) {

      var bits = QRUtil.getBCHTypeNumber(this.typeNumber);

      for (var i = 0; i < 18; i++) {
        var mod = !test && (bits >> i & 1) == 1;
        this.modules[Math.floor(i / 3)][i % 3 + this.moduleCount - 8 - 3] = mod;
      }

      for (var i = 0; i < 18; i++) {
        var mod = !test && (bits >> i & 1) == 1;
        this.modules[i % 3 + this.moduleCount - 8 - 3][Math.floor(i / 3)] = mod;
      }
    },

    setupTypeInfo: function setupTypeInfo(test, maskPattern) {

      var data = this.errorCorrectLevel << 3 | maskPattern;
      var bits = QRUtil.getBCHTypeInfo(data);

      // vertical		
      for (var i = 0; i < 15; i++) {

        var mod = !test && (bits >> i & 1) == 1;

        if (i < 6) {
          this.modules[i][8] = mod;
        } else if (i < 8) {
          this.modules[i + 1][8] = mod;
        } else {
          this.modules[this.moduleCount - 15 + i][8] = mod;
        }
      }

      // horizontal
      for (var i = 0; i < 15; i++) {

        var mod = !test && (bits >> i & 1) == 1;

        if (i < 8) {
          this.modules[8][this.moduleCount - i - 1] = mod;
        } else if (i < 9) {
          this.modules[8][15 - i - 1 + 1] = mod;
        } else {
          this.modules[8][15 - i - 1] = mod;
        }
      }

      // fixed module
      this.modules[this.moduleCount - 8][8] = !test;

    },

    mapData: function mapData(data, maskPattern) {

      var inc = -1;
      var row = this.moduleCount - 1;
      var bitIndex = 7;
      var byteIndex = 0;

      for (var col = this.moduleCount - 1; col > 0; col -= 2) {

        if (col == 6) col--;

        while (true) {

          for (var c = 0; c < 2; c++) {

            if (this.modules[row][col - c] == null) {

              var dark = false;

              if (byteIndex < data.length) {
                dark = (data[byteIndex] >>> bitIndex & 1) == 1;
              }

              var mask = QRUtil.getMask(maskPattern, row, col - c);

              if (mask) {
                dark = !dark;
              }

              this.modules[row][col - c] = dark;
              bitIndex--;

              if (bitIndex == -1) {
                byteIndex++;
                bitIndex = 7;
              }
            }
          }

          row += inc;

          if (row < 0 || this.moduleCount <= row) {
            row -= inc;
            inc = -inc;
            break;
          }
        }
      }

    } };



  QRCode.PAD0 = 0xEC;
  QRCode.PAD1 = 0x11;

  QRCode.createData = function (typeNumber, errorCorrectLevel, dataList) {

    var rsBlocks = QRRSBlock.getRSBlocks(typeNumber, errorCorrectLevel);

    var buffer = new QRBitBuffer();

    for (var i = 0; i < dataList.length; i++) {
      var data = dataList[i];
      buffer.put(data.mode, 4);
      buffer.put(data.getLength(), QRUtil.getLengthInBits(data.mode, typeNumber));
      data.write(buffer);
    }

    // calc num max data.
    var totalDataCount = 0;
    for (var i = 0; i < rsBlocks.length; i++) {
      totalDataCount += rsBlocks[i].dataCount;
    }

    if (buffer.getLengthInBits() > totalDataCount * 8) {
      throw new Error("code length overflow. (" +
      buffer.getLengthInBits() +
      ">" +
      totalDataCount * 8 +
      ")");
    }

    // end code
    if (buffer.getLengthInBits() + 4 <= totalDataCount * 8) {
      buffer.put(0, 4);
    }

    // padding
    while (buffer.getLengthInBits() % 8 != 0) {
      buffer.putBit(false);
    }

    // padding
    while (true) {

      if (buffer.getLengthInBits() >= totalDataCount * 8) {
        break;
      }
      buffer.put(QRCode.PAD0, 8);

      if (buffer.getLengthInBits() >= totalDataCount * 8) {
        break;
      }
      buffer.put(QRCode.PAD1, 8);
    }

    return QRCode.createBytes(buffer, rsBlocks);
  };

  QRCode.createBytes = function (buffer, rsBlocks) {

    var offset = 0;

    var maxDcCount = 0;
    var maxEcCount = 0;

    var dcdata = new Array(rsBlocks.length);
    var ecdata = new Array(rsBlocks.length);

    for (var r = 0; r < rsBlocks.length; r++) {

      var dcCount = rsBlocks[r].dataCount;
      var ecCount = rsBlocks[r].totalCount - dcCount;

      maxDcCount = Math.max(maxDcCount, dcCount);
      maxEcCount = Math.max(maxEcCount, ecCount);

      dcdata[r] = new Array(dcCount);

      for (var i = 0; i < dcdata[r].length; i++) {
        dcdata[r][i] = 0xff & buffer.buffer[i + offset];
      }
      offset += dcCount;

      var rsPoly = QRUtil.getErrorCorrectPolynomial(ecCount);
      var rawPoly = new QRPolynomial(dcdata[r], rsPoly.getLength() - 1);

      var modPoly = rawPoly.mod(rsPoly);
      ecdata[r] = new Array(rsPoly.getLength() - 1);
      for (var i = 0; i < ecdata[r].length; i++) {
        var modIndex = i + modPoly.getLength() - ecdata[r].length;
        ecdata[r][i] = modIndex >= 0 ? modPoly.get(modIndex) : 0;
      }

    }

    var totalCodeCount = 0;
    for (var i = 0; i < rsBlocks.length; i++) {
      totalCodeCount += rsBlocks[i].totalCount;
    }

    var data = new Array(totalCodeCount);
    var index = 0;

    for (var i = 0; i < maxDcCount; i++) {
      for (var r = 0; r < rsBlocks.length; r++) {
        if (i < dcdata[r].length) {
          data[index++] = dcdata[r][i];
        }
      }
    }

    for (var i = 0; i < maxEcCount; i++) {
      for (var r = 0; r < rsBlocks.length; r++) {
        if (i < ecdata[r].length) {
          data[index++] = ecdata[r][i];
        }
      }
    }

    return data;

  };

  //---------------------------------------------------------------------
  // QRMode
  //---------------------------------------------------------------------

  var QRMode = {
    MODE_NUMBER: 1 << 0,
    MODE_ALPHA_NUM: 1 << 1,
    MODE_8BIT_BYTE: 1 << 2,
    MODE_KANJI: 1 << 3 };


  //---------------------------------------------------------------------
  // QRErrorCorrectLevel
  //---------------------------------------------------------------------

  var QRErrorCorrectLevel = {
    L: 1,
    M: 0,
    Q: 3,
    H: 2 };


  //---------------------------------------------------------------------
  // QRMaskPattern
  //---------------------------------------------------------------------

  var QRMaskPattern = {
    PATTERN000: 0,
    PATTERN001: 1,
    PATTERN010: 2,
    PATTERN011: 3,
    PATTERN100: 4,
    PATTERN101: 5,
    PATTERN110: 6,
    PATTERN111: 7 };


  //---------------------------------------------------------------------
  // QRUtil
  //---------------------------------------------------------------------

  var QRUtil = {

    PATTERN_POSITION_TABLE: [
    [],
    [6, 18],
    [6, 22],
    [6, 26],
    [6, 30],
    [6, 34],
    [6, 22, 38],
    [6, 24, 42],
    [6, 26, 46],
    [6, 28, 50],
    [6, 30, 54],
    [6, 32, 58],
    [6, 34, 62],
    [6, 26, 46, 66],
    [6, 26, 48, 70],
    [6, 26, 50, 74],
    [6, 30, 54, 78],
    [6, 30, 56, 82],
    [6, 30, 58, 86],
    [6, 34, 62, 90],
    [6, 28, 50, 72, 94],
    [6, 26, 50, 74, 98],
    [6, 30, 54, 78, 102],
    [6, 28, 54, 80, 106],
    [6, 32, 58, 84, 110],
    [6, 30, 58, 86, 114],
    [6, 34, 62, 90, 118],
    [6, 26, 50, 74, 98, 122],
    [6, 30, 54, 78, 102, 126],
    [6, 26, 52, 78, 104, 130],
    [6, 30, 56, 82, 108, 134],
    [6, 34, 60, 86, 112, 138],
    [6, 30, 58, 86, 114, 142],
    [6, 34, 62, 90, 118, 146],
    [6, 30, 54, 78, 102, 126, 150],
    [6, 24, 50, 76, 102, 128, 154],
    [6, 28, 54, 80, 106, 132, 158],
    [6, 32, 58, 84, 110, 136, 162],
    [6, 26, 54, 82, 110, 138, 166],
    [6, 30, 58, 86, 114, 142, 170]],


    G15: 1 << 10 | 1 << 8 | 1 << 5 | 1 << 4 | 1 << 2 | 1 << 1 | 1 << 0,
    G18: 1 << 12 | 1 << 11 | 1 << 10 | 1 << 9 | 1 << 8 | 1 << 5 | 1 << 2 | 1 << 0,
    G15_MASK: 1 << 14 | 1 << 12 | 1 << 10 | 1 << 4 | 1 << 1,

    getBCHTypeInfo: function getBCHTypeInfo(data) {
      var d = data << 10;
      while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15) >= 0) {
        d ^= QRUtil.G15 << QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15);
      }
      return (data << 10 | d) ^ QRUtil.G15_MASK;
    },

    getBCHTypeNumber: function getBCHTypeNumber(data) {
      var d = data << 12;
      while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18) >= 0) {
        d ^= QRUtil.G18 << QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18);
      }
      return data << 12 | d;
    },

    getBCHDigit: function getBCHDigit(data) {

      var digit = 0;

      while (data != 0) {
        digit++;
        data >>>= 1;
      }

      return digit;
    },

    getPatternPosition: function getPatternPosition(typeNumber) {
      return QRUtil.PATTERN_POSITION_TABLE[typeNumber - 1];
    },

    getMask: function getMask(maskPattern, i, j) {

      switch (maskPattern) {

        case QRMaskPattern.PATTERN000:
          return (i + j) % 2 == 0;
        case QRMaskPattern.PATTERN001:
          return i % 2 == 0;
        case QRMaskPattern.PATTERN010:
          return j % 3 == 0;
        case QRMaskPattern.PATTERN011:
          return (i + j) % 3 == 0;
        case QRMaskPattern.PATTERN100:
          return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 == 0;
        case QRMaskPattern.PATTERN101:
          return i * j % 2 + i * j % 3 == 0;
        case QRMaskPattern.PATTERN110:
          return (i * j % 2 + i * j % 3) % 2 == 0;
        case QRMaskPattern.PATTERN111:
          return (i * j % 3 + (i + j) % 2) % 2 == 0;

        default:
          throw new Error("bad maskPattern:" + maskPattern);}

    },

    getErrorCorrectPolynomial: function getErrorCorrectPolynomial(errorCorrectLength) {

      var a = new QRPolynomial([1], 0);

      for (var i = 0; i < errorCorrectLength; i++) {
        a = a.multiply(new QRPolynomial([1, QRMath.gexp(i)], 0));
      }

      return a;
    },

    getLengthInBits: function getLengthInBits(mode, type) {

      if (1 <= type && type < 10) {

        // 1 - 9

        switch (mode) {
          case QRMode.MODE_NUMBER:
            return 10;
          case QRMode.MODE_ALPHA_NUM:
            return 9;
          case QRMode.MODE_8BIT_BYTE:
            return 8;
          case QRMode.MODE_KANJI:
            return 8;
          default:
            throw new Error("mode:" + mode);}


      } else if (type < 27) {

        // 10 - 26

        switch (mode) {
          case QRMode.MODE_NUMBER:
            return 12;
          case QRMode.MODE_ALPHA_NUM:
            return 11;
          case QRMode.MODE_8BIT_BYTE:
            return 16;
          case QRMode.MODE_KANJI:
            return 10;
          default:
            throw new Error("mode:" + mode);}


      } else if (type < 41) {

        // 27 - 40

        switch (mode) {
          case QRMode.MODE_NUMBER:
            return 14;
          case QRMode.MODE_ALPHA_NUM:
            return 13;
          case QRMode.MODE_8BIT_BYTE:
            return 16;
          case QRMode.MODE_KANJI:
            return 12;
          default:
            throw new Error("mode:" + mode);}


      } else {
        throw new Error("type:" + type);
      }
    },

    getLostPoint: function getLostPoint(qrCode) {

      var moduleCount = qrCode.getModuleCount();

      var lostPoint = 0;

      // LEVEL1

      for (var row = 0; row < moduleCount; row++) {

        for (var col = 0; col < moduleCount; col++) {

          var sameCount = 0;
          var dark = qrCode.isDark(row, col);

          for (var r = -1; r <= 1; r++) {

            if (row + r < 0 || moduleCount <= row + r) {
              continue;
            }

            for (var c = -1; c <= 1; c++) {

              if (col + c < 0 || moduleCount <= col + c) {
                continue;
              }

              if (r == 0 && c == 0) {
                continue;
              }

              if (dark == qrCode.isDark(row + r, col + c)) {
                sameCount++;
              }
            }
          }

          if (sameCount > 5) {
            lostPoint += 3 + sameCount - 5;
          }
        }
      }

      // LEVEL2

      for (var row = 0; row < moduleCount - 1; row++) {
        for (var col = 0; col < moduleCount - 1; col++) {
          var count = 0;
          if (qrCode.isDark(row, col)) count++;
          if (qrCode.isDark(row + 1, col)) count++;
          if (qrCode.isDark(row, col + 1)) count++;
          if (qrCode.isDark(row + 1, col + 1)) count++;
          if (count == 0 || count == 4) {
            lostPoint += 3;
          }
        }
      }

      // LEVEL3

      for (var row = 0; row < moduleCount; row++) {
        for (var col = 0; col < moduleCount - 6; col++) {
          if (qrCode.isDark(row, col) &&
          !qrCode.isDark(row, col + 1) &&
          qrCode.isDark(row, col + 2) &&
          qrCode.isDark(row, col + 3) &&
          qrCode.isDark(row, col + 4) &&
          !qrCode.isDark(row, col + 5) &&
          qrCode.isDark(row, col + 6)) {
            lostPoint += 40;
          }
        }
      }

      for (var col = 0; col < moduleCount; col++) {
        for (var row = 0; row < moduleCount - 6; row++) {
          if (qrCode.isDark(row, col) &&
          !qrCode.isDark(row + 1, col) &&
          qrCode.isDark(row + 2, col) &&
          qrCode.isDark(row + 3, col) &&
          qrCode.isDark(row + 4, col) &&
          !qrCode.isDark(row + 5, col) &&
          qrCode.isDark(row + 6, col)) {
            lostPoint += 40;
          }
        }
      }

      // LEVEL4

      var darkCount = 0;

      for (var col = 0; col < moduleCount; col++) {
        for (var row = 0; row < moduleCount; row++) {
          if (qrCode.isDark(row, col)) {
            darkCount++;
          }
        }
      }

      var ratio = Math.abs(100 * darkCount / moduleCount / moduleCount - 50) / 5;
      lostPoint += ratio * 10;

      return lostPoint;
    } };




  //---------------------------------------------------------------------
  // QRMath
  //---------------------------------------------------------------------

  var QRMath = {

    glog: function glog(n) {

      if (n < 1) {
        throw new Error("glog(" + n + ")");
      }

      return QRMath.LOG_TABLE[n];
    },

    gexp: function gexp(n) {

      while (n < 0) {
        n += 255;
      }

      while (n >= 256) {
        n -= 255;
      }

      return QRMath.EXP_TABLE[n];
    },

    EXP_TABLE: new Array(256),

    LOG_TABLE: new Array(256) };



  for (var i = 0; i < 8; i++) {
    QRMath.EXP_TABLE[i] = 1 << i;
  }
  for (var i = 8; i < 256; i++) {
    QRMath.EXP_TABLE[i] = QRMath.EXP_TABLE[i - 4] ^
    QRMath.EXP_TABLE[i - 5] ^
    QRMath.EXP_TABLE[i - 6] ^
    QRMath.EXP_TABLE[i - 8];
  }
  for (var i = 0; i < 255; i++) {
    QRMath.LOG_TABLE[QRMath.EXP_TABLE[i]] = i;
  }

  //---------------------------------------------------------------------
  // QRPolynomial
  //---------------------------------------------------------------------

  function QRPolynomial(num, shift) {

    if (num.length == undefined) {
      throw new Error(num.length + "/" + shift);
    }

    var offset = 0;

    while (offset < num.length && num[offset] == 0) {
      offset++;
    }

    this.num = new Array(num.length - offset + shift);
    for (var i = 0; i < num.length - offset; i++) {
      this.num[i] = num[i + offset];
    }
  }

  QRPolynomial.prototype = {

    get: function get(index) {
      return this.num[index];
    },

    getLength: function getLength() {
      return this.num.length;
    },

    multiply: function multiply(e) {

      var num = new Array(this.getLength() + e.getLength() - 1);

      for (var i = 0; i < this.getLength(); i++) {
        for (var j = 0; j < e.getLength(); j++) {
          num[i + j] ^= QRMath.gexp(QRMath.glog(this.get(i)) + QRMath.glog(e.get(j)));
        }
      }

      return new QRPolynomial(num, 0);
    },

    mod: function mod(e) {

      if (this.getLength() - e.getLength() < 0) {
        return this;
      }

      var ratio = QRMath.glog(this.get(0)) - QRMath.glog(e.get(0));

      var num = new Array(this.getLength());

      for (var i = 0; i < this.getLength(); i++) {
        num[i] = this.get(i);
      }

      for (var i = 0; i < e.getLength(); i++) {
        num[i] ^= QRMath.gexp(QRMath.glog(e.get(i)) + ratio);
      }

      // recursive call
      return new QRPolynomial(num, 0).mod(e);
    } };


  //---------------------------------------------------------------------
  // QRRSBlock
  //---------------------------------------------------------------------

  function QRRSBlock(totalCount, dataCount) {
    this.totalCount = totalCount;
    this.dataCount = dataCount;
  }

  QRRSBlock.RS_BLOCK_TABLE = [

  // L
  // M
  // Q
  // H

  // 1
  [1, 26, 19],
  [1, 26, 16],
  [1, 26, 13],
  [1, 26, 9],

  // 2
  [1, 44, 34],
  [1, 44, 28],
  [1, 44, 22],
  [1, 44, 16],

  // 3
  [1, 70, 55],
  [1, 70, 44],
  [2, 35, 17],
  [2, 35, 13],

  // 4		
  [1, 100, 80],
  [2, 50, 32],
  [2, 50, 24],
  [4, 25, 9],

  // 5
  [1, 134, 108],
  [2, 67, 43],
  [2, 33, 15, 2, 34, 16],
  [2, 33, 11, 2, 34, 12],

  // 6
  [2, 86, 68],
  [4, 43, 27],
  [4, 43, 19],
  [4, 43, 15],

  // 7		
  [2, 98, 78],
  [4, 49, 31],
  [2, 32, 14, 4, 33, 15],
  [4, 39, 13, 1, 40, 14],

  // 8
  [2, 121, 97],
  [2, 60, 38, 2, 61, 39],
  [4, 40, 18, 2, 41, 19],
  [4, 40, 14, 2, 41, 15],

  // 9
  [2, 146, 116],
  [3, 58, 36, 2, 59, 37],
  [4, 36, 16, 4, 37, 17],
  [4, 36, 12, 4, 37, 13],

  // 10		
  [2, 86, 68, 2, 87, 69],
  [4, 69, 43, 1, 70, 44],
  [6, 43, 19, 2, 44, 20],
  [6, 43, 15, 2, 44, 16],

  // 11
  [4, 101, 81],
  [1, 80, 50, 4, 81, 51],
  [4, 50, 22, 4, 51, 23],
  [3, 36, 12, 8, 37, 13],

  // 12
  [2, 116, 92, 2, 117, 93],
  [6, 58, 36, 2, 59, 37],
  [4, 46, 20, 6, 47, 21],
  [7, 42, 14, 4, 43, 15],

  // 13
  [4, 133, 107],
  [8, 59, 37, 1, 60, 38],
  [8, 44, 20, 4, 45, 21],
  [12, 33, 11, 4, 34, 12],

  // 14
  [3, 145, 115, 1, 146, 116],
  [4, 64, 40, 5, 65, 41],
  [11, 36, 16, 5, 37, 17],
  [11, 36, 12, 5, 37, 13],

  // 15
  [5, 109, 87, 1, 110, 88],
  [5, 65, 41, 5, 66, 42],
  [5, 54, 24, 7, 55, 25],
  [11, 36, 12],

  // 16
  [5, 122, 98, 1, 123, 99],
  [7, 73, 45, 3, 74, 46],
  [15, 43, 19, 2, 44, 20],
  [3, 45, 15, 13, 46, 16],

  // 17
  [1, 135, 107, 5, 136, 108],
  [10, 74, 46, 1, 75, 47],
  [1, 50, 22, 15, 51, 23],
  [2, 42, 14, 17, 43, 15],

  // 18
  [5, 150, 120, 1, 151, 121],
  [9, 69, 43, 4, 70, 44],
  [17, 50, 22, 1, 51, 23],
  [2, 42, 14, 19, 43, 15],

  // 19
  [3, 141, 113, 4, 142, 114],
  [3, 70, 44, 11, 71, 45],
  [17, 47, 21, 4, 48, 22],
  [9, 39, 13, 16, 40, 14],

  // 20
  [3, 135, 107, 5, 136, 108],
  [3, 67, 41, 13, 68, 42],
  [15, 54, 24, 5, 55, 25],
  [15, 43, 15, 10, 44, 16],

  // 21
  [4, 144, 116, 4, 145, 117],
  [17, 68, 42],
  [17, 50, 22, 6, 51, 23],
  [19, 46, 16, 6, 47, 17],

  // 22
  [2, 139, 111, 7, 140, 112],
  [17, 74, 46],
  [7, 54, 24, 16, 55, 25],
  [34, 37, 13],

  // 23
  [4, 151, 121, 5, 152, 122],
  [4, 75, 47, 14, 76, 48],
  [11, 54, 24, 14, 55, 25],
  [16, 45, 15, 14, 46, 16],

  // 24
  [6, 147, 117, 4, 148, 118],
  [6, 73, 45, 14, 74, 46],
  [11, 54, 24, 16, 55, 25],
  [30, 46, 16, 2, 47, 17],

  // 25
  [8, 132, 106, 4, 133, 107],
  [8, 75, 47, 13, 76, 48],
  [7, 54, 24, 22, 55, 25],
  [22, 45, 15, 13, 46, 16],

  // 26
  [10, 142, 114, 2, 143, 115],
  [19, 74, 46, 4, 75, 47],
  [28, 50, 22, 6, 51, 23],
  [33, 46, 16, 4, 47, 17],

  // 27
  [8, 152, 122, 4, 153, 123],
  [22, 73, 45, 3, 74, 46],
  [8, 53, 23, 26, 54, 24],
  [12, 45, 15, 28, 46, 16],

  // 28
  [3, 147, 117, 10, 148, 118],
  [3, 73, 45, 23, 74, 46],
  [4, 54, 24, 31, 55, 25],
  [11, 45, 15, 31, 46, 16],

  // 29
  [7, 146, 116, 7, 147, 117],
  [21, 73, 45, 7, 74, 46],
  [1, 53, 23, 37, 54, 24],
  [19, 45, 15, 26, 46, 16],

  // 30
  [5, 145, 115, 10, 146, 116],
  [19, 75, 47, 10, 76, 48],
  [15, 54, 24, 25, 55, 25],
  [23, 45, 15, 25, 46, 16],

  // 31
  [13, 145, 115, 3, 146, 116],
  [2, 74, 46, 29, 75, 47],
  [42, 54, 24, 1, 55, 25],
  [23, 45, 15, 28, 46, 16],

  // 32
  [17, 145, 115],
  [10, 74, 46, 23, 75, 47],
  [10, 54, 24, 35, 55, 25],
  [19, 45, 15, 35, 46, 16],

  // 33
  [17, 145, 115, 1, 146, 116],
  [14, 74, 46, 21, 75, 47],
  [29, 54, 24, 19, 55, 25],
  [11, 45, 15, 46, 46, 16],

  // 34
  [13, 145, 115, 6, 146, 116],
  [14, 74, 46, 23, 75, 47],
  [44, 54, 24, 7, 55, 25],
  [59, 46, 16, 1, 47, 17],

  // 35
  [12, 151, 121, 7, 152, 122],
  [12, 75, 47, 26, 76, 48],
  [39, 54, 24, 14, 55, 25],
  [22, 45, 15, 41, 46, 16],

  // 36
  [6, 151, 121, 14, 152, 122],
  [6, 75, 47, 34, 76, 48],
  [46, 54, 24, 10, 55, 25],
  [2, 45, 15, 64, 46, 16],

  // 37
  [17, 152, 122, 4, 153, 123],
  [29, 74, 46, 14, 75, 47],
  [49, 54, 24, 10, 55, 25],
  [24, 45, 15, 46, 46, 16],

  // 38
  [4, 152, 122, 18, 153, 123],
  [13, 74, 46, 32, 75, 47],
  [48, 54, 24, 14, 55, 25],
  [42, 45, 15, 32, 46, 16],

  // 39
  [20, 147, 117, 4, 148, 118],
  [40, 75, 47, 7, 76, 48],
  [43, 54, 24, 22, 55, 25],
  [10, 45, 15, 67, 46, 16],

  // 40
  [19, 148, 118, 6, 149, 119],
  [18, 75, 47, 31, 76, 48],
  [34, 54, 24, 34, 55, 25],
  [20, 45, 15, 61, 46, 16]];


  QRRSBlock.getRSBlocks = function (typeNumber, errorCorrectLevel) {

    var rsBlock = QRRSBlock.getRsBlockTable(typeNumber, errorCorrectLevel);

    if (rsBlock == undefined) {
      throw new Error("bad rs block @ typeNumber:" + typeNumber + "/errorCorrectLevel:" +
      errorCorrectLevel);
    }

    var length = rsBlock.length / 3;

    var list = new Array();

    for (var i = 0; i < length; i++) {

      var count = rsBlock[i * 3 + 0];
      var totalCount = rsBlock[i * 3 + 1];
      var dataCount = rsBlock[i * 3 + 2];

      for (var j = 0; j < count; j++) {
        list.push(new QRRSBlock(totalCount, dataCount));
      }
    }

    return list;
  };

  QRRSBlock.getRsBlockTable = function (typeNumber, errorCorrectLevel) {

    switch (errorCorrectLevel) {
      case QRErrorCorrectLevel.L:
        return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 0];
      case QRErrorCorrectLevel.M:
        return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 1];
      case QRErrorCorrectLevel.Q:
        return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 2];
      case QRErrorCorrectLevel.H:
        return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 3];
      default:
        return undefined;}

  };

  //---------------------------------------------------------------------
  // QRBitBuffer
  //---------------------------------------------------------------------

  function QRBitBuffer() {
    this.buffer = new Array();
    this.length = 0;
  }

  QRBitBuffer.prototype = {

    get: function get(index) {
      var bufIndex = Math.floor(index / 8);
      return (this.buffer[bufIndex] >>> 7 - index % 8 & 1) == 1;
    },

    put: function put(num, length) {
      for (var i = 0; i < length; i++) {
        this.putBit((num >>> length - i - 1 & 1) == 1);
      }
    },

    getLengthInBits: function getLengthInBits() {
      return this.length;
    },

    putBit: function putBit(bit) {

      var bufIndex = Math.floor(this.length / 8);
      if (this.buffer.length <= bufIndex) {
        this.buffer.push(0);
      }

      if (bit) {
        this.buffer[bufIndex] |= 0x80 >>> this.length % 8;
      }

      this.length++;
    } };


  //---------------------------------------------------------------------
  // Support Chinese
  //---------------------------------------------------------------------
  function utf16To8(text) {
    var result = '';
    var c;
    for (var i = 0; i < text.length; i++) {
      c = text.charCodeAt(i);
      if (c >= 0x0001 && c <= 0x007F) {
        result += text.charAt(i);
      } else if (c > 0x07FF) {
        result += String.fromCharCode(0xE0 | c >> 12 & 0x0F);
        result += String.fromCharCode(0x80 | c >> 6 & 0x3F);
        result += String.fromCharCode(0x80 | c >> 0 & 0x3F);
      } else {
        result += String.fromCharCode(0xC0 | c >> 6 & 0x1F);
        result += String.fromCharCode(0x80 | c >> 0 & 0x3F);
      }
    }
    return result;
  }

  uQRCode = {
    errorCorrectLevel: QRErrorCorrectLevel,

    defaults: {
      size: 354,
      margin: 0,
      backgroundColor: '#ffffff',
      foregroundColor: '#000000',
      fileType: 'png', // 'jpg', 'png'
      errorCorrectLevel: QRErrorCorrectLevel.H,
      typeNumber: -1,
      enableDelay: false // 启用延迟绘制
    },

    getModules: function getModules(options) {
      options = Object.assign(this.defaults, options);
      var qrcode = new QRCode(options.typeNumber, options.errorCorrectLevel);
      qrcode.addData(utf16To8(options.text));
      qrcode.make();
      return qrcode.modules;
    },

    make: function make(options, componentInstance) {var _this = this;
      return new Promise(function (reslove, reject) {
        options = Object.assign(_this.defaults, options);
        if (!options.canvasId) {
          throw new Error('uQRCode: Please set canvasId!');
        }
        var modules = _this.getModules(options);
        var tileW = (options.size - options.margin * 2) / modules.length;
        var tileH = tileW;
        var delay = 0;

        // 创建canvas上下文前增加一点延时，确保canvas组件已渲染
        setTimeout(function () {
          var ctx = uni.createCanvasContext(options.canvasId, componentInstance);
          ctx.setFillStyle(options.backgroundColor);
          ctx.fillRect(0, 0, options.size, options.size);
          for (var row = 0; row < modules.length; row++) {
            for (var col = 0; col < modules.length; col++) {
              delay = options.enableDelay ? row * modules.length + col + 1 : 0;
              setTimeout(function (row, col) {
                // 计算每一个小块的位置
                var x = Math.round(col * tileW) + options.margin;
                var y = Math.round(row * tileH) + options.margin;
                var w = Math.ceil((col + 1) * tileW) - Math.floor(col * tileW);
                var h = Math.ceil((row + 1) * tileW) - Math.floor(row * tileW);
                var style = modules[row][col] ? options.foregroundColor :
                options.backgroundColor;
                ctx.setFillStyle(style);
                ctx.fillRect(x, y, w, h);
              }, delay, row, col);
            }
          }

          // 耗时
          var time = options.enableDelay ? delay + options.size * 2 + options.margin * 2 + options.text.length : 0;
          setTimeout(function () {
            ctx.draw(false, function () {
              uni.canvasToTempFilePath({
                canvasId: options.canvasId,
                fileType: options.fileType,
                width: options.size,
                height: options.size,
                destWidth: options.size,
                destHeight: options.size,
                success: function success(res) {
                  reslove(Object.assign(res, {
                    time: time + 50 }));

                },
                fail: function fail(err) {
                  reject(err);
                } },
              componentInstance);
            });
          }, time);
        }, 50);


      });
    } };


})();var _default =

uQRCode;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 14:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 2:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 3:
/*!*************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-i18n/dist/uni-i18n.es.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni, global) {Object.defineProperty(exports, "__esModule", { value: true });exports.compileI18nJsonStr = compileI18nJsonStr;exports.hasI18nJson = hasI18nJson;exports.initVueI18n = initVueI18n;exports.isI18nStr = isI18nStr;exports.normalizeLocale = normalizeLocale;exports.parseI18nJson = parseI18nJson;exports.resolveLocale = resolveLocale;exports.isString = exports.LOCALE_ZH_HANT = exports.LOCALE_ZH_HANS = exports.LOCALE_FR = exports.LOCALE_ES = exports.LOCALE_EN = exports.I18n = exports.Formatter = void 0;function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var isArray = Array.isArray;
var isObject = function isObject(val) {return val !== null && typeof val === 'object';};
var defaultDelimiters = ['{', '}'];var
BaseFormatter = /*#__PURE__*/function () {
  function BaseFormatter() {_classCallCheck(this, BaseFormatter);
    this._caches = Object.create(null);
  }_createClass(BaseFormatter, [{ key: "interpolate", value: function interpolate(
    message, values) {var delimiters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultDelimiters;
      if (!values) {
        return [message];
      }
      var tokens = this._caches[message];
      if (!tokens) {
        tokens = parse(message, delimiters);
        this._caches[message] = tokens;
      }
      return compile(tokens, values);
    } }]);return BaseFormatter;}();exports.Formatter = BaseFormatter;

var RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
var RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
function parse(format, _ref) {var _ref2 = _slicedToArray(_ref, 2),startDelimiter = _ref2[0],endDelimiter = _ref2[1];
  var tokens = [];
  var position = 0;
  var text = '';
  while (position < format.length) {
    var char = format[position++];
    if (char === startDelimiter) {
      if (text) {
        tokens.push({ type: 'text', value: text });
      }
      text = '';
      var sub = '';
      char = format[position++];
      while (char !== undefined && char !== endDelimiter) {
        sub += char;
        char = format[position++];
      }
      var isClosed = char === endDelimiter;
      var type = RE_TOKEN_LIST_VALUE.test(sub) ?
      'list' :
      isClosed && RE_TOKEN_NAMED_VALUE.test(sub) ?
      'named' :
      'unknown';
      tokens.push({ value: sub, type: type });
    }
    //  else if (char === '%') {
    //   // when found rails i18n syntax, skip text capture
    //   if (format[position] !== '{') {
    //     text += char
    //   }
    // }
    else {
        text += char;
      }
  }
  text && tokens.push({ type: 'text', value: text });
  return tokens;
}
function compile(tokens, values) {
  var compiled = [];
  var index = 0;
  var mode = isArray(values) ?
  'list' :
  isObject(values) ?
  'named' :
  'unknown';
  if (mode === 'unknown') {
    return compiled;
  }
  while (index < tokens.length) {
    var token = tokens[index];
    switch (token.type) {
      case 'text':
        compiled.push(token.value);
        break;
      case 'list':
        compiled.push(values[parseInt(token.value, 10)]);
        break;
      case 'named':
        if (mode === 'named') {
          compiled.push(values[token.value]);
        } else
        {
          if (true) {
            console.warn("Type of token '".concat(token.type, "' and format of value '").concat(mode, "' don't match!"));
          }
        }
        break;
      case 'unknown':
        if (true) {
          console.warn("Detect 'unknown' type of token!");
        }
        break;}

    index++;
  }
  return compiled;
}

var LOCALE_ZH_HANS = 'zh-Hans';exports.LOCALE_ZH_HANS = LOCALE_ZH_HANS;
var LOCALE_ZH_HANT = 'zh-Hant';exports.LOCALE_ZH_HANT = LOCALE_ZH_HANT;
var LOCALE_EN = 'en';exports.LOCALE_EN = LOCALE_EN;
var LOCALE_FR = 'fr';exports.LOCALE_FR = LOCALE_FR;
var LOCALE_ES = 'es';exports.LOCALE_ES = LOCALE_ES;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var hasOwn = function hasOwn(val, key) {return hasOwnProperty.call(val, key);};
var defaultFormatter = new BaseFormatter();
function include(str, parts) {
  return !!parts.find(function (part) {return str.indexOf(part) !== -1;});
}
function startsWith(str, parts) {
  return parts.find(function (part) {return str.indexOf(part) === 0;});
}
function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, '-');
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale.indexOf('zh') === 0) {
    if (locale.indexOf('-hans') > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf('-hant') > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  var lang = startsWith(locale, [LOCALE_EN, LOCALE_FR, LOCALE_ES]);
  if (lang) {
    return lang;
  }
}var
I18n = /*#__PURE__*/function () {
  function I18n(_ref3) {var locale = _ref3.locale,fallbackLocale = _ref3.fallbackLocale,messages = _ref3.messages,watcher = _ref3.watcher,formater = _ref3.formater;_classCallCheck(this, I18n);
    this.locale = LOCALE_EN;
    this.fallbackLocale = LOCALE_EN;
    this.message = {};
    this.messages = {};
    this.watchers = [];
    if (fallbackLocale) {
      this.fallbackLocale = fallbackLocale;
    }
    this.formater = formater || defaultFormatter;
    this.messages = messages || {};
    this.setLocale(locale || LOCALE_EN);
    if (watcher) {
      this.watchLocale(watcher);
    }
  }_createClass(I18n, [{ key: "setLocale", value: function setLocale(
    locale) {var _this = this;
      var oldLocale = this.locale;
      this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale;
      if (!this.messages[this.locale]) {
        // 可能初始化时不存在
        this.messages[this.locale] = {};
      }
      this.message = this.messages[this.locale];
      // 仅发生变化时，通知
      if (oldLocale !== this.locale) {
        this.watchers.forEach(function (watcher) {
          watcher(_this.locale, oldLocale);
        });
      }
    } }, { key: "getLocale", value: function getLocale()
    {
      return this.locale;
    } }, { key: "watchLocale", value: function watchLocale(
    fn) {var _this2 = this;
      var index = this.watchers.push(fn) - 1;
      return function () {
        _this2.watchers.splice(index, 1);
      };
    } }, { key: "add", value: function add(
    locale, message) {var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var curMessages = this.messages[locale];
      if (curMessages) {
        if (override) {
          Object.assign(curMessages, message);
        } else
        {
          Object.keys(message).forEach(function (key) {
            if (!hasOwn(curMessages, key)) {
              curMessages[key] = message[key];
            }
          });
        }
      } else
      {
        this.messages[locale] = message;
      }
    } }, { key: "f", value: function f(
    message, values, delimiters) {
      return this.formater.interpolate(message, values, delimiters).join('');
    } }, { key: "t", value: function t(
    key, locale, values) {
      var message = this.message;
      if (typeof locale === 'string') {
        locale = normalizeLocale(locale, this.messages);
        locale && (message = this.messages[locale]);
      } else
      {
        values = locale;
      }
      if (!hasOwn(message, key)) {
        console.warn("Cannot translate the value of keypath ".concat(key, ". Use the value of keypath as default."));
        return key;
      }
      return this.formater.interpolate(message[key], values).join('');
    } }]);return I18n;}();exports.I18n = I18n;


function watchAppLocale(appVm, i18n) {
  // 需要保证 watch 的触发在组件渲染之前
  if (appVm.$watchLocale) {
    // vue2
    appVm.$watchLocale(function (newLocale) {
      i18n.setLocale(newLocale);
    });
  } else
  {
    appVm.$watch(function () {return appVm.$locale;}, function (newLocale) {
      i18n.setLocale(newLocale);
    });
  }
}
function getDefaultLocale() {
  if (typeof uni !== 'undefined' && uni.getLocale) {
    return uni.getLocale();
  }
  // 小程序平台，uni 和 uni-i18n 互相引用，导致访问不到 uni，故在 global 上挂了 getLocale
  if (typeof global !== 'undefined' && global.getLocale) {
    return global.getLocale();
  }
  return LOCALE_EN;
}
function initVueI18n(locale) {var messages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var fallbackLocale = arguments.length > 2 ? arguments[2] : undefined;var watcher = arguments.length > 3 ? arguments[3] : undefined;
  // 兼容旧版本入参
  if (typeof locale !== 'string') {var _ref4 =
    [
    messages,
    locale];locale = _ref4[0];messages = _ref4[1];

  }
  if (typeof locale !== 'string') {
    // 因为小程序平台，uni-i18n 和 uni 互相引用，导致此时访问 uni 时，为 undefined
    locale = getDefaultLocale();
  }
  if (typeof fallbackLocale !== 'string') {
    fallbackLocale =
    typeof __uniConfig !== 'undefined' && __uniConfig.fallbackLocale ||
    LOCALE_EN;
  }
  var i18n = new I18n({
    locale: locale,
    fallbackLocale: fallbackLocale,
    messages: messages,
    watcher: watcher });

  var _t = function t(key, values) {
    if (typeof getApp !== 'function') {
      // app view
      /* eslint-disable no-func-assign */
      _t = function t(key, values) {
        return i18n.t(key, values);
      };
    } else
    {
      var isWatchedAppLocale = false;
      _t = function t(key, values) {
        var appVm = getApp().$vm;
        // 可能$vm还不存在，比如在支付宝小程序中，组件定义较早，在props的default里使用了t()函数（如uni-goods-nav），此时app还未初始化
        // options: {
        // 	type: Array,
        // 	default () {
        // 		return [{
        // 			icon: 'shop',
        // 			text: t("uni-goods-nav.options.shop"),
        // 		}, {
        // 			icon: 'cart',
        // 			text: t("uni-goods-nav.options.cart")
        // 		}]
        // 	}
        // },
        if (appVm) {
          // 触发响应式
          appVm.$locale;
          if (!isWatchedAppLocale) {
            isWatchedAppLocale = true;
            watchAppLocale(appVm, i18n);
          }
        }
        return i18n.t(key, values);
      };
    }
    return _t(key, values);
  };
  return {
    i18n: i18n,
    f: function f(message, values, delimiters) {
      return i18n.f(message, values, delimiters);
    },
    t: function t(key, values) {
      return _t(key, values);
    },
    add: function add(locale, message) {var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      return i18n.add(locale, message, override);
    },
    watch: function watch(fn) {
      return i18n.watchLocale(fn);
    },
    getLocale: function getLocale() {
      return i18n.getLocale();
    },
    setLocale: function setLocale(newLocale) {
      return i18n.setLocale(newLocale);
    } };

}

var isString = function isString(val) {return typeof val === 'string';};exports.isString = isString;
var formater;
function hasI18nJson(jsonObj, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  return walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        return true;
      }
    } else
    {
      return hasI18nJson(value, delimiters);
    }
  });
}
function parseI18nJson(jsonObj, values, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        jsonObj[key] = compileStr(value, values, delimiters);
      }
    } else
    {
      parseI18nJson(value, values, delimiters);
    }
  });
  return jsonObj;
}
function compileI18nJsonStr(jsonStr, _ref5) {var locale = _ref5.locale,locales = _ref5.locales,delimiters = _ref5.delimiters;
  if (!isI18nStr(jsonStr, delimiters)) {
    return jsonStr;
  }
  if (!formater) {
    formater = new BaseFormatter();
  }
  var localeValues = [];
  Object.keys(locales).forEach(function (name) {
    if (name !== locale) {
      localeValues.push({
        locale: name,
        values: locales[name] });

    }
  });
  localeValues.unshift({ locale: locale, values: locales[locale] });
  try {
    return JSON.stringify(compileJsonObj(JSON.parse(jsonStr), localeValues, delimiters), null, 2);
  }
  catch (e) {}
  return jsonStr;
}
function isI18nStr(value, delimiters) {
  return value.indexOf(delimiters[0]) > -1;
}
function compileStr(value, values, delimiters) {
  return formater.interpolate(value, values, delimiters).join('');
}
function compileValue(jsonObj, key, localeValues, delimiters) {
  var value = jsonObj[key];
  if (isString(value)) {
    // 存在国际化
    if (isI18nStr(value, delimiters)) {
      jsonObj[key] = compileStr(value, localeValues[0].values, delimiters);
      if (localeValues.length > 1) {
        // 格式化国际化语言
        var valueLocales = jsonObj[key + 'Locales'] = {};
        localeValues.forEach(function (localValue) {
          valueLocales[localValue.locale] = compileStr(value, localValue.values, delimiters);
        });
      }
    }
  } else
  {
    compileJsonObj(value, localeValues, delimiters);
  }
}
function compileJsonObj(jsonObj, localeValues, delimiters) {
  walkJsonObj(jsonObj, function (jsonObj, key) {
    compileValue(jsonObj, key, localeValues, delimiters);
  });
  return jsonObj;
}
function walkJsonObj(jsonObj, walk) {
  if (isArray(jsonObj)) {
    for (var i = 0; i < jsonObj.length; i++) {
      if (walk(jsonObj, i)) {
        return true;
      }
    }
  } else
  if (isObject(jsonObj)) {
    for (var key in jsonObj) {
      if (walk(jsonObj, key)) {
        return true;
      }
    }
  }
  return false;
}

function resolveLocale(locales) {
  return function (locale) {
    if (!locale) {
      return locale;
    }
    locale = normalizeLocale(locale) || locale;
    return resolveLocaleChain(locale).find(function (locale) {return locales.indexOf(locale) > -1;});
  };
}
function resolveLocaleChain(locale) {
  var chain = [];
  var tokens = locale.split('-');
  while (tokens.length) {
    chain.push(tokens.join('-'));
    tokens.pop();
  }
  return chain;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"], __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 2)))

/***/ }),

/***/ 305:
/*!****************************************************************************************!*\
  !*** D:/Project/Tiktok/tiktok-app/uni_modules/uni-popup/components/uni-popup/popup.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default =
{
  data: function data() {
    return {};


  },
  created: function created() {
    this.popup = this.getParent();
  },
  methods: {
    /**
              * 获取父元素实例
              */
    getParent: function getParent() {var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'uniPopup';
      var parent = this.$parent;
      var parentName = parent.$options.name;
      while (parentName !== name) {
        parent = parent.$parent;
        if (!parent) return false;
        parentName = parent.$options.name;
      }
      return parent;
    } } };exports.default = _default;

/***/ }),

/***/ 320:
/*!************************************************************************************************************!*\
  !*** D:/Project/Tiktok/tiktok-app/uni_modules/uni-transition/components/uni-transition/createAnimation.js ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.createAnimation = createAnimation;function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;} // const defaultOption = {
// 	duration: 300,
// 	timingFunction: 'linear',
// 	delay: 0,
// 	transformOrigin: '50% 50% 0'
// }
var


MPAnimation = /*#__PURE__*/function () {
  function MPAnimation(options, _this) {_classCallCheck(this, MPAnimation);
    this.options = options;
    this.animation = uni.createAnimation(options);
    this.currentStepAnimates = {};
    this.next = 0;
    this.$ = _this;

  }_createClass(MPAnimation, [{ key: "_nvuePushAnimates", value: function _nvuePushAnimates(

    type, args) {
      var aniObj = this.currentStepAnimates[this.next];
      var styles = {};
      if (!aniObj) {
        styles = {
          styles: {},
          config: {} };

      } else {
        styles = aniObj;
      }
      if (animateTypes1.includes(type)) {
        if (!styles.styles.transform) {
          styles.styles.transform = '';
        }
        var unit = '';
        if (type === 'rotate') {
          unit = 'deg';
        }
        styles.styles.transform += "".concat(type, "(").concat(args + unit, ") ");
      } else {
        styles.styles[type] = "".concat(args);
      }
      this.currentStepAnimates[this.next] = styles;
    } }, { key: "_animateRun", value: function _animateRun()
    {var styles = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var ref = this.$.$refs['ani'].ref;
      if (!ref) return;
      return new Promise(function (resolve, reject) {
        nvueAnimation.transition(ref, _objectSpread({
          styles: styles },
        config),
        function (res) {
          resolve();
        });
      });
    } }, { key: "_nvueNextAnimate", value: function _nvueNextAnimate(

    animates) {var _this2 = this;var step = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;var fn = arguments.length > 2 ? arguments[2] : undefined;
      var obj = animates[step];
      if (obj) {var

        styles =

        obj.styles,config = obj.config;
        this._animateRun(styles, config).then(function () {
          step += 1;
          _this2._nvueNextAnimate(animates, step, fn);
        });
      } else {
        this.currentStepAnimates = {};
        typeof fn === 'function' && fn();
        this.isEnd = true;
      }
    } }, { key: "step", value: function step()

    {var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      this.animation.step(config);






      return this;
    } }, { key: "run", value: function run(

    fn) {

      this.$.animationData = this.animation.export();
      this.$.timer = setTimeout(function () {
        typeof fn === 'function' && fn();
      }, this.$.durationTime);








    } }]);return MPAnimation;}();



var animateTypes1 = ['matrix', 'matrix3d', 'rotate', 'rotate3d', 'rotateX', 'rotateY', 'rotateZ', 'scale', 'scale3d',
'scaleX', 'scaleY', 'scaleZ', 'skew', 'skewX', 'skewY', 'translate', 'translate3d', 'translateX', 'translateY',
'translateZ'];

var animateTypes2 = ['opacity', 'backgroundColor'];
var animateTypes3 = ['width', 'height', 'left', 'right', 'top', 'bottom'];
animateTypes1.concat(animateTypes2, animateTypes3).forEach(function (type) {
  MPAnimation.prototype[type] = function () {var _this$animation;

    (_this$animation = this.animation)[type].apply(_this$animation, arguments);




    return this;
  };
});

function createAnimation(option, _this) {
  if (!_this) return;
  clearTimeout(_this.timer);
  return new MPAnimation(option, _this);
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 4:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2022 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i, i++)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu' || vm.mpHost === 'mp-kuaishou' || vm.mpHost === 'mp-xhs'){//百度、快手、小红书 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue !== pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"NODE_ENV":"development","VUE_APP_NAME":"Tiktok-app","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"NODE_ENV":"development","VUE_APP_NAME":"Tiktok-app","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_NAME":"Tiktok-app","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"NODE_ENV":"development","VUE_APP_NAME":"Tiktok-app","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = typeof getApp === 'function' && getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      var triggerEvent = this.$scope['_triggerEvent'] || this.$scope['triggerEvent'];
      if (triggerEvent) {
        triggerEvent.call(this.$scope, event, {
          __args__: toArray(arguments, 1)
        });
      }
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    // 解决动态属性添加
    Vue.set(target, key, value);
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    // 解决动态属性添加
    Vue.set(target, key, value);
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onInit',
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize',
    'onUploadDouyinVideo'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 2)))

/***/ }),

/***/ 5:
/*!***********************************************!*\
  !*** D:/Project/Tiktok/tiktok-app/pages.json ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 51:
/*!************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/uni-cloud/dist/index.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 52));var _uniI18n = __webpack_require__(/*! @dcloudio/uni-i18n */ 3);var _pages = _interopRequireDefault(__webpack_require__(/*! @/pages.json */ 55));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _createForOfIteratorHelper(o, allowArrayLike) {var it;if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {if (it) o = it;var i = 0;var F = function F() {};return { s: F, n: function n() {if (i >= o.length) return { done: true };return { done: false, value: o[i++] };}, e: function e(_e32) {throw _e32;}, f: F };}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var normalCompletion = true,didErr = false,err;return { s: function s() {it = o[Symbol.iterator]();}, n: function n() {var step = it.next();normalCompletion = step.done;return step;}, e: function e(_e33) {didErr = true;err = _e33;}, f: function f() {try {if (!normalCompletion && it.return != null) it.return();} finally {if (didErr) throw err;}} };}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function");}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });if (superClass) _setPrototypeOf(subClass, superClass);}function _createSuper(Derived) {var hasNativeReflectConstruct = _isNativeReflectConstruct();return function _createSuperInternal() {var Super = _getPrototypeOf(Derived),result;if (hasNativeReflectConstruct) {var NewTarget = _getPrototypeOf(this).constructor;result = Reflect.construct(Super, arguments, NewTarget);} else {result = Super.apply(this, arguments);}return _possibleConstructorReturn(this, result);};}function _possibleConstructorReturn(self, call) {if (call && (typeof call === "object" || typeof call === "function")) {return call;}return _assertThisInitialized(self);}function _assertThisInitialized(self) {if (self === void 0) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _wrapNativeSuper(Class) {var _cache = typeof Map === "function" ? new Map() : undefined;_wrapNativeSuper = function _wrapNativeSuper(Class) {if (Class === null || !_isNativeFunction(Class)) return Class;if (typeof Class !== "function") {throw new TypeError("Super expression must either be null or a function");}if (typeof _cache !== "undefined") {if (_cache.has(Class)) return _cache.get(Class);_cache.set(Class, Wrapper);}function Wrapper() {return _construct(Class, arguments, _getPrototypeOf(this).constructor);}Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } });return _setPrototypeOf(Wrapper, Class);};return _wrapNativeSuper(Class);}function _construct(Parent, args, Class) {if (_isNativeReflectConstruct()) {_construct = Reflect.construct;} else {_construct = function _construct(Parent, args, Class) {var a = [null];a.push.apply(a, args);var Constructor = Function.bind.apply(Parent, a);var instance = new Constructor();if (Class) _setPrototypeOf(instance, Class.prototype);return instance;};}return _construct.apply(null, arguments);}function _isNativeReflectConstruct() {if (typeof Reflect === "undefined" || !Reflect.construct) return false;if (Reflect.construct.sham) return false;if (typeof Proxy === "function") return true;try {Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));return true;} catch (e) {return false;}}function _isNativeFunction(fn) {return Function.toString.call(fn).indexOf("[native code]") !== -1;}function _setPrototypeOf(o, p) {_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {o.__proto__ = p;return o;};return _setPrototypeOf(o, p);}function _getPrototypeOf(o) {_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {return o.__proto__ || Object.getPrototypeOf(o);};return _getPrototypeOf(o);}"undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self && self;function n(e) {return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;}function s(e, t, n) {return e(n = { path: t, exports: {}, require: function require(e, t) {return function () {throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");}(null == t && n.path);} }, n.exports), n.exports;}var o = s(function (e, t) {var n;e.exports = (n = n || function (e, t) {var n = Object.create || function () {function e() {}return function (t) {var n;return e.prototype = t, n = new e(), e.prototype = null, n;};}(),s = {},o = s.lib = {},r = o.Base = { extend: function extend(e) {var t = n(this);return e && t.mixIn(e), t.hasOwnProperty("init") && this.init !== t.init || (t.init = function () {t.$super.init.apply(this, arguments);}), t.init.prototype = t, t.$super = this, t;}, create: function create() {var e = this.extend();return e.init.apply(e, arguments), e;}, init: function init() {}, mixIn: function mixIn(e) {for (var t in e) {e.hasOwnProperty(t) && (this[t] = e[t]);}e.hasOwnProperty("toString") && (this.toString = e.toString);}, clone: function clone() {return this.init.prototype.extend(this);} },i = o.WordArray = r.extend({ init: function init(e, n) {e = this.words = e || [], this.sigBytes = n != t ? n : 4 * e.length;}, toString: function toString(e) {return (e || c).stringify(this);}, concat: function concat(e) {var t = this.words,n = e.words,s = this.sigBytes,o = e.sigBytes;if (this.clamp(), s % 4) for (var r = 0; r < o; r++) {var i = n[r >>> 2] >>> 24 - r % 4 * 8 & 255;t[s + r >>> 2] |= i << 24 - (s + r) % 4 * 8;} else for (r = 0; r < o; r += 4) {t[s + r >>> 2] = n[r >>> 2];}return this.sigBytes += o, this;}, clamp: function clamp() {var t = this.words,n = this.sigBytes;t[n >>> 2] &= 4294967295 << 32 - n % 4 * 8, t.length = e.ceil(n / 4);}, clone: function clone() {var e = r.clone.call(this);return e.words = this.words.slice(0), e;}, random: function random(t) {for (var n, s = [], o = function o(t) {t = t;var n = 987654321,s = 4294967295;return function () {var o = ((n = 36969 * (65535 & n) + (n >> 16) & s) << 16) + (t = 18e3 * (65535 & t) + (t >> 16) & s) & s;return o /= 4294967296, (o += .5) * (e.random() > .5 ? 1 : -1);};}, r = 0; r < t; r += 4) {var a = o(4294967296 * (n || e.random()));n = 987654071 * a(), s.push(4294967296 * a() | 0);}return new i.init(s, t);} }),a = s.enc = {},c = a.Hex = { stringify: function stringify(e) {for (var t = e.words, n = e.sigBytes, s = [], o = 0; o < n; o++) {var r = t[o >>> 2] >>> 24 - o % 4 * 8 & 255;s.push((r >>> 4).toString(16)), s.push((15 & r).toString(16));}return s.join("");}, parse: function parse(e) {for (var t = e.length, n = [], s = 0; s < t; s += 2) {n[s >>> 3] |= parseInt(e.substr(s, 2), 16) << 24 - s % 8 * 4;}return new i.init(n, t / 2);} },u = a.Latin1 = { stringify: function stringify(e) {for (var t = e.words, n = e.sigBytes, s = [], o = 0; o < n; o++) {var r = t[o >>> 2] >>> 24 - o % 4 * 8 & 255;s.push(String.fromCharCode(r));}return s.join("");}, parse: function parse(e) {for (var t = e.length, n = [], s = 0; s < t; s++) {n[s >>> 2] |= (255 & e.charCodeAt(s)) << 24 - s % 4 * 8;}return new i.init(n, t);} },l = a.Utf8 = { stringify: function stringify(e) {try {return decodeURIComponent(escape(u.stringify(e)));} catch (e) {throw new Error("Malformed UTF-8 data");}}, parse: function parse(e) {return u.parse(unescape(encodeURIComponent(e)));} },h = o.BufferedBlockAlgorithm = r.extend({ reset: function reset() {this._data = new i.init(), this._nDataBytes = 0;}, _append: function _append(e) {"string" == typeof e && (e = l.parse(e)), this._data.concat(e), this._nDataBytes += e.sigBytes;}, _process: function _process(t) {var n = this._data,s = n.words,o = n.sigBytes,r = this.blockSize,a = o / (4 * r),c = (a = t ? e.ceil(a) : e.max((0 | a) - this._minBufferSize, 0)) * r,u = e.min(4 * c, o);if (c) {for (var l = 0; l < c; l += r) {this._doProcessBlock(s, l);}var h = s.splice(0, c);n.sigBytes -= u;}return new i.init(h, u);}, clone: function clone() {var e = r.clone.call(this);return e._data = this._data.clone(), e;}, _minBufferSize: 0 });o.Hasher = h.extend({ cfg: r.extend(), init: function init(e) {this.cfg = this.cfg.extend(e), this.reset();}, reset: function reset() {h.reset.call(this), this._doReset();}, update: function update(e) {return this._append(e), this._process(), this;}, finalize: function finalize(e) {return e && this._append(e), this._doFinalize();}, blockSize: 16, _createHelper: function _createHelper(e) {return function (t, n) {return new e.init(n).finalize(t);};}, _createHmacHelper: function _createHmacHelper(e) {return function (t, n) {return new d.HMAC.init(e, n).finalize(t);};} });var d = s.algo = {};return s;}(Math), n);}),r = (s(function (e, t) {var n;e.exports = (n = o, function (e) {var t = n,s = t.lib,o = s.WordArray,r = s.Hasher,i = t.algo,a = [];!function () {for (var t = 0; t < 64; t++) {a[t] = 4294967296 * e.abs(e.sin(t + 1)) | 0;}}();var c = i.MD5 = r.extend({ _doReset: function _doReset() {this._hash = new o.init([1732584193, 4023233417, 2562383102, 271733878]);}, _doProcessBlock: function _doProcessBlock(e, t) {for (var n = 0; n < 16; n++) {var s = t + n,o = e[s];e[s] = 16711935 & (o << 8 | o >>> 24) | 4278255360 & (o << 24 | o >>> 8);}var r = this._hash.words,i = e[t + 0],c = e[t + 1],f = e[t + 2],g = e[t + 3],p = e[t + 4],m = e[t + 5],y = e[t + 6],_ = e[t + 7],w = e[t + 8],k = e[t + 9],v = e[t + 10],T = e[t + 11],S = e[t + 12],P = e[t + 13],A = e[t + 14],I = e[t + 15],b = r[0],O = r[1],C = r[2],E = r[3];b = u(b, O, C, E, i, 7, a[0]), E = u(E, b, O, C, c, 12, a[1]), C = u(C, E, b, O, f, 17, a[2]), O = u(O, C, E, b, g, 22, a[3]), b = u(b, O, C, E, p, 7, a[4]), E = u(E, b, O, C, m, 12, a[5]), C = u(C, E, b, O, y, 17, a[6]), O = u(O, C, E, b, _, 22, a[7]), b = u(b, O, C, E, w, 7, a[8]), E = u(E, b, O, C, k, 12, a[9]), C = u(C, E, b, O, v, 17, a[10]), O = u(O, C, E, b, T, 22, a[11]), b = u(b, O, C, E, S, 7, a[12]), E = u(E, b, O, C, P, 12, a[13]), C = u(C, E, b, O, A, 17, a[14]), b = l(b, O = u(O, C, E, b, I, 22, a[15]), C, E, c, 5, a[16]), E = l(E, b, O, C, y, 9, a[17]), C = l(C, E, b, O, T, 14, a[18]), O = l(O, C, E, b, i, 20, a[19]), b = l(b, O, C, E, m, 5, a[20]), E = l(E, b, O, C, v, 9, a[21]), C = l(C, E, b, O, I, 14, a[22]), O = l(O, C, E, b, p, 20, a[23]), b = l(b, O, C, E, k, 5, a[24]), E = l(E, b, O, C, A, 9, a[25]), C = l(C, E, b, O, g, 14, a[26]), O = l(O, C, E, b, w, 20, a[27]), b = l(b, O, C, E, P, 5, a[28]), E = l(E, b, O, C, f, 9, a[29]), C = l(C, E, b, O, _, 14, a[30]), b = h(b, O = l(O, C, E, b, S, 20, a[31]), C, E, m, 4, a[32]), E = h(E, b, O, C, w, 11, a[33]), C = h(C, E, b, O, T, 16, a[34]), O = h(O, C, E, b, A, 23, a[35]), b = h(b, O, C, E, c, 4, a[36]), E = h(E, b, O, C, p, 11, a[37]), C = h(C, E, b, O, _, 16, a[38]), O = h(O, C, E, b, v, 23, a[39]), b = h(b, O, C, E, P, 4, a[40]), E = h(E, b, O, C, i, 11, a[41]), C = h(C, E, b, O, g, 16, a[42]), O = h(O, C, E, b, y, 23, a[43]), b = h(b, O, C, E, k, 4, a[44]), E = h(E, b, O, C, S, 11, a[45]), C = h(C, E, b, O, I, 16, a[46]), b = d(b, O = h(O, C, E, b, f, 23, a[47]), C, E, i, 6, a[48]), E = d(E, b, O, C, _, 10, a[49]), C = d(C, E, b, O, A, 15, a[50]), O = d(O, C, E, b, m, 21, a[51]), b = d(b, O, C, E, S, 6, a[52]), E = d(E, b, O, C, g, 10, a[53]), C = d(C, E, b, O, v, 15, a[54]), O = d(O, C, E, b, c, 21, a[55]), b = d(b, O, C, E, w, 6, a[56]), E = d(E, b, O, C, I, 10, a[57]), C = d(C, E, b, O, y, 15, a[58]), O = d(O, C, E, b, P, 21, a[59]), b = d(b, O, C, E, p, 6, a[60]), E = d(E, b, O, C, T, 10, a[61]), C = d(C, E, b, O, f, 15, a[62]), O = d(O, C, E, b, k, 21, a[63]), r[0] = r[0] + b | 0, r[1] = r[1] + O | 0, r[2] = r[2] + C | 0, r[3] = r[3] + E | 0;}, _doFinalize: function _doFinalize() {var t = this._data,n = t.words,s = 8 * this._nDataBytes,o = 8 * t.sigBytes;n[o >>> 5] |= 128 << 24 - o % 32;var r = e.floor(s / 4294967296),i = s;n[15 + (o + 64 >>> 9 << 4)] = 16711935 & (r << 8 | r >>> 24) | 4278255360 & (r << 24 | r >>> 8), n[14 + (o + 64 >>> 9 << 4)] = 16711935 & (i << 8 | i >>> 24) | 4278255360 & (i << 24 | i >>> 8), t.sigBytes = 4 * (n.length + 1), this._process();for (var a = this._hash, c = a.words, u = 0; u < 4; u++) {var l = c[u];c[u] = 16711935 & (l << 8 | l >>> 24) | 4278255360 & (l << 24 | l >>> 8);}return a;}, clone: function clone() {var e = r.clone.call(this);return e._hash = this._hash.clone(), e;} });function u(e, t, n, s, o, r, i) {var a = e + (t & n | ~t & s) + o + i;return (a << r | a >>> 32 - r) + t;}function l(e, t, n, s, o, r, i) {var a = e + (t & s | n & ~s) + o + i;return (a << r | a >>> 32 - r) + t;}function h(e, t, n, s, o, r, i) {var a = e + (t ^ n ^ s) + o + i;return (a << r | a >>> 32 - r) + t;}function d(e, t, n, s, o, r, i) {var a = e + (n ^ (t | ~s)) + o + i;return (a << r | a >>> 32 - r) + t;}t.MD5 = r._createHelper(c), t.HmacMD5 = r._createHmacHelper(c);}(Math), n.MD5);}), s(function (e, t) {var n, s, r;e.exports = (s = (n = o).lib.Base, r = n.enc.Utf8, void (n.algo.HMAC = s.extend({ init: function init(e, t) {e = this._hasher = new e.init(), "string" == typeof t && (t = r.parse(t));var n = e.blockSize,s = 4 * n;t.sigBytes > s && (t = e.finalize(t)), t.clamp();for (var o = this._oKey = t.clone(), i = this._iKey = t.clone(), a = o.words, c = i.words, u = 0; u < n; u++) {a[u] ^= 1549556828, c[u] ^= 909522486;}o.sigBytes = i.sigBytes = s, this.reset();}, reset: function reset() {var e = this._hasher;e.reset(), e.update(this._iKey);}, update: function update(e) {return this._hasher.update(e), this;}, finalize: function finalize(e) {var t = this._hasher,n = t.finalize(e);return t.reset(), t.finalize(this._oKey.clone().concat(n));} })));}), s(function (e, t) {e.exports = o.HmacMD5;}));var i = "FUNCTION",a = "OBJECT",c = "CLIENT_DB";function u(e) {return Object.prototype.toString.call(e).slice(8, -1).toLowerCase();}function l(e) {return "object" === u(e);}function h(e) {return e && "string" == typeof e ? JSON.parse(e) : e;}var d = "development" === "development",f = "mp-weixin";var g;switch (f) {case "h5":g = "web";break;case "app-plus":g = "app";break;default:g = f;}var p = h(undefined),m = h(undefined) || [],y = true;var _ = "";try {{var _e2 = __webpack_require__(/*! uni-stat-config */ 56).default || __webpack_require__(/*! uni-stat-config */ 56);_ = _e2.appid;}} catch (e) {}var w = {};function k(e) {var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var n, s;return n = w, s = e, Object.prototype.hasOwnProperty.call(n, s) || (w[e] = t), w[e];}"app" === g && (w = uni._globalUniCloudObj ? uni._globalUniCloudObj : uni._globalUniCloudObj = {});var v = ["invoke", "success", "fail", "complete"],T = k("_globalUniCloudInterceptor");function S(e, t) {T[e] || (T[e] = {}), l(t) && Object.keys(t).forEach(function (n) {v.indexOf(n) > -1 && function (e, t, n) {var s = T[e][t];s || (s = T[e][t] = []), -1 === s.indexOf(n) && "function" == typeof n && s.push(n);}(e, n, t[n]);});}function P(e, t) {T[e] || (T[e] = {}), l(t) ? Object.keys(t).forEach(function (n) {v.indexOf(n) > -1 && function (e, t, n) {var s = T[e][t];if (!s) return;var o = s.indexOf(n);o > -1 && s.splice(o, 1);}(e, n, t[n]);}) : delete T[e];}function A(e, t) {return e && 0 !== e.length ? e.reduce(function (e, n) {return e.then(function () {return n(t);});}, Promise.resolve()) : Promise.resolve();}function I(e, t) {return T[e] && T[e][t] || [];}function b(e) {S("callObject", e);}var O = k("_globalUniCloudListener"),C = "response",E = "needLogin",R = "refreshToken",U = "clientdb",x = "cloudfunction",L = "cloudobject";function D(e) {return O[e] || (O[e] = []), O[e];}function N(e, t) {var n = D(e);n.includes(t) || n.push(t);}function q(e, t) {var n = D(e),s = n.indexOf(t);-1 !== s && n.splice(s, 1);}function F(e, t) {var n = D(e);for (var _e3 = 0; _e3 < n.length; _e3++) {(0, n[_e3])(t);}}var M = !1;var j = new Promise(function (e) {M && e(), function t() {if ("function" == typeof getCurrentPages) {var _t2 = getCurrentPages();_t2 && _t2[0] && (M = !0, e());}M || setTimeout(function () {t();}, 30);}();});function $() {return j;}function K(e, t) {return t ? function (n) {var _this = this;var s = !1;if ("callFunction" === t) {var _e4 = n && n.type || i;s = _e4 !== i;}var o = "callFunction" === t && !s;var r;r = this.isReady ? Promise.resolve() : this.initUniCloud, n = n || {};var a = r.then(function () {return s ? Promise.resolve() : A(I(t, "invoke"), n);}).then(function () {return e.call(_this, n);}).then(function (e) {return s ? Promise.resolve(e) : A(I(t, "success"), e).then(function () {return A(I(t, "complete"), e);}).then(function () {return o && F(C, { type: x, content: e }), Promise.resolve(e);});}, function (e) {return s ? Promise.reject(e) : A(I(t, "fail"), e).then(function () {return A(I(t, "complete"), e);}).then(function () {return F(C, { type: x, content: e }), Promise.reject(e);});});if (!(n.success || n.fail || n.complete)) return a;a.then(function (e) {n.success && n.success(e), n.complete && n.complete(e), o && F(C, { type: x, content: e });}, function (e) {n.fail && n.fail(e), n.complete && n.complete(e), o && F(C, { type: x, content: e });});} : function (t) {if (!((t = t || {}).success || t.fail || t.complete)) return e.call(this, t);e.call(this, t).then(function (e) {t.success && t.success(e), t.complete && t.complete(e);}, function (e) {t.fail && t.fail(e), t.complete && t.complete(e);});};}var B = /*#__PURE__*/function (_Error) {_inherits(B, _Error);var _super = _createSuper(B);function B(e) {var _this2;_classCallCheck(this, B);_this2 = _super.call(this, e.message), _this2.errMsg = e.message || "", _this2.errCode = _this2.code = e.code || "SYSTEM_ERROR", _this2.requestId = e.requestId;return _this2;}return B;}( /*#__PURE__*/_wrapNativeSuper(Error));function H() {var e, t;try {if (uni.getLaunchOptionsSync) {if (uni.getLaunchOptionsSync.toString().indexOf("not yet implemented") > -1) return;var _uni$getLaunchOptions = uni.getLaunchOptionsSync(),_n = _uni$getLaunchOptions.scene,_s = _uni$getLaunchOptions.channel;e = _s, t = _n;}} catch (e) {}return { channel: e, scene: t };}var W;function z() {var e = uni.getLocale && uni.getLocale() || "en";if (W) return _objectSpread(_objectSpread({}, W), {}, { locale: e, LOCALE: e });var t = uni.getSystemInfoSync(),n = t.deviceId,s = t.osName,o = t.uniPlatform,r = t.appId,i = ["pixelRatio", "brand", "model", "system", "language", "version", "platform", "host", "SDKVersion", "swanNativeVersion", "app", "AppPlatform", "fontSizeSetting"];for (var _e5 = 0; _e5 < i.length; _e5++) {delete t[i[_e5]];}return W = _objectSpread(_objectSpread({ PLATFORM: o, OS: s, APPID: r, DEVICEID: n }, H()), t), _objectSpread(_objectSpread({}, W), {}, { locale: e, LOCALE: e });}var J = { sign: function sign(e, t) {var n = "";return Object.keys(e).sort().forEach(function (t) {e[t] && (n = n + "&" + t + "=" + e[t]);}), n = n.slice(1), r(n, t).toString();}, wrappedRequest: function wrappedRequest(e, t) {return new Promise(function (n, s) {t(Object.assign(e, { complete: function complete(e) {e || (e = {}), d && "web" === g && e.errMsg && 0 === e.errMsg.indexOf("request:fail") && console.warn("发布H5，需要在uniCloud后台操作，绑定安全域名，否则会因为跨域问题而无法访问。教程参考：https://uniapp.dcloud.io/uniCloud/quickstart?id=useinh5");var t = e.data && e.data.header && e.data.header["x-serverless-request-id"] || e.header && e.header["request-id"];if (!e.statusCode || e.statusCode >= 400) return s(new B({ code: "SYS_ERR", message: e.errMsg || "request:fail", requestId: t }));var o = e.data;if (o.error) return s(new B({ code: o.error.code, message: o.error.message, requestId: t }));o.result = o.data, o.requestId = t, delete o.data, n(o);} }));});} };var V = { request: function request(e) {return uni.request(e);}, uploadFile: function uploadFile(e) {return uni.uploadFile(e);}, setStorageSync: function setStorageSync(e, t) {return uni.setStorageSync(e, t);}, getStorageSync: function getStorageSync(e) {return uni.getStorageSync(e);}, removeStorageSync: function removeStorageSync(e) {return uni.removeStorageSync(e);}, clearStorageSync: function clearStorageSync() {return uni.clearStorageSync();} },Y = { "uniCloud.init.paramRequired": "{param} required", "uniCloud.uploadFile.fileError": "filePath should be instance of File" };var _e6 = (0, _uniI18n.initVueI18n)({ "zh-Hans": { "uniCloud.init.paramRequired": "缺少参数：{param}", "uniCloud.uploadFile.fileError": "filePath应为File对象" }, "zh-Hant": { "uniCloud.init.paramRequired": "缺少参数：{param}", "uniCloud.uploadFile.fileError": "filePath应为File对象" }, en: Y, fr: { "uniCloud.init.paramRequired": "{param} required", "uniCloud.uploadFile.fileError": "filePath should be instance of File" }, es: { "uniCloud.init.paramRequired": "{param} required", "uniCloud.uploadFile.fileError": "filePath should be instance of File" }, ja: Y }, "zh-Hans"),X = _e6.t;var G = /*#__PURE__*/function () {function G(e) {_classCallCheck(this, G);["spaceId", "clientSecret"].forEach(function (t) {if (!Object.prototype.hasOwnProperty.call(e, t)) throw new Error(X("uniCloud.init.paramRequired", { param: t }));}), this.config = Object.assign({}, { endpoint: "https://api.bspapp.com" }, e), this.config.provider = "aliyun", this.config.requestUrl = this.config.endpoint + "/client", this.config.envType = this.config.envType || "public", this.config.accessTokenKey = "access_token_" + this.config.spaceId, this.adapter = V, this._getAccessTokenPromise = null, this._getAccessTokenPromiseStatus = null;}_createClass(G, [{ key: "setAccessToken", value: function setAccessToken(e) {this.accessToken = e;} }, { key: "requestWrapped", value: function requestWrapped(e) {return J.wrappedRequest(e, this.adapter.request);} }, { key: "requestAuth", value: function requestAuth(e) {return this.requestWrapped(e);} }, { key: "request", value: function request(e, t) {var _this3 = this;return Promise.resolve().then(function () {return _this3.hasAccessToken ? t ? _this3.requestWrapped(e) : _this3.requestWrapped(e).catch(function (t) {return new Promise(function (e, n) {!t || "GATEWAY_INVALID_TOKEN" !== t.code && "InvalidParameter.InvalidToken" !== t.code ? n(t) : e();}).then(function () {return _this3.getAccessToken();}).then(function () {var t = _this3.rebuildRequest(e);return _this3.request(t, !0);});}) : _this3.getAccessToken().then(function () {var t = _this3.rebuildRequest(e);return _this3.request(t, !0);});});} }, { key: "rebuildRequest", value: function rebuildRequest(e) {var t = Object.assign({}, e);return t.data.token = this.accessToken, t.header["x-basement-token"] = this.accessToken, t.header["x-serverless-sign"] = J.sign(t.data, this.config.clientSecret), t;} }, { key: "setupRequest", value: function setupRequest(e, t) {var n = Object.assign({}, e, { spaceId: this.config.spaceId, timestamp: Date.now() }),s = { "Content-Type": "application/json" };return "auth" !== t && (n.token = this.accessToken, s["x-basement-token"] = this.accessToken), s["x-serverless-sign"] = J.sign(n, this.config.clientSecret), { url: this.config.requestUrl, method: "POST", data: n, dataType: "json", header: s };} }, { key: "getAccessToken", value: function getAccessToken() {var _this4 = this;if ("pending" === this._getAccessTokenPromiseStatus) return this._getAccessTokenPromise;this._getAccessTokenPromiseStatus = "pending";return this._getAccessTokenPromise = this.requestAuth(this.setupRequest({ method: "serverless.auth.user.anonymousAuthorize", params: "{}" }, "auth")).then(function (e) {return new Promise(function (t, n) {e.result && e.result.accessToken ? (_this4.setAccessToken(e.result.accessToken), _this4._getAccessTokenPromiseStatus = "fulfilled", t(_this4.accessToken)) : (_this4._getAccessTokenPromiseStatus = "rejected", n(new B({ code: "AUTH_FAILED", message: "获取accessToken失败" })));});}, function (e) {return _this4._getAccessTokenPromiseStatus = "rejected", Promise.reject(e);}), this._getAccessTokenPromise;} }, { key: "authorize", value: function authorize() {this.getAccessToken();} }, { key: "callFunction", value: function callFunction(e) {var t = { method: "serverless.function.runtime.invoke", params: JSON.stringify({ functionTarget: e.name, functionArgs: e.data || {} }) };return this.request(this.setupRequest(t));} }, { key: "getOSSUploadOptionsFromPath", value: function getOSSUploadOptionsFromPath(e) {var t = { method: "serverless.file.resource.generateProximalSign", params: JSON.stringify(e) };return this.request(this.setupRequest(t));} }, { key: "uploadFileToOSS", value: function uploadFileToOSS(_ref) {var _this5 = this;var e = _ref.url,t = _ref.formData,n = _ref.name,s = _ref.filePath,o = _ref.fileType,r = _ref.onUploadProgress;return new Promise(function (i, a) {var c = _this5.adapter.uploadFile({ url: e, formData: t, name: n, filePath: s, fileType: o, header: { "X-OSS-server-side-encrpytion": "AES256" }, success: function success(e) {e && e.statusCode < 400 ? i(e) : a(new B({ code: "UPLOAD_FAILED", message: "文件上传失败" }));}, fail: function fail(e) {a(new B({ code: e.code || "UPLOAD_FAILED", message: e.message || e.errMsg || "文件上传失败" }));} });"function" == typeof r && c && "function" == typeof c.onProgressUpdate && c.onProgressUpdate(function (e) {r({ loaded: e.totalBytesSent, total: e.totalBytesExpectedToSend });});});} }, { key: "reportOSSUpload", value: function reportOSSUpload(e) {var t = { method: "serverless.file.resource.report", params: JSON.stringify(e) };return this.request(this.setupRequest(t));} }, { key: "uploadFile", value: function uploadFile(_ref2) {var _this6 = this;var e = _ref2.filePath,t = _ref2.cloudPath,_ref2$fileType = _ref2.fileType,n = _ref2$fileType === void 0 ? "image" : _ref2$fileType,s = _ref2.onUploadProgress,o = _ref2.config;if ("string" !== u(t)) throw new B({ code: "INVALID_PARAM", message: "cloudPath必须为字符串类型" });if (!(t = t.trim())) throw new B({ code: "CLOUDPATH_REQUIRED", message: "cloudPath不可为空" });if (/:\/\//.test(t)) throw new B({ code: "INVALID_PARAM", message: "cloudPath不合法" });var r = o && o.envType || this.config.envType;var i, a;return this.getOSSUploadOptionsFromPath({ env: r, filename: t }).then(function (t) {var o = t.result;i = o.id, a = "https://" + o.cdnDomain + "/" + o.ossPath;var r = { url: "https://" + o.host, formData: { "Cache-Control": "max-age=2592000", "Content-Disposition": "attachment", OSSAccessKeyId: o.accessKeyId, Signature: o.signature, host: o.host, id: i, key: o.ossPath, policy: o.policy, success_action_status: 200 }, fileName: "file", name: "file", filePath: e, fileType: n };return _this6.uploadFileToOSS(Object.assign({}, r, { onUploadProgress: s }));}).then(function () {return _this6.reportOSSUpload({ id: i });}).then(function (t) {return new Promise(function (n, s) {t.success ? n({ success: !0, filePath: e, fileID: a }) : s(new B({ code: "UPLOAD_FAILED", message: "文件上传失败" }));});});} }, { key: "deleteFile", value: function deleteFile(_ref3) {var e = _ref3.fileList;var t = { method: "serverless.file.resource.delete", params: JSON.stringify({ id: e[0] }) };return this.request(this.setupRequest(t));} }, { key: "getTempFileURL", value: function getTempFileURL() {var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},e = _ref4.fileList;return new Promise(function (t, n) {Array.isArray(e) && 0 !== e.length || n(new B({ code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" })), t({ fileList: e.map(function (e) {return { fileID: e, tempFileURL: e };}) });});} }, { key: "hasAccessToken", get: function get() {return !!this.accessToken;} }]);return G;}();var Q = { init: function init(e) {var t = new G(e),n = { signInAnonymously: function signInAnonymously() {return t.authorize();}, getLoginState: function getLoginState() {return Promise.resolve(!1);} };return t.auth = function () {return n;}, t.customAuth = t.auth, t;} };var Z = "undefined" != typeof location && "http:" === location.protocol ? "http:" : "https:";var ee;!function (e) {e.local = "local", e.none = "none", e.session = "session";}(ee || (ee = {}));var te = function te() {};var ne = function ne() {var e;if (!Promise) {e = function e() {}, e.promise = {};var _t3 = function _t3() {throw new B({ message: 'Your Node runtime does support ES6 Promises. Set "global.Promise" to your preferred implementation of promises.' });};return Object.defineProperty(e.promise, "then", { get: _t3 }), Object.defineProperty(e.promise, "catch", { get: _t3 }), e;}var t = new Promise(function (t, n) {e = function e(_e7, s) {return _e7 ? n(_e7) : t(s);};});return e.promise = t, e;};function se(e) {return void 0 === e;}function oe(e) {return "[object Null]" === Object.prototype.toString.call(e);}var re;function ie(e) {var t = (n = e, "[object Array]" === Object.prototype.toString.call(n) ? e : [e]);var n;var _iterator = _createForOfIteratorHelper(t),_step;try {for (_iterator.s(); !(_step = _iterator.n()).done;) {var _e8 = _step.value;var _t4 = _e8.isMatch,_n2 = _e8.genAdapter,_s2 = _e8.runtime;if (_t4()) return { adapter: _n2(), runtime: _s2 };}} catch (err) {_iterator.e(err);} finally {_iterator.f();}}!function (e) {e.WEB = "web", e.WX_MP = "wx_mp";}(re || (re = {}));var ae = { adapter: null, runtime: void 0 },ce = ["anonymousUuidKey"];var ue = /*#__PURE__*/function (_te) {_inherits(ue, _te);var _super2 = _createSuper(ue);function ue() {var _this7;_classCallCheck(this, ue);_this7 = _super2.call(this), ae.adapter.root.tcbObject || (ae.adapter.root.tcbObject = {});return _this7;}_createClass(ue, [{ key: "setItem", value: function setItem(e, t) {ae.adapter.root.tcbObject[e] = t;} }, { key: "getItem", value: function getItem(e) {return ae.adapter.root.tcbObject[e];} }, { key: "removeItem", value: function removeItem(e) {delete ae.adapter.root.tcbObject[e];} }, { key: "clear", value: function clear() {delete ae.adapter.root.tcbObject;} }]);return ue;}(te);function le(e, t) {switch (e) {case "local":return t.localStorage || new ue();case "none":return new ue();default:return t.sessionStorage || new ue();}}var he = /*#__PURE__*/function () {function he(e) {_classCallCheck(this, he);if (!this._storage) {this._persistence = ae.adapter.primaryStorage || e.persistence, this._storage = le(this._persistence, ae.adapter);var _t5 = "access_token_".concat(e.env),_n3 = "access_token_expire_".concat(e.env),_s3 = "refresh_token_".concat(e.env),_o = "anonymous_uuid_".concat(e.env),_r = "login_type_".concat(e.env),_i = "user_info_".concat(e.env);this.keys = { accessTokenKey: _t5, accessTokenExpireKey: _n3, refreshTokenKey: _s3, anonymousUuidKey: _o, loginTypeKey: _r, userInfoKey: _i };}}_createClass(he, [{ key: "updatePersistence", value: function updatePersistence(e) {if (e === this._persistence) return;var t = "local" === this._persistence;this._persistence = e;var n = le(e, ae.adapter);for (var _e9 in this.keys) {var _s4 = this.keys[_e9];if (t && ce.includes(_e9)) continue;var _o2 = this._storage.getItem(_s4);se(_o2) || oe(_o2) || (n.setItem(_s4, _o2), this._storage.removeItem(_s4));}this._storage = n;} }, { key: "setStore", value: function setStore(e, t, n) {if (!this._storage) return;var s = { version: n || "localCachev1", content: t },o = JSON.stringify(s);try {this._storage.setItem(e, o);} catch (e) {throw e;}} }, { key: "getStore", value: function getStore(e, t) {try {if (!this._storage) return;} catch (e) {return "";}t = t || "localCachev1";var n = this._storage.getItem(e);if (!n) return "";if (n.indexOf(t) >= 0) {return JSON.parse(n).content;}return "";} }, { key: "removeStore", value: function removeStore(e) {this._storage.removeItem(e);} }]);return he;}();var de = {},fe = {};function ge(e) {return de[e];}var pe = function pe(e, t) {_classCallCheck(this, pe);this.data = t || null, this.name = e;};var me = /*#__PURE__*/function (_pe) {_inherits(me, _pe);var _super3 = _createSuper(me);function me(e, t) {var _this8;_classCallCheck(this, me);_this8 = _super3.call(this, "error", { error: e, data: t }), _this8.error = e;return _this8;}return me;}(pe);var ye = new ( /*#__PURE__*/function () {function _class() {_classCallCheck(this, _class);this._listeners = {};}_createClass(_class, [{ key: "on", value: function on(e, t) {return function (e, t, n) {n[e] = n[e] || [], n[e].push(t);}(e, t, this._listeners), this;} }, { key: "off", value: function off(e, t) {return function (e, t, n) {if (n && n[e]) {var _s5 = n[e].indexOf(t);-1 !== _s5 && n[e].splice(_s5, 1);}}(e, t, this._listeners), this;} }, { key: "fire", value: function fire(e, t) {if (e instanceof me) return console.error(e.error), this;var n = "string" == typeof e ? new pe(e, t || {}) : e;var s = n.name;if (this._listens(s)) {n.target = this;var _e10 = this._listeners[s] ? _toConsumableArray(this._listeners[s]) : [];var _iterator2 = _createForOfIteratorHelper(_e10),_step2;try {for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {var _t6 = _step2.value;_t6.call(this, n);}} catch (err) {_iterator2.e(err);} finally {_iterator2.f();}}return this;} }, { key: "_listens", value: function _listens(e) {return this._listeners[e] && this._listeners[e].length > 0;} }]);return _class;}())();function _e(e, t) {ye.on(e, t);}function we(e) {var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};ye.fire(e, t);}function ke(e, t) {ye.off(e, t);}var ve = "loginStateChanged",Te = "loginStateExpire",Se = "loginTypeChanged",Pe = "anonymousConverted",Ae = "refreshAccessToken";var Ie;!function (e) {e.ANONYMOUS = "ANONYMOUS", e.WECHAT = "WECHAT", e.WECHAT_PUBLIC = "WECHAT-PUBLIC", e.WECHAT_OPEN = "WECHAT-OPEN", e.CUSTOM = "CUSTOM", e.EMAIL = "EMAIL", e.USERNAME = "USERNAME", e.NULL = "NULL";}(Ie || (Ie = {}));var be = ["auth.getJwt", "auth.logout", "auth.signInWithTicket", "auth.signInAnonymously", "auth.signIn", "auth.fetchAccessTokenWithRefreshToken", "auth.signUpWithEmailAndPassword", "auth.activateEndUserMail", "auth.sendPasswordResetEmail", "auth.resetPasswordWithToken", "auth.isUsernameRegistered"],Oe = { "X-SDK-Version": "1.3.5" };function Ce(e, t, n) {var s = e[t];e[t] = function (t) {var o = {},r = {};n.forEach(function (n) {var _n$call = n.call(e, t),s = _n$call.data,i = _n$call.headers;Object.assign(o, s), Object.assign(r, i);});var i = t.data;return i && function () {var e;if (e = i, "[object FormData]" !== Object.prototype.toString.call(e)) t.data = _objectSpread(_objectSpread({}, i), o);else for (var _e11 in o) {i.append(_e11, o[_e11]);}}(), t.headers = _objectSpread(_objectSpread({}, t.headers || {}), r), s.call(e, t);};}function Ee() {var e = Math.random().toString(16).slice(2);return { data: { seqId: e }, headers: _objectSpread(_objectSpread({}, Oe), {}, { "x-seqid": e }) };}var Re = /*#__PURE__*/function () {function Re() {var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};_classCallCheck(this, Re);var t;this.config = e, this._reqClass = new ae.adapter.reqClass({ timeout: this.config.timeout, timeoutMsg: "\u8BF7\u6C42\u5728".concat(this.config.timeout / 1e3, "s\u5185\u672A\u5B8C\u6210\uFF0C\u5DF2\u4E2D\u65AD"), restrictedMethods: ["post"] }), this._cache = ge(this.config.env), this._localCache = (t = this.config.env, fe[t]), Ce(this._reqClass, "post", [Ee]), Ce(this._reqClass, "upload", [Ee]), Ce(this._reqClass, "download", [Ee]);}_createClass(Re, [{ key: "post", value: function () {var _post = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(e) {return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_context.next = 2;return this._reqClass.post(e);case 2:return _context.abrupt("return", _context.sent);case 3:case "end":return _context.stop();}}}, _callee, this);}));function post(_x) {return _post.apply(this, arguments);}return post;}() }, { key: "upload", value: function () {var _upload = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2(e) {return _regenerator.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:_context2.next = 2;return this._reqClass.upload(e);case 2:return _context2.abrupt("return", _context2.sent);case 3:case "end":return _context2.stop();}}}, _callee2, this);}));function upload(_x2) {return _upload.apply(this, arguments);}return upload;}() }, { key: "download", value: function () {var _download = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee3(e) {return _regenerator.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:_context3.next = 2;return this._reqClass.download(e);case 2:return _context3.abrupt("return", _context3.sent);case 3:case "end":return _context3.stop();}}}, _callee3, this);}));function download(_x3) {return _download.apply(this, arguments);}return download;}() }, { key: "refreshAccessToken", value: function () {var _refreshAccessToken2 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee4() {var e, t;return _regenerator.default.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:this._refreshAccessTokenPromise || (this._refreshAccessTokenPromise = this._refreshAccessToken());_context4.prev = 1;_context4.next = 4;return this._refreshAccessTokenPromise;case 4:e = _context4.sent;_context4.next = 10;break;case 7:_context4.prev = 7;_context4.t0 = _context4["catch"](1);t = _context4.t0;case 10:if (!(this._refreshAccessTokenPromise = null, this._shouldRefreshAccessTokenHook = null, t)) {_context4.next = 12;break;}throw t;case 12:return _context4.abrupt("return", e);case 13:case "end":return _context4.stop();}}}, _callee4, this, [[1, 7]]);}));function refreshAccessToken() {return _refreshAccessToken2.apply(this, arguments);}return refreshAccessToken;}() }, { key: "_refreshAccessToken", value: function () {var _refreshAccessToken3 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee5() {var _this$_cache$keys, e, t, n, s, o, r, i, a, _e12, _e13, _t7, _s6;return _regenerator.default.wrap(function _callee5$(_context5) {while (1) {switch (_context5.prev = _context5.next) {case 0:_this$_cache$keys = this._cache.keys, e = _this$_cache$keys.accessTokenKey, t = _this$_cache$keys.accessTokenExpireKey, n = _this$_cache$keys.refreshTokenKey, s = _this$_cache$keys.loginTypeKey, o = _this$_cache$keys.anonymousUuidKey;this._cache.removeStore(e), this._cache.removeStore(t);r = this._cache.getStore(n);if (r) {_context5.next = 5;break;}throw new B({ message: "未登录CloudBase" });case 5:i = { refresh_token: r };_context5.next = 8;return this.request("auth.fetchAccessTokenWithRefreshToken", i);case 8:a = _context5.sent;if (!a.data.code) {_context5.next = 21;break;}_e12 = a.data.code;if (!("SIGN_PARAM_INVALID" === _e12 || "REFRESH_TOKEN_EXPIRED" === _e12 || "INVALID_REFRESH_TOKEN" === _e12)) {_context5.next = 20;break;}if (!(this._cache.getStore(s) === Ie.ANONYMOUS && "INVALID_REFRESH_TOKEN" === _e12)) {_context5.next = 19;break;}_e13 = this._cache.getStore(o);_t7 = this._cache.getStore(n);_context5.next = 17;return this.send("auth.signInAnonymously", { anonymous_uuid: _e13, refresh_token: _t7 });case 17:_s6 = _context5.sent;return _context5.abrupt("return", (this.setRefreshToken(_s6.refresh_token), this._refreshAccessToken()));case 19:we(Te), this._cache.removeStore(n);case 20:throw new B({ code: a.data.code, message: "\u5237\u65B0access token\u5931\u8D25\uFF1A".concat(a.data.code) });case 21:if (!a.data.access_token) {_context5.next = 23;break;}return _context5.abrupt("return", (we(Ae), this._cache.setStore(e, a.data.access_token), this._cache.setStore(t, a.data.access_token_expire + Date.now()), { accessToken: a.data.access_token, accessTokenExpire: a.data.access_token_expire }));case 23:a.data.refresh_token && (this._cache.removeStore(n), this._cache.setStore(n, a.data.refresh_token), this._refreshAccessToken());case 24:case "end":return _context5.stop();}}}, _callee5, this);}));function _refreshAccessToken() {return _refreshAccessToken3.apply(this, arguments);}return _refreshAccessToken;}() }, { key: "getAccessToken", value: function () {var _getAccessToken = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee6() {var _this$_cache$keys2, e, t, n, s, o, r;return _regenerator.default.wrap(function _callee6$(_context6) {while (1) {switch (_context6.prev = _context6.next) {case 0:_this$_cache$keys2 = this._cache.keys, e = _this$_cache$keys2.accessTokenKey, t = _this$_cache$keys2.accessTokenExpireKey, n = _this$_cache$keys2.refreshTokenKey;if (this._cache.getStore(n)) {_context6.next = 3;break;}throw new B({ message: "refresh token不存在，登录状态异常" });case 3:s = this._cache.getStore(e), o = this._cache.getStore(t), r = !0;_context6.t0 = this._shouldRefreshAccessTokenHook;if (!_context6.t0) {_context6.next = 9;break;}_context6.next = 8;return this._shouldRefreshAccessTokenHook(s, o);case 8:_context6.t0 = !_context6.sent;case 9:_context6.t1 = _context6.t0;if (!_context6.t1) {_context6.next = 12;break;}r = !1;case 12:return _context6.abrupt("return", (!s || !o || o < Date.now()) && r ? this.refreshAccessToken() : { accessToken: s, accessTokenExpire: o });case 13:case "end":return _context6.stop();}}}, _callee6, this);}));function getAccessToken() {return _getAccessToken.apply(this, arguments);}return getAccessToken;}() }, { key: "request", value: function () {var _request = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee7(e, t, n) {var s, o, r, _e14, i, _e15, _e16, a, c, u, l, h, d, f, g, p;return _regenerator.default.wrap(function _callee7$(_context7) {while (1) {switch (_context7.prev = _context7.next) {case 0:s = "x-tcb-trace_".concat(this.config.env);o = "application/x-www-form-urlencoded";r = _objectSpread({ action: e, env: this.config.env, dataVersion: "2019-08-16" }, t);if (!(-1 === be.indexOf(e))) {_context7.next = 10;break;}_e14 = this._cache.keys.refreshTokenKey;_context7.t0 = this._cache.getStore(_e14);if (!_context7.t0) {_context7.next = 10;break;}_context7.next = 9;return this.getAccessToken();case 9:r.access_token = _context7.sent.accessToken;case 10:if ("storage.uploadFile" === e) {i = new FormData();for (_e15 in i) {i.hasOwnProperty(_e15) && void 0 !== i[_e15] && i.append(_e15, r[_e15]);}o = "multipart/form-data";} else {o = "application/json", i = {};for (_e16 in r) {void 0 !== r[_e16] && (i[_e16] = r[_e16]);}}a = { headers: { "content-type": o } };n && n.onUploadProgress && (a.onUploadProgress = n.onUploadProgress);c = this._localCache.getStore(s);c && (a.headers["X-TCB-Trace"] = c);u = t.parse, l = t.inQuery, h = t.search;d = { env: this.config.env };u && (d.parse = !0), l && (d = _objectSpread(_objectSpread({}, l), d));f = function (e, t) {var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var s = /\?/.test(t);var o = "";for (var _e17 in n) {"" === o ? !s && (t += "?") : o += "&", o += "".concat(_e17, "=").concat(encodeURIComponent(n[_e17]));}return /^http(s)?\:\/\//.test(t += o) ? t : "".concat(e).concat(t);}(Z, "//tcb-api.tencentcloudapi.com/web", d);h && (f += h);_context7.next = 22;return this.post(_objectSpread({ url: f, data: i }, a));case 22:g = _context7.sent;p = g.header && g.header["x-tcb-trace"];if (!(p && this._localCache.setStore(s, p), 200 !== Number(g.status) && 200 !== Number(g.statusCode) || !g.data)) {_context7.next = 26;break;}throw new B({ code: "NETWORK_ERROR", message: "network request error" });case 26:return _context7.abrupt("return", g);case 27:case "end":return _context7.stop();}}}, _callee7, this);}));function request(_x4, _x5, _x6) {return _request.apply(this, arguments);}return request;}() }, { key: "send", value: function () {var _send = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee8(e) {var t,n,_n4,_args8 = arguments;return _regenerator.default.wrap(function _callee8$(_context8) {while (1) {switch (_context8.prev = _context8.next) {case 0:t = _args8.length > 1 && _args8[1] !== undefined ? _args8[1] : {};_context8.next = 3;return this.request(e, t, { onUploadProgress: t.onUploadProgress });case 3:n = _context8.sent;if (!("ACCESS_TOKEN_EXPIRED" === n.data.code && -1 === be.indexOf(e))) {_context8.next = 13;break;}_context8.next = 7;return this.refreshAccessToken();case 7:_context8.next = 9;return this.request(e, t, { onUploadProgress: t.onUploadProgress });case 9:_n4 = _context8.sent;if (!_n4.data.code) {_context8.next = 12;break;}throw new B({ code: _n4.data.code, message: _n4.data.message });case 12:return _context8.abrupt("return", _n4.data);case 13:if (!n.data.code) {_context8.next = 15;break;}throw new B({ code: n.data.code, message: n.data.message });case 15:return _context8.abrupt("return", n.data);case 16:case "end":return _context8.stop();}}}, _callee8, this);}));function send(_x7) {return _send.apply(this, arguments);}return send;}() }, { key: "setRefreshToken", value: function setRefreshToken(e) {var _this$_cache$keys3 = this._cache.keys,t = _this$_cache$keys3.accessTokenKey,n = _this$_cache$keys3.accessTokenExpireKey,s = _this$_cache$keys3.refreshTokenKey;this._cache.removeStore(t), this._cache.removeStore(n), this._cache.setStore(s, e);} }]);return Re;}();var Ue = {};function xe(e) {return Ue[e];}var Le = /*#__PURE__*/function () {function Le(e) {_classCallCheck(this, Le);this.config = e, this._cache = ge(e.env), this._request = xe(e.env);}_createClass(Le, [{ key: "setRefreshToken", value: function setRefreshToken(e) {var _this$_cache$keys4 = this._cache.keys,t = _this$_cache$keys4.accessTokenKey,n = _this$_cache$keys4.accessTokenExpireKey,s = _this$_cache$keys4.refreshTokenKey;this._cache.removeStore(t), this._cache.removeStore(n), this._cache.setStore(s, e);} }, { key: "setAccessToken", value: function setAccessToken(e, t) {var _this$_cache$keys5 = this._cache.keys,n = _this$_cache$keys5.accessTokenKey,s = _this$_cache$keys5.accessTokenExpireKey;this._cache.setStore(n, e), this._cache.setStore(s, t);} }, { key: "refreshUserInfo", value: function () {var _refreshUserInfo = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee9() {var _yield$this$_request$, e;return _regenerator.default.wrap(function _callee9$(_context9) {while (1) {switch (_context9.prev = _context9.next) {case 0:_context9.next = 2;return this._request.send("auth.getUserInfo", {});case 2:_yield$this$_request$ = _context9.sent;e = _yield$this$_request$.data;return _context9.abrupt("return", (this.setLocalUserInfo(e), e));case 5:case "end":return _context9.stop();}}}, _callee9, this);}));function refreshUserInfo() {return _refreshUserInfo.apply(this, arguments);}return refreshUserInfo;}() }, { key: "setLocalUserInfo", value: function setLocalUserInfo(e) {var t = this._cache.keys.userInfoKey;this._cache.setStore(t, e);} }]);return Le;}();var De = /*#__PURE__*/function () {function De(e) {_classCallCheck(this, De);if (!e) throw new B({ code: "PARAM_ERROR", message: "envId is not defined" });this._envId = e, this._cache = ge(this._envId), this._request = xe(this._envId), this.setUserInfo();}_createClass(De, [{ key: "linkWithTicket", value: function linkWithTicket(e) {if ("string" != typeof e) throw new B({ code: "PARAM_ERROR", message: "ticket must be string" });return this._request.send("auth.linkWithTicket", { ticket: e });} }, { key: "linkWithRedirect", value: function linkWithRedirect(e) {e.signInWithRedirect();} }, { key: "updatePassword", value: function updatePassword(e, t) {return this._request.send("auth.updatePassword", { oldPassword: t, newPassword: e });} }, { key: "updateEmail", value: function updateEmail(e) {return this._request.send("auth.updateEmail", { newEmail: e });} }, { key: "updateUsername", value: function updateUsername(e) {if ("string" != typeof e) throw new B({ code: "PARAM_ERROR", message: "username must be a string" });return this._request.send("auth.updateUsername", { username: e });} }, { key: "getLinkedUidList", value: function () {var _getLinkedUidList = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee10() {var _yield$this$_request$2, e, t, n;return _regenerator.default.wrap(function _callee10$(_context10) {while (1) {switch (_context10.prev = _context10.next) {case 0:_context10.next = 2;return this._request.send("auth.getLinkedUidList", {});case 2:_yield$this$_request$2 = _context10.sent;e = _yield$this$_request$2.data;t = !1;n = e.users;return _context10.abrupt("return", (n.forEach(function (e) {e.wxOpenId && e.wxPublicId && (t = !0);}), { users: n, hasPrimaryUid: t }));case 7:case "end":return _context10.stop();}}}, _callee10, this);}));function getLinkedUidList() {return _getLinkedUidList.apply(this, arguments);}return getLinkedUidList;}() }, { key: "setPrimaryUid", value: function setPrimaryUid(e) {return this._request.send("auth.setPrimaryUid", { uid: e });} }, { key: "unlink", value: function unlink(e) {return this._request.send("auth.unlink", { platform: e });} }, { key: "update", value: function () {var _update = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee11(e) {var t, n, s, o, r, i, _yield$this$_request$3, a;return _regenerator.default.wrap(function _callee11$(_context11) {while (1) {switch (_context11.prev = _context11.next) {case 0:t = e.nickName;n = e.gender;s = e.avatarUrl;o = e.province;r = e.country;i = e.city;_context11.next = 8;return this._request.send("auth.updateUserInfo", { nickName: t, gender: n, avatarUrl: s, province: o, country: r, city: i });case 8:_yield$this$_request$3 = _context11.sent;a = _yield$this$_request$3.data;this.setLocalUserInfo(a);case 11:case "end":return _context11.stop();}}}, _callee11, this);}));function update(_x8) {return _update.apply(this, arguments);}return update;}() }, { key: "refresh", value: function () {var _refresh = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee12() {var _yield$this$_request$4, e;return _regenerator.default.wrap(function _callee12$(_context12) {while (1) {switch (_context12.prev = _context12.next) {case 0:_context12.next = 2;return this._request.send("auth.getUserInfo", {});case 2:_yield$this$_request$4 = _context12.sent;e = _yield$this$_request$4.data;return _context12.abrupt("return", (this.setLocalUserInfo(e), e));case 5:case "end":return _context12.stop();}}}, _callee12, this);}));function refresh() {return _refresh.apply(this, arguments);}return refresh;}() }, { key: "setUserInfo", value: function setUserInfo() {var _this9 = this;var e = this._cache.keys.userInfoKey,t = this._cache.getStore(e);["uid", "loginType", "openid", "wxOpenId", "wxPublicId", "unionId", "qqMiniOpenId", "email", "hasPassword", "customUserId", "nickName", "gender", "avatarUrl"].forEach(function (e) {_this9[e] = t[e];}), this.location = { country: t.country, province: t.province, city: t.city };} }, { key: "setLocalUserInfo", value: function setLocalUserInfo(e) {var t = this._cache.keys.userInfoKey;this._cache.setStore(t, e), this.setUserInfo();} }]);return De;}();var Ne = /*#__PURE__*/function () {function Ne(e) {_classCallCheck(this, Ne);if (!e) throw new B({ code: "PARAM_ERROR", message: "envId is not defined" });this._cache = ge(e);var _this$_cache$keys6 = this._cache.keys,t = _this$_cache$keys6.refreshTokenKey,n = _this$_cache$keys6.accessTokenKey,s = _this$_cache$keys6.accessTokenExpireKey,o = this._cache.getStore(t),r = this._cache.getStore(n),i = this._cache.getStore(s);this.credential = { refreshToken: o, accessToken: r, accessTokenExpire: i }, this.user = new De(e);}_createClass(Ne, [{ key: "isAnonymousAuth", get: function get() {return this.loginType === Ie.ANONYMOUS;} }, { key: "isCustomAuth", get: function get() {return this.loginType === Ie.CUSTOM;} }, { key: "isWeixinAuth", get: function get() {return this.loginType === Ie.WECHAT || this.loginType === Ie.WECHAT_OPEN || this.loginType === Ie.WECHAT_PUBLIC;} }, { key: "loginType", get: function get() {return this._cache.getStore(this._cache.keys.loginTypeKey);} }]);return Ne;}();var qe = /*#__PURE__*/function (_Le) {_inherits(qe, _Le);var _super4 = _createSuper(qe);function qe() {_classCallCheck(this, qe);return _super4.apply(this, arguments);}_createClass(qe, [{ key: "signIn", value: function () {var _signIn = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee13() {var _this$_cache$keys7, e, t, n, s, o, _e18;return _regenerator.default.wrap(function _callee13$(_context13) {while (1) {switch (_context13.prev = _context13.next) {case 0:this._cache.updatePersistence("local");_this$_cache$keys7 = this._cache.keys;e = _this$_cache$keys7.anonymousUuidKey;t = _this$_cache$keys7.refreshTokenKey;n = this._cache.getStore(e) || void 0;s = this._cache.getStore(t) || void 0;_context13.next = 8;return this._request.send("auth.signInAnonymously", { anonymous_uuid: n, refresh_token: s });case 8:o = _context13.sent;if (!(o.uuid && o.refresh_token)) {_context13.next = 20;break;}this._setAnonymousUUID(o.uuid);this.setRefreshToken(o.refresh_token);_context13.next = 14;return this._request.refreshAccessToken();case 14:we(ve);we(Se, { env: this.config.env, loginType: Ie.ANONYMOUS, persistence: "local" });_e18 = new Ne(this.config.env);_context13.next = 19;return _e18.user.refresh();case 19:return _context13.abrupt("return", _e18);case 20:throw new B({ message: "匿名登录失败" });case 21:case "end":return _context13.stop();}}}, _callee13, this);}));function signIn() {return _signIn.apply(this, arguments);}return signIn;}() }, { key: "linkAndRetrieveDataWithTicket", value: function () {var _linkAndRetrieveDataWithTicket = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee14(e) {var _this$_cache$keys8, t, n, s, o, r;return _regenerator.default.wrap(function _callee14$(_context14) {while (1) {switch (_context14.prev = _context14.next) {case 0:_this$_cache$keys8 = this._cache.keys;t = _this$_cache$keys8.anonymousUuidKey;n = _this$_cache$keys8.refreshTokenKey;s = this._cache.getStore(t);o = this._cache.getStore(n);_context14.next = 7;return this._request.send("auth.linkAndRetrieveDataWithTicket", { anonymous_uuid: s, refresh_token: o, ticket: e });case 7:r = _context14.sent;if (!r.refresh_token) {_context14.next = 16;break;}this._clearAnonymousUUID();this.setRefreshToken(r.refresh_token);_context14.next = 13;return this._request.refreshAccessToken();case 13:we(Pe, { env: this.config.env });we(Se, { loginType: Ie.CUSTOM, persistence: "local" });return _context14.abrupt("return", { credential: { refreshToken: r.refresh_token } });case 16:throw new B({ message: "匿名转化失败" });case 17:case "end":return _context14.stop();}}}, _callee14, this);}));function linkAndRetrieveDataWithTicket(_x9) {return _linkAndRetrieveDataWithTicket.apply(this, arguments);}return linkAndRetrieveDataWithTicket;}() }, { key: "_setAnonymousUUID", value: function _setAnonymousUUID(e) {var _this$_cache$keys9 = this._cache.keys,t = _this$_cache$keys9.anonymousUuidKey,n = _this$_cache$keys9.loginTypeKey;this._cache.removeStore(t), this._cache.setStore(t, e), this._cache.setStore(n, Ie.ANONYMOUS);} }, { key: "_clearAnonymousUUID", value: function _clearAnonymousUUID() {this._cache.removeStore(this._cache.keys.anonymousUuidKey);} }]);return qe;}(Le);var Fe = /*#__PURE__*/function (_Le2) {_inherits(Fe, _Le2);var _super5 = _createSuper(Fe);function Fe() {_classCallCheck(this, Fe);return _super5.apply(this, arguments);}_createClass(Fe, [{ key: "signIn", value: function () {var _signIn2 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee15(e) {var t, n;return _regenerator.default.wrap(function _callee15$(_context15) {while (1) {switch (_context15.prev = _context15.next) {case 0:if (!("string" != typeof e)) {_context15.next = 2;break;}throw new B({ param: "PARAM_ERROR", message: "ticket must be a string" });case 2:t = this._cache.keys.refreshTokenKey;_context15.next = 5;return this._request.send("auth.signInWithTicket", { ticket: e, refresh_token: this._cache.getStore(t) || "" });case 5:n = _context15.sent;if (!n.refresh_token) {_context15.next = 15;break;}this.setRefreshToken(n.refresh_token);_context15.next = 10;return this._request.refreshAccessToken();case 10:we(ve);we(Se, { env: this.config.env, loginType: Ie.CUSTOM, persistence: this.config.persistence });_context15.next = 14;return this.refreshUserInfo();case 14:return _context15.abrupt("return", new Ne(this.config.env));case 15:throw new B({ message: "自定义登录失败" });case 16:case "end":return _context15.stop();}}}, _callee15, this);}));function signIn(_x10) {return _signIn2.apply(this, arguments);}return signIn;}() }]);return Fe;}(Le);var Me = /*#__PURE__*/function (_Le3) {_inherits(Me, _Le3);var _super6 = _createSuper(Me);function Me() {_classCallCheck(this, Me);return _super6.apply(this, arguments);}_createClass(Me, [{ key: "signIn", value: function () {var _signIn3 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee16(e, t) {var n, s, o, r, i;return _regenerator.default.wrap(function _callee16$(_context16) {while (1) {switch (_context16.prev = _context16.next) {case 0:if (!("string" != typeof e)) {_context16.next = 2;break;}throw new B({ code: "PARAM_ERROR", message: "email must be a string" });case 2:n = this._cache.keys.refreshTokenKey;_context16.next = 5;return this._request.send("auth.signIn", { loginType: "EMAIL", email: e, password: t, refresh_token: this._cache.getStore(n) || "" });case 5:s = _context16.sent;o = s.refresh_token;r = s.access_token;i = s.access_token_expire;if (!o) {_context16.next = 22;break;}this.setRefreshToken(o);if (!(r && i)) {_context16.next = 15;break;}this.setAccessToken(r, i);_context16.next = 17;break;case 15:_context16.next = 17;return this._request.refreshAccessToken();case 17:_context16.next = 19;return this.refreshUserInfo();case 19:we(ve);we(Se, { env: this.config.env, loginType: Ie.EMAIL, persistence: this.config.persistence });return _context16.abrupt("return", new Ne(this.config.env));case 22:throw s.code ? new B({ code: s.code, message: "\u90AE\u7BB1\u767B\u5F55\u5931\u8D25: ".concat(s.message) }) : new B({ message: "邮箱登录失败" });case 23:case "end":return _context16.stop();}}}, _callee16, this);}));function signIn(_x11, _x12) {return _signIn3.apply(this, arguments);}return signIn;}() }, { key: "activate", value: function () {var _activate = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee17(e) {return _regenerator.default.wrap(function _callee17$(_context17) {while (1) {switch (_context17.prev = _context17.next) {case 0:return _context17.abrupt("return", this._request.send("auth.activateEndUserMail", { token: e }));case 1:case "end":return _context17.stop();}}}, _callee17, this);}));function activate(_x13) {return _activate.apply(this, arguments);}return activate;}() }, { key: "resetPasswordWithToken", value: function () {var _resetPasswordWithToken = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee18(e, t) {return _regenerator.default.wrap(function _callee18$(_context18) {while (1) {switch (_context18.prev = _context18.next) {case 0:return _context18.abrupt("return", this._request.send("auth.resetPasswordWithToken", { token: e, newPassword: t }));case 1:case "end":return _context18.stop();}}}, _callee18, this);}));function resetPasswordWithToken(_x14, _x15) {return _resetPasswordWithToken.apply(this, arguments);}return resetPasswordWithToken;}() }]);return Me;}(Le);var je = /*#__PURE__*/function (_Le4) {_inherits(je, _Le4);var _super7 = _createSuper(je);function je() {_classCallCheck(this, je);return _super7.apply(this, arguments);}_createClass(je, [{ key: "signIn", value: function () {var _signIn4 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee19(e, t) {var n, s, o, r, i;return _regenerator.default.wrap(function _callee19$(_context19) {while (1) {switch (_context19.prev = _context19.next) {case 0:if (!("string" != typeof e)) {_context19.next = 2;break;}throw new B({ code: "PARAM_ERROR", message: "username must be a string" });case 2:"string" != typeof t && (t = "", console.warn("password is empty"));n = this._cache.keys.refreshTokenKey;_context19.next = 6;return this._request.send("auth.signIn", { loginType: Ie.USERNAME, username: e, password: t, refresh_token: this._cache.getStore(n) || "" });case 6:s = _context19.sent;o = s.refresh_token;r = s.access_token_expire;i = s.access_token;if (!o) {_context19.next = 23;break;}this.setRefreshToken(o);if (!(i && r)) {_context19.next = 16;break;}this.setAccessToken(i, r);_context19.next = 18;break;case 16:_context19.next = 18;return this._request.refreshAccessToken();case 18:_context19.next = 20;return this.refreshUserInfo();case 20:we(ve);we(Se, { env: this.config.env, loginType: Ie.USERNAME, persistence: this.config.persistence });return _context19.abrupt("return", new Ne(this.config.env));case 23:throw s.code ? new B({ code: s.code, message: "\u7528\u6237\u540D\u5BC6\u7801\u767B\u5F55\u5931\u8D25: ".concat(s.message) }) : new B({ message: "用户名密码登录失败" });case 24:case "end":return _context19.stop();}}}, _callee19, this);}));function signIn(_x16, _x17) {return _signIn4.apply(this, arguments);}return signIn;}() }]);return je;}(Le);var $e = /*#__PURE__*/function () {function $e(e) {_classCallCheck(this, $e);this.config = e, this._cache = ge(e.env), this._request = xe(e.env), this._onAnonymousConverted = this._onAnonymousConverted.bind(this), this._onLoginTypeChanged = this._onLoginTypeChanged.bind(this), _e(Se, this._onLoginTypeChanged);}_createClass($e, [{ key: "anonymousAuthProvider", value: function anonymousAuthProvider() {return new qe(this.config);} }, { key: "customAuthProvider", value: function customAuthProvider() {return new Fe(this.config);} }, { key: "emailAuthProvider", value: function emailAuthProvider() {return new Me(this.config);} }, { key: "usernameAuthProvider", value: function usernameAuthProvider() {return new je(this.config);} }, { key: "signInAnonymously", value: function () {var _signInAnonymously = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee20() {return _regenerator.default.wrap(function _callee20$(_context20) {while (1) {switch (_context20.prev = _context20.next) {case 0:return _context20.abrupt("return", new qe(this.config).signIn());case 1:case "end":return _context20.stop();}}}, _callee20, this);}));function signInAnonymously() {return _signInAnonymously.apply(this, arguments);}return signInAnonymously;}() }, { key: "signInWithEmailAndPassword", value: function () {var _signInWithEmailAndPassword = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee21(e, t) {return _regenerator.default.wrap(function _callee21$(_context21) {while (1) {switch (_context21.prev = _context21.next) {case 0:return _context21.abrupt("return", new Me(this.config).signIn(e, t));case 1:case "end":return _context21.stop();}}}, _callee21, this);}));function signInWithEmailAndPassword(_x18, _x19) {return _signInWithEmailAndPassword.apply(this, arguments);}return signInWithEmailAndPassword;}() }, { key: "signInWithUsernameAndPassword", value: function signInWithUsernameAndPassword(e, t) {return new je(this.config).signIn(e, t);} }, { key: "linkAndRetrieveDataWithTicket", value: function () {var _linkAndRetrieveDataWithTicket2 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee22(e) {return _regenerator.default.wrap(function _callee22$(_context22) {while (1) {switch (_context22.prev = _context22.next) {case 0:this._anonymousAuthProvider || (this._anonymousAuthProvider = new qe(this.config)), _e(Pe, this._onAnonymousConverted);_context22.next = 3;return this._anonymousAuthProvider.linkAndRetrieveDataWithTicket(e);case 3:return _context22.abrupt("return", _context22.sent);case 4:case "end":return _context22.stop();}}}, _callee22, this);}));function linkAndRetrieveDataWithTicket(_x20) {return _linkAndRetrieveDataWithTicket2.apply(this, arguments);}return linkAndRetrieveDataWithTicket;}() }, { key: "signOut", value: function () {var _signOut = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee23() {var _this$_cache$keys10, e, t, n, s, o;return _regenerator.default.wrap(function _callee23$(_context23) {while (1) {switch (_context23.prev = _context23.next) {case 0:if (!(this.loginType === Ie.ANONYMOUS)) {_context23.next = 2;break;}throw new B({ message: "匿名用户不支持登出操作" });case 2:_this$_cache$keys10 = this._cache.keys, e = _this$_cache$keys10.refreshTokenKey, t = _this$_cache$keys10.accessTokenKey, n = _this$_cache$keys10.accessTokenExpireKey, s = this._cache.getStore(e);if (s) {_context23.next = 5;break;}return _context23.abrupt("return");case 5:_context23.next = 7;return this._request.send("auth.logout", { refresh_token: s });case 7:o = _context23.sent;return _context23.abrupt("return", (this._cache.removeStore(e), this._cache.removeStore(t), this._cache.removeStore(n), we(ve), we(Se, { env: this.config.env, loginType: Ie.NULL, persistence: this.config.persistence }), o));case 9:case "end":return _context23.stop();}}}, _callee23, this);}));function signOut() {return _signOut.apply(this, arguments);}return signOut;}() }, { key: "signUpWithEmailAndPassword", value: function () {var _signUpWithEmailAndPassword = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee24(e, t) {return _regenerator.default.wrap(function _callee24$(_context24) {while (1) {switch (_context24.prev = _context24.next) {case 0:return _context24.abrupt("return", this._request.send("auth.signUpWithEmailAndPassword", { email: e, password: t }));case 1:case "end":return _context24.stop();}}}, _callee24, this);}));function signUpWithEmailAndPassword(_x21, _x22) {return _signUpWithEmailAndPassword.apply(this, arguments);}return signUpWithEmailAndPassword;}() }, { key: "sendPasswordResetEmail", value: function () {var _sendPasswordResetEmail = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee25(e) {return _regenerator.default.wrap(function _callee25$(_context25) {while (1) {switch (_context25.prev = _context25.next) {case 0:return _context25.abrupt("return", this._request.send("auth.sendPasswordResetEmail", { email: e }));case 1:case "end":return _context25.stop();}}}, _callee25, this);}));function sendPasswordResetEmail(_x23) {return _sendPasswordResetEmail.apply(this, arguments);}return sendPasswordResetEmail;}() }, { key: "onLoginStateChanged", value: function onLoginStateChanged(e) {var _this10 = this;_e(ve, function () {var t = _this10.hasLoginState();e.call(_this10, t);});var t = this.hasLoginState();e.call(this, t);} }, { key: "onLoginStateExpired", value: function onLoginStateExpired(e) {_e(Te, e.bind(this));} }, { key: "onAccessTokenRefreshed", value: function onAccessTokenRefreshed(e) {_e(Ae, e.bind(this));} }, { key: "onAnonymousConverted", value: function onAnonymousConverted(e) {_e(Pe, e.bind(this));} }, { key: "onLoginTypeChanged", value: function onLoginTypeChanged(e) {var _this11 = this;_e(Se, function () {var t = _this11.hasLoginState();e.call(_this11, t);});} }, { key: "getAccessToken", value: function () {var _getAccessToken2 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee26() {return _regenerator.default.wrap(function _callee26$(_context26) {while (1) {switch (_context26.prev = _context26.next) {case 0:_context26.next = 2;return this._request.getAccessToken();case 2:_context26.t0 = _context26.sent.accessToken;_context26.t1 = this.config.env;return _context26.abrupt("return", { accessToken: _context26.t0, env: _context26.t1 });case 5:case "end":return _context26.stop();}}}, _callee26, this);}));function getAccessToken() {return _getAccessToken2.apply(this, arguments);}return getAccessToken;}() }, { key: "hasLoginState", value: function hasLoginState() {var e = this._cache.keys.refreshTokenKey;return this._cache.getStore(e) ? new Ne(this.config.env) : null;} }, { key: "isUsernameRegistered", value: function () {var _isUsernameRegistered = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee27(e) {var _yield$this$_request$5, t;return _regenerator.default.wrap(function _callee27$(_context27) {while (1) {switch (_context27.prev = _context27.next) {case 0:if (!("string" != typeof e)) {_context27.next = 2;break;}throw new B({ code: "PARAM_ERROR", message: "username must be a string" });case 2:_context27.next = 4;return this._request.send("auth.isUsernameRegistered", { username: e });case 4:_yield$this$_request$5 = _context27.sent;t = _yield$this$_request$5.data;return _context27.abrupt("return", t && t.isRegistered);case 7:case "end":return _context27.stop();}}}, _callee27, this);}));function isUsernameRegistered(_x24) {return _isUsernameRegistered.apply(this, arguments);}return isUsernameRegistered;}() }, { key: "getLoginState", value: function getLoginState() {return Promise.resolve(this.hasLoginState());} }, { key: "signInWithTicket", value: function () {var _signInWithTicket = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee28(e) {return _regenerator.default.wrap(function _callee28$(_context28) {while (1) {switch (_context28.prev = _context28.next) {case 0:return _context28.abrupt("return", new Fe(this.config).signIn(e));case 1:case "end":return _context28.stop();}}}, _callee28, this);}));function signInWithTicket(_x25) {return _signInWithTicket.apply(this, arguments);}return signInWithTicket;}() }, { key: "shouldRefreshAccessToken", value: function shouldRefreshAccessToken(e) {this._request._shouldRefreshAccessTokenHook = e.bind(this);} }, { key: "getUserInfo", value: function getUserInfo() {return this._request.send("auth.getUserInfo", {}).then(function (e) {return e.code ? e : _objectSpread(_objectSpread({}, e.data), {}, { requestId: e.seqId });});} }, { key: "getAuthHeader", value: function getAuthHeader() {var _this$_cache$keys11 = this._cache.keys,e = _this$_cache$keys11.refreshTokenKey,t = _this$_cache$keys11.accessTokenKey,n = this._cache.getStore(e);return { "x-cloudbase-credentials": this._cache.getStore(t) + "/@@/" + n };} }, { key: "_onAnonymousConverted", value: function _onAnonymousConverted(e) {var t = e.data.env;t === this.config.env && this._cache.updatePersistence(this.config.persistence);} }, { key: "_onLoginTypeChanged", value: function _onLoginTypeChanged(e) {var _e$data = e.data,t = _e$data.loginType,n = _e$data.persistence,s = _e$data.env;s === this.config.env && (this._cache.updatePersistence(n), this._cache.setStore(this._cache.keys.loginTypeKey, t));} }, { key: "currentUser", get: function get() {var e = this.hasLoginState();return e && e.user || null;} }, { key: "loginType", get: function get() {return this._cache.getStore(this._cache.keys.loginTypeKey);} }]);return $e;}();var Ke = function Ke(e, t) {t = t || ne();var n = xe(this.config.env),s = e.cloudPath,o = e.filePath,r = e.onUploadProgress,_e$fileType = e.fileType,i = _e$fileType === void 0 ? "image" : _e$fileType;return n.send("storage.getUploadMetadata", { path: s }).then(function (e) {var _e$data2 = e.data,a = _e$data2.url,c = _e$data2.authorization,u = _e$data2.token,l = _e$data2.fileId,h = _e$data2.cosFileId,d = e.requestId,f = { key: s, signature: c, "x-cos-meta-fileid": h, success_action_status: "201", "x-cos-security-token": u };n.upload({ url: a, data: f, file: o, name: s, fileType: i, onUploadProgress: r }).then(function (e) {201 === e.statusCode ? t(null, { fileID: l, requestId: d }) : t(new B({ code: "STORAGE_REQUEST_FAIL", message: "STORAGE_REQUEST_FAIL: ".concat(e.data) }));}).catch(function (e) {t(e);});}).catch(function (e) {t(e);}), t.promise;},Be = function Be(e, t) {t = t || ne();var n = xe(this.config.env),s = e.cloudPath;return n.send("storage.getUploadMetadata", { path: s }).then(function (e) {t(null, e);}).catch(function (e) {t(e);}), t.promise;},He = function He(_ref5, t) {var e = _ref5.fileList;if (t = t || ne(), !e || !Array.isArray(e)) return { code: "INVALID_PARAM", message: "fileList必须是非空的数组" };var _iterator3 = _createForOfIteratorHelper(e),_step3;try {for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {var _t8 = _step3.value;if (!_t8 || "string" != typeof _t8) return { code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" };}} catch (err) {_iterator3.e(err);} finally {_iterator3.f();}var n = { fileid_list: e };return xe(this.config.env).send("storage.batchDeleteFile", n).then(function (e) {e.code ? t(null, e) : t(null, { fileList: e.data.delete_list, requestId: e.requestId });}).catch(function (e) {t(e);}), t.promise;},We = function We(_ref6, t) {var e = _ref6.fileList;t = t || ne(), e && Array.isArray(e) || t(null, { code: "INVALID_PARAM", message: "fileList必须是非空的数组" });var n = [];var _iterator4 = _createForOfIteratorHelper(e),_step4;try {for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {var _s7 = _step4.value;"object" == typeof _s7 ? (_s7.hasOwnProperty("fileID") && _s7.hasOwnProperty("maxAge") || t(null, { code: "INVALID_PARAM", message: "fileList的元素必须是包含fileID和maxAge的对象" }), n.push({ fileid: _s7.fileID, max_age: _s7.maxAge })) : "string" == typeof _s7 ? n.push({ fileid: _s7 }) : t(null, { code: "INVALID_PARAM", message: "fileList的元素必须是字符串" });}} catch (err) {_iterator4.e(err);} finally {_iterator4.f();}var s = { file_list: n };return xe(this.config.env).send("storage.batchGetDownloadUrl", s).then(function (e) {e.code ? t(null, e) : t(null, { fileList: e.data.download_list, requestId: e.requestId });}).catch(function (e) {t(e);}), t.promise;},ze = /*#__PURE__*/function () {var _ref8 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee29(_ref7, t) {var e, n, s, o;return _regenerator.default.wrap(function _callee29$(_context29) {while (1) {switch (_context29.prev = _context29.next) {case 0:e = _ref7.fileID;_context29.next = 3;return We.call(this, { fileList: [{ fileID: e, maxAge: 600 }] });case 3:n = _context29.sent.fileList[0];if (!("SUCCESS" !== n.code)) {_context29.next = 6;break;}return _context29.abrupt("return", t ? t(n) : new Promise(function (e) {e(n);}));case 6:s = xe(this.config.env);o = n.download_url;if (!(o = encodeURI(o), !t)) {_context29.next = 10;break;}return _context29.abrupt("return", s.download({ url: o }));case 10:_context29.t0 = t;_context29.next = 13;return s.download({ url: o });case 13:_context29.t1 = _context29.sent;(0, _context29.t0)(_context29.t1);case 15:case "end":return _context29.stop();}}}, _callee29, this);}));return function ze(_x26, _x27) {return _ref8.apply(this, arguments);};}(),Je = function Je(_ref9, r) {var e = _ref9.name,t = _ref9.data,n = _ref9.query,s = _ref9.parse,o = _ref9.search;var i = r || ne();var a;try {a = t ? JSON.stringify(t) : "";} catch (e) {return Promise.reject(e);}if (!e) return Promise.reject(new B({ code: "PARAM_ERROR", message: "函数名不能为空" }));var c = { inQuery: n, parse: s, search: o, function_name: e, request_data: a };return xe(this.config.env).send("functions.invokeFunction", c).then(function (e) {if (e.code) i(null, e);else {var _t9 = e.data.response_data;if (s) i(null, { result: _t9, requestId: e.requestId });else try {_t9 = JSON.parse(e.data.response_data), i(null, { result: _t9, requestId: e.requestId });} catch (e) {i(new B({ message: "response data must be json" }));}}return i.promise;}).catch(function (e) {i(e);}), i.promise;},Ve = { timeout: 15e3, persistence: "session" },Ye = {};var Xe = /*#__PURE__*/function () {function Xe(e) {_classCallCheck(this, Xe);this.config = e || this.config, this.authObj = void 0;}_createClass(Xe, [{ key: "init", value: function init(e) {switch (ae.adapter || (this.requestClient = new ae.adapter.reqClass({ timeout: e.timeout || 5e3, timeoutMsg: "\u8BF7\u6C42\u5728".concat((e.timeout || 5e3) / 1e3, "s\u5185\u672A\u5B8C\u6210\uFF0C\u5DF2\u4E2D\u65AD") })), this.config = _objectSpread(_objectSpread({}, Ve), e), !0) {case this.config.timeout > 6e5:console.warn("timeout大于可配置上限[10分钟]，已重置为上限数值"), this.config.timeout = 6e5;break;case this.config.timeout < 100:console.warn("timeout小于可配置下限[100ms]，已重置为下限数值"), this.config.timeout = 100;}return new Xe(this.config);} }, { key: "auth", value: function auth() {var _ref10 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},e = _ref10.persistence;if (this.authObj) return this.authObj;var t = e || ae.adapter.primaryStorage || Ve.persistence;var n;return t !== this.config.persistence && (this.config.persistence = t), function (e) {var t = e.env;de[t] = new he(e), fe[t] = new he(_objectSpread(_objectSpread({}, e), {}, { persistence: "local" }));}(this.config), n = this.config, Ue[n.env] = new Re(n), this.authObj = new $e(this.config), this.authObj;} }, { key: "on", value: function on(e, t) {return _e.apply(this, [e, t]);} }, { key: "off", value: function off(e, t) {return ke.apply(this, [e, t]);} }, { key: "callFunction", value: function callFunction(e, t) {return Je.apply(this, [e, t]);} }, { key: "deleteFile", value: function deleteFile(e, t) {return He.apply(this, [e, t]);} }, { key: "getTempFileURL", value: function getTempFileURL(e, t) {return We.apply(this, [e, t]);} }, { key: "downloadFile", value: function downloadFile(e, t) {return ze.apply(this, [e, t]);} }, { key: "uploadFile", value: function uploadFile(e, t) {return Ke.apply(this, [e, t]);} }, { key: "getUploadMetadata", value: function getUploadMetadata(e, t) {return Be.apply(this, [e, t]);} }, { key: "registerExtension", value: function registerExtension(e) {Ye[e.name] = e;} }, { key: "invokeExtension", value: function () {var _invokeExtension = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee30(e, t) {var n;return _regenerator.default.wrap(function _callee30$(_context30) {while (1) {switch (_context30.prev = _context30.next) {case 0:n = Ye[e];if (n) {_context30.next = 3;break;}throw new B({ message: "\u6269\u5C55".concat(e, " \u5FC5\u987B\u5148\u6CE8\u518C") });case 3:_context30.next = 5;return n.invoke(t, this);case 5:return _context30.abrupt("return", _context30.sent);case 6:case "end":return _context30.stop();}}}, _callee30, this);}));function invokeExtension(_x28, _x29) {return _invokeExtension.apply(this, arguments);}return invokeExtension;}() }, { key: "useAdapters", value: function useAdapters(e) {var _ref11 = ie(e) || {},t = _ref11.adapter,n = _ref11.runtime;t && (ae.adapter = t), n && (ae.runtime = n);} }]);return Xe;}();var Ge = new Xe();function Qe(e, t, n) {void 0 === n && (n = {});var s = /\?/.test(t),o = "";for (var r in n) {"" === o ? !s && (t += "?") : o += "&", o += r + "=" + encodeURIComponent(n[r]);}return /^http(s)?:\/\//.test(t += o) ? t : "" + e + t;}var Ze = /*#__PURE__*/function () {function Ze() {_classCallCheck(this, Ze);}_createClass(Ze, [{ key: "post", value: function post(e) {var t = e.url,n = e.data,s = e.headers;return new Promise(function (e, o) {V.request({ url: Qe("https:", t), data: n, method: "POST", header: s, success: function success(t) {e(t);}, fail: function fail(e) {o(e);} });});} }, { key: "upload", value: function upload(e) {return new Promise(function (t, n) {var s = e.url,o = e.file,r = e.data,i = e.headers,a = e.fileType,c = V.uploadFile({ url: Qe("https:", s), name: "file", formData: Object.assign({}, r), filePath: o, fileType: a, header: i, success: function success(e) {var n = { statusCode: e.statusCode, data: e.data || {} };200 === e.statusCode && r.success_action_status && (n.statusCode = parseInt(r.success_action_status, 10)), t(n);}, fail: function fail(e) {n(new Error(e.errMsg || "uploadFile:fail"));} });"function" == typeof e.onUploadProgress && c && "function" == typeof c.onProgressUpdate && c.onProgressUpdate(function (t) {e.onUploadProgress({ loaded: t.totalBytesSent, total: t.totalBytesExpectedToSend });});});} }]);return Ze;}();var et = { setItem: function setItem(e, t) {V.setStorageSync(e, t);}, getItem: function getItem(e) {return V.getStorageSync(e);}, removeItem: function removeItem(e) {V.removeStorageSync(e);}, clear: function clear() {V.clearStorageSync();} };var tt = { genAdapter: function genAdapter() {return { root: {}, reqClass: Ze, localStorage: et, primaryStorage: "local" };}, isMatch: function isMatch() {return !0;}, runtime: "uni_app" };Ge.useAdapters(tt);var nt = Ge,st = nt.init;nt.init = function (e) {e.env = e.spaceId;var t = st.call(this, e);t.config.provider = "tencent", t.config.spaceId = e.spaceId;var n = t.auth;return t.auth = function (e) {var t = n.call(this, e);return ["linkAndRetrieveDataWithTicket", "signInAnonymously", "signOut", "getAccessToken", "getLoginState", "signInWithTicket", "getUserInfo"].forEach(function (e) {t[e] = K(t[e]).bind(t);}), t;}, t.customAuth = t.auth, t;};var ot = nt;function rt() {return { token: V.getStorageSync("uni_id_token") || V.getStorageSync("uniIdToken"), tokenExpired: V.getStorageSync("uni_id_token_expired") };}function it() {var _ref12 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},e = _ref12.token,t = _ref12.tokenExpired;e && V.setStorageSync("uni_id_token", e), t && V.setStorageSync("uni_id_token_expired", t);}function at() {if (!d || "web" !== g) return;uni.getStorageSync("__LAST_DCLOUD_APPID") !== _ && (uni.setStorageSync("__LAST_DCLOUD_APPID", _), console.warn("检测到当前项目与上次运行到此端口的项目不一致，自动清理uni-id保存的token信息（仅开发调试时生效）"), V.removeStorageSync("uni_id_token"), V.removeStorageSync("uniIdToken"), V.removeStorageSync("uni_id_token_expired"));}var ct = /*#__PURE__*/function (_G) {_inherits(ct, _G);var _super8 = _createSuper(ct);function ct() {_classCallCheck(this, ct);return _super8.apply(this, arguments);}_createClass(ct, [{ key: "getAccessToken", value: function getAccessToken() {var _this12 = this;return new Promise(function (e, t) {var n = "Anonymous_Access_token";_this12.setAccessToken(n), e(n);});} }, { key: "setupRequest", value: function setupRequest(e, t) {var n = Object.assign({}, e, { spaceId: this.config.spaceId, timestamp: Date.now() }),s = { "Content-Type": "application/json" };"auth" !== t && (n.token = this.accessToken, s["x-basement-token"] = this.accessToken), s["x-serverless-sign"] = J.sign(n, this.config.clientSecret);var o = z();s["x-client-info"] = encodeURIComponent(JSON.stringify(o));var _rt = rt(),r = _rt.token;return s["x-client-token"] = r, { url: this.config.requestUrl, method: "POST", data: n, dataType: "json", header: JSON.parse(JSON.stringify(s)) };} }, { key: "uploadFileToOSS", value: function uploadFileToOSS(_ref13) {var _this13 = this;var e = _ref13.url,t = _ref13.formData,n = _ref13.name,s = _ref13.filePath,o = _ref13.fileType,r = _ref13.onUploadProgress;return new Promise(function (i, a) {var c = _this13.adapter.uploadFile({ url: e, formData: t, name: n, filePath: s, fileType: o, success: function success(e) {e && e.statusCode < 400 ? i(e) : a(new B({ code: "UPLOAD_FAILED", message: "文件上传失败" }));}, fail: function fail(e) {a(new B({ code: e.code || "UPLOAD_FAILED", message: e.message || e.errMsg || "文件上传失败" }));} });"function" == typeof r && c && "function" == typeof c.onProgressUpdate && c.onProgressUpdate(function (e) {r({ loaded: e.totalBytesSent, total: e.totalBytesExpectedToSend });});});} }, { key: "uploadFile", value: function uploadFile(_ref14) {var _this14 = this;var e = _ref14.filePath,t = _ref14.cloudPath,_ref14$fileType = _ref14.fileType,n = _ref14$fileType === void 0 ? "image" : _ref14$fileType,s = _ref14.onUploadProgress;if (!t) throw new B({ code: "CLOUDPATH_REQUIRED", message: "cloudPath不可为空" });var o;return this.getOSSUploadOptionsFromPath({ cloudPath: t }).then(function (t) {var _t$result = t.result,r = _t$result.url,i = _t$result.formData,a = _t$result.name;o = t.result.fileUrl;var c = { url: r, formData: i, name: a, filePath: e, fileType: n };return _this14.uploadFileToOSS(Object.assign({}, c, { onUploadProgress: s }));}).then(function () {return _this14.reportOSSUpload({ cloudPath: t });}).then(function (t) {return new Promise(function (n, s) {t.success ? n({ success: !0, filePath: e, fileID: o }) : s(new B({ code: "UPLOAD_FAILED", message: "文件上传失败" }));});});} }, { key: "deleteFile", value: function deleteFile(_ref15) {var e = _ref15.fileList;var t = { method: "serverless.file.resource.delete", params: JSON.stringify({ fileList: e }) };return this.request(this.setupRequest(t));} }, { key: "getTempFileURL", value: function getTempFileURL() {var _ref16 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},e = _ref16.fileList;var t = { method: "serverless.file.resource.getTempFileURL", params: JSON.stringify({ fileList: e }) };return this.request(this.setupRequest(t));} }]);return ct;}(G);var ut = { init: function init(e) {var t = new ct(e),n = { signInAnonymously: function signInAnonymously() {return t.authorize();}, getLoginState: function getLoginState() {return Promise.resolve(!1);} };return t.auth = function () {return n;}, t.customAuth = t.auth, t;} };function lt(_ref17) {var e = _ref17.data;var t;t = z();var n = JSON.parse(JSON.stringify(e || {}));if (Object.assign(n, { clientInfo: t }), !n.uniIdToken) {var _rt2 = rt(),_e19 = _rt2.token;_e19 && (n.uniIdToken = _e19);}return n;}function ht() {var _this15 = this;var _ref18 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},e = _ref18.name,t = _ref18.data;var _this$__dev__ = this.__dev__,n = _this$__dev__.localAddress,s = _this$__dev__.localPort,o = { aliyun: "aliyun", tencent: "tcb" }[this.config.provider],r = this.config.spaceId,i = "http://".concat(n, ":").concat(s, "/system/check-function"),a = "http://".concat(n, ":").concat(s, "/cloudfunctions/").concat(e);return new Promise(function (t, n) {V.request({ method: "POST", url: i, data: { name: e, platform: g, provider: o, spaceId: r }, timeout: 3e3, success: function success(e) {t(e);}, fail: function fail() {t({ data: { code: "NETWORK_ERROR", message: "连接本地调试服务失败，请检查客户端是否和主机在同一局域网下，自动切换为已部署的云函数。" } });} });}).then(function () {var _ref19 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},e = _ref19.data;var _ref20 = e || {},t = _ref20.code,n = _ref20.message;return { code: 0 === t ? 0 : t || "SYS_ERR", message: n || "SYS_ERR" };}).then(function (_ref21) {var n = _ref21.code,s = _ref21.message;if (0 !== n) {switch (n) {case "MODULE_ENCRYPTED":console.error("\u6B64\u4E91\u51FD\u6570\uFF08".concat(e, "\uFF09\u4F9D\u8D56\u52A0\u5BC6\u516C\u5171\u6A21\u5757\u4E0D\u53EF\u672C\u5730\u8C03\u8BD5\uFF0C\u81EA\u52A8\u5207\u6362\u4E3A\u4E91\u7AEF\u5DF2\u90E8\u7F72\u7684\u4E91\u51FD\u6570"));break;case "FUNCTION_ENCRYPTED":console.error("\u6B64\u4E91\u51FD\u6570\uFF08".concat(e, "\uFF09\u5DF2\u52A0\u5BC6\u4E0D\u53EF\u672C\u5730\u8C03\u8BD5\uFF0C\u81EA\u52A8\u5207\u6362\u4E3A\u4E91\u7AEF\u5DF2\u90E8\u7F72\u7684\u4E91\u51FD\u6570"));break;case "ACTION_ENCRYPTED":console.error(s || "需要访问加密的uni-clientDB-action，自动切换为云端环境");break;case "NETWORK_ERROR":{var _e20 = "连接本地调试服务失败，请检查客户端是否和主机在同一局域网下";throw console.error(_e20), new Error(_e20);}case "SWITCH_TO_CLOUD":break;default:{var _e21 = "\u68C0\u6D4B\u672C\u5730\u8C03\u8BD5\u670D\u52A1\u51FA\u73B0\u9519\u8BEF\uFF1A".concat(s, "\uFF0C\u8BF7\u68C0\u67E5\u7F51\u7EDC\u73AF\u5883\u6216\u91CD\u542F\u5BA2\u6237\u7AEF\u518D\u8BD5");throw console.error(_e21), new Error(_e21);}}return _this15._callCloudFunction({ name: e, data: t });}return new Promise(function (e, n) {var s = lt.call(_this15, { data: t });V.request({ method: "POST", url: a, data: { provider: o, platform: g, param: s }, success: function success() {var _ref22 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},t = _ref22.statusCode,s = _ref22.data;return !t || t >= 400 ? n(new B({ code: s.code || "SYS_ERR", message: s.message || "request:fail" })) : e({ result: s });}, fail: function fail(e) {n(new B({ code: e.code || e.errCode || "SYS_ERR", message: e.message || e.errMsg || "request:fail" }));} });});});}var dt = [{ rule: /fc_function_not_found|FUNCTION_NOT_FOUND/, content: "，云函数[{functionName}]在云端不存在，请检查此云函数名称是否正确以及该云函数是否已上传到服务空间", mode: "append" }];var ft = /[\\^$.*+?()[\]{}|]/g,gt = RegExp(ft.source);function pt(e, t, n) {return e.replace(new RegExp((s = t) && gt.test(s) ? s.replace(ft, "\\$&") : s, "g"), n);var s;}function mt(_ref23) {var e = _ref23.functionName,t = _ref23.result,n = _ref23.logPvd;if (this.__dev__.debugLog && t && t.requestId) {var _s8 = JSON.stringify({ spaceId: this.config.spaceId, functionName: e, requestId: t.requestId });console.log("[".concat(n, "-request]").concat(_s8, "[/").concat(n, "-request]"));}}function yt(e) {var t = e.callFunction,n = function n(_n5) {var _this16 = this;var s = _n5.name;_n5.data = lt.call(e, { data: _n5.data });var o = { aliyun: "aliyun", tencent: "tcb", tcb: "tcb" }[this.config.provider];return t.call(this, _n5).then(function (e) {return e.errCode = 0, mt.call(_this16, { functionName: s, result: e, logPvd: o }), Promise.resolve(e);}, function (e) {return mt.call(_this16, { functionName: s, result: e, logPvd: o }), e && e.message && (e.message = function () {var _ref24 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},_ref24$message = _ref24.message,e = _ref24$message === void 0 ? "" : _ref24$message,_ref24$extraInfo = _ref24.extraInfo,t = _ref24$extraInfo === void 0 ? {} : _ref24$extraInfo,_ref24$formatter = _ref24.formatter,n = _ref24$formatter === void 0 ? [] : _ref24$formatter;for (var _s9 = 0; _s9 < n.length; _s9++) {var _n$_s = n[_s9],_o3 = _n$_s.rule,_r2 = _n$_s.content,i = _n$_s.mode,_a = e.match(_o3);if (!_a) continue;var _c = _r2;for (var _e22 = 1; _e22 < _a.length; _e22++) {_c = pt(_c, "{$".concat(_e22, "}"), _a[_e22]);}for (var _e23 in t) {_c = pt(_c, "{".concat(_e23, "}"), t[_e23]);}return "replace" === i ? _c : e + _c;}return e;}({ message: "[".concat(_n5.name, "]: ").concat(e.message), formatter: dt, extraInfo: { functionName: s } })), Promise.reject(e);});};e.callFunction = function (t) {var s;d && e.__dev__.debugInfo && !e.__dev__.debugInfo.forceRemote && m ? (e._callCloudFunction || (e._callCloudFunction = n, e._callLocalFunction = ht), s = ht) : s = n;var o = s.call(this, t);return Object.defineProperty(o, "result", { get: function get() {return console.warn("当前返回结果为Promise类型，不可直接访问其result属性，详情请参考：https://uniapp.dcloud.net.cn/uniCloud/faq?id=promise"), {};} }), o;};}var _t = Symbol("CLIENT_DB_INTERNAL");function wt(e, t) {return e.then = "DoNotReturnProxyWithAFunctionNamedThen", e._internalType = _t, e.__ob__ = void 0, new Proxy(e, { get: function get(e, n, s) {if ("_uniClient" === n) return null;if (n in e || "string" != typeof n) {var _t10 = e[n];return "function" == typeof _t10 ? _t10.bind(e) : _t10;}return t.get(e, n, s);} });}function kt(e) {return { on: function on(t, n) {e[t] = e[t] || [], e[t].indexOf(n) > -1 || e[t].push(n);}, off: function off(t, n) {e[t] = e[t] || [];var s = e[t].indexOf(n);-1 !== s && e[t].splice(s, 1);} };}var vt = ["db.Geo", "db.command", "command.aggregate"];function Tt(e, t) {return vt.indexOf("".concat(e, ".").concat(t)) > -1;}function St(e) {switch (u(e)) {case "array":return e.map(function (e) {return St(e);});case "object":return e._internalType === _t || Object.keys(e).forEach(function (t) {e[t] = St(e[t]);}), e;case "regexp":return { $regexp: { source: e.source, flags: e.flags } };case "date":return { $date: e.toISOString() };default:return e;}}function Pt(e) {return e && e.content && e.content.$method;}var At = /*#__PURE__*/function () {function At(e, t, n) {_classCallCheck(this, At);this.content = e, this.prevStage = t || null, this.udb = null, this._database = n;}_createClass(At, [{ key: "toJSON", value: function toJSON() {var e = this;var t = [e.content];for (; e.prevStage;) {e = e.prevStage, t.push(e.content);}return { $db: t.reverse().map(function (e) {return { $method: e.$method, $param: St(e.$param) };}) };} }, { key: "getAction", value: function getAction() {var e = this.toJSON().$db.find(function (e) {return "action" === e.$method;});return e && e.$param && e.$param[0];} }, { key: "getCommand", value: function getCommand() {return { $db: this.toJSON().$db.filter(function (e) {return "action" !== e.$method;}) };} }, { key: "get", value: function get() {return this._send("get", Array.from(arguments));} }, { key: "add", value: function add() {return this._send("add", Array.from(arguments));} }, { key: "update", value: function update() {return this._send("update", Array.from(arguments));} }, { key: "end", value: function end() {return this._send("end", Array.from(arguments));} }, { key: "_send", value: function _send(e, t) {var n = this.getAction(),s = this.getCommand();if (s.$db.push({ $method: e, $param: St(t) }), d) {var _e24 = s.$db.find(function (e) {return "collection" === e.$method;}),_t11 = _e24 && _e24.$param;_t11 && 1 === _t11.length && "string" == typeof _e24.$param[0] && _e24.$param[0].indexOf(",") > -1 && console.warn("检测到使用JQL语法联表查询时，未使用getTemp先过滤主表数据，在主表数据量大的情况下可能会查询缓慢。\n- 如何优化请参考此文档：https://uniapp.dcloud.net.cn/uniCloud/jql?id=lookup-with-temp \n- 如果主表数据量很小请忽略此信息，项目发行时不会出现此提示。");}return this._database._callCloudFunction({ action: n, command: s });} }, { key: "isAggregate", get: function get() {var e = this;for (; e;) {var t = Pt(e),_n6 = Pt(e.prevStage);if ("aggregate" === t && "collection" === _n6 || "pipeline" === t) return !0;e = e.prevStage;}return !1;} }, { key: "isCommand", get: function get() {var e = this;for (; e;) {if ("command" === Pt(e)) return !0;e = e.prevStage;}return !1;} }, { key: "isAggregateCommand", get: function get() {var e = this;for (; e;) {var t = Pt(e),_n7 = Pt(e.prevStage);if ("aggregate" === t && "command" === _n7) return !0;e = e.prevStage;}return !1;} }, { key: "count", get: function get() {if (!this.isAggregate) return function () {return this._send("count", Array.from(arguments));};var e = this;return function () {return It({ $method: "count", $param: St(Array.from(arguments)) }, e, this._database);};} }, { key: "remove", get: function get() {if (!this.isCommand) return function () {return this._send("remove", Array.from(arguments));};var e = this;return function () {return It({ $method: "remove", $param: St(Array.from(arguments)) }, e, this._database);};} }, { key: "set", get: function get() {if (!this.isCommand) return function () {throw new Error("JQL禁止使用set方法");};var e = this;return function () {return It({ $method: "set", $param: St(Array.from(arguments)) }, e, this._database);};} }]);return At;}();function It(e, t, n) {return wt(new At(e, t, n), { get: function get(e, t) {var s = "db";return e && e.content && (s = e.content.$method), Tt(s, t) ? It({ $method: t }, e, n) : function () {return It({ $method: t, $param: St(Array.from(arguments)) }, e, n);};} });}function bt(_ref25) {var e = _ref25.path,t = _ref25.method;return /*#__PURE__*/function () {function _class2() {_classCallCheck(this, _class2);this.param = Array.from(arguments);}_createClass(_class2, [{ key: "toJSON", value: function toJSON() {return { $newDb: [].concat(_toConsumableArray(e.map(function (e) {return { $method: e };})), [{ $method: t, $param: this.param }]) };} }]);return _class2;}();}var Ot = /*#__PURE__*/function (_ref26) {_inherits(Ot, _ref26);var _super9 = _createSuper(Ot);function Ot() {_classCallCheck(this, Ot);return _super9.apply(this, arguments);}_createClass(Ot, [{ key: "_callCloudFunction", value: function _callCloudFunction(_ref27) {var _this17 = this;var e = _ref27.action,t = _ref27.command,n = _ref27.multiCommand,s = _ref27.queryList;function o(e, t) {if (n && s) for (var _n8 = 0; _n8 < s.length; _n8++) {var _o4 = s[_n8];_o4.udb && "function" == typeof _o4.udb.setResult && (t ? _o4.udb.setResult(t) : _o4.udb.setResult(e.result.dataList[_n8]));}}var r = this;function i(e) {return r._callback("error", [e]), A(I("database", "fail"), e).then(function () {return A(I("database", "complete"), e);}).then(function () {return o(null, e), F(C, { type: U, content: e }), Promise.reject(e);});}var a = A(I("database", "invoke")),u = this._uniClient;return a.then(function () {return u.callFunction({ name: "DCloud-clientDB", type: c, data: { action: e, command: t, multiCommand: n } });}).then(function (e) {var _e$result = e.result,t = _e$result.code,n = _e$result.message,s = _e$result.token,r = _e$result.tokenExpired,_e$result$systemInfo = _e$result.systemInfo,a = _e$result$systemInfo === void 0 ? [] : _e$result$systemInfo;if (a) for (var _e25 = 0; _e25 < a.length; _e25++) {var _a$_e = a[_e25],_t12 = _a$_e.level,_n9 = _a$_e.message,_s10 = _a$_e.detail,_o5 = console["app" === g && "warn" === _t12 ? "error" : _t12] || console.log;var _r3 = "[System Info]" + _n9;_s10 && (_r3 = "".concat(_r3, "\n\u8BE6\u7EC6\u4FE1\u606F\uFF1A").concat(_s10)), _o5(_r3);}if (t) {return i(new B({ code: t, message: n, requestId: e.requestId }));}e.result.errCode = e.result.code, e.result.errMsg = e.result.message, s && r && (it({ token: s, tokenExpired: r }), _this17._callbackAuth("refreshToken", [{ token: s, tokenExpired: r }]), _this17._callback("refreshToken", [{ token: s, tokenExpired: r }]), F(R, { token: s, tokenExpired: r }));var c = [{ prop: "affectedDocs", tips: "affectedDocs不再推荐使用，请使用inserted/deleted/updated/data.length替代" }, { prop: "code", tips: "code不再推荐使用，请使用errCode替代" }, { prop: "message", tips: "message不再推荐使用，请使用errMsg替代" }];var _loop = function _loop(_t13) {var _c$_t = c[_t13],n = _c$_t.prop,s = _c$_t.tips;if (n in e.result) {var _t14 = e.result[n];Object.defineProperty(e.result, n, { get: function get() {return console.warn(s), _t14;} });}};for (var _t13 = 0; _t13 < c.length; _t13++) {_loop(_t13);}return function (e) {return A(I("database", "success"), e).then(function () {return A(I("database", "complete"), e);}).then(function () {return o(e, null), F(C, { type: U, content: e }), Promise.resolve(e);});}(e);}, function (e) {/fc_function_not_found|FUNCTION_NOT_FOUND/g.test(e.message) && console.warn("clientDB未初始化，请在web控制台保存一次schema以开启clientDB");return i(new B({ code: e.code || "SYSTEM_ERROR", message: e.message, requestId: e.requestId }));});} }]);return Ot;}( /*#__PURE__*/function () {function _class3() {var _ref28 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},_ref28$uniClient = _ref28.uniClient,e = _ref28$uniClient === void 0 ? {} : _ref28$uniClient;_classCallCheck(this, _class3);this._uniClient = e, this._authCallBacks = {}, this._dbCallBacks = {}, e.isDefault && (this._dbCallBacks = k("_globalUniCloudDatabaseCallback")), this.auth = kt(this._authCallBacks), Object.assign(this, kt(this._dbCallBacks)), this.env = wt({}, { get: function get(e, t) {return { $env: t };} }), this.Geo = wt({}, { get: function get(e, t) {return bt({ path: ["Geo"], method: t });} }), this.serverDate = bt({ path: [], method: "serverDate" }), this.RegExp = bt({ path: [], method: "RegExp" });}_createClass(_class3, [{ key: "getCloudEnv", value: function getCloudEnv(e) {if ("string" != typeof e || !e.trim()) throw new Error("getCloudEnv参数错误");return { $env: e.replace("$cloudEnv_", "") };} }, { key: "_callback", value: function _callback(e, t) {var n = this._dbCallBacks;n[e] && n[e].forEach(function (e) {e.apply(void 0, _toConsumableArray(t));});} }, { key: "_callbackAuth", value: function _callbackAuth(e, t) {var n = this._authCallBacks;n[e] && n[e].forEach(function (e) {e.apply(void 0, _toConsumableArray(t));});} }, { key: "multiSend", value: function multiSend() {var e = Array.from(arguments),t = e.map(function (e) {var t = e.getAction(),n = e.getCommand();if ("getTemp" !== n.$db[n.$db.length - 1].$method) throw new Error("multiSend只支持子命令内使用getTemp");return { action: t, command: n };});return this._callCloudFunction({ multiCommand: t, queryList: e });} }]);return _class3;}());function Ct(e) {e.database = function (t) {if (t && Object.keys(t).length > 0) return e.init(t).database();if (this._database) return this._database;var n = function (e) {var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};return wt(new e(t), { get: function get(e, t) {return Tt("db", t) ? It({ $method: t }, null, e) : function () {return It({ $method: t, $param: St(Array.from(arguments)) }, null, e);};} });}(Ot, { uniClient: e });return this._database = n, n;};}var Et = "token无效，跳转登录页面",Rt = "token过期，跳转登录页面",Ut = { TOKEN_INVALID_TOKEN_EXPIRED: Rt, TOKEN_INVALID_INVALID_CLIENTID: Et, TOKEN_INVALID: Et, TOKEN_INVALID_WRONG_TOKEN: Et, TOKEN_INVALID_ANONYMOUS_USER: Et },xt = { "uni-id-token-expired": Rt, "uni-id-check-token-failed": Et, "uni-id-token-not-exist": Et, "uni-id-check-device-feature-failed": Et };function Lt(e, t) {var n = "";return n = e ? "".concat(e, "/").concat(t) : t, n.replace(/^\//, "");}function Dt() {var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";var n = [],s = [];return e.forEach(function (e) {!0 === e.needLogin ? n.push(Lt(t, e.path)) : !1 === e.needLogin && s.push(Lt(t, e.path));}), { needLoginPage: n, notNeedLoginPage: s };}function Nt(e) {return e.split("?")[0].replace(/^\//, "");}function qt() {return function (e) {var t = e && e.$page && e.$page.fullPath || "";return t ? ("/" !== t.charAt(0) && (t = "/" + t), t) : t;}(function () {var e = getCurrentPages();return e[e.length - 1];}());}function Ft() {return Nt(qt());}function Mt() {var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};if (!e) return !1;if (!(t && t.list && t.list.length)) return !1;var n = t.list,s = Nt(e);return n.some(function (e) {return e.pagePath === s;});}var jt = !!_pages.default.uniIdRouter;var _ref29 = function () {var _ref30 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _pages.default,_ref30$pages = _ref30.pages,e = _ref30$pages === void 0 ? [] : _ref30$pages,_ref30$subPackages = _ref30.subPackages,n = _ref30$subPackages === void 0 ? [] : _ref30$subPackages,_ref30$uniIdRouter = _ref30.uniIdRouter,s = _ref30$uniIdRouter === void 0 ? {} : _ref30$uniIdRouter,_ref30$tabBar = _ref30.tabBar,o = _ref30$tabBar === void 0 ? {} : _ref30$tabBar;var r = s.loginPage,_s$needLogin = s.needLogin,i = _s$needLogin === void 0 ? [] : _s$needLogin,_s$resToLogin = s.resToLogin,a = _s$resToLogin === void 0 ? !0 : _s$resToLogin,_Dt = Dt(e),c = _Dt.needLoginPage,u = _Dt.notNeedLoginPage,_ref31 = function () {var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];var t = [],n = [];return e.forEach(function (e) {var s = e.root,_e$pages = e.pages,o = _e$pages === void 0 ? [] : _e$pages,_Dt2 = Dt(o, s),r = _Dt2.needLoginPage,i = _Dt2.notNeedLoginPage;t.push.apply(t, _toConsumableArray(r)), n.push.apply(n, _toConsumableArray(i));}), { needLoginPage: t, notNeedLoginPage: n };}(n),l = _ref31.needLoginPage,h = _ref31.notNeedLoginPage;return { loginPage: r, routerNeedLogin: i, resToLogin: a, needLoginPage: [].concat(_toConsumableArray(c), _toConsumableArray(l)), notNeedLoginPage: [].concat(_toConsumableArray(u), _toConsumableArray(h)), loginPageInTabBar: Mt(r, o) };}(),$t = _ref29.loginPage,Kt = _ref29.routerNeedLogin,Bt = _ref29.resToLogin,Ht = _ref29.needLoginPage,Wt = _ref29.notNeedLoginPage,zt = _ref29.loginPageInTabBar;if (Ht.indexOf($t) > -1) throw new Error("Login page [".concat($t, "] should not be \"needLogin\", please check your pages.json"));function Jt(e) {var t = Nt(function (e) {var t = Ft(),n = e.charAt(0),s = e.split("?")[0];if ("/" === n) return s;var o = s.replace(/^\//, "").split("/"),r = t.split("/");r.pop();for (var _e26 = 0; _e26 < o.length; _e26++) {var _t15 = o[_e26];".." === _t15 ? r.pop() : "." !== _t15 && r.push(_t15);}return "" === r[0] && r.shift(), r.join("/");}(e));return !(Wt.indexOf(t) > -1) && (Ht.indexOf(t) > -1 || Kt.some(function (t) {return function (e, t) {return new RegExp(t).test(e);}(e, t);}));}function Vt(_ref32) {var e = _ref32.redirect;var t = Nt(e),n = Nt($t);return Ft() !== n && t !== n;}function Yt() {var _ref33 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},e = _ref33.api,t = _ref33.redirect;if (!t || !Vt({ redirect: t })) return;var n = function (e, t) {return "/" !== e.charAt(0) && (e = "/" + e), t ? e.indexOf("?") > -1 ? e + "&uniIdRedirectUrl=".concat(encodeURIComponent(t)) : e + "?uniIdRedirectUrl=".concat(encodeURIComponent(t)) : e;}($t, t);zt ? "navigateTo" !== e && "redirectTo" !== e || (e = "switchTab") : "switchTab" === e && (e = "navigateTo"), setTimeout(function () {uni[e]({ url: n });});}function Xt() {var _ref34 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},e = _ref34.url;var t = { abortLoginPageJump: !1, autoToLoginPage: !1 },n = function () {var _rt3 = rt(),e = _rt3.token,t = _rt3.tokenExpired;var n;if (e) {if (t < Date.now()) {var _e27 = "uni-id-token-expired";n = { errCode: _e27, errMsg: xt[_e27] };}} else {var _e28 = "uni-id-check-token-failed";n = { errCode: _e28, errMsg: xt[_e28] };}return n;}();if (Jt(e) && n) {n.uniIdRedirectUrl = e;if (D(E).length > 0) return setTimeout(function () {F(E, n);}, 0), t.abortLoginPageJump = !0, t;t.autoToLoginPage = !0;}return t;}function Gt() {!function () {var e = qt(),_Xt = Xt({ url: e }),t = _Xt.abortLoginPageJump,n = _Xt.autoToLoginPage;t || n && Yt({ api: "redirectTo", redirect: e });}();var e = ["navigateTo", "redirectTo", "reLaunch", "switchTab"];var _loop2 = function _loop2(_t16) {var n = e[_t16];uni.addInterceptor(n, { invoke: function invoke(e) {var _Xt2 = Xt({ url: e.url }),t = _Xt2.abortLoginPageJump,s = _Xt2.autoToLoginPage;return t ? e : s ? (Yt({ api: n, redirect: e.url }), !1) : e;} });};for (var _t16 = 0; _t16 < e.length; _t16++) {_loop2(_t16);}}function Qt() {this.onResponse(function (e) {var t = e.type,n = e.content;var s = !1;switch (t) {case "cloudobject":s = function (e) {var t = e.errCode;return t in xt;}(n);break;case "clientdb":s = function (e) {var t = e.errCode;return t in Ut;}(n);}s && function () {var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var t = D(E);$().then(function () {var n = qt();if (n && Vt({ redirect: n })) return t.length > 0 ? F(E, Object.assign({ uniIdRedirectUrl: n }, e)) : void ($t && Yt({ api: "navigateTo", redirect: n }));});}(n);});}function Zt(e) {!function (e) {e.onResponse = function (e) {N(C, e);}, e.offResponse = function (e) {q(C, e);};}(e), function (e) {e.onNeedLogin = function (e) {N(E, e);}, e.offNeedLogin = function (e) {q(E, e);}, jt && (k("uni-cloud-status").needLoginInit || (k("uni-cloud-status").needLoginInit = !0, $().then(function () {Gt.call(e);}), Bt && Qt.call(e)));}(e), function (e) {e.onRefreshToken = function (e) {N(R, e);}, e.offRefreshToken = function (e) {q(R, e);};}(e);}var en;var tn = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",nn = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;function sn() {var e = rt().token || "",t = e.split(".");if (!e || 3 !== t.length) return { uid: null, role: [], permission: [], tokenExpired: 0 };var n;try {n = JSON.parse((s = t[1], decodeURIComponent(en(s).split("").map(function (e) {return "%" + ("00" + e.charCodeAt(0).toString(16)).slice(-2);}).join(""))));} catch (e) {throw new Error("获取当前用户信息出错，详细错误信息为：" + e.message);}var s;return n.tokenExpired = 1e3 * n.exp, delete n.exp, delete n.iat, n;}en = "function" != typeof atob ? function (e) {if (e = String(e).replace(/[\t\n\f\r ]+/g, ""), !nn.test(e)) throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");var t;e += "==".slice(2 - (3 & e.length));for (var n, s, o = "", r = 0; r < e.length;) {t = tn.indexOf(e.charAt(r++)) << 18 | tn.indexOf(e.charAt(r++)) << 12 | (n = tn.indexOf(e.charAt(r++))) << 6 | (s = tn.indexOf(e.charAt(r++))), o += 64 === n ? String.fromCharCode(t >> 16 & 255) : 64 === s ? String.fromCharCode(t >> 16 & 255, t >> 8 & 255) : String.fromCharCode(t >> 16 & 255, t >> 8 & 255, 255 & t);}return o;} : atob;var on = s(function (e, t) {Object.defineProperty(t, "__esModule", { value: !0 });var n = "chooseAndUploadFile:ok",s = "chooseAndUploadFile:fail";function o(e, t) {return e.tempFiles.forEach(function (e, n) {e.name || (e.name = e.path.substring(e.path.lastIndexOf("/") + 1)), t && (e.fileType = t), e.cloudPath = Date.now() + "_" + n + e.name.substring(e.name.lastIndexOf("."));}), e.tempFilePaths || (e.tempFilePaths = e.tempFiles.map(function (e) {return e.path;})), e;}function r(e, t, _ref35) {var s = _ref35.onChooseFile,o = _ref35.onUploadProgress;return t.then(function (e) {if (s) {var _t17 = s(e);if (void 0 !== _t17) return Promise.resolve(_t17).then(function (t) {return void 0 === t ? e : t;});}return e;}).then(function (t) {return !1 === t ? { errMsg: n, tempFilePaths: [], tempFiles: [] } : function (e, t) {var s = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 5;var o = arguments.length > 3 ? arguments[3] : undefined;(t = Object.assign({}, t)).errMsg = n;var r = t.tempFiles,i = r.length;var a = 0;return new Promise(function (n) {for (; a < s;) {c();}function c() {var s = a++;if (s >= i) return void (!r.find(function (e) {return !e.url && !e.errMsg;}) && n(t));var u = r[s];e.uploadFile({ filePath: u.path, cloudPath: u.cloudPath, fileType: u.fileType, onUploadProgress: function onUploadProgress(e) {e.index = s, e.tempFile = u, e.tempFilePath = u.path, o && o(e);} }).then(function (e) {u.url = e.fileID, s < i && c();}).catch(function (e) {u.errMsg = e.errMsg || e.message, s < i && c();});}});}(e, t, 5, o);});}t.initChooseAndUploadFile = function (e) {return function () {var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { type: "all" };return "image" === t.type ? r(e, function (e) {var t = e.count,n = e.sizeType,_e$sourceType = e.sourceType,r = _e$sourceType === void 0 ? ["album", "camera"] : _e$sourceType,i = e.extension;return new Promise(function (e, a) {uni.chooseImage({ count: t, sizeType: n, sourceType: r, extension: i, success: function success(t) {e(o(t, "image"));}, fail: function fail(e) {a({ errMsg: e.errMsg.replace("chooseImage:fail", s) });} });});}(t), t) : "video" === t.type ? r(e, function (e) {var t = e.camera,n = e.compressed,r = e.maxDuration,_e$sourceType2 = e.sourceType,i = _e$sourceType2 === void 0 ? ["album", "camera"] : _e$sourceType2,a = e.extension;return new Promise(function (e, c) {uni.chooseVideo({ camera: t, compressed: n, maxDuration: r, sourceType: i, extension: a, success: function success(t) {var n = t.tempFilePath,s = t.duration,r = t.size,i = t.height,a = t.width;e(o({ errMsg: "chooseVideo:ok", tempFilePaths: [n], tempFiles: [{ name: t.tempFile && t.tempFile.name || "", path: n, size: r, type: t.tempFile && t.tempFile.type || "", width: a, height: i, duration: s, fileType: "video", cloudPath: "" }] }, "video"));}, fail: function fail(e) {c({ errMsg: e.errMsg.replace("chooseVideo:fail", s) });} });});}(t), t) : r(e, function (e) {var t = e.count,n = e.extension;return new Promise(function (e, r) {var i = uni.chooseFile;if ("undefined" != typeof wx && "function" == typeof wx.chooseMessageFile && (i = wx.chooseMessageFile), "function" != typeof i) return r({ errMsg: s + " 请指定 type 类型，该平台仅支持选择 image 或 video。" });i({ type: "all", count: t, extension: n, success: function success(t) {e(o(t));}, fail: function fail(e) {r({ errMsg: e.errMsg.replace("chooseFile:fail", s) });} });});}(t), t);};};}),rn = n(on);var an = "manual";function cn(e) {return { props: { localdata: { type: Array, default: function _default() {return [];} }, options: { type: [Object, Array], default: function _default() {return {};} }, spaceInfo: { type: Object, default: function _default() {return {};} }, collection: { type: [String, Array], default: "" }, action: { type: String, default: "" }, field: { type: String, default: "" }, orderby: { type: String, default: "" }, where: { type: [String, Object], default: "" }, pageData: { type: String, default: "add" }, pageCurrent: { type: Number, default: 1 }, pageSize: { type: Number, default: 20 }, getcount: { type: [Boolean, String], default: !1 }, gettree: { type: [Boolean, String], default: !1 }, gettreepath: { type: [Boolean, String], default: !1 }, startwith: { type: String, default: "" }, limitlevel: { type: Number, default: 10 }, groupby: { type: String, default: "" }, groupField: { type: String, default: "" }, distinct: { type: [Boolean, String], default: !1 }, foreignKey: { type: String, default: "" }, loadtime: { type: String, default: "auto" }, manual: { type: Boolean, default: !1 } }, data: function data() {return { mixinDatacomLoading: !1, mixinDatacomHasMore: !1, mixinDatacomResData: [], mixinDatacomErrorMessage: "", mixinDatacomPage: {} };}, created: function created() {var _this18 = this;this.mixinDatacomPage = { current: this.pageCurrent, size: this.pageSize, count: 0 }, this.$watch(function () {var e = [];return ["pageCurrent", "pageSize", "localdata", "collection", "action", "field", "orderby", "where", "getont", "getcount", "gettree", "groupby", "groupField", "distinct"].forEach(function (t) {e.push(_this18[t]);}), e;}, function (e, t) {if (_this18.loadtime === an) return;var n = !1;var s = [];for (var _o6 = 2; _o6 < e.length; _o6++) {e[_o6] !== t[_o6] && (s.push(e[_o6]), n = !0);}e[0] !== t[0] && (_this18.mixinDatacomPage.current = _this18.pageCurrent), _this18.mixinDatacomPage.size = _this18.pageSize, _this18.onMixinDatacomPropsChange(n, s);});}, methods: { onMixinDatacomPropsChange: function onMixinDatacomPropsChange(e, t) {}, mixinDatacomEasyGet: function mixinDatacomEasyGet() {var _this19 = this;var _ref36 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},_ref36$getone = _ref36.getone,e = _ref36$getone === void 0 ? !1 : _ref36$getone,t = _ref36.success,n = _ref36.fail;this.mixinDatacomLoading || (this.mixinDatacomLoading = !0, this.mixinDatacomErrorMessage = "", this.mixinDatacomGet().then(function (n) {_this19.mixinDatacomLoading = !1;var _n$result = n.result,s = _n$result.data,o = _n$result.count;_this19.getcount && (_this19.mixinDatacomPage.count = o), _this19.mixinDatacomHasMore = s.length < _this19.pageSize;var r = e ? s.length ? s[0] : void 0 : s;_this19.mixinDatacomResData = r, t && t(r);}).catch(function (e) {_this19.mixinDatacomLoading = !1, _this19.mixinDatacomErrorMessage = e, n && n(e);}));}, mixinDatacomGet: function mixinDatacomGet() {var _n10;var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var n = e.database(this.spaceInfo);var s = t.action || this.action;s && (n = n.action(s));var o = t.collection || this.collection;n = Array.isArray(o) ? (_n10 = n).collection.apply(_n10, _toConsumableArray(o)) : n.collection(o);var r = t.where || this.where;r && Object.keys(r).length && (n = n.where(r));var i = t.field || this.field;i && (n = n.field(i));var a = t.foreignKey || this.foreignKey;a && (n = n.foreignKey(a));var c = t.groupby || this.groupby;c && (n = n.groupBy(c));var u = t.groupField || this.groupField;u && (n = n.groupField(u));!0 === (void 0 !== t.distinct ? t.distinct : this.distinct) && (n = n.distinct());var l = t.orderby || this.orderby;l && (n = n.orderBy(l));var h = void 0 !== t.pageCurrent ? t.pageCurrent : this.mixinDatacomPage.current,d = void 0 !== t.pageSize ? t.pageSize : this.mixinDatacomPage.size,f = void 0 !== t.getcount ? t.getcount : this.getcount,g = void 0 !== t.gettree ? t.gettree : this.gettree,p = void 0 !== t.gettreepath ? t.gettreepath : this.gettreepath,m = { getCount: f },y = { limitLevel: void 0 !== t.limitlevel ? t.limitlevel : this.limitlevel, startWith: void 0 !== t.startwith ? t.startwith : this.startwith };return g && (m.getTree = y), p && (m.getTreePath = y), n = n.skip(d * (h - 1)).limit(d).get(m), n;} } };}function un(e) {return function (t) {var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};n = function (e) {var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};return e.customUI = t.customUI || e.customUI, Object.assign(e.loadingOptions, t.loadingOptions), Object.assign(e.errorOptions, t.errorOptions), "object" == typeof t.secretMethods && (e.secretMethods = t.secretMethods), e;}({ customUI: !1, loadingOptions: { title: "加载中...", mask: !0 }, errorOptions: { type: "modal", retry: !1 } }, n);var _n11 = n,s = _n11.customUI,o = _n11.loadingOptions,r = _n11.errorOptions,i = !s;return new Proxy({}, { get: function get(s, c) {return function () {var _ref37 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},e = _ref37.fn,t = _ref37.interceptorName,n = _ref37.getCallbackArgs;return /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee31() {var _len,s,_key,o,r,i,_args31 = arguments;return _regenerator.default.wrap(function _callee31$(_context31) {while (1) {switch (_context31.prev = _context31.next) {case 0:for (_len = _args31.length, s = new Array(_len), _key = 0; _key < _len; _key++) {s[_key] = _args31[_key];}o = n ? n({ params: s }) : {};_context31.prev = 2;_context31.next = 5;return A(I(t, "invoke"), _objectSpread({}, o));case 5:_context31.next = 7;return e.apply(void 0, s);case 7:r = _context31.sent;_context31.next = 10;return A(I(t, "success"), _objectSpread(_objectSpread({}, o), {}, { result: r }));case 10:return _context31.abrupt("return", r);case 13:_context31.prev = 13;_context31.t0 = _context31["catch"](2);i = _context31.t0;_context31.next = 18;return A(I(t, "fail"), _objectSpread(_objectSpread({}, o), {}, { error: i }));case 18:throw i;case 19:_context31.prev = 19;_context31.next = 22;return A(I(t, "complete"), i ? _objectSpread(_objectSpread({}, o), {}, { error: i }) : _objectSpread(_objectSpread({}, o), {}, { result: r }));case 22:return _context31.finish(19);case 23:case "end":return _context31.stop();}}}, _callee31, null, [[2, 13, 19, 23]]);}));}({ fn: function () {var _s11 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee33() {var l,_len2,u,_key2,h,_ref39,d,f,g,_yield,_e30,_e29,_args33 = arguments;return _regenerator.default.wrap(function _callee33$(_context33) {while (1) {switch (_context33.prev = _context33.next) {case 0:i && uni.showLoading({ title: o.title, mask: o.mask });for (_len2 = _args33.length, u = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {u[_key2] = _args33[_key2];}h = { name: t, type: a, data: { method: c, params: u } };"object" == typeof n.secretMethods && function (e, t) {var n = t.data.method,s = e.secretMethods[n];s && (t.secret = s);}(n, h);_context33.prev = 4;_context33.next = 7;return e.callFunction(h);case 7:l = _context33.sent;_context33.next = 13;break;case 10:_context33.prev = 10;_context33.t0 = _context33["catch"](4);l = { result: _context33.t0 };case 13:_ref39 = l.result || {}, d = _ref39.errCode, f = _ref39.errMsg, g = _ref39.newToken;if (!(i && uni.hideLoading(), g && g.token && g.tokenExpired && (it(g), F(R, _objectSpread({}, g))), d)) {_context33.next = 30;break;}if (!i) {_context33.next = 28;break;}if (!("toast" === r.type)) {_context33.next = 20;break;}uni.showToast({ title: f, icon: "none" });_context33.next = 28;break;case 20:if (!("modal" !== r.type)) {_context33.next = 22;break;}throw new Error("Invalid errorOptions.type: ".concat(r.type));case 22:_context33.next = 24;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee32() {var _ref41,e,t,n,s,o,_args32 = arguments;return _regenerator.default.wrap(function _callee32$(_context32) {while (1) {switch (_context32.prev = _context32.next) {case 0:_ref41 = _args32.length > 0 && _args32[0] !== undefined ? _args32[0] : {}, e = _ref41.title, t = _ref41.content, n = _ref41.showCancel, s = _ref41.cancelText, o = _ref41.confirmText;return _context32.abrupt("return", new Promise(function (r, i) {uni.showModal({ title: e, content: t, showCancel: n, cancelText: s, confirmText: o, success: function success(e) {r(e);}, fail: function fail() {r({ confirm: !1, cancel: !0 });} });}));case 2:case "end":return _context32.stop();}}}, _callee32);}))({ title: "提示", content: f, showCancel: r.retry, cancelText: "取消", confirmText: r.retry ? "重试" : "确定" });case 24:_yield = _context33.sent;_e30 = _yield.confirm;if (!(r.retry && _e30)) {_context33.next = 28;break;}return _context33.abrupt("return", s.apply(void 0, u));case 28:_e29 = new B({ code: d, message: f, requestId: l.requestId });throw _e29.detail = l.result, F(C, { type: L, content: _e29 }), _e29;case 30:return _context33.abrupt("return", (F(C, { type: L, content: l.result }), l.result));case 31:case "end":return _context33.stop();}}}, _callee33, null, [[4, 10]]);}));function s() {return _s11.apply(this, arguments);}return s;}(), interceptorName: "callObject", getCallbackArgs: function getCallbackArgs() {var _ref42 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},e = _ref42.params;return { objectName: t, methodName: c, params: e };} });} });};}function ln(_x30, _x31) {return _ln.apply(this, arguments);}function _ln() {_ln = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee35(e, t) {var n, _e34, s;return _regenerator.default.wrap(function _callee35$(_context35) {while (1) {switch (_context35.prev = _context35.next) {case 0:n = "http://".concat(e, ":").concat(t, "/system/ping");_context35.prev = 1;_context35.next = 4;return s = { url: n, timeout: 500 }, new Promise(function (e, t) {V.request(_objectSpread(_objectSpread({}, s), {}, { success: function success(t) {e(t);}, fail: function fail(e) {t(e);} }));});case 4:_e34 = _context35.sent;return _context35.abrupt("return", !(!_e34.data || 0 !== _e34.data.code));case 8:_context35.prev = 8;_context35.t0 = _context35["catch"](1);return _context35.abrupt("return", !1);case 11:case "end":return _context35.stop();}}}, _callee35, null, [[1, 8]]);}));return _ln.apply(this, arguments);}function hn(e) {if (e.initUniCloudStatus && "rejected" !== e.initUniCloudStatus) return;var t = Promise.resolve();var n;n = 1, t = new Promise(function (e, t) {setTimeout(function () {e();}, n);}), e.isReady = !1, e.isDefault = !1;var s = e.auth();e.initUniCloudStatus = "pending", e.initUniCloud = t.then(function () {return s.getLoginState();}).then(function (e) {return e ? Promise.resolve() : s.signInAnonymously();}).then(function () {if (!d) return Promise.resolve();if ("app" === g) {var _uni$getSystemInfoSyn = uni.getSystemInfoSync(),_e31 = _uni$getSystemInfoSyn.osName,_t18 = _uni$getSystemInfoSyn.osVersion;"ios" === _e31 && function (e) {if (!e || "string" != typeof e) return 0;var t = e.match(/^(\d+)./);return t && t[1] ? parseInt(t[1]) : 0;}(_t18) >= 14 && console.warn("iOS 14及以上版本连接uniCloud本地调试服务需要允许客户端查找并连接到本地网络上的设备（仅开发模式生效，发行模式会连接uniCloud云端服务）");}if (d && e.__dev__.debugInfo) {var _e$__dev__$debugInfo = e.__dev__.debugInfo,_t19 = _e$__dev__$debugInfo.address,_n12 = _e$__dev__$debugInfo.servePort;return function () {var _ref43 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee34(e, t) {var n, _s12, _o7;return _regenerator.default.wrap(function _callee34$(_context34) {while (1) {switch (_context34.prev = _context34.next) {case 0:_s12 = 0;case 1:if (!(_s12 < e.length)) {_context34.next = 11;break;}_o7 = e[_s12];_context34.next = 5;return ln(_o7, t);case 5:if (!_context34.sent) {_context34.next = 8;break;}n = _o7;return _context34.abrupt("break", 11);case 8:_s12++;_context34.next = 1;break;case 11:return _context34.abrupt("return", { address: n, port: t });case 12:case "end":return _context34.stop();}}}, _callee34);}));return function (_x32, _x33) {return _ref43.apply(this, arguments);};}()(_t19, _n12);}}).then(function () {var _ref44 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},t = _ref44.address,n = _ref44.port;if (!d) return Promise.resolve();var s = console["app" === g ? "error" : "warn"];if (t) e.__dev__.localAddress = t, e.__dev__.localPort = n;else if (e.__dev__.debugInfo) {var _t20 = "";"remote" === e.__dev__.debugInfo.initialLaunchType ? (e.__dev__.debugInfo.forceRemote = !0, _t20 = "当前客户端和HBuilderX不在同一局域网下（或其他网络原因无法连接HBuilderX），uniCloud本地调试服务不对当前客户端生效。\n- 如果不使用uniCloud本地调试服务，请直接忽略此信息。\n- 如需使用uniCloud本地调试服务，请将客户端与主机连接到同一局域网下并重新运行到客户端。\n- 如果在HBuilderX开启的状态下切换过网络环境，请重启HBuilderX后再试\n- 检查系统防火墙是否拦截了HBuilderX自带的nodejs") : _t20 = "无法连接uniCloud本地调试服务，请检查当前客户端是否与主机在同一局域网下。\n- 如需使用uniCloud本地调试服务，请将客户端与主机连接到同一局域网下并重新运行到客户端。\n- 如果在HBuilderX开启的状态下切换过网络环境，请重启HBuilderX后再试\n- 检查系统防火墙是否拦截了HBuilderX自带的nodejs", "web" === g && (_t20 += "\n- 部分浏览器开启节流模式之后访问本地地址受限，请检查是否启用了节流模式"), 0 === g.indexOf("mp-") && (_t20 += "\n- 小程序中如何使用uniCloud，请参考：https://uniapp.dcloud.net.cn/uniCloud/publish.html#useinmp"), s(_t20);}}).then(function () {at(), e.isReady = !0, e.initUniCloudStatus = "fulfilled";}).catch(function (t) {console.error(t), e.initUniCloudStatus = "rejected";});}var dn = { tcb: ot, tencent: ot, aliyun: Q, private: ut };var fn = new ( /*#__PURE__*/function () {function _class4() {_classCallCheck(this, _class4);}_createClass(_class4, [{ key: "init", value: function init(e) {var t = {};var n = dn[e.provider];if (!n) throw new Error("未提供正确的provider参数");t = n.init(e), t.__dev__ = {}, t.__dev__.debugLog = d && ("web" === g && navigator.userAgent.indexOf("HBuilderX") > 0 || "app" === g);var s = p;d && s && !s.code && (t.__dev__.debugInfo = s), hn(t), t.reInit = function () {hn(this);}, yt(t), function (e) {var t = e.uploadFile;e.uploadFile = function (e) {return t.call(this, e);};}(t), Ct(t), function (e) {e.getCurrentUserInfo = sn, e.chooseAndUploadFile = rn.initChooseAndUploadFile(e), Object.assign(e, { get mixinDatacom() {return cn(e);} }), e.importObject = un(e);}(t);return ["callFunction", "uploadFile", "deleteFile", "getTempFileURL", "downloadFile", "chooseAndUploadFile"].forEach(function (e) {if (!t[e]) return;var n = t[e];t[e] = function () {return t.reInit(), n.apply(t, Array.from(arguments));}, t[e] = K(t[e], e).bind(t);}), t.init = this.init, t;} }]);return _class4;}())();(function () {var e = m;var t = {};if (e && 1 === e.length) t = e[0], fn = fn.init(t), fn.isDefault = !0;else {var _t21 = ["auth", "callFunction", "uploadFile", "deleteFile", "getTempFileURL", "downloadFile", "database", "getCurrentUSerInfo", "importObject"];var _n13;_n13 = e && e.length > 0 ? "应用有多个服务空间，请通过uniCloud.init方法指定要使用的服务空间" : y ? "应用未关联服务空间，请在uniCloud目录右键关联服务空间" : "uni-app cli项目内使用uniCloud需要使用HBuilderX的运行菜单运行项目，且需要在uniCloud目录关联服务空间", _t21.forEach(function (e) {fn[e] = function () {return console.error(_n13), Promise.reject(new B({ code: "SYS_ERR", message: _n13 }));};});}Object.assign(fn, { get mixinDatacom() {return cn(fn);} }), Zt(fn), fn.addInterceptor = S, fn.removeInterceptor = P, fn.interceptObject = b, d && "web" === g && (window.uniCloud = fn);})();var gn = fn;exports.default = gn;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 2), __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 52:
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 53);

/***/ }),

/***/ 53:
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 54);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),

/***/ 54:
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),

/***/ 55:
/*!****************************************************************************!*\
  !*** D:/Project/Tiktok/tiktok-app/pages.json?{"type":"origin-pages-json"} ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = { "pages": [{ "path": "pages/index/index", "style": { "app-plus": { "titleNView": false }, "enablePullDownRefresh": true } }, { "path": "pages/friend/friend", "style": { "app-plus": { "titleNView": false } } }, { "path": "pages/vlog/vlog", "style": { "app-plus": { "titleNView": false } } }, { "path": "pages/publish/publish", "style": { "navigationBarTitleText": "发布视频" } }, { "path": "pages/me/me", "style": { "app-plus": { "titleNView": false } } }, { "path": "pages/me/vlogerInfo", "style": { "app-plus": { "titleNView": false } } }, { "path": "pages/message/message", "style": { "navigationBarTitleText": "消息", "navigationBarBackgroundColor": "#181b27" } }, { "path": "pages/publish/preview", "style": { "navigationBarTitleText": "预览视频", "enablePullDownRefresh": false } }, { "path": "pages/search/search", "style": { "app-plus": { "titleNView": false } } }, { "path": "pages/search/searchList", "style": { "app-plus": { "titleNView": false } } }, { "path": "pages/qrcode/qrcode", "style": { "app-plus": { "titleNView": false, "navigationBarTextStyle": "black" } } }, { "path": "pages/loginRegist/loginRegist", "style": { "app-plus": { "titleNView": false, "navigationBarTextStyle": "black" } } }, { "path": "pages/me/myBackImg", "style": { "app-plus": { "titleNView": false } } }, { "path": "pages/me/myFace", "style": { "app-plus": { "titleNView": false } } }, { "path": "pages/me/myInfo", "style": { "navigationBarTitleText": "修改个人资料", "navigationBarBackgroundColor": "#181b27" } }, { "path": "pages/me/modifyNickname", "style": { "navigationBarTitleText": "修改昵称", "navigationBarTextStyle": "white", "navigationBarBackgroundColor": "#181b27", "app-plus": { "titleNView": { "buttons": [{ "text": "保存", "color": "#ef274d", "width": "60px", "fontSize": "15px", "fontWeight": "bold" }] } } } }, { "path": "pages/me/modifyIMoocNum", "style": { "navigationBarTitleText": "修改抖音号", "navigationBarTextStyle": "white", "navigationBarBackgroundColor": "#181b27", "app-plus": { "titleNView": { "buttons": [{ "text": "保存", "color": "#ef274d", "width": "60px", "fontSize": "15px", "fontWeight": "bold" }] } } } }, { "path": "pages/me/modifyDesc", "style": { "navigationBarTitleText": "修改简介", "navigationBarTextStyle": "white", "navigationBarBackgroundColor": "#181b27", "app-plus": { "titleNView": { "buttons": [{ "text": "保存", "color": "#ef274d", "width": "60px", "fontSize": "15px", "fontWeight": "bold" }] } } } }, { "path": "pages/me/modifySex", "style": { "navigationBarTitleText": "修改性别", "navigationBarTextStyle": "white", "navigationBarBackgroundColor": "#181b27", "app-plus": { "titleNView": { "buttons": [{ "text": "保存", "color": "#ef274d", "width": "60px", "fontSize": "15px", "fontWeight": "bold" }] } } } }, { "path": "pages/me/modifyBirthday", "style": { "navigationBarTitleText": "修改生日", "navigationBarTextStyle": "white", "navigationBarBackgroundColor": "#181b27", "app-plus": { "titleNView": { "buttons": [{ "text": "保存", "color": "#ef274d", "width": "60px", "fontSize": "15px", "fontWeight": "bold" }] } } } }, { "path": "pages/me/modifyLocation", "style": { "navigationBarTitleText": "修改所在地", "navigationBarTextStyle": "white", "navigationBarBackgroundColor": "#181b27", "app-plus": { "titleNView": { "buttons": [{ "text": "保存", "color": "#ef274d", "width": "60px", "fontSize": "15px", "fontWeight": "bold" }] } } } }, { "path": "pages/me/chooseProvince", "style": { "navigationBarTitleText": "选择省份", "navigationBarTextStyle": "white", "navigationBarBackgroundColor": "#181b27" } }, { "path": "pages/me/chooseCity", "style": { "navigationBarTitleText": "选择地区", "navigationBarTextStyle": "white", "navigationBarBackgroundColor": "#181b27" } }, { "path": "pages/me/settings", "style": { "navigationBarTitleText": "设置", "navigationBarTextStyle": "white", "navigationBarBackgroundColor": "#181b27" } }, { "path": "pages/me/myFans", "style": { "navigationBarTitleText": "我的粉丝", "navigationBarTextStyle": "white", "navigationBarBackgroundColor": "#181b27" } }, { "path": "pages/me/myFollows", "style": { "navigationBarTitleText": "我的关注", "navigationBarTextStyle": "white", "navigationBarBackgroundColor": "#181b27" } }], "globalStyle": { "navigationBarBackgroundColor": "#000000", "navigationBarTextStyle": "white", "navigationBarTitleText": "uni-app", "backgroundColor": "#000000" }, "tabBar": { "color": "#999696", "selectedColor": "#FFFFFF", "borderStyle": "#1c1b1b", "backgroundColor": "#0e0d0d", "fontSize": "16px", "list": [{ "pagePath": "pages/index/index", "text": "首页" }, { "pagePath": "pages/friend/friend", "text": "朋友" }, { "pagePath": "pages/message/message", "text": "消息" }, { "pagePath": "pages/me/me", "text": "我" }], "midButton": { "height": "38px", "iconWidth": "40px", "iconPath": "static/images/douyin.png" } }, "condition": { "current": 0, "list": [{ "name": "", "path": "", "query": "" }] } };exports.default = _default;

/***/ }),

/***/ 56:
/*!***************************************************************!*\
  !*** D:/Project/Tiktok/tiktok-app/pages.json?{"type":"stat"} ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = { "appid": "__UNI__800FF13" };exports.default = _default;

/***/ }),

/***/ 9:
/*!**********************************************************!*\
  !*** D:/Project/Tiktok/tiktok-app/json/area_province.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var data = [
{
  "province_id": "1",
  "province_name": "北京市",
  "spell": "beijingshi",
  "easy_spell": "bjs" },

{
  "province_id": "2",
  "province_name": "天津市",
  "spell": "tianjinshi",
  "easy_spell": "tjs" },

{
  "province_id": "3",
  "province_name": "河北省",
  "spell": "hebeisheng",
  "easy_spell": "hbs" },

{
  "province_id": "4",
  "province_name": "山西省",
  "spell": "shanxisheng",
  "easy_spell": "sxs" },

{
  "province_id": "5",
  "province_name": "内蒙古自治区",
  "spell": "neimengguzizhiqu",
  "easy_spell": "nmgzzq" },

{
  "province_id": "6",
  "province_name": "辽宁省",
  "spell": "liaoningsheng",
  "easy_spell": "lns" },

{
  "province_id": "7",
  "province_name": "吉林省",
  "spell": "jilinsheng",
  "easy_spell": "jls" },

{
  "province_id": "8",
  "province_name": "黑龙江省",
  "spell": "heilongjiangsheng",
  "easy_spell": "hljs" },

{
  "province_id": "9",
  "province_name": "上海市",
  "spell": "shanghaishi",
  "easy_spell": "shs" },

{
  "province_id": "10",
  "province_name": "江苏省",
  "spell": "jiangsusheng",
  "easy_spell": "jss" },

{
  "province_id": "11",
  "province_name": "浙江省",
  "spell": "zhejiangsheng",
  "easy_spell": "zjs" },

{
  "province_id": "12",
  "province_name": "安徽省",
  "spell": "anhuisheng",
  "easy_spell": "ahs" },

{
  "province_id": "13",
  "province_name": "福建省",
  "spell": "fujiansheng",
  "easy_spell": "fjs" },

{
  "province_id": "14",
  "province_name": "江西省",
  "spell": "jiangxisheng",
  "easy_spell": "jxs" },

{
  "province_id": "15",
  "province_name": "山东省",
  "spell": "shandongsheng",
  "easy_spell": "sds" },

{
  "province_id": "16",
  "province_name": "河南省",
  "spell": "henansheng",
  "easy_spell": "hns" },

{
  "province_id": "17",
  "province_name": "湖北省",
  "spell": "hubeisheng",
  "easy_spell": "hbs" },

{
  "province_id": "18",
  "province_name": "湖南省",
  "spell": "hunansheng",
  "easy_spell": "hns" },

{
  "province_id": "19",
  "province_name": "广东省",
  "spell": "guangdongsheng",
  "easy_spell": "gds" },

{
  "province_id": "20",
  "province_name": "广西壮族自治区",
  "spell": "guangxizhuangzuzizhiqu",
  "easy_spell": "gxzzzzq" },

{
  "province_id": "21",
  "province_name": "海南省",
  "spell": "hainansheng",
  "easy_spell": "hns" },

{
  "province_id": "22",
  "province_name": "重庆市",
  "spell": "zhongqingshi",
  "easy_spell": "zqs" },

{
  "province_id": "23",
  "province_name": "四川省",
  "spell": "sichuansheng",
  "easy_spell": "scs" },

{
  "province_id": "24",
  "province_name": "贵州省",
  "spell": "guizhousheng",
  "easy_spell": "gzs" },

{
  "province_id": "25",
  "province_name": "云南省",
  "spell": "yunnansheng",
  "easy_spell": "yns" },

{
  "province_id": "26",
  "province_name": "西藏自治区",
  "spell": "xicangzizhiqu",
  "easy_spell": "xczzq" },

{
  "province_id": "27",
  "province_name": "陕西省",
  "spell": "shanxisheng",
  "easy_spell": "sxs" },

{
  "province_id": "28",
  "province_name": "甘肃省",
  "spell": "gansusheng",
  "easy_spell": "gss" },

{
  "province_id": "29",
  "province_name": "青海省",
  "spell": "qinghaisheng",
  "easy_spell": "qhs" },

{
  "province_id": "30",
  "province_name": "宁夏回族自治区",
  "spell": "ningxiahuizuzizhiqu",
  "easy_spell": "nxhzzzq" },

{
  "province_id": "31",
  "province_name": "新疆维吾尔自治区",
  "spell": "xinjiangweiwuerzizhiqu",
  "easy_spell": "xjwwezzq" },

{
  "province_id": "32",
  "province_name": "香港特别行政区",
  "spell": "xianggangtebiexingzhengqu",
  "easy_spell": "xgtbxzq" },

{
  "province_id": "33",
  "province_name": "澳门特别行政区",
  "spell": "aomentebiexingzhengqu",
  "easy_spell": "amtbxzq" },

{
  "province_id": "34",
  "province_name": "台湾省",
  "spell": "taiwansheng",
  "easy_spell": "tws" }];


module.exports = data;

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map
!function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=210)}({0:function(e,t){e.exports={".activate-line":{"":{backgroundColor:["#ffffff",0,0,1]}},"@VERSION":2}},1:function(e,t,r){"use strict";function n(e,t,r,n,o,i,a,s,l,u){var f,c="function"==typeof e?e.options:e;if(l){c.components||(c.components={});var p=Object.prototype.hasOwnProperty;for(var d in l)p.call(l,d)&&!p.call(c.components,d)&&(c.components[d]=l[d])}if(u&&("function"==typeof u.beforeCreate&&(u.beforeCreate=[u.beforeCreate]),(u.beforeCreate||(u.beforeCreate=[])).unshift((function(){this[u.__module]=this})),(c.mixins||(c.mixins=[])).push(u)),t&&(c.render=t,c.staticRenderFns=r,c._compiled=!0),n&&(c.functional=!0),i&&(c._scopeId="data-v-"+i),a?(f=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),o&&o.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(a)},c._ssrRegister=f):o&&(f=s?function(){o.call(this,this.$root.$options.shadowRoot)}:o),f)if(c.functional){c._injectStyles=f;var g=c.render;c.render=function(e,t){return f.call(t),g(e,t)}}else{var h=c.beforeCreate;c.beforeCreate=h?[].concat(h,f):[f]}return{exports:e,options:c}}r.d(t,"a",(function(){return n}))},115:function(e,t,r){"use strict";var n=r(116),o=r.n(n);t.default=o.a},116:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=uni.getSystemInfoSync(),o=getApp(),i={data:function(){return{screenHeight:0,statusBarHeight:0,vlogWidth:0,waterList:[],page:0,totalPage:0,refreshing:!1,refreshText:"\u4e0b\u62c9\u5237\u65b0\u4e2d...",myUserInfo:null}},onLoad:function(){this.statusBarHeight=n.statusBarHeight;var e=n.screenWidth;this.vlogWidth=(e-10)/2;var t=n.safeArea.bottom-10;this.screenHeight=t,this.myUserInfo=o.getUserInfoSession()},onShow:function(){this.page=0,this.fetchList(0)},methods:{onpullingdown:function(e){},onrefresh:function(e){var t=this;this.refreshing=!0,setTimeout((function(){t.refreshing=!1,t.refreshText="\u4e0b\u62c9\u5237\u65b0\u4e2d...",uni.stopPullDownRefresh()}),300),this.page=0,this.fetchList(0),uni.startPullDownRefresh()},loadMore:function(){this.page>=this.totalPage||this.fetchList(this.page)},fetchList:function(e){uni.stopPullDownRefresh();var t=this;if(null==o.getUserInfoSession())return t.waterList=[],void uni.showToast({duration:1500,title:"\u8bf7\u767b\u5f55~",icon:"none"});e+=1;var r=getApp().getUserInfoSession().id,n=o.globalData.serverUrl;uni.request({method:"GET",header:{headerUserId:r,headerUserToken:o.getUserSessionToken()},url:n+"/vlog/friendList?myId="+r+"&page="+e+"&pageSize=10",success:function(r){if(200==r.data.status){var n=r.data.data.rows,o=r.data.data.total;1==e&&(t.waterList=[]),t.waterList=t.waterList.concat(n),t.page=e,t.totalPage=o}uni.stopPullDownRefresh()}})},goToVlog:function(e){uni.navigateTo({url:"../vlog/vlog?vlogId="+e})},appearVlog:function(e,t){e==this.waterList.length-1&&this.loadMore()}}};t.default=i},117:function(e,t){e.exports={".page":{"":{position:["absolute",0,0,0],left:[0,0,0,0],right:[0,0,0,0],top:[0,0,0,0],bottom:[0,0,0,0],backgroundColor:["#000000",0,0,0]}},".waterfall-wrapper":{"":{backgroundColor:["#000000",0,0,1]}},".every-single-video":{"":{display:["flex",0,0,2],flexDirection:["column",0,0,2],marginTop:["5",0,0,2]}},".half-cover":{"":{borderTopLeftRadius:["5",0,0,3],borderTopRightRadius:["5",0,0,3]}},".vloger-name":{"":{fontSize:["12",0,0,4],color:["#FFFFFF",0,0,4],lines:[2,0,0,4],textOverflow:["ellipsis",0,0,4],marginLeft:["10",0,0,4]}},".bottom-part":{"":{paddingTop:["5",0,0,5],paddingRight:["5",0,0,5],paddingBottom:["5",0,0,5],paddingLeft:["5",0,0,5],marginTop:["2",0,0,5]}},".bottom-vlog-content":{"":{fontSize:["12",0,0,6],color:["#FFFFFF",0,0,6],lines:[2,0,0,6],textOverflow:["ellipsis",0,0,6]}},".vloger-info-box":{"":{marginTop:["5",0,0,7],marginRight:[0,0,0,7],marginBottom:["5",0,0,7],marginLeft:[0,0,0,7],display:["flex",0,0,7],flexDirection:["row",0,0,7]}},".vloger-face":{"":{width:["50rpx",0,0,8],height:["50rpx",0,0,8],borderRadius:["10",0,0,8]}},".vloger-name-box":{"":{display:["flex",0,0,9],flexDirection:["column",0,0,9],justifyContent:["center",0,0,9]}},".refresh-text":{"":{color:["#FFFFFF",0,0,10],width:["750rpx",0,0,10],alignItems:["center",0,0,10],textAlign:["center",0,0,10],height:["80rpx",0,0,10]}},"@VERSION":2}},149:function(e,t,r){"use strict";r.d(t,"b",(function(){return n})),r.d(t,"c",(function(){return o})),r.d(t,"a",(function(){}));var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("scroll-view",{staticStyle:{flexDirection:"column"},attrs:{scrollY:!0,showScrollbar:!0,enableBackToTop:!0,bubble:"true"}},[r("view",{staticClass:["page"]},[r("view",{style:{height:e.statusBarHeight+"px"}}),r("view",{staticClass:["waterfall-wrapper"],style:{height:e.screenHeight+"px"}},[r("waterfall",{style:{height:e.screenHeight+"px"},attrs:{columnCount:"2",columnWidth:"auto",columnGap:"1px",leftGap:"3px",rightGap:"2px"}},[null!=e.myUserInfo?r("refresh",{attrs:{display:e.refreshing?"show":"hide"},on:{pullingdown:e.onpullingdown,refresh:e.onrefresh}},[r("u-text",{staticClass:["refresh-text"],appendAsTree:!0,attrs:{append:"tree"}},[e._v(e._s(e.refreshText))]),r("loading-indicator")]):e._e(),e._l(e.waterList,(function(t,n){return r("cell",{key:n,appendAsTree:!0,attrs:{append:"tree"}},[r("view",{staticClass:["every-single-video"],on:{appear:function(t){e.appearVlog(n)}}},[r("u-image",{staticClass:["half-cover"],style:{width:e.vlogWidth+"px"},attrs:{src:t.cover,mode:"widthFix"},on:{click:function(r){e.goToVlog(t.vlogId)}}}),r("view",{staticClass:["bottom-part"]},[r("u-text",{staticClass:["bottom-vlog-content"],appendAsTree:!0,attrs:{append:"tree"}},[e._v(e._s(t.content))]),r("view",{staticClass:["vloger-info-box"]},[r("u-image",{staticClass:["vloger-face"],attrs:{src:t.vlogerFace}}),r("view",{staticClass:["vloger-name-box"]},[r("u-text",{staticClass:["vloger-name"],staticStyle:{alignContent:"center"},appendAsTree:!0,attrs:{append:"tree"}},[e._v(e._s(t.vlogerName))])])],1)])],1)])}))],2)],1)])])},o=[]},185:function(e,t,r){"use strict";r.r(t);var n=r(117),o=r.n(n);for(var i in n)["default"].indexOf(i)<0&&function(e){r.d(t,e,(function(){return n[e]}))}(i);t.default=o.a},2:function(e,t,r){Vue.prototype.__$appStyle__={},Vue.prototype.__merge_style&&Vue.prototype.__merge_style(r(3).default,Vue.prototype.__$appStyle__)},210:function(e,t,r){"use strict";r.r(t);r(2),r(4);var n=r(53);n.default.mpType="page",n.default.route="pages/friend/friend",n.default.el="#root",new Vue(n.default)},3:function(e,t,r){"use strict";r.r(t);var n=r(0),o=r.n(n);for(var i in n)["default"].indexOf(i)<0&&function(e){r.d(t,e,(function(){return n[e]}))}(i);t.default=o.a},4:function(e,t){if("undefined"==typeof Promise||Promise.prototype.finally||(Promise.prototype.finally=function(e){var t=this.constructor;return this.then((function(r){return t.resolve(e()).then((function(){return r}))}),(function(r){return t.resolve(e()).then((function(){throw r}))}))}),"undefined"!=typeof uni&&uni&&uni.requireGlobal){var r=uni.requireGlobal();ArrayBuffer=r.ArrayBuffer,Int8Array=r.Int8Array,Uint8Array=r.Uint8Array,Uint8ClampedArray=r.Uint8ClampedArray,Int16Array=r.Int16Array,Uint16Array=r.Uint16Array,Int32Array=r.Int32Array,Uint32Array=r.Uint32Array,Float32Array=r.Float32Array,Float64Array=r.Float64Array,BigInt64Array=r.BigInt64Array,BigUint64Array=r.BigUint64Array}},53:function(e,t,r){"use strict";var n=r(149),o=r(115),i=r(1);var a=Object(i.a)(o.default,n.b,n.c,!1,null,null,"5244d734",!1,n.a,void 0);(function(e){this.options.style||(this.options.style={}),Vue.prototype.__merge_style&&Vue.prototype.__$appStyle__&&Vue.prototype.__merge_style(Vue.prototype.__$appStyle__,this.options.style),Vue.prototype.__merge_style?Vue.prototype.__merge_style(r(185).default,this.options.style):Object.assign(this.options.style,r(185).default)}).call(a),t.default=a.exports}});
!function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=200)}({0:function(t,e){t.exports={".activate-line":{"":{backgroundColor:["#ffffff",0,0,1]}},"@VERSION":2}},1:function(t,e,n){"use strict";function r(t,e,n,r,o,i,a,s,u,l){var f,c="function"==typeof t?t.options:t;if(u){c.components||(c.components={});var p=Object.prototype.hasOwnProperty;for(var d in u)p.call(u,d)&&!p.call(c.components,d)&&(c.components[d]=u[d])}if(l&&("function"==typeof l.beforeCreate&&(l.beforeCreate=[l.beforeCreate]),(l.beforeCreate||(l.beforeCreate=[])).unshift((function(){this[l.__module]=this})),(c.mixins||(c.mixins=[])).push(l)),e&&(c.render=e,c.staticRenderFns=n,c._compiled=!0),r&&(c.functional=!0),i&&(c._scopeId="data-v-"+i),a?(f=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),o&&o.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(a)},c._ssrRegister=f):o&&(f=s?function(){o.call(this,this.$root.$options.shadowRoot)}:o),f)if(c.functional){c._injectStyles=f;var y=c.render;c.render=function(t,e){return f.call(e),y(t,e)}}else{var h=c.beforeCreate;c.beforeCreate=h?[].concat(h,f):[f]}return{exports:t,options:c}}n.d(e,"a",(function(){return r}))},140:function(t,e,n){"use strict";n.d(e,"b",(function(){return r})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){}));var r=function(){var t=this.$createElement,e=this._self._c||t;return e("scroll-view",{staticStyle:{flexDirection:"column"},attrs:{scrollY:!0,showScrollbar:!0,enableBackToTop:!0,bubble:"true"}},[e("view",{staticClass:["page"]},[e("view",{staticClass:["single-line-box"],staticStyle:{alignSelf:"center"}},[e("u-input",{staticClass:["nickname-input"],attrs:{type:"text",value:this.nickname,model:this.nickname,placeholder:"\u8bf7\u586b\u5165\u6635\u79f0~",maxlength:"12"},on:{input:this.typingContent}}),e("view",{staticClass:["length-cal"]},[e("u-text",{staticClass:["length-text"],appendAsTree:!0,attrs:{append:"tree"}},[this._v(this._s(this.wordsLength)+"/12")])])],1),e("view",{staticStyle:{alignSelf:"center"}},[e("u-text",{staticClass:["tips"],appendAsTree:!0,attrs:{append:"tree"}},[this._v("*\u6ce8\uff1a\u8bf7\u8bbe\u7f6e2-12\u7684\u6635\u79f0\u957f\u5ea6")])])])])},o=[]},175:function(t,e,n){"use strict";n.r(e);var r=n(87),o=n.n(r);for(var i in r)["default"].indexOf(i)<0&&function(t){n.d(e,t,(function(){return r[t]}))}(i);e.default=o.a},2:function(t,e,n){Vue.prototype.__$appStyle__={},Vue.prototype.__merge_style&&Vue.prototype.__merge_style(n(3).default,Vue.prototype.__$appStyle__)},200:function(t,e,n){"use strict";n.r(e);n(2),n(4);var r=n(44);r.default.mpType="page",r.default.route="pages/me/modifyNickname",r.default.el="#root",new Vue(r.default)},3:function(t,e,n){"use strict";n.r(e);var r=n(0),o=n.n(r);for(var i in r)["default"].indexOf(i)<0&&function(t){n.d(e,t,(function(){return r[t]}))}(i);e.default=o.a},4:function(t,e){if("undefined"==typeof Promise||Promise.prototype.finally||(Promise.prototype.finally=function(t){var e=this.constructor;return this.then((function(n){return e.resolve(t()).then((function(){return n}))}),(function(n){return e.resolve(t()).then((function(){throw n}))}))}),"undefined"!=typeof uni&&uni&&uni.requireGlobal){var n=uni.requireGlobal();ArrayBuffer=n.ArrayBuffer,Int8Array=n.Int8Array,Uint8Array=n.Uint8Array,Uint8ClampedArray=n.Uint8ClampedArray,Int16Array=n.Int16Array,Uint16Array=n.Uint16Array,Int32Array=n.Int32Array,Uint32Array=n.Uint32Array,Float32Array=n.Float32Array,Float64Array=n.Float64Array,BigInt64Array=n.BigInt64Array,BigUint64Array=n.BigUint64Array}},44:function(t,e,n){"use strict";var r=n(140),o=n(85),i=n(1);var a=Object(i.a)(o.default,r.b,r.c,!1,null,null,"fd61c014",!1,r.a,void 0);(function(t){this.options.style||(this.options.style={}),Vue.prototype.__merge_style&&Vue.prototype.__$appStyle__&&Vue.prototype.__merge_style(Vue.prototype.__$appStyle__,this.options.style),Vue.prototype.__merge_style?Vue.prototype.__merge_style(n(175).default,this.options.style):Object.assign(this.options.style,n(175).default)}).call(a),e.default=a.exports},85:function(t,e,n){"use strict";var r=n(86),o=n.n(r);e.default=o.a},86:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=getApp(),o={data:function(){return{oldNickname:getApp().getUserInfoSession().nickname,nickname:getApp().getUserInfoSession().nickname,wordsLength:0}},onNavigationBarButtonTap:function(){var t=this.nickname;t.length>12||t.length<2?uni.showToast({icon:"none",title:"\u6635\u79f0\u957f\u5ea6\u4e3a2-12"}):this.oldNickname!=t?this.updateNickname():uni.showToast({icon:"none",title:"\u6635\u79f0\u76f8\u540c"})},onShow:function(){this.wordsLength=this.nickname.length},methods:{updateNickname:function(){var t=getApp().getUserInfoSession().id,e={id:t,nickname:this.nickname},n=r.globalData.serverUrl;uni.request({method:"POST",header:{headerUserId:t,headerUserToken:r.getUserSessionToken()},url:n+"/user/modify?type=1",data:e,success:function(t){if(200==t.data.status){var e=t.data.data;r.setUserInfoSession(e),uni.navigateBack({delta:1,animationType:"fade-out"})}else uni.showToast({title:t.data.msg,icon:"none",duration:3e3})}})},typingContent:function(t){this.nickname=t.detail.value,this.wordsLength=this.nickname.length}}};e.default=o},87:function(t,e){t.exports={".page":{"":{position:["absolute",0,0,0],left:[0,0,0,0],right:[0,0,0,0],top:[0,0,0,0],bottom:[0,0,0,0],backgroundColor:["#181b27",0,0,0],display:["flex",0,0,0],flexDirection:["column",0,0,0],justifyContent:["flex-start",0,0,0]}},".line":{"":{height:["1rpx",0,0,1],backgroundColor:["#393a41",0,0,1],width:["750rpx",0,0,1]}},".single-line-box":{"":{display:["flex",0,0,2],flexDirection:["row",0,0,2],justifyContent:["flex-start",0,0,2],paddingTop:["30rpx",0,0,2],paddingRight:["30rpx",0,0,2],paddingBottom:["30rpx",0,0,2],paddingLeft:["30rpx",0,0,2],marginTop:["20rpx",0,0,2]}},".nickname-input":{"":{paddingLeft:["10",0,0,3],color:["#ffffff",0,0,3],fontSize:["14",0,0,3],width:["600rpx",0,0,3],height:["50",0,0,3],backgroundColor:["#4a4c52",0,0,3],borderTopLeftRadius:["10",0,0,3],borderBottomLeftRadius:["10",0,0,3]}},".length-cal":{"":{width:["100rpx",0,0,4],height:["50",0,0,4],backgroundColor:["#4a4c52",0,0,4],paddingRight:["10",0,0,4],display:["flex",0,0,4],flexDirection:["column",0,0,4],justifyContent:["flex-end",0,0,4],paddingBottom:["12rpx",0,0,4],borderTopRightRadius:["10",0,0,4],borderBottomRightRadius:["10",0,0,4]}},".length-text":{"":{fontSize:["12",0,0,5],fontWeight:["400",0,0,5],color:["#f1f1f1",0,0,5]}},".tips":{"":{fontSize:["12",0,0,6],fontWeight:["400",0,0,6],color:["#bfbfbf",0,0,6],width:["700rpx",0,0,6]}},"@VERSION":2}}});
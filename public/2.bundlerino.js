webpackJsonp([2],{245:function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var s=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),u=n(5),c=n(440),f=n(258),l={listStyleType:"none",paddingLeft:"0"},p={maxWidth:"50px",display:"block",margin:"0 auto",borderRadius:"50%"},d={textAlign:"center"},h=function(e){function t(e){r(this,t);var n=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={userData:{polls:[]}},n}return i(t,e),a(t,[{key:"componentDidMount",value:function(){var e=this;f.get("/account-details").then(function(t){e.setState({userData:t.data})}).catch(function(e){console.error("axios error",e)})}},{key:"render",value:function(){var e=this,t=[];return this.state.userData.polls.forEach(function(n){n.userId=e.state.userData._id,t.push(n)}),u.createElement("div",null,u.createElement("img",{style:p,src:this.state.userData.avatar,alt:this.state.userData.name}),u.createElement("h4",{style:d},this.state.userData.name),u.createElement("ul",{style:l},t.map(function(e){return u.createElement(c,s({},e,{key:e._id}))})))}}]),t}(u.Component);e.exports=h},251:function(e,t,n){"use strict";function r(e){return"[object Array]"===S.call(e)}function o(e){return"[object ArrayBuffer]"===S.call(e)}function i(e){return"undefined"!=typeof FormData&&e instanceof FormData}function s(e){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&e.buffer instanceof ArrayBuffer}function a(e){return"string"==typeof e}function u(e){return"number"==typeof e}function c(e){return void 0===e}function f(e){return null!==e&&"object"===(void 0===e?"undefined":C(e))}function l(e){return"[object Date]"===S.call(e)}function p(e){return"[object File]"===S.call(e)}function d(e){return"[object Blob]"===S.call(e)}function h(e){return"[object Function]"===S.call(e)}function m(e){return f(e)&&h(e.pipe)}function y(e){return"undefined"!=typeof URLSearchParams&&e instanceof URLSearchParams}function v(e){return e.replace(/^\s*/,"").replace(/\s*$/,"")}function g(){return"undefined"!=typeof window&&"undefined"!=typeof document&&"function"==typeof document.createElement}function w(e,t){if(null!==e&&void 0!==e)if("object"===(void 0===e?"undefined":C(e))||r(e)||(e=[e]),r(e))for(var n=0,o=e.length;n<o;n++)t.call(null,e[n],n,e);else for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&t.call(null,e[i],i,e)}function b(){function e(e,n){"object"===C(t[n])&&"object"===(void 0===e?"undefined":C(e))?t[n]=b(t[n],e):t[n]=e}for(var t={},n=0,r=arguments.length;n<r;n++)w(arguments[n],e);return t}function E(e,t,n){return w(t,function(t,r){e[r]=n&&"function"==typeof t?x(t,n):t}),e}var C="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},x=n(257),S=Object.prototype.toString;e.exports={isArray:r,isArrayBuffer:o,isFormData:i,isArrayBufferView:s,isString:a,isNumber:u,isObject:f,isUndefined:c,isDate:l,isFile:p,isBlob:d,isFunction:h,isStream:m,isURLSearchParams:y,isStandardBrowserEnv:g,forEach:w,merge:b,extend:E,trim:v}},252:function(e,t,n){"use strict";(function(t){function r(e,t){!o.isUndefined(e)&&o.isUndefined(e["Content-Type"])&&(e["Content-Type"]=t)}var o=n(251),i=n(273),s={"Content-Type":"application/x-www-form-urlencoded"},a={adapter:function(){var e;return"undefined"!=typeof XMLHttpRequest?e=n(253):void 0!==t&&(e=n(253)),e}(),transformRequest:[function(e,t){return i(t,"Content-Type"),o.isFormData(e)||o.isArrayBuffer(e)||o.isStream(e)||o.isFile(e)||o.isBlob(e)?e:o.isArrayBufferView(e)?e.buffer:o.isURLSearchParams(e)?(r(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):o.isObject(e)?(r(t,"application/json;charset=utf-8"),JSON.stringify(e)):e}],transformResponse:[function(e){if("string"==typeof e){e=e.replace(/^\)\]\}',?\n/,"");try{e=JSON.parse(e)}catch(e){}}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,validateStatus:function(e){return e>=200&&e<300}};a.headers={common:{Accept:"application/json, text/plain, */*"}},o.forEach(["delete","get","head"],function(e){a.headers[e]={}}),o.forEach(["post","put","patch"],function(e){a.headers[e]=o.merge(s)}),e.exports=a}).call(t,n(0))},253:function(e,t,n){"use strict";(function(t){var r=n(251),o=n(265),i=n(268),s=n(274),a=n(272),u=n(256),c="undefined"!=typeof window&&window.btoa&&window.btoa.bind(window)||n(267);e.exports=function(e){return new Promise(function(f,l){var p=e.data,d=e.headers;r.isFormData(p)&&delete d["Content-Type"];var h=new XMLHttpRequest,m="onreadystatechange",y=!1;if("test"===t.env.NODE_ENV||"undefined"==typeof window||!window.XDomainRequest||"withCredentials"in h||a(e.url)||(h=new window.XDomainRequest,m="onload",y=!0,h.onprogress=function(){},h.ontimeout=function(){}),e.auth){var v=e.auth.username||"",g=e.auth.password||"";d.Authorization="Basic "+c(v+":"+g)}if(h.open(e.method.toUpperCase(),i(e.url,e.params,e.paramsSerializer),!0),h.timeout=e.timeout,h[m]=function(){if(h&&(4===h.readyState||y)&&(0!==h.status||h.responseURL&&0===h.responseURL.indexOf("file:"))){var t="getAllResponseHeaders"in h?s(h.getAllResponseHeaders()):null,n=e.responseType&&"text"!==e.responseType?h.response:h.responseText,r={data:n,status:1223===h.status?204:h.status,statusText:1223===h.status?"No Content":h.statusText,headers:t,config:e,request:h};o(f,l,r),h=null}},h.onerror=function(){l(u("Network Error",e)),h=null},h.ontimeout=function(){l(u("timeout of "+e.timeout+"ms exceeded",e,"ECONNABORTED")),h=null},r.isStandardBrowserEnv()){var w=n(270),b=(e.withCredentials||a(e.url))&&e.xsrfCookieName?w.read(e.xsrfCookieName):void 0;b&&(d[e.xsrfHeaderName]=b)}if("setRequestHeader"in h&&r.forEach(d,function(e,t){void 0===p&&"content-type"===t.toLowerCase()?delete d[t]:h.setRequestHeader(t,e)}),e.withCredentials&&(h.withCredentials=!0),e.responseType)try{h.responseType=e.responseType}catch(e){if("json"!==h.responseType)throw e}"function"==typeof e.onDownloadProgress&&h.addEventListener("progress",e.onDownloadProgress),"function"==typeof e.onUploadProgress&&h.upload&&h.upload.addEventListener("progress",e.onUploadProgress),e.cancelToken&&e.cancelToken.promise.then(function(e){h&&(h.abort(),l(e),h=null)}),void 0===p&&(p=null),h.send(p)})}}).call(t,n(0))},254:function(e,t,n){"use strict";function r(e){this.message=e}r.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},r.prototype.__CANCEL__=!0,e.exports=r},255:function(e,t,n){"use strict";e.exports=function(e){return!(!e||!e.__CANCEL__)}},256:function(e,t,n){"use strict";var r=n(264);e.exports=function(e,t,n,o){var i=new Error(e);return r(i,t,n,o)}},257:function(e,t,n){"use strict";e.exports=function(e,t){return function(){for(var n=new Array(arguments.length),r=0;r<n.length;r++)n[r]=arguments[r];return e.apply(t,n)}}},258:function(e,t,n){"use strict";e.exports=n(259)},259:function(e,t,n){"use strict";function r(e){var t=new s(e),n=i(s.prototype.request,t);return o.extend(n,s.prototype,t),o.extend(n,t),n}var o=n(251),i=n(257),s=n(261),a=n(252),u=r(a);u.Axios=s,u.create=function(e){return r(o.merge(a,e))},u.Cancel=n(254),u.CancelToken=n(260),u.isCancel=n(255),u.all=function(e){return Promise.all(e)},u.spread=n(275),e.exports=u,e.exports.default=u},260:function(e,t,n){"use strict";function r(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");var t;this.promise=new Promise(function(e){t=e});var n=this;e(function(e){n.reason||(n.reason=new o(e),t(n.reason))})}var o=n(254);r.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},r.source=function(){var e;return{token:new r(function(t){e=t}),cancel:e}},e.exports=r},261:function(e,t,n){"use strict";function r(e){this.defaults=e,this.interceptors={request:new s,response:new s}}var o=n(252),i=n(251),s=n(262),a=n(263),u=n(271),c=n(269);r.prototype.request=function(e){"string"==typeof e&&(e=i.merge({url:arguments[0]},arguments[1])),e=i.merge(o,this.defaults,{method:"get"},e),e.baseURL&&!u(e.url)&&(e.url=c(e.baseURL,e.url));var t=[a,void 0],n=Promise.resolve(e);for(this.interceptors.request.forEach(function(e){t.unshift(e.fulfilled,e.rejected)}),this.interceptors.response.forEach(function(e){t.push(e.fulfilled,e.rejected)});t.length;)n=n.then(t.shift(),t.shift());return n},i.forEach(["delete","get","head"],function(e){r.prototype[e]=function(t,n){return this.request(i.merge(n||{},{method:e,url:t}))}}),i.forEach(["post","put","patch"],function(e){r.prototype[e]=function(t,n,r){return this.request(i.merge(r||{},{method:e,url:t,data:n}))}}),e.exports=r},262:function(e,t,n){"use strict";function r(){this.handlers=[]}var o=n(251);r.prototype.use=function(e,t){return this.handlers.push({fulfilled:e,rejected:t}),this.handlers.length-1},r.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},r.prototype.forEach=function(e){o.forEach(this.handlers,function(t){null!==t&&e(t)})},e.exports=r},263:function(e,t,n){"use strict";function r(e){e.cancelToken&&e.cancelToken.throwIfRequested()}var o=n(251),i=n(266),s=n(255),a=n(252);e.exports=function(e){return r(e),e.headers=e.headers||{},e.data=i(e.data,e.headers,e.transformRequest),e.headers=o.merge(e.headers.common||{},e.headers[e.method]||{},e.headers||{}),o.forEach(["delete","get","head","post","put","patch","common"],function(t){delete e.headers[t]}),(e.adapter||a.adapter)(e).then(function(t){return r(e),t.data=i(t.data,t.headers,e.transformResponse),t},function(t){return s(t)||(r(e),t&&t.response&&(t.response.data=i(t.response.data,t.response.headers,e.transformResponse))),Promise.reject(t)})}},264:function(e,t,n){"use strict";e.exports=function(e,t,n,r){return e.config=t,n&&(e.code=n),e.response=r,e}},265:function(e,t,n){"use strict";var r=n(256);e.exports=function(e,t,n){var o=n.config.validateStatus;n.status&&o&&!o(n.status)?t(r("Request failed with status code "+n.status,n.config,null,n)):e(n)}},266:function(e,t,n){"use strict";var r=n(251);e.exports=function(e,t,n){return r.forEach(n,function(n){e=n(e,t)}),e}},267:function(e,t,n){"use strict";function r(){this.message="String contains an invalid character"}function o(e){for(var t,n,o=String(e),s="",a=0,u=i;o.charAt(0|a)||(u="=",a%1);s+=u.charAt(63&t>>8-a%1*8)){if((n=o.charCodeAt(a+=.75))>255)throw new r;t=t<<8|n}return s}var i="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";r.prototype=new Error,r.prototype.code=5,r.prototype.name="InvalidCharacterError",e.exports=o},268:function(e,t,n){"use strict";function r(e){return encodeURIComponent(e).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}var o=n(251);e.exports=function(e,t,n){if(!t)return e;var i;if(n)i=n(t);else if(o.isURLSearchParams(t))i=t.toString();else{var s=[];o.forEach(t,function(e,t){null!==e&&void 0!==e&&(o.isArray(e)&&(t+="[]"),o.isArray(e)||(e=[e]),o.forEach(e,function(e){o.isDate(e)?e=e.toISOString():o.isObject(e)&&(e=JSON.stringify(e)),s.push(r(t)+"="+r(e))}))}),i=s.join("&")}return i&&(e+=(-1===e.indexOf("?")?"?":"&")+i),e}},269:function(e,t,n){"use strict";e.exports=function(e,t){return e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,"")}},270:function(e,t,n){"use strict";var r=n(251);e.exports=r.isStandardBrowserEnv()?function(){return{write:function(e,t,n,o,i,s){var a=[];a.push(e+"="+encodeURIComponent(t)),r.isNumber(n)&&a.push("expires="+new Date(n).toGMTString()),r.isString(o)&&a.push("path="+o),r.isString(i)&&a.push("domain="+i),!0===s&&a.push("secure"),document.cookie=a.join("; ")},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}}():function(){return{write:function(){},read:function(){return null},remove:function(){}}}()},271:function(e,t,n){"use strict";e.exports=function(e){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)}},272:function(e,t,n){"use strict";var r=n(251);e.exports=r.isStandardBrowserEnv()?function(){function e(e){var t=e;return n&&(o.setAttribute("href",t),t=o.href),o.setAttribute("href",t),{href:o.href,protocol:o.protocol?o.protocol.replace(/:$/,""):"",host:o.host,search:o.search?o.search.replace(/^\?/,""):"",hash:o.hash?o.hash.replace(/^#/,""):"",hostname:o.hostname,port:o.port,pathname:"/"===o.pathname.charAt(0)?o.pathname:"/"+o.pathname}}var t,n=/(msie|trident)/i.test(navigator.userAgent),o=document.createElement("a");return t=e(window.location.href),function(n){var o=r.isString(n)?e(n):n;return o.protocol===t.protocol&&o.host===t.host}}():function(){return function(){return!0}}()},273:function(e,t,n){"use strict";var r=n(251);e.exports=function(e,t){r.forEach(e,function(n,r){r!==t&&r.toUpperCase()===t.toUpperCase()&&(e[t]=n,delete e[r])})}},274:function(e,t,n){"use strict";var r=n(251);e.exports=function(e){var t,n,o,i={};return e?(r.forEach(e.split("\n"),function(e){o=e.indexOf(":"),t=r.trim(e.substr(0,o)).toLowerCase(),n=r.trim(e.substr(o+1)),t&&(i[t]=i[t]?i[t]+", "+n:n)}),i):i}},275:function(e,t,n){"use strict";e.exports=function(e){return function(t){return e.apply(null,t)}}},440:function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var s=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),u=n(5),c=n(44),f=c.Link,l=n(258),p={color:"#000"},d=function(e){function t(e){r(this,t);var n=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.handleDelete=n.handleDelete.bind(n),n}return i(t,e),a(t,[{key:"handleDelete",value:function(e){l.delete("/user-poll/"+this.props.userId+"/"+this.props._id).then(function(e){return e}).catch(function(e){console.error("axios error",e)}),this.props.unmountMe()}},{key:"render",value:function(){return this.props.warn?u.createElement("div",{className:"warning"},"Delete Poll - ",this.props.name,"?",u.createElement("div",null,u.createElement("span",{className:"delete",onClick:this.handleDelete},"Delete"))):null}}]),t}(u.Component),h=function(e){function t(e){r(this,t);var n=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.userId="",n.id="",n.state={showWarning:!1,renderChild:!0},n.handleToggleClick=n.handleToggleClick.bind(n),n.handleChildUnmount=n.handleChildUnmount.bind(n),n}return i(t,e),a(t,[{key:"handleChildUnmount",value:function(){this.setState({renderChild:!1})}},{key:"handleToggleClick",value:function(){this.setState(function(e){return{showWarning:!e.showWarning}})}},{key:"componentDidMount",value:function(){this.userId=this.props.userId,this._id=this.props._id}},{key:"dismiss",value:function(){this.props.unmountMe()}},{key:"render",value:function(){return u.createElement("div",{className:"user-poll"},u.createElement(d,s({},this.props,{warn:this.state.showWarning})),u.createElement("li",null,u.createElement(f,{style:p,to:"/details/"+this.props.userId+"/"+this.props._id},u.createElement("span",null,this.props.name)),this.state.showWarning?u.createElement("button",{className:"user-poll__cancel",onClick:this.handleToggleClick},"Cancel"):u.createElement("button",{className:"user-poll__delete",onClick:this.handleToggleClick},"Delete")))}}]),t}(u.Component),m=function(e){function t(e){r(this,t);var n=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={renderChild:!0},n.handleChildUnmount=n.handleChildUnmount.bind(n),n}return i(t,e),a(t,[{key:"handleChildUnmount",value:function(){this.setState({renderChild:!1})}},{key:"render",value:function(){return u.createElement("div",null,this.state.renderChild?u.createElement(h,s({},this.props,{unmountMe:this.handleChildUnmount})):null)}}]),t}(u.Component),y=u.PropTypes.string;m.propTypes={name:y.isRequired,_id:y.isRequired,userId:y.isRequired},e.exports=m}});
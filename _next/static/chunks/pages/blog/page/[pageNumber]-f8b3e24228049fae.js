(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[211],{966:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/blog/page/[pageNumber]",function(){return r(3117)}])},7397:function(e,t,r){"use strict";var n=r(7294),a=r(6030),i=r(2397);t.Z=function(e){var t=e.threshold,r=void 0===t?1:t,o=e.animate,u=(0,n.useRef)(null),c=(0,i.Z)({rootRef:u,threshold:r,once:!0}),l=(0,n.useState)(!1),s=l[0],f=l[1];return(0,n.useEffect)((function(){var e=u.current;e&&c&&!s&&o(a.Z,e).finished.then((function(){return f(!0)}))}),[c,o,f,s]),{elementRef:u,isPlayed:s}}},2397:function(e,t,r){"use strict";var n=r(7294);function a(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=[],n=!0,a=!1,i=void 0;try{for(var o,u=e[Symbol.iterator]();!(n=(o=u.next()).done)&&(r.push(o.value),!t||r.length!==t);n=!0);}catch(c){a=!0,i=c}finally{try{n||null==u.return||u.return()}finally{if(a)throw i}}return r}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}t.Z=function(e){var t=e.rootRef,r=e.threshold,i=void 0===r?1:r,o=e.once,u=void 0===o||o,c=(0,n.useState)(!1),l=c[0],s=c[1];return(0,n.useEffect)((function(){var e=t.current,r=new IntersectionObserver((function(t){var n=a(t,1)[0];s(n.isIntersecting),u&&e&&n.isIntersecting&&r.unobserve(e)}),{threshold:i});return e&&r.observe(e),function(){e&&r.unobserve(e)}}),[u,t,i]),l}},3117:function(e,t,r){"use strict";r.r(t),r.d(t,{__N_SSG:function(){return x},default:function(){return w}});var n,a,i=r(5893),o=r(1664),u=r(9583);(a=n||(n={})).NEXT="next",a.PREV="previous",a.PAGE="page",a.START_ELLIPSIS="start-ellipsis",a.END_ELLIPSIS="end-ellipsis";var c=function(e){var t,r=e.page,a=void 0===r?1:r,c=e.selected,l=void 0!==c&&c,s=e.disabled,f=void 0!==s&&s,d=e.type;if(d===n.START_ELLIPSIS||d===n.END_ELLIPSIS)return(0,i.jsx)("div",{className:"pagination__item pagination__item--dots",children:"..."});switch(d){case n.NEXT:t=(0,i.jsx)(u.Dli,{});break;case n.PREV:t=(0,i.jsx)(u.bUI,{});break;case n.PAGE:default:t=a}return(0,i.jsx)(o.default,{href:{pathname:"/blog/page/[pageNumber]",query:{pageNumber:a}},children:(0,i.jsx)("a",{className:"pagination__item pagination__item--page ".concat(l?"pagination__item--selected":""," ").concat(f?"pagination__item--disabled":""),children:t})})};function l(e){return function(e){if(Array.isArray(e)){for(var t=0,r=new Array(e.length);t<e.length;t++)r[t]=e[t];return r}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var s=function(e){var t=e.page,r=e.count,a=e.boundaryCount,o=void 0===a?1:a,u=e.siblingCount,s=void 0===u?1:u,f=e.showNextButton,d=void 0===f||f,p=e.showPrevButton,m=void 0===p||p,v=function(e,t){var r=t-e+1;return Array.from({length:r},(function(t,r){return e+r}))},h=v(1,Math.min(o,r)),y=v(Math.max(r-o+1,o+1),r),g=Math.max(Math.min(t-s,r-o-2*s-1),o+2),b=Math.min(Math.max(t+s,o+2*s+2),y.length>0?y[0]-2:r-1),x=l(m&&t-1?[n.PREV]:[]).concat(l(h),l(g>o+2?[n.START_ELLIPSIS]:o+1<r-o?[o+1]:[]),l(v(g,b)),l(b<r-o-1?[n.END_ELLIPSIS]:r-o>o?[r-o]:[]),l(y),l(d&&t+1<r?[n.NEXT]:[])),w=function(e){switch(e){case"previous":return t-1;case"next":return t+1;default:return null}},j=x.map((function(e){return"number"===typeof e?(0,i.jsx)(c,{type:n.PAGE,page:e,selected:e===t},e):(0,i.jsx)(c,{type:e,page:w(e),selected:!1},e)}));return(0,i.jsx)("div",{className:"flex space-x-1 m-auto",children:j})},f=r(5675);function d(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=[],n=!0,a=!1,i=void 0;try{for(var o,u=e[Symbol.iterator]();!(n=(o=u.next()).done)&&(r.push(o.value),!t||r.length!==t);n=!0);}catch(c){a=!0,i=c}finally{try{n||null==u.return||u.return()}finally{if(a)throw i}}return r}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function p(e){var t=d(e.split("."),3),r=t[0],n=t[1],a=t[2];return new Date(+a,+n-1,+r).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"})}var m=r(7397),v="/personal-blog//_next/static/media/meteor-logo.08aeaf4e.png",h=r(4118),y=function(e,t){return(0,h.l)([[{targets:t.querySelector(".image"),opacity:[0,1],translateX:[-100,0]}],[{targets:t.querySelector(".text"),opacity:[0,1],translateY:[20,0]}]],{duration:800,easing:"easeOutQuart"})},g=function(e){var t=e.description,r=e.publishedAt,n=e.thumbnail,a=e.title,u=(e.tags,e.slug),c=(0,m.Z)({animate:y,threshold:.5}).elementRef;return(0,i.jsx)(o.default,{href:{pathname:"/blog/[slug]",query:{slug:u}},children:(0,i.jsxs)("a",{ref:c,className:"shadow-lg flex flex-col md:flex-row md:space-x-5 rounded-lg overflow-hidden lg:w-[60%]",children:[(0,i.jsx)("div",{className:"w-full md:w-[250px] flex-shrink-0 h-[200px] md:h-[250px] invisible relative image",children:(0,i.jsx)(f.default,{unoptimized:!0,src:n,alt:a,layout:"fill",objectFit:"cover",blurDataURL:v,className:"image"})}),(0,i.jsxs)("div",{className:"p-5 space-y-2 text",children:[(0,i.jsx)("h5",{className:"text-lg font-bold uppercase",children:a}),(0,i.jsx)("small",{className:"text-gray-600",children:p(r)}),(0,i.jsx)("p",{className:"text-gray-800 text-md md:line-clamp-4 mt",children:t})]})]})})};function b(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var x=!0,w=function(e){var t=e.articles,r=e.metadata;return(0,i.jsxs)("div",{className:"py-10 px-5 flex flex-col",children:[(0,i.jsx)("div",{className:"flex flex-col items-center space-y-8 mb-10",children:t.map((function(e){return(0,i.jsx)(g,function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{},n=Object.keys(r);"function"===typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(r).filter((function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable})))),n.forEach((function(t){b(e,t,r[t])}))}return e}({},e),e.title)}))}),(0,i.jsx)(s,{page:r.page,count:r.pageCount})]})}},4118:function(e,t,r){"use strict";r.d(t,{l:function(){return c}});var n=r(6030);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=[],n=!0,a=!1,i=void 0;try{for(var o,u=e[Symbol.iterator]();!(n=(o=u.next()).done)&&(r.push(o.value),!t||r.length!==t);n=!0);}catch(c){a=!0,i=c}finally{try{n||null==u.return||u.return()}finally{if(a)throw i}}return r}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function o(e){return function(e){if(Array.isArray(e)){for(var t=0,r=new Array(e.length);t<e.length;t++)r[t]=e[t];return r}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var u=function(e){return function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{},n=Object.keys(r);"function"===typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(r).filter((function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable})))),n.forEach((function(t){a(e,t,r[t])}))}return e}({},e,{begin:function(e){e.animatables.forEach((function(e){return e.target.classList.remove("invisible")}))}})},c=function(e,t){var r,a=void 0===t?{}:t;return e.map((function(e){var t=i(e,2),r=t[0],n=t[1];return[u(r),n]})).reduce((function(e,t){return(r=e).add.apply(r,o(t))}),n.Z.timeline(a))}},8357:function(e,t,r){"use strict";r.d(t,{w_:function(){return l}});var n=r(7294),a={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},i=n.createContext&&n.createContext(a),o=function(){return(o=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var a in t=arguments[r])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e}).apply(this,arguments)},u=function(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var a=0;for(n=Object.getOwnPropertySymbols(e);a<n.length;a++)t.indexOf(n[a])<0&&Object.prototype.propertyIsEnumerable.call(e,n[a])&&(r[n[a]]=e[n[a]])}return r};function c(e){return e&&e.map((function(e,t){return n.createElement(e.tag,o({key:t},e.attr),c(e.child))}))}function l(e){return function(t){return n.createElement(s,o({attr:o({},e.attr)},t),c(e.child))}}function s(e){var t=function(t){var r,a=e.attr,i=e.size,c=e.title,l=u(e,["attr","size","title"]),s=i||t.size||"1em";return t.className&&(r=t.className),e.className&&(r=(r?r+" ":"")+e.className),n.createElement("svg",o({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},t.attr,a,l,{className:r,style:o(o({color:e.color||t.color},t.style),e.style),height:s,width:s,xmlns:"http://www.w3.org/2000/svg"}),c&&n.createElement("title",null,c),e.children)};return void 0!==i?n.createElement(i.Consumer,null,(function(e){return t(e)})):t(a)}}},function(e){e.O(0,[445,675,774,888,179],(function(){return t=966,e(e.s=t);var t}));var t=e.O();_N_E=t}]);
(this.webpackJsonptodo=this.webpackJsonptodo||[]).push([[4],{87:function(t,e,n){"use strict";function r(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t)){var n=[],r=!0,a=!1,u=void 0;try{for(var o,l=t[Symbol.iterator]();!(r=(o=l.next()).done)&&(n.push(o.value),!e||n.length!==e);r=!0);}catch(c){a=!0,u=c}finally{try{r||null==l.return||l.return()}finally{if(a)throw u}}return n}}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}n.d(e,"a",(function(){return r}))},88:function(t,e,n){"use strict";var r=n(0),a=n.n(r),u=function(t){var e=t.value,n=t.onBlur,r=t.onChange,u=t.autoFocus,o=t.placeholder,l=t.type;return a.a.createElement("input",{type:l,className:"text_input",value:e,onChange:function(t){return r(t.target.value)},onBlur:n,autoFocus:u,placeholder:o})};u.defaultProps={autoFocus:!1,placeholder:"",type:"text",onBlur:function(){return!1}},e.a=u},94:function(t,e,n){"use strict";n.r(e);var r=n(87),a=n(0),u=n.n(a),o=n(10),l=n(30),c=n(88),i=n(29),s=function(t){var e=t.signUp,n=t.loading,o=Object(a.useState)(""),l=Object(r.a)(o,2),s=l[0],p=l[1],f=Object(a.useState)(""),d=Object(r.a)(f,2),h=d[0],b=d[1];return u.a.createElement(u.a.Fragment,null,n?u.a.createElement(i.a,null):u.a.createElement("div",{className:"auth"},u.a.createElement(c.a,{value:s,onChange:function(t){return p(t)},placeholder:"email"}),u.a.createElement(c.a,{value:h,onChange:function(t){return b(t)},placeholder:"password",type:"password"}),u.a.createElement("button",{type:"button",onClick:function(){return e({email:s,password:h})},disabled:!s.trim().length||!h.trim().length},"\u0417\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043e\u0432\u0430\u0442\u044c\u0441\u044f")))};s.defaultProps={loading:!1},e.default=Object(o.b)((function(t){return{loading:t.auth.loading}}),(function(t){return{signUp:function(e){return t(Object(l.b)(e))}}}))(s)}}]);
//# sourceMappingURL=4.45bb9f62.chunk.js.map
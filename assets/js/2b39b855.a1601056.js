"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[8895],{7960:(e,t,i)=>{i.r(t),i.d(t,{assets:()=>d,contentTitle:()=>a,default:()=>u,frontMatter:()=>o,metadata:()=>l,toc:()=>c});var s=i(5723),n=i(3327),r=i(4034);const o={title:"Cube"},a=void 0,l={id:"effects/cube",title:"Cube",description:"",source:"@site/docs/effects/03-cube.md",sourceDirName:"effects",slug:"/effects/cube",permalink:"/slider/docs/effects/cube",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:3,frontMatter:{title:"Cube"},sidebar:"docsSidebar",previous:{title:"Fade",permalink:"/slider/docs/effects/fade"},next:{title:"Tile",permalink:"/slider/docs/effects/tile"}},d={},c=[];function h(e){return(0,s.jsx)(r.I1,{showOptions:!0})}function u(e={}){const{wrapper:t}={...(0,n.R)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(h,{...e})}):h()}},4034:(e,t,i)=>{i.d(t,{FN:()=>f,I1:()=>b,zW:()=>x,FA:()=>w});var s=i(9139),n=i(2155);const r={container:"container_NLor",fields:"fields_g1uo",field:"field_JJFJ"};var o=i(5723);function a(e){let{controls:t=[]}=e;const i=(0,n.useId)(),{options:s,setOption:a}=d();return(0,o.jsx)("div",{className:r.container,children:(0,o.jsxs)("div",{className:r.fields,children:[(0,o.jsxs)("div",{className:r.field,children:[(0,o.jsx)("label",{htmlFor:`speed-${i}`,children:"speed"}),(0,o.jsx)("input",{id:`speed-${i}`,size:4,type:"number",value:s.speed,onChange:e=>a("speed",e.target.value)})]}),(0,o.jsxs)("div",{className:r.field,children:[(0,o.jsx)("label",{htmlFor:`'timeout-${i}'`,children:"timeout"}),(0,o.jsx)("input",{id:`timeout-${i}`,size:4,type:"number",value:s.timeout,onChange:e=>a("timeout",e.target.value)})]}),(0,o.jsxs)("div",{className:r.field,children:[(0,o.jsx)("label",{htmlFor:`pause-on-hover-${i}`,children:"pauseOnHover"}),(0,o.jsx)("input",{id:`pause-on-hover-${i}`,type:"checkbox",checked:s.pauseOnHover,onChange:e=>a("pauseOnHover",e.target.checked)})]}),(0,o.jsxs)("div",{className:r.field,children:[(0,o.jsx)("label",{htmlFor:`swipe-${i}`,children:"swipe"}),(0,o.jsx)("input",{id:`swipe-${i}`,type:"checkbox",checked:s.swipe,onChange:e=>a("swipe",e.target.checked)})]}),(0,o.jsxs)("div",{className:r.field,children:[(0,o.jsx)("label",{htmlFor:`swipe-tolerance-${i}`,children:"swipeTolerance"}),(0,o.jsx)("input",{id:`swipe-tolerance-${i}`,size:4,type:"number",value:s.swipeTolerance,onChange:e=>a("swipeTolerance",e.target.value)})]}),t.map((e=>{let{label:t,type:n,optionKey:l,values:d}=e;return(0,o.jsx)("div",{className:r.field,children:"radio"===n?(0,o.jsxs)("fieldset",{children:[(0,o.jsx)("legend",{children:t}),d?.map((e=>(0,o.jsxs)("label",{children:[(0,o.jsx)("input",{type:n,value:e,checked:s[l]===e,onChange:t=>t.target.checked&&a(l,e)}),e]},e)))]}):(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)("label",{htmlFor:`${l}-${i}`,children:t}),(0,o.jsx)("input",{id:`${l}-${i}`,type:n,value:s[l],checked:!0===s[l],onChange:e=>a(l,"checkbox"===n?e.target.checked:e.target.value)})]})},t)}))]})})}const l=(0,n.createContext)({options:{},setOption:()=>{}});function d(){return(0,n.useContext)(l)}const c={controls:"controls_sqVm",viewport:"viewport_ywrr",slider:"slider_K2Xb",slide:"slide_W3F6",slideImage:"slideImage_TYtL",optionsContainer:"optionsContainer_W_Ak"};function h(e){let{children:t,showOptions:i,effectControls:r}=e;const[d,h]=(0,n.useState)({autoScroll:!0,speed:"800",swipe:!0,swipeTolerance:30,timeout:5e3,pauseOnHover:!0,...r.reduce(((e,t)=>({...e,[t.optionKey]:t.defaultValue})),{})});return(0,o.jsxs)(l.Provider,{value:{options:d,setOption:(e,t)=>{h((i=>({...i,[e]:t})))}},children:[(0,o.jsx)(s.ev,{className:c.controls,indexBtnLabel:"%d of 4","aria-label":"AI generated images of animals in a Vaporwave style",children:(0,o.jsx)("div",{className:c.viewport,children:t})}),i&&(0,o.jsx)("div",{className:c.optionsContainer,children:(0,o.jsx)(a,{controls:r})})]})}function u(){return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsxs)("picture",{className:c.slide,"aria-label":"1 of 4",id:"slide-1",children:[(0,o.jsx)("source",{srcSet:"/slider/img/slides/hyena-square.jpg",media:"(max-width: 480px)"}),(0,o.jsx)("img",{className:c.slideImage,src:"/slider/img/slides/hyena.jpg",alt:"Face of a hyena looking slightly to the left with the sun and pyramids in the background"})]}),(0,o.jsxs)("picture",{className:c.slide,"aria-label":"2 of 4",id:"slide-2",children:[(0,o.jsx)("source",{srcSet:"/slider/img/slides/elephant-square.jpg",media:"(max-width: 480px)"}),(0,o.jsx)("img",{className:c.slideImage,src:"/slider/img/slides/elephant.jpg",alt:"Front view of an elephant with patterns on it's skin walking forwards with the suns rays and palm trees in the background"})]}),(0,o.jsxs)("picture",{className:c.slide,"aria-label":"3 of 4",id:"slide-3",children:[(0,o.jsx)("source",{srcSet:"/slider/img/slides/lion-square.jpg",media:"(max-width: 480px)"}),(0,o.jsx)("img",{className:c.slideImage,src:"/slider/img/slides/lion.jpg",alt:"Face of a lion looking slightly to the right with a wavey pattern mane and plant leafs in the background"})]}),(0,o.jsxs)("picture",{className:c.slide,"aria-label":"4 of 4",id:"slide-4",children:[(0,o.jsx)("source",{srcSet:"/slider/img/slides/ram-square.jpg",media:"(max-width: 480px)"}),(0,o.jsx)("img",{className:c.slideImage,src:"/slider/img/slides/ram.jpg",alt:"Face of a ram with horns and large ears with hair that creates a pattern of swirls in the background"})]})]})}function p(){const{options:e}=d();return(0,o.jsx)(s.qj,{className:c.slider,...e,children:(0,o.jsx)(u,{})})}function f(e){let{showOptions:t=!1}=e;return(0,o.jsx)(h,{showOptions:t,effectControls:[{label:"timing-function",type:"text",optionKey:"timingFunction",defaultValue:"ease-in-out"},{label:"cover",type:"checkbox",optionKey:"cover",defaultValue:!1}],children:(0,o.jsx)(p,{})})}function m(){const{options:e}=d();return(0,o.jsx)(s.Zk,{className:c.slider,...e,children:(0,o.jsx)(u,{})})}function b(e){let{showOptions:t=!1}=e;return(0,o.jsx)(h,{showOptions:t,effectControls:[{label:"direction",type:"radio",optionKey:"direction",defaultValue:"horizontal",values:["horizontal","vertical"]},{label:"perspective",type:"number",optionKey:"perspective",defaultValue:"1000"}],children:(0,o.jsx)(m,{})})}function v(){const{options:e}=d();return(0,o.jsx)(s.UC,{className:c.slider,...e,children:(0,o.jsx)(u,{})})}function x(e){let{showOptions:t=!1}=e;return(0,o.jsx)(h,{showOptions:t,effectControls:[{label:"timing-function",type:"text",optionKey:"timing-function",defaultValue:"ease-in-out"}],children:(0,o.jsx)(v,{})})}function g(){const{options:e}=d();return(0,o.jsx)(s.ae,{className:c.slider,...e,children:(0,o.jsx)(u,{})})}function w(e){let{showOptions:t=!1}=e;return(0,o.jsx)(h,{showOptions:t,effectControls:[{label:"rows",type:"number",optionKey:"rows",defaultValue:"5"},{label:"rowOffset",type:"number",optionKey:"rowOffset",defaultValue:"50"},{label:"tileEffect",type:"radio",optionKey:"tileEffect",defaultValue:"fade",values:["flip","fade"]}],children:(0,o.jsx)(g,{})})}},3327:(e,t,i)=>{i.d(t,{R:()=>o,x:()=>a});var s=i(2155);const n={},r=s.createContext(n);function o(e){const t=s.useContext(r);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:o(e.components),s.createElement(r.Provider,{value:t},e.children)}},9139:(e,t,i)=>{function s(e,t){Object.keys(t).forEach((i=>e.style.setProperty(i,t[i])))}i.d(t,{qj:()=>ce,Zk:()=>he,UC:()=>ue,ev:()=>pe,ae:()=>fe});var n,r=class{options;transitionTimer=0;asyncTimer=0;constructor(e){this.options={cover:!0===e?.cover,timingFunction:e?.timingFunction||"ease-in-out"}}initialize(e,t,i){s(e,{overflow:"hidden"}),-1!=="static inherit".indexOf(getComputedStyle(e).position)&&s(e,{position:"relative"}),t.forEach(((e,t)=>{s(e,{left:"0",position:"absolute",top:"0",transform:`translateX(${e.offsetWidth}px)`,transition:"initial",visibility:"hidden","z-index":"1"}),t===i.startIndex&&s(e,{transform:"translateX(0px)",visibility:"visible","z-index":"2"})}))}destroy(){window.clearTimeout(this.transitionTimer),window.clearTimeout(this.asyncTimer)}transition(e){return new Promise((t=>{const i=e.slides[e.currentIndex],n=`${i.offsetWidth}px`,r=e.slides[e.nextIndex],o=`${r.offsetWidth}px`;s(r,{transform:`translateX(${e.isPrevious?"-"+o:o})`}),this.asyncTimer=window.setTimeout((()=>{s(r,{transform:"translateX(0px)",transition:`transform ${e.speed}ms ${this.options.timingFunction}`,visibility:"visible","z-index":"2"}),s(i,{transform:this.options.cover?"translateX(0px)":`translateX(${e.isPrevious?n:"-"+n})`,transition:this.options.cover?"initial":`transform ${e.speed}ms ${this.options.timingFunction}`,visibility:"visible","z-index":"1"}),this.transitionTimer=window.setTimeout((()=>{s(i,{transform:`translateX(${n})`,transition:"initial",visibility:"hidden"}),t()}),e.speed)}),0)}))}},o=class{elementStore;constructor(){this.elementStore=new Map}storeAttributes(e,t){(Array.isArray(e)?e:[e]).forEach((e=>{const i=this.elementStore.get(e)??{};t.forEach((t=>i[t]=e.getAttribute(t))),this.elementStore.set(e,i)}))}revert(){for(const[e,t]of this.elementStore.entries())Object.keys(t).forEach((i=>{const s=t[i];null===s||""===s?e.removeAttribute(i):null!==s&&e.setAttribute(i,s)}));this.elementStore.clear()}},a=[];"undefined"!=typeof ResizeObserver&&(n=new ResizeObserver((e=>{e.forEach((e=>a.find((t=>t.el===e.target))?.reset()))})));var l={add(e){a.push(e),n?.observe(e.el)},remove(e){n?.unobserve(e.el),a=a.filter((t=>t!==e))}},d=Object.freeze({autoScroll:"undefined"!=typeof matchMedia&&!matchMedia("(prefers-reduced-motion: reduce)").matches,pauseOnHover:!1,speed:800,startIndex:0,swipe:!0,swipeTolerance:30,timeout:5e3}),c=class{_activeIndex;_el;_effect;_stateStore;options;slides;autoScrollTimer;eventListeners;elListeners;isDestroyed;transitionQueue;get activeIndex(){return this._activeIndex}get el(){if(void 0===this._el)throw new Error("Slider element is undefined");return this._el}get length(){return this.slides.length}getOption(e){return this.options[e]}get stateStore(){if(void 0===this._stateStore)throw new Error("State store is undefined, are you trying to interact with a destroyed slider?");return this._stateStore}get effect(){if(void 0===this._effect)throw new Error("Slide effect is undefined, are you trying to interact with a destroyed slider?");return this._effect}constructor(e,t,i){if(this._el=e,this._stateStore=new o,this.transitionQueue=(()=>{const e=[],t=()=>{const i=e[0];i&&i().then((()=>{e.shift(),t()}))};return{push(i){e.push(i),1===e.length&&t()},clear(){e.length=0}}})(),this.slides=[],this.eventListeners={},this.elListeners={},this.isDestroyed=!1,this.options={...d,...i},this._activeIndex=this.options.startIndex,this.init(t),this.slides.length<this.activeIndex)throw this.destroy(),new Error(`Start index option is out of bounds - slides=${this.slides.length} start=${this.activeIndex}`);this.applyEventListeners(),l.add(this)}reset(e,t){this.stopAutoScroll(),"function"==typeof this.effect.destroy&&this.effect.destroy(this.el),this.stateStore.revert(),this.options={...this.options,...e},void 0===e?.startIndex||isNaN(e.startIndex)||(this._activeIndex=e.startIndex),this.init(t||this.effect)}next(){return this.skipTo(this.activeIndex===this.slides.length-1?0:this.activeIndex+1,!1)}prev(){return this.skipTo(0===this.activeIndex?this.slides.length-1:this.activeIndex-1)}skipTo(e,t){return new Promise((i=>{this.transitionQueue.push((async()=>{await this.transitionTo(e,void 0===t?e<this.activeIndex:t),i()}))}))}pause(){return this.options.autoScroll=!1,this.autoScrollTimer&&(this.stopAutoScroll(),this.emit("pause")),this}play(){return this.options.autoScroll=!0,this.setAutoScroll(),this.emit("play"),this}addEventListener(e,t){return Array.isArray(this.eventListeners[e])||(this.eventListeners[e]=[]),this.eventListeners[e].push(t),this}removeEventListener(e,t){const i=this.eventListeners[e]?.filter((e=>e!==t));return this.eventListeners[e]=i,this}destroy(){this.isDestroyed=!0,this.stopAutoScroll(),this.effect.destroy&&this.effect.destroy(this.el),this.stateStore.revert(),this.transitionQueue.clear(),l.remove(this),this.emit("destroy"),this.eventListeners={},Object.entries(this.elListeners).forEach((e=>{let[t,i]=e;return i.forEach((e=>this.el.removeEventListener(t,e)))})),this.elListeners={},delete this._el,delete this._stateStore,delete this._effect,this.slides.length=0}init(e){this._effect=e,this.slides=this.getSlides(),this.stateStore.storeAttributes([this.el,...this.slides],["style"]),this.effect.initialize(this.el,this.slides,{...this.options,startIndex:this.activeIndex},this.stateStore),this.addAriaAttributes(),this.options.autoScroll&&this.setAutoScroll()}addAriaAttributes(){this.stateStore.storeAttributes([this.el,...this.slides],["aria-live","role","aria-roledescription"]),this.el.setAttribute("aria-atomic","false"),this.el.setAttribute("aria-live","polite"),this.el.hasAttribute("role")||this.el.setAttribute("role","region"),this.slides.forEach((e=>{e.hasAttribute("role")||e.setAttribute("role","group"),e.hasAttribute("aria-roledescription")||e.setAttribute("aria-roledescription","slide")}))}getSlides(){return Array.from(this.el.children).filter((e=>e instanceof HTMLElement))}transitionTo(e,t){return new Promise(((i,s)=>{if(this.isDestroyed||e===this.activeIndex)return i();if(e<0||e>=this.slides.length)return s(new Error(`${e} is not a valid slide index`));this.stopAutoScroll();const n={el:this.el,slides:this.slides,speed:this.options.speed,currentIndex:this.activeIndex,isPrevious:t,nextIndex:e};this._activeIndex=e,this.emit("before",{currentIndex:n.currentIndex,nextIndex:n.nextIndex,speed:n.speed}),this.effect.transition(n).then((()=>{this.options.autoScroll&&this.setAutoScroll(),this.emit("after"),i()}))}))}stopAutoScroll(){window.clearTimeout(this.autoScrollTimer)}emit(e,t){const i=this.eventListeners[e];if("destroy"===e){const e=i;e?.forEach((e=>e()))}else i?.forEach((e=>e({currentIndex:this.activeIndex,speed:this.options.speed,...t})))}setAutoScroll(){this.stopAutoScroll(),window.requestAnimationFrame((()=>{this._el&&(this.el.setAttribute("aria-live","off"),this.autoScrollTimer=window.setTimeout((()=>this.next()),this.options.timeout))}))}addElListener(e,t){this.el.addEventListener(e,t),this.elListeners[e]=this.elListeners[e]||[],this.elListeners[e].push(t)}applyEventListeners(){this.addElListener("pointerenter",(()=>{this.options.autoScroll&&this.options.pauseOnHover&&this.pause()})),this.addElListener("pointerleave",(()=>{this.options.autoScroll&&this.options.pauseOnHover&&this.play()})),this.options.swipe&&this.addSwipeNavigation()}addSwipeNavigation(){let e=0;this.addElListener("pointerdown",(t=>{e=t.clientX})),this.addElListener("pointerup",(t=>{const i=t.clientX-e;Math.abs(i)>=this.options.swipeTolerance&&(i>0?this.prev():this.next(),t.stopPropagation())}))}},h="undefined"!=typeof HTMLElement?HTMLElement:class{},u="undefined"!=typeof customElements?(e,t)=>{void 0===customElements.get(e)&&customElements.define(e,t)}:()=>{};function p(e){return e.replace(/-./g,(e=>e[1].toUpperCase()))}function f(e,t,i){const s=e.getAttribute(t);let n=NaN;return null!==s&&(n=parseInt(s,10)),isNaN(n)?i:n}function m(e,t,i){return e.hasAttribute(t)?"false"!==e.getAttribute(t):i}var b=["auto-scroll","pause-on-hover","speed","timeout","start-index","swipe","swipe-tolerance"],v=class extends h{#e;get slider(){return this.#e}get autoScroll(){return m(this,"auto-scroll",d.autoScroll)}get pauseOnHover(){return m(this,"pause-on-hover",d.pauseOnHover)}get speed(){return f(this,"speed",d.speed)}get startIndex(){return f(this,"start-index",d.startIndex)}get swipe(){return m(this,"swipe",d.swipe)}get swipeTolerance(){return f(this,"swipe-tolerance",d.swipeTolerance)}get timeout(){return f(this,"timeout",d.timeout)}get options(){return{autoScroll:this.autoScroll,pauseOnHover:this.pauseOnHover,speed:this.speed,startIndex:this.startIndex,swipe:this.swipe,swipeTolerance:this.swipeTolerance,timeout:this.timeout}}init(e){const t=new c(this,e,this.options);["play","pause","before","after","destroy"].forEach((e=>t.addEventListener(e,(t=>this.dispatchEvent(new CustomEvent(e,{detail:t})))))),this.#e=t}reset(e,t){this.slider?.reset(e,t)}attributeChangedCallback(e){if(b.includes(e)){const t=p(e);this.reset({[t]:this[t]})}}disconnectedCallback(){this.slider?.destroy(),this.#e=void 0}},x=["cover","timing-function"];u("bs-carousel",class extends v{static observedAttributes=(()=>[...b,...x])();get cover(){return m(this,"cover",!1)}get timingFunction(){return this.getAttribute("timing-function")||"ease-out"}connectedCallback(){this.init(new r({cover:this.cover,timingFunction:this.timingFunction}))}attributeChangedCallback(e){if(x.includes(e)){const t=p(e);this.reset({[t]:this[t]},new r({cover:this.cover,timingFunction:this.timingFunction}))}else super.attributeChangedCallback(e)}});var g=i(5723);function w(e,t){Object.keys(t).forEach((i=>e.style.setProperty(i,t[i])))}var y=class{options;translateZ;transitionTimer=0;constructor(e){this.options={direction:e?.direction||"horizontal",perspective:e?.perspective||1e3}}initialize(e,t,i,s){const n=e.offsetWidth,r=e.offsetHeight,o=`${this.options.perspective}px`,a=e.parentElement;if(null==a)throw new Error("Unable to locate viewport element for Cube slider");this.translateZ="vertical"===this.options.direction?r/2:n/2,s.storeAttributes(a,["style"]),t.forEach((e=>w(e,{left:"0",position:"absolute",top:"0"}))),w(e,{left:"0",overflow:"visible",position:"absolute",top:"0"}),-1===["absolute","fixed","relative"].indexOf(getComputedStyle(a).position)&&w(a,{position:"relative"}),w(a,{overflow:"visible",perspective:o}),w(t[i.startIndex||0],{transform:`${this.rotation(0)} translate3d(0, 0, ${this.translateZ}px)`}),w(e,{"transform-style":"preserve-3d",transform:`translate3d(0, 0, -${this.translateZ}px)`}),this.transitionTimer=window.setTimeout((()=>w(e,{transition:`transform ${i.speed}ms`})),50)}transition(e){return new Promise((t=>{const i=e.isPrevious?90:-90;w(e.slides[e.nextIndex],{transform:`${this.rotation(-i)} translate3d(0, 0, ${this.translateZ}px)`,"z-index":"2"}),w(e.el,{transition:`transform ${e.speed}ms`,transform:`translate3d(0, 0, -${this.translateZ}px) ${this.rotation(i)}`}),this.transitionTimer=window.setTimeout((()=>{e.slides.forEach(((t,i)=>{i!==e.nextIndex&&w(t,{transform:"initial"})})),w(e.el,{transition:"initial",transform:`translate3d(0, 0, -${this.translateZ}px) ${this.rotation(0)}`}),w(e.slides[e.nextIndex],{transform:`${this.rotation(0)} translate3d(0, 0, ${this.translateZ}px)`,"z-index":"1"}),t()}),e.speed)}))}destroy(){window.clearTimeout(this.transitionTimer)}rotation(e){return`rotate3d(${"vertical"===this.options.direction?"1, 0, 0":"0, 1, 0"}, ${e}deg)`}},E="undefined"!=typeof HTMLElement?HTMLElement:class{},S="undefined"!=typeof customElements?(e,t)=>{void 0===customElements.get(e)&&customElements.define(e,t)}:()=>{};function C(e){return e.replace(/-./g,(e=>e[1].toUpperCase()))}function T(e,t,i){const s=e.getAttribute(t);let n=NaN;return null!==s&&(n=parseInt(s,10)),isNaN(n)?i:n}function A(e,t,i){return e.hasAttribute(t)?"false"!==e.getAttribute(t):i}var I=["auto-scroll","pause-on-hover","speed","timeout","start-index","swipe","swipe-tolerance"],L=class extends E{#e;get slider(){return this.#e}get autoScroll(){return A(this,"auto-scroll",d.autoScroll)}get pauseOnHover(){return A(this,"pause-on-hover",d.pauseOnHover)}get speed(){return T(this,"speed",d.speed)}get startIndex(){return T(this,"start-index",d.startIndex)}get swipe(){return A(this,"swipe",d.swipe)}get swipeTolerance(){return T(this,"swipe-tolerance",d.swipeTolerance)}get timeout(){return T(this,"timeout",d.timeout)}get options(){return{autoScroll:this.autoScroll,pauseOnHover:this.pauseOnHover,speed:this.speed,startIndex:this.startIndex,swipe:this.swipe,swipeTolerance:this.swipeTolerance,timeout:this.timeout}}init(e){const t=new c(this,e,this.options);["play","pause","before","after","destroy"].forEach((e=>t.addEventListener(e,(t=>this.dispatchEvent(new CustomEvent(e,{detail:t})))))),this.#e=t}reset(e,t){this.slider?.reset(e,t)}attributeChangedCallback(e){if(I.includes(e)){const t=C(e);this.reset({[t]:this[t]})}}disconnectedCallback(){this.slider?.destroy(),this.#e=void 0}},j=["direction","perspective"];function $(e,t){Object.keys(t).forEach((i=>e.style.setProperty(i,t[i])))}S("bs-cube",class extends L{static observedAttributes=(()=>[...I,...j])();get direction(){const e=this.getAttribute("direction")?.trim();return"horizontal"===e||"vertical"===e?e:"horizontal"}get perspective(){return T(this,"perspective",1e3)}attributeChangedCallback(e){if(j.includes(e)){const t=C(e);this.reset({[t]:this[t]},new y({direction:this.direction,perspective:this.perspective}))}else super.attributeChangedCallback(e)}connectedCallback(){this.init(new y({direction:this.direction,perspective:this.perspective}))}});var O=class{options;transitionTimer=0;constructor(e){this.options={timingFunction:e?.timingFunction||"ease-in"}}initialize(e,t,i){-1!=="static inherit".indexOf(getComputedStyle(e).position)&&$(e,{position:"relative"}),t.forEach(((e,t)=>{$(e,{height:"100%",left:"0",opacity:"2",position:"absolute",top:"0",transition:`opacity ${i.speed}ms ${this.options.timingFunction}`,width:"100%","z-index":"2"}),t!==i.startIndex&&$(e,{opacity:"0","z-index":"1"})}))}transition(e){return new Promise((t=>{const i=e.slides[e.currentIndex],s=e.slides[e.nextIndex];$(i,{"z-index":"1",opacity:"0"}),$(s,{"z-index":"2",opacity:"1"}),this.transitionTimer=window.setTimeout(t,e.speed)}))}destroy(){window.clearTimeout(this.transitionTimer)}},k="undefined"!=typeof HTMLElement?HTMLElement:class{},N="undefined"!=typeof customElements?(e,t)=>{void 0===customElements.get(e)&&customElements.define(e,t)}:()=>{};function H(e){return e.replace(/-./g,(e=>e[1].toUpperCase()))}function F(e,t,i){const s=e.getAttribute(t);let n=NaN;return null!==s&&(n=parseInt(s,10)),isNaN(n)?i:n}function P(e,t,i){return e.hasAttribute(t)?"false"!==e.getAttribute(t):i}var _=["auto-scroll","pause-on-hover","speed","timeout","start-index","swipe","swipe-tolerance"],W=class extends k{#e;get slider(){return this.#e}get autoScroll(){return P(this,"auto-scroll",d.autoScroll)}get pauseOnHover(){return P(this,"pause-on-hover",d.pauseOnHover)}get speed(){return F(this,"speed",d.speed)}get startIndex(){return F(this,"start-index",d.startIndex)}get swipe(){return P(this,"swipe",d.swipe)}get swipeTolerance(){return F(this,"swipe-tolerance",d.swipeTolerance)}get timeout(){return F(this,"timeout",d.timeout)}get options(){return{autoScroll:this.autoScroll,pauseOnHover:this.pauseOnHover,speed:this.speed,startIndex:this.startIndex,swipe:this.swipe,swipeTolerance:this.swipeTolerance,timeout:this.timeout}}init(e){const t=new c(this,e,this.options);["play","pause","before","after","destroy"].forEach((e=>t.addEventListener(e,(t=>this.dispatchEvent(new CustomEvent(e,{detail:t})))))),this.#e=t}reset(e,t){this.slider?.reset(e,t)}attributeChangedCallback(e){if(_.includes(e)){const t=H(e);this.reset({[t]:this[t]})}}disconnectedCallback(){this.slider?.destroy(),this.#e=void 0}},z=["timing-function"];N("bs-fade",class extends W{static observedAttributes=(()=>[..._,...z])();get timingFunction(){return this.getAttribute("timing-function")?.trim()||"ease-in-out"}attributeChangedCallback(e){if(z.includes(e)){const t=H(e);this.reset({[t]:this[t]},new O({timingFunction:this.timingFunction}))}else super.attributeChangedCallback(e)}connectedCallback(){this.init(new O({timingFunction:this.timingFunction}))}});var q,B="undefined"!=typeof HTMLElement?HTMLElement:class{},M="undefined"!=typeof customElements?(e,t)=>{void 0===customElements.get(e)&&customElements.define(e,t)}:()=>{},R=1;"undefined"!=typeof document&&((q=document.createElement("template")).innerHTML='\n<div part="container">\n  <div part="slider-container">\n    <slot id="slider"></slot>\n  </div>\n\n  <div  part="play-btn-container">\n    <slot name="play-btn">\n      <button part="btn play-btn"></button>\n    </slot>\n  </div>\n\n  <div part="controls-container">\n    <slot name="prev-btn">\n      <button part="prev-btn btn"></button>\n    </slot>\n    <slot name="next-btn">\n      <button part="next-btn btn"></button>\n    </slot>\n  </div>\n\n  <div part="index-container" role="group">\n    <slot name="index"></slot>\n  </div>\n</div>\n');function V(e,t){Object.keys(t).forEach((i=>e.style.setProperty(i,t[i])))}M("bs-slider-controls",class extends B{#t=null;#i;#s=!1;constructor(){super(),this.#i=new MutationObserver((()=>{this.#n()}))}connectedCallback(){const e=this.attachShadow({mode:"open"});e.appendChild(q.content.cloneNode(!0));const t=e.querySelector("#slider");this.hasAttribute("aria-roledescription")||this.setAttribute("aria-roledescription","carousel"),this.hasAttribute("role")||this.setAttribute("role","region"),this.#r(e.querySelector('slot[name="prev-btn"]'),(()=>this.#t?.slider?.prev()),{"aria-label":this.#o()}),this.#r(e.querySelector('slot[name="next-btn"]'),(()=>this.#t?.slider?.next()),{"aria-label":this.#a()}),this.#l(),this.#d(),t?.addEventListener("slotchange",(()=>this.#n()))}#n(){this.#i.disconnect();const e=this.shadowRoot?.querySelector("#slider")?.assignedElements()[0];if(e.tagName.toLowerCase().startsWith("bs-")?this.#t=e:(this.#i.observe(e,{subtree:!0,childList:!0}),this.#t=e.querySelector("bs-carousel, bs-cube, bs-fade, bs-tile")),this.#t?.slider){let e=this.#t?.id;e||(e="bs-slider-"+R++,this.#t.id=e),this.shadowRoot?.querySelectorAll('[part~="btn"]').forEach((t=>{t.setAttribute("aria-controls",e)})),this.#c(),this.#t?.slider.addEventListener("play",(()=>this.#c())),this.#t?.slider.addEventListener("pause",(()=>this.#c())),this.#h(),this.#t?.slider.addEventListener("before",(e=>{let{currentIndex:t,nextIndex:i}=e;this.#u(t,i)}))}}#r(e,t,i){void 0===i&&(i={});const s=e.querySelector('[part~="btn"]');if(s)for(const[n,r]of Object.entries(i))s.setAttribute(n,r);e.addEventListener("click",(e=>{this.#s=!0,this.#t?.slider?.pause(),t(e)})),e.addEventListener("focusin",(()=>{this.#s||this.#t?.slider?.pause()}))}#d(){const e=this.shadowRoot?.querySelector('slot[name="index"]');e&&(e.setAttribute("aria-label",this.#p()),e?.addEventListener("click",(t=>{const i=e.assignedElements()[0]??e;if(i){const e=Array.from(i.querySelectorAll("button")).indexOf(t.target);e>-1&&(this.#s=!0,this.#t?.slider?.pause(),this.#t?.slider?.skipTo(e))}})),e?.addEventListener("slotchange",(()=>{const t=e.assignedElements()[0];if(t){const e=t.querySelectorAll("button"),i=this.#t?.slider;i&&e&&e.forEach(((e,t)=>{e.setAttribute("aria-disabled",t===i.activeIndex?"true":"false")}))}})))}#h(){const e=this.shadowRoot?.querySelector('slot[name="index"]');if(e){this.#f();const t=this.#t?.slider?.length??0;if(t>1&&!this.hasAttribute("disable-index")){const i=document.createDocumentFragment(),s=this.getAttribute("index-btn-label")??"View slide %d";for(let e=0;e<t;e++){const t=document.createElement("button"),n=e===this.#t.slider.activeIndex,r=s.replace(/%d/g,`${e+1}`);t.setAttribute("aria-label",r),t.setAttribute("aria-disabled",n?"true":"false"),t.setAttribute("aria-controls",this.#t.id),t.setAttribute("part",n?"index-btn active":"index-btn"),t.setAttribute("type","button"),i.appendChild(t)}e?.appendChild(i)}}}#u(e,t){const i=this.shadowRoot?.querySelector('slot[name="index"]');if(i){const s=i?.assignedElements()[0]??i,n=s?.querySelectorAll("button"),r=n?.item(e),o=n?.item(t??-1);r&&(r.setAttribute("aria-disabled","false"),r.hasAttribute("part")&&r.setAttribute("part","index-btn")),o&&(o.setAttribute("aria-disabled","true"),o.hasAttribute("part")&&o.setAttribute("part","index-btn active"))}}#f(){const e=this.shadowRoot?.querySelector('slot[name="index"]');if(e){const t=e?.assignedElements()??[];e?.querySelectorAll("button").forEach((i=>{t.includes(i)||e.removeChild(i)}))}}#l(){const e=this.shadowRoot?.querySelector('slot[name="play-btn"]');e&&(e.addEventListener("slotchange",(()=>{this.#c()})),e.addEventListener("click",(()=>{this.#s=!0,this.#t?.slider?.getOption("autoScroll")?this.#t?.slider?.pause():this.#t?.slider?.play()})))}#c(){const e=this.shadowRoot?.querySelector('slot[name="play-btn"]');if(e){const t=e.assignedElements()[0]??e.querySelector('[part~="btn"]');t.setAttribute("aria-label",this.#t?.slider?.getOption("autoScroll")?this.#m():this.#b()),t?.setAttribute("part",this.#t?.slider?.getOption("autoScroll")?"btn play-btn pause":"btn play-btn")}}#p(){return this.getAttribute("index-label")??"Select a slide"}#a(){return this.getAttribute("next-btn-label")??"Next"}#o(){return this.getAttribute("prev-btn-label")??"Previous"}#b(){return this.getAttribute("play-btn-label")??"Start slide auto scroll"}#m(){return this.getAttribute("pause-btn-label")??"Stop slide auto scroll"}});var K="bs-tile",D="bs-tile-front",X="bs-tile-back",Z=class{createTile(e){const t=document.createElement("div"),i=document.createElement("div"),s=document.createElement("div"),n=[i,s];return t.classList.add(e.tileClass),V(t,{height:`${e.height}px`,left:`${e.fromLeft}px`,overflow:"hidden",position:"absolute",top:`${e.fromTop}px`,width:`${e.width}px`}),n.forEach((t=>{V(t,{height:`${e.boxHeight}px`,left:`-${e.fromLeft}px`,position:"absolute",top:`-${e.fromTop}px`,transition:"opacity 400ms",width:`${e.boxWidth}px`})})),V(s,{opacity:"0"}),i.classList.add(e.frontClass),t.appendChild(i),s.classList.add(e.backClass),t.appendChild(s),t}transition(e,t){const i=e.querySelector(`.${D}`),s=e.querySelector(`.${X}`);V(i,{opacity:"front"===t?"1":"0"}),V(s,{opacity:"front"===t?"0":"1"})}setTileFace(e,t){const i=e.cloneNode(!0);i.removeAttribute("style"),t.replaceChildren(i)}},U=class{createTile(e){const t=document.createElement("div"),i=document.createElement("div"),s=document.createElement("div"),n=document.createElement("div"),r=document.createElement("div"),o=document.createElement("div"),a=[n,o];return V(t,{height:`${e.height}px`,left:`${e.fromLeft}px`,perspective:"300px",position:"absolute",top:`${e.fromTop}px`,width:`${e.width}px`,"z-index":`${e.zIndex}`}),i.classList.add(e.tileClass),V(i,{height:"100%",position:"relative","transform-style":"preserve-3d",transition:`transform ${e.speed}ms`,width:"100%"}),t.appendChild(i),a.forEach((t=>V(t,{height:`${e.boxHeight}px`,left:`-${e.fromLeft}px`,position:"absolute",top:`-${e.fromTop}px`,width:`${e.boxWidth}px`}))),V(s,{"backface-visibility":"hidden",inset:"0",overflow:"clip",position:"absolute"}),V(r,{"backface-visibility":"hidden",inset:"0",overflow:"clip",position:"absolute",transform:"rotateY(180deg)"}),s.appendChild(n),s.classList.add(e.frontClass),i.appendChild(s),r.appendChild(o),r.classList.add(e.backClass),i.appendChild(r),t}transition(e,t){V(e,{transform:`rotateY(${"back"===t?180:0}deg)`})}setTileFace(e,t){const i=e.cloneNode(!0);i.removeAttribute("style"),t.firstChild.replaceChildren(i)}},Q="flip",J=8,Y=50,G=class{rowCount;rowOffset;tileEffect;_tileWrapper;tileTransition;grid;activeFace;rowTimers=[];tileTimers=[];get tileWrapper(){if(void 0===this._tileWrapper)throw new Error("TileWrapper is undefined");return this._tileWrapper}constructor(e){this.tileEffect=e?.tileEffect||Q,this.rowCount=e?.rows||J,this.rowOffset=e?.rowOffset||Y,this.activeFace="front",this.tileTransition="fade"===this.tileEffect?new Z:new U}initialize(e,t,i){const s=t[i.startIndex||0],n=document.createDocumentFragment();this.grid=this.calculateGrid(e),this._tileWrapper&&this.destroy(e);const r=document.createElement("div");r.setAttribute("aria-hidden","true"),e.appendChild(r),this._tileWrapper=r,-1==="fixed absolute relative".indexOf(getComputedStyle(e).position)&&V(e,{position:"relative"}),V(this.tileWrapper,{position:"absolute",top:"0",left:"0",width:"100%",height:"100%"});const o=this.grid.rows*this.grid.cols;for(let a=0;a<this.grid.rows;++a){const e=a*this.grid.tileHeight;for(let t=0;t<this.grid.cols;++t){const r=this.tileTransition.createTile({backClass:`${K}-back`,boxWidth:this.grid.width,boxHeight:this.grid.height,fromTop:e,fromLeft:t*this.grid.tileWidth,frontClass:`${K}-front`,height:this.grid.tileHeight,speed:(i.speed-this.rowOffset*(this.grid.rows-1))/this.grid.cols,tileClass:K,width:this.grid.tileWidth,zIndex:o-(a+t)});n.appendChild(r),this.tileTransition.setTileFace(s,r.querySelector(`.${D}`))}}t.forEach((e=>V(e,{position:"absolute",clip:"rect(0 0 0 0)",height:"1px",width:"1px",margin:"-1px",padding:"0",border:"0"}))),this.tileWrapper.appendChild(n)}transition(e){return new Promise((t=>{const i=this.tileWrapper.querySelectorAll(`.${K}`),s=this.rowOffset,n=(e.speed-s*(this.grid.rows-1))/this.grid.cols,r="front"===this.activeFace?"back":"front";this.rowTimers.length=0,this.tileTimers.length=0,this.tileWrapper.querySelectorAll(`.${"front"===r?D:X}`).forEach((t=>this.tileTransition.setTileFace(e.slides[e.nextIndex],t)));for(let e=0;e<this.grid.rows;++e){let o=e*this.grid.cols,a=0;const l=o+this.grid.cols,d=e*s;this.rowTimers.push(window.setTimeout((()=>{for(;o<l;++o){const e=a*n,s=i[o];this.tileTimers.push(window.setTimeout((()=>{this.tileTransition.transition(s,r),s===i[i.length-1]&&(this.activeFace=r,t())}),e)),a+=1}}),d))}}))}destroy(e){e.removeChild(this.tileWrapper),delete this._tileWrapper,this.rowTimers.forEach(window.clearTimeout),this.tileTimers.forEach(window.clearTimeout)}calculateGrid(e){const{width:t,height:i}=getComputedStyle(e),s=parseInt(i,10)??e.offsetHeight,n=parseInt(t,10)??e.offsetWidth,r=this.rowCount,o=Math.ceil(s/r),a=Math.floor(e.offsetWidth/o);return{cols:a,height:s,rows:r,tileHeight:o,tileWidth:Math.ceil(n/a),width:n}}},ee="undefined"!=typeof HTMLElement?HTMLElement:class{},te="undefined"!=typeof customElements?(e,t)=>{void 0===customElements.get(e)&&customElements.define(e,t)}:()=>{};function ie(e){return e.replace(/-./g,(e=>e[1].toUpperCase()))}function se(e,t,i){const s=e.getAttribute(t);let n=NaN;return null!==s&&(n=parseInt(s,10)),isNaN(n)?i:n}function ne(e,t,i){return e.hasAttribute(t)?"false"!==e.getAttribute(t):i}var re=["auto-scroll","pause-on-hover","speed","timeout","start-index","swipe","swipe-tolerance"],oe=class extends ee{#e;get slider(){return this.#e}get autoScroll(){return ne(this,"auto-scroll",d.autoScroll)}get pauseOnHover(){return ne(this,"pause-on-hover",d.pauseOnHover)}get speed(){return se(this,"speed",d.speed)}get startIndex(){return se(this,"start-index",d.startIndex)}get swipe(){return ne(this,"swipe",d.swipe)}get swipeTolerance(){return se(this,"swipe-tolerance",d.swipeTolerance)}get timeout(){return se(this,"timeout",d.timeout)}get options(){return{autoScroll:this.autoScroll,pauseOnHover:this.pauseOnHover,speed:this.speed,startIndex:this.startIndex,swipe:this.swipe,swipeTolerance:this.swipeTolerance,timeout:this.timeout}}init(e){const t=new c(this,e,this.options);["play","pause","before","after","destroy"].forEach((e=>t.addEventListener(e,(t=>this.dispatchEvent(new CustomEvent(e,{detail:t})))))),this.#e=t}reset(e,t){this.slider?.reset(e,t)}attributeChangedCallback(e){if(re.includes(e)){const t=ie(e);this.reset({[t]:this[t]})}}disconnectedCallback(){this.slider?.destroy(),this.#e=void 0}},ae=["rows","row-offset","tile-effect"];function le(e){const{autoScroll:t,onAfter:i,onBefore:s,onDestroy:n,onPause:r,onPlay:o,pauseOnHover:a,startIndex:l,speed:d,swipe:c,swipeTolerance:h,timeout:u}=e,p={onAfter:i,onBefore:s,onDestroy:n,onPause:r,onPlay:o},f={};return void 0!==t&&(f["auto-scroll"]=`${t}`),void 0!==a&&(f["pause-on-hover"]=`${a}`),void 0!==d&&(f.speed=`${d}`),void 0!==l&&(f["start-index"]=`${l}`),void 0!==c&&(f.swipe=`${c}`),void 0!==h&&(f["swipe-tolerance"]=`${h}`),void 0!==u&&(f.timeout=`${u}`),{attributes:f,eventHandlers:p}}function de(e,t){let{onAfter:i,onBefore:s,onDestroy:n,onPause:r,onPlay:o}=e;return e=>{const a=e?.slider;a&&(i&&a.addEventListener("after",i),s&&a.addEventListener("before",s),n&&a.addEventListener("destroy",n),r&&a.addEventListener("pause",r),o&&a.addEventListener("play",o),t&&(t.current=a))}}te("bs-tile",class extends oe{static observedAttributes=(()=>[...re,...ae])();get rows(){return se(this,"rows",8)}get rowOffset(){return se(this,"row-offset",50)}get tileEffect(){return this.getAttribute("tile-effect")||"fade"}attributeChangedCallback(e){if(ae.includes(e)){const t=ie(e);this.reset({[t]:this[t]},new G({rows:this.rows,rowOffset:this.rowOffset,tileEffect:this.tileEffect}))}else super.attributeChangedCallback(e)}connectedCallback(){this.init(new G({rows:this.rows,rowOffset:this.rowOffset,tileEffect:this.tileEffect}))}});var ce=function(e){let{children:t,className:i,cover:s,sliderRef:n,timingFunction:r,...o}=e;const{attributes:a,eventHandlers:l}=le(o),d={...a};return r&&(d["timing-function"]=r),void 0!==s&&(d.cover=`${s}`),(0,g.jsx)("bs-carousel",{...d,ref:de(l,n),class:i,children:t})};var he=function(e){let{children:t,className:i,direction:s,perspective:n,sliderRef:r,...o}=e;const{attributes:a,eventHandlers:l}=le(o),d={...a};return void 0!==s&&(d.direction=s),void 0!==n&&(d.perspective=`${n}`),(0,g.jsx)("bs-cube",{...d,ref:de(l,r),class:i,children:t})};var ue=function(e){let{children:t,className:i,sliderRef:s,timingFunction:n,...r}=e;const{attributes:o,eventHandlers:a}=le(r),l={...o};return n&&(l["timing-function"]=n),(0,g.jsx)("bs-fade",{...l,ref:de(a,s),class:i,children:t})};var pe=function(e){let{className:t,indexBtnLabel:i,indexLabel:s,nextBtnLabel:n,pauseBtnLabel:r,playBtnLabel:o,prevBtnLabel:a,...l}=e;const d={};return i&&(d["index-btn-label"]=i),s&&(d["index-label"]=s),n&&(d["next-btn-label"]=n),r&&(d["pause-btn-label"]=r),o&&(d["play-btn-label"]=o),a&&(d["prev-btn-label"]=a),(0,g.jsx)("bs-slider-controls",{class:t,...d,...l})};var fe=function(e){let{children:t,className:i,sliderRef:s,rows:n,rowOffset:r,tileEffect:o,...a}=e;const{attributes:l,eventHandlers:d}=le(a),c={...l};return void 0!==n&&(c.rows=`${n}`),void 0!==r&&(c["row-offset"]=`${r}`),void 0!==o&&(c["tile-effect"]=o),(0,g.jsx)("bs-tile",{...c,ref:de(d,s),class:i,children:t})}}}]);
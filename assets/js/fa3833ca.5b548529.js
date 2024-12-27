"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[191],{3617:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>d,contentTitle:()=>r,default:()=>p,frontMatter:()=>l,metadata:()=>t,toc:()=>c});const t=JSON.parse('{"id":"guides/web-components","title":"Web Components","description":"BoxSlider Web Components provide ready to us slider elements for each slide","source":"@site/docs/guides/02-web-components.md","sourceDirName":"guides","slug":"/guides/web-components","permalink":"/slider/docs/guides/web-components","draft":false,"unlisted":false,"tags":[],"version":"current","sidebarPosition":2,"frontMatter":{"title":"Web Components"},"sidebar":"docsSidebar","previous":{"title":"React","permalink":"/slider/docs/guides/react"},"next":{"title":"JavaScript","permalink":"/slider/docs/guides/javascript"}}');var o=s(612),i=s(9637);const l={title:"Web Components"},r=void 0,d={},c=[{value:"Installation",id:"installation",level:2},{value:"Components",id:"components",level:2},{value:"Styling",id:"styling",level:2},{value:"Properties",id:"properties",level:2},{value:"Events",id:"events",level:2}];function a(e){const n={a:"a",code:"code",h2:"h2",p:"p",pre:"pre",...(0,i.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.p,{children:"BoxSlider Web Components provide ready to us slider elements for each slide\neffect and the slider controls."}),"\n",(0,o.jsx)(n.h2,{id:"installation",children:"Installation"}),"\n",(0,o.jsx)(n.p,{children:"The package can be imported as an NPM module or used directly from the package or CDN."}),"\n",(0,o.jsx)(n.p,{children:"Install via NPM."}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-sh",children:"npm i --save @boxslider/components\n"})}),"\n",(0,o.jsx)(n.p,{children:"Include the package into the root of your project."}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-ts",children:"import '@boxslider/components'\n"})}),"\n",(0,o.jsx)(n.p,{children:"Alternatively use from CDN."}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-html",children:'<script\n  type="module"\n  src="https://cdn.jsdelivr.net/npm/@boxslider/components/+esm"><\/script>\n\n<bs-slider-controls>\n  <bs-carousel>\n    <div>Slide one</div>\n    <div>Slide two</div>\n    <div>Slide three</div>\n  </bs-carousel>\n</bs-slider-controls>\n'})}),"\n",(0,o.jsx)(n.p,{children:"To import a single component use the individual exports."}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-ts",children:"import '@boxslider/components/Carousel'\n"})}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-html",children:'<script\n  type="module"\n  src="https://cdn.jsdelivr.net/npm/@boxslider/components/Carousel/+esm"><\/script>\n\n<bs-carousel>\n  \x3c!-- Slides --\x3e\n</bs-carousel>\n'})}),"\n",(0,o.jsx)(n.h2,{id:"components",children:"Components"}),"\n",(0,o.jsxs)(n.p,{children:["Each slide effect has a matching web component. The options for the slider and the effect are passed as attributes\nwith hyphens instead of camel case. For example, ",(0,o.jsx)(n.code,{children:"autoScroll"})," becomes ",(0,o.jsx)(n.code,{children:"auto-scroll"}),". View the\n",(0,o.jsx)(n.a,{href:"/docs/getting-started/configuration",children:"configuration options"})," for the available options."]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-html",children:'\x3c!-- Example attribute values --\x3e\n<bs-carousel speed="500" timing-function="ease-in" cover></bs-carousel>\n<bs-cube></bs-cube>\n<bs-fade></bs-fade>\n<bs-tile></bs-tile>\n'})}),"\n",(0,o.jsxs)(n.p,{children:["The slider components do not have any controls built in. Use the ",(0,o.jsx)(n.code,{children:"bs-slider-controls"})," component to add navigation\ncontrols to the slider. See the ",(0,o.jsx)(n.a,{href:"/docs/guides/slider-controls",children:"slider controls"})," guide for more information."]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-html",children:"<bs-slider-controls>\n  <bs-carousel>\n    <div>Slide one</div>\n    <div>Slide two</div>\n    <div>Slide three</div>\n  </bs-carousel>\n</bs-slider-controls>\n"})}),"\n",(0,o.jsx)(n.h2,{id:"styling",children:"Styling"}),"\n",(0,o.jsxs)(n.p,{children:["The components do not include any styles by default. The display, width and height style properties need to be set drectly or\nwith CSS as a minimum for the slider to work. View the ",(0,o.jsx)(n.a,{href:"/docs/guides/styling",children:"styling guide"})," for more information on how to\neffectively style the slider components."]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-html",children:'<style>\n  #slider {\n    display: block;\n    height: 400px;\n    width: 800px;\n  }\n\n  .slide {\n    height: 100%;\n    width: 100%;\n  }\n</style>\n\n<bs-carousel id="slider">\n  <div class="slide">Slide one</div>\n  <div class="slide">Slide two</div>\n  <div class="slide">Slide three</div>\n</bs-carousel>\n'})}),"\n",(0,o.jsx)(n.h2,{id:"properties",children:"Properties"}),"\n",(0,o.jsxs)(n.p,{children:["Slider effect components have a ",(0,o.jsx)(n.code,{children:"slider"})," attribute that provides access to the BoxSlider instance. Use this property to\ncontrol the slider programmatically. Slider options can be accessed as readonly properties on the element."]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-ts",children:"// Select the slider element\nconst component = document.querySelector('bs-fade')\n\n// Control the slider programmatically\ncomponent.slider.next()\n\n// Access the slider options as\nproperties console.log(component.speed)\n"})}),"\n",(0,o.jsx)(n.h2,{id:"events",children:"Events"}),"\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.a,{href:"/docs/getting-started/api#events",children:"Slider events"})," can be listened for by adding event handlers to the\nslider element."]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-ts",children:"// Select the slider element\nconst component = document.querySelector('bs-fade')\n\n// Add an event listener\ncomponent.addEventListener('before', (ev) => {\n  console.log(`About to show slide ${ev.detail.nextIndex}`)\n})\n"})})]})}function p(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(a,{...e})}):a(e)}},9637:(e,n,s)=>{s.d(n,{R:()=>l,x:()=>r});var t=s(4344);const o={},i=t.createContext(o);function l(e){const n=t.useContext(i);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:l(e.components),t.createElement(i.Provider,{value:n},e.children)}}}]);
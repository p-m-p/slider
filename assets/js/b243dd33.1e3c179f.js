"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[258],{7651:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>a,contentTitle:()=>l,default:()=>h,frontMatter:()=>d,metadata:()=>s,toc:()=>o});const s=JSON.parse('{"id":"guides/javascript","title":"JavaScript","description":"More advanced users may want to use the core JavaScript library directly. The core library provides","source":"@site/docs/guides/03-javascript.md","sourceDirName":"guides","slug":"/guides/javascript","permalink":"/slider/docs/guides/javascript","draft":false,"unlisted":false,"tags":[],"version":"current","sidebarPosition":3,"frontMatter":{"title":"JavaScript"},"sidebar":"docsSidebar","previous":{"title":"Web Components","permalink":"/slider/docs/guides/web-components"},"next":{"title":"Svelte","permalink":"/slider/docs/guides/svelte"}}');var i=t(612),r=t(9637);const d={title:"JavaScript"},l=void 0,a={},o=[{value:"Installation",id:"installation",level:2},{value:"Usage",id:"usage",level:2},{value:"Styling",id:"styling",level:2},{value:"Events",id:"events",level:2}];function c(e){const n={a:"a",code:"code",h2:"h2",p:"p",pre:"pre",...(0,r.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)(n.p,{children:["More advanced users may want to use the core JavaScript library directly. The core library provides\na simple API for creating a slider and manipulating it programmatically. For ready to use components\nview the ",(0,i.jsx)(n.a,{href:"/docs/guides/react",children:"React"})," and ",(0,i.jsx)(n.a,{href:"/docs/guides/web-components",children:"Web Components"})," guides."]}),"\n",(0,i.jsx)(n.h2,{id:"installation",children:"Installation"}),"\n",(0,i.jsx)(n.p,{children:"The package can be imported as an NPM module or used from a CDN."}),"\n",(0,i.jsx)(n.p,{children:"Install via NPM."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-sh",children:"npm install --save @boxslider/slider\n"})}),"\n",(0,i.jsx)(n.p,{children:"Alternatively use from CDN."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-html",children:"<script type=\"module\">\n  import {\n    BoxSlider,\n    FadeSlider,\n  } from 'https://cdn.jsdelivr.net/npm/@boxslider/slider/+esm'\n\n  const slider = new BoxSlider(\n    document.getElementById('slider'),\n    new FadeSlider(),\n  )\n<\/script>\n"})}),"\n",(0,i.jsx)(n.h2,{id:"usage",children:"Usage"}),"\n",(0,i.jsx)(n.p,{children:"Create the HTML structure for your slider content."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-html",children:'<section id="slider">\n  <div class="slide">Slide one</div>\n  <div class="slide">Slide two</div>\n  <div class="slide">Slide three</div>\n</section>\n'})}),"\n",(0,i.jsxs)(n.p,{children:["Select the slider element and create a new ",(0,i.jsx)(n.code,{children:"BoxSlider"})," instance with the desired settings\nand effect and use the API methods to control the slider. View the available\n",(0,i.jsx)(n.a,{href:"/docs/getting-started/configuration",children:"configuration options"})," and the ",(0,i.jsx)(n.a,{href:"/docs/getting-started/api",children:"API reference"}),"\nfor more details."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-javascript",children:"import { BoxSlider, FadeSlider } from '@boxslider/slider'\n\n// Options for the slider\nconst options = {\n  autoScroll: true,\n  timeout: 5000,\n}\n\n// Create a slider with the fade slide transition\nconst slider = new BoxSlider(\n  document.getElementById('slider'),\n  new FadeSlider(),\n  options,\n)\n\n// Call API methods on the slider to control it\nawait slider.next()\n"})}),"\n",(0,i.jsx)(n.h2,{id:"styling",children:"Styling"}),"\n",(0,i.jsxs)(n.p,{children:["For the effects to work correctly the slider and slide elements must be styled with a ",(0,i.jsx)(n.code,{children:"height"})," and ",(0,i.jsx)(n.code,{children:"width"}),"\nand the slide elements should have an equal height within the slider element."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-css",children:"#slider {\n  height: 400px;\n  width: 800px;\n}\n\n.slide {\n  height: 100%;\n  width: 100%;\n}\n"})}),"\n",(0,i.jsx)(n.h2,{id:"events",children:"Events"}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"/docs/getting-started/api#events",children:"Slider events"})," can be listened for by adding event handlers to the\nBoxSlider instance."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-ts",children:"// Add an event listener to the BoxSlider instance\nslider.addEventListener('after', (ev) => {\n  console.log(`Slide ${ev.currentIndex} is now active`)\n})\n"})})]})}function h(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(c,{...e})}):c(e)}},9637:(e,n,t)=>{t.d(n,{R:()=>d,x:()=>l});var s=t(4344);const i={},r=s.createContext(i);function d(e){const n=s.useContext(r);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:d(e.components),s.createElement(r.Provider,{value:n},e.children)}}}]);
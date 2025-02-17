"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[607],{4147:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>a,contentTitle:()=>d,default:()=>h,frontMatter:()=>r,metadata:()=>s,toc:()=>c});const s=JSON.parse('{"id":"getting-started/usage","title":"Usage","description":"React","source":"@site/docs/getting-started/02-usage.md","sourceDirName":"getting-started","slug":"/getting-started/usage","permalink":"/slider/docs/getting-started/usage","draft":false,"unlisted":false,"tags":[],"version":"current","sidebarPosition":2,"frontMatter":{"title":"Usage"},"sidebar":"docsSidebar","previous":{"title":"Installation","permalink":"/slider/docs/getting-started/installation"},"next":{"title":"Configuration","permalink":"/slider/docs/getting-started/configuration"}}');var o=t(612),i=t(7066);const r={title:"Usage"},d=void 0,a={},c=[{value:"React",id:"react",level:2},{value:"Web Components",id:"web-components",level:2},{value:"JavaScript",id:"javascript",level:2}];function l(e){const n={a:"a",code:"code",h2:"h2",p:"p",pre:"pre",...(0,i.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.h2,{id:"react",children:"React"}),"\n",(0,o.jsxs)(n.p,{children:["Each slide effect has a matching React component. Import the component for the effect you want to use\nand pass the desired options for the slider and effect as props. Slider events can be handled by\npassing event handlers with the naming convention ",(0,o.jsx)(n.code,{children:"on<EventName>"}),". See the ",(0,o.jsx)(n.a,{href:"/docs/guides/react",children:"React guide"}),"\nfor more information. Use the ",(0,o.jsx)(n.code,{children:"SliderControls"})," component to add navigation controls to the slider, see the\n",(0,o.jsx)(n.a,{href:"/docs/guides/slider-controls",children:"slider controls"})," guide for more information."]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-jsx",children:"import { FadeSlider } from '@boxslider/react'\n\nexport function MyComponent() {\n  const slideDimensions = { width: '100%', height: '100%' }\n\n  return (\n    <SliderControls>\n      <FadeSlider\n        style={{ width: '600px', height: '400px' }}\n        onBefore={(ev) => {\n          console.log(`About to show slide ${ev.nextIndex}`)\n        }}\n        speed={300}\n        timingFunction=\"ease-in-out\"\n        autoScroll>\n        <div style={slideDimensions}>Slide one</div>\n        <div style={slideDimensions}>Slide two</div>\n        <div style={slideDimensions}>Slide three</div>\n      </FadeSlider>\n    </SliderControls>\n  )\n}\n"})}),"\n",(0,o.jsx)(n.h2,{id:"web-components",children:"Web Components"}),"\n",(0,o.jsxs)(n.p,{children:["Each slide effect has a matching web component. Import the component for the effect you want to use\nand pass the desired options for the slider and effect as attributes. Slider events can be handled\nby adding event listeners to the component element. See the ",(0,o.jsx)(n.a,{href:"/docs/guides/web-components",children:"Web Components guide"}),"\nfor more information. Use the ",(0,o.jsx)(n.code,{children:"bs-slider-controls"})," component to add navigation controls to the slider, see the\n",(0,o.jsx)(n.a,{href:"/docs/guides/slider-controls",children:"slider controls"})," guide for more information."]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-html",children:'<script\n  defer\n  type="module"\n  src="https://cdn.jsdelivr.net/npm/@boxslider/components/+esm">\n  document.addEventListener(\'DOMContentLoaded\', () => {\n    const slider = document.getElementById(\'slider\')\n\n    slider?.addEventListener(\'before\', (ev) => {\n      console.log(`About to show slide ${ev.detail.nextIndex}`)\n    })\n  })\n<\/script>\n\n<bs-slider-controls>\n  <bs-carousel id="slider" speed="300" timing-function="ease-in-out">\n    <img src="slide-one.jpg" />\n    <img src="slide-two.jpg" />\n    <img src="slide-three.jpg" />\n  </bs-carousel>\n</bs-slider-controls>\n'})}),"\n",(0,o.jsx)(n.h2,{id:"javascript",children:"JavaScript"}),"\n",(0,o.jsxs)(n.p,{children:["The core slider package can also be used standalone. To create a slider select the slider element and create\na new ",(0,o.jsx)(n.code,{children:"BoxSlider"})," instance with the desired effect and options. See the ",(0,o.jsx)(n.a,{href:"/docs/guides/javascript",children:"JavaScript guide"}),"\nfor more information."]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-javascript",children:"import { BoxSlider, FadeSlider } from '@boxslider/slider'\n\n// Create a slider with fading slide transition that moves\n// to the next slide every 5 seconds (5000ms)\nconst sliderOptions = {\n  autoScroll: true,\n  timeout: 5000,\n}\nconst effectOptions = {\n  timingFunction: 'ease-in-out',\n}\nconst slider = new BoxSlider(\n  document.getElementById('slider'),\n  new FadeSlider(effectOptions),\n  sliderOptions,\n)\n"})})]})}function h(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(l,{...e})}):l(e)}},7066:(e,n,t)=>{t.d(n,{R:()=>r,x:()=>d});var s=t(4344);const o={},i=s.createContext(o);function r(e){const n=s.useContext(i);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function d(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:r(e.components),s.createElement(i.Provider,{value:n},e.children)}}}]);
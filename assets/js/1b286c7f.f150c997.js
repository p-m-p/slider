"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[682],{1095:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>r,contentTitle:()=>d,default:()=>h,frontMatter:()=>o,metadata:()=>i,toc:()=>c});const i=JSON.parse('{"id":"guides/svelte","title":"Svelte","description":"Svelte applications can easily integrate the BoxSlider Web Components.","source":"@site/docs/guides/04-svelte.md","sourceDirName":"guides","slug":"/guides/svelte","permalink":"/slider/docs/guides/svelte","draft":false,"unlisted":false,"tags":[],"version":"current","sidebarPosition":4,"frontMatter":{"title":"Svelte"},"sidebar":"docsSidebar","previous":{"title":"JavaScript","permalink":"/slider/docs/guides/javascript"},"next":{"title":"Vue","permalink":"/slider/docs/guides/vue"}}');var t=s(5723),l=s(215);const o={title:"Svelte"},d=void 0,r={},c=[{value:"Installation",id:"installation",level:2},{value:"Components",id:"components",level:2},{value:"Styling",id:"styling",level:2},{value:"Events",id:"events",level:2},{value:"Slider binding",id:"slider-binding",level:2}];function a(e){const n={a:"a",code:"code",h2:"h2",p:"p",pre:"pre",...(0,l.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)(n.p,{children:["Svelte applications can easily integrate the BoxSlider ",(0,t.jsx)(n.a,{href:"/docs/guides/web-components",children:"Web Components"}),"."]}),"\n",(0,t.jsx)(n.h2,{id:"installation",children:"Installation"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-sh",children:"npm i --save @boxslider/components\n"})}),"\n",(0,t.jsx)(n.h2,{id:"components",children:"Components"}),"\n",(0,t.jsxs)(n.p,{children:["Svelte has first class support for web components and the best way to use BoxSlider is to use the web components directly\nin your Svelte components. The options for the slider and the effect are passed as props. View the\n",(0,t.jsx)(n.a,{href:"/docs/getting-started/configuration",children:"configuration options"})," for the available options."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-tsx",children:'<script>\n  import \'@boxslider/components\'\n<\/script>\n\n<bs-carousel class="slider" speed={500} timingFunction="ease-in" cover>\n  \x3c!-- Slides go here --\x3e\n</bs-carousel>\n'})}),"\n",(0,t.jsxs)(n.p,{children:["The slider components do not have any controls built in. Use the ",(0,t.jsx)(n.code,{children:"<bs-slider-controls"})," web component to add navigation\ncontrols to the slider. See the ",(0,t.jsx)(n.a,{href:"/docs/guides/slider-controls",children:"slider controls"})," guide for more information."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-tsx",children:'<script>\n  import \'@boxslider/components\'\n<\/script>\n\n<bs-slider-controls>\n  <bs-carousel class="slider" speed={500} timingFunction="ease-in" cover>\n    \x3c!-- Slides go here --\x3e\n  </bs-carousel>\n</bs-slider-controls>\n'})}),"\n",(0,t.jsx)(n.h2,{id:"styling",children:"Styling"}),"\n",(0,t.jsxs)(n.p,{children:["The components do not include any styles by default. The display, width and height style properties need to be set\nas a minimum for the slider to work. View the ",(0,t.jsx)(n.a,{href:"/docs/guides/styling",children:"styling guide"})," for more information on how to\neffectively style the slider components."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-tsx",children:'<script>\n  import \'@boxslider/components\'\n<\/script>\n\n<bs-carousel class="slider" speed={500} timingFunction="ease-in" cover>\n  <div class="slide">Slide one</div>\n  <div class="slide">Slide two</div>\n  <div class="slide">Slide three</div>\n</bs-carousel>\n\n<style>\n  .slider {\n    display: block;\n    height: 400px;\n    width: 800px;\n  }\n\n  .slide {\n    height: 100%;\n    width: 100%;\n  }\n</style>\n'})}),"\n",(0,t.jsx)(n.h2,{id:"events",children:"Events"}),"\n",(0,t.jsxs)(n.p,{children:["Handlers for ",(0,t.jsx)(n.a,{href:"/docs/getting-started/api#events",children:"slider events"})," can be added in the same way as DOM events with\n",(0,t.jsx)(n.code,{children:"on:eventname"})," attributes."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-tsx",children:'<script>\n  import \'@boxslider/components\'\n\n  let slideNumber = 1\n\n  function handleAfter(event) {\n    slideNumber = event.detail.currentIndex + 1\n  }\n<\/script>\n\n<p>Showing slide {slideNumber}</p>\n\n<bs-carousel\n  class="slider"\n  speed={500}\n  timingFunction="ease-in"\n  cover\n  on:after={handleAfter}>\n  <div class="slide">Slide one</div>\n  <div class="slide">Slide two</div>\n  <div class="slide">Slide three</div>\n</bs-carousel>\n\n<style>\n  .slider {\n    display: block;\n    height: 400px;\n    width: 800px;\n  }\n\n  .slide {\n    height: 100%;\n    width: 100%;\n  }\n</style>\n'})}),"\n",(0,t.jsx)(n.h2,{id:"slider-binding",children:"Slider binding"}),"\n",(0,t.jsxs)(n.p,{children:["To gain access to the BoxSlider instance add a ",(0,t.jsx)(n.code,{children:"this"})," bindiing to the element. Once the component is mounted the\nslider instance is initialised and available as a readonly ",(0,t.jsx)(n.code,{children:"slider"})," property. View the\n",(0,t.jsx)(n.a,{href:"/docs/getting-started/api",children:"API reference"})," for more information on the available methods."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-tsx",children:'<script>\n  import { onMount } from \'svelte\'\n  import \'@boxslider/components\'\n\n  let carousel\n\n  onMount(() => {\n    // BoxSlider instance is available as the slider property on the element\n    console.log(carousel.slider)\n  })\n<\/script>\n\n<bs-carousel class="slider" bind:this={carousel}>\n  <div class="slide">Slide one</div>\n  <div class="slide">Slide two</div>\n  <div class="slide">Slide three</div>\n</bs-carousel>\n\n<style>\n  .slider {\n    display: block;\n    height: 400px;\n    width: 800px;\n  }\n\n  .slide {\n    height: 100%;\n    width: 100%;\n  }\n</style>\n'})})]})}function h(e={}){const{wrapper:n}={...(0,l.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(a,{...e})}):a(e)}},215:(e,n,s)=>{s.d(n,{R:()=>o,x:()=>d});var i=s(2155);const t={},l=i.createContext(t);function o(e){const n=i.useContext(l);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function d(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:o(e.components),i.createElement(l.Provider,{value:n},e.children)}}}]);
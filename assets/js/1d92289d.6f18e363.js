"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[532],{6149:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>d,contentTitle:()=>r,default:()=>p,frontMatter:()=>o,metadata:()=>t,toc:()=>a});const t=JSON.parse('{"id":"guides/vue","title":"Vue","description":"Vue applications can easily integrate the BoxSlider Web Components.","source":"@site/docs/guides/05-vue.md","sourceDirName":"guides","slug":"/guides/vue","permalink":"/slider/docs/guides/vue","draft":false,"unlisted":false,"tags":[],"version":"current","sidebarPosition":5,"frontMatter":{"title":"Vue"},"sidebar":"docsSidebar","previous":{"title":"Svelte","permalink":"/slider/docs/guides/svelte"},"next":{"title":"Slider Controls","permalink":"/slider/docs/guides/slider-controls"}}');var i=s(612),l=s(537);const o={title:"Vue"},r=void 0,d={},a=[{value:"Installation",id:"installation",level:2},{value:"Components",id:"components",level:2},{value:"Styling",id:"styling",level:2},{value:"Events",id:"events",level:2},{value:"Slider binding",id:"slider-binding",level:2}];function c(e){const n={a:"a",code:"code",h2:"h2",p:"p",pre:"pre",...(0,l.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)(n.p,{children:["Vue applications can easily integrate the BoxSlider ",(0,i.jsx)(n.a,{href:"/docs/guides/web-components",children:"Web Components"}),"."]}),"\n",(0,i.jsx)(n.h2,{id:"installation",children:"Installation"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-sh",children:"npm i --save @boxslider/components\n"})}),"\n",(0,i.jsx)(n.h2,{id:"components",children:"Components"}),"\n",(0,i.jsxs)(n.p,{children:["Vue has first class support for web components and the best way to use BoxSlider is to use the web components directly\nin your Vue components. The options for the slider and the effect are passed as props. View the\n",(0,i.jsx)(n.a,{href:"/docs/getting-started/configuration",children:"configuration options"})," for the available options."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-tsx",children:'<script setup>\n  import \'@boxslider/components\'\n<\/script>\n\n<template>\n  <bs-carousel class="slider" :speed="500" timingFunction="ease-in" cover>\n    \x3c!-- Slides go here --\x3e\n  </bs-carousel>\n</template>\n'})}),"\n",(0,i.jsxs)(n.p,{children:["The slider components do not have any controls built in. Use the ",(0,i.jsx)(n.code,{children:"<bs-slider-controls"})," web component to add navigation\ncontrols to the slider. See the ",(0,i.jsx)(n.a,{href:"/docs/guides/slider-controls",children:"slider controls"})," guide for more information."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-tsx",children:'<script setup>\n  import \'@boxslider/components\'\n<\/script>\n\n<template>\n  <bs-slider-controls>\n    <bs-carousel class="slider" :speed="500" timingFunction="ease-in" cover>\n      \x3c!-- Slides go here --\x3e\n    </bs-carousel>\n  </bs-slider-controls>\n</template>\n'})}),"\n",(0,i.jsx)(n.h2,{id:"styling",children:"Styling"}),"\n",(0,i.jsxs)(n.p,{children:["The components do not include any styles by default. The display, width and height style properties need to be set\nas a minimum for the slider to work. View the ",(0,i.jsx)(n.a,{href:"/docs/guides/styling",children:"styling guide"})," for more information on how to\neffectively style the slider components."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-tsx",children:'<script setup>\n  import \'@boxslider/components\'\n<\/script>\n\n<template>\n  <bs-slider-controls>\n    <bs-carousel class="slider" :speed="500" timingFunction="ease-in" cover>\n      \x3c!-- Slides go here --\x3e\n    </bs-carousel>\n  </bs-slider-controls>\n</template>\n\n<style>\n  .slider {\n    display: block;\n    height: 400px;\n    width: 800px;\n  }\n\n  .slide {\n    height: 100%;\n    width: 100%;\n  }\n</style>\n'})}),"\n",(0,i.jsx)(n.h2,{id:"events",children:"Events"}),"\n",(0,i.jsxs)(n.p,{children:["Handlers for ",(0,i.jsx)(n.a,{href:"/docs/getting-started/api#events",children:"slider events"})," can be added in the same way as DOM events with\n",(0,i.jsx)(n.code,{children:"@eventname"})," attributes."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-tsx",children:'<script setup>\n  import \'@boxslider/components\'\n\n  let slideNumber = 1\n\n  function handleAfter(event) {\n    slideNumber = event.detail.currentIndex + 1\n  }\n<\/script>\n\n<template>\n  <p>Showing slide {slideNumber}</p>\n\n  <bs-carousel\n    class="slider"\n    :speed="500"\n    timingFunction="ease-in"\n    cover\n    @after="handleAfter">\n    <div class="slide">Slide one</div>\n    <div class="slide">Slide two</div>\n    <div class="slide">Slide three</div>\n  </bs-carousel>\n</template>\n\n<style>\n  .slider {\n    display: block;\n    height: 400px;\n    width: 800px;\n  }\n\n  .slide {\n    height: 100%;\n    width: 100%;\n  }\n</style>\n'})}),"\n",(0,i.jsx)(n.h2,{id:"slider-binding",children:"Slider binding"}),"\n",(0,i.jsxs)(n.p,{children:["To gain access to the BoxSlider instance add a template ",(0,i.jsx)(n.code,{children:"ref"})," to the element. Once the component is\nmounted the slider instance is initialised and available as a readonly ",(0,i.jsx)(n.code,{children:"slider"})," property. View the\n",(0,i.jsx)(n.a,{href:"/docs/getting-started/api",children:"API reference"})," for more information on the available methods."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-tsx",children:'<script setup>\n  import { ref, onMount } from \'vue\'\n  import \'@boxslider/components\'\n\n  const carousel = ref()\n\n  onMount(() => {\n    // BoxSlider instance is available as the slider property on the element\n    console.log(carousel.value.slider)\n  })\n<\/script>\n\n<template>\n  <bs-carousel class="slider" ref="carousel">\n    <div class="slide">Slide one</div>\n    <div class="slide">Slide two</div>\n    <div class="slide">Slide three</div>\n  </bs-carousel>\n</template>\n\n<style>\n  .slider {\n    display: block;\n    height: 400px;\n    width: 800px;\n  }\n\n  .slide {\n    height: 100%;\n    width: 100%;\n  }\n</style>\n'})})]})}function p(e={}){const{wrapper:n}={...(0,l.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(c,{...e})}):c(e)}},537:(e,n,s)=>{s.d(n,{R:()=>o,x:()=>r});var t=s(4344);const i={},l=t.createContext(i);function o(e){const n=t.useContext(l);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:o(e.components),t.createElement(l.Provider,{value:n},e.children)}}}]);
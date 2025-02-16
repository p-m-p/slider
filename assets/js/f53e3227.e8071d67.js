"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[750],{6290:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>d,contentTitle:()=>l,default:()=>u,frontMatter:()=>r,metadata:()=>t,toc:()=>c});const t=JSON.parse('{"id":"guides/accessibility","title":"Accessibility","description":"The easiest way to make the slider accessible is to use the Slider Controls","source":"@site/docs/guides/08-accessibility.md","sourceDirName":"guides","slug":"/guides/accessibility","permalink":"/slider/docs/guides/accessibility","draft":false,"unlisted":false,"tags":[],"version":"current","sidebarPosition":8,"frontMatter":{"title":"Accessibility"},"sidebar":"docsSidebar","previous":{"title":"Styling","permalink":"/slider/docs/guides/styling"},"next":{"title":"Custom Effect","permalink":"/slider/docs/guides/custom-effect"}}');var o=i(612),s=i(548);const r={title:"Accessibility"},l=void 0,d={},c=[{value:"Reduced motion",id:"reduced-motion",level:2}];function a(e){const n={a:"a",code:"code",h2:"h2",p:"p",pre:"pre",...(0,s.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsxs)(n.p,{children:["The easiest way to make the slider accessible is to use the ",(0,o.jsx)(n.a,{href:"/docs/guides/slider-controls",children:"Slider Controls"}),"\ncomponent with the default controls. The controls implement the\n",(0,o.jsx)(n.a,{href:"https://www.w3.org/WAI/ARIA/apg/patterns/carousel/",children:"WAI-ARIA design pattern"})," for carousels."]}),"\n",(0,o.jsx)(n.p,{children:"If you are using the core JavaScript library directly or building your own control you will need to add\nsome appropriate attributes to the slider and slide elements."}),"\n",(0,o.jsxs)(n.p,{children:["The slider element will automatically be given a ",(0,o.jsx)(n.code,{children:"role"})," of ",(0,o.jsx)(n.code,{children:"region"})," if no other value is set, applied with the\n",(0,o.jsx)(n.code,{children:'aria-live="off"'})," attribute when in the autoScroll state and ",(0,o.jsx)(n.code,{children:'aria-live="polite"'})," when slide\ntransitions are being controlled externally. Each slide is given the ",(0,o.jsx)(n.code,{children:'aria-roledescription="slide"'}),"\nattribute and the ",(0,o.jsx)(n.code,{children:"role"})," of ",(0,o.jsx)(n.code,{children:"group"})," if these area not already set. You will need to add\n",(0,o.jsx)(n.code,{children:'aria-roledescription="carousel"'})," to the container housing the slider and it's controls. An example\nimplementation is shown below."]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-html",children:'<section class="carousel" aria-roledescription="carousel">\n  <div class="slider-controls">\n    <button id="prev-slide" aria-controls="demo-slider">Previous slide</button>\n    <button id="next-slide" aria-controls="demo-slider">Next slide</button>\n    <button id="play" aria-controls="demo-slider">Play</button>\n  </div>\n\n  <div class="slider" id="demo-slider" role="region">\n    <figure class="slide" role="group">\n      <img src="happy-face.jpg" alt="A young boy with a smile on his face" />\n      <figcaption>Happy</figcaption>\n    </figure>\n    <figure class="slide" role="group">\n      <img\n        src="sad-face.jpg"\n        alt="An elderly lady with a sad look on her face" />\n      <figcaption>Sad</figcaption>\n    </figure>\n    <figure class="slide" role="group">\n      <img\n        src="shocked-face.jpg"\n        alt="A man with a look of shock on his face" />\n      <figcaption>Shocked</figcaption>\n    </figure>\n  </div>\n</section>\n\n<script>\n  const slider = new BoxSlider(\n    document.getElementById(\'demo-slider\'),\n    new CarouselSlider(),\n    {\n      autoScroll: false,\n    },\n  )\n\n  document\n    .getElementById(\'prev-slide\')\n    .addEventListener(\'click\', () => slider.prev())\n  // ... other button controls\n<\/script>\n'})}),"\n",(0,o.jsx)(n.h2,{id:"reduced-motion",children:"Reduced motion"}),"\n",(0,o.jsxs)(n.p,{children:["If the user has requested reduced motion in their operating system or browser settings then the ",(0,o.jsx)(n.code,{children:"autoScroll"})," option should be set to ",(0,o.jsx)(n.code,{children:"false"}),"\non page load to prevent the slider from automatically scrolling. The default configuration value for ",(0,o.jsx)(n.code,{children:"autoScroll"})," is determined from the\n",(0,o.jsx)(n.code,{children:"prefers-reduced-motion"})," media query. You may also want to set the ",(0,o.jsx)(n.code,{children:"speed"})," option to ",(0,o.jsx)(n.code,{children:"0"})," to prevent slide transitions from animating."]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-js",children:"const hasReducedMotion = window.matchMedia(\n  '(prefers-reduced-motion: reduce)',\n).matches\n\nconst slider = new BoxSlider(\n  document.getElementById('demo-slider'),\n  new FadeSlider(),\n  {\n    autoScroll: !hasReducedMotion,\n    speed: hasReducedMotion ? 0 : 300,\n  },\n)\n"})})]})}function u(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(a,{...e})}):a(e)}},548:(e,n,i)=>{i.d(n,{R:()=>r,x:()=>l});var t=i(4344);const o={},s=t.createContext(o);function r(e){const n=t.useContext(s);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:r(e.components),t.createElement(s.Provider,{value:n},e.children)}}}]);
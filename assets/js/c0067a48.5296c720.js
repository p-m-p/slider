"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[212],{6277:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>l,contentTitle:()=>a,default:()=>h,frontMatter:()=>t,metadata:()=>d,toc:()=>c});const d=JSON.parse('{"id":"getting-started/api","title":"API","description":"Methods","source":"@site/docs/getting-started/04-api.md","sourceDirName":"getting-started","slug":"/getting-started/api","permalink":"/slider/docs/getting-started/api","draft":false,"unlisted":false,"tags":[],"version":"current","sidebarPosition":4,"frontMatter":{"title":"API"},"sidebar":"docsSidebar","previous":{"title":"Configuration","permalink":"/slider/docs/getting-started/configuration"},"next":{"title":"Carousel","permalink":"/slider/docs/effects/carousel"}}');var i=s(4489),r=s(9725);const t={title:"API"},a=void 0,l={},c=[{value:"Methods",id:"methods",level:2},{value:"<code>skipTo</code>",id:"skipto",level:3},{value:"<code>play</code>",id:"play",level:3},{value:"<code>pause</code>",id:"pause",level:3},{value:"<code>destroy</code>",id:"destroy",level:3},{value:"<code>next</code>",id:"next",level:3},{value:"<code>prev</code>",id:"prev",level:3},{value:"<code>reset</code>",id:"reset",level:3},{value:"<code>addEventListener</code>",id:"addeventlistener",level:3},{value:"<code>removeEventListener</code>",id:"removeeventlistener",level:3},{value:"Events",id:"events",level:2},{value:"<code>init</code>",id:"init",level:3},{value:"<code>before</code>",id:"before",level:3},{value:"<code>after</code>",id:"after",level:3},{value:"<code>play</code>",id:"play-1",level:3},{value:"<code>pause</code>",id:"pause-1",level:3},{value:"<code>reset</code>",id:"reset-1",level:3},{value:"<code>destroy</code>",id:"destroy-1",level:3}];function o(e){const n={code:"code",h2:"h2",h3:"h3",p:"p",pre:"pre",...(0,r.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h2,{id:"methods",children:"Methods"}),"\n",(0,i.jsx)(n.h3,{id:"skipto",children:(0,i.jsx)(n.code,{children:"skipTo"})}),"\n",(0,i.jsx)(n.p,{children:"Shows a slide at the specified index starting from 0. Returns a promise that resolves\nwhen the transition is complete."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-javascript",children:"slider.skipTo(3).then(() => {\n  // show 4th slide\n  // transition complete\n})\n"})}),"\n",(0,i.jsx)(n.h3,{id:"play",children:(0,i.jsx)(n.code,{children:"play"})}),"\n",(0,i.jsx)(n.p,{children:"Start auto scrolling the slides"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-javascript",children:"slider.play()\n"})}),"\n",(0,i.jsx)(n.h3,{id:"pause",children:(0,i.jsx)(n.code,{children:"pause"})}),"\n",(0,i.jsx)(n.p,{children:"Pause an already auto scrolling slider"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-javascript",children:"slider.pause()\n"})}),"\n",(0,i.jsx)(n.h3,{id:"destroy",children:(0,i.jsx)(n.code,{children:"destroy"})}),"\n",(0,i.jsx)(n.p,{children:"Destroys the slider and returns the HTML elements to their original state."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-javascript",children:"slider.destroy()\n"})}),"\n",(0,i.jsx)(n.h3,{id:"next",children:(0,i.jsx)(n.code,{children:"next"})}),"\n",(0,i.jsx)(n.p,{children:"Moves the slider to the next slide. Returns a promise that resolves when the transition\nis complete."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-javascript",children:"slider.next().then(() => {\n  // transition complete\n})\n"})}),"\n",(0,i.jsx)(n.h3,{id:"prev",children:(0,i.jsx)(n.code,{children:"prev"})}),"\n",(0,i.jsx)(n.p,{children:"Moves the slider to the previous slide. Returns a promise that resolves when the\ntransition is complete."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-javascript",children:"slider.prev().then(() => {\n  // transition complete\n})\n"})}),"\n",(0,i.jsx)(n.h3,{id:"reset",children:(0,i.jsx)(n.code,{children:"reset"})}),"\n",(0,i.jsx)(n.p,{children:"Re-initialises the slider with updated options. An updated effect may also be\npassed as the second parameter."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-javascript",children:"slider.reset(options, effect)\n"})}),"\n",(0,i.jsx)(n.h3,{id:"addeventlistener",children:(0,i.jsx)(n.code,{children:"addEventListener"})}),"\n",(0,i.jsx)(n.p,{children:"Adds a listener for the specified event. See the event documentation for the available\nevents."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-javascript",children:"const afterTransitionListener = () => {\n  // Take some action when the event occurs\n}\n\nslider.addEventListener('after', afterTransitionListener)\n"})}),"\n",(0,i.jsx)(n.h3,{id:"removeeventlistener",children:(0,i.jsx)(n.code,{children:"removeEventListener"})}),"\n",(0,i.jsx)(n.p,{children:"Removes the listener for the specified event."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-javascript",children:"slider.removeEventListener('after', afterTransitionListener)\n"})}),"\n",(0,i.jsx)(n.h2,{id:"events",children:"Events"}),"\n",(0,i.jsx)(n.h3,{id:"init",children:(0,i.jsx)(n.code,{children:"init"})}),"\n",(0,i.jsx)(n.p,{children:"Fires when a slider is initialised."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-javascript",children:"slider.addEventListener('init', () => {\n  // No event data\n})\n"})}),"\n",(0,i.jsx)(n.h3,{id:"before",children:(0,i.jsx)(n.code,{children:"before"})}),"\n",(0,i.jsx)(n.p,{children:"Fires before each slide transition starts. The current and next indexes are supplied in the\nevent data as well as the transition speed."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-javascript",children:"slider.addEventListener('before', (data) => {\n  // data: {\n  //   currentIndex: number\n  //   nextIndex: number\n  //   speed: number\n  // }\n})\n"})}),"\n",(0,i.jsx)(n.h3,{id:"after",children:(0,i.jsx)(n.code,{children:"after"})}),"\n",(0,i.jsx)(n.p,{children:"Fires after each slide transition is complete. The active index is supplied in the event\ndata"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-javascript",children:"slider.addEventListener('after', (data) => {\n  // data: {\n  //   currentIndex: number\n  //   speed: number\n  // }\n})\n"})}),"\n",(0,i.jsx)(n.h3,{id:"play-1",children:(0,i.jsx)(n.code,{children:"play"})}),"\n",(0,i.jsx)(n.p,{children:"Fires when the slider is put into play mode."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-javascript",children:"slider.addEventListener('play', (data) => {\n  // data: {\n  //   currentIndex: number\n  //   speed: number\n  // }\n})\n"})}),"\n",(0,i.jsx)(n.h3,{id:"pause-1",children:(0,i.jsx)(n.code,{children:"pause"})}),"\n",(0,i.jsxs)(n.p,{children:["Fires when an ",(0,i.jsx)(n.code,{children:"autoScroll"}),"'ing slider is paused."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-javascript",children:"slider.addEventListener('pause', (data) => {\n  // data: {\n  //   currentIndex: number\n  //   speed: number\n  // }\n})\n"})}),"\n",(0,i.jsx)(n.h3,{id:"reset-1",children:(0,i.jsx)(n.code,{children:"reset"})}),"\n",(0,i.jsxs)(n.p,{children:["Fires when a slider is reset. This can happen when the ",(0,i.jsx)(n.code,{children:"reset"})," method is called or\nwhen the slider element is resized."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-javascript",children:"slider.addEventListener('reset', () => {\n  // No event data\n})\n"})}),"\n",(0,i.jsx)(n.h3,{id:"destroy-1",children:(0,i.jsx)(n.code,{children:"destroy"})}),"\n",(0,i.jsx)(n.p,{children:"Fires when a slider is destroyed."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-javascript",children:"slider.addEventListener('destroy', () => {\n  // No event data\n})\n"})})]})}function h(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(o,{...e})}):o(e)}},9725:(e,n,s)=>{s.d(n,{R:()=>t,x:()=>a});var d=s(4349);const i={},r=d.createContext(i);function t(e){const n=d.useContext(r);return d.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:t(e.components),d.createElement(r.Provider,{value:n},e.children)}}}]);
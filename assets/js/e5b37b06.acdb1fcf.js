"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[981],{964:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>l,contentTitle:()=>r,default:()=>h,frontMatter:()=>d,metadata:()=>o,toc:()=>c});var s=i(5723),t=i(8759);const d={title:"React"},r=void 0,o={id:"guides/react",title:"React",description:"BoxSlider React components are a thin wrapper around the Web Components for each",source:"@site/docs/guides/01-react.md",sourceDirName:"guides",slug:"/guides/react",permalink:"/slider/docs/guides/react",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:1,frontMatter:{title:"React"},sidebar:"docsSidebar",previous:{title:"Tile",permalink:"/slider/docs/effects/tile"},next:{title:"Web Components",permalink:"/slider/docs/guides/web-components"}},l={},c=[{value:"Installation",id:"installation",level:2},{value:"Components",id:"components",level:2},{value:"Styling",id:"styling",level:2},{value:"Events",id:"events",level:2},{value:"<code>sliderRef</code> prop",id:"sliderref-prop",level:2}];function a(e){const n={a:"a",code:"code",h2:"h2",p:"p",pre:"pre",...(0,t.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(n.p,{children:["BoxSlider React components are a thin wrapper around the ",(0,s.jsx)(n.a,{href:"/docs/guides/web-components",children:"Web Components"})," for each\nslide effect and the slider controls."]}),"\n",(0,s.jsx)(n.h2,{id:"installation",children:"Installation"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sh",children:"npm i --save @boxslider/react\n"})}),"\n",(0,s.jsx)(n.h2,{id:"components",children:"Components"}),"\n",(0,s.jsxs)(n.p,{children:["Each slide effect has a matching React component. The options for the slider and the effect are passed as props.\nView the ",(0,s.jsx)(n.a,{href:"/docs/getting-started/configuration",children:"configuration options"})," for the available options."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-tsx",children:'// Example prop types\n<CarouselSlider speed={500} timingFunction="ease-in" cover>{children}</CarouselSlider>\n<CubeSlider />\n<FadeSlider />\n<TileSlider />\n'})}),"\n",(0,s.jsxs)(n.p,{children:["The slider components do not have any controls built in. Use the ",(0,s.jsx)(n.code,{children:"SliderControls"})," component to add navigation\ncontrols to the slider. See the ",(0,s.jsx)(n.a,{href:"/docs/guides/slider-controls",children:"slider controls"})," guide for more information."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-tsx",children:"<SliderControls>\n  <CarouselSlider>\n    <div>Slide one</div>\n    <div>Slide two</div>\n    <div>Slide three</div>\n  </CarouselSlider>\n</SliderControls>\n"})}),"\n",(0,s.jsx)(n.h2,{id:"styling",children:"Styling"}),"\n",(0,s.jsxs)(n.p,{children:["The components do not include any styles by default. The display, width and height style properties need to be set\nas a minimum for the slider to work. View the ",(0,s.jsx)(n.a,{href:"/docs/guides/styling",children:"styling guide"})," for more information on how to\neffectively style the slider components."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-tsx",children:"const sliderStyles = {\n  display: 'block',\n  height: '400px',\n  width: '800px'\n}\n\nconst slideStyles = {\n  height: '100%',\n  width: '100%'\n}\n\n<CarouselSlider style={sliderStyles}>\n  <div style={slideStyles}>Slide 1</div>\n  <div style={slideStyles}>Slide 2</div>\n  <div style={slideStyles}>Slide 3</div>\n</CarouselSlider>\n"})}),"\n",(0,s.jsx)(n.h2,{id:"events",children:"Events"}),"\n",(0,s.jsxs)(n.p,{children:["Handlers for ",(0,s.jsx)(n.a,{href:"/docs/getting-started/api#events",children:"slider events"})," can be provided in props with the\nnaming convention ",(0,s.jsx)(n.code,{children:"on<EventName>"}),"."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-tsx",children:"function MySlider({ children }) {\n  const handlePause = () => console.log('Slider paused')\n\n  return <FadeSlider onPause={handlePause}>{children}</FadeSlider>\n}\n"})}),"\n",(0,s.jsxs)(n.h2,{id:"sliderref-prop",children:[(0,s.jsx)(n.code,{children:"sliderRef"})," prop"]}),"\n",(0,s.jsxs)(n.p,{children:["To gain access to the BoxSlider instance pass a ref to the ",(0,s.jsx)(n.code,{children:"sliderRef"})," props. The current value\nof the ref will be set once the component is mounted and the slider instance is initialised. View\nthe ",(0,s.jsx)(n.a,{href:"/docs/getting-started/api",children:"API reference"})," for more information on the available methods."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-tsx",children:"function Slider() {\n  const sliderRef = useRef(null)\n\n  return (\n    <div>\n      <CarouselSlider sliderRef={sliderRef}>\n        <div>Slide one</div>\n        <div>Slide two</div>\n        <div>Slide three</div>\n        <div>Slide four</div>\n        <div>Slide five</div>\n      </CarouselSlider>\n      <button onClick={() => sliderRef.current?.prev()}>Previous slide</button>\n      <button onClick={() => sliderRef.current?.next()}>Next slide</button>\n    </div>\n  )\n}\n"})})]})}function h(e={}){const{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(a,{...e})}):a(e)}},8759:(e,n,i)=>{i.d(n,{R:()=>r,x:()=>o});var s=i(2155);const t={},d=s.createContext(t);function r(e){const n=s.useContext(d);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:r(e.components),s.createElement(d.Provider,{value:n},e.children)}}}]);
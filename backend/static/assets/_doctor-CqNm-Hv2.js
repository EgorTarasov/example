import{u as Mt,c as ge,o as Te,r as j,j as a,T as It,b as _t,d as q,e as Me,f as Ht,g as Ie,h as Lt,m as Bt,i as Ft,A as Se,k as zt,D as Ut,l as Vt,B as he,n as Wt,p as Yt,q as qt,s as Xt,I as Gt,t as Jt,J as Kt,v as Qt,R as o,O as Zt,C as en,w as tn,x as nn,y as an,z as rn,E as on,F as sn,G as ln,L as un,H as cn}from"./index-D_dvgmQt.js";import{C as dn,P as fn,a as mn,b as pn,T as hn,c as gn,d as Xe,e as wn,f as vn,g as yn,S as xn}from"./table-Bzt5LoIH.js";function bn(e){return Mt({select:n=>n.location})}/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sn=ge("CircleAlert",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Tn=ge("Copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ze=ge("LogOut",[["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}],["polyline",{points:"16 17 21 12 16 7",key:"1gabdz"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12",key:"1uyos4"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rn=ge("Menu",[["line",{x1:"4",x2:"20",y1:"12",y2:"12",key:"1e0a9i"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6",key:"1owob3"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18",key:"yk5zj1"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Dn=ge("Upload",[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"17 8 12 3 7 8",key:"t8dd8p"}],["line",{x1:"12",x2:"12",y1:"3",y2:"15",key:"widbto"}]]),En=Te(e=>{const n=j.useRef(),[t,r]=j.useState(!1),i=s=>{s.stopPropagation(),navigator.clipboard.writeText(e.text),r(!0),clearTimeout(n.current),n.current=+setTimeout(()=>r(!1),1500)};return a.jsxs(It,{children:[a.jsx(_t,{className:q(Me({variant:"ghost",size:"icon"}),"[&_svg]:size-3",e.className),onClick:i,children:t?a.jsx(dn,{}):a.jsx(Tn,{})}),a.jsx(Ht,{children:"Скопировать"})]})}),Cn=Te(e=>{const n=Ie(),{id:t}=Lt({strict:!1});return a.jsxs("li",{onClick:()=>n({to:"/patient/$id",params:{id:e.item.id.toString()}}),className:q("flex flex-col relative py-3 px-6 cursor-pointer border-b",t===e.item.id.toString()&&"bg-slate-50"),children:[a.jsxs("div",{className:"flex justify-between",children:[a.jsxs("div",{children:[a.jsxs("small",{className:"text-slate-500 font-medium block",children:["EMIAS: ",e.item.emias_id," ",a.jsx(En,{text:e.item.emias_id,className:"size-5"})]}),a.jsxs("p",{className:"text-lg font-medium",children:[e.item.last_name," ",e.item.first_name," ",e.item.middle_name]})]}),a.jsx(fn,{data:e.item.risk_of_disease})]}),a.jsx(mn,{data:e.item.risk_of_disease,text:e.item.alert}),a.jsx("p",{className:"text-slate-800 text-sm pt-1 pb-3",children:e.item.diagnosis}),a.jsx("a",{href:e.item.telegram_link,target:"_blank",onClick:r=>r.stopPropagation(),className:q(Me({variant:"outline",size:"sm"}),"w-fit bg-card"),children:"Зарегистрировать пользователя"})]})});class jn{patients=[];loading=!1;constructor(){Bt(this),Ft(()=>{Se.auth.state==="anonymous"?this.patients=[]:Se.auth.state==="authenticated"&&this.init()})}async init(){this.loading=!0;const[n]=await Promise.all([pn.get()]);this.patients=n,this.loading=!1}}const et=new jn,On=zt("relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",{variants:{variant:{default:"bg-background text-foreground",destructive:"border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive"}},defaultVariants:{variant:"default"}}),tt=j.forwardRef(({className:e,variant:n,...t},r)=>a.jsx("div",{ref:r,role:"alert",className:q(On({variant:n}),e),...t}));tt.displayName="Alert";const nt=j.forwardRef(({className:e,...n},t)=>a.jsx("h5",{ref:t,className:q("mb-1 font-medium leading-none tracking-tight",e),...n}));nt.displayName="AlertTitle";const at=j.forwardRef(({className:e,...n},t)=>a.jsx("div",{ref:t,className:q("text-sm [&_p]:leading-relaxed",e),...n}));at.displayName="AlertDescription";const Nn=()=>{const[e,n]=j.useState(!1),[t,r]=j.useState([]),[i,s]=j.useState(null),[p,f]=j.useState(null),y=j.useRef(null),R=u=>{const c=u.target.files?.[0];if(console.log({file:c}),c){s(c);const A=new FileReader;A.onload=k=>{const w=(k.target?.result).split(`
`).map(P=>P.split(","));r(w.slice(0,5)),f(null)},A.onerror=()=>{f("Error reading file")},A.readAsText(c)}};j.useEffect(()=>{e||(s(null),r([]),f(null),y.current&&(y.current.value=""))},[e]);const v=()=>{if(console.log("Uploading data:",t),n(!1),r([]),y.current&&(y.current.value=""),!i)return;const u=new FormData;u.append("document",i),Kt.promise(fetch("/api/external/upload",{method:"POST",body:u,headers:{Authorization:`Bearer ${Qt.get()}`}}),{loading:"Загружаем данные...",success:"Данные загружены",error:"Ошибка загрузки данных",finally:()=>et.init()})};return a.jsxs(Ut,{open:e,onOpenChange:n,children:[a.jsx(Vt,{asChild:!0,children:a.jsxs(he,{className:"w-full py-6 md:py-4",children:[a.jsx(Dn,{className:"mr-2 h-4 w-4"}),"Добавить пациента"]})}),a.jsxs(Wt,{className:"sm:max-w-[625px]",children:[a.jsxs(Yt,{children:[a.jsx(qt,{children:"Добавить пациента"}),a.jsx(Xt,{children:"Загрузите CSV файл, содержащий данные пациента. Файл должен иметь заголовки в первой строке."})]}),a.jsxs("div",{className:"grid gap-4 py-4",children:[a.jsx(Gt,{id:"csv-file",type:"file",accept:".csv",onChange:R,ref:y}),p&&a.jsxs(tt,{variant:"destructive",children:[a.jsx(Sn,{className:"h-4 w-4"}),a.jsx(nt,{children:"Error"}),a.jsx(at,{children:p})]}),t.length>0&&a.jsx("div",{className:"overflow-x-auto",children:a.jsxs(hn,{children:[a.jsx(gn,{children:a.jsx(Xe,{children:t[0].map((u,c)=>a.jsx(wn,{children:u},c))})}),a.jsx(vn,{children:t.slice(1).map((u,c)=>a.jsx(Xe,{children:u.map((A,k)=>a.jsx(yn,{children:A},k))},c))})]})})]}),a.jsxs(Jt,{children:[a.jsx(he,{variant:"outline",onClick:()=>n(!1),children:"Отмена"}),a.jsx(he,{onClick:v,disabled:t.length===0,children:"Добавить"})]})]})]})};function An(e){if(typeof document>"u")return;let n=document.head||document.getElementsByTagName("head")[0],t=document.createElement("style");t.type="text/css",n.appendChild(t),t.styleSheet?t.styleSheet.cssText=e:t.appendChild(document.createTextNode(e))}const rt=o.createContext({drawerRef:{current:null},overlayRef:{current:null},onPress:()=>{},onRelease:()=>{},onDrag:()=>{},onNestedDrag:()=>{},onNestedOpenChange:()=>{},onNestedRelease:()=>{},openProp:void 0,dismissible:!1,isOpen:!1,isDragging:!1,keyboardIsOpen:{current:!1},snapPointsOffset:null,snapPoints:null,handleOnly:!1,modal:!1,shouldFade:!1,activeSnapPoint:null,onOpenChange:()=>{},setActiveSnapPoint:()=>{},closeDrawer:()=>{},direction:"bottom",shouldAnimate:{current:!0},shouldScaleBackground:!1,setBackgroundColorOnScale:!0,noBodyStyles:!1,container:null,autoFocus:!1}),se=()=>{const e=o.useContext(rt);if(!e)throw new Error("useDrawerContext must be used within a Drawer.Root");return e};An(`[data-vaul-drawer]{touch-action:none;will-change:transform;transition:transform .5s cubic-bezier(.32, .72, 0, 1);animation-duration:.5s;animation-timing-function:cubic-bezier(0.32,0.72,0,1)}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=bottom][data-state=open]{animation-name:slideFromBottom}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=bottom][data-state=closed]{animation-name:slideToBottom}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=top][data-state=open]{animation-name:slideFromTop}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=top][data-state=closed]{animation-name:slideToTop}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=left][data-state=open]{animation-name:slideFromLeft}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=left][data-state=closed]{animation-name:slideToLeft}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=right][data-state=open]{animation-name:slideFromRight}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=right][data-state=closed]{animation-name:slideToRight}[data-vaul-drawer][data-vaul-snap-points=true][data-vaul-drawer-direction=bottom]{transform:translate3d(0,var(--initial-transform,100%),0)}[data-vaul-drawer][data-vaul-snap-points=true][data-vaul-drawer-direction=top]{transform:translate3d(0,calc(var(--initial-transform,100%) * -1),0)}[data-vaul-drawer][data-vaul-snap-points=true][data-vaul-drawer-direction=left]{transform:translate3d(calc(var(--initial-transform,100%) * -1),0,0)}[data-vaul-drawer][data-vaul-snap-points=true][data-vaul-drawer-direction=right]{transform:translate3d(var(--initial-transform,100%),0,0)}[data-vaul-drawer][data-vaul-delayed-snap-points=true][data-vaul-drawer-direction=top]{transform:translate3d(0,var(--snap-point-height,0),0)}[data-vaul-drawer][data-vaul-delayed-snap-points=true][data-vaul-drawer-direction=bottom]{transform:translate3d(0,var(--snap-point-height,0),0)}[data-vaul-drawer][data-vaul-delayed-snap-points=true][data-vaul-drawer-direction=left]{transform:translate3d(var(--snap-point-height,0),0,0)}[data-vaul-drawer][data-vaul-delayed-snap-points=true][data-vaul-drawer-direction=right]{transform:translate3d(var(--snap-point-height,0),0,0)}[data-vaul-overlay][data-vaul-snap-points=false]{animation-duration:.5s;animation-timing-function:cubic-bezier(0.32,0.72,0,1)}[data-vaul-overlay][data-vaul-snap-points=false][data-state=open]{animation-name:fadeIn}[data-vaul-overlay][data-state=closed]{animation-name:fadeOut}[data-vaul-animate=false]{animation:none!important}[data-vaul-overlay][data-vaul-snap-points=true]{opacity:0;transition:opacity .5s cubic-bezier(.32, .72, 0, 1)}[data-vaul-overlay][data-vaul-snap-points=true]{opacity:1}[data-vaul-drawer]:not([data-vaul-custom-container=true])::after{content:'';position:absolute;background:inherit;background-color:inherit}[data-vaul-drawer][data-vaul-drawer-direction=top]::after{top:initial;bottom:100%;left:0;right:0;height:200%}[data-vaul-drawer][data-vaul-drawer-direction=bottom]::after{top:100%;bottom:initial;left:0;right:0;height:200%}[data-vaul-drawer][data-vaul-drawer-direction=left]::after{left:initial;right:100%;top:0;bottom:0;width:200%}[data-vaul-drawer][data-vaul-drawer-direction=right]::after{left:100%;right:initial;top:0;bottom:0;width:200%}[data-vaul-overlay][data-vaul-snap-points=true]:not([data-vaul-snap-points-overlay=true]):not(
[data-state=closed]
){opacity:0}[data-vaul-overlay][data-vaul-snap-points-overlay=true]{opacity:1}[data-vaul-handle]{display:block;position:relative;opacity:.7;background:#e2e2e4;margin-left:auto;margin-right:auto;height:5px;width:32px;border-radius:1rem;touch-action:pan-y}[data-vaul-handle]:active,[data-vaul-handle]:hover{opacity:1}[data-vaul-handle-hitarea]{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:max(100%,2.75rem);height:max(100%,2.75rem);touch-action:inherit}@media (hover:hover) and (pointer:fine){[data-vaul-drawer]{user-select:none}}@media (pointer:fine){[data-vaul-handle-hitarea]:{width:100%;height:100%}}@keyframes fadeIn{from{opacity:0}to{opacity:1}}@keyframes fadeOut{to{opacity:0}}@keyframes slideFromBottom{from{transform:translate3d(0,var(--initial-transform,100%),0)}to{transform:translate3d(0,0,0)}}@keyframes slideToBottom{to{transform:translate3d(0,var(--initial-transform,100%),0)}}@keyframes slideFromTop{from{transform:translate3d(0,calc(var(--initial-transform,100%) * -1),0)}to{transform:translate3d(0,0,0)}}@keyframes slideToTop{to{transform:translate3d(0,calc(var(--initial-transform,100%) * -1),0)}}@keyframes slideFromLeft{from{transform:translate3d(calc(var(--initial-transform,100%) * -1),0,0)}to{transform:translate3d(0,0,0)}}@keyframes slideToLeft{to{transform:translate3d(calc(var(--initial-transform,100%) * -1),0,0)}}@keyframes slideFromRight{from{transform:translate3d(var(--initial-transform,100%),0,0)}to{transform:translate3d(0,0,0)}}@keyframes slideToRight{to{transform:translate3d(var(--initial-transform,100%),0,0)}}`);function $n(){const e=navigator.userAgent;return typeof window<"u"&&(/Firefox/.test(e)&&/Mobile/.test(e)||/FxiOS/.test(e))}function kn(){return _e(/^Mac/)}function Pn(){return _e(/^iPhone/)}function Ge(){return/^((?!chrome|android).)*safari/i.test(navigator.userAgent)}function Mn(){return _e(/^iPad/)||kn()&&navigator.maxTouchPoints>1}function ot(){return Pn()||Mn()}function _e(e){return typeof window<"u"&&window.navigator!=null?e.test(window.navigator.platform):void 0}const In=24,_n=typeof window<"u"?j.useLayoutEffect:j.useEffect;function Je(...e){return(...n)=>{for(let t of e)typeof t=="function"&&t(...n)}}const Oe=typeof document<"u"&&window.visualViewport;function Ke(e){let n=window.getComputedStyle(e);return/(auto|scroll)/.test(n.overflow+n.overflowX+n.overflowY)}function it(e){for(Ke(e)&&(e=e.parentElement);e&&!Ke(e);)e=e.parentElement;return e||document.scrollingElement||document.documentElement}const Hn=new Set(["checkbox","radio","range","color","file","image","button","submit","reset"]);let xe=0,Ne;function Ln(e={}){let{isDisabled:n}=e;_n(()=>{if(!n)return xe++,xe===1&&ot()&&(Ne=Bn()),()=>{xe--,xe===0&&Ne?.()}},[n])}function Bn(){let e,n=0,t=u=>{e=it(u.target),!(e===document.documentElement&&e===document.body)&&(n=u.changedTouches[0].pageY)},r=u=>{if(!e||e===document.documentElement||e===document.body){u.preventDefault();return}let c=u.changedTouches[0].pageY,A=e.scrollTop,k=e.scrollHeight-e.clientHeight;k!==0&&((A<=0&&c>n||A>=k&&c<n)&&u.preventDefault(),n=c)},i=u=>{let c=u.target;ke(c)&&c!==document.activeElement&&(u.preventDefault(),c.style.transform="translateY(-2000px)",c.focus(),requestAnimationFrame(()=>{c.style.transform=""}))},s=u=>{let c=u.target;ke(c)&&(c.style.transform="translateY(-2000px)",requestAnimationFrame(()=>{c.style.transform="",Oe&&(Oe.height<window.innerHeight?requestAnimationFrame(()=>{Qe(c)}):Oe.addEventListener("resize",()=>Qe(c),{once:!0}))}))},p=()=>{window.scrollTo(0,0)},f=window.pageXOffset,y=window.pageYOffset,R=Je(Fn(document.documentElement,"paddingRight",`${window.innerWidth-document.documentElement.clientWidth}px`));window.scrollTo(0,0);let v=Je(me(document,"touchstart",t,{passive:!1,capture:!0}),me(document,"touchmove",r,{passive:!1,capture:!0}),me(document,"touchend",i,{passive:!1,capture:!0}),me(document,"focus",s,!0),me(window,"scroll",p));return()=>{R(),v(),window.scrollTo(f,y)}}function Fn(e,n,t){let r=e.style[n];return e.style[n]=t,()=>{e.style[n]=r}}function me(e,n,t,r){return e.addEventListener(n,t,r),()=>{e.removeEventListener(n,t,r)}}function Qe(e){let n=document.scrollingElement||document.documentElement;for(;e&&e!==n;){let t=it(e);if(t!==document.documentElement&&t!==document.body&&t!==e){let r=t.getBoundingClientRect().top,i=e.getBoundingClientRect().top,s=e.getBoundingClientRect().bottom;const p=t.getBoundingClientRect().bottom+In;s>p&&(t.scrollTop+=i-r)}e=t.parentElement}}function ke(e){return e instanceof HTMLInputElement&&!Hn.has(e.type)||e instanceof HTMLTextAreaElement||e instanceof HTMLElement&&e.isContentEditable}function zn(e,n){typeof e=="function"?e(n):e!=null&&(e.current=n)}function Un(...e){return n=>e.forEach(t=>zn(t,n))}function st(...e){return j.useCallback(Un(...e),e)}const lt=new WeakMap;function $(e,n,t=!1){if(!e||!(e instanceof HTMLElement))return;let r={};Object.entries(n).forEach(([i,s])=>{if(i.startsWith("--")){e.style.setProperty(i,s);return}r[i]=e.style[i],e.style[i]=s}),!t&&lt.set(e,r)}function Vn(e,n){if(!e||!(e instanceof HTMLElement))return;let t=lt.get(e);t&&(e.style[n]=t[n])}const N=e=>{switch(e){case"top":case"bottom":return!0;case"left":case"right":return!1;default:return e}};function be(e,n){if(!e)return null;const t=window.getComputedStyle(e),r=t.transform||t.webkitTransform||t.mozTransform;let i=r.match(/^matrix3d\((.+)\)$/);return i?parseFloat(i[1].split(", ")[N(n)?13:12]):(i=r.match(/^matrix\((.+)\)$/),i?parseFloat(i[1].split(", ")[N(n)?5:4]):null)}function Wn(e){return 8*(Math.log(e+1)-2)}function Ae(e,n){if(!e)return()=>{};const t=e.style.cssText;return Object.assign(e.style,n),()=>{e.style.cssText=t}}function Yn(...e){return(...n)=>{for(const t of e)typeof t=="function"&&t(...n)}}const C={DURATION:.5,EASE:[.32,.72,0,1]},ut=.4,qn=.25,Xn=100,ct=8,ae=16,Pe=26,$e="vaul-dragging";function dt(e){const n=o.useRef(e);return o.useEffect(()=>{n.current=e}),o.useMemo(()=>(...t)=>n.current==null?void 0:n.current.call(n,...t),[])}function Gn({defaultProp:e,onChange:n}){const t=o.useState(e),[r]=t,i=o.useRef(r),s=dt(n);return o.useEffect(()=>{i.current!==r&&(s(r),i.current=r)},[r,i,s]),t}function ft({prop:e,defaultProp:n,onChange:t=()=>{}}){const[r,i]=Gn({defaultProp:n,onChange:t}),s=e!==void 0,p=s?e:r,f=dt(t),y=o.useCallback(R=>{if(s){const u=typeof R=="function"?R(e):R;u!==e&&f(u)}else i(R)},[s,e,i,f]);return[p,y]}function Jn({activeSnapPointProp:e,setActiveSnapPointProp:n,snapPoints:t,drawerRef:r,overlayRef:i,fadeFromIndex:s,onSnapPointChange:p,direction:f="bottom",container:y,snapToSequentialPoint:R}){const[v,u]=ft({prop:e,defaultProp:t?.[0],onChange:n}),[c,A]=o.useState(typeof window<"u"?{innerWidth:window.innerWidth,innerHeight:window.innerHeight}:void 0);o.useEffect(()=>{function m(){A({innerWidth:window.innerWidth,innerHeight:window.innerHeight})}return window.addEventListener("resize",m),()=>window.removeEventListener("resize",m)},[]);const k=o.useMemo(()=>v===t?.[t.length-1]||null,[t,v]),E=o.useMemo(()=>{var m;return(m=t?.findIndex(S=>S===v))!=null?m:null},[t,v]),F=t&&t.length>0&&(s||s===0)&&!Number.isNaN(s)&&t[s]===v||!t,w=o.useMemo(()=>{const m=y?{width:y.getBoundingClientRect().width,height:y.getBoundingClientRect().height}:typeof window<"u"?{width:window.innerWidth,height:window.innerHeight}:{width:0,height:0};var S;return(S=t?.map(b=>{const H=typeof b=="string";let I=0;if(H&&(I=parseInt(b,10)),N(f)){const d=H?I:c?b*m.height:0;return c?f==="bottom"?m.height-d:-m.height+d:d}const V=H?I:c?b*m.width:0;return c?f==="right"?m.width-V:-m.width+V:V}))!=null?S:[]},[t,c,y]),P=o.useMemo(()=>E!==null?w?.[E]:null,[w,E]),M=o.useCallback(m=>{var S;const b=(S=w?.findIndex(H=>H===m))!=null?S:null;p(b),$(r.current,{transition:`transform ${C.DURATION}s cubic-bezier(${C.EASE.join(",")})`,transform:N(f)?`translate3d(0, ${m}px, 0)`:`translate3d(${m}px, 0, 0)`}),w&&b!==w.length-1&&s!==void 0&&b!==s&&b<s?$(i.current,{transition:`opacity ${C.DURATION}s cubic-bezier(${C.EASE.join(",")})`,opacity:"0"}):$(i.current,{transition:`opacity ${C.DURATION}s cubic-bezier(${C.EASE.join(",")})`,opacity:"1"}),u(t?.[Math.max(b,0)])},[r.current,t,w,s,i,u]);o.useEffect(()=>{if(v||e){var m;const S=(m=t?.findIndex(b=>b===e||b===v))!=null?m:-1;w&&S!==-1&&typeof w[S]=="number"&&M(w[S])}},[v,e,t,w,M]);function h({draggedDistance:m,closeDrawer:S,velocity:b,dismissible:H}){if(s===void 0)return;const I=f==="bottom"||f==="right"?(P??0)-m:(P??0)+m,V=E===s-1,d=E===0,U=m>0;if(V&&$(i.current,{transition:`opacity ${C.DURATION}s cubic-bezier(${C.EASE.join(",")})`}),!R&&b>2&&!U){H?S():M(w[0]);return}if(!R&&b>2&&U&&w&&t){M(w[t.length-1]);return}const L=w?.reduce((_,K)=>typeof _!="number"||typeof K!="number"?_:Math.abs(K-I)<Math.abs(_-I)?K:_),W=N(f)?window.innerHeight:window.innerWidth;if(b>ut&&Math.abs(m)<W*.4){const _=U?1:-1;if(_>0&&k&&t){M(w[t.length-1]);return}if(d&&_<0&&H&&S(),E===null)return;M(w[E+_]);return}M(L)}function X({draggedDistance:m}){if(P===null)return;const S=f==="bottom"||f==="right"?P-m:P+m;(f==="bottom"||f==="right")&&S<w[w.length-1]||(f==="top"||f==="left")&&S>w[w.length-1]||$(r.current,{transform:N(f)?`translate3d(0, ${S}px, 0)`:`translate3d(${S}px, 0, 0)`})}function te(m,S){if(!t||typeof E!="number"||!w||s===void 0)return null;const b=E===s-1;if(E>=s&&S)return 0;if(b&&!S)return 1;if(!F&&!b)return null;const I=b?E+1:E-1,V=b?w[I]-w[I-1]:w[I+1]-w[I],d=m/Math.abs(V);return b?1-d:d}return{isLastSnapPoint:k,activeSnapPoint:v,shouldFade:F,getPercentageDragged:te,setActiveSnapPoint:u,activeSnapPointIndex:E,onRelease:h,onDrag:X,snapPointsOffset:w}}const Kn=()=>()=>{};function Qn(){const{direction:e,isOpen:n,shouldScaleBackground:t,setBackgroundColorOnScale:r,noBodyStyles:i}=se(),s=o.useRef(null),p=j.useMemo(()=>document.body.style.backgroundColor,[]);function f(){return(window.innerWidth-Pe)/window.innerWidth}o.useEffect(()=>{if(n&&t){s.current&&clearTimeout(s.current);const y=document.querySelector("[data-vaul-drawer-wrapper]")||document.querySelector("[vaul-drawer-wrapper]");if(!y)return;Yn(r&&!i?Ae(document.body,{background:"black"}):Kn,Ae(y,{transformOrigin:N(e)?"top":"left",transitionProperty:"transform, border-radius",transitionDuration:`${C.DURATION}s`,transitionTimingFunction:`cubic-bezier(${C.EASE.join(",")})`}));const R=Ae(y,{borderRadius:`${ct}px`,overflow:"hidden",...N(e)?{transform:`scale(${f()}) translate3d(0, calc(env(safe-area-inset-top) + 14px), 0)`}:{transform:`scale(${f()}) translate3d(calc(env(safe-area-inset-top) + 14px), 0, 0)`}});return()=>{R(),s.current=window.setTimeout(()=>{p?document.body.style.background=p:document.body.style.removeProperty("background")},C.DURATION*1e3)}}},[n,t,p])}let pe=null;function Zn({isOpen:e,modal:n,nested:t,hasBeenOpened:r,preventScrollRestoration:i,noBodyStyles:s}){const[p,f]=o.useState(()=>typeof window<"u"?window.location.href:""),y=o.useRef(0),R=o.useCallback(()=>{if(Ge()&&pe===null&&e&&!s){pe={position:document.body.style.position,top:document.body.style.top,left:document.body.style.left,height:document.body.style.height,right:"unset"};const{scrollX:u,innerHeight:c}=window;document.body.style.setProperty("position","fixed","important"),Object.assign(document.body.style,{top:`${-y.current}px`,left:`${-u}px`,right:"0px",height:"auto"}),window.setTimeout(()=>window.requestAnimationFrame(()=>{const A=c-window.innerHeight;A&&y.current>=c&&(document.body.style.top=`${-(y.current+A)}px`)}),300)}},[e]),v=o.useCallback(()=>{if(Ge()&&pe!==null&&!s){const u=-parseInt(document.body.style.top,10),c=-parseInt(document.body.style.left,10);Object.assign(document.body.style,pe),window.requestAnimationFrame(()=>{if(i&&p!==window.location.href){f(window.location.href);return}window.scrollTo(c,u)}),pe=null}},[p]);return o.useEffect(()=>{function u(){y.current=window.scrollY}return u(),window.addEventListener("scroll",u),()=>{window.removeEventListener("scroll",u)}},[]),o.useEffect(()=>{if(n)return()=>{typeof document>"u"||document.querySelector("[data-vaul-drawer]")||v()}},[n,v]),o.useEffect(()=>{t||!r||(e?(!window.matchMedia("(display-mode: standalone)").matches&&R(),n||window.setTimeout(()=>{v()},500)):v())},[e,r,p,n,t,R,v]),{restorePositionSetting:v}}function mt({open:e,onOpenChange:n,children:t,onDrag:r,onRelease:i,snapPoints:s,shouldScaleBackground:p=!1,setBackgroundColorOnScale:f=!0,closeThreshold:y=qn,scrollLockTimeout:R=Xn,dismissible:v=!0,handleOnly:u=!1,fadeFromIndex:c=s&&s.length-1,activeSnapPoint:A,setActiveSnapPoint:k,fixed:E,modal:F=!0,onClose:w,nested:P,noBodyStyles:M=!1,direction:h="bottom",defaultOpen:X=!1,disablePreventScroll:te=!0,snapToSequentialPoint:m=!1,preventScrollRestoration:S=!1,repositionInputs:b=!0,onAnimationEnd:H,container:I,autoFocus:V=!1}){var d,U;const[L=!1,W]=ft({defaultProp:X,prop:e,onChange:l=>{n?.(l),!l&&!P&&Ct(),setTimeout(()=>{H?.(l)},C.DURATION*1e3),l&&!F&&typeof window<"u"&&window.requestAnimationFrame(()=>{document.body.style.pointerEvents="auto"}),l||(document.body.style.pointerEvents="auto")}}),[_,K]=o.useState(!1),[Q,le]=o.useState(!1),[bt,He]=o.useState(!1),re=o.useRef(null),we=o.useRef(null),Re=o.useRef(null),De=o.useRef(null),ue=o.useRef(null),ce=o.useRef(!1),Ee=o.useRef(null),Ce=o.useRef(0),oe=o.useRef(!1),Le=o.useRef(!X),Be=o.useRef(0),g=o.useRef(null),Fe=o.useRef(((d=g.current)==null?void 0:d.getBoundingClientRect().height)||0),ze=o.useRef(((U=g.current)==null?void 0:U.getBoundingClientRect().width)||0),je=o.useRef(0),St=o.useCallback(l=>{s&&l===de.length-1&&(we.current=new Date)},[]),{activeSnapPoint:Tt,activeSnapPointIndex:ie,setActiveSnapPoint:Ue,onRelease:Rt,snapPointsOffset:de,onDrag:Dt,shouldFade:Ve,getPercentageDragged:Et}=Jn({snapPoints:s,activeSnapPointProp:A,setActiveSnapPointProp:k,drawerRef:g,fadeFromIndex:c,overlayRef:re,onSnapPointChange:St,direction:h,container:I,snapToSequentialPoint:m});Ln({isDisabled:!L||Q||!F||bt||!_||!b||!te});const{restorePositionSetting:Ct}=Zn({isOpen:L,modal:F,nested:P??!1,hasBeenOpened:_,preventScrollRestoration:S,noBodyStyles:M});function ve(){return(window.innerWidth-Pe)/window.innerWidth}function jt(l){var T,D;!v&&!s||g.current&&!g.current.contains(l.target)||(Fe.current=((T=g.current)==null?void 0:T.getBoundingClientRect().height)||0,ze.current=((D=g.current)==null?void 0:D.getBoundingClientRect().width)||0,le(!0),Re.current=new Date,ot()&&window.addEventListener("touchend",()=>ce.current=!1,{once:!0}),l.target.setPointerCapture(l.pointerId),Ce.current=N(h)?l.pageY:l.pageX)}function We(l,T){var D;let x=l;const O=(D=window.getSelection())==null?void 0:D.toString(),z=g.current?be(g.current,h):null,B=new Date;if(x.tagName==="SELECT"||x.hasAttribute("data-vaul-no-drag")||x.closest("[data-vaul-no-drag]"))return!1;if(h==="right"||h==="left")return!0;if(we.current&&B.getTime()-we.current.getTime()<500)return!1;if(z!==null&&(h==="bottom"?z>0:z<0))return!0;if(O&&O.length>0)return!1;if(ue.current&&B.getTime()-ue.current.getTime()<R&&z===0||T)return ue.current=B,!1;for(;x;){if(x.scrollHeight>x.clientHeight){if(x.scrollTop!==0)return ue.current=new Date,!1;if(x.getAttribute("role")==="dialog")return!0}x=x.parentNode}return!0}function Ot(l){if(g.current&&Q){const T=h==="bottom"||h==="right"?1:-1,D=(Ce.current-(N(h)?l.pageY:l.pageX))*T,x=D>0,O=s&&!v&&!x;if(O&&ie===0)return;const z=Math.abs(D),B=document.querySelector("[data-vaul-drawer-wrapper]"),Z=h==="bottom"||h==="top"?Fe.current:ze.current;let Y=z/Z;const ne=Et(z,x);if(ne!==null&&(Y=ne),O&&Y>=1||!ce.current&&!We(l.target,x))return;if(g.current.classList.add($e),ce.current=!0,$(g.current,{transition:"none"}),$(re.current,{transition:"none"}),s&&Dt({draggedDistance:D}),x&&!s){const G=Wn(D),ye=Math.min(G*-1,0)*T;$(g.current,{transform:N(h)?`translate3d(0, ${ye}px, 0)`:`translate3d(${ye}px, 0, 0)`});return}const ee=1-Y;if((Ve||c&&ie===c-1)&&(r?.(l,Y),$(re.current,{opacity:`${ee}`,transition:"none"},!0)),B&&re.current&&p){const G=Math.min(ve()+Y*(1-ve()),1),ye=8-Y*8,qe=Math.max(0,14-Y*14);$(B,{borderRadius:`${ye}px`,transform:N(h)?`scale(${G}) translate3d(0, ${qe}px, 0)`:`scale(${G}) translate3d(${qe}px, 0, 0)`,transition:"none"},!0)}if(!s){const G=z*T;$(g.current,{transform:N(h)?`translate3d(0, ${G}px, 0)`:`translate3d(${G}px, 0, 0)`})}}}o.useEffect(()=>{window.requestAnimationFrame(()=>{Le.current=!0})},[]),o.useEffect(()=>{var l;function T(){if(!g.current||!b)return;const D=document.activeElement;if(ke(D)||oe.current){var x;const O=((x=window.visualViewport)==null?void 0:x.height)||0,z=window.innerHeight;let B=z-O;const Z=g.current.getBoundingClientRect().height||0,Y=Z>z*.8;je.current||(je.current=Z);const ne=g.current.getBoundingClientRect().top;if(Math.abs(Be.current-B)>60&&(oe.current=!oe.current),s&&s.length>0&&de&&ie){const ee=de[ie]||0;B+=ee}if(Be.current=B,Z>O||oe.current){const ee=g.current.getBoundingClientRect().height;let G=ee;ee>O&&(G=O-(Y?ne:Pe)),E?g.current.style.height=`${ee-Math.max(B,0)}px`:g.current.style.height=`${Math.max(G,O-ne)}px`}else $n()||(g.current.style.height=`${je.current}px`);s&&s.length>0&&!oe.current?g.current.style.bottom="0px":g.current.style.bottom=`${Math.max(B,0)}px`}}return(l=window.visualViewport)==null||l.addEventListener("resize",T),()=>{var D;return(D=window.visualViewport)==null?void 0:D.removeEventListener("resize",T)}},[ie,s,de]);function fe(l){Nt(),w?.(),l||W(!1),setTimeout(()=>{s&&Ue(s[0])},C.DURATION*1e3)}function Ye(){if(!g.current)return;const l=document.querySelector("[data-vaul-drawer-wrapper]"),T=be(g.current,h);$(g.current,{transform:"translate3d(0, 0, 0)",transition:`transform ${C.DURATION}s cubic-bezier(${C.EASE.join(",")})`}),$(re.current,{transition:`opacity ${C.DURATION}s cubic-bezier(${C.EASE.join(",")})`,opacity:"1"}),p&&T&&T>0&&L&&$(l,{borderRadius:`${ct}px`,overflow:"hidden",...N(h)?{transform:`scale(${ve()}) translate3d(0, calc(env(safe-area-inset-top) + 14px), 0)`,transformOrigin:"top"}:{transform:`scale(${ve()}) translate3d(calc(env(safe-area-inset-top) + 14px), 0, 0)`,transformOrigin:"left"},transitionProperty:"transform, border-radius",transitionDuration:`${C.DURATION}s`,transitionTimingFunction:`cubic-bezier(${C.EASE.join(",")})`},!0)}function Nt(){!Q||!g.current||(g.current.classList.remove($e),ce.current=!1,le(!1),De.current=new Date)}function At(l){if(!Q||!g.current)return;g.current.classList.remove($e),ce.current=!1,le(!1),De.current=new Date;const T=be(g.current,h);if(!l||!We(l.target,!1)||!T||Number.isNaN(T)||Re.current===null)return;const D=De.current.getTime()-Re.current.getTime(),x=Ce.current-(N(h)?l.pageY:l.pageX),O=Math.abs(x)/D;if(O>.05&&(He(!0),setTimeout(()=>{He(!1)},200)),s){Rt({draggedDistance:x*(h==="bottom"||h==="right"?1:-1),closeDrawer:fe,velocity:O,dismissible:v}),i?.(l,!0);return}if(h==="bottom"||h==="right"?x>0:x<0){Ye(),i?.(l,!0);return}if(O>ut){fe(),i?.(l,!1);return}var z;const B=Math.min((z=g.current.getBoundingClientRect().height)!=null?z:0,window.innerHeight);var Z;const Y=Math.min((Z=g.current.getBoundingClientRect().width)!=null?Z:0,window.innerWidth),ne=h==="left"||h==="right";if(Math.abs(T)>=(ne?Y:B)*y){fe(),i?.(l,!1);return}i?.(l,!0),Ye()}o.useEffect(()=>(L&&($(document.documentElement,{scrollBehavior:"auto"}),we.current=new Date),()=>{Vn(document.documentElement,"scrollBehavior")}),[L]);function $t(l){const T=l?(window.innerWidth-ae)/window.innerWidth:1,D=l?-ae:0;Ee.current&&window.clearTimeout(Ee.current),$(g.current,{transition:`transform ${C.DURATION}s cubic-bezier(${C.EASE.join(",")})`,transform:N(h)?`scale(${T}) translate3d(0, ${D}px, 0)`:`scale(${T}) translate3d(${D}, 0, 0)`}),!l&&g.current&&(Ee.current=setTimeout(()=>{const x=be(g.current,h);$(g.current,{transition:"none",transform:N(h)?`translate3d(0, ${x}px, 0)`:`translate3d(${x}px, 0, 0)`})},500))}function kt(l,T){if(T<0)return;const D=(window.innerWidth-ae)/window.innerWidth,x=D+T*(1-D),O=-ae+T*ae;$(g.current,{transform:N(h)?`scale(${x}) translate3d(0, ${O}px, 0)`:`scale(${x}) translate3d(${O}px, 0, 0)`,transition:"none"})}function Pt(l,T){const D=N(h)?window.innerHeight:window.innerWidth,x=T?(D-ae)/D:1,O=T?-ae:0;T&&$(g.current,{transition:`transform ${C.DURATION}s cubic-bezier(${C.EASE.join(",")})`,transform:N(h)?`scale(${x}) translate3d(0, ${O}px, 0)`:`scale(${x}) translate3d(${O}px, 0, 0)`})}return o.useEffect(()=>{F||window.requestAnimationFrame(()=>{document.body.style.pointerEvents="auto"})},[F]),o.createElement(on,{defaultOpen:X,onOpenChange:l=>{!v&&!l||(l?K(!0):fe(!0),W(l))},open:L},o.createElement(rt.Provider,{value:{activeSnapPoint:Tt,snapPoints:s,setActiveSnapPoint:Ue,drawerRef:g,overlayRef:re,onOpenChange:n,onPress:jt,onRelease:At,onDrag:Ot,dismissible:v,shouldAnimate:Le,handleOnly:u,isOpen:L,isDragging:Q,shouldFade:Ve,closeDrawer:fe,onNestedDrag:kt,onNestedOpenChange:$t,onNestedRelease:Pt,keyboardIsOpen:oe,modal:F,snapPointsOffset:de,activeSnapPointIndex:ie,direction:h,shouldScaleBackground:p,setBackgroundColorOnScale:f,noBodyStyles:M,container:I,autoFocus:V}},t))}const pt=o.forwardRef(function({...e},n){const{overlayRef:t,snapPoints:r,onRelease:i,shouldFade:s,isOpen:p,modal:f,shouldAnimate:y}=se(),R=st(n,t),v=r&&r.length>0;if(!f)return null;const u=o.useCallback(c=>i(c),[i]);return o.createElement(Zt,{onMouseUp:u,ref:R,"data-vaul-overlay":"","data-vaul-snap-points":p&&v?"true":"false","data-vaul-snap-points-overlay":p&&s?"true":"false","data-vaul-animate":y?.current?"true":"false",...e})});pt.displayName="Drawer.Overlay";const ht=o.forwardRef(function({onPointerDownOutside:e,style:n,onOpenAutoFocus:t,...r},i){const{drawerRef:s,onPress:p,onRelease:f,onDrag:y,keyboardIsOpen:R,snapPointsOffset:v,activeSnapPointIndex:u,modal:c,isOpen:A,direction:k,snapPoints:E,container:F,handleOnly:w,shouldAnimate:P,autoFocus:M}=se(),[h,X]=o.useState(!1),te=st(i,s),m=o.useRef(null),S=o.useRef(null),b=o.useRef(!1),H=E&&E.length>0;Qn();const I=(d,U,L=0)=>{if(b.current)return!0;const W=Math.abs(d.y),_=Math.abs(d.x),K=_>W,Q=["bottom","right"].includes(U)?1:-1;if(U==="left"||U==="right"){if(!(d.x*Q<0)&&_>=0&&_<=L)return K}else if(!(d.y*Q<0)&&W>=0&&W<=L)return!K;return b.current=!0,!0};o.useEffect(()=>{H&&window.requestAnimationFrame(()=>{X(!0)})},[]);function V(d){m.current=null,b.current=!1,f(d)}return o.createElement(en,{"data-vaul-drawer-direction":k,"data-vaul-drawer":"","data-vaul-delayed-snap-points":h?"true":"false","data-vaul-snap-points":A&&H?"true":"false","data-vaul-custom-container":F?"true":"false","data-vaul-animate":P?.current?"true":"false",...r,ref:te,style:v&&v.length>0?{"--snap-point-height":`${v[u??0]}px`,...n}:n,onPointerDown:d=>{w||(r.onPointerDown==null||r.onPointerDown.call(r,d),m.current={x:d.pageX,y:d.pageY},p(d))},onOpenAutoFocus:d=>{t?.(d),M||d.preventDefault()},onPointerDownOutside:d=>{if(e?.(d),!c||d.defaultPrevented){d.preventDefault();return}R.current&&(R.current=!1)},onFocusOutside:d=>{if(!c){d.preventDefault();return}},onPointerMove:d=>{if(S.current=d,w||(r.onPointerMove==null||r.onPointerMove.call(r,d),!m.current))return;const U=d.pageY-m.current.y,L=d.pageX-m.current.x,W=d.pointerType==="touch"?10:2;I({x:L,y:U},k,W)?y(d):(Math.abs(L)>W||Math.abs(U)>W)&&(m.current=null)},onPointerUp:d=>{r.onPointerUp==null||r.onPointerUp.call(r,d),m.current=null,b.current=!1,f(d)},onPointerOut:d=>{r.onPointerOut==null||r.onPointerOut.call(r,d),V(S.current)},onContextMenu:d=>{r.onContextMenu==null||r.onContextMenu.call(r,d),S.current&&V(S.current)}})});ht.displayName="Drawer.Content";const ea=250,ta=120,gt=o.forwardRef(function({preventCycle:e=!1,children:n,...t},r){const{closeDrawer:i,isDragging:s,snapPoints:p,activeSnapPoint:f,setActiveSnapPoint:y,dismissible:R,handleOnly:v,isOpen:u,onPress:c,onDrag:A}=se(),k=o.useRef(null),E=o.useRef(!1);function F(){if(E.current){M();return}window.setTimeout(()=>{w()},ta)}function w(){if(s||e||E.current){M();return}if(M(),!p||p.length===0){R||i();return}if(f===p[p.length-1]&&R){i();return}const X=p.findIndex(m=>m===f);if(X===-1)return;const te=p[X+1];y(te)}function P(){k.current=window.setTimeout(()=>{E.current=!0},ea)}function M(){k.current&&window.clearTimeout(k.current),E.current=!1}return o.createElement("div",{onClick:F,onPointerCancel:M,onPointerDown:h=>{v&&c(h),P()},onPointerMove:h=>{v&&A(h)},ref:r,"data-vaul-drawer-visible":u?"true":"false","data-vaul-handle":"","aria-hidden":"true",...t},o.createElement("span",{"data-vaul-handle-hitarea":"","aria-hidden":"true"},n))});gt.displayName="Drawer.Handle";function na({onDrag:e,onOpenChange:n,...t}){const{onNestedDrag:r,onNestedOpenChange:i,onNestedRelease:s}=se();if(!r)throw new Error("Drawer.NestedRoot must be placed in another drawer");return o.createElement(mt,{nested:!0,onClose:()=>{i(!1)},onDrag:(p,f)=>{r(p,f),e?.(p,f)},onOpenChange:p=>{p&&i(p)},onRelease:s,...t})}function aa(e){const n=se(),{container:t=n.container,...r}=e;return o.createElement(sn,{container:t,...r})}const J={Root:mt,NestedRoot:na,Content:ht,Overlay:pt,Trigger:tn,Portal:aa,Handle:gt,Close:nn,Title:an,Description:rn},wt=({shouldScaleBackground:e=!0,...n})=>a.jsx(J.Root,{shouldScaleBackground:e,...n});wt.displayName="Drawer";const ra=J.Trigger,oa=J.Portal,vt=j.forwardRef(({className:e,...n},t)=>a.jsx(J.Overlay,{ref:t,className:q("fixed inset-0 z-50 bg-black/80",e),...n}));vt.displayName=J.Overlay.displayName;const yt=j.forwardRef(({className:e,children:n,...t},r)=>a.jsxs(oa,{children:[a.jsx(vt,{}),a.jsxs(J.Content,{ref:r,className:q("fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background",e),...t,children:[a.jsx("div",{className:"mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted"}),n]})]}));yt.displayName="DrawerContent";const ia=j.forwardRef(({className:e,...n},t)=>a.jsx(J.Title,{ref:t,className:q("text-lg font-semibold leading-none tracking-tight",e),...n}));ia.displayName=J.Title.displayName;const sa=j.forwardRef(({className:e,...n},t)=>a.jsx(J.Description,{ref:t,className:q("text-sm text-muted-foreground",e),...n}));sa.displayName=J.Description.displayName;const xt=Te(()=>{const[e,n]=j.useState(""),t=et,r=t.patients.filter(i=>`${i.first_name} ${i.last_name} ${i.middle_name}`.toLowerCase().includes(e.toLowerCase()));return a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"px-6",children:a.jsx(ln,{placeholder:"Введите имя",value:e,onChange:i=>n(i.target.value),rightIcon:a.jsx(xn,{})})}),a.jsx("h2",{className:"px-6 py-5 font-semibold text-sm text-slate-500",children:"Мои пациенты"}),a.jsx("ul",{className:"flex-1 flex flex-col overflow-auto",children:t.loading?a.jsx("div",{className:"flex justify-center items-center h-full",children:a.jsx(un,{className:"animate-spin"})}):a.jsxs(a.Fragment,{children:[r.map(i=>a.jsx(Cn,{item:i},i.id)),r.length===0&&a.jsx("div",{className:"flex justify-center items-center h-full",children:a.jsx("p",{className:"text-sm text-slate-500",children:"Пациентов не найдено"})})]})}),a.jsx("div",{className:"px-6 pt-2",children:a.jsx(Nn,{})})]})}),la=()=>{const[e,n]=j.useState(!1),t=bn(),r=Ie();return j.useEffect(()=>{n(!1)},[t.pathname]),j.useEffect(()=>{window.innerWidth<768&&n(!0)},[window.innerWidth]),a.jsxs(wt,{open:e,onOpenChange:n,children:[a.jsx(ra,{className:q(Me({variant:"outline",size:"icon"}),"flex md:hidden"),children:a.jsx(Rn,{})}),a.jsxs(yt,{className:"max-h-[80vh] overflow-hidden h-full pb-10",children:[a.jsx(xt,{}),a.jsxs(he,{variant:"outline",className:"mx-6 mt-4",onClick:()=>{Se.logout(),r({to:"/login"})},children:[a.jsx(Ze,{}),"Выход"]})]})]})},ua=Te(()=>a.jsx("aside",{className:"hidden md:flex flex-col bg-card py-5 w-full md:max-w-[480px] h-full overflow-hidden",children:a.jsx(xt,{})})),fa=()=>{const e=Ie();return a.jsxs("div",{className:"flex size-full",children:[a.jsx(ua,{}),a.jsxs("div",{className:"absolute right-4 top-4 flex gap-x-2",children:[a.jsxs(he,{variant:"ghost",onClick:()=>{Se.logout(),e({to:"/login"})},className:"md:flex hidden",children:[a.jsx(Ze,{}),"Выход"]}),a.jsx(la,{})]}),a.jsx("div",{className:"w-full",children:a.jsx(cn,{})})]})};export{fa as component};
(function(){"use strict";var e={6568:function(e,t,r){var a=r(5130),n=r(6768);function o(e,t,r,a,o,s){const h=(0,n.g2)("GameBoard");return(0,n.uX)(),(0,n.Wv)(h)}var s=r(4232);const h={class:"game-board"},l={class:"score-board"},i={class:"shape-selection"},c={key:0,class:"game-over-overlay"};function d(e,t,r,o,d,u){const p=(0,n.g2)("Block");return(0,n.uX)(),(0,n.CE)("div",h,[t[4]||(t[4]=(0,n.Lk)("h1",null,"Block Blast!",-1)),(0,n.Lk)("div",l,[(0,n.Lk)("div",null,"High Score: "+(0,s.v_)(d.highScore),1),(0,n.Lk)("h3",null,"Score: "+(0,s.v_)(d.score),1)]),(0,n.Lk)("div",{class:"grid",onDragover:t[0]||(t[0]=(0,a.D$)((()=>{}),["prevent"])),onDrop:t[1]||(t[1]=(...e)=>u.handleDrop&&u.handleDrop(...e)),ref:"gameBoard"},[((0,n.uX)(!0),(0,n.CE)(n.FK,null,(0,n.pI)(d.board,((e,t)=>((0,n.uX)(),(0,n.CE)("div",{class:"row",key:t},[((0,n.uX)(!0),(0,n.CE)(n.FK,null,(0,n.pI)(e,((e,t)=>((0,n.uX)(),(0,n.CE)("div",{class:(0,s.C4)(["cell",{"filled-cell":e}]),key:t},null,2)))),128))])))),128))],544),(0,n.Lk)("div",i,[((0,n.uX)(!0),(0,n.CE)(n.FK,null,(0,n.pI)(d.currentShapes,((e,t)=>((0,n.uX)(),(0,n.CE)("div",{key:t},[(0,n.bF)(p,{shape:d.shapes[e],name:e,index:t,onShapeClicked:u.handleShapeClicked,onShapeDragged:u.handleShapeDragged,onShapeDropped:u.handleShapeDropped},null,8,["shape","name","index","onShapeClicked","onShapeDragged","onShapeDropped"])])))),128))]),d.gameOver?((0,n.uX)(),(0,n.CE)("div",c,[t[3]||(t[3]=(0,n.Lk)("div",{class:"game-over-message"},"Game Over!",-1)),(0,n.Lk)("button",{onClick:t[2]||(t[2]=(...e)=>u.resetBoard&&u.resetBoard(...e)),class:"restart-button"},"Restart")])):(0,n.Q3)("",!0)])}r(8111),r(1148),r(7588);function u(e,t,r,a,o,h){return(0,n.uX)(),(0,n.CE)("div",{class:"shape",onMousedown:t[0]||(t[0]=(...e)=>h.handleMouseDown&&h.handleMouseDown(...e)),onDragstart:t[1]||(t[1]=(...e)=>h.handleDragStart&&h.handleDragStart(...e)),onDragend:t[2]||(t[2]=(...e)=>h.handleDragEnd&&h.handleDragEnd(...e)),onTouchstart:t[3]||(t[3]=(...e)=>h.handleTouchStart&&h.handleTouchStart(...e)),onTouchmove:t[4]||(t[4]=(...e)=>h.handleTouchMove&&h.handleTouchMove(...e)),onTouchend:t[5]||(t[5]=(...e)=>h.handleTouchEnd&&h.handleTouchEnd(...e)),draggable:"true"},[((0,n.uX)(!0),(0,n.CE)(n.FK,null,(0,n.pI)(r.shape,((e,t)=>((0,n.uX)(),(0,n.CE)("div",{class:"row",key:t},[((0,n.uX)(!0),(0,n.CE)(n.FK,null,(0,n.pI)(e,((e,r)=>((0,n.uX)(),(0,n.CE)("div",{class:"block",key:r,style:(0,s.Tr)(h.applyStyles(t,r))},null,4)))),128))])))),128))],32)}var p={name:"BlockComponent",props:{name:{type:String,required:!1,default:"Block"},shape:{type:Array,required:!0},index:{type:Number,required:!0}},data(){return{blockStyle:{},touchStartX:0,touchStartY:0}},methods:{applyStyles(e,t){if(this.shape)return{backgroundColor:this.shape[e][t]?"#945353":"transparent",border:this.shape[e][t]?"1px solid #ccc":"1px solid transparent"}},handleMouseDown(){this.$emit("shapeClicked",this.name)},handleDragStart(e){e.dataTransfer.setData("name",this.name);const t=e.target.getBoundingClientRect(),r=e.clientX-t.left,a=e.clientY-t.top;e.dataTransfer.setData("offsetX",r),e.dataTransfer.setData("offsetY",a)},handleDragEnd(){this.$nextTick((()=>{this.$el.style.opacity="1"}))},handleTouchStart(e){this.touchStartX=e.touches[0].clientX,this.touchStartY=e.touches[0].clientY,this.$emit("shapeClicked",this.name)},handleTouchMove(e){e.preventDefault();const t=e.touches[0],r=t.clientX-this.touchStartX,a=t.clientY-this.touchStartY;this.$emit("shapeDragged",{name:this.name,offsetX:r,offsetY:a})},handleTouchEnd(){this.$emit("shapeDropped")}}},f=r(1241);const g=(0,f.A)(p,[["render",u]]);var v=g,m={components:{Block:v},name:"GameBoard",data(){return{board:Array.from({length:8},(()=>Array(8).fill(null))),shapes:{square:[[1,1],[1,1]],line:[[1,1,1,1]],line2:[[1],[1],[1],[1]],t:[[1,1,1],[0,1,0]],t2:[[1,0],[1,1],[1,0]],t3:[[0,1,0],[1,1,1]],t4:[[0,1],[1,1],[0,1]],single:[[1]],l:[[1,0],[1,0],[1,1]],l2:[[1,1],[0,1],[0,1]],l3:[[1,1],[1,0],[1,0]],l4:[[1,1,1],[0,0,1]],l5:[[1,1,1],[1,0,0]],j:[[0,1],[0,1],[1,1]],s:[[0,1,1],[1,1,0]],z:[[1,1,0],[0,1,1]],bSquare:[[1,1,1],[1,1,1],[1,1,1]],rectangle:[[1,1,1,1],[1,1,1,1]]},currentShapes:[],selectedShape:"",gameOver:!1,score:0,highScore:0,touchOffsetX:0,touchOffsetY:0}},methods:{resetBoard(){this.board=Array.from({length:8},(()=>Array(8).fill(null))),this.getRandomShapes(),this.gameOver=!1,this.highScore=Math.max(this.highScore,this.score),localStorage.setItem("highScore",this.highScore),this.score=0},addShape(e,t,r){if(!this.checkCollision(e,t,r)){for(let a=0;a<e.length;a++)for(let n=0;n<e[a].length;n++)1===e[a][n]&&(this.board[t+a][r+n]="X");this.removeShape(this.selectedShape),this.checkRows(),this.checkColumns(),this.checkGameOver()}},checkCollision(e,t,r){for(let a=0;a<e.length;a++)for(let n=0;n<e[a].length;n++)if(1===e[a][n]&&(void 0===this.board[t+a]||void 0===this.board[t+a][r+n]||null!==this.board[t+a][r+n]))return!0;return!1},checkRows(){for(let e=0;e<this.board.length;e++)this.board[e].every((e=>"X"===e))&&(this.board.splice(e,1,Array(8).fill(null)),this.score+=10)},checkColumns(){for(let e=0;e<this.board[0].length;e++)this.board.every((t=>"X"===t[e]))&&(this.board.forEach((t=>t[e]=null)),this.score+=10)},checkGameOver(){for(let e of this.currentShapes)for(let t=0;t<=this.board.length-this.shapes[e].length;t++)for(let r=0;r<=this.board[0].length-this.shapes[e][0].length;r++)if(!this.checkCollision(this.shapes[e],t,r))return!1;return this.gameOver=!0,!0},handleShapeClicked(e){this.selectedShape=e},handleShapeDragged(e){this.touchOffsetX=e.offsetX,this.touchOffsetY=e.offsetY},handleShapeDropped(){const e=this.$refs.gameBoard.getBoundingClientRect(),t=this.touchOffsetX-e.left,r=this.touchOffsetY-e.top,a=Math.floor(r/40),n=Math.floor(t/40);this.addShape(this.shapes[this.selectedShape],a,n)},handleDrop(e){const t=e.dataTransfer.getData("name");if(!t)return;const r=parseFloat(e.dataTransfer.getData("offsetX")),a=parseFloat(e.dataTransfer.getData("offsetY")),n=this.$refs.gameBoard.getBoundingClientRect(),o=e.clientX-n.left-r,s=e.clientY-n.top-a,h=Math.floor(s/40),l=Math.floor(o/40);this.addShape(this.shapes[t],h,l)},removeShape(e){const t=this.currentShapes.indexOf(e);t>-1&&this.currentShapes.splice(t,1),0===this.currentShapes.length&&this.getRandomShapes()},getRandomShapes(){this.currentShapes=Array.from({length:3},(()=>Object.keys(this.shapes)[Math.floor(Math.random()*Object.keys(this.shapes).length)]))}},mounted(){const e=localStorage.getItem("highScore");null!==e&&(this.highScore=parseInt(e,10)),this.resetBoard()}};const S=(0,f.A)(m,[["render",d]]);var k=S,b={name:"App",components:{GameBoard:k}};const y=(0,f.A)(b,[["render",o]]);var D=y;(0,a.Ef)(D).mount("#app")}},t={};function r(a){var n=t[a];if(void 0!==n)return n.exports;var o=t[a]={exports:{}};return e[a].call(o.exports,o,o.exports,r),o.exports}r.m=e,function(){var e=[];r.O=function(t,a,n,o){if(!a){var s=1/0;for(c=0;c<e.length;c++){a=e[c][0],n=e[c][1],o=e[c][2];for(var h=!0,l=0;l<a.length;l++)(!1&o||s>=o)&&Object.keys(r.O).every((function(e){return r.O[e](a[l])}))?a.splice(l--,1):(h=!1,o<s&&(s=o));if(h){e.splice(c--,1);var i=n();void 0!==i&&(t=i)}}return t}o=o||0;for(var c=e.length;c>0&&e[c-1][2]>o;c--)e[c]=e[c-1];e[c]=[a,n,o]}}(),function(){r.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return r.d(t,{a:t}),t}}(),function(){r.d=function(e,t){for(var a in t)r.o(t,a)&&!r.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})}}(),function(){r.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={524:0};r.O.j=function(t){return 0===e[t]};var t=function(t,a){var n,o,s=a[0],h=a[1],l=a[2],i=0;if(s.some((function(t){return 0!==e[t]}))){for(n in h)r.o(h,n)&&(r.m[n]=h[n]);if(l)var c=l(r)}for(t&&t(a);i<s.length;i++)o=s[i],r.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return r.O(c)},a=self["webpackChunkblock_blast"]=self["webpackChunkblock_blast"]||[];a.forEach(t.bind(null,0)),a.push=t.bind(null,a.push.bind(a))}();var a=r.O(void 0,[504],(function(){return r(6568)}));a=r.O(a)})();
//# sourceMappingURL=app.96cb1b55.js.map
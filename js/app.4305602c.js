(function(){"use strict";var e={3395:function(e,t,s){var a=s(5130),r=s(6768);function o(e,t,s,a,o,i){const l=(0,r.g2)("GameBoard");return(0,r.uX)(),(0,r.Wv)(l)}const i={class:"game-board"},l={key:0,class:"game-over-overlay"};function n(e,t,s,a,o,n){const h=(0,r.g2)("ScoreBoard"),c=(0,r.g2)("GameGrid"),p=(0,r.g2)("ShapeSelection"),d=(0,r.g2)("CustomPieceCreator"),u=(0,r.g2)("SelectShapes");return(0,r.uX)(),(0,r.CE)("div",i,[t[6]||(t[6]=(0,r.Lk)("div",{class:"title"},"Block Blast!",-1)),(0,r.bF)(h,{highScore:o.highScore,scoreDisplay:o.scoreDisplay,isHighScoreAnimated:o.isHighScoreAnimated},null,8,["highScore","scoreDisplay","isHighScoreAnimated"]),(0,r.bF)(c,{board:o.board,hoverCells:o.hoverCells,onDragover:e.handleDragOver,onDrop:n.handleDrop,ref:"gameBoard"},null,8,["board","hoverCells","onDragover","onDrop"]),(0,r.bF)(p,{shapes:o.shapes,currentShapes:o.currentShapes,onShapeClicked:n.handleShapeClicked,onShapeDragged:n.handleShapeDragged,onShapeDropped:n.handleShapeDropped},null,8,["shapes","currentShapes","onShapeClicked","onShapeDragged","onShapeDropped"]),o.gameOver?((0,r.uX)(),(0,r.CE)("div",l,[t[5]||(t[5]=(0,r.Lk)("div",{class:"game-over-message"},"Game Over!",-1)),(0,r.Lk)("button",{onClick:t[0]||(t[0]=(...e)=>n.resetBoard&&n.resetBoard(...e)),class:"restart-button"},"Restart"),o.history.length>0?((0,r.uX)(),(0,r.CE)("button",{key:0,onClick:t[1]||(t[1]=(...e)=>n.undoMove&&n.undoMove(...e)),class:"back-button"},"Back")):(0,r.Q3)("",!0)])):(0,r.Q3)("",!0),o.history.length>0?((0,r.uX)(),(0,r.CE)("button",{key:1,onClick:t[2]||(t[2]=(...e)=>n.undoMove&&n.undoMove(...e)),class:"back-button"},"Back")):(0,r.Q3)("",!0),(0,r.Lk)("button",{onClick:t[3]||(t[3]=(...e)=>n.openCustomPieceCreator&&n.openCustomPieceCreator(...e)),class:"create-piece-button"},"Create Your Custom Piece"),(0,r.Lk)("button",{onClick:t[4]||(t[4]=(...e)=>n.openSelectShapes&&n.openSelectShapes(...e)),class:"open-select-shapes-button"},"Select Shapes"),(0,r.bF)(d,{visible:o.isCustomPieceCreatorVisible,onSave:n.handleCustomPieceSave,onCancel:n.handleCustomPieceCancel},null,8,["visible","onSave","onCancel"]),(0,r.bF)(u,{visible:o.isSelectShapesVisible,shapes:o.shapes,initialSelectedShapes:o.selectedShapes,onSave:n.handleSelectShapesSave,onCancel:n.handleSelectShapesCancel},null,8,["visible","shapes","initialSelectedShapes","onSave","onCancel"])])}s(4114),s(8111),s(1148),s(7588),s(1701),s(3579);var h=s(4232);const c={class:"score-board"},p={class:"high-score"};function d(e,t,s,a,o,i){return(0,r.uX)(),(0,r.CE)("div",c,[(0,r.Lk)("div",p,"High Score: "+(0,h.v_)(s.highScore),1),(0,r.Lk)("div",{class:(0,h.C4)(["score",{highlight:s.isHighScoreAnimated}])},(0,h.v_)(s.scoreDisplay),3)])}var u={name:"ScoreBoard",props:{highScore:{type:Number,required:!0},scoreDisplay:{type:Number,required:!0},isHighScoreAnimated:{type:Boolean,required:!0}}},S=s(1241);const g=(0,S.A)(u,[["render",d]]);var f=g;function v(e,t,s,o,i,l){return(0,r.uX)(),(0,r.CE)("div",{class:"grid",onDragover:t[0]||(t[0]=(0,a.D$)(((...e)=>l.handleDragOver&&l.handleDragOver(...e)),["prevent"])),onDrop:t[1]||(t[1]=(...e)=>l.handleDrop&&l.handleDrop(...e)),ref:"gameBoard"},[((0,r.uX)(!0),(0,r.CE)(r.FK,null,(0,r.pI)(s.board,((e,t)=>((0,r.uX)(),(0,r.CE)("div",{class:"row",key:t},[((0,r.uX)(!0),(0,r.CE)(r.FK,null,(0,r.pI)(e,((e,s)=>((0,r.uX)(),(0,r.CE)("div",{class:(0,h.C4)(["cell",{"filled-cell":e,"hover-cell":l.isHoverCell(t,s)}]),key:s,style:(0,h.Tr)(l.applyCellStyle(e))},null,6)))),128))])))),128))],544)}var m={name:"GameGrid",props:{board:{type:Array,required:!0},hoverCells:{type:Array,required:!0}},methods:{handleDragOver(e){this.$emit("dragover",e)},handleDrop(e){this.$emit("drop",e)},isHoverCell(e,t){return this.hoverCells.some((s=>s.row===e&&s.col===t))},applyCellStyle(e){return null!==e?{background:`linear-gradient(145deg, ${e}, ${e} 50%, ${e} 50%, ${e} 100%)`}:{}}}};const C=(0,S.A)(m,[["render",v]]);var b=C;const y={class:"shape-selection"};function k(e,t,s,a,o,i){const l=(0,r.g2)("Block");return(0,r.uX)(),(0,r.CE)("div",y,[((0,r.uX)(!0),(0,r.CE)(r.FK,null,(0,r.pI)(s.currentShapes,((e,t)=>((0,r.uX)(),(0,r.CE)("div",{key:t},[(0,r.bF)(l,{shape:s.shapes[e],name:e,index:t,onShapeClicked:i.handleShapeClicked,onShapeDragged:i.handleShapeDragged,onShapeDropped:i.handleShapeDropped},null,8,["shape","name","index","onShapeClicked","onShapeDragged","onShapeDropped"])])))),128))])}function D(e,t,s,a,o,i){return(0,r.uX)(),(0,r.CE)("div",{class:"shape",onMousedown:t[0]||(t[0]=(...e)=>i.handleMouseDown&&i.handleMouseDown(...e)),onDragstart:t[1]||(t[1]=(...e)=>i.handleDragStart&&i.handleDragStart(...e)),onDragend:t[2]||(t[2]=(...t)=>e.handleDragEnd&&e.handleDragEnd(...t)),onTouchstart:t[3]||(t[3]=(...e)=>i.handleTouchStart&&i.handleTouchStart(...e)),onTouchmove:t[4]||(t[4]=(...e)=>i.handleTouchMove&&i.handleTouchMove(...e)),onTouchend:t[5]||(t[5]=(...e)=>i.handleTouchEnd&&i.handleTouchEnd(...e)),style:(0,h.Tr)(i.shapeStyle),draggable:"true"},[((0,r.uX)(!0),(0,r.CE)(r.FK,null,(0,r.pI)(s.shape,((e,t)=>((0,r.uX)(),(0,r.CE)("div",{class:"row",key:t},[((0,r.uX)(!0),(0,r.CE)(r.FK,null,(0,r.pI)(e,((e,s)=>((0,r.uX)(),(0,r.CE)("div",{class:(0,h.C4)(["block",{fill:i.applyStyles(t,s),dragging:o.isDragging}]),key:s,style:(0,h.Tr)(i.applyStyles(t,s))},null,6)))),128))])))),128))],36)}var X={name:"BlockComponent",props:{name:{type:String,required:!1,default:"Block"},shape:{type:Array,required:!0},index:{type:Number,required:!0},disableDragging:{type:Boolean,default:!1}},data(){return{blockStyle:{},offsetX:0,offsetY:0,touchCurrentX:0,touchCurrentY:0,isDragging:!1,color:this.getRandomColor()}},computed:{shapeStyle(){return this.isDragging?{position:"absolute",left:`${this.touchCurrentX}px`,top:`${this.touchCurrentY}px`,zIndex:1e3}:{}}},methods:{applyStyles(e,t){if(this.shape)return this.shape[e][t]?{background:`linear-gradient(145deg, ${this.color}, ${this.color} 50%, ${this.color} 50%, ${this.color} 100%)`}:void 0},handleMouseDown(){this.disableDragging||this.$emit("shapeClicked",{name:this.name,color:this.color})},handleDragStart(e){if(this.disableDragging)return;e.dataTransfer.setData("name",this.name);const t=e.target.getBoundingClientRect(),s=e.clientX-t.left,a=e.clientY-t.top;e.dataTransfer.setData("offsetX",s),e.dataTransfer.setData("offsetY",a)},handleTouchStart(e){if(this.disableDragging)return;e.preventDefault();const t=e.target.parentElement.getBoundingClientRect();this.offsetX=e.touches[0].clientX-t.left,this.offsetY=e.touches[0].clientY-t.top,this.touchCurrentX=e.touches[0].clientX-this.offsetX,this.touchCurrentY=e.touches[0].clientY-this.offsetY-90*this.shape.length,this.isDragging=!0,this.$emit("shapeClicked",{name:this.name,color:this.color})},handleTouchMove(e){if(this.disableDragging)return;const t=e.touches[0];this.touchCurrentX=t.clientX-this.offsetX,this.touchCurrentY=t.clientY-this.offsetY-90*this.shape.length,this.$emit("shapeDragged",{name:this.name,clientX:t.clientX,clientY:t.clientY-this.offsetY-90*this.shape.length,offsetX:this.offsetX,offsetY:this.offsetY})},handleTouchEnd(e){if(this.disableDragging)return;this.isDragging=!1;const t=e.changedTouches[0];this.$emit("shapeDropped",{name:this.name,clientX:t.clientX,clientY:t.clientY-90*this.shape.length,offsetX:this.offsetX,offsetY:this.offsetY})},getRandomColor(){const e="0123456789ABCDEF";let t="#";for(let s=0;s<6;s++)t+=e[Math.floor(16*Math.random())];return t}}};const O=(0,S.A)(X,[["render",D]]);var E=O,B={name:"ShapeSelection",components:{Block:E},props:{shapes:{type:Object,required:!0},currentShapes:{type:Array,required:!0}},methods:{handleShapeClicked(e){this.$emit("shapeClicked",e)},handleShapeDragged(e){this.$emit("shapeDragged",e)},handleShapeDropped(e){this.$emit("shapeDropped",e)}}};const $=(0,S.A)(B,[["render",k]]);var A=$;const Y={key:0,class:"custom-piece-overlay"},T={class:"custom-piece-overlay-content"},M={class:"custom-piece-grid"},F=["onClick"],w={class:"custom-piece-controls"},P=["disabled"];function H(e,t,s,a,o,i){return s.visible?((0,r.uX)(),(0,r.CE)("div",Y,[(0,r.Lk)("div",T,[t[2]||(t[2]=(0,r.Lk)("h2",null,"Create Your Custom Piece",-1)),(0,r.Lk)("div",M,[((0,r.uX)(!0),(0,r.CE)(r.FK,null,(0,r.pI)(o.piece,((e,t)=>((0,r.uX)(),(0,r.CE)("div",{class:"custom-piece-row",key:t},[((0,r.uX)(!0),(0,r.CE)(r.FK,null,(0,r.pI)(e,((e,s)=>((0,r.uX)(),(0,r.CE)("div",{class:(0,h.C4)(["custom-piece-cell",{filled:e}]),key:s,onClick:e=>i.toggleCell(t,s)},null,10,F)))),128))])))),128))]),(0,r.Lk)("div",w,[(0,r.Lk)("button",{class:"custom-piece-button",onClick:t[0]||(t[0]=(...e)=>i.savePiece&&i.savePiece(...e)),disabled:i.blockCount>6},"Save",8,P),(0,r.Lk)("button",{class:"custom-piece-button",onClick:t[1]||(t[1]=(...e)=>i.cancel&&i.cancel(...e))},"Cancel")]),(0,r.Lk)("p",null,"Blocks: "+(0,h.v_)(i.blockCount)+" / 6",1)])])):(0,r.Q3)("",!0)}s(2489);var L={name:"CustomPieceCreator",props:{visible:{type:Boolean,required:!0}},data(){return{piece:Array.from({length:4},(()=>Array(4).fill(0)))}},computed:{blockCount(){return this.piece.flat().filter((e=>1===e)).length}},methods:{toggleCell(e,t){1===this.piece[e][t]?this.piece[e][t]=0:this.blockCount<6&&(this.piece[e][t]=1)},savePiece(){this.$emit("save",this.piece)},cancel(){this.$emit("cancel")}}};const q=(0,S.A)(L,[["render",H]]);var N=q;const R={key:0,class:"select-shapes-overlay"},x={class:"select-shapes-content"},G={class:"select-shapes-grid"},I=["onClick"],J={class:"select-shapes-controls"};function j(e,t,s,a,o,i){const l=(0,r.g2)("Block");return s.visible?((0,r.uX)(),(0,r.CE)("div",R,[(0,r.Lk)("div",x,[(0,r.Lk)("div",G,[((0,r.uX)(!0),(0,r.CE)(r.FK,null,(0,r.pI)(s.shapes,((e,t)=>((0,r.uX)(),(0,r.CE)("div",{class:(0,h.C4)(["select-shapes-cell",{selected:o.selectedShapes.includes(t)}]),key:t,onClick:e=>i.toggleShapeSelection(t)},[(0,r.bF)(l,{shape:e,name:t,disableDragging:!0},null,8,["shape","name"])],10,I)))),128))]),(0,r.Lk)("div",J,[(0,r.Lk)("button",{class:"select-shapes-button",onClick:t[0]||(t[0]=(...e)=>i.saveSelection&&i.saveSelection(...e))},"Save"),(0,r.Lk)("button",{class:"select-shapes-button",onClick:t[1]||(t[1]=(...e)=>i.cancelSelection&&i.cancelSelection(...e))},"Cancel")])])])):(0,r.Q3)("",!0)}var V={name:"SelectShapes",components:{Block:E},props:{visible:{type:Boolean,required:!0},shapes:{type:Object,required:!0},initialSelectedShapes:{type:Array,required:!0}},data(){return{selectedShapes:[]}},watch:{initialSelectedShapes:{immediate:!0,handler(e){this.selectedShapes=[...e]}}},methods:{toggleShapeSelection(e){const t=this.selectedShapes.indexOf(e);t>-1?this.selectedShapes.splice(t,1):this.selectedShapes.push(e)},saveSelection(){this.$emit("save",this.selectedShapes)},cancelSelection(){this.$emit("cancel")}}};const K=(0,S.A)(V,[["render",j]]);var _=K,Q={components:{CustomPieceCreator:N,GameGrid:b,ScoreBoard:f,ShapeSelection:A,SelectShapes:_},name:"GameBoard",data(){return{board:Array.from({length:8},(()=>Array(8).fill(null))),shapes:{square:[[1,1],[1,1]],line:[[1,1,1,1]],line2:[[1],[1],[1],[1]],t:[[1,1,1],[0,1,0]],t2:[[1,0],[1,1],[1,0]],t3:[[0,1,0],[1,1,1]],t4:[[0,1],[1,1],[0,1]],single:[[1]],l:[[1,0],[1,0],[1,1]],l2:[[1,1],[0,1],[0,1]],l3:[[1,1],[1,0],[1,0]],l4:[[1,1,1],[0,0,1]],l5:[[1,1,1],[1,0,0]],j:[[0,1],[0,1],[1,1]],s:[[0,1,1],[1,1,0]],z:[[1,1,0],[0,1,1]],bCorner:[[1,1,1],[1,0,0],[1,0,0]],bCorner2:[[0,0,1],[0,0,1],[1,1,1]],bCorner3:[[1,0,0],[1,0,0],[1,1,1]],bCorner4:[[1,1,1],[0,0,1],[0,0,1]],bSquare:[[1,1,1],[1,1,1],[1,1,1]],rectangle:[[1,1,1],[1,1,1]],rectangle2:[[1,1],[1,1],[1,1]],corner:[[1,1],[0,1]],corner2:[[1,0],[1,1]],corner3:[[0,1],[1,1]],corner4:[[1,1],[1,0]],u:[[1,0,1],[1,1,1]],u2:[[1,1,1],[1,0,1]],u3:[[1,1],[0,1],[1,1]],u4:[[1,1],[1,0],[1,1]]},currentShapes:[],selectedShape:"",selectedShapeColor:"",gameOver:!1,score:0,scoreDisplay:0,highScore:0,isHighScoreAnimated:!1,hoverCells:[],history:[],isCustomPieceCreatorVisible:!1,isSelectShapesVisible:!1,selectedShapes:[]}},watch:{score(e,t){this.incrementScoreDisplay(e,t),e>this.highScore&&this.animateHighScore()}},methods:{incrementScoreDisplay(e,t){if(e>t){let s=1;e-t>50?s=10:e-t>10&&(s=5);const a=setInterval((()=>{this.scoreDisplay+=s,this.scoreDisplay>=this.score&&(this.scoreDisplay=this.score,clearInterval(a))}),1)}else this.scoreDisplay=this.score},animateHighScore(){this.isHighScoreAnimated=!0,setTimeout((()=>{this.isHighScoreAnimated=!1}),1e3)},resetBoard(){this.board=Array.from({length:8},(()=>Array(8).fill(null))),this.gameOver=!1,this.highScore=Math.max(this.score,this.highScore),this.score=0,this.history=[],this.getRandomShapes(),this.saveState()},addShape(e,t,s){if(!this.checkCollision(e,t,s)){this.saveHistory();for(let a=0;a<e.length;a++)for(let r=0;r<e[a].length;r++)1===e[a][r]&&(this.board[t+a][s+r]=this.selectedShapeColor,this.score+=1);this.removeShape(this.selectedShape),setTimeout((()=>{this.checkRows(),this.checkColumns(),setTimeout((()=>{this.gameOver=this.checkGameOver()}),1e3),this.saveState()}),500)}},checkCollision(e,t,s){for(let a=0;a<e.length;a++)for(let r=0;r<e[a].length;r++)if(1===e[a][r]&&(void 0===this.board[t+a]||void 0===this.board[t+a][s+r]||null!==this.board[t+a][s+r]))return!0;return!1},checkRows(){for(let e=0;e<this.board.length;e++)this.board[e].every((e=>null!==e))&&(this.board[e].forEach(((t,s)=>{setTimeout((()=>{this.board[e].splice(s,1,null)}),10*s)})),this.score+=40)},checkColumns(){for(let e=0;e<this.board[0].length;e++)this.board.every((t=>null!==t[e]))&&(this.board.forEach(((t,s)=>{setTimeout((()=>{this.board[s].splice(e,1,null)}),10*s)})),this.score+=40)},checkGameOver(){for(let e of this.currentShapes)for(let t=0;t<=this.board.length-this.shapes[e].length;t++)for(let s=0;s<=this.board[0].length-this.shapes[e][0].length;s++)if(!this.checkCollision(this.shapes[e],t,s))return!1;return!0},handleShapeClicked(e){this.selectedShape=e.name,this.selectedShapeColor=e.color},handleShapeDragged(e){const t=parseFloat(e.offsetX),s=parseFloat(e.offsetY),a=this.$refs.gameBoard.$el.getBoundingClientRect(),r=e.clientX-a.left-t,o=e.clientY-a.top-s,i=Math.floor(o/40),l=Math.floor(r/40);this.updateHoverCells(this.shapes[this.selectedShape],i,l)},handleShapeDropped(e){const t=parseFloat(e.offsetX),s=parseFloat(e.offsetY),a=this.$refs.gameBoard.$el.getBoundingClientRect(),r=e.clientX-a.left-t,o=e.clientY-a.top-s,i=Math.floor(o/40),l=Math.floor(r/40);this.addShape(this.shapes[this.selectedShape],i,l),this.clearHoverCells()},handleDrop(e){const t=e.dataTransfer.getData("name");if(!t)return;const s=parseFloat(e.dataTransfer.getData("offsetX")),a=parseFloat(e.dataTransfer.getData("offsetY")),r=this.$refs.gameBoard.$el.getBoundingClientRect(),o=e.clientX-r.left-s,i=e.clientY-r.top-a,l=Math.floor(i/40),n=Math.floor(o/40);this.addShape(this.shapes[t],l,n),this.clearHoverCells()},removeShape(e){const t=this.currentShapes.indexOf(e);t>-1&&this.currentShapes.splice(t,1),0===this.currentShapes.length&&this.getRandomShapes()},getRandomShapes(){this.currentShapes=Array.from({length:3},(()=>this.selectedShapes[Math.floor(Math.random()*this.selectedShapes.length)])),this.checkGameOver()&&this.getRandomShapes()},applyCellStyle(e){return null!==e?{background:`linear-gradient(145deg, ${e}, ${e} 50%, ${e} 50%, ${e} 100%)`}:{}},updateHoverCells(e,t,s){if(this.hoverCells=[],!this.checkCollision(e,t,s))for(let a=0;a<e.length;a++)for(let r=0;r<e[a].length;r++)1===e[a][r]&&this.hoverCells.push({row:t+a,col:s+r})},clearHoverCells(){this.hoverCells=[]},isHoverCell(e,t){return this.hoverCells.some((s=>s.row===e&&s.col===t))},saveHistory(){this.history.push({board:JSON.parse(JSON.stringify(this.board)),score:this.score,currentShapes:JSON.parse(JSON.stringify(this.currentShapes))})},saveState(){const e={board:JSON.parse(JSON.stringify(this.board)),score:this.score,currentShapes:JSON.parse(JSON.stringify(this.currentShapes)),selectedShape:this.selectedShape,selectedShapeColor:this.selectedShapeColor,history:JSON.parse(JSON.stringify(this.history)),selectedShapes:this.selectedShapes,highScore:this.highScore};localStorage.setItem("gameState",JSON.stringify(e))},undoMove(){if(this.history.length>0){const e=this.history.pop();this.board=e.board,this.score=e.score,this.currentShapes=e.currentShapes,this.gameOver=!1}},openCustomPieceCreator(){this.isCustomPieceCreatorVisible=!0},handleCustomPieceSave(e){this.isCustomPieceCreatorVisible=!1;const t=e.map((e=>e.map((e=>e?1:0))));this.shapes.custom=t,this.currentShapes.push("custom"),this.saveState()},handleCustomPieceCancel(){this.isCustomPieceCreatorVisible=!1},openSelectShapes(){this.isSelectShapesVisible=!0},handleSelectShapesSave(e){this.isSelectShapesVisible=!1,this.selectedShapes=e,this.getRandomShapes(),this.saveState()},handleSelectShapesCancel(){this.isSelectShapesVisible=!1}},mounted(){const e=localStorage.getItem("gameState");if(e){const t=JSON.parse(e);this.board=t.board,this.score=t.score,this.currentShapes=t.currentShapes,this.selectedShape=t.selectedShape,this.selectedShapeColor=t.selectedShapeColor,this.history=t.history,this.selectedShapes=t.selectedShapes,this.highScore=t.highScore}else this.selectedShapes=Object.keys(this.shapes),this.resetBoard()}};const z=(0,S.A)(Q,[["render",n]]);var W=z,U={name:"App",components:{GameBoard:W}};const Z=(0,S.A)(U,[["render",o]]);var ee=Z;(0,a.Ef)(ee).mount("#app")}},t={};function s(a){var r=t[a];if(void 0!==r)return r.exports;var o=t[a]={exports:{}};return e[a].call(o.exports,o,o.exports,s),o.exports}s.m=e,function(){var e=[];s.O=function(t,a,r,o){if(!a){var i=1/0;for(c=0;c<e.length;c++){a=e[c][0],r=e[c][1],o=e[c][2];for(var l=!0,n=0;n<a.length;n++)(!1&o||i>=o)&&Object.keys(s.O).every((function(e){return s.O[e](a[n])}))?a.splice(n--,1):(l=!1,o<i&&(i=o));if(l){e.splice(c--,1);var h=r();void 0!==h&&(t=h)}}return t}o=o||0;for(var c=e.length;c>0&&e[c-1][2]>o;c--)e[c]=e[c-1];e[c]=[a,r,o]}}(),function(){s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,{a:t}),t}}(),function(){s.d=function(e,t){for(var a in t)s.o(t,a)&&!s.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})}}(),function(){s.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={524:0};s.O.j=function(t){return 0===e[t]};var t=function(t,a){var r,o,i=a[0],l=a[1],n=a[2],h=0;if(i.some((function(t){return 0!==e[t]}))){for(r in l)s.o(l,r)&&(s.m[r]=l[r]);if(n)var c=n(s)}for(t&&t(a);h<i.length;h++)o=i[h],s.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return s.O(c)},a=self["webpackChunkblock_blast"]=self["webpackChunkblock_blast"]||[];a.forEach(t.bind(null,0)),a.push=t.bind(null,a.push.bind(a))}();var a=s.O(void 0,[504],(function(){return s(3395)}));a=s.O(a)})();
//# sourceMappingURL=app.4305602c.js.map
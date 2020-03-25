(this["webpackJsonpnew-game"]=this["webpackJsonpnew-game"]||[]).push([[0],[,,,,,,,,function(e,t,a){e.exports=a(16)},,,,,function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(7),s=a.n(i),o=(a(13),a(14),a(1)),l=a(2),u=a(4),h=a(3),c=a(5),m=function(e){function t(){return Object(o.a)(this,t),Object(u.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(c.a)(t,e),Object(l.a)(t,[{key:"getValue",value:function(){var e=this.props.value;return!1===e.isRevealed?this.props.value.isFlagged?"F":null:e.isMine?"X":0===e.neighbour?null:e.neighbour}},{key:"render",value:function(){var e=this.props,t=e.value,a=e.onClick,n=e.cMenu,i="cell"+(t.isRevealed?"":" hidden")+(t.isMine?" is-mine":"")+(t.isFlagged?" is-flag":"");return r.a.createElement("div",{onClick:a,className:i,onContextMenu:n},this.getValue())}}]),t}(n.Component),p=function(e){function t(){var e,a;Object(o.a)(this,t);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(a=Object(u.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(r)))).state={boardData:a.initBoardData(a.props.height,a.props.width,a.props.mines),mineCount:a.props.mines,startgame:!1},a.startgame=function(){a.setState({boardData:a.initBoardData(a.props.height,a.props.width,a.props.mines),mineCount:a.props.mines,startgame:!0}),a.props.reset()},a}return Object(c.a)(t,e),Object(l.a)(t,[{key:"revealBoard",value:function(){var e=this.state.boardData;e.map((function(e){return e.map((function(e){return e.isRevealed=!0}))})),this.setState({boardData:e})}},{key:"revealEmpty",value:function(e,t,a){var n=this;return this.traverseBoard(e,t,a).forEach((function(e){e.isFlagged||e.isRevealed||(a[e.x][e.y].isRevealed=!0,e.isEmpty&&n.revealEmpty(e.x,e.y,a))})),a}},{key:"createEmptyArray",value:function(e,t){for(var a=[],n=0;n<e;n++){a.push([]);for(var r=0;r<t;r++)a[n][r]={x:n,y:r,isMine:!1,neighbour:0,isRevealed:!1,isEmpty:!1,isFlagged:!1}}return a}},{key:"plantMines",value:function(e,t,a,n){for(var r,i,s=0;s<n;)r=Math.floor(Math.random()*t*a%t),i=Math.floor(Math.random()*t*a%a),!1===e[r][i].isMine&&(e[r][i].isMine=!0,s++);return e}},{key:"getNeighbours",value:function(e,t,a){for(var n=this,r=e,i=0;i<t;i++)for(var s=0;s<a;s++)!0!==e[i][s].isMine&&function(){var t=0;n.traverseBoard(e[i][s].x,e[i][s].y,e).forEach((function(e){e.isMine&&t++})),0===t&&(r[i][s].isEmpty=!0),r[i][s].neighbour=t}();return r}},{key:"traverseBoard",value:function(e,t,a){var n=[];return e>0&&n.push(a[e-1][t]),e<this.props.height-1&&n.push(a[e+1][t]),t>0&&n.push(a[e][t-1]),t<this.props.width-1&&n.push(a[e][t+1]),e>0&&t>0&&n.push(a[e-1][t-1]),e>0&&t<this.props.width-1&&n.push(a[e-1][t+1]),e<this.props.height-1&&t<this.props.width-1&&n.push(a[e+1][t+1]),e<this.props.height-1&&t>0&&n.push(a[e+1][t-1]),n}},{key:"initBoardData",value:function(e,t,a){var n=this.createEmptyArray(e,t);return n=this.plantMines(n,e,t,a),n=this.getNeighbours(n,e,t)}},{key:"handleContextMenu",value:function(e,t,a){e.preventDefault();var n=this.state.boardData,r=this.state.mineCount;n[t][a].isRevealed||(n[t][a].isFlagged?(n[t][a].isFlagged=!1,r++):(n[t][a].isFlagged=!0,r--),this.setState({boardData:n,mineCount:r}))}},{key:"handleClick",value:function(e,t){if(this.state.boardData[e][t].isMine){this.revealBoard();this.props.gameresult("Lost")}if(this.state.boardData[e][t].isRevealed||this.state.isFlagged)return null;var a=this.state.boardData;a[e][t].isFlagged=!1,a[e][t].isRevealed=!0,a[e][t].isEmpty&&(a=this.revealEmpty(e,t,a));var n=[];if(a.forEach((function(e){e.forEach((function(e){e.isRevealed||n.push(e)}))})),n.length===this.props.mines){this.setState({mineCount:0}),this.revealBoard();this.props.gameresult("Won")}this.setState({boardData:a})}},{key:"renderBoard",value:function(e){var t=this;return e.map((function(e){return e.map((function(a){return r.a.createElement("div",{key:a.x*e.length+a.y},r.a.createElement(m,{value:a,onClick:function(){return t.handleClick(a.x,a.y)},cMenu:function(e){return t.handleContextMenu(e,a.x,a.y)}})," ")}))}))}},{key:"render",value:function(){return r.a.createElement("div",{className:"board"},r.a.createElement("div",{style:{marginBottom:"5vmin"}},r.a.createElement("span",{className:"info"}," Mines remaining: ",this.state.mineCount," ")),this.renderBoard(this.state.boardData),r.a.createElement("div",null,r.a.createElement("button",{className:"vibrate-1",onClick:this.startgame},"START GAME")))}}]),t}(n.Component),d=(a(15),function(e){var t="swirl-in-fwd",a=e.result;return"Won"===e.result?(t+=" result",a="congratulations you have won it!!"):(t+=" lost",a="you have lost the game try again!!"),r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:t},r.a.createElement("div",{className:"resultname"},a)))}),v=function(e){function t(){var e,a;Object(o.a)(this,t);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(a=Object(u.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(r)))).state={height:6,width:6,mines:6,result:""},a.resetgame=function(){a.setState({result:""})},a.gameResultHandler=function(e){var t=e;console.log("message",e),a.setState({result:t})},a}return Object(c.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this,t=this.state,a=t.height,n=t.width,i=t.mines,s=n/2*100,o=this.state.result,l=s.toString();return r.a.createElement("div",null,r.a.createElement("div",{className:"game",style:{maxWidth:l+"px"}},r.a.createElement(p,{gameresult:function(t){return e.gameResultHandler(t)},reset:this.resetgame,height:a,width:n,mines:i}),""===o?null:r.a.createElement(d,{result:o})))}}]),t}(n.Component);var g=function(){return r.a.createElement("div",{className:"App"},r.a.createElement(v,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(r.a.createElement(g,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}],[[8,1,2]]]);
//# sourceMappingURL=main.46694115.chunk.js.map
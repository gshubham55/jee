(function(){var d,e,g,b,c=function(h,i){return function(){return h.apply(i,arguments)}};d=jQuery;e={};e.Line=(function(){function h(i){this.updateHilight=c(this.updateHilight,this);this.hilight=c(this.hilight,this);this.updateHover=c(this.updateHover,this);this.transY=c(this.transY,this);this.transX=c(this.transX,this);if(!(this instanceof e.Line)){return new e.Line(i)}if(typeof i.element==="string"){this.el=d(document.getElementById(i.element))}else{this.el=d(i.element)}if(this.el===null||this.el.length===0){throw new Error("Graph placeholder not found.")}this.options=d.extend({},this.defaults,i);if(typeof this.options.units==="string"){this.options.postUnits=i.units}if(this.options.data===void 0||this.options.data.length===0){return}this.el.addClass("graph-initialised");this.precalc();this.redraw()}h.prototype.defaults={lineWidth:3,pointSize:4,lineColors:["#0b62a4","#7A92A3","#4da74d","#afd8f8","#edc240","#cb4b4b","#9440ed"],ymax:"auto",ymin:"auto 0",marginTop:25,marginRight:25,marginBottom:30,marginLeft:25,numLines:5,gridLineColor:"#aaa",gridTextColor:"#888",gridTextSize:12,gridStrokeWidth:0.5,hoverPaddingX:10,hoverPaddingY:5,hoverMargin:10,hoverFillColor:"#fff",hoverBorderColor:"#ccc",hoverBorderWidth:2,hoverOpacity:0.95,hoverLabelColor:"#444",hoverFontSize:12,smooth:true,hideHover:false,parseTime:true,preUnits:"",postUnits:"",dateFormat:function(i){return new Date(i).toString()},xLabels:"auto",xLabelFormat:null};h.prototype.precalc=function(){var w,k,t,n,j,y,s,r,m,x,i,u,q,l,p,v=this;this.options.data=this.options.data.slice(0);this.options.data.sort(function(A,z){return(A[v.options.xkey]<z[v.options.xkey])-(z[v.options.xkey]<A[v.options.xkey])});this.columnLabels=d.map(this.options.data,function(z){return z[v.options.xkey]});this.seriesLabels=this.options.labels;this.series=[];u=this.options.ykeys;for(s=0,x=u.length;s<x;s++){n=u[s];k=[];q=this.options.data;for(r=0,i=q.length;r<i;r++){w=q[r];k.push(typeof w[n]==="number"?w[n]:null)}this.series.push(k)}if(this.options.parseTime){this.xvals=d.map(this.columnLabels,function(z){return e.parseDate(z)})}else{this.xvals=(function(){p=[];for(var z=l=this.columnLabels.length-1;l<=0?z<=0:z>=0;l<=0?z++:z--){p.push(z)}return p}).apply(this)}if(this.options.parseTime){this.columnLabels=d.map(this.columnLabels,function(z){if(typeof z==="number"){return v.options.dateFormat(z)}else{return z}})}this.xmin=Math.min.apply(null,this.xvals);this.xmax=Math.max.apply(null,this.xvals);if(this.xmin===this.xmax){this.xmin-=1;this.xmax+=1}if(typeof this.options.ymax==="string"&&this.options.ymax.slice(0,4)==="auto"){j=Math.max.apply(null,Array.prototype.concat.apply([],this.series));if(this.options.ymax.length>5){this.options.ymax=Math.max(parseInt(this.options.ymax.slice(5),10),j)}else{this.options.ymax=j}}if(typeof this.options.ymin==="string"&&this.options.ymin.slice(0,4)==="auto"){y=Math.min.apply(null,Array.prototype.concat.apply([],this.series));if(this.options.ymin.length>5){this.options.ymin=Math.min(parseInt(this.options.ymin.slice(5),10),y)}else{this.options.ymin=y}}this.pointGrow=Raphael.animation({r:this.options.pointSize+3},25,"linear");this.pointShrink=Raphael.animation({r:this.options.pointSize},25,"linear");this.elementWidth=null;this.elementHeight=null;this.prevHilight=null;this.el.mousemove(function(z){return v.updateHilight(z.pageX)});if(this.options.hideHover){this.el.mouseout(function(z){return v.hilight(null)})}t=function(z){var A;A=z.originalEvent.touches[0]||z.originalEvent.changedTouches[0];v.updateHilight(A.pageX);return A};this.el.bind("touchstart",t);this.el.bind("touchmove",t);return this.el.bind("touchend",t)};h.prototype.calc=function(){var l,r,i,q,p,j,n,k,m=this;q=this.el.width();l=this.el.height();if(this.elementWidth!==q||this.elementHeight!==l){this.maxYLabelWidth=Math.max(this.measureText(this.yLabelFormat(this.options.ymin),this.options.gridTextSize).width,this.measureText(this.yLabelFormat(this.options.ymax),this.options.gridTextSize).width);this.left=this.maxYLabelWidth+this.options.marginLeft;this.width=this.el.width()-this.left-this.options.marginRight;this.height=this.el.height()-this.options.marginTop-this.options.marginBottom;this.dx=this.width/(this.xmax-this.xmin);this.dy=this.height/(this.options.ymax-this.options.ymin);this.columns=(function(){var v,t,u,s;u=this.xvals;s=[];for(v=0,t=u.length;v<t;v++){p=u[v];s.push(this.transX(p))}return s}).call(this);this.seriesCoords=[];k=this.series;for(j=0,n=k.length;j<n;j++){r=k[j];i=[];d.each(r,function(s,t){if(t===null){return i.push(null)}else{return i.push({x:m.columns[s],y:m.transY(t)})}});this.seriesCoords.push(i)}return this.hoverMargins=d.map(this.columns.slice(1),function(s,t){return(s+m.columns[t])/2})}};h.prototype.transX=function(i){if(this.xvals.length===1){return this.left+this.width/2}else{return this.left+(i-this.xmin)*this.dx}};h.prototype.transY=function(i){return this.options.marginTop+this.height-(i-this.options.ymin)*this.dy};h.prototype.redraw=function(){this.el.empty();this.r=new Raphael(this.el[0]);this.calc();this.drawGrid();this.drawSeries();this.drawHover();return this.hilight(this.options.hideHover?null:0)};h.prototype.drawGrid=function(){var B,z,H,F,t,s,E,C,A,q,x,D,u,n,k,j,I,w,p,m,r,G=this;D=(this.options.ymax-this.options.ymin)/(this.options.numLines-1);z=Math.ceil(this.options.ymin/D)*D;s=Math.floor(this.options.ymax/D)*D;for(E=n=z;z<=s?n<=s:n>=s;E=n+=D){A=Math.floor(E);x=this.transY(A);this.r.text(this.left-this.options.marginLeft/2,x,this.yLabelFormat(A)).attr("font-size",this.options.gridTextSize).attr("fill",this.options.gridTextColor).attr("text-anchor","end");this.r.path("M"+this.left+","+x+"H"+(this.left+this.width)).attr("stroke",this.options.gridLineColor).attr("stroke-width",this.options.gridStrokeWidth)}u=this.options.marginTop+this.height+this.options.marginBottom/2;q=50;C=null;B=function(y,i){var l,v;l=G.r.text(G.transX(i),u,y).attr("font-size",G.options.gridTextSize).attr("fill",G.options.gridTextColor);v=l.getBBox();if(C===null||C<=v.x){return C=v.x+v.width+q}else{return l.remove()}};if(this.options.parseTime){if(this.columnLabels.length===1&&this.options.xLabels==="auto"){return B(this.columnLabels[0],this.xvals[0])}else{w=e.labelSeries(this.xmin,this.xmax,this.width,this.options.xLabels,this.options.xLabelFormat);m=[];for(k=0,I=w.length;k<I;k++){F=w[k];m.push(B(F[0],F[1]))}return m}}else{r=[];for(H=j=0,p=this.columnLabels.length;0<=p?j<=p:j>=p;H=0<=p?++j:--j){t=this.columnLabels[this.columnLabels.length-H-1];r.push(B(t,H))}return r}};h.prototype.drawSeries=function(){var r,j,s,q,t,n,m,p,l,k;for(q=n=p=this.seriesCoords.length-1;p<=0?n<=0:n>=0;q=p<=0?++n:--n){s=this.seriesCoords[q];if(s.length>1){t=this.createPath(s,this.options.marginTop,this.left,this.options.marginTop+this.height,this.left+this.width);this.r.path(t).attr("stroke",this.options.lineColors[q]).attr("stroke-width",this.options.lineWidth)}}this.seriesPoints=(function(){var v,i,u;u=[];for(q=v=0,i=this.seriesCoords.length-1;0<=i?v<=i:v>=i;q=0<=i?++v:--v){u.push([])}return u}).call(this);k=[];for(q=m=l=this.seriesCoords.length-1;l<=0?m<=0:m>=0;q=l<=0?++m:--m){k.push((function(){var v,i,w,u;w=this.seriesCoords[q];u=[];for(v=0,i=w.length;v<i;v++){r=w[v];if(r===null){j=null}else{j=this.r.circle(r.x,r.y,this.options.pointSize).attr("fill",this.options.lineColors[q]).attr("stroke-width",1).attr("stroke","#ffffff")}u.push(this.seriesPoints[q].push(j))}return u}).call(this))}return k};h.prototype.createPath=function(v,s,n,p,C){var D,w,A,y,x,m,u,r,t,B,z,l,k,j,q;t="";w=d.map(v,function(i){return i});if(this.options.smooth){y=this.gradients(w);for(x=j=0,q=w.length-1;0<=q?j<=q:j>=q;x=0<=q?++j:--j){D=w[x];if(x===0){t+="M"+D.x+","+D.y}else{A=y[x];u=w[x-1];r=y[x-1];m=(D.x-u.x)/4;B=u.x+m;l=Math.min(p,u.y+m*r);z=D.x-m;k=Math.min(p,D.y-m*A);t+="C"+B+","+l+","+z+","+k+","+D.x+","+D.y}}}else{t="M"+d.map(w,function(i){return""+i.x+","+i.y}).join("L")}return t};h.prototype.gradients=function(i){return d.map(i,function(k,j){if(j===0){return(i[1].y-k.y)/(i[1].x-k.x)}else{if(j===(i.length-1)){return(k.y-i[j-1].y)/(k.x-i[j-1].x)}else{return(i[j+1].y-i[j-1].y)/(i[j+1].x-i[j-1].x)}}})};h.prototype.drawHover=function(){var l,j,n,m,k;this.hoverHeight=this.options.hoverFontSize*1.5*(this.series.length+1);this.hover=this.r.rect(-10,-this.hoverHeight/2-this.options.hoverPaddingY,20,this.hoverHeight+this.options.hoverPaddingY*2,10).attr("fill",this.options.hoverFillColor).attr("stroke",this.options.hoverBorderColor).attr("stroke-width",this.options.hoverBorderWidth).attr("opacity",this.options.hoverOpacity);this.xLabel=this.r.text(0,(this.options.hoverFontSize*0.75)-this.hoverHeight/2,"").attr("fill",this.options.hoverLabelColor).attr("font-weight","bold").attr("font-size",this.options.hoverFontSize);this.hoverSet=this.r.set();this.hoverSet.push(this.hover);this.hoverSet.push(this.xLabel);this.yLabels=[];k=[];for(l=n=0,m=this.series.length-1;0<=m?n<=m:n>=m;l=0<=m?++n:--n){j=this.r.text(0,this.options.hoverFontSize*1.5*(l+1.5)-this.hoverHeight/2,"").attr("fill",this.options.lineColors[l]).attr("font-size",this.options.hoverFontSize);this.yLabels.push(j);k.push(this.hoverSet.push(j))}return k};h.prototype.updateHover=function(k){var l,q,j,p,n,m,r=this;this.hoverSet.show();this.xLabel.attr("text",this.columnLabels[k]);for(l=n=0,m=this.series.length-1;0<=m?n<=m:n>=m;l=0<=m?++n:--n){this.yLabels[l].attr("text",""+this.seriesLabels[l]+": "+(this.yLabelFormat(this.series[l][k])))}q=Math.max.apply(null,d.map(this.yLabels,function(i){return i.getBBox().width}));q=Math.max(q,this.xLabel.getBBox().width);this.hover.attr("width",q+this.options.hoverPaddingX*2);this.hover.attr("x",-this.options.hoverPaddingX-q/2);p=Math.min.apply(null,d.map(this.series,function(i){return r.transY(i[k])}));if(p>this.hoverHeight+this.options.hoverPaddingY*2+this.options.hoverMargin+this.options.marginTop){p=p-this.hoverHeight/2-this.options.hoverPaddingY-this.options.hoverMargin}else{p=p+this.hoverHeight/2+this.options.hoverPaddingY+this.options.hoverMargin}p=Math.max(this.options.marginTop+this.hoverHeight/2+this.options.hoverPaddingY,p);p=Math.min(this.options.marginTop+this.height-this.hoverHeight/2-this.options.hoverPaddingY,p);j=Math.min(this.left+this.width-q/2-this.options.hoverPaddingX,this.columns[k]);j=Math.max(this.left+q/2+this.options.hoverPaddingX,j);return this.hoverSet.attr("transform","t"+j+","+p)};h.prototype.hideHover=function(){return this.hoverSet.hide()};h.prototype.hilight=function(k){var l,p,m,n,j;if(this.prevHilight!==null&&this.prevHilight!==k){for(l=p=0,n=this.seriesPoints.length-1;0<=n?p<=n:p>=n;l=0<=n?++p:--p){if(this.seriesPoints[l][this.prevHilight]){this.seriesPoints[l][this.prevHilight].animate(this.pointShrink)}}}if(k!==null&&this.prevHilight!==k){for(l=m=0,j=this.seriesPoints.length-1;0<=j?m<=j:m>=j;l=0<=j?++m:--m){if(this.seriesPoints[l][k]){this.seriesPoints[l][k].animate(this.pointGrow)}}this.updateHover(k)}this.prevHilight=k;if(k===null){return this.hideHover()}};h.prototype.updateHilight=function(i){var k,m,l,j;i-=this.el.offset().left;j=[];for(k=m=l=this.hoverMargins.length;l<=0?m<=0:m>=0;k=l<=0?++m:--m){if(k===0||this.hoverMargins[k-1]>i){this.hilight(k);break}else{j.push(void 0)}}return j};h.prototype.measureText=function(l,k){var i,j;if(k==null){k=12}j=this.r.text(100,100,l).attr("font-size",k);i=j.getBBox();j.remove();return i};h.prototype.yLabelFormat=function(i){return""+this.options.preUnits+(e.commas(i))+this.options.postUnits};return h})();e.parseDate=function(t){var v,u,i,s,l,y,k,j,h,x,w;if(typeof t==="number"){return t}u=t.match(/^(\d+) Q(\d)$/);s=t.match(/^(\d+)-(\d+)$/);l=t.match(/^(\d+)-(\d+)-(\d+)$/);k=t.match(/^(\d+) W(\d+)$/);j=t.match(/^(\d+)-(\d+)-(\d+)[ T](\d+):(\d+)(Z|([+-])(\d\d):?(\d\d))?$/);h=t.match(/^(\d+)-(\d+)-(\d+)[ T](\d+):(\d+):(\d+(\.\d+)?)(Z|([+-])(\d\d):?(\d\d))?$/);if(u){return new Date(parseInt(u[1],10),parseInt(u[2],10)*3-1,1).getTime()}else{if(s){return new Date(parseInt(s[1],10),parseInt(s[2],10)-1,1).getTime()}else{if(l){return new Date(parseInt(l[1],10),parseInt(l[2],10)-1,parseInt(l[3],10)).getTime()}else{if(k){x=new Date(parseInt(k[1],10),0,1);if(x.getDay()!==4){x.setMonth(0,1+((4-x.getDay())+7)%7)}return x.getTime()+parseInt(k[2],10)*604800000}else{if(j){if(!j[6]){return new Date(parseInt(j[1],10),parseInt(j[2],10)-1,parseInt(j[3],10),parseInt(j[4],10),parseInt(j[5],10)).getTime()}else{y=0;if(j[6]!=="Z"){y=parseInt(j[8],10)*60+parseInt(j[9],10);if(j[7]==="+"){y=0-y}}return Date.UTC(parseInt(j[1],10),parseInt(j[2],10)-1,parseInt(j[3],10),parseInt(j[4],10),parseInt(j[5],10)+y)}}else{if(h){w=parseFloat(h[6]);v=Math.floor(w);i=Math.round((w-v)*1000);if(!h[8]){return new Date(parseInt(h[1],10),parseInt(h[2],10)-1,parseInt(h[3],10),parseInt(h[4],10),parseInt(h[5],10),v,i).getTime()}else{y=0;if(h[8]!=="Z"){y=parseInt(h[10],10)*60+parseInt(h[11],10);if(h[9]==="+"){y=0-y}}return Date.UTC(parseInt(h[1],10),parseInt(h[2],10)-1,parseInt(h[3],10),parseInt(h[4],10),parseInt(h[5],10)+y,v,i)}}else{return new Date(parseInt(t,10),0,1).getTime()}}}}}}};e.commas=function(j){var k,i,h,l;if(j===null){return"n/a"}else{h=j<0?"-":"";k=Math.abs(j);i=Math.floor(k).toFixed(0);h+=i.replace(/(?=(?:\d{3})+$)(?!^)/g,",");l=k.toString();if(l.length>i.length){h+=l.slice(i.length)}return h}};e.pad2=function(h){return(h<10?"0":"")+h};e.labelSeries=function(k,r,p,h,x){var q,j,v,i,n,z,w,y,l,u,m;v=200*(r-k)/p;j=new Date(k);w=e.LABEL_SPECS[h];if(w===void 0){m=e.AUTO_LABEL_ORDER;for(l=0,u=m.length;l<u;l++){i=m[l];z=e.LABEL_SPECS[i];if(v>=z.span){w=z;break}}}if(w===void 0){w=e.LABEL_SPECS.second}if(x){w=d.extend({},w,{fmt:x})}q=w.start(j);n=[];while((y=q.getTime())<=r){if(y>=k){n.push([w.fmt(q),y])}w.incr(q)}return n};g=function(h){return{span:h*60*1000,start:function(i){return new Date(i.getFullYear(),i.getMonth(),i.getDate(),i.getHours())},fmt:function(i){return""+(e.pad2(i.getHours()))+":"+(e.pad2(i.getMinutes()))},incr:function(i){return i.setMinutes(i.getMinutes()+h)}}};b=function(h){return{span:h*1000,start:function(i){return new Date(i.getFullYear(),i.getMonth(),i.getDate(),i.getHours(),i.getMinutes())},fmt:function(i){return""+(e.pad2(i.getHours()))+":"+(e.pad2(i.getMinutes()))+":"+(e.pad2(i.getSeconds()))},incr:function(i){return i.setSeconds(i.getSeconds()+h)}}};e.LABEL_SPECS={year:{span:17280000000,start:function(h){return new Date(h.getFullYear(),0,1)},fmt:function(h){return""+(h.getFullYear())},incr:function(h){return h.setFullYear(h.getFullYear()+1)}},month:{span:2419200000,start:function(h){return new Date(h.getFullYear(),h.getMonth(),1)},fmt:function(h){return""+(h.getFullYear())+"-"+(e.pad2(h.getMonth()+1))},incr:function(h){return h.setMonth(h.getMonth()+1)}},day:{span:86400000,start:function(h){return new Date(h.getFullYear(),h.getMonth(),h.getDate())},fmt:function(h){return""+(h.getFullYear())+"-"+(e.pad2(h.getMonth()+1))+"-"+(e.pad2(h.getDate()))},incr:function(h){return h.setDate(h.getDate()+1)}},hour:g(60),};e.AUTO_LABEL_ORDER=["year"];window.Morris=e}).call(this);window.log=function f(){log.history=log.history||[];log.history.push(arguments);if(this.console){var b=arguments,c;b.callee=b.callee.caller;c=[].slice.call(b);if(typeof console.log==="object"){log.apply.call(console.log,console,c)}else{console.log.apply(console,c)}}};(function(g){function e(){}for(var i="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","),h;!!(h=i.pop());){g[h]=g[h]||e}})(function(){try{console.log();return window.console}catch(b){return(window.console={})}}());var a=[];$.getJSON("rank",function(b){a=b;o=Morris.Line({element:"rank",data:a,xkey:1,ykeys:[0],labels:["Marks "],xLabels:["as"],parseTime:false})});
document.getElementById('note').innerHTML += "<h3>Marks are not exact but averaged for nearby 20 ranks initially and 100 for last ranks</h3>"
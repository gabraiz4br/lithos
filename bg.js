// Fundo pixelado: estrelas e asteroides à deriva (320x180 ampliado)
(function(){
  var c=document.getElementById('bg'); if(!c) return;
  var g=c.getContext('2d'), still=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  var S=3,W,H,stars=[],rocks=[];
  function size(){W=Math.ceil(innerWidth/S);H=Math.ceil(innerHeight/S);c.width=W;c.height=H;
    stars=[];for(var i=0;i<Math.floor(W*H/260);i++)stars.push({x:Math.random()*W,y:Math.random()*H,l:Math.floor(Math.random()*3),p:Math.random()*6});
    rocks=[];for(i=0;i<7;i++)rocks.push(rock());}
  function rock(){var r=5+Math.random()*13,n=8+Math.floor(Math.random()*4),p=[];
    for(var i=0;i<n;i++){var t=i*6.283/n,rr=r*(.78+.3*Math.random());p.push([Math.cos(t)*rr,Math.sin(t)*rr]);}
    var a=Math.random()*6.283,sp=2+Math.random()*5;
    return{x:Math.random()*W,y:Math.random()*H,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp,rot:Math.random()*6.28,vr:(Math.random()-.5)*.5,r:r,p:p};}
  function line(x0,y0,x1,y1){x0=Math.round(x0);y0=Math.round(y0);x1=Math.round(x1);y1=Math.round(y1);
    var dx=Math.abs(x1-x0),dy=-Math.abs(y1-y0),sx=x0<x1?1:-1,sy=y0<y1?1:-1,e=dx+dy,n=0;
    for(;;){g.fillRect(x0,y0,1,1);if((x0==x1&&y0==y1)||n++>400)break;var e2=2*e;if(e2>=dy){e+=dy;x0+=sx}if(e2<=dx){e+=dx;y0+=sy}}}
  var last=performance.now();
  function frame(t){var dt=Math.min((t-last)/1000,.05);last=t;
    g.clearRect(0,0,W,H);
    var cols=['#303030','#787878','#bebebe'];
    for(var i=0;i<stars.length;i++){var s=stars[i];g.fillStyle=(s.l==2&&Math.sin(t/500+s.p)>.2)?'#fff':cols[s.l];g.fillRect(s.x|0,s.y|0,1,1);}
    g.fillStyle='#505050';
    for(i=0;i<rocks.length;i++){var k=rocks[i];
      if(!still){k.x+=k.vx*dt;k.y+=k.vy*dt;k.rot+=k.vr*dt;
        if(k.x<-30)k.x=W+30;if(k.x>W+30)k.x=-30;if(k.y<-30)k.y=H+30;if(k.y>H+30)k.y=-30;}
      var cs=Math.cos(k.rot),sn=Math.sin(k.rot),q=k.p.map(function(v){return[k.x+v[0]*cs-v[1]*sn,k.y+v[0]*sn+v[1]*cs]});
      for(var j=0;j<q.length;j++){var a=q[j],b=q[(j+1)%q.length];line(a[0],a[1],b[0],b[1]);}}
    if(!still)requestAnimationFrame(frame);}
  size();addEventListener('resize',size);requestAnimationFrame(frame);
})();

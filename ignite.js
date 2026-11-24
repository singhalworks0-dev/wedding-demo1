(()=>{
const scene=document.querySelector('#gifts'),lantern=scene.querySelector('.wish-lantern'),message=scene.querySelector('#gift-message');
const media=matchMedia('(prefers-reduced-motion: reduce)');let lit=false,timers=[],motion=[],raf=0,last=0,time=0;
function move(el,frames,options){if(media.matches)return null;const a=el.animate(frames,options);motion.push(a);return a;}
function float(){move(lantern,[{transform:'translate3d(0,0,0) rotateX(3deg) rotateY(-12deg) rotateZ(-2deg)'},{transform:'translate3d(0,-12px,18px) rotateX(-3deg) rotateY(12deg) rotateZ(2deg)'},{transform:'translate3d(0,0,0) rotateX(3deg) rotateY(-12deg) rotateZ(-2deg)'}],{duration:6500,iterations:Infinity,easing:'ease-in-out'});}
function clean(){timers.forEach(clearTimeout);timers=[];motion.forEach(a=>a.cancel());motion=[];cancelAnimationFrame(raf);raf=0;}
function reset(){clean();lit=false;scene.classList.remove('is-lit','message-visible');message.hidden=true;lantern.setAttribute('aria-expanded','false');lantern.setAttribute('aria-label','Light the lantern');scene.querySelector('#light-status').textContent='';ctx.clearRect(0,0,w,h);}
function enter(){reset();float();move(lantern,[{opacity:0,translate:'0 20px'},{opacity:1,translate:'0 0'}],{duration:1300,fill:'backwards',easing:'ease-out'});}
function ignite(){if(lit){move(scene.querySelector('.light-aura'),[{opacity:.5,scale:1.2},{opacity:1,scale:1.7},{opacity:1,scale:1.6}],{duration:1600,easing:'ease-out'});return;}lit=true;scene.classList.add('is-lit');lantern.setAttribute('aria-expanded','true');lantern.setAttribute('aria-label','Make the lantern glow');
move(scene.querySelector('.light-ring'),[{opacity:0,scale:.3},{opacity:.65,scale:1,offset:.12},{opacity:0,scale:7}],{duration:2600,easing:'cubic-bezier(.15,.65,.25,1)'});
move(scene.querySelector('.light-rays'),[{rotate:'0deg'},{rotate:'25deg'}],{duration:26000,iterations:Infinity,direction:'alternate',easing:'ease-in-out'});
const reveal=()=>{message.hidden=false;requestAnimationFrame(()=>scene.classList.add('message-visible'));scene.querySelector('#light-status').textContent='The lantern is lit. You are our light. No gifts needed. Just you.';};
if(media.matches)reveal();else{timers.push(setTimeout(reveal,1500));last=performance.now();raf=requestAnimationFrame(draw);}}
lantern.addEventListener('click',ignite);
const canvas=scene.querySelector('.light-dust'),ctx=canvas.getContext('2d');let w=1,h=1;
const sparks=Array.from({length:48},()=>({x:(Math.random()-.5)*900,y:Math.random()*1000,z:Math.random()*900,speed:10+Math.random()*22,size:1+Math.random()*2,phase:Math.random()*6}));
function resize(){const r=scene.getBoundingClientRect();w=Math.max(1,r.width);h=Math.max(1,r.height);const dpr=Math.min(devicePixelRatio||1,1.5);canvas.width=w*dpr;canvas.height=h*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);}new ResizeObserver(resize).observe(scene);resize();
function draw(t){raf=0;if(!lit||media.matches||document.hidden||!scene.classList.contains('current-scene'))return;const dt=Math.min((t-last)/1000,.05);last=t;time+=dt;ctx.clearRect(0,0,w,h);const warmth=Math.min(1,time/2);for(const p of sparks){p.y-=p.speed*dt;if(p.y< -100)p.y=900;const depth=700/(700+p.z);const x=w/2+(p.x+Math.sin(time*.3+p.phase)*30)*depth,y=h-(p.y*depth);ctx.globalAlpha=warmth*(.18+.35*Math.sin(time+p.phase)**2);ctx.fillStyle='#bd9848';ctx.shadowColor='#ffdc81';ctx.shadowBlur=8;ctx.beginPath();ctx.arc(x,y,p.size*depth,0,Math.PI*2);ctx.fill();}ctx.globalAlpha=1;ctx.shadowBlur=0;raf=requestAnimationFrame(draw);}
window.addEventListener('invitation:scene',e=>{if(e.detail.id==='gifts')enter();else reset();});
document.addEventListener('visibilitychange',()=>{if(document.hidden){motion.forEach(a=>a.pause());cancelAnimationFrame(raf);raf=0;}else if(scene.classList.contains('current-scene')){motion.forEach(a=>a.play());if(lit&&!media.matches){last=performance.now();raf=requestAnimationFrame(draw);}}});
media.addEventListener('change',()=>{motion.forEach(a=>a.cancel());motion=[];cancelAnimationFrame(raf);raf=0;if(!media.matches&&scene.classList.contains('current-scene')){float();if(lit){last=performance.now();raf=requestAnimationFrame(draw);}}});
})();

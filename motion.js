/* Web Animations choreograph the painted layers; canvas adds floating light. */
(()=>{
const scene=document.querySelector('.garden-scene');
const media=matchMedia('(prefers-reduced-motion: reduce)');
const walkingAnimations=[];
const animations=[];let active=false,raf=0,last=0,elapsed=0,burst=[];
const canvas=document.querySelector('#garden-atmosphere'),ctx=canvas.getContext('2d');
let width=1,height=1;
function resize(){const r=scene.getBoundingClientRect();width=r.width;height=r.height;const dpr=Math.min(devicePixelRatio||1,2);canvas.width=width*dpr;canvas.height=height*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);}
new ResizeObserver(resize).observe(scene);resize();
const particles=Array.from({length:24},()=>({x:Math.random(),y:Math.random(),speed:.012+Math.random()*.023,size:1+Math.random()*2,phase:Math.random()*Math.PI*2}));
function animate(el,frames,options){const a=el.animate(frames,{...options,iterations:Infinity});animations.push(a);return a;}
if(!media.matches){
walkingAnimations.push(animate(document.querySelector('.couple-journey'),[{transform:'translateX(-65px) scale(.94)'},{transform:'translateX(0) scale(1)',offset:.5},{transform:'translateX(65px) scale(.94)'}],{duration:18000,direction:'alternate',easing:'ease-in-out'}));
walkingAnimations.push(animate(document.querySelector('.walking-couple'),[{backgroundPosition:'0% 0%'},{backgroundPosition:'133.333333% 0%'}],{duration:1600,easing:'steps(4, end)'}));
walkingAnimations.push(animate(document.querySelector('.couple-shadow'),[{transform:'scaleX(.88)',opacity:.6},{transform:'scaleX(1.04)',opacity:.9},{transform:'scaleX(.88)',opacity:.6}],{duration:800}));
document.querySelectorAll('.flower-layer').forEach((el,i)=>animate(el,[{transform:'rotate(-2deg) translateY(0)'},{transform:'rotate(2deg) translateY(-5px)'},{transform:'rotate(-2deg) translateY(0)'}],{duration:7500+i*700,easing:'ease-in-out'}));
document.querySelectorAll('.butterfly').forEach((el,i)=>animate(el,[{transform:'translate(0,0) rotate(-12deg)'},{transform:'translate(38px,-30px) rotate(15deg)',offset:.35},{transform:'translate(-12px,-58px) rotate(-8deg)',offset:.7},{transform:'translate(0,0) rotate(-12deg)'}],{duration:9000+i*2500,easing:'ease-in-out'}));
animate(document.querySelector('.sun-haze'),[{opacity:.4},{opacity:1},{opacity:.4}],{duration:7000,easing:'ease-in-out'});
const ribbon=document.querySelector('.garden-ribbon path');ribbon.animate([{strokeDashoffset:1400},{strokeDashoffset:0}],{duration:4500,fill:'forwards',delay:1200,easing:'ease-in-out'});
}
function draw(time){if(!active||media.matches){raf=0;return;}const dt=Math.min((time-last)/1000,.05)||.016;last=time;elapsed+=dt;ctx.clearRect(0,0,width,height);
for(const p of particles){p.y=(p.y+dt*p.speed)%1;const x=p.x*width+Math.sin(elapsed*.35+p.phase)*22;const y=p.y*height;const alpha=.2+Math.sin(elapsed+p.phase)**2*.5;ctx.fillStyle=`rgba(248,223,161,${alpha})`;ctx.shadowColor='#ffe8a6';ctx.shadowBlur=7;ctx.beginPath();ctx.arc(x,y,p.size,0,Math.PI*2);ctx.fill();}
ctx.shadowBlur=0;burst=burst.filter(p=>p.life>0);for(const p of burst){p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=18*dt;p.life-=dt;p.angle+=dt*2;ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.angle);ctx.globalAlpha=Math.min(1,p.life);ctx.fillStyle=p.color;ctx.beginPath();ctx.ellipse(0,0,p.size,p.size*.5,0,0,Math.PI*2);ctx.fill();ctx.restore();}ctx.globalAlpha=1;raf=requestAnimationFrame(draw);}
function play(){if(media.matches||!active)return;animations.forEach(a=>a.play());if(!raf){last=performance.now();raf=requestAnimationFrame(draw);}}
function pause(){animations.forEach(a=>a.pause());cancelAnimationFrame(raf);raf=0;}
function canPlay(){return document.querySelector('#envelope').classList.contains('opened')&&document.querySelector('#home').classList.contains('current-scene')&&!document.hidden;}
function restartWalk(){walkingAnimations.forEach(animation=>{animation.pause();animation.currentTime=0;});active=canPlay();if(active)play();else pause();}
window.addEventListener('invitation:scene',e=>{if(e.detail.id==='home')restartWalk();else{active=false;pause();}});
const letter=document.querySelector('#envelope');let letterOpened=false;
new MutationObserver(()=>{if(letter.classList.contains('opened')&&!letterOpened){letterOpened=true;restartWalk();}}).observe(letter,{attributes:true,attributeFilter:['class']});
new IntersectionObserver(entries=>{active=entries[0].isIntersecting&&canPlay();if(active)play();else pause();},{threshold:.05}).observe(scene);
function magic(x,y){if(media.matches)return;for(let i=0;i<24;i++)burst.push({x,y,vx:(Math.random()-.5)*120,vy:-25-Math.random()*100,life:2+Math.random()*2,angle:Math.random()*6,size:3+Math.random()*4,color:['#e1b1a1','#f1d8be','#c7a66a','#d5b6a8'][i%4]});if(active)play();}
scene.addEventListener('click',e=>{const r=scene.getBoundingClientRect();magic(e.clientX-r.left,e.clientY-r.top);});
document.querySelector('.garden-touch').addEventListener('click',e=>{e.stopPropagation();magic(width/2,height*.55);});
scene.addEventListener('pointermove',e=>{if(media.matches||e.pointerType==='touch')return;const r=scene.getBoundingClientRect();scene.style.setProperty('--drift-x',`${(e.clientX-r.left-width/2)*.015}px`);scene.style.setProperty('--drift-y',`${(e.clientY-r.top-height/2)*.015}px`);});
document.addEventListener('visibilitychange',()=>{if(document.hidden)pause();else if(active)play();});
media.addEventListener('change',()=>{if(media.matches){pause();ctx.clearRect(0,0,width,height);}else play();});
const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(!entry.isIntersecting)return;if(!media.matches)entry.target.animate([{opacity:0,transform:'translateY(32px) rotate(-1deg)'},{opacity:1,transform:'translateY(0) rotate(0)'}],{duration:1200,easing:'cubic-bezier(.2,.7,.2,1)',fill:'both'});revealObserver.unobserve(entry.target);}),{threshold:.1});document.querySelectorAll('.event-card,.chapter-mark').forEach(el=>revealObserver.observe(el));
})();

(()=>{
const main=document.querySelector('main');
const scenes=[...main.children].filter(el=>el.matches('section'));
const titles=["We’re getting married",'Our story','Schedule','Dress code','Travel & stay','Gifts','RSVP'];
scenes.forEach((scene,i)=>{scene.classList.add('invitation-scene');scene.dataset.sceneIndex=i;scene.setAttribute('aria-label',titles[i]);const inner=document.createElement('div');inner.className='scene-content';while(scene.firstChild)inner.append(scene.firstChild);scene.append(inner);});
const controls=document.createElement('div');controls.className='scene-controls';controls.innerHTML='<button type="button" id="scene-back" aria-label="Previous invitation scene">Back</button><div class="scene-position"><span id="scene-label"></span><span id="scene-progress" aria-hidden="true"></span></div><button type="button" id="scene-next">Next <span>✧</span></button><span class="sr-only" id="scene-announcement" role="status" aria-live="polite"></span>';document.body.append(controls);
let current=0;
const back=document.querySelector('#scene-back'),next=document.querySelector('#scene-next');
function fit(){const scene=scenes[current],inner=scene.querySelector('.scene-content');inner.style.setProperty('--scene-scale',1);const availableHeight=scene.clientHeight-12;const ratio=Math.min(1,availableHeight/Math.max(1,inner.scrollHeight));inner.style.setProperty('--scene-scale',ratio);}
function show(index,focus=false){const previous=current;current=Math.max(0,Math.min(index,scenes.length-1));scenes.forEach((s,i)=>{s.hidden=i!==current;s.inert=i!==current;s.classList.toggle('current-scene',i===current);});back.disabled=current===0;next.innerHTML=current===scenes.length-1?'Begin again <span>✧</span>':'Next <span>✧</span>';document.querySelector('#scene-label').textContent=titles[current];document.querySelector('#scene-progress').textContent=`${current+1} / ${scenes.length}`;document.querySelector('#scene-announcement').textContent=`${titles[current]}, scene ${current+1} of ${scenes.length}`;fit();requestAnimationFrame(fit);if(current!==previous&&!matchMedia('(prefers-reduced-motion: reduce)').matches)scenes[current].querySelector('.scene-content').animate([{opacity:0,translate:current>previous?'20px 0':'-20px 0'},{opacity:1,translate:'0 0'}],{duration:650,easing:'cubic-bezier(.2,.7,.2,1)'});window.dispatchEvent(new CustomEvent('invitation:scene',{detail:{id:scenes[current].id}}));if(focus){const heading=scenes[current].querySelector('h1,h2,h3');if(heading){heading.tabIndex=-1;heading.focus({preventScroll:true});}}}
back.addEventListener('click',()=>show(current-1,true));next.addEventListener('click',()=>show(current===scenes.length-1?0:current+1,true));
// The invitation canvas advances on a tap; embedded controls retain their actions.
document.addEventListener('click',e=>{
if(!document.querySelector('#envelope').classList.contains('opened'))return;
if(e.target.closest('a,button,input,select,textarea,label,fieldset,summary,details,form,[role="tab"],.envelope-screen'))return;
if(window.getSelection()?.toString())return;
show(current===scenes.length-1?0:current+1);
});
const tapHint=document.createElement('span');tapHint.className='scene-tap-hint';tapHint.textContent='Tap to continue';controls.append(tapHint);
document.addEventListener('keydown',e=>{
if(e.code!=='Space'||e.target.closest('a,button,input,select,textarea,summary')||!document.querySelector('#envelope').classList.contains('opened'))return;
e.preventDefault();show(current===scenes.length-1?0:current+1,true);
});
document.addEventListener('click',e=>{const a=e.target.closest('a[href^="#"]');if(!a)return;const target=document.getElementById(a.hash.slice(1));if(!target)return;const scene=target.closest('.invitation-scene');if(scene){e.preventDefault();show(scenes.indexOf(scene),true);}});
document.addEventListener('keydown',e=>{if(!document.querySelector('#envelope').classList.contains('opened')||e.target.closest('input,select,textarea,button,summary'))return;if(e.key==='ArrowRight'){e.preventDefault();show(current+1,true);}if(e.key==='ArrowLeft'){e.preventDefault();show(current-1,true);}});
window.addEventListener('resize',fit);window.visualViewport?.addEventListener('resize',fit);document.fonts.ready.then(fit);document.querySelectorAll('img').forEach(img=>img.addEventListener('load',fit));new ResizeObserver(fit).observe(main);
document.querySelectorAll('.faq-list details').forEach(d=>d.addEventListener('toggle',()=>{if(d.open)document.querySelectorAll('.faq-list details').forEach(other=>{if(other!==d)other.open=false;});fit();}));
new MutationObserver(fit).observe(document.querySelector('#rsvp-status'),{childList:true,subtree:true});
// Opening the letter always begins with the couple's invitation.
// Old section hashes must not skip this first scene on reload.
if(location.hash)history.replaceState(null,'',location.pathname+location.search);
show(0);
['open-invitation','open-text','skip-intro'].forEach(id=>document.getElementById(id).addEventListener('click',()=>show(0)));
})();

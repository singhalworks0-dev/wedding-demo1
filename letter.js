(()=>{
const screen=document.querySelector('#envelope'),paper=screen.querySelector('.envelope-paper');
const insert=document.createElement('div');insert.className='letter-insert';insert.setAttribute('aria-hidden','true');insert.innerHTML='<span>Aarav & Meera</span><span>OUR FOREVER BEGINS</span>';paper.prepend(insert);
for(const suffix of ['a','b']){const flower=document.createElement('img');flower.src='assets/garden-flowers.png';flower.alt='';flower.setAttribute('aria-hidden','true');flower.className=`letter-botanical letter-botanical-${suffix}`;screen.prepend(flower);}
for(let i=0;i<14;i++){const spark=document.createElement('span');spark.className='letter-spark';spark.setAttribute('aria-hidden','true');spark.style.left=`${8+Math.random()*84}%`;spark.style.top=`${5+Math.random()*85}%`;spark.style.setProperty('--duration',`${4+Math.random()*4}s`);spark.style.setProperty('--delay',`${-Math.random()*7}s`);screen.append(spark);}
})();

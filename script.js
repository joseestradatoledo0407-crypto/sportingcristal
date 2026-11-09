(function(){
'use strict';
var PHONE='51943094835';
var $=function(s){return document.querySelector(s)};
var wa=function(t){return 'https://wa.me/'+PHONE+'?text='+encodeURIComponent(t||'Hola, quiero información sobre Ultraceleste')};
$('#waHero').href=wa();$('#waLink').href=wa();$('#yr').textContent=new Date().getFullYear();

/* Tema */
var root=document.documentElement,tb=$('#themeBtn');
try{var sv=localStorage.getItem('uc-theme');if(sv){root.dataset.theme=sv;tb.textContent=sv==='dark'?'☀️':'🌙'}}catch(e){}
tb.onclick=function(){var d=root.dataset.theme==='dark'?'light':'dark';root.dataset.theme=d;tb.textContent=d==='dark'?'☀️':'🌙';try{localStorage.setItem('uc-theme',d)}catch(e){}};
$('#burger').onclick=function(){$('#menu').classList.toggle('open')};
$('#menu').onclick=function(){$('#menu').classList.remove('open')};

/* Datos */
var events=[
['1955','Fundación del club el 13 de diciembre en Lima, con raíces en la industria cervecera.'],
['1956','Primer campeonato nacional, en su temporada debut.'],
['Años 60-70','Consolidación como uno de los grandes del fútbol peruano.'],
['Años 80-90','Época de grandes equipos y varios títulos locales.'],
['1997','Llega a la final de la Copa Libertadores de América.'],
['2000-2020','Nuevos títulos nacionales, incluidos 2012, 2014, 2016, 2018 y 2020.'],
['Hoy','Una hinchada celeste que sigue creciendo desde el Rímac.']];
var tl=$('#timeline');
events.forEach(function(e){var d=document.createElement('div');d.className='ev rv';d.innerHTML='<b>'+e[0]+'</b><p>'+e[1]+'</p>';tl.appendChild(d)});

var years=[1956,1961,1968,1970,1972,1979,1980,1983,1988,1991,1994,1995,1996,2002,2005,2012,2014,2016,2018,2020];
var by=[['Campeonatos nacionales',20,20],['Final Libertadores (1997)',1,20],['Fundación (1955)',1,20]];
$('#bars').innerHTML=by.map(function(b){return '<div class="bar"><div data-w="'+(b[1]/b[2]*100)+'">'+b[0]+': '+b[1]+'</div></div>'}).join('');
$('#years').innerHTML=years.map(function(y){return '<span>'+y+'</span>'}).join('');

var idols=[
['⚽','Julio César Uribe','Mediocampista creativo, símbolo del club.'],
['🧤','Alberto Gallardo','Leyenda histórica; da nombre al estadio del Rímac.'],
['🔥','Roberto Palacios','Talento y títulos con la camiseta celeste.'],
['🎯','Sandro Baylón','Goleador recordado por la hinchada.'],
['🛡️','Freddy Ternero','Referente defensivo de varias etapas.']];
$('#idols').innerHTML=idols.map(function(i){return '<article class="card rv"><div class="ico">'+i[0]+'</div><h3>'+i[1]+'</h3><p>'+i[2]+'</p></article>'}).join('');

var services=[
['📺','Pantalla de partidos','Ven los partidos del club en compañía de la hinchada.'],
['👕','Tienda celeste','Camisetas, bufandas y accesorios.'],
['🏟️','Visitas al estadio','Recorridos guiados por el Rímac celeste.'],
['⚽','Escuela de fútbol','Formación para niños y jóvenes.'],
['🎟️','Información de entradas','Orientación para ir al estadio.'],
['🤝','Peñas y eventos','Encuentros, aniversarios y actividades.']];
$('#services').innerHTML=services.map(function(i){return '<article class="card rv"><div class="ico">'+i[0]+'</div><h3>'+i[1]+'</h3><p>'+i[2]+'</p></article>'}).join('');

/* Reveal + contadores + barras */
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;e.target.classList.add('in');
 var n=e.target.querySelector&&e.target.querySelectorAll('[data-n]');
 io.unobserve(e.target)})},{threshold:.15});
document.querySelectorAll('.rv,.sec').forEach(function(el){if(el.classList.contains('sec'))el.classList.add('rv');io.observe(el)});
var nio=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;var el=e.target,t=+el.dataset.n,c=0,st=Math.max(1,Math.ceil(t/60));
 var iv=setInterval(function(){c=Math.min(t,c+st);el.textContent=c;if(c>=t)clearInterval(iv)},25);nio.unobserve(el)})});
document.querySelectorAll('[data-n]').forEach(function(el){nio.observe(el)});
var bio=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.querySelectorAll('[data-w]').forEach(function(b){b.style.width=Math.max(+b.dataset.w,22)+'%'})}})});
bio.observe($('#bars'));
document.querySelectorAll('.flip').forEach(function(c){c.onclick=function(){c.classList.toggle('on')}});

/* Cuenta regresiva al aniversario */
function countdown(){var n=new Date(),y=n.getFullYear(),t=new Date(y,11,13);if(t<n)t=new Date(y+1,11,13);
 var d=t-n,s=Math.floor(d/1000),dd=Math.floor(s/86400),h=Math.floor(s%86400/3600),m=Math.floor(s%3600/60),ss=s%60;
 $('#count').innerHTML='<p>Cuenta regresiva al aniversario (13 dic)</p>'+[[dd,'días'],[h,'horas'],[m,'min'],[ss,'seg']].map(function(x){return '<div><b>'+x[0]+'</b><small>'+x[1]+'</small></div>'}).join('')}
countdown();setInterval(countdown,1000);

/* Trivia */
var qs=[
['¿En qué año se fundó Sporting Cristal?',['1945','1955','1965'],1],
['¿En qué distrito de Lima está su estadio histórico?',['Rímac','Miraflores','Surco'],0],
['¿De qué color es su camiseta?',['Rojo','Celeste','Verde'],1],
['¿Qué final continental jugó en 1997?',['Copa Sudamericana','Copa Libertadores','Recopa'],1]];
var qi=0,sc=0,qz=$('#quiz');
function showQ(){if(qi>=qs.length){qz.innerHTML='<h3>¡Terminaste! '+sc+' / '+qs.length+'</h3><p>'+(sc===qs.length?'¡Hincha de verdad! 🏆':'Sigue alentando, celeste.')+'</p><button class="btn" id="rq">Reintentar</button>';$('#rq').onclick=function(){qi=0;sc=0;showQ()};if(sc===qs.length)boom();return}
 var q=qs[qi];qz.innerHTML='<h3>'+(qi+1)+'. '+q[0]+'</h3>'+q[1].map(function(o,i){return '<button class="opt" data-i="'+i+'">'+o+'</button>'}).join('');
 qz.querySelectorAll('.opt').forEach(function(b){b.onclick=function(){var ok=+b.dataset.i===q[2];if(ok)sc++;b.classList.add(ok?'ok':'no');
  qz.querySelectorAll('.opt').forEach(function(x){x.disabled=true;if(+x.dataset.i===q[2])x.classList.add('ok')});setTimeout(function(){qi++;showQ()},900)}})}
showQ();

/* Muro de hinchas (localStorage) */
var wall=[];try{wall=JSON.parse(localStorage.getItem('uc-wall')||'[]')}catch(e){}
function esc(s){var d=document.createElement('div');d.textContent=s;return d.innerHTML}
function drawWall(){$('#wall').innerHTML=wall.slice().reverse().map(function(w){return '<div><b>'+esc(w.n)+'</b><p>'+esc(w.m)+'</p></div>'}).join('')||'<p class="center">Sé el primero en dejar tu mensaje.</p>'}
drawWall();
$('#wallForm').onsubmit=function(e){e.preventDefault();wall.push({n:$('#wName').value.trim(),m:$('#wMsg').value.trim()});wall=wall.slice(-30);
 try{localStorage.setItem('uc-wall',JSON.stringify(wall))}catch(x){}drawWall();e.target.reset();boom()};

/* Contacto -> WhatsApp */
$('#contactForm').onsubmit=function(e){e.preventDefault();window.open(wa('Hola, soy '+$('#cName').value+'. '+$('#cMsg').value),'_blank')};

/* Confeti */
var cv=$('#fx'),cx=cv.getContext('2d'),ps=[];
function rs(){cv.width=cv.offsetWidth;cv.height=cv.offsetHeight}rs();window.addEventListener('resize',rs);
function boom(){window.scrollTo({top:0,behavior:'smooth'});for(var i=0;i<120;i++)ps.push({x:cv.width/2,y:cv.height/2,vx:(Math.random()-.5)*14,vy:Math.random()*-12-2,r:Math.random()*5+2,c:Math.random()>.5?'#fff':'#7fd8ff',l:100})}
for(var k=0;k<40;k++)ps.push({x:Math.random()*cv.width,y:Math.random()*cv.height,vx:0,vy:.3+Math.random(),r:2+Math.random()*2,c:'#ffffff66',l:1e9,amb:1});
(function loop(){cx.clearRect(0,0,cv.width,cv.height);
 ps=ps.filter(function(p){p.x+=p.vx;p.y+=p.vy;if(!p.amb){p.vy+=.35;p.l--}else if(p.y>cv.height){p.y=0}
  cx.fillStyle=p.c;cx.beginPath();cx.arc(p.x,p.y,p.r,0,7);cx.fill();return p.l>0});requestAnimationFrame(loop)})();
$('.crest').onclick=boom;

/* Progreso y volver arriba */
window.addEventListener('scroll',function(){var h=document.documentElement,p=h.scrollTop/(h.scrollHeight-h.clientHeight)*100;$('#progress').style.width=p+'%';$('#top').classList.toggle('show',h.scrollTop>500)});
$('#top').onclick=function(){window.scrollTo({top:0,behavior:'smooth'})};
})();

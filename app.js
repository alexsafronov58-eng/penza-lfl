const cards=[['Чемпионат 8×8','Дивизионы · Матчи · Таблицы','#63c9ff'],['Чемпионат 5×5','Дивизионы · Матчи · Статистика','#b2ff38'],['Кубок ЛФЛ','Сетка · Матчи · Результаты','#ffca60'],['Трансферы','Заявки · Переходы · История','#d093ff'],['Тренировки','Расписание · Запись','#ffb64c'],['Товарищеские матчи','Поиск соперника · Заявки','#5de8e8']];
const track=document.getElementById('track');cards.forEach(([name,desc,color],i)=>{let b=document.createElement('button');b.className='tile';b.style.setProperty("--accent",color);b.style.backgroundImage=`linear-gradient(0deg,#020608 0%,#02060899 30%,transparent 80%),url("/penza-lfl/card${i}.webp")`;b.style.backgroundPosition="center";b.style.backgroundSize="cover";b.innerHTML=`<img src="/penza-lfl/card${i}.webp?v=7" alt="" loading="eager" onerror="this.style.display='none'"><div class="tile-body"><h4>${name}</h4><small>${desc}</small><div class="go">➜</div></div>`;b.addEventListener('click',()=>openSection(name));track.append(b)});

document.getElementById('prev').onclick=()=>track.scrollBy({left:-310,behavior:'smooth'});document.getElementById('next').onclick=()=>track.scrollBy({left:310,behavior:'smooth'});
const descriptions={'Чемпионат 8×8':'Чемпионат с дивизионами, календарём, таблицами и историей сезонов.','Чемпионат 5×5':'Мини-футбол: дивизионы, составы, матчи и статистика.','Кубок ЛФЛ':'Кубковая сетка, этапы, расписание и результаты.','Трансферы':'Подача и согласование заявок на переход футболистов.','Тренировки':'Расписание занятий, регистрация и посещаемость.','Товарищеские матчи':'Поиск соперника, заявки и согласование встреч.','Личный кабинет':'Вход и разграничение прав игрока, представителя команды, администратора и разработчика.'};
function openSection(name){document.getElementById('modalTitle').textContent=name;document.getElementById('modalDesc').textContent=descriptions[name]||'Раздел футбольного портала.';document.getElementById('modalExtra').innerHTML=(name.includes('Чемпионат')?'<div class="chips"><span>Высший дивизион</span><span>Первый дивизион</span><span>Другие дивизионы</span></div>':'');document.getElementById('modal').classList.remove('hidden')};
document.getElementById('close').onclick=()=>document.getElementById('modal').classList.add('hidden');document.getElementById('modal').onclick=e=>{if(e.target.id==='modal')e.currentTarget.classList.add('hidden')};document.addEventListener('keydown',e=>{if(e.key==='Escape')document.getElementById('modal').classList.add('hidden')});document.getElementById('profile').onclick=()=>openSection('Личный кабинет');document.querySelectorAll('[data-go]').forEach(el=>el.onclick=e=>{e.preventDefault();if(el.dataset.go==='Главная')window.scrollTo({top:0,behavior:'smooth'});else openSection(el.dataset.go)});
const matches=[['19:00','5×5','Легион','Альянс'],['20:00','8×8','Старт','Виктория'],['21:00','5×5','ЗаКиДок','Максимум'],['22:00','Кубок','Импульс','Титан']];function renderMatches(filter='Все'){document.getElementById('matches').innerHTML=matches.filter(m=>filter==='Все'||m[1]===filter).map(m=>`<div class="match"><b>${m[0]}</b><small>${m[1]}</small><span>${m[2]} &nbsp; — &nbsp; ${m[3]}</span>›</div>`).join('')};renderMatches();document.querySelectorAll('[data-filter]').forEach(b=>b.onclick=()=>{document.querySelectorAll('[data-filter]').forEach(x=>x.classList.remove('selected'));b.classList.add('selected');renderMatches(b.dataset.filter)});

// v0.3: poster is always available, video starts only after a user gesture on iOS.
(function(){
 const video=document.getElementById('introVideo'),art=document.getElementById('introArtwork');
 const intro=document.getElementById('intro'),portal=document.getElementById('portal');
 const skip=document.getElementById('skipIntro'),play=document.getElementById('playIntro');
 function showPoster(){art.classList.add('ready');video.pause();video.style.opacity='0';play.hidden=false;play.textContent='▶ Смотреть заставку';}
 function enter(){intro.classList.add('exiting');setTimeout(()=>{intro.classList.add('hidden');portal.classList.remove('hidden');window.scrollTo(0,0)},400)}
 showPoster();
 // Try muted inline autoplay on HTTPS; poster stays visible if the browser blocks it.
 video.muted=true;video.setAttribute('playsinline','');
 video.play().then(()=>{art.classList.remove('ready');video.style.opacity='1';play.textContent='Пауза';}).catch(()=>showPoster());
 play.addEventListener('click',async()=>{
  if(!video.paused){video.pause();showPoster();return;}
  video.muted=true;video.setAttribute('playsinline','');video.setAttribute('webkit-playsinline','');
  try{video.currentTime=0;const p=video.play();if(p)await p;art.classList.remove('ready');video.style.opacity='1';play.textContent='Пауза';}
  catch(e){showPoster();play.textContent='Видео недоступно — перейти можно ниже';}
 });
 video.addEventListener('ended',showPoster);video.addEventListener('error',showPoster);
 skip.addEventListener('click',enter);document.getElementById('enter').addEventListener('click',enter);
})();

(function(){
'use strict';
const ready=fn=>document.readyState==='loading'?document.addEventListener('DOMContentLoaded',fn):fn();
ready(function(){
  // Course search and category filters on the modules page.
  const moduleList=document.querySelector('#all-modules');
  if(moduleList){
    const tools=document.createElement('section'); tools.className='course-tools';
    tools.innerHTML='<div class="course-search-wrap"><label for="course-search">Find a lesson</label><input id="course-search" type="search" placeholder="Search modules or skills…" autocomplete="off"><span class="search-symbol" aria-hidden="true">⌕</span></div><div class="course-filter-row" role="group" aria-label="Filter modules"><button type="button" class="course-filter active" data-filter="all">All modules</button><button type="button" class="course-filter" data-filter="started">In progress</button><button type="button" class="course-filter" data-filter="completed">Completed</button></div><p class="course-results" id="course-results" aria-live="polite">Explore all 9 learning modules.</p>';
    moduleList.parentNode.insertBefore(tools,moduleList);
    const search=tools.querySelector('#course-search'), buttons=[...tools.querySelectorAll('.course-filter')]; let filter='all';
    function apply(){const q=search.value.trim().toLowerCase();let shown=0;[...moduleList.children].forEach(card=>{const text=card.textContent.toLowerCase();const isDone=/completed/i.test(card.querySelector('.status-pill')?.textContent||'');const bar=card.querySelector('.progress-track span');const width=parseInt(bar?.style.width||'0',10);const isStarted=isDone||width>0||/quiz \d/i.test(text);const okText=!q||text.includes(q);const okFilter=filter==='all'||(filter==='completed'&&isDone)||(filter==='started'&&isStarted&&!isDone);card.hidden=!(okText&&okFilter);if(!card.hidden)shown++;});tools.querySelector('#course-results').textContent=shown?`Showing ${shown} ${shown===1?'module':'modules'}. Keep going at your own pace.`:'No modules match that search. Try another keyword.';}
    search.addEventListener('input',apply);buttons.forEach(b=>b.addEventListener('click',()=>{filter=b.dataset.filter;buttons.forEach(x=>x.classList.toggle('active',x===b));apply()}));
  }
  // Personal study plan on dashboard; saved only in this browser.
  const dashboard=document.querySelector('.dashboard-section');
  if(dashboard){
    const panel=document.createElement('section');panel.className='panel study-plan-panel';panel.innerHTML='<div class="panel-heading"><div><span class="eyebrow">A LITTLE PROGRESS ADDS UP</span><h2>Your study plan</h2></div><span class="study-plan-count" id="study-plan-count">0 of 3 done</span></div><p class="study-plan-intro">Choose a few small steps for your next study session. Your checklist stays on this device.</p><div class="study-plan-list"><label class="study-task"><input type="checkbox" data-study-task="review"><span class="task-check">✓</span><span><strong>Review one lesson</strong><small>Refresh a topic before moving forward.</small></span></label><label class="study-task"><input type="checkbox" data-study-task="practice"><span class="task-check">✓</span><span><strong>Try a practice activity</strong><small>Put one new idea into action.</small></span></label><label class="study-task"><input type="checkbox" data-study-task="reflect"><span class="task-check">✓</span><span><strong>Reflect on what you learned</strong><small>Save a useful takeaway in your portfolio.</small></span></label></div><div class="study-plan-progress"><span id="study-plan-bar"></span></div><p class="study-plan-message" id="study-plan-message" aria-live="polite">Small, consistent steps make learning easier.</p>';
    const recent=dashboard.querySelector('.recent-panel');if(recent)dashboard.insertBefore(panel,recent);else dashboard.appendChild(panel);
    const key='learnmate_study_plan_v1';let saved={};try{saved=JSON.parse(localStorage.getItem(key)||'{}')||{}}catch(e){}
    const checks=[...panel.querySelectorAll('[data-study-task]')];checks.forEach(c=>{c.checked=!!saved[c.dataset.studyTask];c.addEventListener('change',update)});
    function update(){const state={};checks.forEach(c=>state[c.dataset.studyTask]=c.checked);try{localStorage.setItem(key,JSON.stringify(state))}catch(e){}const n=checks.filter(c=>c.checked).length;panel.querySelector('#study-plan-count').textContent=`${n} of ${checks.length} done`;panel.querySelector('#study-plan-bar').style.width=(n/checks.length*100)+'%';panel.querySelector('#study-plan-message').textContent=n===checks.length?'Lovely work — you completed your study plan!':n?'Nice progress. One small step at a time.':'Small, consistent steps make learning easier.';}
    update();
    // A visual course-discovery banner adds an image-led touch to the dashboard.
    const banner=document.createElement('a');banner.className='discovery-banner';banner.href='modules.html';banner.innerHTML='<img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=85" alt="Laptop and notebook in a digital learning workspace" loading="lazy"><span class="discovery-shade"></span><span class="discovery-copy"><small>YOUR NEXT STEP</small><strong>Discover something new today.</strong><span>Explore lessons, practice skills, and keep building confidence →</span></span>';
    dashboard.insertBefore(banner,dashboard.firstChild);
  }
  // Add active-page navigation state without changing the existing routing.
  const current=(location.pathname.split('/').pop()||'index.html').toLowerCase();document.querySelectorAll('.main-nav a').forEach(a=>{const href=(a.getAttribute('href')||'').toLowerCase();if(href===current){a.classList.add('active');a.setAttribute('aria-current','page')}});
});
})();

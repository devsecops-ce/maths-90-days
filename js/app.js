// UI: home schedule, daily lesson, test runner and progress tracking.
const PHASES = [
  { name: 'Foundations', from: 1, to: 20, icon: '🧱', note: 'Arithmetic, factors, fractions, decimals, integers' },
  { name: 'Number System', from: 21, to: 35, icon: '🔢', note: 'Rational numbers, squares, cubes, exponents' },
  { name: 'Algebra', from: 36, to: 50, icon: '🧮', note: 'Expressions, identities, factorisation, equations' },
  { name: 'Commercial Maths', from: 51, to: 60, icon: '💰', note: 'Ratio, percentage, profit, interest, speed' },
  { name: 'Geometry & Mensuration', from: 61, to: 78, icon: '📐', note: 'Angles, polygons, area, volume, data, probability' },
  { name: 'Expert Challenges', from: 79, to: 90, icon: '🏆', note: 'Olympiad-style problems and grand tests' }
];
const LEVELS = [
  { name: 'Beginner', to: 20, cls: 'lv1' },
  { name: 'Intermediate', to: 45, cls: 'lv2' },
  { name: 'Advanced', to: 75, cls: 'lv3' },
  { name: 'Expert', to: 90, cls: 'lv4' }
];
const PASS = 6, NQ = 10, KEY = 'maths90';
const levelOf = (n) => LEVELS.find((l) => n <= l.to);
const app = document.getElementById('app');

let S = { name: '', unlockAll: false, scores: {}, days: [] };
try { S = Object.assign(S, JSON.parse(localStorage.getItem(KEY)) || {}); } catch (e) { /* storage unavailable */ }
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* ignore */ } };

const best = (n) => (S.scores[n] ? S.scores[n].best : null);
const unlocked = (n) => n === 1 || S.unlockAll || best(n - 1) >= PASS;
const nextDay = () => { for (let n = 1; n <= 90; n++) if (!(best(n) >= PASS)) return n; return 90; };
const today = () => new Date().toISOString().slice(0, 10);

function streak() {
  const set = new Set(S.days); let d = new Date(), c = 0;
  if (!set.has(today())) d.setDate(d.getDate() - 1);
  while (set.has(d.toISOString().slice(0, 10))) { c++; d.setDate(d.getDate() - 1); }
  return c;
}

function genQuestion(n) {
  const d = DAYS[n - 1];
  if (Array.isArray(d.g)) { let j; do j = R(d.g[0], d.g[1]); while (Array.isArray(DAYS[j - 1].g)); return genQuestion(j); }
  return finalize(d.g());
}
function makeTest(n) {
  const qs = [], seen = new Set();
  for (let tries = 0; qs.length < NQ && tries < 200; tries++) {
    const q = genQuestion(n);
    if (seen.has(q.q) && tries < 150) continue;
    seen.add(q.q); qs.push(q);
  }
  return qs;
}

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const links = (s) => {
  const q = encodeURIComponent(s), qc = encodeURIComponent('class 8 maths ' + s);
  return [
    ['▶', 'Watch on YouTube', `https://www.youtube.com/results?search_query=${qc}`],
    ['K', 'Khan Academy', `https://www.khanacademy.org/search?page_search_query=${q}`],
    ['📘', 'NCERT Class 8 textbook', 'https://ncert.nic.in/textbook.php?hemh1=0-13'],
    ['🔎', 'More examples online', `https://www.google.com/search?q=${qc}+solved+examples`]
  ].map(([i, t, u]) => `<a class="res" href="${u}" target="_blank" rel="noopener"><span>${i}</span>${t}</a>`).join('');
};

// ---------- Views ----------
function home() {
  const done = Object.keys(S.scores).filter((k) => S.scores[k].best >= PASS).length;
  const attempted = Object.values(S.scores);
  const avg = attempted.length ? Math.round(attempted.reduce((a, s) => a + s.best, 0) / attempted.length * 10) : 0;
  const nd = nextDay(), lv = levelOf(nd);
  app.innerHTML = `
  <section class="hero">
    <div>
      <p class="eyebrow">${S.name ? 'Welcome back, ' + esc(S.name) + '!' : 'Welcome!'}</p>
      <h1>From basics to expert in 90 days</h1>
      <p class="lead">One short lesson and one 10-question test every day. Questions change every time, so you can practise again and again.</p>
      <a class="primary big" href="#day/${nd}">${done ? 'Continue' : 'Start'}: Day ${nd} — ${esc(DAYS[nd - 1].t)} →</a>
    </div>
    <div class="stats">
      <div class="stat"><b>${done}</b><span>of 90 days passed</span></div>
      <div class="stat"><b>${avg}%</b><span>average best score</span></div>
      <div class="stat"><b>${streak()}🔥</b><span>day streak</span></div>
      <div class="stat"><b class="${lv.cls}-t">${lv.name}</b><span>current level</span></div>
      <div class="bar" title="${done}/90"><i style="width:${done / 90 * 100}%"></i></div>
    </div>
  </section>
  <div class="legend">${LEVELS.map((l, i) => `<span class="chip ${l.cls}">${l.name} · Days ${i ? LEVELS[i - 1].to + 1 : 1}–${l.to}</span>`).join('')}</div>
  ${PHASES.map((ph, pi) => `
    <section class="phase">
      <h2><span>${ph.icon}</span> Phase ${pi + 1}: ${ph.name} <small>Days ${ph.from}–${ph.to} · ${ph.note}</small></h2>
      <div class="grid">${range(ph.from, ph.to).map(card).join('')}</div>
    </section>`).join('')}`;
}
const range = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);
function card(n) {
  const d = DAYS[n - 1], b = best(n), open = unlocked(n), lv = levelOf(n);
  const st = b == null ? '' : b >= PASS ? `<em class="ok">★ ${b}/10</em>` : `<em class="warn">${b}/10</em>`;
  const review = Array.isArray(d.g) ? ' review' : '';
  return open
    ? `<a class="card ${lv.cls}${review}${n === nextDay() ? ' current' : ''}" href="#day/${n}"><span class="dn">Day ${n}</span><span class="tt">${esc(d.t)}</span>${st}</a>`
    : `<div class="card locked" title="Score ${PASS}/10 on Day ${n - 1} to unlock"><span class="dn">Day ${n} 🔒</span><span class="tt">${esc(d.t)}</span></div>`;
}

function dayView(n) {
  const d = DAYS[n - 1], lv = levelOf(n);
  if (!unlocked(n)) { app.innerHTML = `<div class="panel center"><h2>🔒 Day ${n} is locked</h2><p>Score ${PASS}/10 or more on Day ${n - 1} to unlock it.</p><a class="primary" href="#day/${n - 1}">Go to Day ${n - 1}</a></div>`; return; }
  const sc = S.scores[n];
  app.innerHTML = `
  <nav class="crumbs"><a href="#">← All days</a>${n > 1 ? `<a href="#day/${n - 1}">‹ Day ${n - 1}</a>` : ''}${n < 90 && unlocked(n + 1) ? `<a href="#day/${n + 1}">Day ${n + 1} ›</a>` : ''}</nav>
  <article class="panel lesson">
    <p class="eyebrow"><span class="chip ${lv.cls}">${lv.name}</span> Day ${n} of 90</p>
    <h1>${esc(d.t)}</h1>
    <p class="lead">${d.i}</p>
    <h3>Key points</h3>
    <ul class="keys">${d.k.map((k) => `<li>${k}</li>`).join('')}</ul>
    <div class="example"><b>Worked example</b><p>${d.ex}</p></div>
    <h3>Learn more on the internet</h3>
    <div class="resources">${links(d.s)}</div>
  </article>
  <div class="panel cta">
    <div><h3>Today's test</h3><p class="muted">${NQ} multiple-choice questions · pass mark ${PASS}/10${sc ? ` · your best: <b>${sc.best}/10</b> (${sc.attempts} attempt${sc.attempts > 1 ? 's' : ''})` : ''}</p></div>
    <a class="primary big" href="#test/${n}">${sc ? 'Take a new test' : 'Start the test'} →</a>
  </div>`;
}

let T = null;
function testView(n) {
  if (!unlocked(n)) return dayView(n);
  T = { n, qs: makeTest(n), ans: Array(NQ).fill(null), done: false, start: Date.now() };
  renderTest();
}
function renderTest() {
  const { n, qs, ans, done } = T;
  const answered = ans.filter((a) => a != null).length;
  const score = qs.filter((q, i) => ans[i] === q.a).length;
  app.innerHTML = `
  <nav class="crumbs"><a href="#day/${n}">← Back to lesson</a></nav>
  <div class="panel testhead">
    <div><p class="eyebrow">Day ${n} test</p><h1>${esc(DAYS[n - 1].t)}</h1></div>
    ${done ? '' : `<div class="prog"><b id="cnt">${answered}</b>/${NQ} answered</div>`}
  </div>
  ${done ? result(score) : ''}
  <ol class="qs">${qs.map((q, i) => `
    <li class="q ${done ? (ans[i] === q.a ? 'right' : 'wrong') : ''}">
      <div class="qt">${q.q}</div>
      <div class="opts">${q.opts.map((o, j) => {
        let c = ''; if (done) { if (o === q.a) c = 'correct'; else if (ans[i] === o) c = 'chosen-wrong'; } else if (ans[i] === o) c = 'sel';
        return `<button class="opt ${c}" data-q="${i}" data-o="${j}" ${done ? 'disabled' : ''}><span>${'ABCD'[j]}</span>${o}</button>`; }).join('')}</div>
      ${done ? `<div class="explain">${ans[i] === q.a ? '✅ Correct!' : `❌ Correct answer: <b>${q.a}</b>`}${q.e ? `<br>${q.e}` : ''}</div>` : ''}
    </li>`).join('')}</ol>
  ${done ? '' : `<div class="panel center"><button id="submit" class="primary big" ${answered < NQ ? 'disabled' : ''}>Submit test</button><p class="muted small">${answered < NQ ? 'Answer all questions to submit.' : 'Ready when you are!'}</p></div>`}`;
  if (!done) {
    app.querySelectorAll('.opt').forEach((b) => b.onclick = () => {
      const i = +b.dataset.q; T.ans[i] = T.qs[i].opts[+b.dataset.o];
      b.parentNode.querySelectorAll('.opt').forEach((x) => x.classList.toggle('sel', x === b));
      const c = T.ans.filter((a) => a != null).length;
      document.getElementById('cnt').textContent = c;
      const s = document.getElementById('submit'); s.disabled = c < NQ;
      s.nextElementSibling.textContent = c < NQ ? 'Answer all questions to submit.' : 'Ready when you are!';
    });
    document.getElementById('submit').onclick = submit;
  }
}
function submit() {
  T.done = true;
  const n = T.n, score = T.qs.filter((q, i) => T.ans[i] === q.a).length;
  const prev = S.scores[n] || { best: 0, attempts: 0 };
  S.scores[n] = { best: Math.max(prev.best, score), last: score, attempts: prev.attempts + 1, date: today() };
  if (!S.days.includes(today())) S.days.push(today());
  T.secs = Math.round((Date.now() - T.start) / 1000);
  save(); renderTest(); window.scrollTo({ top: 0, behavior: 'smooth' });
}
function result(score) {
  const n = T.n, pass = score >= PASS;
  const msg = score === 10 ? 'Perfect score! 🌟' : score >= 8 ? 'Excellent work! 🎉' : pass ? 'Well done — you passed! 👍' : 'Keep practising — you can do it! 💪';
  const m = Math.floor(T.secs / 60), s = T.secs % 60;
  return `<div class="panel result ${pass ? 'pass' : 'fail'}">
    <div class="ring" style="--p:${score * 10}"><b>${score}/10</b></div>
    <div><h2>${msg}</h2>
      <p>Time taken: ${m}m ${s}s · Best score for this day: ${S.scores[n].best}/10</p>
      <p class="muted">${pass ? (n < 90 ? `Day ${n + 1} is now unlocked.` : 'You have completed all 90 days! 🏆') : `Score ${PASS} or more to unlock Day ${n + 1}. Re-read the lesson and try a fresh set of questions.`}</p>
      <div class="btns"><a class="ghost" href="#day/${n}">Re-read lesson</a><button class="ghost" onclick="testView(${n})">New test ↻</button>${pass && n < 90 ? `<a class="primary" href="#day/${n + 1}">Next: Day ${n + 1} →</a>` : ''}</div>
    </div></div>`;
}

// ---------- Router & settings ----------
function route() {
  const m = location.hash.match(/^#(day|test)\/(\d+)/);
  const n = m ? Math.min(90, Math.max(1, +m[2])) : 0;
  if (!m) home(); else if (m[1] === 'day') dayView(n); else testView(n);
  window.scrollTo(0, 0);
}
window.addEventListener('hashchange', route);

const dlg = document.getElementById('settings');
document.getElementById('settingsBtn').onclick = () => {
  document.getElementById('nameInput').value = S.name;
  document.getElementById('unlockAll').checked = S.unlockAll;
  dlg.showModal();
};
dlg.addEventListener('close', () => {
  if (dlg.returnValue !== 'ok') return;
  S.name = document.getElementById('nameInput').value.trim();
  S.unlockAll = document.getElementById('unlockAll').checked;
  save(); route();
});
document.getElementById('resetBtn').onclick = () => {
  if (!confirm('Delete all scores and start again from Day 1?')) return;
  S.scores = {}; S.days = []; save(); dlg.close(); location.hash = ''; route();
};
route();

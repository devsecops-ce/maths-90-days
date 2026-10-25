// Student app: schedule, lessons, two daily tests, reviews, accounts and progress.
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
const KEY = 'maths90';
const levelOf = (n) => LEVELS.find((l) => n <= l.to);
const app = document.getElementById('app');

let S = { name: '', unlockAll: false, scores: {}, days: [], results: [] };
let ME = null, READY = false;

function loadLocal() {
  try { S = Object.assign(S, JSON.parse(localStorage.getItem(KEY)) || {}); } catch (e) { /* storage unavailable */ }
  // Older saves kept one score per day; treat it as Test 1.
  for (const k in S.scores) { const v = S.scores[k]; if (v && v.best !== undefined && !v[1]) S.scores[k] = { 1: { best: v.best, last: v.last, attempts: v.attempts } }; }
}
const save = () => {
  if (ME) return;
  if (S.results.length > 400) S.results = S.results.slice(-400);
  try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* ignore */ }
};

const tb = (n, t) => { const s = S.scores[n] && S.scores[n][t]; return s ? s.best : null; };
const passed = (n) => TESTS.every((t) => tb(n, t) >= PASS);
const dayPts = (n) => { const v = TESTS.map((t) => tb(n, t)); return v.every((x) => x == null) ? null : v.reduce((a, x) => a + (x || 0), 0); };
const unlocked = (n) => n === 1 || S.unlockAll || passed(n - 1);
const nextDay = () => { for (let n = 1; n <= 90; n++) if (!passed(n)) return n; return 90; };
const takenOn = (n, t, date) => S.results.some((r) => r.day === n && r.test === t && r.date === date);

function streak() {
  const set = new Set(S.days), d = new Date(); let c = 0;
  const iso = (x) => new Date(x - x.getTimezoneOffset() * 6e4).toISOString().slice(0, 10);
  if (!set.has(iso(d))) d.setDate(d.getDate() - 1);
  while (set.has(iso(d))) { c++; d.setDate(d.getDate() - 1); }
  return c;
}

function genQuestion(n) {
  const d = DAYS[n - 1];
  if (Array.isArray(d.g)) { let j; do j = R(d.g[0], d.g[1]); while (Array.isArray(DAYS[j - 1].g)); return genQuestion(j); }
  return finalize(d.g());
}
// Avoid repeating questions from the other test taken today.
function makeTest(n, t) {
  const other = S.results.filter((r) => r.day === n && r.test !== t && r.date === today()).pop();
  const seen = new Set(other ? other.items.map((i) => i.q) : []), qs = [];
  for (let tries = 0; qs.length < NQ && tries < 300; tries++) {
    const q = genQuestion(n);
    if (seen.has(q.q) && tries < 250) continue;
    seen.add(q.q); qs.push(q);
  }
  return qs;
}

const links = (s) => {
  const q = encodeURIComponent(s), qc = encodeURIComponent('class 8 maths ' + s);
  return [
    ['▶', 'Watch on YouTube', `https://www.youtube.com/results?search_query=${qc}`],
    ['K', 'Khan Academy', `https://www.khanacademy.org/search?page_search_query=${q}`],
    ['📘', 'NCERT Class 8 textbook', 'https://ncert.nic.in/textbook.php?hemh1=0-13'],
    ['🔎', 'More examples online', `https://www.google.com/search?q=${qc}+solved+examples`]
  ].map(([i, t, u]) => `<a class="res" href="${u}" target="_blank" rel="noopener"><span>${i}</span>${t}</a>`).join('');
};

// ---------- Home ----------
function home() {
  const done = range(1, 90).filter(passed).length;
  const bests = []; for (const k in S.scores) TESTS.forEach((t) => { if (S.scores[k][t]) bests.push(S.scores[k][t].best); });
  const avg = bests.length ? Math.round(bests.reduce((a, b) => a + b, 0) / bests.length * 10) : 0;
  const nd = nextDay(), lv = levelOf(nd), todayN = new Set(S.results.filter((r) => r.date === today()).map((r) => r.test + ':' + r.day)).size;
  app.innerHTML = `
  <section class="hero">
    <div>
      <p class="eyebrow">${S.name ? 'Welcome back, ' + esc(S.name) + '!' : 'Welcome!'}</p>
      <h1>From basics to expert in 90 days</h1>
      <p class="lead">Every day: one short lesson and <b>two 10-question tests</b>. Pass both tests (6/10 or more) to unlock the next day. Questions change every time.</p>
      <a class="primary big" href="#day/${nd}">${done ? 'Continue' : 'Start'}: Day ${nd} — ${esc(DAYS[nd - 1].t)} →</a>
      <p class="muted small">Tests taken today: <b>${todayN}</b> (minimum 2)${S.results.length ? ' · <a href="#me">My results & reviews</a>' : ''}</p>
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
  const d = DAYS[n - 1], open = unlocked(n), lv = levelOf(n), pts = dayPts(n);
  const st = pts == null ? '' : passed(n) ? `<em class="ok">★ ${pts}/20</em>` : `<em class="warn">T1 ${tb(n, 1) ?? '–'} · T2 ${tb(n, 2) ?? '–'}</em>`;
  const review = Array.isArray(d.g) ? ' review' : '';
  return open
    ? `<a class="card ${lv.cls}${review}${n === nextDay() ? ' current' : ''}" href="#day/${n}"><span class="dn">Day ${n}</span><span class="tt">${esc(d.t)}</span>${st}</a>`
    : `<div class="card locked" title="Pass both tests of Day ${n - 1} to unlock"><span class="dn">Day ${n} 🔒</span><span class="tt">${esc(d.t)}</span></div>`;
}

// ---------- Lesson ----------
function dayView(n) {
  const d = DAYS[n - 1], lv = levelOf(n);
  if (!unlocked(n)) { app.innerHTML = `<div class="panel center"><h2>🔒 Day ${n} is locked</h2><p>Score ${PASS}/10 or more on <b>both</b> tests of Day ${n - 1} to unlock it.</p><a class="primary" href="#day/${n - 1}">Go to Day ${n - 1}</a></div>`; return; }
  const dates = [...new Set(S.results.filter((r) => r.day === n).map((r) => r.date))].sort().reverse();
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
  <h2 class="sect">Today's tests <small class="muted">minimum 2 tests · 10 questions each · pass mark ${PASS}/10 on both</small></h2>
  <div class="tests">${TESTS.map((t) => {
    const s = S.scores[n] && S.scores[n][t], done = takenOn(n, t, today());
    return `<div class="panel tcard ${s && s.best >= PASS ? 'ok' : ''}">
      <div><h3>Test ${t} ${done ? '<span class="chip lv1">done today</span>' : ''}</h3>
      <p class="muted">${s ? `Best ${s.best}/10 · ${s.attempts} attempt${s.attempts > 1 ? 's' : ''}` : 'Not attempted yet'}</p></div>
      <a class="primary" href="#test/${n}/${t}">${done ? 'Retake' : s ? 'Take again today' : 'Start'} Test ${t} →</a></div>`;
  }).join('')}</div>
  ${dates.length ? `<div class="panel cta"><div><h3>Reviews</h3><p class="muted">${dates.length} date${dates.length > 1 ? 's' : ''} with tests for this day</p></div>
    <div class="btns">${dates.slice(0, 6).map((dt) => `<a class="ghost" href="#review/${n}/${dt}">${dt === today() ? 'Today' : niceDate(dt)}</a>`).join('')}</div></div>` : ''}`;
}

// ---------- Test ----------
let T = null;
function testView(n, t) {
  if (!unlocked(n)) return dayView(n);
  T = { n, t, qs: makeTest(n, t), ans: Array(NQ).fill(null), done: false, start: Date.now(), saved: null };
  renderTest();
}
function renderTest() {
  const { n, t, qs, ans, done } = T;
  const answered = ans.filter((a) => a != null).length;
  app.innerHTML = `
  <nav class="crumbs"><a href="#day/${n}">← Back to lesson</a></nav>
  <div class="panel testhead">
    <div><p class="eyebrow">Day ${n} · Test ${t} of ${TESTS.length}</p><h1>${esc(DAYS[n - 1].t)}</h1></div>
    ${done ? '' : `<div class="prog"><b id="cnt">${answered}</b>/${NQ} answered</div>`}
  </div>
  ${done ? result() : ''}
  <ol class="qs">${qs.map((q, i) => `
    <li class="q ${done ? (ans[i] === q.a ? 'right' : 'wrong') : ''}">
      <div class="qt">${q.q}</div>
      <div class="opts">${q.opts.map((o, j) => {
        let c = ''; if (done) { if (o === q.a) c = 'correct'; else if (ans[i] === o) c = 'chosen-wrong'; } else if (ans[i] === o) c = 'sel';
        return `<button class="opt ${c}" data-q="${i}" data-o="${j}" ${done ? 'disabled' : ''}><span>${'ABCD'[j]}</span>${o}</button>`; }).join('')}</div>
      ${done ? `<div class="explain">${ans[i] === q.a ? '✅ Correct!' : `❌ Correct answer: <b>${q.a}</b>`}${q.e ? `<br>${q.e}` : ''}</div>` : ''}
    </li>`).join('')}</ol>
  ${done ? '' : `<div class="panel center"><button id="submit" class="primary big" ${answered < NQ ? 'disabled' : ''}>Submit Test ${t}</button><p class="muted small">${answered < NQ ? 'Answer all questions to submit.' : 'Ready when you are!'}</p></div>`}`;
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
async function submit() {
  T.done = true;
  const { n, t } = T, score = T.qs.filter((q, i) => T.ans[i] === q.a).length, date = today();
  const prev = (S.scores[n] && S.scores[n][t]) || { best: 0, attempts: 0 };
  const rec = { best: Math.max(prev.best, score), last: score, attempts: prev.attempts + 1, date };
  S.scores[n] = Object.assign({}, S.scores[n], { [t]: rec });
  T.secs = Math.round((Date.now() - T.start) / 1000);
  const r = { day: n, test: t, score, total: NQ, secs: T.secs, date, t: Date.now(), items: T.qs.map((q, i) => ({ q: q.q, a: q.a, c: T.ans[i], e: q.e || '' })) };
  S.results.push(r);
  if (!S.days.includes(date)) S.days.push(date);
  T.saved = ME ? 'saving' : 'local';
  save(); renderTest(); window.scrollTo({ top: 0, behavior: 'smooth' });
  if (ME) {
    try { await Cloud.saveResult(ME, { day: n, test: t, score, total: NQ, secs: T.secs, date, items: r.items }, rec); T.saved = 'ok'; }
    catch (e) { T.saved = 'error'; T.err = e.message; }
    if (T && T.done && location.hash.startsWith(`#test/${n}/${t}`)) renderTest();
  }
}
function result() {
  const { n, t } = T, score = T.qs.filter((q, i) => T.ans[i] === q.a).length, pass = score >= PASS, other = 3 - t;
  const msg = score === 10 ? 'Perfect score! 🌟' : score >= 8 ? 'Excellent work! 🎉' : pass ? 'Well done — you passed! 👍' : 'Keep practising — you can do it! 💪';
  const both = takenOn(n, other, today());
  const sv = { saving: '⏳ Saving to your account…', ok: '☁️ Saved to your account — your teacher can review it.', error: `⚠️ Could not save online (${esc(T.err)}). Check your internet and retake later.`, local: '' }[T.saved];
  return `<div class="panel result ${pass ? 'pass' : 'fail'}">
    ${ring(score)}
    <div><h2>Test ${t}: ${msg}</h2>
      <p>Time taken: ${mmss(T.secs)} · Best score for Test ${t}: ${S.scores[n][t].best}/10</p>
      ${sv ? `<p class="small">${sv}</p>` : ''}
      <p class="muted">${passed(n) ? (n < 90 ? `Both tests passed — Day ${n + 1} is unlocked.` : 'You have completed all 90 days! 🏆') : both ? `Both tests need ${PASS}/10 or more to pass the day.` : `Now take Test ${other} — every day needs a minimum of 2 tests.`}</p>
      <div class="btns">
        ${both ? `<a class="primary" href="#review/${n}/${today()}">See today's review of both tests →</a>` : `<a class="primary" href="#test/${n}/${other}">Take Test ${other} now →</a>`}
        <button class="ghost" onclick="testView(${n}, ${t})">Retake Test ${t} ↻</button>
        <a class="ghost" href="#day/${n}">Re-read lesson</a>
        ${passed(n) && n < 90 ? `<a class="ghost" href="#day/${n + 1}">Next: Day ${n + 1} →</a>` : ''}
      </div>
    </div></div>`;
}

// ---------- Reviews & my results ----------
function reviewView(n, date) {
  const dates = [...new Set(S.results.filter((r) => r.day === n).map((r) => r.date))].sort().reverse();
  if (!dates.length) { app.innerHTML = `<div class="panel center"><h2>No tests yet for Day ${n}</h2><a class="primary" href="#day/${n}">Go to Day ${n}</a></div>`; return; }
  if (!dates.includes(date)) date = dates[0];
  app.innerHTML = `
  <nav class="crumbs"><a href="#day/${n}">← Day ${n} lesson</a><a href="#me">My results</a></nav>
  ${dates.length > 1 ? `<div class="btns datepick">${dates.map((d) => `<a class="${d === date ? 'primary' : 'ghost'}" href="#review/${n}/${d}">${d === today() ? 'Today' : niceDate(d)}</a>`).join('')}</div>` : ''}
  <div class="review-wrap">${dayReview(n, date, S.results, 'Review of both tests ·')}</div>
  <div class="panel center"><div class="btns" style="justify-content:center">${TESTS.map((t) => `<a class="ghost" href="#test/${n}/${t}">Retake Test ${t}</a>`).join('')}${passed(n) && n < 90 ? `<a class="primary" href="#day/${n + 1}">Next: Day ${n + 1} →</a>` : ''}</div></div>`;
}

function meView() {
  const rows = {};
  S.results.forEach((r) => { const k = r.date + '|' + r.day; (rows[k] = rows[k] || { date: r.date, day: r.day, 1: null, 2: null, n: 0 }); rows[k][r.test] = r.score; rows[k].n++; });
  const list = Object.values(rows).sort((a, b) => (a.date === b.date ? b.day - a.day : a.date < b.date ? 1 : -1));
  const info = ME ? [['Name', ME.name], ['Email', ME.email], ['School', ME.school], ['Class & section', ME.section], ['Roll no.', ME.roll], ['Parent phone', ME.phone], ['City', ME.city]].filter((x) => x[1]) : [['Name', S.name || '—']];
  app.innerHTML = `
  <nav class="crumbs"><a href="#">← All days</a></nav>
  <div class="panel"><h1>My results</h1>
    <dl class="info">${info.map(([k, v]) => `<div><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>
    <p class="muted small">${ME ? 'Your results are saved to your account and your teacher can review them.' : 'Local mode: results are saved on this device only.'}</p></div>
  <div class="panel"><h2>Tests by date</h2>
  ${list.length ? `<div class="tablewrap"><table><thead><tr><th>Date</th><th>Day</th><th>Test 1</th><th>Test 2</th><th>Total</th><th></th></tr></thead><tbody>
    ${list.map((r) => `<tr><td>${niceDate(r.date)}</td><td>Day ${r.day}: ${esc(DAYS[r.day - 1].t)}</td><td>${sc(r[1])}</td><td>${sc(r[2])}</td><td><b>${(r[1] || 0) + (r[2] || 0)}/20</b></td><td><a href="#review/${r.day}/${r.date}">Review →</a></td></tr>`).join('')}
  </tbody></table></div>` : '<p class="muted">No tests taken yet.</p>'}</div>`;
}
const sc = (v) => (v == null ? '<span class="tag-bad">not taken</span>' : `<span class="${v >= PASS ? 'tag-ok' : 'tag-bad'}">${v}/10</span>`);

// ---------- Accounts (cloud mode) ----------
function authView(mode) {
  const reg = mode === 'register';
  app.innerHTML = `
  <div class="auth panel">
    <div class="tabs"><a class="${reg ? '' : 'on'}" href="javascript:authView('login')">Log in</a><a class="${reg ? 'on' : ''}" href="javascript:authView('register')">Register</a></div>
    <h1>${reg ? 'Create your student account' : 'Welcome back!'}</h1>
    <p class="muted">${reg ? 'Your details help your teacher follow your progress.' : 'Log in to continue your 90-day plan.'}</p>
    <form id="authForm" class="form">
      ${reg ? profileFields({}) : ''}
      <label>Email <input name="email" type="email" required autocomplete="email"></label>
      <label>Password <input name="password" type="password" required minlength="6" autocomplete="${reg ? 'new-password' : 'current-password'}"></label>
      <p class="err" id="authErr"></p>
      <button class="primary big">${reg ? 'Register' : 'Log in'}</button>
      ${reg ? '' : '<p class="small"><a href="javascript:forgot()">Forgot password?</a></p>'}
    </form>
  </div>`;
  document.getElementById('authForm').onsubmit = async (e) => {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.target)), err = document.getElementById('authErr');
    const btn = e.target.querySelector('button'); btn.disabled = true; err.textContent = '';
    try {
      if (reg) { const u = await Cloud.signUp(pickProfile(f, f.email.trim()), f.password); await enter(u); }
      else await Cloud.signIn(f.email.trim(), f.password);
    } catch (x) { err.textContent = friendly(x); btn.disabled = false; }
  };
}
const profileFields = (p) => `
  <label>Full name * <input name="name" required maxlength="40" value="${esc(p.name)}"></label>
  <div class="two"><label>School <input name="school" maxlength="60" value="${esc(p.school)}"></label>
  <label>Class & section <input name="section" maxlength="20" placeholder="8-A" value="${esc(p.section)}"></label></div>
  <div class="two"><label>Roll number <input name="roll" maxlength="15" value="${esc(p.roll)}"></label>
  <label>Parent phone <input name="phone" type="tel" maxlength="15" value="${esc(p.phone)}"></label></div>
  <label>City / village <input name="city" maxlength="40" value="${esc(p.city)}"></label>`;
const pickProfile = (f, email) => ({ name: f.name.trim(), email, school: (f.school || '').trim(), section: (f.section || '').trim(), roll: (f.roll || '').trim(), phone: (f.phone || '').trim(), city: (f.city || '').trim() });
function friendly(x) {
  const c = x.code || '';
  if (/invalid-credential|wrong-password|user-not-found/.test(c)) return 'Email or password is incorrect.';
  if (/email-already-in-use/.test(c)) return 'This email is already registered — please log in.';
  if (/weak-password/.test(c)) return 'Password must be at least 6 characters.';
  if (/invalid-email/.test(c)) return 'Please enter a valid email address.';
  if (/network/.test(c)) return 'No internet connection. Please try again.';
  return x.message || 'Something went wrong.';
}
async function forgot() {
  const email = prompt('Enter your registered email to get a password reset link:');
  if (!email) return;
  try { await Cloud.resetPassword(email.trim()); alert('Reset link sent. Check your email (and spam folder).'); } catch (x) { alert(friendly(x)); }
}
function profileForm(user) {
  app.innerHTML = `<div class="auth panel"><h1>Complete your profile</h1><form id="pf" class="form">${profileFields({})}<p class="err" id="pfErr"></p><button class="primary big">Save</button></form></div>`;
  document.getElementById('pf').onsubmit = async (e) => {
    e.preventDefault();
    try { await Cloud.createProfile(user.uid, pickProfile(Object.fromEntries(new FormData(e.target)), user.email)); await enter(user); }
    catch (x) { document.getElementById('pfErr').textContent = friendly(x); }
  };
}
async function enter(user) {
  app.innerHTML = '<div class="panel center">Loading your progress…</div>';
  try {
    const prof = await Cloud.profile(user.uid);
    if (!prof) return profileForm(user);
    ME = prof;
    S = { name: prof.name, unlockAll: prof.role === 'admin' || !!prof.unlockAll, scores: prof.progress || {}, days: prof.days || [], results: await Cloud.resultsOf(user.uid) };
    READY = true; renderUserbar(); route();
  } catch (x) { app.innerHTML = `<div class="panel center"><h2>Could not load your account</h2><p>${esc(friendly(x))}</p><button class="primary" onclick="location.reload()">Try again</button></div>`; }
}

function renderUserbar() {
  const bar = document.getElementById('userbar');
  if (Cloud.enabled && !ME) { bar.innerHTML = ''; return; }
  bar.innerHTML = `<a class="ghost" href="#me">📊 My results</a>${ME && ME.role === 'admin' ? '<a class="ghost" href="admin.html">🛡 Admin</a>' : ''}<button class="ghost" id="settingsBtn">⚙︎</button>${ME ? '<button class="ghost" id="outBtn">Log out</button>' : ''}`;
  document.getElementById('settingsBtn').onclick = openSettings;
  if (ME) document.getElementById('outBtn').onclick = async () => { await Cloud.signOut(); ME = null; READY = false; location.hash = ''; };
}

// ---------- Settings ----------
const dlg = document.getElementById('settings');
function openSettings() {
  document.getElementById('setBody').innerHTML = ME
    ? profileFields(ME) + (ME.role === 'admin' ? `<label class="row"><input type="checkbox" id="unlockAll" ${S.unlockAll ? 'checked' : ''}> Unlock all 90 days</label>` : '')
    : `<label>Student name <input name="name" maxlength="30" value="${esc(S.name)}"></label>
       <label class="row"><input type="checkbox" id="unlockAll" ${S.unlockAll ? 'checked' : ''}> Teacher mode: unlock all 90 days</label>
       <p class="muted small">Normally each day unlocks when both tests of the day before score 6/10 or more.</p>
       <button id="resetBtn" type="button" class="danger">Reset all progress</button>`;
  const rb = document.getElementById('resetBtn');
  if (rb) rb.onclick = () => { if (!confirm('Delete all scores and start again from Day 1?')) return; S.scores = {}; S.days = []; S.results = []; save(); dlg.close(); location.hash = ''; route(); };
  dlg.showModal();
}
dlg.addEventListener('close', async () => {
  if (dlg.returnValue !== 'ok') return;
  const f = Object.fromEntries(new FormData(dlg.querySelector('form'))), ua = document.getElementById('unlockAll');
  if (ua) S.unlockAll = ua.checked;
  if (ME) {
    const p = pickProfile(f, ME.email); delete p.email;
    if (!p.name) p.name = ME.name;
    if (ME.role === 'admin') p.unlockAll = S.unlockAll;
    try { await Cloud.updateUser(ME.uid, p); Object.assign(ME, p); S.name = p.name; } catch (x) { alert(friendly(x)); }
  } else { S.name = (f.name || '').trim(); save(); }
  route();
});

// ---------- Router ----------
function route() {
  if (Cloud.enabled && !READY) return;
  const h = location.hash, m = h.match(/^#(day|test|review)\/(\d+)(?:\/([\w-]+))?/);
  const n = m ? Math.min(90, Math.max(1, +m[2])) : 0;
  if (h === '#me') meView();
  else if (!m) home();
  else if (m[1] === 'day') dayView(n);
  else if (m[1] === 'test') testView(n, m[3] === '2' ? 2 : 1);
  else reviewView(n, m[3]);
  window.scrollTo(0, 0);
}
window.addEventListener('hashchange', route);

(async function boot() {
  if (!Cloud.enabled) { loadLocal(); READY = true; renderUserbar(); route(); return; }
  app.innerHTML = '<div class="panel center">Loading…</div>';
  try { await Cloud.init(); } catch (x) { app.innerHTML = `<div class="panel center"><h2>Could not connect</h2><p>${esc(x.message)}</p><button class="primary" onclick="location.reload()">Try again</button></div>`; return; }
  Cloud.onAuth((user) => {
    if (Cloud.busy) return;
    if (!user) { ME = null; READY = false; renderUserbar(); authView('login'); return; }
    enter(user);
  });
})();

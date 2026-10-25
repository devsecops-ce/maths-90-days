// Admin dashboard: students, progress, per-date reviews of both daily tests, CSV exports.
const app = document.getElementById('app');
let ME = null, USERS = [], RES = {}, FILTER = { q: '', school: '', section: '', sort: 'name' };

function stats(u) {
  const p = u.progress || {}; let passedDays = 0, tests = 0, sum = 0, cnt = 0, maxDay = 0;
  for (const k in p) {
    let both = true;
    TESTS.forEach((t) => { const r = p[k][t]; if (r) { tests += r.attempts || 0; sum += r.best; cnt++; maxDay = Math.max(maxDay, +k); } if (!r || r.best < PASS) both = false; });
    if (both) passedDays++;
  }
  return { passedDays, tests, avg: cnt ? Math.round(sum / cnt * 10) : null, maxDay };
}
const ago = (t) => { if (!t) return '—'; const d = Math.floor((Date.now() - t) / 864e5); return d <= 0 ? 'today' : d === 1 ? 'yesterday' : d + ' days ago'; };
const students = () => USERS.filter((u) => u.role !== 'admin' || FILTER.showAdmins);
const resultsOf = async (uid) => (RES[uid] = RES[uid] || await Cloud.resultsOf(uid));

// ---------- Dashboard ----------
function dashboard() {
  const st = students(), all = st.map((u) => ({ u, s: stats(u) }));
  const t7 = Date.now() - 7 * 864e5, td = today();
  const totalTests = all.reduce((a, x) => a + x.s.tests, 0);
  const avgs = all.filter((x) => x.s.avg != null).map((x) => x.s.avg);
  const schools = [...new Set(st.map((u) => u.school).filter(Boolean))].sort();
  const sections = [...new Set(st.map((u) => u.section).filter(Boolean))].sort();
  const q = FILTER.q.toLowerCase();
  const rows = all.filter(({ u }) => (!q || [u.name, u.email, u.roll, u.phone, u.city].join(' ').toLowerCase().includes(q))
    && (!FILTER.school || u.school === FILTER.school) && (!FILTER.section || u.section === FILTER.section));
  const sorters = { name: (a, b) => (a.u.name || '').localeCompare(b.u.name || ''), progress: (a, b) => b.s.passedDays - a.s.passedDays, score: (a, b) => (b.s.avg ?? -1) - (a.s.avg ?? -1), active: (a, b) => b.u.lastT - a.u.lastT, low: (a, b) => (a.s.avg ?? 101) - (b.s.avg ?? 101) };
  rows.sort(sorters[FILTER.sort]);
  const opt = (v, cur, label) => `<option value="${esc(v)}" ${v === cur ? 'selected' : ''}>${esc(label || v)}</option>`;

  app.innerHTML = `
  <h1>Teacher dashboard</h1>
  <div class="kpis">
    <div class="stat"><b>${st.length}</b><span>students registered</span></div>
    <div class="stat"><b>${st.filter((u) => (u.days || []).includes(td)).length}</b><span>practised today</span></div>
    <div class="stat"><b>${st.filter((u) => u.lastT > t7).length}</b><span>active in last 7 days</span></div>
    <div class="stat"><b>${totalTests}</b><span>tests taken</span></div>
    <div class="stat"><b>${avgs.length ? Math.round(avgs.reduce((a, b) => a + b, 0) / avgs.length) : 0}%</b><span>average best score</span></div>
  </div>
  <div class="panel">
    <div class="toolbar">
      <input id="fq" type="search" placeholder="Search name, email, roll, phone…" value="${esc(FILTER.q)}">
      <select id="fschool">${opt('', FILTER.school, 'All schools')}${schools.map((s) => opt(s, FILTER.school)).join('')}</select>
      <select id="fsection">${opt('', FILTER.section, 'All classes')}${sections.map((s) => opt(s, FILTER.section)).join('')}</select>
      <select id="fsort">${[['name', 'Sort: name'], ['progress', 'Sort: most days passed'], ['score', 'Sort: highest score'], ['low', 'Sort: needs help first'], ['active', 'Sort: recently active']].map(([v, l]) => opt(v, FILTER.sort, l)).join('')}</select>
      <button class="ghost" id="csv">⬇ Export CSV</button>
    </div>
    <div class="tablewrap"><table class="click">
      <thead><tr><th>Student</th><th>School</th><th>Class</th><th>Roll</th><th>Phone</th><th>Days passed</th><th>Reached</th><th>Tests</th><th>Avg</th><th>Today</th><th>Last active</th></tr></thead>
      <tbody>${rows.map(({ u, s }) => `<tr onclick="location.hash='#student/${u.uid}'">
        <td><b>${esc(u.name)}</b><br><small class="muted">${esc(u.email)}</small></td><td>${esc(u.school)}</td><td>${esc(u.section)}</td><td>${esc(u.roll)}</td><td>${esc(u.phone)}</td>
        <td><div class="mini"><i style="width:${s.passedDays / 90 * 100}%"></i></div>${s.passedDays}/90</td><td>${s.maxDay ? 'Day ' + s.maxDay : '—'}</td><td>${s.tests}</td>
        <td>${s.avg == null ? '—' : `<span class="${s.avg >= 60 ? 'tag-ok' : 'tag-bad'}">${s.avg}%</span>`}</td>
        <td>${(u.days || []).includes(td) ? '✅' : '—'}</td><td>${ago(u.lastT)}</td></tr>`).join('') || '<tr><td colspan="11" class="muted">No students match.</td></tr>'}</tbody>
    </table></div>
  </div>
  ${dayAnalysis(st)}
  <div class="panel"><h2>Recent tests</h2><div id="recent" class="muted">Loading…</div></div>`;

  const upd = (k) => (e) => { FILTER[k] = e.target.value; dashboard(); if (k === 'q') { const i = document.getElementById('fq'); i.focus(); i.setSelectionRange(i.value.length, i.value.length); } };
  document.getElementById('fq').oninput = upd('q');
  document.getElementById('fschool').onchange = upd('school');
  document.getElementById('fsection').onchange = upd('section');
  document.getElementById('fsort').onchange = upd('sort');
  document.getElementById('csv').onclick = () => downloadCSV(`students-${today()}.csv`, [['Name', 'Email', 'School', 'Class', 'Roll', 'Parent phone', 'City', 'Days passed', 'Reached day', 'Tests taken', 'Average best %', 'Last active']]
    .concat(rows.map(({ u, s }) => [u.name, u.email, u.school, u.section, u.roll, u.phone, u.city, s.passedDays, s.maxDay, s.tests, s.avg, u.lastT ? new Date(u.lastT).toLocaleString('en-IN') : ''])));
  loadRecent();
}

function dayAnalysis(st) {
  const rows = [];
  for (let n = 1; n <= 90; n++) {
    const v = TESTS.map((t) => st.map((u) => u.progress && u.progress[n] && u.progress[n][t]).filter(Boolean));
    if (!v[0].length && !v[1].length) continue;
    const avg = (a) => (a.length ? a.reduce((s, r) => s + r.best, 0) / a.length : null);
    const tried = st.filter((u) => u.progress && u.progress[n]).length;
    const pass = st.filter((u) => u.progress && u.progress[n] && TESTS.every((t) => u.progress[n][t] && u.progress[n][t].best >= PASS)).length;
    rows.push({ n, tried, pass, a1: avg(v[0]), a2: avg(v[1]) });
  }
  if (!rows.length) return '';
  const weak = rows.filter((r) => r.tried).map((r) => ({ ...r, m: ((r.a1 ?? 0) + (r.a2 ?? 0)) / ((r.a1 != null) + (r.a2 != null)) })).sort((a, b) => a.m - b.m).slice(0, 5);
  const f = (x) => (x == null ? '—' : x.toFixed(1));
  return `<div class="panel"><h2>Topic analysis</h2>
    <p class="muted">Weakest topics (lowest average best score): ${weak.map((w) => `<b>Day ${w.n}</b> ${esc(DAYS[w.n - 1].t)} (${w.m.toFixed(1)}/10)`).join(' · ')}</p>
    <div class="tablewrap"><table><thead><tr><th>Day</th><th>Topic</th><th>Students tried</th><th>Passed both</th><th>Avg Test 1</th><th>Avg Test 2</th></tr></thead><tbody>
    ${rows.map((r) => `<tr><td>${r.n}</td><td>${esc(DAYS[r.n - 1].t)}</td><td>${r.tried}</td><td>${r.pass} (${Math.round(r.pass / r.tried * 100)}%)</td><td>${f(r.a1)}</td><td>${f(r.a2)}</td></tr>`).join('')}
    </tbody></table></div></div>`;
}

async function loadRecent() {
  const box = document.getElementById('recent');
  try {
    const rs = await Cloud.recent(40);
    if (!document.body.contains(box)) return;
    box.classList.remove('muted');
    box.innerHTML = rs.length ? `<div class="tablewrap"><table class="click"><thead><tr><th>When</th><th>Student</th><th>Day</th><th>Test</th><th>Score</th><th>Time</th></tr></thead><tbody>
      ${rs.map((r) => `<tr onclick="location.hash='#review/${r.uid}/${r.day}/${r.date}'"><td>${new Date(r.t).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}</td><td>${esc(r.name)}</td><td>Day ${r.day}: ${esc(DAYS[r.day - 1].t)}</td><td>Test ${r.test}</td><td><span class="${r.score >= PASS ? 'tag-ok' : 'tag-bad'}">${r.score}/10</span></td><td>${mmss(r.secs)}</td></tr>`).join('')}
      </tbody></table></div>` : 'No tests taken yet.';
  } catch (x) { box.textContent = 'Could not load: ' + x.message; }
}

// ---------- One student ----------
async function studentView(uid) {
  const u = USERS.find((x) => x.uid === uid);
  if (!u) { app.innerHTML = '<div class="panel">Student not found. <a href="#">Back</a></div>'; return; }
  app.innerHTML = '<div class="panel center">Loading tests…</div>';
  const rs = await resultsOf(uid), s = stats(u);
  const groups = {};
  rs.forEach((r) => { const k = r.date + '|' + r.day; (groups[k] = groups[k] || { date: r.date, day: r.day, 1: [], 2: [] })[r.test].push(r.score); });
  const list = Object.values(groups).sort((a, b) => (a.date === b.date ? b.day - a.day : a.date < b.date ? 1 : -1));
  const dates = [...new Set(rs.map((r) => r.date))];
  const missed = list.filter((g) => !g[1].length || !g[2].length).length;
  const cell = (n) => { const p = u.progress && u.progress[n]; if (!p) return `<i title="Day ${n}: not started">${n}</i>`; const b = TESTS.map((t) => (p[t] ? p[t].best : null)); const ok = b.every((x) => x >= PASS);
    return `<i class="${ok ? 'g' : 'y'}" title="Day ${n}: Test 1 ${b[0] ?? '–'}/10, Test 2 ${b[1] ?? '–'}/10">${n}</i>`; };
  const info = [['Email', u.email], ['School', u.school], ['Class & section', u.section], ['Roll no.', u.roll], ['Parent phone', u.phone], ['City', u.city], ['Registered', u.createdAt && u.createdAt.toDate ? u.createdAt.toDate().toLocaleDateString('en-IN') : ''], ['Last active', ago(u.lastT)]].filter((x) => x[1]);
  app.innerHTML = `
  <nav class="crumbs"><a href="#">← All students</a></nav>
  <div class="panel">
    <h1>${esc(u.name)} ${u.role === 'admin' ? '<span class="chip lv4">admin</span>' : ''}</h1>
    <dl class="info">${info.map(([k, v]) => `<div><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>
    <div class="kpis">
      <div class="stat"><b>${s.passedDays}/90</b><span>days passed</span></div>
      <div class="stat"><b>${s.tests}</b><span>tests taken</span></div>
      <div class="stat"><b>${s.avg == null ? '—' : s.avg + '%'}</b><span>average best</span></div>
      <div class="stat"><b>${dates.length}</b><span>days practised</span></div>
      <div class="stat"><b>${missed}</b><span>dates with only 1 test</span></div>
    </div>
    <div class="btns">
      <label class="row"><input type="checkbox" id="ul" ${u.unlockAll ? 'checked' : ''}> Unlock all 90 days for this student</label>
      ${u.uid !== ME.uid ? `<button class="ghost" id="role">${u.role === 'admin' ? 'Remove admin rights' : 'Make admin'}</button>` : ''}
      <button class="ghost" id="csv">⬇ Export all attempts (CSV)</button>
    </div>
  </div>
  <div class="panel"><h2>90-day progress</h2><div class="heat">${range90().map(cell).join('')}</div>
    <p class="small muted"><i class="key g"></i> both tests passed <i class="key y"></i> started, not passed <i class="key"></i> not started</p></div>
  <div class="panel"><h2>Tests by date</h2>
  ${list.length ? `<div class="tablewrap"><table class="click"><thead><tr><th>Date</th><th>Day</th><th>Test 1</th><th>Test 2</th><th>Status</th></tr></thead><tbody>
    ${list.map((g) => { const l1 = g[1][g[1].length - 1], l2 = g[2][g[2].length - 1];
      const st_ = l1 == null || l2 == null ? '<span class="tag-bad">only 1 test</span>' : l1 >= PASS && l2 >= PASS ? '<span class="tag-ok">passed</span>' : '<span class="tag-bad">not passed</span>';
      return `<tr onclick="location.hash='#review/${uid}/${g.day}/${g.date}'"><td>${niceDate(g.date)}</td><td>Day ${g.day}: ${esc(DAYS[g.day - 1].t)}</td><td>${g[1].length ? g[1].join(', ') : '—'}</td><td>${g[2].length ? g[2].join(', ') : '—'}</td><td>${st_} <a href="#review/${uid}/${g.day}/${g.date}">Review →</a></td></tr>`; }).join('')}
  </tbody></table></div>` : '<p class="muted">No tests taken yet.</p>'}</div>`;

  document.getElementById('ul').onchange = async (e) => { try { await Cloud.updateUser(uid, { unlockAll: e.target.checked }); u.unlockAll = e.target.checked; } catch (x) { alert(x.message); e.target.checked = !e.target.checked; } };
  const rb = document.getElementById('role');
  if (rb) rb.onclick = async () => { const role = u.role === 'admin' ? 'student' : 'admin'; if (!confirm(`${role === 'admin' ? 'Give' : 'Remove'} admin rights for ${u.name}?`)) return; await Cloud.updateUser(uid, { role }); u.role = role; studentView(uid); };
  document.getElementById('csv').onclick = () => downloadCSV(`${(u.name || 'student').replace(/\W+/g, '-')}-attempts.csv`, [['Date', 'Time', 'Day', 'Topic', 'Test', 'Score', 'Out of', 'Time taken (s)', 'Wrong questions']]
    .concat(rs.map((r) => [r.date, new Date(r.t).toLocaleTimeString('en-IN'), r.day, DAYS[r.day - 1].t, r.test, r.score, r.total, r.secs, r.items.filter((i) => i.c !== i.a).map((i) => i.q.replace(/<[^>]+>/g, '')).join(' | ')])));
}
const range90 = () => Array.from({ length: 90 }, (_, i) => i + 1);

async function reviewView(uid, day, date) {
  const u = USERS.find((x) => x.uid === uid) || { name: 'Student' };
  app.innerHTML = '<div class="panel center">Loading…</div>';
  const rs = await resultsOf(uid);
  const dates = [...new Set(rs.filter((r) => r.day === day).map((r) => r.date))].sort().reverse();
  if (!dates.length) { app.innerHTML = `<div class="panel">No tests for Day ${day}. <a href="#student/${uid}">Back</a></div>`; return; }
  if (!dates.includes(date)) date = dates[0];
  app.innerHTML = `<nav class="crumbs"><a href="#student/${uid}">← ${esc(u.name)}</a><a href="#">All students</a></nav>
    ${dates.length > 1 ? `<div class="btns datepick">${dates.map((d) => `<a class="${d === date ? 'primary' : 'ghost'}" href="#review/${uid}/${day}/${d}">${niceDate(d)}</a>`).join('')}</div>` : ''}
    <div class="review-wrap">${dayReview(day, date, rs, esc(u.name) + ' ·')}</div>`;
}

// ---------- Access ----------
function loginView(msg) {
  app.innerHTML = `<div class="auth panel"><h1>Admin login</h1>${msg ? `<p class="err">${msg}</p>` : ''}
    <form id="lf" class="form"><label>Email <input name="email" type="email" required></label><label>Password <input name="password" type="password" required></label>
    <p class="err" id="le"></p><button class="primary big">Log in</button></form></div>`;
  document.getElementById('lf').onsubmit = async (e) => {
    e.preventDefault(); const f = Object.fromEntries(new FormData(e.target));
    try { await Cloud.signIn(f.email.trim(), f.password); } catch (x) { document.getElementById('le').textContent = /credential|password|not-found/.test(x.code || '') ? 'Email or password is incorrect.' : x.message; }
  };
}
function route() {
  if (!ME) return;
  const h = location.hash; let m;
  if ((m = h.match(/^#student\/(\w+)/))) studentView(m[1]);
  else if ((m = h.match(/^#review\/(\w+)\/(\d+)\/([\w-]+)/))) reviewView(m[1], +m[2], m[3]);
  else dashboard();
  window.scrollTo(0, 0);
}
window.addEventListener('hashchange', route);

(async function boot() {
  if (!Cloud.enabled) {
    app.innerHTML = `<div class="panel"><h1>Admin is not set up yet</h1><p>The site is running in local mode, so no student data is stored online.</p>
      <p>Follow <a href="https://github.com/devsecops-ce/maths-90-days/blob/main/SETUP.md" target="_blank" rel="noopener">SETUP.md</a> to connect a free Firebase project, then reload this page.</p></div>`;
    return;
  }
  app.innerHTML = '<div class="panel center">Loading…</div>';
  try { await Cloud.init(); } catch (x) { app.innerHTML = `<div class="panel">Could not connect: ${esc(x.message)}</div>`; return; }
  Cloud.onAuth(async (user) => {
    const bar = document.getElementById('userbar');
    if (!user) { ME = null; bar.innerHTML = '<a class="ghost" href="index.html">Student site</a>'; return loginView(); }
    const prof = await Cloud.profile(user.uid).catch(() => null);
    if (!prof || prof.role !== 'admin') {
      app.innerHTML = `<div class="panel"><h1>Not an admin account</h1><p>You are logged in as <b>${esc(user.email)}</b>, which does not have admin rights.</p>
        <p class="muted">To make the first admin: open Firebase console → Firestore → <code>users</code> → this user's document, and change <code>role</code> from <code>student</code> to <code>admin</code>. After that, admins can promote others from this dashboard.</p>
        <button class="ghost" onclick="Cloud.signOut()">Log out</button></div>`;
      return;
    }
    ME = prof;
    bar.innerHTML = `<span class="muted small">${esc(prof.name)}</span><button class="ghost" onclick="RES={};load()">↻ Refresh</button><a class="ghost" href="index.html">Student site</a><button class="ghost" onclick="Cloud.signOut()">Log out</button>`;
    load();
  });
})();
async function load() {
  app.innerHTML = '<div class="panel center">Loading students…</div>';
  try { USERS = await Cloud.allUsers(); route(); } catch (x) { app.innerHTML = `<div class="panel">Could not load students: ${esc(x.message)}. Check the Firestore rules (SETUP.md step 4).</div>`; }
}

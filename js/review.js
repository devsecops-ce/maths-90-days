// Rendering shared by the student app and the admin dashboard.
const PASS = 6, NQ = 10, TESTS = [1, 2];
const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const today = () => { const d = new Date(); return new Date(d - d.getTimezoneOffset() * 6e4).toISOString().slice(0, 10); };
const niceDate = (s) => new Date(s + 'T00:00').toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
const mmss = (s) => `${Math.floor((s || 0) / 60)}m ${(s || 0) % 60}s`;
const ring = (score, total = NQ, size = '') => `<div class="ring ${size} ${score >= total * PASS / NQ ? '' : 'low'}" style="--p:${Math.round(score / total * 100)}"><b>${score}/${total}</b></div>`;

// Question-by-question review of one attempt; items are {q, a (correct), c (chosen), e (explanation)}.
function reviewList(items) {
  return `<ol class="qs">${items.map((it) => {
    const ok = it.c === it.a;
    return `<li class="q ${ok ? 'right' : 'wrong'}"><div class="qt">${it.q}</div>
      <div class="ans"><span class="${ok ? 'tag-ok' : 'tag-bad'}">${ok ? '✅' : '❌'} Answered: <b>${it.c == null ? '—' : it.c}</b></span>${ok ? '' : `<span class="tag-ok">Correct: <b>${it.a}</b></span>`}</div>
      ${it.e ? `<div class="explain">${it.e}</div>` : ''}</li>`;
  }).join('')}</ol>`;
}

// Both tests of one day on one date: latest attempt of each, with summary and per-question review.
function dayReview(day, date, results, title) {
  const of = (t) => results.filter((r) => r.day === day && r.date === date && r.test === t).sort((a, b) => a.t - b.t);
  const latest = TESTS.map((t) => { const a = of(t); return a[a.length - 1] || null; });
  const total = latest.reduce((s, r) => s + (r ? r.score : 0), 0);
  const taken = latest.filter(Boolean).length;
  const wrong = latest.reduce((s, r) => s + (r ? r.items.filter((i) => i.c !== i.a).length : 0), 0);
  let verdict;
  if (taken < TESTS.length) verdict = `⚠️ Only ${taken} of ${TESTS.length} tests taken on this date — the plan needs a minimum of ${TESTS.length} tests every day.`;
  else if (latest.every((r) => r.score >= PASS)) verdict = total >= 18 ? '🌟 Outstanding — both tests mastered.' : '✅ Day passed — both tests scored 6 or more.';
  else verdict = '💪 Not passed yet — every test needs 6/10 or more. Study the mistakes below and retake.';
  const diff = taken === 2 ? latest[1].score - latest[0].score : null;
  return `
  <div class="panel review-sum">
    <div><p class="eyebrow">${title || ''} ${niceDate(date)}</p>
      <h2>Day ${day}: ${esc(DAYS[day - 1].t)}</h2>
      <p>${verdict}</p>
      <p class="muted">Combined: <b>${total}/${NQ * TESTS.length}</b> · ${wrong} question${wrong === 1 ? '' : 's'} to revise${diff != null ? ` · Test 2 vs Test 1: ${diff > 0 ? '+' : ''}${diff}` : ''}</p></div>
    <div class="rings">${latest.map((r, i) => `<div class="rcol">${r ? ring(r.score) : '<div class="ring empty"><b>—</b></div>'}<span>Test ${i + 1}</span></div>`).join('')}</div>
  </div>
  <label class="onlywrong"><input type="checkbox" onchange="this.closest('.review-wrap').classList.toggle('only-wrong', this.checked)"> Show only mistakes</label>
  ${latest.map((r, i) => {
    const all = of(i + 1);
    if (!r) return `<section class="panel"><h3>Test ${i + 1}</h3><p class="muted">Not taken on this date.</p></section>`;
    return `<section class="treview"><h3>Test ${i + 1} — ${r.score}/${NQ} <small class="muted">· time ${mmss(r.secs)}${all.length > 1 ? ` · ${all.length} attempts this date (${all.map((a) => a.score).join(', ')}), latest shown` : ''}</small></h3>${reviewList(r.items)}</section>`;
  }).join('')}`;
}

function downloadCSV(name, rows) {
  const csv = rows.map((r) => r.map((v) => `"${String(v == null ? '' : v).replace(/"/g, '""')}"`).join(',')).join('\n');
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob(['﻿' + csv], { type: 'text/csv' }));
  a.download = name; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

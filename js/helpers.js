// Shared maths helpers and the question builder used by every day's generator.
const R = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
const pick = (a) => a[Math.floor(Math.random() * a.length)];
const shuffle = (a) => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a; };
const lcm = (a, b) => a / gcd(a, b) * b;
const M = '−';
const sup = (n) => `<sup>${fmt(n)}</sup>`;
const nz = (a, b) => { let v; do v = R(a, b); while (v === 0); return v; };

// Number to display string: rounds float noise, uses a real minus sign.
function fmt(x) {
  if (typeof x === 'string') return x;
  let v = Math.round(x * 1e6) / 1e6;
  if (Object.is(v, -0)) v = 0;
  return (v < 0 ? M : '') + String(Math.abs(v));
}
const p = (n) => (n < 0 ? `(${fmt(n)})` : fmt(n));
const sgn = (n) => (n < 0 ? ` − ${fmt(-n)}` : ` + ${fmt(n)}`);
const rs = (n) => '₹' + fmt(n);

// Fractions
const F = (n, d = 1) => { if (d < 0) { n = -n; d = -d; } const g = gcd(n, d) || 1; return { n: n / g, d: d / g }; };
const fa = (x, y) => F(x.n * y.d + y.n * x.d, x.d * y.d);
const fs = (x, y) => F(x.n * y.d - y.n * x.d, x.d * y.d);
const fm = (x, y) => F(x.n * y.n, x.d * y.d);
const fd = (x, y) => F(x.n * y.d, x.d * y.n);
const fstr = (f) => { f = F(f.n, f.d); return f.d === 1 ? fmt(f.n) : fmt(f.n) + '/' + f.d; };
const fr = (n, d) => fstr(F(n, d));
const fv = (f) => f.n / f.d;

// Polynomial in one variable: c[i] is the coefficient of v^i.
function px(c, v = 'x') {
  let s = '';
  for (let i = c.length - 1; i >= 0; i--) {
    const k = c[i]; if (!k) continue;
    const ab = Math.abs(k);
    const t = i === 0 ? String(ab) : (ab === 1 ? '' : ab) + v + (i > 1 ? sup(i) : '');
    s += s ? (k < 0 ? ' − ' : ' + ') + t : (k < 0 ? M : '') + t;
  }
  return s || '0';
}
const pmul = (a, b) => { const r = Array(a.length + b.length - 1).fill(0); a.forEach((x, i) => b.forEach((y, j) => { r[i + j] += x * y; })); return r; };

// Linear combination of named terms: [[3,'x'],[-2,'y'],[5,'']].
function lin(ts) {
  let s = '';
  for (const [k, v] of ts) {
    if (!k) continue;
    const ab = Math.abs(k);
    const t = v ? (ab === 1 ? '' : ab) + v : String(ab);
    s += s ? (k < 0 ? ' − ' : ' + ') + t : (k < 0 ? M : '') + t;
  }
  return s || '0';
}
const vp = (v, n) => (n === 0 ? '' : n === 1 ? v : v + sup(n));

// Question: text, correct answer, distractors, explanation.
const Q = (q, a, d = [], e = '') => ({ q, a: fmt(a), d: d.map(fmt), e });

// Fallback distractors close to a numeric or fraction answer.
function near(a) {
  const s = a.replace(/−/g, '-');
  if (/^-?\d+\/\d+$/.test(s)) {
    const [n, d] = s.split('/').map(Number);
    return [fr(n + 1, d), fr(n - 1, d), fr(n, d + 1), fr(d, n), fr(-n, d), fr(n * 2, d)];
  }
  if (!/^-?\d+(\.\d+)?$/.test(s)) {
    // Text answer (e.g. "72°", "(x + 3)(x − 2)"): nudge one of its numbers, never an exponent.
    const re = /(?<!<sup>)\d+/g, spots = [...a.matchAll(re)];
    if (!spots.length) return [];
    const out = [];
    for (const dlt of [1, -1, 2, 10, 3, -2]) {
      const m = spots[out.length % spots.length], v = +m[0] + dlt;
      if (v < 0) continue;
      out.push(a.slice(0, m.index) + v + a.slice(m.index + m[0].length));
    }
    return out;
  }
  const v = parseFloat(s);
  const dec = (s.split('.')[1] || '').length;
  const st = Math.pow(10, -dec);
  return [v + st, v - st, v + 2 * st, v * 2, v + 10 * st, v - 10 * st, v / 2, v + 5 * st, v * 10, -v, v + 3 * st].map(fmt);
}

function finalize(o) {
  const a = o.a, opts = [a], seen = new Set([a]);
  const neg = a.startsWith(M);
  const add = (x, fromNear) => {
    if (opts.length >= 4 || x == null) return;
    const s = String(x);
    if (seen.has(s) || /NaN|Infinity|undefined/.test(s)) return;
    if (fromNear && !neg && s.startsWith(M)) return;
    seen.add(s); opts.push(s);
  };
  o.d.forEach((x) => add(x, false));
  near(a).forEach((x) => add(x, true));
  return { q: o.q, a, opts: o.keep ? opts : shuffle(opts), e: o.e };
}

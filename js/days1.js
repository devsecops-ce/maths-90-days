// Days 1–35: Foundations and Number System.
const DAYS = [];
// title, search phrase for online resources, intro, key points, worked example, generator (or [from, to] for a mixed review)
function D(t, s, i, k, ex, g) { DAYS.push({ t, s, i, k, ex, g }); }
const one = (...fns) => () => pick(fns)();

const PL = ['ones', 'tens', 'hundreds', 'thousands', 'ten thousands', 'lakhs', 'ten lakhs'];

// ---------- Phase 1: Foundations ----------
D('Place Value & Large Numbers', 'place value large numbers',
  'Every digit in a number has a <b>face value</b> (the digit itself) and a <b>place value</b> (digit × value of its place). In the Indian system we group as ones, thousands, lakhs, crores.',
  ['Places from right: ones, tens, hundreds, thousands, ten thousands, lakhs, ten lakhs, crores.', 'Place value = digit × 1, 10, 100, 1000 …', '1 lakh = 100 thousand, 1 crore = 100 lakh, 1 million = 10 lakh.', 'Place value of 0 is always 0.'],
  'In 4,<u>7</u>3,215 the digit 7 is in the ten-thousands place, so its place value is 7 × 10,000 = 70,000. Its face value is just 7.',
  one(
    () => { let n, s, i; do { n = R(10000, 9999999); s = String(n); i = R(0, s.length - 1); } while (s[i] === '0');
      const dg = +s[i], pw = s.length - 1 - i, pv = dg * 10 ** pw;
      return Q(`What is the <b>place value</b> of the underlined digit in ${s.slice(0, i)}<u><b>${s[i]}</b></u>${s.slice(i + 1)}?`, pv, [dg, dg * 10 ** (pw + 1), pw ? dg * 10 ** (pw - 1) : dg * 100], `The digit ${dg} is in the ${PL[pw]} place, so place value = ${dg} × ${10 ** pw} = ${pv}.`); },
    () => { const ds = [R(1, 9), R(0, 9), R(0, 9), R(0, 9), R(1, 9)]; const n = +ds.join('');
      const parts = ds.map((d, i) => (d ? `${d} × ${10 ** (4 - i)}` : null)).filter(Boolean).join(' + ');
      return Q(`Write as a number: ${parts}`, n, [n + 1000, n * 10, n + 90], `Add up the place values: ${parts} = ${n}.`); },
    () => { const t = pick([['1 crore', 'lakh', 100], ['1 million', 'lakh', 10], ['1 lakh', 'thousand', 100], ['1 billion', 'crore', 100], ['10 lakh', 'million', 1], ['1 crore', 'million', 10]]);
      return Q(`${t[0]} = how many ${t[1]}?`, t[2], [t[2] * 10, t[2] === 1 ? 100 : t[2] / 10, 1000], `${t[0]} = ${t[2]} ${t[1]}.`); },
    () => { let n, s, i; do { n = R(10000, 999999); s = String(n); i = R(0, s.length - 2); } while (s[i] === '0');
      const dg = +s[i], pv = dg * 10 ** (s.length - 1 - i);
      return Q(`Find (place value − face value) of the underlined digit in ${s.slice(0, i)}<u><b>${s[i]}</b></u>${s.slice(i + 1)}.`, pv - dg, [pv, pv + dg, dg], `Place value ${pv} − face value ${dg} = ${pv - dg}.`); }
  ));

D('Addition & Subtraction', 'addition subtraction large numbers',
  'Line numbers up by place value and work from the ones column leftwards, carrying (addition) or borrowing (subtraction).',
  ['Always start from the ones column.', 'Carry 1 to the next column when a column sum is 10 or more.', 'To check subtraction, add the answer to the smaller number — you should get the bigger number.', 'Estimate first (round to thousands) to catch big mistakes.'],
  '45,678 + 23,945: 8+5 = 13 (write 3, carry 1), 7+4+1 = 12 (write 2, carry 1), 6+9+1 = 16, 5+3+1 = 9, 4+2 = 6 → <b>69,623</b>.',
  () => { const a = R(10000, 99999), b = R(1000, 99999), big = Math.max(a, b), sm = Math.min(a, b), t = R(0, 3);
    if (t === 0) return Q(`${a} + ${b} = ?`, a + b, [a + b + 10, a + b - 100, a + b + 1000], 'Add column by column from the ones place, carrying when a column total is 10 or more.');
    if (t === 1) return Q(`${big} − ${sm} = ?`, big - sm, [big - sm + 10, big - sm - 100, big - sm + 1000], `Check: ${big - sm} + ${sm} = ${big}.`);
    if (t === 2) return Q(`A town has ${a} men and ${b} women. What is the total population?`, a + b, [a + b - 10, a + b + 100, big - sm], `Total = ${a} + ${b} = ${a + b}.`);
    return Q(`A school collected ${rs(big)} and spent ${rs(sm)}. How much money is left?`, big - sm, [big + sm, big - sm + 100, big - sm - 10], `Left = ${big} − ${sm} = ${big - sm}.`); });

D('Multiplication', 'multiplication of large numbers',
  'Multiplication is repeated addition. For bigger numbers, multiply by each digit of the second number separately and add the partial products.',
  ['a × b = b × a (order does not matter).', 'Multiplying by 10, 100, 1000 adds 1, 2, 3 zeros.', 'Break numbers apart: 23 × 14 = 23 × 10 + 23 × 4.', 'Estimate: 48 × 21 ≈ 50 × 20 = 1000.'],
  '346 × 27 = 346 × 20 + 346 × 7 = 6,920 + 2,422 = <b>9,342</b>.',
  () => { const a = R(12, 999), b = R(11, 99), t = R(0, 2);
    if (t === 0) return Q(`${a} × ${b} = ?`, a * b, [a * b + a, a * b - b, a * b + 10], `${a} × ${b} = ${a} × ${b - (b % 10)} + ${a} × ${b % 10} = ${a * (b - (b % 10))} + ${a * (b % 10)} = ${a * b}.`);
    if (t === 1) { const k = pick([10, 100, 1000]); return Q(`${a} × ${k} = ?`, a * k, [a * k * 10, a * k / 10, a + k], `Multiplying by ${k} adds ${String(k).length - 1} zero(s).`); }
    return Q(`One box holds ${b} pencils. How many pencils are in ${a} boxes?`, a * b, [a * b + b, a + b, a * b - a], `Total = ${a} × ${b} = ${a * b}.`); });

D('Division', 'long division',
  'Division splits a number into equal groups. Dividend = Divisor × Quotient + Remainder, and the remainder is always smaller than the divisor.',
  ['Dividend ÷ Divisor = Quotient (with remainder).', 'Check: Divisor × Quotient + Remainder = Dividend.', 'Remainder < Divisor always.', 'Dividing by 10, 100 removes zeros from the end.'],
  '1,000 ÷ 7: 7 × 142 = 994, remainder 6. So quotient 142, remainder 6. Check: 7 × 142 + 6 = 1,000 ✓.',
  () => { const d = R(3, 25), q = R(12, 500), r = R(0, d - 1), n = d * q + r, t = R(0, 2);
    if (t === 0) return Q(`${d * q} ÷ ${d} = ?`, q, [q + 1, q - 1, q * 10], `${d} × ${q} = ${d * q}, so the answer is ${q}.`);
    if (t === 1) return Q(`What is the <b>remainder</b> when ${n} is divided by ${d}?`, r, [r + 1, d, q % d === r ? r + 2 : q % d], `${d} × ${q} = ${d * q}; ${n} − ${d * q} = ${r}.`);
    return Q(`${d * q} sweets are shared equally among ${d} children. How many does each get?`, q, [q + d, q - 1, d * 2], `Each gets ${d * q} ÷ ${d} = ${q}.`); });

D('Order of Operations (BODMAS)', 'BODMAS order of operations',
  'When an expression has several operations, follow <b>BODMAS</b>: Brackets → Orders (powers/roots) → Division and Multiplication (left to right) → Addition and Subtraction (left to right).',
  ['Brackets first, always.', 'Powers like 3² come next.', '× and ÷ before + and −.', 'Operations of the same rank go left to right.'],
  '20 − 3 × (8 − 2) = 20 − 3 × 6 = 20 − 18 = <b>2</b>. (Wrong way: 17 × 6 = 102!)',
  one(
    () => { const a = R(2, 20), b = R(2, 12), c = R(2, 12); return Q(`${a} + ${b} × ${c} = ?`, a + b * c, [(a + b) * c], `× first: ${b} × ${c} = ${b * c}; then ${a} + ${b * c} = ${a + b * c}.`); },
    () => { const a = R(2, 15), b = R(2, 15), c = R(2, 9); return Q(`(${a} + ${b}) × ${c} = ?`, (a + b) * c, [a + b * c], `Brackets first: ${a + b}; then × ${c} = ${(a + b) * c}.`); },
    () => { const d = R(2, 9), k = R(2, 9), c = d * k, a = R(2, 12), b = R(2, 12); return Q(`${a} × ${b} − ${c} ÷ ${d} = ?`, a * b - k, [(a * b - c) / d, a * b - c], `${a} × ${b} = ${a * b}, ${c} ÷ ${d} = ${k}; ${a * b} − ${k} = ${a * b - k}.`); },
    () => { const b = R(10, 30), c = R(1, 9), d = R(2, 5), a = R(80, 150); return Q(`${a} − (${b} − ${c}) × ${d} = ?`, a - (b - c) * d, [(a - (b - c)) * d], `Bracket: ${b - c}; × ${d} = ${(b - c) * d}; ${a} − ${(b - c) * d} = ${a - (b - c) * d}.`); },
    () => { const a = R(2, 9), b = R(2, 9), c = R(10, 20), d = R(1, 9); return Q(`${a}${sup(2)} + ${b} × (${c} − ${d}) = ?`, a * a + b * (c - d), [2 * a + b * (c - d), (a * a + b) * (c - d)], `Bracket ${c - d}, power ${a * a}, multiply ${b * (c - d)}, add → ${a * a + b * (c - d)}.`); }
  ));

const nfac = (n) => { let c = 0; for (let i = 1; i <= n; i++) if (n % i === 0) c++; return c; };
D('Factors & Multiples', 'factors and multiples',
  'A <b>factor</b> divides a number exactly. A <b>multiple</b> is the number times 1, 2, 3, … Factors are limited; multiples go on forever.',
  ['1 is a factor of every number; every number is a factor of itself.', 'Find factors in pairs: 36 = 1×36, 2×18, 3×12, 4×9, 6×6.', 'Multiples of 7: 7, 14, 21, 28, …', 'Every number is a multiple of itself.'],
  'Factors of 24 come in pairs: (1,24) (2,12) (3,8) (4,6) → 1, 2, 3, 4, 6, 8, 12, 24 → <b>8 factors</b>.',
  one(
    () => { const n = pick([12, 16, 18, 20, 24, 28, 30, 32, 36, 40, 42, 45, 48, 50, 60, 64, 72, 84, 90, 100]); return Q(`How many factors does ${n} have?`, nfac(n), [], `List factor pairs of ${n}; there are ${nfac(n)} factors.`); },
    () => { const n = pick([36, 48, 60, 72, 84, 90, 96, 120]); const fs_ = []; for (let i = 2; i < n; i++) if (n % i === 0) fs_.push(i);
      const no = []; for (let i = 5; i < n && no.length < 6; i++) if (n % i) no.push(i);
      const f = pick(fs_); shuffle(no); return Q(`Which of these is a factor of ${n}?`, f, no.slice(0, 3), `${n} ÷ ${f} = ${n / f} exactly.`); },
    () => { const k = R(3, 13), c = k * R(5, 20); const w = [1, 2, 3].map(() => k * R(5, 20) + R(1, k - 1)); return Q(`Which of these is a multiple of ${k}?`, c, w, `${c} = ${k} × ${c / k}.`); },
    () => { const k = R(4, 15), m = R(30, 120), a = Math.ceil((m + 1) / k) * k; return Q(`What is the smallest multiple of ${k} greater than ${m}?`, a, [a - k, a + k, a + 1], `${k} × ${a / k} = ${a} is the first multiple after ${m}.`); }
  ));

const RULES = { 2: 'last digit is even', 3: 'sum of digits is divisible by 3', 4: 'last two digits form a number divisible by 4', 5: 'last digit is 0 or 5', 6: 'it is divisible by both 2 and 3', 8: 'last three digits form a number divisible by 8', 9: 'sum of digits is divisible by 9', 10: 'last digit is 0', 11: '(sum of odd-place digits) − (sum of even-place digits) is 0 or a multiple of 11' };
D('Divisibility Rules', 'divisibility rules',
  'Divisibility rules let you test if a number divides exactly — without doing the division.',
  ['By 2: last digit even. By 5: last digit 0 or 5. By 10: last digit 0.', 'By 3: digit sum divisible by 3. By 9: digit sum divisible by 9.', 'By 4: last two digits divisible by 4. By 8: last three digits divisible by 8.', 'By 6: divisible by 2 AND 3. By 11: alternate-digit-sum difference is 0 or a multiple of 11.'],
  'Is 7,128 divisible by 9? Digit sum = 7+1+2+8 = 18, and 18 is divisible by 9 → <b>yes</b>.',
  () => { const k = pick([2, 3, 4, 5, 6, 8, 9, 11]); const c = k * R(Math.ceil(100 / k), Math.floor(9999 / k));
    const w = []; while (w.length < 3) { const x = R(100, 9999); if (x % k && (k !== 2 || x % 2) && !w.includes(x)) w.push(x); }
    return Q(`Which number is divisible by ${k}?`, c, w, `A number is divisible by ${k} if ${RULES[k]}. ${c} passes this test.`); });

const PR = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97];
D('Prime Numbers & Prime Factorisation', 'prime factorization',
  'A <b>prime</b> has exactly two factors: 1 and itself. Every whole number greater than 1 can be written as a product of primes in exactly one way.',
  ['2 is the only even prime. 1 is neither prime nor composite.', 'Use a factor tree or repeated division by 2, 3, 5, 7 …', 'Write the answer in increasing order: 60 = 2 × 2 × 3 × 5.', 'Primes up to 50: 2,3,5,7,11,13,17,19,23,29,31,37,41,43,47.'],
  '84 ÷ 2 = 42, ÷ 2 = 21, ÷ 3 = 7, and 7 is prime → 84 = <b>2 × 2 × 3 × 7</b>.',
  one(
    () => { const c = pick(PR.slice(4)); const w = shuffle([21, 27, 33, 39, 49, 51, 57, 63, 69, 77, 81, 87, 91, 93]).slice(0, 3); return Q('Which of these is a prime number?', c, w, `${c} has only two factors: 1 and ${c}. The others can be divided (e.g. 51 = 3 × 17, 91 = 7 × 13).`); },
    () => { const f = Array.from({ length: R(3, 5) }, () => pick([2, 2, 3, 3, 5, 7])).sort((a, b) => a - b); const n = f.reduce((a, b) => a * b, 1);
      const alt = (i, v) => { const g = f.slice(); g[i] = v; return g.sort((a, b) => a - b).join(' × '); };
      return Q(`Prime factorisation of ${n} is:`, f.join(' × '), [alt(0, f[0] === 2 ? 3 : 2), alt(f.length - 1, f[f.length - 1] === 7 ? 5 : 7), f.slice(1).join(' × ')], `Divide ${n} repeatedly by the smallest prime: ${f.join(' × ')} = ${n}.`); },
    () => { const t = pick([[10, 4], [20, 8], [30, 10], [40, 12], [50, 15]]); return Q(`How many prime numbers are there between 1 and ${t[0]}?`, t[1], [], `Count them: ${PR.filter((x) => x < t[0]).join(', ')} → ${t[1]}.`); }
  ));

D('HCF (Highest Common Factor)', 'HCF highest common factor',
  'The <b>HCF</b> of numbers is the largest number that divides all of them exactly. Use it when you want the biggest equal group or piece size.',
  ['Method 1: list factors and pick the largest common one.', 'Method 2: prime factorise and multiply the common primes (lowest powers).', 'HCF of co-prime numbers is 1.', 'Word clue: “greatest”, “largest size”, “maximum number of equal groups”.'],
  'HCF(36, 60): 36 = 2²×3², 60 = 2²×3×5 → common 2²×3 = <b>12</b>.',
  () => { let h = R(2, 15), x, y; do { x = R(2, 12); y = R(2, 12); } while (x === y || gcd(x, y) !== 1); const a = h * x, b = h * y, t = R(0, 2);
    if (t === 0) return Q(`Find the HCF of ${a} and ${b}.`, h, [a * b / h, h * 2, Math.min(a, b) === h ? h + 1 : 1], `${a} = ${h} × ${x}, ${b} = ${h} × ${y}, and ${x}, ${y} share no common factor → HCF = ${h}.`);
    if (t === 1) return Q(`Two ropes are ${a} m and ${b} m long. What is the greatest length (in m) of pieces that cut both exactly?`, h, [a * b / h, h / 2 % 1 ? h + 1 : h / 2, 1], `Greatest common length = HCF(${a}, ${b}) = ${h} m.`);
    return Q(`What is the HCF of ${a}, ${b} and ${h * x * y}?`, h, [h * x, h * y, 1], `All three are multiples of ${h} and nothing bigger divides all three → ${h}.`); });

D('LCM (Lowest Common Multiple)', 'LCM lowest common multiple',
  'The <b>LCM</b> is the smallest number that is a multiple of all the given numbers. Use it for “when will they happen together again?” problems.',
  ['Prime factorise and take each prime with its highest power.', 'HCF × LCM = product of the two numbers.', 'LCM of co-prime numbers = their product.', 'Word clue: “together again”, “smallest number divisible by”, bells, traffic lights.'],
  'LCM(12, 18): 12 = 2²×3, 18 = 2×3² → 2²×3² = <b>36</b>. Check: HCF 6 × LCM 36 = 216 = 12 × 18 ✓.',
  () => { const a = R(4, 30); let b; do b = R(4, 30); while (b === a); const L = lcm(a, b), t = R(0, 2);
    if (t === 0) return Q(`Find the LCM of ${a} and ${b}.`, L, [a * b === L ? L * 2 : a * b, gcd(a, b), L + Math.min(a, b)], `LCM = ${a} × ${b} ÷ HCF(${gcd(a, b)}) = ${L}.`);
    if (t === 1) return Q(`Two bells ring every ${a} and ${b} minutes. They ring together now. After how many minutes will they ring together again?`, L, [a + b, a * b === L ? L * 2 : a * b, gcd(a, b)], `Together again after LCM(${a}, ${b}) = ${L} minutes.`);
    const h = gcd(a, b); return Q(`HCF of two numbers is ${h} and their product is ${a * b}. Find their LCM.`, L, [a * b, h * 2, L * 2], `LCM = product ÷ HCF = ${a * b} ÷ ${h} = ${L}.`); });

D('Fractions: Basics & Comparison', 'equivalent fractions comparing fractions',
  'A fraction p/q means p parts out of q equal parts. Multiplying or dividing top and bottom by the same number gives an <b>equivalent fraction</b>.',
  ['Simplest form: divide numerator and denominator by their HCF.', 'To compare, make denominators equal (use LCM) or cross-multiply.', 'Same denominator → bigger numerator is bigger.', 'Same numerator → smaller denominator is bigger.'],
  'Compare 3/4 and 5/7: cross-multiply 3×7 = 21 and 5×4 = 20. 21 > 20, so <b>3/4 > 5/7</b>.',
  one(
    () => { let n, d; do { d = R(2, 12); n = R(1, d - 1); } while (gcd(n, d) !== 1); const k = R(2, 9); return Q(`Write ${n * k}/${d * k} in simplest form.`, fr(n, d), [`${n * k}/${d}`, fr(n + 1, d), `${n}/${d * k}`], `HCF(${n * k}, ${d * k}) = ${k}; divide both by ${k} → ${n}/${d}.`); },
    () => { const fsx = []; while (fsx.length < 4) { const d = R(2, 12), n = R(1, d - 1); const f = F(n, d); if (!fsx.some((g) => fv(g) === fv(f))) fsx.push(f); }
      const big = R(0, 1), best = fsx.reduce((a, b) => ((big ? fv(b) > fv(a) : fv(b) < fv(a)) ? b : a));
      return Q(`Which fraction is the ${big ? 'largest' : 'smallest'}?`, fstr(best), fsx.filter((f) => f !== best).map(fstr), `As decimals: ${fsx.map((f) => fstr(f) + ' ≈ ' + fv(f).toFixed(2)).join(', ')}.`); },
    () => { let n, d; do { d = R(2, 9); n = R(1, d - 1); } while (gcd(n, d) !== 1); const k = R(2, 8); return Q(`${n}/${d} = ?/${d * k}`, n * k, [n + k, n * k + 1, d * k - n], `${d} × ${k} = ${d * k}, so multiply the top by ${k} too: ${n} × ${k} = ${n * k}.`); }
  ));

D('Adding & Subtracting Fractions', 'adding subtracting fractions unlike denominators',
  'To add or subtract fractions, first make the denominators the same (use the LCM), then add or subtract the numerators only.',
  ['Never add denominators: 1/2 + 1/3 ≠ 2/5.', 'Make denominators equal with the LCM.', 'Simplify the final answer.', 'Mixed numbers: convert to improper fractions first.'],
  '2/3 + 1/4: LCM 12 → 8/12 + 3/12 = <b>11/12</b>.',
  () => { const d1 = R(2, 12), d2 = R(2, 12), n1 = R(1, d1 - 1), n2 = R(1, d2 - 1), add = R(0, 1);
    const x = F(n1, d1), y = F(n2, d2), r = add ? fa(x, y) : fs(x, y), L = lcm(d1, d2);
    return Q(`${n1}/${d1} ${add ? '+' : '−'} ${n2}/${d2} = ?`, fstr(r), [fr(add ? n1 + n2 : n1 - n2, d1 + d2), fstr(add ? fs(x, y) : fa(x, y)), fr(add ? n1 * n2 : n1 * d2, d1 * d2 + 1)], `LCM of ${d1} and ${d2} is ${L}: ${n1 * L / d1}/${L} ${add ? '+' : '−'} ${n2 * L / d2}/${L} = ${fstr(r)}.`); });

D('Multiplying & Dividing Fractions', 'multiplying dividing fractions',
  'Multiply fractions straight across: top × top, bottom × bottom. To divide, multiply by the <b>reciprocal</b> (flip the second fraction).',
  ['a/b × c/d = (a×c)/(b×d).', 'a/b ÷ c/d = a/b × d/c.', 'Cancel common factors before multiplying to keep numbers small.', '“Of” means multiply: 2/3 of 12 = 8.'],
  '3/4 ÷ 9/8 = 3/4 × 8/9 = 24/36 = <b>2/3</b>.',
  one(
    () => { const a = F(R(1, 9), R(2, 10)), b = F(R(1, 9), R(2, 10)); return Q(`${fstr(a)} × ${fstr(b)} = ?`, fstr(fm(a, b)), [fstr(fd(a, b)), fr(a.n + b.n, a.d + b.d), fr(a.n * b.n, a.d + b.d)], `Multiply tops and bottoms: (${a.n}×${b.n})/(${a.d}×${b.d}) = ${fstr(fm(a, b))}.`); },
    () => { const a = F(R(1, 9), R(2, 10)), b = F(R(1, 9), R(2, 10)); return Q(`${fstr(a)} ÷ ${fstr(b)} = ?`, fstr(fd(a, b)), [fstr(fm(a, b)), fstr(fd(b, a)), fr(a.n * b.n, a.d)], `Flip the second: ${fstr(a)} × ${b.d}/${b.n} = ${fstr(fd(a, b))}.`); },
    () => { const d = R(2, 9), n = R(1, d - 1), k = R(2, 12) * d; return Q(`What is ${fr(n, d)} of ${k}?`, k * n / d, [k / d, k * d / n, k - n], `${k} ÷ ${d} = ${k / d}, × ${n} = ${k * n / d}.`); }
  ));

const DPL = ['tenths', 'hundredths', 'thousandths'];
D('Decimals: Basics', 'decimals place value',
  'Decimals show parts of a whole using tenths, hundredths, thousandths. 0.7 = 7/10, 0.07 = 7/100.',
  ['Places after the point: tenths, hundredths, thousandths.', 'Extra zeros at the end do not change value: 0.5 = 0.50.', 'To compare, line up the decimal points and compare digit by digit.', 'Fraction → decimal: make denominator 10, 100, 1000 or divide.'],
  '3/8 = 375/1000 = <b>0.375</b>. Which is bigger, 0.5 or 0.45? 0.50 vs 0.45 → 0.5 is bigger.',
  one(
    () => { const t = pick([[1, 2], [1, 4], [3, 4], [1, 5], [2, 5], [3, 5], [4, 5], [1, 8], [3, 8], [5, 8], [7, 8], [3, 20], [7, 20], [9, 25], [13, 25], [7, 50], [1, 10], [9, 10]]);
      const v = t[0] / t[1]; return Q(`Write ${t[0]}/${t[1]} as a decimal.`, v, [v * 10, v / 10, +(t[0] + '.' + t[1])], `${t[0]} ÷ ${t[1]} = ${fmt(v)}.`); },
    () => { const s = new Set(); while (s.size < 4) s.add(R(1, 999) / 1000); const a = [...s], big = R(0, 1), best = big ? Math.max(...a) : Math.min(...a);
      return Q(`Which decimal is the ${big ? 'largest' : 'smallest'}?`, best, a.filter((x) => x !== best), `Write all with 3 decimal places and compare: ${a.map((x) => x.toFixed(3)).join(', ')}.`); },
    () => { const ds = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, 4); const pos = R(0, 2); const s = `${ds[0]}.${ds[1]}${ds[2]}${ds[3]}`;
      return Q(`In ${s}, the digit ${ds[pos + 1]} is in which place?`, DPL[pos], DPL.filter((x, i) => i !== pos).concat(['ones']), `After the point: ${ds[1]} tenths, ${ds[2]} hundredths, ${ds[3]} thousandths.`); }
  ));

D('Decimals: Operations', 'decimal operations add subtract multiply divide',
  'Add/subtract decimals by lining up the points. Multiply as whole numbers then count decimal places. Divide by making the divisor a whole number.',
  ['Line up decimal points for + and −.', '× : total decimal places in the answer = sum of decimal places in the numbers.', '÷ by 10, 100: move the point left 1, 2 places.', 'Use 0 as a placeholder: 5 − 2.35 = 5.00 − 2.35.'],
  '2.4 × 0.3: 24 × 3 = 72, total 2 decimal places → <b>0.72</b>.',
  () => { const a = R(10, 999) / 10, b = R(10, 999) / 100, t = R(0, 3);
    if (t === 0) return Q(`${fmt(a)} + ${fmt(b)} = ?`, a + b, [a + b * 10, a * 10 + b, a + b + 1], 'Line up the decimal points, then add.');
    if (t === 1) { const x = Math.max(a, b), y = Math.min(a, b); return Q(`${fmt(x)} − ${fmt(y)} = ?`, x - y, [x - y + 0.1, x - y - 1, x + y], 'Line up the points; fill empty places with 0, then subtract.'); }
    if (t === 2) { const c = R(10, 99) / 10, k = R(2, 9); return Q(`${fmt(c)} × ${k} = ?`, c * k, [c * k * 10, c * k / 10, c + k], `${Math.round(c * 10)} × ${k} = ${Math.round(c * 10) * k}; one decimal place → ${fmt(c * k)}.`); }
    const q = R(11, 99) / 10, d = R(2, 9); return Q(`${fmt(q * d)} ÷ ${d} = ?`, q, [q * 10, q / 10, q + 1], `${fmt(q * d)} ÷ ${d} = ${fmt(q)}. Check: ${fmt(q)} × ${d} = ${fmt(q * d)}.`); });

D('Integers: Number Line, Add & Subtract', 'integers addition subtraction number line',
  'Integers are …, −3, −2, −1, 0, 1, 2, 3, … On the number line, numbers increase to the right.',
  ['Adding a positive → move right; adding a negative → move left.', 'Subtracting a number = adding its opposite: 5 − (−3) = 5 + 3.', 'Any negative < 0 < any positive.', '−8 < −3 because −8 is further left.'],
  '−7 + 12 = 5 (move 12 right from −7). 4 − (−6) = 4 + 6 = <b>10</b>.',
  () => { const a = R(-50, 50), b = nz(-50, 50), t = R(0, 3);
    if (t === 0) return Q(`${fmt(a)} + ${p(b)} = ?`, a + b, [a - b, -(a + b), Math.abs(a) + Math.abs(b)], `Start at ${fmt(a)} and move ${Math.abs(b)} ${b > 0 ? 'right' : 'left'} → ${fmt(a + b)}.`);
    if (t === 1) return Q(`${fmt(a)} − ${p(b)} = ?`, a - b, [a + b, b - a, -a - b], `Subtracting ${p(b)} is adding ${fmt(-b)}: ${fmt(a)} + ${p(-b)} = ${fmt(a - b)}.`);
    if (t === 2) { const s = -R(2, 15), r = R(5, 25); return Q(`At night the temperature was ${fmt(s)}°C. By noon it rose by ${r}°C. What is the noon temperature (°C)?`, s + r, [s - r, r - s, -(s + r)], `${fmt(s)} + ${r} = ${fmt(s + r)}°C.`); }
    const xs = shuffle([a, b, nz(-60, 60), nz(-60, 60)]); const u = [...new Set(xs)]; if (u.length < 4) return Q(`${fmt(a)} + ${p(b)} = ?`, a + b, [a - b, -(a + b)]);
    return Q('Which integer is the smallest?', Math.min(...u), u.filter((x) => x !== Math.min(...u)), 'The smallest integer is the one furthest to the left on the number line.'); });

D('Integers: Multiply & Divide', 'multiplying dividing integers sign rules',
  'Multiply or divide the numbers as usual, then decide the sign: <b>same signs → positive, different signs → negative</b>.',
  ['(+) × (+) = +, (−) × (−) = +.', '(+) × (−) = −, (−) × (+) = −.', 'Even number of negatives → positive product; odd → negative.', 'Same rules work for division. Anything × 0 = 0.'],
  '(−6) × (−4) = <b>24</b>; (−48) ÷ 8 = <b>−6</b>; (−2) × (−3) × (−5) = <b>−30</b> (three negatives → negative).',
  () => { const a = nz(-12, 12), b = nz(-12, 12), t = R(0, 2);
    if (t === 0) return Q(`${p(a)} × ${p(b)} = ?`, a * b, [-a * b, a + b], `Signs ${a < 0 === b < 0 ? 'same → +' : 'different → −'}; ${Math.abs(a)} × ${Math.abs(b)} = ${Math.abs(a * b)} → ${fmt(a * b)}.`);
    if (t === 1) return Q(`${p(a * b)} ÷ ${p(b)} = ?`, a, [-a, b, a * b], `Signs ${a * b < 0 === b < 0 ? 'same → +' : 'different → −'}; ${Math.abs(a * b)} ÷ ${Math.abs(b)} = ${Math.abs(a)} → ${fmt(a)}.`);
    const c = nz(-6, 6), x = nz(-6, 6), y = nz(-6, 6); return Q(`${p(c)} × ${p(x)} × ${p(y)} = ?`, c * x * y, [-c * x * y, c + x + y], `Count negatives: ${[c, x, y].filter((v) => v < 0).length} → ${c * x * y < 0 ? 'negative' : 'positive'}; result ${fmt(c * x * y)}.`); });

D('Everyday Word Problems', 'word problems arithmetic',
  'Word problems hide arithmetic inside a story. Read carefully, find what is given and what is asked, choose the operation, then check if the answer makes sense.',
  ['“Total”, “altogether” → add or multiply.', '“Left”, “more than”, “difference” → subtract.', '“Each”, “equally”, “per” → divide (or multiply to find totals).', 'Always write units (₹, km, kg) in your answer.'],
  'Riya buys 6 notebooks at ₹35 each and pays with ₹500. Cost = 6 × 35 = ₹210. Change = 500 − 210 = <b>₹290</b>.',
  () => { const t = R(0, 3);
    if (t === 0) { const n = R(3, 12), pr = R(12, 80), note = pick([500, 1000, 2000]); return Q(`A student buys ${n} items at ${rs(pr)} each and pays with a ${rs(note)} note. How much change is returned (₹)?`, note - n * pr, [n * pr, note - pr, note - n * pr - pr], `Cost = ${n} × ${pr} = ${n * pr}; change = ${note} − ${n * pr} = ${note - n * pr}.`); }
    if (t === 1) { const c = R(8, 20), s = R(40, 80); return Q(`A train has ${c} coaches with ${s} seats each. How many seats in total?`, c * s, [c + s, c * s + s, c * s - c], `${c} × ${s} = ${c * s}.`); }
    if (t === 2) { const u = R(15, 60), d = R(10, 40); return Q(`A tank holds ${u * d} litres. A family uses ${u} litres a day. How many days will the water last?`, d, [d + 1, u, d * 2], `${u * d} ÷ ${u} = ${d} days.`); }
    const a = R(150, 400), b = R(100, 300), c = R(50, Math.min(a, b)); return Q(`A shop sold ${a} pens on Monday and ${b} on Tuesday. ${c} pens were returned. How many pens were finally sold?`, a + b - c, [a + b + c, a + b, a - b + c], `${a} + ${b} − ${c} = ${a + b - c}.`); });

D('Mental Maths Tricks', 'mental math tricks',
  'Smart shortcuts make calculations quick and help you check answers.',
  ['× 11 (2-digit ab): write a, (a+b), b. e.g. 34 × 11 = 374.', 'Square of a number ending in 5: n5² = n×(n+1) then 25. e.g. 65² = 42|25 = 4225.', '× 25 = × 100 ÷ 4. × 5 = × 10 ÷ 2.', '× 9 = × 10 − the number. × 99 = × 100 − the number.'],
  '47 × 99 = 4700 − 47 = <b>4653</b>. 75² = 7×8 = 56 → <b>5625</b>.',
  one(
    () => { const a = R(12, 99); return Q(`Use the trick: ${a} × 11 = ?`, a * 11, [a * 11 + 10, a * 11 - 100, a * 10 + 11], `${a} × 11 = ${a} × 10 + ${a} = ${a * 11}.`); },
    () => { const n = R(1, 9) * 10 + 5; return Q(`${n}${sup(2)} = ?`, n * n, [n * n + 100, (n - 5) * (n + 5), n * 2], `${(n - 5) / 10} × ${(n + 5) / 10} = ${(n * n - 25) / 100}, then write 25 → ${n * n}.`); },
    () => { const a = R(12, 96); return Q(`${a} × 25 = ?`, a * 25, [a * 20, a * 25 + 25, a * 100 / 2], `${a} × 100 = ${a * 100}; ÷ 4 = ${a * 25}.`); },
    () => { const a = R(12, 99); return Q(`${a} × 99 = ?`, a * 99, [a * 100, a * 99 + 100, a * 101], `${a} × 100 − ${a} = ${a * 100} − ${a} = ${a * 99}.`); }
  ));

D('Foundations Review Test', 'class 8 maths revision basics',
  'Revision day! Today\'s test mixes questions from Days 1–19. Scan back through any lesson you found hard before you start.',
  ['Place value, operations and BODMAS.', 'Factors, primes, HCF and LCM.', 'Fractions, decimals and integers.', 'Word problems and mental maths.'],
  'Tip: For each wrong answer, open that day\'s lesson again and retake its test.',
  [1, 19]);

// ---------- Phase 2: Number System ----------
D('Rational Numbers: Introduction', 'rational numbers class 8',
  'A <b>rational number</b> can be written as p/q where p and q are integers and q ≠ 0. All integers, fractions and terminating/repeating decimals are rational.',
  ['Standard form: denominator positive and p, q have no common factor.', '−3/4 = 3/(−4) = −(3/4).', 'Integers are rational: 5 = 5/1.', 'p/0 is NOT defined, so it is not rational.'],
  'Standard form of 18/(−24): divide by HCF 6 → 3/(−4) → move the sign up: <b>−3/4</b>.',
  one(
    () => { let n, d; do { n = nz(-9, 9); d = R(2, 12); } while (gcd(n, d) !== 1); const k = R(2, 6), sg = pick([1, -1]); const N = n * k * sg, Dd = d * k * sg;
      return Q(`Write ${fmt(N)}/${fmt(Dd)} in standard form.`, fr(n, d), [fr(-n, d), `${fmt(N)}/${d * k}`, fr(n, d + 1)], `HCF = ${k}; divide and keep the denominator positive → ${fr(n, d)}.`); },
    () => { const c = `${R(1, 9)}/0`; return Q('Which of these is NOT a rational number?', c, [`0/${R(2, 9)}`, `${M}${R(1, 9)}/${R(2, 9)}`, String(R(2, 20))], 'Division by zero is not defined, so p/0 is not a rational number. 0/q = 0 is rational.'); },
    () => { let n, d; do { n = nz(-7, 7); d = R(2, 9); } while (gcd(n, d) !== 1); const k = R(2, 6);
      return Q(`Which rational number is equivalent to ${fr(n, d)}?`, `${fmt(n * k)}/${d * k}`, [`${fmt(n * k)}/${d * k + 1}`, `${fmt(n + k)}/${d + k}`, `${fmt(-n * k)}/${d * k}`], `Multiply top and bottom by ${k}.`); }
  ));

const rq = () => { let n, d; do { n = nz(-9, 9); d = R(2, 12); } while (gcd(n, d) !== 1); return F(n, d); };
D('Adding & Subtracting Rational Numbers', 'adding subtracting rational numbers',
  'Same as fractions — make denominators equal — but watch the signs of the numerators carefully.',
  ['Write each with a positive denominator first.', 'Use LCM of denominators.', 'a − b = a + (−b): subtracting means adding the additive inverse.', 'Simplify to standard form.'],
  '−5/6 + 3/4: LCM 12 → −10/12 + 9/12 = <b>−1/12</b>.',
  () => { const x = rq(), y = rq(), add = R(0, 1), r = add ? fa(x, y) : fs(x, y);
    return Q(`${fstr(x)} ${add ? '+' : '−'} ${y.n < 0 ? '(' + fstr(y) + ')' : fstr(y)} = ?`, fstr(r), [fstr(add ? fs(x, y) : fa(x, y)), fr(add ? x.n + y.n : x.n - y.n, x.d + y.d), fstr(F(-r.n, r.d))], `LCM of ${x.d} and ${y.d} = ${lcm(x.d, y.d)}; combine numerators → ${fstr(r)}.`); });

D('Multiplying, Dividing & Inverses', 'multiplicative inverse additive inverse rational numbers',
  'Multiply/divide rational numbers like fractions and apply integer sign rules. Every number has an <b>additive inverse</b> (opposite) and every non-zero number has a <b>multiplicative inverse</b> (reciprocal).',
  ['Additive inverse of a/b is −a/b (they add to 0).', 'Reciprocal of a/b is b/a (they multiply to 1).', '0 has no reciprocal.', 'Reciprocal of a negative number is negative.'],
  'Reciprocal of −3/7 is <b>−7/3</b> because (−3/7) × (−7/3) = 1.',
  one(
    () => { const x = rq(), y = rq(); return Q(`${fstr(x)} × (${fstr(y)}) = ?`, fstr(fm(x, y)), [fstr(F(-fm(x, y).n, fm(x, y).d)), fstr(fd(x, y)), fstr(fa(x, y))], `Multiply tops and bottoms, apply sign rule → ${fstr(fm(x, y))}.`); },
    () => { const x = rq(), y = rq(); return Q(`${fstr(x)} ÷ (${fstr(y)}) = ?`, fstr(fd(x, y)), [fstr(fm(x, y)), fstr(F(-fd(x, y).n, fd(x, y).d)), fstr(fd(y, x))], `Multiply by the reciprocal of ${fstr(y)} → ${fstr(fd(x, y))}.`); },
    () => { const x = rq(); return Q(`The multiplicative inverse (reciprocal) of ${fstr(x)} is:`, fr(x.d, x.n), [fstr(F(-x.n, x.d)), fr(-x.d, x.n), fstr(x)], `${fstr(x)} × ${fr(x.d, x.n)} = 1.`); },
    () => { const x = rq(); return Q(`The additive inverse of ${fstr(x)} is:`, fstr(F(-x.n, x.d)), [fr(x.d, x.n), fstr(x), fr(-x.d, x.n)], `${fstr(x)} + (${fstr(F(-x.n, x.d))}) = 0.`); }
  ));

const PROPS = [
  ['a + b = b + a is the', 'Commutative property', ['Associative property', 'Distributive property', 'Closure property']],
  ['(a + b) + c = a + (b + c) is the', 'Associative property', ['Commutative property', 'Distributive property', 'Identity property']],
  ['a × (b + c) = a × b + a × c is the', 'Distributive property', ['Associative property', 'Commutative property', 'Closure property']],
  ['The additive identity for rational numbers is', '0', ['1', '−1', 'No such number']],
  ['The multiplicative identity for rational numbers is', '1', ['0', '−1', 'No such number']],
  ['Rational numbers are NOT closed under', 'Division', ['Addition', 'Subtraction', 'Multiplication']],
  ['Which rational number has no reciprocal?', '0', ['1', '−1', '1/2']],
  ['Which number is its own reciprocal?', '−1', ['0', '2', '1/2']],
  ['Subtraction of rational numbers is', 'Not commutative', ['Commutative', 'Always zero', 'Not closed']]
];
D('Properties of Rational Numbers', 'properties of rational numbers closure commutative associative distributive',
  'Properties tell us which rules always work. They help us calculate smartly.',
  ['Closure: +, −, × of rationals is rational (÷ fails only for 0).', 'Commutative: a+b = b+a, a×b = b×a (not for − or ÷).', 'Associative: grouping does not matter for + and ×.', 'Distributive: a(b + c) = ab + ac. Identities: 0 for +, 1 for ×.'],
  '7 × 98 + 7 × 2 = 7 × (98 + 2) = 7 × 100 = <b>700</b> (distributive property).',
  one(
    () => { const t = pick(PROPS); return Q(t[0] + ':', t[1], t[2], `Remember: ${t[0]} ${t[1]}.`); },
    () => { const a = R(3, 19), b = R(2, 9) * 10 + pick([1, 2, 3, 4]), c = 10 * Math.ceil(b / 10) - b; return Q(`Using the distributive property, ${a} × ${b} + ${a} × ${c} = ?`, a * (b + c), [a * b + c, a * (b + c) + a, a + b + c], `${a} × (${b} + ${c}) = ${a} × ${b + c} = ${a * (b + c)}.`); },
    () => { const a = R(3, 19), b = R(101, 109); return Q(`Using a(b − c) = ab − ac, find ${a} × ${b} − ${a} × ${b - 100}.`, 100 * a, [a * b, 100 * a + a, 1000], `${a} × (${b} − ${b - 100}) = ${a} × 100 = ${100 * a}.`); }
  ));

D('Rational Numbers on the Number Line', 'rational numbers between two rational numbers',
  'Between any two rational numbers there are <b>infinitely many</b> rational numbers. One easy one is their average.',
  ['Average of a and b, (a + b)/2, lies between them.', 'Or make equal denominators large enough: 1/3 = 10/30, 1/2 = 15/30 → 11/30, 12/30 …', 'Negative numbers lie to the left of 0.', 'On the number line, divide each unit into q equal parts to show p/q.'],
  'A number between 1/4 and 1/2: average = (1/4 + 1/2) ÷ 2 = (3/4) ÷ 2 = <b>3/8</b>.',
  one(
    () => { let x, y; do { x = rq(); y = rq(); } while (fv(x) >= fv(y)); const mid = fd(fa(x, y), F(2));
      return Q(`Which rational number lies between ${fstr(x)} and ${fstr(y)}?`, fstr(mid), [fstr(fs(x, F(1, x.d))), fstr(fa(y, F(1, 2 * y.d))), fstr(fs(x, F(1)))], `Their average (${fstr(x)} + ${fstr(y)}) ÷ 2 = ${fstr(mid)} lies between them.`); },
    () => Q(`How many rational numbers lie between ${fr(R(1, 3), 5)} and ${fr(R(4, 6), 7)}?`, 'Infinitely many', ['None', 'Exactly one', 'Exactly ten'], 'Between any two rationals there are infinitely many rationals.'),
    () => { const x = rq(), n = fv(x); const where = n < 0 ? 'left of 0' : 'right of 0'; return Q(`On the number line, ${fstr(x)} lies to the:`, where, [n < 0 ? 'right of 0' : 'left of 0', 'exactly at 0', 'right of 1'], `${fstr(x)} is ${n < 0 ? 'negative' : 'positive'}.`); }
  ));

D('Squares & Perfect Squares', 'squares and square numbers properties',
  'The <b>square</b> of n is n × n = n². Numbers like 1, 4, 9, 16, 25 … are <b>perfect squares</b>.',
  ['A perfect square never ends in 2, 3, 7 or 8.', 'Squares of even numbers are even; of odd numbers are odd.', 'There are 2n non-square numbers between n² and (n+1)².', 'Sum of first n odd numbers = n².'],
  '23² = 23 × 23 = <b>529</b>. Between 5² = 25 and 6² = 36 there are 2 × 5 = 10 non-squares.',
  one(
    () => { const n = R(11, 40); return Q(`${n}${sup(2)} = ?`, n * n, [n * 2, n * n + n, (n - 1) * (n + 1)], `${n} × ${n} = ${n * n}.`); },
    () => { const k = R(11, 40), c = k * k; const w = []; while (w.length < 3) { const x = k * k + R(1, 2 * k) * pick([1, -1]); if (Math.sqrt(x) % 1 && !w.includes(x)) w.push(x); } return Q('Which of these is a perfect square?', c, w, `${c} = ${k}². The others lie between consecutive squares.`); },
    () => { const n = R(13, 999); const u = (n % 10) ** 2 % 10; return Q(`What is the units digit of ${n}${sup(2)}?`, u, [n % 10, (u + 2) % 10, (u + 5) % 10], `Only the units digit matters: ${n % 10}² = ${(n % 10) ** 2} → units digit ${u}.`); },
    () => { const n = R(5, 30); return Q(`How many non-square numbers lie between ${n}${sup(2)} and ${n + 1}${sup(2)}?`, 2 * n, [2 * n + 1, n, 2 * n - 1], `Between n² and (n+1)² there are 2n = ${2 * n} numbers.`); }
  ));

D('Square Roots by Prime Factorisation', 'square root by prime factorization',
  'The <b>square root</b> √x is the number which, multiplied by itself, gives x. Pair up equal prime factors; take one from each pair.',
  ['√(a²) = a.', 'Pair the primes: 324 = (2×2)(3×3)(3×3) → √324 = 2×3×3 = 18.', 'If a prime is left unpaired, the number is not a perfect square.', 'Multiply (or divide) by the unpaired primes to make a perfect square.'],
  '180 = 2×2×3×3×5. The 5 is unpaired → multiply by <b>5</b> to get 900 = 30².',
  one(
    () => { const k = R(12, 60); return Q(`√${k * k} = ?`, k, [k + 1, k - 2, k * 2], `${k} × ${k} = ${k * k}.`); },
    () => { const s = R(2, 12), m = pick([2, 3, 5, 6, 7, 10]); const n = s * s * m; return Q(`What is the smallest number by which ${n} must be <b>multiplied</b> to make it a perfect square?`, m, [s, m * 2, s * m], `${n} = ${s}² × ${m}; ${m} is unpaired, so multiply by ${m} → ${n * m} = ${s * m}².`); },
    () => { const s = R(2, 12), m = pick([2, 3, 5, 6, 7]); const n = s * s * m; return Q(`What is the smallest number by which ${n} must be <b>divided</b> to make it a perfect square?`, m, [s, s * s, m * m], `${n} = ${s}² × ${m}; divide by ${m} → ${s * s} = ${s}².`); }
  ));

D('Square Roots of Fractions & Pythagorean Triplets', 'square root of decimals fractions pythagorean triplets',
  '√(a/b) = √a / √b. For decimals, count decimal places: √0.0049 = 0.07. For any m > 1, (2m, m² − 1, m² + 1) is a <b>Pythagorean triplet</b>.',
  ['√(49/64) = 7/8.', '√1.44 = 1.2 (144 → 12, decimal places halve).', 'Triplet: (2m)² + (m² − 1)² = (m² + 1)².', 'Example triplets: (3,4,5), (6,8,10), (8,15,17).'],
  'With 2m = 12 → m = 6 → triplet <b>12, 35, 37</b>. Check: 144 + 1225 = 1369 = 37².',
  one(
    () => { let a, b; do { a = R(1, 15); b = R(2, 20); } while (a >= b || gcd(a, b) !== 1); return Q(`√(${a * a}/${b * b}) = ?`, fr(a, b), [fr(a * a, b), fr(b, a), fr(a, b * b)], `√${a * a} = ${a}, √${b * b} = ${b} → ${a}/${b}.`); },
    () => { const k = R(11, 30), sc = pick([10, 100]); const v = (k * k) / (sc * sc); return Q(`√${fmt(v)} = ?`, k / sc, [k / (sc * 10), k * 10 / sc, (k * k) / (sc * 10)], `√${k * k} = ${k}; ${fmt(v)} has ${String(sc * sc).length - 1} decimal places, root has half → ${fmt(k / sc)}.`); },
    () => { const m = R(3, 10); const t = (a, b, c) => `${a}, ${b}, ${c}`; return Q(`Which is a Pythagorean triplet whose smallest member is ${2 * m}?`, t(2 * m, m * m - 1, m * m + 1), [t(2 * m, m * m, m * m + 1), t(2 * m, m * m - 1, m * m + 2), t(2 * m, m * m - 2, m * m)], `Use 2m = ${2 * m}, m = ${m}: m² − 1 = ${m * m - 1}, m² + 1 = ${m * m + 1}.`); }
  ));

D('Cubes & Cube Roots', 'cubes and cube roots',
  'The <b>cube</b> of n is n × n × n = n³. The <b>cube root</b> ∛x undoes cubing. For cube roots by factorisation, make groups of three equal primes.',
  ['Cubes: 1, 8, 27, 64, 125, 216, 343, 512, 729, 1000.', 'Cube of a negative is negative: (−3)³ = −27.', 'Group primes in threes: 1728 = (2×2×2)(2×2×2)(3×3×3) → ∛ = 2×2×3 = 12.', 'Leftover primes tell you what to multiply/divide by to get a perfect cube.'],
  '∛2744: 2744 = 2³ × 7³ → <b>14</b>.',
  one(
    () => { const n = R(2, 15) * pick([1, 1, -1]); return Q(`(${fmt(n)})${sup(3)} = ?`, n ** 3, [n * n, 3 * n, -(n ** 3)], `${p(n)} × ${p(n)} × ${p(n)} = ${fmt(n ** 3)}.`); },
    () => { const k = R(4, 30); return Q(`∛${k ** 3} = ?`, k, [k + 1, k * 3, k - 1], `${k} × ${k} × ${k} = ${k ** 3}.`); },
    () => { const k = R(2, 6), m = pick([2, 3, 5]), two = R(0, 1); const n = k ** 3 * (two ? m * m : m); const a = two ? m : m * m;
      return Q(`Smallest number by which ${n} must be multiplied to get a perfect cube?`, a, [m, m * m * m, k].filter((x) => x !== a).concat([a * 2]), `${n} = ${k}³ × ${two ? m + '²' : m}. Multiply by ${a} to complete the group of three ${m}s.`); },
    () => { const k = R(3, 12), c = k ** 3; const w = [c + 1, (k + 1) ** 2, k * k * (k + 2)]; return Q('Which of these is a perfect cube?', c, w, `${c} = ${k}³.`); }
  ));

D('Laws of Exponents', 'laws of exponents',
  'aⁿ means a multiplied by itself n times. The exponent laws let you simplify powers of the <b>same base</b> quickly.',
  ['aᵐ × aⁿ = aᵐ⁺ⁿ', 'aᵐ ÷ aⁿ = aᵐ⁻ⁿ', '(aᵐ)ⁿ = aᵐⁿ', '(ab)ⁿ = aⁿbⁿ and (a/b)ⁿ = aⁿ/bⁿ'],
  '(2⁵ × 2³) ÷ 2⁶ = 2⁸ ÷ 2⁶ = 2² = <b>4</b>.',
  one(
    () => { const m = R(2, 12), n = R(2, 12); return Q(`a${sup(m)} × a${sup(n)} = a<sup>?</sup>`, m + n, [m * n, Math.abs(m - n), m + n + 1], `Same base: add exponents ${m} + ${n} = ${m + n}.`); },
    () => { const b = pick([2, 3, 5]), m = R(3, 8), n = R(2, 6), k = R(m + n - 3, m + n - 1); return Q(`(${b}${sup(m)} × ${b}${sup(n)}) ÷ ${b}${sup(k)} = ?`, b ** (m + n - k), [b ** (m + n), (m + n - k) * b, b ** (m * n - k) > 1e6 ? b * 2 : b ** (m * n - k)], `${b}^(${m}+${n}−${k}) = ${b}^${m + n - k} = ${b ** (m + n - k)}.`); },
    () => { const m = R(2, 6), n = R(2, 6); return Q(`(x${sup(m)})${sup(n)} = x<sup>?</sup>`, m * n, [m + n, m ** n, m * n + 1], `Power of a power: multiply ${m} × ${n} = ${m * n}.`); },
    () => { const b = pick([2, 3, 4, 5, 6, 7, 10]), n = b === 2 ? R(5, 10) : R(2, 4); return Q(`${b}${sup(n)} = ?`, b ** n, [b * n, b ** (n - 1), b ** n + b], `${Array(n).fill(b).join(' × ')} = ${b ** n}.`); }
  ));

D('Zero & Negative Exponents', 'negative exponents zero exponent',
  'a⁰ = 1 for any non-zero a. A negative exponent means reciprocal: a⁻ⁿ = 1/aⁿ.',
  ['a⁰ = 1 (a ≠ 0).', 'a⁻ⁿ = 1/aⁿ, and 1/a⁻ⁿ = aⁿ.', '(a/b)⁻ⁿ = (b/a)ⁿ.', 'All the usual exponent laws still work with negative exponents.'],
  '(2/3)⁻² = (3/2)² = <b>9/4</b>.  (2⁻¹ + 3⁻¹)⁻¹ = (1/2 + 1/3)⁻¹ = (5/6)⁻¹ = <b>6/5</b>.',
  one(
    () => { const b = pick([2, 3, 4, 5, 10]), n = R(1, 3); return Q(`${b}${sup(-n)} = ?`, fr(1, b ** n), [fmt(-(b ** n)), fr(1, b * n), fmt(b ** n)], `${b}⁻${n} = 1/${b}^${n} = 1/${b ** n}.`); },
    () => { let a, b; do { a = R(2, 5); b = R(2, 5); } while (gcd(a, b) !== 1); const n = R(1, 3); return Q(`(${a}/${b})${sup(-n)} = ?`, fr(b ** n, a ** n), [fr(a ** n, b ** n), fr(-(a ** n), b ** n), fr(b * n, a * n)], `Flip and make the exponent positive: (${b}/${a})^${n} = ${fr(b ** n, a ** n)}.`); },
    () => { const x = pick([['5', '5'], ['(−7)', '−7'], ['(2/3)', '2/3'], ['100', '100'], ['(−1/4)', '−1/4']]); return Q(`${x[0]}${sup(0)} = ?`, 1, ['0', x[1], 'Not defined'], 'Any non-zero number to the power 0 is 1.'); },
    () => { const a = R(2, 5); let b; do b = R(2, 6); while (b === a); return Q(`(${a}${sup(-1)} + ${b}${sup(-1)})${sup(-1)} = ?`, fr(a * b, a + b), [fr(a + b, a * b), fmt(a + b), fr(1, a + b)], `1/${a} + 1/${b} = ${fr(a + b, a * b)}; its reciprocal = ${fr(a * b, a + b)}.`); }
  ));

D('Standard Form (Scientific Notation)', 'standard form scientific notation',
  'Very large or very small numbers are written as <b>k × 10ⁿ</b> where 1 ≤ k < 10 and n is an integer.',
  ['Move the decimal point until one non-zero digit is before it.', 'Moved left (big number) → positive power.', 'Moved right (small number) → negative power.', 'Example: speed of light 300,000,000 m/s = 3 × 10⁸ m/s.'],
  '0.000072 = 7.2 × 10⁻⁵ (point moves 5 places right). 45,600,000 = 4.56 × 10⁷.',
  () => { let d = String(R(11, 999)).replace(/0+$/, ''); const mant = d[0] + (d.length > 1 ? '.' + d.slice(1) : ''); const big = R(0, 1);
    const e = big ? R(Math.max(4, d.length), 9) : -R(3, 7);
    const num = big ? Number(d + '0'.repeat(e + 1 - d.length)).toLocaleString('en-US') : '0.' + '0'.repeat(-e - 1) + d;
    const sf = (m, x) => `${m} × 10${sup(x)}`; const rev = R(0, 1);
    if (rev) { const alt = (x) => (x > 0 ? Number(d + '0'.repeat(Math.max(0, x + 1 - d.length))).toLocaleString('en-US') : '0.' + '0'.repeat(-x - 1) + d);
      return Q(`Write ${sf(mant, e)} in usual form.`, num, [alt(e + 1), alt(e - 1 === 0 ? e - 2 : e - 1), alt(-e)], `Move the point ${Math.abs(e)} places ${e > 0 ? 'right' : 'left'}.`); }
    return Q(`Write ${num} in standard form.`, sf(mant, e), [sf(mant, e + 1), sf(mant, e - 1), sf(mant, -e)], `Move the point to just after the first digit: ${Math.abs(e)} places ${e > 0 ? 'left → positive' : 'right → negative'} power.`); });

D('Playing with Numbers', 'playing with numbers class 8 general form',
  'Writing numbers in <b>general form</b> (e.g. ab = 10a + b) reveals neat patterns and lets you solve digit puzzles.',
  ['ab + ba = 11(a + b);  ab − ba = 9(a − b).', 'abc + bca + cab = 111(a + b + c).', 'Divisible by 9 ⇔ digit sum divisible by 9; same for 3.', 'Use these to find missing digits.'],
  'Find x if 3x52 is divisible by 9: 3 + x + 5 + 2 = 10 + x must be 18 → <b>x = 8</b>.',
  one(
    () => { let ds, x; do { ds = [R(1, 9), R(0, 9), R(0, 9)]; x = (9 - (ds[0] + ds[1] + ds[2]) % 9) % 9; } while (x === 0); return Q(`Find the digit x if ${ds[0]}x${ds[1]}${ds[2]} is divisible by 9.`, x, [(x + 3) % 9 || 9, 9 - x === x ? x + 1 : 9 - x, (x + 1) % 10], `Digit sum ${ds[0] + ds[1] + ds[2]} + x must be a multiple of 9 → x = ${x}.`); },
    () => { let a, b; do { a = R(2, 9); b = R(1, 9); } while (a <= b); return Q(`If ${a}${b} − ${b}${a} = 9 × k, what is k?`, a - b, [a + b, a * b, 9], `ab − ba = 9(a − b) = 9 × ${a - b}. (Check: ${a * 10 + b} − ${b * 10 + a} = ${9 * (a - b)}.)`); },
    () => { const [a, b, c] = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, 3); return Q(`${a}${b}${c} + ${b}${c}${a} + ${c}${a}${b} = 111 × ?`, a + b + c, [a * b * c, a + b + c + 1, 3], `abc + bca + cab = 111(a + b + c) = 111 × ${a + b + c}.`); },
    () => { const a = R(1, 9), b = R(0, 9); return Q(`${a}${b} + ${b || ''}${a} is always divisible by:`, 11, [10, 9, 7], `ab + ba = 11(a + b). Here ${a * 10 + b} + ${b * 10 + a} = ${11 * (a + b)} = 11 × ${a + b}.`); }
  ));

D('Number Patterns & Sequences', 'number patterns sequences',
  'Find the rule that connects the terms — add a fixed number, multiply, squares, triangular numbers — then continue it.',
  ['Arithmetic: add the same number each time (3, 7, 11, 15 …).', 'Geometric: multiply by the same number (2, 6, 18, 54 …).', 'Squares 1, 4, 9, 16 …; cubes 1, 8, 27 …; triangular 1, 3, 6, 10 …', 'Look at the differences between terms.'],
  '5, 11, 17, 23, ? → differences 6 → next is <b>29</b>. nth term = 6n − 1.',
  one(
    () => { const a = R(-10, 20), d = nz(-9, 12); const s = [0, 1, 2, 3].map((i) => a + i * d); return Q(`Next term: ${s.map(fmt).join(', ')}, ?`, a + 4 * d, [a + 5 * d, a + 4 * d + 1, a + 3 * d + 2 * d - d * 2], `Each term changes by ${fmt(d)}; ${fmt(a + 3 * d)} ${d < 0 ? '−' : '+'} ${Math.abs(d)} = ${fmt(a + 4 * d)}.`); },
    () => { const a = R(1, 5), r = R(2, 4); const s = [0, 1, 2, 3].map((i) => a * r ** i); return Q(`Next term: ${s.join(', ')}, ?`, a * r ** 4, [a * r ** 3 + a * r ** 2, a * r ** 4 + r, a * r ** 3 * 2], `Each term is multiplied by ${r}.`); },
    () => { const n = R(5, 30); return Q(`Sum of the first ${n} odd numbers (1 + 3 + 5 + …) = ?`, n * n, [n * (n + 1), 2 * n, n * n - 1], `Sum of first n odd numbers = n² = ${n * n}.`); },
    () => { const n = R(5, 12); return Q(`Triangular numbers: 1, 3, 6, 10, 15, … What is the ${n}th?`, n * (n + 1) / 2, [n * n, n * (n - 1) / 2, n * (n + 1)], `nth triangular number = n(n+1)/2 = ${n}×${n + 1}/2 = ${n * (n + 1) / 2}.`); }
  ));

D('Number System Review Test', 'rational numbers squares cubes exponents revision',
  'Revision day! The test mixes Days 21–34: rational numbers, squares, cubes, exponents, standard form and number puzzles.',
  ['Rational numbers and their properties.', 'Squares, square roots, cubes and cube roots.', 'Exponents, negative powers, standard form.', 'Digit puzzles and patterns.'],
  'Tip: write down the laws of exponents and the list of squares to 30 before you start.',
  [21, 34]);

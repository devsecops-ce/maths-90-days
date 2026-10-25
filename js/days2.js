// Days 36–60: Algebra and Commercial Maths.
const pf = (f) => (f.n < 0 ? `(${fstr(f)})` : fstr(f));
const fac = (a) => `(x ${a < 0 ? '−' : '+'} ${Math.abs(a)})`;
const two = (a, b) => (a <= b ? fac(a) + fac(b) : fac(b) + fac(a));

// ---------- Phase 3: Algebra ----------
D('Algebraic Expressions: Terms & Coefficients', 'algebraic expressions terms coefficients like terms',
  'An <b>algebraic expression</b> is made of terms joined by + or −. Each term has a numerical <b>coefficient</b> and variable part. A term with no variable is the <b>constant</b>.',
  ['In 5x² − 3xy + 7, the terms are 5x², −3xy, 7.', 'Coefficient of xy is −3 (keep the sign!).', '<b>Like terms</b> have exactly the same variables with the same powers: 3ab and −7ba.', 'Monomial = 1 term, binomial = 2, trinomial = 3.'],
  'In 4a²b − ab + 9: three terms; coefficient of ab is <b>−1</b>; constant term is <b>9</b>.',
  one(
    () => { const c = [nz(-9, 9), nz(-9, 9), nz(-9, 9), nz(-12, 12)]; const ts = [[c[0], 'x' + sup(2)], [c[1], 'xy'], [c[2], 'y'], [c[3], '']]; const e = lin(ts);
      const w = pick([[1, 'xy'], [0, 'x²'], [2, 'y']]); return Q(`In ${e}, what is the coefficient of ${w[1].replace('²', sup(2))}?`, c[w[0]], [-c[w[0]], c[(w[0] + 1) % 3], Math.abs(c[w[0]]) + 1], `The term is ${lin([ts[w[0]]])}, so the coefficient (with its sign) is ${fmt(c[w[0]])}.`); },
    () => { const n = R(2, 5); const vs = ['a' + sup(2), 'ab', 'b', 'a', 'b' + sup(2)]; const ts = vs.slice(0, n - 1).map((v) => [nz(-9, 9), v]).concat([[nz(-9, 9), '']]); return Q(`How many terms are in ${lin(ts)}?`, n, [n + 1, n - 1, 1], `Terms are separated by + or − signs: ${n} terms.`); },
    () => Q('Which pair are <b>like terms</b>?', pick(['3xy and −7yx', '5a²b and 2ba²', '−4pq and 9qp']), ['3x²y and 3xy²', '4x and 4y', '2ab and 2a'], 'Like terms have the same variables raised to the same powers (order does not matter).'),
    () => { const c = [nz(-9, 9), nz(-9, 9), nz(-15, 15)]; const ts = [[c[0], 'p' + sup(2)], [c[1], 'p'], [c[2], '']]; return Q(`What is the constant term in ${lin(ts)}?`, c[2], [c[0], c[1], -c[2]], 'The constant term has no variable.'); }
  ));

D('Adding & Subtracting Expressions', 'adding subtracting algebraic expressions',
  'Only <b>like terms</b> can be added or subtracted: add their coefficients and keep the variable part.',
  ['3x + 5x = 8x, but 3x + 5y stays as it is.', 'Subtracting a bracket changes the sign of <b>every</b> term inside.', '−(2x − 3y + 4) = −2x + 3y − 4.', 'Arrange the answer neatly: x terms, y terms, constants.'],
  '(5x − 2y + 7) − (3x + 4y − 1) = 5x − 2y + 7 − 3x − 4y + 1 = <b>2x − 6y + 8</b>.',
  () => { const a = [nz(-9, 9), nz(-9, 9), nz(-9, 9)], b = [nz(-9, 9), nz(-9, 9), nz(-9, 9)], add = R(0, 1);
    const E = (c) => lin([[c[0], 'x'], [c[1], 'y'], [c[2], '']]); const r = a.map((v, i) => (add ? v + b[i] : v - b[i]));
    const w1 = add ? [a[0] + b[0], a[1] - b[1], a[2] + b[2]] : [a[0] - b[0], a[1] + b[1], a[2] + b[2]];
    const w2 = add ? [a[0] - b[0], a[1] + b[1], a[2] + b[2]] : [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
    return Q(`(${E(a)}) ${add ? '+' : '−'} (${E(b)}) = ?`, E(r), [E(w1), E(w2), E([r[0], r[1], -r[2] || 1]), E([r[0] + 1, r[1], r[2]])], `${add ? 'Add' : 'Subtract'} the coefficients of like terms${add ? '' : ' (change every sign in the second bracket)'} → ${E(r)}.`); });

D('Value of an Expression', 'evaluating algebraic expressions substitution',
  'To find the value of an expression, <b>substitute</b> the given numbers for the variables, then follow BODMAS.',
  ['Put negative values in brackets: x = −2 → 3x² = 3(−2)² = 12.', 'Powers before multiplication.', 'Be careful: −x² with x = 3 is −9, not 9.', 'Write every step to avoid sign errors.'],
  'If a = 2, b = −3: a² − 2ab + b² = 4 − 2(2)(−3) + 9 = 4 + 12 + 9 = <b>25</b>.',
  one(
    () => { const a = nz(-5, 5), b = nz(-9, 9), c = R(-10, 10), x = nz(-4, 4); return Q(`Find the value of ${px([c, b, a])} when x = ${fmt(x)}.`, a * x * x + b * x + c, [a * x * x - b * x + c, -a * x * x + b * x + c, a * 2 * x + b * x + c], `${p(a)}×${p(x)}² + ${p(b)}×${p(x)} + ${p(c)} = ${fmt(a * x * x)} + ${p(b * x)} + ${p(c)} = ${fmt(a * x * x + b * x + c)}.`); },
    () => { const a = nz(-6, 6), b = nz(-6, 6); return Q(`If a = ${fmt(a)} and b = ${fmt(b)}, find a${sup(2)} + 2ab + b${sup(2)}.`, (a + b) ** 2, [a * a + b * b, (a - b) ** 2, a * a + a * b + b * b], `This is (a + b)² = (${fmt(a + b)})² = ${(a + b) ** 2}.`); },
    () => { const x = nz(-6, 6), y = nz(-6, 6), k = nz(-5, 5); return Q(`If x = ${fmt(x)}, y = ${fmt(y)}, find ${lin([[k, 'x'], [-1, 'xy'], [2, 'y']])}.`, k * x - x * y + 2 * y, [k * x + x * y + 2 * y, k * x - x * y - 2 * y, k + x - x * y + 2 * y], `${p(k)}×${p(x)} − ${p(x)}×${p(y)} + 2×${p(y)} = ${fmt(k * x - x * y + 2 * y)}.`); }
  ));

D('Multiplying Monomials & Polynomials', 'multiplication of algebraic expressions monomial polynomial',
  'To multiply, multiply the coefficients and <b>add the exponents</b> of the same variable. Multiply a monomial by every term of a polynomial.',
  ['3x² × 4x³ = 12x⁵.', '(−2a) × (5ab) = −10a²b.', 'a(b + c − d) = ab + ac − ad.', 'Watch signs: negative × negative = positive.'],
  '−3x(2x² − 5x + 4) = <b>−6x³ + 15x² − 12x</b>.',
  one(
    () => { const a = nz(-6, 6), k = R(1, 2), c = [nz(-9, 9), nz(-6, 6), nz(-5, 5)]; const m = Array(k + 1).fill(0); m[k] = a; const r = pmul(m, c);
      return Q(`${px(m)} × (${px(c)}) = ?`, px(r), [px(pmul(m.map((v, i) => (i === k ? -v : v)), c)), px(pmul(m.slice(0, k).concat([0, a]), c)), px([r[0] + r[1], r[1], ...r.slice(2)])], `Multiply ${px(m)} by each term and add exponents → ${px(r)}.`); },
    () => { const a = nz(-8, 8), b = nz(-8, 8), m = R(1, 4), n = R(1, 4), u = R(1, 3), v = R(1, 3); const t = (c, x, y) => `${c === 1 ? '' : c === -1 ? M : fmt(c)}${vp('a', x)}${vp('b', y)}`;
      return Q(`(${t(a, m, u)}) × (${t(b, n, v)}) = ?`, t(a * b, m + n, u + v), [t(a * b, m * n, u * v), t(-a * b, m + n, u + v), t(a * b, m + n + 1, u + v)], 'Multiply the numbers; add the powers of a, and of b.'); }
  ));

D('Multiplying Binomials', 'multiplying binomials FOIL',
  'Multiply each term of the first bracket by each term of the second (First, Outer, Inner, Last), then collect like terms.',
  ['(a + b)(c + d) = ac + ad + bc + bd.', '(x + a)(x + b) = x² + (a + b)x + ab.', 'Don\'t forget the middle term!', 'Check by substituting x = 1 on both sides.'],
  '(2x + 3)(x − 5) = 2x² − 10x + 3x − 15 = <b>2x² − 7x − 15</b>.',
  () => { const pp = R(1, 3), q = R(1, 3), a = nz(-9, 9), b = nz(-9, 9); const r = [a * b, pp * b + q * a, pp * q];
    return Q(`(${px([a, pp])})(${px([b, q])}) = ?`, px(r), [px([a * b, 0, pp * q]), px([a * b, -(pp * b + q * a), pp * q]), px([-a * b, pp * b + q * a, pp * q]), px([a * b, pp * b + q * a + 1, pp * q])], `F: ${px([0, 0, pp * q])}, O+I: ${px([0, pp * b])} ${sgn(q * a)}x, L: ${fmt(a * b)} → ${px(r)}.`); });

D('Algebraic Identities', 'algebraic identities class 8',
  'Identities are equalities true for <b>all</b> values. Learn these three — they speed up algebra and arithmetic.',
  ['(a + b)² = a² + 2ab + b²', '(a − b)² = a² − 2ab + b²', '(a + b)(a − b) = a² − b²', '(x + a)(x + b) = x² + (a + b)x + ab'],
  '103² = (100 + 3)² = 10000 + 600 + 9 = <b>10609</b>.  47 × 53 = (50 − 3)(50 + 3) = 2500 − 9 = <b>2491</b>.',
  one(
    () => { const base = pick([100, 50, 200]), k = nz(-9, 9), n = base + k; return Q(`Using an identity, ${n}${sup(2)} = ?`, n * n, [base * base + k * k, n * n + 2 * k, base * base - k * k], `(${base} ${k < 0 ? '−' : '+'} ${Math.abs(k)})² = ${base * base} ${k < 0 ? '−' : '+'} ${Math.abs(2 * base * k)} + ${k * k} = ${n * n}.`); },
    () => { const n = R(2, 10) * 10, k = R(1, 9); return Q(`Using (a + b)(a − b), ${n - k} × ${n + k} = ?`, n * n - k * k, [n * n + k * k, n * n - k, n * n], `${n}² − ${k}² = ${n * n} − ${k * k} = ${n * n - k * k}.`); },
    () => { const a = nz(-9, 9); return Q(`(x ${a < 0 ? '−' : '+'} ${Math.abs(a)})${sup(2)} = ?`, px([a * a, 2 * a, 1]), [px([a * a, 0, 1]), px([a * a, a, 1]), px([-a * a, 2 * a, 1])], `(x + a)² = x² + 2ax + a² → ${px([a * a, 2 * a, 1])}.`); },
    () => { const a = R(2, 5), b = R(1, 9); return Q(`(${a}x − ${b})${sup(2)} = ?`, px([b * b, -2 * a * b, a * a]), [px([b * b, 0, a * a]), px([-b * b, -2 * a * b, a * a]), px([b * b, -a * b, a * a])], `(${a}x)² − 2(${a}x)(${b}) + ${b}² = ${px([b * b, -2 * a * b, a * a])}.`); }
  ));

D('Factorisation: Common Factors', 'factorisation common factor class 8',
  '<b>Factorising</b> is the reverse of expanding: write an expression as a product. First take out the HCF of all terms.',
  ['Find the HCF of the coefficients and the lowest power of each common variable.', '6x² + 9x = 3x(2x + 3).', 'Check by expanding back.', 'Grouping: ax + ay + bx + by = (a + b)(x + y).'],
  '12a²b − 18ab² = 6ab(2a − 3b). Check: 6ab × 2a = 12a²b ✓, 6ab × 3b = 18ab² ✓.',
  one(
    () => { let g = R(2, 9), a, b; do { a = R(1, 7); b = nz(-9, 9); } while (gcd(a, b) !== 1); const ex = px([0, g * b, g * a]);
      return Q(`Fully factorise: ${ex}`, `${g}x(${px([b, a])})`, [`${g}x(${px([-b, a])})`, `${g}(${px([b, a])})`, `${g}x${sup(2)}(${px([b, a])})`, `x(${px([b, g * a])})`], `HCF of the terms is ${g}x; ${ex} = ${g}x(${px([b, a])}).`); },
    () => { const k = R(2, 9), m = nz(-9, 9); return Q(`Factorise by grouping: ${lin([[1, 'ax'], [k, 'x'], [m, 'a'], [m * k, '']])}`, `(a + ${k})${fac(m)}`, [`(a + ${k})${fac(-m)}`, `(a ${m < 0 ? '−' : '+'} ${Math.abs(m)})(x + ${k})`, `(a + x)(${k}${sgn(m)})`], `Group: x(a + ${k}) ${m < 0 ? '−' : '+'} ${Math.abs(m)}(a + ${k}) = (a + ${k})${fac(m)}.`); }
  ));

D('Factorisation using Identities', 'factorisation using identities x2 + px + q',
  'Recognise identities in reverse: a² − b² = (a − b)(a + b), a² ± 2ab + b² = (a ± b)². For x² + px + q find two numbers with <b>sum p</b> and <b>product q</b>.',
  ['x² − 49 = (x − 7)(x + 7).', 'x² + 10x + 25 = (x + 5)².', 'x² + 5x + 6: numbers 2 and 3 (sum 5, product 6) → (x + 2)(x + 3).', 'x² − x − 12: −4 and 3 → (x − 4)(x + 3).'],
  'x² + 2x − 15: need product −15 and sum 2 → 5 and −3 → <b>(x − 3)(x + 5)</b>.',
  one(
    () => { const a = R(2, 12); return Q(`Factorise: x${sup(2)} − ${a * a}`, two(-a, a), [`(x − ${a})${sup(2)}`, `(x + ${a})${sup(2)}`, two(-a * a, 1)], `x² − ${a}² = (x − ${a})(x + ${a}).`); },
    () => { const a = nz(-9, 9); return Q(`Factorise: ${px([a * a, 2 * a, 1])}`, `${fac(a)}${sup(2)}`, [`${fac(-a)}${sup(2)}`, two(a, -a), `${fac(2 * a)}${sup(2)}`], `It is x² + 2(${fmt(a)})x + ${a}² = ${fac(a)}².`); },
    () => { let a, b; do { a = nz(-9, 9); b = nz(-9, 9); } while (a + b === 0); return Q(`Factorise: ${px([a * b, a + b, 1])}`, two(a, b), [two(-a, -b), two(a, -b), two(-a, b)], `Two numbers with sum ${fmt(a + b)} and product ${fmt(a * b)} are ${fmt(a)} and ${fmt(b)}.`); }
  ));

D('Dividing Algebraic Expressions', 'division of algebraic expressions',
  'Divide coefficients and <b>subtract exponents</b>. To divide a polynomial by a monomial, divide every term. To divide by a binomial, factorise first and cancel.',
  ['24x⁴y³ ÷ 6x²y = 4x²y².', '(12x³ − 8x²) ÷ 4x = 3x² − 2x.', '(x² + 5x + 6) ÷ (x + 2) = (x + 2)(x + 3) ÷ (x + 2) = x + 3.', 'Check by multiplying back.'],
  '(10y² + 15y) ÷ 5y = 10y²/5y + 15y/5y = <b>2y + 3</b>.',
  one(
    () => { const a = nz(-9, 9), b = R(2, 6), m = R(1, 4), q = R(1, 3), u = R(0, 3), v = R(1, 2); const t = (c, x, y) => `${c === 1 ? '' : c === -1 ? M : fmt(c)}${vp('x', x)}${vp('y', y)}` || '1';
      return Q(`${t(a * b, m + q, u + v)} ÷ ${t(b, q, v)} = ?`, t(a, m, u), [t(a, m + q * 2, u), t(a * b * b, m, u), t(a, (m + q) * q === m ? m + 1 : (m + q) * q, u)], 'Divide the numbers; subtract the powers of each variable.'); },
    () => { const g = R(2, 6), a = nz(-6, 6), b = nz(-9, 9); return Q(`(${px([0, 0, g * b, g * a])}) ÷ ${g}x = ?`, px([0, b, a]), [px([b, a]), px([0, g * b, g * a]), px([0, -b, a])], `Divide each term by ${g}x → ${px([0, b, a])}.`); },
    () => { let a, b; do { a = nz(-9, 9); b = nz(-9, 9); } while (a === b); return Q(`(${px([a * b, a + b, 1])}) ÷ ${fac(a)} = ?`, px([b, 1]), [px([-b, 1]), px([a, 1]), px([a + b, 1])], `${px([a * b, a + b, 1])} = ${fac(a)}${fac(b)}; cancel ${fac(a)}.`); }
  ));

D('Linear Equations: One & Two Steps', 'solving linear equations one variable',
  'An equation is a balance. Do the <b>same operation on both sides</b> to get the variable alone.',
  ['Undo + with −, undo × with ÷ (and vice versa).', 'First undo addition/subtraction, then multiplication/division.', 'Transposing: a term moving across “=” changes its sign.', 'Always check by substituting back.'],
  '3x + 7 = 25 → 3x = 18 → <b>x = 6</b>. Check: 3(6) + 7 = 25 ✓.',
  one(
    () => { const a = R(2, 9), x = R(-10, 15), b = nz(-20, 20), c = a * x + b; return Q(`Solve: ${a}x${sgn(b)} = ${fmt(c)}`, x, [(c + b) / a, c - b, -x], `${a}x = ${fmt(c)} ${b < 0 ? '+' : '−'} ${Math.abs(b)} = ${fmt(c - b)} → x = ${fmt(c - b)} ÷ ${a} = ${fmt(x)}.`); },
    () => { const a = R(2, 9), b = nz(-12, 12); return Q(`Solve: x/${a} = ${fmt(b)}`, a * b, [b / a, a + b, -a * b], `Multiply both sides by ${a}: x = ${fmt(a * b)}.`); },
    () => { const x = R(-20, 30), b = nz(-20, 20); return Q(`Solve: x${sgn(-b)} = ${fmt(x - b)}`, x, [x - 2 * b, -x, x - b], `Add ${fmt(b)} to both sides: x = ${fmt(x)}.`); }
  ));

D('Equations with Variables on Both Sides', 'linear equations variables on both sides',
  'Collect variable terms on one side and numbers on the other (transpose), then solve.',
  ['5x − 3 = 2x + 12 → 5x − 2x = 12 + 3.', 'Move the smaller x-term to avoid negatives.', 'Simplify each side first if needed.', 'Check by substituting.'],
  '7x + 4 = 3x − 16 → 4x = −20 → <b>x = −5</b>.',
  () => { const x = R(-10, 12); let a, c; do { a = R(2, 12); c = R(1, 11); } while (a === c); const b = nz(-20, 20), d = a * x + b - c * x;
    return Q(`Solve: ${a}x${sgn(b)} = ${c === 1 ? '' : c}x${d ? sgn(d) : ''}`, x, [-x, (d + b) / (a - c), x + 1], `${a}x − ${c}x = ${fmt(d)} − ${p(b)} → ${a - c}x = ${fmt(d - b)} → x = ${fmt(x)}.`); });

D('Equations with Brackets & Fractions', 'linear equations with fractions brackets',
  'Open brackets first. To clear fractions, multiply every term by the LCM of the denominators.',
  ['3(x − 2) = 2(x + 1) → 3x − 6 = 2x + 2 → x = 8.', 'x/2 + x/3 = 10 → multiply by 6: 3x + 2x = 60 → x = 12.', 'Multiply <b>every</b> term, including the right side.', 'Check by substituting.'],
  '(2x + 1)/3 = 5 → 2x + 1 = 15 → 2x = 14 → <b>x = 7</b>.',
  one(
    () => { const a = R(2, 9), b = nz(-9, 9), x = R(-10, 12); return Q(`Solve: ${a}(x${sgn(b)}) = ${fmt(a * (x + b))}`, x, [a * (x + b) - b, x + b, -x], `Divide by ${a}: x${sgn(b)} = ${fmt(x + b)} → x = ${fmt(x)}.`); },
    () => { const a = R(2, 6); let b; do b = R(2, 8); while (b === a); const L = lcm(a, b), x = L * nz(-4, 5); return Q(`Solve: x/${a} + x/${b} = ${fmt(x / a + x / b)}`, x, [x / a + x / b, x / L, x * 2], `Multiply by ${L}: ${L / a}x + ${L / b}x = ${fmt(L * (x / a + x / b))} → ${L / a + L / b}x = ${fmt(L * (x / a + x / b))} → x = ${fmt(x)}.`); },
    () => { const a = R(2, 7), x = R(-8, 12), c = R(2, 6), d = nz(-6, 6), b = c * d - a * x; return Q(`Solve: (${a}x${sgn(b)})/${c} = ${fmt(d)}`, x, [(d - b) / a, c * d - b, -x], `Multiply by ${c}: ${a}x${sgn(b)} = ${fmt(c * d)} → ${a}x = ${fmt(c * d - b)} → x = ${fmt(x)}.`); }
  ));

D('Word Problems with Equations', 'linear equations word problems class 8',
  'Let the unknown be x, write an equation from the story, solve it, and answer the question that was asked.',
  ['Consecutive numbers: x, x + 1, x + 2. Consecutive even/odd: x, x + 2, x + 4.', 'Ages: “after t years” → add t to every age.', 'Rectangle perimeter = 2(l + b).', 'Re-read the question: maybe they asked for 2x, not x!'],
  'Three consecutive numbers add to 72: x + (x + 1) + (x + 2) = 72 → 3x = 69 → x = 23. Numbers: <b>23, 24, 25</b>.',
  () => { const t = R(0, 3);
    if (t === 0) { const x = R(10, 90); return Q(`The sum of three consecutive numbers is ${3 * x + 3}. What is the largest number?`, x + 2, [x, x + 1, x + 3], `x + (x+1) + (x+2) = ${3 * x + 3} → x = ${x}; largest = ${x + 2}.`); }
    if (t === 1) { const s = R(5, 15), k = R(3, 6); return Q(`A father is ${k} times as old as his son. The sum of their ages is ${s * (k + 1)} years. How old is the son?`, s, [s * k, s + k, s * (k + 1) / 2], `x + ${k}x = ${s * (k + 1)} → ${k + 1}x = ${s * (k + 1)} → x = ${s}.`); }
    if (t === 2) { const b = R(4, 20), d = R(2, 10); return Q(`The length of a rectangle is ${d} m more than its breadth. Its perimeter is ${2 * (2 * b + d)} m. Find the length (m).`, b + d, [b, 2 * b + d, b + 2 * d], `2(x + x + ${d}) = ${2 * (2 * b + d)} → x = ${b}; length = ${b + d} m.`); }
    const x = R(3, 40), a = R(2, 5), b = R(3, 20); return Q(`${a} times a number plus ${b} equals ${a * x + b}. Find the number.`, x, [x + b, (a * x + b) / a, x - 1], `${a}x + ${b} = ${a * x + b} → ${a}x = ${a * x} → x = ${x}.`); });

const FORMS = [
  (x) => [`Ravi has x marbles. He gets ${x} more and then doubles them. Expression?`, `2(x + ${x})`, [`2x + ${x}`, `x + ${2 * x}`, `2(x − ${x})`]],
  (x) => [`A number is multiplied by ${x} and then ${x + 1} is subtracted. Expression?`, `${x}n − ${x + 1}`, [`${x}(n − ${x + 1})`, `${x + 1} − ${x}n`, `n − ${x * (x + 1)}`]],
  (x) => [`Cost of x pens at ₹${x * 5} each and 3 notebooks at ₹y each:`, `${x * 5}x + 3y`, [`${x * 5 + 3}(x + y)`, `${x * 5}x + y + 3`, `x + 3y + ${x * 5}`]],
  (x) => [`One-third of a number decreased by ${x}:`, `n/3 − ${x}`, [`(n − ${x})/3`, `3n − ${x}`, `${x} − n/3`]],
  (x) => [`Perimeter of a rectangle with length (a + ${x}) and breadth a:`, `4a + ${2 * x}`, [`2a + ${x}`, `4a + ${x}`, `a(a + ${x})`]],
  (x) => [`Area of a rectangle with length (a + ${x}) and breadth a:`, `a${sup(2)} + ${x}a`, [`2a + ${x}`, `a${sup(2)} + ${x}`, `4a + ${2 * x}`]]
];
D('Algebra in Real Life: Forming Expressions', 'forming algebraic expressions from word statements',
  'Turning words into algebra is the key skill for solving real problems. Read slowly and translate phrase by phrase.',
  ['“more than / increased by” → +; “less than / decreased by” → −.', '“times / of / product” → ×; “quotient / per / divided” → ÷.', '“5 less than x” is x − 5 (not 5 − x).', 'Use brackets when an operation applies to a whole group.'],
  '“Twice the sum of a number and 7” = <b>2(n + 7)</b>, while “twice a number plus 7” = <b>2n + 7</b>.',
  () => { const [q, a, d] = pick(FORMS)(R(2, 9)); return Q(q, a, d, `Translate step by step: answer is ${a}.`); });

D('Algebra Review Test', 'class 8 algebra revision',
  'Revision day! The test mixes Days 36–49: expressions, multiplication, identities, factorisation, division and linear equations.',
  ['Like terms and signs.', 'Identities (a ± b)², a² − b².', 'Factorisation and division.', 'Linear equations and word problems.'],
  'Tip: after solving an equation, always substitute back to check.',
  [36, 49]);

// ---------- Phase 4: Commercial Maths ----------
D('Ratio & Proportion', 'ratio and proportion',
  'A <b>ratio</b> a : b compares two quantities of the same kind. Four numbers are in <b>proportion</b> if a : b = c : d, i.e. a × d = b × c.',
  ['Simplify a ratio by dividing both terms by their HCF.', 'Units must be the same before comparing (convert m to cm, etc.).', 'Divide an amount in ratio a : b: shares are a/(a+b) and b/(a+b) of it.', 'Proportion: product of extremes = product of means.'],
  'Divide ₹720 in the ratio 5 : 3 → total 8 parts, 1 part = 90 → shares <b>₹450 and ₹270</b>.',
  one(
    () => { let a, b; do { a = R(1, 9); b = R(1, 9); } while (gcd(a, b) !== 1 || a === b); const k = R(2, 12); return Q(`Simplify the ratio ${a * k} : ${b * k}.`, `${a} : ${b}`, [`${b} : ${a}`, `${a * 2} : ${b}`, `${a + 1} : ${b + 1}`], `HCF is ${k}; divide both → ${a} : ${b}.`); },
    () => { const a = R(1, 7), b = R(1, 7), u = R(5, 60) * 10, tot = (a + b) * u; return Q(`Divide ${rs(tot)} in the ratio ${a} : ${b}. What is the first share (₹)?`, a * u, [b * u, tot / 2, a * u + u], `Total parts ${a + b}, 1 part = ${tot} ÷ ${a + b} = ${u}; first share = ${a} × ${u} = ${a * u}.`); },
    () => { const a = R(2, 9), b = R(2, 12), k = R(2, 8); return Q(`Find x: ${a} : ${b} = ${a * k} : x`, b * k, [b + k, a * b, b * k + k], `${a} × x = ${b} × ${a * k} → x = ${b * k}.`); }
  ));

D('Percentages', 'percentages basics',
  '<b>Per cent</b> means “per hundred”. x% = x/100. Percentages make comparison easy.',
  ['x% of y = x × y / 100.', 'What % is a of b? → (a / b) × 100.', 'Fraction → % : multiply by 100. (3/4 = 75%)', '10% = 1/10, 25% = 1/4, 50% = 1/2, 20% = 1/5.'],
  '18 out of 24 = 18/24 × 100 = <b>75%</b>. 15% of 640 = 15 × 640 / 100 = <b>96</b>.',
  one(
    () => { const x = pick([5, 10, 12, 15, 20, 25, 30, 40, 45, 60, 75]), y = R(2, 40) * 20; return Q(`${x}% of ${y} = ?`, x * y / 100, [x * y / 10, y / x, x * y / 100 + x], `${x} × ${y} ÷ 100 = ${fmt(x * y / 100)}.`); },
    () => { const pc = pick([10, 20, 25, 40, 50, 60, 75, 80, 5, 15]), b = R(2, 20) * 20, a = b * pc / 100; return Q(`What percent of ${b} is ${fmt(a)}?`, pc, [100 - pc, pc / 10, a], `(${fmt(a)} ÷ ${b}) × 100 = ${pc}%.`); },
    () => { const t = pick([[1, 4, 25], [3, 4, 75], [2, 5, 40], [3, 8, 37.5], [7, 20, 35], [9, 25, 36], [1, 8, 12.5], [3, 5, 60]]); return Q(`Express ${t[0]}/${t[1]} as a percentage (%).`, t[2], [t[2] / 10, t[1] * t[0], 100 - t[2]], `${t[0]}/${t[1]} × 100 = ${t[2]}%.`); }
  ));

D('Percentage Increase & Decrease', 'percentage increase decrease',
  'Percentage change compares the change with the <b>original</b> value.',
  ['% change = (change ÷ original) × 100.', 'Increase by p%: new = old × (100 + p)/100.', 'Decrease by p%: new = old × (100 − p)/100.', 'Always divide by the ORIGINAL, not the new value.'],
  'Price rises from ₹80 to ₹100: change 20, % increase = 20/80 × 100 = <b>25%</b>.',
  one(
    () => { const o = R(2, 20) * 20, pc = pick([5, 10, 15, 20, 25, 30, 40, 50]), up = R(0, 1), n = o * (100 + (up ? pc : -pc)) / 100; return Q(`A price changes from ${rs(o)} to ${rs(n)}. What is the percentage ${up ? 'increase' : 'decrease'}?`, pc, [Math.round(Math.abs(n - o) / n * 1000) / 10, Math.abs(n - o), pc + 5], `Change = ${fmt(Math.abs(n - o))}; ÷ original ${o} × 100 = ${pc}%.`); },
    () => { const o = R(2, 50) * 100, pc = pick([5, 10, 12, 20, 25]), up = R(0, 1); return Q(`The population of a town is ${o}. It ${up ? 'increases' : 'decreases'} by ${pc}%. New population?`, o * (100 + (up ? pc : -pc)) / 100, [o * (100 + (up ? -pc : pc)) / 100, o * pc / 100, o + (up ? pc : -pc)], `${o} × ${100 + (up ? pc : -pc)}/100 = ${fmt(o * (100 + (up ? pc : -pc)) / 100)}.`); }
  ));

D('Profit & Loss', 'profit and loss',
  'Cost Price (CP) is what you pay; Selling Price (SP) is what you sell for. SP > CP → profit; SP < CP → loss.',
  ['Profit = SP − CP; Loss = CP − SP.', 'Profit % = Profit / CP × 100 (always on CP).', 'SP = CP × (100 + profit%)/100.', 'SP = CP × (100 − loss%)/100.'],
  'CP ₹400, SP ₹460: profit ₹60 → 60/400 × 100 = <b>15%</b>.',
  one(
    () => { const cp = R(4, 60) * 50, pc = pick([5, 10, 12, 15, 20, 25, 30]), up = R(0, 1), sp = cp * (100 + (up ? pc : -pc)) / 100; return Q(`CP = ${rs(cp)}, SP = ${rs(sp)}. Find the ${up ? 'profit' : 'loss'} %.`, pc, [Math.round(Math.abs(sp - cp) / sp * 10000) / 100, Math.abs(sp - cp), pc * 2], `${up ? 'Profit' : 'Loss'} = ${fmt(Math.abs(sp - cp))}; ÷ CP ${cp} × 100 = ${pc}%.`); },
    () => { const cp = R(4, 60) * 50, pc = pick([5, 10, 15, 20, 25]), up = R(0, 1); const sp = cp * (100 + (up ? pc : -pc)) / 100; return Q(`An article costs ${rs(cp)} and is sold at a ${pc}% ${up ? 'profit' : 'loss'}. Find SP (₹).`, sp, [cp * (100 + (up ? -pc : pc)) / 100, cp * pc / 100, cp + (up ? pc : -pc)], `SP = ${cp} × ${100 + (up ? pc : -pc)}/100 = ${fmt(sp)}.`); },
    () => { const cp = R(4, 40) * 100, pc = pick([10, 20, 25]); const sp = cp * (100 + pc) / 100; return Q(`By selling a bag for ${rs(sp)}, a shopkeeper gains ${pc}%. What was the cost price (₹)?`, cp, [sp * (100 - pc) / 100, sp - pc, sp * pc / 100], `CP = SP × 100/(100 + ${pc}) = ${fmt(sp)} × 100/${100 + pc} = ${cp}.`); }
  ));

D('Discount & Marked Price', 'discount marked price',
  'The <b>Marked Price (MP)</b> is the label price. A <b>discount</b> is a reduction on the MP.',
  ['Discount = MP − SP.', 'Discount % = Discount / MP × 100 (always on MP).', 'SP = MP × (100 − d)/100.', 'A “sale” of 20% off on ₹500 → pay ₹400.'],
  'MP ₹1,200, discount 15% → discount = ₹180 → SP = <b>₹1,020</b>.',
  one(
    () => { const mp = R(4, 60) * 50, d = pick([5, 10, 15, 20, 25, 30, 40]); return Q(`Marked price ${rs(mp)}, discount ${d}%. Find the selling price (₹).`, mp * (100 - d) / 100, [mp * d / 100, mp - d, mp * (100 + d) / 100], `Discount = ${fmt(mp * d / 100)}; SP = ${mp} − ${fmt(mp * d / 100)} = ${fmt(mp * (100 - d) / 100)}.`); },
    () => { const mp = R(4, 40) * 100, d = pick([10, 15, 20, 25, 30, 35]); const sp = mp * (100 - d) / 100; return Q(`A shirt marked ${rs(mp)} is sold for ${rs(sp)}. Discount %?`, d, [100 - d, mp - sp, Math.round((mp - sp) / sp * 1000) / 10], `Discount ${fmt(mp - sp)} ÷ MP ${mp} × 100 = ${d}%.`); }
  ));

D('Sales Tax & GST', 'GST sales tax calculation',
  'Tax is added <b>on top</b> of the selling price. GST in India is charged at rates like 5%, 12%, 18%, 28%.',
  ['Tax = rate% of the price.', 'Bill amount = price × (100 + rate)/100.', 'Price before tax = bill × 100/(100 + rate).', 'Discount is applied first, then tax.'],
  'A phone costs ₹15,000 with 18% GST → tax = ₹2,700 → bill <b>₹17,700</b>.',
  one(
    () => { const pr = R(2, 80) * 100, g = pick([5, 12, 18, 28]); return Q(`Price ${rs(pr)} + ${g}% GST. Total bill (₹)?`, pr * (100 + g) / 100, [pr * g / 100, pr + g, pr * (100 - g) / 100], `GST = ${fmt(pr * g / 100)}; bill = ${fmt(pr * (100 + g) / 100)}.`); },
    () => { const pr = R(2, 60) * 100, g = pick([5, 12, 18]); const bill = pr * (100 + g) / 100; return Q(`A bill including ${g}% GST is ${rs(bill)}. Price before GST (₹)?`, pr, [bill * (100 - g) / 100, bill - g, bill * g / 100], `${fmt(bill)} × 100/${100 + g} = ${pr}.`); },
    () => { const mp = R(4, 40) * 100, d = 10, g = pick([5, 12, 18]); const sp = mp * 0.9; return Q(`MP ${rs(mp)}, 10% discount, then ${g}% GST on the discounted price. Final bill (₹)?`, sp * (100 + g) / 100, [mp * (100 + g - d) / 100, mp * (100 + g) / 100, sp], `After discount ${fmt(sp)}; with GST ${fmt(sp)} × ${100 + g}/100 = ${fmt(sp * (100 + g) / 100)}.`); }
  ));

D('Simple Interest', 'simple interest formula',
  '<b>Simple Interest</b> is calculated only on the original amount (principal) every year.',
  ['SI = P × R × T / 100.', 'Amount A = P + SI.', 'T must be in years (6 months = 1/2 year).', 'Rearranged: R = SI × 100 / (P × T).'],
  'P = ₹5,000, R = 8%, T = 3 years → SI = 5000 × 8 × 3 / 100 = <b>₹1,200</b>; Amount = ₹6,200.',
  one(
    () => { const P = R(1, 50) * 1000, r = R(2, 12), t = R(1, 5); return Q(`Find the simple interest on ${rs(P)} at ${r}% per year for ${t} years (₹).`, P * r * t / 100, [P * r / 100, P + P * r * t / 100, P * r * t / 10], `${P} × ${r} × ${t} / 100 = ${fmt(P * r * t / 100)}.`); },
    () => { const P = R(1, 50) * 1000, r = R(2, 12), t = R(1, 5); return Q(`Find the amount: ${rs(P)} at ${r}% simple interest for ${t} years (₹).`, P + P * r * t / 100, [P * r * t / 100, P + P * r / 100, P * (1 + r / 100) ** t], `SI = ${fmt(P * r * t / 100)}; A = ${P} + ${fmt(P * r * t / 100)}.`); },
    () => { const P = R(1, 20) * 1000, r = R(2, 15), t = R(2, 5); return Q(`At what rate % will ${rs(P)} earn ${rs(P * r * t / 100)} simple interest in ${t} years?`, r, [r * t, r + 1, P * r * t / 100 / t], `R = SI × 100 / (P × T) = ${fmt(P * r * t / 100)} × 100 / (${P} × ${t}) = ${r}%.`); }
  ));

D('Compound Interest', 'compound interest class 8',
  'In <b>compound interest</b>, interest is added to the principal every period, so next year\'s interest is on a bigger amount.',
  ['A = P(1 + R/100)ⁿ; CI = A − P.', 'Half-yearly: rate R/2, periods 2n.', 'CI ≥ SI (equal for 1 year).', 'For 2 years: CI − SI = P(R/100)².'],
  'P = ₹10,000, R = 10%, n = 2 → A = 10000 × 1.1 × 1.1 = ₹12,100 → CI = <b>₹2,100</b> (SI would be ₹2,000).',
  one(
    () => { const P = R(1, 20) * 1000, r = pick([5, 10, 20]), n = R(2, 3); const A = P * (1 + r / 100) ** n; return Q(`Find the compound interest on ${rs(P)} at ${r}% per annum for ${n} years (₹).`, A - P, [P * r * n / 100, A, (A - P) + P * r / 100], `A = ${P} × (${fmt(1 + r / 100)})^${n} = ${fmt(A)}; CI = ${fmt(A - P)}.`); },
    () => { const P = R(1, 20) * 1000, r = pick([5, 10, 20]), n = R(1, 3); const A = P * (1 + r / 100) ** n; return Q(`Amount on ${rs(P)} at ${r}% compounded annually for ${n} year${n > 1 ? 's' : ''} (₹)?`, A, [P + P * r * n / 100 === A ? A + P * r / 100 : P + P * r * n / 100, A - P, P * (1 + r / 100) ** (n + 1)], `A = P(1 + R/100)ⁿ = ${fmt(A)}.`); },
    () => { const P = R(1, 50) * 1000, r = pick([5, 10, 20]); return Q(`Difference between CI and SI on ${rs(P)} at ${r}% for 2 years (₹)?`, P * (r / 100) ** 2, [P * r / 100, P * (r / 100) ** 2 * 2, 0], `CI − SI = P(R/100)² = ${P} × (${r}/100)² = ${fmt(P * (r / 100) ** 2)}.`); }
  ));

D('Direct & Inverse Proportion', 'direct and inverse proportion',
  '<b>Direct</b>: both increase together (x/y constant). <b>Inverse</b>: one increases as the other decreases (x × y constant).',
  ['Direct: more items → more cost. x₁/y₁ = x₂/y₂.', 'Inverse: more workers → fewer days. x₁y₁ = x₂y₂.', 'Unitary method: find the value for 1, then for many.', 'Ask: “if one doubles, does the other double or halve?”'],
  '12 workers build a wall in 10 days. 15 workers? Inverse: 12 × 10 = 15 × d → <b>d = 8 days</b>.',
  one(
    () => { const u = R(3, 40), a = R(2, 9); let b; do b = R(2, 15); while (b === a); return Q(`If ${a} pens cost ${rs(u * a)}, how much do ${b} pens cost (₹)?`, u * b, [u * a * b, u * a + b, u * (a + b)], `1 pen = ${u}; ${b} pens = ${u * b}.`); },
    () => { const pr = pick([[12, 10, 15, 8], [6, 20, 8, 15], [10, 12, 15, 8], [8, 15, 12, 10], [9, 20, 12, 15], [20, 6, 24, 5], [15, 16, 20, 12]]); return Q(`${pr[0]} workers finish a job in ${pr[1]} days. How many days will ${pr[2]} workers take?`, pr[3], [pr[1] * pr[2] / pr[0], pr[1] + pr[2] - pr[0], pr[3] + 2], `Inverse: ${pr[0]} × ${pr[1]} = ${pr[2]} × d → d = ${pr[3]}.`); },
    () => { const s = pick([[40, 6, 60, 4], [50, 3, 75, 2], [30, 4, 40, 3], [60, 5, 75, 4], [45, 4, 60, 3]]); return Q(`A car at ${s[0]} km/h takes ${s[1]} hours for a trip. At ${s[2]} km/h, how long (hours)?`, s[3], [s[1] * s[2] / s[0], s[1] + 1, s[3] + 0.5], `Same distance: ${s[0]} × ${s[1]} = ${s[2]} × t → t = ${s[3]}.`); }
  ));

D('Speed, Distance & Time', 'speed distance time',
  'Speed tells how much distance is covered per unit time.',
  ['Distance = Speed × Time.', 'Speed = Distance ÷ Time;  Time = Distance ÷ Speed.', 'km/h → m/s: × 5/18.  m/s → km/h: × 18/5.', 'Average speed = total distance ÷ total time.'],
  '72 km/h = 72 × 5/18 = <b>20 m/s</b>. 240 km in 4 h → speed <b>60 km/h</b>.',
  one(
    () => { const s = R(4, 18) * 5, t = R(2, 8); return Q(`A bus travels at ${s} km/h for ${t} hours. Distance (km)?`, s * t, [s + t, s * t / 2, s * (t + 1)], `${s} × ${t} = ${s * t} km.`); },
    () => { const s = R(4, 18) * 5, t = R(2, 8); return Q(`A train covers ${s * t} km in ${t} hours. Speed (km/h)?`, s, [s * t * t, s + t, s * 2], `${s * t} ÷ ${t} = ${s} km/h.`); },
    () => { const k = R(1, 8) * 18; return Q(`Convert ${k} km/h to m/s.`, k * 5 / 18, [k * 18 / 5, k / 3.6 * 2, k / 10], `${k} × 5/18 = ${k * 5 / 18} m/s.`); },
    () => { const d = R(2, 6) * 60, s1 = pick([30, 40, 60]), s2 = pick([60, 120, 40].filter((x) => x !== s1)); const tt = d / s1 + d / s2; return Q(`A car goes ${d} km at ${s1} km/h and returns at ${s2} km/h. Average speed for the whole trip (km/h)?`, 2 * d / tt, [(s1 + s2) / 2, s1 + s2, 2 * d / tt + 4], `Total distance ${2 * d}, total time ${fmt(tt)} h → ${fmt(2 * d / tt)} km/h (not the simple average!).`); }
  ));

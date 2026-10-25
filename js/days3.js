// Days 61–90: Geometry, Mensuration, Data and Expert Challenges.
const deg = (n) => fmt(n) + '°';

// ---------- Phase 5: Geometry & Mensuration ----------
D('Lines & Angles', 'complementary supplementary vertically opposite angles',
  'Pairs of angles have special relationships that let you find unknown angles.',
  ['Complementary angles add to 90°; supplementary add to 180°.', 'A linear pair (angles on a straight line) adds to 180°.', 'Vertically opposite angles are equal.', 'Angles around a point add to 360°.'],
  'Two lines cross making one angle 65°. Vertically opposite angle = <b>65°</b>, each adjacent angle = 180° − 65° = <b>115°</b>.',
  one(
    () => { const a = R(5, 85); return Q(`Find the complement of ${deg(a)}.`, deg(90 - a), [deg(180 - a), deg(a), deg(360 - a)], `90° − ${a}° = ${90 - a}°.`); },
    () => { const a = R(10, 170); return Q(`Find the supplement of ${deg(a)}.`, deg(180 - a), [deg(Math.abs(90 - a)), deg(a), deg(360 - a)], `180° − ${a}° = ${180 - a}°.`); },
    () => { const a = R(20, 160); return Q(`Two straight lines intersect. One angle is ${deg(a)}. What is its vertically opposite angle?`, deg(a), [deg(180 - a), deg(Math.abs(90 - a)), deg(360 - a)], 'Vertically opposite angles are equal.'); },
    () => { const x = R(10, 40), k = pick([2, 3, 4]); return Q(`Two angles form a linear pair. One is ${k === 2 ? 'twice' : k + ' times'} the other. Find the smaller angle.`, deg(180 / (k + 1)), [deg(90 / (k + 1)), deg(180 * k / (k + 1)), deg(180 / k)], `x + ${k}x = 180° → x = ${fmt(180 / (k + 1))}°.`); }
  ));

D('Parallel Lines & Transversals', 'parallel lines transversal corresponding alternate angles',
  'When a line (transversal) crosses two <b>parallel</b> lines, it creates equal and supplementary angle pairs.',
  ['Corresponding angles are equal (F-shape).', 'Alternate interior angles are equal (Z-shape).', 'Co-interior (same-side interior) angles add to 180° (C/U-shape).', 'If any of these holds, the lines are parallel.'],
  'If one angle is 72°, the alternate interior angle is <b>72°</b> and the co-interior angle is <b>108°</b>.',
  () => { const a = R(30, 150), t = pick([['corresponding', 0], ['alternate interior', 0], ['co-interior', 1], ['alternate exterior', 0]]);
    const ans = t[1] ? 180 - a : a; return Q(`A transversal cuts two parallel lines. One angle is ${deg(a)}. What is its ${t[0]} angle?`, deg(ans), [deg(t[1] ? a : 180 - a), deg(Math.abs(90 - a)), deg(360 - a)], t[1] ? 'Co-interior angles add to 180°.' : `${t[0][0].toUpperCase() + t[0].slice(1)} angles are equal.`); });

D('Triangles: Angle Sum & Exterior Angle', 'angle sum property exterior angle property triangle',
  'The three angles of every triangle add to <b>180°</b>. An exterior angle equals the <b>sum of the two interior opposite angles</b>.',
  ['∠A + ∠B + ∠C = 180°.', 'Exterior angle = sum of the two opposite interior angles.', 'Isosceles triangle: base angles are equal.', 'Equilateral triangle: each angle is 60°.'],
  'Angles 48° and 67° → third = 180 − 115 = <b>65°</b>. Exterior angle at the third vertex = 48 + 67 = <b>115°</b>.',
  one(
    () => { const a = R(20, 100), b = R(20, 150 - a); return Q(`Two angles of a triangle are ${deg(a)} and ${deg(b)}. Find the third.`, deg(180 - a - b), [deg(a + b), deg(360 - a - b), deg(90 - (a + b) / 2)], `180° − (${a}° + ${b}°) = ${180 - a - b}°.`); },
    () => { const a = R(20, 80), b = R(20, 80); return Q(`The two interior opposite angles are ${deg(a)} and ${deg(b)}. Find the exterior angle.`, deg(a + b), [deg(180 - a - b), deg(Math.abs(a - b)), deg(360 - a - b)], `Exterior angle = ${a}° + ${b}° = ${a + b}°.`); },
    () => { const v = R(20, 140) & ~1; return Q(`In an isosceles triangle, the vertex angle is ${deg(v)}. Find each base angle.`, deg((180 - v) / 2), [deg(180 - v), deg(v / 2), deg(90 - v)], `(180° − ${v}°) ÷ 2 = ${(180 - v) / 2}°.`); },
    () => { const r = pick([[1, 2, 3], [2, 3, 4], [1, 1, 2], [3, 4, 5], [2, 3, 5], [1, 2, 6], [4, 5, 9]]); const s = r[0] + r[1] + r[2]; return Q(`Angles of a triangle are in the ratio ${r.join(' : ')}. Find the largest angle.`, deg(180 * r[2] / s), [deg(180 * r[0] / s), deg(180 * r[1] / s), deg(r[2] * 10)], `Total ${s} parts = 180° → 1 part = ${fmt(180 / s)}°; largest = ${fmt(180 * r[2] / s)}°.`); }
  ));

D('Polygons: Interior Angles & Diagonals', 'sum of interior angles of polygon diagonals',
  'A polygon with n sides can be split into (n − 2) triangles from one vertex, so its interior angles add to <b>(n − 2) × 180°</b>.',
  ['Sum of interior angles = (n − 2) × 180°.', 'Each interior angle of a REGULAR polygon = (n − 2) × 180° / n.', 'Number of diagonals = n(n − 3)/2.', 'Names: pentagon 5, hexagon 6, heptagon 7, octagon 8, decagon 10.'],
  'Hexagon: (6 − 2) × 180° = <b>720°</b>; each angle of a regular hexagon = 720 ÷ 6 = <b>120°</b>; diagonals = 6 × 3 / 2 = <b>9</b>.',
  one(
    () => { const n = R(5, 15); return Q(`Sum of interior angles of a polygon with ${n} sides?`, deg((n - 2) * 180), [deg(n * 180), deg((n - 1) * 180), deg(360)], `(${n} − 2) × 180° = ${(n - 2) * 180}°.`); },
    () => { const n = pick([4, 5, 6, 8, 9, 10, 12, 15, 18, 20]); return Q(`Each interior angle of a regular polygon with ${n} sides?`, deg((n - 2) * 180 / n), [deg(360 / n), deg((n - 2) * 180), deg(180 - 180 / n)], `(${n} − 2) × 180° ÷ ${n} = ${fmt((n - 2) * 180 / n)}°.`); },
    () => { const n = R(4, 15); return Q(`How many diagonals does a polygon with ${n} sides have?`, n * (n - 3) / 2, [n * (n - 3), n * (n - 1) / 2, n - 3], `n(n − 3)/2 = ${n} × ${n - 3} / 2 = ${n * (n - 3) / 2}.`); }
  ));

D('Exterior Angles of Polygons', 'exterior angles of a regular polygon',
  'The exterior angles of <b>any</b> convex polygon add up to <b>360°</b>. For a regular polygon, each exterior angle = 360° / n.',
  ['Sum of exterior angles = 360° always.', 'Regular polygon: exterior = 360°/n; n = 360°/exterior.', 'Interior + exterior = 180° at each vertex.', 'A regular polygon exists only if 360 ÷ exterior is a whole number ≥ 3.'],
  'Each exterior angle is 24° → n = 360/24 = <b>15 sides</b>. Each interior angle = 180 − 24 = <b>156°</b>.',
  one(
    () => { const n = pick([3, 4, 5, 6, 8, 9, 10, 12, 15, 18, 20, 24, 36]); return Q(`Each exterior angle of a regular polygon is ${deg(360 / n)}. How many sides?`, n, [n + 1, 180 / (360 / n), n * 2], `n = 360 ÷ ${360 / n} = ${n}.`); },
    () => { const n = pick([5, 6, 8, 9, 10, 12, 15, 20]); return Q(`Each exterior angle of a regular ${n}-sided polygon?`, deg(360 / n), [deg(180 - 360 / n), deg(180 / n), deg(360)], `360° ÷ ${n} = ${360 / n}°.`); },
    () => { const n = pick([4, 5, 6, 8, 10, 12]); return Q(`Sum of the exterior angles of a polygon with ${n} sides?`, deg(360), [deg((n - 2) * 180), deg(180), deg(n * 90)], 'The exterior angles of any polygon always add up to 360°.'); },
    () => { const e = pick([22, 25, 50, 70, 80, 35]); return Q(`Is a regular polygon possible with each exterior angle ${deg(e)}?`, 'No', ['Yes', `Yes, with ${Math.round(360 / e)} sides`, 'Only if it is a triangle'], `360 ÷ ${e} = ${fmt(360 / e)} is not a whole number, so no.`); }
  ));

D('Quadrilaterals & Parallelograms', 'properties of parallelogram rhombus rectangle',
  'Angles of a quadrilateral add to <b>360°</b>. Special quadrilaterals have extra properties.',
  ['Parallelogram: opposite sides & angles equal; adjacent angles add to 180°; diagonals bisect each other.', 'Rectangle: all angles 90°, diagonals equal.', 'Rhombus: all sides equal, diagonals perpendicular bisectors.', 'Square: all of the above!'],
  'In parallelogram ABCD, ∠A = 70° → ∠C = <b>70°</b>, ∠B = ∠D = <b>110°</b>.',
  one(
    () => { const a = R(50, 120), b = R(50, 120), c = R(40, 330 - a - b > 150 ? 150 : 330 - a - b); return Q(`Three angles of a quadrilateral are ${deg(a)}, ${deg(b)}, ${deg(c)}. Find the fourth.`, deg(360 - a - b - c), [deg(180 - (a + b + c) % 180), deg(a + b + c - 180), deg(360 - a - b)], `360° − ${a + b + c}° = ${360 - a - b - c}°.`); },
    () => { const a = R(40, 140); return Q(`One angle of a parallelogram is ${deg(a)}. What is the adjacent angle?`, deg(180 - a), [deg(a), deg(360 - a), deg(90 - a / 2)], 'Adjacent angles of a parallelogram add to 180°.'); },
    () => { const r = pick([[2, 3], [1, 2], [4, 5], [3, 7], [1, 5]]); return Q(`Two adjacent angles of a parallelogram are in ratio ${r[0]} : ${r[1]}. Find the smaller angle.`, deg(180 * r[0] / (r[0] + r[1])), [deg(360 * r[0] / (r[0] + r[1])), deg(180 * r[1] / (r[0] + r[1])), deg(90 * r[0] / (r[0] + r[1]))], `Total = 180°; ${r[0]}/${r[0] + r[1]} × 180° = ${fmt(180 * r[0] / (r[0] + r[1]))}°.`); },
    () => { const t = pick([['The diagonals of a rhombus', 'bisect each other at right angles', ['are always equal', 'never meet', 'are parallel']], ['The diagonals of a rectangle', 'are equal in length', ['are perpendicular always', 'are unequal', 'are parallel']], ['A quadrilateral with exactly one pair of parallel sides is a', 'trapezium', ['rhombus', 'parallelogram', 'kite']], ['A rhombus with one right angle is a', 'square', ['kite', 'trapezium', 'rectangle that is not a square']]]); return Q(t[0] + ':', t[1], t[2], `${t[0]} ${t[1]}.`); }
  ));

const TRIP = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [20, 21, 29], [9, 40, 41]];
D('Pythagoras Theorem', 'pythagoras theorem',
  'In a right-angled triangle, <b>hypotenuse² = base² + perpendicular²</b>. The hypotenuse is the longest side, opposite the right angle.',
  ['c² = a² + b² (c = hypotenuse).', 'Leg: a = √(c² − b²).', 'If the sides satisfy c² = a² + b², the triangle is right-angled.', 'Common triplets: (3,4,5), (5,12,13), (8,15,17), (7,24,25).'],
  'A 13 m ladder reaches a window 12 m high. Foot of ladder from wall = √(169 − 144) = √25 = <b>5 m</b>.',
  one(
    () => { const t = pick(TRIP), k = R(1, 4); return Q(`The legs of a right triangle are ${t[0] * k} cm and ${t[1] * k} cm. Find the hypotenuse (cm).`, t[2] * k, [(t[0] + t[1]) * k, t[2] * k + 1, (t[1] + 1) * k], `√(${(t[0] * k) ** 2} + ${(t[1] * k) ** 2}) = √${(t[2] * k) ** 2} = ${t[2] * k}.`); },
    () => { const t = pick(TRIP), k = R(1, 4); return Q(`A ${t[2] * k} m ladder leans against a wall. Its foot is ${t[0] * k} m from the wall. How high up the wall does it reach (m)?`, t[1] * k, [(t[2] - t[0]) * k, t[2] * k + t[0] * k, t[1] * k + 1], `√(${(t[2] * k) ** 2} − ${(t[0] * k) ** 2}) = ${t[1] * k} m.`); },
    () => { const t = pick(TRIP), right = R(0, 1); const s = right ? t : [t[0], t[1], t[2] + 1]; return Q(`Is a triangle with sides ${s.join(', ')} right-angled?`, right ? 'Yes' : 'No', [right ? 'No' : 'Yes', 'Cannot be decided', 'Only if it is isosceles'], `${s[0]}² + ${s[1]}² = ${s[0] ** 2 + s[1] ** 2}; ${s[2]}² = ${s[2] ** 2} → ${right ? 'equal, so yes' : 'not equal, so no'}.`); }
  ));

D('Perimeter & Area: Rectangle, Square, Triangle', 'area and perimeter rectangle square triangle',
  '<b>Perimeter</b> is the distance around a shape. <b>Area</b> is the space inside it (in square units).',
  ['Rectangle: P = 2(l + b), A = l × b.', 'Square: P = 4a, A = a².', 'Triangle: A = ½ × base × height.', 'Convert units before calculating: 1 m = 100 cm, 1 m² = 10,000 cm².'],
  'Rectangle 15 m × 8 m: P = 2(23) = <b>46 m</b>, A = <b>120 m²</b>.',
  one(
    () => { const l = R(5, 40), b = R(3, 30); return Q(`Area of a rectangle ${l} m × ${b} m (m²)?`, l * b, [2 * (l + b), l + b, l * b * 2], `${l} × ${b} = ${l * b} m².`); },
    () => { const l = R(5, 40), b = R(3, 30); return Q(`Perimeter of a rectangle ${l} cm × ${b} cm (cm)?`, 2 * (l + b), [l * b, l + b, 2 * l + b], `2(${l} + ${b}) = ${2 * (l + b)} cm.`); },
    () => { const a = R(3, 30); return Q(`Perimeter of a square is ${4 * a} cm. Find its area (cm²).`, a * a, [16 * a * a, 4 * a, a * a * 2], `Side = ${4 * a} ÷ 4 = ${a}; area = ${a * a} cm².`); },
    () => { const b = R(4, 30), h = R(2, 20) * 2; return Q(`Area of a triangle with base ${b} cm and height ${h} cm (cm²)?`, b * h / 2, [b * h, b + h, b * h / 4], `½ × ${b} × ${h} = ${b * h / 2} cm².`); }
  ));

D('Area: Parallelogram, Trapezium, Rhombus', 'area of trapezium parallelogram rhombus',
  'These areas all come from rectangles and triangles.',
  ['Parallelogram: A = base × height.', 'Trapezium: A = ½ × (sum of parallel sides) × height.', 'Rhombus: A = ½ × d₁ × d₂.', 'Height is always perpendicular to the base.'],
  'Trapezium with parallel sides 10 cm and 6 cm, height 5 cm: A = ½ × 16 × 5 = <b>40 cm²</b>.',
  one(
    () => { const b = R(4, 30), h = R(3, 20); return Q(`Area of a parallelogram with base ${b} cm and height ${h} cm (cm²)?`, b * h, [b * h / 2, 2 * (b + h), b + h], `${b} × ${h} = ${b * h} cm².`); },
    () => { const a = R(4, 25), b = R(4, 25), h = R(2, 12) * 2; return Q(`A trapezium has parallel sides ${a} cm and ${b} cm and height ${h} cm. Area (cm²)?`, (a + b) * h / 2, [(a + b) * h, a * b * h / 2, (a + b + h)], `½ × (${a} + ${b}) × ${h} = ${(a + b) * h / 2} cm².`); },
    () => { const d1 = R(3, 20) * 2, d2 = R(3, 20); return Q(`Diagonals of a rhombus are ${d1} cm and ${d2} cm. Area (cm²)?`, d1 * d2 / 2, [d1 * d2, (d1 + d2) * 2, d1 * d2 / 4], `½ × ${d1} × ${d2} = ${d1 * d2 / 2} cm².`); },
    () => { const a = R(5, 20), b = R(5, 20), h = R(2, 10) * 2, A = (a + b) * h / 2; return Q(`Area of a trapezium is ${A} cm². Its parallel sides are ${a} cm and ${b} cm. Find the height (cm).`, h, [A / (a + b), h * 2, h + 2], `h = 2A ÷ (a + b) = ${2 * A} ÷ ${a + b} = ${h} cm.`); }
  ));

D('Circles: Circumference & Area', 'circumference and area of circle',
  'For a circle with radius r: <b>circumference C = 2πr</b> and <b>area A = πr²</b>. Use π = 22/7 or 3.14.',
  ['Diameter d = 2r, so C = πd.', 'π ≈ 22/7 — easy when r is a multiple of 7.', 'Area uses r², not d².', 'Semicircle perimeter = πr + 2r.'],
  'r = 14 cm: C = 2 × 22/7 × 14 = <b>88 cm</b>; A = 22/7 × 14 × 14 = <b>616 cm²</b>.',
  one(
    () => { const k = R(1, 6), r = 7 * k; return Q(`Circumference of a circle with radius ${r} cm (π = 22/7)?`, 44 * k, [154 * k * k, 22 * k, 88 * k], `2 × 22/7 × ${r} = ${44 * k} cm.`); },
    () => { const k = R(1, 5), r = 7 * k; return Q(`Area of a circle with radius ${r} cm (π = 22/7), in cm²?`, 154 * k * k, [44 * k, 154 * k, 616 * k * k], `22/7 × ${r} × ${r} = ${154 * k * k} cm².`); },
    () => { const k = R(1, 6); return Q(`The circumference of a circle is ${44 * k} cm. Find its radius (cm) (π = 22/7).`, 7 * k, [14 * k, 22 * k, 7 * k + 7], `r = C ÷ 2π = ${44 * k} × 7 / 44 = ${7 * k} cm.`); },
    () => { const k = R(1, 5), d = 14 * k; return Q(`Area of a circle with diameter ${d} cm (π = 22/7), in cm²?`, 154 * k * k, [616 * k * k, 44 * k, 308 * k * k], `r = ${7 * k}; area = 22/7 × ${7 * k}² = ${154 * k * k} cm².`); }
  ));

D('Paths, Borders & Combined Areas', 'area of path around rectangle',
  'For paths and borders, find the area of the outer shape and subtract the inner shape.',
  ['Path of width w outside an l × b field: outer is (l + 2w) × (b + 2w).', 'Path inside: inner is (l − 2w) × (b − 2w).', 'Cross paths through the middle: l·w + b·w − w².', 'Cost = area × rate.'],
  'Garden 20 m × 15 m with a 2 m path outside: outer 24 × 19 = 456, inner 300 → path = <b>156 m²</b>.',
  one(
    () => { const l = R(10, 40), b = R(8, 30), w = R(1, 3); const A = (l + 2 * w) * (b + 2 * w) - l * b; return Q(`A garden is ${l} m × ${b} m. A path ${w} m wide runs around it on the outside. Area of the path (m²)?`, A, [(l + w) * (b + w) - l * b, 2 * w * (l + b), A + 4 * w * w], `(${l + 2 * w} × ${b + 2 * w}) − (${l} × ${b}) = ${(l + 2 * w) * (b + 2 * w)} − ${l * b} = ${A} m².`); },
    () => { const l = R(15, 40), b = R(12, 30), w = R(1, 3); const A = l * w + b * w - w * w; return Q(`Two cross paths, each ${w} m wide, run through the middle of a ${l} m × ${b} m park (parallel to the sides). Total path area (m²)?`, A, [l * w + b * w, 2 * (l + b) * w, A + w], `${l}×${w} + ${b}×${w} − ${w}×${w} (the overlap) = ${A} m².`); },
    () => { const l = R(10, 30), b = R(10, 30), r = pick([5, 8, 10, 12, 15, 20]); return Q(`Cost of levelling a ${l} m × ${b} m field at ₹${r} per m² (₹)?`, l * b * r, [2 * (l + b) * r, l * b + r, l * b * r / 10], `Area ${l * b} m² × ₹${r} = ₹${l * b * r}.`); },
    () => { const d = R(6, 20) * 2, h1 = R(2, 10), h2 = R(2, 10); return Q(`A quadrilateral has a diagonal of ${d} cm, and perpendiculars from the other two vertices of ${h1} cm and ${h2} cm. Area (cm²)?`, d * (h1 + h2) / 2, [d * (h1 + h2), d * h1 * h2 / 2, (d + h1 + h2)], `½ × d × (h₁ + h₂) = ½ × ${d} × ${h1 + h2} = ${d * (h1 + h2) / 2} cm².`); }
  ));

const SOLIDS = [['cube', 6, 8, 12], ['cuboid', 6, 8, 12], ['triangular prism', 5, 6, 9], ['square pyramid', 5, 5, 8], ['triangular pyramid', 4, 4, 6], ['pentagonal prism', 7, 10, 15], ['hexagonal prism', 8, 12, 18], ['pentagonal pyramid', 6, 6, 10]];
D('Solid Shapes & Euler\'s Formula', 'faces edges vertices euler formula',
  'Solids (polyhedrons) have <b>faces</b> (flat surfaces), <b>edges</b> (where faces meet) and <b>vertices</b> (corners). Euler found they always satisfy <b>F + V − E = 2</b>.',
  ['Cube: F 6, V 8, E 12.', 'Triangular prism: F 5, V 6, E 9.', 'Square pyramid: F 5, V 5, E 8.', 'Euler: F + V − E = 2.'],
  'A polyhedron has 10 faces and 16 vertices → E = F + V − 2 = <b>24</b>.',
  one(
    () => { const s = pick(SOLIDS), w = pick([[1, 'faces'], [2, 'vertices'], [3, 'edges']]); return Q(`How many ${w[1]} does a ${s[0]} have?`, s[w[0]], [1, 2, 3].filter((i) => i !== w[0]).map((i) => s[i]).concat([s[w[0]] + 1]), `A ${s[0]} has ${s[1]} faces, ${s[2]} vertices and ${s[3]} edges.`); },
    () => { const f = R(5, 20), v = R(5, 20); return Q(`A polyhedron has ${f} faces and ${v} vertices. How many edges?`, f + v - 2, [f + v + 2, f + v, Math.abs(f - v) + 2], `F + V − E = 2 → E = ${f} + ${v} − 2 = ${f + v - 2}.`); },
    () => { const f = R(5, 20), e = R(f + 3, f + 18); return Q(`A polyhedron has ${f} faces and ${e} edges. How many vertices?`, e - f + 2, [e - f - 2, e + f - 2, e - f], `V = 2 + E − F = 2 + ${e} − ${f} = ${e - f + 2}.`); }
  ));

D('Surface Area: Cube & Cuboid', 'surface area of cube and cuboid',
  'Surface area is the total area of all faces — the amount of paper needed to wrap the solid.',
  ['Cuboid TSA = 2(lb + bh + hl).', 'Cuboid lateral (4 walls) = 2h(l + b).', 'Cube TSA = 6a²; lateral = 4a².', 'A room\'s walls = lateral surface area (no floor or roof).'],
  'Cuboid 10 × 8 × 5 cm: TSA = 2(80 + 40 + 50) = <b>340 cm²</b>. Cube of side 6 cm: 6 × 36 = <b>216 cm²</b>.',
  one(
    () => { const l = R(3, 20), b = R(2, 15), h = R(2, 12); return Q(`Total surface area of a cuboid ${l} cm × ${b} cm × ${h} cm (cm²)?`, 2 * (l * b + b * h + h * l), [l * b * h, l * b + b * h + h * l, 2 * h * (l + b)], `2(${l * b} + ${b * h} + ${h * l}) = ${2 * (l * b + b * h + h * l)} cm².`); },
    () => { const a = R(2, 20); return Q(`Total surface area of a cube of side ${a} cm (cm²)?`, 6 * a * a, [a ** 3, 4 * a * a, 12 * a], `6 × ${a}² = ${6 * a * a} cm².`); },
    () => { const l = R(4, 15), b = R(3, 12), h = R(3, 6); return Q(`A room is ${l} m × ${b} m × ${h} m high. Area of its four walls (m²)?`, 2 * h * (l + b), [2 * (l * b + b * h + h * l), l * b * h, h * (l + b)], `2h(l + b) = 2 × ${h} × ${l + b} = ${2 * h * (l + b)} m².`); },
    () => { const a = R(2, 15); return Q(`The total surface area of a cube is ${6 * a * a} cm². Find its side (cm).`, a, [a * a, a + 1, 6 * a], `a² = ${6 * a * a} ÷ 6 = ${a * a} → a = ${a} cm.`); }
  ));

D('Surface Area: Cylinder', 'surface area of cylinder',
  'Unroll the curved surface of a cylinder and you get a rectangle of length 2πr and height h.',
  ['Curved surface area (CSA) = 2πrh.', 'Total surface area (TSA) = 2πr(r + h).', 'Open at one end: 2πrh + πr².', 'Use π = 22/7 when r is a multiple of 7.'],
  'r = 7 cm, h = 10 cm: CSA = 2 × 22/7 × 7 × 10 = <b>440 cm²</b>; TSA = 2 × 22/7 × 7 × 17 = <b>748 cm²</b>.',
  one(
    () => { const k = R(1, 4), r = 7 * k, h = R(3, 25); return Q(`Curved surface area of a cylinder with r = ${r} cm, h = ${h} cm (π = 22/7), in cm²?`, 44 * k * h, [44 * k * (r + h), 154 * k * k * h, 22 * k * h], `2 × 22/7 × ${r} × ${h} = ${44 * k * h} cm².`); },
    () => { const k = R(1, 3), r = 7 * k, h = R(3, 25); return Q(`Total surface area of a closed cylinder with r = ${r} cm, h = ${h} cm (π = 22/7), in cm²?`, 44 * k * (r + h), [44 * k * h, 154 * k * k * h, 44 * k * (r + h) / 2], `2πr(r + h) = 2 × 22/7 × ${r} × ${r + h} = ${44 * k * (r + h)} cm².`); }
  ));

D('Volume & Capacity', 'volume of cube cuboid cylinder litres',
  '<b>Volume</b> is the space a solid occupies (in cubic units). <b>Capacity</b> is how much it can hold (litres).',
  ['Cuboid V = l × b × h. Cube V = a³.', 'Cylinder V = πr²h.', '1 L = 1000 cm³; 1 m³ = 1000 L.', 'Volume ratio of cubes = (side ratio)³.'],
  'Tank 2 m × 1.5 m × 1 m = 3 m³ = <b>3000 litres</b>. Cylinder r = 7, h = 10: V = 22/7 × 49 × 10 = <b>1540 cm³</b>.',
  one(
    () => { const l = R(3, 20), b = R(2, 15), h = R(2, 12); return Q(`Volume of a cuboid ${l} × ${b} × ${h} cm (cm³)?`, l * b * h, [2 * (l * b + b * h + h * l), l + b + h, l * b * h / 2], `${l} × ${b} × ${h} = ${l * b * h} cm³.`); },
    () => { const a = R(2, 15); return Q(`Volume of a cube of side ${a} cm (cm³)?`, a ** 3, [6 * a * a, a * a, 3 * a], `${a}³ = ${a ** 3} cm³.`); },
    () => { const k = R(1, 3), h = R(2, 20); return Q(`Volume of a cylinder with r = ${7 * k} cm and h = ${h} cm (π = 22/7), in cm³?`, 154 * k * k * h, [44 * k * h, 154 * k * h, 308 * k * k * h], `22/7 × ${7 * k}² × ${h} = ${154 * k * k * h} cm³.`); },
    () => { const l = R(1, 5), b = R(1, 4), h = R(1, 3); return Q(`A tank is ${l} m × ${b} m × ${h} m. How many litres can it hold?`, l * b * h * 1000, [l * b * h, l * b * h * 100, l * b * h * 10000], `${l * b * h} m³ × 1000 = ${l * b * h * 1000} L.`); }
  ));

D('Coordinates & Graphs', 'coordinate geometry introduction to graphs class 8',
  'A point is located by its coordinates (x, y): x is the horizontal distance from the y-axis, y is the vertical distance from the x-axis.',
  ['Quadrant I (+, +), II (−, +), III (−, −), IV (+, −).', 'Points on the x-axis have y = 0; on the y-axis x = 0.', 'Origin is (0, 0).', 'A point lies on a line if its coordinates satisfy the equation.'],
  '(−3, 5) is in <b>Quadrant II</b>. Does (2, 7) lie on y = 3x + 1? 3(2) + 1 = 7 ✓ <b>yes</b>.',
  one(
    () => { const x = nz(-9, 9), y = nz(-9, 9), qd = x > 0 ? (y > 0 ? 'I' : 'IV') : (y > 0 ? 'II' : 'III'); return Q(`In which quadrant does (${fmt(x)}, ${fmt(y)}) lie?`, 'Quadrant ' + qd, ['I', 'II', 'III', 'IV'].filter((z) => z !== qd).map((z) => 'Quadrant ' + z), `x is ${x > 0 ? 'positive' : 'negative'} and y is ${y > 0 ? 'positive' : 'negative'} → Quadrant ${qd}.`); },
    () => { const m = nz(-4, 4), c = R(-6, 6), x = nz(-5, 5); const pt = (a, b) => `(${fmt(a)}, ${fmt(b)})`; return Q(`Which point lies on the line y = ${px([c, m])}?`, pt(x, m * x + c), [pt(x, m * x + c + 1), pt(x + 1, m * x + c - 1), pt(m * x + c, x)], `Put x = ${fmt(x)}: y = ${p(m)}×${p(x)} + ${p(c)} = ${fmt(m * x + c)}.`); },
    () => { const y = R(-8, 8), a = R(-9, 4), b = R(a + 1, 10); return Q(`Distance between (${fmt(a)}, ${fmt(y)}) and (${fmt(b)}, ${fmt(y)})?`, b - a, [Math.abs(b + a), b - a + 1, Math.abs(y)], `Same y, so distance = |${fmt(b)} − ${p(a)}| = ${b - a}.`); },
    () => { const y = nz(-9, 9); return Q(`A point on the y-axis at distance ${Math.abs(y)} ${y > 0 ? 'above' : 'below'} the origin is:`, `(0, ${fmt(y)})`, [`(${fmt(y)}, 0)`, `(0, ${fmt(-y)})`, `(${fmt(y)}, ${fmt(y)})`], 'Points on the y-axis have x = 0.'); }
  ));

D('Data Handling: Mean, Median, Mode', 'mean median mode range',
  'These numbers summarise a data set. <b>Mean</b> = average, <b>median</b> = middle value, <b>mode</b> = most frequent, <b>range</b> = largest − smallest.',
  ['Mean = sum of values ÷ number of values.', 'Median: arrange in order first! Middle value (or average of two middle values).', 'Mode: the value that appears most often.', 'Range = maximum − minimum.'],
  'Data 4, 8, 6, 8, 9: mean = 35/5 = <b>7</b>; ordered 4, 6, 8, 8, 9 → median <b>8</b>; mode <b>8</b>; range 9 − 4 = <b>5</b>.',
  one(
    () => { let xs, m, n; do { n = R(4, 7); m = R(10, 60); xs = Array.from({ length: n - 1 }, () => m + R(-12, 12)); xs.push(n * m - xs.reduce((a, b) => a + b, 0)); } while (xs[n - 1] < 1); return Q(`Find the mean of: ${xs.join(', ')}`, m, [m + 1, xs.slice().sort((a, b) => a - b)[Math.floor(n / 2)], m - 2], `Sum ${n * m} ÷ ${n} = ${m}.`); },
    () => { const xs = Array.from({ length: pick([5, 7]) }, () => R(1, 60)); const s = xs.slice().sort((a, b) => a - b), md = s[(s.length - 1) / 2]; return Q(`Find the median of: ${xs.join(', ')}`, md, [xs[(xs.length - 1) / 2], s[(s.length - 1) / 2 + 1], Math.round(xs.reduce((a, b) => a + b) / xs.length)], `Arrange in order: ${s.join(', ')} → middle value ${md}.`); },
    () => { const mo = R(1, 30), others = shuffle(Array.from({ length: 30 }, (_, i) => i + 1).filter((v) => v !== mo)).slice(0, 4); const xs = shuffle([mo, mo, mo, ...others, others[0]]); return Q(`Find the mode of: ${xs.join(', ')}`, mo, [others[0], others[1], Math.max(...xs)], `${mo} appears 3 times — more than any other value.`); },
    () => { const xs = Array.from({ length: 6 }, () => R(5, 99)); return Q(`Find the range of: ${xs.join(', ')}`, Math.max(...xs) - Math.min(...xs), [Math.max(...xs), Math.max(...xs) + Math.min(...xs), xs[xs.length - 1] - xs[0] === Math.max(...xs) - Math.min(...xs) ? Math.max(...xs) - Math.min(...xs) + 1 : Math.abs(xs[xs.length - 1] - xs[0])], `${Math.max(...xs)} − ${Math.min(...xs)} = ${Math.max(...xs) - Math.min(...xs)}.`); }
  ));

D('Probability', 'probability class 8',
  '<b>Probability</b> measures how likely an event is: P(E) = (favourable outcomes) ÷ (total outcomes). It is always between 0 and 1.',
  ['P = 0 → impossible; P = 1 → certain.', 'Coin: 2 outcomes. Die: 6 outcomes. Deck: 52 cards (4 suits of 13; 26 red, 26 black; 12 face cards).', 'P(not E) = 1 − P(E).', 'Simplify the fraction.'],
  'A bag has 3 red, 5 blue and 2 green balls. P(blue) = 5/10 = <b>1/2</b>.',
  one(
    () => { const t = pick([['an even number', 3], ['a number greater than 4', 2], ['a prime number', 3], ['a multiple of 3', 2], ['the number 6', 1], ['a number less than 7', 6], ['the number 7', 0], ['an odd number', 3]]); return Q(`A die is rolled. P(${t[0]}) = ?`, fr(t[1], 6), [fr(t[1] + 1, 6), fr(6 - t[1], 6) === fr(t[1], 6) ? fr(1, 3) : fr(6 - t[1], 6), fr(t[1], 12)], `Favourable outcomes ${t[1]}, total 6 → ${fr(t[1], 6)}.`); },
    () => { const r = R(1, 9), b = R(1, 9), g = R(1, 9), T = r + b + g; return Q(`A bag has ${r} red, ${b} blue and ${g} green balls. P(red) = ?`, fr(r, T), [fr(r, b + g), fr(b, T), fr(r, T + 1)], `${r} red out of ${T} → ${fr(r, T)}.`); },
    () => { const t = pick([['a king', 4], ['a red card', 26], ['a heart', 13], ['a face card', 12], ['an ace of spades', 1], ['a black queen', 2]]); return Q(`A card is drawn from a well-shuffled deck of 52. P(${t[0]}) = ?`, fr(t[1], 52), [fr(t[1], 13), fr(52 - t[1], 52), fr(t[1] + 1, 52)], `${t[1]} favourable out of 52 → ${fr(t[1], 52)}.`); },
    () => { const n = R(1, 9), d = R(n + 1, 12); return Q(`If P(rain) = ${fr(n, d)}, what is P(no rain)?`, fr(d - n, d), [fr(n, d), fr(1, d), fr(d, d - n)], `1 − ${fr(n, d)} = ${fr(d - n, d)}.`); }
  ));

// ---------- Phase 6: Expert Challenges ----------
D('Pie Charts', 'pie chart central angle',
  'A <b>pie chart</b> shows parts of a whole as slices of a circle. The whole circle is 360°.',
  ['Central angle = (value ÷ total) × 360°.', 'Value = (angle ÷ 360°) × total.', 'All the angles add to 360°.', 'Percent → angle: × 3.6.'],
  'Out of 720 students, 180 like cricket → angle = 180/720 × 360° = <b>90°</b>.',
  one(
    () => { const T = pick([120, 240, 360, 480, 600, 720, 1200]), part = pick([1, 2, 3, 4, 5]) * T / 12; return Q(`In a survey of ${T} people, ${part} chose tea. Central angle for tea?`, deg(part / T * 360), [deg(Math.round(part / T * 100)), deg(part), deg(360 - part / T * 360)], `${part}/${T} × 360° = ${fmt(part / T * 360)}°.`); },
    () => { const T = pick([120, 240, 360, 600, 720, 1200]), ang = pick([30, 60, 90, 120, 150]); return Q(`A family spends ₹${T * 100} a month. The pie-chart angle for food is ${deg(ang)}. Spending on food (₹)?`, ang / 360 * T * 100, [ang * 100, T * 100 * ang / 100, (360 - ang) / 360 * T * 100], `${ang}/360 × ${T * 100} = ${fmt(ang / 360 * T * 100)}.`); },
    () => { const pc = pick([10, 15, 20, 25, 30, 40, 45]); return Q(`A slice represents ${pc}% of the data. Its central angle?`, deg(pc * 3.6), [deg(pc), deg(pc * 3.6 * 2), deg(360 - pc * 3.6)], `${pc}% of 360° = ${fmt(pc * 3.6)}°.`); }
  ));

D('Time & Work', 'time and work problems',
  'If A can finish a job in a days, A does <b>1/a</b> of the job each day. Add daily work rates when people work together.',
  ['One day\'s work = 1 ÷ (days needed).', 'Together: 1/a + 1/b; time = 1 ÷ (combined rate).', 'Shortcut for two people: ab/(a + b).', 'Pipes filling/emptying tanks work the same way (emptying is negative).'],
  'A takes 10 days, B takes 15 days. Together: 1/10 + 1/15 = 5/30 = 1/6 → <b>6 days</b>.',
  one(
    () => { const pr = pick([[3, 6, 2], [4, 12, 3], [6, 12, 4], [10, 15, 6], [12, 24, 8], [20, 30, 12], [6, 3, 2], [12, 4, 3], [15, 10, 6], [18, 9, 6], [20, 5, 4]]); return Q(`A can do a job in ${pr[0]} days and B in ${pr[1]} days. Together, how many days?`, pr[2], [(pr[0] + pr[1]) / 2, pr[0] + pr[1], pr[2] + 1], `1/${pr[0]} + 1/${pr[1]} = 1/${pr[2]} → ${pr[2]} days.`); },
    () => { const pr = pick([[6, 10, 15], [4, 6, 12], [8, 12, 24], [10, 15, 30], [12, 20, 30], [6, 9, 18]]); return Q(`A and B together finish a job in ${pr[0]} days. A alone takes ${pr[1]} days. How long does B alone take?`, pr[2], [pr[1] - pr[0], pr[1] + pr[0], pr[2] + 2], `1/${pr[0]} − 1/${pr[1]} = 1/${pr[2]} → ${pr[2]} days.`); },
    () => { const pr = pick([[4, 6, 12], [6, 8, 24], [3, 6, 6], [5, 10, 10], [8, 12, 24], [10, 15, 30]]); return Q(`Pipe A fills a tank in ${pr[0]} hours; pipe B empties it in ${pr[1]} hours. Both open — how many hours to fill?`, pr[2], [pr[0] * pr[1] / (pr[0] + pr[1]), pr[1] - pr[0], pr[2] / 2], `1/${pr[0]} − 1/${pr[1]} = 1/${pr[2]} → ${pr[2]} hours.`); }
  ));

D('Averages: Advanced', 'average problems tricks',
  'Average = total ÷ count. Many tricky problems become easy when you work with the <b>total</b>.',
  ['Total = average × count.', 'Average of first n natural numbers = (n + 1)/2.', 'Average of consecutive numbers = middle number.', 'If one value changes, the total changes by the same amount.'],
  'Average of 5 numbers is 20. One number is removed and the average becomes 18. Removed number = 100 − 72 = <b>28</b>.',
  one(
    () => { const n = R(5, 100); return Q(`Average of the first ${n} natural numbers?`, (n + 1) / 2, [n / 2, (n - 1) / 2, n * (n + 1) / 2], `(n + 1)/2 = ${fmt((n + 1) / 2)}.`); },
    () => { const n = R(4, 9), A = R(15, 50), B = A + nz(-4, 4); const x = n * A - (n - 1) * B; if (x <= 0) return Q(`Average of ${n} numbers is ${A}. Their total?`, n * A, [A + n, n * A + A]); return Q(`The average of ${n} numbers is ${A}. When one number is removed the average becomes ${B}. Which number was removed?`, x, [A - B, n * A, x + n], `Total ${n} × ${A} = ${n * A}; new total ${n - 1} × ${B} = ${(n - 1) * B}; removed = ${x}.`); },
    () => { const m = R(5, 40) * 2; return Q(`The average of three consecutive even numbers is ${m}. The largest is:`, m + 2, [m, m + 4, m + 1], `The middle number equals the average: ${m - 2}, ${m}, ${m + 2}.`); },
    () => { const n = R(5, 12), A = R(30, 70); return Q(`A batsman averages ${A} runs in ${n} innings. How many runs must he score in the next innings to raise his average by 1?`, A + n + 1, [A + 1, A + n, (n + 1) * (A + 1)], `New total ${(n + 1) * (A + 1)} − old total ${n * A} = ${A + n + 1}.`); }
  ));

D('Challenge: Exponents & Powers', 'exponents powers challenging problems',
  'Expert exponent problems: make the bases equal, then compare exponents. Find unit digits using repeating cycles.',
  ['If aᵐ = aⁿ (a ≠ 0, 1, −1), then m = n.', 'Rewrite bases: 4 = 2², 8 = 2³, 9 = 3², 27 = 3³, 25 = 5².', 'Unit digits of powers repeat in cycles of at most 4.', 'Simplify step by step using the laws.'],
  'Solve 8ˣ = 32: 2³ˣ = 2⁵ → 3x = 5 → x = 5/3. Find 2ˣ × 4 = 2⁷: 2ˣ⁺² = 2⁷ → <b>x = 5</b>.',
  one(
    () => { const b = pick([2, 3, 5]), a = R(1, 5), c = R(a + 2, a + 9); return Q(`Find x: ${b}${sup('x')} × ${b}${sup(a)} = ${b}${sup(c)}`, c - a, [c + a, c / a, c - a + 1], `x + ${a} = ${c} → x = ${c - a}.`); },
    () => { const t = pick([[4, 2, 2], [8, 2, 3], [9, 3, 2], [27, 3, 3], [25, 5, 2], [16, 2, 4]]), k = R(2, 4); return Q(`Find x: ${t[1]}${sup('x')} = ${t[0]}${sup(k)}`, t[2] * k, [t[2] + k, k, t[0] * k], `${t[0]} = ${t[1]}${sup(t[2])}, so ${t[0]}${sup(k)} = ${t[1]}${sup(t[2] * k)} → x = ${t[2] * k}.`); },
    () => { const b = pick([2, 3, 7, 8]), n = R(10, 99); const cyc = { 2: [2, 4, 8, 6], 3: [3, 9, 7, 1], 7: [7, 9, 3, 1], 8: [8, 4, 2, 6] }[b]; const u = cyc[(n - 1) % 4]; return Q(`What is the units digit of ${b}${sup(n)}?`, u, cyc.filter((d) => d !== u), `Units digits of powers of ${b} repeat in the cycle ${cyc.join(', ')}. ${n} ÷ 4 leaves remainder ${n % 4}, so take position ${((n - 1) % 4) + 1} of the cycle → ${u}.`); },
    () => { const a = R(2, 5), b = R(1, 4), c = R(1, 3); return Q(`Simplify: (2${sup(a)} × 4${sup(b)}) ÷ 8${sup(c)}`, fstr(F(2 ** Math.max(0, a + 2 * b - 3 * c), 2 ** Math.max(0, 3 * c - a - 2 * b))), [fmt(2 ** (a + b - c)), fmt(2 ** (a + 2 * b)), fstr(F(2 ** Math.max(0, a + 2 * b - 3 * c + 1), 2 ** Math.max(0, 3 * c - a - 2 * b - 1)))], `= 2${sup(a)} × 2${sup(2 * b)} ÷ 2${sup(3 * c)} = 2${sup(a + 2 * b - 3 * c)}.`); }
  ));

D('Challenge: Algebraic Identities', 'algebraic identities tricky problems',
  'Use identities to find values <b>without</b> finding the variables themselves.',
  ['a² + b² = (a + b)² − 2ab = (a − b)² + 2ab.', '(a + b)² − (a − b)² = 4ab.', 'x² + 1/x² = (x + 1/x)² − 2.', 'a² − b² = (a + b)(a − b).'],
  'If a + b = 9 and ab = 20: a² + b² = 81 − 40 = <b>41</b>. If x + 1/x = 5: x² + 1/x² = 25 − 2 = <b>23</b>.',
  one(
    () => { const s = R(3, 15), pp = R(2, 30); return Q(`If a + b = ${s} and ab = ${pp}, find a${sup(2)} + b${sup(2)}.`, s * s - 2 * pp, [s * s + 2 * pp, s * s - pp, s * s], `(a + b)² − 2ab = ${s * s} − ${2 * pp} = ${s * s - 2 * pp}.`); },
    () => { const d = R(1, 10), pp = R(2, 30); return Q(`If a − b = ${d} and ab = ${pp}, find a${sup(2)} + b${sup(2)}.`, d * d + 2 * pp, [d * d - 2 * pp, d * d + pp, d * d], `(a − b)² + 2ab = ${d * d} + ${2 * pp} = ${d * d + 2 * pp}.`); },
    () => { const k = R(2, 12); return Q(`If x + 1/x = ${k}, find x${sup(2)} + 1/x${sup(2)}.`, k * k - 2, [k * k, k * k + 2, 2 * k], `(x + 1/x)² − 2 = ${k * k} − 2 = ${k * k - 2}.`); },
    () => { const s = R(5, 50), d = R(1, 20); return Q(`If a + b = ${s} and a − b = ${d}, find a${sup(2)} − b${sup(2)}.`, s * d, [s * s - d * d, s + d, s * s], `(a + b)(a − b) = ${s} × ${d} = ${s * d}.`); }
  ));

D('Challenge: Equation Puzzles', 'linear equations puzzles digits coins ages',
  'Tougher word problems: digits, coins and ages. Choose the unknown wisely and form the equation carefully.',
  ['Two-digit number with tens t and ones u = 10t + u; reversed = 10u + t.', 'Coins: value = (number of coins) × (coin value).', 'Ages: x years ago → subtract x from every age.', 'Check the answer satisfies every condition.'],
  'Digits sum to 9; reversing adds 27 → u − t = 3, u + t = 9 → t = 3, u = 6 → <b>36</b> (63 − 36 = 27 ✓).',
  one(
    () => { const t = R(1, 8), u = R(t + 1, 9); return Q(`The digits of a two-digit number add up to ${t + u}. Reversing the digits increases the number by ${9 * (u - t)}. Find the number.`, 10 * t + u, [10 * u + t, 10 * t + u + 9, t + u], `u − t = ${u - t}, u + t = ${t + u} → t = ${t}, u = ${u} → ${10 * t + u}.`); },
    () => { const a = R(5, 25), b = R(5, 25); return Q(`A purse has ${a + b} coins of ₹2 and ₹5, worth ₹${2 * a + 5 * b} in all. How many ₹5 coins?`, b, [a, b + 1, Math.round((2 * a + 5 * b) / 5)], `Let ₹5 coins = x: 2(${a + b} − x) + 5x = ${2 * a + 5 * b} → 3x = ${3 * b} → x = ${b}.`); },
    () => { const s = R(4, 12), k = R(2, 4), y = R(2, 6); return Q(`${y} years ago, a mother was ${k} times as old as her daughter. Now the daughter is ${s + y}. How old is the mother now?`, k * s + y, [k * (s + y), k * s, k * s + 2 * y], `${y} years ago: daughter ${s}, mother ${k} × ${s} = ${k * s}; now mother = ${k * s} + ${y} = ${k * s + y}.`); },
    () => { const x = R(5, 40), k = R(3, 9); return Q(`A number exceeds its ${['', '', 'half', 'one-third', 'one-fourth', 'one-fifth', 'one-sixth', 'one-seventh', 'one-eighth', 'one-ninth'][k]} by ${x * (k - 1)}. Find the number.`, x * k, [x * (k - 1), x, x * k + k], `n − n/${k} = ${x * (k - 1)} → n(${k - 1}/${k}) = ${x * (k - 1)} → n = ${x * k}.`); }
  ));

D('Challenge: Commercial Maths', 'successive discount compound interest half yearly',
  'Combine percentages: successive discounts, mark-up then discount, and half-yearly compounding.',
  ['Two discounts a% and b% = single discount of (a + b − ab/100)%.', 'Mark up m% then discount d%: SP = CP × (1 + m/100)(1 − d/100).', 'Half-yearly CI: rate R/2, time 2n half-years.', 'Successive changes multiply, they don\'t add.'],
  'Discounts of 20% then 10% = 20 + 10 − 2 = <b>28%</b>, not 30%.',
  one(
    () => { const a = pick([10, 20, 25, 30]), b = pick([5, 10, 20]); return Q(`Successive discounts of ${a}% and ${b}% equal a single discount of:`, fmt(a + b - a * b / 100) + '%', [`${a + b}%`, `${fmt(a + b - a * b / 100 - 1)}%`, `${fmt((a + b) / 2)}%`], `${a} + ${b} − (${a}×${b})/100 = ${fmt(a + b - a * b / 100)}%.`); },
    () => { const m = pick([20, 25, 40, 50]), d = pick([10, 20]); const pct = Math.round(((1 + m / 100) * (1 - d / 100) - 1) * 10000) / 100; return Q(`A trader marks goods ${m}% above cost and gives ${d}% discount. Profit %?`, fmt(pct) + '%', [`${m - d}%`, `${m}%`, `${fmt(pct + 2)}%`], `(1 + ${m}/100)(1 − ${d}/100) = ${fmt(1 + pct / 100)} → ${fmt(pct)}%.`); },
    () => { const P = R(1, 20) * 1000, r = pick([10, 20]); const A = P * (1 + r / 200) ** 2; return Q(`Amount on ${rs(P)} at ${r}% per annum for 1 year, compounded half-yearly (₹)?`, A, [P * (1 + r / 100), P * (1 + r / 200), A + P * r / 1000], `Rate ${r / 2}% per half-year, 2 periods: ${P} × (${fmt(1 + r / 200)})² = ${fmt(A)}.`); },
    () => { const cp = R(2, 20) * 100, g = pick([10, 20, 25]), l = pick([10, 20]); return Q(`A shopkeeper sells two items at ${rs(cp * (100 + g) / 100)} (gain ${g}%) and ${rs(cp * (100 - l) / 100)} (loss ${l}%), each costing ${rs(cp)}. Overall profit or loss (₹)?`, g === l ? 'No profit, no loss' : (g > l ? 'Profit ₹' : 'Loss ₹') + fmt(Math.abs(g - l) * cp / 100), [`Profit ₹${fmt((g + l) * cp / 100)}`, `Loss ₹${fmt((g + l) * cp / 100)}`, g === l ? `Profit ₹${cp / 10}` : 'No profit, no loss'], `Total CP ${2 * cp}, total SP ${fmt(cp * (200 + g - l) / 100)}.`); }
  ));

D('Challenge: Mensuration', 'mensuration challenging problems class 8',
  'Expert mensuration combines formulas and unit conversions in real-world settings.',
  ['Number of small cubes in a box = box volume ÷ cube volume (if sides divide evenly).', 'Painting cost = area × rate; tank capacity = volume in litres.', 'If side is doubled, area × 4, volume × 8.', 'Always check units: cm vs m.'],
  'How many 2 cm cubes fit in a 10 × 8 × 6 cm box? (10/2)(8/2)(6/2) = 5 × 4 × 3 = <b>60</b>.',
  one(
    () => { const a = R(1, 4), k = [R(2, 6), R(2, 6), R(2, 6)]; return Q(`How many cubes of side ${a} cm fit in a box ${k.map((v) => v * a).join(' cm × ')} cm?`, k[0] * k[1] * k[2], [k[0] * k[1] * k[2] * a, (k[0] + k[1] + k[2]), k[0] * k[1] * k[2] * a * a], `(${k[0] * a}/${a}) × (${k[1] * a}/${a}) × (${k[2] * a}/${a}) = ${k[0] * k[1] * k[2]}.`); },
    () => { const t = pick([['doubled', 2], ['tripled', 3]]), w = pick([['volume', 3], ['surface area', 2]]); return Q(`If the side of a cube is ${t[0]}, its ${w[0]} becomes how many times?`, t[1] ** w[1], [t[1], t[1] ** (5 - w[1]), t[1] * 2 + 1], `${w[0]} depends on side${w[1] === 3 ? '³' : '²'} → ${t[1]}${w[1] === 3 ? '³' : '²'} = ${t[1] ** w[1]}.`); },
    () => { const l = R(4, 12), b = R(3, 10), h = R(3, 5), r = pick([10, 15, 20, 25]); return Q(`Cost of painting the four walls of a room ${l} m × ${b} m × ${h} m at ₹${r} per m² (₹)?`, 2 * h * (l + b) * r, [2 * (l * b + b * h + h * l) * r, l * b * h * r, h * (l + b) * r], `Walls = 2 × ${h} × ${l + b} = ${2 * h * (l + b)} m² → × ₹${r} = ₹${2 * h * (l + b) * r}.`); },
    () => { const a = R(2, 12); return Q(`A cube has total surface area ${6 * a * a} cm². Find its volume (cm³).`, a ** 3, [a * a, 6 * a ** 3, a ** 3 + a], `a² = ${a * a} → a = ${a} → V = ${a ** 3} cm³.`); },
    () => { const k = R(1, 3), h = R(1, 4) * 10; const v = 154 * k * k * h; return Q(`A cylindrical drum has radius ${7 * k} cm and height ${h} cm. How many litres of water can it hold? (π = 22/7)`, v / 1000, [v, v / 100, v / 10000], `V = 22/7 × ${7 * k}² × ${h} = ${v} cm³ = ${fmt(v / 1000)} L.`); }
  ));

D('Challenge: Geometry Reasoning', 'geometry angle problems polygons challenge',
  'Combine several angle facts in one problem. Draw a rough sketch and mark what you know.',
  ['Interior + exterior = 180°; exterior = 360°/n.', 'If interior = k × exterior, then exterior = 180°/(k + 1).', 'Use the angle sum of triangles inside bigger figures.', 'Parallel line angle pairs often unlock the problem.'],
  'Each interior angle of a regular polygon is 3 times its exterior angle → exterior = 180/4 = 45° → n = 360/45 = <b>8</b>.',
  one(
    () => { const k = R(1, 9); return Q(`Each interior angle of a regular polygon is ${k === 1 ? 'equal to' : k + ' times'} its exterior angle. How many sides?`, 2 * (k + 1), [k + 2, 2 * k, 360 / (k + 1) | 0], `Exterior = 180/(${k}+1) = ${fmt(180 / (k + 1))}° → n = 360 ÷ ${fmt(180 / (k + 1))} = ${2 * (k + 1)}.`); },
    () => { const a = R(30, 70), b = R(30, 70); return Q(`In △ABC, ∠A = ${deg(a)}, ∠B = ${deg(b)}. Side BC is extended to D. Find ∠ACD.`, deg(a + b), [deg(180 - a - b), deg(a), deg(360 - a - b)], `Exterior angle = sum of opposite interior angles = ${a + b}°.`); },
    () => { const n = pick([5, 6, 8, 10, 12]); return Q(`The sum of interior angles of a regular polygon is ${(n - 2) * 180}°. Find each exterior angle.`, deg(360 / n), [deg((n - 2) * 180 / n), deg(180 / n), deg(360 / (n - 2))], `n − 2 = ${(n - 2) * 180}/180 → n = ${n}; exterior = 360/${n} = ${fmt(360 / n)}°.`); },
    () => { const x = R(10, 30), a = R(2, 4), b = R(1, 3); const s = 180 - (a + b) * x; if (s <= 0) return Q(`Two angles of a triangle are ${deg(x)} and ${deg(2 * x)}. Third?`, deg(180 - 3 * x), [deg(3 * x)]); return Q(`The angles of a triangle are ${a}x, ${b === 1 ? '' : b}x and ${deg(s)}. Find x.`, deg(x), [deg((180 - s) / a), deg(x + 5), deg(s / (a + b))], `${a + b}x + ${s} = 180 → x = ${x}°.`); }
  ));

D('Olympiad-Style Reasoning', 'maths olympiad class 8 problems',
  'Olympiad problems reward clever thinking over long calculation. Look for patterns, counting tricks and shortcuts.',
  ['1 + 2 + … + n = n(n + 1)/2.', 'Handshakes among n people = n(n − 1)/2.', 'Trailing zeros of n! = ⌊n/5⌋ + ⌊n/25⌋.', 'Count multiples of m from a to b: ⌊b/m⌋ − ⌊(a − 1)/m⌋.'],
  '1 + 2 + … + 50 = 50 × 51 / 2 = <b>1275</b>. Zeros at the end of 30! = 6 + 1 = <b>7</b>.',
  one(
    () => { const n = R(10, 100); return Q(`1 + 2 + 3 + … + ${n} = ?`, n * (n + 1) / 2, [n * n / 2, n * (n - 1) / 2, n * (n + 1)], `n(n + 1)/2 = ${n} × ${n + 1}/2 = ${n * (n + 1) / 2}.`); },
    () => { const n = R(5, 30); return Q(`At a party, each of ${n} people shakes hands once with every other person. Total handshakes?`, n * (n - 1) / 2, [n * (n - 1), n * n, n * (n + 1) / 2], `n(n − 1)/2 = ${n * (n - 1) / 2}.`); },
    () => { const n = R(10, 100); const z = Math.floor(n / 5) + Math.floor(n / 25); return Q(`How many zeros are at the end of ${n}! (${n} factorial)?`, z, [Math.floor(n / 5), Math.floor(n / 10), z + 1].filter((v) => v !== z).concat([z + 2]), `⌊${n}/5⌋ + ⌊${n}/25⌋ = ${Math.floor(n / 5)} + ${Math.floor(n / 25)} = ${z}.`); },
    () => { const m = R(3, 13); const c = Math.floor(99 / m) - Math.floor(9 / m); return Q(`How many two-digit numbers are divisible by ${m}?`, c, [c + 1, Math.floor(99 / m), c - 1].filter((v) => v !== c), `⌊99/${m}⌋ − ⌊9/${m}⌋ = ${Math.floor(99 / m)} − ${Math.floor(9 / m)} = ${c}.`); },
    () => { const n = R(3, 12); return Q(`What is the sum of the first ${n} even numbers (2 + 4 + … )?`, n * (n + 1), [n * n, 2 * n, n * (n + 1) / 2], `2(1 + 2 + … + ${n}) = n(n + 1) = ${n * (n + 1)}.`); }
  ));

D('Grand Mock Test 1', 'class 8 maths full revision',
  'A full mock test covering Days 1–44: arithmetic, number system and algebra. Treat it like an exam — 20 minutes, no calculator.',
  ['Read each question twice.', 'Skip and come back to hard ones.', 'Eliminate obviously wrong options.', 'Review explanations for every wrong answer.'],
  'Target: 8/10 or more means you are exam-ready in these topics.',
  [1, 44]);

D('Grand Final Test', 'class 8 maths final exam practice',
  'The final challenge! Questions from Days 45–88: equations, commercial maths, geometry, mensuration, data and expert challenges. Score 8+ and you have mastered Class 8 maths!',
  ['Use every trick you have learnt.', 'Draw rough figures for geometry.', 'Check units in mensuration.', 'Stay calm and manage your time.'],
  'Congratulations on reaching Day 90! Retake any test to keep your skills sharp.',
  [45, 88]);

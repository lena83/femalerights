// "Her Money" page: history timeline, small charts and the pension calculator.
// Every figure here is cited in the page next to where it is shown.
(function () {
  const $ = (id) => document.getElementById(id);
  const gbp = (n) => "£" + Math.round(n).toLocaleString("en-GB");

  // ---------- History timeline ----------
  const HISTORY = [
    [1870, "Married women may keep the money they earn (Married Women's Property Act)."],
    [1882, "Married women may own property in their own name."],
    [1919, "Women can become lawyers, accountants and civil servants (Sex Disqualification (Removal) Act)."],
    [1946, "The civil service stops sacking women when they marry."],
    [1970, "Equal Pay Act: paying a woman less for the same work becomes illegal."],
    [1975, "Sex Discrimination Act: banks can no longer demand a man's signature before lending to a woman."],
    [1977, "Married women can no longer choose the 'small stamp', a reduced National Insurance rate that left many with almost no pension of their own."],
    [1990, "Wives are taxed separately. Before this, a wife's income counted as her husband's on his tax return."],
    [2000, "Courts can split a pension between divorcing partners."],
    [2012, "Automatic enrolment begins: employers must put workers into a workplace pension."],
    [2015, "Shared parental leave lets parents split time off after a birth."],
    [2016, "The new State Pension is based on each person's own record, not her husband's."],
    [2017, "Employers with 250 or more staff must publish their gender pay gap."]
  ];
  $("timeline").innerHTML = HISTORY.map(([y, t]) => `<li><span class="yr">${y}</span><span>${t}</span></li>`).join("");

  // ---------- Bar helpers ----------
  function bars(el, rows, max, unit) {
    $(el).innerHTML = rows.map((r) => `<div class="bar-row">
      <div class="bar-label"><span>${r.label}</span><b>${r.text || (unit === "£" ? gbp(r.value) : r.value + unit)}</b></div>
      <div class="bar-track"><div class="bar-fill${r.men ? " men" : ""}" style="width:${(r.value / max * 100).toFixed(1)}%"></div></div>
    </div>`).join("");
  }

  // IFS 2016: "over 10%" before the first child, "about a third" 12 years after.
  bars("childBars", [
    { label: "Before the first child", value: 10, text: "over 10%" },
    { label: "12 years after the first child", value: 33, text: "about 33%" }
  ], 40, "%");

  // DWP 2025, ages 55–59, median private pension wealth.
  bars("potBars", [
    { label: "Women", value: 81000 },
    { label: "Men", value: 156000, men: true }
  ], 160000, "£");

  // Legal & General 2025 survey.
  bars("divorceBars", [
    { label: "Women", value: 50 },
    { label: "Men", value: 30, men: true }
  ], 60, "%");

  // Women's Budget Group analysis of ONS Wealth and Assets Survey 2018–20.
  bars("wealthBars", [
    { label: "All adults", value: 35 },
    { label: "By age 64", value: 42 }
  ], 50, "%");

  // ---------- Pay gap chart (only years with a published ONS figure) ----------
  (function payChart() {
    const pts = [[1997, 17.4], [2018, 8.6], [2019, 8.9], [2022, 7.6], [2023, 7.7], [2024, 7.1], [2025, 6.9]];
    const W = 520, H = 260, L = 36, R = 16, T = 16, B = 30;
    const x = (yr) => L + (yr - 1995) / (2026 - 1995) * (W - L - R);
    const y = (v) => T + (1 - v / 20) * (H - T - B);
    const out = [];
    for (let v = 0; v <= 20; v += 5) {
      out.push(`<line class="grid" x1="${L}" x2="${W - R}" y1="${y(v)}" y2="${y(v)}"/><text x="${L - 6}" y="${y(v) + 4}" text-anchor="end">${v}%</text>`);
    }
    [1997, 2005, 2015, 2025].forEach((yr) => out.push(`<text x="${x(yr)}" y="${H - 8}" text-anchor="middle">${yr}</text>`));
    out.push(`<path d="M${pts.map((p) => x(p[0]).toFixed(1) + "," + y(p[1]).toFixed(1)).join(" L")}" fill="none" style="stroke:var(--accent)" stroke-width="2.5"/>`);
    pts.forEach((p) => out.push(`<circle cx="${x(p[0])}" cy="${y(p[1])}" r="4" style="fill:var(--accent);stroke:var(--surface)" stroke-width="2"><title>${p[0]}: ${p[1]}%</title></circle>`));
    out.push(`<text class="val" x="${x(1997) + 8}" y="${y(17.4) - 6}">17.4%</text>`);
    out.push(`<text class="val" x="${x(2025)}" y="${y(6.9) - 10}" text-anchor="end">6.9%</text>`);
    $("payChart").innerHTML = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Line chart: full-time gender pay gap fell from 17.4% in 1997 to 6.9% in 2025">${out.join("")}</svg>`;
  })();

  // ---------- Pension calculator ----------
  const START = 22, RETIRE = 67, GROWTH = 0.015, RETURN = 0.03, RATE = 0.08, LOW = 6240, HIGH = 50270;

  // Returns the pot at each age from 22 to 67.
  function simulate(salary, breakAge, breakYears, ptYears, ptShare) {
    let pot = 0, pay = salary;
    const path = [];
    for (let age = START; age < RETIRE; age++) {
      const onBreak = age >= breakAge && age < breakAge + breakYears;
      const partTime = age >= breakAge + breakYears && age < breakAge + breakYears + ptYears;
      const earned = onBreak ? 0 : pay * (partTime ? ptShare : 1);
      const qualifying = Math.max(0, Math.min(earned, HIGH) - LOW);
      pot = pot * (1 + RETURN) + qualifying * RATE;
      path.push([age, pot]);
      // Pay keeps rising with experience, but not during a break or part-time years
      // (the IFS found part-time work brings little wage progression).
      if (!onBreak && !partTime) pay *= 1 + GROWTH;
    }
    path.push([RETIRE, pot]);
    return path;
  }

  const inputs = ["salary", "breakAge", "breakYears", "ptYears", "ptShare"];
  function update() {
    const v = Object.fromEntries(inputs.map((k) => [k, +$(k).value]));
    $("salaryOut").textContent = gbp(v.salary);
    $("breakAgeOut").textContent = v.breakAge;
    $("breakYearsOut").textContent = v.breakYears + (v.breakYears === 1 ? " year" : " years");
    $("ptYearsOut").textContent = v.ptYears + (v.ptYears === 1 ? " year" : " years");
    $("ptShareOut").textContent = v.ptShare + "%";
    const full = simulate(v.salary, 99, 0, 0, 1);
    const you = simulate(v.salary, v.breakAge, v.breakYears, v.ptYears, v.ptShare / 100);
    const a = full[full.length - 1][1], b = you[you.length - 1][1];
    $("potFull").textContent = gbp(a);
    $("potYou").textContent = gbp(b);
    $("potDiff").textContent = a - b >= 1 ? `−${gbp(a - b)} (${Math.round((a - b) / a * 100)}%)` : "£0";
    drawCalc(full, you, v);
  }

  function drawCalc(full, you, v) {
    const W = 560, H = 240, L = 58, R = 16, T = 14, B = 30;
    const max = Math.max(...full.map((p) => p[1])) * 1.05 || 1;
    const x = (age) => L + (age - START) / (RETIRE - START) * (W - L - R);
    const y = (val) => T + (1 - val / max) * (H - T - B);
    const out = [];
    const b0 = v.breakAge, b1 = Math.min(RETIRE, v.breakAge + v.breakYears + v.ptYears);
    if (b1 > b0) out.push(`<rect class="break-band" x="${x(b0)}" y="${T}" width="${x(b1) - x(b0)}" height="${H - T - B}"/>`);
    const step = max > 300000 ? 100000 : max > 120000 ? 50000 : 25000;
    for (let g = 0; g <= max; g += step) {
      out.push(`<line class="grid" x1="${L}" x2="${W - R}" y1="${y(g)}" y2="${y(g)}"/><text x="${L - 6}" y="${y(g) + 4}" text-anchor="end">${g === 0 ? "£0" : "£" + g / 1000 + "k"}</text>`);
    }
    [22, 30, 40, 50, 60, 67].forEach((age) => out.push(`<text x="${x(age)}" y="${H - 8}" text-anchor="middle">${age}</text>`));
    const line = (p) => "M" + p.map((q) => x(q[0]).toFixed(1) + "," + y(q[1]).toFixed(1)).join(" L");
    out.push(`<path class="series line-full" d="${line(full)}"/><path class="series line-you" d="${line(you)}"/>`);
    out.push(`<text class="lg" x="${L + 8}" y="${T + 12}" style="fill:var(--men)">— No break</text>`);
    out.push(`<text class="lg" x="${L + 8}" y="${T + 28}" style="fill:var(--women)">— With your choices</text>`);
    if (b1 > b0) out.push(`<text x="${(x(b0) + x(b1)) / 2}" y="${H - B - 6}" text-anchor="middle">break + part time</text>`);
    $("calcChart").innerHTML = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Pension pot by age, with and without a career break">${out.join("")}</svg>`;
  }

  inputs.forEach((k) => $(k).addEventListener("input", update));
  update();
})();

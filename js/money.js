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

  // Spread over expected years of life at 65 (ONS life tables 2021–23: women 21.0, men 18.5).
  const perW = 81000 / 21.0, perM = 156000 / 18.5;
  $("perYearW").textContent = gbp(Math.round(perW / 100) * 100);
  $("perYearM").textContent = gbp(Math.round(perM / 100) * 100);
  bars("perYearBars", [
    { label: "Women: £81,000 over 21 years", value: perW, text: gbp(Math.round(perW / 100) * 100) + " a year" },
    { label: "Men: £156,000 over 18.5 years", value: perM, men: true, text: gbp(Math.round(perM / 100) * 100) + " a year" }
  ], perM * 1.05, "£");

  // DWP HBAI 2022/23 via Age UK (2024): relative poverty after housing costs.
  bars("povertyBars", [
    { label: "Single women", value: 23 },
    { label: "Single men", value: 20, men: true },
    { label: "Couples", value: 13, men: true },
    { label: "All pensioners", value: 16, men: true }
  ], 30, "%");

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

  // HMRC ISA statistics via AJ Bell (2025): share of ISA subscribers choosing stocks and shares.
  bars("isaBars", [
    { label: "Women", value: 31 },
    { label: "Men", value: 44, men: true }
  ], 50, "%");

  // ---------- Savings and investment calculator ----------
  // A starting amount plus monthly payments, growing at a steady yearly return (in today's money).
  function grow(startAge, endAge, initial, monthly, rate) {
    const m = Math.pow(1 + rate, 1 / 12) - 1;
    let pot = initial, paid = initial;
    const path = [[startAge, pot, paid]];
    for (let age = startAge; age < endAge; age++) {
      for (let i = 0; i < 12; i++) { pot = (pot + monthly) * (1 + m); paid += monthly; }
      path.push([age + 1, pot, paid]);
    }
    return path;
  }

  const inv = ["invStart", "invEnd", "invInitial", "invMonthly", "invReturn"];
  const PRESET_NOTES = {
    1: "<b>Cash savings:</b> a savings account or Cash ISA. Your money can't fall in value, but it usually grows only a little faster than prices.",
    3: "<b>Mixed fund:</b> a fund holding both shares and bonds (loans to governments and companies). It usually rises and falls less than shares alone.",
    5: "<b>Global index ETF:</b> an exchange-traded fund that follows an index of thousands of companies around the world, such as the MSCI World or FTSE All-World. You can hold one in a Stocks and Shares ISA or a pension. Fees are usually low, but its value can drop sharply in a bad year."
  };
  function updateInvest() {
    let start = +$("invStart").value, end = +$("invEnd").value;
    if (end <= start) { end = Math.min(75, start + 1); $("invEnd").value = end; }
    const initial = +$("invInitial").value, monthly = +$("invMonthly").value, rate = +$("invReturn").value / 100;
    $("invStartOut").textContent = start;
    $("invEndOut").textContent = end;
    $("invInitialOut").textContent = gbp(initial);
    $("invMonthlyOut").textContent = gbp(monthly);
    $("presetNote").innerHTML = PRESET_NOTES[+$("invReturn").value] || "A return you chose. Try the buttons above to compare cash, a mixed fund and a global ETF.";
    $("invReturnOut").textContent = $("invReturn").value + "%";
    document.querySelectorAll(".presets button").forEach((btn) => btn.setAttribute("aria-pressed", String(+btn.dataset.r === +$("invReturn").value)));
    const path = grow(start, end, initial, monthly, rate);
    const [, total, paid] = path[path.length - 1];
    $("invPaid").textContent = gbp(paid);
    $("invGrowth").textContent = gbp(total - paid);
    $("invTotalLabel").textContent = "At " + end;
    $("invTotal").textContent = gbp(total);
    let late = null;
    if (start + 10 < end) {
      late = grow(start + 10, end, initial, monthly, rate);
      const lateTotal = late[late.length - 1][1];
      $("invLate").innerHTML = `If you started 10 years later, at ${start + 10}, you would have about <strong>${gbp(lateTotal)}</strong>, ${gbp(total - lateTotal)} less.`;
    } else {
      $("invLate").textContent = "";
    }
    drawInvest(path, late, start, end);
  }

  function drawInvest(path, late, start, end) {
    const W = 560, H = 250, L = 58, R = 16, T = 14, B = 30;
    const max = Math.max(1, path[path.length - 1][1]) * 1.06;
    const x = (age) => L + (age - start) / (end - start) * (W - L - R);
    const y = (val) => T + (1 - val / max) * (H - T - B);
    const out = [];
    const nice = [1000, 2000, 5000, 10000, 20000, 50000, 100000, 200000, 500000, 1000000];
    const step = nice.find((n) => max / n <= 5) || 2000000;
    for (let g = 0; g <= max; g += step) {
      const lbl = g === 0 ? "£0" : g >= 1000000 ? "£" + g / 1000000 + "m" : "£" + g / 1000 + "k";
      out.push(`<line class="grid" x1="${L}" x2="${W - R}" y1="${y(g)}" y2="${y(g)}"/><text x="${L - 6}" y="${y(g) + 4}" text-anchor="end">${lbl}</text>`);
    }
    const span = end - start, tick = span > 30 ? 10 : span > 12 ? 5 : span > 6 ? 2 : 1;
    for (let a = start; a <= end; a += tick) out.push(`<text x="${x(a)}" y="${H - 8}" text-anchor="middle">${a}</text>`);
    if ((end - start) % tick) out.push(`<text x="${x(end)}" y="${H - 8}" text-anchor="middle">${end}</text>`);
    const pts = (i) => path.map((p) => x(p[0]).toFixed(1) + "," + y(p[i]).toFixed(1)).join(" L");
    const base = `L${x(end).toFixed(1)},${y(0)} L${x(start).toFixed(1)},${y(0)} Z`;
    out.push(`<path class="area-growth" d="M${pts(1)} ${base}"/>`);
    out.push(`<path class="area-paid" d="M${pts(2)} ${base}"/>`);
    out.push(`<path class="series line-you" d="M${pts(1)}"/>`);
    if (late) out.push(`<path class="series line-late" d="M${late.map((p) => x(p[0]).toFixed(1) + "," + y(p[1]).toFixed(1)).join(" L")}"/>`);
    $("investLegend").innerHTML = `<span><i class="sw sw-growth"></i>Growth</span><span><i class="sw sw-paid"></i>Money you paid in</span>` +
      (late ? `<span><i class="sw sw-late"></i>Starting 10 years later</span>` : "");
    $("investChart").innerHTML = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Savings growth by age, split into money paid in and growth">${out.join("")}</svg>`;
  }

  inv.forEach((k) => $(k).addEventListener("input", updateInvest));
  document.querySelectorAll(".presets button").forEach((btn) => btn.addEventListener("click", () => {
    $("invReturn").value = btn.dataset.r;
    updateInvest();
  }));
  updateInvest();

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

  // ---------- Pension calculator (with optional career break) ----------
  const STATE_PENSION = 230.25 * 52;
  const pIn = ["pAge", "pRetire", "pSalary", "pRaise", "pYou", "pEmp", "pPot", "pGrowth", "breakAge", "breakYears", "ptYears", "ptShare"];

  // Pot at each age. Nothing goes in during a break; pay stops rising during the break and part-time years.
  function pensionPath(v, retire, brk) {
    let pot = v.pPot, pay = v.pSalary;
    const r = v.pGrowth / 100, share = (v.pYou + v.pEmp) / 100;
    const path = [[v.pAge, pot]];
    for (let age = v.pAge; age < retire; age++) {
      const off = brk && age >= v.breakAge && age < v.breakAge + v.breakYears;
      const pt = brk && age >= v.breakAge + v.breakYears && age < v.breakAge + v.breakYears + v.ptYears;
      const earned = off ? 0 : pay * (pt ? v.ptShare / 100 : 1);
      pot = pot * (1 + r) + earned * share;
      if (!off && !pt) pay *= 1 + v.pRaise / 100;
      path.push([age + 1, pot]);
    }
    return { path, pot, pay };
  }

  function updatePension() {
    const v = Object.fromEntries(pIn.map((k) => [k, +$(k).value]));
    const retire = Math.max(v.pRetire, v.pAge + 1);
    // A break can only start after "age now".
    if (v.breakAge < v.pAge) { v.breakAge = v.pAge; $("breakAge").value = v.pAge; }
    const brkOn = $("pBreakOn").checked && v.breakYears + v.ptYears > 0;
    $("breakFields").hidden = !$("pBreakOn").checked;
    $("pAgeOut").textContent = v.pAge;
    $("pRetireOut").textContent = retire;
    $("pSalaryOut").textContent = gbp(v.pSalary);
    $("pRaiseOut").textContent = v.pRaise + "%";
    $("pYouOut").textContent = v.pYou + "%";
    $("pEmpOut").textContent = v.pEmp + "%";
    $("pPotOut").textContent = gbp(v.pPot);
    $("pGrowthOut").textContent = v.pGrowth + "%";
    $("breakAgeOut").textContent = v.breakAge;
    $("breakYearsOut").textContent = v.breakYears + (v.breakYears === 1 ? " year" : " years");
    $("ptYearsOut").textContent = v.ptYears + (v.ptYears === 1 ? " year" : " years");
    $("ptShareOut").textContent = v.ptShare + "%";

    const full = pensionPath(v, retire, false);
    const withBreak = brkOn ? pensionPath(v, retire, true) : null;
    const totalPct = v.pYou + v.pEmp;
    $("pContrib").innerHTML = `Total going in: <strong>${totalPct}% of your salary</strong>, about <strong>${gbp(v.pSalary * totalPct / 1200)} a month</strong> now (you ${gbp(v.pSalary * v.pYou / 1200)}, your employer ${gbp(v.pSalary * v.pEmp / 1200)}). Without a break, by ${retire} your salary would be about ${gbp(full.pay)} in today's money.`;

    $("pFullLabel").textContent = brkOn ? `Pot at ${retire}, no break` : `Pot at ${retire}`;
    $("pFull").textContent = gbp(full.pot);
    $("pBreakFig").hidden = $("pDiffFig").hidden = !brkOn;
    if (brkOn) {
      $("pBreak").textContent = gbp(withBreak.pot);
      const diff = full.pot - withBreak.pot;
      $("pDiff").textContent = diff >= 1 ? `−${gbp(diff)} (${Math.round(diff / full.pot * 100)}%)` : "£0";
    }
    $("pLegend").innerHTML = brkOn
      ? `<span><i class="sw sw-paid"></i>No break</span><span><i class="sw sw-own"></i>With the career break</span><span><i class="sw sw-band"></i>Break and part-time years</span>`
      : "";
    drawPension(full.path, withBreak && withBreak.path, v, retire, brkOn);

    // Income uses the career-break pot when a break is included.
    const pot = brkOn ? withBreak.pot : full.pot;
    const rate = Math.max(0.04, 0.07 + (retire - 65) * 0.002);
    const income = pot * rate, total = income + STATE_PENSION;
    $("pIncomeTitle").textContent = brkOn ? "Yearly income in retirement, with the break" : "Yearly income in retirement";
    $("pBar").innerHTML = `<div class="income-track">
        <span class="seg seg-state" style="width:${(STATE_PENSION / total * 100).toFixed(1)}%"></span>
        <span class="seg seg-own" style="width:${(income / total * 100).toFixed(1)}%"></span>
      </div>
      <div class="inv-legend"><span><i class="sw sw-paid"></i>State Pension ${gbp(STATE_PENSION)}</span><span><i class="sw sw-own"></i>Your own pension ${gbp(income)}</span></div>`;
    $("pNote").innerHTML = `In total about <strong>${gbp(total)} a year</strong>, or <strong>${gbp(total / 52)} a week</strong>, in today's money. ${totalPct < 8 ? "Together you and your employer are paying in less than the legal minimum of 8%." : "Every extra 1% you pay in, especially early on, makes a noticeable difference."}`;
  }

  function drawPension(full, brk, v, retire, brkOn) {
    const start = v.pAge, W = 560, H = 220, L = 58, R = 16, T = 10, B = 28;
    const max = Math.max(1000, full[full.length - 1][1]) * 1.08;
    const x = (age) => L + (age - start) / (retire - start) * (W - L - R);
    const y = (val) => T + (1 - val / max) * (H - T - B);
    const out = [];
    if (brkOn) {
      const b0 = Math.max(start, v.breakAge), b1 = Math.min(retire, v.breakAge + v.breakYears + v.ptYears);
      if (b1 > b0) out.push(`<rect class="break-band" x="${x(b0)}" y="${T}" width="${x(b1) - x(b0)}" height="${H - T - B}"/>`);
    }
    const nice = [5000, 10000, 20000, 50000, 100000, 200000, 500000, 1000000];
    const step = nice.find((n) => max / n <= 4) || 2000000;
    for (let g = 0; g <= max; g += step) {
      const lbl = g === 0 ? "£0" : g >= 1000000 ? "£" + g / 1000000 + "m" : "£" + g / 1000 + "k";
      out.push(`<line class="grid" x1="${L}" x2="${W - R}" y1="${y(g)}" y2="${y(g)}"/><text x="${L - 6}" y="${y(g) + 4}" text-anchor="end">${lbl}</text>`);
    }
    const span = retire - start, tick = span > 30 ? 10 : span > 12 ? 5 : span > 6 ? 2 : 1;
    for (let a = start; a <= retire - tick / 2; a += tick) out.push(`<text x="${x(a)}" y="${H - 8}" text-anchor="middle">${a}</text>`);
    out.push(`<text x="${x(retire)}" y="${H - 8}" text-anchor="middle">${retire}</text>`);
    const line = (p) => p.map((q) => x(q[0]).toFixed(1) + "," + y(q[1]).toFixed(1)).join(" L");
    if (brkOn) {
      out.push(`<path class="series line-full" d="M${line(full)}"/><path class="series line-you" d="M${line(brk)}"/>`);
    } else {
      out.push(`<path class="area-growth" d="M${line(full)} L${x(retire)},${y(0)} L${x(start)},${y(0)} Z"/><path class="series line-you" d="M${line(full)}"/>`);
    }
    $("pChart").innerHTML = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Pension pot by age${brkOn ? ", with and without a career break" : ""}">${out.join("")}</svg>`;
  }

  pIn.forEach((k) => $(k).addEventListener("input", updatePension));
  $("pBreakOn").addEventListener("change", updatePension);
  updatePension();
})();

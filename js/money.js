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

  // Warwick Business School / Barclays (2018): yearly return above the FTSE 100.
  bars("perfBars", [
    { label: "Women", value: 1.94, text: "+1.94%" },
    { label: "Men", value: 0.14, men: true, text: "+0.14%" }
  ], 2.2, "%");

  // ---------- Money quiz (Lusardi & Mitchell "Big Three", adapted for the UK) ----------
  const QUIZ = [
    { q: "You put £100 in a savings account paying 2% interest a year and leave it there. After 5 years, how much will you have?",
      options: ["More than £102", "Exactly £102", "Less than £102"], answer: 0,
      why: "You earn 2% every year, and from the second year you also earn interest on your interest. After 5 years you'd have about £110. This snowball effect is called compound interest." },
    { q: "Your savings earn 1% interest a year, and prices rise by 2% a year. After one year, could your money buy more, the same, or less than today?",
      options: ["More", "The same", "Less"], answer: 2,
      why: "Prices rose faster than your savings grew, so the same money buys less. This is why money left in cash for many years can quietly lose value." },
    { q: "True or false: buying shares in just one company is usually safer than buying a fund that holds shares in many companies.",
      options: ["True", "False"], answer: 1,
      why: "If one company struggles, a fund spread over hundreds of companies barely notices. Spreading your money (diversifying) lowers the risk, which is why index funds and ETFs are popular." }
  ];
  $("quizBody").innerHTML = QUIZ.map((item, i) => `<fieldset class="q" data-i="${i}">
      <legend><span class="q-num">${i + 1}</span>${item.q}</legend>
      <div class="q-opts">${item.options.concat("I don't know").map((o, j) => `<button type="button" data-j="${j}">${o}</button>`).join("")}</div>
      <p class="q-why" hidden></p>
    </fieldset>`).join("") + `<p class="q-score" id="quizScore" aria-live="polite"></p>`;
  const answered = {};
  $("quizBody").addEventListener("click", (e) => {
    const btn = e.target.closest(".q-opts button");
    if (!btn) return;
    const set = btn.closest(".q"), i = +set.dataset.i, j = +btn.dataset.j, item = QUIZ[i];
    set.querySelectorAll("button").forEach((b) => {
      b.classList.remove("right", "wrong", "picked");
      if (+b.dataset.j === item.answer) b.classList.add("right");
    });
    btn.classList.add("picked");
    const dontKnow = j === item.options.length;
    if (j !== item.answer && !dontKnow) btn.classList.add("wrong");
    const why = set.querySelector(".q-why");
    why.hidden = false;
    why.innerHTML = (j === item.answer ? "<strong>Correct!</strong> " : dontKnow ? "<strong>Here's the answer.</strong> " : "<strong>Not quite.</strong> ") + item.why;
    answered[i] = j === item.answer;
    const n = Object.keys(answered).length, right = Object.values(answered).filter(Boolean).length;
    $("quizScore").textContent = n === QUIZ.length
      ? `You got ${right} out of 3. ${right === 3 ? "In the original US surveys, only about a third of adults got all three right." : "Now you know all three: that already puts you ahead of many adults."}`
      : "";
  });

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

  // ---------- "What you can do now" checklist ----------
  const ICON = {
    parent: '<path d="M12 21s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.6-7 10-7 10z"/>',
    teen: '<path d="M12 3l9 4.5-9 4.5-9-4.5z"/><path d="M6 10v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5"/>',
    adult: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/><path d="M3 13h18"/>',
    family: '<circle cx="9" cy="7" r="3"/><circle cx="17" cy="10" r="2"/><path d="M3 20c0-3.5 2.7-6 6-6s6 2.5 6 6"/><path d="M15 20c0-2.5 1-4 2-4s4 1 4 4"/>'
  };
  const svg = (k) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON[k]}</svg>`;
  const STAGES = [
    { id: "parent", label: "For parents", items: [
      { t: "Open a Junior Stocks and Shares ISA", d: "A parent or guardian opens it, and then anyone (grandparents too) can pay in, up to £9,000 a year in total. Your daughter can take control at 16 and use the money at 18, all tax-free. £50 a month from birth, growing at 5% a year, could be worth about £17,300 at 18 from £10,800 paid in.", link: ["GOV.UK: Junior ISAs", "https://www.gov.uk/junior-individual-savings-accounts"] },
      { t: "Think about a junior pension", d: "You can pay up to £2,880 a year into a child's pension and the government adds 20%, making £3,600. The money is locked until at least 57, so it has decades to grow." },
      { t: "Ask relatives to give savings instead of toys", d: "A birthday or Christmas gift paid into a Junior ISA can grow for 18 years." },
      { t: "Talk about money at home", d: "Pocket money, saving up for something, comparing prices: talking about money early makes it feel normal, not scary." }
    ]},
    { id: "teen", label: "Age 13–17", items: [
      { t: "Open a savings account in your own name", d: "Many banks offer accounts for under-18s. Saving a little regularly is a habit worth more than the amount." },
      { t: "Check for a Child Trust Fund", d: "If you were born between 1 September 2002 and 2 January 2011, the government opened an account for you with at least £250. Hundreds of thousands are unclaimed, holding about £2,200 on average. You can take control at 16 and withdraw at 18, and finding it is free.", link: ["GOV.UK: Find a Child Trust Fund", "https://www.gov.uk/child-trust-funds/find-a-child-trust-fund"] },
      { t: "Take charge of your Junior ISA at 16", d: "If your family opened one for you, you can manage it yourself from 16." },
      { t: "Keep your National Insurance number safe", d: "You receive it just before you turn 16. You'll need it for your first job, your pension and your State Pension record." },
      { t: "Learn the three money basics", d: "Compound interest, inflation and spreading risk. Try the three-question quiz above." , link: ["Take the quiz", "#quiz"] }
    ]},
    { id: "adult", label: "18 and working", items: [
      { t: "Stay in your workplace pension", d: "From 22, if you earn over £10,000, your employer must enrol you and add at least 3% of your pay. Opting out means giving up free money." },
      { t: "Ask if your employer matches extra contributions", d: "Many employers pay in more than the minimum, or match what you put in up to a limit. Ask HR: \"If I pay in more, will you pay in more too?\" It's one of the best deals you'll ever get." },
      { t: "Open a Stocks and Shares ISA", d: "You can save or invest up to £20,000 a year tax-free across your ISAs. From April 2027, people under 65 can only put £12,000 a year into cash ISAs, so investing will matter more." },
      { t: "Consider a Lifetime ISA", d: "From 18 to 39 you can pay in up to £4,000 a year and the government adds 25% (up to £1,000 a year), towards a first home costing up to £450,000 or for later life. Take it out for anything else and you pay a 25% charge. The government plans to replace it, so check the latest rules.", link: ["GOV.UK: Lifetime ISA", "https://www.gov.uk/lifetime-isa"] },
      { t: "Check your State Pension forecast", d: "It's free and takes a few minutes. It shows how many years of National Insurance you have and any gaps.", link: ["GOV.UK: Check your State Pension", "https://www.gov.uk/check-state-pension"] },
      { t: "Keep track of every workplace pension", d: "Each new job may start a new pension. Write each one down, and use the free government service to find any you've lost.", link: ["GOV.UK: Find a lost pension", "https://www.gov.uk/find-lost-pension"] },
      { t: "Build a cash safety net", d: "A few months of essential costs in an easy-access savings account means a surprise bill never forces you to sell investments at a bad time." }
    ]},
    { id: "family", label: "Starting a family", items: [
      { t: "Claim Child Benefit, even if you opt out of the money", d: "While your child is under 12, claiming gives you National Insurance credits so your State Pension keeps building. You can claim and choose not to be paid if you or your partner earn over £60,000.", link: ["GOV.UK: Child Benefit", "https://www.gov.uk/child-benefit"] },
      { t: "Check your pension during maternity leave", d: "During paid maternity leave your employer should keep paying into your workplace pension as if you were earning your normal pay. Check that it does." },
      { t: "Share the caring", d: "Shared parental leave lets both parents take time off. When both work flexibly, neither loses all their pay progression." },
      { t: "Keep your own pension growing if you stop work", d: "Someone with no earnings can still have up to £2,880 a year paid into a personal pension, topped up to £3,600 by the government. A partner can pay in for you." },
      { t: "Remember pensions if you separate", d: "Pensions can be shared on divorce, but most settlements leave them out. Make sure yours doesn't." }
    ]}
  ];
  const done = (() => { try { return JSON.parse(localStorage.getItem("hm-done") || "{}"); } catch (e) { return {}; } })();
  const save = () => { try { localStorage.setItem("hm-done", JSON.stringify(done)); } catch (e) {} };
  let stage = "parent";
  $("stageTabs").innerHTML = STAGES.map((st) => `<button type="button" role="tab" data-s="${st.id}"><span class="act-icon">${svg(st.id)}</span>${st.label}</button>`).join("");
  function renderChecklist() {
    const st = STAGES.find((x) => x.id === stage);
    [...$("stageTabs").children].forEach((b) => b.setAttribute("aria-selected", String(b.dataset.s === stage)));
    $("checklist").innerHTML = st.items.map((it, i) => {
      const id = `${st.id}-${i}`;
      const link = it.link ? ` <a href="${it.link[1]}"${it.link[1].startsWith("#") ? "" : ' target="_blank" rel="noopener"'}>${it.link[0]} →</a>` : "";
      return `<label class="check-item${done[id] ? " is-done" : ""}" for="chk-${id}">
        <input type="checkbox" id="chk-${id}" data-id="${id}"${done[id] ? " checked" : ""}>
        <span class="box" aria-hidden="true"></span>
        <span class="ci-text"><strong>${it.t}</strong><span>${it.d}${link}</span></span>
      </label>`;
    }).join("");
    const n = st.items.filter((_, i) => done[`${st.id}-${i}`]).length;
    $("progress").textContent = `${n} of ${st.items.length} done${n === st.items.length ? ". Brilliant!" : ""}`;
  }
  $("stageTabs").addEventListener("click", (e) => {
    const b = e.target.closest("button[data-s]");
    if (b) { stage = b.dataset.s; renderChecklist(); }
  });
  // Links to a closed "Try it" box open it first.
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    const target = a && document.getElementById(a.getAttribute("href").slice(1));
    if (target && target.tagName === "DETAILS") target.open = true;
  });
  $("checklist").addEventListener("change", (e) => {
    const id = e.target.dataset.id;
    if (!id) return;
    if (e.target.checked) done[id] = true; else delete done[id];
    save();
    renderChecklist();
  });
  renderChecklist();

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

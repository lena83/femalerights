(function () {
  const state = { era: 0, view: "compare", country: "uk", right: "vote", metric: "age", timer: null };
  const $ = (id) => document.getElementById(id);
  const byId = Object.fromEntries(COUNTRIES.map((c) => [c.id, c]));
  const SYMBOL = ["✕", "½", "✓"];

  const fmtAge = (n) => (Number.isInteger(n) ? String(n) : n.toFixed(1));

  // ---------- Time ruler ----------
  function buildRuler() {
    $("ruler").innerHTML = ERAS.map((y, i) =>
      `<li><button type="button" data-i="${i}">${y}</button></li>`).join("");
    $("ruler").addEventListener("click", (e) => {
      const b = e.target.closest("button[data-i]");
      if (b) { stop(); setEra(+b.dataset.i); }
    });
    $("prev").addEventListener("click", () => { stop(); setEra(state.era - 1); });
    $("next").addEventListener("click", () => { stop(); setEra(state.era + 1); });
    $("play").addEventListener("click", () => (state.timer ? stop() : play()));
    document.addEventListener("keydown", (e) => {
      if (e.target.closest("input, textarea")) return;
      if (e.key === "ArrowLeft") { stop(); setEra(state.era - 1); }
      if (e.key === "ArrowRight") { stop(); setEra(state.era + 1); }
    });
    setPlayLabel();
  }

  function setPlayLabel() {
    const on = !!state.timer;
    $("play").setAttribute("aria-pressed", String(on));
    $("play").innerHTML = on ? `❚❚ <span class="label">Pause</span>` : `▶ <span class="label">Play</span>`;
  }
  function play() {
    if (state.view === "journey") setView("compare");
    if (state.era === ERAS.length - 1) setEra(0);
    state.timer = setInterval(() => {
      if (state.era >= ERAS.length - 1) return stop();
      setEra(state.era + 1);
    }, 4000);
    setPlayLabel();
  }
  function stop() {
    if (state.timer) clearInterval(state.timer);
    state.timer = null;
    setPlayLabel();
  }

  function setEra(i) {
    state.era = Math.max(0, Math.min(ERAS.length - 1, i));
    render();
  }

  // ---------- View switch ----------
  function buildViewSwitch() {
    $("tab-compare").addEventListener("click", () => setView("compare"));
    $("tab-journey").addEventListener("click", () => { stop(); setView("journey"); });
    $("countryPick").innerHTML = COUNTRIES.map((c) =>
      `<button type="button" data-c="${c.id}" style="color:var(--c-${c.id})"><span class="dot" style="background:var(--c-${c.id})"></span><span style="color:var(--ink)">${c.name}</span></button>`).join("");
    $("countryPick").addEventListener("click", (e) => {
      const b = e.target.closest("button[data-c]");
      if (b) { state.country = b.dataset.c; render(); }
    });
  }
  function setView(v) { state.view = v; render(); }

  // ---------- Cards ----------
  function card(country, year) {
    const cell = DATA[country.id][year];
    const journey = state.view === "journey";
    const heading = journey ? year : country.name;
    const sub = journey ? cell.state : (cell.state !== country.name ? cell.state : `In ${year}`);
    const rights = RIGHTS.map((r) => {
      const v = cell.rights[r.key];
      return `<li><span>${r.label}</span><span class="pill pill-${v}"><b aria-hidden="true">${SYMBOL[v]}</b>${LEVELS[v]}</span></li>`;
    }).join("");
    return `<article class="card" style="--cc:var(--c-${country.id})">
      <div class="card-top"><h3>${heading}</h3><p class="card-state">${sub}</p></div>
      <figure class="doll">
        ${figureSVG(cell, country, `${cell.dress.name}: typical clothes, ${cell.state} ${year}`)}
        <figcaption class="dress-name">${cell.dress.name}</figcaption>
      </figure>
      <p class="dress-text">${cell.dress.text}</p>
      <div class="card-body">
        <div>
          <ul class="rights" aria-label="Could a woman…">${rights}</ul>
        </div>
        <div class="stats">
          <div class="stat"><span class="stat-num">${fmtAge(cell.age)}</span><span class="stat-label">age at first marriage (usual)</span></div>
          <div class="stat"><span class="stat-num">${fmtAge(cell.kids)}</span><span class="stat-label">children per woman</span></div>
          <div class="stat"><span class="stat-num">${cell.read}%</span><span class="stat-label">of women could read</span></div>
        </div>
        <div class="kids" aria-hidden="true">${kidIcons(cell.kids)}</div>
        <section class="fact">
          <h4>School and reading</h4>
          <span class="meter" aria-hidden="true"><span style="width:${cell.read}%"></span></span>
          <p>${cell.school}</p>
        </section>
        <section class="fact">
          <h4>Common jobs and businesses</h4>
          <ul class="chips">${cell.jobs.map((j) => `<li>${j}</li>`).join("")}</ul>
        </section>
        <section class="fact">
          <h4>Pay compared with men</h4>
          ${cell.pay == null
            ? `<p class="pay-none">No reliable figure</p>`
            : `<p class="pay-line">For every <b>100</b> a man earned, she earned about <b>${cell.pay}</b></p>
          <span class="pay-bars" aria-hidden="true"><span class="pay-man"></span><span class="pay-her" style="width:${cell.pay}%"></span></span>`}
          <p class="muted">${cell.payNote}</p>
        </section>
        <p class="note">${cell.note}</p>
        <aside class="star"><span class="star-label">Woman to know</span><strong>${cell.star.name}</strong>${cell.star.text}</aside>
      </div>
    </article>`;
  }

  function kidIcons(n) {
    let out = "";
    for (let i = 0; i < Math.ceil(n - 0.01); i++) {
      const part = Math.min(1, n - i);
      out += `<svg viewBox="0 0 16 22" class="kid" style="--f:${(part * 100).toFixed(0)}%"><circle cx="8" cy="5" r="4"/><path d="M2,21 C2,12 4,10 8,10 C12,10 14,12 14,21 Z"/></svg>`;
    }
    return out;
  }

  function renderCards() {
    const year = ERAS[state.era];
    $("cards").classList.toggle("compare", state.view === "compare");
    $("cards").innerHTML = state.view === "compare"
      ? COUNTRIES.map((c) => card(c, year)).join("")
      : ERAS.map((y) => card(byId[state.country], y)).join("");
  }

  // ---------- Scoreboard ----------
  function buildRightTabs() {
    $("rightTabs").innerHTML = RIGHTS.map((r) =>
      `<button type="button" role="tab" data-r="${r.key}">${r.label}</button>`).join("");
    $("rightTabs").addEventListener("click", (e) => {
      const b = e.target.closest("button[data-r]");
      if (b) { state.right = b.dataset.r; renderHeat(); }
    });
    $("heat").addEventListener("click", (e) => {
      const b = e.target.closest("button[data-i]");
      if (!b) return;
      stop();
      state.era = +b.dataset.i;
      if (state.view === "journey") state.country = b.dataset.c;
      render();
      $("cards").scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
    });
  }

  function renderHeat() {
    [...$("rightTabs").children].forEach((b) => b.setAttribute("aria-selected", String(b.dataset.r === state.right)));
    const label = RIGHTS.find((r) => r.key === state.right).label;
    const head = `<thead><tr><th scope="col"></th>${ERAS.map((y, i) =>
      `<th scope="col" class="${i === state.era ? "on" : ""}">${y}</th>`).join("")}</tr></thead>`;
    const rows = COUNTRIES.map((c) => `<tr><th scope="row"><span class="dot" style="background:var(--c-${c.id})"></span> ${c.name}</th>${ERAS.map((y, i) => {
      const v = DATA[c.id][y].rights[state.right];
      const on = i === state.era && (state.view === "compare" || state.country === c.id);
      return `<td><button type="button" class="lvl-${v}${on ? " on" : ""}" data-i="${i}" data-c="${c.id}" aria-label="${c.name}, ${y}: ${label}: ${LEVELS[v]}" title="${DATA[c.id][y].state}, ${y}: ${LEVELS[v]}">${SYMBOL[v]}</button></td>`;
    }).join("")}</tr>`).join("");
    $("heat").innerHTML = head + `<tbody>${rows}</tbody>`;
  }

  // ---------- Marriage-age chart ----------
  const METRICS = {
    age:  { tab: "Age at first marriage", min: 16, max: 34, step: 2, fmt: fmtAge,
            note: "Usual age of women at their first marriage. Before 1900 the numbers are historians' estimates, and girls in villages often married younger than in towns." },
    kids: { tab: "Children per woman", min: 0, max: 8, step: 1, fmt: fmtAge,
            note: "The average number of children a woman had in her lifetime. In the past many babies also died young, so families were often smaller than this number suggests." },
    read: { tab: "Women who could read", min: 0, max: 100, step: 20, fmt: (v) => v + "%",
            note: "Share of adult women who could read and write. Early figures are estimates from marriage registers and censuses." },
    pay:  { tab: "Pay compared with men", min: 30, max: 100, step: 10, fmt: (v) => String(v),
            note: "For every 100 a man earned, how much a woman earned. Gaps in a line mean there is no reliable figure, often because most women worked on family farms without a wage." }
  };

  function buildMetricTabs() {
    $("metricTabs").innerHTML = Object.entries(METRICS).map(([k, m]) =>
      `<button type="button" role="tab" data-m="${k}">${m.tab}</button>`).join("");
    $("metricTabs").addEventListener("click", (e) => {
      const b = e.target.closest("button[data-m]");
      if (b) { state.metric = b.dataset.m; renderChart(); }
    });
  }

  function renderChart() {
    const M = METRICS[state.metric];
    [...$("metricTabs").children].forEach((b) => b.setAttribute("aria-selected", String(b.dataset.m === state.metric)));
    $("metricNote").textContent = M.note;
    const W = 860, H = 340, L = 44, R = 20, T = 18, B = 34;
    const x = (yr) => L + ((yr - 1850) / (2025 - 1850)) * (W - L - R);
    const y = (v) => T + (1 - (v - M.min) / (M.max - M.min)) * (H - T - B);
    const val = (c, yr) => DATA[c][yr][state.metric];
    const parts = [];
    const sel = ERAS[state.era];
    parts.push(`<rect class="band" x="${x(sel) - 14}" y="${T}" width="28" height="${H - T - B}" rx="6"/>`);
    for (let v = M.min; v <= M.max; v += M.step) {
      parts.push(`<line class="grid" x1="${L}" x2="${W - R}" y1="${y(v)}" y2="${y(v)}"/>`);
      parts.push(`<text x="${L - 8}" y="${y(v) + 4}" text-anchor="end">${v}</text>`);
    }
    ERAS.forEach((yr) => {
      parts.push(`<text x="${x(yr)}" y="${H - 10}" text-anchor="middle" class="${yr === sel ? "band-label" : ""}">${yr}</text>`);
    });
    const focus = state.view === "journey" ? state.country : null;
    COUNTRIES.forEach((c) => {
      const pts = ERAS.filter((yr) => val(c.id, yr) != null).map((yr) => [x(yr), y(val(c.id, yr)), val(c.id, yr), yr]);
      if (!pts.length) return;
      // Start a new line segment wherever an era is missing.
      let d = "", prev = null;
      pts.forEach((p) => {
        const gap = prev == null || ERAS.indexOf(p[3]) - ERAS.indexOf(prev) > 1;
        d += (gap ? " M" : " L") + p[0].toFixed(1) + "," + p[1].toFixed(1);
        prev = p[3];
      });
      const dim = focus && focus !== c.id ? ' opacity=".25"' : "";
      parts.push(`<g${dim}><path class="series" style="stroke:var(--c-${c.id})" d="${d.trim()}"/>` +
        pts.map((p) => `<circle class="pt" cx="${p[0]}" cy="${p[1]}" r="${p[3] === sel ? 5.5 : 3.5}" style="fill:var(--c-${c.id})"><title>${c.name}, ${p[3]}: about ${M.fmt(p[2])}</title></circle>`).join("") +
        `</g>`);
    });
    // Value labels at the selected year, nudged apart so they don't collide.
    const labels = COUNTRIES
      .filter((c) => (!focus || focus === c.id) && val(c.id, sel) != null)
      .map((c) => ({ c, v: val(c.id, sel), ty: y(val(c.id, sel)) }))
      .sort((a, b) => a.ty - b.ty);
    for (let i = 1; i < labels.length; i++) {
      if (labels[i].ty - labels[i - 1].ty < 14) labels[i].ty = labels[i - 1].ty + 14;
    }
    const right = sel > 2000;
    labels.forEach((l) => {
      const lx = x(sel) + (right ? -20 : 20);
      parts.push(`<text class="pt-label" x="${lx}" y="${l.ty + 4}" text-anchor="${right ? "end" : "start"}" style="fill:var(--c-${l.c.id})">${M.fmt(l.v)}</text>`);
    });
    $("chart").innerHTML = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Line chart: ${M.tab}, 1850 to 2025, for five countries">${parts.join("")}</svg>`;
  }

  function buildLegend() {
    $("legend").innerHTML = COUNTRIES.map((c) =>
      `<span><i style="background:var(--c-${c.id})"></i>${c.name}</span>`).join("");
  }

  // ---------- Vote timeline ----------
  function renderVotes() {
    const W = 860, rowH = 34, T = 14, L = 120, R = 24;
    const H = T + VOTE_MILESTONES.length * rowH + 30;
    const x = (yr) => L + ((yr - 1850) / (2025 - 1850)) * (W - L - R);
    const parts = [];
    for (let yr = 1850; yr <= 2025; yr += 25) {
      parts.push(`<line class="grid" x1="${x(yr)}" x2="${x(yr)}" y1="${T - 6}" y2="${H - 26}"/>`);
      parts.push(`<text x="${x(yr)}" y="${H - 8}" text-anchor="middle">${yr}</text>`);
    }
    VOTE_MILESTONES.forEach((m, i) => {
      const cy = T + i * rowH + rowH / 2;
      const col = `var(--c-${m.id})`;
      parts.push(`<text class="row-label" x="${L - 12}" y="${cy + 4}" text-anchor="end">${m.label}</text>`);
      if (m.end) parts.push(`<line x1="${x(m.year)}" x2="${x(m.end)}" y1="${cy}" y2="${cy}" style="stroke:${col}" stroke-width="5" stroke-linecap="round"/>`);
      parts.push(`<circle cx="${x(m.year)}" cy="${cy}" r="7" style="fill:${col}"><title>${m.label}: ${m.year}</title></circle>`);
      if (m.end) parts.push(`<circle cx="${x(m.end)}" cy="${cy}" r="5" style="fill:var(--surface);stroke:${col}" stroke-width="2.5"><title>${m.label}: ${m.end}</title></circle>`);
      const tx = x(m.end || m.year) + 12;
      parts.push(`<text x="${tx}" y="${cy + 4}">${m.year}${m.end ? "–" + m.end : ""}</text>`);
    });
    const notes = VOTE_MILESTONES.map((m) =>
      `<li><span class="dot" style="background:var(--c-${m.id})"></span><span><strong>${m.label}.</strong> ${m.note}</span></li>`).join("");
    $("voteLine").innerHTML = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Timeline of when women won the vote">${parts.join("")}</svg>`;
    let list = document.getElementById("voteNotes");
    if (!list) {
      list = document.createElement("ul");
      list.id = "voteNotes";
      list.className = "vote-notes";
      $("voteLine").after(list);
    }
    list.innerHTML = notes;
  }

  // ---------- Render ----------
  function render() {
    const year = ERAS[state.era];
    [...$("ruler").querySelectorAll("button")].forEach((b, i) => b.setAttribute("aria-current", String(i === state.era)));
    $("prev").disabled = state.era === 0;
    $("next").disabled = state.era === ERAS.length - 1;
    const journey = state.view === "journey";
    $("eraYear").textContent = journey ? byId[state.country].name : year;
    $("eraContext").textContent = journey
      ? `Follow one country from 1850 to today and watch how the rights, the clothes and the age of marriage changed.`
      : ERA_CONTEXT[year];
    $("eraYear").style.fontSize = journey ? "clamp(2rem, 5vw, 3.4rem)" : "";
    $("tab-compare").setAttribute("aria-selected", String(!journey));
    $("tab-journey").setAttribute("aria-selected", String(journey));
    $("countryPick").hidden = !journey;
    [...$("countryPick").children].forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.c === state.country)));
    renderCards();
    renderHeat();
    renderChart();
  }

  buildRuler();
  buildViewSwitch();
  buildRightTabs();
  buildLegend();
  buildMetricTabs();
  renderVotes();
  render();
})();

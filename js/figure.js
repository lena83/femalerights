// Draws a simple "paper doll" figure as an SVG string.
// Coordinates use a 120 x 210 box: head centre (60,28), shoulders y≈48,
// waist y≈80, knees y≈145, feet y≈194.

const INK = "#2a2230";
const SHADE = "rgba(20,10,30,.22)";

function figureSVG(cell, country, title) {
  const d = cell.dress;
  const skin = cell.skin || country.skin;
  const hair = cell.hairColor || country.hair;
  const m = d.main, a = d.accent, hat = d.hat || a, trim = d.trim || "#d9a53a";
  const body = BODIES[d.style](m, a, trim, d);
  const parts = [];

  parts.push(`<ellipse class="fig-ground" cx="60" cy="198" rx="40" ry="5"/>`);
  parts.push(hairBack(d.hair, hair, hat));

  // Legs and shoes below the hem
  if (body.hem < 190) {
    const leg = d.legs || skin;
    parts.push(`<path d="M54,${body.hem - 4} L54,192 M66,${body.hem - 4} L66,192" stroke="${leg}" stroke-width="6" stroke-linecap="round" fill="none"/>`);
  }
  if (d.boots) {
    parts.push(`<path d="M54,168 L54,192 M66,168 L66,192" stroke="${a}" stroke-width="7.5" stroke-linecap="round" fill="none"/>`);
  }
  if (d.bound) {
    parts.push(`<path d="M50,195 Q55,190 58,195 Z M62,195 Q65,190 70,195 Z" fill="${trim}"/>`);
  } else if (!body.noShoes) {
    const shoe = d.shoes || "#3a2c2c";
    parts.push(`<ellipse cx="53" cy="195" rx="5.5" ry="3" fill="${shoe}"/><ellipse cx="67" cy="195" rx="5.5" ry="3" fill="${shoe}"/>`);
  }

  // Neck, body, arms
  parts.push(`<rect x="56" y="34" width="8" height="14" fill="${skin}"/>`);
  parts.push(`<g stroke="${SHADE}" stroke-width="0.8" stroke-linejoin="round">${body.svg}</g>`);
  parts.push(arms(body.sleeve, d.sleeve || (body.sleeve === "puff" ? a : m), skin));
  if (body.over) parts.push(`<g stroke="${SHADE}" stroke-width="0.8">${body.over}</g>`);

  // Head and face
  parts.push(`<circle cx="60" cy="28" r="11" fill="${skin}" stroke="${SHADE}" stroke-width="0.8"/>`);
  parts.push(`<circle cx="56" cy="28" r="1.3" fill="${INK}"/><circle cx="64" cy="28" r="1.3" fill="${INK}"/>`);
  parts.push(`<circle cx="53.5" cy="32" r="2.2" fill="#e0707a" opacity=".3"/><circle cx="66.5" cy="32" r="2.2" fill="#e0707a" opacity=".3"/>`);
  parts.push(`<path d="M57,33.2 Q60,35.6 63,33.2" stroke="${INK}" stroke-width="1" fill="none" stroke-linecap="round"/>`);
  parts.push(hairFront(d.hair, hair, hat, a));
  if (body.collar) parts.push(body.collar);

  return `<svg viewBox="0 0 120 206" role="img" aria-label="${escapeAttr(title)}" xmlns="http://www.w3.org/2000/svg">${parts.join("")}</svg>`;
}

function escapeAttr(s) {
  return String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

function arms(type, sleeve, skin) {
  if (type === "hidden") return "";
  const path = "M48,52 L41,101 M72,52 L79,101";
  const hands = `<circle cx="41" cy="102" r="3.6" fill="${skin}"/><circle cx="79" cy="102" r="3.6" fill="${skin}"/>`;
  const line = (d, c, w) => `<path d="${d}" stroke="${c}" stroke-width="${w}" stroke-linecap="round" fill="none"/>`;
  if (type === "none") return line(path, skin, 6) + hands;
  if (type === "short") return line(path, skin, 6) + line("M48,52 L46,66 M72,52 L74,66", sleeve, 9) + hands;
  if (type === "puff") {
    return line(path, sleeve, 7.5) + `<circle cx="48" cy="54" r="6.5" fill="${sleeve}" stroke="${SHADE}" stroke-width=".8"/><circle cx="72" cy="54" r="6.5" fill="${sleeve}" stroke="${SHADE}" stroke-width=".8"/>` + hands;
  }
  if (type === "wide") {
    return `<path d="M47,50 L34,98 L47,100 L53,62 Z M73,50 L86,98 L73,100 L67,62 Z" fill="${sleeve}" stroke="${SHADE}" stroke-width=".8"/>` +
      `<circle cx="40" cy="101" r="3.6" fill="${skin}"/><circle cx="80" cy="101" r="3.6" fill="${skin}"/>`;
  }
  return line(path, sleeve, 7.5) + hands; // long
}

const BODIES = {
  crinoline: (m, a) => ({
    hem: 198, noShoes: true, sleeve: "long",
    svg: `<path d="M50,47 Q60,43 70,47 L67,80 C78,92 100,150 106,195 Q60,203 14,195 C20,150 42,92 53,80 Z" fill="${m}"/>
      <path d="M26,148 Q60,157 94,148 M19,175 Q60,186 101,175" stroke="${a}" stroke-width="2.2" fill="none" opacity=".8"/>`,
    collar: `<path d="M54,46 Q60,51 66,46" stroke="${a}" stroke-width="3" fill="none" stroke-linecap="round"/>`
  }),
  bustle: (m, a) => ({
    hem: 196, noShoes: true, sleeve: "long",
    svg: `<path d="M50,47 Q60,43 70,47 L67,80 C78,84 92,94 89,108 C87,118 81,124 81,132 L87,196 L33,196 C38,160 46,112 53,80 Z" fill="${m}"/>
      <path d="M48,108 Q64,124 84,108 M44,140 Q64,152 84,138" stroke="${a}" stroke-width="2.2" fill="none" opacity=".85"/>`,
    collar: `<rect x="55" y="38" width="10" height="7" rx="2" fill="${m}" stroke="${SHADE}" stroke-width=".8"/>`
  }),
  sbend: (m, a) => ({
    hem: 196, noShoes: true, sleeve: "puff",
    svg: `<path d="M52,80 L68,80 C72,120 86,170 93,196 L27,196 C34,170 48,120 52,80 Z" fill="${m}"/>
      <path d="M49,47 Q60,43 71,47 L68,82 L52,82 Z" fill="${a}"/>
      <rect x="51.5" y="78" width="17" height="5" fill="${m}"/>`,
    collar: `<rect x="55" y="36" width="10" height="9" rx="2" fill="${a}" stroke="${SHADE}" stroke-width=".8"/>`
  }),
  flapper: (m, a) => {
    let fringe = "";
    for (let x = 45; x <= 75; x += 3.5) fringe += `M${x},139 L${x},146 `;
    return {
      hem: 141, sleeve: "none",
      svg: `<path d="M48,48 Q60,44 72,48 L74,98 L77,140 L43,140 L46,98 Z" fill="${m}"/>
        <rect x="45" y="95" width="30" height="6" fill="${a}"/>
        <path d="${fringe}" stroke="${a}" stroke-width="1.4"/>
        <path d="M52,60 L68,60" stroke="${a}" stroke-width="1.2" stroke-dasharray="1.5 2.5"/>`
    };
  },
  forties: (m, a) => ({
    hem: 148, sleeve: "short",
    svg: `<path d="M42,49 Q60,45 78,49 L76,58 L68,82 L78,148 L42,148 L52,82 L44,58 Z" fill="${m}"/>
      <rect x="52" y="79" width="16" height="4.5" fill="${a}"/>
      <path d="M55,48 L60,58 L65,48" stroke="${a}" stroke-width="2" fill="none"/>`
  }),
  mini: (m, a) => ({
    hem: 123, sleeve: "short",
    svg: `<path d="M48,48 Q60,45 72,48 L73,80 L79,122 L41,122 L47,80 Z" fill="${m}"/>
      <path d="M45,100 L75,100 M44,108 L76,108" stroke="${a}" stroke-width="3"/>`
  }),
  shift: (m, a) => ({
    hem: 146, sleeve: "short",
    svg: `<path d="M48,48 Q60,45 72,48 L73,82 L77,146 L43,146 L47,82 Z" fill="${m}"/>
      <path d="M45,140 L75,140" stroke="${a}" stroke-width="2.5"/>`,
    collar: `<path d="M54,46 Q60,52 66,46" stroke="${a}" stroke-width="3" fill="none" stroke-linecap="round"/>`
  }),
  suit: (m, a, t, d) => ({
    hem: d.trouser ? 196 : 146, sleeve: "long",
    svg: (d.trouser
        ? `<path d="M47,100 L73,100 L72,192 L62,192 L60,126 L58,192 L48,192 Z" fill="${m}"/><path d="M47,100 L73,100 L72,192 L62,192 L60,126 L58,192 L48,192 Z" fill="rgba(0,0,0,.18)"/>`
        : `<path d="M47,100 L73,100 L73,146 L47,146 Z" fill="${m}"/><path d="M47,100 L73,100 L73,146 L47,146 Z" fill="rgba(0,0,0,.18)"/>`) +
      `<path d="M41,49 Q60,45 79,49 L76,106 L44,106 Z" fill="${m}"/>
      <path d="M55,48 L65,48 L60,70 Z" fill="${a}"/>
      <path d="M55,48 L60,72 L65,48" stroke="rgba(0,0,0,.3)" stroke-width="1.2" fill="none"/>
      <circle cx="60" cy="86" r="1.6" fill="${a}"/>`
  }),
  jeans: (m, a) => ({
    hem: 196, sleeve: "short",
    svg: `<path d="M47,96 L73,96 L72,193 L62,193 L60,124 L58,193 L48,193 Z" fill="${a}"/>
      <path d="M60,124 L60,100" stroke="rgba(255,255,255,.35)" stroke-width="1"/>
      <path d="M46,48 Q60,45 74,48 L73,100 L47,100 Z" fill="${m}"/>`
  }),
  sarafan: (m, a, trim) => ({
    hem: 196, sleeve: "puff",
    svg: `<path d="M50,47 Q60,44 70,47 L69,60 L51,60 Z" fill="${a}"/>
      <path d="M51,56 L69,56 L71,62 L91,196 L29,196 L49,62 Z" fill="${m}"/>
      <path d="M53,56 L53,62 M67,56 L67,62" stroke="${trim}" stroke-width="2"/>
      <path d="M60,62 L60,196" stroke="${trim}" stroke-width="2.4"/>
      <path d="M31,186 L89,186" stroke="${trim}" stroke-width="4"/>
      <circle cx="60" cy="72" r="1.6" fill="${a}"/><circle cx="60" cy="84" r="1.6" fill="${a}"/><circle cx="60" cy="96" r="1.6" fill="${a}"/>`
  }),
  workdress: (m, a) => ({
    hem: 170, sleeve: "long",
    svg: `<path d="M48,48 Q60,45 72,48 L70,82 L80,170 L40,170 L50,82 Z" fill="${m}"/>
      <path d="M51,84 L69,84 L74,162 L46,162 Z" fill="${a}"/>
      <path d="M51,84 L69,84" stroke="${a}" stroke-width="3"/>`
  }),
  aoqun: (m, a, trim) => {
    let pleats = "";
    for (let x = 50; x <= 70; x += 5) pleats += `M${x},114 L${x + (x - 60) * 0.25},192 `;
    return {
      hem: 196, noShoes: true, sleeve: "wide",
      svg: `<path d="M49,104 L71,104 L78,194 L42,194 Z" fill="${a}"/>
        <path d="${pleats}" stroke="rgba(0,0,0,.2)" stroke-width="1"/>
        <path d="M47,47 Q60,43 73,47 L84,114 L36,114 Z" fill="${m}"/>
        <path d="M37,110 L83,110" stroke="${trim}" stroke-width="4"/>
        <path d="M60,47 Q64,52 70,56" stroke="${trim}" stroke-width="2.4" fill="none"/>`,
      over: `<path d="M35,96 L47,98 M85,96 L73,98" stroke="${trim}" stroke-width="3"/>`
    };
  },
  qipao: (m, a, t, d) => {
    const h = d.len || 186;
    const shape = d.fit
      ? `M50,47 Q60,44 70,47 L68,80 C72,92 73,100 72,110 L70,${h} L50,${h} L48,110 C47,100 48,92 52,80 Z`
      : `M47,48 Q60,44 73,48 L75,100 L78,${h} L42,${h} L45,100 Z`;
    return {
      hem: h + 2, sleeve: d.fit ? "none" : "short",
      svg: `<path d="${shape}" fill="${m}"/>
        <path d="M60,49 Q66,52 69,60 L69,${d.fit ? 110 : 100}" stroke="${a}" stroke-width="1.6" fill="none"/>
        <path d="M${d.fit ? 70 : 76},${h} L${d.fit ? 70.6 : 75.5},${h - 26}" stroke="${a}" stroke-width="1.4"/>`,
      collar: `<rect x="55" y="38" width="10" height="7" rx="1.5" fill="${m}" stroke="${a}" stroke-width="1.2"/>`
    };
  },
  maosuit: (m, a) => ({
    hem: 196, sleeve: "long",
    svg: `<path d="M47,104 L73,104 L72,193 L62,193 L60,130 L58,193 L48,193 Z" fill="${m}"/>
      <path d="M47,104 L73,104 L72,193 L62,193 L60,130 L58,193 L48,193 Z" fill="rgba(0,0,0,.12)"/>
      <path d="M44,48 Q60,45 76,48 L76,108 L44,108 Z" fill="${m}"/>
      <path d="M60,49 L60,108" stroke="rgba(0,0,0,.25)" stroke-width="1"/>
      <rect x="48" y="60" width="8" height="7" fill="none" stroke="rgba(0,0,0,.25)"/>
      <rect x="64" y="60" width="8" height="7" fill="none" stroke="rgba(0,0,0,.25)"/>
      <rect x="47" y="88" width="9" height="9" fill="none" stroke="rgba(0,0,0,.25)"/>
      <rect x="64" y="88" width="9" height="9" fill="none" stroke="rgba(0,0,0,.25)"/>`,
    collar: `<path d="M54,44 L60,50 L66,44" stroke="${m}" stroke-width="4" fill="none"/>`
  }),
  coverall: (m, a) => ({
    hem: 196, sleeve: "short",
    svg: `<path d="M46,48 Q60,45 74,48 L74,104 L73,193 L62,193 L60,128 L58,193 L47,193 L46,104 Z" fill="${m}"/>
      <rect x="46" y="88" width="28" height="5" fill="rgba(0,0,0,.25)"/>
      <path d="M60,49 L60,88" stroke="rgba(0,0,0,.25)" stroke-width="1"/>
      <rect x="63" y="58" width="8" height="7" fill="none" stroke="rgba(0,0,0,.25)"/>`,
    collar: `<path d="M54,45 L60,52 L66,45" stroke="${a}" stroke-width="3" fill="none"/>`
  }),
  ferace: (m, a) => ({
    hem: 196, sleeve: "long",
    svg: `<path d="M47,46 Q60,40 73,46 L80,90 L87,196 L33,196 L40,90 Z" fill="${m}"/>
      <path d="M42,48 L78,48 L82,76 L38,76 Z" fill="${m}"/>
      <path d="M38,76 L82,76" stroke="rgba(0,0,0,.25)" stroke-width="1.2"/>
      <path d="M60,76 L60,196" stroke="rgba(0,0,0,.2)" stroke-width="1"/>`
  }),
  charshaf: (m, a) => ({
    hem: 196, sleeve: "hidden",
    svg: `<path d="M60,13 C45,13 43,30 45,44 L36,96 L28,196 L92,196 L84,96 L75,44 C77,30 75,13 60,13 Z" fill="${m}"/>
      <path d="M45,38 L75,38 L84,96 L36,96 Z" fill="${a}"/>
      <path d="M36,96 L84,96" stroke="rgba(255,255,255,.15)" stroke-width="1"/>`
  }),
  tunic: (m, a) => ({
    hem: 196, sleeve: "long",
    svg: `<path d="M48,150 L72,150 L71,193 L62,193 L60,160 L58,193 L49,193 Z" fill="${a}"/>
      <path d="M47,48 Q60,45 73,48 L74,82 L79,162 L41,162 L46,82 Z" fill="${m}"/>
      <path d="M60,50 L60,78" stroke="rgba(0,0,0,.2)" stroke-width="1"/>`
  })
};

// Hair drawn behind the head
function hairBack(style, hc, hat) {
  switch (style) {
    case "long": return `<path d="M47,28 C46,11 74,11 73,28 L77,70 Q60,74 43,70 Z" fill="${hc}"/>`;
    case "bob": case "cloche": return `<path d="M47,28 C46,12 74,12 73,28 L74,41 L46,41 Z" fill="${hc}"/>`;
    case "rolls": return `<path d="M47,30 C46,13 74,13 73,30 L72,43 L48,43 Z" fill="${hc}"/>`;
    case "gibson": case "bouffant": return `<ellipse cx="60" cy="21" rx="15" ry="11" fill="${hc}"/>` + (style === "gibson" ? `<circle cx="60" cy="10" r="5" fill="${hc}"/>` : "");
    case "perm": {
      let c = "";
      [[46,22],[50,14],[58,10],[66,11],[72,16],[75,24],[74,33],[46,32],[44,40],[76,40]].forEach(([x, y]) => { c += `<circle cx="${x}" cy="${y}" r="6" fill="${hc}"/>`; });
      return c;
    }
    case "pony": return `<path d="M70,18 C82,20 84,34 78,46 C76,38 74,30 68,24 Z" fill="${hc}"/>`;
    case "bun": return `<circle cx="60" cy="15" r="6.5" fill="${hc}"/>`;
    case "kokoshnik": return `<path d="M56,30 L54,80 L58,84 L62,80 Z" fill="${hc}"/>`;
    case "yasmak": return `<circle cx="60" cy="28" r="14.5" fill="#ffffff" stroke="${SHADE}" stroke-width=".8"/>`;
    case "hijab": return `<path d="M60,12 C43,12 43,32 46,40 L41,58 Q60,64 79,58 L74,40 C77,32 77,12 60,12 Z" fill="${hat}" stroke="${SHADE}" stroke-width=".8"/>`;
    default: return "";
  }
}

const CAP = (hc) => `<path d="M48.5,29 C47,14.5 73,14.5 71.5,29 C69,20.5 51,20.5 48.5,29 Z" fill="${hc}"/>`;

// Hair and headwear drawn in front of the face
function hairFront(style, hc, hat, accent) {
  switch (style) {
    case "center": return CAP(hc) + `<path d="M60,17.5 L60,21" stroke="rgba(255,255,255,.35)" stroke-width="1"/><ellipse cx="48.5" cy="32" rx="3.6" ry="6" fill="${hc}"/><ellipse cx="71.5" cy="32" rx="3.6" ry="6" fill="${hc}"/>`;
    case "bun": case "gibson": case "bouffant": case "pony": case "long": case "perm": return CAP(hc);
    case "bob": return `<path d="M48.5,27 C48,15 72,15 71.5,27 L60,24 Z" fill="${hc}"/>`;
    case "cloche": return `<path d="M46,28 C45,9 75,9 74,28 L78,30 Q60,23 42,30 Z" fill="${hat}"/><path d="M46.5,24 Q60,20 73.5,24" stroke="${accent}" stroke-width="2" fill="none"/>`;
    case "rolls": return CAP(hc) + `<circle cx="52.5" cy="19.5" r="4" fill="${hc}"/><circle cx="67.5" cy="19.5" r="4" fill="${hc}"/>`;
    case "plaits": return CAP(hc) + `<path d="M49,32 Q47,48 48,64 M71,32 Q73,48 72,64" stroke="${hc}" stroke-width="5" fill="none" stroke-linecap="round"/><circle cx="48" cy="66" r="2.4" fill="${accent}"/><circle cx="72" cy="66" r="2.4" fill="${accent}"/>`;
    case "kerchief": return `<path d="M46.5,32 C44,10 76,10 73.5,32 C70,22 50,22 46.5,32 Z" fill="${hat}"/><path d="M47,31 Q49,38 56,40 L60,43 L64,40 Q71,38 73,31" stroke="${hat}" stroke-width="2.4" fill="none"/><path d="M58,41 L55,47 L60,44 L65,47 L62,41 Z" fill="${hat}"/>`;
    case "bandana": return CAP(hc) + `<path d="M48,24 C49,11 71,11 72,24 Q60,19 48,24 Z" fill="${hat}"/><circle cx="54" cy="18" r=".9" fill="#fff"/><circle cx="60" cy="15" r=".9" fill="#fff"/><circle cx="66" cy="18" r=".9" fill="#fff"/><path d="M57,12 C54,6 60,7 60,11 C60,7 66,6 63,12 Z" fill="${hat}"/>`;
    case "kokoshnik": return CAP(hc) + `<path d="M46,25 C44,2 76,2 74,25 C69,19 51,19 46,25 Z" fill="${hat}"/><path d="M49,20 C50,8 70,8 71,20" stroke="#e8c45a" stroke-width="1.6" stroke-dasharray="1 2.4" fill="none"/>`;
    case "yasmak": return `<path d="M47,27 C47,11 73,11 73,27 C70,20 50,20 47,27 Z" fill="#ffffff"/><path d="M49,31 L71,31 C71,40 66,42.5 60,42.5 C54,42.5 49,40 49,31 Z" fill="#ffffff" opacity=".78"/>`;
    case "hijab": return `<path d="M48.5,26 C49,14 71,14 71.5,26 C67,20.5 53,20.5 48.5,26 Z" fill="${hat}"/><path d="M49,35 Q52,40 60,41 Q68,40 71,35 L72,41 Q60,46 48,41 Z" fill="${hat}"/>`;
    case "short": return CAP(hc);
    default: return "";
  }
}

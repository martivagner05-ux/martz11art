// Shared header / footer + page renderers

const NAV = [
  { href: "index.html", label: "SHOP" },
  { href: "archive.html", label: "ARCHIVE" },
  { href: "code.html", label: "CODE" }
];

function layout(active) {
  document.body.insertAdjacentHTML("afterbegin", `
    <header>
      <a class="logo" href="index.html"><img src="logo.png" alt="MARTZ11"></a>
      <nav>${NAV.map(n => `<a href="${n.href}" class="${n.label === active ? "active" : ""}">${n.label}</a>`).join("")}</nav>
    </header>`);
  const social = [["INSTAGRAM", INSTAGRAM], ["TIKTOK", TIKTOK], ["EBAY", EBAY_STORE]]
    .filter(s => s[1])
    .map(([label, url]) => `<a href="${esc(url)}" target="_blank" rel="noopener">${label}</a>`).join("");
  document.body.insertAdjacentHTML("beforeend", `
    <footer>
      <div class="social">${social}</div>
      <div class="copy">© ${new Date().getFullYear()} MARTZ11</div>
    </footer>`);
}

function esc(s) {
  return String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function picture(p) {
  return p.image
    ? `<img src="${esc(p.image)}" alt="${esc(p.title)}" loading="lazy">`
    : `<div class="placeholder">${esc(p.title)}</div>`;
}

function renderGrid(el, items, link) {
  if (!items.length) {
    el.outerHTML = `<div class="empty">COMING SOON</div>`;
    return;
  }
  el.innerHTML = items.map(p => `
    <${link ? `a href="${link(p)}"` : "div"} class="item">
      <div class="frame">${picture(p)}</div>
      <div class="caption">${esc(p.title)}<br><span>${esc(p.number || p.painted)}${p.sold ? " — SOLD" : ""}</span></div>
    </${link ? "a" : "div"}>`).join("");
}

function renderDetail(el, p, backHref, backLabel, buy = true) {
  // Shop pages skip painted + status (the button already says BUY or SOLD); archive shows them
  const status = p.sold ? `SOLD ${p.sold}` : "AVAILABLE";
  const extra = buy ? [] : [p.painted && `PAINTED ${p.painted}`, status];
  const rows = [p.number, p.size, p.medium, ...extra, p.price]
    .filter(Boolean).map(esc).join("<br>");
  const button = p.sold
    ? `<span class="btn sold">SOLD</span>`
    : `<a class="btn" href="${esc(p.ebay || EBAY_STORE)}" target="_blank" rel="noopener">BUY ON EBAY</a>`;
  const shots = p.image ? [p.image, ...(p.photos || [])] : [];
  const thumbs = shots.length > 1
    ? `<div class="thumbs">${shots.map((s, i) => `<button class="${i ? "" : "on"}" data-src="${esc(s)}"><img src="${esc(s)}" alt="" loading="lazy"></button>`).join("")}</div>`
    : "";
  el.innerHTML = `
    <div class="detail">
      <div class="media">
        <div class="frame">${picture(p)}</div>
        ${thumbs}
      </div>
      <div class="meta">
        <a class="back" href="${backHref}">← ${backLabel}</a>
        <h1>${esc(p.title)}</h1>
        <div>${rows}</div>
        ${p.info ? `<p class="info">${esc(p.info)}</p>` : ""}
        ${buy ? button : ""}
      </div>
    </div>`;
  el.querySelectorAll(".thumbs button").forEach(b => b.addEventListener("click", () => {
    el.querySelector(".frame img").src = b.dataset.src;
    el.querySelectorAll(".thumbs button").forEach(x => x.classList.toggle("on", x === b));
  }));
  document.title = `${p.title} — MARTZ11`;
}

// Private page: thank-you note + certificate of authenticity
function renderCertificate(el, p) {
  const photos = (p.photos || []).length
    ? `<div class="cert-photos">${p.photos.map(s => `<div class="frame"><img src="${esc(s)}" alt="${esc(p.title)}" loading="lazy"></div>`).join("")}</div>`
    : "";
  const rows = [
    ["TITLE", p.title],
    ["NO.", p.number],
    ["EDITION", "1 OF 1"],
    ["SIZE", p.size],
    ["MEDIUM", p.medium],
    ["PAINTED", p.painted],
    ["ARTIST", "MARTZ11"],
    ["COLLECTOR", p.owner],
    ["ACQUIRED", p.purchased]
  ].filter(r => r[1]).map(([k, v]) => `<div class="row"><span>${k}</span><span>${esc(v)}</span></div>`).join("");
  el.innerHTML = `
    <div class="cert">
      <div class="thanks">
        <h1>THANK YOU</h1>
        <p>${esc(p.note || "Thank you for collecting my work. This painting now belongs to you. This page is its certificate of authenticity — keep your code safe.")}</p>
      </div>
      <div class="cert-card">
        <div class="cert-head">CERTIFICATE OF AUTHENTICITY</div>
        <div class="frame">${picture(p)}</div>
        <div class="rows">${rows}</div>
        <p class="cert-text">This certifies that the artwork described above is an original one of one work, hand painted by Martz11.</p>
        <div class="sign">
          <img src="logo.png" alt="Martz11 signature">
          <span>SIGNATURE</span>
        </div>
      </div>
      ${photos}
    </div>`;
  document.title = `${p.title} — CERTIFICATE — MARTZ11`;
}

async function sha256(text) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, "0")).join("");
}

const normalizeCode = c => c.trim().toUpperCase();

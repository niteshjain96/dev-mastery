/* Shared behaviour: progress tracking, index rendering, chapter TOC + nav.
   Progress lives in localStorage only. Nothing leaves this machine.
   No network requests anywhere in this project. */

const STORE = "devmastery.progress";
const CPKEY = "devmastery.criticalpath";

function readProgress(){
  try{ return JSON.parse(localStorage.getItem(STORE)) || {}; }
  catch(e){ return {}; }
}
function writeProgress(p){
  try{ localStorage.setItem(STORE, JSON.stringify(p)); }catch(e){}
}
function isDone(n){ return !!readProgress()["ch" + n]; }
function setDone(n, v){
  const p = readProgress();
  if(v) p["ch" + n] = new Date().toISOString(); else delete p["ch" + n];
  writeProgress(p);
}

const totalSessions = () => CHAPTERS.reduce((a,c) => a + c.sessions, 0);
const readyCount    = () => CHAPTERS.filter(c => c.ready).length;
const critSessions  = () => CHAPTERS.filter(c => c.crit).reduce((a,c) => a + c.sessions, 0);

/* ============================================================
   INDEX PAGE
   ============================================================ */
function renderIndex(){
  const host = document.getElementById("parts");
  if(!host) return;

  host.innerHTML = BOOK.parts.map(p => `
    <section class="part">
      <div class="part-head">
        <span class="part-num">PART ${p.n}</span>
        <h2>${p.name}</h2>
      </div>
      <p class="part-tag">${p.tag}</p>
      <div class="ch-grid">
        ${p.chapters.map(c => chapterCard(c)).join("")}
      </div>
    </section>`).join("");

  refreshIndexProgress();

  host.addEventListener("click", e => {
    const card = e.target.closest(".ch-card.locked");
    if(card) e.preventDefault();
  });
}

function chapterCard(c){
  const done = isDone(c.n);
  const badge = !c.ready
    ? '<span class="badge soon">Not written yet</span>'
    : done ? '<span class="badge done">Completed</span>'
           : '<span class="badge ready">Ready</span>';
  const crit = c.crit ? '<span class="badge crit">30-day path</span>' : "";
  return `
    <a class="ch-card${c.ready ? "" : " locked"}${c.crit ? " is-crit" : ""}" href="chapters/${c.file}" data-ch="${c.n}"${c.ready ? "" : ' aria-disabled="true" tabindex="-1"'}>
      <div class="ch-top">
        <span class="ch-n">CH ${String(c.n).padStart(2,"0")}</span>
        ${badge}${crit}
        ${done ? '<span class="tick">&#10003;</span>' : ""}
      </div>
      <h3>${c.title}</h3>
      <p>${c.blurb}</p>
      <div class="ch-foot">${c.sessions} session${c.sessions > 1 ? "s" : ""} &middot; ~${c.sessions * 75} min</div>
    </a>`;
}

function refreshIndexProgress(){
  const bar = document.getElementById("ptrack");
  if(!bar) return;
  const done = CHAPTERS.filter(c => isDone(c.n)).length;
  const doneSessions = CHAPTERS.filter(c => isDone(c.n)).reduce((a,c) => a + c.sessions, 0);
  bar.style.width = Math.round(done / CHAPTERS.length * 100) + "%";
  document.getElementById("pdone").textContent = done;
  document.getElementById("ptotal").textContent = CHAPTERS.length;
  document.getElementById("phours").textContent = (doneSessions * 75 / 60).toFixed(1);
}

function fillIndexStats(){
  const set = (id, v) => { const el = document.getElementById(id); if(el) el.textContent = v; };
  set("stat-chapters", CHAPTERS.length);
  set("stat-total", CHAPTERS.length);
  set("stat-parts", BOOK.parts.length);
  set("stat-sessions", totalSessions());
  set("stat-hours", Math.round(totalSessions() * 75 / 60));
  set("stat-ready", readyCount());
  set("stat-crit", CHAPTERS.filter(c => c.crit).length);
  set("stat-crithours", Math.round(critSessions() * 75 / 60));
}

/* 30-day critical path filter — UI state only, remembered locally */
function wireCriticalPath(){
  const btn = document.getElementById("cpbtn");
  if(!btn) return;
  const paint = on => {
    document.body.classList.toggle("cp-only", on);
    btn.classList.toggle("on", on);
    btn.textContent = on ? "Showing the 30-day path only" : "Show the 30-day path only";
    btn.setAttribute("aria-pressed", String(on));
  };
  let on = false;
  try{ on = localStorage.getItem(CPKEY) === "1"; }catch(e){}
  paint(on);
  btn.addEventListener("click", () => {
    on = !on;
    try{ localStorage.setItem(CPKEY, on ? "1" : "0"); }catch(e){}
    paint(on);
  });
}

/* ============================================================
   CHAPTER PAGE
   ============================================================ */
function initChapter(){
  const n = parseInt(document.body.dataset.chapter, 10);
  if(!n) return;

  buildTOC();
  buildChapterNav(n);
  buildCompleteButton(n);
  wireScrollSpy();
  wireReadBar();
  wireArrowKeys(n);
}

function slugify(s){
  return s.toLowerCase().replace(/[^\w\s-]/g,"").trim().replace(/\s+/g,"-").slice(0,60);
}

function buildTOC(){
  const toc = document.getElementById("toc");
  const main = document.querySelector(".ch-main");
  if(!toc || !main) return;
  const heads = [...main.querySelectorAll("h2")];
  heads.forEach(h => { if(!h.id) h.id = slugify(h.textContent); });
  toc.innerHTML = heads.map(h =>
    `<li><a href="#${h.id}">${h.textContent}</a></li>`).join("");
}

function wireScrollSpy(){
  const links = [...document.querySelectorAll("#toc a")];
  if(!links.length) return;
  const targets = links.map(a => document.getElementById(a.getAttribute("href").slice(1))).filter(Boolean);
  const onScroll = () => {
    let active = targets[0];
    for(const t of targets){
      if(t.getBoundingClientRect().top <= 120) active = t; else break;
    }
    if(!active) return;
    links.forEach(a => a.classList.toggle("on", a.getAttribute("href") === "#" + active.id));
  };
  window.addEventListener("scroll", onScroll, { passive:true });
  onScroll();
}

function wireReadBar(){
  const bar = document.getElementById("readbar");
  if(!bar) return;
  const onScroll = () => {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + "%";
  };
  window.addEventListener("scroll", onScroll, { passive:true });
  onScroll();
}

function buildChapterNav(n){
  const host = document.getElementById("chnav");
  if(!host) return;
  const i = CHAPTERS.findIndex(c => c.n === n);
  const prev = CHAPTERS[i - 1], next = CHAPTERS[i + 1];
  const link = (c, dir) => c
    ? `<a class="navlink ${dir}" href="${c.file}"><div class="d">${dir === "prev" ? "&larr; Previous" : "Next &rarr;"}</div>
       <div class="t">${String(c.n).padStart(2,"0")}. ${c.title}</div></a>`
    : `<span class="navlink ${dir} empty"></span>`;
  host.innerHTML = link(prev,"prev") + link(next,"next");
}

function buildCompleteButton(n){
  const btn = document.getElementById("markdone");
  if(!btn) return;
  const paint = () => {
    const d = isDone(n);
    btn.classList.toggle("is-done", d);
    btn.textContent = d ? "✓ Chapter complete" : "Mark chapter complete";
  };
  btn.addEventListener("click", () => { setDone(n, !isDone(n)); paint(); });
  paint();
}

function wireArrowKeys(n){
  const i = CHAPTERS.findIndex(c => c.n === n);
  document.addEventListener("keydown", e => {
    if(e.target.matches("input,textarea,summary") || e.metaKey || e.ctrlKey || e.altKey) return;
    if(e.key === "ArrowLeft"  && CHAPTERS[i-1]) location.href = CHAPTERS[i-1].file;
    if(e.key === "ArrowRight" && CHAPTERS[i+1]) location.href = CHAPTERS[i+1].file;
  });
}

/* ============================================================
   STUB PAGES — render the planned outline from book-data
   ============================================================ */
function renderStub(){
  const host = document.getElementById("stub");
  if(!host) return;
  const n = parseInt(document.body.dataset.chapter, 10);
  const c = CHAPTERS.find(x => x.n === n);
  if(!c) return;
  document.title = c.title + " — Chapter " + c.n;
  const h1 = document.getElementById("stub-title");
  if(h1) h1.textContent = c.title;
  const kick = document.getElementById("stub-kicker");
  if(kick) kick.textContent = "Part " + c.part + " · " + c.partName + " · Chapter " + c.n;
  const lede = document.getElementById("stub-lede");
  if(lede) lede.textContent = c.blurb;
  host.innerHTML = `
    <h2>This chapter isn't written yet</h2>
    <p>Part ${c.part} &middot; ${c.sessions} sessions planned &middot; roughly ${c.sessions * 2} Q-blocks.
       Ask Claude to write Chapter ${c.n} when you're ready for it.</p>
    <div class="callout">
      <span class="ct">Planned coverage</span>
      <ul>${(c.outline || []).map(o => `<li>${o}</li>`).join("")}</ul>
    </div>`;
}

/* ============================================================
   BOOT
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  if(document.body.dataset.page === "index"){
    fillIndexStats();
    renderIndex();
    wireCriticalPath();
  } else {
    initChapter();
    renderStub();
  }
});

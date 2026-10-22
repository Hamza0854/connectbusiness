/* =========================================================
   FORMATTING
   ========================================================= */
const num = (n) => n.toLocaleString("en-US");
const money = (n) => `${CURRENCY}${num(n)}`;
const marginOf = (b) => Math.round((b.financials.netProfit / b.financials.revenue) * 100);
const growthOf = (arr) => Math.round(((arr.at(-1) - arr.at(-2)) / arr.at(-2)) * 100);
const profitsOf = (h) => h.revenue.map((r, i) => r - h.expenses[i]);
const WORDS = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve"];
const countWord = (n) => { const w = WORDS[n] ?? String(n); return w[0].toUpperCase() + w.slice(1); };

/* =========================================================
   DEMO DECISIONS (saved in the browser only)
   ========================================================= */
const DECISION_KEY = "bic_decisions";
const getDecisions = () => JSON.parse(localStorage.getItem(DECISION_KEY) || "{}");
function saveDecision(id, value) {
  const d = getDecisions();
  if (value) d[id] = value; else delete d[id];
  localStorage.setItem(DECISION_KEY, JSON.stringify(d));
}

/* =========================================================
   BUSINESS VIEW (shared by owner + investor)
   ========================================================= */
function renderBusinessView(b, mode = "owner") {
  const f = b.financials;
  const h = b.history;
  const inv = b.investment;
  const last = h.years.at(-1);
  const prev = h.years.at(-2);
  const valuation = Math.round(inv.amount / (inv.equity / 100));
  const breakdown = b.expenseBreakdown.labels
    .map((label, i) => ({ label, value: b.expenseBreakdown.values[i] }))
    .sort((a, c) => c.value - a.value);
  const maxExpense = breakdown[0].value;

  return `
  ${mode === "investor" ? `<a class="back-link" href="investor-dashboard.html"><i class="bi bi-chevron-left" aria-hidden="true"></i>All businesses</a>` : ""}

  <header class="biz-head" id="profile">
    <div class="monogram" aria-hidden="true">${b.initials}</div>
    <div>
      <h1 class="biz-title">${b.name}</h1>
      <p class="biz-meta">${b.industry} business in ${b.location}. Founded ${b.founded}, ${b.employees} employees, run by ${b.owner}.</p>
      <p class="biz-desc">${b.description}</p>
    </div>
  </header>

  <div class="row g-4">
    <div class="col-lg-8">
      <section id="financials" aria-label="Financial performance">

        <dl class="panel figures">
          <div class="figure">
            <dt>Revenue in ${last}</dt>
            <dd><span class="value">${money(f.revenue)}</span><span class="change up">Up ${growthOf(h.revenue)}% on ${prev}</span></dd>
          </div>
          <div class="figure">
            <dt>Expenses</dt>
            <dd><span class="value">${money(f.expenses)}</span><span class="change">${Math.round((f.expenses / f.revenue) * 100)}% of revenue</span></dd>
          </div>
          <div class="figure">
            <dt>Net profit</dt>
            <dd><span class="value">${money(f.netProfit)}</span><span class="change up">Up ${growthOf(profitsOf(h))}% on ${prev}</span></dd>
          </div>
          <div class="figure">
            <dt>Profit margin</dt>
            <dd><span class="value">${marginOf(b)}%</span><span class="change">${CURRENCY}${marginOf(b)} kept from every ${CURRENCY}100 earned</span></dd>
          </div>
        </dl>

        <div class="panel panel-pad mb-4">
          <div class="panel-head">
            <div>
              <h2>Revenue and expenses</h2>
              <p class="note">${h.years[0]} to ${last}, in thousands of cedis. The gap between each pair of bars is profit.</p>
            </div>
            <div class="legend" aria-hidden="true">
              <span><i style="background:var(--green)"></i>Revenue</span>
              <span><i style="background:var(--grey-bar)"></i>Expenses</span>
            </div>
          </div>
          <div class="chart-box"><canvas id="revExpChart" role="img" aria-label="Revenue and expenses for ${h.years.join(", ")}"></canvas></div>
        </div>

        <div class="row g-4 mb-4">
          <div class="col-md-6">
            <div class="panel panel-pad h-100">
              <h2>Net profit</h2>
              <p class="note">Yearly profit in thousands of cedis</p>
              <div class="chart-box sm"><canvas id="profitChart" role="img" aria-label="Net profit trend"></canvas></div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="panel panel-pad h-100">
              <h2>Where the money goes</h2>
              <p class="note">Expenses in ${last}, largest first</p>
              <ul class="breakdown">
                ${breakdown.map((e) => `
                  <li>
                    <span>${e.label}</span>
                    <span class="amt">${money(e.value)}<span class="share">${Math.round((e.value / f.expenses) * 100)}%</span></span>
                    <div class="track"><div style="width:${(e.value / maxExpense) * 100}%"></div></div>
                  </li>`).join("")}
              </ul>
            </div>
          </div>
        </div>

        <div class="panel panel-pad">
          <h2>Statement summary</h2>
          <p class="note">Financial year ${last}, in cedis. Amounts in brackets are subtracted.</p>
          <table class="ledger mt-2">
            <tbody>
              <tr><td>Revenue</td><td>${num(f.revenue)}</td></tr>
              <tr class="less"><td>Less expenses</td><td>(${num(f.expenses)})</td></tr>
              <tr class="total"><td>Net profit</td><td>${num(f.netProfit)}</td></tr>
            </tbody>
            <tbody>
              <tr><td>Total assets</td><td>${num(f.assets)}</td></tr>
              <tr class="less"><td>Less liabilities</td><td>(${num(f.liabilities)})</td></tr>
              <tr class="total"><td>Net worth</td><td>${num(f.assets - f.liabilities)}</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>

    <div class="col-lg-4">
      <aside class="ask-col" id="investment" aria-label="Investment request">
        <div class="ask">
          <h2 class="ask-title">Investment request</h2>
          <p class="amount">${money(inv.amount)}</p>
          <p class="for">in exchange for ${inv.equity}% of the business</p>

          <div class="equity-bar" role="img" aria-label="${inv.equity}% offered to investors, ${100 - inv.equity}% kept by the owner">
            <span style="width:${inv.equity}%"></span>
          </div>
          <div class="equity-key"><span>${inv.equity}% offered</span><span>${100 - inv.equity}% kept by owner</span></div>

          <dl class="ask-facts">
            <div><dt>Business valued at</dt><dd>${money(valuation)}</dd></div>
            <div><dt>Purpose</dt><dd>${inv.purpose}</dd></div>
          </dl>

          <h3 class="ask-sub">How the money will be used</h3>
          <ul class="funds">
            ${inv.useOfFunds.map((u) => `
              <li><span>${u.label}</span><span>${u.pct}%</span>
                <div class="funds-track"><div style="width:${u.pct}%"></div></div>
              </li>`).join("")}
          </ul>

          ${mode === "investor" ? `<div class="decision" id="decisionArea" aria-live="polite"></div>` : ""}
        </div>
        ${mode === "owner" ? listingPanel(b) : ""}
      </aside>
    </div>
  </div>`;
}

function listingPanel(b) {
  const l = b.listing || { views: 0, interested: 0, updated: "Not yet" };
  return `
    <div class="panel panel-pad mt-4">
      <h2>Your listing</h2>
      <p class="note">What investors see. Figures can't be edited in this prototype.</p>
      <table class="ledger mt-2">
        <tbody>
          <tr><td>Status</td><td><span class="status-live">Visible to investors</span></td></tr>
          <tr><td>Profile views</td><td>${l.views}</td></tr>
          <tr><td>Investors interested</td><td>${l.interested}</td></tr>
          <tr><td>Last updated</td><td>${l.updated}</td></tr>
        </tbody>
      </table>
    </div>`;
}

/* =========================================================
   INVESTOR DECISION (simulation)
   ========================================================= */
function renderDecision(b) {
  const area = document.getElementById("decisionArea");
  const d = getDecisions()[b.id];

  if (!d) {
    area.innerHTML = `
      <p class="decision-q">Would you like to take this further?</p>
      <div class="d-grid gap-2">
        <button type="button" class="btn btn-gold" data-decision="interested">Interested</button>
        <button type="button" class="btn btn-on-green" data-decision="not">Not interested</button>
      </div>
      <p class="decision-note">This is a prototype. No money moves and the owner isn't contacted.</p>`;
    return;
  }

  const done = d === "interested"
    ? { icon: "bi-check-circle-fill", title: "Marked as interested", text: `In the full version, ${b.owner} would be told you'd like to talk.` }
    : { icon: "bi-dash-circle", title: "Marked as not interested", text: `${b.name} stays in your list. You can change your mind at any time.` };

  area.innerHTML = `
    <div class="decision-done" role="status">
      <i class="bi ${done.icon}" aria-hidden="true"></i>
      <div><strong>${done.title}</strong><p>${done.text}</p></div>
    </div>
    <button type="button" class="link-on-green" data-decision="reset">Change decision</button>`;
}

/* =========================================================
   CHARTS
   ========================================================= */
function initCharts(b) {
  const css = getComputedStyle(document.documentElement);
  const c = (name) => css.getPropertyValue(name).trim();

  Chart.defaults.font.family = "'Instrument Sans', system-ui, sans-serif";
  Chart.defaults.font.size = 12;
  Chart.defaults.color = c("--muted");
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) Chart.defaults.animation = false;

  const h = b.history;
  const toK = (arr) => arr.map((v) => v / 1000);
  const tooltip = {
    backgroundColor: c("--ink"), padding: 10, cornerRadius: 6, displayColors: false,
    callbacks: { label: (ctx) => `${ctx.dataset.label}: ${money(ctx.raw * 1000)}` }
  };
  const xAxis = { border: { display: false }, grid: { display: false }, ticks: { color: c("--ink"), font: { weight: "500" } } };
  const yAxis = { beginAtZero: true, border: { display: false }, grid: { color: c("--line") }, ticks: { maxTicksLimit: 5, callback: (v) => `${v}k` } };

  new Chart(document.getElementById("revExpChart"), {
    type: "bar",
    data: {
      labels: h.years,
      datasets: [
        { label: "Revenue", data: toK(h.revenue), backgroundColor: c("--green"), borderRadius: 4, categoryPercentage: .55, barPercentage: .92 },
        { label: "Expenses", data: toK(h.expenses), backgroundColor: c("--grey-bar"), borderRadius: 4, categoryPercentage: .55, barPercentage: .92 }
      ]
    },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip }, scales: { x: xAxis, y: yAxis } }
  });

  new Chart(document.getElementById("profitChart"), {
    type: "line",
    data: {
      labels: h.years,
      datasets: [{
        label: "Net profit", data: toK(profitsOf(h)),
        borderColor: c("--green"), borderWidth: 2.5, tension: .3,
        pointRadius: 5, pointHoverRadius: 6, pointBackgroundColor: "#fff",
        pointBorderColor: c("--green"), pointBorderWidth: 2.5
      }]
    },
    options: { responsive: true, maintainAspectRatio: false, layout: { padding: { top: 8 } }, plugins: { legend: { display: false }, tooltip }, scales: { x: xAxis, y: yAxis } }
  });
}

/* =========================================================
   PAGE: SIGN IN
   ========================================================= */
function initLogin() {
  const form = document.getElementById("loginForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!form.checkValidity()) { form.classList.add("was-validated"); return; }
    const btn = form.querySelector("button[type=submit]");
    btn.disabled = true;
    btn.innerHTML = `<span class="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>Signing in`;
    setTimeout(() => (window.location.href = form.dataset.redirect), 600);
  });
}

/* =========================================================
   PAGE: OWNER DASHBOARD
   ========================================================= */
function initOwner() {
  const b = getBusinessById(OWNER_BUSINESS_ID);
  document.getElementById("businessView").innerHTML = renderBusinessView(b, "owner");
  initCharts(b);
}

/* =========================================================
   PAGE: INVESTOR EXPLORE
   ========================================================= */
function initInvestor() {
  const ALL = "All industries";
  const total = businesses.reduce((s, b) => s + b.investment.amount, 0);
  document.getElementById("exploreTitle").textContent =
    `${countWord(businesses.length)} businesses are raising ${money(total)}`;

  const filter = document.getElementById("industryFilter");
  const search = document.getElementById("searchInput");
  const industries = [ALL, ...new Set(businesses.map((b) => b.industry))];
  const state = { industry: ALL, query: "" };

  filter.innerHTML = industries
    .map((ind) => `<button type="button" data-industry="${ind}" aria-pressed="${ind === ALL}">${ind}</button>`)
    .join("");

  const syncPressed = () =>
    filter.querySelectorAll("button").forEach((btn) => btn.setAttribute("aria-pressed", btn.dataset.industry === state.industry));

  const reset = () => { state.industry = ALL; state.query = ""; search.value = ""; syncPressed(); draw(); };

  const draw = () => {
    const list = businesses.filter((b) =>
      (state.industry === ALL || b.industry === state.industry) &&
      `${b.name} ${b.industry} ${b.location}`.toLowerCase().includes(state.query));
    renderListing(list, reset);
  };

  filter.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;
    state.industry = btn.dataset.industry;
    syncPressed();
    draw();
  });
  search.addEventListener("input", () => { state.query = search.value.trim().toLowerCase(); draw(); });

  draw();
}

function renderListing(list, onReset) {
  const body = document.getElementById("listingBody");
  document.getElementById("resultCount").textContent = `Showing ${list.length} of ${businesses.length} businesses.`;

  if (!list.length) {
    body.innerHTML = `
      <div class="listing-empty">
        <p>No businesses match that search. Try another name or town, or show every industry.</p>
        <button type="button" class="btn btn-quiet" id="resetFilters">Show all businesses</button>
      </div>`;
    document.getElementById("resetFilters").addEventListener("click", onReset);
    return;
  }

  const decisions = getDecisions();
  body.innerHTML = list.map((b) => {
    const url = `business-details.html?id=${b.id}`;
    const d = decisions[b.id];
    const status = d === "interested" ? `<span class="row-status interested">Interested</span>`
                 : d === "not" ? `<span class="row-status not">Not interested</span>` : "";
    return `
      <article class="listing-row">
        <div class="cell-biz">
          <div class="monogram sm" aria-hidden="true">${b.initials}</div>
          <div>
            <h2 class="row-title"><a href="${url}">${b.name}</a></h2>
            <p class="row-meta">${b.industry} in ${b.location}</p>
            <p class="row-desc">${b.tagline}</p>
            ${status}
          </div>
        </div>
        <div class="cell">
          <span class="cell-label">Revenue, 2025</span>
          <strong>${money(b.financials.revenue)}</strong>
          <span class="sub">Up ${growthOf(b.history.revenue)}% on 2024</span>
        </div>
        <div class="cell">
          <span class="cell-label">Profit margin</span>
          <strong>${marginOf(b)}%</strong>
          <div class="mini-track"><div style="width:${marginOf(b)}%"></div></div>
        </div>
        <div class="cell">
          <span class="cell-label">Raising</span>
          <strong>${money(b.investment.amount)}</strong>
          <span class="sub">for ${b.investment.equity}% equity</span>
        </div>
        <div class="cell-action">
          <a class="btn btn-quiet btn-sm" href="${url}" aria-label="Review ${b.name}">Review</a>
        </div>
      </article>`;
  }).join("");
}

/* =========================================================
   PAGE: BUSINESS DETAILS (investor)
   ========================================================= */
function initDetails() {
  const b = getBusinessById(new URLSearchParams(window.location.search).get("id"));
  const view = document.getElementById("businessView");

  if (!b) {
    view.innerHTML = `
      <div class="panel listing-empty">
        <p>This business isn't listed. It may have been removed, or the link is incomplete.</p>
        <a href="investor-dashboard.html" class="btn btn-main">See all businesses</a>
      </div>`;
    return;
  }

  document.title = `${b.name} | Business & Investor Connect`;
  view.innerHTML = renderBusinessView(b, "investor");
  initCharts(b);
  renderDecision(b);

  const area = document.getElementById("decisionArea");
  area.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-decision]");
    if (!btn) return;
    const value = btn.dataset.decision;
    saveDecision(b.id, value === "reset" ? null : value);
    renderDecision(b);
    area.querySelector("button")?.focus();
  });
}

/* =========================================================
   ROUTER
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  const page = document.body.dataset.page;
  if (page === "login") initLogin();
  if (page === "owner-dashboard") initOwner();
  if (page === "investor-dashboard") initInvestor();
  if (page === "business-details") initDetails();
});
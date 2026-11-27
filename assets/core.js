/* Демо-сайт v3: каталог с фильтрами и сортировкой, черновик спецификации (BOM), Quick-Desk, карточка, формы (демо).
   Без внешних зависимостей; работает по file:// и по HTTP. */
(function () {
  "use strict";
  var C = window.CATALOG;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" }[c]; }); }
  function params() { var o = {}; var q = location.search.replace(/^\?/, ""); if (!q) return o;
    q.split("&").forEach(function (kv) { if (!kv) return; var i = kv.indexOf("="); var k = i < 0 ? kv : kv.slice(0, i), v = i < 0 ? "" : kv.slice(i + 1);
      try { o[decodeURIComponent(k)] = decodeURIComponent(v.replace(/\+/g, " ")); } catch (e) {} }); return o; }
  function qstr(o) { return Object.keys(o).filter(function (k) { return o[k] != null && o[k] !== ""; })
    .map(function (k) { return encodeURIComponent(k) + "=" + encodeURIComponent(o[k]); }).join("&"); }
  var P = params();
  var byId = {}; C.PRODUCTS.forEach(function (p) { byId[p.id] = p; });
  var ss = { get: function (k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } }, set: function (k, v) { try { sessionStorage.setItem(k, v); } catch (e) {} } };
  var ls = { get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } }, set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} } };

  /* UTM / referrer */
  var UTM = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
  (function () { if (UTM.some(function (k) { return P[k]; })) { var u = {}; UTM.forEach(function (k) { if (P[k]) u[k] = P[k]; }); ss.set("v3_utm", JSON.stringify(u)); }
    if (!ss.get("v3_ref")) ss.set("v3_ref", document.referrer || "(direct)");
    if (!ss.get("v3_landing")) ss.set("v3_landing", location.pathname.split("/").pop() + location.search); })();
  function utm() { try { return JSON.parse(ss.get("v3_utm") || "{}"); } catch (e) { return {}; } }

  /* Тост */
  var toastT;
  function toast(msg) { var t = $("#toast"); if (!t) { t = document.createElement("div"); t.id = "toast"; t.className = "toast"; t.setAttribute("role", "status"); t.setAttribute("aria-live", "polite"); document.body.appendChild(t); }
    t.textContent = msg; t.classList.add("on"); clearTimeout(toastT); toastT = setTimeout(function () { t.classList.remove("on"); }, 2200); }

  /* Копирование SKU */
  function copyText(txt) {
    window.__lastCopied = txt;
    function fallback() { var ta = document.createElement("textarea"); ta.value = txt; ta.setAttribute("readonly", ""); ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select(); try { document.execCommand("copy"); } catch (e) {} document.body.removeChild(ta); }
    try { if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(txt).catch(fallback); else fallback(); } catch (e) { fallback(); }
    toast("SKU скопирован: " + txt);
  }

  /* Разметка */
  function cond(k) { return C.CONDITIONS[k] || { label: k, def: "" }; }
  function badge(k) { return '<span class="badge cond-' + esc(k) + '" title="' + esc(cond(k).def) + '">' + esc(cond(k).label) + "</span>"; }
  function avail(k) { var a = C.AVAILABILITY[k]; return '<span class="avail avail-' + esc(k) + '"><i></i>' + esc(a ? a.label : k) + "</span>"; }
  function rfqHref(p) { return "rfq.html?" + qstr({ product_id: p.id, sku: p.sku, title: p.title, condition: cond(p.condition).label }); }
  function prodHref(p) { return "product.html?id=" + encodeURIComponent(p.id); }
  var DEMO_TAG = '<span class="demo-tag" data-demo-tag>Демо-пример · наличие и состояние для макета</span>';
  function copyBtn(p) { return '<button type="button" class="copy-btn" data-copy="' + esc(p.sku) + '" title="Скопировать SKU" aria-label="Скопировать SKU ' + esc(p.sku) + '"><svg viewBox="0 0 16 16" aria-hidden="true"><rect x="5" y="5" width="9" height="9" rx="1.5"/><path d="M11 5V3.5A1.5 1.5 0 0 0 9.5 2h-6A1.5 1.5 0 0 0 2 3.5v6A1.5 1.5 0 0 0 3.5 11H5"/></svg></button>'; }
  function addBtn(p, cls) { return '<button type="button" class="btn btn-add ' + (cls || "") + '" data-add-bom="' + esc(p.id) + '">+ В ТЗ</button>'; }
  function ttx(p, n) { return p.specs.slice(0, n).map(function (s) { return '<li><span class="k">' + esc(s[0]) + '</span><span class="v">' + esc(s[1]) + "</span></li>"; }).join(""); }
  var R = {
    table: function (list) {
      return '<div class="tbl-wrap"><table class="ptable"><thead><tr><th class="c-pos">Позиция · SKU</th><th>Модель и ключевые ТТХ</th><th class="c-cond">Состояние</th><th class="c-av">Наличие</th><th class="c-price">Цена</th><th class="c-act"><span class="sr">Действия</span></th></tr></thead><tbody>' +
        list.map(function (p) {
          return '<tr data-product-row="' + esc(p.id) + '" data-cond="' + esc(p.condition) + '" data-cat="' + esc(p.category) + '" data-vendor="' + esc(p.vendor) + '" data-av="' + esc(p.availability) + '">' +
            '<td class="c-pos"><a class="thumb" href="' + prodHref(p) + '" tabindex="-1" aria-hidden="true"><img src="' + esc(p.thumb) + '" alt=""></a>' +
            '<div class="sku-line"><a class="sku mono" href="' + prodHref(p) + '">' + esc(p.sku) + "</a>" + copyBtn(p) + "</div>" + DEMO_TAG + "</td>" +
            '<td class="c-model"><a class="m-title" href="' + prodHref(p) + '">' + esc(p.title) + '</a><ul class="ttx">' + ttx(p, 6) + "</ul></td>" +
            '<td class="c-cond">' + badge(p.condition) + "</td><td class=\"c-av\">" + avail(p.availability) + '</td><td class="c-price"><span class="price">По запросу</span></td>' +
            '<td class="c-act"><a class="btn btn-primary btn-sm" data-rfq href="' + rfqHref(p) + '">Запросить КП</a>' + addBtn(p, "btn-sm") + "</td></tr>";
        }).join("") + "</tbody></table></div>";
    },
    cards: function (list) {
      return '<div class="pgrid">' + list.map(function (p) {
        return '<article class="pcard" data-product-row="' + esc(p.id) + '" data-cond="' + esc(p.condition) + '" data-cat="' + esc(p.category) + '" data-vendor="' + esc(p.vendor) + '" data-av="' + esc(p.availability) + '">' +
          '<a class="pcard-img" href="' + prodHref(p) + '"><img src="' + esc(p.thumb) + '" alt="' + esc(p.title) + '"></a><div class="pcard-body">' +
          '<div class="pcard-meta">' + badge(p.condition) + avail(p.availability) + "</div>" +
          '<a class="pcard-title" href="' + prodHref(p) + '">' + esc(p.title) + '</a><div class="sku-line"><span class="sku mono">' + esc(p.sku) + "</span>" + copyBtn(p) + "</div>" + DEMO_TAG +
          '<ul class="ttx ttx-cards">' + ttx(p, 4) + '</ul><div class="pcard-foot"><span class="price">По запросу</span><span class="pcard-act"><a class="btn btn-primary btn-sm" data-rfq href="' + rfqHref(p) + '">Запросить КП</a>' + addBtn(p, "btn-sm") + "</span></div></div></article>";
      }).join("") + "</div>";
    }
  };

  /* Каталог */
  var CATALOGS = [];
  function initCatalog(root) {
    var st = { q: P.q || "", category: P.category || "", vendor: P.vendor || "", condition: P.condition || "", availability: P.availability || "",
      sort: P.sort || "default", view: P.view || root.getAttribute("data-view") || "table" };
    var res = $("[data-results]", root), cnt = $("[data-count]", root);
    function match(p, skip) {
      if (skip !== "category" && st.category && p.category !== st.category) return false;
      if (skip !== "vendor" && st.vendor && p.vendor !== st.vendor) return false;
      if (skip !== "condition" && st.condition && p.condition !== st.condition) return false;
      if (skip !== "availability" && st.availability && p.availability !== st.availability) return false;
      if (st.q) { var hay = (p.sku + " " + p.title + " " + p.vendor + " " + p.specs.map(function (s) { return s[1]; }).join(" ")).toLowerCase().replace(/[-\s]/g, "");
        var ok = st.q.toLowerCase().split(/\s+/).filter(Boolean).every(function (t) { return hay.indexOf(t.replace(/-/g, "")) >= 0; }); if (!ok) return false; }
      return true;
    }
    function sorted(list) {
      var l = list.slice();
      if (st.sort === "stock") l.sort(function (a, b) { return (a.availability === "in_stock" ? 0 : 1) - (b.availability === "in_stock" ? 0 : 1) || a.n - b.n; });
      else if (st.sort === "vendor") l.sort(function (a, b) { return a.vendor.localeCompare(b.vendor, "ru") || a.n - b.n; });
      else if (st.sort === "form") l.sort(function (a, b) { return (C.FORM_ORDER[a.form] || 9) - (C.FORM_ORDER[b.form] || 9) || a.n - b.n; });
      else l.sort(function (a, b) { return a.n - b.n; });
      return l;
    }
    function counts(key) { var o = { "": 0 }; C.PRODUCTS.forEach(function (p) { if (match(p, key)) { o[""]++; o[p[key]] = (o[p[key]] || 0) + 1; } }); return o; }
    function sync() {
      var cc = { condition: counts("condition"), category: counts("category"), availability: counts("availability"), vendor: counts("vendor") };
      $$("[data-fbtn]", root).forEach(function (b) { var k = b.getAttribute("data-key"), v = b.getAttribute("data-value"), on = (st[k] || "") === v;
        b.classList.toggle("is-on", on); b.setAttribute("aria-pressed", on ? "true" : "false");
        var n = $(".n", b); if (n && cc[k]) { var c = cc[k][v] || 0; n.textContent = c; b.classList.toggle("is-zero", c === 0 && !on); } });
      $$("[data-fsel]", root).forEach(function (s) { s.value = st[s.getAttribute("data-fsel")] || (s.getAttribute("data-fsel") === "sort" ? "default" : ""); });
      $$("[data-fsearch]", root).forEach(function (s) { if (s.value !== st.q) s.value = st.q; });
      $$("button[data-view]", root).forEach(function (b) { var on = b.getAttribute("data-view") === st.view; b.classList.toggle("is-on", on); b.setAttribute("aria-pressed", on ? "true" : "false"); });
      var h = $("[data-cat-h1]"); if (h && root.hasAttribute("data-main-catalog")) h.textContent = st.category ? C.CATEGORIES[st.category].h1 : h.getAttribute("data-default");
    }
    function render() {
      var list = sorted(C.PRODUCTS.filter(function (p) { return match(p); }));
      if (cnt) cnt.innerHTML = list.length ? 'Найдено: <b>' + list.length + "</b> из " + C.PRODUCTS.length + " · демо-каталог" : "Ничего не найдено";
      res.setAttribute("data-shown", String(list.length));
      res.innerHTML = list.length ? R[st.view](list) : '<div class="empty"><b>Не нашли нужную модель или партномер?</b><p>Каталог показывает часть доступного ассортимента. Отправьте перечень позиций или ТЗ — проверим наличие и подготовим расчёт.</p><a class="btn btn-primary" href="rfq-spec.html' + (st.q ? "?" + qstr({ sku_list: st.q }) : "") + '">Отправить ТЗ на расчёт</a></div>';
      sync(); BOM.mark();
    }
    root.addEventListener("click", function (e) {
      var b = e.target.closest("[data-fbtn]"); if (b && root.contains(b)) { var k = b.getAttribute("data-key"), v = b.getAttribute("data-value"); st[k] = (st[k] === v && v !== "") ? "" : v; render(); return; }
      var v2 = e.target.closest("button[data-view]"); if (v2 && root.contains(v2)) { st.view = v2.getAttribute("data-view"); render(); return; }
      if (e.target.closest("[data-reset]")) { st.q = st.category = st.vendor = st.condition = st.availability = ""; st.sort = "default"; render(); }
    });
    root.addEventListener("input", function (e) { if (e.target.matches("[data-fsearch]")) { st.q = e.target.value.trim(); render(); } });
    root.addEventListener("change", function (e) { if (e.target.matches("[data-fsel]")) { st[e.target.getAttribute("data-fsel")] = e.target.value; render(); } });
    $$("form[data-search-form]", root).forEach(function (f) { f.addEventListener("submit", function (e) { e.preventDefault(); render(); }); });
    var api = { root: root, apply: function (o) { Object.keys(o).forEach(function (k) { st[k] = o[k]; }); render(); }, state: st };
    CATALOGS.push(api); render(); return api;
  }

  /* Черновик спецификации (BOM) в localStorage */
  var BOM = (function () {
    var KEY = "v3_bom_draft";
    function load() { try { var a = JSON.parse(ls.get(KEY) || "[]"); return a.filter(function (x) { return byId[x.id] && x.qty > 0; }); } catch (e) { return []; } }
    var items = load(), open = false;
    function save() { ls.set(KEY, JSON.stringify(items)); render(); }
    function find(id) { for (var i = 0; i < items.length; i++) if (items[i].id === id) return items[i]; return null; }
    function add(id) { var it = find(id); if (it) it.qty++; else items.push({ id: id, qty: 1 }); save(); toast("Добавлено в черновик спецификации: " + byId[id].sku); }
    function setQty(id, d) { var it = find(id); if (!it) return; it.qty = Math.max(1, Math.min(999, it.qty + d)); save(); }
    function remove(id) { items = items.filter(function (x) { return x.id !== id; }); save(); }
    function clear() { items = []; save(); }
    function totals() { return { pos: items.length, qty: items.reduce(function (s, x) { return s + x.qty; }, 0) }; }
    function asTable() { return "SKU | Модель | Состояние | Кол-во\n" + items.map(function (x) { var p = byId[x.id]; return p.sku + " | " + p.title + " | " + cond(p.condition).label + " | " + x.qty; }).join("\n"); }
    function asJson() { return items.map(function (x) { var p = byId[x.id]; return { product_id: p.id, sku: p.sku, title: p.title, condition: cond(p.condition).label, qty: x.qty }; }); }
    function mark() { $$("[data-add-bom]").forEach(function (b) { var it = find(b.getAttribute("data-add-bom")); b.classList.toggle("in-bom", !!it);
      if (!b.hasAttribute("data-label")) b.setAttribute("data-label", b.textContent);
      b.textContent = it ? "✓ В ТЗ · " + it.qty : b.getAttribute("data-label"); }); }
    function render() {
      var t = totals();
      $$("[data-bom-count]").forEach(function (el) { el.textContent = t.pos; });
      $$("[data-bom-btn]").forEach(function (el) { el.classList.toggle("has-items", t.pos > 0); });
      var panel = $("#bom"); if (!panel) return;
      var vis = t.pos > 0 || open;
      panel.hidden = !vis; document.body.classList.toggle("has-bom", vis);
      panel.classList.toggle("is-open", open);
      $("[data-bom-sum]", panel).innerHTML = t.pos ? "<b>" + t.pos + "</b> поз. · <b>" + t.qty + "</b> шт." : "пусто";
      var list = $("[data-bom-list]", panel);
      list.innerHTML = t.pos ? items.map(function (x) { var p = byId[x.id];
        return '<li data-bom-item="' + esc(p.id) + '"><span class="mono b-sku">' + esc(p.sku) + '</span><span class="b-title">' + esc(p.title) + "</span>" + badge(p.condition) +
          '<span class="qty"><button type="button" data-bom-dec="' + esc(p.id) + '" aria-label="Уменьшить количество">−</button><output class="mono" data-bom-qty>' + x.qty + '</output><button type="button" data-bom-inc="' + esc(p.id) + '" aria-label="Увеличить количество">+</button></span>' +
          '<button type="button" class="b-del" data-bom-del="' + esc(p.id) + '" aria-label="Удалить ' + esc(p.sku) + '">✕</button></li>'; }).join("") :
        '<li class="b-empty">Добавьте позиции кнопкой «+ В ТЗ» в каталоге или в карточке — черновик сохранится между страницами.</li>';
      $$("[data-bom-go]", panel).forEach(function (a) { a.classList.toggle("is-disabled", !t.pos); a.setAttribute("aria-disabled", t.pos ? "false" : "true"); });
      $("[data-bom-toggle]", panel).setAttribute("aria-expanded", open ? "true" : "false");
      mark();
    }
    document.addEventListener("click", function (e) {
      var a = e.target.closest("[data-add-bom]"); if (a) { add(a.getAttribute("data-add-bom")); return; }
      var c = e.target.closest("[data-copy]"); if (c) { copyText(c.getAttribute("data-copy")); return; }
      var x;
      if ((x = e.target.closest("[data-bom-inc]"))) { setQty(x.getAttribute("data-bom-inc"), 1); return; }
      if ((x = e.target.closest("[data-bom-dec]"))) { setQty(x.getAttribute("data-bom-dec"), -1); return; }
      if ((x = e.target.closest("[data-bom-del]"))) { remove(x.getAttribute("data-bom-del")); return; }
      if (e.target.closest("[data-bom-clear]")) { clear(); return; }
      if (e.target.closest("[data-bom-toggle]") || e.target.closest("[data-bom-btn]")) { open = !open; render(); return; }
      var g = e.target.closest("[data-bom-go]"); if (g && g.classList.contains("is-disabled")) { e.preventDefault(); }
    });
    window.addEventListener("storage", function (e) { if (e.key === KEY) { items = load(); render(); } });
    return { render: render, mark: mark, items: function () { return items; }, asTable: asTable, asJson: asJson, add: add };
  })();
  window.__bom = BOM;

  /* Карточка */
  function initProduct(root) {
    var p = byId[P.id];
    if (!p) { root.innerHTML = '<section class="p-sec"><div class="wrap"><div class="empty"><b>Позиция не найдена</b><p>Проверьте ссылку или откройте каталог.</p><a class="btn btn-primary" href="catalog.html">Открыть каталог</a></div></div></section>'; return; }
    var c = cond(p.condition), cat = C.CATEGORIES[p.category];
    document.title = p.h1 + " — демо-сайт v3";
    var set = function (k, html) { $$('[data-p="' + k + '"]', root).forEach(function (el) { el.innerHTML = html; }); };
    set("h1", esc(p.type) + " " + esc(p.brand) + " " + esc(p.model) + ' <span class="h1-sku mono">(' + esc(p.sku) + ")</span>");
    set("badge", badge(p.condition)); set("avail", avail(p.availability)); set("sku", esc(p.sku));
    set("cat", '<a href="catalog.html?category=' + p.category + '">' + esc(cat.label) + "</a>");
    set("img", '<img src="' + esc(p.img) + '" alt="Технический чертёж: ' + esc(p.title) + '">');
    set("specs", p.specs.concat([["Партномер (SKU)", p.sku], ["Состояние", c.label], ["Наличие", C.AVAILABILITY[p.availability].long]]).slice(0, 12).map(function (s) {
      return "<tr><th>" + esc(s[0]) + "</th><td" + (/Партномер/.test(s[0]) ? ' class="mono"' : "") + ">" + esc(s[1]) + "</td></tr>"; }).join(""));
    set("cond-def", "<b>" + esc(c.label) + ".</b> " + esc(c.def));
    set("cond-note", c.note ? esc(c.note) : "Гарантийные условия фиксируются в коммерческом предложении и договоре поставки.");
    set("delivery", p.availability === "in_stock" ? "Отгрузка со склада в Москве после оплаты/согласования; доставка транспортными компаниями по РФ." : "Срок поставки рассчитывается индивидуально по запросу.");
    $$('[data-p="rfq-link"]', root).forEach(function (a) { a.setAttribute("href", rfqHref(p)); });
    $$('[data-p="add"]', root).forEach(function (b) { b.setAttribute("data-add-bom", p.id); b.setAttribute("data-label", "+ Добавить в спецификацию (ТЗ)"); });
    $$('[data-p="copy"]', root).forEach(function (b) { b.setAttribute("data-copy", p.sku); });
    var sim = C.PRODUCTS.filter(function (x) { return x.id !== p.id && x.category === p.category; });
    sim = sim.concat(C.PRODUCTS.filter(function (x) { return x.id !== p.id && x.category !== p.category && (x.vendor === p.vendor); })).slice(0, 4);
    set("similar", R.cards(sim));
    BOM.mark();
  }

  /* Quick-Desk */
  function initQuickDesk(qd) {
    var cnd = "";
    qd.addEventListener("click", function (e) {
      var t = e.target.closest("[data-qd-tab]");
      if (t) { var id = t.getAttribute("data-qd-tab"); $$("[data-qd-tab]", qd).forEach(function (x) { var on = x === t; x.classList.toggle("is-on", on); x.setAttribute("aria-selected", on ? "true" : "false"); });
        $$("[data-qd-panel]", qd).forEach(function (p) { p.hidden = p.getAttribute("data-qd-panel") !== id; }); return; }
      var c = e.target.closest("[data-qd-cond]"); if (c) { var v = c.getAttribute("data-qd-cond"); cnd = cnd === v ? "" : v;
        $$("[data-qd-cond]", qd).forEach(function (x) { var on = x.getAttribute("data-qd-cond") === cnd; x.classList.toggle("is-on", on); x.setAttribute("aria-pressed", on ? "true" : "false"); }); return; }
      var ex = e.target.closest("[data-qd-example]"); if (ex) { $("[name=qd_q]", qd).value = ex.getAttribute("data-qd-example"); $("[name=qd_q]", qd).focus(); }
    });
    var sf = $("form[data-qd-search]", qd);
    if (sf) sf.addEventListener("submit", function (e) { e.preventDefault(); var q = $("[name=qd_q]", qd).value.trim();
      var main = CATALOGS.filter(function (c) { return c.root.hasAttribute("data-main-catalog"); })[0];
      if (main) { main.apply({ q: q, condition: cnd }); var z = $("#workzone"); if (z) z.scrollIntoView({ behavior: "auto", block: "start" }); }
      else location.href = "catalog.html?" + qstr({ q: q, condition: cnd }); });
    var fi = $("input[type=file]", qd), info = $("[data-qd-file-info]", qd);
    if (fi) fi.addEventListener("change", function () { var f = fi.files[0]; info.textContent = f ? f.name + " · " + (f.size / 1048576).toFixed(2) + " МБ" : "Файл не выбран"; });
    var tf = $("form[data-qd-spec]", qd);
    if (tf) tf.addEventListener("submit", function (e) { e.preventDefault(); var f = fi && fi.files[0];
      if (f) ss.set("v3_qd_file", f.name + " · " + (f.size / 1048576).toFixed(2) + " МБ");
      location.href = "rfq-spec.html?" + qstr({ sku_list: $("[name=qd_list]", qd).value.trim(), segment: P.segment || "" }); });
  }

  /* Формы */
  var MAX = 15 * 1024 * 1024, EXT = ["pdf", "xls", "xlsx", "doc", "docx"];
  function moscow() { try { return new Intl.DateTimeFormat("ru-RU", { timeZone: "Europe/Moscow", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" }).format(new Date()) + " (Europe/Moscow)"; } catch (e) { return new Date().toISOString(); } }
  function initForm(f) {
    var kind = f.getAttribute("data-lead"); f.setAttribute("novalidate", "novalidate");
    var need = $('[name="need"]', f);
    if (kind === "rfq" && P.sku) {
      ["product_id", "sku", "title", "condition"].forEach(function (k) { var i = $('[name="' + k + '"]', f); if (i) i.value = P[k] || ""; });
      if (need && !need.value) need.value = (P.title || "") + " · SKU: " + P.sku + " · Состояние: " + (P.condition || "") + " · Кол-во: 1";
      var chip = $("[data-prefill-chip]", f); if (chip) { chip.hidden = false; chip.innerHTML = '<span class="pc-l">Позиция из каталога</span><b>' + esc(P.title || "") + '</b><span class="mono">' + esc(P.sku) + "</span>" + esc(P.condition || ""); }
    }
    if (kind === "spec") {
      var bomIn = $('[name="bom_json"]', f), prev = $("[data-bom-preview]");
      if (P.from === "bom" && BOM.items().length) {
        if (need) need.value = BOM.asTable(); if (bomIn) bomIn.value = JSON.stringify(BOM.asJson());
        if (prev) { prev.hidden = false; $("tbody", prev).innerHTML = BOM.asJson().map(function (r) { return "<tr><td class=\"mono\">" + esc(r.sku) + "</td><td>" + esc(r.title) + "</td><td>" + esc(r.condition) + "</td><td class=\"num\">" + r.qty + "</td></tr>"; }).join(""); }
      } else if (P.sku_list && need) { need.value = P.sku_list; }
      var qf = ss.get("v3_qd_file"), hint = $("[data-qd-file-hint]", f);
      if (qf && hint) { hint.hidden = false; hint.textContent = "В Quick-Desk выбран файл «" + qf + "». Браузер не передаёт файлы между страницами — прикрепите его здесь ещё раз."; }
    }
    if (P.segment) { var sg = $('[name="segment"]', f); if (sg) sg.value = P.segment; }
    var u = utm(); UTM.forEach(function (k) { var i = $('[name="' + k + '"]', f); if (i) i.value = u[k] || ""; });
    var rf = $('[name="referrer"]', f); if (rf) rf.value = ss.get("v3_ref") || "";
    var lp = $('[name="landing_page"]', f); if (lp) lp.value = ss.get("v3_landing") || "";
    var fi = $('input[type="file"]', f), info = $("[data-file-info]", f);
    if (fi && info) fi.addEventListener("change", function () { var x = fi.files[0]; info.textContent = x ? x.name + " · " + (x.size / 1048576).toFixed(2) + " МБ" : "Файл не выбран"; });
    function err(el, m) { var w = el.closest(".field") || el.parentNode; w.classList.toggle("has-err", !!m); var e = $(".err", w);
      if (!e) { e = document.createElement("div"); e.className = "err"; e.setAttribute("role", "alert"); w.appendChild(e); } e.textContent = m || ""; }
    f.addEventListener("submit", function (ev) {
      ev.preventDefault(); var ok = true, first = null;
      $$("[data-req]", f).forEach(function (el) { var v = (el.value || "").trim(), m = "";
        if (el.type === "checkbox") { if (!el.checked) m = "Без отдельного согласия на обработку ПДн форма не отправляется."; }
        else if (!v) m = "Заполните поле.";
        else if (el.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) m = "Проверьте email.";
        else if (el.type === "tel" && v.replace(/\D/g, "").length < 10) m = "Укажите телефон полностью.";
        err(el, m); if (m) { ok = false; first = first || el; } });
      var meta = null;
      if (fi) { var x = fi.files[0], m = "";
        if (x) { var ext = x.name.split(".").pop().toLowerCase(); if (EXT.indexOf(ext) < 0) m = "Допустимы PDF, XLS, XLSX, DOC, DOCX."; else if (x.size > MAX) m = "Файл больше 15 МБ."; meta = { name: x.name, size_bytes: x.size, type: x.type || ext }; }
        if (fi.hasAttribute("data-req-file") && !x && !(need && need.value.trim())) m = "Прикрепите файл или вставьте текст спецификации.";
        err(fi, m); if (m) { ok = false; first = first || fi; } }
      var out = $("[data-result]", f.parentNode);
      if (!ok) { f.setAttribute("data-state", "blocked"); if (out) out.hidden = true; if (first && first.focus) first.focus(); return; }
      var d = { form: kind === "spec" ? "rfq_spec" : "rfq", lead_id: "DEMO-" + Date.now().toString(36).toUpperCase(), created_at: moscow() };
      $$("input, select, textarea", f).forEach(function (el) { if (!el.name || el.type === "file") return; d[el.name] = el.type === "checkbox" ? el.checked : el.value; });
      if (d.bom_json) { try { d.bom = JSON.parse(d.bom_json); } catch (e) {} delete d.bom_json; } else delete d.bom_json;
      if (fi) d.attachment = meta ? Object.assign({ storage: "закрытое хранилище, автоудаление по сроку (retention)", email_attachment: false }, meta) : null;
      d.pd_consent_doc = "consent.html (демо-редакция)";
      window.__lastLead = d; f.setAttribute("data-state", "sent");
      if (out) { out.hidden = false; out.innerHTML = '<div class="demo-ok"><b>Демо-режим прототипа: данные никуда не отправляются.</b><p>Запрос № ' + esc(d.lead_id) +
        ' принят (демо). Менеджер проверит позиции и свяжется с вами по указанным контактам.</p><p class="small">Собранные поля (отладочный объект LeadRequest):</p><pre data-debug>' + esc(JSON.stringify(d, null, 2)) + "</pre></div>";
        out.scrollIntoView({ block: "nearest" }); }
    });
    f.addEventListener("change", function (e) { if (e.target.matches("[data-req]")) { var w = e.target.closest(".field"); if (w && w.classList.contains("has-err")) err(e.target, ""); } });
  }

  function initUi() {
    var file = location.pathname.split("/").pop() || "index.html", full = file + location.search;
    $$("[data-nav]").forEach(function (a) { var h = a.getAttribute("href"); if (h === full || (h === file && !/category=/.test(location.search))) a.classList.add("is-active"); });
    $$("[data-menu-toggle]").forEach(function (b) { b.addEventListener("click", function () { var h = b.closest("header"); var on = h.classList.toggle("menu-open"); b.setAttribute("aria-expanded", on ? "true" : "false"); }); });
  }
  function boot() {
    initUi();
    $$("[data-catalog]").forEach(initCatalog);
    $$("[data-product]").forEach(initProduct);
    $$("[data-qd]").forEach(initQuickDesk);
    BOM.render();
    $$("form[data-lead]").forEach(initForm);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else boot();
})();

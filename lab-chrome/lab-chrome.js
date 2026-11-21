/* lab.pimenov.ai: шапка, подвал, блоки подписки и переключатель тем.
   Тема ставится сразу при загрузке файла; разметка монтируется после DOMContentLoaded. */
(function () {
  var KEY = "lab-theme";
  var BOT = "https://t.me/reload_pimenov_ai_bot?start=site";
  var CHANNEL = "https://t.me/ai_rostov";
  var SITE = "https://pimenov.ai/";
  var THEMES = [
    { id: "light", label: "Светлая", icon: '<circle cx="8" cy="8" r="2.6" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M8 1.4v1.8M8 12.8v1.8M1.4 8h1.8M12.8 8h1.8M3.2 3.2l1.3 1.3M11.5 11.5l1.3 1.3M12.8 3.2l-1.3 1.3M4.5 11.5l-1.3 1.3" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>' },
    { id: "dark", label: "Тёмная", icon: '<path d="M9.2 1.6a5.6 5.6 0 1 0 5.2 7.6 4.6 4.6 0 0 1-5.2-7.6z" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/>' },
    { id: "cyberpunk", label: "Киберпанк", icon: '<path d="M9.3 1.4 3.4 9.1h4.1l-.8 5.5 5.9-7.7H8.5l.8-5.5z" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/>' }
  ];

  // Контракт страницы:
  //   <meta name="lab-themes" content="light dark cyberpunk"> — какие темы страница умеет (по умолчанию "light dark");
  //   <meta name="lab-theme-owner" content="page"> — тему ведёт сама страница (свой переключатель),
  //   шапка не трогает data-theme и не рисует свой переключатель, а только подстраивает свои цвета.
  var ALL = ["light", "dark", "cyberpunk"];
  function metaContent(name) {
    var m = document.querySelector('meta[name="' + name + '"]');
    return m ? (m.getAttribute("content") || "").trim() : null;
  }
  function supported() {
    var raw = metaContent("lab-themes");
    var list = (raw === null ? "light dark" : raw).split(/[\s,]+/).filter(function (t) { return ALL.indexOf(t) >= 0; });
    return list.length ? list : ["light"];
  }
  var SUPPORTED = supported();
  var PAGE_OWNED = metaContent("lab-theme-owner") === "page";

  function valid(t) { return SUPPORTED.indexOf(t) >= 0; }
  // Сохранённый выбор не перезаписываем: если тема здесь недоступна, показываем ближайшую.
  function clamp(t) {
    if (valid(t)) return t;
    if (t === "cyberpunk" && valid("dark")) return "dark";
    return valid("light") ? "light" : SUPPORTED[0];
  }
  function stored() {
    try { return localStorage.getItem(KEY); } catch (err) { return null; }
  }
  function current() { return clamp(stored()); }

  // Цвета шапки на страницах со своей темой: светлая или тёмная по data-theme страницы или системе.
  var mq = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;
  function syncScheme() {
    var root = document.documentElement;
    var t = root.getAttribute("data-theme");
    var dark = t === "dark" || (t !== "light" && t !== "cyberpunk" && !!(mq && mq.matches));
    root.setAttribute("data-lab-scheme", dark ? "dark" : "light");
  }

  function apply(t) {
    var root = document.documentElement;
    if (PAGE_OWNED) { syncScheme(); return; }
    t = clamp(t);
    root.setAttribute("data-theme", t);
    root.setAttribute("data-lab-scheme", t === "dark" ? "dark" : "light");
    root.style.colorScheme = t === "dark" ? "dark" : "light";
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      var c = meta.getAttribute("data-" + t);
      if (c) meta.setAttribute("content", c);
    }
    var buttons = document.querySelectorAll(".lab-theme-switch button[data-theme-id]");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].setAttribute("aria-pressed", String(buttons[i].getAttribute("data-theme-id") === t));
    }
  }
  // Тема до отрисовки, если скрипт стоит в <head>.
  apply(current());
  if (PAGE_OWNED) {
    if (window.MutationObserver) {
      new MutationObserver(syncScheme).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    }
    if (mq) {
      if (mq.addEventListener) mq.addEventListener("change", syncScheme);
      else if (mq.addListener) mq.addListener(syncScheme);
    }
  }

  function showSwitch() { return !PAGE_OWNED && SUPPORTED.length > 1; }

  // Старые переключатели внутри страниц (.theme-switch в React-сборках, .tsw в perezagruzka-boty).
  // Они скрыты CSS, но остаются в DOM: клик в шапке нажимает их кнопку, чтобы страница
  // сама обновила своё состояние, графики, канвас и 3D.
  var PAGE_SWITCH = ".theme-switch:not(.lab-theme-switch), .tsw";
  var WORDS = { light: /светл/i, dark: /т[её]мн/i, cyberpunk: /кибер/i };
  if (showSwitch()) document.documentElement.setAttribute("data-lab-switch", "shell");
  function syncPageSwitch(t) {
    var groups = document.querySelectorAll(PAGE_SWITCH);
    for (var g = 0; g < groups.length; g++) {
      if (groups[g].closest && groups[g].closest("[data-lab-header]")) continue;
      var btns = groups[g].querySelectorAll("button");
      for (var i = 0; i < btns.length; i++) {
        var b = btns[i];
        var id = b.getAttribute("data-theme-id");
        var label = (b.getAttribute("aria-label") || "") + " " + (b.getAttribute("title") || "") + " " + (b.textContent || "");
        if (id ? id === t : WORDS[t] && WORDS[t].test(label)) {
          if (b.getAttribute("aria-pressed") !== "true") b.click();
          break;
        }
      }
    }
  }

  function renderSwitch(host) {
    if (!host || host.getAttribute("data-lab-switch-ready")) return;
    host.classList.add("lab-theme-switch");
    host.setAttribute("role", "group");
    host.setAttribute("aria-label", "Тема");
    host.setAttribute("data-lab-switch-ready", "1");
    host.innerHTML = THEMES.filter(function (t) { return valid(t.id); }).map(function (t) {
      var name = "Тема: " + t.label.toLowerCase();
      return '<button type="button" data-theme-id="' + t.id + '" aria-label="' + name + '" title="' + name + '">' +
        '<svg viewBox="0 0 16 16" aria-hidden="true">' + t.icon + "</svg>" +
        '<span class="lab-theme-switch__label">' + t.label + "</span></button>";
    }).join("");
    host.addEventListener("click", function (e) {
      var btn = e.target.closest ? e.target.closest("button[data-theme-id]") : null;
      if (!btn) return;
      var t = btn.getAttribute("data-theme-id");
      try { localStorage.setItem(KEY, t); } catch (err) {}
      syncPageSwitch(t);
      apply(t);
    });
  }

  function isHome() {
    var p = (location.pathname || "/").replace(/\/+$/, "") || "/";
    return p === "/" || p === "/index.html";
  }

  function tgMarkup() {
    return (
      '<aside class="lab-tg" aria-label="Telegram-канал НИИ ИИ">' +
        '<span class="lab-tg__icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.7 3.3 2.6 10.3c-1.2.5-1.2 1.2-.2 1.5l4.6 1.4 1.8 5.4c.2.6.1.8.7.8.5 0 .7-.2 1-.5l2.3-2.2 4.7 3.5c.9.5 1.5.2 1.7-.8l3.1-14.6c.3-1.3-.5-1.8-1.3-1.5zM8.9 13l8.8-5.6c.4-.3.8-.1.5.2l-7.6 6.8-.3 3.3L8.9 13z"/></svg></span>' +
        '<span class="lab-tg__text"><span class="lab-tg__title">Telegram-канал «НИИ&nbsp;ИИ»</span><span class="lab-tg__sub">Сергей Пименов о практическом ИИ</span></span>' +
        '<a class="lab-tg__btn" href="' + CHANNEL + '" target="_blank" rel="noopener">Подписаться</a>' +
      '</aside>'
    );
  }
  function reloadMarkup() {
    return (
      '<aside class="lab-reload" aria-label="Закрытый чат «Перезагрузка»">' +
        '<span class="lab-reload__icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 12a8 8 0 1 1-2.34-5.66"/><path d="M20 4v4.5h-4.5"/></svg></span>' +
        '<span class="lab-reload__text"><span class="lab-reload__title">Закрытый чат «Перезагрузка»</span><span class="lab-reload__sub">Вебинары каждое воскресенье</span></span>' +
        '<a class="lab-reload__btn" href="' + BOT + '" target="_blank" rel="noopener">Подписка «Перезагрузка» 1900₽ в месяц</a>' +
      '</aside>'
    );
  }
  function subscribeMarkup() {
    // На десктопе слева канал, справа «Перезагрузка».
    return tgMarkup() + reloadMarkup();
  }

  function removeLegacy() {
    var nodes = document.querySelectorAll(
      'style#lab-reload-css, script#lab-reload-js, aside.lab-reload, aside.lab-tg, .lab-subscribe:not([data-lab-keep])'
    );
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      if (el.closest && el.closest("[data-lab-header], [data-lab-footer], [data-lab-keep]")) continue;
      el.parentNode && el.parentNode.removeChild(el);
    }
    var orphans = document.querySelectorAll(".tgbar, .home-tg");
    for (var j = 0; j < orphans.length; j++) {
      var o = orphans[j];
      if (o.closest && o.closest("[data-lab-keep], [data-lab-header]")) continue;
      if (!o.querySelector("aside, a, p, h1, h2, li")) {
        o.parentNode && o.parentNode.removeChild(o);
      }
    }
  }

  function mount() {
    if (document.body.getAttribute("data-lab-chrome-ready")) return;
    document.body.setAttribute("data-lab-chrome-ready", "1");
    removeLegacy();

    var header = document.querySelector("[data-lab-header]");
    if (!header) {
      header = document.createElement("header");
      header.className = "lab-bar";
      header.setAttribute("data-lab-header", "");
      var home = isHome();
      header.innerHTML =
        '<a class="lab-bar__brand" href="/"' + (home ? ' aria-current="page"' : "") + ">Лаборатория</a>" +
        (showSwitch() ? '<div data-lab-theme-switch></div>' : "");
      document.body.insertBefore(header, document.body.firstChild);
    }
    var switches = header.querySelectorAll("[data-lab-theme-switch]");
    for (var s = 0; s < switches.length; s++) {
      if (showSwitch()) renderSwitch(switches[s]);
      else switches[s].parentNode && switches[s].parentNode.removeChild(switches[s]);
    }

    if (!document.querySelector("[data-lab-keep] .lab-reload, [data-lab-keep] .lab-tg, [data-lab-subscribe]")) {
      var sub = document.createElement("div");
      sub.className = "lab-subscribe lab-subscribe--bar";
      sub.setAttribute("data-lab-subscribe", "");
      sub.innerHTML = subscribeMarkup();
      header.insertAdjacentElement("afterend", sub);
    }

    // Общий подвал с ссылками больше не ставится. Убрать и захардкоженный, если остался.
    var leftover = document.querySelectorAll("footer.lab-foot, [data-lab-footer]");
    for (var f = 0; f < leftover.length; f++) {
      leftover[f].parentNode && leftover[f].parentNode.removeChild(leftover[f]);
    }

    // «Перезагрузка» внизу только на узком экране; на десктопе блок скрыт CSS.
    if (!document.querySelector("[data-lab-subscribe-foot]")) {
      var footSub = document.createElement("div");
      footSub.className = "lab-subscribe lab-subscribe--foot";
      footSub.setAttribute("data-lab-subscribe-foot", "");
      footSub.innerHTML = reloadMarkup();
      document.body.appendChild(footSub);
    }

    apply(current());
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount);
  else mount();
})();

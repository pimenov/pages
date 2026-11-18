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

  function valid(t) { return t === "light" || t === "dark" || t === "cyberpunk"; }
  function current() {
    var t = document.documentElement.getAttribute("data-theme");
    if (valid(t)) return t;
    try {
      t = localStorage.getItem(KEY);
      if (valid(t)) return t;
    } catch (err) {}
    return "light";
  }
  function apply(t) {
    if (!valid(t)) t = "light";
    var root = document.documentElement;
    root.setAttribute("data-theme", t);
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

  function renderSwitch(host) {
    if (!host || host.getAttribute("data-lab-switch-ready")) return;
    host.classList.add("lab-theme-switch");
    host.setAttribute("role", "group");
    host.setAttribute("aria-label", "Тема");
    host.setAttribute("data-lab-switch-ready", "1");
    host.innerHTML = THEMES.map(function (t) {
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
      apply(t);
    });
  }

  function isHome() {
    var p = (location.pathname || "/").replace(/\/+$/, "") || "/";
    return p === "/" || p === "/index.html";
  }

  function subscribeMarkup() {
    return (
      '<aside class="lab-reload" aria-label="Подписка «Перезагрузка»">' +
        '<span class="lab-reload__icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 12a8 8 0 1 1-2.34-5.66"/><path d="M20 4v4.5h-4.5"/></svg></span>' +
        '<span class="lab-reload__text"><span class="lab-reload__title">Подписка «Перезагрузка»</span><span class="lab-reload__sub">Вебинары каждое воскресенье и команда Grok-ботов изнутри</span></span>' +
        '<a class="lab-reload__btn" href="' + BOT + '" target="_blank" rel="noopener">Подписаться на «Перезагрузку» за&nbsp;1&nbsp;900&nbsp;₽ в&nbsp;месяц</a>' +
      '</aside>' +
      '<aside class="lab-tg" aria-label="Telegram-канал НИИ ИИ">' +
        '<span class="lab-tg__icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.7 3.3 2.6 10.3c-1.2.5-1.2 1.2-.2 1.5l4.6 1.4 1.8 5.4c.2.6.1.8.7.8.5 0 .7-.2 1-.5l2.3-2.2 4.7 3.5c.9.5 1.5.2 1.7-.8l3.1-14.6c.3-1.3-.5-1.8-1.3-1.5zM8.9 13l8.8-5.6c.4-.3.8-.1.5.2l-7.6 6.8-.3 3.3L8.9 13z"/></svg></span>' +
        '<span class="lab-tg__text"><span class="lab-tg__title">Telegram-канал «НИИ&nbsp;ИИ»</span><span class="lab-tg__sub">Сергей Пименов о практическом ИИ</span></span>' +
        '<a class="lab-tg__btn" href="' + CHANNEL + '" target="_blank" rel="noopener">Подписаться</a>' +
      '</aside>'
    );
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
        '<div data-lab-theme-switch></div>';
      document.body.insertBefore(header, document.body.firstChild);
    }
    var switches = header.querySelectorAll("[data-lab-theme-switch]");
    for (var s = 0; s < switches.length; s++) renderSwitch(switches[s]);

    if (!isHome() && !document.querySelector("[data-lab-keep] .lab-reload, [data-lab-keep] .lab-tg")) {
      var sub = document.createElement("div");
      sub.className = "lab-subscribe lab-subscribe--bar";
      sub.setAttribute("data-lab-subscribe", "");
      sub.innerHTML = subscribeMarkup();
      header.insertAdjacentElement("afterend", sub);
    }

    if (!document.querySelector("[data-lab-footer]")) {
      var footer = document.createElement("footer");
      footer.className = "lab-foot";
      footer.setAttribute("data-lab-footer", "");
      footer.innerHTML =
        '<div class="lab-foot__inner">' +
          '<a href="' + CHANNEL + '" target="_blank" rel="noopener">Канал «НИИ ИИ»</a>' +
          '<a href="' + BOT + '" target="_blank" rel="noopener">«Перезагрузка», 1&nbsp;900&nbsp;₽ в месяц</a>' +
          '<a href="' + SITE + '">pimenov.ai</a>' +
        "</div>";
      document.body.appendChild(footer);
    }

    apply(current());
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount);
  else mount();
})();

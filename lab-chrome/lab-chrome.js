/* lab.pimenov.ai: переключатель трёх тем (светлая, тёмная, киберпанк) для статичных страниц.
   Тема ставится до отрисовки inline-скриптом в <head>; этот файл рисует кнопки и сохраняет выбор. */
(function () {
  var KEY = "lab-theme";
  var THEMES = [
    { id: "light", label: "Светлая", icon: '<circle cx="8" cy="8" r="2.6" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M8 1.4v1.8M8 12.8v1.8M1.4 8h1.8M12.8 8h1.8M3.2 3.2l1.3 1.3M11.5 11.5l1.3 1.3M12.8 3.2l-1.3 1.3M4.5 11.5l-1.3 1.3" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>' },
    { id: "dark", label: "Тёмная", icon: '<path d="M9.2 1.6a5.6 5.6 0 1 0 5.2 7.6 4.6 4.6 0 0 1-5.2-7.6z" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/>' },
    { id: "cyberpunk", label: "Киберпанк", icon: '<path d="M9.3 1.4 3.4 9.1h4.1l-.8 5.5 5.9-7.7H8.5l.8-5.5z" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/>' }
  ];

  function valid(t) { return t === "light" || t === "dark" || t === "cyberpunk"; }
  function current() {
    var t = document.documentElement.getAttribute("data-theme");
    return valid(t) ? t : "light";
  }
  function apply(t) {
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
  function render(host) {
    host.classList.add("lab-theme-switch");
    host.setAttribute("role", "group");
    host.setAttribute("aria-label", "Тема");
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
  function init() {
    var hosts = document.querySelectorAll("[data-lab-theme-switch]");
    for (var i = 0; i < hosts.length; i++) render(hosts[i]);
    apply(current());
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();

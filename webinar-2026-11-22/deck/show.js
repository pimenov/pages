"use strict";

const byId = (id) => document.getElementById(id);
const chapterLinks = [...document.querySelectorAll(".chapter-nav a")];
const slides = [...document.querySelectorAll("[data-slide]")];
const stage = byId("stage");
const player = byId("player");
const video = byId("video");
const videoStatus = byId("video-status");
const notes = byId("notes");
let current = 0;
let videoTimer;
let clipInView;

const launchGuide = "https://open-design.ai/tutorials/ai-product-video-workflow/#case-showcase";
const reelsStudio = "";
const clips = Object.freeze({
  launch: {
    title: "Introducing OpenDesign Motion",
    label: "Официальный ролик OpenDesign · 0:37",
    file: "https://r.open-design.ai/files/e0b38f31a86848cf02b302faf69a0b6e597f5ba30e9f9d4f0f3e1776319949f7",
    poster: "media/launch-poster.jpg", source: launchGuide, sourceName: "Материал OpenDesign ↗",
  },
  teaser: {
    title: "Тизер с главной OpenMotion",
    label: "Официальный сайт",
    file: "https://open-design.ai/motion-page/assets/hero-nov16.mp4",
    poster: "media/openmotion-poster.jpg", source: "https://open-design.ai/motion/", sourceName: "Сайт OpenMotion ↗",
  },
  webflow: {
    title: "Webflow · A New Era of No-Code",
    label: "Фрагмент экспорта OpenMotion · 0:18",
    file: "media/webflow.mp4", poster: "media/webflow.jpg",
    source: "https://www.ordinaryfolk.co/project/webflow-a-new-era-of-no-code",
    sourceName: "Референс Ordinary Folk ↗",
    project: "",
  },
  hyperos: {
    title: "Xiaomi · HyperOS",
    label: "Фрагмент экспорта OpenMotion · 0:18",
    file: "media/hyperos.mp4", poster: "media/hyperos.jpg",
    source: "https://www.mi.com/global/hyperos", sourceName: "Сайт Xiaomi HyperOS ↗",
    project: "",
  },
  salsa: {
    title: "Google Doodle · Salsa",
    label: "Вертикальный фрагмент экспорта OpenMotion · 0:18",
    file: "media/salsa.mp4", poster: "media/salsa.jpg", portrait: true,
    source: "https://www.ordinaryfolk.co/project/google-doodle-salsa",
    sourceName: "Референс Ordinary Folk ↗",
    project: "",
  },
  "our-pimenov": {
    title: "pimenov.ai · Практический ИИ",
    label: "Наша версия Webflow · Русская озвучка · 0:19",
    file: "media/our-pimenov-storyteller.mp4", poster: "media/our-pimenov.jpg",
    source: "https://pimenov.ai/", sourceName: "pimenov.ai ↗",
    project: "",
  },
  "our-statistics": {
    title: "Сергей Пименов · Соцсети в цифрах",
    label: "Наша версия HyperOS · 0:22",
    file: "media/our-statistics.mp4", poster: "media/our-statistics.jpg",
    source: "https://xn--h1aaaav.xn--p1ai/", sourceName: "Медиакит · источник статистики ↗",
    project: "",
  },
  "our-nii-ai": {
    title: "НИИ ИИ · Из Ростова про ИИ",
    label: "Наша версия Salsa · 0:17",
    file: "media/our-nii-ai.mp4", poster: "media/our-nii-ai.jpg", portrait: true,
    source: "https://t.me/ai_rostov", sourceName: "Telegram-канал «НИИ ИИ» ↗",
    project: "",
  },
  "faceless-skill": {
    title: "Пролёт над Доном · одна история в трёх форматах",
    label: "Видео без ведущего · Eleven v3 · 0:27",
    file: "media/faceless-skill-storyteller.mp4",
    poster: "media/faceless-skill.jpg",
    source: "https://pimenov.ai/articles/rostov-na-donu-3d-codex-astra/",
    sourceName: "Исходная статья pimenov.ai ↗",
    project: "",
  },
  "growth-skill": {
    title: "Как вырос Lovable",
    label: "Growth Teardown · 0:53",
    file: "media/growth-skill.mp4",
    poster: "media/growth-skill.jpg",
    source: "https://lovable.dev/blog/one-year-of-lovable",
    sourceName: "Публикация Lovable о первом годе ↗",
    project: "",
  },
  "motion-skill-before": {
    title: "pimenov.ai · до правки",
    label: "Первые 8 секунд исходной анимации",
    file: "media/motion-skill-before-instrumental.mp4",
    poster: "media/motion-skill-before.jpg",
    source: "#our-films",
    sourceName: "Полная версия в презентации ↗",
  },
  "motion-skill-after": {
    title: "pimenov.ai · после правки motionmaxxing",
    label: "Новый монтаж · 0:08",
    file: "media/motion-skill-after.mp4",
    poster: "media/motion-skill-after.jpg",
    source: "https://pimenov.ai/articles/hermes-agent-dogovory-v-telegram/",
    sourceName: "Исходная статья ↗",
    project: "",
  },
  "webinar-reel-growth": {
    title: "Когда Telegram начал расти",
    label: "Из записи 15 ноября · 11,7 с",
    file: "media/webinar-reel-growth.mp4", poster: "media/webinar-reel-growth.jpg", portrait: true,
    source: "media/webinar-reel-growth.mp4", sourceName: "Открыть MP4 ↗", project: reelsStudio,
  },
  "webinar-reel-links": {
    title: "Ссылка под каждым постом",
    label: "Из записи 15 ноября · 8,6 с",
    file: "media/webinar-reel-links.mp4", poster: "media/webinar-reel-links.jpg", portrait: true,
    source: "media/webinar-reel-links.mp4", sourceName: "Открыть MP4 ↗", project: reelsStudio,
  },
  "webinar-reel-traffic": {
    title: "Трафик приходит извне",
    label: "Из записи 15 ноября · 14,2 с",
    file: "media/webinar-reel-traffic.mp4", poster: "media/webinar-reel-traffic.jpg", portrait: true,
    source: "media/webinar-reel-traffic.mp4", sourceName: "Открыть MP4 ↗", project: reelsStudio,
  },
  "article-hermes": {
    title: "Договор за 2–3 минуты",
    label: "Magic Share · Русская озвучка · 0:19",
    file: "media/article-hermes-storyteller.mp4",
    poster: "media/article-hermes.jpg",
    source: "https://pimenov.ai/articles/hermes-agent-dogovory-v-telegram/",
    sourceName: "Читать статью ↗",
    project: "",
  },
  "article-rostov": {
    title: "Пролёт над Ростовом",
    label: "Dia · 0:20",
    file: "media/article-rostov.mp4",
    poster: "media/article-rostov.jpg",
    source: "https://pimenov.ai/articles/rostov-na-donu-3d-codex-astra/",
    sourceName: "Читать статью ↗",
    project: "",
  },
});

const presenter = Object.freeze({});
const workspaceViews = Object.freeze({
  scenes: ["studio/editor.jpg", "Сцены проекта", "Слева открываются исходные HTML-композиции. Каждая отвечает за свой кусок видео.", "Список композиций в Studio", [20.8, 11.2, 15.0, 60.9]],
  preview: ["studio/editor.jpg", "Плеер по центру", "По клику на кадр или перемотке видно, как сцена выглядит в выбранный момент.", "Предпросмотр композиции в центре Studio", [36.9, 17.4, 56.4, 49.2]],
  timeline: ["studio/editor.jpg", "Дорожки и курсор", "На одном таймлайне видны клипы и звук. Можно выбрать нужный момент и открыть свойства клипа.", "Таймлайн OpenMotion с графикой и аудиодорожкой", [20.8, 71.9, 76.3, 24.5]],
  export: ["studio/export.jpg", "Рендер и скачивание", "Экспорт привязан к текущей версии проекта. Готовый MP4 появится в списке задач экспорта.", "Экран экспорта из OpenMotion Studio", null],
});

const libraryViews = Object.freeze({
  gallery: ["studio/library.jpg", "Поиск по стилю и задаче", "Открываем карточку и смотрим начало, переходы и то, можно ли открыть исходник.", "Галерея шаблонов OpenMotion"],
  guide: ["studio/detail.jpg", "Референс и MOTION.md", "Смотрим видео, читаем ритм, порядок кадров и переходы. Выбираем приёмы для своего ролика.", "Карточка референса OpenMotion с предпросмотром и ссылкой MOTION.md"],
  remix: ["studio/remix.jpg", "Воссоздание или редактирование", "Если доступны исходники, можно открыть самостоятельную копию. По референсу агент собирает новую версию.", "Форма воссоздания шаблона OpenMotion"],
});

function go(index, updateLocation = true) {
  current = Math.min(Math.max(index, 0), slides.length - 1);
  for (const [position, slide] of slides.entries()) {
    slide.hidden = position !== current;
    slide.classList.toggle("enter", position === current);
  }
  chapterLinks.forEach((link, position) => {
    if (position === current) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
  byId("previous").disabled = current === 0;
  byId("next").disabled = current === slides.length - 1;
  byId("counter").textContent = (current + 1) + " / " + slides.length;
  if (updateLocation) window.history.replaceState(null, "", "#" + slides[current].dataset.slide);
  stage.scrollTop = 0;
}

function jumpFromHash() {
  const section = slides.findIndex((slide) => "#" + slide.dataset.slide === window.location.hash);
  go(section < 0 ? 0 : section, false);
}

function setView(group, key, values) {
  const [src, label, detail, alt, area] = values[key];
  const picture = byId(group + "-image");
  if (picture.getAttribute("src") !== src) picture.src = src;
  picture.alt = alt;
  byId(group + "-label").textContent = label;
  byId(group + "-detail").textContent = detail;
  const attribute = group === "workflow" ? "focus" : "library";
  document.querySelectorAll("[data-" + attribute + "]").forEach((button) => {
    button.setAttribute("aria-pressed", button.dataset[attribute] === key ? "true" : "false");
  });
  const focus = byId("workflow-focus");
  if (group !== "workflow") return;
  focus.hidden = !area;
  if (area) ["--x", "--y", "--w", "--h"].forEach((name, i) => focus.style.setProperty(name, area[i] + "%"));
}

function showVideoStatus(text) {
  videoStatus.textContent = text;
  videoStatus.hidden = !text;
}

function openClip(key) {
  const clip = clips[key];
  if (!clip) return;
  if (notes.open) notes.close();
  clipInView = clip;
  byId("player-title").textContent = clip.title;
  byId("player-kind").textContent = clip.label;
  const source = byId("video-source");
  source.href = clip.source;
  source.textContent = clip.sourceName;
  const project = byId("video-project");
  project.hidden = !clip.project;
  project.href = clip.project || "#";
  player.classList.toggle("portrait", Boolean(clip.portrait));
  showVideoStatus("");
  video.poster = clip.poster;
  video.src = clip.file;
  video.setAttribute("aria-label", clip.title);
  player.showModal();
  video.play().catch((error) => {
    if (clipInView !== clip || error.name === "AbortError") return;
    showVideoStatus(clip.file.startsWith("https:") ? "Запусти видео в плеере или открой источник." : "Нажми ▶ в плеере.");
  });
  videoTimer = window.setTimeout(() => {
    if (clipInView === clip && video.readyState < 2) showVideoStatus("Видео загружается. Источник доступен по ссылке под плеером.");
  }, 6500);
}

function openNotes() {
  const entry = presenter[slides[current].dataset.slide];
  if (!entry) return;
  byId("notes-timing").textContent = entry.time;
  const paragraphs = entry.paragraphs.map((copy) => {
    const p = document.createElement("p");
    p.textContent = copy;
    return p;
  });
  byId("notes-copy").replaceChildren(...paragraphs);
  notes.showModal();
}

async function toggleFullscreen() {
  if (document.fullscreenElement) await document.exitFullscreen();
  else if (document.documentElement.requestFullscreen) await document.documentElement.requestFullscreen();
}

chapterLinks.forEach((link, index) => link.addEventListener("click", (event) => {
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  go(index);
}));
window.addEventListener("hashchange", jumpFromHash);
byId("previous").addEventListener("click", () => go(current - 1));
byId("next").addEventListener("click", () => go(current + 1));
byId("fullscreen").addEventListener("click", () => toggleFullscreen().catch(() => {}));
document.addEventListener("fullscreenchange", () => {
  byId("fullscreen").setAttribute("aria-label", document.fullscreenElement ? "Выйти из полноэкранного режима" : "Полноэкранный режим");
});

document.querySelectorAll("[data-play]").forEach((button) => button.addEventListener("click", () => openClip(button.dataset.play)));
document.querySelectorAll("[data-focus]").forEach((button) => button.addEventListener("click", () => setView("workflow", button.dataset.focus, workspaceViews)));
document.querySelectorAll("[data-library]").forEach((button) => button.addEventListener("click", () => setView("library", button.dataset.library, libraryViews)));
byId("player-close").addEventListener("click", () => player.close());
player.addEventListener("close", () => {
  clipInView = null;
  window.clearTimeout(videoTimer);
  video.pause();
  video.removeAttribute("src");
  video.load();
});
video.addEventListener("playing", () => showVideoStatus(""));
video.addEventListener("error", () => {
  if (clipInView) showVideoStatus("Видео недоступно. Под плеером есть ссылка на источник.");
});
byId("notes-open").addEventListener("click", openNotes);
byId("notes-close").addEventListener("click", () => notes.close());
document.addEventListener("visibilitychange", () => {
  if (document.hidden && player.open) video.pause();
});
window.addEventListener("keydown", (event) => {
  if (event.metaKey || event.ctrlKey || event.altKey || player.open || notes.open) return;
  if (["ArrowRight", "PageDown", "ArrowLeft", "PageUp", "Home", "End"].includes(event.key)) {
    event.preventDefault();
    const target = event.key === "Home" ? 0 : event.key === "End" ? slides.length - 1 : current + (event.key === "ArrowRight" || event.key === "PageDown" ? 1 : -1);
    go(target);
  }
  if (event.code === "KeyF") toggleFullscreen().catch(() => {});
  if (event.code === "KeyN") openNotes();
});
jumpFromHash();

(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function a(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(t){if(t.ep)return;t.ep=!0;const s=a(t);fetch(t.href,s)}})();const H=`fn main() {
    let a = String::from("привет");
    let b = a;
    println!("{b}");
    println!("{a}");
}
`,N=`error[E0382]: borrow of moved value: \`a\`
 --> src/main.rs:5:16
  |
2 |     let a = String::from("привет");
  |         - move occurs because \`a\` has type \`String\`, which does not implement the \`Copy\` trait
3 |     let b = a;
  |             - value moved here
4 |     println!("{b}");
5 |     println!("{a}");
  |                ^ value borrowed here after move
  |
help: consider cloning the value if the performance cost is acceptable
  |
3 |     let b = a.clone();
  |              ++++++++

For more information about this error, try \`rustc --explain E0382\`.
error: could not compile \`hello_cargo\` (bin "hello_cargo") due to 1 previous error
`,P=`fn main() {
    let a = String::from("привет");
    let b = a.clone();
    println!("{b}");
    println!("{a}");
}
`,W=`привет
привет
`,z=`fn main() {
    let s = String::from("rust");
    let r1 = &s;
    let r2 = &s;
    println!("{r1} {r2}");
}
`,B=`rust rust
`,I=`fn main() {
    let mut s = String::from("rust");
    let r1 = &s;
    let r2 = &mut s;
    println!("{r1} {r2}");
}
`,F=`error[E0502]: cannot borrow \`s\` as mutable because it is also borrowed as immutable
 --> src/main.rs:4:14
  |
3 |     let r1 = &s;
  |              -- immutable borrow occurs here
4 |     let r2 = &mut s;
  |              ^^^^^^ mutable borrow occurs here
5 |     println!("{r1} {r2}");
  |                -- immutable borrow later used here

For more information about this error, try \`rustc --explain E0502\`.
error: could not compile \`hello_cargo\` (bin "hello_cargo") due to 1 previous error
`,D=`a = "привет"
b = a
print(b)
print(a)
`,G=`привет
привет
`,J=`let a = "привет";
let b = a;
console.log(b);
console.log(a);
`,K=`привет
привет
`,V=`int main() {
    char* a = new char[7];
    char* b = a;
    delete[] a;
    delete[] b;
}
`,Z=`free(): double free detected in tcache 2
exit code 134
`,v={stable:"1.100.0",stableDate:"12.11.2026",edition:"2024",asOf:"24.11.2026"},u=r=>r.replace(/\n+$/,""),b={ownMoveError:u(H),ownMoveErrorOut:u(N),ownCloneOk:u(P),ownCloneOkOut:u(W),borrowReadOk:u(z),borrowReadOkOut:u(B),borrowWriteError:u(I),borrowWriteErrorOut:u(F)},q=[{icon:"bolt",title:"Скорость",text:"Без сборщика мусора и тяжёлой среды выполнения. Сначала компилятор собирает программу, потом её запускают. Готовый файл можно отдать человеку без установки Rust."},{icon:"shield",title:"Надёжность",text:"Система типов и модель владения (ownership) ловят целые классы ошибок ещё при сборке программы, а не на живом сервере."},{icon:"list",title:"Удобство",text:"Документация, понятные сообщения компилятора и пакетный менеджер Cargo, который ставится вместе с Rust."}],U=[{date:"15.05.2015",text:"Rust 1.0: обещание совместимости и релизы раз в шесть недель"},{date:"08.02.2021",text:"Независимый фонд Rust Foundation: AWS, Huawei, Google, Microsoft и Mozilla"},{date:"20.02.2025",text:"Редакция Rust 2024 вместе с версией 1.85.0"},{date:"12.04.2026",text:"Linux 7.0: у кода на Rust снята пометка «experimental»"},{date:"12.11.2026",text:"Rust 1.100.0, текущая стабильная версия"}],$=[{id:1,label:"Создать",lines:[1],active:1,a:{name:"a",note:"владеет",state:"own"},b:null,values:[{text:"«привет»",tag:"значение"}],arrowA:!0,arrowB:!1,text:"Строка 1. Создано значение «привет», его владелец — переменная a.",error:!1,fixed:!1},{id:2,label:"Передать",lines:[1,2],active:2,a:{name:"a",note:"передала",state:"moved"},b:{name:"b",note:"владеет",state:"own"},values:[{text:"«привет»",tag:"значение"}],arrowA:!1,arrowB:!0,text:"Строка 2. Владение перешло к b. Копии нет: значение одно, владелец теперь b.",error:!1,fixed:!1},{id:3,label:"Читает b",lines:[1,2,3],active:3,a:{name:"a",note:"передала",state:"moved"},b:{name:"b",note:"владеет",state:"own"},values:[{text:"«привет»",tag:"значение"}],arrowA:!1,arrowB:!0,text:"Строка 3. Новый владелец спокойно пользуется значением: на экране «привет».",error:!1,fixed:!1},{id:4,label:"Читает a",lines:[1,2,3,4],active:4,a:{name:"a",note:"уже не владеет",state:"error"},b:{name:"b",note:"владеет",state:"own"},values:[{text:"«привет»",tag:"значение"}],arrowA:!1,arrowB:!0,text:"Строка 4. Переменная a уже передала значение. Ошибка E0382: программа не соберётся.",error:!0,fixed:!1},{id:5,label:"Клонировать",lines:[1,2,3,4],active:2,a:{name:"a",note:"владеет",state:"own"},b:{name:"b",note:"владеет",state:"own"},values:[{text:"«привет»",tag:"значение a"},{text:"«привет»",tag:"копия для b"}],arrowA:!0,arrowB:!0,text:"Строка 2 заменена на let b = a.clone(). Значение скопировано, у каждой переменной свой владелец. Копия стоит времени и памяти.",error:!1,fixed:!0}],Y=['let a = String::from("привет");',"let b = a;",'println!("{b}");','println!("{a}");'],X=['let a = String::from("привет");',"let b = a.clone();",'println!("{b}");','println!("{a}");'],Q=["У каждого значения в Rust есть владелец.","В один момент владелец только один.","Когда владелец выходит из области видимости, значение удаляется."],L=[{id:"py",label:"Python",file:"main.py",code:u(D),verdict:"ok",result:"Запускается. Память убирает сборщик мусора.",output:u(G)},{id:"js",label:"JavaScript",file:"main.js",code:u(J),verdict:"ok",result:"Запускается. Память убирает сборщик мусора.",output:u(K)},{id:"cpp",label:"C++",file:"main.cpp",code:u(V),verdict:"bad",result:"Собирается, но при запуске аварийно завершается: освободить память дважды нельзя, и следить за этим должен человек.",output:u(Z)},{id:"rs",label:"Rust",file:"src/main.rs",code:b.ownMoveError,verdict:"bad",result:"Не соберётся. Ошибка найдена до запуска, сборщика мусора нет.",output:b.ownMoveErrorOut.split(`
`).slice(0,1).join(`
`)}],S=[{id:"read",label:"Читают двое",file:"src/main.rs",code:b.borrowReadOk,verdict:"ok",result:"Работает: смотреть на одно значение могут сколько угодно ссылок, пока никто его не меняет.",output:b.borrowReadOkOut},{id:"write",label:"Читают и пишут",file:"src/main.rs",code:b.borrowWriteError,verdict:"bad",result:"Не соберётся: изменяемая ссылка не уживается с чужими ссылками для чтения.",output:b.borrowWriteErrorOut}],tt=["В один момент можно иметь либо одну изменяемую ссылку, либо сколько угодно ссылок только для чтения. Не оба варианта сразу.","Ссылка всегда должна указывать на живые данные. «Висячую» ссылку на уже удалённое значение компилятор не пропустит."],et=["Речь о безопасном Rust. В языке есть блок unsafe, где часть гарантий снимается: он нужен для работы с кодом на C и с железом.","Компилятор хорошо ловит ошибки памяти и гонки данных, но логические ошибки («посчитал не то», «отправил не туда») сам не лечит.","Проверки во время работы тоже бывают, например выход за границу списка. Главное отличие от сборщика мусора в другом: нет периодического обхода всей памяти в поисках мусора."],st=["Зачем обычно берут","Память","Скорость работы","Готовая программа","Порог входа","Типичный риск"],rt=["Системный код, инструменты, сетевые службы, места, где важны скорость и безопасность памяти","Владение и заимствование, без сборщика мусора","Сопоставима с C и C++ в постановке самих авторов Rust и Google","Сначала сборка компилятором, потом запуск. Готовый файл можно отдать человеку без установки Rust","Высокий из-за владения и заимствования. Официальная «Книга» прямо говорит, что к этому нужно привыкнуть","Сначала не получается «просто написать и запустить»; сообщения компилятора поначалу кажутся придирками"],C=[{id:"py",label:"Python",cells:["Скрипты, данные, ИИ, быстрые прототипы","Сборщик мусора","Обычно ниже на задачах, где всё время идёт сам язык, а не готовая библиотека","Запуск из текста программы, нужен установленный Python","Низкий","Тихие ошибки уже на работающей программе, ниже скорость"],verdict:"Python удобнее для скриптов, данных и ИИ. Rust берут, когда нужны скорость и аккуратная память."},{id:"js",label:"JavaScript / TypeScript",cells:["Сайты, интерфейсы, серверная логика в экосистеме веба","Сборщик мусора","Высокая в своей нише, но это другая модель выполнения","Нужна среда Node или браузер","Низкий / средний","Путаница типов и рассинхрон, если нет дисциплины"],verdict:"JavaScript и TypeScript остаются языками сайтов и интерфейсов. Rust нужен там, где важнее скорость и память."},{id:"go",label:"Go",cells:["Сетевые сервисы, простые в сопровождении серверы","Сборщик мусора","Высокая, но Discord как раз упёрся в паузы сборщика на большом кэше","Тоже компиляция в один файл","Средний, язык нарочно простой","Редкие, но неприятные паузы сборщика на некоторых нагрузках (кейс Discord)"],verdict:"Go проще Rust, если нужен обычный сервер. Rust выигрывает, когда важна стабильная задержка."},{id:"cpp",label:"C++",cells:["Системный код, игры, уже существующие большие кодовые базы","Вручную (плюс современные механизмы, но без таких же гарантий компилятора, как у Rust)","Высокая, если код написан аккуратно","Тоже компиляция, но без единого стандартного «Cargo» такого же уровня удобства","Высокий, плюс больше свободы выстрелить себе в ногу","Ошибки памяти, которые всплывают поздно и дорого"],verdict:"C++ имеет смысл почти только там, где этот код уже есть. В новом коде Rust даёт проверки памяти на этапе сборки."}],M=[{id:"all",label:"Все"},{id:"system",label:"Операционные системы"},{id:"cloud",label:"Облако и сервисы"},{id:"tools",label:"Инструменты"},{id:"ai",label:"ИИ"}],at=[{group:"system",name:"Ядро Linux",text:"Поддержка Rust пришла как эксперимент ещё в 6.1. 13.12.2025 эксперимент закрыт: «Rust никуда не денется». В Linux 7.0 снята пометка «experimental».",date:"12.04.2026",href:"https://docs.kernel.org/rust/index.html"},{group:"system",name:"Windows",text:"Microsoft внедряет Rust в традиционно атакуемые места: разбор шрифтов и ядро Win32k. Это отдельные компоненты, не переписывание всей Windows.",date:"2023",href:"https://www.microsoft.com/en-us/security/blog/2023/09/26/new-security-features-in-windows-11-protect-users-and-empower-it/"},{group:"system",name:"Android",text:"С 06.04.2021 Rust официально поддерживается для системного кода ОС. Ошибки памяти в C и C++ давали около 70% уязвимостей высокой тяжести, а переписывать десятки миллионов строк старого кода нереально: ставка на новый код.",date:"06.04.2021",href:"https://security.googleblog.com/2021/04/rust-in-android-platform.html"},{group:"cloud",name:"AWS Firecracker",text:"Виртуализация для serverless, написана на Rust. Уже работала под AWS Lambda и AWS Fargate. AWS отдельно подчёркивает потокобезопасность и защиту от многих ошибок переполнения буфера.",date:"26.11.2018",href:"https://aws.amazon.com/blogs/aws/firecracker-lightweight-virtualization-for-serverless-computing/"},{group:"cloud",name:"Cloudflare Pingora",text:"Собственный HTTP-прокси на Rust: более 1 трлн запросов в день, по словам компании — около трети процессора и памяти прежней инфраструктуры на NGINX. С 28.02.2024 открыт под лицензией Apache 2.0.",date:"14.09.2022",href:"https://blog.cloudflare.com/how-we-built-pingora-the-proxy-that-connects-cloudflare-to-the-internet/"},{group:"cloud",name:"Discord",text:"Сервис Read States переписали с Go на Rust из-за пиков задержки сборщика мусора примерно раз в две минуты. После перевода пиков не стало, а после оптимизации Rust обошёл прежнюю версию на Go по задержке, процессору и памяти.",date:"04.02.2020",href:"https://discord.com/blog/why-discord-is-switching-from-go-to-rust"},{group:"tools",name:"uv и Ruff",text:"uv — установщик и менеджер пакетов Python, Ruff — линтер Python, оба написаны на Rust. По заявлению Astral, uv быстрее pip в 8–10 раз без кэша и в 80–115 раз с тёплым кэшем, Ruff быстрее прежних линтеров в 10–100 раз.",date:"15.02.2024",href:"https://astral.sh/blog/uv"},{group:"tools",name:"Zed",text:"Редактор кода: для скорости выбрали Rust и написали собственный интерфейс с ускорением на видеокарте.",date:"15.03.2023",href:"https://zed.dev/blog/beta"},{group:"tools",name:"Tauri",text:"Фреймворк для приложений с веб-интерфейсом и логикой на Rust. Минимальное приложение, по словам проекта, может быть меньше 600 КБ: берётся системный веб-просмотрщик, а не свой браузер.",date:"05.11.2026",href:"https://v2.tauri.app/start/"},{group:"tools",name:"Firefox, движок стилей Stylo",text:"Mozilla заменила примерно 160 000 строк на C++ примерно 85 000 строками на Rust.",date:"08.02.2021",href:"https://blog.mozilla.org/en/mozilla/mozilla-welcomes-the-rust-foundation/"},{group:"ai",name:"Hugging Face tokenizers",text:"Библиотека токенизации «очень быстрая благодаря реализации на Rust», используется в Transformers. Авторы заявляют меньше 20 секунд на гигабайт текста на процессоре сервера.",date:"24.11.2026",href:"https://huggingface.co/docs/tokenizers/en/index"},{group:"ai",name:"Hugging Face Candle",text:"Минималистичный фреймворк машинного обучения для Rust с синтаксисом, близким к PyTorch. Обучение моделей и запуск на процессоре, видеокартах NVIDIA и в браузере (WebAssembly).",date:"24.11.2026",href:"https://huggingface.github.io/candle/"}],ot="Во всех крупных системах Rust стоит рядом с уже существующим кодом на C, C++, Python или других языках. Это не «весь мир перешёл на Rust».",nt=[{label:"Восхищение",sub:"пользовались и хотят продолжать",value:67.4,people:"1 713 человек"},{label:"Желаемость",sub:"хотят использовать в следующем году",value:26.3,people:"3 711 человек"},{label:"Использование",sub:"12-е место среди языков",value:18,people:"2 542 человека"}],h={soSample:"14 099",soDate:"06.10.2026",soNote:"Выше по сырому проценту «восхищения» стоят Elm (94,1%, 16 человек) и Odin (82,4%, 28 человек): выборки слишком малые, чтобы ставить их в один ряд с Rust.",tiobe:{rank:"11-е",rating:"1,63%",before:"14-е",delta:"+0,25 п. п.",go:"1,69%"},tiobeNote:"TIOBE считает видимость языка в поисковиках: это не рейтинг качества и не объём написанного кода. В ноябре Rust уступил 10-е место языку Go."},A="curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh",it=[{title:"Установить",text:"rustup — официальный установщик. На macOS и Linux одна команда. На Windows скачайте rustup-init.exe с rustup.rs; часто нужны средства сборки Visual Studio (MSVC).",cmd:A,after:"rustc --version",afterNote:"проверка, то же для cargo"},{title:"Создать проект",text:'Cargo — сборщик и менеджер пакетов — сам создаёт Cargo.toml (с edition = "2024") и файл src/main.rs с программой «Hello, world!».',cmd:"cargo new hello_cargo",after:"cd hello_cargo",afterNote:""},{title:"Запустить",text:"Сборка и запуск одной командой. Для повседневной работы хватает четырёх: cargo new, cargo build, cargo run и cargo check — проверка без готового файла, обычно быстрее.",cmd:"cargo run",after:"cargo build --release",afterNote:"финальная быстрая версия"},{title:"Обновлять и учиться",text:"Новая версия выходит раз в шесть недель, rustup ставит её одной командой. Для старта хватит глав 1–4 «Книги»: установка, «Hello, world!», Cargo, владение и заимствование. Дальше — упражнения ниже.",cmd:"rustup update",after:"rustup self uninstall",afterNote:"обновить и удалить"}],O={official:[{name:"The Rust Programming Language",text:"«Книга»: основной учебник от проекта, от принципов языка к небольшим проектам.",href:"https://doc.rust-lang.org/book/"},{name:"Rust By Example",text:"Тот же материал короче, через примеры и упражнения.",href:"https://doc.rust-lang.org/rust-by-example/"},{name:"Rustlings",text:"Официальные небольшие упражнения в своём терминале.",href:"https://github.com/rust-lang/rustlings"},{name:"Exercism, дорожка Rust",text:"99 задач на отдельной бесплатной платформе практики.",href:"https://exercism.org/tracks/rust"}],ru:[{name:"Раздел сайта на русском",text:"Официальная локализация страницы обучения rust-lang.org.",href:"https://www.rust-lang.org/ru/learn/"},{name:"Перевод «Книги» от rust-lang-ru",text:'Рассчитан на Rust 1.67.1 или новее, поэтому может отставать от английской «Книги»: в ней уже edition = "2024".',href:"https://doc.rust-lang.ru/book/"},{name:"Курс на Stepik",text:"«Rust на практике» по официальной книге: бесплатно, 22 урока, 74 теста, 25 интерактивных задач. Сторонний курс.",href:"https://stepik.org/course/303323/promo"}]},x={lead:"Rust — зрелый открытый язык для программ, которым нужны скорость и аккуратная работа с памятью без «уборщика мусора».",yes:["Нужны быстрая командная утилита, узкий сервис или постоянно работающий MCP-сервер, где важны скорость, предсказуемая задержка и аккуратность с памятью.","Для MCP есть официальный Rust SDK (репозиторий modelcontextprotocol/rust-sdk, крейт rmcp) в группе Tier 1.","Готовыми инструментами на Rust, например uv и Ruff, можно пользоваться, не изучая язык."],no:["Для текстов, сайтов, скриптов и большинства интеграций проще Python и JavaScript. Лендинг, контентный сайт или автоматизацию постов на Rust писать не нужно.","Многонедельный курс Rust «чтобы стать программистом» для этих задач не нужен.","Читать чужой Rust сложнее, чем чужой Python. Если код пишет агент, для разбора ошибок компилятора хватит глав 1–4 «Книги» и нескольких упражнений Rustlings."]},lt=[{name:"Анонс Rust 1.100.0",href:"https://blog.rust-lang.org/2026/11/12/Rust-1.100.0/"},{name:"Анонс Rust 1.85.0 и редакции 2024",href:"https://blog.rust-lang.org/2025/02/20/Rust-1.85.0/"},{name:"Анонс Rust 1.0",href:"https://blog.rust-lang.org/2015/05/15/Rust-1.0/"},{name:"Анонс Rust Foundation",href:"https://rustfoundation.org/media/hello-world/"},{name:"Документация ядра Linux по Rust",href:"https://docs.kernel.org/rust/index.html"},{name:"The Rust Programming Language: владение",href:"https://doc.rust-lang.org/book/ch04-01-what-is-ownership.html"},{name:"Официальный SDK для MCP на Rust",href:"https://github.com/modelcontextprotocol/rust-sdk"},{name:"TIOBE Index",href:"https://www.tiobe.com/tiobe-index/"}],o=r=>r.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"),ct={rs:["fn","let","mut","use","pub","struct","impl","match","if","else","for","while","return"],py:["def","import","from","return","if","else","for","while","print"],js:["let","const","var","function","return","if","else","console"],cpp:["int","char","new","delete","return","void","main"],sh:[]},_={rs:/\/\/.*/,py:/#.*/,js:/\/\/.*/,cpp:/\/\/.*/,sh:/#.*/};function f(r,e){const a=ct[e],n=[],t=new RegExp([_[e]?`(?<c>${_[e].source})`:"(?<c>(?!x)x)",'(?<s>"(?:[^"\\\\]|\\\\.)*")',"(?<m>[A-Za-z_][A-Za-z0-9_]*!)","(?<w>[A-Za-z_][A-Za-z0-9_]*)"].join("|"),"g");let s=0;for(const i of r.matchAll(t)){const c=i.index??0;n.push(o(r.slice(s,c)));const d=i.groups??{},m=o(i[0]);d.c?n.push(`<span class="tk-c">${m}</span>`):d.s?n.push(`<span class="tk-s">${m}</span>`):d.m?n.push(`<span class="tk-m">${m}</span>`):d.w&&a.includes(d.w)?n.push(`<span class="tk-k">${m}</span>`):n.push(m),s=c+i[0].length}return n.push(o(r.slice(s))),n.join("")}function R(r){return r.split(`
`).map(e=>{let a=/^(error(?:\[E\d+\])?)(:.*)$/.exec(e);if(a)return`<span class="tk-e">${o(a[1])}</span><b>${o(a[2])}</b>`;if(a=/^(\s*)(--&gt;|-->)(.*)$/.exec(e),a)return`${o(a[1])}<span class="tk-b">--&gt;</span>${o(a[3])}`;if(a=/^(help)(:.*)$/.exec(e),a)return`<span class="tk-ok">${o(a[1])}</span>${o(a[2])}`;if(a=/^(\s*\d*\s*\|)(.*)$/.exec(e),a){const n=o(a[2]).replace(/(\^+|-{1,}(?= [a-z]))/g,t=>t.startsWith("^")?`<span class="tk-e">${t}</span>`:`<span class="tk-b">${t}</span>`);return`<span class="tk-b">${o(a[1])}</span>${n}`}return o(e)}).join(`
`)}const l=(r,e=document)=>{const a=e.querySelector(r);if(!a)throw new Error(`missing ${r}`);return a},p=(r,e=document)=>Array.from(e.querySelectorAll(r)),dt={bolt:'<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',shield:'<path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"/><path d="m9 12 2 2 4-4"/>',list:'<path d="M4 6h16M4 12h10M4 18h6"/>'},ut=r=>`<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${dt[r]}</svg>`,g=(r,e)=>`<a href="${o(r)}" target="_blank" rel="noopener">${o(e)}</a>`;function k(r,e,a={}){return r.split(`
`).map((t,s)=>{const i=a.numbers?`<span class="ln">${s+1}</span>`:"";return`<span class="cl${a.hl===s+1?" is-hl":""}">${i}<span class="ct">${f(t,e)||" "}</span></span>`}).join("")}const y="rust-for-dummies-theme";function pt(){const r=document.documentElement,e=l("#theme-switch"),a=[{id:"light",label:"Светлая"},{id:"dark",label:"Тёмная"},{id:"system",label:"Системная"}];e.innerHTML=a.map(s=>`<button type="button" data-t="${s.id}" aria-pressed="false">${s.label}</button>`).join("");const n=()=>{try{const s=localStorage.getItem(y);return s==="light"||s==="dark"?s:"system"}catch{return"system"}},t=()=>{const s=n();p("button",e).forEach(i=>i.setAttribute("aria-pressed",String(i.dataset.t===s)))};e.addEventListener("click",s=>{const i=s.target.closest("button[data-t]");if(!i)return;const c=i.dataset.t;try{c==="system"?(localStorage.removeItem(y),r.removeAttribute("data-theme")):(localStorage.setItem(y,c),r.dataset.theme=c)}catch{c==="system"?r.removeAttribute("data-theme"):r.dataset.theme=c}t()}),t()}function bt(){l("#hero").innerHTML=`
    <div class="hero__text">
      <div class="chips">
        <span class="chip hot">стабильная ${v.stable}</span>
        <span class="chip">${v.stableDate}</span>
        <span class="chip">редакция ${v.edition}</span>
        <span class="chip">срез на ${v.asOf}</span>
      </div>
      <h1>Rust <span>для чайников</span></h1>
      <p class="lead">Что это за язык, чем он отличается от Python, JavaScript, Go и C++ и зачем он нужен. Сломайте программу и посмотрите, что скажет компилятор, разберите владение по шагам и пройдите путь от установки до первой программы.</p>
      <div class="btns"><a class="btn p" href="#own">Попробовать на примере</a><a class="btn" href="#start">Как начать</a></div>
    </div>
    <div class="term" id="hero-term" aria-label="Пример программы и сообщения компилятора">
      <div class="term__bar">
        <span class="dots" aria-hidden="true"><i></i><i></i><i></i></span>
        <span class="term__file">src/main.rs</span>
        <div class="seg" role="group" aria-label="Версия программы">
          <button type="button" data-v="bug" aria-pressed="true">Как есть</button>
          <button type="button" data-v="fix" aria-pressed="false">Исправить</button>
        </div>
      </div>
      <pre class="code" id="hero-code" tabindex="0"></pre>
      <div class="term__cmd" id="hero-cmd"></div>
      <pre class="code out" id="hero-out" tabindex="0" aria-live="polite"></pre>
      <div class="term__foot" id="hero-foot"></div>
    </div>`;const r=e=>{l("#hero-code").innerHTML=k(e==="bug"?b.ownMoveError:b.ownCloneOk,"rs",{numbers:!0,hl:e==="bug"?5:3}),l("#hero-cmd").innerHTML=`<span class="prompt">$</span> cargo ${e==="bug"?"build":"run"}`,l("#hero-out").innerHTML=e==="bug"?R(b.ownMoveErrorOut):`<span class="tk-ok">${o(b.ownCloneOkOut)}</span>`,l("#hero-foot").textContent=e==="bug"?`Так Rust останавливает ошибку памяти до запуска программы. Это настоящий вывод компилятора Rust ${v.stable}.`:"Одна правка, a.clone(), и программа собирается и печатает слово дважды: у каждой переменной своё значение.",p("#hero-term .seg button").forEach(a=>a.setAttribute("aria-pressed",String(a.dataset.v===e)))};l("#hero-term .seg").addEventListener("click",e=>{const a=e.target.closest("button[data-v]");a&&r(a.dataset.v)}),r("bug")}function mt(){l("#promises").innerHTML=`
    <div class="cards3">
      ${q.map(r=>`<article class="card"><div class="ic">${ut(r.icon)}</div><h3>${o(r.title)}</h3><p>${o(r.text)}</p></article>`).join("")}
    </div>
    <ol class="hist" aria-label="Коротко из истории">
      ${U.map(r=>`<li><time>${o(r.date)}</time><span>${o(r.text)}</span></li>`).join("")}
    </ol>`}function ht(r){const e=[r.a,r.b].filter(s=>s!==null),a=[r.arrowA,r.arrowB],n=(s,i)=>`<div class="val" style="${i}"><b>${o(s.text)}</b><small>${o(s.tag)}</small></div>`;let t="";return e.forEach((s,i)=>{t+=`<div class="var is-${s.state}" style="grid-row:${i+1};grid-column:1"><b>${o(s.name)}</b><small>${o(s.note)}</small></div>`,t+=`<div class="arr${a[i]?"":" off"}" style="grid-row:${i+1};grid-column:2"></div>`}),r.fixed?r.values.forEach((s,i)=>t+=n(s,`grid-row:${i+1};grid-column:3`)):t+=n(r.values[0],`grid-row:1 / span ${e.length};grid-column:3`),t}function vt(){l("#own").innerHTML=`
    <div class="eyebrow">01 · Главная идея</div>
    <h2>Владение: главная странность Rust</h2>
    <p class="sub">У каждого значения есть один владелец. Передали значение дальше, и прежний владелец больше им не пользуется. Выберите шаг и посмотрите, что происходит.</p>
    <div class="lab">
      <div class="diag">
        <div class="steps" role="group" aria-label="Шаги программы">
          ${$.map(t=>`<button type="button" data-s="${t.id}" aria-pressed="false"><i>${t.id}</i>${o(t.label)}</button>`).join("")}
        </div>
        <pre class="code mini" id="own-code" aria-label="Программа"></pre>
        <div class="stage" id="own-stage"></div>
        <div class="say" id="own-say" aria-live="polite"></div>
      </div>
      <div class="col">
        <div class="tabs" role="tablist" aria-label="Тот же код на других языках">
          ${L.map(t=>`<button type="button" role="tab" data-l="${t.id}" aria-selected="false">${o(t.label)}</button>`).join("")}
        </div>
        <div class="panel" id="lang-panel" role="tabpanel">
          <div class="panel__bar"><span id="lang-file"></span></div>
          <pre class="code" id="lang-code" tabindex="0"></pre>
          <div class="panel__out"><span class="prompt">вывод</span></div>
          <pre class="code out" id="lang-out" tabindex="0"></pre>
          <div class="verdict" id="lang-res"></div>
        </div>
        <div class="card rules">
          <h3>Три правила владения</h3>
          <ol>${Q.map(t=>`<li>${o(t)}</li>`).join("")}</ol>
        </div>
      </div>
    </div>

    <div class="lab lab--borrow">
      <div class="col">
        <h3 class="h3">Заимствование: посмотреть, не забирая</h3>
        <p class="sub sub--s">Если значение не нужно забирать насовсем, а только посмотреть, это уже не передача владения, а заимствование (borrowing). Ссылка работает как адрес. Много людей могут читать одну книгу, а писать в ней заметки может только один и не в тот момент, когда другие читают.</p>
        <div class="tabs" role="tablist" aria-label="Примеры заимствования">
          ${S.map(t=>`<button type="button" role="tab" data-b="${t.id}" aria-selected="false">${o(t.label)}</button>`).join("")}
        </div>
        <div class="panel" role="tabpanel">
          <div class="panel__bar"><span>src/main.rs</span></div>
          <pre class="code" id="b-code" tabindex="0"></pre>
          <div class="panel__out"><span class="prompt" id="b-cmd"></span></div>
          <pre class="code out" id="b-out" tabindex="0"></pre>
          <div class="verdict" id="b-res"></div>
        </div>
      </div>
      <div class="col">
        <div class="card rules">
          <h3>Правила заимствования</h3>
          <ol>${tt.map(t=>`<li>${o(t)}</li>`).join("")}</ol>
        </div>
        <div class="card notes">
          <h3>Что важно помнить</h3>
          <ul>${et.map(t=>`<li>${o(t)}</li>`).join("")}</ul>
        </div>
      </div>
    </div>`;const r=t=>{const s=$.find(d=>d.id===t),i=s.fixed?X:Y;l("#own-code").innerHTML=i.map((d,m)=>{const w=m+1,T=s.lines.includes(w)?"":" is-dim",j=s.active===w?s.error?" is-hl is-err":" is-hl":"";return`<span class="cl${T}${j}"><span class="ln">${w}</span><span class="ct">${f(d,"rs")}</span></span>`}).join(""),l("#own-stage").innerHTML=ht(s);const c=l("#own-say");c.textContent=s.text,c.className="say"+(s.error?" err":""),p("#own .steps button").forEach(d=>d.setAttribute("aria-pressed",String(Number(d.dataset.s)===t)))},e=l("#own .steps");e.addEventListener("click",t=>{const s=t.target.closest("button[data-s]");s&&r(Number(s.dataset.s))}),e.addEventListener("keydown",t=>{var d;const s=t.key;if(s!=="ArrowRight"&&s!=="ArrowLeft")return;const i=Number(((d=p("#own .steps button").find(m=>m.getAttribute("aria-pressed")==="true"))==null?void 0:d.dataset.s)??4),c=s==="ArrowRight"?Math.min($.length,i+1):Math.max(1,i-1);r(c),p("#own .steps button")[c-1].focus()}),r(4);const a=t=>{const s=L.find(c=>c.id===t);l("#lang-file").textContent=s.file,l("#lang-code").innerHTML=k(s.code,t==="rs"?"rs":t,{numbers:!0}),l("#lang-out").innerHTML=s.id==="rs"?R(s.output):o(s.output);const i=l("#lang-res");i.textContent=s.result,i.className="verdict "+(s.verdict==="ok"?"is-ok":"is-bad"),p("#own .tabs[aria-label^='Тот же'] button").forEach(c=>c.setAttribute("aria-selected",String(c.dataset.l===t)))};E(l("#own .tabs[aria-label^='Тот же']"),t=>a(t.dataset.l)),a("rs");const n=t=>{const s=S.find(c=>c.id===t);l("#b-code").innerHTML=k(s.code,"rs",{numbers:!0}),l("#b-cmd").textContent=s.verdict==="ok"?"$ cargo run":"$ cargo build",l("#b-out").innerHTML=s.verdict==="ok"?`<span class="tk-ok">${o(s.output)}</span>`:R(s.output);const i=l("#b-res");i.textContent=s.result,i.className="verdict "+(s.verdict==="ok"?"is-ok":"is-bad"),p("#own .tabs[aria-label^='Примеры'] button").forEach(c=>c.setAttribute("aria-selected",String(c.dataset.b===t)))};E(l("#own .tabs[aria-label^='Примеры']"),t=>n(t.dataset.b)),n("write")}function E(r,e){const a=()=>p("button",r);r.addEventListener("click",n=>{const t=n.target.closest("button");t&&e(t)}),r.addEventListener("keydown",n=>{const t=n.key,s=a(),i=s.findIndex(d=>d.getAttribute("aria-selected")==="true");let c=-1;t==="ArrowRight"?c=(i+1)%s.length:t==="ArrowLeft"?c=(i-1+s.length)%s.length:t==="Home"?c=0:t==="End"&&(c=s.length-1),!(c<0)&&(n.preventDefault(),e(s[c]),s[c].focus())})}function ft(){l("#cmp").innerHTML=`
    <div class="eyebrow">02 · Сравнение</div>
    <h2>Rust против остальных</h2>
    <p class="sub">Выберите язык, и справа окажется то, чем он отличается от Rust. Сравнение качественное: универсальных независимых бенчмарков «язык A всегда в N раз быстрее языка B» нет, а такие числа легко вводят в заблуждение.</p>
    <div class="tabs" role="tablist" aria-label="Сравнить Rust с">
      ${C.map(e=>`<button type="button" role="tab" data-v="${e.id}" aria-selected="false">${o(e.label)}</button>`).join("")}
    </div>
    <div class="vs" id="vs" role="table" aria-label="Сравнение языков"></div>
    <p class="vs__note" id="vs-note"></p>`;const r=e=>{const a=C.find(t=>t.id===e);let n=`<div class="vs__row vs__row--h" role="row"><div class="h" role="columnheader"></div><div class="h r" role="columnheader">Rust</div><div class="h" role="columnheader">${o(a.label)}</div></div>`;st.forEach((t,s)=>{n+=`<div class="vs__row" role="row"><div class="k" role="rowheader">${o(t)}</div><div class="r" role="cell">${o(rt[s])}</div><div role="cell">${o(a.cells[s])}</div></div>`}),l("#vs").innerHTML=n,l("#vs-note").textContent=a.verdict,p("#cmp .tabs button").forEach(t=>t.setAttribute("aria-selected",String(t.dataset.v===e)))};E(l("#cmp .tabs"),e=>r(e.dataset.v)),r("py")}function gt(){l("#use").innerHTML=`
    <div class="eyebrow">03 · Где работает</div>
    <h2>Где Rust используют сейчас</h2>
    <p class="sub">${o(ot)}</p>
    <div class="filters" role="group" aria-label="Фильтр по областям">
      ${M.map(e=>`<button type="button" data-g="${e.id}" aria-pressed="false">${o(e.label)}</button>`).join("")}
    </div>
    <div class="use" id="use-grid"></div>`;const r=e=>{const a=at.filter(t=>e==="all"||t.group===e),n=t=>M.find(s=>s.id===t).label;l("#use-grid").innerHTML=a.map(t=>`<article class="card"><span class="tag">${o(n(t.group))}</span><h3>${o(t.name)}</h3><p>${o(t.text)}</p><div class="src"><time>${o(t.date)}</time>${g(t.href,"источник")}</div></article>`).join(""),p("#use .filters button").forEach(t=>t.setAttribute("aria-pressed",String(t.dataset.g===e)))};l("#use .filters").addEventListener("click",e=>{const a=e.target.closest("button[data-g]");a&&r(a.dataset.g)}),r("all")}const wt=r=>r.toFixed(1).replace(".",",")+"%";function $t(){var n;l("#numbers").innerHTML=`
    <div class="eyebrow">04 · Цифры</div>
    <h2>Насколько Rust популярен</h2>
    <p class="sub">Две разные линейки, их нельзя смешивать: опрос разработчиков и индекс по поисковой видимости.</p>
    <div class="nums">
      <div class="card">
        <h3>Опрос Stack Overflow 2026</h3>
        <p class="meta">Опубликован ${h.soDate}. По вопросам о языках ответили ${h.soSample} человек.</p>
        <div class="bars">
          ${nt.map(t=>`<div class="bar2"><div class="bar2__l"><b>${o(t.label)}</b><small>${o(t.sub)}</small></div><i><u style="--w:${t.value}%"></u></i><div class="bar2__v"><b>${wt(t.value)}</b><small>${o(t.people)}</small></div></div>`).join("")}
        </div>
        <p class="meta">«Восхищение» Rust — лучший результат среди языков с большой выборкой. ${o(h.soNote)}</p>
      </div>
      <div class="card">
        <h3>Индекс TIOBE, ноябрь 2026</h3>
        <div class="big"><div><b>${h.tiobe.rank}</b><span>место</span></div><div><b>${h.tiobe.rating}</b><span>рейтинг</span></div></div>
        <ul class="facts">
          <li>Годом ранее Rust был ${h.tiobe.before}.</li>
          <li>Рейтинг за год вырос на ${h.tiobe.delta}.</li>
          <li>10-е место в ноябре занял Go (${h.tiobe.go}).</li>
        </ul>
        <p class="meta">${o(h.tiobeNote)}</p>
      </div>
    </div>`;const r=p("#numbers .bar2 u");if(((n=window.matchMedia)==null?void 0:n.call(window,"(prefers-reduced-motion: reduce)").matches)||!("IntersectionObserver"in window)){r.forEach(t=>t.classList.add("in"));return}document.documentElement.classList.add("anim");const a=new IntersectionObserver(t=>{t.forEach(s=>{s.isIntersecting&&(s.target.classList.add("in"),a.unobserve(s.target))})},{threshold:.4});r.forEach(t=>a.observe(t))}async function xt(r){try{return await navigator.clipboard.writeText(r),!0}catch{const e=document.createElement("textarea");e.value=r,e.style.position="fixed",e.style.opacity="0",document.body.appendChild(e),e.select();let a=!1;try{a=document.execCommand("copy")}catch{a=!1}return e.remove(),a}}function yt(){const r=e=>`<div class="cmd"><code>${f(e,"sh")}</code><button type="button" class="copy" data-copy="${o(e)}" aria-label="Скопировать команду">Копировать</button></div>`;l("#start").innerHTML=`
    <div class="eyebrow">05 · Старт</div>
    <h2>Как начать с нуля</h2>
    <p class="sub">Официальный путь идёт с сайта языка и «Книги». Всё перечисленное бесплатно, если не считать времени. После установки в терминале должны работать <code>rustc --version</code> и <code>cargo --version</code>.</p>
    <ol class="path">
      ${it.map(e=>`<li class="card"><h3>${o(e.title)}</h3><p>${o(e.text)}</p>${r(e.cmd)}<div class="cmd cmd--alt"><code>${f(e.after,"sh")}</code>${e.afterNote?`<em>${o(e.afterNote)}</em>`:""}</div></li>`).join("")}
    </ol>
    <div class="mats">
      <div>
        <h3 class="h3">Официальные материалы</h3>
        <ul class="matlist">${O.official.map(e=>`<li>${g(e.href,e.name)}<span>${o(e.text)}</span></li>`).join("")}</ul>
      </div>
      <div>
        <h3 class="h3">На русском</h3>
        <ul class="matlist">${O.ru.map(e=>`<li>${g(e.href,e.name)}<span>${o(e.text)}</span></li>`).join("")}</ul>
      </div>
    </div>`,l("#start").addEventListener("click",async e=>{const a=e.target.closest("button[data-copy]");if(!a)return;const n=await xt(a.dataset.copy??A);a.textContent=n?"Скопировано":"Не удалось",a.classList.toggle("is-done",n),window.setTimeout(()=>{a.textContent="Копировать",a.classList.remove("is-done")},1600)})}function Rt(){l("#verdict").innerHTML=`
    <div class="eyebrow">06 · Вывод</div>
    <div class="final">
      <h2>Нужен ли Rust именно вам</h2>
      <p class="sub sub--s">${o(x.lead)}</p>
      <div class="yn">
        <div><h3 class="yes">Стоит рассматривать</h3><ul>${x.yes.map(r=>`<li>${o(r)}</li>`).join("")}</ul></div>
        <div><h3 class="no">Не стоит</h3><ul>${x.no.map(r=>`<li>${o(r)}</li>`).join("")}</ul></div>
      </div>
    </div>`}function kt(){l("#foot").innerHTML=`
    <h3 class="h3">Источники</h3>
    <ul class="srcs">${lt.map(r=>`<li>${g(r.href,r.name)}</li>`).join("")}</ul>
    <p class="meta">Версии, даты, цифры популярности и примеры применения сняты ${v.asOf} с официальных сайтов проекта Rust, компаний и опросов. Код на странице собран и запущен компилятором Rust ${v.stable}.</p>`}pt();bt();mt();vt();ft();gt();$t();yt();Rt();kt();

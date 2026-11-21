/* ==========================================================
   Bavarian Drive — BMW fan site (unofficial)
   GSAP + ScrollTrigger + Lenis, vanilla JS
   ========================================================== */
(() => {
  'use strict';

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const root = document.documentElement;

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(pointer: fine)').matches;
  const hasGSAP = !!(window.gsap && window.ScrollTrigger);
  const animate = hasGSAP && !reduce;

  if (hasGSAP) gsap.registerPlugin(ScrollTrigger);
  if (animate) root.classList.add('anim');
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

  /* ---------------------------------------------------------
     DATA
     --------------------------------------------------------- */
  const MODELS = window.BMW_MODELS || [
    { id: 'm3', name: 'M3', img: 'm3.jpg', tag: 'M', hp: 510, acc: 3.5, top: 290 },
    { id: 'm5', name: 'M5', img: 'm5.jpg', tag: 'M Hybrid', hp: 727, acc: 3.5, top: 305 },
    { id: 'm2', name: 'M2', img: 'bluecoupe.jpg', tag: 'M', hp: 480, acc: 4.0, top: 285 },
    { id: 'x5', name: 'X5', img: 'x5.jpg', tag: 'SAV', hp: 530, acc: 4.3, top: 250 },
    { id: 'i4', name: 'i4', img: 'i4a.jpg', tag: 'Electric', hp: 544, acc: 3.9, top: 225 },
    { id: 'ix', name: 'iX', img: 'ixa.jpg', tag: 'Electric', hp: 619, acc: 3.8, top: 250 },
    { id: 's7', name: '7 Series', img: 'teal.jpg', tag: 'Luxury', hp: 544, acc: 4.2, top: 250 }
  ];

  const HISTORY = [
    { y: 1916, mark: 'BFW' },
    { y: 1923, mark: 'R 32' },
    { y: 1929, mark: '3/15' },
    { y: 1936, mark: '328' },
    { y: 1955, mark: 'Isetta' },
    { y: 1962, mark: '1500' },
    { y: 1972, mark: 'M' },
    { y: 1975, mark: 'E21' },
    { y: 1986, img: 'whitem3.jpg' },
    { y: 1999, img: 'x5.jpg' },
    { y: 2014, img: 'orange.jpg' },
    { y: 2021, img: 'ixb.jpg' },
    { y: 2025, img: 'ixa.jpg' }
  ];

  /* ---------------------------------------------------------
     I18N
     --------------------------------------------------------- */
  const DICT = {
    uz: {
      'meta.title': 'Muzaffar Toyirov — BMW muxlislari sayti',
      'meta.desc': "BMW muxlislari uchun kinematografik sayt: modellar, texnologiyalar, 1916-yildan bugungacha tarix va galereya. Rasmiy sayt emas.",
      skip: "Asosiy kontentga o'tish",
      loading: 'Dvigatel qizimoqda',
      'nav.story': 'Hikoya', 'nav.models': 'Modellar', 'nav.tech': 'Texnologiya', 'nav.history': 'Tarix', 'nav.gallery': 'Galereya', 'nav.contact': 'Aloqa',
      'hero.eyebrow': 'Muxlislar sayti · 1916 — bugun',
      'hero.title': "Haydash<br>san'ati",
      'hero.sub': 'Bavariya muhandisligi, M quvvati va elektr kelajak — bir hikoyada.',
      'hero.cta1': "Modellarni ko'rish", 'hero.cta2': 'Hikoyani boshlash', 'hero.scroll': 'Aylantiring',
      'story.1.t': "Yo'l chaqiradi",
      'story.1.p': "Har bir burilish — suhbat. Rul aniq javob beradi, shassi yo'lni his qiladi, siz esa faqat oldinga qaraysiz.",
      'story.2.t': "M — eng kuchli harf",
      'story.2.p': "Poyga treklarida tug'ilgan. Yuqori aylanishli dvigatellar, orqa g'ildirak xarakteri va milimetrgacha sozlangan balans.",
      'story.3.t': 'Jimjit kuch',
      'story.3.p': "Elektr davri xarakterni o'chirmadi — aksincha, darhol keladigan moment va sukunatdagi tezlik yangi zavq berdi.",
      'models.eyebrow': 'Modellar qatori', 'models.title': "Har biri — o'z xarakteri",
      'models.note': "* Ko'rsatkichlar taxminiy, ommaviy manbalardagi versiyalar bo'yicha.",
      'model.m3': 'Sport sedan · 6 silindr, 3.0 L', 'model.m5': 'Gibrid super-sedan · V8', 'model.m2': 'Kompakt kupe · orqa privod',
      'model.x5': 'Premium SAV · M60i', 'model.i4': 'Elektr gran kupe · M50', 'model.ix': 'Elektr SAV · M60', 'model.s7': 'Flagman sedan · 760i',
      'spec.power': 'Quvvat', 'spec.acc': '0–100 km/soat', 'spec.top': 'Maks. tezlik',
      'unit.hp': 'o.k.', 'unit.s': 's', 'unit.kmh': 'km/soat', 'unit.km': 'km',
      'tech.eyebrow': 'Texnologiya', 'tech.title': 'Raqamlarda muhandislik',
      'tech.s1': 'yillik muhandislik tarixi', 'tech.s2': "ideal og'irlik taqsimoti", 'tech.s3': 'eng kuchli M5 quvvati',
      'tech.s4': '0 dan 100 km/soat gacha', 'tech.s5': "pog'onali avtomat uzatma", 'tech.s6': 'elektr modelda masofa (WLTP, taxm.)',
      'tech.f1.t': "Aqlli to'liq privod", 'tech.f1.p': "Moment g'ildiraklar orasida millisekundlarda taqsimlanadi — qor ham, trek ham bir xil ishonch.",
      'tech.f2.t': 'Elektr yuritma', 'tech.f2.p': 'Nodir metallarsiz elektr motorlar, tez quvvatlash va bir zumda keladigan moment.',
      'tech.f3.t': 'Raqamli salon', 'tech.f3.p': "Egilgan displey, ovozli yordamchi va havo orqali yangilanadigan dasturiy ta'minot.",
      'history.eyebrow': 'Tarix', 'history.title': '1916 — bugun',
      'h.1916.t': 'Boshlanish', 'h.1916.p': 'Myunxenda aviadvigatellar ishlab chiqaruvchi kompaniya sifatida tashkil topdi.',
      'h.1923.t': 'Birinchi mototsikl', 'h.1923.p': 'R 32 — oppozit dvigatel va kardan uzatmali birinchi mototsikl.',
      'h.1929.t': 'Birinchi avtomobil', 'h.1929.p': "«Dixi» asosidagi kichik 3/15 bilan avtomobilsozlik tarixi boshlandi.",
      'h.1936.t': '328 roadster', 'h.1936.p': "Yengil va chaqqon 328 o'z davrining poyga afsonasiga aylandi.",
      'h.1955.t': 'Isetta', 'h.1955.p': "Urushdan keyingi yillarda kompaniyani qo'llab-quvvatlagan kichik «pufak-mashina».",
      'h.1962.t': 'Neue Klasse', 'h.1962.p': '1500 sedani zamonaviy sport sedan konsepsiyasiga asos soldi.',
      'h.1972.t': "M tug'ildi", 'h.1972.p': "Motorsport bo'linmasi tashkil topdi, Myunxenda «to'rt silindr» bosh ofisi ochildi.",
      'h.1975.t': '3 Series', 'h.1975.p': 'Eng mashhur seriyaning birinchi avlodi yo‘lga chiqdi.',
      'h.1986.t': 'M3', 'h.1986.p': 'Kuzov poygalari uchun yaratilgan homologatsiya afsonasi.',
      'h.1999.t': 'X5', 'h.1999.p': "Birinchi «Sports Activity Vehicle» — sport xarakterli krossover.",
      'h.2014.t': 'i8', 'h.2014.p': 'Kelajakdan kelgandek plagin-gibrid sport kupe.',
      'h.2021.t': 'iX', 'h.2021.p': 'Elektr davri flagmani: yangi dizayn tili va texnologiyalar.',
      'h.2025.t': 'Neue Klasse', 'h.2025.p': 'Yangi avlod elektr platformasi — tarix davom etmoqda.',
      'gallery.eyebrow': 'Galereya', 'gallery.title': 'Kadrdagi lahzalar',
      'contact.eyebrow': 'Aloqa', 'contact.title': "Klubga qo'shiling",
      'contact.lead': "Uchrashuvlar, avto-sayrlar va trek kunlari haqida birinchi bo'lib xabar oling. Bu muxlislar hamjamiyati — diler emas.",
      'contact.city': 'Shahar', 'contact.cityv': 'Toshkent', 'contact.meet': 'Uchrashuv', 'contact.meetv': 'Har shanba, 21:00',
      'form.name': 'Ismingiz', 'form.email': 'Email', 'form.any': 'Sevimli model', 'form.msg': 'Xabaringiz', 'form.send': 'Yuborish',
      'form.sending': 'Yuborilmoqda…', 'form.ok': "Rahmat! Xabaringiz qabul qilindi (demo — ma'lumot hech qayerga yuborilmaydi).",
      'form.err.name': 'Ismingizni kiriting', 'form.err.email': "To'g'ri email kiriting", 'form.err.msg': 'Kamida 5 ta belgi yozing',
      'footer.unofficial': 'Rasmiy emas.',
      'footer.text': "Bu muxlislar tomonidan yaratilgan norasmiy sayt. BMW va model nomlari BMW AG ning savdo belgilaridir. Sayt BMW AG bilan bog'liq emas.",
      'footer.media': 'Media:',
      'cursor.view': "Ko'rish", 'cursor.drag': 'Suring', 'cursor.open': 'Ochish',
      'models.more': 'Batafsil', 'models.swipe': 'Suring',
      'mp.back': 'Barcha modellar', 'mp.specs': "Texnik ko'rsatkichlar", 'mp.highlights': 'Asosiy xususiyatlar',
      'mp.film': 'Harakatda', 'mp.gallery': 'Galereya', 'mp.next': 'Keyingi model', 'mp.note': "* Ko'rsatkichlar taxminiy.",
      'mp.torque': 'Moment', 'unit.nm': 'Nm'
    },
    ru: {
      'meta.title': 'Muzaffar Toyirov — фан-сайт BMW',
      'meta.desc': 'Кинематографичный сайт для поклонников BMW: модели, технологии, история с 1916 года и галерея. Неофициальный сайт.',
      skip: 'Перейти к содержимому',
      loading: 'Прогрев двигателя',
      'nav.story': 'История', 'nav.models': 'Модели', 'nav.tech': 'Технологии', 'nav.history': 'Хроника', 'nav.gallery': 'Галерея', 'nav.contact': 'Контакты',
      'hero.eyebrow': 'Фан-сайт · 1916 — сегодня',
      'hero.title': 'Искусство<br>вождения',
      'hero.sub': 'Баварская инженерия, мощь M и электрическое будущее — в одной истории.',
      'hero.cta1': 'Смотреть модели', 'hero.cta2': 'Начать историю', 'hero.scroll': 'Листайте',
      'story.1.t': 'Дорога зовёт',
      'story.1.p': 'Каждый поворот — диалог. Руль отвечает точно, шасси чувствует дорогу, а вы смотрите только вперёд.',
      'story.2.t': 'M — самая сильная буква',
      'story.2.p': 'Рождена на гоночных трассах. Высокооборотные моторы, характер заднего привода и баланс, выверенный до миллиметра.',
      'story.3.t': 'Тихая сила',
      'story.3.p': 'Электрическая эра не стёрла характер — мгновенный крутящий момент и скорость в тишине подарили новое удовольствие.',
      'models.eyebrow': 'Модельный ряд', 'models.title': 'У каждой — свой характер',
      'models.note': '* Показатели приблизительные, по версиям из открытых источников.',
      'model.m3': 'Спортивный седан · 6 цилиндров, 3.0 л', 'model.m5': 'Гибридный супер-седан · V8', 'model.m2': 'Компактное купе · задний привод',
      'model.x5': 'Премиум SAV · M60i', 'model.i4': 'Электрическое гран-купе · M50', 'model.ix': 'Электрический SAV · M60', 'model.s7': 'Флагманский седан · 760i',
      'spec.power': 'Мощность', 'spec.acc': '0–100 км/ч', 'spec.top': 'Макс. скорость',
      'unit.hp': 'л.с.', 'unit.s': 'с', 'unit.kmh': 'км/ч', 'unit.km': 'км',
      'tech.eyebrow': 'Технологии', 'tech.title': 'Инженерия в цифрах',
      'tech.s1': 'лет инженерной истории', 'tech.s2': 'идеальная развесовка', 'tech.s3': 'мощность самого сильного M5',
      'tech.s4': 'разгон 0–100 км/ч', 'tech.s5': 'ступеней автоматической коробки', 'tech.s6': 'запас хода электромобиля (WLTP, прибл.)',
      'tech.f1.t': 'Умный полный привод', 'tech.f1.p': 'Момент распределяется между колёсами за миллисекунды — одинаковая уверенность на снегу и на треке.',
      'tech.f2.t': 'Электропривод', 'tech.f2.p': 'Электромоторы без редкоземельных металлов, быстрая зарядка и мгновенный момент.',
      'tech.f3.t': 'Цифровой салон', 'tech.f3.p': 'Изогнутый дисплей, голосовой ассистент и обновления программ по воздуху.',
      'history.eyebrow': 'Хроника', 'history.title': '1916 — сегодня',
      'h.1916.t': 'Начало', 'h.1916.p': 'Компания основана в Мюнхене как производитель авиационных двигателей.',
      'h.1923.t': 'Первый мотоцикл', 'h.1923.p': 'R 32 — первый мотоцикл с оппозитным двигателем и карданом.',
      'h.1929.t': 'Первый автомобиль', 'h.1929.p': 'С компактного 3/15 на базе «Dixi» начинается автомобильная история.',
      'h.1936.t': 'Родстер 328', 'h.1936.p': 'Лёгкий и быстрый 328 стал гоночной легендой своего времени.',
      'h.1955.t': 'Isetta', 'h.1955.p': 'Крошечная «машина-пузырь», поддержавшая компанию в послевоенные годы.',
      'h.1962.t': 'Neue Klasse', 'h.1962.p': 'Седан 1500 заложил концепцию современного спортивного седана.',
      'h.1972.t': 'Рождение M', 'h.1972.p': 'Создано подразделение Motorsport, в Мюнхене открыта штаб-квартира «Четыре цилиндра».',
      'h.1975.t': '3 Series', 'h.1975.p': 'Вышло первое поколение самой популярной серии.',
      'h.1986.t': 'M3', 'h.1986.p': 'Легенда омологации, созданная для кузовных гонок.',
      'h.1999.t': 'X5', 'h.1999.p': 'Первый «Sports Activity Vehicle» — кроссовер со спортивным характером.',
      'h.2014.t': 'i8', 'h.2014.p': 'Подключаемый гибридный спорткар, словно из будущего.',
      'h.2021.t': 'iX', 'h.2021.p': 'Флагман электрической эры: новый язык дизайна и технологии.',
      'h.2025.t': 'Neue Klasse', 'h.2025.p': 'Новое поколение электрической платформы — история продолжается.',
      'gallery.eyebrow': 'Галерея', 'gallery.title': 'Моменты в кадре',
      'contact.eyebrow': 'Контакты', 'contact.title': 'Вступайте в клуб',
      'contact.lead': 'Узнавайте первыми о встречах, автопробегах и трек-днях. Это сообщество поклонников, а не дилер.',
      'contact.city': 'Город', 'contact.cityv': 'Ташкент', 'contact.meet': 'Встреча', 'contact.meetv': 'Каждую субботу, 21:00',
      'form.name': 'Ваше имя', 'form.email': 'Email', 'form.any': 'Любимая модель', 'form.msg': 'Сообщение', 'form.send': 'Отправить',
      'form.sending': 'Отправка…', 'form.ok': 'Спасибо! Сообщение принято (демо — данные никуда не отправляются).',
      'form.err.name': 'Введите имя', 'form.err.email': 'Введите корректный email', 'form.err.msg': 'Минимум 5 символов',
      'footer.unofficial': 'Неофициальный сайт.',
      'footer.text': 'Сайт создан поклонниками. BMW и названия моделей — товарные знаки BMW AG. Сайт не связан с BMW AG.',
      'footer.media': 'Медиа:',
      'cursor.view': 'Смотреть', 'cursor.drag': 'Тяните', 'cursor.open': 'Открыть',
      'models.more': 'Подробнее', 'models.swipe': 'Листайте',
      'mp.back': 'Все модели', 'mp.specs': 'Характеристики', 'mp.highlights': 'Главные особенности',
      'mp.film': 'В движении', 'mp.gallery': 'Галерея', 'mp.next': 'Следующая модель', 'mp.note': '* Показатели приблизительные.',
      'mp.torque': 'Момент', 'unit.nm': 'Нм'
    }
  };

  const storage = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* ignore */ } }
  };
  let lang = storage.get('bd-lang') || ((navigator.language || '').toLowerCase().startsWith('ru') ? 'ru' : 'uz');
  if (!DICT[lang]) lang = 'uz';
  const t = (key) => (DICT[lang] && DICT[lang][key]) || DICT.uz[key] || '';

  /* ---------------------------------------------------------
     RENDER: models + history
     --------------------------------------------------------- */
  function renderModels() {
    const track = $('.models__track');
    track.innerHTML = MODELS.map((m) => `
      <a class="model-card" href="model.html?id=${m.id}" data-cursor="open" aria-label="BMW ${m.name} — batafsil">
        <div class="model-card__media">
          <img src="media/img/${m.img}" alt="BMW ${m.name}" loading="lazy" draggable="false" width="1600" height="1067">
          <span class="model-card__tag">${m.tag}</span>
        </div>
        <div class="model-card__body">
          <h3 class="model-card__name">${m.name}</h3>
          <p class="model-card__type" data-i18n="model.${m.id}"></p>
          <div class="model-card__specs">
            <div><div class="spec__v"><span data-count="${m.hp}">${m.hp}</span><small data-i18n="unit.hp"></small></div><div class="spec__l" data-i18n="spec.power"></div></div>
            <div><div class="spec__v"><span data-count="${m.acc}" data-decimals="1">${m.acc.toFixed(1)}</span><small data-i18n="unit.s"></small></div><div class="spec__l" data-i18n="spec.acc"></div></div>
            <div><div class="spec__v"><span data-count="${m.top}">${m.top}</span><small data-i18n="unit.kmh"></small></div><div class="spec__l" data-i18n="spec.top"></div></div>
          </div>
        </div>
        <span class="model-card__more"><span data-i18n="models.more"></span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span>
        <span class="model-card__line"></span>
      </a>`).join('');
  }

  function renderHistory() {
    $('.history__track').innerHTML = HISTORY.map((h) => `
      <li class="h-card">
        <div class="h-card__year">${h.y}</div>
        ${h.img
          ? `<div class="h-card__img"><img src="media/img/${h.img}" alt="" loading="lazy" width="1600" height="1067"></div>`
          : `<div class="h-card__img h-card__img--type" aria-hidden="true">${h.mark}</div>`}
        <h3 data-i18n="h.${h.y}.t"></h3>
        <p data-i18n="h.${h.y}.p"></p>
      </li>`).join('');
  }

  /* ---------------------------------------------------------
     SPLIT TEXT (hero title, letter by letter)
     --------------------------------------------------------- */
  function splitTitle(el, html) {
    const lines = html.split(/<br\s*\/?>/i);
    el.innerHTML = lines.map((line) => {
      const words = line.trim().split(/\s+/).map((w) =>
        `<span class="word">${[...w].map((c) => `<span class="char">${c}</span>`).join('')}</span>`
      ).join(' ');
      return `<span class="line">${words}</span>`;
    }).join('');
    el.setAttribute('aria-label', html.replace(/<br\s*\/?>/gi, ' '));
    $$('.line', el).forEach((l) => l.setAttribute('aria-hidden', 'true'));
  }

  function applyLang(next, initial) {
    lang = next;
    storage.set('bd-lang', lang);
    root.lang = lang;
    if (root.dataset.pageTitle) document.title = root.dataset.pageTitle;
    else {
      document.title = t('meta.title');
      const md = $('meta[name="description"]');
      if (md) md.setAttribute('content', t('meta.desc'));
    }

    $$('[data-i18n]').forEach((el) => {
      const key = el.dataset.i18n;
      const val = t(key);
      if (!val) return;
      if (el.hasAttribute('data-split')) splitTitle(el, val);
      else el.textContent = val;
    });

    $$('.lang__btn').forEach((b) => {
      const on = b.dataset.lang === lang;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-pressed', on);
    });

    if (!initial && hasGSAP) {
      if (animate && $('.hero__title .char')) gsap.from('.hero__title .char', { yPercent: 100, opacity: 0, stagger: 0.025, duration: 0.8, ease: 'expo.out' });
      ScrollTrigger.refresh();
    }
  }

  /* ---------------------------------------------------------
     COUNTERS
     --------------------------------------------------------- */
  function countUp(el, duration = 1.8) {
    const target = parseFloat(el.dataset.count);
    const dec = parseInt(el.dataset.decimals || '0', 10);
    if (!animate) { el.textContent = target.toFixed(dec); return; }
    const obj = { v: 0 };
    gsap.killTweensOf(el.__counter || {});
    el.__counter = obj;
    gsap.to(obj, {
      v: target, duration, ease: 'power3.out',
      onUpdate: () => { el.textContent = obj.v.toFixed(dec); }
    });
  }

  /* ---------------------------------------------------------
     LENIS
     --------------------------------------------------------- */
  let lenis = null;
  function initLenis() {
    if (!animate || !window.Lenis) return;
    lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
    lenis.stop();
  }
  const lockScroll = (on) => {
    if (lenis) on ? lenis.stop() : lenis.start();
    document.body.style.overflow = on ? 'hidden' : '';
  };

  /* ---------------------------------------------------------
     PRELOADER
     --------------------------------------------------------- */
  function runPreloader(onDone) {
    const pre = $('.preloader');
    const num = $('.preloader__num');
    const bar = $('.preloader__bar span');
    if (!pre) { onDone(); return; }
    document.body.classList.add('is-loading');
    window.scrollTo(0, 0);

    let val = 0;
    let ready = document.readyState === 'complete';
    const start = performance.now();
    if (!ready) window.addEventListener('load', () => { ready = true; }, { once: true });
    setTimeout(() => { ready = true; }, 4500);

    const finish = () => {
      document.body.classList.remove('is-loading');
      if (animate) {
        gsap.timeline({ onComplete: () => pre.remove() })
          .to('.preloader__inner', { y: -40, opacity: 0, duration: 0.5, ease: 'power2.in' })
          .to(pre, { yPercent: -100, duration: 1, ease: 'expo.inOut' }, '-=.1')
          .add(onDone, '-=.55');
      } else {
        pre.remove();
        onDone();
      }
    };

    if (reduce) { finish(); return; }

    let doneAt = 0, from = 0;
    const tick = (now) => {
      const el = now - start;
      if (!(ready && el > 1100)) {
        val = 88 * (1 - Math.exp(-el / 650)); // time-based, frame-rate independent
      } else {
        if (!doneAt) { doneAt = now; from = val; }
        const k = Math.min((now - doneAt) / 450, 1);
        val = from + (100 - from) * (1 - Math.pow(1 - k, 3));
      }
      num.textContent = Math.round(val);
      bar.style.width = val + '%';
      if (val < 100) requestAnimationFrame(tick);
      else finish();
    };
    requestAnimationFrame(tick);
  }

  /* ---------------------------------------------------------
     HERO
     --------------------------------------------------------- */
  function initHeroVideo() {
    const v = $('.hero__video');
    if (!v) return;
    if (reduce) { v.removeAttribute('autoplay'); v.pause(); return; }
    const conn = navigator.connection || {};
    const portrait = window.innerWidth < 768 && window.innerHeight > window.innerWidth;
    const wantLg = window.innerWidth >= 1100 && !conn.saveData;
    const src = portrait && v.dataset.srcMobile ? v.dataset.srcMobile : (wantLg ? v.dataset.srcLg : v.dataset.srcSm);
    const source = $('source', v);
    if (source && !source.src.endsWith(src)) {
      source.src = src;
      v.load();
    }
    const p = v.play();
    if (p && p.catch) p.catch(() => { /* autoplay blocked: poster stays */ });
  }

  function heroIntro() {
    if (lenis) lenis.start();
    if (!animate || !$('.hero')) return;
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
    tl.fromTo('.hero__video', { scale: 1.3 }, { scale: 1.08, duration: 2.4, ease: 'power3.out' }, 0)
      .from('.hero__title .char', { yPercent: 115, rotate: 6, opacity: 0, duration: 1.2, stagger: 0.035 }, 0.1)
      .from('.hero__author', { y: 20, opacity: 0, letterSpacing: '0.6em', duration: 1.4 }, 0.2)
      .from('.hero__eyebrow', { y: 20, opacity: 0, duration: 1 }, 0.3)
      .from('.hero__sub', { y: 24, opacity: 0, duration: 1 }, 0.6)
      .from('.hero__cta .btn', { y: 24, opacity: 0, duration: 1, stagger: 0.1 }, 0.7)
      .from('.scroll-ind, .hero__meta', { opacity: 0, duration: 1 }, 1)
      .fromTo('.nav', { opacity: 0 }, { opacity: 1, duration: 1, clearProps: 'opacity' }, 0.5);

    gsap.to('.hero__media', {
      yPercent: 18, ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
    });
    gsap.to('.hero__content', {
      y: -100, opacity: 0, ease: 'none',
      scrollTrigger: { trigger: '.hero', start: '30% top', end: 'bottom top', scrub: true }
    });
  }

  /* ---------------------------------------------------------
     STORY (pinned, parallax swaps)
     --------------------------------------------------------- */
  function initStory() {
    if (!animate) return;
    const section = $('.story');
    section.classList.add('story--pinned');
    const chapters = $$('.chapter', section);
    const medias = chapters.map((c) => $('.chapter__media', c));
    const imgs = chapters.map((c) => $('img', c));
    const texts = chapters.map((c) => $('.chapter__text', c));
    const dots = $$('.story__progress span', section);

    // eager-load story images (they are inside a pinned stage)
    imgs.forEach((i) => { i.loading = 'eager'; });

    gsap.set(medias.slice(1), { clipPath: 'inset(100% 0% 0% 0%)' });
    gsap.set(texts.slice(1), { opacity: 0, y: 60 });

    const n = chapters.length;
    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => '+=' + window.innerHeight * (n + 0.5),
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const seg = self.progress * n;
          dots.forEach((d, i) => d.style.setProperty('--p', Math.min(Math.max(seg - i, 0), 1).toFixed(3)));
        }
      }
    });

    tl.fromTo(imgs[0], { scale: 1.15 }, { scale: 1, duration: 1 }, 0)
      .from(texts[0].children, { y: 50, opacity: 0, stagger: 0.12, duration: 0.5, ease: 'power2.out' }, 0);

    for (let i = 1; i < n; i++) {
      const at = i * 1.2;
      tl.to(texts[i - 1], { opacity: 0, y: -60, duration: 0.45, ease: 'power1.in' }, at)
        .to(imgs[i - 1], { scale: 1.12, yPercent: -6, duration: 1 }, at)
        .to(medias[i], { clipPath: 'inset(0% 0% 0% 0%)', duration: 1, ease: 'power2.inOut' }, at)
        .fromTo(imgs[i], { scale: 1.3, yPercent: 8 }, { scale: 1, yPercent: 0, duration: 1.2 }, at)
        .to(texts[i], { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, at + 0.6);
    }
    tl.to({}, { duration: 0.4 });
  }

  /* ---------------------------------------------------------
     MODELS CAROUSEL
     --------------------------------------------------------- */
  function initModels() {
    const track = $('.models__track');
    const cards = $$('.model-card', track);
    const bar = $('.models__bar span');

    const updateBar = () => {
      const max = track.scrollWidth - track.clientWidth;
      bar.style.transform = `scaleX(${max > 0 ? Math.max(track.scrollLeft / max, 0.08) : 1})`;
    };
    track.addEventListener('scroll', updateBar, { passive: true });
    updateBar();

    // buttons
    $$('.models__controls .round-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const card = cards[0];
        const gap = parseFloat(getComputedStyle(track).columnGap) || 24;
        track.scrollBy({ left: (card.offsetWidth + gap) * Number(btn.dataset.dir), behavior: reduce ? 'auto' : 'smooth' });
      });
    });

    // mouse drag (touch uses native swipe)
    let down = false, startX = 0, startLeft = 0, moved = false;
    track.addEventListener('pointerdown', (e) => {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      down = true; moved = false; startX = e.clientX; startLeft = track.scrollLeft;
    });
    window.addEventListener('pointermove', (e) => {
      if (!down) return;
      const dx = e.clientX - startX;
      if (!moved && Math.abs(dx) > 5) { moved = true; track.classList.add('is-dragging'); }
      if (moved) track.scrollLeft = startLeft - dx * 1.2;
    });
    const end = () => {
      if (!down) return;
      down = false;
      if (moved) {
        // let snapping take over again
        requestAnimationFrame(() => track.classList.remove('is-dragging'));
      }
    };
    track.addEventListener('click', (e) => { if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; } }, true);
    window.addEventListener('pointerup', end);
    window.addEventListener('pointercancel', end);

    // count specs each time a card comes into view
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          const card = en.target;
          if (en.isIntersecting) {
            if (!card.classList.contains('is-current')) {
              card.classList.add('is-current');
              $$('[data-count]', card).forEach((el, i) => countUp(el, 1.4 + i * 0.2));
            }
          } else {
            card.classList.remove('is-current');
          }
        });
      }, { threshold: 0.6 });
      cards.forEach((c) => io.observe(c));
    }

    if (animate) {
      gsap.from(cards, {
        x: 120, opacity: 0, duration: 1.2, stagger: 0.08, ease: 'expo.out',
        scrollTrigger: { trigger: track, start: 'top 85%', once: true }
      });
    }
  }

  /* ---------------------------------------------------------
     TECH
     --------------------------------------------------------- */
  function initTech() {
    const nums = $$('.stats [data-count]');
    if (!hasGSAP) { nums.forEach((n) => countUp(n)); return; }
    nums.forEach((el, i) => {
      ScrollTrigger.create({ trigger: el, start: 'top 90%', once: true, onEnter: () => countUp(el, 2 + (i % 3) * 0.2) });
    });
    if (animate) {
      gsap.fromTo('.tech__bg img', { yPercent: -10 }, {
        yPercent: 0, ease: 'none',
        scrollTrigger: { trigger: '.tech', start: 'top bottom', end: 'bottom top', scrub: true }
      });
    }
  }

  /* ---------------------------------------------------------
     HISTORY (horizontal pinned timeline)
     --------------------------------------------------------- */
  function initHistory() {
    const section = $('.history');
    const track = $('.history__track');
    const line = $('.history__line span');
    const viewport = $('.history__viewport');

    if (!animate) {
      const upd = () => {
        const max = viewport.scrollWidth - viewport.clientWidth;
        line.style.transform = `scaleX(${max > 0 ? viewport.scrollLeft / max : 1})`;
      };
      viewport.addEventListener('scroll', upd, { passive: true });
      upd();
      return;
    }

    section.classList.add('history--pinned');
    const dist = () => Math.max(track.scrollWidth - window.innerWidth, 0);
    const tween = gsap.to(track, {
      x: () => -dist(), ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => '+=' + dist(),
        pin: true, scrub: 1, anticipatePin: 1, invalidateOnRefresh: true,
        onUpdate: (self) => { line.style.transform = `scaleX(${self.progress})`; }
      }
    });

    $$('.h-card', track).forEach((card) => {
      ScrollTrigger.create({
        trigger: card, containerAnimation: tween,
        start: 'left 65%', end: 'right 35%',
        toggleClass: 'is-active'
      });
      const img = $('.h-card__img img', card);
      if (img) {
        img.loading = 'eager';
        gsap.fromTo(img, { scale: 1.25 }, {
          scale: 1, ease: 'none',
          scrollTrigger: { trigger: card, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true }
        });
      }
    });
  }

  /* ---------------------------------------------------------
     GALLERY + LIGHTBOX
     --------------------------------------------------------- */
  function initGallery() {
    const items = $$('.g-item');
    const vids = $$('.g-item video[data-autoplay]');

    if (!reduce && 'IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          const v = en.target;
          if (en.isIntersecting) { const p = v.play(); if (p && p.catch) p.catch(() => {}); }
          else v.pause();
        });
      }, { threshold: 0.25 });
      vids.forEach((v) => io.observe(v));
    }

    if (animate) {
      ScrollTrigger.batch(items, {
        start: 'top 92%', once: true,
        onEnter: (batch) => gsap.fromTo(batch,
          { opacity: 0, y: 60, clipPath: 'inset(15% 0% 0% 0%)' },
          { opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)', duration: 1.1, stagger: 0.08, ease: 'expo.out' })
      });
    }

    // lightbox
    const lb = $('.lightbox');
    const stage = $('.lightbox__stage');
    const count = $('.lightbox__count');
    let idx = 0;
    let lastFocus = null;

    const show = (i) => {
      idx = (i + items.length) % items.length;
      const it = items[idx];
      const src = it.dataset.src;
      const alt = ($('img', it) || {}).alt || '';
      stage.innerHTML = it.dataset.type === 'video'
        ? `<video src="${src}" controls autoplay muted loop playsinline></video>`
        : `<img src="${src}" alt="${alt}">`;
      count.textContent = `${String(idx + 1).padStart(2, '0')} / ${String(items.length).padStart(2, '0')}`;
      if (animate) gsap.fromTo(stage.firstElementChild, { opacity: 0, scale: 0.96 }, { opacity: 1, scale: 1, duration: 0.6, ease: 'expo.out' });
    };
    const open = (i) => {
      lastFocus = document.activeElement;
      lb.hidden = false;
      lockScroll(true);
      show(i);
      if (animate) gsap.fromTo(lb, { opacity: 0 }, { opacity: 1, duration: 0.4 });
      $('.lightbox__close').focus();
    };
    const close = () => {
      const v = $('video', stage);
      if (v) v.pause();
      const done = () => { lb.hidden = true; stage.innerHTML = ''; lockScroll(false); if (lastFocus) lastFocus.focus(); };
      if (animate) gsap.to(lb, { opacity: 0, duration: 0.3, onComplete: done }); else done();
    };

    items.forEach((it, i) => it.addEventListener('click', () => open(i)));
    $('.lightbox__close').addEventListener('click', close);
    $('.lightbox__prev').addEventListener('click', () => show(idx - 1));
    $('.lightbox__next').addEventListener('click', () => show(idx + 1));
    lb.addEventListener('click', (e) => { if (e.target === lb) close(); });
    document.addEventListener('keydown', (e) => {
      if (lb.hidden) return;
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight') show(idx + 1);
      else if (e.key === 'ArrowLeft') show(idx - 1);
      else if (e.key === 'Tab') {
        const f = $$('button', lb);
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });

    // swipe in lightbox
    let sx = null;
    lb.addEventListener('touchstart', (e) => { sx = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', (e) => {
      if (sx === null) return;
      const dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 50) show(idx + (dx < 0 ? 1 : -1));
      sx = null;
    });
  }

  /* ---------------------------------------------------------
     FORM
     --------------------------------------------------------- */
  function initForm() {
    const form = $('.form');
    const status = $('.form__status');
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const validate = (el) => {
      let ok = true;
      if (el.required && el.value.trim().length < (el.minLength > 0 ? el.minLength : 1)) ok = false;
      if (el.type === 'email' && !emailRe.test(el.value.trim())) ok = false;
      el.closest('.field').classList.toggle('is-invalid', !ok);
      el.setAttribute('aria-invalid', String(!ok));
      return ok;
    };
    const fields = $$('input, textarea', form);
    fields.forEach((el) => el.addEventListener('input', () => { if (el.closest('.field').classList.contains('is-invalid')) validate(el); }));

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const results = fields.map(validate);
      if (results.includes(false)) {
        const firstBad = fields[results.indexOf(false)];
        firstBad.focus();
        if (animate) gsap.fromTo(form, { x: -8 }, { x: 0, duration: 0.6, ease: 'elastic.out(1,.3)' });
        return;
      }
      const btn = $('button[type="submit"] span', form);
      btn.textContent = t('form.sending');
      setTimeout(() => {
        btn.textContent = t('form.send');
        status.textContent = t('form.ok');
        form.reset();
        $$('.field', form).forEach((f) => f.classList.remove('is-invalid'));
      }, 900);
    });
  }

  /* ---------------------------------------------------------
     NAV
     --------------------------------------------------------- */
  function initNav() {
    const nav = $('#nav');
    const burger = $('.nav__burger');
    const menu = $('#mobileMenu');
    let lastY = 0;

    const onScroll = () => {
      const y = window.scrollY;
      nav.classList.toggle('is-scrolled', y > 40);
      // navbar stays visible all the time (requested: navigation must always be reachable)
      lastY = y;
    };
    // native scroll events fire with and without Lenis
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const setMenu = (open) => {
      burger.setAttribute('aria-expanded', String(open));
      menu.hidden = !open;
      lockScroll(open);
      if (open && animate) gsap.from($$('a', menu), { y: 40, opacity: 0, stagger: 0.06, duration: 0.7, ease: 'expo.out' });
    };
    burger.addEventListener('click', () => setMenu(menu.hidden));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !menu.hidden) setMenu(false); });

    // anchor links via Lenis
    $$('a[href^="#"]').forEach((a) => {
      a.addEventListener('click', (e) => {
        const id = a.getAttribute('href');
        const target = id.length > 1 ? $(id) : null;
        if (!target) return;
        e.preventDefault();
        if (!menu.hidden) setMenu(false);
        if (lenis) lenis.scrollTo(target, { duration: 1.6 });
        else target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
      });
    });

    // active section
    if (hasGSAP) {
      const links = $$('.nav__links a');
      links.forEach((l) => {
        const href = l.getAttribute('href');
        if (!href.startsWith('#')) return;
        const sec = $(href);
        if (!sec) return;
        ScrollTrigger.create({
          trigger: sec, start: 'top 50%', end: 'bottom 50%',
          onToggle: (self) => {
            if (self.isActive) { links.forEach((x) => x.classList.remove('is-active')); l.classList.add('is-active'); }
            else l.classList.remove('is-active');
          }
        });
      });
    }

    $$('.lang__btn').forEach((b) => b.addEventListener('click', () => { if (b.dataset.lang !== lang) applyLang(b.dataset.lang); }));
  }

  /* ---------------------------------------------------------
     CURSOR + MAGNETIC
     --------------------------------------------------------- */
  function initCursor() {
    if (!finePointer) return;
    root.classList.add('has-cursor');
    const cur = $('.cursor');
    const ring = $('.cursor__ring');
    const dot = $('.cursor__dot');
    const label = $('.cursor__label');

    let moveRing, moveDot;
    if (hasGSAP && !reduce) {
      const rx = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3.out' });
      const ry = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3.out' });
      const dx = gsap.quickTo(dot, 'x', { duration: 0.08 });
      const dy = gsap.quickTo(dot, 'y', { duration: 0.08 });
      moveRing = (x, y) => { rx(x); ry(y); };
      moveDot = (x, y) => { dx(x); dy(y); };
    } else {
      moveRing = (x, y) => { ring.style.transform = `translate(${x}px,${y}px)`; };
      moveDot = (x, y) => { dot.style.transform = `translate(${x}px,${y}px)`; };
    }

    window.addEventListener('pointermove', (e) => {
      if (e.pointerType !== 'mouse') return;
      cur.classList.remove('is-hidden');
      moveRing(e.clientX, e.clientY);
      moveDot(e.clientX, e.clientY);
    }, { passive: true });
    document.addEventListener('mouseleave', () => cur.classList.add('is-hidden'));

    document.addEventListener('mouseover', (e) => {
      const labelEl = e.target.closest('[data-cursor]');
      const hoverEl = e.target.closest('a, button, input, textarea, select, label');
      if (labelEl && (!hoverEl || labelEl.contains(hoverEl) && hoverEl === labelEl)) {
        label.textContent = t('cursor.' + labelEl.dataset.cursor);
        cur.classList.add('is-label'); cur.classList.remove('is-hover');
      } else if (hoverEl) {
        cur.classList.add('is-hover'); cur.classList.remove('is-label');
      } else {
        cur.classList.remove('is-hover', 'is-label');
      }
    });
  }

  function initMagnetic() {
    if (!finePointer || !animate) return;
    $$('[data-magnetic]').forEach((el) => {
      const strength = el.classList.contains('round-btn') ? 0.45 : 0.3;
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        gsap.to(el, {
          x: (e.clientX - (r.left + r.width / 2)) * strength,
          y: (e.clientY - (r.top + r.height / 2)) * strength,
          duration: 0.4, ease: 'power3.out'
        });
      });
      el.addEventListener('pointerleave', () => gsap.to(el, { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1,.4)' }));
    });
  }

  /* ---------------------------------------------------------
     REVEALS
     --------------------------------------------------------- */
  function initReveals() {
    if (!animate) return;
    ScrollTrigger.batch('.reveal', {
      start: 'top 88%', once: true,
      onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 1.1, stagger: 0.1, ease: 'expo.out' })
    });
    $$('.section__head .eyebrow, .history__head .eyebrow').forEach((el) => {
      gsap.from(el, { opacity: 0, x: -30, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 90%', once: true } });
    });
    if ($('.history')) gsap.from('.history__head .section__title', {
      opacity: 0, y: 40, duration: 1.1, ease: 'expo.out',
      scrollTrigger: { trigger: '.history', start: 'top 80%', once: true }
    });
    if ($('.footer__big')) gsap.fromTo('.footer__big', { xPercent: 8 }, {
      xPercent: -8, ease: 'none',
      scrollTrigger: { trigger: '.footer', start: 'top bottom', end: 'bottom bottom', scrub: true }
    });
  }

  /* ---------------------------------------------------------
     BOOT
     --------------------------------------------------------- */
  const has = (sel) => !!$(sel);
  if (has('.models__track')) renderModels();
  if (has('.history__track')) renderHistory();
  applyLang(lang, true);
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  initLenis();
  window.__lenis = lenis;
  if (has('.hero__video')) initHeroVideo();
  initNav();
  initCursor();
  initMagnetic();
  if (has('.story')) initStory();
  if (has('.models__track')) initModels();
  if (has('.stats')) initTech();
  if (has('.history__track')) initHistory();
  if (has('.g-item')) initGallery();
  if (has('.form')) initForm();
  initReveals();

  if (animate && has('.hero__title')) {
    // hide hero pieces until intro plays
    gsap.set('.hero__title .char', { yPercent: 115, opacity: 0 });
    gsap.set('.hero__author, .hero__eyebrow, .hero__sub, .hero__cta .btn', { opacity: 0 });
  }

  if (has('.preloader')) {
    runPreloader(() => {
      if (animate) gsap.set('.hero__title .char, .hero__author, .hero__eyebrow, .hero__sub, .hero__cta .btn', { clearProps: 'opacity,transform' });
      heroIntro();
      if (hasGSAP) ScrollTrigger.refresh();
    });
  } else {
    if (lenis) lenis.start();
    if (typeof window.__pageIntro === 'function') window.__pageIntro();
  }

  if (document.fonts && document.fonts.ready && hasGSAP) document.fonts.ready.then(() => ScrollTrigger.refresh());
  let rT;
  window.addEventListener('resize', () => { clearTimeout(rT); rT = setTimeout(() => hasGSAP && ScrollTrigger.refresh(), 250); });
})();

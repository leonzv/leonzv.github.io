(function () {
  var MONTHS = {
    en: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    pt: ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez']
  };
  var AXIS_START = 2021, AXIS_YEARS = 6, AXIS_MONTHS = AXIS_YEARS * 12;
  var now = new Date();
  var NOW_IDX = (now.getFullYear() - AXIS_START) * 12 + now.getMonth();
  function idx(ym) { return ym ? (ym[0] - AXIS_START) * 12 + (ym[1] - 1) : NOW_IDX; }

  var JOBS = [
    { co: 'Vertti Tecnologia', start: [2025, 9], end: null,
      role: { en: 'Full-stack Developer', pt: 'Desenvolvedor Full-stack' },
      type: { en: 'Full-time', pt: 'Tempo integral' }, loc: 'Maringá, PR · Remote',
      bullets: {
        en: ['Software development for the Brazilian road and rail freight sector.', 'Products across YMS (yard), TMS (transport), DMS and TOS (terminal operations).'],
        pt: ['Desenvolvimento de software para o transporte de cargas rodoviário e ferroviário brasileiro.', 'Produtos de YMS (pátio), TMS (transporte), DMS e TOS (operação de terminais).'] },
      tags: ['YMS', 'TMS', 'DMS', 'TOS'] },
    { co: 'Osklen', start: [2023, 8], end: [2025, 9],
      role: { en: 'Full Stack Developer | DevOps', pt: 'Desenvolvedor Full Stack | DevOps' },
      type: { en: 'Freelance', pt: 'Freelancer' }, loc: 'Remote',
      bullets: {
        en: ['Development of a platform for product and label research/inspection.', 'Maintenance of website, servers, and database.'],
        pt: ['Construção de plataforma de pesquisa e inspeção de produtos e etiquetas.', 'Manutenção do site, servidores e banco de dados.'] },
      tags: ['Python', 'Back-end'] },
    { co: 'ATM Outsourcing', start: [2023, 5], end: [2025, 9],
      role: { en: 'Full-stack Developer', pt: 'Desenvolvedor Full-stack' },
      type: { en: 'Full-time', pt: 'Tempo integral' }, loc: 'São José do Rio Preto, SP · Remote',
      bullets: {
        en: ['Maintenance and modernization of internal administrative portal.', 'Feature development for electric vehicle chargers.', 'Integration of monitoring and control systems.', 'Mobile device management (MDM) system.'],
        pt: ['Manutenção e modernização do portal administrativo interno.', 'Desenvolvimento de features para carregadores de veículos elétricos.', 'Integração de sistemas de monitoramento e controle.', 'Sistema de gerenciamento de dispositivos móveis (MDM).'] },
      tags: ['Node.js', 'Back-end'] },
    { co: 'MindTek', start: [2021, 7], end: [2023, 2],
      role: { en: 'Full-stack Developer', pt: 'Desenvolvedor Full-stack' },
      type: { en: 'Internship', pt: 'Estágio' }, loc: 'Remote',
      bullets: {
        en: ['Development of web platform for supplier analysis.', 'Implementation of product search and inspection system.', 'Server and infrastructure maintenance.'],
        pt: ['Desenvolvimento de plataforma web para análise de fornecedores.', 'Implementação de sistema de busca e inspeção de produtos.', 'Manutenção de servidores e infraestrutura.'] },
      tags: ['Linux', 'Python'] },
    { co: 'Rupture Software', start: [2021, 2], end: [2021, 6],
      role: { en: 'Mobile Developer', pt: 'Desenvolvedor Mobile' },
      type: { en: 'Internship', pt: 'Estágio' }, loc: 'Remote',
      bullets: {
        en: ['Mobile application development.', 'Creation of responsive promotional websites.'],
        pt: ['Desenvolvimento de aplicativos.', 'Criação de websites promocionais responsivos.'] },
      tags: ['React Native', 'Firebase', 'Kanban'] }
  ];

  var PROJECTS = [
    { name: 'BoniBot Discord', st: 'ok', link: null,
      desc: { en: 'Complete Discord bot with music system, custom commands and web dashboard. Self-hosted with 24/7 uptime and Spotify integration.',
              pt: 'Bot completo para Discord com sistema de música e comandos personalizados. Auto-hospedado com uptime 24/7 e integração com Spotify.' },
      tags: ['Node.js', 'Discord.js', 'Express', 'PostgreSQL', 'ffmpeg'] },
    { name: 'Landing Page (HMC)', st: 'ok', link: 'https://hmckickboxingbio.netlify.app',
      desc: { en: "Landing page in tribute to Hamilton Machado Dias' kickboxing career.",
              pt: 'Landing page em homenagem à carreira de Hamilton Machado Dias no kickboxing.' },
      tags: ['HTML', 'CSS', 'JavaScript'] },
    { name: 'Landing Page (FPV)', st: 'grow', link: 'https://freitasprovensi.netlify.app/',
      desc: { en: 'Landing page for Freitas Provensi Law Firm, with information about services, team and contact.',
              pt: 'Landing page para a equipe de Freitas Provensi Advocacia, com informações sobre serviços, equipe e contato.' },
      tags: ['HTML', 'CSS', 'JavaScript'] },
    { name: 'ATIC', st: 'frozen', link: null,
      desc: { en: 'Application that connects services and truck drivers, facilitating communication and cargo management, handling all involved logistics, including routes, deadlines and payments.',
              pt: 'Aplicativo que conecta serviços e caminhoneiros, facilitando a comunicação e o gerenciamento de cargas, cuidando de toda a logística envolvida, incluindo rotas, prazos e pagamentos.' },
      tags: ['React', 'React Native', 'NestJS', 'PostgreSQL'] }
  ];
  var STATUS = {
    ok:   { en: 'active', pt: 'ativo' },
    grow: { en: 'expanding', pt: 'em expansão' },
    frozen: { en: 'frozen', pt: 'congelado' }
  };

  var lang = 'en';
  try { var s = localStorage.getItem('lang'); if (s === 'pt' || s === 'en') lang = s; } catch (e) {}

  function fmt(ym) { return MONTHS[lang][ym[1] - 1] + (lang === 'pt' ? '/' : ' ') + ym[0]; }
  function dur(job) {
    var m = idx(job.end) - idx(job.start) + 1, y = Math.floor(m / 12), r = m % 12, out = [];
    if (lang === 'pt') {
      if (y) out.push(y + (y > 1 ? ' anos' : ' ano'));
      if (r) out.push(r + (r > 1 ? ' meses' : ' mês'));
      return out.join(' e ');
    }
    if (y) out.push(y + (y > 1 ? ' yrs' : ' yr'));
    if (r) out.push(r + (r > 1 ? ' mos' : ' mo'));
    return out.join(' ');
  }
  function esc(t) { return String(t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  function renderProjects() {
    document.getElementById('projects-list').innerHTML = PROJECTS.map(function (p) {
      var chips = p.tags.map(function (t) { return '<span class="chip">' + esc(t) + '</span>'; }).join('');
      var act;
      if (p.link) act = '<a class="act" href="' + esc(p.link) + '" target="_blank" rel="noopener noreferrer">' + (lang === 'pt' ? 'ver projeto ↗' : 'view project ↗') + '</a>';
      else act = '<span class="act priv">' + (lang === 'pt' ? '🔒 privado' : '🔒 private') + '</span>';
      var note = p.st === 'frozen' ? '<div class="note">' + (lang === 'pt' ? '// congelado para priorizar outros projetos' : '// frozen to prioritize other projects') + '</div>' : '';
      return '<article class="proj' + (p.st === 'frozen' ? ' frozen' : '') + '"><div>' +
        '<h3><span class="nm">' + esc(p.name) + '</span><span class="badge ' + p.st + '">[ ' + STATUS[p.st][lang] + ' ]</span></h3>' +
        '<p>' + esc(p.desc[lang]) + '</p><div class="chips">' + chips + '</div>' + note + '</div>' + act + '</article>';
    }).join('');
  }

  function renderCareer() {
    var ticks = '';
    for (var i = 0; i < AXIS_YEARS; i++) ticks += '<span style="left:' + (i / AXIS_YEARS * 100) + '%">' + (AXIS_START + i) + '</span>';
    var rows = JOBS.map(function (j) {
      var l = idx(j.start) / AXIS_MONTHS * 100, w = (idx(j.end) - idx(j.start) + 1) / AXIS_MONTHS * 100;
      return '<div class="g-row' + (j.end ? '' : ' cur') + '"><div class="n">' + esc(j.co) + '</div><div class="g-track"><div class="g-bar" style="left:' + l + '%;width:' + w + '%"></div></div></div>';
    }).join('');
    document.getElementById('gantt').innerHTML = '<div class="g-axis"><div>timeline</div><div class="g-ticks">' + ticks + '</div></div>' + rows;

    document.getElementById('log').innerHTML = JOBS.map(function (j) {
      var cur = !j.end;
      var when = '<b>' + fmt(j.start) + ' → ' + (cur ? '<span class="now">' + (lang === 'pt' ? 'presente' : 'present') + '</span>' : fmt(j.end)) + '</b>' + dur(j);
      var bl = j.bullets[lang].map(function (b) { return '<li>' + esc(b) + '</li>'; }).join('');
      var tg = j.tags.map(function (t) { return '<span class="chip">' + esc(t) + '</span>'; }).join('');
      return '<li class="job' + (cur ? ' cur' : '') + '"><div class="when">' + when + '</div><div class="body">' +
        '<h3>' + esc(j.role[lang]) + ' <span class="at">@ ' + esc(j.co) + '</span></h3>' +
        '<div class="meta">' + esc(j.type[lang]) + ' · ' + esc(j.loc) + '</div>' +
        (bl ? '<ul>' + bl + '</ul>' : '') + (tg ? '<div class="chips">' + tg + '</div>' : '') + '</div></li>';
    }).join('');
  }

  function applyLang() {
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
    document.querySelectorAll('[data-en]').forEach(function (el) {
      var v = el.getAttribute('data-' + lang);
      if (v != null) el.innerHTML = v;
    });
    document.getElementById('b-en').setAttribute('aria-pressed', String(lang === 'en'));
    document.getElementById('b-pt').setAttribute('aria-pressed', String(lang === 'pt'));
    renderProjects();
    renderCareer();
  }
  function setLang(l) { lang = l; try { localStorage.setItem('lang', l); } catch (e) {} applyLang(); }
  document.getElementById('b-en').addEventListener('click', function () { setLang('en'); });
  document.getElementById('b-pt').addEventListener('click', function () { setLang('pt'); });
  applyLang();

  // copy buttons
  document.querySelectorAll('.copy').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var text = btn.getAttribute('data-copy'), row = btn.parentNode.querySelector('.v');
      var done = function () { btn.textContent = lang === 'pt' ? 'copiado' : 'copied'; setTimeout(function () { btn.textContent = btn.getAttribute('data-' + lang); }, 1400); };
      var fallback = function () {
        var r = document.createRange(); r.selectNodeContents(row);
        var sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(r);
      };
      try { navigator.clipboard.writeText(text).then(done, fallback); } catch (e) { fallback(); }
    });
  });

  // scrollspy
  var links = {};
  document.querySelectorAll('.tree a').forEach(function (a) { links[a.getAttribute('data-s')] = a; });
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) {
          Object.keys(links).forEach(function (k) { links[k].classList.toggle('on', k === e.target.id); });
        }
      });
    }, { rootMargin: '-20% 0px -65% 0px' });
    Object.keys(links).forEach(function (k) { var el = document.getElementById(k); if (el) io.observe(el); });
  }

  // matrix rain (decorative, off for reduced motion)
  var cv = document.getElementById('rain');
  if (cv && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var cx = cv.getContext('2d'), cols, drops, FS = 16, GL = '01アイウエオカキクケコサシスセソ{}<>/;$#';
    function size() {
      cv.width = window.innerWidth; cv.height = window.innerHeight;
      cols = Math.ceil(cv.width / FS);
      drops = []; for (var i = 0; i < cols; i++) drops.push(Math.random() * cv.height / FS);
    }
    size(); window.addEventListener('resize', size);
    var last = 0;
    (function frame(t) {
      if (t - last > 60) {
        last = t;
        cx.fillStyle = 'rgba(7,11,9,.12)'; cx.fillRect(0, 0, cv.width, cv.height);
        cx.fillStyle = '#35f28c'; cx.font = FS + 'px monospace';
        for (var i = 0; i < cols; i++) {
          cx.fillText(GL.charAt(Math.floor(Math.random() * GL.length)), i * FS, drops[i] * FS);
          if (drops[i] * FS > cv.height && Math.random() > .975) drops[i] = 0;
          drops[i]++;
        }
      }
      requestAnimationFrame(frame);
    })(0);
  }
})();

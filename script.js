/* ============================================================
   SCRIPT.JS — Egemen Bozca Portfolio
   ============================================================ */

const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
);

document.querySelectorAll('.about-image-col, .about-text-col, .skill-category, .achievement-card, .project-card, .timeline-item, .contact-card, .contact-form-wrapper, .section-header').forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = `${(i % 10) * 0.08}s`;
  revealObserver.observe(el);
});

const sections = document.querySelectorAll('section[id]');
const navLinksAll = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinksAll.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === `#${id}`) {
            link.style.color = 'var(--clr-accent)';
          }
        });
      }
    });
  },
  { threshold: 0.4 }
);
sections.forEach(section => sectionObserver.observe(section));

function animateCounter(el, target, duration = 1500) {
  const start = performance.now();
  const update = (timestamp) => {
    const elapsed = timestamp - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(eased * target);
    el.textContent = current + (el.dataset.suffix || '');
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelectorAll('.stat-number').forEach((el) => {
          const target = parseInt(el.getAttribute('data-target'));
          if (target) {
            el.dataset.suffix = '+';
            animateCounter(el, target);
          }
        });
        statsObserver.disconnect();
      }
    });
  },
  { threshold: 0.5 }
);
const heroSection = document.getElementById('hero');
if (heroSection) statsObserver.observe(heroSection);

window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  requestAnimationFrame(() => {
    document.body.style.transition = 'opacity 0.4s ease';
    document.body.style.opacity = '1';
  });
});

const translations = {
  tr: {
    nav_about: "Hakkımda",
    nav_skills: "Beceriler",
    nav_achievements: "Başarılar",
    nav_projects: "Projeler",
    nav_experience: "Deneyim",
    nav_contact: "İletişim",
    hero_badge: "Açık Pozisyonlara Başvuruyorum",
    hero_title: "Merhaba, ben<br /><span class=\"accent-text\">Egemen Bozca</span>",
    hero_subtitle: "Kullanıcı deneyimini (UX) ön planda tutarak React Native ile Google Play'de yayınlanmış modern mobil uygulamalar geliştiriyorum. Yenilikçi ve ölçeklenebilir dijital ürünler <strong>ana odak noktam.</strong>",
    hero_btn_projects: "Projelerimi Gör",
    hero_btn_contact: "İletişime Geç",
    stat_published: "Yayınlanmış Uygulama",
    stat_completed: "Tamamlanan Proje",
    stat_award: "TÜBİTAK Ödülü",
    section_about: "hakkımda",
    about_title: "Kim Olduğumu Anlayın",
    about_intro: "Geliştirme serüvenim boyunca <strong>React Native</strong> ile uçtan uca modern projeler geliştiriyor ve yayınlıyorum. Mobil dünyada performanslı, kullanıcı dostu ve estetik uygulamalar geliştirmek benim temel uzmanlık alanım.",
    about_body: "Geçmişte otonom drone yazılımları ile <strong>Dünya Birinciliği</strong> ve TÜBİTAK gibi yarışmalarda önemli mühendislik dereceleri elde etmiş olsam da, kariyerimde tasarım ve kodu harmanlayan mobil (Frontend) geliştirme dünyasına odaklanıyorum.",
    info_uni: "Üniversite",
    info_uni_val: "Sakarya Üniversitesi",
    info_loc: "Konum",
    info_loc_val: "Türkiye",
    info_lang: "Diller",
    info_lang_val: "TR • EN • ES",
    info_pilot: "İHA Pilotu",
    info_pilot_val: "İHA0 & İHA1 Lisanslı",
    section_skills: "beceriler",
    skills_title: "Kullandığım Teknolojiler",
    skills_desc: "Kullandığım teknolojiler ve araçlar",
    cat_mobile: "Mobil Geliştirme",
    cat_ai: "Yapay Zeka & ML",
    cat_other: "Diğer Araçlar",
    section_achievements: "başarılar",
    achievements_title: "Ödüller & Dereceler",
    achievements_desc: "Ulusal ve uluslararası yarışmalardaki başarılarım",
    badge_world: "Dünya Birincisi",
    badge_tr2: "Türkiye 2.'si",
    badge_tr3: "Türkiye 3.'sü",
    badge_finalist: "Türkiye Finalisti",
    ach_1_title: "RoboChallenge AirRace",
    ach_1_desc: "Romanya, 2022 — İki direk arasındaki kesikli çizgileri otonom bir şekilde takip eden drone yazılımı projemizle dünya birincisi oldum.",
    ach_2_title: "Teknofest İHA Yarışması",
    ach_2_desc: "Liselerarası İnsansız Hava Araçları yarışmasında Türkiye ikinciliği kazandım.",
    ach_3_title: "TÜBİTAK — Araç Çocuk Kilidi",
    ach_3_desc: "Arabalarda çocuk kilitleri kontrolü projesiyle TÜBİTAK'ta Türkiye üçüncülüğü kazandım.",
    section_projects: "projeler",
    projects_title: "Öne Çıkan Projeler",
    projects_desc: "Google Play'de yayınlanmış uygulamalar ve devam eden çalışmalar",
    projects_see_all: "Tüm Projeleri Gör",
    projects_see_less: "Daha Az Göster",
    status_live: "Yayında",
    status_award: "Dünya 1.'si",
    status_progress: "Devam Ediyor",
    status_completed: "Tamamlandı",
    p1_title: "Akıllı Danışman",
    p1_desc: "Üniversite öğrencileri ve akademik personel için geliştirilmiş yapay zekâ destekli bir danışman sistemi. Kullanıcının sorusuna göre üniversite veritabanını sorgulayabilir, yüklenen belgeleri analiz edebilir ya da internette arama yapabilir. Gradio tabanlı web arayüzü ve mobil uyumlu tasarımıyla her cihazdan erişilebilir. Bilmediği sorularda cevap uydurmak yerine bunu açıkça belirtmesi, sistemi güvenilir kılan temel özelliğidir.",
    p1_status: "Devam Ediyor",
    p1_footer: "Bitirme Projesi",
    p2_title: "WhatToDo",
    p2_desc: "Günlük kaosu düzene sokan WhatToDo, kullanıcıların görevlerini önceliklerine göre düzenleyip ilerleyen günleri önceden planlamasına olanak tanır. Firebase ve Google Sign-In entegrasyonu sayesinde veriler güvenle bulutta saklanır; her cihazda kesintisiz erişim sağlanır.",
    p2_status: "Tamamlandı",
    p2_footer: "Google Play",
    p3_title: "Game Hub",
    p3_desc: "XOX, Dama ve Satranç'ı tek çatı altında toplayan Game Hub, internet bağlantısına ihtiyaç duymadan oynanabilir. Yapay zekâya meydan okumak ya da aynı telefondan arkadaşla oynamak gibi iki farklı mod sunarak her seviyeden oyuncuya hitap eder.",
    p3_status: "Tamamlandı",
    p3_footer: "Google Play",
    p4_title: "Periyodik Tablo",
    p4_desc: "Kimya öğrenimini görselleştiren bu uygulama, kullanıcıların elementlere tıklayarak fotoğraf, 3D/2D Bohr modeli ve spektral çizgi gibi zengin içeriklere anında ulaşmasını sağlar. Kuru bilgiyi etkileşimli bir keşfe dönüştürmek için tasarlanmıştır.",
    p4_status: "Tamamlandı",
    p4_footer: "Google Play",
    p5_title: "Looked: Stil Asistanı",
    p5_desc: "Looked, yapay zekâyı kişisel bir stil danışmanına dönüştürür. Kullanıcılar fotoğraf yükleyerek anında kombin yorumu alabilir, gardıroplarını sisteme ekleyerek yapay zekânın ya da kendilerinin oluşturduğu kombinleri keşfedebilir. Firebase ve Google Sign-In ile tüm veriler güvenle korunur.",
    p5_status: "Tamamlandı",
    p5_footer: "Google Play",
    p6_title: "TÜBİTAK - Deniz Kirliliği Tespiti",
    p6_desc: "Deniz ekosistemlerinin korunması için yapay zekâ destekli su altı-su üstü entegre cihaz geliştirmeyi amaçlayan projede; özel sensörler ve kameralar kullanılarak deniz suyundaki kirleticiler tespit edilmektedir.",
    p6_status: "Tamamlandı",
    p6_footer: "TÜBİTAK",
    p7_title: "TÜBİTAK - DepMap",
    p7_desc: "Görsel verileri analiz ederek şehri deprem öncesi ve sonrası karşılaştıran, kapanan yolları tespit eden ve acil ekipler için en kısa rotayı belirleyen bir sistem. Binalardaki tahmini insan sayısı arama-kurtarma ekiplerine iletilmektedir.",
    p7_status: "Tamamlandı",
    p7_footer: "TÜBİTAK",
    p8_title: "Teknofest Ulaşım YZ",
    p8_desc: "Ucan bir araçtan toplanan görsel verilerle makine öğrenimi kullanılarak yerdeki insanlar, araçlar ve iniş alanları tespit edilmektedir. GPS ariza senaryoları için görsel konum belirleme algoritmaları da geliştirilmiştir.",
    p8_status: "Tamamlandı",
    p8_footer: "Yarışma Projesi",
    p9_title: "RoboChallenge AirRace",
    p9_desc: "YOLO V8 kullanılarak dronun iki direk arasına yerleştirilen çizgileri takip etmesini sağlayan otonom uçuş yazılımı geliştirilmiştir.",
    p9_status: "Dünya Birincisi",
    p9_footer: "RoboChallenge",
    p10_title: "TÜBİTAK - Akdoğan",
    p10_desc: "Denize yerleştirilen dron şarj istasyonlarına dalgaların kinetik enerjisini elektrik enerjisine dönüştürerek güç sağlayan sistem üzerine çalışmalar yürütülmüştür.",
    p10_status: "Türkiye Finalisti",
    p10_footer: "TÜBİTAK",
    p11_title: "Teknofest İHA",
    p11_desc: "Pisti en hızlı tamamlama ve yükü istenilen bölgeye bırakma görevleri için dron tasarlanmış, imal edilmiş ve otonom uçuş yazılımı geliştirilmiştir.",
    p11_status: "Türkiye 2.'si",
    p11_footer: "Teknofest",
    p12_title: "TÜBİTAK - YZ Hız Sınırlayıcı",
    p12_desc: "Görüntü işleme ve harita API'leri ile trafik levhalarından hız limiti ögrenen ve araçların ECU birimine müdahale ederek limit aşılmasını engelleyen sistem.",
    p12_status: "Tamamlandı",
    p12_footer: "TÜBİTAK",
    p13_title: "Akıllı Çocuk Kilidi",
    p13_desc: "TÜBİTAK kapsamında geliştirilen bu projede arka koltukta oturan çocuklar yüz tanıma ve ağırlık verileriyle tespit edilerek araç kilitleri otomatik kontrol altına alınmaktadır.",
    p13_status: "Türkiye 3.'sü",
    p13_footer: "TÜBİTAK",
    p14_title: "Serum Yönetim Sistemi",
    p14_desc: "Hastalara takılan serumun damla sayısı motorlarla kontrol edilmekte, serumun bitiş suresi hesaplanmakta ve hemşire odasına uyarı gönderilmektedir.",
    p14_status: "Türkiye 3.'sü",
    p14_footer: "Samsung Mucitleri",
    section_exp: "deneyim",
    exp_title: "Deneyim & Eğitim",
    exp_1_title: "Freelance Mobil Geliştirici",
    exp_1_comp: "Bağımsız",
    exp_1_date: "2025 — Devam Ediyor",
    exp_1_desc: "React Native ile uçtan uca mobil uygulamalar geliştiriyor, UI/UX ve Firebase süreçlerini yönetiyorum.",
    exp_3_title: "Bilgisayar Mühendisliği",
    exp_3_comp: "Sakarya Üniversitesi",
    exp_3_date: "2022 — Devam Ediyor",
    exp_3_desc: "Lisans eğitimime devam ederken hands-on yazılım projeleriyle mühendislik yeteneklerimi geliştiriyorum.",
    section_contact: "iletişim",
    contact_title: "İletişime Geçin",
    contact_desc: "Aklınızda bir proje mi var? Birlikte harika bir şeyler inşa edelim!",
    contact_email: "E-Posta",
    footer_copy: "© 2025 Egemen Bozca. Tüm hakları saklıdır.",
    form_title: "Mesaj Gönder",
    form_name: "Ad Soyad",
    form_email: "E-Posta Adresi",
    form_msg: "Mesajınız",
    form_btn: "Gönder",
    form_sending: "Gönderiliyor...",
    form_success: "Mesajınız başarıyla iletildi!"
  },
  en: {
    nav_about: "About",
    nav_skills: "Skills",
    nav_achievements: "Achievements",
    nav_projects: "Projects",
    nav_experience: "Experience",
    nav_contact: "Contact",
    hero_badge: "Open to Work",
    hero_title: "Hello, I'm<br /><span class=\"accent-text\">Egemen Bozca</span>",
    hero_subtitle: "I develop modern mobile applications published on Google Play with React Native, prioritizing user experience (UX). Innovative and scalable digital products form my <strong>main focus.</strong> 📱",
    hero_btn_projects: "View My Projects",
    hero_btn_contact: "Get in Touch",
    stat_published: "Published Apps",
    stat_completed: "Completed Projects",
    stat_award: "TÜBİTAK Award",
    section_about: "about me",
    about_title: "Understand Who I Am",
    about_intro: "Throughout my development journey, I have developed end-to-end modern projects with <strong>React Native</strong> and published them. Building performant, user-friendly, and aesthetic applications in the mobile world is my core expertise.",
    about_body: "Although I have previously achieved <strong>World 1st Place</strong> with autonomous drone software and secured significant engineering awards in competitions like TÜBİTAK, my career currently focuses on the mobile (Frontend) development world, blending design and code.",
    info_uni: "University",
    info_uni_val: "Sakarya University",
    info_loc: "Location",
    info_loc_val: "Turkey",
    info_lang: "Languages",
    info_lang_val: "EN • TR • ES",
    info_pilot: "UAV Pilot",
    info_pilot_val: "UAV0 & UAV1 Licensed",
    section_skills: "skills",
    skills_title: "My Tech Stack",
    skills_desc: "The technologies and tools I use",
    cat_mobile: "Mobile Development",
    cat_ai: "AI & ML",
    cat_other: "Other Tools",
    section_achievements: "achievements",
    achievements_title: "Awards & Degrees",
    achievements_desc: "My accomplishments in national and international competitions",
    badge_world: "1st in World",
    badge_tr2: "Turkey 2nd Place",
    badge_tr3: "Turkey 3rd Place",
    badge_finalist: "Turkey Finalist",
    ach_1_title: "RoboChallenge AirRace",
    ach_1_desc: "Romania, 2022 — Secured first place globally by developing autonomous drone software that follows dashed lines between two poles.",
    ach_2_title: "Teknofest UAV Competition",
    ach_2_desc: "Achieved 2nd place in Turkey in the Inter-High School Unmanned Aerial Vehicles competition.",
    ach_3_title: "TÜBİTAK — Smart Child Lock",
    ach_3_desc: "Awarded 3rd place in Turkey at TÜBİTAK with the automotive child locks control project.",
    section_projects: "projects",
    projects_title: "Featured Projects",
    projects_desc: "Applications published on Google Play and ongoing works",
    projects_see_all: "See All Projects",
    projects_see_less: "Show Less",
    status_live: "Live",
    status_award: "1st in World",
    status_progress: "In Progress",
    status_completed: "Completed",
    p1_title: "Smart Academic Advisor",
    p1_desc: "An AI-powered advisor system developed for university students and academic staff. It can query the university database based on user questions, analyze uploaded documents, or search the internet. Accessible from any device with a Gradio-based, mobile-friendly web interface. Its core feature is honestly stating when it doesn't know the answer, rather than hallucinating, making it highly reliable.",
    p1_status: "In Progress",
    p1_footer: "Graduation Project",
    p2_title: "WhatToDo App",
    p2_desc: "Bringing order to daily chaos, WhatToDo allows users to sort tasks by priority and plan ahead. Thanks to Firebase and Google Sign-In integration, data is safely stored in the cloud, ensuring seamless access across all devices.",
    p2_status: "Completed",
    p2_footer: "Google Play",
    p3_title: "Game Hub",
    p3_desc: "Gathering Tic-Tac-Toe, Checkers, and Chess under one roof, Game Hub can be played offline. It caters to players of all levels by offering two different modes: challenging the AI or playing with a friend on the same phone.",
    p3_status: "Completed",
    p3_footer: "Google Play",
    p4_title: "Periodic Table",
    p4_desc: "Visualizing chemistry learning, this app provides instant access to rich content like photos, 3D/2D Bohr models, and spectral arrays. Designed to turn dry information into an interactive discovery.",
    p4_status: "Completed",
    p4_footer: "Google Play",
    p5_title: "Looked: Style Assistant",
    p5_desc: "Looked transforms AI into a personal style consultant. Users can upload photos to receive instant outfit feedback, add their wardrobe to the system, and explore outfits created by the AI or themselves. All data is securely protected.",
    p5_status: "Completed",
    p5_footer: "Google Play",
    p6_title: "TÜBİTAK - Pollution Detection",
    p6_desc: "Aimed at protecting marine ecosystems by developing an AI-supported underwater/surface integrated device; specific sensors and cameras are used to detect pollutants in seawater.",
    p6_status: "Completed",
    p6_footer: "TÜBİTAK",
    p7_title: "TÜBİTAK - DepMap",
    p7_desc: "A system analyzing visual data to compare pre and post-earthquake city states, discovering blocked roads, and defining the shortest routes for emergency teams. Estimated occupant counts in buildings are relayed to search and rescue.",
    p7_status: "Completed",
    p7_footer: "TÜBİTAK",
    p8_title: "Teknofest Transport AI",
    p8_desc: "Using machine learning on aerial visual data collected by a UAV to detect humans, vehicles, and landing zones. Visual positioning algorithms were also developed for GPS failure scenarios.",
    p8_status: "Completed",
    p8_footer: "Competition Project",
    p9_title: "RoboChallenge AirRace",
    p9_desc: "Developed an autonomous flight software using YOLO v8 that enables a drone to track lines placed between two poles.",
    p9_status: "1st in World",
    p9_footer: "RoboChallenge",
    p10_title: "TÜBİTAK - Akdoğan",
    p10_desc: "Worked on an autonomous drone charging station system deployed at sea that converts the kinetic energy of ocean waves into electrical power.",
    p10_status: "National Finalist",
    p10_footer: "TÜBİTAK",
    p11_title: "Teknofest UAV",
    p11_desc: "Designed and manufactured a drone and developed its autonomous flight software for rapid track completion and payload delivery tasks.",
    p11_status: "Turkey 2nd",
    p11_footer: "Teknofest",
    p12_title: "TÜBİTAK - AI Speed Limiter",
    p12_desc: "A system using computer vision and map APIs to learn the speed limit from traffic signs and intervene in the vehicle's ECU to prevent exceeding it.",
    p12_status: "Completed",
    p12_footer: "TÜBİTAK",
    p13_title: "Smart Child Lock",
    p13_desc: "Developed under TÜBİTAK, this project uses facial recognition and weight sensors to detect children sitting in the backseat and automatically engages the car's child locks.",
    p13_status: "Turkey 3rd",
    p13_footer: "TÜBİTAK",
    p14_title: "IV Fluid Management",
    p14_desc: "Medical hardware project where the number of IV fluid drops administered to patients is controlled by motors, computing the finish time and alerting the nurse's station.",
    p14_status: "Turkey 3rd",
    p14_footer: "Samsung Inventors",
    section_exp: "experience",
    exp_title: "Experience & Education",
    exp_1_title: "Freelance Mobile Developer",
    exp_1_comp: "Self-Employed",
    exp_1_date: "2025 — Present",
    exp_1_desc: "Developed end-to-end mobile apps with React Native, managing UI/UX and Firebase backend workflows.",
    exp_3_title: "Computer Engineering",
    exp_3_comp: "Sakarya University",
    exp_3_date: "2022 — Ongoing",
    exp_3_desc: "B.Sc. Degree ongoing. Improving engineering skills through academic and hands-on software projects.",
    section_contact: "contact",
    contact_title: "Get In Touch",
    contact_desc: "Have a project in mind? Let's build something great together!",
    contact_email: "Email",
    footer_copy: "© 2025 Egemen Bozca. All rights reserved.",
    form_title: "Send a Message",
    form_name: "Full Name",
    form_email: "Email Address",
    form_msg: "Your Message",
    form_btn: "Submit",
    form_sending: "Sending...",
    form_success: "Your message has been successfully received!"
  }
};

function changeLanguage(lang) {
  localStorage.setItem('lang', lang);
  
  document.querySelectorAll('.lang-opt').forEach(opt => {
    opt.classList.toggle('active', opt.dataset.lang === lang);
  });
  
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang][key]) {
      el.innerHTML = translations[lang][key];
    }
  });

  // Update button text after language switch since it dynamically alters DOM
  const submitBtn = document.getElementById('submit-btn');
  if (submitBtn && !submitBtn.disabled) {
    submitBtn.querySelector('.submit-text').innerHTML = translations[lang]['form_btn'];
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const defaultLang = localStorage.getItem('lang') || 'tr';
  changeLanguage(defaultLang);
  
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const currentTheme = savedTheme ? savedTheme : (prefersDark ? 'dark' : 'light');
  if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    updateThemeIcon('dark');
  }
});

const themeBtn = document.getElementById('theme-btn');
if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    let currentTheme = document.documentElement.getAttribute('data-theme');
    let targetTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', targetTheme);
    localStorage.setItem('theme', targetTheme);
    updateThemeIcon(targetTheme);
  });
}

function updateThemeIcon(theme) {
  const themeIcon = document.getElementById('theme-icon');
  if (!themeIcon) return;
  if (theme === 'dark') {
    // Sun icon for dark mode (click to switch to light)
    themeIcon.innerHTML = '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>';
  } else {
    // Moon icon for light mode (click to switch to dark)
    themeIcon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';
  }
}

document.querySelectorAll('.lang-opt').forEach(opt => {
  opt.addEventListener('click', (e) => {
    const chosenLang = e.target.dataset.lang;
    changeLanguage(chosenLang);
  });
});

const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const submitBtn = document.getElementById('submit-btn');
    const submitText = submitBtn.querySelector('.submit-text');
    const msgDiv = document.getElementById('form-msg');
    const currentLang = localStorage.getItem('lang') || 'tr';
    
    const originalText = translations[currentLang]['form_btn'];
    const sendingText = translations[currentLang]['form_sending'];
    const successText = translations[currentLang]['form_success'];
    
    submitBtn.style.opacity = '0.7';
    submitBtn.disabled = true;
    submitText.innerHTML = sendingText;
    msgDiv.style.opacity = '0';
    
    const templateParams = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      message: document.getElementById('message').value
    };

    emailjs.send('service_2qwunoe', 'template_60sla98', templateParams)
    .then(function(response) {
      submitBtn.style.opacity = '1';
      submitBtn.style.background = '#22c55e'; // success green
      submitText.innerHTML = "✓";
      msgDiv.innerHTML = successText;
      msgDiv.style.color = "#16a34a";
      msgDiv.style.opacity = '1';
      contactForm.reset();
      
      setTimeout(() => {
        submitBtn.style.background = '';
        submitBtn.style.opacity = '1';
        submitBtn.disabled = false;
        submitText.innerHTML = originalText;
        msgDiv.style.opacity = '0';
      }, 5000);
    }, function(error) {
      console.error('EmailJS Error:', error);
      submitBtn.disabled = false;
      submitBtn.style.opacity = '1';
      submitText.innerHTML = originalText;
      alert("Bir hata oluştu, lütfen daha sonra tekrar deneyin.");
    });
  });
}

function copyEmailToClipboard() {
  const email = document.getElementById('email-address').innerText;
  const status = document.getElementById('copy-status');
  const currentLang = localStorage.getItem('lang') || 'tr';
  
  navigator.clipboard.writeText(email).then(() => {
    const originalText = "→";
    const copiedText = currentLang === 'tr' ? "Kopyalandı!" : "Copied!";
    
    status.innerText = copiedText;
    status.style.color = "#22c55e";
    
    setTimeout(() => {
      status.innerText = originalText;
      status.style.color = "";
    }, 2000);
  }).catch(err => {
    console.error('Could not copy text: ', err);
    // Fallback: trigger mailto if clipboard fails
    window.location.href = `mailto:${email}`;
  });
}

// Toggle Hidden Projects
const toggleProjBtn = document.getElementById('toggle-projects-btn');
const hiddenProjects = document.getElementById('hidden-projects');

if (toggleProjBtn && hiddenProjects) {
  toggleProjBtn.addEventListener('click', () => {
    if (hiddenProjects.style.display === 'none') {
      hiddenProjects.style.display = 'grid';
      const span = toggleProjBtn.querySelector('span');
      if(span) span.setAttribute('data-i18n', 'projects_see_less');
    } else {
      hiddenProjects.style.display = 'none';
      const span = toggleProjBtn.querySelector('span');
      if(span) span.setAttribute('data-i18n', 'projects_see_all');
    }
    // Update button text language
    changeLanguage(localStorage.getItem('lang') || 'tr');
  });
}

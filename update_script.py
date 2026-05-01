import re
import json

html_file = 'index.html'
js_file = 'script.js'

projects = [
    { # 1
        "tr_title": "Akıllı Danışman",
        "en_title": "Smart Academic Advisor",
        "tr_desc": "Üniversite öğrencileri ve akademik personel için geliştirilmiş yapay zekâ destekli bir danışman sistemi. Kullanıcının sorusuna göre üniversite veritabanını sorgulayabilir, yüklenen belgeleri analiz edebilir ya da internette arama yapabilir. Gradio tabanlı web arayüzü ve mobil uyumlu tasarımıyla her cihazdan erişilebilir. Bilmediği sorularda cevap uydurmak yerine bunu açıkça belirtmesi, sistemi güvenilir kılan temel özelliğidir.",
        "en_desc": "An AI-powered advisor system developed for university students and academic staff. It can query the university database based on user questions, analyze uploaded documents, or search the internet. Accessible from any device with a Gradio-based, mobile-friendly web interface. Its core feature is honestly stating when it doesn't know the answer, rather than hallucinating, making it highly reliable.",
        "tr_status": "Devam Ediyor",
        "en_status": "In Progress",
        "tags": ["Python", "RAG & LLM", "Gradio"],
        "footer_tr": "🎓 Bitirme Projesi",
        "footer_en": "🎓 Graduation Project"
    },
    { # 2
        "tr_title": "WhatToDo",
        "en_title": "WhatToDo App",
        "tr_desc": "Günlük kaosu düzene sokan WhatToDo, kullanıcıların görevlerini önceliklerine göre düzenleyip ilerleyen günleri önceden planlamasına olanak tanır. Firebase ve Google Sign-In entegrasyonu sayesinde veriler güvenle bulutta saklanır; her cihazda kesintisiz erişim sağlanır.",
        "en_desc": "Bringing order to daily chaos, WhatToDo allows users to sort tasks by priority and plan ahead. Thanks to Firebase and Google Sign-In integration, data is safely stored in the cloud, ensuring seamless access across all devices.",
        "tr_status": "Tamamlandı",
        "en_status": "Completed",
        "tags": ["React Native", "Firebase"],
        "footer_tr": "📱 Google Play",
        "footer_en": "📱 Google Play"
    },
    { # 3
        "tr_title": "Game Hub",
        "en_title": "Game Hub",
        "tr_desc": "XOX, Dama ve Satranç'ı tek çatı altında toplayan Game Hub, internet bağlantısına ihtiyaç duymadan oynanabilir. Yapay zekâya meydan okumak ya da aynı telefondan arkadaşla oynamak gibi iki farklı mod sunarak her seviyeden oyuncuya hitap eder.",
        "en_desc": "Gathering Tic-Tac-Toe, Checkers, and Chess under one roof, Game Hub can be played offline. It caters to players of all levels by offering two different modes: challenging the AI or playing with a friend on the same phone.",
        "tr_status": "Tamamlandı",
        "en_status": "Completed",
        "tags": ["React Native", "AI"],
        "footer_tr": "📱 Google Play",
        "footer_en": "📱 Google Play"
    },
    { # 4
        "tr_title": "Periyodik Tablo",
        "en_title": "Periodic Table",
        "tr_desc": "Kimya öğrenimini görselleştiren bu uygulama, kullanıcıların elementlere tıklayarak fotoğraf, 3D/2D Bohr modeli ve spektral çizgi gibi zengin içeriklere anında ulaşmasını sağlar. Kuru bilgiyi etkileşimli bir keşfe dönüştürmek için tasarlanmıştır.",
        "en_desc": "Visualizing chemistry learning, this app provides instant access to rich content like photos, 3D/2D Bohr models, and spectral arrays. Designed to turn dry information into an interactive discovery.",
        "tr_status": "Tamamlandı",
        "en_status": "Completed",
        "tags": ["React Native", "3D/2D Viewer"],
        "footer_tr": "📱 Google Play",
        "footer_en": "📱 Google Play"
    },
    { # 5
        "tr_title": "Looked: Stil Asistanı",
        "en_title": "Looked: Style Assistant",
        "tr_desc": "Looked, yapay zekâyı kişisel bir stil danışmanına dönüştürür. Kullanıcılar fotoğraf yükleyerek anında kombin yorumu alabilir, gardıroplarını sisteme ekleyerek yapay zekânın ya da kendilerinin oluşturduğu kombinleri keşfedebilir. Firebase ve Google Sign-In ile tüm veriler güvenle korunur.",
        "en_desc": "Looked transforms AI into a personal style consultant. Users can upload photos to receive instant outfit feedback, add their wardrobe to the system, and explore outfits created by the AI or themselves. All data is securely protected.",
        "tr_status": "Tamamlandı",
        "en_status": "Completed",
        "tags": ["React Native", "AI Styles"],
        "footer_tr": "📱 Google Play",
        "footer_en": "📱 Google Play"
    },
    { # 6
        "tr_title": "Deniz Kirliliği Tespiti",
        "en_title": "Pollution Detection",
        "tr_desc": "Deniz ekosistemlerinin korunması için yapay zekâ destekli su altı-su üstü entegre cihaz geliştirmeyi amaçlayan projede; özel sensörler ve kameralar kullanılarak deniz suyundaki kirleticiler tespit edilmektedir.",
        "en_desc": "Aimed at protecting marine ecosystems by developing an AI-supported underwater/surface integrated device; specific sensors and cameras are used to detect pollutants in seawater.",
        "tr_status": "Tamamlandı",
        "en_status": "Completed",
        "tags": ["AI/ML", "Hardware"],
        "footer_tr": "🏆 Proje Arşivi",
        "footer_en": "🏆 Project Archive"
    },
    { # 7
        "tr_title": "DepMap",
        "en_title": "DepMap",
        "tr_desc": "Görsel verileri analiz ederek şehri deprem öncesi ve sonrası karşılaştıran, kapanan yolları tespit eden ve acil ekipler için en kısa rotayı belirleyen bir sistem. Binalardaki tahmini insan sayısı arama-kurtarma ekiplerine iletilmektedir.",
        "en_desc": "A system analyzing visual data to compare pre and post-earthquake city states, discovering blocked roads, and defining the shortest routes for emergency teams. Estimated occupant counts in buildings are relayed to search and rescue.",
        "tr_status": "Tamamlandı",
        "en_status": "Completed",
        "tags": ["Computer Vision", "AI/ML"],
        "footer_tr": "🏆 Proje Arşivi",
        "footer_en": "🏆 Project Archive"
    },
    { # 8
        "tr_title": "Teknofest Ulaşım YZ",
        "en_title": "Teknofest Transport AI",
        "tr_desc": "Ucan bir araçtan toplanan görsel verilerle makine öğrenimi kullanılarak yerdeki insanlar, araçlar ve iniş alanları tespit edilmektedir. GPS ariza senaryoları için görsel konum belirleme algoritmaları da geliştirilmiştir.",
        "en_desc": "Using machine learning on aerial visual data collected by a UAV to detect humans, vehicles, and landing zones. Visual positioning algorithms were also developed for GPS failure scenarios.",
        "tr_status": "Tamamlandı",
        "en_status": "Completed",
        "tags": ["Machine Learning", "Vision"],
        "footer_tr": "🏆 Yarışma Projesi",
        "footer_en": "🏆 Competition Project"
    },
    { # 9
        "tr_title": "RoboChallenge AirRace",
        "en_title": "RoboChallenge AirRace",
        "tr_desc": "YOLO V8 kullanılarak dronun iki direk arasına yerleştirilen çizgileri takip etmesini sağlayan otonom uçuş yazılımı geliştirilmiştir.",
        "en_desc": "Developed an autonomous flight software using YOLO v8 that enables a drone to track lines placed between two poles.",
        "tr_status": "🏆 Dünya Birincisi",
        "en_status": "🏆 1st in World",
        "tags": ["YOLO v8", "Autonomous Flight"],
        "footer_tr": "🏆 RoboChallenge",
        "footer_en": "🏆 RoboChallenge"
    },
    { # 10
        "tr_title": "TÜBİTAK - Akdoğan",
        "en_title": "TÜBİTAK - Akdoğan",
        "tr_desc": "Denize yerleştirilen dron şarj istasyonlarına dalgaların kinetik enerjisini elektrik enerjisine dönüştürerek güç sağlayan sistem üzerine çalışmalar yürütülmüştür.",
        "en_desc": "Worked on an autonomous drone charging station system deployed at sea that converts the kinetic energy of ocean waves into electrical power.",
        "tr_status": "🏅 Türkiye Finalisti",
        "en_status": "🏅 National Finalist",
        "tags": ["Hardware", "Renewable Energy"],
        "footer_tr": "🏆 TÜBİTAK",
        "footer_en": "🏆 TÜBİTAK"
    },
    { # 11
        "tr_title": "Teknofest İHA",
        "en_title": "Teknofest UAV",
        "tr_desc": "Pisti en hızlı tamamlama ve yükü istenilen bölgeye bırakma görevleri için dron tasarlanmış, imal edilmiş ve otonom uçuş yazılımı geliştirilmiştir.",
        "en_desc": "Designed and manufactured a drone and developed its autonomous flight software for rapid track completion and payload delivery tasks.",
        "tr_status": "🥈 Türkiye 2.'si",
        "en_status": "🥈 Turkey 2nd",
        "tags": ["Hardware", "Autonomous Flight"],
        "footer_tr": "🏆 Teknofest",
        "footer_en": "🏆 Teknofest"
    },
    { # 12
        "tr_title": "YZ Hız Sınırlayıcı",
        "en_title": "AI Speed Limiter",
        "tr_desc": "Görüntü işleme ve harita API'leri ile trafik levhalarından hız limiti ögrenen ve araçların ECU birimine müdahale ederek limit aşılmasını engelleyen sistem.",
        "en_desc": "A system using computer vision and map APIs to learn the speed limit from traffic signs and intervene in the vehicle's ECU to prevent exceeding it.",
        "tr_status": "Tamamlandı",
        "en_status": "Completed",
        "tags": ["Computer Vision", "Map API"],
        "footer_tr": "🏆 Proje Arşivi",
        "footer_en": "🏆 Project Archive"
    },
    { # 13
        "tr_title": "Akıllı Çocuk Kilidi",
        "en_title": "Smart Child Lock",
        "tr_desc": "TÜBİTAK kapsamında geliştirilen bu projede arka koltukta oturan çocuklar yüz tanıma ve ağırlık verileriyle tespit edilerek araç kilitleri otomatik kontrol altına alınmaktadır.",
        "en_desc": "Developed under TÜBİTAK, this project uses facial recognition and weight sensors to detect children sitting in the backseat and automatically engages the car's child locks.",
        "tr_status": "🥉 Türkiye 3.'sü",
        "en_status": "🥉 Turkey 3rd",
        "tags": ["Computer Vision", "Sensors"],
        "footer_tr": "🏆 TÜBİTAK",
        "footer_en": "🏆 TÜBİTAK"
    },
    { # 14
        "tr_title": "Serum Yönetim Sistemi",
        "en_title": "IV Fluid Management",
        "tr_desc": "Hastalara takılan serumun damla sayısı motorlarla kontrol edilmekte, serumun bitiş suresi hesaplanmakta ve hemşire odasına uyarı gönderilmektedir.",
        "en_desc": "Medical hardware project where the number of IV fluid drops administered to patients is controlled by motors, computing the finish time and alerting the nurse's station.",
        "tr_status": "🥉 Türkiye 3.'sü",
        "en_status": "🥉 Turkey 3rd",
        "tags": ["Hardware", "IoT"],
        "footer_tr": "🏆 Samsung Mucitleri",
        "footer_en": "🏆 Samsung Inventors"
    }
]

# Generate HTML
top4_html = ""
hidden10_html = ""

for i, p in enumerate(projects):
    status_class = "project-status live" if "Devam Ediyor" in p['tr_status'] or "Tamamlandı" not in p['tr_status'] else "project-status"
    style_attr = ' style="background:var(--clr-surface2); color:var(--clr-accent); border-color:#bfdbfe;"' if "Tamamlandı" in p['tr_status'] else ''
    
    html_block = f"""
        <div class="project-card">
          <div class="project-header">
            <div class="{status_class}"{style_attr} data-i18n="p{i+1}_status">{p['tr_status']}</div>
          </div>
          <h3 class="project-title" data-i18n="p{i+1}_title">{p['tr_title']}</h3>
          <p class="project-desc" data-i18n="p{i+1}_desc">{p['tr_desc']}</p>
          <div class="project-tech">
            {''.join([f"<span>{t}</span>" for t in p['tags']])}
          </div>
          <div class="project-footer" data-i18n="p{i+1}_footer">{p['footer_tr']}</div>
        </div>
"""
    if i < 4:
        top4_html += html_block
    else:
        hidden10_html += html_block

with open(html_file, 'r', encoding='utf-8') as f:
    text = f.read()

# Replace projects grid
pattern = r'(<div class="projects-grid">)(.*?)(<div class="projects-more")'
replacement = f"""<div class="projects-grid">
{top4_html}
      </div>

      <!-- HIDDEN PROJECTS (Expands) -->
      <div id="hidden-projects" class="projects-grid" style="display: none; margin-top: 1.5rem;">
{hidden10_html}
      </div>

      <div class="projects-more\""""

text = re.sub(pattern, replacement, text, flags=re.DOTALL)

with open(html_file, 'w', encoding='utf-8') as f:
    f.write(text)

# Generate Translations
tr_texts = []
en_texts = []

for i, p in enumerate(projects):
    tr_texts.append(f'    p{i+1}_title: "{p["tr_title"]}",\n    p{i+1}_desc: "{p["tr_desc"]}",\n    p{i+1}_status: "{p["tr_status"]}",\n    p{i+1}_footer: "{p["footer_tr"]}",')
    en_texts.append(f'    p{i+1}_title: "{p["en_title"]}",\n    p{i+1}_desc: "{p["en_desc"]}",\n    p{i+1}_status: "{p["en_status"]}",\n    p{i+1}_footer: "{p["footer_en"]}",')

tr_block = "\n".join(tr_texts)
en_block = "\n".join(en_texts)

with open(js_file, 'r', encoding='utf-8') as f:
    js_text = f.read()

# Inject into script.js translation dictionary
js_text = re.sub(r'proj_1_desc:.*store_edu:.*?,', f'{tr_block}', js_text, flags=re.DOTALL)
js_text = re.sub(r'proj_1_desc:.*store_edu:.*?,', f'{en_block}', js_text, flags=re.DOTALL)

with open(js_file, 'w', encoding='utf-8') as f:
    f.write(js_text)

print("Update complete")

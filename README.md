# Egemen Bozca — Portfolyo

Kişisel portfolyo sitemin ([egebo.github.io](https://egebo.github.io)) kaynak kodu. Framework yok, build adımı yok — düz HTML/CSS/JS, GitHub Pages üzerinden Jekyll ile servis ediliyor.

## Öne çıkanlar

- **Çift dil (TR/EN):** `strings.js` üzerinden anahtar bazlı çeviri, dil tercihi `localStorage`'da saklanıyor
- **Canvas animasyonları:** hero'da simetrik bir stack grafiği, proje kartlarında her projeye özel imzalı animasyonlar (ses dalgası, tarayıcı çizgisi, teslimat rotası)
- **Temiz URL'ler:** vaka analizi sayfaları Jekyll front matter (`permalink`) ile `.html` uzantısız yayınlanıyor (`/looked/`, `/optura/` vb.)
- **Tek sayfalık vaka analizleri:** her öne çıkan proje kendi viewport'una sığacak şekilde tasarlandı

## Proje yapısı

```
index.html          Ana sayfa
style.css            Global stil (tasarım sistemi, CSS custom properties)
script.js            Canvas animasyonları, dil sistemi, etkileşimler
strings.js           Ana sayfa TR/EN çeviri sözlüğü
cs-lang.js           Vaka analizi sayfaları için ayrı TR/EN çeviri sözlüğü
projects/            Vaka analizi sayfaları (looked, optura, poco-loco, jarvis, rag)
assets/
  images/            Ekran görüntüleri, logolar
  cv-en.pdf, cv-tr.pdf
docs/superpowers/     Tasarım süreci: spec ve implementasyon planları
```

## Yerelde çalıştırma

Build adımı gerekmiyor, herhangi bir statik dosya sunucusu yeterli:

```bash
python -m http.server 8000
# veya
npx serve .
```

## Teknolojiler

HTML5, CSS (custom properties, grid/flex), vanilla JavaScript (Canvas 2D API, IntersectionObserver), EmailJS, Jekyll (GitHub Pages permalink desteği için).

## Lisans

MIT — bkz. [LICENSE](LICENSE).

## İletişim

- Site: [egebo.github.io](https://egebo.github.io)
- GitHub: [@Egebo](https://github.com/Egebo)
- E-posta: bozcaegemen@gmail.com

import { LandingPageData } from '../types';
import { defaultHeroImage } from '../defaultHeroImage';

/**
 * Returns inline SVG path data for a given icon name to keep the exported HTML single-file and fast.
 */
function getIconSvg(iconName: string): string {
  switch (iconName.toLowerCase()) {
    case 'phone':
    case 'wa':
    case 'whatsapp':
      return `<path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 004.79 1.22c5.46 0 9.9-4.45 9.9-9.91C21.95 6.45 17.5 2 12.04 2zm5.8 14.13c-.24.68-1.42 1.31-1.95 1.36-.5.05-1.13.07-1.82-.11-.42-.13-.96-.31-1.65-.61-2.9-1.25-4.79-4.17-4.94-4.36-.14-.19-1.18-1.57-1.18-2.99 0-1.42.75-2.12 1.01-2.41.27-.29.58-.36.78-.36.19 0 .39 0 .56.01.18.01.42-.07.66.5.24.58.82 2 .89 2.15.07.14.12.31.02.5-.09.19-.14.31-.27.48-.14.16-.29.37-.41.49-.14.14-.28.28-.12.55.16.27.71 1.17 1.53 1.9 1.05.93 1.94 1.22 2.21 1.36.27.14.43.12.59-.07.16-.19.68-.79.86-1.06.18-.27.36-.22.61-.13.24.09 1.55.73 1.82.86.27.14.44.2.51.31.07.12.07.66-.17 1.34z"/>`;
    case 'building':
    case 'building2':
      return `<path d="M3 21V9l9-6 9 6v12M9 21v-6h6v6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>`;
    case 'clock':
      return `<circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.6"/><path d="M12 7v5l3 2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>`;
    case 'dollarsign':
      return `<path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>`;
    case 'check':
    case 'checkcircle':
      return `<path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>`;
    case 'search':
      return `<circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="1.7"/><path d="M21 21l-4.3-4.3" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>`;
    case 'trendingup':
      return `<path d="M3 17l6-6 4 4 8-8M15 7h6v6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>`;
    case 'shieldcheck':
      return `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 11l2 2 4-4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>`;
    case 'award':
      return `<circle cx="12" cy="8" r="7" stroke="currentColor" stroke-width="1.7"/><path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>`;
    case 'target':
      return `<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="12" r="6" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="12" r="2" stroke="currentColor" stroke-width="1.6"/>`;
    case 'map':
      return `<path d="M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3V6z" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 3v15M15 6v15" stroke="currentColor" stroke-width="1.6"/>`;
    case 'key':
      return `<path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3M15.5 7.5L14 6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>`;
    case 'mappin':
      return `<path d="M21 10c0 7-9 13-9 13s-9-6-9-10a9 9 0 0 1 18 0z" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="10" r="3" stroke="currentColor" stroke-width="1.6"/>`;
    case 'star':
      return `<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>`;
    case 'instagram':
      return `<rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" stroke-width="1.7"/><circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.7"/><circle cx="17" cy="7" r="1" fill="currentColor" stroke="none"/>`;
    default:
      return `<path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>`;
  }
}

// Helper to provide distinct fallback images for each specialty
const getSpecialtyFallbackImage = (id: string, index: number) => {
  if (id === 'spec-1' || index === 0) {
    return 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=600'; // Apartamentos Residenciais (apartamento residencial moderno padrão)
  }
  if (id === 'spec-2' || index === 1) {
    return 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=600'; // Flats para Investimento (flat moderno e aconchegante à beira-mar)
  }
  return 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600'; // Consultoria para Investidores (cena corporativa sofisticada)
};

// Helper to convert any image URL to a self-contained base64 data URL
async function imgToBase64(url: string): Promise<string> {
  if (!url) return '';
  if (url.startsWith('data:image/')) return url;
  
  let fetchUrl = url;
  if (url.startsWith('/') && !url.startsWith('//')) {
    fetchUrl = url.substring(1);
  }
  
  try {
    const response = await fetch(fetchUrl);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error('Failed to read blob as data URL'));
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Failed to convert image to base64:', url, error);
    return url; // fallback to original URL
  }
}

export async function exportToHtml(data: LandingPageData, includeEditor: boolean = false): Promise<void> {
  const { 
    theme, nav, hero, stats, specialties, advantages, credentials, region, 
    process, testimonials, faq, cta, footer, waNumber, waMessage,
    pageBgUrl, pageBgOpacity = 5, pageBgParallax = true 
  } = data;

  const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`;

  // Compile specialties grid
  let specialtiesHtml = '';
  for (let index = 0; index < specialties.items.length; index++) {
    const item = specialties.items[index];
    let mediaHtml = '';
    if (item.bgType === 'build') {
      mediaHtml = `<div class="mk mk-build"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>`;
    } else if (item.bgType === 'sea') {
      mediaHtml = `<div class="mk mk-sea"><div class="sun"></div><div class="rail"></div></div>`;
    } else if (item.bgType === 'chart') {
      mediaHtml = `<div class="mk mk-grow"><div class="val">valorização projetada</div><div class="chart"><i style="height:35%"></i><i style="height:50%"></i><i style="height:45%"></i><i style="height:68%"></i><i style="height:60%"></i><i style="height:82%"></i><i style="height:100%"></i></div></div>`;
    } else if (item.bgType === 'custom' || item.imageUrl) {
      const src = item.imageUrl || getSpecialtyFallbackImage(item.id, index);
      const base64Src = await imgToBase64(src);
      mediaHtml = `<img src="${base64Src}" loading="lazy" alt="${item.title}" style="width:100%; height:100%; object-fit:cover;">`;
    } else {
      mediaHtml = `<div class="mk mk-build" style="background:linear-gradient(135deg, #1b1e22, #0c0d0f)"></div>`;
    }

    specialtiesHtml += `
      <article class="work-card">
        <div class="work-media img-slot">
          ${mediaHtml}
        </div>
        <div class="work-body">
          <h3 class="work-title">${item.title}</h3>
          <p class="work-desc">${item.description}</p>
          <div class="work-tag">${item.tag}</div>
        </div>
        <div class="work-arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M17 7H8M17 7v9"/></svg></div>
      </article>`;
  }

  // Compile stats
  let statsHtml = '';
  stats.forEach((item) => {
    const isSvg = item.icon === 'Phone' || item.icon === 'Clock' || item.icon === 'Building' || item.icon === 'DollarSign' || item.icon === 'Check';
    const svgContent = getIconSvg(item.icon);
    statsHtml += `
    <div class="stat">
      <svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">${svgContent}</svg>
      <div class="num">${item.value}</div>
      <div class="cap">${item.label}</div>
    </div>`;
  });

  // Compile advantages
  let advantagesHtml = '';
  advantages.items.forEach((item) => {
    const svgContent = getIconSvg(item.icon);
    advantagesHtml += `
    <div class="cap-item">
      <div class="cap-ico"><svg viewBox="0 0 24 24" fill="none">${svgContent}</svg></div>
      <div>
        <h4>${item.title}</h4>
        <p>${item.description}</p>
      </div>
    </div>`;
  });

  // Compile credentials chips
  let chipsHtml = '';
  credentials.chips.forEach((chip) => {
    chipsHtml += `
    <div class="chip">
      <b>${chip.value}</b>
      <span>${chip.label}</span>
    </div>`;
  });

  // Compile process steps
  let processHtml = '';
  process.items.forEach((item) => {
    const svgContent = getIconSvg(item.icon);
    processHtml += `
    <div class="proc">
      <div class="n">${item.num}</div>
      <svg class="p-ico" viewBox="0 0 24 24" fill="none">${svgContent}</svg>
      <h4>${item.title}</h4>
      <p>${item.description}</p>
    </div>`;
  });

  // Compile testimonials
  let testimonialsHtml = '';
  for (let index = 0; index < testimonials.items.length; index++) {
    const item = testimonials.items[index];
    let starsHtml = '';
    for (let i = 0; i < item.stars; i++) {
      starsHtml += `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6.3 6.9.6-5.2 4.5 1.6 6.8L12 17l-6.2 3.7 1.6-6.8L2.2 8.9l6.9-.6z"/></svg>`;
    }

    let avatarHtml = '';
    if (item.avatarUrl) {
      const base64Avatar = await imgToBase64(item.avatarUrl);
      avatarHtml = `<img src="${base64Avatar}" alt="${item.name}" style="width: 44px; height: 44px; border-radius: 50%; object-fit: cover; border: 1px solid rgba(255,255,255,0.1);">`;
    } else {
      avatarHtml = `<div class="av">${item.initials}</div>`;
    }

    testimonialsHtml += `
    <div class="testi">
      <div class="stars">
        ${starsHtml}
      </div>
      <q>${item.quote}</q>
      <div class="who">
        ${avatarHtml}
        <div>
          <b>${item.name}</b>
          <span>${item.sub}</span>
        </div>
      </div>
    </div>`;
  }

  // Compile FAQs
  let faqHtml = '';
  faq.items.forEach((item, index) => {
    const isOpen = index === 0 ? 'open' : '';
    faqHtml += `
    <details ${isOpen}>
      <summary>
        <span>${item.question}</span>
        <span class="plus">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 5v14M5 12h14"/>
          </svg>
        </span>
      </summary>
      <div class="a">${item.answer}</div>
    </details>`;
  });

  // Compile footer items
  let footerCredentialsHtml = '';
  footer.credentialsItems.forEach(item => {
    footerCredentialsHtml += `<p>${item}</p>`;
  });

  let footerAddressHtml = '';
  footer.addressItems.forEach(item => {
    footerAddressHtml += `<p>${item}</p>`;
  });

  let navLinksHtml = '';
  nav.links.forEach(link => {
    navLinksHtml += `<a href="${link.href}">${link.text}</a>`;
  });

  const imageStyles = data.imageStyles || {};
  const heroStyle = {
    width: 340,
    height: 440,
    scale: 1,
    borderRadius: 0,
    rotation: 0,
    translateX: 0,
    translateY: 0,
    ...(imageStyles.hero || {})
  };

  let finalHeroBase64 = '';
  let isHeroMont = true;
  let imgUrl = hero.imageUrl || '';
  if (imgUrl === '/mont4.png' || imgUrl === 'mont4.png' || imgUrl.endsWith('mont4.png') || !imgUrl) {
    try {
      finalHeroBase64 = await imgToBase64('/mont4.png');
      if (!finalHeroBase64 || finalHeroBase64 === '/mont4.png') {
        finalHeroBase64 = defaultHeroImage;
      }
    } catch (e) {
      finalHeroBase64 = defaultHeroImage;
    }
  } else {
    finalHeroBase64 = await imgToBase64(imgUrl);
    if (finalHeroBase64 !== defaultHeroImage) {
      isHeroMont = false;
    }
  }
  const finalBorderRadius = isHeroMont ? 0 : (heroStyle.borderRadius ?? 24);

  // Convert page background to base64 if set
  let finalPageBgBase64 = '';
  if (pageBgUrl) {
    finalPageBgBase64 = await imgToBase64(pageBgUrl);
  }

  let portraitMediaHtml = '';
  if (finalHeroBase64) {
    portraitMediaHtml = `
      <div class="portrait-wrapper" 
           data-width="${heroStyle.width}" 
           data-height="${heroStyle.height}" 
           data-tx="${heroStyle.translateX}" 
           data-ty="${heroStyle.translateY}" 
           data-scale="${heroStyle.scale}" 
           data-rotation="${heroStyle.rotation}"
           style="
             width: ${heroStyle.width}px;
             height: auto;
             aspect-ratio: ${heroStyle.width} / ${heroStyle.height};
             max-width: 100%;
             margin-left: auto;
             margin-right: auto;
             border-radius: ${finalBorderRadius}px;
             transform: translate(${heroStyle.translateX}px, ${heroStyle.translateY}px) scale(${heroStyle.scale}) rotate(${heroStyle.rotation}deg);
             overflow: hidden;
             position: relative;
             transition: transform 0.15s ease-out, border-radius 0.15s ease-out;
           ">
        <img src="${finalHeroBase64}" alt="${hero.namecardName}" class="portrait-img" style="
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: ${isHeroMont ? 'contain' : 'cover'};
          object-position: ${isHeroMont ? 'bottom' : 'top'};
          pointer-events: none;
          display: block;
        ">
      </div>
    `;
  } else {
    const initial = (hero.namecardName || 'R').charAt(0).toUpperCase();
    portraitMediaHtml = `
      <div class="portrait-wrapper" 
           style="
             width: ${heroStyle.width}px;
             height: auto;
             aspect-ratio: ${heroStyle.width} / ${heroStyle.height};
             max-width: 100%;
             margin-left: auto;
             margin-right: auto;
             border-radius: ${finalBorderRadius || 24}px;
             transform: translate(${heroStyle.translateX}px, ${heroStyle.translateY}px) scale(${heroStyle.scale}) rotate(${heroStyle.rotation}deg);
             overflow: hidden;
             position: relative;
             display: flex;
             flex-direction: column;
             align-items: center;
             justify-content: center;
             background: linear-gradient(135deg, #101215 0%, #191c20 100%);
             border: 1px solid rgba(255, 255, 255, 0.08);
             box-shadow: inset 0 0 40px rgba(0, 0, 0, 0.6);
           ">
        <div style="
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: #141619;
          border: 2px solid #c9a24b;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #c9a24b;
          font-family: var(--font-head);
          font-size: 32px;
          font-weight: 900;
          margin-bottom: 16px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.4);
        ">
          ${initial}
        </div>
        <p style="font-family: var(--font-head); font-weight: 700; font-size: 14px; color: #ecebe8; margin: 0; text-transform: uppercase; letter-spacing: 0.12em; text-align: center; width: 85%;">
          ${hero.namecardName || 'Rodrigo Sansão'}
        </p>
        <p style="font-family: var(--font-body); font-size: 11px; color: #82858b; margin: 6px 0 0 0; font-weight: 500; text-align: center; width: 85%;">
          ${hero.namecardTitle || 'Consultor Imobiliário'}
        </p>
        <p style="font-family: var(--font-mono); font-size: 9px; color: #c9a24b; margin: 8px 0 0 0; letter-spacing: 0.05em; opacity: 0.8; text-align: center; width: 85%;">
          ${hero.namecardCreci || ''}
        </p>
      </div>
    `;
  }

  // Generate the full HTML string
  const fullHtml = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>${hero.namecardName} — Investimentos Imobiliários | Apartamentos e Flats</title>
<meta name="description" content="${footer.description}">
<meta name="author" content="${hero.namecardName}">
<meta name="theme-color" content="${theme.bg}">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Archivo:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">

<style>
:root {
  --bg:            ${theme.bg};
  --bg-soft:       ${theme.bgSoft};
  --card:          ${theme.card};
  --card-2:        ${theme.card2};
  --border:        rgba(255,255,255,.08);
  --border-soft:   rgba(255,255,255,.05);

  --text:          ${theme.text};
  --muted:         ${theme.muted};
  --muted-2:       ${theme.muted2};

  --gold:          ${theme.gold};
  --gold-soft:     ${theme.goldSoft};
  --wa:            ${theme.wa};
  --wa-dark:       ${theme.waDark};

  --font-display:  ${theme.fontDisplay};
  --font-head:     ${theme.fontHead};
  --font-body:     ${theme.fontBody};
  --font-mono:     ${theme.fontMono};

  --maxw:          1160px;
  --radius:        16px;
  --radius-sm:     11px;
  --gap:           22px;
}

*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{
  background:var(--bg);color:var(--text);font-family:var(--font-body);
  line-height:1.5;-webkit-font-smoothing:antialiased;overflow-x:hidden;
  position:relative;
  min-height:100vh;
}
.page-bg-layer {
  position:absolute;inset:0;pointer-events:none;z-index:-1;
  background-size:cover;background-position:center;
}
.bg-fixed { background-attachment: fixed; }
.bg-scroll { background-attachment: scroll; }
a{color:inherit;text-decoration:none}
img{display:block;max-width:100%}
svg{display:block}
:focus-visible{outline:2px solid var(--gold);outline-offset:3px;border-radius:4px}

.wrap{max-width:var(--maxw);margin:0 auto;padding:0 26px}
.eyebrow{font-family:var(--font-mono);font-size:11px;letter-spacing:.28em;text-transform:uppercase;color:var(--gold)}

.btn{
  display:inline-flex;align-items:center;gap:10px;font-size:12.5px;font-weight:600;
  letter-spacing:.1em;text-transform:uppercase;padding:14px 20px;border-radius:10px;
  cursor:pointer;border:1px solid var(--border);background:transparent;color:var(--text);
  transition:.25s;font-family:var(--font-body);
}
.btn .ico{width:15px;height:15px}
.btn:hover{border-color:rgba(255,255,255,.28)}
.btn--wa{background:linear-gradient(180deg,var(--wa),var(--wa-dark));color:#062611;border:none;font-weight:700}
.btn--wa:hover{filter:brightness(1.06)}
.btn--gold{background:linear-gradient(180deg,var(--gold-soft),var(--gold));color:#241a05;border:none;font-weight:700}
.btn--pill{border-radius:999px;padding:11px 18px}

header.nav{
  position:sticky;top:0;z-index:50;backdrop-filter:blur(14px);
  background:linear-gradient(180deg,rgba(10,11,13,.92),rgba(10,11,13,.55));
  border-bottom:1px solid var(--border-soft);
}
.nav-inner{display:flex;align-items:center;justify-content:space-between;height:66px}
.logo{font-family:var(--font-display);font-size:20px;letter-spacing:.01em;display:flex;align-items:center;gap:9px}
.logo .mark{width:26px;height:26px;border-radius:7px;background:linear-gradient(150deg,var(--gold-soft),var(--gold));color:#241a05;display:flex;align-items:center;justify-content:center;font-size:13px}
.nav-links{display:flex;gap:30px}
.nav-links a{font-size:11.5px;letter-spacing:.16em;text-transform:uppercase;color:var(--muted);transition:.2s}
.nav-links a:hover{color:var(--text)}

.hero{position:relative;padding:38px 0 0;overflow:hidden}
.hero-grid{display:grid;grid-template-columns:1.05fr .95fr;align-items:end;position:relative;min-height:560px}
.hero-left{padding:26px 0 44px;position:relative;z-index:3}
.hero-kicker{margin-bottom:22px}
.hero-title{
  font-family:var(--font-display);font-size:clamp(3rem,8.2vw,7.4rem);line-height:.9;letter-spacing:-.01em;
  background:linear-gradient(175deg,#fdfdfc 0%,#c6c8cb 55%,#8f9296 100%);
  -webkit-background-clip:text;background-clip:text;color:transparent;margin-bottom:24px;
}
.hero-sub{max-width:430px;color:var(--muted);font-size:15px;line-height:1.65;margin-bottom:30px}
.hero-actions{display:flex;gap:14px;flex-wrap:wrap}

.hero-right{position:relative;z-index:1;align-self:stretch;display:flex;justify-content:center;align-items:flex-end}
@media(min-width:981px){
  .hero-right{justify-content:flex-end}
}
.portrait-container{
  position:relative;
  width:100%;
  max-width:340px;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:flex-end;
  margin-bottom:-64px;
  z-index:10;
  margin-left:auto;
  margin-right:auto;
}
@media(max-width:980px){
  .portrait-container{
    max-width:100%;
    margin-bottom:-40px;
    margin-top:20px;
  }
}
.hero-ring{position:absolute;right:2%;top:22%;width:min(46vw,420px);aspect-ratio:1;border:1px solid rgba(201,162,75,.28);border-radius:50%;z-index:2;pointer-events:none}
.spark{position:absolute;z-index:3;color:var(--gold-soft);opacity:.9}
.spark.s1{right:14%;top:33%;width:24px}

.namecard{
  position:absolute;
  bottom:64px;
  right:16px;
  z-index:20;
  text-align:right;
  background:rgba(9,10,12,0.85);
  backdrop-filter:blur(8px);
  -webkit-backdrop-filter:blur(8px);
  padding:12px 16px;
  border-radius:16px;
  border:1px solid rgba(255,255,255,0.08);
  box-shadow:0 15px 35px rgba(0,0,0,0.4);
  max-width:240px;
}
@media(min-width:640px){
  .namecard{
    bottom:80px;
    right:-16px;
  }
}
.namecard .lbl{font-family:var(--font-mono);font-size:9px;letter-spacing:.22em;color:var(--muted-2);text-transform:uppercase}
.namecard .big{font-family:var(--font-head);font-weight:800;font-size:18px;margin:4px 0 2px;color:#efeae1;white-space:nowrap}
.namecard .sub{font-size:10px;letter-spacing:.14em;color:var(--gold);text-transform:uppercase}

.stats{margin-top:-8px;position:relative;z-index:6}
.stats-card{background:linear-gradient(180deg,var(--card),#0f1114);border:1px solid var(--border);border-radius:var(--radius);display:grid;grid-template-columns:repeat(4,1fr)}
.stat{padding:30px 26px;border-right:1px solid var(--border-soft);text-align:center}
.stat:last-child{border-right:none}
.stat .ico{width:22px;height:22px;margin:0 auto 16px;color:var(--gold);opacity:.9}
.stat .num{font-family:var(--font-head);font-weight:800;font-size:38px;line-height:1;letter-spacing:-.02em}
.stat .cap{margin-top:10px;font-family:var(--font-mono);font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted-2)}

section.block{padding:70px 0}
.block-head{display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:30px;gap:20px}
.block-head .h-left{max-width:640px}
.section-title{font-family:var(--font-head);font-weight:700;font-size:clamp(1.5rem,3vw,2rem);letter-spacing:-.01em;margin-top:12px;line-height:1.15}

.work-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--gap)}
.work-card{position:relative;border:1px solid var(--border);border-radius:var(--radius);overflow:hidden;min-height:300px;display:flex;flex-direction:column;justify-content:flex-end;background:var(--card);transition:.3s}
.work-card:hover{transform:translateY(-4px);border-color:rgba(201,162,75,.35)}
.work-media{position:absolute;inset:0;z-index:0}
.work-body{position:relative;z-index:2;padding:22px;background:linear-gradient(180deg,transparent,rgba(8,9,10,.9) 60%)}
.work-title{font-family:var(--font-head);font-weight:700;font-size:21px;margin-bottom:8px}
.work-desc{font-size:12.5px;color:#c3c5c9;line-height:1.55;margin-bottom:10px}
.work-tag{font-family:var(--font-mono);font-size:9.5px;letter-spacing:.13em;text-transform:uppercase;color:var(--gold)}
.work-arrow{position:absolute;right:18px;top:18px;z-index:3;width:42px;height:42px;border-radius:50%;border:1px solid rgba(255,255,255,.25);display:flex;align-items:center;justify-content:center;background:rgba(20,22,25,.5);transition:.25s;color:#fff}
.work-card:hover .work-arrow{background:var(--gold);color:#241a05;border-color:var(--gold)}
.work-arrow svg{width:15px;height:15px}

.mk{position:absolute;inset:0}
.mk-build{background:linear-gradient(160deg,#1b1e22,#0c0d0f);padding:20px;display:grid;grid-template-columns:repeat(5,1fr);gap:7px;align-content:start}
.mk-build i{aspect-ratio:1;border-radius:3px;background:#23272d}
.mk-build i:nth-child(3n){background:#30353b}
.mk-build i:nth-child(4n){background:#2a2f34}
.mk-sea{background:linear-gradient(180deg,#2b3138 0%,#3a4a55 42%,#243943 52%,#14232b 100%)}
.mk-sea .sun{position:absolute;right:24%;top:20%;width:46px;height:46px;border-radius:50%;background:radial-gradient(circle,#e7d8b4,#c9a24b);opacity:.55;filter:blur(1px)}
.mk-sea .rail{position:absolute;left:0;right:0;bottom:0;height:40%;background:linear-gradient(180deg,transparent,rgba(10,12,14,.85))}
.mk-grow{background:linear-gradient(160deg,#1b1e22,#0e1013);padding:18px}
.mk-grow .val{font-family:var(--font-mono);color:#d8bd7e;font-size:16px;margin-bottom:12px}
.mk-grow .chart{display:flex;align-items:flex-end;gap:5px;height:80px}
.mk-grow .chart i{flex:1;background:linear-gradient(180deg,#c9a24b55,#23262b);border-radius:2px}
.mk-grow .chart i:last-child{background:linear-gradient(180deg,#d8bd7e,#8a6f2a)}

.cta-band {
  background: linear-gradient(90deg, var(--card), var(--card-2));
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 24px 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}
.cta-band-info {
  display: flex;
  flex-direction: column;
  gap: 6px;
  text-align: left;
}
.cta-band-title {
  font-family: var(--font-head);
  font-weight: 700;
  font-size: 18px;
  color: var(--text);
  display: flex;
  align-items: center;
  gap: 8px;
}
.cta-band-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: var(--wa);
  display: inline-block;
}
.cta-band-desc {
  font-size: 12px;
  color: var(--muted);
}
@media(max-width:768px){
  .cta-band {
    flex-direction: column;
    align-items: stretch;
    padding: 24px;
    gap: 16px;
  }
}

.cap-layout{display:grid;grid-template-columns:1.15fr 1fr;gap:46px}
.cap-grid{display:grid;grid-template-columns:1fr 1fr;gap:34px 30px}
.cap-item{display:flex;gap:14px}
.cap-ico{width:40px;height:40px;flex:none;border-radius:11px;border:1px solid var(--border);display:flex;align-items:center;justify-content:center;color:var(--gold);background:var(--card)}
.cap-ico svg{width:19px;height:19px}
.cap-item h4{font-family:var(--font-head);font-weight:700;font-size:13px;letter-spacing:.03em;text-transform:uppercase;margin-bottom:6px}
.cap-item p{font-size:12.5px;color:var(--muted);line-height:1.55}

.panel{background:var(--card);border:1px solid var(--border);border-radius:var(--radius);padding:22px}
.panel + .panel{margin-top:20px}
.panel .p-title{font-family:var(--font-mono);font-size:10.5px;letter-spacing:.18em;text-transform:uppercase;color:var(--gold);margin-bottom:18px}
.chips{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px}
.chip{background:var(--card-2);border:1px solid var(--border-soft);border-radius:10px;padding:12px}
.chip b{display:block;font-family:var(--font-head);font-weight:800;font-size:16px;color:var(--text)}
.chip span{font-size:9.5px;letter-spacing:.08em;text-transform:uppercase;color:var(--muted-2)}

.region-map{border-radius:11px;overflow:hidden;border:1px solid var(--border-soft);margin-bottom:14px;background:#0f1114}
.region-map svg{width:100%;height:auto;display:block}
.panel p.region-txt{font-size:12.5px;color:var(--muted);line-height:1.6}
.region-txt b{color:var(--text)}

.process{background:var(--bg-soft);border-top:1px solid var(--border-soft);border-bottom:1px solid var(--border-soft)}
.proc-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:0}
.proc{padding:6px 22px 6px 0;border-right:1px solid var(--border-soft);position:relative}
.proc:last-child{border-right:none}
.proc .n{font-family:var(--font-mono);font-size:11px;color:var(--gold);letter-spacing:.1em;margin-bottom:18px}
.proc .p-ico{width:22px;height:22px;color:var(--muted);margin-bottom:16px;stroke:var(--gold)}
.proc h4{font-family:var(--font-head);font-weight:700;font-size:14px;letter-spacing:.04em;text-transform:uppercase;margin-bottom:8px}
.proc p{font-size:12px;color:var(--muted);line-height:1.55}

.testi-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--gap)}
.testi{background:var(--card);border:1px solid var(--border);border-radius:var(--radius);padding:24px;display:flex;flex-direction:column;gap:14px}
.stars{display:flex;gap:3px;color:var(--gold)}
.stars svg{width:15px;height:15px}
.testi q{font-size:13.5px;color:#d3d5d8;line-height:1.6;font-style:normal;quotes:"“" "”"}
.testi .who{display:flex;align-items:center;gap:11px;margin-top:auto}
.testi .av{width:36px;height:36px;border-radius:50%;background:linear-gradient(150deg,#2a2e33,#16181b);border:1px solid var(--border);display:flex;align-items:center;justify-content:center;font-family:var(--font-head);font-weight:700;font-size:13px;color:var(--gold-soft)}
.testi .who b{font-size:12.5px;display:block}
.testi .who span{font-size:10.5px;color:var(--muted-2);font-family:var(--font-mono)}

.faq{max-width:820px}
.faq details{border-bottom:1px solid var(--border-soft)}
.faq summary{list-style:none;cursor:pointer;padding:20px 4px;display:flex;align-items:center;justify-content:space-between;gap:18px;font-family:var(--font-head);font-weight:600;font-size:15px}
.faq summary::-webkit-details-marker{display:none}
.faq summary .plus{width:24px;height:24px;flex:none;border:1px solid var(--border);border-radius:50%;display:flex;align-items:center;justify-content:center;color:var(--gold);transition:.25s}
.faq details[open] summary .plus{transform:rotate(45deg)}
.faq .a{padding:0 4px 20px;font-size:13.5px;color:var(--muted);line-height:1.65;max-width:700px}

.cta-block{position:relative;border-radius:var(--radius);overflow:hidden;background:linear-gradient(120deg,#141619 0%,#1b1e22 100%);border:1px solid var(--border);padding:46px 40px;display:grid;grid-template-columns:1.2fr 1fr;gap:40px;align-items:center}
.cta-shine{position:absolute;left:-5%;top:-40%;width:60%;height:180%;pointer-events:none;background:linear-gradient(105deg,transparent 30%,rgba(216,189,126,.12) 48%,rgba(216,189,126,.24) 52%,transparent 66%);transform:skewX(-14deg)}
.cta-title{position:relative;font-family:var(--font-display);font-size:clamp(1.9rem,4vw,3.1rem);line-height:.98;letter-spacing:-.01em;background:linear-gradient(180deg,#fff,#c6c8cb);-webkit-background-clip:text;background-clip:text;color:transparent}
.cta-right{position:relative}
.cta-right>p{font-size:13.5px;color:var(--muted);margin-bottom:20px;max-width:320px;line-height:1.6}
.contact-list{display:flex;flex-direction:column;gap:13px;margin-top:22px}
.contact-list .ci{display:flex;align-items:center;gap:12px;font-size:12.5px;color:var(--muted)}
.contact-list .ci svg{width:15px;height:15px;color:var(--gold);flex:none}
.contact-list .ci b{color:var(--text);font-weight:500}

footer.foot{border-top:1px solid var(--border-soft);padding:40px 0 30px}
.foot-top{display:grid;grid-template-columns:1.4fr 1fr 1fr;gap:34px;margin-bottom:30px}
.foot-brand .logo{margin-bottom:14px}
.foot-brand p{font-size:12.5px;color:var(--muted);line-height:1.7;max-width:340px}
.foot-col h6{font-family:var(--font-mono);font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:var(--gold);margin-bottom:14px}
.foot-col p,.foot-col a{display:block;font-size:12.5px;color:var(--muted);line-height:1.7;transition:.2s}
.foot-col a:hover{color:var(--text)}
.foot-bottom{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px;padding-top:22px;border-top:1px solid var(--border-soft)}
.foot-bottom .cp{font-size:11.5px;color:var(--muted-2);letter-spacing:.03em}
.foot-social{display:flex;align-items:center;gap:16px}
.foot-social a{color:var(--muted);transition:.2s}
.foot-social a:hover{color:var(--gold)}
.foot-social svg{width:17px;height:17px}

.wa-float{position:fixed;right:20px;bottom:22px;z-index:150;width:56px;height:56px;border-radius:50%;background:linear-gradient(180deg,var(--wa),var(--wa-dark));display:flex;align-items:center;justify-content:center;box-shadow:0 10px 30px rgba(37,211,102,.35);animation:pulse 2.6s infinite}
.wa-float svg{width:30px;height:30px;color:#fff}
@keyframes pulse{0%{box-shadow:0 0 0 0 rgba(37,211,102,.45)}70%{box-shadow:0 0 0 16px rgba(37,211,102,0)}100%{box-shadow:0 0 0 0 rgba(37,211,102,0)}}

@media(prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important;scroll-behavior:auto!important}}
@media(max-width:980px){
  .nav-links{display:none}
  .hero-grid{grid-template-columns:1fr;min-height:auto}
  .hero-ring{display:none}
  .stats-card{grid-template-columns:1fr 1fr}
  .stat:nth-child(2){border-right:none}
  .stat{border-bottom:1px solid var(--border-soft)}
  .work-grid,.testi-grid{grid-template-columns:1fr}
  .cap-layout{grid-template-columns:1fr;gap:34px}
  .proc-grid{grid-template-columns:1fr 1fr}
  .proc{border-right:none;border-bottom:1px solid var(--border-soft);padding-bottom:22px;margin-bottom:22px}
  .cta-block{grid-template-columns:1fr;padding:32px 24px}
  .foot-top{grid-template-columns:1fr 1fr}
}
@media(max-width:560px){
  .stats-card{grid-template-columns:1fr}
  .stat{border-right:none}
  .cap-grid,.chips{grid-template-columns:1fr}
  .proc-grid{grid-template-columns:1fr}
  .foot-top{grid-template-columns:1fr}
}
</style>
</head>
<body>
${finalPageBgBase64 ? `
<div class="page-bg-layer ${pageBgParallax ? 'bg-fixed' : 'bg-scroll'}" style="background-image: url('${finalPageBgBase64}'); opacity: ${pageBgOpacity / 100};"></div>
` : ''}

<header class="nav">
  <div class="wrap nav-inner">
    <a href="#" class="logo"><span class="mark">${nav.logoMark}</span><span>${nav.logoName}</span></a>
    <nav class="nav-links">
      ${navLinksHtml}
    </nav>
    <a href="${waLink}" target="_blank" rel="noopener" class="btn btn--wa btn--pill">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">${getIconSvg('phone')}</svg>
      <span>${hero.btnWaText}</span>
    </a>
  </div>
</header>

<section class="hero">
  <div class="wrap">
    <div class="hero-grid">
      <div class="hero-left">
        <div class="eyebrow hero-kicker">${hero.eyebrow}</div>
        <h1 class="hero-title">${hero.title.replace('\n', '<br>')}</h1>
        <p class="hero-sub">${hero.subtitle}</p>
        <div class="hero-actions">
          <a href="${waLink}" target="_blank" rel="noopener" class="btn btn--wa">
            <svg class="ico" viewBox="0 0 24 24" fill="currentColor">${getIconSvg('phone')}</svg>
            <span>${hero.btnWaText}</span>
          </a>
          <a href="${hero.btnSecHref}" class="btn">
            <span>${hero.btnSecText}</span>
            <svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </a>
        </div>
      </div>
      <div class="hero-right">
        <div class="hero-ring"></div>
        <svg class="spark s1" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0l1.6 8.4L22 12l-8.4 1.6L12 24l-1.6-8.4L2 12l8.4-1.6z"/></svg>
        <div class="portrait-container">
          ${portraitMediaHtml}
          <div class="namecard">
            <div class="lbl">${hero.namecardTitle}</div>
            <div class="big">${hero.namecardName}</div>
            <div class="sub">${hero.namecardCreci}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<div class="wrap stats">
  <div class="stats-card">
    ${statsHtml}
  </div>
</div>

<section class="block" id="especialidades">
  <div class="wrap">
    <div class="block-head">
      <div class="h-left">
        <span class="eyebrow">${specialties.subtitle}</span>
        <h2 class="section-title">${specialties.title}</h2>
      </div>
    </div>
    <div class="work-grid">
      ${specialtiesHtml}
    </div>
  </div>
</section>

<section style="padding: 24px 0">
  <div class="wrap">
    <div class="cta-band">
      <div class="cta-band-info">
        <h3 class="cta-band-title">
          <span class="cta-band-dot"></span>
          Deseja consultar oportunidades disponíveis agora?
        </h3>
        <p class="cta-band-desc">
          Acesse o catálogo atualizado com as melhores taxas de rentabilidade de flats e apartamentos residenciais.
        </p>
      </div>
      <a href="${waLink}" target="_blank" rel="noopener" class="btn btn--wa">
        <svg class="ico" viewBox="0 0 24 24" fill="currentColor">${getIconSvg('phone')}</svg>
        <span>Falar agora</span>
      </a>
    </div>
  </div>
</section>

<section class="block" id="sobre">
  <div class="wrap">
    <div class="block-head">
      <div class="h-left">
        <span class="eyebrow">${advantages.subtitle}</span>
        <h2 class="section-title">${advantages.title}</h2>
      </div>
    </div>
    <div class="cap-layout">
      <div class="cap-grid">
        ${advantagesHtml}
      </div>
      <div>
        <div class="panel">
          <div class="p-title">${credentials.title}</div>
          <div class="chips">
            ${chipsHtml}
          </div>
        </div>
        <div class="panel">
          <div class="p-title">${region.title}</div>
          <div class="region-map">
            <svg viewBox="0 0 320 130" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Mapa estilizado">
              <rect width="320" height="130" fill="#0f1114"/>
              <path d="M0 40 Q90 30 150 55 T320 60 L320 130 L0 130 Z" fill="#151b1f"/>
              <path d="M195 0 C220 40 210 90 240 130 L320 130 L320 0 Z" fill="#101d22"/>
              <path d="M195 0 C220 40 210 90 240 130" fill="none" stroke="#22343b" stroke-width="1.5"/>
              <circle cx="170" cy="52" r="16" fill="none" stroke="#c9a24b" stroke-width="1.2" opacity=".5"/>
              <circle cx="170" cy="52" r="4" fill="#c9a24b"/>
              <text x="128" y="46" fill="#82858b" font-family="monospace" font-size="8" letter-spacing="1">ZONA NORTE</text>
              <text x="252" y="118" fill="#3a5058" font-family="monospace" font-size="8">OCEANO</text>
            </svg>
          </div>
          <p class="region-txt">${region.description}</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="process" id="processo">
  <div class="wrap block">
    <div class="block-head">
      <div class="h-left">
        <span class="eyebrow">${process.subtitle}</span>
        <h2 class="section-title">${process.title}</h2>
      </div>
    </div>
    <div class="proc-grid">
      ${processHtml}
    </div>
  </div>
</section>

<section class="block">
  <div class="wrap">
    <div class="block-head">
      <div class="h-left">
        <span class="eyebrow">${testimonials.subtitle}</span>
        <h2 class="section-title">${testimonials.title}</h2>
      </div>
    </div>
    <div class="testi-grid">
      ${testimonialsHtml}
    </div>
  </div>
</section>

<section class="block" id="faq">
  <div class="wrap">
    <div class="block-head">
      <div class="h-left">
        <span class="eyebrow">${faq.subtitle}</span>
        <h2 class="section-title">${faq.title}</h2>
      </div>
    </div>
    <div class="faq">
      ${faqHtml}
    </div>
  </div>
</section>

<section class="block" id="contato">
  <div class="wrap">
    <div class="cta-block">
      <div class="cta-shine"></div>
      <h2 class="cta-title">${cta.title.replace('\n', '<br>')}</h2>
      <div class="cta-right">
        <p>${cta.description}</p>
        <a href="${waLink}" target="_blank" rel="noopener" class="btn btn--wa">
          <svg class="ico" viewBox="0 0 24 24" fill="currentColor">${getIconSvg('phone')}</svg>
          <span>${cta.btnText}</span>
        </a>
        <div class="contact-list">
          <div class="ci">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 21s7-6 7-11a7 7 0 10-14 0c0 5 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>
            <b>${cta.contacts.address}</b>
          </div>
          <div class="ci">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 5c0 9 6 15 15 15l1-4-5-2-2 2c-2-1-4-3-5-5l2-2-2-5z"/></svg>
            <b>${cta.contacts.phone}</b>
          </div>
          <div class="ci">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 3l8 4v5c0 5-3.5 7.7-8 9-4.5-1.3-8-4-8-9V7z"/></svg>
            <b>${cta.contacts.creci}</b>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<footer class="foot">
  <div class="wrap">
    <div class="foot-top">
      <div class="foot-brand">
        <div class="logo"><span class="mark">${nav.logoMark}</span><span>${nav.logoName}</span></div>
        <p>${footer.description}</p>
      </div>
      <div class="foot-col">
        <h6>${footer.credentialsTitle}</h6>
        ${footerCredentialsHtml}
      </div>
      <div class="foot-col">
        <h6>${footer.addressTitle}</h6>
        ${footerAddressHtml}
      </div>
    </div>
    <div class="foot-bottom">
      <div class="cp">${footer.copyright}</div>
      <div class="foot-social">
        <a href="${footer.policyLinks[0].href}">${footer.policyLinks[0].text}</a>
        <a href="${footer.policyLinks[1].href}">${footer.policyLinks[1].text}</a>
        <a href="${footer.instagramUrl}" aria-label="Instagram">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7">${getIconSvg('instagram')}</svg>
        </a>
        <a href="${waLink}" target="_blank" rel="noopener" aria-label="WhatsApp">
          <svg viewBox="0 0 24 24" fill="currentColor">${getIconSvg('wa')}</svg>
        </a>
      </div>
    </div>
  </div>
</footer>

<a href="${waLink}" target="_blank" rel="noopener" class="wa-float" aria-label="Falar no WhatsApp">
  <svg viewBox="0 0 24 24" fill="currentColor">${getIconSvg('wa')}</svg>
</a>

${includeEditor ? `
<div style="background: rgba(0,0,0,0.8); color: #fff; padding: 10px; position: fixed; bottom: 0; left: 0; right: 0; text-align: center; font-family: sans-serif; font-size: 13px; z-index: 9999;">
  Esta é uma versão estática exportada. O painel do editor foi removido.
</div>` : ''}

<script>
  function adjustHeroImage() {
    const wrapper = document.querySelector('.portrait-wrapper');
    if (!wrapper) return;
    const container = document.querySelector('.portrait-container');
    if (!container) return;
    
    const targetWidth = parseInt(wrapper.getAttribute('data-width') || '340', 10);
    const containerWidth = container.getBoundingClientRect().width;
    const scaleFactor = containerWidth > 0 ? Math.min(1, containerWidth / targetWidth) : 1;
    
    const tx = parseFloat(wrapper.getAttribute('data-tx') || '0') * scaleFactor;
    const ty = parseFloat(wrapper.getAttribute('data-ty') || '0') * scaleFactor;
    const scale = parseFloat(wrapper.getAttribute('data-scale') || '1');
    const rotation = parseFloat(wrapper.getAttribute('data-rotation') || '0');
    
    wrapper.style.transform = 'translate(' + tx + 'px, ' + ty + 'px) scale(' + scale + ') rotate(' + rotation + 'deg)';
  }
  
  window.addEventListener('resize', adjustHeroImage);
  window.addEventListener('DOMContentLoaded', adjustHeroImage);
  // Run immediately as well
  setTimeout(adjustHeroImage, 50);
</script>

</body>
</html>`;

  // Start download in browser
  const blob = new Blob([fullHtml], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = includeEditor ? 'site-editavel.html' : 'landing-page-rodrigo-sansao.html';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

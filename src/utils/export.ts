import { LandingPageData } from '../types';
import { defaultHeroImage } from '../defaultHeroImage';

/**
 * Returns inline SVG path data for a given icon name to keep the exported HTML single-file and fast.
 */
function getIconSvg(iconName: string): string {
  switch (iconName.toLowerCase()) {
    case 'wa':
    case 'whatsapp':
      return `<path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 004.79 1.22c5.46 0 9.9-4.45 9.9-9.91C21.95 6.45 17.5 2 12.04 2zm5.8 14.13c-.24.68-1.42 1.31-1.95 1.36-.5.05-1.13.07-1.82-.11-.42-.13-.96-.31-1.65-.61-2.9-1.25-4.79-4.17-4.94-4.36-.14-.19-1.18-1.57-1.18-2.99 0-1.42.75-2.12 1.01-2.41.27-.29.58-.36.78-.36.19 0 .39 0 .56.01.18.01.42-.07.66.5.24.58.82 2 .89 2.15.07.14.12.31.02.5-.09.19-.14.31-.27.48-.14.16-.29.37-.41.49-.14.14-.28.28-.12.55.16.27.71 1.17 1.53 1.9 1.05.93 1.94 1.22 2.21 1.36.27.14.43.12.59-.07.16-.19.68-.79.86-1.06.18-.27.36-.22.61-.13.24.09 1.55.73 1.82.86.27.14.44.2.51.31.07.12.07.66-.17 1.34z"/>`;
    case 'phone':
    case 'phone-receiver':
    case 'telephone':
      return `<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>`;
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

function renderIconSvg(iconName: string, className: string = 'w-4 h-4'): string {
  const name = iconName.toLowerCase();
  const inner = getIconSvg(name);
  if (name === 'wa' || name === 'whatsapp' || name === 'star') {
    return `<svg class="${className} fill-current" viewBox="0 0 24 24">${inner}</svg>`;
  }
  return `<svg class="${className}" viewBox="0 0 24 24" fill="none">${inner}</svg>`;
}

const getSpecialtyFallbackImage = (id: string, index: number) => {
  if (id === 'spec-1' || index === 0) {
    return 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=600';
  }
  if (id === 'spec-2' || index === 1) {
    return 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=600';
  }
  return 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600';
};

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
    return url;
  }
}

export async function exportToHtml(data: LandingPageData, includeEditor: boolean = false): Promise<void> {
  const { 
    theme, nav, hero: rawHero, stats, specialties, advantages, credentials, region, 
    process, testimonials, faq, cta: rawCta, intermediateCta, footer, waNumber, waMessage,
    pageBgUrl, pageBgOpacity = 5, pageBgParallax = true 
  } = data;

  const safeHero = {
    eyebrow: 'CONSULTOR PRIVADO',
    title: 'RODRIGO DA SILVA LEITÃO SANSÃO',
    subtitle: 'Consultoria especializada na Zona Norte de João Pessoa.',
    btnWaText: 'CONVERSAR NO WHATSAPP',
    btnSecText: 'VER IMÓVEIS',
    btnSecHref: '#especialidades',
    namecardTitle: 'CORRETOR DE IMÓVEIS',
    namecardName: 'Rodrigo Sansão',
    namecardCreci: 'CRECI-PB 12018',
    imageUrl: '',
    ...(rawHero || {})
  };

  const safeCta = {
    title: 'VAMOS ENCONTRAR O IMÓVEL IDEAL PARA VOCÊ',
    description: 'Receba uma consultoria personalizada e descubra as melhores oportunidades para investir ou morar em João Pessoa.',
    btnText: 'FALAR AGORA',
    ...(rawCta || {}),
    contacts: {
      address: 'Av. Pres. Epitácio Pessoa, 2580 — Tambauzinho, João Pessoa/PB',
      phone: '(83) 98165-8115 · WhatsApp',
      creci: 'CRECI-PB 12018',
      ...(rawCta?.contacts || {})
    }
  };

  const safeIntermediateCta = {
    title: 'Deseja consultar oportunidades disponíveis agora?',
    description: 'Acesse o catálogo atualizado com as melhores taxas de rentabilidade de flats e apartamentos residenciais.',
    btnText: 'Falar agora',
    ...(intermediateCta || {})
  };

  const hero = safeHero;
  const cta = safeCta;
  const intCta = safeIntermediateCta;

  const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`;

  // Compile hero style values
  const imageStyles = data.imageStyles || {};
  const heroStyle = {
    width: 533,
    height: 600,
    scale: 1.25,
    borderRadius: 0,
    rotation: 0,
    translateX: 0,
    translateY: 0,
    ...(imageStyles.hero || {})
  };

  // Convert hero image to base64
  let finalHeroBase64 = '';
  let isHeroMont = true;
  const imgUrl = hero.imageUrl || '';
  if (imgUrl.includes('mont4.png') || !imgUrl) {
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

  // Convert page background to base64
  let finalPageBgBase64 = '';
  if (pageBgUrl) {
    finalPageBgBase64 = await imgToBase64(pageBgUrl);
  }

  // Compile specialties HTML
  const specialtiesHtmlPromises = specialties.items.map(async (item, index) => {
    let renderGraphic = '';
    if (item.bgType === 'build') {
      renderGraphic = `
        <div class="absolute inset-0 grid grid-cols-5 gap-1.5 p-5 bg-gradient-to-br from-zinc-900 to-zinc-950 opacity-90 transition-opacity">
          ${Array.from({ length: 15 }).map((_, i) => `
            <div class="aspect-square rounded-md transition-all duration-300 ${
              i % 3 === 0 ? 'bg-zinc-800' : i % 4 === 0 ? 'bg-zinc-700/60' : 'bg-zinc-900'
            }"></div>
          `).join('')}
        </div>
      `;
    } else if (item.bgType === 'sea') {
      renderGraphic = `
        <div class="absolute inset-0 bg-gradient-to-b from-zinc-800/80 via-zinc-900 to-zinc-950 opacity-90 transition-opacity flex items-center justify-center overflow-hidden">
          <div class="absolute right-[20%] top-[20%] w-12 h-12 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 opacity-20 filter blur-sm"></div>
          <div class="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-zinc-950 to-transparent"></div>
        </div>
      `;
    } else if (item.bgType === 'chart') {
      renderGraphic = `
        <div class="absolute inset-0 bg-gradient-to-br from-zinc-900 to-zinc-950 p-5 flex flex-col justify-end opacity-90 transition-opacity">
          <div class="font-mono text-[9px] text-zinc-500 uppercase tracking-widest mb-4">crescimento de mercado</div>
          <div class="flex items-end gap-1.5 h-20">
            ${[30, 45, 40, 60, 55, 75, 100].map((h, i) => `
              <div style="height: ${h}%" class="flex-1 rounded-sm transition-all duration-500 origin-bottom ${
                i === 6 ? 'bg-gradient-to-t from-amber-600 to-amber-400' : 'bg-zinc-800'
              }"></div>
            `).join('')}
          </div>
        </div>
      `;
    } else {
      const src = item.imageUrl || getSpecialtyFallbackImage(item.id, index);
      const base64Src = await imgToBase64(src);
      const specStyle = imageStyles[`spec-${item.id}`] || {
        scale: 1.05,
        borderRadius: 24,
        rotation: 0,
        translateX: 0,
        translateY: 0
      };
      const scale = specStyle.scale ?? 1.05;
      const rot = specStyle.rotation ?? 0;
      const tx = specStyle.translateX ?? 0;
      const ty = specStyle.translateY ?? 0;
      const br = specStyle.borderRadius ?? 24;
      renderGraphic = `
        <div style="width: 100%; height: 100%; border-radius: ${br}px; overflow: hidden; position: relative;">
          <img src="${base64Src}" alt="${item.title}" class="absolute inset-0 w-full h-full object-cover" style="
            transform: translate(${tx}px, ${ty}px) scale(${scale}) rotate(${rot}deg);
            transform-origin: center center;
            transition: transform 0.15s ease-out;
          " />
        </div>
      `;
    }

    return `
      <article class="specialty-card relative group h-80 rounded-3xl overflow-hidden border border-white/5 bg-zinc-950 flex flex-col justify-end p-6 hover:border-amber-500/30 hover:shadow-[0_0_35px_rgba(245,158,11,0.08)] transition-all duration-500">
        <div class="zoom-bg absolute inset-0 z-0 opacity-65 group-hover:opacity-85 filter">
          ${renderGraphic}
        </div>
        <div class="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent z-10 pointer-events-none group-hover:from-zinc-950 group-hover:via-zinc-950/30 transition-all duration-500"></div>
        
        <div class="relative z-20 space-y-2 text-left">
          <span class="text-[9px] font-mono uppercase tracking-widest text-amber-400 block">${item.tag}</span>
          <h3 class="text-xl font-bold tracking-tight text-white block">${item.title}</h3>
          <p class="text-xs text-zinc-400 leading-relaxed block">${item.description}</p>
        </div>
      </article>
    `;
  });
  const specialtiesHtml = (await Promise.all(specialtiesHtmlPromises)).join('');

  // Compile testimonials HTML
  const singleTestimonialHtmlPromises = testimonials.items.map(async (item) => {
    let starsHtml = '';
    for (let i = 0; i < item.stars; i++) {
      starsHtml += renderIconSvg('star', 'w-3.5 h-3.5');
    }

    return `
      <div class="w-[280px] sm:w-[350px] p-6 rounded-3xl bg-zinc-900/60 border border-white/5 flex flex-col justify-between gap-6 hover:border-amber-500/20 hover:bg-zinc-900/80 transition-all duration-300 shrink-0 select-none text-left">
        <div class="space-y-4">
          <div class="flex gap-1 text-amber-400">${starsHtml}</div>
          <blockquote class="text-xs sm:text-sm text-zinc-300 leading-relaxed italic whitespace-pre-wrap">"${item.quote}"</blockquote>
        </div>
        <div class="flex items-center gap-4 border-t border-white/5 pt-4">
          <div class="w-12 h-12 rounded-full border border-amber-500/30 bg-zinc-950 shrink-0 flex items-center justify-center font-bold text-sm text-amber-500 shadow-lg shadow-amber-500/5">
            ${item.initials || item.name.charAt(0)}
          </div>
          <div class="min-w-0">
            <b class="text-xs text-zinc-200 block truncate">${item.name}</b>
            <span class="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block truncate">${item.sub}</span>
          </div>
        </div>
      </div>
    `;
  });
  const testimonialsSingleListHtml = (await Promise.all(singleTestimonialHtmlPromises)).join('');

  // Portrait HTML inside hero section
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
             overflow: hidden;
             position: relative;
             transition: border-radius 0.15s ease-out;
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
          transform: translate(${heroStyle.translateX}px, ${heroStyle.translateY}px) scale(${isHeroMont ? heroStyle.scale * 1.25 : heroStyle.scale}) rotate(${heroStyle.rotation}deg);
          transform-origin: center center;
          transition: transform 0.15s ease-out;
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
          font-family: sans-serif;
          font-size: 32px;
          font-weight: 900;
          margin-bottom: 16px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.4);
        ">
          ${initial}
        </div>
      </div>
    `;
  }

  // Construct full self-contained HTML page using exactly the Tailwind layout of the actual site
  const fullHtml = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <title>${hero.namecardName} — Investimentos Imobiliários | Apartamentos e Flats</title>
  <meta name="description" content="${footer.description}">
  <meta name="author" content="${hero.namecardName}">
  <meta name="theme-color" content="#090a0f">
  
  <!-- Tailwind CSS via CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  
  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  
  <style>
    html {
      scroll-behavior: smooth;
    }
    body {
      background-color: ${theme.bg || '#090a0f'};
      color: ${theme.text || '#ecebe8'};
      font-family: 'Inter', sans-serif;
    }
    
    /* Custom Scrollbar styling */
    ::-webkit-scrollbar {
      width: 8px;
    }
    ::-webkit-scrollbar-track {
      background: ${theme.bg || '#090a0f'};
    }
    ::-webkit-scrollbar-thumb {
      background: #1c1e24;
      border-radius: 4px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #2a2e38;
    }

    /* FAQ accordion styling */
    summary::-webkit-details-marker {
      display: none;
    }
    details summary svg.plus-icon {
      transition: transform 0.2s ease-out;
    }
    details[open] summary svg.plus-icon {
      transform: rotate(45deg);
    }

    /* Testimonials infinite marquee scrolling */
    @keyframes marquee {
      0% {
        transform: translateX(0%);
      }
      100% {
        transform: translateX(-33.3333%);
      }
    }
    .animate-marquee {
      display: flex;
      width: max-content;
      animation: marquee 45s linear infinite;
    }
    .animate-marquee:hover {
      animation-play-state: paused;
    }

    /* Specialty Card Hover Effects */
    .specialty-card .zoom-bg {
      transition: transform 1s cubic-bezier(0.16, 1, 0.3, 1), opacity 1s cubic-bezier(0.16, 1, 0.3, 1), filter 1s cubic-bezier(0.16, 1, 0.3, 1);
      transform: scale(1);
    }
    .specialty-card:hover .zoom-bg {
      transform: scale(1.08);
      opacity: 0.85;
      filter: brightness(1.05);
    }

    /* Scroll Animation Base Classes */
    .fade-in-on-scroll {
      opacity: 0;
      transform: translateX(-40px);
      transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
      will-change: opacity, transform;
    }
    .fade-in-on-scroll.visible {
      opacity: 1;
      transform: translateX(0);
    }

    /* Timeline glowing flow animation */
    @keyframes flow-horizontal {
      0% { left: -192px; }
      100% { left: 100%; }
    }
    @keyframes flow-vertical {
      0% { top: -192px; }
      100% { top: 100%; }
    }
    .glowing-track-h {
      position: absolute;
      top: 0;
      bottom: 0;
      left: -192px;
      width: 192px;
      background: linear-gradient(to right, transparent, #f59e0b, transparent);
      animation: flow-horizontal 4s linear infinite;
    }
    .glowing-track-v {
      position: absolute;
      left: 0;
      right: 0;
      top: -192px;
      height: 192px;
      background: linear-gradient(to bottom, transparent, #f59e0b, transparent);
      animation: flow-vertical 4s linear infinite;
    }
  </style>
</head>
<body class="bg-zinc-950 text-zinc-100 min-h-screen relative selection:bg-amber-500 selection:text-zinc-950 overflow-x-hidden">

  <!-- Background layer representation -->
  ${finalPageBgBase64 ? `
  <div class="absolute inset-0 bg-cover bg-center pointer-events-none transition-all duration-300 ${pageBgParallax ? 'bg-fixed' : 'bg-scroll'}"
       style="background-image: url('${finalPageBgBase64}'); opacity: ${pageBgOpacity / 100}; z-index: -1;">
  </div>
  ` : ''}

  <!-- ============================== NAVBAR ============================== -->
  <header class="sticky top-0 z-40 backdrop-blur-md border-b border-white/5 bg-zinc-950/90 transition-colors">
    <div class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
      <a href="#" class="flex items-center gap-2.5 group">
        <span class="w-7 h-7 rounded-lg bg-gradient-to-tr from-amber-600 to-amber-400 text-zinc-950 flex items-center justify-center font-bold text-sm shadow-md shadow-amber-500/10">
          ${nav.logoMark}
        </span>
        <span class="font-extrabold text-lg tracking-tight hover:text-amber-400 transition-colors">
          ${nav.logoName}
        </span>
      </a>
      
      <nav class="hidden md:flex items-center gap-8">
        ${nav.links.map(link => `
          <a href="${link.href}" class="text-xs uppercase font-semibold tracking-wider text-zinc-400 hover:text-white transition-colors">
            ${link.text}
          </a>
        `).join('')}
      </nav>

      <a href="${waLink}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-extrabold uppercase tracking-wider text-zinc-950 bg-gradient-to-r from-emerald-400 to-emerald-500 hover:brightness-105 active:scale-95 transition-all shadow-lg shadow-emerald-500/15">
        ${renderIconSvg('phone', 'w-[13px] h-[13px]')}
        <span>${hero.btnWaText}</span>
      </a>
    </div>
  </header>

  <!-- ============================== HERO ============================== -->
  <section class="relative pt-10 pb-12 md:pt-12 md:pb-16 overflow-hidden">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-center">
      
      <!-- Hero Left Content -->
      <div class="md:col-span-6 space-y-6 relative z-10 text-left">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-amber-400 text-[10px] uppercase font-mono tracking-widest">
          <span class="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
          <span>${hero.eyebrow}</span>
        </div>

        <h1 class="text-[34px] sm:text-[44px] lg:text-[81px] font-black tracking-tight leading-[1.05] text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-500 pr-3 pb-1 max-w-[280px] sm:max-w-[400px] lg:max-w-[540px]">
          ${hero.title.replace(/\n/g, '<br>')}
        </h1>

        <p class="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-lg">
          ${hero.subtitle.replace(/\n/g, '<br>')}
        </p>

        <div class="flex flex-wrap items-center gap-4 pt-2">
          <a href="${waLink}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-zinc-950 bg-gradient-to-r from-emerald-400 to-emerald-500 hover:brightness-105 active:scale-95 transition-all shadow-lg shadow-emerald-500/10">
            ${renderIconSvg('phone', 'w-3.5 h-3.5')}
            <span>${hero.btnWaText}</span>
          </a>

          <a href="${hero.btnSecHref}" class="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white border border-white/10 hover:border-white/30 hover:bg-white/5 active:scale-95 transition-all">
            <span>${hero.btnSecText}</span>
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </a>
        </div>
      </div>

      <!-- Hero Right Media Portrait -->
      <div class="md:col-span-6 relative flex justify-center md:justify-end md:self-end">
        <div class="relative w-full max-w-[533px] flex flex-col items-center justify-end md:-mb-16 -mb-14 z-10">
          ${portraitMediaHtml}

          <!-- Decorative sparkles overlay -->
          <div class="absolute top-6 right-6 w-12 h-12 rounded-full border border-amber-500/20 flex items-center justify-center text-amber-500/40 pointer-events-none z-10">
            <svg class="w-[18px] h-[18px] fill-currentColor" viewBox="0 0 24 24"><path d="M12 0l1.6 8.4L22 12l-8.4 1.6L12 24l-1.6-8.4L2 12l8.4-1.6z"/></svg>
          </div>

          <!-- Float Name Card Overlay -->
          <div class="absolute bottom-16 sm:bottom-20 right-4 sm:-right-4 text-right space-y-1 bg-zinc-950/80 p-3 rounded-2xl border border-white/10 backdrop-blur-sm shadow-2xl z-20 pointer-events-none max-w-[240px]">
            <span class="text-[9px] uppercase font-mono tracking-widest text-zinc-400 block">${hero.namecardTitle}</span>
            <span class="text-base sm:text-lg font-black tracking-tight text-zinc-100 block">${hero.namecardName}</span>
            <span class="text-[9px] uppercase font-bold tracking-widest text-amber-500 block">${hero.namecardCreci}</span>
          </div>
        </div>
      </div>

    </div>
  </section>

  <!-- ============================== STATS SECTION ============================== -->
  <section class="relative z-20 px-0 sm:px-6 -mt-4" id="credenciais">
    <div class="max-w-6xl mx-auto">
      <div class="relative rounded-none sm:rounded-[32px] border-y sm:border border-white/5 shadow-2xl bg-gradient-to-b from-zinc-900 via-zinc-950 to-zinc-950 p-6 sm:p-8 flex flex-col items-center justify-center w-full">
        <div class="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          ${stats.map(stat => `
            <div class="flex items-center gap-3 sm:gap-4 p-4 sm:p-5 lg:p-4 xl:p-5 rounded-2xl bg-zinc-900/40 border border-white/5 hover:border-white/10 hover:bg-zinc-900/60 transition-all duration-300 shadow-md group/stat">
              <div class="flex-shrink-0 w-12 h-12 lg:w-14 lg:h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-600/5 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-lg shadow-amber-500/5 group-hover/stat:from-amber-500/30 group-hover/stat:border-amber-500/50 transition-all duration-300">
                ${renderIconSvg(stat.icon, 'w-6 h-6')}
              </div>
              <div class="flex-1 min-w-0 flex flex-col justify-center">
                <div class="text-xl sm:text-2xl lg:text-xl xl:text-3xl font-black tracking-tight text-white leading-none whitespace-nowrap overflow-hidden text-ellipsis">
                  ${stat.value}
                </div>
                <div class="text-[9px] sm:text-[10px] font-bold text-amber-400 uppercase tracking-widest mt-1 sm:mt-1.5 leading-snug break-words">
                  ${stat.label}
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  </section>

  <!-- ============================== SPECIALTIES ============================== -->
  <section class="py-20 px-6" id="especialidades">
    <div class="max-w-6xl mx-auto space-y-12">
      
      <div class="text-center md:text-left space-y-2 max-w-4xl">
        <span class="text-xs font-mono uppercase tracking-widest text-amber-500">${specialties.subtitle}</span>
        <h2 class="text-2xl sm:text-4xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-500">
          ${specialties.title}
        </h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        ${specialtiesHtml}
      </div>

    </div>
  </section>

  <!-- ============================== INTERMEDIATE CALL TO ACTION BAND ============================== -->
  <section class="px-6 py-6">
    <div class="max-w-6xl mx-auto">
      <div class="flex flex-col md:flex-row items-center justify-between gap-6 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-zinc-900 to-zinc-950 border border-white/5 shadow-xl text-left">
        <div class="space-y-1.5">
          <h3 class="text-lg sm:text-xl font-bold text-zinc-100 flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            ${intCta.title}
          </h3>
          <p class="text-xs text-zinc-400">
            ${intCta.description}
          </p>
        </div>
        <a href="${waLink}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-zinc-950 bg-gradient-to-r from-emerald-400 to-emerald-500 hover:brightness-105 active:scale-95 transition-all">
          ${renderIconSvg('phone', 'w-[13px] h-[13px]')}
          <span>${intCta.btnText}</span>
        </a>
      </div>
    </div>
  </section>

  <!-- ============================== ADVANTAGES & CREDENTIALS ============================== -->
  <section class="py-12 sm:py-14 px-6" id="sobre">
    <div class="max-w-6xl mx-auto space-y-8">
      
      <div class="text-center md:text-left space-y-1.5 max-w-4xl">
        <span class="text-[11px] font-mono uppercase tracking-widest text-amber-500">${advantages.subtitle}</span>
        <h2 class="text-2xl sm:text-4xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-500">
          ${advantages.title}
        </h2>
      </div>

      <!-- Credentials Chips Panel -->
      <div class="p-4 sm:p-5 rounded-3xl bg-zinc-900 border border-white/5 text-left space-y-4">
        <span class="text-[9px] uppercase font-mono tracking-widest text-amber-500 block">${credentials.title}</span>
        <div class="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
          ${credentials.chips.map(chip => `
            <div class="p-2 sm:p-3 rounded-2xl bg-zinc-950 border border-white/5 text-center space-y-0.5 hover:border-amber-500/20 transition-colors flex flex-col justify-center">
              <b class="text-sm sm:text-base font-black tracking-tight text-white block leading-tight">${chip.value}</b>
              <span class="text-[8px] font-semibold text-zinc-500 uppercase tracking-wider block leading-none">${chip.label}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Symmetric Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
        
        <!-- Left Grid: Advantages -->
        <div class="lg:col-span-6 p-5 sm:p-6 rounded-3xl bg-zinc-900 border border-white/5 flex flex-col justify-center">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5 sm:gap-y-6 text-left">
            ${advantages.items.map(item => `
              <div class="flex gap-3 group">
                <div class="w-9 h-9 rounded-xl bg-zinc-950 border border-white/5 flex items-center justify-center text-amber-500 group-hover:border-amber-500/30 transition-colors shrink-0">
                  ${renderIconSvg(item.icon, 'w-4 h-4')}
                </div>
                <div class="space-y-1">
                  <h4 class="text-xs sm:text-sm font-bold uppercase tracking-wider text-zinc-200">${item.title}</h4>
                  <p class="text-xs text-zinc-400 leading-relaxed">${item.description}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Right Side: Region Map Panel -->
        <div class="lg:col-span-6 p-5 sm:p-6 rounded-3xl bg-zinc-900 border border-white/5 text-left flex flex-col justify-between gap-4">
          <div class="space-y-3 flex-1 flex flex-col justify-center">
            <span class="text-[9px] uppercase font-mono tracking-widest text-amber-500 block">${region.title}</span>

            <!-- Stylized Map SVG -->
            <div class="rounded-2xl overflow-hidden border border-white/5 bg-zinc-950/80 my-2">
              <svg viewBox="0 0 320 120" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
                <rect width="320" height="120" fill="#0c0d0f" />
                <path d="M0 35 Q90 25 150 50 T320 55 L320 120 L0 120 Z" fill="#14171c" />
                <path d="M195 0 C220 35 210 80 240 120 L320 120 L320 0 Z" fill="#0f2026" />
                <path d="M195 0 C220 35 210 80 240 120" fill="none" stroke="#2c444e" stroke-width="1.5" />
                <circle cx="170" cy="48" r="12" fill="none" stroke="#c9a24b" stroke-width="1.2" opacity="0.4" />
                <circle cx="170" cy="48" r="4" fill="#c9a24b" />
                <text x="120" y="40" fill="#5e6167" font-family="monospace" font-size="8" letter-spacing="1">ZONA NORTE</text>
                <text x="250" y="108" fill="#2d4047" font-family="monospace" font-size="8">OCEANO</text>
              </svg>
            </div>

            <p class="text-xs text-zinc-400 leading-relaxed">${region.description}</p>
          </div>
        </div>

      </div>

    </div>
  </section>

  <!-- ============================== PROCESS SECTION ============================== -->
  <section class="py-10 sm:py-12 px-6 bg-zinc-900/40 border-y border-white/5" id="processo">
    <div class="max-w-6xl mx-auto space-y-6">
      
      <div class="text-center md:text-left space-y-1.5 max-w-4xl">
        <span class="text-xs font-mono uppercase tracking-widest text-amber-500">${process.subtitle}</span>
        <h2 class="text-2xl sm:text-4xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-500">
          ${process.title}
        </h2>
      </div>

      <div class="relative">
        <!-- Horizontal timeline track for large screens -->
        <div class="absolute top-[40px] left-[12%] right-[12%] h-[2px] bg-zinc-800/80 hidden lg:block overflow-hidden z-0">
          <div class="glowing-track-h"></div>
        </div>

        <!-- Vertical timeline track for mobile screens -->
        <div class="absolute left-[39px] top-[40px] bottom-[40px] w-[2px] bg-zinc-800/80 lg:hidden block overflow-hidden z-0">
          <div class="glowing-track-v"></div>
        </div>

        <!-- Steps Container -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10 text-left">
          ${process.items.map((item, idx) => `
            <div class="fade-in-on-scroll relative flex flex-row lg:flex-col items-start lg:items-center group gap-4 lg:gap-0" data-delay="${idx * 0.2}s">
              <!-- Step Node Icon sitting on the track -->
              <div class="relative mb-0 lg:mb-3 z-10 shrink-0">
                <div class="absolute -inset-1.5 bg-amber-500/10 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div class="relative w-20 h-20 rounded-full bg-zinc-950 border-2 border-zinc-800 flex items-center justify-center text-amber-500 group-hover:border-amber-500/50 group-hover:text-amber-400 transition-all duration-300 shadow-xl">
                  ${renderIconSvg(item.icon, 'w-9 h-9')}
                  <span class="absolute -top-1.5 -right-1.5 px-2 py-0.5 rounded-full bg-amber-500 text-[10px] font-mono font-bold text-zinc-950 shadow-md">
                    ${item.num}
                  </span>
                </div>
              </div>

              <!-- Card content container -->
              <div class="w-full p-4 sm:p-5 rounded-2xl bg-zinc-900/65 border border-white/5 hover:border-amber-500/20 hover:bg-zinc-900/90 hover:shadow-lg hover:shadow-amber-500/5 transition-all duration-300 relative">
                <h4 class="text-xs sm:text-sm font-bold uppercase tracking-wider text-zinc-200 mb-2 group-hover:text-amber-400 transition-colors">
                  ${item.title}
                </h4>
                <p class="text-xs text-zinc-400 leading-relaxed">
                  ${item.description}
                </p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

    </div>
  </section>

  <!-- ============================== TESTIMONIALS ============================== -->
  <section class="py-20 px-6">
    <div class="max-w-6xl mx-auto space-y-12">
      
      <div class="text-center md:text-left space-y-2 max-w-4xl">
        <span class="text-xs font-mono uppercase tracking-widest text-amber-500">${testimonials.subtitle}</span>
        <h2 class="text-2xl sm:text-4xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-500">
          ${testimonials.title}
        </h2>
      </div>

      <!-- Infinite scrolling marquee for testimonials -->
      <div class="relative w-full overflow-hidden py-4 -my-4" style="mask-image: linear-gradient(to right, transparent, white 10%, white 90%, transparent); -webkit-mask-image: linear-gradient(to right, transparent, white 10%, white 90%, transparent);">
        <div class="animate-marquee gap-6 flex">
          ${testimonialsSingleListHtml}
          ${testimonialsSingleListHtml}
          ${testimonialsSingleListHtml}
        </div>
      </div>

    </div>
  </section>

  <!-- ============================== FAQ ============================== -->
  <section class="py-20 px-6 bg-zinc-900/20 border-t border-white/5" id="faq">
    <div class="max-w-4xl mx-auto space-y-12 text-left">
      
      <div class="text-center md:text-left space-y-2">
        <span class="text-xs font-mono uppercase tracking-widest text-amber-500">${faq.subtitle}</span>
        <h2 class="text-2xl sm:text-4xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-500">
          ${faq.title}
        </h2>
      </div>

      <div class="space-y-4">
        ${faq.items.map((item, idx) => `
          <details class="group border-b border-white/5 pb-4 [&_summary::-webkit-details-marker]:hidden" ${idx === 0 ? 'open' : ''}>
            <summary class="flex items-center justify-between gap-4 cursor-pointer py-3.5 select-none hover:text-amber-400 transition-colors">
              <span class="font-semibold text-sm sm:text-base text-zinc-100 group-hover:text-amber-300">
                ${item.question}
              </span>
              <span class="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-amber-500 group-open:rotate-45 transition-transform shrink-0">
                <svg class="w-3.5 h-3.5 plus-icon" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" /></svg>
              </span>
            </summary>
            <p class="text-xs sm:text-sm text-zinc-400 leading-relaxed pr-6 mt-1 whitespace-pre-line">
              ${item.answer}
            </p>
          </details>
        `).join('')}
      </div>

    </div>
  </section>

  <!-- ============================== FINAL CALL TO ACTION ============================== -->
  <section class="py-20 px-6" id="contato">
    <div class="max-w-6xl mx-auto">
      <div class="relative overflow-hidden rounded-[32px] border border-white/5 bg-gradient-to-tr from-zinc-950 via-zinc-900 to-zinc-950 p-8 sm:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        <!-- Ambient Shine background effect -->
        <div class="absolute inset-y-0 -left-[10%] w-[50%] bg-gradient-to-r from-amber-500/5 via-transparent to-transparent pointer-events-none filter blur-2xl"></div>

        <!-- Left Col -->
        <div class="lg:col-span-7 space-y-6 text-left relative z-10">
          <h2 class="text-3xl sm:text-4xl lg:text-[46px] font-black tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-500">
            ${cta.title.replace(/\n/g, '<br>')}
          </h2>
          <p class="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-lg">
            ${cta.description.replace(/\n/g, '<br>')}
          </p>
        </div>

        <!-- Right Col Contacts list -->
        <div class="lg:col-span-5 space-y-6 relative z-10 text-left">
          <a href="${waLink}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-xs sm:text-sm font-bold uppercase tracking-wider text-zinc-950 bg-gradient-to-r from-emerald-400 to-emerald-500 hover:brightness-105 active:scale-95 transition-all shadow-lg shadow-emerald-500/10 w-full sm:w-auto justify-center">
            ${renderIconSvg('phone', 'w-4 h-4')}
            <span>${cta.btnText}</span>
          </a>

          <div class="space-y-4 border-t border-white/5 pt-6">
            <div class="flex gap-3 text-zinc-400">
              ${renderIconSvg('mappin', 'text-amber-500 shrink-0 w-4 h-4')}
              <span class="text-xs">${cta.contacts.address}</span>
            </div>
            <div class="flex gap-3 text-zinc-400">
              ${renderIconSvg('phone', 'text-amber-500 shrink-0 w-4 h-4')}
              <span class="text-xs">${cta.contacts.phone}</span>
            </div>
            <div class="flex gap-3 text-zinc-400">
              ${renderIconSvg('award', 'text-amber-500 shrink-0 w-4 h-4')}
              <span class="text-xs">${cta.contacts.creci}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- ============================== FOOTER ============================== -->
  <footer class="pt-16 pb-12 px-6 border-t border-white/5 bg-zinc-950/80">
    <div class="max-w-6xl mx-auto space-y-12">
      
      <div class="grid grid-cols-1 md:grid-cols-12 gap-8 text-left">
        <!-- Column 1: Brand -->
        <div class="md:col-span-4 space-y-4">
          <a href="#" class="flex items-center gap-2">
            <span class="w-6 h-6 rounded-md bg-amber-500 text-zinc-950 flex items-center justify-center font-bold text-xs shadow-md">
              ${nav.logoMark}
            </span>
            <span class="font-extrabold text-base tracking-tight text-white">
              ${nav.logoName}
            </span>
          </a>
          <p class="text-xs text-zinc-400 leading-relaxed max-w-sm">
            ${footer.description.replace(/\n/g, '<br>')}
          </p>
        </div>

        <!-- Column 2: Credentials -->
        <div class="md:col-span-4 space-y-3">
          <h6 class="text-[10px] font-mono uppercase tracking-widest text-amber-500">
            ${footer.credentialsTitle}
          </h6>
          <p class="text-xs text-zinc-400 leading-relaxed">
            ${footer.credentialsItems.join(' · ')}
          </p>
        </div>

        <!-- Column 3: Address -->
        <div class="md:col-span-4 space-y-3">
          <h6 class="text-[10px] font-mono uppercase tracking-widest text-amber-500">
            ${footer.addressTitle}
          </h6>
          <p class="text-xs text-zinc-400 leading-relaxed">
            ${footer.addressItems.join(' · ')}
          </p>
        </div>
      </div>

      <div class="flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-white/5 pt-8">
        <div class="text-[11px] text-zinc-500">
          ${footer.copyright}
        </div>

        <div class="flex items-center gap-6">
          ${footer.policyLinks.map(link => `
            <a href="${link.href}" class="text-[11px] text-zinc-500 hover:text-zinc-300 transition-colors">
              ${link.text}
            </a>
          `).join('')}
          <a href="${footer.instagramUrl}" target="_blank" rel="noopener noreferrer" aria-label="Instagram" class="text-zinc-500 hover:text-amber-500 transition-colors">
            ${renderIconSvg('instagram', 'w-3.5 h-3.5')}
          </a>
          <a href="${waLink}" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" class="text-zinc-500 hover:text-emerald-500 transition-colors">
            ${renderIconSvg('whatsapp', 'w-3.5 h-3.5')}
          </a>
        </div>
      </div>

    </div>
  </footer>

  <!-- Floating WhatsApp Action -->
  <a href="${waLink}" target="_blank" rel="noopener" class="fixed right-5 bottom-[22px] z-[150] w-14 h-14 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 hover:brightness-105 active:scale-95 transition-all" aria-label="Falar no WhatsApp">
    ${renderIconSvg('whatsapp', 'w-7 h-7')}
  </a>

  ${includeEditor ? `
  <div style="background: rgba(0,0,0,0.8); color: #fff; padding: 10px; position: fixed; bottom: 0; left: 0; right: 0; text-align: center; font-family: sans-serif; font-size: 13px; z-index: 9999;">
    Esta é uma versão estática exportada. O painel do editor foi removido.
  </div>` : ''}

  <!-- Script to dynamically scale the Portrait on different devices and trigger animations -->
  <script>
    function adjustHeroImage() {
      const wrapper = document.querySelector('.portrait-wrapper');
      if (!wrapper) return;
      const img = wrapper.querySelector('.portrait-img');
      const container = wrapper.parentElement;
      if (!container) return;
      
      const targetWidth = parseInt(wrapper.getAttribute('data-width') || '533', 10);
      const containerWidth = container.getBoundingClientRect().width;
      const scaleFactor = containerWidth > 0 ? Math.min(1, containerWidth / targetWidth) : 1;
      
      if (img) {
        const tx = parseFloat(wrapper.getAttribute('data-tx') || '0') * scaleFactor;
        const ty = parseFloat(wrapper.getAttribute('data-ty') || '0') * scaleFactor;
        const baseScale = parseFloat(wrapper.getAttribute('data-scale') || '1.25');
        const isHeroMont = ${isHeroMont};
        const scale = isHeroMont ? baseScale * 1.25 : baseScale;
        const rotation = parseFloat(wrapper.getAttribute('data-rotation') || '0');
        
        img.style.transform = 'translate(' + tx + 'px, ' + ty + 'px) scale(' + scale + ') rotate(' + rotation + 'deg)';
      }
    }
    
    window.addEventListener('resize', adjustHeroImage);
    window.addEventListener('DOMContentLoaded', adjustHeroImage);
    setTimeout(adjustHeroImage, 50);

    // Intersection Observer for scroll entrance animations
    document.addEventListener('DOMContentLoaded', () => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = entry.target.getAttribute('data-delay') || '0s';
            entry.target.style.transitionDelay = delay;
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.05,
        rootMargin: '-50px'
      });

      document.querySelectorAll('.fade-in-on-scroll').forEach((el) => {
        observer.observe(el);
      });
    });
  </script>

</body>
</html>`;

  // Trigger HTML download
  const blob = new Blob([fullHtml], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'landing-page-rodrigo-sansao.html';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

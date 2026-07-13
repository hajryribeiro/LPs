import React from 'react';
import * as Lucide from 'lucide-react';
import { motion } from 'motion/react';
import { LandingPageData } from '../types';
import EditableText from './EditableText';
import EditableImage from './EditableImage';

interface LandingPageProps {
  data: LandingPageData;
  onChange: (newData: LandingPageData) => void;
  isEditMode: boolean;
  onOpenSidebar: (tab: string) => void;
}

// Helper to resolve Lucide icons dynamically
const DynamicIcon = ({ name, className = '', size = 20 }: { name: string; className?: string; size?: number; key?: any }) => {
  const IconComponent = (Lucide as any)[name] || Lucide.HelpCircle;
  return <IconComponent className={className} size={size} />;
};

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

export default function LandingPage({ data, onChange, isEditMode, onOpenSidebar }: LandingPageProps) {
  const { theme, nav, hero, stats, specialties, advantages, credentials, region, process, testimonials, faq, cta, intermediateCta, footer, waNumber, waMessage, pageBgUrl, pageBgOpacity = 5, pageBgParallax = true } = data;
  const [showPageBgCtrl, setShowPageBgCtrl] = React.useState(false);

  const safeIntermediateCta = {
    title: "Deseja consultar oportunidades disponíveis agora?",
    description: "Acesse o catálogo atualizado com as melhores taxas de rentabilidade de flats e apartamentos residenciais.",
    btnText: "Falar agora",
    ...(intermediateCta || {})
  };

  const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`;

  // Multi-field update helpers
  const handleNavChange = (field: 'logoMark' | 'logoName', value: string) => {
    onChange({ ...data, nav: { ...nav, [field]: value } });
  };

  const handleImageStyleChange = (id: string, styles: any) => {
    onChange({
      ...data,
      imageStyles: {
        ...(data.imageStyles || {}),
        [id]: styles
      }
    });
  };

  const handleSpecialtyBgChange = (id: string, bgType: 'build' | 'sea' | 'chart' | 'custom') => {
    const updated = specialties.items.map(item => {
      if (item.id === id) {
        return {
          ...item,
          bgType,
          imageUrl: item.imageUrl || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600'
        };
      }
      return item;
    });
    onChange({ ...data, specialties: { ...specialties, items: updated } });
  };

  const handleSpecialtyImageChange = (id: string, imageUrl: string) => {
    const updated = specialties.items.map(item => {
      if (item.id === id) return { ...item, imageUrl };
      return item;
    });
    onChange({ ...data, specialties: { ...specialties, items: updated } });
  };

  const handleMoveSpecialty = (index: number, direction: 'left' | 'right') => {
    const items = [...specialties.items];
    const targetIndex = direction === 'left' ? index - 1 : index + 1;
    if (targetIndex >= 0 && targetIndex < items.length) {
      const temp = items[index];
      items[index] = items[targetIndex];
      items[targetIndex] = temp;
      onChange({ ...data, specialties: { ...specialties, items } });
    }
  };

  const handleHeroChange = (field: keyof typeof hero, value: string) => {
    onChange({ ...data, hero: { ...hero, [field]: value } });
  };

  const handleStatChange = (id: string, field: 'value' | 'label', value: string) => {
    const updated = stats.map(item => {
      if (item.id === id) return { ...item, [field]: value };
      return item;
    });
    onChange({ ...data, stats: updated });
  };

  const handleSpecialtyChange = (id: string, field: 'title' | 'description' | 'tag', value: string) => {
    const updated = specialties.items.map(item => {
      if (item.id === id) return { ...item, [field]: value };
      return item;
    });
    onChange({ ...data, specialties: { ...specialties, items: updated } });
  };

  const handleAdvantageChange = (id: string, field: 'title' | 'description', value: string) => {
    const updated = advantages.items.map(item => {
      if (item.id === id) return { ...item, [field]: value };
      return item;
    });
    onChange({ ...data, advantages: { ...advantages, items: updated } });
  };

  const handleCredentialChange = (id: string, field: 'value' | 'label', value: string) => {
    const updated = credentials.chips.map(item => {
      if (item.id === id) return { ...item, [field]: value };
      return item;
    });
    onChange({ ...data, credentials: { ...credentials, chips: updated } });
  };

  const handleProcessChange = (id: string, field: 'title' | 'description', value: string) => {
    const updated = process.items.map(item => {
      if (item.id === id) return { ...item, [field]: value };
      return item;
    });
    onChange({ ...data, process: { ...process, items: updated } });
  };

  const handleTestimonialChange = (id: string, field: 'quote' | 'name' | 'sub' | 'avatarUrl', value: string) => {
    const updated = testimonials.items.map(item => {
      if (item.id === id) return { ...item, [field]: value };
      return item;
    });
    onChange({ ...data, testimonials: { ...testimonials, items: updated } });
  };

  const handleFaqChange = (id: string, field: 'question' | 'answer', value: string) => {
    const updated = faq.items.map(item => {
      if (item.id === id) return { ...item, [field]: value };
      return item;
    });
    onChange({ ...data, faq: { ...faq, items: updated } });
  };

  const handleCtaChange = (field: 'title' | 'description' | 'btnText', value: string) => {
    onChange({ ...data, cta: { ...cta, [field]: value } });
  };

  const handleCtaContactChange = (field: 'address' | 'phone' | 'creci', value: string) => {
    const updatedCta = {
      ...cta,
      contacts: {
        ...cta.contacts,
        [field]: value
      }
    };
    
    const updatedFooter = { ...footer };
    if (field === 'address') {
      updatedFooter.addressItems = [...(footer.addressItems || [])];
      updatedFooter.addressItems[0] = value;
    }
    if (field === 'creci') {
      updatedFooter.credentialsItems = [...(footer.credentialsItems || [])];
      const cleanVal = value.toUpperCase().includes('CRECI') ? value : `CRECI-PB ${value.replace(/\D/g, '')}`;
      updatedFooter.credentialsItems[2] = cleanVal;
    }

    onChange({
      ...data,
      cta: updatedCta,
      footer: updatedFooter
    });
  };

  const handleIntermediateCtaChange = (field: 'title' | 'description' | 'btnText', value: string) => {
    onChange({
      ...data,
      intermediateCta: {
        ...safeIntermediateCta,
        [field]: value
      }
    });
  };

  const handleFooterChange = (field: 'description' | 'copyright', value: string) => {
    onChange({ ...data, footer: { ...footer, [field]: value } });
  };

  return (
    <div
      style={{
        '--bg': theme.bg,
        '--bg-soft': theme.bgSoft,
        '--card': theme.card,
        '--card-2': theme.card2,
        '--text': theme.text,
        '--muted': theme.muted,
        '--muted-2': theme.muted2,
        '--gold': theme.gold,
        '--gold-soft': theme.goldSoft,
        '--wa': theme.wa,
        '--wa-dark': theme.waDark,
        color: theme.text,
      } as React.CSSProperties}
      className="min-h-screen font-sans selection:bg-amber-500/20 selection:text-amber-200 relative overflow-x-hidden isolate"
    >
      {/* Background Color Layer at the absolute bottom */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundColor: theme.bg, zIndex: -2 }}
      />

      {/* Background Image Layer for the entire page */}
      {pageBgUrl && (
        <div 
          className={`absolute inset-0 bg-cover bg-center pointer-events-none transition-all duration-300 ${pageBgParallax ? 'bg-fixed' : 'bg-scroll'}`}
          style={{ 
            backgroundImage: `url(${pageBgUrl.startsWith('/') && !pageBgUrl.startsWith('//') && !pageBgUrl.startsWith('data:') ? pageBgUrl.substring(1) : pageBgUrl})`,
            opacity: pageBgOpacity / 100,
            zIndex: -1
          }}
        />
      )}

      {/* Floating page background editor controls (only in edit mode) */}
      {isEditMode && (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowPageBgCtrl(!showPageBgCtrl);
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-zinc-900/95 border border-amber-500/30 text-xs font-bold text-amber-400 hover:text-white hover:bg-zinc-800 transition-all shadow-xl hover:shadow-amber-500/10 backdrop-blur-sm"
            title="Ajustar Fundo da Página"
          >
            <Lucide.Sliders size={14} className="text-amber-500" />
            <span>Fundo da Página</span>
            <Lucide.ChevronDown size={12} className={`transition-transform duration-200 ${showPageBgCtrl ? 'rotate-180' : ''}`} />
          </button>

          {showPageBgCtrl && (
            <div 
              onClick={(e) => e.stopPropagation()}
              className="absolute right-0 bottom-12 mb-2 w-72 p-4 rounded-2xl bg-zinc-950 border border-white/10 shadow-2xl text-left space-y-4 text-xs text-zinc-300 backdrop-blur-md animate-in fade-in slide-in-from-bottom-2 duration-150"
            >
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <span className="font-bold text-zinc-100 flex items-center gap-1.5">
                  <Lucide.Image size={14} className="text-amber-500" />
                  Fundo da Página
                </span>
                <button 
                  onClick={() => setShowPageBgCtrl(false)}
                  className="text-zinc-500 hover:text-zinc-300 p-0.5 rounded"
                >
                  <Lucide.X size={14} />
                </button>
              </div>

              {/* Pre-selected options */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-amber-500 uppercase tracking-wider block">Foto de Fundo</label>
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    onClick={() => onChange({ ...data, pageBgUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200' })}
                    className={`p-1 rounded border text-[10px] text-center truncate ${pageBgUrl?.includes('photo-1600596542815') ? 'border-amber-500 bg-amber-500/10 text-white' : 'border-white/5 hover:border-white/20 bg-zinc-900/50'}`}
                  >
                    Mansão
                  </button>
                  <button
                    onClick={() => onChange({ ...data, pageBgUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1200' })}
                    className={`p-1 rounded border text-[10px] text-center truncate ${pageBgUrl?.includes('photo-1545324418') ? 'border-amber-500 bg-amber-500/10 text-white' : 'border-white/5 hover:border-white/20 bg-zinc-900/50'}`}
                  >
                    Prédios
                  </button>
                  <button
                    onClick={() => onChange({ ...data, pageBgUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1200' })}
                    className={`p-1 rounded border text-[10px] text-center truncate ${pageBgUrl?.includes('photo-1507525428034') ? 'border-amber-500 bg-amber-500/10 text-white' : 'border-white/5 hover:border-white/20 bg-zinc-900/50'}`}
                  >
                    Praia
                  </button>
                </div>
              </div>

              {/* URL Input */}
              <div className="space-y-1">
                <label className="text-[10px] font-mono text-amber-500 uppercase tracking-wider block">URL da Imagem</label>
                <div className="flex gap-1.5">
                  <input
                    type="text"
                    value={pageBgUrl || ''}
                    placeholder="https://exemplo.com/foto.jpg"
                    onChange={(e) => onChange({ ...data, pageBgUrl: e.target.value })}
                    className="flex-1 px-2.5 py-1.5 rounded bg-zinc-900 border border-white/10 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500"
                  />
                  {pageBgUrl && (
                    <button
                      onClick={() => onChange({ ...data, pageBgUrl: '' })}
                      className="p-1.5 rounded bg-zinc-900 border border-white/10 text-red-400 hover:text-red-300 hover:border-red-500/30 transition-colors"
                      title="Remover fundo"
                    >
                      <Lucide.Trash2 size={13} />
                    </button>
                  )}
                </div>
              </div>

              {/* Upload File */}
              <div className="space-y-1">
                <label className="text-[10px] font-mono text-amber-500 uppercase tracking-wider block">Fazer Upload de Imagem</label>
                <label className="flex items-center justify-center gap-1.5 py-2 px-3 border border-dashed border-white/10 hover:border-white/30 rounded bg-zinc-900/30 hover:bg-zinc-900/50 cursor-pointer text-center text-xs font-semibold text-zinc-300 hover:text-white transition-all">
                  <Lucide.Upload size={13} className="text-amber-500" />
                  <span>Escolher Arquivo</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          if (typeof reader.result === 'string') {
                            onChange({ ...data, pageBgUrl: reader.result });
                          }
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </label>
              </div>

              {/* Opacity slider */}
              <div className="space-y-1">
                <div className="flex justify-between items-center text-[10px] font-mono text-amber-500 uppercase tracking-wider">
                  <span>Opacidade</span>
                  <span className="text-zinc-400">{pageBgOpacity}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={pageBgOpacity}
                  onChange={(e) => onChange({ ...data, pageBgOpacity: parseInt(e.target.value) })}
                  className="w-full accent-amber-500 h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Parallax Toggle */}
              <label className="flex items-center justify-between cursor-pointer py-1.5 select-none hover:text-white transition-colors">
                <div className="flex items-center gap-2">
                  <Lucide.Compass size={13} className="text-amber-500" />
                  <span className="text-xs">Efeito Parallax (Fundo Fixo)</span>
                </div>
                <div className="relative inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={pageBgParallax}
                    onChange={(e) => onChange({ ...data, pageBgParallax: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-8 h-4 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-zinc-400 after:border-zinc-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-amber-500 peer-checked:after:bg-zinc-950 peer-checked:after:border-amber-400"></div>
                </div>
              </label>

            </div>
          )}
        </div>
      )}
      
      {/* ============================== NAVBAR ============================== */}
      <header className="sticky top-0 z-40 backdrop-blur-md border-b border-white/5 bg-zinc-950/90 transition-colors">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5 group">
            <span className="w-7 h-7 rounded-lg bg-gradient-to-tr from-amber-600 to-amber-400 text-zinc-950 flex items-center justify-center font-bold text-sm shadow-md shadow-amber-500/10">
              <EditableText value={nav.logoMark} onChange={(v) => handleNavChange('logoMark', v)} isEditMode={isEditMode} />
            </span>
            <span className="font-extrabold text-lg tracking-tight hover:text-amber-400 transition-colors">
              <EditableText value={nav.logoName} onChange={(v) => handleNavChange('logoName', v)} isEditMode={isEditMode} />
            </span>
          </a>
          
          <nav className="hidden md:flex items-center gap-8">
            {nav.links.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className="text-xs uppercase font-semibold tracking-wider text-zinc-400 hover:text-white transition-colors"
              >
                {link.text}
              </a>
            ))}
          </nav>

          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-extrabold uppercase tracking-wider text-zinc-950 bg-gradient-to-r from-emerald-400 to-emerald-500 hover:brightness-105 active:scale-95 transition-all shadow-lg shadow-emerald-500/15"
          >
            <DynamicIcon name="Phone" size={13} className="fill-zinc-950" />
            <EditableText value={hero.btnWaText} onChange={(v) => handleHeroChange('btnWaText', v)} isEditMode={isEditMode} />
          </a>
        </div>
      </header>

      {/* ============================== HERO ============================== */}
      <section className="relative pt-10 pb-12 md:pt-12 md:pb-16 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-center">
          
          {/* Hero Left Content */}
          <div className="md:col-span-6 space-y-6 relative z-10 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-amber-400 text-[10px] uppercase font-mono tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              <EditableText value={hero.eyebrow} onChange={(v) => handleHeroChange('eyebrow', v)} isEditMode={isEditMode} />
            </div>

            <h1 className="text-[34px] sm:text-[44px] lg:text-[81px] font-black tracking-tight leading-[1.05] text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-500 pr-3 pb-1 max-w-[280px] sm:max-w-[400px] lg:max-w-[540px]">
              <EditableText value={hero.title} onChange={(v) => handleHeroChange('title', v)} isEditMode={isEditMode} multiline />
            </h1>

            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-lg">
              <EditableText value={hero.subtitle} onChange={(v) => handleHeroChange('subtitle', v)} isEditMode={isEditMode} multiline />
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-zinc-950 bg-gradient-to-r from-emerald-400 to-emerald-500 hover:brightness-105 active:scale-95 transition-all shadow-lg shadow-emerald-500/10"
              >
                <DynamicIcon name="Phone" size={14} />
                <EditableText value={hero.btnWaText} onChange={(v) => handleHeroChange('btnWaText', v)} isEditMode={isEditMode} />
              </a>

              <a
                href={hero.btnSecHref}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white border border-white/10 hover:border-white/30 hover:bg-white/5 active:scale-95 transition-all"
              >
                <EditableText value={hero.btnSecText} onChange={(v) => handleHeroChange('btnSecText', v)} isEditMode={isEditMode} />
                <DynamicIcon name="ArrowRight" size={14} />
              </a>
            </div>
          </div>

          {/* Hero Right Media Portrait */}
          <div className="md:col-span-6 relative flex justify-center md:justify-end md:self-end">
            <div className="relative w-full max-w-[533px] md:max-w-[533px] flex flex-col items-center justify-end md:-mb-16 -mb-14 z-10">
              <EditableImage
                id="hero"
                src={hero.imageUrl || ''}
                alt={hero.namecardName}
                isEditMode={isEditMode}
                onChangeSrc={(newSrc) => handleHeroChange('imageUrl', newSrc)}
                imageStyles={data.imageStyles}
                onChangeStyles={handleImageStyleChange}
                defaultStyles={{
                  width: 533,
                  height: 600,
                  mobileWidth: 380,
                  mobileHeight: 440,
                  scale: 1.25,
                  borderRadius: 0,
                  rotation: 0,
                  translateX: 0,
                  translateY: 0
                }}
              />

              {/* Decorative sparkles overlay (only on non-dragging) */}
              <div className="absolute top-6 right-6 w-12 h-12 rounded-full border border-amber-500/20 flex items-center justify-center text-amber-500/40 pointer-events-none z-10">
                <DynamicIcon name="Sparkles" size={18} />
              </div>

              {/* Float Name Card Overlay with semi-transparency for readability */}
              <div className="absolute bottom-16 sm:bottom-20 right-4 sm:-right-4 text-right space-y-1 bg-zinc-950/80 p-3 rounded-2xl border border-white/10 backdrop-blur-sm shadow-2xl z-20 pointer-events-none max-w-[240px]">
                <span className="text-[9px] uppercase font-mono tracking-widest text-zinc-400 block pointer-events-auto">
                  <EditableText value={hero.namecardTitle} onChange={(v) => handleHeroChange('namecardTitle', v)} isEditMode={isEditMode} />
                </span>
                <span className="text-base sm:text-lg font-black tracking-tight text-zinc-100 block pointer-events-auto">
                  <EditableText value={hero.namecardName} onChange={(v) => handleHeroChange('namecardName', v)} isEditMode={isEditMode} />
                </span>
                <span className="text-[9px] uppercase font-bold tracking-widest text-amber-500 block pointer-events-auto">
                  <EditableText value={hero.namecardCreci} onChange={(v) => handleHeroChange('namecardCreci', v)} isEditMode={isEditMode} />
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ============================== STATS SECTION ============================== */}
      <section className="relative z-20 px-0 sm:px-6 -mt-4" id="credenciais">
        <div className="max-w-6xl mx-auto">
          {/* Main Container without background image, clean dark design */}
          <div className="relative rounded-none sm:rounded-[32px] border-y sm:border border-white/5 shadow-2xl bg-gradient-to-b from-zinc-900 via-zinc-950 to-zinc-950 p-6 sm:p-8 flex flex-col items-center justify-center w-full">
            
            {/* Grid content container with icons on the left side */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {stats.map((stat) => (
                <div 
                  key={stat.id} 
                  className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5 lg:p-4 xl:p-5 rounded-2xl bg-zinc-900/40 border border-white/5 hover:border-white/10 hover:bg-zinc-900/60 transition-all duration-300 shadow-md group/stat"
                >
                  {/* Highlighted larger icon box */}
                  <div className="flex-shrink-0 w-12 h-12 lg:w-14 lg:h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-600/5 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-lg shadow-amber-500/5 group-hover/stat:from-amber-500/30 group-hover/stat:border-amber-500/50 transition-all duration-300">
                    <DynamicIcon name={stat.icon} size={24} />
                  </div>
                  
                  {/* Evidenced and emphasized text layout */}
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <div className="text-xl sm:text-2xl lg:text-xl xl:text-3xl font-black tracking-tight text-white leading-none whitespace-nowrap overflow-hidden text-ellipsis">
                      <EditableText 
                        value={stat.value} 
                        onChange={(v) => handleStatChange(stat.id, 'value', v)} 
                        isEditMode={isEditMode} 
                        className="whitespace-nowrap"
                      />
                    </div>
                    <div className="text-[9px] sm:text-[10px] font-bold text-amber-400 uppercase tracking-widest mt-1 sm:mt-1.5 leading-snug break-words">
                      <EditableText value={stat.label} onChange={(v) => handleStatChange(stat.id, 'label', v)} isEditMode={isEditMode} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ============================== SPECIALTIES ============================== */}
      <section className="py-20 px-6" id="especialidades">
        <div className="max-w-6xl mx-auto space-y-12">
          
          <div className="text-center md:text-left space-y-2 max-w-4xl">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-500">
              <EditableText value={specialties.subtitle} onChange={(v) => onChange({ ...data, specialties: { ...specialties, subtitle: v } })} isEditMode={isEditMode} />
            </span>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-500">
              <EditableText 
                value={specialties.title} 
                onChange={(v) => onChange({ ...data, specialties: { ...specialties, title: v } })} 
                isEditMode={isEditMode} 
                style={{ width: 'auto', fontSize: '38px', lineHeight: '41px' }}
              />
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {specialties.items.map((item, index) => {
              // Custom graphics depending on bgType
              let renderGraphic = null;
              if (item.bgType === 'build') {
                renderGraphic = (
                  <div className="absolute inset-0 grid grid-cols-5 gap-1.5 p-5 bg-gradient-to-br from-zinc-900 to-zinc-950 opacity-90 group-hover:opacity-100 transition-opacity">
                    {Array.from({ length: 15 }).map((_, i) => (
                      <div
                        key={i}
                        className={`aspect-square rounded-md transition-all duration-300 ${
                          i % 3 === 0 ? 'bg-zinc-800' : i % 4 === 0 ? 'bg-zinc-700/60' : 'bg-zinc-900'
                        } group-hover:scale-105`}
                      />
                    ))}
                  </div>
                );
              } else if (item.bgType === 'sea') {
                renderGraphic = (
                  <div className="absolute inset-0 bg-gradient-to-b from-zinc-800/80 via-zinc-900 to-zinc-950 opacity-90 group-hover:opacity-100 transition-opacity flex items-center justify-center overflow-hidden">
                    <div className="absolute right-[20%] top-[20%] w-12 h-12 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 opacity-20 filter blur-sm group-hover:scale-125 transition-transform duration-500" />
                    <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-zinc-950 to-transparent" />
                  </div>
                );
              } else if (item.bgType === 'chart') {
                renderGraphic = (
                  <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-zinc-950 p-5 flex flex-col justify-end opacity-90 group-hover:opacity-100 transition-opacity">
                    <div className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest mb-4">crescimento de mercado</div>
                    <div className="flex items-end gap-1.5 h-20">
                      {[30, 45, 40, 60, 55, 75, 100].map((h, i) => (
                        <div
                          key={i}
                          style={{ height: `${h}%` }}
                          className={`flex-1 rounded-sm transition-all duration-500 origin-bottom scale-y-90 group-hover:scale-y-100 ${
                            i === 6 ? 'bg-gradient-to-t from-amber-600 to-amber-400' : 'bg-zinc-800'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                );
              } else if (item.bgType === 'custom' || item.imageUrl) {
                renderGraphic = (
                  <EditableImage
                    id={`spec-${item.id}`}
                    src={item.imageUrl || getSpecialtyFallbackImage(item.id, index)}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full"
                    isEditMode={isEditMode}
                    onChangeSrc={(newSrc) => handleSpecialtyImageChange(item.id, newSrc)}
                    imageStyles={data.imageStyles}
                    onChangeStyles={handleImageStyleChange}
                    defaultStyles={{
                      width: 360,
                      height: 320,
                      scale: 1.05,
                      borderRadius: 24,
                      rotation: 0,
                      translateX: 0,
                      translateY: 0
                    }}
                  />
                );
              }
 
              return (
                <article
                  key={item.id}
                  className="relative group h-80 rounded-3xl overflow-hidden border border-white/5 bg-zinc-950 flex flex-col justify-end p-6 hover:border-amber-500/30 hover:shadow-[0_0_35px_rgba(245,158,11,0.08)] transition-all duration-500"
                >
                  {/* Background element with responsive scaling & high fidelity transition */}
                  <div className="absolute inset-0 z-0 opacity-65 group-hover:opacity-85 transition-all duration-1000 ease-out transform scale-100 group-hover:scale-108 filter group-hover:brightness-105">
                    {renderGraphic}
                  </div>

                  {/* Gradient cover that reacts elegantly to hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent z-10 pointer-events-none group-hover:from-zinc-950 group-hover:via-zinc-950/30 transition-all duration-500" />

                  {/* Quick Design & Position Control Panel (Visible in Edit Mode) */}
                  {isEditMode && (
                    <div className="absolute top-4 left-4 z-30 flex items-center gap-1 bg-zinc-950/95 px-2 py-1 rounded-full border border-white/10 backdrop-blur-md shadow-lg">
                      <button
                        title="Fundo de Prédios"
                        onClick={() => handleSpecialtyBgChange(item.id, 'build')}
                        className={`p-1 rounded-full transition-colors ${item.bgType === 'build' ? 'bg-amber-500 text-zinc-950' : 'text-zinc-400 hover:text-white'}`}
                      >
                        <Lucide.Building size={11} />
                      </button>
                      <button
                        title="Fundo de Sol/Mar"
                        onClick={() => handleSpecialtyBgChange(item.id, 'sea')}
                        className={`p-1 rounded-full transition-colors ${item.bgType === 'sea' ? 'bg-amber-500 text-zinc-950' : 'text-zinc-400 hover:text-white'}`}
                      >
                        <Lucide.Compass size={11} />
                      </button>
                      <button
                        title="Fundo de Gráfico"
                        onClick={() => handleSpecialtyBgChange(item.id, 'chart')}
                        className={`p-1 rounded-full transition-colors ${item.bgType === 'chart' ? 'bg-amber-500 text-zinc-950' : 'text-zinc-400 hover:text-white'}`}
                      >
                        <Lucide.TrendingUp size={11} />
                      </button>
                      <button
                        title="Foto Personalizada"
                        onClick={() => handleSpecialtyBgChange(item.id, 'custom')}
                        className={`p-1 rounded-full transition-colors ${item.bgType === 'custom' ? 'bg-amber-500 text-zinc-950' : 'text-zinc-400 hover:text-white'}`}
                      >
                        <Lucide.Image size={11} />
                      </button>
                      
                      <span className="w-[1px] h-3 bg-white/15 mx-0.5" />

                      <button
                        title="Mover p/ Esquerda"
                        disabled={index === 0}
                        onClick={() => handleMoveSpecialty(index, 'left')}
                        className="p-1 rounded-full text-zinc-400 hover:text-white disabled:opacity-20 disabled:pointer-events-none transition-colors"
                      >
                        <Lucide.ChevronLeft size={11} />
                      </button>
                      <button
                        title="Mover p/ Direita"
                        disabled={index === specialties.items.length - 1}
                        onClick={() => handleMoveSpecialty(index, 'right')}
                        className="p-1 rounded-full text-zinc-400 hover:text-white disabled:opacity-20 disabled:pointer-events-none transition-colors"
                      >
                        <Lucide.ChevronRight size={11} />
                      </button>
                    </div>
                  )}

                  {/* Content */}
                  <div className="relative z-20 space-y-2 text-left">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-amber-400 block">
                      <EditableText value={item.tag} onChange={(v) => handleSpecialtyChange(item.id, 'tag', v)} isEditMode={isEditMode} />
                    </span>
                    <h3 className="text-xl font-bold tracking-tight text-white block">
                      <EditableText value={item.title} onChange={(v) => handleSpecialtyChange(item.id, 'title', v)} isEditMode={isEditMode} />
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed block">
                      <EditableText value={item.description} onChange={(v) => handleSpecialtyChange(item.id, 'description', v)} isEditMode={isEditMode} multiline />
                    </p>
                  </div>
                </article>
              );
            })}
          </div>

        </div>
      </section>

      {/* ============================== INTERMEDIATE CALL TO ACTION BAND ============================== */}
      <section className="px-6 py-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-zinc-900 to-zinc-950 border border-white/5 shadow-xl text-left">
            <div className="space-y-1.5">
              <h3 className="text-lg sm:text-xl font-bold text-zinc-100 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <EditableText value={safeIntermediateCta.title} onChange={(v) => handleIntermediateCtaChange('title', v)} isEditMode={isEditMode} />
              </h3>
              <p className="text-xs text-zinc-400">
                <EditableText value={safeIntermediateCta.description} onChange={(v) => handleIntermediateCtaChange('description', v)} isEditMode={isEditMode} multiline />
              </p>
            </div>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-zinc-950 bg-gradient-to-r from-emerald-400 to-emerald-500 hover:brightness-105 active:scale-95 transition-all shrink-0 whitespace-nowrap"
            >
              <DynamicIcon name="Phone" size={13} />
              <EditableText value={safeIntermediateCta.btnText} onChange={(v) => handleIntermediateCtaChange('btnText', v)} isEditMode={isEditMode} />
            </a>
          </div>
        </div>
      </section>

      {/* ============================== ADVANTAGES & CREDENTIALS ============================== */}
      <section className="py-12 sm:py-14 px-6" id="sobre">
        <div className="max-w-6xl mx-auto space-y-8">
          
          <div className="text-center md:text-left space-y-1.5 max-w-4xl">
            <span className="text-[11px] font-mono uppercase tracking-widest text-amber-500">
              <EditableText value={advantages.subtitle} onChange={(v) => onChange({ ...data, advantages: { ...advantages, subtitle: v } })} isEditMode={isEditMode} />
            </span>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-500">
              <EditableText value={advantages.title} onChange={(v) => onChange({ ...data, advantages: { ...advantages, title: v } })} isEditMode={isEditMode} />
            </h2>
          </div>

          {/* Credentials Chips Panel (Horizontal Row on Top) */}
          <div className="p-4 sm:p-5 rounded-3xl bg-zinc-900 border border-white/5 text-left space-y-4">
            <span className="text-[9px] uppercase font-mono tracking-widest text-amber-500 block">
              <EditableText value={credentials.title} onChange={(v) => onChange({ ...data, credentials: { ...credentials, title: v } })} isEditMode={isEditMode} />
            </span>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
              {credentials.chips.map((chip) => (
                <div key={chip.id} className="p-2 sm:p-3 rounded-2xl bg-zinc-950 border border-white/5 text-center space-y-0.5 hover:border-amber-500/20 transition-colors flex flex-col justify-center">
                  <b className="text-sm sm:text-base font-black tracking-tight text-white block leading-tight">
                    <EditableText value={chip.value} onChange={(v) => handleCredentialChange(chip.id, 'value', v)} isEditMode={isEditMode} />
                  </b>
                  <span className="text-[8px] font-semibold text-zinc-500 uppercase tracking-wider block leading-none">
                    <EditableText value={chip.label} onChange={(v) => handleCredentialChange(chip.id, 'label', v)} isEditMode={isEditMode} />
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Symmetric Grid with 6 Topics (Left) and Region Panel (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
            
            {/* Left Grid: Advantages (6 topics) */}
            <div className="lg:col-span-6 p-5 sm:p-6 rounded-3xl bg-zinc-900 border border-white/5 flex flex-col justify-center">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5 sm:gap-y-6 text-left">
                {advantages.items.map((item) => (
                  <div key={item.id} className="flex gap-3 group">
                    <div className="w-9 h-9 rounded-xl bg-zinc-950 border border-white/5 flex items-center justify-center text-amber-500 group-hover:border-amber-500/30 transition-colors shrink-0">
                      <DynamicIcon name={item.icon} size={16} />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-zinc-200">
                        <EditableText value={item.title} onChange={(v) => handleAdvantageChange(item.id, 'title', v)} isEditMode={isEditMode} />
                      </h4>
                      <p className="text-xs text-zinc-400 leading-relaxed">
                        <EditableText value={item.description} onChange={(v) => handleAdvantageChange(item.id, 'description', v)} isEditMode={isEditMode} multiline />
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side: Region Map Panel */}
            <div className="lg:col-span-6 p-5 sm:p-6 rounded-3xl bg-zinc-900 border border-white/5 text-left flex flex-col justify-between gap-4">
              <div className="space-y-3 flex-1 flex flex-col justify-center">
                <span className="text-[9px] uppercase font-mono tracking-widest text-amber-500 block">
                  <EditableText value={region.title} onChange={(v) => onChange({ ...data, region: { ...region, title: v } })} isEditMode={isEditMode} />
                </span>

                {/* Stylized SVG Map representation */}
                <div className="rounded-2xl overflow-hidden border border-white/5 bg-zinc-950/80 my-2">
                  <svg viewBox="0 0 320 120" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                    <rect width="320" height="120" fill="#0c0d0f" />
                    <path d="M0 35 Q90 25 150 50 T320 55 L320 120 L0 120 Z" fill="#14171c" />
                    <path d="M195 0 C220 35 210 80 240 120 L320 120 L320 0 Z" fill="#0f2026" />
                    <path d="M195 0 C220 35 210 80 240 120" fill="none" stroke="#2c444e" strokeWidth="1.5" />
                    <circle cx="170" cy="48" r="12" fill="none" stroke="#c9a24b" strokeWidth="1.2" opacity="0.4" />
                    <circle cx="170" cy="48" r="4" fill="#c9a24b" />
                    <text x="120" y="40" fill="#5e6167" fontFamily="monospace" fontSize="8" letterSpacing="1">ZONA NORTE</text>
                    <text x="250" y="108" fill="#2d4047" fontFamily="monospace" fontSize="8">OCEANO</text>
                  </svg>
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed">
                  <EditableText value={region.description} onChange={(v) => onChange({ ...data, region: { ...region, description: v } })} isEditMode={isEditMode} multiline />
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ============================== PROCESS SECTION ============================== */}
      <section className="py-10 sm:py-12 px-6 bg-zinc-900/40 border-y border-white/5" id="processo">
        <div className="max-w-6xl mx-auto space-y-6">
          
          <div className="text-center md:text-left space-y-1.5 max-w-4xl">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-500">
              <EditableText value={process.subtitle} onChange={(v) => onChange({ ...data, process: { ...process, subtitle: v } })} isEditMode={isEditMode} />
            </span>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-500">
              <EditableText value={process.title} onChange={(v) => onChange({ ...data, process: { ...process, title: v } })} isEditMode={isEditMode} />
            </h2>
          </div>

          <div className="relative">
            {/* Horizontal timeline track for large screens */}
            <div className="absolute top-[40px] left-[12%] right-[12%] h-[2px] bg-zinc-800/80 hidden lg:block z-0">
              <motion.div 
                className="absolute top-0 bottom-0 left-0 w-48 bg-gradient-to-r from-transparent via-amber-500 to-transparent"
                animate={{ 
                  left: ['-192px', '100%']
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 4, 
                  ease: "linear" 
                }}
              />
            </div>

            {/* Vertical timeline track for mobile/tablet screens */}
            <div className="absolute left-[39px] top-[40px] bottom-[40px] w-[2px] bg-zinc-800/80 lg:hidden block z-0">
              <motion.div 
                className="absolute left-0 right-0 top-0 h-48 bg-gradient-to-b from-transparent via-amber-500 to-transparent"
                animate={{ 
                  top: ['-192px', '100%']
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 4, 
                  ease: "linear" 
                }}
              />
            </div>

            {/* Steps Container */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10 text-left">
              {process.items.map((item, idx) => (
                <motion.div 
                  key={item.id} 
                  className="relative flex flex-row lg:flex-col items-start lg:items-center group gap-4 lg:gap-0"
                  initial={{ opacity: 0, x: -60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ 
                    duration: 0.8, 
                    delay: idx * 0.2, 
                    ease: [0.16, 1, 0.3, 1] 
                  }}
                >
                  {/* Step Node Icon sitting on the track */}
                  <div className="relative mb-0 lg:mb-3 z-10 shrink-0">
                    {/* Glowing outer animation */}
                    <div className="absolute -inset-1.5 bg-amber-500/10 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Main Circle */}
                    <div className="relative w-20 h-20 rounded-full bg-zinc-950 border-2 border-zinc-800 flex items-center justify-center text-amber-500 group-hover:border-amber-500/50 group-hover:text-amber-400 transition-all duration-300 shadow-xl">
                      <DynamicIcon name={item.icon} size={36} />
                      
                      {/* Numeric step badge */}
                      <span className="absolute -top-1.5 -right-1.5 px-2 py-0.5 rounded-full bg-amber-500 text-[10px] font-mono font-bold text-zinc-950 shadow-md">
                        {item.num}
                      </span>
                    </div>
                  </div>

                  {/* Card content container */}
                  <div className="w-full p-4 sm:p-5 rounded-2xl bg-zinc-900/65 border border-white/5 hover:border-amber-500/20 hover:bg-zinc-900/90 hover:shadow-lg hover:shadow-amber-500/5 transition-all duration-300 relative">
                    <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-zinc-200 mb-2 group-hover:text-amber-400 transition-colors">
                      <EditableText value={item.title} onChange={(v) => handleProcessChange(item.id, 'title', v)} isEditMode={isEditMode} />
                    </h4>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      <EditableText value={item.description} onChange={(v) => handleProcessChange(item.id, 'description', v)} isEditMode={isEditMode} multiline />
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ============================== TESTIMONIALS ============================== */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto space-y-12">
          
          <div className="text-center md:text-left space-y-2 max-w-4xl">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-500">
              <EditableText value={testimonials.subtitle} onChange={(v) => onChange({ ...data, testimonials: { ...testimonials, subtitle: v } })} isEditMode={isEditMode} />
            </span>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-500">
              <EditableText value={testimonials.title} onChange={(v) => onChange({ ...data, testimonials: { ...testimonials, title: v } })} isEditMode={isEditMode} />
            </h2>
          </div>

          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes marquee-react {
              0% { transform: translateX(0%); }
              100% { transform: translateX(-33.3333%); }
            }
            .animate-marquee-css {
              display: flex;
              width: max-content;
              animation: marquee-react 45s linear infinite;
            }
            .animate-marquee-css:hover {
              animation-play-state: paused;
            }
          `}} />

          <div className="relative w-full overflow-hidden py-4 -my-4 [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
            <div className="animate-marquee-css gap-6 flex">
              {[...testimonials.items, ...testimonials.items, ...testimonials.items].map((item, idx) => (
                <div
                  key={`${item.id}-dup-${idx}`}
                  className="w-[280px] sm:w-[350px] p-6 rounded-3xl bg-zinc-900/60 border border-white/5 flex flex-col justify-between gap-6 hover:border-amber-500/20 hover:bg-zinc-900/80 transition-all duration-300 shrink-0 select-none text-left"
                >
                  <div className="space-y-4">
                    {/* Rating Stars */}
                    <div className="flex gap-1 text-amber-400">
                      {Array.from({ length: item.stars }).map((_, i) => (
                        <DynamicIcon key={i} name="Star" size={14} className="fill-current" />
                      ))}
                    </div>

                    <blockquote className="text-xs sm:text-sm text-zinc-300 leading-relaxed italic whitespace-pre-wrap">
                      {isEditMode ? (
                        <>
                          "<EditableText value={item.quote} onChange={(v) => handleTestimonialChange(item.id, 'quote', v)} isEditMode={isEditMode} multiline />"
                        </>
                      ) : (
                        `"${item.quote}"`
                      )}
                    </blockquote>
                  </div>

                  <div className="flex items-center gap-4 border-t border-white/5 pt-4">
                    <div className="w-12 h-12 rounded-full border border-amber-500/30 bg-zinc-950 shrink-0 flex items-center justify-center font-bold text-sm text-amber-500 shadow-lg shadow-amber-500/5">
                      {item.initials || item.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <b className="text-xs text-zinc-200 block truncate">
                        {isEditMode ? (
                          <EditableText value={item.name} onChange={(v) => handleTestimonialChange(item.id, 'name', v)} isEditMode={isEditMode} />
                        ) : (
                          item.name
                        )}
                      </b>
                      <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block truncate">
                        {isEditMode ? (
                          <EditableText value={item.sub} onChange={(v) => handleTestimonialChange(item.id, 'sub', v)} isEditMode={isEditMode} />
                        ) : (
                          item.sub
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ============================== FAQ ============================== */}
      <section className="py-20 px-6 bg-zinc-900/20 border-t border-white/5" id="faq">
        <div className="max-w-4xl mx-auto space-y-12 text-left">
          
          <div className="text-center md:text-left space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-500">
              <EditableText value={faq.subtitle} onChange={(v) => onChange({ ...data, faq: { ...faq, subtitle: v } })} isEditMode={isEditMode} />
            </span>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-500">
              <EditableText value={faq.title} onChange={(v) => onChange({ ...data, faq: { ...faq, title: v } })} isEditMode={isEditMode} />
            </h2>
          </div>

          <div className="space-y-4">
            {faq.items.map((item, idx) => (
              <details
                key={item.id}
                className="group border-b border-white/5 pb-4 [&_summary::-webkit-details-marker]:hidden"
                open={idx === 0}
              >
                <summary className="flex items-center justify-between gap-4 cursor-pointer py-3.5 select-none hover:text-amber-400 transition-colors">
                  <span className="font-semibold text-sm sm:text-base text-zinc-100 group-hover:text-amber-300">
                    <EditableText value={item.question} onChange={(v) => handleFaqChange(item.id, 'question', v)} isEditMode={isEditMode} />
                  </span>
                  <span className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-amber-500 group-open:rotate-45 transition-transform shrink-0">
                    <DynamicIcon name="Plus" size={14} />
                  </span>
                </summary>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed pr-6 mt-1 whitespace-pre-line">
                  <EditableText value={item.answer} onChange={(v) => handleFaqChange(item.id, 'answer', v)} isEditMode={isEditMode} multiline />
                </p>
              </details>
            ))}
          </div>

        </div>
      </section>

      {/* ============================== FINAL CALL TO ACTION ============================== */}
      <section className="py-20 px-6" id="contato">
        <div className="max-w-6xl mx-auto">
          <div className="relative overflow-hidden rounded-[32px] border border-white/5 bg-gradient-to-tr from-zinc-950 via-zinc-900 to-zinc-950 p-8 sm:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Ambient Shine background effect */}
            <div className="absolute inset-y-0 -left-[10%] w-[50%] bg-gradient-to-r from-amber-500/5 via-transparent to-transparent pointer-events-none filter blur-2xl" />

            {/* Left Col */}
            <div className="lg:col-span-7 space-y-6 text-left relative z-10">
              <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-black tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-500">
                <EditableText value={cta.title} onChange={(v) => handleCtaChange('title', v)} isEditMode={isEditMode} multiline />
              </h2>
              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-lg">
                <EditableText value={cta.description} onChange={(v) => handleCtaChange('description', v)} isEditMode={isEditMode} multiline />
              </p>
            </div>

            {/* Right Col Contacts list */}
            <div className="lg:col-span-5 space-y-6 relative z-10 text-left">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-xs sm:text-sm font-bold uppercase tracking-wider text-zinc-950 bg-gradient-to-r from-emerald-400 to-emerald-500 hover:brightness-105 active:scale-95 transition-all shadow-lg shadow-emerald-500/10 w-full sm:w-auto justify-center"
              >
                <DynamicIcon name="Phone" size={15} />
                <EditableText value={cta.btnText} onChange={(v) => handleCtaChange('btnText', v)} isEditMode={isEditMode} />
              </a>

              <div className="space-y-4 border-t border-white/5 pt-6">
                <div className="flex gap-3 text-zinc-400">
                  <DynamicIcon name="MapPin" size={16} className="text-amber-500 shrink-0" />
                  <span className="text-xs">
                    <EditableText value={cta.contacts.address} onChange={(v) => handleCtaContactChange('address', v)} isEditMode={isEditMode} />
                  </span>
                </div>
                <div className="flex gap-3 text-zinc-400">
                  <DynamicIcon name="Phone" size={16} className="text-amber-500 shrink-0" />
                  <span className="text-xs">
                    <EditableText value={cta.contacts.phone} onChange={(v) => handleCtaContactChange('phone', v)} isEditMode={isEditMode} />
                  </span>
                </div>
                <div className="flex gap-3 text-zinc-400">
                  <DynamicIcon name="Award" size={16} className="text-amber-500 shrink-0" />
                  <span className="text-xs">
                    <EditableText value={cta.contacts.creci} onChange={(v) => handleCtaContactChange('creci', v)} isEditMode={isEditMode} />
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============================== FOOTER ============================== */}
      <footer className="pt-16 pb-12 px-6 border-t border-white/5 bg-zinc-950/80">
        <div className="max-w-6xl mx-auto space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 text-left">
            {/* Column 1: Brand */}
            <div className="md:col-span-4 space-y-4">
              <a href="#" className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-amber-500 text-zinc-950 flex items-center justify-center font-bold text-xs shadow-md">
                  {nav.logoMark}
                </span>
                <span className="font-extrabold text-base tracking-tight">
                  {nav.logoName}
                </span>
              </a>
              <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
                <EditableText value={footer.description} onChange={(v) => handleFooterChange('description', v)} isEditMode={isEditMode} multiline />
              </p>
            </div>

            {/* Column 2: Credentials */}
            <div className="md:col-span-4 space-y-3">
              <h6 className="text-[10px] font-mono uppercase tracking-widest text-amber-500">
                {footer.credentialsTitle}
              </h6>
              <p className="text-xs text-zinc-400 leading-relaxed">
                {footer.credentialsItems.join(' · ')}
              </p>
            </div>

            {/* Column 3: Address */}
            <div className="md:col-span-4 space-y-3">
              <h6 className="text-[10px] font-mono uppercase tracking-widest text-amber-500">
                {footer.addressTitle}
              </h6>
              <p className="text-xs text-zinc-400 leading-relaxed">
                {footer.addressItems.join(' · ')}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-white/5 pt-8">
            <div className="text-[11px] text-zinc-500">
              <EditableText value={footer.copyright} onChange={(v) => handleFooterChange('copyright', v)} isEditMode={isEditMode} />
            </div>

            <div className="flex items-center gap-6">
              {footer.policyLinks.map((link, idx) => (
                <a key={idx} href={link.href} className="text-[11px] text-zinc-500 hover:text-zinc-300 transition-colors">
                  {link.text}
                </a>
              ))}
              <a
                href={footer.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-zinc-500 hover:text-amber-500 transition-colors"
              >
                <DynamicIcon name="Instagram" size={15} />
              </a>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="text-zinc-500 hover:text-emerald-500 transition-colors"
              >
                <DynamicIcon name="Phone" size={15} className="fill-current" />
              </a>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}

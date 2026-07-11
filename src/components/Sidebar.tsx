import React from 'react';
import { X, Trash2, PlusCircle, HelpCircle, UserCheck, Phone, MapPin, Award, Building, Sparkles, Upload, Palette } from 'lucide-react';
import { LandingPageData, ThemeConfig, FaqItem, TestimonialItem, CredentialChip, SpecialtyItem } from '../types';

interface SidebarProps {
  data: LandingPageData;
  onChange: (newData: LandingPageData) => void;
  activeTab: 'design' | 'contacts' | 'lists' | null;
  onClose: () => void;
}

export default function Sidebar({ data, onChange, activeTab, onClose }: SidebarProps) {
  if (!activeTab) return null;

  const handleThemeChange = (key: keyof ThemeConfig, value: string) => {
    const updatedTheme = { ...data.theme, [key]: value };
    onChange({ ...data, theme: updatedTheme });
  };

  // WhatsApp Updates
  const handleWaNumberChange = (num: string) => {
    onChange({ ...data, waNumber: num.replace(/\D/g, '') });
  };

  const handleWaMessageChange = (msg: string) => {
    onChange({ ...data, waMessage: msg });
  };

  // Contact Details
  const handleContactChange = (field: 'address' | 'phone' | 'creci', val: string) => {
    const updatedCta = { ...data.cta };
    updatedCta.contacts = { ...updatedCta.contacts, [field]: val };
    
    // Also update footer credentials/address if applicable to stay in sync
    const updatedFooter = { ...data.footer };
    if (field === 'address') {
      updatedFooter.addressItems[0] = val;
    }
    if (field === 'creci') {
      updatedFooter.credentialsItems[2] = `CRECI-PB ${val.replace(/\D/g, '')}`;
    }

    onChange({ ...data, cta: updatedCta, footer: updatedFooter });
  };

  // Logo settings
  const handleLogoChange = (field: 'logoMark' | 'logoName', val: string) => {
    const updatedNav = { ...data.nav, [field]: val };
    onChange({ ...data, nav: updatedNav });
  };

  // FAQ management
  const handleUpdateFaq = (id: string, field: 'question' | 'answer', val: string) => {
    const updatedItems = data.faq.items.map(item => {
      if (item.id === id) return { ...item, [field]: val };
      return item;
    });
    onChange({ ...data, faq: { ...data.faq, items: updatedItems } });
  };

  const handleAddFaq = () => {
    const newId = `faq-${Date.now()}`;
    const newItem: FaqItem = {
      id: newId,
      question: 'Nova pergunta frequente?',
      answer: 'Escreva a resposta aqui.'
    };
    onChange({ ...data, faq: { ...data.faq, items: [...data.faq.items, newItem] } });
  };

  const handleRemoveFaq = (id: string) => {
    const filtered = data.faq.items.filter(item => item.id !== id);
    onChange({ ...data, faq: { ...data.faq, items: filtered } });
  };

  // Testimonials management
  const handleUpdateTestimonial = (id: string, field: keyof TestimonialItem, val: any) => {
    const updatedItems = data.testimonials.items.map(item => {
      if (item.id === id) return { ...item, [field]: val };
      return item;
    });
    onChange({ ...data, testimonials: { ...data.testimonials, items: updatedItems } });
  };

  const handleAddTestimonial = () => {
    const newId = `test-${Date.now()}`;
    const newItem: TestimonialItem = {
      id: newId,
      stars: 5,
      quote: 'Digite o depoimento recebido pelo cliente aqui.',
      initials: 'N',
      name: 'Nome do Cliente',
      sub: 'Cargo / Investidor'
    };
    onChange({ ...data, testimonials: { ...data.testimonials, items: [...data.testimonials.items, newItem] } });
  };

  const handleRemoveTestimonial = (id: string) => {
    const filtered = data.testimonials.items.filter(item => item.id !== id);
    onChange({ ...data, testimonials: { ...data.testimonials, items: filtered } });
  };

  // Specialties Image Links
  const handleUpdateSpecialtyImage = (id: string, url: string) => {
    const updatedItems = data.specialties.items.map(item => {
      if (item.id === id) return { ...item, bgType: 'custom' as any, imageUrl: url };
      return item;
    });
    onChange({ ...data, specialties: { ...data.specialties, items: updatedItems } });
  };

  const handleResetSpecialtyImage = (id: string, originalType: 'build' | 'sea' | 'chart') => {
    const updatedItems = data.specialties.items.map(item => {
      if (item.id === id) return { ...item, bgType: originalType, imageUrl: undefined };
      return item;
    });
    onChange({ ...data, specialties: { ...data.specialties, items: updatedItems } });
  };

  return (
    <div className="fixed right-0 top-[53px] bottom-0 w-80 sm:w-96 bg-zinc-950 border-l border-zinc-800 shadow-2xl z-40 flex flex-col text-zinc-100 select-none overflow-hidden">
      
      {/* Header */}
      <div className="px-5 py-4 border-b border-zinc-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {activeTab === 'design' ? (
            <>
              <Palette className="text-amber-500" size={18} />
              <h2 className="text-sm font-bold uppercase tracking-wider">Cores & Estilos</h2>
            </>
          ) : (
            <>
              <Building className="text-amber-500" size={18} />
              <h2 className="text-sm font-bold uppercase tracking-wider">Listas & Contatos</h2>
            </>
          )}
        </div>
        <button onClick={onClose} className="p-1 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-400 transition-colors">
          <X size={16} />
        </button>
      </div>

      {/* Content scrollable area */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6">

        {/* ================= DESIGN TAB ================= */}
        {activeTab === 'design' && (
          <div className="space-y-5">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-3">Esquema de Cores do Site</h3>
              <div className="space-y-3.5 bg-zinc-900/60 p-4 rounded-xl border border-zinc-800/80">
                
                {/* Background color */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-zinc-300">Fundo Principal</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-zinc-500">{data.theme.bg}</span>
                    <input
                      type="color"
                      value={data.theme.bg}
                      onChange={(e) => handleThemeChange('bg', e.target.value)}
                      className="w-8 h-6 bg-transparent border-none cursor-pointer rounded overflow-hidden"
                    />
                  </div>
                </div>

                {/* Soft background */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-zinc-300">Fundo Suave</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-zinc-500">{data.theme.bgSoft}</span>
                    <input
                      type="color"
                      value={data.theme.bgSoft}
                      onChange={(e) => handleThemeChange('bgSoft', e.target.value)}
                      className="w-8 h-6 bg-transparent border-none cursor-pointer rounded"
                    />
                  </div>
                </div>

                {/* Card color */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-zinc-300">Fundo de Cartões</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-zinc-500">{data.theme.card}</span>
                    <input
                      type="color"
                      value={data.theme.card}
                      onChange={(e) => handleThemeChange('card', e.target.value)}
                      className="w-8 h-6 bg-transparent border-none cursor-pointer rounded"
                    />
                  </div>
                </div>

                {/* Accent Color (Gold) */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-zinc-300">Dourado / Destaque</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-zinc-500">{data.theme.gold}</span>
                    <input
                      type="color"
                      value={data.theme.gold}
                      onChange={(e) => handleThemeChange('gold', e.target.value)}
                      className="w-8 h-6 bg-transparent border-none cursor-pointer rounded"
                    />
                  </div>
                </div>

                {/* Text Color */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-zinc-300">Cor do Texto</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-zinc-500">{data.theme.text}</span>
                    <input
                      type="color"
                      value={data.theme.text}
                      onChange={(e) => handleThemeChange('text', e.target.value)}
                      className="w-8 h-6 bg-transparent border-none cursor-pointer rounded"
                    />
                  </div>
                </div>

                {/* WhatsApp button */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-zinc-300">Cor do WhatsApp</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-zinc-500">{data.theme.wa}</span>
                    <input
                      type="color"
                      value={data.theme.wa}
                      onChange={(e) => handleThemeChange('wa', e.target.value)}
                      className="w-8 h-6 bg-transparent border-none cursor-pointer rounded"
                    />
                  </div>
                </div>

              </div>
            </div>

            {/* Images Manager */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-3">Gerenciar Links de Imagens</h3>
              <div className="space-y-4 bg-zinc-900/60 p-4 rounded-xl border border-zinc-800/80">
                {/* Broker Portrait URL */}
                <div>
                  <label className="block text-[11px] font-medium text-zinc-400 mb-1">Foto Principal do Corretor (Portrait)</label>
                  <input
                    type="text"
                    value={data.hero.imageUrl}
                    onChange={(e) => onChange({ ...data, hero: { ...data.hero, imageUrl: e.target.value } })}
                    placeholder="Cole aqui uma URL pública (Unsplash, etc)"
                    className="w-full text-xs bg-zinc-950 border border-zinc-800 rounded px-2.5 py-1.5 font-mono text-zinc-200 outline-none focus:border-amber-500"
                  />
                  <span className="block text-[10px] text-zinc-500 mt-1">Deixe vazio para manter o placeholder gráfico original.</span>
                </div>

                {/* Specialties cards custom image URLs */}
                <div className="border-t border-zinc-800/60 pt-3">
                  <span className="block text-[11px] font-bold text-zinc-400 mb-2">Fotos dos Cards de Especialidades</span>
                  
                  {data.specialties.items.map((item, index) => (
                    <div key={item.id} className="mt-2 text-[11px] bg-zinc-950 p-2.5 rounded border border-zinc-800/50">
                      <span className="font-semibold text-zinc-300 block mb-1">Card {index+1}: {item.title}</span>
                      <input
                        type="text"
                        value={item.imageUrl || ''}
                        onChange={(e) => handleUpdateSpecialtyImage(item.id, e.target.value)}
                        placeholder="Link da foto..."
                        className="w-full text-[10px] bg-zinc-900 border border-zinc-800 rounded px-2 py-1 font-mono outline-none focus:border-amber-500 text-zinc-300"
                      />
                      {item.imageUrl && (
                        <button
                          onClick={() => handleResetSpecialtyImage(item.id, index === 0 ? 'build' : index === 1 ? 'sea' : 'chart')}
                          className="mt-1 text-[9px] text-red-400 hover:underline"
                        >
                          Restaurar gráfico padrão
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= CONTACTS & LISTS TAB ================= */}
        {activeTab === 'contacts' && (
          <div className="space-y-6">
            
            {/* Logo Settings */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-3 flex items-center gap-1.5">
                <Building size={12} /> Logotipo & Identidade
              </h3>
              <div className="space-y-3 bg-zinc-900/60 p-4 rounded-xl border border-zinc-800/80">
                <div>
                  <label className="block text-[10px] font-medium text-zinc-400 mb-1">Letra Inicial do Logo (Mark)</label>
                  <input
                    type="text"
                    maxLength={2}
                    value={data.nav.logoMark}
                    onChange={(e) => handleLogoChange('logoMark', e.target.value)}
                    className="w-12 text-center text-xs bg-zinc-950 border border-zinc-800 rounded px-2.5 py-1.5 font-bold outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-medium text-zinc-400 mb-1">Nome no Logotipo</label>
                  <input
                    type="text"
                    value={data.nav.logoName}
                    onChange={(e) => handleLogoChange('logoName', e.target.value)}
                    className="w-full text-xs bg-zinc-950 border border-zinc-800 rounded px-2.5 py-1.5 outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            </div>

            {/* Global Contacts */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-3 flex items-center gap-1.5">
                <Phone size={12} /> Contatos & WhatsApp Global
              </h3>
              <div className="space-y-3 bg-zinc-900/60 p-4 rounded-xl border border-zinc-800/80">
                
                {/* WhatsApp Number */}
                <div>
                  <label className="block text-[10px] font-medium text-zinc-400 mb-1">Número do WhatsApp (apenas dígitos)</label>
                  <input
                    type="text"
                    value={data.waNumber}
                    onChange={(e) => handleWaNumberChange(e.target.value)}
                    placeholder="Ex: 5583999999999"
                    className="w-full text-xs bg-zinc-950 border border-zinc-800 rounded px-2.5 py-1.5 font-mono outline-none focus:border-amber-500"
                  />
                  <span className="block text-[9px] text-zinc-500 mt-0.5">Inclua 55 + DDD + telefone. Sem hífens ou parênteses.</span>
                </div>

                {/* Default greeting message */}
                <div>
                  <label className="block text-[10px] font-medium text-zinc-400 mb-1">Mensagem Iniciação Chat</label>
                  <textarea
                    value={data.waMessage}
                    onChange={(e) => handleWaMessageChange(e.target.value)}
                    rows={3}
                    className="w-full text-xs bg-zinc-950 border border-zinc-800 rounded px-2.5 py-1.5 outline-none focus:border-amber-500 text-zinc-200 resize-none"
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="block text-[10px] font-medium text-zinc-400 mb-1">Endereço Comercial</label>
                  <input
                    type="text"
                    value={data.cta.contacts.address}
                    onChange={(e) => handleContactChange('address', e.target.value)}
                    className="w-full text-xs bg-zinc-950 border border-zinc-800 rounded px-2.5 py-1.5 outline-none focus:border-amber-500"
                  />
                </div>

                {/* CRECI */}
                <div>
                  <label className="block text-[10px] font-medium text-zinc-400 mb-1">CRECI Registro</label>
                  <input
                    type="text"
                    value={data.cta.contacts.creci}
                    onChange={(e) => handleContactChange('creci', e.target.value)}
                    className="w-full text-xs bg-zinc-950 border border-zinc-800 rounded px-2.5 py-1.5 outline-none focus:border-amber-500 font-mono"
                  />
                </div>

              </div>
            </div>

            {/* Dynamic FAQs Editor */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
                  <HelpCircle size={12} /> Perguntas Frequentes (FAQ)
                </h3>
                <button
                  onClick={handleAddFaq}
                  className="inline-flex items-center gap-1 text-[10px] text-amber-400 hover:text-amber-300 font-bold uppercase"
                >
                  <PlusCircle size={12} /> Adicionar
                </button>
              </div>

              <div className="space-y-3">
                {data.faq.items.map((item, idx) => (
                  <div key={item.id} className="bg-zinc-900/40 border border-zinc-800/80 p-3.5 rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-zinc-500 font-bold uppercase">Pergunta {idx + 1}</span>
                      <button
                        onClick={() => handleRemoveFaq(item.id)}
                        className="text-red-400 hover:text-red-300 p-1 rounded bg-zinc-950/40 hover:bg-zinc-900"
                        title="Remover pergunta"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                    <input
                      type="text"
                      value={item.question}
                      onChange={(e) => handleUpdateFaq(item.id, 'question', e.target.value)}
                      placeholder="Pergunta"
                      className="w-full text-xs bg-zinc-950 border border-zinc-800 rounded px-2 py-1 outline-none focus:border-amber-500"
                    />
                    <textarea
                      value={item.answer}
                      onChange={(e) => handleUpdateFaq(item.id, 'answer', e.target.value)}
                      placeholder="Resposta"
                      rows={2}
                      className="w-full text-xs bg-zinc-950 border border-zinc-800 rounded px-2 py-1 outline-none focus:border-amber-500 resize-none text-zinc-300"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Dynamic Testimonials Editor */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
                  <UserCheck size={12} /> Depoimentos / Clientes
                </h3>
                <button
                  onClick={handleAddTestimonial}
                  className="inline-flex items-center gap-1 text-[10px] text-amber-400 hover:text-amber-300 font-bold uppercase"
                >
                  <PlusCircle size={12} /> Adicionar
                </button>
              </div>

              <div className="space-y-3">
                {data.testimonials.items.map((item, idx) => (
                  <div key={item.id} className="bg-zinc-900/40 border border-zinc-800/80 p-3.5 rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-zinc-500 font-bold uppercase">Depoimento {idx + 1}</span>
                      <button
                        onClick={() => handleRemoveTestimonial(item.id)}
                        className="text-red-400 hover:text-red-300 p-1 rounded bg-zinc-950/40 hover:bg-zinc-900"
                        title="Remover depoimento"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[9px] text-zinc-500 mb-0.5">Nome do Cliente</label>
                        <input
                          type="text"
                          value={item.name}
                          onChange={(e) => handleUpdateTestimonial(item.id, 'name', e.target.value)}
                          className="w-full text-[11px] bg-zinc-950 border border-zinc-800 rounded px-2 py-1 outline-none focus:border-amber-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] text-zinc-500 mb-0.5">Iniciais Avatar</label>
                        <input
                          type="text"
                          maxLength={3}
                          value={item.initials}
                          onChange={(e) => handleUpdateTestimonial(item.id, 'initials', e.target.value)}
                          className="w-full text-[11px] bg-zinc-950 border border-zinc-800 rounded px-2 py-1 outline-none focus:border-amber-500 text-center font-bold"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[9px] text-zinc-500 mb-0.5">Subtítulo / Cidade / Tipo</label>
                      <input
                        type="text"
                        value={item.sub}
                        onChange={(e) => handleUpdateTestimonial(item.id, 'sub', e.target.value)}
                        className="w-full text-[11px] bg-zinc-950 border border-zinc-800 rounded px-2 py-1 outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[9px] text-zinc-500 mb-0.5">Avaliação (Estrelas: 1 a 5)</label>
                      <input
                        type="number"
                        min={1}
                        max={5}
                        value={item.stars}
                        onChange={(e) => handleUpdateTestimonial(item.id, 'stars', parseInt(e.target.value) || 5)}
                        className="w-full text-[11px] bg-zinc-950 border border-zinc-800 rounded px-2 py-1 outline-none focus:border-amber-500 font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[9px] text-zinc-500 mb-0.5">Texto do depoimento</label>
                      <textarea
                        value={item.quote}
                        onChange={(e) => handleUpdateTestimonial(item.id, 'quote', e.target.value)}
                        rows={2}
                        className="w-full text-[11px] bg-zinc-950 border border-zinc-800 rounded px-2 py-1 outline-none focus:border-amber-500 resize-none text-zinc-300"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

import React from 'react';
import { Eye, Edit3, Download, RotateCcw, Save, Palette, FileJson, Sparkles } from 'lucide-react';
import { LandingPageData } from '../types';

interface ToolbarProps {
  isEditMode: boolean;
  setEditMode: (mode: boolean) => void;
  onExport: (includeEditor: boolean) => void;
  onReset: () => void;
  onSaveLocal: () => void;
  onOpenSidebar: (tab: string) => void;
  activeSidebarTab: string | null;
  hasUnsavedChanges: boolean;
  onApplyThemePreset: (presetName: string) => void;
}

export default function Toolbar({
  isEditMode,
  setEditMode,
  onExport,
  onReset,
  onSaveLocal,
  onOpenSidebar,
  activeSidebarTab,
  hasUnsavedChanges,
  onApplyThemePreset,
}: ToolbarProps) {
  return (
    <div className="sticky top-0 z-50 w-full bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800 text-zinc-100 shadow-xl select-none">
      <div className="max-w-[1400px] mx-auto px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
        
        {/* Brand & Status */}
        <div className="flex items-center gap-3">
          <div className="h-7 w-7 rounded bg-amber-500 flex items-center justify-center font-bold text-zinc-950 text-sm shadow">
            S
          </div>
          <div>
            <h1 className="text-xs font-bold uppercase tracking-wider text-amber-500">Estúdio Sansão</h1>
            <p className="text-[10px] text-zinc-400">Construtor de Landing Page Imobiliária</p>
          </div>
          {hasUnsavedChanges && (
            <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-medium bg-amber-400/10 text-amber-400 border border-amber-400/20">
              Alterações pendentes
            </span>
          )}
        </div>

        {/* Mode Selector */}
        <div className="flex items-center bg-zinc-900 p-1 rounded-full border border-zinc-800">
          <button
            onClick={() => setEditMode(true)}
            className={`flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-medium transition-all ${
              isEditMode
                ? 'bg-amber-500 text-zinc-950 shadow-md'
                : 'text-zinc-400 hover:text-zinc-100'
            }`}
          >
            <Edit3 size={13} />
            <span>Editar Conteúdo</span>
          </button>
          <button
            onClick={() => setEditMode(false)}
            className={`flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-medium transition-all ${
              !isEditMode
                ? 'bg-zinc-800 text-zinc-100 shadow-md'
                : 'text-zinc-400 hover:text-zinc-100'
            }`}
          >
            <Eye size={13} />
            <span>Visualização Rápida</span>
          </button>
        </div>

        {/* Quick Style Presets */}
        <div className="hidden lg:flex items-center gap-1.5 border-l border-zinc-800 pl-4">
          <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-500 mr-1 flex items-center gap-1">
            <Sparkles size={11} className="text-amber-500" /> Cores:
          </span>
          <button
            onClick={() => onApplyThemePreset('gold')}
            className="px-2 py-0.5 text-[10px] rounded bg-zinc-900 border border-zinc-800 text-amber-400 hover:border-amber-400/40 transition-colors"
          >
            Dourado Noir
          </button>
          <button
            onClick={() => onApplyThemePreset('emerald')}
            className="px-2 py-0.5 text-[10px] rounded bg-zinc-900 border border-zinc-800 text-emerald-400 hover:border-emerald-400/40 transition-colors"
          >
            Esmeralda
          </button>
          <button
            onClick={() => onApplyThemePreset('royal')}
            className="px-2 py-0.5 text-[10px] rounded bg-zinc-900 border border-zinc-800 text-blue-400 hover:border-blue-400/40 transition-colors"
          >
            Safira Real
          </button>
          <button
            onClick={() => onApplyThemePreset('modern')}
            className="px-2 py-0.5 text-[10px] rounded bg-zinc-900 border border-zinc-800 text-zinc-300 hover:border-zinc-300/40 transition-colors"
          >
            Minimalista
          </button>
        </div>

        {/* Actions Group */}
        <div className="flex items-center gap-2">
          {/* Style Sidebar Toggle */}
          <button
            onClick={() => onOpenSidebar(activeSidebarTab === 'design' ? '' : 'design')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              activeSidebarTab === 'design'
                ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800'
            }`}
            title="Personalizar cores e fontes do site"
          >
            <Palette size={13} />
            <span className="hidden sm:inline">Cores & Estilos</span>
          </button>

          {/* WhatsApp & Contacts Sidebar Toggle */}
          <button
            onClick={() => onOpenSidebar(activeSidebarTab === 'contacts' ? '' : 'contacts')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              activeSidebarTab === 'contacts'
                ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800'
            }`}
          >
            <FileJson size={13} />
            <span className="hidden sm:inline">Listas & Contatos</span>
          </button>

          {/* Quick Save LocalStorage */}
          <button
            onClick={onSaveLocal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-zinc-900 border border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100 transition-colors"
            title="Salvar alterações no navegador"
          >
            <Save size={13} />
            <span className="hidden md:inline">Salvar Rascunho</span>
          </button>

          {/* Reset to defaults */}
          <button
            onClick={onReset}
            className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-red-400 hover:bg-red-500/10 hover:border-red-500/30 transition-colors"
            title="Restaurar valores de fábrica"
          >
            <RotateCcw size={13} />
          </button>

          {/* EXPORT BUTTON */}
          <div className="relative group">
            <button
              onClick={() => onExport(false)}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold bg-amber-500 text-zinc-950 hover:bg-amber-400 transition-all shadow-md active:scale-95"
            >
              <Download size={13} />
              <span>Exportar Site</span>
            </button>
            <div className="absolute right-0 mt-1 hidden group-hover:block bg-zinc-900 border border-zinc-800 p-1.5 rounded-lg shadow-xl text-[10px] w-48 text-zinc-300 z-[99]">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onExport(false);
                }}
                className="w-full text-left px-2 py-1 hover:bg-zinc-800 rounded font-semibold text-zinc-100"
              >
                📥 Exportar Produção (Limpo)
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onExport(true);
                }}
                className="w-full text-left px-2 py-1 hover:bg-zinc-800 rounded mt-1"
              >
                ⚙️ Exportar Versão Editável
              </button>
              <div className="border-t border-zinc-800 my-1"></div>
              <p className="px-2 py-0.5 text-[9px] text-zinc-500 leading-normal">
                A versão limpa remove este painel de edição e gera o arquivo HTML estático ideal para hospedar em qualquer servidor.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

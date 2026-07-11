import React, { useState } from 'react';
import { Download, Loader2, Sparkles, Palette, Phone, Edit3, Eye, RotateCcw } from 'lucide-react';

interface ToolbarProps {
  onExport: () => void;
  isEditMode: boolean;
  onToggleEditMode: () => void;
  activeTab: 'design' | 'contacts' | null;
  onTabChange: (tab: 'design' | 'contacts' | null) => void;
  onReset: () => void;
}

export default function Toolbar({
  onExport,
  isEditMode,
  onToggleEditMode,
  activeTab,
  onTabChange,
  onReset,
}: ToolbarProps) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExportClick = async () => {
    setIsExporting(true);
    try {
      await onExport();
    } catch (error) {
      console.error("Export failed:", error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="sticky top-0 z-50 w-full bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800 text-zinc-100 shadow-xl select-none">
      <div className="max-w-[1400px] mx-auto px-4 py-2.5 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Brand & Status */}
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center font-bold text-zinc-950 text-base shadow-lg">
            R
          </div>
          <div>
            <h1 className="text-xs font-black uppercase tracking-widest text-amber-500 flex items-center gap-1">
              Rodrigo Sansão
              <Sparkles size={11} className="text-amber-400" />
            </h1>
            <p className="text-[10px] text-zinc-400 font-medium">Editor Visual de Landing Page</p>
          </div>
        </div>

        {/* Builder Panel Toggles */}
        <div className="flex flex-wrap items-center gap-2.5 bg-zinc-900/60 p-1 rounded-xl border border-zinc-800">
          {/* Edit Mode Toggle */}
          <button
            onClick={onToggleEditMode}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              isEditMode
                ? 'bg-amber-500 text-zinc-950 shadow-md shadow-amber-500/10'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
            }`}
            title={isEditMode ? "Desativar modo de edição direta" : "Ativar modo de edição direta"}
          >
            {isEditMode ? <Edit3 size={13} /> : <Eye size={13} />}
            <span>{isEditMode ? 'Modo Editor' : 'Visualizar'}</span>
          </button>

          <div className="w-px h-4 bg-zinc-800" />

          {/* Design Sidebar Toggle */}
          <button
            onClick={() => onTabChange(activeTab === 'design' ? null : 'design')}
            disabled={!isEditMode}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all disabled:opacity-40 disabled:pointer-events-none ${
              activeTab === 'design'
                ? 'bg-zinc-800 text-amber-500 border border-amber-500/20 shadow-md'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
            }`}
          >
            <Palette size={13} />
            <span>Cores & Estilos</span>
          </button>

          {/* Contacts Sidebar Toggle */}
          <button
            onClick={() => onTabChange(activeTab === 'contacts' ? null : 'contacts')}
            disabled={!isEditMode}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all disabled:opacity-40 disabled:pointer-events-none ${
              activeTab === 'contacts'
                ? 'bg-zinc-800 text-amber-500 border border-amber-500/20 shadow-md'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
            }`}
          >
            <Phone size={13} />
            <span>Identidade & Contatos</span>
          </button>
        </div>

        {/* Global Actions */}
        <div className="flex items-center gap-3">
          {/* Reset Button */}
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-all border border-transparent hover:border-red-500/20"
            title="Redefinir para o modelo padrão"
          >
            <RotateCcw size={13} />
            <span className="hidden sm:inline">Restaurar Padrão</span>
          </button>

          {/* Export Button */}
          <button
            onClick={handleExportClick}
            disabled={isExporting}
            className="relative flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-bold bg-gradient-to-r from-amber-500 to-amber-600 text-zinc-950 hover:from-amber-400 hover:to-amber-500 active:scale-95 transition-all shadow-[0_0_15px_rgba(245,158,11,0.2)] hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] disabled:opacity-70 disabled:pointer-events-none"
          >
            {isExporting ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                <span>Gerando HTML...</span>
              </>
            ) : (
              <>
                <Download size={14} />
                <span>Exportar Site em HTML</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}

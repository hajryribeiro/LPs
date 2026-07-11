import React, { useState } from 'react';
import { Download, Loader2, Sparkles } from 'lucide-react';

interface ToolbarProps {
  onExport: (includeEditor: boolean) => void;
}

export default function Toolbar({ onExport }: ToolbarProps) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExportClick = async () => {
    setIsExporting(true);
    try {
      await onExport(false);
    } catch (error) {
      console.error("Export failed:", error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="sticky top-0 z-50 w-full bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800 text-zinc-100 shadow-xl select-none">
      <div className="max-w-[1400px] mx-auto px-4 py-3 flex items-center justify-between gap-4">
        
        {/* Brand & Status */}
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center font-bold text-zinc-950 text-base shadow-lg animate-pulse">
            R
          </div>
          <div>
            <h1 className="text-xs font-black uppercase tracking-widest text-amber-500 flex items-center gap-1">
              Rodrigo Sansão
              <Sparkles size={11} className="text-amber-400" />
            </h1>
            <p className="text-[10px] text-zinc-400 font-medium">Landing Page de Alta Conversão</p>
          </div>
        </div>

        {/* Minimal Actions - ONLY EXPORT */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleExportClick}
            disabled={isExporting}
            className="relative flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-bold bg-gradient-to-r from-amber-500 to-amber-600 text-zinc-950 hover:from-amber-400 hover:to-amber-500 active:scale-95 transition-all shadow-[0_0_15px_rgba(245,158,11,0.2)] hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] disabled:opacity-70 disabled:pointer-events-none"
          >
            {isExporting ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                <span>Gerando HTML único...</span>
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

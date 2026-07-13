import React, { useState, useRef, useEffect } from 'react';
import * as Lucide from 'lucide-react';
import { ImageStyleConfig } from '../types';

interface EditableImageProps {
  id: string;
  src: string;
  alt: string;
  className?: string;
  isEditMode: boolean;
  onChangeSrc: (newSrc: string) => void;
  imageStyles?: Record<string, ImageStyleConfig>;
  onChangeStyles: (id: string, styles: ImageStyleConfig) => void;
  defaultStyles?: ImageStyleConfig;
}

export default function EditableImage({
  id,
  src,
  alt,
  className = '',
  isEditMode,
  onChangeSrc,
  imageStyles = {},
  onChangeStyles,
  defaultStyles = {
    width: 380,
    height: 480,
    scale: 1,
    borderRadius: 24,
    rotation: 0,
    translateX: 0,
    translateY: 0
  }
}: EditableImageProps) {
  const [showControls, setShowControls] = useState<boolean>(isEditMode && id === 'hero');
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'adjust' | 'upload'>('adjust');
  const [tempUrl, setTempUrl] = useState<string>('');
  const [imgSrc, setImgSrc] = useState<string>(src);
  const [isMobile, setIsMobile] = useState<boolean>(typeof window !== 'undefined' ? window.innerWidth < 768 : false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragStartRef = useRef<{ x: number; y: number; tx: number; ty: number }>({ x: 0, y: 0, tx: 0, ty: 0 });

  const containerRef = useRef<HTMLDivElement>(null);
  const [renderedWidth, setRenderedWidth] = useState<number>(0);

  // Sync controls state with edit mode transitions
  useEffect(() => {
    if (isEditMode && id === 'hero') {
      setShowControls(true);
    }
  }, [isEditMode, id]);

  // Get active style config or fallback to defaults
  const activeStyle: ImageStyleConfig = {
    ...defaultStyles,
    ...(imageStyles[id] || {})
  };

  const isHeroMont = id === 'hero';

  const desktopWidth = activeStyle.width ?? defaultStyles.width ?? 380;
  const desktopHeight = activeStyle.height ?? defaultStyles.height ?? 480;
  
  const mobileWidth = activeStyle.mobileWidth ?? activeStyle.width ?? defaultStyles.mobileWidth ?? defaultStyles.width ?? 320;
  const mobileHeight = activeStyle.mobileHeight ?? activeStyle.height ?? defaultStyles.mobileHeight ?? defaultStyles.height ?? 360;

  const width = isMobile ? mobileWidth : desktopWidth;
  const height = isMobile ? mobileHeight : desktopHeight;
  
  // Safe clamped style values to prevent disappearing/extreme scaling bugs
  const baseScale = Math.max(0.2, Math.min(4, activeStyle.scale ?? defaultStyles.scale ?? 1));
  const scale = isHeroMont ? baseScale * 1.25 : baseScale;
  const borderRadius = isHeroMont ? 0 : (activeStyle.borderRadius ?? defaultStyles.borderRadius ?? 24);
  const rotation = activeStyle.rotation ?? defaultStyles.rotation ?? 0;
  
  const maxTx = width * 1.5;
  const maxTy = height * 1.5;
  const translateX = Math.max(-maxTx, Math.min(maxTx, activeStyle.translateX ?? defaultStyles.translateX ?? 0));
  const translateY = Math.max(-maxTy, Math.min(maxTy, activeStyle.translateY ?? defaultStyles.translateY ?? 0));

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Initial measurement
    const rect = containerRef.current.getBoundingClientRect();
    if (rect.width > 0) {
      setRenderedWidth(rect.width);
    }

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (containerRef.current) {
        const r = containerRef.current.getBoundingClientRect();
        if (r.width > 0) {
          setRenderedWidth(r.width);
        }
      }
    };

    window.addEventListener('resize', handleResize);
    const timer = setTimeout(handleResize, 100);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, [width]);

  // Calculate scaling factor to automatically scale translations for mobile responsiveness
  const scaleFactor = (renderedWidth > 0 && width > 0) ? Math.min(1, renderedWidth / width) : 1;
  const responsiveTranslateX = translateX * scaleFactor;
  const responsiveTranslateY = translateY * scaleFactor;

  const handleImageError = () => {
    if (!imgSrc || imgSrc === '') return;
    if (id === 'hero') {
      const ultimateFallback = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600';
      setImgSrc(ultimateFallback);
      onChangeSrc(ultimateFallback);
    }
  };

  // Handle value modifications
  const updateStyle = (key: keyof ImageStyleConfig, value: number) => {
    onChangeStyles(id, {
      ...activeStyle,
      [key]: value
    });
  };

  const handleResetStyles = () => {
    onChangeStyles(id, { ...defaultStyles });
  };

  // Convert uploaded files to base64
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        if (typeof reader.result === 'string') {
          const base64 = reader.result;
          if (id === 'hero') {
            try {
              const res = await fetch('/api/save-hero-image', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ image: base64 })
              });
              const resData = await res.json();
              if (resData.path) {
                // Use a cache-busting timestamp to force immediate reload of the new photo
                onChangeSrc(`${resData.path}?t=${Date.now()}`);
                return;
              }
            } catch (err) {
              console.error('Failed to save hero image to server:', err);
            }
          }
          onChangeSrc(base64);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Drag interaction engine
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isEditMode) return;
    
    // Disable dragging when clicking buttons inside controllers
    if ((e.target as HTMLElement).closest('.img-ctrl-panel')) {
      return;
    }

    e.preventDefault();
    setIsDragging(true);
    
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      tx: translateX,
      ty: translateY
    };

    const startX = e.clientX;
    const startY = e.clientY;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - dragStartRef.current.x;
      const deltaY = moveEvent.clientY - dragStartRef.current.y;
      
      const newTx = dragStartRef.current.tx + deltaX / scaleFactor;
      const newTy = dragStartRef.current.ty + deltaY / scaleFactor;

      const clampedTx = Math.max(-width * 1.2, Math.min(width * 1.2, newTx));
      const clampedTy = Math.max(-height * 1.2, Math.min(height * 1.2, newTy));

      onChangeStyles(id, {
        ...activeStyle,
        translateX: clampedTx,
        translateY: clampedTy
      });
    };

    const handleMouseUp = (upEvent: MouseEvent) => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);

      // If the mouse barely moved, count it as a click and toggle controls
      const distance = Math.sqrt(
        Math.pow(upEvent.clientX - startX, 2) + Math.pow(upEvent.clientY - startY, 2)
      );
      if (distance < 6) {
        setShowControls((prev) => !prev);
        setTempUrl(src);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  // Touch drag for mobile devices
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isEditMode) return;
    if ((e.target as HTMLElement).closest('.img-ctrl-panel')) {
      return;
    }

    const touch = e.touches[0];
    setIsDragging(true);

    dragStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      tx: translateX,
      ty: translateY
    };

    const startX = touch.clientX;
    const startY = touch.clientY;

    const handleTouchMove = (moveEvent: TouchEvent) => {
      const touchMove = moveEvent.touches[0];
      const deltaX = touchMove.clientX - dragStartRef.current.x;
      const deltaY = touchMove.clientY - dragStartRef.current.y;
      
      const newTx = dragStartRef.current.tx + deltaX / scaleFactor;
      const newTy = dragStartRef.current.ty + deltaY / scaleFactor;

      const clampedTx = Math.max(-width * 1.2, Math.min(width * 1.2, newTx));
      const clampedTy = Math.max(-height * 1.2, Math.min(height * 1.2, newTy));

      onChangeStyles(id, {
        ...activeStyle,
        translateX: clampedTx,
        translateY: clampedTy
      });
    };

    const handleTouchEnd = (endEvent: TouchEvent) => {
      setIsDragging(false);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);

      const endTouch = endEvent.changedTouches?.[0];
      if (endTouch) {
        const distance = Math.sqrt(
          Math.pow(endTouch.clientX - startX, 2) + Math.pow(endTouch.clientY - startY, 2)
        );
        if (distance < 6) {
          setShowControls((prev) => !prev);
          setTempUrl(src);
        }
      }
    };

    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);
  };

  // Custom visual inline style application
  const containerInlineStyle: React.CSSProperties = {
    width: width ? `${width}px` : '100%',
    height: 'auto',
    aspectRatio: width && height ? `${width} / ${height}` : undefined,
    maxWidth: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: `${borderRadius}px`,
    cursor: isEditMode ? (isDragging ? 'grabbing' : 'grab') : 'default',
    transition: 'width 0.15s ease-out, height 0.15s ease-out, border-radius 0.15s ease-out',
  };

  const imgInlineStyle: React.CSSProperties = {
    transform: `translate(${responsiveTranslateX}px, ${responsiveTranslateY}px) scale(${scale}) rotate(${rotation}deg)`,
    transformOrigin: 'center center',
    transition: isDragging ? 'none' : 'transform 0.15s ease-out',
  };

  const getDisplaySrc = (url: string) => {
    return url;
  };

  return (
    <div ref={containerRef} className={`relative group/img-container select-none w-full flex justify-center ${className}`}>
      
      {/* Target Editable Image */}
      <div 
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        className="relative overflow-hidden transition-shadow"
        style={containerInlineStyle}
      >
        {imgSrc ? (
          <img
            src={getDisplaySrc(imgSrc)}
            alt={alt}
            onError={handleImageError}
            referrerPolicy="no-referrer"
            className={`absolute inset-0 w-full h-full pointer-events-none select-none ${
              isHeroMont ? 'object-contain object-bottom' : 'object-cover object-top'
            }`}
            draggable="false"
            style={imgInlineStyle}
          />
        ) : (
          <div 
            className="absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-zinc-900 to-zinc-950 border border-white/5 text-zinc-500" 
            style={{ borderRadius: `${borderRadius}px` }}
          >
            <div className="w-16 h-16 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-amber-500/80 mb-3 shadow-inner">
              <span className="text-2xl font-black tracking-tight text-amber-500">
                {alt ? alt.charAt(0).toUpperCase() : 'R'}
              </span>
            </div>
            <p className="text-xs font-bold text-zinc-300 uppercase tracking-wider">{alt || 'Consultor'}</p>
            <p className="text-[10px] text-zinc-500 mt-1">Nenhuma foto selecionada</p>
            {isEditMode && (
              <span className="mt-2 px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 text-[8px] font-bold uppercase tracking-wider border border-amber-500/20">
                Ajustar - Substituir Foto
              </span>
            )}
          </div>
        )}

        {/* Hover highlight overlay in edit mode */}
        {isEditMode && (
          <div className="absolute inset-0 bg-amber-500/10 border-2 border-dashed border-amber-500/40 rounded-[inherit] pointer-events-none flex items-center justify-center">
            <span className="bg-zinc-950/80 text-amber-400 font-mono text-[9px] uppercase tracking-wider px-2 py-1 rounded-md border border-amber-500/20 backdrop-blur-sm opacity-0 group-hover/img-container:opacity-100 transition-opacity">
              {isDragging ? 'Arrastando...' : 'Arraste para mover / Clique em Ajustar'}
            </span>
          </div>
        )}
      </div>

      {/* Floating admin control trigger */}
      {isEditMode && (
        <div className="absolute top-4 right-4 z-30 flex gap-1.5 opacity-100 md:opacity-0 md:group-hover/img-container:opacity-100 transition-opacity img-ctrl-panel">
          <button
            onClick={() => {
              setShowControls(!showControls);
              setTempUrl(src);
            }}
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-zinc-900/90 text-amber-400 hover:bg-zinc-800 hover:text-white transition-all shadow-lg border border-white/10 backdrop-blur-md"
          >
            <Lucide.SlidersHorizontal size={12} />
            <span>Ajustar Foto</span>
          </button>
        </div>
      )}

      {/* Advanced Control Panel popover */}
      {isEditMode && showControls && (
        <div className="absolute top-16 right-4 left-4 sm:left-auto z-40 w-auto sm:w-72 p-4 rounded-2xl bg-zinc-950/95 border border-white/10 shadow-2xl text-left text-white backdrop-blur-lg img-ctrl-panel animate-in fade-in slide-in-from-top-3 duration-200">
          
          <div className="flex items-center justify-between border-b border-white/5 pb-2.5 mb-3">
            <span className="text-xs font-black uppercase tracking-wider text-amber-500 flex items-center gap-1.5">
              <Lucide.Image size={14} />
              Editor de Foto
            </span>
            <button
              onClick={() => setShowControls(false)}
              className="text-zinc-500 hover:text-white transition-colors"
            >
              <Lucide.X size={14} />
            </button>
          </div>

          {/* Tab Selection */}
          <div className="grid grid-cols-2 gap-1 mb-3 bg-zinc-900 p-0.5 rounded-lg border border-white/5">
            <button
              onClick={() => setActiveTab('adjust')}
              className={`py-1 rounded text-[10px] font-bold uppercase tracking-wider transition-all ${
                activeTab === 'adjust' ? 'bg-amber-500 text-zinc-950' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Dimensões e Giro
            </button>
            <button
              onClick={() => setActiveTab('upload')}
              className={`py-1 rounded text-[10px] font-bold uppercase tracking-wider transition-all ${
                activeTab === 'upload' ? 'bg-amber-500 text-zinc-950' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Substituir Foto
            </button>
          </div>

          {/* TAB 1: ADJUST DIMENSIONS & POSITION */}
          {activeTab === 'adjust' && (
            <div className="space-y-4 max-h-[380px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-zinc-800">
              
              {/* Desktop Dimensions Section */}
              <div className="space-y-2.5 border-b border-white/5 pb-3">
                <div className="text-[10px] uppercase font-bold tracking-wider text-amber-500/90 flex items-center gap-1.5">
                  <Lucide.Monitor size={12} className="text-amber-500" />
                  <span>Computador (PC / Desktop)</span>
                </div>
                
                {/* Desktop Width Slider */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-mono text-zinc-400">
                    <span>Largura PC:</span>
                    <span className="text-amber-400">{desktopWidth}px</span>
                  </div>
                  <input
                    type="range"
                    min="120"
                    max="800"
                    value={desktopWidth}
                    onChange={(e) => updateStyle('width', parseInt(e.target.value))}
                    className="w-full accent-amber-500 h-1 rounded bg-zinc-800 appearance-none"
                  />
                </div>

                {/* Desktop Height Slider */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-mono text-zinc-400">
                    <span>Altura PC:</span>
                    <span className="text-amber-400">{desktopHeight}px</span>
                  </div>
                  <input
                    type="range"
                    min="120"
                    max="1100"
                    value={desktopHeight}
                    onChange={(e) => updateStyle('height', parseInt(e.target.value))}
                    className="w-full accent-amber-500 h-1 rounded bg-zinc-800 appearance-none"
                  />
                </div>
              </div>

              {/* Mobile Dimensions Section */}
              <div className="space-y-2.5 border-b border-white/5 pb-3">
                <div className="text-[10px] uppercase font-bold tracking-wider text-emerald-400/90 flex items-center gap-1.5">
                  <Lucide.Smartphone size={12} className="text-emerald-400" />
                  <span>Celular (Mobile)</span>
                </div>
                
                {/* Mobile Width Slider */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-mono text-zinc-400">
                    <span>Largura Celular:</span>
                    <span className="text-emerald-400">{mobileWidth}px</span>
                  </div>
                  <input
                    type="range"
                    min="120"
                    max="600"
                    value={mobileWidth}
                    onChange={(e) => updateStyle('mobileWidth', parseInt(e.target.value))}
                    className="w-full accent-emerald-500 h-1 rounded bg-zinc-800 appearance-none"
                  />
                </div>

                {/* Mobile Height Slider */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-mono text-zinc-400">
                    <span>Altura Celular:</span>
                    <span className="text-emerald-400">{mobileHeight}px</span>
                  </div>
                  <input
                    type="range"
                    min="120"
                    max="800"
                    value={mobileHeight}
                    onChange={(e) => updateStyle('mobileHeight', parseInt(e.target.value))}
                    className="w-full accent-emerald-500 h-1 rounded bg-zinc-800 appearance-none"
                  />
                </div>
              </div>

              {/* General Adjustments */}
              <div className="space-y-2.5">
                <div className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 flex items-center gap-1.5">
                  <Lucide.Sliders size={12} />
                  <span>Ajustes Gerais</span>
                </div>

                {/* Zoom Scale Slider */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-mono text-zinc-400">
                    <span>Zoom / Escala:</span>
                    <span className="text-amber-400">{scale.toFixed(2)}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="2.5"
                    step="0.05"
                    value={scale}
                    onChange={(e) => updateStyle('scale', parseFloat(e.target.value))}
                    className="w-full accent-amber-500 h-1 rounded bg-zinc-800 appearance-none"
                  />
                </div>

                {/* Border Radius */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-mono text-zinc-400">
                    <span>Arredondamento:</span>
                    <span className="text-amber-400">{borderRadius}px</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="120"
                    value={borderRadius}
                    onChange={(e) => updateStyle('borderRadius', parseInt(e.target.value))}
                    className="w-full accent-amber-500 h-1 rounded bg-zinc-800 appearance-none"
                  />
                </div>

                {/* Rotation Slider */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-mono text-zinc-400">
                    <span>Girar / Rotação:</span>
                    <span className="text-amber-400">{rotation}°</span>
                  </div>
                  <input
                    type="range"
                    min="-180"
                    max="180"
                    value={rotation}
                    onChange={(e) => updateStyle('rotation', parseInt(e.target.value))}
                    className="w-full accent-amber-500 h-1 rounded bg-zinc-800 appearance-none"
                  />
                </div>
              </div>

              {/* Drag Position Helpers */}
              <div className="pt-2 border-t border-white/5 space-y-1.5">
                <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block">
                  Deslocamento (Arrasto Livre Ativo)
                </span>
                <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-zinc-400">
                  <div className="bg-zinc-900 px-2 py-1.5 rounded border border-white/5 flex justify-between">
                    <span>X:</span>
                    <span className="text-amber-500">{translateX}px</span>
                  </div>
                  <div className="bg-zinc-900 px-2 py-1.5 rounded border border-white/5 flex justify-between">
                    <span>Y:</span>
                    <span className="text-amber-500">{translateY}px</span>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleResetStyles}
                  className="px-2 py-1.5 rounded bg-zinc-900 border border-white/5 hover:bg-zinc-800 text-[9px] font-bold uppercase tracking-wider text-zinc-400 hover:text-white transition-colors"
                >
                  Restaurar Layout
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onChangeStyles(id, { ...activeStyle, translateX: 0, translateY: 0 });
                  }}
                  className="px-2 py-1.5 rounded bg-zinc-900 border border-white/5 hover:bg-zinc-800 text-[9px] font-bold uppercase tracking-wider text-zinc-400 hover:text-white transition-colors"
                >
                  Zerar Posição
                </button>
              </div>

            </div>
          )}

          {/* TAB 2: REPLACE IMAGE SOURCE */}
          {activeTab === 'upload' && (
            <div className="space-y-4 pt-1">
              
              {/* Option A: Upload local image */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                  Opção A: Enviar Arquivo Local
                </span>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  type="button"
                  className="w-full flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-dashed border-white/10 bg-zinc-900 hover:bg-zinc-850 hover:border-amber-500/30 transition-all text-zinc-400 hover:text-white group"
                >
                  <Lucide.UploadCloud size={24} className="text-zinc-500 group-hover:text-amber-500 transition-all" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">
                    Escolher foto do PC
                  </span>
                  <span className="text-[8px] text-zinc-600 font-mono">
                    (PNG, JPG ou WEBP)
                  </span>
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                {id === 'hero' && (
                  <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 space-y-1">
                    <p className="text-[10px] font-bold text-amber-400 flex items-center gap-1">
                      <Lucide.Lightbulb size={12} />
                      Dica da Montagem (mont4.png):
                    </p>
                    <p className="text-[9px] text-zinc-300 leading-relaxed">
                      Como os arquivos enviados no chat ficam salvos no seu computador, basta clicar no botão <strong>"Escolher foto do PC"</strong> acima e selecionar o arquivo <strong>mont4.png</strong> do seu computador para aplicá-lo instantaneamente!
                    </p>
                  </div>
                )}
              </div>

              {/* Option B: Input web link */}
              <div className="space-y-2 pt-1 border-t border-white/5">
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                  Opção B: Link da Internet (URL)
                </span>
                <div className="flex gap-1.5">
                  <input
                    type="url"
                    placeholder="https://exemplo.com/foto.jpg"
                    value={tempUrl}
                    onChange={(e) => setTempUrl(e.target.value)}
                    className="flex-1 bg-zinc-900 border border-white/5 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500 font-mono placeholder:text-zinc-600"
                  />
                  <button
                    onClick={() => {
                      if (tempUrl.trim()) {
                        onChangeSrc(tempUrl.trim());
                      }
                    }}
                    type="button"
                    className="px-3 rounded-lg bg-amber-500 text-zinc-950 font-bold text-[10px] uppercase tracking-wider hover:brightness-105 active:scale-95 transition-all"
                  >
                    Aplicar
                  </button>
                </div>
              </div>

              {/* Option C: Remove current image */}
              <div className="space-y-2 pt-2 border-t border-white/5">
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                  Opção C: Remover Imagem
                </span>
                <button
                  onClick={() => {
                    onChangeSrc('');
                    setTempUrl('');
                  }}
                  type="button"
                  className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg bg-red-500/10 border border-red-500/20 hover:bg-red-500 hover:text-zinc-950 text-red-400 hover:border-transparent text-[10px] font-bold uppercase tracking-wider transition-all"
                >
                  <Lucide.Trash2 size={12} />
                  <span>Apagar Foto / Deixar Sem Foto</span>
                </button>
              </div>

              {/* Presets suggestions */}
              <div className="space-y-1.5 pt-2 border-t border-white/5">
                <span className="text-[9px] text-zinc-500 font-mono uppercase tracking-widest block">
                  Sugestões Rápidas (Unsplash)
                </span>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { name: 'Corretor', url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600' },
                    { name: 'Corretora', url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600' },
                    { name: 'Imóvel Luxo', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600' }
                  ].map((preset, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        onChangeSrc(preset.url);
                        setTempUrl(preset.url);
                      }}
                      type="button"
                      className="bg-zinc-900 border border-white/5 hover:border-amber-500/20 hover:bg-zinc-850 px-1 py-1.5 rounded text-[9px] font-semibold text-zinc-400 hover:text-white transition-all text-ellipsis overflow-hidden whitespace-nowrap"
                    >
                      {preset.name}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>
      )}

    </div>
  );
}

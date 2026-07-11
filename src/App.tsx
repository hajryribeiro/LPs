import React, { useState, useEffect } from 'react';
import { defaultLandingPageData } from './data';
import { defaultHeroImage } from './defaultHeroImage';
import { LandingPageData, ThemeConfig } from './types';
import LandingPage from './components/LandingPage';
import Toolbar from './components/Toolbar';
import Sidebar from './components/Sidebar';
import { exportToHtml } from './utils/export';
import { saveToIndexedDB, loadFromIndexedDB, clearIndexedDB } from './utils/db';

const STORAGE_KEY = 'sansao_landing_page_builder_data';

export default function App() {
  const [data, setData] = useState<LandingPageData>(defaultLandingPageData);
  
  // Set SHOW_EDIT_INTERFACE to true to enable editing and export capabilities.
  const SHOW_EDIT_INTERFACE = true;
  
  const [isEditMode, setEditMode] = useState<boolean>(false);
  const [activeSidebarTab, setActiveSidebarTab] = useState<'design' | 'contacts' | 'lists' | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState<boolean>(false);

  // Load state from IndexedDB or localStorage on mount
  useEffect(() => {
    async function loadData() {
      if (!SHOW_EDIT_INTERFACE) {
        return;
      }
      try {
        let savedData: any = null;
        
        // 1. Try to load from IndexedDB (safe for large base64 images)
        try {
          const dbData = await loadFromIndexedDB();
          if (dbData) {
            savedData = dbData;
          }
        } catch (dbErr) {
          console.error('Failed to load from IndexedDB, falling back to localStorage', dbErr);
        }

        // 2. Fallback to localStorage if IndexedDB is empty
        if (!savedData) {
          const savedLocal = localStorage.getItem(STORAGE_KEY);
          if (savedLocal) {
            savedData = JSON.parse(savedLocal);
          }
        }

        if (savedData) {
          const parsed = savedData;
          // Fallback for any newly added fields
          const migratedData: LandingPageData = {
            ...defaultLandingPageData,
            ...parsed,
            theme: { ...defaultLandingPageData.theme, ...(parsed.theme || {}) },
            nav: { ...defaultLandingPageData.nav, ...(parsed.nav || {}) },
            hero: { 
              ...defaultLandingPageData.hero, 
              ...(parsed.hero || {}),
              imageUrl: (parsed.hero?.imageUrl !== undefined && parsed.hero?.imageUrl !== '' && !parsed.hero?.imageUrl.includes('1560250097-0b93528c311a')) 
                ? parsed.hero.imageUrl 
                : defaultLandingPageData.hero.imageUrl
            },
            pageBgUrl: (parsed.pageBgUrl === undefined || parsed.pageBgUrl === "/mont4.png" || parsed.pageBgUrl === "" || parsed.pageBgUrl === parsed.hero?.imageUrl)
              ? defaultLandingPageData.pageBgUrl
              : parsed.pageBgUrl,
            pageBgOpacity: (parsed.pageBgUrl === "/mont4.png" || parsed.pageBgUrl === parsed.hero?.imageUrl)
              ? defaultLandingPageData.pageBgOpacity
              : (parsed.pageBgOpacity !== undefined ? parsed.pageBgOpacity : defaultLandingPageData.pageBgOpacity),
            cta: { ...defaultLandingPageData.cta, ...(parsed.cta || {}) },
            footer: { 
              ...defaultLandingPageData.footer, 
              ...(parsed.footer || {}),
              instagramUrl: (parsed.footer?.instagramUrl !== undefined && parsed.footer?.instagramUrl !== '#' && parsed.footer?.instagramUrl !== '')
                ? parsed.footer.instagramUrl
                : defaultLandingPageData.footer.instagramUrl
            },
            imageStyles: (() => {
              const mergedStyles = { ...defaultLandingPageData.imageStyles, ...(parsed.imageStyles || {}) };
              if (mergedStyles.hero && (!mergedStyles.hero.width || mergedStyles.hero.width <= 0)) {
                mergedStyles.hero = {
                  ...mergedStyles.hero,
                  width: 533,
                  height: 600
                };
              }
              if (mergedStyles.hero && (!mergedStyles.hero.mobileWidth || mergedStyles.hero.mobileWidth <= 0)) {
                mergedStyles.hero = {
                  ...mergedStyles.hero,
                  mobileWidth: 380,
                  mobileHeight: 440
                };
              }
              return mergedStyles;
            })(),
            specialties: {
              ...defaultLandingPageData.specialties,
              ...(parsed.specialties || {}),
              items: (defaultLandingPageData.specialties?.items || []).map((defItem) => {
                const parsedItems = parsed.specialties?.items || [];
                const parsedItem = parsedItems.find((p: any) => p.id === defItem.id);
                
                // If the user's stored items all have the same image, or if it is the old tree placeholder,
                // we override the imageUrl with the default distinct high-quality one.
                const firstUrl = parsedItems[0]?.imageUrl;
                const isOldDuplicate = parsedItem?.imageUrl && (
                  parsedItem.imageUrl.includes('photo-1600585154') ||
                  parsedItem.imageUrl.includes('photo-1560448204') ||
                  parsedItems.every((item: any) => item.imageUrl === firstUrl)
                );

                if (parsedItem) {
                  return { 
                    ...defItem, 
                    ...parsedItem, 
                    imageUrl: isOldDuplicate ? defItem.imageUrl : (parsedItem.imageUrl || defItem.imageUrl) 
                  };
                }
                return defItem;
              })
            },
            testimonials: {
              ...defaultLandingPageData.testimonials,
              ...(parsed.testimonials || {}),
              items: (defaultLandingPageData.testimonials?.items || []).map((defItem) => {
                const parsedItem = (parsed.testimonials?.items || []).find((p: any) => p.id === defItem.id);
                return parsedItem ? { ...defItem, ...parsedItem } : defItem;
              })
            }
          };

          setData(migratedData);

          // Force-save migrated image back to persistence immediately to clear legacy references
          if (parsed.hero?.imageUrl !== migratedData.hero.imageUrl) {
            saveToIndexedDB(migratedData);
            try {
              localStorage.setItem(STORAGE_KEY, JSON.stringify(migratedData));
            } catch (e) {
              console.warn('LocalStorage limit exceeded, saved successfully to IndexedDB instead.');
            }
          }
        }
      } catch (e) {
        console.error('Error loading saved data', e);
      }
    }
    loadData();
  }, []);

  // Synchronize base64 images uploaded client-side to the server's public directory
  useEffect(() => {
    const base64Img = data.hero.imageUrl;
    if (base64Img && base64Img.startsWith('data:image/') && base64Img !== defaultHeroImage && base64Img !== defaultLandingPageData.hero.imageUrl) {
      console.log('Syncing base64 image to server...');
      fetch('/api/save-hero-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: base64Img }),
      })
        .then((res) => res.json())
        .then((resData) => {
          if (resData.success) {
            console.log('Image synced to server successfully. Replacing base64 with static path.');
            const updated = {
              ...data,
              hero: {
                ...data.hero,
                imageUrl: '/mont4.png'
              }
            };
            setData(updated);
            saveToIndexedDB(updated);
            try {
              localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            } catch (err) {
              // ignore
            }
          }
        })
        .catch((err) => {
          console.error('Error syncing image to server:', err);
        });
    }
  }, [data.hero.imageUrl]);

  // Update central state and track unsaved changes
  const handleDataChange = (newData: LandingPageData) => {
    setData(newData);
    setHasUnsavedChanges(true);
    
    // Auto-save minor edits directly to IndexedDB
    saveToIndexedDB(newData);

    // Also attempt localStorage, but catch QuotaExceededError so it doesn't interrupt or crash the application
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    } catch (e) {
      console.warn('LocalStorage limit exceeded, saved successfully to IndexedDB instead.');
    }
  };

  // Autosave to server with a 1-second debounce to avoid overloading on every slider drag tick
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (hasUnsavedChanges) {
        try {
          const response = await fetch('/api/save-builder-data', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data }),
          });
          if (response.ok) {
            console.log('Autosaved builder data permanently to server files.');
          }
        } catch (err) {
          console.error('Failed to autosave to server:', err);
        }
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [data, hasUnsavedChanges]);

  // Manual save trigger to clear badge
  const handleSaveLocal = async () => {
    await saveToIndexedDB(data);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn('LocalStorage limit exceeded on manual save, saved successfully to IndexedDB instead.');
    }

    // Also save directly to server files to make changes permanent and visible immediately across builds
    try {
      const response = await fetch('/api/save-builder-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data }),
      });
      if (response.ok) {
        console.log('Saved data permanently to server files.');
      }
    } catch (err) {
      console.error('Failed to save to server files:', err);
    }

    setHasUnsavedChanges(false);
    alert('Alterações salvas com sucesso no seu navegador e gravadas permanentemente no código do site!');
  };

  // Reset landing page to initial template values
  const handleReset = async () => {
    if (window.confirm('Tem certeza de que deseja restaurar as configurações padrão de fábrica? Todas as suas edições serão perdidas.')) {
      setData(defaultLandingPageData);
      localStorage.removeItem(STORAGE_KEY);
      await clearIndexedDB();
      setHasUnsavedChanges(false);
    }
  };

  // Trigger HTML downloads
  const handleExport = async (includeEditor: boolean) => {
    await exportToHtml(data, includeEditor);
  };

  // Apply visual preset themes
  const handleApplyThemePreset = (presetName: string) => {
    const updatedTheme = { ...data.theme };

    if (presetName === 'gold') {
      updatedTheme.bg = '#0a0b0d';
      updatedTheme.bgSoft = '#101215';
      updatedTheme.card = '#141619';
      updatedTheme.card2 = '#191c20';
      updatedTheme.text = '#ecebe8';
      updatedTheme.muted = '#82858b';
      updatedTheme.muted2 = '#5e6167';
      updatedTheme.gold = '#c9a24b';
      updatedTheme.goldSoft = '#d8bd7e';
    } else if (presetName === 'emerald') {
      updatedTheme.bg = '#050c08';
      updatedTheme.bgSoft = '#0b140f';
      updatedTheme.card = '#101c15';
      updatedTheme.card2 = '#15241b';
      updatedTheme.text = '#ecfdf5';
      updatedTheme.muted = '#a7f3d0';
      updatedTheme.muted2 = '#34d399';
      updatedTheme.gold = '#10b981';
      updatedTheme.goldSoft = '#34d399';
    } else if (presetName === 'royal') {
      updatedTheme.bg = '#020617';
      updatedTheme.bgSoft = '#0f172a';
      updatedTheme.card = '#1e293b';
      updatedTheme.card2 = '#334155';
      updatedTheme.text = '#f8fafc';
      updatedTheme.muted = '#cbd5e1';
      updatedTheme.muted2 = '#94a3b8';
      updatedTheme.gold = '#3b82f6';
      updatedTheme.goldSoft = '#60a5fa';
    } else if (presetName === 'modern') {
      // Light mode representation
      updatedTheme.bg = '#f8fafc';
      updatedTheme.bgSoft = '#f1f5f9';
      updatedTheme.card = '#ffffff';
      updatedTheme.card2 = '#e2e8f0';
      updatedTheme.text = '#0f172a';
      updatedTheme.muted = '#475569';
      updatedTheme.muted2 = '#64748b';
      updatedTheme.gold = '#0f172a';
      updatedTheme.goldSoft = '#334155';
    }

    handleDataChange({ ...data, theme: updatedTheme });
  };

  const handleSidebarOpen = (tab: string) => {
    if (tab === 'design' || tab === 'contacts') {
      setActiveSidebarTab(tab);
    } else {
      setActiveSidebarTab(null);
    }
  };

  return (
    <div className="flex flex-col min-h-screen relative bg-zinc-950">
      
      {/* Visual Editor Admin Bar at the top */}
      {SHOW_EDIT_INTERFACE && (
        <Toolbar
          isEditMode={isEditMode}
          setEditMode={setEditMode}
          onExport={handleExport}
          onReset={handleReset}
          onSaveLocal={handleSaveLocal}
          onOpenSidebar={handleSidebarOpen}
          activeSidebarTab={activeSidebarTab}
          hasUnsavedChanges={hasUnsavedChanges}
          onApplyThemePreset={handleApplyThemePreset}
        />
      )}

      <div className="flex flex-1 relative overflow-hidden">
        
        {/* Main interactive landing page canvas */}
        <div className="flex-1 overflow-y-auto">
          <LandingPage
            data={data}
            onChange={handleDataChange}
            isEditMode={SHOW_EDIT_INTERFACE ? isEditMode : false}
            onOpenSidebar={handleSidebarOpen}
          />
        </div>

        {/* Sliding drawer configuration editor */}
        {SHOW_EDIT_INTERFACE && (
          <Sidebar
            data={data}
            onChange={handleDataChange}
            activeTab={activeSidebarTab}
            onClose={() => setActiveSidebarTab(null)}
          />
        )}

      </div>

    </div>
  );
}

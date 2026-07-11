import React, { useState, useEffect } from 'react';
import { defaultLandingPageData } from './data';
import { LandingPageData } from './types';
import LandingPage from './components/LandingPage';
import Toolbar from './components/Toolbar';
import Sidebar from './components/Sidebar';
import { exportToHtml } from './utils/export';

export default function App() {
  const [data, setData] = useState<LandingPageData>(defaultLandingPageData);
  const [isEditMode, setIsEditMode] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'design' | 'contacts' | null>(null);

  // Sync state if defaultLandingPageData is updated on disk (HMR / Server updates)
  useEffect(() => {
    setData(defaultLandingPageData);
  }, [defaultLandingPageData]);

  // Handle saving data to the backend source files for true persistence
  const handleDataChange = async (newData: LandingPageData) => {
    setData(newData);
    try {
      await fetch('/api/save-builder-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: newData }),
      });
    } catch (error) {
      console.error('Failed to save data to backend server:', error);
    }
  };

  // Trigger clean production-ready single file HTML download
  const handleExport = async () => {
    await exportToHtml(data, false);
  };

  // Reset/reload handler
  const handleReset = () => {
    if (window.confirm("Deseja mesmo recarregar o site? Quaisquer alterações não salvas serão redefinidas.")) {
      window.location.reload();
    }
  };

  return (
    <div className="flex flex-col min-h-screen relative bg-zinc-950 font-sans antialiased text-zinc-100">
      
      {/* Visual Page Builder Toolbar */}
      <Toolbar
        onExport={handleExport}
        isEditMode={isEditMode}
        onToggleEditMode={() => {
          setIsEditMode(!isEditMode);
          if (isEditMode) setActiveTab(null); // Close sidebar when exiting edit mode
        }}
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
        onReset={handleReset}
      />

      <div className="flex flex-1 relative overflow-hidden">
        {/* Main interactive landing page canvas */}
        <div className="flex-1 overflow-y-auto">
          <LandingPage
            data={data}
            onChange={handleDataChange}
            isEditMode={isEditMode}
            onOpenSidebar={(tab) => {
              if (isEditMode) {
                setActiveTab(tab as any);
              }
            }}
          />
        </div>

        {/* Builder Sidebar Panel */}
        {isEditMode && activeTab && (
          <Sidebar
            data={data}
            onChange={handleDataChange}
            activeTab={activeTab}
            onClose={() => setActiveTab(null)}
          />
        )}
      </div>

    </div>
  );
}

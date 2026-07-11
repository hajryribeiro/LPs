import React, { useState } from 'react';
import { defaultLandingPageData } from './data';
import { LandingPageData } from './types';
import LandingPage from './components/LandingPage';
import Toolbar from './components/Toolbar';
import { exportToHtml } from './utils/export';

export default function App() {
  const [data] = useState<LandingPageData>(defaultLandingPageData);

  // Trigger HTML downloads (pure clean production-ready single file HTML)
  const handleExport = async () => {
    await exportToHtml(data, false);
  };

  return (
    <div className="flex flex-col min-h-screen relative bg-zinc-950">
      
      {/* Minimalistic export-only Toolbar at the top */}
      <Toolbar onExport={handleExport} />

      <div className="flex flex-1 relative overflow-hidden">
        {/* Main interactive landing page canvas (strictly read-only) */}
        <div className="flex-1 overflow-y-auto">
          <LandingPage
            data={data}
            onChange={() => {}}
            isEditMode={false}
            onOpenSidebar={() => {}}
          />
        </div>
      </div>

    </div>
  );
}

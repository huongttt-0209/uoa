import { useState } from 'react';
import { TabBar, type TabId } from './shared/components/TabBar';
import { TaoTab } from './features/tao/TaoTab';
import { SoiTab } from './features/soi/SoiTab';
import { trackTabSwitch } from './shared/utils/analytics';
import './App.css';

export function App() {
  const [activeTab, setActiveTab] = useState<TabId>('tao');

  function handleTabChange(tab: TabId) {
    setActiveTab(tab);
    trackTabSwitch(tab);
  }

  return (
    <div className="app">
      <main className="app__content">
        <header className="app-header">
          <h1 className="app-title">
            UOa
            <span className="app-title__sparkle">✦</span>
            <span className="app-title__sparkle">✧</span>
            <span className="app-title__sparkle">✦</span>
            <span className="app-title__sparkle">✧</span>
          </h1>
          <p className="app-subtitle">Tạo Excuse & Phát Hiện BS</p>
        </header>
        {activeTab === 'tao' && <TaoTab />}
        {activeTab === 'soi' && <SoiTab />}
      </main>
      <TabBar activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
}

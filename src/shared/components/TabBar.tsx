import { useCallback, useRef } from 'react';
import './tab-bar.css';

export type TabId = 'tao' | 'soi';

interface TabBarProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

const TABS: { id: TabId; label: string; icon: string }[] = [
  { id: 'tao', label: 'TẠO', icon: '✨' },
  { id: 'soi', label: 'SOI', icon: '🔍' },
];

/**
 * TabBar — fixed bottom tab navigation (FR14, FR15).
 * Two tabs: TẠO (excuse generator) and SOI (BS detector).
 * Keyboard ←→ navigation, ARIA tablist.
 */
export function TabBar({ activeTab, onTabChange }: TabBarProps) {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const currentIndex = TABS.findIndex((t) => t.id === activeTab);
      let newIndex = currentIndex;

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        newIndex = (currentIndex + 1) % TABS.length;
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        newIndex = (currentIndex - 1 + TABS.length) % TABS.length;
      }

      if (newIndex !== currentIndex) {
        onTabChange(TABS[newIndex].id);
        // Focus the new tab after state change
        tabRefs.current[newIndex]?.focus();
      }
    },
    [activeTab, onTabChange],
  );

  return (
    <nav className="tab-bar" role="tablist" aria-label="Chuyển đổi tab">
      {TABS.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            ref={(el) => {
              tabRefs.current[TABS.indexOf(tab)] = el;
            }}
            role="tab"
            className={`tab-bar__tab${isActive ? ' tab-bar__tab--active' : ''}`}
            aria-selected={isActive}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onTabChange(tab.id)}
            onKeyDown={handleKeyDown}
            type="button"
          >
            <span className="tab-bar__icon">{tab.icon}</span>
            <span className="tab-bar__label">{tab.label}</span>
            {isActive && (
              <span className="tab-bar__indicator" aria-hidden="true" />
            )}
          </button>
        );
      })}
    </nav>
  );
}

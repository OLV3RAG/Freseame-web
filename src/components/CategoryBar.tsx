import React from 'react';
import { CempasuchilIcon } from './DiaDeMuertosDecorations';

export type CategoryTab = 'fresas' | 'crepas' | 'waffles' | 'cremas';

interface CategoryBarProps {
  activeTab: CategoryTab;
  onSelectTab: (tab: CategoryTab) => void;
}

export const CategoryBar: React.FC<CategoryBarProps> = ({ activeTab, onSelectTab }) => {
  const tabs: Array<{ id: CategoryTab; label: string; icon: string }> = [
    { id: 'fresas', label: 'Fresas', icon: '🍓' },
    { id: 'crepas', label: 'Crepas', icon: '🥞' },
    { id: 'waffles', label: 'Waffles', icon: '🧇' },
    { id: 'cremas', label: 'Cremas', icon: '🥛' },
  ];

  return (
    <div
      id="category-nav-bar"
      className="sticky top-14 sm:top-16 z-40 bg-[#150D24]/90 backdrop-blur-md border-y border-[#FF8F00]/30 shadow-md transition-all w-full overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2">
        {/* Horizontal scrollable pills with momentum scroll and no native scrollbar on mobile */}
        <div className="flex items-center justify-start sm:justify-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar scroll-smooth whitespace-nowrap py-1 px-1 -webkit-overflow-scrolling-touch">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`tab-btn-${tab.id}`}
                type="button"
                onClick={() => onSelectTab(tab.id)}
                className={`group shrink-0 inline-flex items-center justify-center gap-1.5 min-h-[44px] px-5 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-extrabold transition-all duration-200 cursor-pointer select-none active:scale-95 touch-manipulation ${
                  isActive
                    ? 'bg-gradient-to-r from-[#FF6F00] via-[#FF8F00] to-[#FFA000] text-[#0D0914] font-black shadow-md shadow-orange-500/30 ring-2 ring-[#FFD54F]/70 candle-glow'
                    : 'bg-[#1A1228] text-stone-200 hover:text-[#FFB300] border border-[#FF8F00]/25 hover:border-[#FF8F00]/50 hover:bg-[#251838] shadow-2xs'
                }`}
                aria-selected={isActive}
                role="tab"
              >
                <span className="text-base sm:text-lg transition-transform group-hover:scale-110 shrink-0">
                  {tab.icon}
                </span>
                <span className="whitespace-nowrap font-['Outfit'] tracking-tight">
                  {tab.label}
                </span>
                {isActive && (
                  <CempasuchilIcon size={14} className="text-[#0D0914] shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};


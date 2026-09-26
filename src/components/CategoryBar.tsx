import React from 'react';

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
      className="sticky top-14 sm:top-16 z-40 bg-[#FFF8F2]/95 backdrop-blur-md border-y border-[#2B1A24]/10 shadow-xs transition-all w-full overflow-hidden"
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
                    ? 'bg-gradient-to-r from-[#FF4B8B] to-[#FF6B9D] text-white shadow-md shadow-pink-500/25 ring-2 ring-[#FF4B8B]/40'
                    : 'bg-white text-stone-700 hover:text-[#FF4B8B] border border-stone-200/90 hover:border-pink-200 hover:bg-pink-50/50 shadow-2xs'
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
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

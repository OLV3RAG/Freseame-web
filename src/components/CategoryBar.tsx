import React from 'react';

export type CategoryTab = 'fresas' | 'crepas' | 'waffles' | 'cremas';

interface CategoryBarProps {
  activeTab: CategoryTab;
  onSelectTab: (tab: CategoryTab) => void;
}

export const CategoryBar: React.FC<CategoryBarProps> = ({ activeTab, onSelectTab }) => {
  const tabs: Array<{ id: CategoryTab; label: string; icon: string }> = [
    { id: 'fresas', label: 'Fresas con Crema', icon: '🍓' },
    { id: 'crepas', label: 'Crepas', icon: '🥞' },
    { id: 'waffles', label: 'Waffles', icon: '🧇' },
    { id: 'cremas', label: 'Cremas Artesanales', icon: '🥛' },
  ];

  return (
    <div
      id="category-nav-bar"
      className="sticky top-14 sm:top-16 z-40 bg-white/95 backdrop-blur-md border-y border-rose-100 shadow-xs transition-all w-full overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="flex items-center justify-start sm:justify-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar scroll-smooth whitespace-nowrap py-1 px-1">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`tab-btn-${tab.id}`}
                type="button"
                onClick={() => onSelectTab(tab.id)}
                className={`group shrink-0 inline-flex items-center justify-center gap-2 min-h-[42px] px-5 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer select-none active:scale-95 ${
                  isActive
                    ? 'bg-rose-600 text-white font-extrabold shadow-sm shadow-rose-600/30 ring-2 ring-rose-200'
                    : 'bg-rose-50/60 text-gray-700 hover:text-rose-600 hover:bg-rose-100/70 border border-rose-100'
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

export default CategoryBar;

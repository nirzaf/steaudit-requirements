import React from 'react';
import { 
  Network, 
  Workflow, 
  LayoutList, 
  Calculator, 
  PackageCheck, 
  BriefcaseBusiness 
} from 'lucide-react';

interface MobileBottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  setActiveTab
}) => {
  const tabs = [
    { id: 'architecture', label: 'Arch', icon: Network, fullLabel: 'System Architecture' },
    { id: 'lifecycle', label: '11-State', icon: Workflow, fullLabel: 'Lifecycle State Machine' },
    { id: 'fieldwork', label: 'Fieldwork', icon: LayoutList, fullLabel: 'Split Fieldwork View' },
    { id: 'materiality', label: 'ISA 320', icon: Calculator, fullLabel: 'Materiality Calculator' },
    { id: 'deliverables', label: 'Reports', icon: PackageCheck, fullLabel: 'Deliverables & Archival' },
    { id: 'practice', label: 'Practice', icon: BriefcaseBusiness, fullLabel: 'Practice Analytics' },
  ];

  return (
    <nav 
      aria-label="Mobile Navigation Bar"
      className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1 shadow-lg"
      style={{ paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 6px)' }}
    >
      <div className="grid grid-cols-6 gap-1 max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              title={tab.fullLabel}
              className={`flex flex-col items-center justify-center py-1.5 px-0.5 rounded-lg transition-all min-h-[48px] touch-manipulation ${
                isActive
                  ? 'text-blue-600 bg-blue-50 font-bold'
                  : 'text-slate-500 hover:text-slate-900 active:bg-slate-100'
              }`}
            >
              <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110 text-blue-600' : 'text-slate-500'}`} />
              <span className="text-[10px] mt-0.5 truncate max-w-full font-medium">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

import React, { useState } from 'react';
import { 
  Network, 
  Workflow, 
  LayoutList, 
  Calculator, 
  PackageCheck, 
  BriefcaseBusiness,
  Layers,
  Sparkles,
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react';
import { PersonaRole, ISACategory } from '../types/audit';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedPersona: PersonaRole | 'ALL';
  setSelectedPersona: (p: PersonaRole | 'ALL') => void;
  selectedISA: ISACategory | 'ALL';
  setSelectedISA: (isa: ISACategory | 'ALL') => void;
  isEnhancedStandards: boolean;
  setIsEnhancedStandards: (val: boolean) => void;
  onOpenQuickTour: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  selectedPersona,
  setSelectedPersona,
  selectedISA,
  setSelectedISA,
  isEnhancedStandards,
  setIsEnhancedStandards,
  onOpenQuickTour
}) => {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState<boolean>(false);

  const navTabs = [
    { id: 'architecture', label: 'System Architecture', icon: Network },
    { id: 'lifecycle', label: '11-State Machine', icon: Workflow },
    { id: 'fieldwork', label: 'Split Fieldwork', icon: LayoutList },
    { id: 'materiality', label: 'ISA 320 Materiality', icon: Calculator },
    { id: 'deliverables', label: 'Deliverables & Archival', icon: PackageCheck },
    { id: 'practice', label: 'Practice Analytics', icon: BriefcaseBusiness },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Main Top Bar */}
        <div className="flex items-center justify-between h-14 sm:h-16 gap-2">
          {/* Brand & Wordmark */}
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-xs shrink-0">
              <Layers className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-sm sm:text-base font-bold tracking-tight text-slate-900 truncate block">
                STE Audit Management
              </span>
              <div className="flex items-center gap-1.5 text-[11px] text-slate-500 truncate">
                <span className="font-medium">v2.1</span>
                <span aria-hidden="true">·</span>
                <span className="hidden sm:inline">ISA / IFRS</span>
                <span aria-hidden="true" className="hidden sm:inline">·</span>
                <span>QAR</span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap min-h-[36px] ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 font-semibold shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Primary Actions & Mobile Toggle */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              onClick={() => setIsEnhancedStandards(!isEnhancedStandards)}
              className={`flex items-center gap-1.5 px-2 sm:px-2.5 py-1.5 text-xs font-semibold rounded-lg border transition-all min-h-[40px] sm:min-h-[36px] touch-manipulation ${
                isEnhancedStandards
                  ? 'bg-blue-50 text-blue-800 border-blue-300 ring-2 ring-blue-500/20 shadow-2xs'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
              title="Toggle Enhanced Big-4 & PIE Industrial Audit Standards"
            >
              <Sparkles className={`w-3.5 h-3.5 ${isEnhancedStandards ? 'text-blue-600' : 'text-slate-400'}`} />
              <span className="hidden md:inline">Big-4 Standards:</span>
              <span className="text-[11px] sm:text-xs">{isEnhancedStandards ? 'Enhanced' : 'Baseline'}</span>
            </button>

            <button
              onClick={onOpenQuickTour}
              className="px-2.5 sm:px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors whitespace-nowrap min-h-[40px] sm:min-h-[36px] touch-manipulation flex items-center gap-1"
            >
              <span className="hidden xs:inline">Quick</span>
              <span>Tour</span>
            </button>

            {/* Mobile Filter Toggle Button */}
            <button
              onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
              className={`sm:hidden p-2 rounded-lg border transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center ${
                isMobileFiltersOpen || selectedPersona !== 'ALL' || selectedISA !== 'ALL'
                  ? 'bg-blue-50 text-blue-600 border-blue-200'
                  : 'text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
              title="Toggle Audit Filters"
              aria-label="Toggle Filters"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Secondary Context & Filter Bar (Desktop Always, Mobile Collapsible or Auto-open if Filtered) */}
        <div className={`py-2 sm:py-2.5 border-t border-slate-100 ${
          isMobileFiltersOpen ? 'block' : 'hidden sm:block'
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs">
            {/* Persona Role Filter */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-2">
              <span className="text-slate-500 font-medium text-[11px] sm:text-xs">Role Focus:</span>
              
              {/* Mobile Role Dropdown */}
              <div className="sm:hidden w-full">
                <select
                  value={selectedPersona}
                  onChange={(e) => setSelectedPersona(e.target.value as PersonaRole | 'ALL')}
                  className="w-full bg-slate-100 text-slate-800 border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium focus:ring-2 focus:ring-blue-500 shadow-2xs"
                >
                  <option value="ALL">All Roles (Full Access)</option>
                  <option value="PREPARER">Preparer (Associate / Senior)</option>
                  <option value="REVIEWER">Reviewer (Audit Manager)</option>
                  <option value="APPROVER">Approver (Engagement Partner)</option>
                  <option value="CLIENT">Client (PBC Management Portal)</option>
                </select>
              </div>

              {/* Desktop / Tablet Segmented Buttons */}
              <div className="hidden sm:flex items-center gap-1 p-0.5 bg-slate-100 rounded-lg border border-slate-200/80">
                <button
                  onClick={() => setSelectedPersona('ALL')}
                  className={`px-2.5 py-1 text-xs rounded-md transition-colors min-h-[30px] ${
                    selectedPersona === 'ALL'
                      ? 'bg-white text-slate-900 font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  All Roles
                </button>
                <button
                  onClick={() => setSelectedPersona('PREPARER')}
                  className={`px-2.5 py-1 text-xs rounded-md transition-colors min-h-[30px] ${
                    selectedPersona === 'PREPARER'
                      ? 'bg-emerald-600 text-white font-medium shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Preparer
                </button>
                <button
                  onClick={() => setSelectedPersona('REVIEWER')}
                  className={`px-2.5 py-1 text-xs rounded-md transition-colors min-h-[30px] ${
                    selectedPersona === 'REVIEWER'
                      ? 'bg-sky-600 text-white font-medium shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Reviewer
                </button>
                <button
                  onClick={() => setSelectedPersona('APPROVER')}
                  className={`px-2.5 py-1 text-xs rounded-md transition-colors min-h-[30px] ${
                    selectedPersona === 'APPROVER'
                      ? 'bg-amber-600 text-white font-medium shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Approver
                </button>
                <button
                  onClick={() => setSelectedPersona('CLIENT')}
                  className={`px-2.5 py-1 text-xs rounded-md transition-colors min-h-[30px] ${
                    selectedPersona === 'CLIENT'
                      ? 'bg-purple-600 text-white font-medium shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Client (PBC)
                </button>
              </div>
            </div>

            {/* ISA Standard Filter Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-2">
              <span className="text-slate-500 font-medium text-[11px] sm:text-xs">Standard Filter:</span>
              <select
                value={selectedISA}
                onChange={(e) => setSelectedISA(e.target.value as ISACategory | 'ALL')}
                className="w-full sm:w-auto bg-slate-100 text-slate-800 border border-slate-200/80 rounded-lg sm:rounded-md px-3 sm:px-2.5 py-2 sm:py-1 text-xs font-medium focus:ring-2 focus:ring-blue-500 cursor-pointer shadow-2xs min-h-[36px] sm:min-h-[30px]"
              >
                <option value="ALL">All Standards (ISA & IFRS)</option>
                <option value="ISA 210">ISA 210 (Terms & Engagement Letters)</option>
                <option value="ISA 220 & ISQM 1">ISA 220 & ISQM 1 (Quality Management)</option>
                <option value="ISA 230">ISA 230 (60-Day Lock & Documentation)</option>
                <option value="ISA 240">ISA 240 (Presumed Fraud Risks)</option>
                <option value="ISA 315">ISA 315 (Risk Assessment & ITGCs)</option>
                <option value="ISA 320">ISA 320 (Overall & Performance Materiality)</option>
                <option value="ISA 505">ISA 505 (External Confirmations)</option>
                <option value="ISA 530">ISA 530 (Statistical Sampling)</option>
                <option value="ISA 540">ISA 540 (Accounting Estimates & Bias)</option>
                <option value="ISA 560">ISA 560 (Subsequent Events Review)</option>
                <option value="ISA 570">ISA 570 (Going Concern Evaluation)</option>
                <option value="ISA 580">ISA 580 (Management Representation Letter)</option>
                <option value="ISA 700 & 705">ISA 700/705 (Opinion & Qualifications)</option>
                <option value="ISA 701">ISA 701 (Key Audit Matters / KAM)</option>
                <option value="IESBA Code">IESBA Code (Ethics & Independence)</option>
                <option value="IFRS">IFRS (Financial Framework)</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

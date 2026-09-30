import React from 'react';
import { 
  Network, 
  Workflow, 
  LayoutList, 
  Calculator, 
  PackageCheck, 
  BriefcaseBusiness,
  Layers,
  Sparkles
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
  const navTabs = [
    { id: 'architecture', label: 'System Architecture', icon: Network },
    { id: 'lifecycle', label: '11-State Machine', icon: Workflow },
    { id: 'fieldwork', label: 'Split Fieldwork View', icon: LayoutList },
    { id: 'materiality', label: 'ISA 320 Materiality', icon: Calculator },
    { id: 'deliverables', label: 'Deliverables & Archival', icon: PackageCheck },
    { id: 'practice', label: 'Practice Analytics', icon: BriefcaseBusiness },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Bar Zone Contract: Brand Zone - 5-6 Clean Nav Links - Action Zone */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-xs">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <span className="text-base font-bold tracking-tight text-slate-900">
                STE Audit Management Tool
              </span>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span>Specification v2.1</span>
                <span aria-hidden="true">·</span>
                <span>ISA & IFRS Compliance</span>
                <span aria-hidden="true">·</span>
                <span>Currency: QAR</span>
              </div>
            </div>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 font-semibold shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action & Standards Mode Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsEnhancedStandards(!isEnhancedStandards)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                isEnhancedStandards
                  ? 'bg-blue-50 text-blue-800 border-blue-300 ring-2 ring-blue-500/20 shadow-2xs'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
              title="Toggle Enhanced Big-4 & PIE Industrial Audit Standards"
            >
              <Sparkles className={`w-3.5 h-3.5 ${isEnhancedStandards ? 'text-blue-600' : 'text-slate-400'}`} />
              <span className="hidden sm:inline">Big-4 Standards:</span>
              <span>{isEnhancedStandards ? 'Enhanced' : 'Baseline'}</span>
            </button>

            <button
              onClick={onOpenQuickTour}
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors whitespace-nowrap"
            >
              Interactive Tour
            </button>
          </div>
        </div>

        {/* Secondary Context & Filter Bar */}
        <div className="py-2.5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Mobile Navigation bar */}
          <div className="flex lg:hidden overflow-x-auto gap-1 pb-1 w-full sm:w-auto">
            {navTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md whitespace-nowrap ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Persona Filter Controls */}
          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-medium">Role Focus:</span>
            <div className="flex items-center gap-1 p-0.5 bg-slate-100 rounded-lg border border-slate-200/80">
              <button
                onClick={() => setSelectedPersona('ALL')}
                className={`px-2.5 py-1 text-xs rounded-md transition-colors ${
                  selectedPersona === 'ALL'
                    ? 'bg-white text-slate-900 font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All Roles
              </button>
              <button
                onClick={() => setSelectedPersona('PREPARER')}
                className={`px-2.5 py-1 text-xs rounded-md transition-colors ${
                  selectedPersona === 'PREPARER'
                    ? 'bg-emerald-600 text-white font-medium shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Preparer
              </button>
              <button
                onClick={() => setSelectedPersona('REVIEWER')}
                className={`px-2.5 py-1 text-xs rounded-md transition-colors ${
                  selectedPersona === 'REVIEWER'
                    ? 'bg-sky-600 text-white font-medium shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Reviewer
              </button>
              <button
                onClick={() => setSelectedPersona('APPROVER')}
                className={`px-2.5 py-1 text-xs rounded-md transition-colors ${
                  selectedPersona === 'APPROVER'
                    ? 'bg-amber-600 text-white font-medium shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Approver (Partner)
              </button>
              <button
                onClick={() => setSelectedPersona('CLIENT')}
                className={`px-2.5 py-1 text-xs rounded-md transition-colors ${
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
          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-medium">Standard:</span>
            <select
              value={selectedISA}
              onChange={(e) => setSelectedISA(e.target.value as ISACategory | 'ALL')}
              className="bg-slate-100 text-slate-800 border border-slate-200/80 rounded-md px-2.5 py-1 text-xs font-medium focus:ring-2 focus:ring-blue-500 cursor-pointer shadow-2xs"
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
    </header>
  );
};

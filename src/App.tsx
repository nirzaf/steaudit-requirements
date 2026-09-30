/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { ArchitectureDiagram } from './components/ArchitectureDiagram';
import { LifecycleStateMachine } from './components/LifecycleStateMachine';
import { SplitDashboardSimulator } from './components/SplitDashboardSimulator';
import { MaterialityCalculator } from './components/MaterialityCalculator';
import { DeliverablesArchiveGate } from './components/DeliverablesArchiveGate';
import { PracticeAnalytics } from './components/PracticeAnalytics';
import { NodeDetailDrawer } from './components/NodeDetailDrawer';
import { QuickTourModal } from './components/QuickTourModal';
import { PersonaRole, ISACategory } from './types/audit';
import { PERSONAS } from './data/auditWorkflowData';
import { Search, Info, ShieldCheck, Layers, BookOpen } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('architecture');
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [selectedPersona, setSelectedPersona] = useState<PersonaRole | 'ALL'>('ALL');
  const [selectedISA, setSelectedISA] = useState<ISACategory | 'ALL'>('ALL');
  const [isEnhancedStandards, setIsEnhancedStandards] = useState<boolean>(false);
  const [isTourOpen, setIsTourOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const activePersonaInfo = selectedPersona !== 'ALL' ? PERSONAS[selectedPersona] : null;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-blue-500/20">
      {/* 3-Zone Compliant Header with Navigation & Filter Bars */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedPersona={selectedPersona}
        setSelectedPersona={setSelectedPersona}
        selectedISA={selectedISA}
        setSelectedISA={setSelectedISA}
        isEnhancedStandards={isEnhancedStandards}
        setIsEnhancedStandards={setIsEnhancedStandards}
        onOpenQuickTour={() => setIsTourOpen(true)}
      />

      {/* Industrial Best Practices Context Banner (when enabled) */}
      {isEnhancedStandards && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-200 py-2 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2 text-blue-900">
              <span className="px-2 py-0.5 rounded font-bold bg-blue-600 text-white text-[10px] uppercase tracking-wider">
                Big-4 & PIE Enhanced
              </span>
              <span className="font-semibold">
                Industrial Standard Requirements Active:
              </span>
              <span className="text-blue-800 hidden md:inline">
                Highlighting ISQM 1 Quality Controls, ISA 240 Presumed Fraud Risks, ISA 315 ITGCs, ISA 530 100% Key Items, and ISA 701 KAM disclosures alongside statutory baselines.
              </span>
            </div>
            <button
              onClick={() => setIsEnhancedStandards(false)}
              className="text-xs text-blue-700 hover:text-blue-900 font-semibold hover:underline shrink-0"
            >
              Switch to Baseline
            </button>
          </div>
        </div>
      )}

      {/* Persona Context Notification Banner (when filtered) */}
      {activePersonaInfo && (
        <div className="bg-slate-100 border-b border-slate-200 py-2.5 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <span className={`px-2 py-0.5 rounded font-bold border ${activePersonaInfo.badgeColor}`}>
                {activePersonaInfo.role}
              </span>
              <span className="font-semibold text-slate-800">
                {activePersonaInfo.title}
              </span>
              <span className="text-slate-400 hidden md:inline">·</span>
              <span className="text-slate-500 hidden md:inline truncate max-w-xl">
                {activePersonaInfo.responsibilities[0]}
              </span>
            </div>
            <button
              onClick={() => setSelectedPersona('ALL')}
              className="text-xs text-blue-600 hover:underline shrink-0"
            >
              Reset Role Filter
            </button>
          </div>
        </div>
      )}

      {/* Main Content Workspace Container (1440px max width baseline) */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'architecture' && (
          <ArchitectureDiagram
            selectedNodeId={selectedNodeId}
            onSelectNode={(id) => setSelectedNodeId(id || null)}
            selectedPersona={selectedPersona}
            selectedISA={selectedISA}
            isEnhancedStandards={isEnhancedStandards}
            onJumpToTab={(tab) => setActiveTab(tab)}
          />
        )}

        {activeTab === 'lifecycle' && (
          <LifecycleStateMachine
            onJumpToTab={(tab) => setActiveTab(tab)}
          />
        )}

        {activeTab === 'fieldwork' && (
          <SplitDashboardSimulator />
        )}

        {activeTab === 'materiality' && (
          <MaterialityCalculator />
        )}

        {activeTab === 'deliverables' && (
          <DeliverablesArchiveGate />
        )}

        {activeTab === 'practice' && (
          <PracticeAnalytics />
        )}
      </main>

      {/* Interactive Deep-Dive Node Detail Drawer */}
      <NodeDetailDrawer
        nodeId={selectedNodeId}
        onClose={() => setSelectedNodeId(null)}
        onSelectNode={(id) => setSelectedNodeId(id)}
        onJumpToTab={(tab) => setActiveTab(tab)}
      />

      {/* Interactive Quick Tour Modal */}
      <QuickTourModal
        isOpen={isTourOpen}
        onClose={() => setIsTourOpen(false)}
        onSelectTab={(tab) => setActiveTab(tab)}
      />

      {/* Footer adhering strictly to anti-slop guidelines: quiet copyright and metadata */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-slate-700">
              STE Audit Management Tool
            </span>
            <span aria-hidden="true">·</span>
            <span>Version 2.1 Specification</span>
            <span aria-hidden="true">·</span>
            <span>Qatar Regulatory Jurisdiction (QAR)</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>ISA 210 / 220 / 230 / 320 / 505 / 570 / 700 / 705</span>
            <span aria-hidden="true">·</span>
            <span>Unlimited Client Files Policy</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

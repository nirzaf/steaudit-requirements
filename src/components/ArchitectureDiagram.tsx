import React, { useState } from 'react';
import { 
  Building2, 
  FileSpreadsheet, 
  KeySquare, 
  ScrollText, 
  Receipt, 
  ShieldCheck, 
  UserCheck, 
  FolderTree, 
  CalendarClock, 
  Calculator, 
  FileInput, 
  SplitSquareVertical, 
  TrendingUp, 
  ClipboardCheck, 
  Target, 
  MailCheck, 
  RotateCcw, 
  FileText, 
  Stamp, 
  AlertTriangle, 
  PackageCheck, 
  CreditCard, 
  LockKeyhole, 
  Clock, 
  BadgePercent, 
  BookOpenCheck, 
  PieChart,
  ArrowRight,
  Info,
  CheckCircle2,
  Sparkles,
  Zap,
  Play,
  ChevronRight
} from 'lucide-react';
import { MODULES, NODES, PERSONAS } from '../data/auditWorkflowData';
import { PersonaRole, ISACategory, AuditNode } from '../types/audit';

interface ArchitectureDiagramProps {
  selectedNodeId: string | null;
  onSelectNode: (nodeId: string) => void;
  selectedPersona: PersonaRole | 'ALL';
  selectedISA: ISACategory | 'ALL';
  isEnhancedStandards?: boolean;
  onJumpToTab?: (tab: string) => void;
}

// Map icon names to Lucide icons
const ICON_MAP: Record<string, React.ElementType> = {
  Building2,
  FileSpreadsheet,
  KeySquare,
  ScrollText,
  Receipt,
  ShieldCheck,
  UserCheck,
  FolderTree,
  CalendarClock,
  Calculator,
  FileInput,
  SplitSquareVertical,
  TrendingUp,
  ClipboardCheck,
  Target,
  MailCheck,
  RotateCcw,
  FileText,
  Stamp,
  AlertTriangle,
  PackageCheck,
  CreditCard,
  LockKeyhole,
  Clock,
  BadgePercent,
  BookOpenCheck,
  PieChart
};

export const ArchitectureDiagram: React.FC<ArchitectureDiagramProps> = ({
  selectedNodeId,
  onSelectNode,
  selectedPersona,
  selectedISA,
  isEnhancedStandards = false,
  onJumpToTab
}) => {
  const [isAnimatingFlow, setIsAnimatingFlow] = useState<boolean>(true);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [selectedModuleFilter, setSelectedModuleFilter] = useState<string | 'ALL'>('ALL');
  const [viewMode, setViewMode] = useState<'grid' | 'compact'>('grid');

  const activeFocusId = hoveredNodeId || selectedNodeId;
  const activeFocusNode = activeFocusId ? NODES[activeFocusId] : null;

  // Determine connectivity relationship for visual highlights
  const isNodeConnected = (nodeId: string): 'SELECTED' | 'UPSTREAM' | 'DOWNSTREAM' | 'NEUTRAL' => {
    if (!activeFocusId || !activeFocusNode) return 'NEUTRAL';
    if (nodeId === activeFocusId) return 'SELECTED';
    if (activeFocusNode.upstreamNodeIds.includes(nodeId)) return 'UPSTREAM';
    if (activeFocusNode.downstreamNodeIds.includes(nodeId)) return 'DOWNSTREAM';
    return 'NEUTRAL';
  };

  // Filter criteria
  const isNodeVisibleByFilters = (node: AuditNode): boolean => {
    const matchesPersona = selectedPersona === 'ALL' || node.personas.includes(selectedPersona);
    const matchesISA = selectedISA === 'ALL' || node.isaStandards.includes(selectedISA);
    return matchesPersona && matchesISA;
  };

  const displayedModules = selectedModuleFilter === 'ALL' 
    ? MODULES 
    : MODULES.filter(m => m.id === selectedModuleFilter);

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Overview & Legend Card */}
      <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 sm:gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-600">
              <Sparkles className="w-4 h-4" />
              <span>Full-Stack Modular Architecture</span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-slate-900 mt-1">
              End-to-End System Architecture & Data Pipeline
            </h1>
            <p className="text-xs text-slate-600 mt-1 max-w-3xl">
              5 interconnected modules communicating across strict compliance gates. Tap any node to inspect details, upstream inputs, and downstream handshakes.
            </p>
          </div>

          {/* Diagram Controls & Legend */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setIsAnimatingFlow(!isAnimatingFlow)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors min-h-[36px] touch-manipulation ${
                isAnimatingFlow
                  ? 'bg-blue-50 border-blue-300 text-blue-700 font-semibold'
                  : 'bg-slate-100 border-slate-200 text-slate-600'
              }`}
            >
              <Zap className={`w-3.5 h-3.5 ${isAnimatingFlow ? 'animate-pulse text-amber-500' : ''}`} />
              <span className="hidden xs:inline">Flow:</span>
              <span>{isAnimatingFlow ? 'Pulsing ON' : 'Pulsing OFF'}</span>
            </button>

            {activeFocusNode && (
              <button
                onClick={() => onSelectNode('')}
                className="px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1 border border-slate-200 min-h-[36px] touch-manipulation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Clear Focus</span>
              </button>
            )}
          </div>
        </div>

        {/* Dynamic Focus State Bar */}
        {activeFocusNode && (
          <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-blue-600">Selected:</span>
              <span className="font-bold text-slate-900">{activeFocusNode.title}</span>
              <span className="text-slate-400">·</span>
              <span className="text-slate-500">M{activeFocusNode.moduleId.replace('mod-', '')}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-500 ring-2 ring-sky-200"></span>
                <span className="text-slate-600 font-medium">
                  {activeFocusNode.upstreamNodeIds.length} Upstream
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-emerald-200"></span>
                <span className="text-slate-600 font-medium">
                  {activeFocusNode.downstreamNodeIds.length} Downstream
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile-Friendly Module Switcher & View Mode Toggle */}
      <div className="bg-white rounded-xl p-2.5 sm:p-3 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none w-full sm:w-auto touch-pan-x">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider shrink-0 mr-1 hidden md:inline">
            Modules:
          </span>
          <button
            onClick={() => setSelectedModuleFilter('ALL')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all shrink-0 min-h-[36px] touch-manipulation ${
              selectedModuleFilter === 'ALL'
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
            }`}
          >
            All Modules (26)
          </button>
          {MODULES.map(m => (
            <button
              key={m.id}
              onClick={() => setSelectedModuleFilter(m.id)}
              className={`px-2.5 sm:px-3 py-1.5 text-xs font-semibold rounded-lg transition-all shrink-0 min-h-[36px] touch-manipulation flex items-center gap-1.5 ${
                selectedModuleFilter === m.id
                  ? 'text-white shadow-2xs font-bold'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200/70'
              }`}
              style={{
                backgroundColor: selectedModuleFilter === m.id ? m.accentColor : undefined
              }}
            >
              <span>M{m.number}: {m.title.split(' ')[0]}</span>
              <span className={`text-[10px] px-1 py-0.2 rounded-full ${
                selectedModuleFilter === m.id ? 'bg-black/25 text-white' : 'bg-slate-200 text-slate-600'
              }`}>
                {m.nodeIds.length}
              </span>
            </button>
          ))}
        </div>

        {/* View Mode Toggle: Cards vs Compact */}
        <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0 pt-1 sm:pt-0 border-t sm:border-t-0 border-slate-100">
          <span className="text-[11px] text-slate-500 font-medium sm:hidden">Display Layout:</span>
          <div className="flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1 text-xs font-medium rounded-md min-h-[30px] transition-colors ${
                viewMode === 'grid' ? 'bg-white text-slate-900 font-semibold shadow-2xs' : 'text-slate-600'
              }`}
            >
              Cards View
            </button>
            <button
              onClick={() => setViewMode('compact')}
              className={`px-3 py-1 text-xs font-medium rounded-md min-h-[30px] transition-colors ${
                viewMode === 'compact' ? 'bg-white text-slate-900 font-semibold shadow-2xs' : 'text-slate-600'
              }`}
            >
              Compact View
            </button>
          </div>
        </div>
      </div>

      {/* 5 Modules Swimlanes Container */}
      <div className="space-y-4 sm:space-y-6">
        {displayedModules.map((module, mIndex) => {
          const isTargetOfActive = activeFocusNode && module.nodeIds.some(id => activeFocusNode.downstreamNodeIds.includes(id));
          const isSourceOfActive = activeFocusNode && module.nodeIds.some(id => activeFocusNode.upstreamNodeIds.includes(id));

          return (
            <div key={module.id} className="relative">
              {/* Module Header Card */}
              <div 
                className={`rounded-2xl border transition-all duration-200 overflow-hidden bg-white ${
                  selectedNodeId && module.nodeIds.includes(selectedNodeId)
                    ? 'border-blue-500 shadow-md ring-2 ring-blue-500/20'
                    : 'border-slate-200'
                }`}
              >
                {/* Module Bar Banner */}
                <div 
                  className="px-5 py-3.5 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3"
                  style={{ backgroundColor: `${module.accentColor}0D` }}
                >
                  <div className="flex items-center gap-3">
                    <span 
                      className="w-7 h-7 rounded-lg text-white font-bold text-xs flex items-center justify-center shadow-xs"
                      style={{ backgroundColor: module.accentColor }}
                    >
                      M{module.number}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-sm font-bold text-slate-900">
                          {module.title}
                        </h2>
                        <span className="text-xs text-slate-400 font-normal">·</span>
                        <span className="text-xs text-slate-600 font-medium">
                          {module.tagline}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-xs text-slate-500 flex items-center gap-2">
                    <span>{module.nodeIds.length} Core Nodes</span>
                    {isSourceOfActive && (
                      <span className="px-2 py-0.5 rounded bg-sky-100 text-sky-800 font-medium text-[11px] border border-sky-200">
                        Upstream Source
                      </span>
                    )}
                    {isTargetOfActive && (
                      <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-medium text-[11px] border border-emerald-200">
                        Downstream Target
                      </span>
                    )}
                  </div>
                </div>

                {/* Module Nodes: Grid or Compact View */}
                <div className="p-3 sm:p-5">
                  {viewMode === 'compact' ? (
                    <div className="divide-y divide-slate-100 rounded-xl border border-slate-100 overflow-hidden">
                      {module.nodeIds.map((nodeId) => {
                        const node = NODES[nodeId];
                        if (!node) return null;

                        const connectivity = isNodeConnected(nodeId);
                        const matchesFilter = isNodeVisibleByFilters(node);
                        const Icon = ICON_MAP[node.iconName] || FileText;

                        let bgHighlight = 'bg-white hover:bg-slate-50';
                        if (connectivity === 'SELECTED') {
                          bgHighlight = 'bg-blue-50/80 border-l-4 border-l-blue-600';
                        } else if (connectivity === 'UPSTREAM') {
                          bgHighlight = 'bg-sky-50/60 border-l-4 border-l-sky-500';
                        } else if (connectivity === 'DOWNSTREAM') {
                          bgHighlight = 'bg-emerald-50/60 border-l-4 border-l-emerald-500';
                        }

                        return (
                          <div
                            key={node.id}
                            onClick={() => onSelectNode(node.id)}
                            className={`p-3 flex items-center justify-between gap-3 cursor-pointer transition-colors min-h-[52px] touch-manipulation active:scale-[0.99] ${bgHighlight} ${
                              matchesFilter ? 'opacity-100' : 'opacity-30'
                            }`}
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <div 
                                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                                style={{ 
                                  backgroundColor: `${module.accentColor}1A`,
                                  color: module.accentColor 
                                }}
                              >
                                <Icon className="w-4 h-4" />
                              </div>
                              <div className="min-w-0">
                                <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                                  <span className="font-mono font-semibold">#{node.stageIndex}</span>
                                  <span>·</span>
                                  <span className="uppercase tracking-wider truncate">{node.category}</span>
                                </div>
                                <h3 className="text-xs font-bold text-slate-900 truncate">
                                  {node.title}
                                </h3>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              {node.industrialBestPractice && (
                                <span className="hidden xs:inline-flex items-center gap-0.5 text-[9px] px-1.5 py-0.5 rounded font-medium bg-blue-50 text-blue-700 border border-blue-200">
                                  <Sparkles className="w-2.5 h-2.5" />
                                  <span>{node.industrialBestPractice.standard.split('/')[0].trim()}</span>
                                </span>
                              )}
                              <span className="font-mono text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                                {node.isaStandards[0]}
                              </span>
                              <ChevronRight className="w-4 h-4 text-slate-400" />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-3.5">
                      {module.nodeIds.map((nodeId) => {
                        const node = NODES[nodeId];
                        if (!node) return null;

                        const connectivity = isNodeConnected(nodeId);
                        const matchesFilter = isNodeVisibleByFilters(node);
                        const Icon = ICON_MAP[node.iconName] || FileText;

                        // Visual styling based on selection, upstream/downstream, or filter
                        let borderClass = 'border-slate-200 hover:border-blue-400';
                        let bgClass = 'bg-white';
                        let opacityClass = matchesFilter ? 'opacity-100' : 'opacity-30';
                        let badgeHighlight = null;

                        if (connectivity === 'SELECTED') {
                          borderClass = 'border-blue-600 ring-2 ring-blue-500/25 shadow-md';
                          bgClass = 'bg-blue-50/40';
                          badgeHighlight = { text: 'ACTIVE INSPECTION', color: 'bg-blue-600 text-white' };
                        } else if (connectivity === 'UPSTREAM') {
                          borderClass = 'border-sky-500 ring-2 ring-sky-500/20';
                          bgClass = 'bg-sky-50/40';
                          badgeHighlight = { text: 'INPUT SOURCE', color: 'bg-sky-600 text-white' };
                        } else if (connectivity === 'DOWNSTREAM') {
                          borderClass = 'border-emerald-500 ring-2 ring-emerald-500/20';
                          bgClass = 'bg-emerald-50/40';
                          badgeHighlight = { text: 'HANDSHAKE TARGET', color: 'bg-emerald-600 text-white' };
                        } else if (activeFocusId && connectivity === 'NEUTRAL') {
                          opacityClass = 'opacity-40';
                        }

                        return (
                          <div
                            key={node.id}
                            onClick={() => onSelectNode(node.id)}
                            onMouseEnter={() => setHoveredNodeId(node.id)}
                            onMouseLeave={() => setHoveredNodeId(null)}
                            className={`group relative p-3 sm:p-3.5 rounded-xl border transition-all duration-150 cursor-pointer shadow-xs hover:shadow-md active:scale-[0.99] touch-manipulation min-h-[140px] flex flex-col justify-between ${borderClass} ${bgClass} ${opacityClass}`}
                          >
                            <div>
                              {/* Active state badge */}
                              {badgeHighlight && (
                                <div className="absolute -top-2.5 right-3">
                                  <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full shadow-xs ${badgeHighlight.color}`}>
                                    {badgeHighlight.text}
                                  </span>
                                </div>
                              )}

                              {/* Node Header */}
                              <div className="flex items-start gap-2.5 mb-2">
                                <div 
                                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-transform group-hover:scale-105"
                                  style={{ 
                                    backgroundColor: `${module.accentColor}1A`,
                                    color: module.accentColor 
                                  }}
                                >
                                  <Icon className="w-4 h-4" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center justify-between gap-1">
                                    <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                                      {node.category}
                                    </span>
                                    <span className="text-[10px] font-mono text-slate-400">
                                      #{node.stageIndex}
                                    </span>
                                  </div>
                                  <h3 className="text-xs font-bold text-slate-900 truncate group-hover:text-blue-600 transition-colors">
                                    {node.title}
                                  </h3>
                                </div>
                              </div>

                              {/* Short Description */}
                              <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed mb-3">
                                {node.shortDesc}
                              </p>
                            </div>

                            {/* Personas and Standards Row */}
                            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] gap-1">
                              {/* Personas initials */}
                              <div className="flex items-center gap-1">
                                {node.personas.map((role: PersonaRole) => (
                                  <span
                                    key={role}
                                    title={PERSONAS[role].title}
                                    className={`px-1.5 py-0.5 font-medium rounded ${
                                      role === 'PREPARER' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' :
                                      role === 'REVIEWER' ? 'bg-sky-50 text-sky-800 border border-sky-200' :
                                      role === 'APPROVER' ? 'bg-amber-50 text-amber-800 border border-amber-200' :
                                      'bg-purple-50 text-purple-800 border border-purple-200'
                                    }`}
                                  >
                                    {role.charAt(0)}
                                  </span>
                                ))}
                              </div>

                              {/* Main ISA Tag & Optional Best Practice */}
                              <div className="flex items-center gap-1 shrink-0">
                                {node.industrialBestPractice && (
                                  <span
                                    title={`${node.industrialBestPractice.standard}: ${node.industrialBestPractice.title} (${node.industrialBestPractice.isOptional ? 'Optional' : 'Core Refinement'})`}
                                    className={`flex items-center gap-0.5 text-[9px] px-1 py-0.5 rounded font-medium border ${
                                      isEnhancedStandards
                                        ? 'bg-blue-100 text-blue-800 border-blue-300 font-semibold'
                                        : 'bg-slate-100 text-slate-600 border-slate-200'
                                    }`}
                                  >
                                    <Sparkles className="w-2.5 h-2.5 text-blue-600 shrink-0" />
                                    <span className="truncate max-w-[65px]">{node.industrialBestPractice.standard.split('/')[0].trim()}</span>
                                  </span>
                                )}
                                <span className="font-mono text-slate-500 font-medium truncate max-w-[75px]">
                                  {node.isaStandards[0]}
                                </span>
                              </div>
                            </div>

                            {/* Pulse Flow Indicator Animation */}
                            {isAnimatingFlow && (connectivity === 'SELECTED' || connectivity === 'UPSTREAM' || connectivity === 'DOWNSTREAM') && (
                              <div className="absolute inset-0 rounded-xl pointer-events-none ring-1 ring-blue-500/40 animate-pulse"></div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Handshake Gate Banner (Connecting this module to the next) */}
                {module.handshakeToNext && (
                  <div className="px-5 py-3 bg-slate-50/80 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 mr-2">
                          {module.handshakeToNext.title}:
                        </span>
                        <span className="text-slate-600">
                          {module.handshakeToNext.requirement}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 text-blue-600 font-semibold shrink-0">
                      <span>Advances to Module {mIndex + 2}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                )}
              </div>

              {/* Inter-Module Connector Line */}
              {mIndex < MODULES.length - 1 && (
                <div className="flex justify-center my-2">
                  <div className="flex flex-col items-center">
                    <div className="w-0.5 h-4 bg-slate-300"></div>
                    <div className="px-3 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-[10px] font-mono text-slate-600 font-semibold">
                      Sequential Handshake ↓
                    </div>
                    <div className="w-0.5 h-4 bg-slate-300"></div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

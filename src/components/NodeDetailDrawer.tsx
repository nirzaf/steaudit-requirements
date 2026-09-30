import React from 'react';
import { 
  X, 
  ArrowLeftRight, 
  ShieldCheck, 
  FileOutput, 
  FileInput, 
  Workflow, 
  Layers, 
  CheckCircle2, 
  ExternalLink,
  Lock,
  Users,
  Sparkles
} from 'lucide-react';
import { AuditNode, PersonaRole } from '../types/audit';
import { NODES, PERSONAS } from '../data/auditWorkflowData';

interface NodeDetailDrawerProps {
  nodeId: string | null;
  onClose: () => void;
  onSelectNode: (id: string) => void;
  onJumpToTab?: (tab: string) => void;
}

export const NodeDetailDrawer: React.FC<NodeDetailDrawerProps> = ({
  nodeId,
  onClose,
  onSelectNode,
  onJumpToTab
}) => {
  if (!nodeId) return null;
  const node = NODES[nodeId];
  if (!node) return null;

  // Determine quick jump tab based on module/node
  const getJumpAction = (n: AuditNode) => {
    if (n.moduleId === 'mod-1' && n.id === 'node-dualkey') return { tab: 'lifecycle', label: 'Test Dual-Key in State Machine' };
    if (n.moduleId === 'mod-2' && n.id === 'node-materiality-calc') return { tab: 'materiality', label: 'Open Materiality Calculator' };
    if (n.moduleId === 'mod-3') return { tab: 'fieldwork', label: 'Open Split Fieldwork View' };
    if (n.moduleId === 'mod-4') return { tab: 'deliverables', label: 'Open Deliverables & Archival' };
    if (n.moduleId === 'mod-5') return { tab: 'practice', label: 'Open Practice Rates Calculator' };
    return { tab: 'lifecycle', label: 'View in 11-State Flow' };
  };

  const jump = getJumpAction(node);

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[480px] lg:w-[540px] bg-white border-l border-slate-200 shadow-2xl flex flex-col transform transition-transform duration-200 ease-out">
      {/* Drawer Header */}
      <div className="p-5 border-b border-slate-200 flex items-start justify-between bg-slate-50">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 mb-1">
            <span>Module {node.moduleId.replace('mod-', '')}</span>
            <span aria-hidden="true">·</span>
            <span>{node.moduleName}</span>
            <span aria-hidden="true">·</span>
            <span>Sequence Step {node.stageIndex}</span>
          </div>
          <h2 className="text-lg font-bold text-slate-900 leading-snug">
            {node.title}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {node.shortDesc}
          </p>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          aria-label="Close details"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Drawer Body */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        {/* Personas and Regulatory Standards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 mb-2">
              <Users className="w-3.5 h-3.5 text-slate-500" />
              <span>Assigned Personas</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {node.personas.map((role: PersonaRole) => {
                const info = PERSONAS[role];
                return (
                  <span
                    key={role}
                    className={`px-2 py-0.5 text-xs font-medium rounded border ${info.badgeColor}`}
                  >
                    {info.title.split('/')[0].trim()}
                  </span>
                );
              })}
            </div>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-slate-500" />
              <span>Governing Standards</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {node.isaStandards.map((std) => (
                <span
                  key={std}
                  className="px-2 py-0.5 text-xs font-medium rounded bg-slate-200 text-slate-800"
                >
                  {std}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Full Overview Description */}
        <div>
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            Functional Description & Operational Context
          </h3>
          <p className="text-xs text-slate-700 leading-relaxed bg-white p-3.5 rounded-lg border border-slate-200">
            {node.fullDescription}
          </p>
        </div>

        {/* Business Logic & Task Sequence */}
        <div>
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            Core Business Logic & Rules
          </h3>
          <ul className="space-y-2">
            {node.businessLogic.map((logic, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>{logic}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Controls and Gate Conditions */}
        {node.controlsAndGates && node.controlsAndGates.length > 0 && (
          <div className="p-3.5 rounded-lg bg-amber-50 border border-amber-200">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-800 mb-1.5">
              <Lock className="w-3.5 h-3.5" />
              <span>Mandatory Gatekeepers & Controls</span>
            </div>
            <ul className="space-y-1.5">
              {node.controlsAndGates.map((gate, idx) => (
                <li key={idx} className="text-xs text-amber-900 pl-3 border-l-2 border-amber-500">
                  {gate}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Industrial Best Practice (Big-4 & PIE Enhanced Standard) */}
        {node.industrialBestPractice && (
          <div className="p-3.5 rounded-lg bg-gradient-to-r from-blue-50/80 to-indigo-50/80 border border-blue-200">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-blue-900">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Industry Standard ({node.industrialBestPractice.standard})</span>
              </div>
              <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${
                node.industrialBestPractice.isOptional
                  ? 'bg-blue-100 text-blue-800 border-blue-200'
                  : 'bg-emerald-100 text-emerald-800 border-emerald-200'
              }`}>
                {node.industrialBestPractice.isOptional ? 'Optional / Recommended' : 'Core ISA Refinement'}
              </span>
            </div>
            <div className="text-xs font-semibold text-slate-900 mb-1">
              {node.industrialBestPractice.title}
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {node.industrialBestPractice.description}
            </p>
          </div>
        )}

        {/* Inputs & Outputs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-3 rounded-lg border border-slate-200 bg-slate-50/70">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 mb-2">
              <FileInput className="w-3.5 h-3.5 text-sky-600" />
              <span>Inputs & Dependencies</span>
            </div>
            <ul className="space-y-1 text-xs text-slate-600">
              {node.inputs.map((inp, idx) => (
                <li key={idx} className="truncate" title={inp}>
                  • {inp}
                </li>
              ))}
            </ul>
          </div>

          <div className="p-3 rounded-lg border border-slate-200 bg-slate-50/70">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 mb-2">
              <FileOutput className="w-3.5 h-3.5 text-emerald-600" />
              <span>Outputs & Deliverables</span>
            </div>
            <ul className="space-y-1 text-xs text-slate-600">
              {node.outputs.map((out, idx) => (
                <li key={idx} className="truncate" title={out}>
                  • {out}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Connectivity: Upstream & Downstream Links */}
        <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 mb-2.5">
            <ArrowLeftRight className="w-3.5 h-3.5" />
            <span>Node Connectivity & Data Flow Links</span>
          </div>

          <div className="space-y-2.5">
            <div>
              <span className="text-xs text-slate-500 font-medium">Upstream Feeders:</span>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {node.upstreamNodeIds.length === 0 ? (
                  <span className="text-xs text-slate-400 italic">None (Root Origin)</span>
                ) : (
                  node.upstreamNodeIds.map((upId) => {
                    const upNode = NODES[upId];
                    if (!upNode) return null;
                    return (
                      <button
                        key={upId}
                        onClick={() => onSelectNode(upId)}
                        className="px-2 py-1 text-xs rounded bg-white border border-slate-200 hover:border-blue-500 text-slate-700 transition-colors text-left flex items-center gap-1 shadow-2xs"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-500"></span>
                        <span className="truncate max-w-[200px]">{upNode.title}</span>
                      </button>
                    );
                  })
                )}
              </div>
            </div>

            <div>
              <span className="text-xs text-slate-500 font-medium">Downstream Handshakes:</span>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {node.downstreamNodeIds.length === 0 ? (
                  <span className="text-xs text-slate-400 italic">None (Terminal Output)</span>
                ) : (
                  node.downstreamNodeIds.map((downId) => {
                    const downNode = NODES[downId];
                    if (!downNode) return null;
                    return (
                      <button
                        key={downId}
                        onClick={() => onSelectNode(downId)}
                        className="px-2 py-1 text-xs rounded bg-white border border-slate-200 hover:border-blue-500 text-slate-700 transition-colors text-left flex items-center gap-1 shadow-2xs"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        <span className="truncate max-w-[200px]">{downNode.title}</span>
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Drawer Footer Actions */}
      <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
        <button
          onClick={onClose}
          className="px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-200 rounded-md transition-colors"
        >
          Close Drawer
        </button>

        {onJumpToTab && jump && (
          <button
            onClick={() => {
              onJumpToTab(jump.tab);
              onClose();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors shadow-xs"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>{jump.label}</span>
          </button>
        )}
      </div>
    </div>
  );
};

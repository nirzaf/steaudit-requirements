import React, { useState } from 'react';
import { 
  X, 
  ChevronRight, 
  ChevronLeft, 
  Network, 
  Workflow, 
  LayoutList, 
  Calculator, 
  PackageCheck, 
  BriefcaseBusiness,
  ShieldCheck,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

interface QuickTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTab: (tab: string) => void;
}

export const QuickTourModal: React.FC<QuickTourModalProps> = ({
  isOpen,
  onClose,
  onSelectTab
}) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  if (!isOpen) return null;

  const slides = [
    {
      title: 'Welcome to the STE Audit Workflow & System Architecture Explorer',
      subtitle: 'Functional Requirements & End-to-End Specification v2.1',
      icon: Network,
      content: (
        <div className="space-y-3 text-xs text-slate-600">
          <p>
            This interactive visualizer models the entire <strong>STE Audit Management Tool</strong>, designed strictly in compliance with <strong>International Standards on Auditing (ISA)</strong> and <strong>IFRS</strong> with standard currency in <strong>Qatari Riyals (QAR)</strong>.
          </p>
          <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 space-y-1">
            <strong className="text-blue-900 block text-xs">Primary Architectural Objectives:</strong>
            <ul className="list-disc pl-4 space-y-1 text-blue-800 text-[11px]">
              <li><strong>Zero Per-File Penalties:</strong> Eliminate rigid commercial license caps (e.g. 130 files) with unlimited historical files and entities.</li>
              <li><strong>Unified Lifecycle:</strong> Commercial CRM → Planning & Materiality → Fieldwork Testing → 5-Part Deliverables → Practice Bookkeeping.</li>
              <li><strong>Standardized Governance:</strong> ISA 210, ISA 220, ISA 230, ISA 320, ISA 505, ISA 570, ISA 700/705.</li>
            </ul>
          </div>
        </div>
      ),
      tab: 'architecture'
    },
    {
      title: 'Module 1 & 2: Commercial CRM & Planning Governance',
      subtitle: 'Lead Ingestion, Dual-Key Gatekeeper & 3-Tier Materiality',
      icon: Calculator,
      content: (
        <div className="space-y-3 text-xs text-slate-600">
          <p>
            An engagement begins with lead capture and proposal generation. The contract cannot proceed without clearing the <strong>Dual-Key Acceptance Gatekeeper</strong>:
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded bg-slate-50 border border-slate-200">
              <span className="font-bold text-slate-900 block">Key 1: Commercial</span>
              <span className="text-[11px] text-slate-500">Client digitally confirms fee quote and 50% advance terms.</span>
            </div>
            <div className="p-2.5 rounded bg-slate-50 border border-slate-200">
              <span className="font-bold text-slate-900 block">Key 2: Risk Clearance</span>
              <span className="text-[11px] text-slate-500">Partner verifies AML/KYC background per ISA 220.</span>
            </div>
          </div>
          <p>
            Upon clearance, the system provisions a 5-folder directory, schedules the team, and calculates <strong>3-tier materiality (PM, TE, SAD)</strong> with manager ±5% rounding tolerance.
          </p>
        </div>
      ),
      tab: 'materiality'
    },
    {
      title: 'Module 3: Fieldwork & Split Dashboard',
      subtitle: 'P&L / Balance Sheet Split View with Row-Level Concurrency',
      icon: LayoutList,
      content: (
        <div className="space-y-3 text-xs text-slate-600">
          <p>
            The fieldwork core features a split dashboard displaying <strong>Profit & Loss on top</strong> and <strong>Balance Sheet on the bottom</strong>.
          </p>
          <ul className="list-disc pl-4 space-y-1.5 text-[11px]">
            <li><strong>Row-Level Concurrency:</strong> Multiple auditors test different lines simultaneously with zero file conflicts.</li>
            <li><strong>Dual Action Triggers:</strong> Launch <code>[AR Test]</code> (Analytical Review & ISA 570 Going Concern) or <code>[Audit Workprogram]</code> (Substantive procedures & assertions).</li>
            <li><strong>Hybrid Evidence Linking:</strong> Connects digital working papers alongside physical binder index codes (e.g. <code>[X-1, Box 3]</code>).</li>
            <li><strong>Three-Tier Review:</strong> Preparer submits → Reviewer (Manager) can approve OR Return with Mandatory Comments (Under Rework loop).</li>
          </ul>
        </div>
      ),
      tab: 'fieldwork'
    },
    {
      title: 'Module 4 & 5: Deliverables, Archival & Practice Economics',
      subtitle: '5-Part Commercial Bundle, 60-Day Lock (ISA 230) & Rate Realization',
      icon: PackageCheck,
      content: (
        <div className="space-y-3 text-xs text-slate-600">
          <p>
            Following SRM and confirmation clearance, the Partner selects the audit opinion (Clean, Qualified, Disclaimer, Adverse) and generates the mandatory 5-part bundle:
          </p>
          <div className="p-2.5 rounded bg-slate-50 border border-slate-200 text-[11px] space-y-1">
            <div>1. Independent Auditor's Report & Statements (Signed PDF)</div>
            <div>2. Management Letter (Internal control observations)</div>
            <div>3. Letter of Representation (LOR for client letterhead)</div>
            <div>4. Management Correspondences Audit Trail</div>
            <div>5. Final Balance Fee Note (Remaining 50% invoice)</div>
          </div>
          <p>
            Starts the <strong>60-day regulatory file lock timer (ISA 230)</strong>, permanently freezing working papers in read-only format while feeding actuals to the practice ledger.
          </p>
        </div>
      ),
      tab: 'deliverables'
    },
    {
      title: 'Industrial Standards (Optional / Big-4 Best Practice)',
      subtitle: 'ISQM 1, ISA 240 Fraud Anchors, and Engagement Quality Review',
      icon: Sparkles,
      content: (
        <div className="space-y-3 text-xs text-slate-600">
          <p>
            You can toggle <strong>Big-4 & PIE Standards</strong> in the header or in the State Machine at any time. When enabled:
          </p>
          <ul className="list-disc pl-4 space-y-1.5 text-[11px]">
            <li><strong>ISA 220 & ISQM 1:</strong> Predecessor auditor clearance, team independence re-certification, and 2nd Partner EQR sign-off gate before report issue.</li>
            <li><strong>ISA 240 & ISA 315:</strong> Presumed fraud risk anchors (revenue recognition & management override) and ERP IT general controls (ITGCs).</li>
            <li><strong>ISA 530 & ISA 540:</strong> 3-stratum sampling (100% key items above PM + random residual) and forward-looking estimate sensitivity bands.</li>
            <li><strong>ISA 580 & ISA 560:</strong> Strict calendar same-day dating validation between the client's Letter of Representation (LOR) and the Audit Report.</li>
          </ul>
          <p className="text-slate-500 italic text-[11px]">
            These enhancements raise workflows to Tier-1 international audit firm defense standards while remaining strictly optional.
          </p>
        </div>
      ),
      tab: 'lifecycle'
    }
  ];

  const slide = slides[currentSlide];
  const Icon = slide.icon;

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full max-h-[92vh] flex flex-col border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50 gap-2 shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0">
              <Icon className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-mono text-blue-600 font-bold uppercase tracking-wider block">
                Guide · Step {currentSlide + 1} of {slides.length}
              </span>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                {slide.title}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 min-h-[44px] min-w-[44px] flex items-center justify-center shrink-0 transition-colors"
            aria-label="Close Tour"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          <h4 className="text-xs font-semibold text-slate-500 mb-2">
            {slide.subtitle}
          </h4>
          {slide.content}
        </div>

        {/* Footer */}
        <div className="p-3 sm:p-4 border-t border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
          <button
            onClick={() => {
              onSelectTab(slide.tab);
              onClose();
            }}
            className="text-xs text-blue-600 hover:underline font-semibold text-left min-h-[36px] flex items-center"
          >
            Explore this View Directly →
          </button>

          <div className="flex items-center justify-end gap-2">
            <button
              onClick={handlePrev}
              disabled={currentSlide === 0}
              className="px-3 py-2 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 disabled:opacity-40 min-h-[44px] touch-manipulation active:bg-slate-100"
            >
              Back
            </button>
            <button
              onClick={handleNext}
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold min-h-[44px] touch-manipulation shadow-xs active:bg-blue-800"
            >
              {currentSlide === slides.length - 1 ? 'Finish Tour' : 'Next Step'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

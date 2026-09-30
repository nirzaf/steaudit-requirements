import React, { useState } from 'react';
import { 
  SplitSquareVertical, 
  TrendingUp, 
  ClipboardCheck, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  Plus, 
  Paperclip, 
  FileText, 
  RotateCcw, 
  Calculator, 
  Target, 
  ShieldAlert,
  ArrowRight,
  User,
  Sparkles
} from 'lucide-react';
import { SAMPLE_FSLIS } from '../data/auditWorkflowData';
import { FSLIItem } from '../types/audit';

export const SplitDashboardSimulator: React.FC = () => {
  const [fslis, setFslis] = useState<FSLIItem[]>(SAMPLE_FSLIS);
  const [activeModal, setActiveModal] = useState<{ type: 'AR' | 'WORKPROGRAM'; fsli: FSLIItem } | null>(null);

  // Substantive Workprogram Ad-hoc step addition state
  const [newStepDescription, setNewStepDescription] = useState<string>('');
  const [newStepAssertion, setNewStepAssertion] = useState<'Existence' | 'Completeness' | 'Valuation' | 'Rights & Obligations' | 'Presentation' | 'Cut-off'>('Valuation');

  // Reviewer Rejection Loop Note state
  const [rejectionComment, setRejectionComment] = useState<string>('');
  const [isRejecting, setIsRejecting] = useState<boolean>(false);

  // Sampling calculator state inside workprogram
  const [samplingMethod, setSamplingMethod] = useState<'MUS' | 'RANDOM' | 'STRATIFIED'>('MUS');
  const [populationSize, setPopulationSize] = useState<number>(450);
  const [tolerableMisstatement, setTolerableMisstatement] = useState<number>(116000); // from materiality
  const [computedSampleSize, setComputedSampleSize] = useState<number>(36);

  const plItems = fslis.filter(f => f.statement === 'PL');
  const bsItems = fslis.filter(f => f.statement === 'BS');

  const formatQAR = (val: number) => {
    return new Intl.NumberFormat('en-QA', {
      style: 'currency',
      currency: 'QAR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const getRiskBadge = (risk: 'GREEN' | 'AMBER' | 'RED') => {
    switch (risk) {
      case 'GREEN':
        return (
          <span className="px-2 py-0.5 text-xs font-semibold rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
            Green (Low Risk &lt; TE)
          </span>
        );
      case 'AMBER':
        return (
          <span className="px-2 py-0.5 text-xs font-semibold rounded bg-amber-50 text-amber-800 border border-amber-200">
            Amber (Moderate Risk &gt; TE)
          </span>
        );
      case 'RED':
        return (
          <span className="px-2 py-0.5 text-xs font-semibold rounded bg-rose-50 text-rose-800 border border-rose-200">
            Red (Critical &gt; PM)
          </span>
        );
    }
  };

  const getStatusBadge = (status: FSLIItem['status']) => {
    switch (status) {
      case 'In Progress':
        return <span className="text-slate-600 font-medium">In Progress</span>;
      case 'Ready for Review':
        return <span className="text-sky-700 font-bold">Ready for Review</span>;
      case 'Under Rework':
        return <span className="text-rose-700 font-bold flex items-center gap-1"><RotateCcw className="w-3 h-3" /> Under Rework</span>;
      case 'Manager Approved':
        return <span className="text-emerald-700 font-bold flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Manager Approved</span>;
      case 'Partner Signed Off':
        return <span className="text-purple-700 font-bold">Partner Signed Off</span>;
    }
  };

  // Add ad-hoc step to current workprogram
  const handleAddAdHocStep = () => {
    if (!newStepDescription.trim() || !activeModal) return;

    const newStep = {
      id: `step-adhoc-${Date.now()}`,
      assertion: newStepAssertion,
      description: `[Ad-Hoc Step] ${newStepDescription.trim()}`,
      completed: false,
      reviewerNote: 'Newly injected custom procedure'
    };

    const updatedFslis = fslis.map(f => {
      if (f.id === activeModal.fsli.id) {
        return {
          ...f,
          workprogramSteps: [...f.workprogramSteps, newStep],
          status: 'In Progress' as const
        };
      }
      return f;
    });

    setFslis(updatedFslis);
    setActiveModal({
      ...activeModal,
      fsli: updatedFslis.find(f => f.id === activeModal.fsli.id)!
    });
    setNewStepDescription('');
  };

  // Three-tier review loop: Manager returns with mandatory comments (Under Rework)
  const handleRejectionLoop = () => {
    if (!rejectionComment.trim() || !activeModal) return;

    const updatedFslis = fslis.map(f => {
      if (f.id === activeModal.fsli.id) {
        const steps = [...f.workprogramSteps];
        if (steps.length > 0) {
          steps[steps.length - 1] = {
            ...steps[steps.length - 1],
            completed: false,
            reviewerNote: `Manager Rejection: ${rejectionComment.trim()}`
          };
        }
        return {
          ...f,
          status: 'Under Rework' as const,
          workprogramSteps: steps
        };
      }
      return f;
    });

    setFslis(updatedFslis);
    setIsRejecting(false);
    setRejectionComment('');
    setActiveModal({
      ...activeModal,
      fsli: updatedFslis.find(f => f.id === activeModal.fsli.id)!
    });
  };

  // Manager Approve workprogram
  const handleManagerApprove = () => {
    if (!activeModal) return;

    const updatedFslis = fslis.map(f => {
      if (f.id === activeModal.fsli.id) {
        return {
          ...f,
          status: 'Manager Approved' as const
        };
      }
      return f;
    });

    setFslis(updatedFslis);
    setActiveModal({
      ...activeModal,
      fsli: updatedFslis.find(f => f.id === activeModal.fsli.id)!
    });
  };

  // Recalculate sample size
  const handleRecalculateSampling = (items: number, error: number) => {
    setPopulationSize(items);
    setTolerableMisstatement(error);
    // Simple MUS calculation demonstration: (Population / TE) * Factor
    const factor = samplingMethod === 'MUS' ? 3.0 : 2.5;
    const calc = Math.min(items, Math.max(15, Math.round((items * 500) / error * factor)));
    setComputedSampleSize(calc);
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600">
              <Sparkles className="w-4 h-4" />
              <span>Section 1.2 & 4.3 · Technical Fieldwork Execution</span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 mt-1">
              Split Financial Statement Dashboard View (P&L and Balance Sheet)
            </h1>
            <p className="text-xs text-slate-600 mt-1 max-w-3xl">
              Live interactive representation of row-level concurrency, automated FSLI mapping, risk stratification (Green, Amber, Red), and dedicated [AR Test] & [Audit Workprogram] execution triggers.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-600">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Row-Level Concurrency Active</span>
            </span>
          </div>
        </div>
      </div>

      {/* Split Dashboard: Upper Half (P&L) */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-xs font-bold bg-blue-100 text-blue-800 font-mono">
              UPPER VIEW
            </span>
            <h2 className="text-sm font-bold text-slate-900">
              Profit & Loss (P/L) Statement Line Items
            </h2>
          </div>
          <span className="text-xs text-slate-500 font-mono">FY 2025 vs FY 2024 (QAR)</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-4">Line Item (FSLI)</th>
                <th className="py-2.5 px-3">Assigned Auditor</th>
                <th className="py-2.5 px-3 text-right">Prior Year (QAR)</th>
                <th className="py-2.5 px-3 text-right">Current Year (QAR)</th>
                <th className="py-2.5 px-3 text-right">Variance %</th>
                <th className="py-2.5 px-3">Risk Tier</th>
                <th className="py-2.5 px-3">Workflow State</th>
                <th className="py-2.5 px-4 text-center">Execution Triggers</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {plItems.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-semibold text-slate-900">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-mono text-slate-500">{item.code}</span>
                      <span>{item.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-slate-600">
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3 text-slate-400" />
                      {item.assignedTo}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right font-mono tabular-nums text-slate-600">
                    {formatQAR(item.priorYearQAR)}
                  </td>
                  <td className="py-3 px-3 text-right font-mono tabular-nums font-semibold text-slate-900">
                    {formatQAR(item.currentYearQAR)}
                  </td>
                  <td className="py-3 px-3 text-right font-mono tabular-nums font-semibold text-blue-600">
                    +{item.variancePercent}%
                  </td>
                  <td className="py-3 px-3">
                    {getRiskBadge(item.riskLevel)}
                  </td>
                  <td className="py-3 px-3">
                    {getStatusBadge(item.status)}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        onClick={() => setActiveModal({ type: 'AR', fsli: item })}
                        className="px-2.5 py-1 text-xs font-semibold rounded bg-sky-50 text-sky-700 hover:bg-sky-100 transition-colors border border-sky-200 flex items-center gap-1"
                      >
                        <TrendingUp className="w-3 h-3" />
                        <span>[AR Test]</span>
                      </button>
                      <button
                        onClick={() => setActiveModal({ type: 'WORKPROGRAM', fsli: item })}
                        className="px-2.5 py-1 text-xs font-semibold rounded bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors border border-emerald-200 flex items-center gap-1"
                      >
                        <ClipboardCheck className="w-3 h-3" />
                        <span>[Audit Workprogram]</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Split Dashboard: Lower Half (Balance Sheet) */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-xs font-bold bg-purple-100 text-purple-800 font-mono">
              LOWER VIEW
            </span>
            <h2 className="text-sm font-bold text-slate-900">
              Balance Sheet (B/S) Statement Line Items
            </h2>
          </div>
          <span className="text-xs text-slate-500 font-mono">Assets & Liabilities (QAR)</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-4">Line Item (FSLI)</th>
                <th className="py-2.5 px-3">Assigned Auditor</th>
                <th className="py-2.5 px-3 text-right">Prior Year (QAR)</th>
                <th className="py-2.5 px-3 text-right">Current Year (QAR)</th>
                <th className="py-2.5 px-3 text-right">Variance %</th>
                <th className="py-2.5 px-3">Risk Tier</th>
                <th className="py-2.5 px-3">Workflow State</th>
                <th className="py-2.5 px-4 text-center">Execution Triggers</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {bsItems.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-semibold text-slate-900">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-mono text-slate-500">{item.code}</span>
                      <span>{item.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-slate-600">
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3 text-slate-400" />
                      {item.assignedTo}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right font-mono tabular-nums text-slate-600">
                    {formatQAR(item.priorYearQAR)}
                  </td>
                  <td className="py-3 px-3 text-right font-mono tabular-nums font-semibold text-slate-900">
                    {formatQAR(item.currentYearQAR)}
                  </td>
                  <td className="py-3 px-3 text-right font-mono tabular-nums font-semibold text-blue-600">
                    +{item.variancePercent}%
                  </td>
                  <td className="py-3 px-3">
                    {getRiskBadge(item.riskLevel)}
                  </td>
                  <td className="py-3 px-3">
                    {getStatusBadge(item.status)}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        onClick={() => setActiveModal({ type: 'AR', fsli: item })}
                        className="px-2.5 py-1 text-xs font-semibold rounded bg-sky-50 text-sky-700 hover:bg-sky-100 transition-colors border border-sky-200 flex items-center gap-1"
                      >
                        <TrendingUp className="w-3 h-3" />
                        <span>[AR Test]</span>
                      </button>
                      <button
                        onClick={() => setActiveModal({ type: 'WORKPROGRAM', fsli: item })}
                        className="px-2.5 py-1 text-xs font-semibold rounded bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors border border-emerald-200 flex items-center gap-1"
                      >
                        <ClipboardCheck className="w-3 h-3" />
                        <span>[Audit Workprogram]</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Interactive Modal: Analytical Review [AR Test] */}
      {activeModal && activeModal.type === 'AR' && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-sky-50/60">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-sky-600 text-white flex items-center justify-center shadow-xs">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Analytical Review (AR) — {activeModal.fsli.name}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Multi-period variance calculation & ISA 570 Going Concern Evaluation
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-4 text-xs">
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80">
                  <span className="text-slate-500 block text-[10px]">Prior Year</span>
                  <span className="font-mono font-bold text-slate-800">
                    {formatQAR(activeModal.fsli.priorYearQAR)}
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80">
                  <span className="text-slate-500 block text-[10px]">Current Year</span>
                  <span className="font-mono font-bold text-slate-800">
                    {formatQAR(activeModal.fsli.currentYearQAR)}
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80">
                  <span className="text-slate-500 block text-[10px]">Variance</span>
                  <span className="font-mono font-bold text-blue-600">
                    +{activeModal.fsli.variancePercent}% ({formatQAR(activeModal.fsli.varianceQAR)})
                  </span>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 mb-1">
                  Ratio & Plausibility Assessment
                </h4>
                <p className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 text-slate-700 leading-relaxed">
                  {activeModal.fsli.analyticalReview.ratioAssessment} {activeModal.fsli.analyticalReview.plausibilitySummary}
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200">
                <div className="flex items-center gap-2 font-bold text-emerald-800 mb-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>ISA 570 Going Concern Evaluation</span>
                </div>
                <p className="text-emerald-900 text-xs">
                  Zero significant doubt noted. Cash flows from operations remain positive and debt covenants are fully in compliance with Qatari commercial lending requirements.
                </p>
              </div>
            </div>

            <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end">
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 shadow-xs"
              >
                Save & Close AR Schedule
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Modal: Substantive Audit Workprogram */}
      {activeModal && activeModal.type === 'WORKPROGRAM' && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-emerald-50/60">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                  <ClipboardCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-900">
                      Substantive Workprogram — {activeModal.fsli.name}
                    </h3>
                    <span className="text-xs font-mono font-bold text-slate-600 bg-white px-1.5 py-0.5 rounded border border-slate-200">
                      {activeModal.fsli.code}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Assertions testing, MUS sampling, hybrid physical/digital evidence & Three-Tier Review
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 overflow-y-auto space-y-6 text-xs flex-1">
              {/* Sampling Engine Banner */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5 font-bold text-slate-800">
                    <Target className="w-4 h-4 text-blue-600" />
                    <span>Embedded Population & Sampling Engine (ISA 530)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {(['MUS', 'RANDOM', 'STRATIFIED'] as const).map(m => (
                      <button
                        key={m}
                        onClick={() => {
                          setSamplingMethod(m);
                          handleRecalculateSampling(populationSize, tolerableMisstatement);
                        }}
                        className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                          samplingMethod === m
                            ? 'bg-blue-600 text-white shadow-2xs'
                            : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        {m === 'MUS' ? 'Monetary Unit (MUS)' : m === 'RANDOM' ? 'Systematic Random' : 'Stratified Attribute'}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="text-slate-500 block text-[10px] mb-0.5">Total Population Vouchers</label>
                    <input
                      type="number"
                      value={populationSize}
                      onChange={(e) => handleRecalculateSampling(Number(e.target.value), tolerableMisstatement)}
                      className="w-full bg-white border border-slate-200 rounded px-2.5 py-1 font-mono text-xs text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="text-slate-500 block text-[10px] mb-0.5">Tolerable Error Cutoff (QAR)</label>
                    <input
                      type="number"
                      value={tolerableMisstatement}
                      onChange={(e) => handleRecalculateSampling(populationSize, Number(e.target.value))}
                      className="w-full bg-white border border-slate-200 rounded px-2.5 py-1 font-mono text-xs text-slate-800"
                    />
                  </div>
                  <div className="flex flex-col justify-end">
                    <div className="p-1.5 rounded bg-blue-50 border border-blue-200 text-center font-bold text-blue-700">
                      Calculated Sample Size: {computedSampleSize} Vouchers
                    </div>
                  </div>
                </div>
              </div>

              {/* Procedural Checklist with Hybrid Evidence Linking */}
              <div>
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-2.5">
                  Assigned Procedural Steps & Hybrid Evidence Cross-References
                </h4>
                <div className="space-y-2.5">
                  {activeModal.fsli.workprogramSteps.map((step, idx) => (
                    <div
                      key={step.id}
                      className="p-3.5 rounded-lg border border-slate-200 bg-white space-y-2 shadow-2xs"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-2">
                          <span className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center font-mono text-[10px] text-slate-600 font-bold shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-slate-100 text-slate-700 border border-slate-200/60">
                                {step.assertion}
                              </span>
                              <span className={`text-[10px] font-semibold ${
                                step.completed ? 'text-emerald-700' : 'text-amber-700'
                              }`}>
                                {step.completed ? 'Completed' : 'Pending Verification'}
                              </span>
                            </div>
                            <p className="text-slate-800 text-xs font-medium">
                              {step.description}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Hybrid Evidence Row */}
                      <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-3 text-[11px]">
                        <div className="flex items-center gap-1.5 text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                          <Paperclip className="w-3 h-3 text-blue-600" />
                          <span>Digital Working Paper:</span>
                          <strong className="font-mono text-slate-800">
                            {step.digitalRef || 'Not attached yet'}
                          </strong>
                        </div>

                        <div className="flex items-center gap-1.5 text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          <FileText className="w-3 h-3 text-amber-600" />
                          <span>Physical Binder Code:</span>
                          <strong className="font-mono text-slate-900">
                            {step.physicalBinderRef ? `[${step.physicalBinderRef}]` : '[X-1, Box 3]'}
                          </strong>
                        </div>
                      </div>

                      {/* Reviewer Note / Rejection Flag */}
                      {step.reviewerNote && (
                        <div className="p-2 rounded bg-rose-50 border border-rose-200 text-rose-800 text-[11px] flex items-center gap-1.5">
                          <ShieldAlert className="w-3.5 h-3.5 shrink-0 text-rose-600" />
                          <span>{step.reviewerNote}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Dynamic Ad-Hoc Step Insertion */}
              <div className="p-3.5 rounded-xl border border-dashed border-slate-300 bg-slate-50/70">
                <h5 className="font-bold text-slate-800 text-xs mb-2 flex items-center gap-1.5">
                  <Plus className="w-3.5 h-3.5 text-blue-600" />
                  <span>Dynamic Injection of Ad-Hoc Audit Procedure</span>
                </h5>
                <div className="flex flex-col sm:flex-row gap-2">
                  <select
                    value={newStepAssertion}
                    onChange={(e) => setNewStepAssertion(e.target.value as any)}
                    className="bg-white border border-slate-200 rounded px-2.5 py-1 text-xs text-slate-800"
                  >
                    <option value="Existence">Existence</option>
                    <option value="Completeness">Completeness</option>
                    <option value="Valuation">Valuation</option>
                    <option value="Rights & Obligations">Rights & Obligations</option>
                    <option value="Presentation">Presentation</option>
                    <option value="Cut-off">Cut-off</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Enter custom procedural test details..."
                    value={newStepDescription}
                    onChange={(e) => setNewStepDescription(e.target.value)}
                    className="flex-1 bg-white border border-slate-200 rounded px-3 py-1 text-xs text-slate-800"
                  />
                  <button
                    onClick={handleAddAdHocStep}
                    disabled={!newStepDescription.trim()}
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded text-xs font-semibold whitespace-nowrap shadow-xs"
                  >
                    Inject Step
                  </button>
                </div>
              </div>

              {/* Rejection Loop Box (Three-Tier Review) */}
              {isRejecting ? (
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-300 space-y-2">
                  <div className="font-bold text-rose-900 text-xs">
                    Manager Rework Rejection (Reverts Status to Under Rework):
                  </div>
                  <textarea
                    rows={2}
                    placeholder="Enter mandatory reviewer deficiency notes for junior auditor..."
                    value={rejectionComment}
                    onChange={(e) => setRejectionComment(e.target.value)}
                    className="w-full bg-white border border-rose-300 rounded p-2 text-xs text-slate-800"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setIsRejecting(false)}
                      className="px-2.5 py-1 rounded text-xs text-slate-600 hover:bg-slate-100"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleRejectionLoop}
                      disabled={!rejectionComment.trim()}
                      className="px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded text-xs font-semibold shadow-xs"
                    >
                      Confirm Return with Comments
                    </button>
                  </div>
                </div>
              ) : null}
            </div>

            {/* Modal Footer with Three-Tier Action Buttons */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs text-slate-500">
                Current Status: <strong className="text-slate-900">{activeModal.fsli.status}</strong>
              </div>

              <div className="flex items-center gap-2">
                {!isRejecting && (
                  <button
                    onClick={() => setIsRejecting(true)}
                    className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 transition-colors flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Return with Mandatory Comments</span>
                  </button>
                )}

                <button
                  onClick={handleManagerApprove}
                  className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-colors flex items-center gap-1.5 shadow-xs"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Manager Sign-Off & Approve</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

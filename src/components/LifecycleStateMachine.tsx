import React, { useState } from 'react';
import { 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  KeySquare, 
  Lock, 
  ShieldAlert, 
  Clock, 
  History, 
  FileCheck2,
  ChevronRight,
  ChevronLeft,
  Sparkles
} from 'lucide-react';
import { STATE_MACHINE_STEPS, PERSONAS } from '../data/auditWorkflowData';
import { LifecycleState, PersonaRole } from '../types/audit';

interface LifecycleStateMachineProps {
  onJumpToTab?: (tab: string) => void;
}

export const LifecycleStateMachine: React.FC<LifecycleStateMachineProps> = ({ onJumpToTab }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(2); // Start at DUAL_KEY_PENDING for demonstration
  
  // Interactive Gatekeeper Controls
  const [dualKeyClientConfirmed, setDualKeyClientConfirmed] = useState<boolean>(true);
  const [dualKeyPartnerAmlConfirmed, setDualKeyPartnerAmlConfirmed] = useState<boolean>(false);
  const [confirmationsReceived, setConfirmationsReceived] = useState<boolean>(false);
  const [sixtyDayTimerElapsed, setSixtyDayTimerElapsed] = useState<boolean>(false);

  // Optional Enhanced Quality Gates (Big-4 / PIE Standard)
  const [includeEnhancedGates, setIncludeEnhancedGates] = useState<boolean>(false);
  const [predecessorClearanceDone, setPredecessorClearanceDone] = useState<boolean>(false);
  const [fraudItgcCheckDone, setFraudItgcCheckDone] = useState<boolean>(false);
  const [eqrReviewDone, setEqrReviewDone] = useState<boolean>(false);
  const [sameDayLorDone, setSameDayLorDone] = useState<boolean>(false);
  
  // Audit log of state transitions
  const [auditLog, setAuditLog] = useState<Array<{ timestamp: string; from: string; to: string; triggeredBy: string }>>([
    { timestamp: '10:14:02', from: 'INIT', to: 'LEAD_INGESTION', triggeredBy: 'Inquiry Ingested (WhatsApp)' },
    { timestamp: '10:28:45', from: 'LEAD_INGESTION', to: 'PROPOSAL_GENERATION', triggeredBy: 'Commercial Profile Validated' },
    { timestamp: '11:05:12', from: 'PROPOSAL_GENERATION', to: 'DUAL_KEY_PENDING', triggeredBy: 'Proposal Dispatched to MD' }
  ]);

  const currentStep = STATE_MACHINE_STEPS[currentStepIndex];

  // Evaluate gate condition for current state
  const isGateSatisfied = (): { satisfied: boolean; reason: string } => {
    if (currentStep.id === 'DUAL_KEY_PENDING') {
      if (!dualKeyClientConfirmed && !dualKeyPartnerAmlConfirmed) {
        return { satisfied: false, reason: 'Both Key 1 (Client Acceptance) and Key 2 (Partner AML/KYC) are missing!' };
      }
      if (!dualKeyClientConfirmed) {
        return { satisfied: false, reason: 'Key 1 Missing: Client has not digitally confirmed the quote fee.' };
      }
      if (!dualKeyPartnerAmlConfirmed) {
        return { satisfied: false, reason: 'Key 2 Missing: Partner has not completed AML/KYC background check (ISA 220).' };
      }
      if (includeEnhancedGates && !predecessorClearanceDone) {
        return { satisfied: false, reason: 'Enhanced Gate Missing: Predecessor Auditor Clearance & IESBA independence declaration not verified.' };
      }
      return { satisfied: true, reason: 'Dual-Key Cleared: Commercial approval & AML risk sign-off both verified.' };
    }

    if (currentStep.id === 'PORTAL_ACTIVE_PLANNING' && includeEnhancedGates) {
      if (!fraudItgcCheckDone) {
        return { satisfied: false, reason: 'Enhanced Gate Missing: ISA 240 Presumed Fraud Risks (Revenue/Override) & ITGCs checklist pending.' };
      }
      return { satisfied: true, reason: 'Planning & ISA 240 Fraud/ITGC documentation verified.' };
    }

    if (currentStep.id === 'MANAGERIAL_REVIEW') {
      if (!confirmationsReceived) {
        return { satisfied: false, reason: 'External Confirmations Gatekeeper: Critical Legal Confirmation pending! Release blocked.' };
      }
      return { satisfied: true, reason: 'Zero open review notes, SRM compiled, and critical confirmations returned.' };
    }

    if (currentStep.id === 'PARTNER_APPROVAL' && includeEnhancedGates) {
      if (!eqrReviewDone) {
        return { satisfied: false, reason: 'Enhanced Gate Missing: ISQM 1 Second Partner Engagement Quality Review (EQR) sign-off pending.' };
      }
      return { satisfied: true, reason: 'Partner Clearance & ISQM 1 Second Partner EQR concurrence obtained.' };
    }

    if (currentStep.id === 'DELIVERABLE_RELEASE' && includeEnhancedGates) {
      if (!sameDayLorDone) {
        return { satisfied: false, reason: 'Enhanced Gate Missing: ISA 580 Exact Same-Day LOR Date & ISA 560 Subsequent Events verification pending.' };
      }
      return { satisfied: true, reason: '5-part bundle compiled with synchronized ISA 580 representation dates.' };
    }

    if (currentStep.id === 'COMPLIANCE_COUNTDOWN') {
      if (!sixtyDayTimerElapsed) {
        return { satisfied: false, reason: '60-day regulatory file completion countdown active (or awaiting early Partner manual lock).' };
      }
      return { satisfied: true, reason: '60 calendar days elapsed or Partner early lock authorized.' };
    }

    return { satisfied: true, reason: currentStep.gateCondition };
  };

  const gateResult = isGateSatisfied();

  const handleAdvance = () => {
    if (!gateResult.satisfied) return;
    if (currentStepIndex >= STATE_MACHINE_STEPS.length - 1) return;

    const nextIndex = currentStepIndex + 1;
    const nextStep = STATE_MACHINE_STEPS[nextIndex];

    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0];

    setAuditLog(prev => [
      {
        timestamp: timeStr,
        from: currentStep.id,
        to: nextStep.id,
        triggeredBy: `Gate Cleared: ${gateResult.reason.slice(0, 45)}...`
      },
      ...prev
    ]);

    setCurrentStepIndex(nextIndex);
  };

  const handleReset = () => {
    setCurrentStepIndex(0);
    setDualKeyClientConfirmed(false);
    setDualKeyPartnerAmlConfirmed(false);
    setConfirmationsReceived(false);
    setSixtyDayTimerElapsed(false);
    setPredecessorClearanceDone(false);
    setFraudItgcCheckDone(false);
    setEqrReviewDone(false);
    setSameDayLorDone(false);
    setAuditLog([
      { timestamp: '12:00:00', from: 'RESET', to: 'LEAD_INGESTION', triggeredBy: 'Simulator Reset' }
    ]);
  };

  return (
    <div className="space-y-6">
      {/* Header and Summary */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-600">
              <Sparkles className="w-4 h-4" />
              <span>Section 5 · State Machine & Lifecycle Transitions</span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 mt-1">
              Engagement Lifecycle State Machine (11 Sequential States)
            </h1>
            <p className="text-xs text-slate-600 mt-1 max-w-3xl">
              An engagement progresses strictly through automated compliance gates. Test state transitions, dual-key barriers, and optional Big-4 enhanced quality standards below.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setIncludeEnhancedGates(!includeEnhancedGates)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                includeEnhancedGates
                  ? 'bg-blue-50 text-blue-800 border-blue-300 ring-2 ring-blue-500/20'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Enhanced Quality Gates: {includeEnhancedGates ? 'ON' : 'OFF'}</span>
            </button>

            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Simulator</span>
            </button>
            <button
              onClick={handleAdvance}
              disabled={!gateResult.satisfied || currentStepIndex === STATE_MACHINE_STEPS.length - 1}
              className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-2 sm:py-1.5 text-xs font-semibold rounded-lg transition-colors shadow-xs min-h-[40px] sm:min-h-[36px] touch-manipulation ${
                gateResult.satisfied && currentStepIndex < STATE_MACHINE_STEPS.length - 1
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
              }`}
            >
              <span>Advance to Next State</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mobile Step Navigator (< md) */}
        <div className="md:hidden mt-4 pt-3 border-t border-slate-100 space-y-2">
          <div className="flex items-center justify-between gap-2">
            <button
              onClick={() => setCurrentStepIndex(Math.max(0, currentStepIndex - 1))}
              disabled={currentStepIndex === 0}
              className={`px-3 py-2 text-xs font-semibold rounded-lg border flex items-center gap-1 min-h-[44px] touch-manipulation ${
                currentStepIndex === 0
                  ? 'bg-slate-50 text-slate-400 border-slate-200 cursor-not-allowed'
                  : 'bg-white text-slate-700 border-slate-200 active:bg-slate-100'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Prev</span>
            </button>

            <div className="text-center min-w-0 flex-1 px-1">
              <span className="text-[10px] font-mono text-slate-500 font-bold block">
                STEP {currentStep.stepNumber} OF 11
              </span>
              <span className="text-xs font-bold text-slate-900 truncate block">
                {currentStep.label}
              </span>
            </div>

            <button
              onClick={() => setCurrentStepIndex(Math.min(STATE_MACHINE_STEPS.length - 1, currentStepIndex + 1))}
              disabled={currentStepIndex === STATE_MACHINE_STEPS.length - 1}
              className={`px-3 py-2 text-xs font-semibold rounded-lg border flex items-center gap-1 min-h-[44px] touch-manipulation ${
                currentStepIndex === STATE_MACHINE_STEPS.length - 1
                  ? 'bg-slate-50 text-slate-400 border-slate-200 cursor-not-allowed'
                  : 'bg-white text-slate-700 border-slate-200 active:bg-slate-100'
              }`}
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <select
            value={currentStepIndex}
            onChange={(e) => setCurrentStepIndex(Number(e.target.value))}
            className="w-full bg-slate-50 text-slate-800 border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium focus:ring-2 focus:ring-blue-500 min-h-[44px]"
          >
            {STATE_MACHINE_STEPS.map((s, idx) => (
              <option key={s.id} value={idx}>
                Step {s.stepNumber}: {s.label} ({s.id})
              </option>
            ))}
          </select>
        </div>

        {/* 11 Steps Horizontal Bar (Desktop & Tablet >= md) */}
        <div className="hidden md:block mt-6 pt-4 border-t border-slate-100 overflow-x-auto pb-2">
          <div className="flex items-center gap-1 min-w-[900px]">
            {STATE_MACHINE_STEPS.map((step, idx) => {
              const isPast = idx < currentStepIndex;
              const isCurrent = idx === currentStepIndex;

              return (
                <button
                  key={step.id}
                  onClick={() => setCurrentStepIndex(idx)}
                  className={`flex-1 p-2.5 rounded-lg text-left transition-all border ${
                    isCurrent
                      ? 'bg-blue-50/80 border-blue-500 ring-2 ring-blue-500/20 shadow-xs'
                      : isPast
                      ? 'bg-slate-50 border-slate-200 hover:border-slate-300'
                      : 'bg-white border-slate-100 opacity-60 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] mb-1">
                    <span className="font-mono text-slate-500 font-semibold">
                      Step {step.stepNumber}
                    </span>
                    {isPast ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    ) : isCurrent ? (
                      <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping"></span>
                    ) : null}
                  </div>
                  <div className="text-xs font-bold text-slate-900 truncate">
                    {step.label}
                  </div>
                  <div className="text-[10px] text-slate-500 truncate font-mono mt-0.5">
                    {step.id}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Active State Inspector & Interactive Gate Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Active State Details & Gatekeeper Evaluation */}
        <div className="lg:col-span-2 space-y-6">
          {/* Current State Detail Box */}
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 text-xs font-mono font-bold rounded bg-blue-600 text-white shadow-2xs">
                  STATE {currentStep.stepNumber} / 11
                </span>
                <span className="text-sm font-mono text-slate-500 font-medium">
                  {currentStep.id}
                </span>
              </div>
              <div className="text-xs text-slate-500">
                Primary Actor: <strong className="text-slate-900">{PERSONAS[currentStep.primaryPersona]?.title}</strong>
              </div>
            </div>

            <h2 className="text-lg font-bold text-slate-900 mb-2">
              {currentStep.label}
            </h2>
            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              {currentStep.details}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs mb-4">
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80">
                <span className="text-slate-500 font-semibold uppercase text-[10px] tracking-wider block mb-1">
                  Allowed Actions in this State
                </span>
                <span className="text-slate-800">
                  {currentStep.allowedActions}
                </span>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80">
                <span className="text-slate-500 font-semibold uppercase text-[10px] tracking-wider block mb-1">
                  Gate / Condition to Advance
                </span>
                <span className="text-slate-800 font-medium">
                  {currentStep.gateCondition}
                </span>
              </div>
            </div>

            {/* Interactive Gate Condition Testing Widget */}
            <div className="pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <KeySquare className="w-4 h-4 text-blue-600" />
                  <span>Interactive Gatekeeper Barrier Assessment</span>
                </h3>
                <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full border ${
                  gateResult.satisfied
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    : 'bg-rose-50 text-rose-800 border-rose-200'
                }`}>
                  {gateResult.satisfied ? 'GATE CLEARED' : 'GATE BLOCKED'}
                </span>
              </div>

              {/* State-specific interactive triggers */}
              {currentStep.id === 'DUAL_KEY_PENDING' && (
                <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 space-y-3">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-800">
                    <span>Dual-Key Acceptance Gatekeeper (Section 3.1 & 4.1.3):</span>
                    {includeEnhancedGates && (
                      <span className="text-[10px] text-blue-700 bg-blue-100 px-2 py-0.5 rounded font-mono font-bold">
                        Enhanced 3-Point Validation Active
                      </span>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={dualKeyClientConfirmed}
                        onChange={(e) => setDualKeyClientConfirmed(e.target.checked)}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <div>
                        <strong>Key 1: Client Commercial Acceptance</strong>
                        <span className="text-slate-500 block text-[11px]">Client digitally confirms fee quote (95,000 QAR)</span>
                      </div>
                    </label>

                    <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={dualKeyPartnerAmlConfirmed}
                        onChange={(e) => setDualKeyPartnerAmlConfirmed(e.target.checked)}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <div>
                        <strong>Key 2: Partner AML/KYC Risk Clearance (ISA 220)</strong>
                        <span className="text-slate-500 block text-[11px]">Partner reviews UBO (≥25%), sanctions screening, and applies digital stamp</span>
                      </div>
                    </label>

                    {includeEnhancedGates && (
                      <label className="flex items-center gap-2.5 text-xs text-blue-900 cursor-pointer p-2 rounded bg-blue-100/60 border border-blue-200">
                        <input
                          type="checkbox"
                          checked={predecessorClearanceDone}
                          onChange={(e) => setPredecessorClearanceDone(e.target.checked)}
                          className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <div>
                          <strong>Key 3 (Enhanced): Predecessor Clearance & IESBA Independence</strong>
                          <span className="text-blue-800 block text-[11px]">
                            Affirmative response from outgoing auditor (ISA 300/510) and signed team independence declaration.
                          </span>
                        </div>
                      </label>
                    )}
                  </div>
                </div>
              )}

              {currentStep.id === 'PORTAL_ACTIVE_PLANNING' && includeEnhancedGates && (
                <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 space-y-3">
                  <div className="text-xs font-semibold text-blue-900">
                    Enhanced Planning Protocol (ISA 240 & ISA 315):
                  </div>
                  <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={fraudItgcCheckDone}
                      onChange={(e) => setFraudItgcCheckDone(e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <div>
                      <strong>Document Presumed Fraud Risks & ITGC Evaluation</strong>
                      <span className="text-slate-500 block text-[11px]">
                        Verify Revenue Recognition & Management Override testing procedures + client ERP IT controls review.
                      </span>
                    </div>
                  </label>
                </div>
              )}

              {currentStep.id === 'MANAGERIAL_REVIEW' && (
                <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200 space-y-3">
                  <div className="text-xs font-semibold text-amber-900">
                    External Confirmations Gatekeeper (ISA 505):
                  </div>
                  <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={confirmationsReceived}
                      onChange={(e) => setConfirmationsReceived(e.target.checked)}
                      className="w-4 h-4 text-amber-600 rounded focus:ring-amber-500"
                    />
                    <div>
                      <strong>Clear Critical Legal Counsel Confirmation</strong>
                      <span className="text-slate-500 block text-[11px]">Resolve pending civil claim inquiry (Al-Kuwari & Partners). Prevents Holding Letter lock.</span>
                    </div>
                  </label>
                </div>
              )}

              {currentStep.id === 'PARTNER_APPROVAL' && includeEnhancedGates && (
                <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-200 space-y-3">
                  <div className="text-xs font-semibold text-indigo-900">
                    Quality Management Clearance Gate (ISQM 1):
                  </div>
                  <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={eqrReviewDone}
                      onChange={(e) => setEqrReviewDone(e.target.checked)}
                      className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                    />
                    <div>
                      <strong>ISQM 1 Second Partner (EQR) Independent Sign-Off</strong>
                      <span className="text-slate-500 block text-[11px]">
                        Independent Engagement Quality Reviewer verifies significant estimates, judgments, and opinion basis.
                      </span>
                    </div>
                  </label>
                </div>
              )}

              {currentStep.id === 'DELIVERABLE_RELEASE' && includeEnhancedGates && (
                <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-3">
                  <div className="text-xs font-semibold text-emerald-900">
                    Representation & Subsequent Events Protocol (ISA 580 / 560):
                  </div>
                  <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={sameDayLorDone}
                      onChange={(e) => setSameDayLorDone(e.target.checked)}
                      className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                    />
                    <div>
                      <strong>Verify Exact Same-Day LOR Date & ISA 560 Subsequent Events</strong>
                      <span className="text-slate-500 block text-[11px]">
                        CEO/CFO representation letter calendar date strictly matches auditor report sign-off date.
                      </span>
                    </div>
                  </label>
                </div>
              )}

              {currentStep.id === 'COMPLIANCE_COUNTDOWN' && (
                <div className="p-4 rounded-xl bg-purple-50/60 border border-purple-200 space-y-3">
                  <div className="text-xs font-semibold text-purple-900">
                    60-Day Compliance Archival Timer (ISA 230):
                  </div>
                  <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={sixtyDayTimerElapsed}
                      onChange={(e) => setSixtyDayTimerElapsed(e.target.checked)}
                      className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                    />
                    <div>
                      <strong>Simulate 60 Days Elapsed OR Partner Early File Seal</strong>
                      <span className="text-slate-500 block text-[11px]">Converts entire engagement directory to permanently locked Read-Only archive.</span>
                    </div>
                  </label>
                </div>
              )}

              {/* Status explanation */}
              <div className={`mt-3 p-3 rounded-lg text-xs flex items-start gap-2 border ${
                gateResult.satisfied
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  : 'bg-rose-50 text-rose-800 border-rose-200'
              }`}>
                {gateResult.satisfied ? (
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
                ) : (
                  <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
                )}
                <span>{gateResult.reason}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Real-Time Audit Log & State Transition Record */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
                <History className="w-4 h-4 text-blue-600" />
                <span>Immutable Transition Audit Log</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">ISA 230 Sealed</span>
            </div>

            <p className="text-[11px] text-slate-500 mb-3">
              Every lifecycle event, gate clearance, and signatory stamp is recorded with cryptographic timestamps:
            </p>

            <div className="space-y-2.5 max-h-[360px] overflow-y-auto pr-1">
              {auditLog.map((log, idx) => (
                <div 
                  key={idx}
                  className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 text-xs font-mono"
                >
                  <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1">
                    <span className="tabular-nums font-semibold">{log.timestamp}</span>
                    <span className="text-blue-600 font-bold">{log.to}</span>
                  </div>
                  <div className="text-slate-800 text-[11px] font-sans">
                    {log.triggeredBy}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

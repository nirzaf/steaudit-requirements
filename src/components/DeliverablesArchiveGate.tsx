import React, { useState } from 'react';
import { 
  PackageCheck, 
  Stamp, 
  AlertTriangle, 
  LockKeyhole, 
  MailCheck, 
  FileText, 
  Clock, 
  CheckCircle2, 
  ShieldAlert, 
  FileSignature, 
  DollarSign, 
  Sparkles,
  ExternalLink,
  Download,
  AlertCircle
} from 'lucide-react';
import { SAMPLE_CONFIRMATIONS, CONTRACT_PRESET } from '../data/auditWorkflowData';
import { ConfirmationRecord } from '../types/audit';

type OpinionType = 'CLEAN' | 'QUALIFIED' | 'DISCLAIMER' | 'ADVERSE';

export const DeliverablesArchiveGate: React.FC = () => {
  const [confirmations, setConfirmations] = useState<ConfirmationRecord[]>(SAMPLE_CONFIRMATIONS);
  const [selectedOpinion, setSelectedOpinion] = useState<OpinionType>('CLEAN');
  const [affectedFSLI, setAffectedFSLI] = useState<string>('Merchandise Inventory');
  const [qualificationRationale, setQualificationRationale] = useState<string>(
    'The company was unable to conduct a physical inventory count at its third-party logistics facility as of December 31, 2025. Alternative audit procedures could not satisfy existence and condition of stock valued at 870,000 QAR.'
  );
  const [isSignedByPartner, setIsSignedByPartner] = useState<boolean>(false);
  const [archivalCountdownDays, setArchivalCountdownDays] = useState<number>(58);
  const [isArchivedReadOnly, setIsArchivedReadOnly] = useState<boolean>(false);

  // Check if any critical confirmation is unreturned
  const criticalPendingConfirmations = confirmations.filter(
    c => c.isCritical && c.status === 'Pending Response'
  );
  const isReleaseBlockedByConfirmations = criticalPendingConfirmations.length > 0;

  // Resolve legal confirmation button to demonstrate clearing the blocker
  const handleResolveLegalConfirmation = () => {
    setConfirmations(prev => prev.map(c => {
      if (c.id === 'conf-5') {
        return {
          ...c,
          status: 'Received & Verified' as const,
          notes: 'Received signed legal certificate confirming civil claim settled out of court with zero firm exposure.'
        };
      }
      return c;
    }));
  };

  const handlePartnerSignAndSeal = () => {
    if (isReleaseBlockedByConfirmations) return;
    setIsSignedByPartner(true);
  };

  const handleManualPermanentLock = () => {
    setIsArchivedReadOnly(true);
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-600">
              <Sparkles className="w-4 h-4" />
              <span>Module 4 · ISA 700/705, ISA 505 & ISA 230</span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 mt-1">
              Reporting, 5-Part Deliverable Release & 60-Day Archival Lock
            </h1>
            <p className="text-xs text-slate-600 mt-1 max-w-3xl">
              Inspect the external confirmations holding gate, 4-way opinion dropdown with conditional qualification builder, the mandatory 5-part commercial deliverables bundle, and the 60-day ISA 230 countdown.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className={`px-3 py-1.5 rounded-lg text-xs font-bold border ${
              isArchivedReadOnly
                ? 'bg-purple-100 text-purple-900 border-purple-300'
                : isSignedByPartner
                ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                : 'bg-amber-100 text-amber-900 border-amber-300'
            }`}>
              {isArchivedReadOnly ? 'File Permanently Sealed (Read-Only)' : isSignedByPartner ? 'Opinion Certified & Released' : 'Fieldwork Review Stage'}
            </span>
          </div>
        </div>
      </div>

      {/* External Confirmations Gatekeeper (Holding Letter Blocker) */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <MailCheck className="w-4 h-4 text-blue-600" />
            <h2 className="text-sm font-bold text-slate-900">
              Third-Party Confirmations Gatekeeper (ISA 505)
            </h2>
          </div>
          {isReleaseBlockedByConfirmations ? (
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-800 flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>HARD BLOCK: Critical Confirmation Missing</span>
            </span>
          ) : (
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>All Critical Confirmations Cleared</span>
            </span>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100/70 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Third Party Confirmation</th>
                <th className="py-2.5 px-2">Category</th>
                <th className="py-2.5 px-2">Critical Flag</th>
                <th className="py-2.5 px-2">Status</th>
                <th className="py-2.5 px-3">Audit Verification Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {confirmations.map((conf) => (
                <tr key={conf.id} className="hover:bg-slate-50">
                  <td className="py-2.5 px-3 font-semibold text-slate-900">
                    {conf.partyName}
                  </td>
                  <td className="py-2.5 px-2 text-slate-600">
                    {conf.category}
                  </td>
                  <td className="py-2.5 px-2">
                    {conf.isCritical ? (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-200">
                        CRITICAL
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-400 font-mono">Routine</span>
                    )}
                  </td>
                  <td className="py-2.5 px-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${
                      conf.status === 'Received & Verified'
                        ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                        : conf.status === 'Pending Response'
                        ? 'bg-rose-100 text-rose-800 border-rose-200 animate-pulse font-bold'
                        : 'bg-amber-100 text-amber-800 border-amber-200'
                    }`}>
                      {conf.status}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-slate-600">
                    {conf.notes}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* If blocked, show automated Holding Letter trigger */}
        {isReleaseBlockedByConfirmations && (
          <div className="mt-4 p-4 rounded-xl bg-rose-50 border border-rose-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div>
              <strong className="text-rose-900 block text-xs">
                Audit Opinion Issuance is BLOCKED by System Governance
              </strong>
              <p className="text-rose-800 text-[11px] mt-0.5">
                The platform automatically generated a "Pending Confirmation / Holding Letter" dispatched to client management explaining audit release delay.
              </p>
            </div>
            <button
              onClick={handleResolveLegalConfirmation}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shrink-0 shadow-xs"
            >
              Simulate Receipt of Legal Confirmation
            </button>
          </div>
        )}
      </div>

      {/* Opinion Formulation & Deliverables Bundle Container */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Col: 4-Way Opinion Dropdown & Qualification Builder */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Stamp className="w-4 h-4 text-amber-600" />
              <span>Audit Opinion Selection Engine (ISA 700 / 705)</span>
            </h2>
            <span className="text-[10px] font-mono text-slate-400">Partner Exclusive</span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Select Audit Opinion Category:
            </label>
            <select
              value={selectedOpinion}
              onChange={(e) => setSelectedOpinion(e.target.value as OpinionType)}
              disabled={isSignedByPartner || isReleaseBlockedByConfirmations}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs font-semibold text-slate-900 disabled:opacity-60 cursor-pointer"
            >
              <option value="CLEAN">1. Clean / Unqualified Opinion (ISA 700)</option>
              <option value="QUALIFIED">2. Qualified Opinion (ISA 705 — Material but not Pervasive)</option>
              <option value="DISCLAIMER">3. Disclaimer of Opinion (ISA 705 — Inability to obtain SAAE)</option>
              <option value="ADVERSE">4. Adverse Opinion (ISA 705 — Material and Pervasive Misstatement)</option>
            </select>
          </div>

          {/* Conditional Qualification Builder (Section 4.4.1) */}
          {selectedOpinion !== 'CLEAN' && (
            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 space-y-3 animate-in fade-in duration-150">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Conditional Qualification Builder (ISA 705 Requirements)</span>
              </div>

              <div>
                <label className="text-[11px] font-medium text-slate-700 block mb-1">
                  Affected Financial Statement Line Item (FSLI):
                </label>
                <select
                  value={affectedFSLI}
                  onChange={(e) => setAffectedFSLI(e.target.value)}
                  disabled={isSignedByPartner}
                  className="w-full bg-white border border-slate-200 rounded px-2.5 py-1 text-xs text-slate-800"
                >
                  <option value="Merchandise Inventory">Merchandise Inventory (BS-200)</option>
                  <option value="Trade Accounts Receivable">Trade Accounts Receivable (BS-300)</option>
                  <option value="Revenue / Commercial Sales">Revenue / Commercial Sales (PL-100)</option>
                  <option value="Property, Plant & Equipment">Property, Plant & Equipment (BS-100)</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-medium text-slate-700 block mb-1">
                  Mandatory Textual Justification (Injected into "Basis for Modified Opinion"):
                </label>
                <textarea
                  rows={3}
                  value={qualificationRationale}
                  onChange={(e) => setQualificationRationale(e.target.value)}
                  disabled={isSignedByPartner}
                  className="w-full bg-white border border-slate-200 rounded p-2 text-xs text-slate-800"
                />
              </div>
            </div>
          )}

          {/* Partner Digital Credentials Signing Block */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-slate-900">
                Engagement Partner Digital Credentials
              </div>
              <div className="text-[11px] text-slate-500">
                Applies cryptographic signature & firm seal PNG
              </div>
            </div>

            <button
              onClick={handlePartnerSignAndSeal}
              disabled={isSignedByPartner || isReleaseBlockedByConfirmations}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-colors shadow-xs ${
                isSignedByPartner
                  ? 'bg-emerald-600 text-white cursor-default'
                  : isReleaseBlockedByConfirmations
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              <FileSignature className="w-4 h-4" />
              <span>{isSignedByPartner ? 'Certified & Stamped' : 'Apply Signature & Stamp'}</span>
            </button>
          </div>
        </div>

        {/* Right Col: Mandatory 5-Part Commercial Deliverables Bundle */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <PackageCheck className="w-4 h-4 text-emerald-600" />
              <span>Mandatory 5-Part Commercial Deliverables Bundle (Section 4.4.2)</span>
            </h2>
            <span className="text-[10px] font-mono text-emerald-600 font-bold">5 OF 5</span>
          </div>

          <div className="space-y-2 text-xs">
            {/* Deliverable 1 */}
            <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-between">
              <div>
                <strong className="text-slate-900 block">
                  1. Independent Auditor Report & Audited Financial Statements
                </strong>
                <span className="text-[11px] text-slate-500">
                  Certified, sealed, and digitally signed PDF with {selectedOpinion} opinion
                </span>
              </div>
              <Download className="w-4 h-4 text-slate-400 hover:text-blue-600 cursor-pointer" />
            </div>

            {/* Deliverable 2 */}
            <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-between">
              <div>
                <strong className="text-slate-900 block">
                  2. Management Letter (Internal Control Observations)
                </strong>
                <span className="text-[11px] text-slate-500">
                  Structured Deficiency → Operational Impact → Auditor Recommendation
                </span>
              </div>
              <Download className="w-4 h-4 text-slate-400 hover:text-blue-600 cursor-pointer" />
            </div>

            {/* Deliverable 3 */}
            <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-between">
              <div>
                <strong className="text-slate-900 block">
                  3. Letter of Representation (LOR)
                </strong>
                <span className="text-[11px] text-slate-500">
                  Pre-formatted representation template ready for client corporate letterhead
                </span>
              </div>
              <Download className="w-4 h-4 text-slate-400 hover:text-blue-600 cursor-pointer" />
            </div>

            {/* Deliverable 4 */}
            <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-between">
              <div>
                <strong className="text-slate-900 block">
                  4. Management Correspondences Audit Trail
                </strong>
                <span className="text-[11px] text-slate-500">
                  Formal confirmation records, queries, and signed verification clearance
                </span>
              </div>
              <Download className="w-4 h-4 text-slate-400 hover:text-blue-600 cursor-pointer" />
            </div>

            {/* Deliverable 5 */}
            <div className="p-3 rounded-lg border border-blue-200 bg-blue-50/60 flex items-center justify-between">
              <div>
                <strong className="text-blue-900 block">
                  5. Final Balance Fee Note (Remaining 50% Fee Release)
                </strong>
                <span className="text-[11px] text-slate-600">
                  Automated release of final invoice: <strong>{new Intl.NumberFormat('en-QA', { style: 'currency', currency: 'QAR' }).format(CONTRACT_PRESET.finalFeeQAR)}</strong>
                </span>
              </div>
              <DollarSign className="w-4 h-4 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* 60-Day Compliance Archival Timer (ISA 230) */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600/10 text-purple-700 flex items-center justify-center shrink-0">
              <LockKeyhole className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-900">
                  60-Day Regulatory File Archival Lock (ISA 230)
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-100 text-purple-800 font-bold">
                  {isArchivedReadOnly ? 'LOCKED' : `${archivalCountdownDays} DAYS REMAINING`}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                ISA 230 mandates engagement file assembly within 60 days of report signature. Once locked, working papers become permanently read-only and immune to deletions or edits.
              </p>
            </div>
          </div>

          <button
            onClick={handleManualPermanentLock}
            disabled={isArchivedReadOnly}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors shadow-xs shrink-0 ${
              isArchivedReadOnly
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : 'bg-purple-600 hover:bg-purple-700 text-white'
            }`}
          >
            {isArchivedReadOnly ? 'File Sealed & Immutable' : 'Trigger Early Regulatory Lock'}
          </button>
        </div>
      </div>
    </div>
  );
};

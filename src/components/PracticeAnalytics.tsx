import React, { useState } from 'react';
import { 
  BriefcaseBusiness, 
  Clock, 
  TrendingUp, 
  PieChart, 
  BadgePercent, 
  BookOpenCheck, 
  DollarSign, 
  CheckCircle2, 
  AlertCircle,
  Building,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { PRACTICE_RATES, CONTRACT_PRESET } from '../data/auditWorkflowData';

export const PracticeAnalytics: React.FC = () => {
  const [contractFee, setContractFee] = useState<number>(CONTRACT_PRESET.contractedFeeQAR);
  const [partnerHours, setPartnerHours] = useState<number>(PRACTICE_RATES.PARTNER.loggedHours);
  const [managerHours, setManagerHours] = useState<number>(PRACTICE_RATES.MANAGER.loggedHours);
  const [seniorHours, setSeniorHours] = useState<number>(PRACTICE_RATES.SENIOR.loggedHours);
  const [juniorHours, setJuniorHours] = useState<number>(PRACTICE_RATES.JUNIOR.loggedHours);

  // Charge-out rates fixed by policy
  const partnerCost = partnerHours * PRACTICE_RATES.PARTNER.ratePerHour;
  const managerCost = managerHours * PRACTICE_RATES.MANAGER.ratePerHour;
  const seniorCost = seniorHours * PRACTICE_RATES.SENIOR.ratePerHour;
  const juniorCost = juniorHours * PRACTICE_RATES.JUNIOR.ratePerHour;

  const totalLaborCost = partnerCost + managerCost + seniorCost + juniorCost;
  const profitabilityQAR = contractFee - totalLaborCost;
  const realizationPercent = Math.round((contractFee / totalLaborCost) * 100);
  const totalHoursLogged = partnerHours + managerHours + seniorHours + juniorHours;
  const totalBudgetedHours = 
    PRACTICE_RATES.PARTNER.budgetedHours + 
    PRACTICE_RATES.MANAGER.budgetedHours + 
    PRACTICE_RATES.SENIOR.budgetedHours + 
    PRACTICE_RATES.JUNIOR.budgetedHours;

  const formatQAR = (val: number) => {
    return new Intl.NumberFormat('en-QA', {
      style: 'currency',
      currency: 'QAR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-purple-600">
              <Sparkles className="w-4 h-4" />
              <span>Module 5 · Practice Management & Internal Bookkeeping</span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 mt-1">
              Tiered Charge-Out Rates, Realization & Firm Practice Ledger
            </h1>
            <p className="text-xs text-slate-600 mt-1 max-w-3xl">
              Captures operational staff hours, calculates profitability against contracted engagement fees in QAR, tracks realization rates, and maintains the firm internal trial balance and P&L.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 text-xs font-mono font-bold rounded-lg bg-purple-50 text-purple-700 border border-purple-200">
              Zero Per-File Penalties · Unlimited Files
            </span>
          </div>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Contracted Fee */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
            Contracted Engagement Fee
          </span>
          <div className="text-xl font-bold font-mono text-slate-900 mt-1 tabular-nums">
            {formatQAR(contractFee)}
          </div>
          <span className="text-[10px] text-slate-400 mt-0.5 block">
            50% Advance ({formatQAR(contractFee / 2)}) + 50% Final
          </span>
        </div>

        {/* Total Labor Cost */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
            Total Operational Labor Cost
          </span>
          <div className="text-xl font-bold font-mono text-slate-900 mt-1 tabular-nums">
            {formatQAR(totalLaborCost)}
          </div>
          <span className="text-[10px] text-slate-400 mt-0.5 block">
            {totalHoursLogged} Actual Hours Logged
          </span>
        </div>

        {/* Engagement Profitability */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
            Engagement Gross Margin
          </span>
          <div className={`text-xl font-bold font-mono mt-1 tabular-nums ${
            profitabilityQAR >= 0 ? 'text-emerald-600' : 'text-rose-600'
          }`}>
            {formatQAR(profitabilityQAR)}
          </div>
          <span className="text-[10px] text-slate-400 mt-0.5 block">
            Contracted Fee minus Labor Cost
          </span>
        </div>

        {/* Realization Rate */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
            Fee Realization Rate
          </span>
          <div className={`text-xl font-bold font-mono mt-1 tabular-nums ${
            realizationPercent >= 100 ? 'text-emerald-600' : realizationPercent >= 85 ? 'text-blue-600' : 'text-amber-600'
          }`}>
            {realizationPercent}%
          </div>
          <span className="text-[10px] text-slate-400 mt-0.5 block">
            Benchmark Target: &gt;85%
          </span>
        </div>
      </div>

      {/* Charge-Out Rate Table & Interactive Hours Adjuster */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Tiered Rate Matrix */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-purple-600" />
              <span>Tiered Charge-Out Rates & Staff Hours Variance (Section 3.5 & 4.5.1)</span>
            </h2>
            <span className="text-[10px] font-mono text-slate-500">Hourly Rate in QAR</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100/70 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-4">Audit Role Persona</th>
                  <th className="py-2.5 px-3">Charge-Out Rate</th>
                  <th className="py-2.5 px-3">Budgeted Hours</th>
                  <th className="py-2.5 px-3">Actual Hours Logged</th>
                  <th className="py-2.5 px-3 text-right">Extended Labor Cost (QAR)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {/* Partner */}
                <tr className="hover:bg-slate-50">
                  <td className="py-3 px-4 font-bold text-slate-900">
                    {PRACTICE_RATES.PARTNER.role}
                  </td>
                  <td className="py-3 px-3 font-mono font-semibold text-blue-600">
                    1,000 QAR/h
                  </td>
                  <td className="py-3 px-3 font-mono text-slate-500">
                    {PRACTICE_RATES.PARTNER.budgetedHours} hrs
                  </td>
                  <td className="py-3 px-3">
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={partnerHours}
                      onChange={(e) => setPartnerHours(Math.max(0, parseInt(e.target.value) || 0))}
                      className="w-16 bg-white border border-slate-200 rounded px-2 py-0.5 font-mono text-xs"
                    />
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-slate-900">
                    {formatQAR(partnerCost)}
                  </td>
                </tr>

                {/* Manager */}
                <tr className="hover:bg-slate-50">
                  <td className="py-3 px-4 font-bold text-slate-900">
                    {PRACTICE_RATES.MANAGER.role}
                  </td>
                  <td className="py-3 px-3 font-mono font-semibold text-blue-600">
                    750 QAR/h
                  </td>
                  <td className="py-3 px-3 font-mono text-slate-500">
                    {PRACTICE_RATES.MANAGER.budgetedHours} hrs
                  </td>
                  <td className="py-3 px-3">
                    <input
                      type="number"
                      min={0}
                      max={150}
                      value={managerHours}
                      onChange={(e) => setManagerHours(Math.max(0, parseInt(e.target.value) || 0))}
                      className="w-16 bg-white border border-slate-200 rounded px-2 py-0.5 font-mono text-xs"
                    />
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-slate-900">
                    {formatQAR(managerCost)}
                  </td>
                </tr>

                {/* Senior */}
                <tr className="hover:bg-slate-50">
                  <td className="py-3 px-4 font-bold text-slate-900">
                    {PRACTICE_RATES.SENIOR.role}
                  </td>
                  <td className="py-3 px-3 font-mono font-semibold text-blue-600">
                    500 QAR/h
                  </td>
                  <td className="py-3 px-3 font-mono text-slate-500">
                    {PRACTICE_RATES.SENIOR.budgetedHours} hrs
                  </td>
                  <td className="py-3 px-3">
                    <input
                      type="number"
                      min={0}
                      max={200}
                      value={seniorHours}
                      onChange={(e) => setSeniorHours(Math.max(0, parseInt(e.target.value) || 0))}
                      className="w-16 bg-white border border-slate-200 rounded px-2 py-0.5 font-mono text-xs"
                    />
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-slate-900">
                    {formatQAR(seniorCost)}
                  </td>
                </tr>

                {/* Junior */}
                <tr className="hover:bg-slate-50">
                  <td className="py-3 px-4 font-bold text-slate-900">
                    {PRACTICE_RATES.JUNIOR.role}
                  </td>
                  <td className="py-3 px-3 font-mono font-semibold text-blue-600">
                    200 QAR/h
                  </td>
                  <td className="py-3 px-3 font-mono text-slate-500">
                    {PRACTICE_RATES.JUNIOR.budgetedHours} hrs
                  </td>
                  <td className="py-3 px-3">
                    <input
                      type="number"
                      min={0}
                      max={300}
                      value={juniorHours}
                      onChange={(e) => setJuniorHours(Math.max(0, parseInt(e.target.value) || 0))}
                      className="w-16 bg-white border border-slate-200 rounded px-2 py-0.5 font-mono text-xs"
                    />
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-slate-900">
                    {formatQAR(juniorCost)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Col: Internal Firm Ledger & Accounts Receivable Schedule */}
        <div className="space-y-6">
          {/* Internal Firm Operating Ledger */}
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <BookOpenCheck className="w-4 h-4 text-blue-600" />
              <span>Practice Ledger & Internal Bookkeeping</span>
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1.5 border-b border-slate-100 text-slate-600">
                <span>Doha Office Rent & Facilities</span>
                <span className="font-mono font-semibold text-slate-900">35,000 QAR/mo</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100 text-slate-600">
                <span>Staff Salaries, Gratuity & Benefits</span>
                <span className="font-mono font-semibold text-slate-900">142,000 QAR/mo</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100 text-slate-600">
                <span>Operational IT & Software Licenses</span>
                <span className="font-mono font-semibold text-slate-900">8,500 QAR/mo</span>
              </div>
              <div className="flex justify-between py-1.5 text-slate-600">
                <span>Petty Cash Disbursals</span>
                <span className="font-mono font-semibold text-slate-900">3,200 QAR/mo</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <span className="text-[10px] text-slate-400 block font-mono">
                Outputs: Firm Monthly Trial Balance & P&L Statement
              </span>
            </div>
          </div>

          {/* AR Aging Schedule (50% Advance / 50% Final Fee) */}
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Client Accounts Receivable Aging Schedule
            </h3>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                <div>
                  <strong className="text-emerald-900 block text-xs">
                    50% Advance Fee ({formatQAR(CONTRACT_PRESET.advanceFeeQAR)})
                  </strong>
                  <span className="text-[10px] text-emerald-800">
                    Settled upon contract signing (Official Receipt #REC-2026-081)
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-200 text-emerald-900">
                  PAID
                </span>
              </div>

              <div className="p-2.5 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-between">
                <div>
                  <strong className="text-blue-900 block text-xs">
                    50% Final Fee ({formatQAR(CONTRACT_PRESET.finalFeeQAR)})
                  </strong>
                  <span className="text-[10px] text-blue-800">
                    Billed with 5-part deliverable release (Inv #INV-2026-149)
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-200 text-blue-900">
                  CURRENT
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

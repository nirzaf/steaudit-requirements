import React, { useState } from 'react';
import { 
  Calculator, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  RotateCcw, 
  Sparkles, 
  Layers, 
  Sliders,
  DollarSign
} from 'lucide-react';
import { CONTRACT_PRESET } from '../data/auditWorkflowData';

type BenchmarkKey = 'profitBeforeTax' | 'revenue' | 'assets' | 'equity';

interface BenchmarkConfig {
  key: BenchmarkKey;
  label: string;
  defaultBaseQAR: number;
  minPercent: number;
  maxPercent: number;
  defaultPercent: number;
  step: number;
}

const BENCHMARKS: BenchmarkConfig[] = [
  {
    key: 'profitBeforeTax',
    label: 'Normalized Profit Before Tax (PBT)',
    defaultBaseQAR: 2320000,
    minPercent: 5.0,
    maxPercent: 10.0,
    defaultPercent: 7.5,
    step: 0.1
  },
  {
    key: 'revenue',
    label: 'Total Revenue / Commercial Turnover',
    defaultBaseQAR: 14850000,
    minPercent: 0.5,
    maxPercent: 2.0,
    defaultPercent: 1.0,
    step: 0.05
  },
  {
    key: 'assets',
    label: 'Total Enterprise Assets',
    defaultBaseQAR: 21250000,
    minPercent: 0.5,
    maxPercent: 1.0,
    defaultPercent: 0.75,
    step: 0.05
  },
  {
    key: 'equity',
    label: 'Shareholders Equity / Net Assets',
    defaultBaseQAR: 11400000,
    minPercent: 1.0,
    maxPercent: 2.0,
    defaultPercent: 1.5,
    step: 0.1
  }
];

export const MaterialityCalculator: React.FC = () => {
  const [selectedBenchmark, setSelectedBenchmark] = useState<BenchmarkKey>('profitBeforeTax');
  const [benchmarkPercentages, setBenchmarkPercentages] = useState<Record<BenchmarkKey, number>>({
    profitBeforeTax: 7.5,
    revenue: 1.0,
    assets: 0.75,
    equity: 1.5
  });

  const [tePercentage, setTePercentage] = useState<number>(65); // 50% to 75%
  const [sadPercentage, setSadPercentage] = useState<number>(4); // 3% to 5%
  const [roundingAdjustmentPercent, setRoundingAdjustmentPercent] = useState<number>(0); // -5% to +5%
  const [isPartnerSignedOff, setIsPartnerSignedOff] = useState<boolean>(false);

  // Active benchmark data
  const currentConfig = BENCHMARKS.find(b => b.key === selectedBenchmark)!;
  const chosenPercent = benchmarkPercentages[selectedBenchmark];
  const rawBaseQAR = currentConfig.defaultBaseQAR;

  // 1. Planning Materiality (PM)
  const rawPM = (rawBaseQAR * chosenPercent) / 100;
  // Apply manager rounding (±5% strict limit)
  const roundedPM = Math.round(rawPM * (1 + roundingAdjustmentPercent / 100));

  // 2. Tolerable Error (TE)
  const roundedTE = Math.round((roundedPM * tePercentage) / 100);

  // 3. Summary of Audit Differences (SAD) Threshold
  const roundedSAD = Math.round((roundedPM * sadPercentage) / 100);

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
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-600">
              <Sparkles className="w-4 h-4" />
              <span>Section 3.2 & 4.2.4 · Auditing Standards ISA 320</span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 mt-1">
              3-Tier Materiality Calculation Engine & Risk Stratification
            </h1>
            <p className="text-xs text-slate-600 mt-1 max-w-3xl">
              Calculates Planning Materiality (PM), Tolerable Error (TE), and the Summary of Audit Differences (SAD) threshold directly from client Trial Balance benchmarks, with manager ±5% practical rounding tolerance.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPartnerSignedOff(!isPartnerSignedOff)}
              className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg shadow-xs transition-colors ${
                isPartnerSignedOff
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                  : 'bg-amber-600 text-white hover:bg-amber-700'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{isPartnerSignedOff ? 'Partner Planning Signed Off' : 'Execute Partner Sign-Off'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Calculation Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Benchmark Selection & Ratio Sliders */}
        <div className="lg:col-span-2 space-y-6">
          {/* Step 1: Benchmark Base Selection */}
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-xs mb-3 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-mono text-[10px]">1</span>
              <span>Select Benchmark Base (Ingested from Trial Balance)</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {BENCHMARKS.map((bench) => {
                const isSelected = selectedBenchmark === bench.key;
                return (
                  <button
                    key={bench.key}
                    onClick={() => setSelectedBenchmark(bench.key)}
                    className={`p-3.5 rounded-xl text-left border transition-all ${
                      isSelected
                        ? 'bg-blue-50/70 border-blue-500 ring-2 ring-blue-500/20'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-slate-500">{bench.label.split('(')[0].trim()}</span>
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />}
                    </div>
                    <div className="text-base font-bold font-mono text-slate-900 tabular-nums">
                      {formatQAR(bench.defaultBaseQAR)}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1">
                      ISA Standard Guideline: {bench.minPercent}% – {bench.maxPercent}%
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Slider for selected benchmark percentage */}
            <div className="mt-4 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-semibold text-slate-800">
                  Chosen Benchmark Percentage ({currentConfig.label}):
                </span>
                <span className="font-mono font-bold text-blue-600 text-sm">
                  {chosenPercent.toFixed(2)}%
                </span>
              </div>
              <input
                type="range"
                min={currentConfig.minPercent}
                max={currentConfig.maxPercent}
                step={currentConfig.step}
                value={chosenPercent}
                onChange={(e) => {
                  setBenchmarkPercentages({
                    ...benchmarkPercentages,
                    [selectedBenchmark]: parseFloat(e.target.value)
                  });
                }}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                <span>Min: {currentConfig.minPercent}%</span>
                <span>Standard Midpoint</span>
                <span>Max: {currentConfig.maxPercent}%</span>
              </div>
            </div>
          </div>

          {/* Step 2 & 3: Tolerable Error & Manager Practical Rounding */}
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-xs mb-1 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-mono text-[10px]">2</span>
              <span>Compute Tolerable Error (TE) & SAD Trivial Cutoff</span>
            </h2>

            {/* TE Slider */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <div>
                  <span className="font-semibold text-slate-800">
                    Tolerable Error (TE) Factor:
                  </span>
                  <span className="text-[11px] text-slate-500 ml-1.5">
                    (50% High Risk to 75% Low Risk)
                  </span>
                </div>
                <span className="font-mono font-bold text-sky-600 text-sm">
                  {tePercentage}% of PM
                </span>
              </div>
              <input
                type="range"
                min={50}
                max={75}
                step={1}
                value={tePercentage}
                onChange={(e) => setTePercentage(parseInt(e.target.value))}
                className="w-full accent-sky-600 cursor-pointer"
              />
            </div>

            {/* SAD Slider */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <div>
                  <span className="font-semibold text-slate-800">
                    Summary of Audit Differences (SAD Trivial Error Cutoff):
                  </span>
                  <span className="text-[11px] text-slate-500 ml-1.5">
                    (3% to 5% of PM)
                  </span>
                </div>
                <span className="font-mono font-bold text-emerald-600 text-sm">
                  {sadPercentage}% of PM
                </span>
              </div>
              <input
                type="range"
                min={3}
                max={5}
                step={0.5}
                value={sadPercentage}
                onChange={(e) => setSadPercentage(parseFloat(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>

            {/* Practical Rounding Tolerance (Strict ±5%) */}
            <div className="pt-3 border-t border-slate-100">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <div>
                  <span className="font-semibold text-slate-800">
                    Manager Practical Rounding Tolerance:
                  </span>
                  <span className="text-[11px] text-slate-500 ml-1.5">
                    (Strict ±5% limit per audit policy)
                  </span>
                </div>
                <span className="font-mono font-bold text-purple-600 text-sm">
                  {roundingAdjustmentPercent > 0 ? `+${roundingAdjustmentPercent}%` : `${roundingAdjustmentPercent}%`}
                </span>
              </div>
              <input
                type="range"
                min={-5}
                max={5}
                step={0.5}
                value={roundingAdjustmentPercent}
                onChange={(e) => setRoundingAdjustmentPercent(parseFloat(e.target.value))}
                className="w-full accent-purple-600 cursor-pointer"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Raw computed PM: <strong className="font-mono">{formatQAR(rawPM)}</strong> → Manager rounded PM: <strong className="font-mono text-slate-900">{formatQAR(roundedPM)}</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Right Col: Mathematical Outputs & Visual Risk Stratification */}
        <div className="space-y-6">
          {/* Outputs Card */}
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Computed Materiality Thresholds
              </h2>
              <span className="text-[10px] font-mono text-slate-400">Currency: QAR</span>
            </div>

            <div className="space-y-3">
              {/* PM */}
              <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200">
                <span className="text-[11px] font-semibold text-blue-700 block">
                  Planning Materiality (PM)
                </span>
                <div className="text-xl font-bold font-mono text-slate-900 mt-1 tabular-nums">
                  {formatQAR(roundedPM)}
                </div>
                <span className="text-[10px] text-slate-500 block mt-0.5">
                  Base ({formatQAR(rawBaseQAR)}) × {chosenPercent}% ± Rounding
                </span>
              </div>

              {/* TE */}
              <div className="p-3.5 rounded-xl bg-sky-50 border border-sky-200">
                <span className="text-[11px] font-semibold text-sky-700 block">
                  Tolerable Error / Performance Materiality (TE)
                </span>
                <div className="text-lg font-bold font-mono text-slate-900 mt-1 tabular-nums">
                  {formatQAR(roundedTE)}
                </div>
                <span className="text-[10px] text-slate-500 block mt-0.5">
                  {tePercentage}% of Planning Materiality
                </span>
              </div>

              {/* SAD */}
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200">
                <span className="text-[11px] font-semibold text-emerald-700 block">
                  Summary of Audit Differences (SAD) Threshold
                </span>
                <div className="text-lg font-bold font-mono text-slate-900 mt-1 tabular-nums">
                  {formatQAR(roundedSAD)}
                </div>
                <span className="text-[10px] text-slate-500 block mt-0.5">
                  {sadPercentage}% of Planning Materiality (Errors below this are trivial)
                </span>
              </div>
            </div>
          </div>

          {/* Account Risk Stratification Card (Green / Amber / Red) */}
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Visual Risk Stratification (Section 3.2.4)
            </h3>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 flex items-start gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500 mt-0.5 shrink-0"></div>
                <div>
                  <strong className="text-emerald-900">
                    GREEN — Low Inherent Risk
                  </strong>
                  <div className="text-[11px] text-emerald-800">
                    Balance &lt; {formatQAR(roundedTE)}. Standard automated test programs, assignable to junior staff.
                  </div>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 flex items-start gap-2">
                <div className="w-3 h-3 rounded-full bg-amber-500 mt-0.5 shrink-0"></div>
                <div>
                  <strong className="text-amber-900">
                    AMBER — Moderate Risk
                  </strong>
                  <div className="text-[11px] text-amber-800">
                    Balance between {formatQAR(roundedTE)} and {formatQAR(roundedPM)}. Requires Senior substantive testing and statistical sampling.
                  </div>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 flex items-start gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500 mt-0.5 shrink-0"></div>
                <div>
                  <strong className="text-rose-900">
                    RED — Critical / High Inherent Risk
                  </strong>
                  <div className="text-[11px] text-rose-800">
                    Balance &gt; {formatQAR(roundedPM)} or involves subjective accounting estimates. Mandatory Manager execution and Partner direct review.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

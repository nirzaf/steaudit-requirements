import { ModuleData, AuditNode, StateMachineStep, FSLIItem, ConfirmationRecord, PersonaInfo } from '../types/audit';

export const PERSONAS: Record<string, PersonaInfo> = {
  PREPARER: {
    role: 'PREPARER',
    title: 'Audit Associate / Junior Auditor',
    badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    responsibilities: [
      'Executes assigned financial statement line item (FSLI) audit test procedures.',
      'Uploads digital working papers and inputs physical binder index codes (e.g. X-1, Box 3).',
      'Submits completed testing packages for managerial review.',
      'Logs daily operational hours against assigned engagement tasks.'
    ]
  },
  REVIEWER: {
    role: 'REVIEWER',
    title: 'Audit Senior / Audit Manager',
    badgeColor: 'bg-sky-50 text-sky-800 border-sky-200',
    responsibilities: [
      'Verifies substantive testing and recalculated schedules.',
      'Issues inline review notes and initiates the rework loop for incomplete tests.',
      'Determines sampling parameters and calculates engagement materiality.',
      'Prepares the Summary Review Memorandum (SRM) for the partner.',
      'Tracks engagement budgets, team hours, and delivery milestones.'
    ]
  },
  APPROVER: {
    role: 'APPROVER',
    title: 'Engagement Partner',
    badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
    responsibilities: [
      'Evaluates and signs off on the Dual-Key Acceptance Gate (AML/KYC).',
      'Authorizes commercial proposals and executes Engagement Letters.',
      'Clears high-risk (Red) audit areas and formally signs off on the SRM.',
      'Selects the final Audit Opinion, applies digital signatures and firm seals.',
      'Authorizes final deliverable bundles and enforces regulatory file locks.'
    ]
  },
  CLIENT: {
    role: 'CLIENT',
    title: 'Client Coordinator / CFO / MD',
    badgeColor: 'bg-purple-50 text-purple-800 border-purple-200',
    responsibilities: [
      'Accesses an isolated, tokenized external workspace (PBC Portal).',
      'Views requested audit documentation with real-time review status badges.',
      'Uploads requested financial schedules, trial balances, and voucher evidence.',
      'Receives invoices, receipts, holding letters, and final deliverables.',
      'Access freezes automatically upon engagement sign-off.'
    ]
  }
};

export const MODULES: ModuleData[] = [
  {
    id: 'mod-1',
    number: 1,
    title: 'Commercial & CRM Pipeline',
    tagline: 'Lead Ingestion to Dual-Key Client Onboarding',
    accentColor: '#2563eb', // Blue
    description: 'Centralizes client profiling, tiered proposal generation, dual-key risk gatekeeping, engagement letters, and initial 50% advance invoicing with portal provisioning.',
    handshakeToNext: {
      title: 'Handshake 1: Onboarding Gate',
      requirement: 'Dual-Key Clearance (Client Acceptance + Partner AML Sign-Off) AND 50% Advance Settled',
      targetModuleId: 'mod-2'
    },
    nodeIds: ['node-lead', 'node-proposal', 'node-dualkey', 'node-el', 'node-advance-bill', 'node-pbc-portal']
  },
  {
    id: 'mod-2',
    number: 2,
    title: 'Administration, Governance & Planning',
    tagline: 'Taxonomy Provisioning & 3-Tier Materiality Formulation',
    accentColor: '#0891b2', // Cyan
    description: 'Enforces dual-track acceptance/continuance, automatically creates 5-folder engagement taxonomy, balances team resource schedules, and computes mathematical materiality thresholds.',
    handshakeToNext: {
      title: 'Handshake 2: Planning Gate',
      requirement: 'Formal Partner Sign-Off on Planning & Materiality AND Trial Balance Ingested',
      targetModuleId: 'mod-3'
    },
    nodeIds: ['node-governance-track', 'node-directory-prov', 'node-scheduling', 'node-materiality-calc']
  },
  {
    id: 'mod-3',
    number: 3,
    title: 'Technical Execution & Fieldwork',
    tagline: 'Split Financial Dashboard & Multi-Tier Review Matrix',
    accentColor: '#059669', // Emerald
    description: 'The core operational testing suite featuring row-level concurrency, split P&L / B/S dashboard, analytical review, substantive workprograms, confirmations gatekeeper, and SRM compilation.',
    handshakeToNext: {
      title: 'Handshake 3: Fieldwork Clearance',
      requirement: 'Zero Open Review Notes, Partner Clearance of SRM, and Critical Confirmations Resolved',
      targetModuleId: 'mod-4'
    },
    nodeIds: ['node-tb-ingest', 'node-split-dashboard', 'node-ar-engine', 'node-workprograms', 'node-sampling', 'node-confirmations', 'node-three-tier-review', 'node-srm-memo']
  },
  {
    id: 'mod-4',
    number: 4,
    title: 'Reporting, Deliverables & File Archive',
    tagline: 'Opinion Selection, 5-Part Bundle & Regulatory File Lock',
    accentColor: '#d97706', // Amber
    description: 'Governs partner opinion formulation (Clean, Qualified, Disclaimer, Adverse), embeds digital credentials, dispatches the 5-part deliverables bundle, and enforces the 60-day regulatory file lock (ISA 230).',
    handshakeToNext: {
      title: 'Handshake 4: Financial & Labor Actuals Feed',
      requirement: 'Final Deliverable Released, 50% Final Fee Dispatched, Hours Recorded to Practice Ledger',
      targetModuleId: 'mod-5'
    },
    nodeIds: ['node-opinion-engine', 'node-qualification-builder', 'node-deliverables-bundle', 'node-final-billing', 'node-archival-lock']
  },
  {
    id: 'mod-5',
    number: 5,
    title: 'Practice Management & Internal Bookkeeping',
    tagline: 'Tiered Charge-Out Rates, Realization & Firm Ledger',
    accentColor: '#7c3aed', // Purple
    description: 'Tracks operational hours against tiered charge-out rates (1,000 / 750 / 500 / 200 QAR/h), computes real-time engagement profitability, and maintains the firm internal trial balance and P&L.',
    nodeIds: ['node-timesheet-rates', 'node-profitability-calc', 'node-internal-ledger', 'node-firm-reporting']
  }
];

export const NODES: Record<string, AuditNode> = {
  'node-lead': {
    id: 'node-lead',
    moduleId: 'mod-1',
    moduleName: 'Commercial & CRM',
    title: 'Lead Ingestion & Entity Profiling',
    shortDesc: 'Multi-channel inquiry capture & organizational structure mapping',
    fullDescription: 'Ingests inbound leads via Phone, WhatsApp, Email, Web Forms, and Referrals. Validates entity registration, corporate group trees (Holdings, Subsidiaries, Affiliates), Tax IDs, and assigns role-based communication contacts (MD for reports, CFO for billing, Chief Accountant for PBC schedules).',
    category: 'CRM',
    personas: ['REVIEWER', 'APPROVER'],
    isaStandards: ['ISA 210', 'IESBA Code'],
    inputs: ['Inquiry channels (WhatsApp, Phone, Email)', 'Commercial Registration documents', 'Corporate group hierarchy'],
    outputs: ['Validated Client Profile', 'Primary and secondary contact directory', 'Tax & entity identification record'],
    businessLogic: [
      'Validates minimum entity data and primary contact roles before allowing quote generation',
      'Enforces communication routing: MD receives proposals, CFO receives commercial invoices, Audit Liaison receives PBC requests'
    ],
    controlsAndGates: ['Mandatory valid Tax ID and authorized signatory record'],
    industrialBestPractice: {
      title: 'Predecessor Auditor Clearance & Initial Conflict Check',
      standard: 'ISA 300 / ISA 510 / IESBA Code',
      description: 'Formal professional inquiry with outgoing auditor to verify no ethical or fee dispute reasons prevent acceptance, plus early firm-wide conflict check.',
      isOptional: true
    },
    upstreamNodeIds: [],
    downstreamNodeIds: ['node-proposal'],
    iconName: 'Building2',
    stageIndex: 1
  },
  'node-proposal': {
    id: 'node-proposal',
    moduleId: 'mod-1',
    moduleName: 'Commercial & CRM',
    title: 'Commercial Proposal Engine',
    shortDesc: 'Generates Brief Quotes (1-2 pages) or Comprehensive Technical Proposals',
    fullDescription: 'Calculates proposed professional fees based on estimated audit scope and historical engagement metrics. Outputs either a 1–2 page standardized Brief Quotation (showing statutory period, fee schedule, 50/50 payment terms) or a Comprehensive Proposal with firm history, assigned team CVs, and methodology.',
    category: 'Commercial',
    personas: ['REVIEWER', 'APPROVER', 'CLIENT'],
    isaStandards: ['ISA 210'],
    inputs: ['Client entity profile', 'Estimated scope and turnover', 'Standard fee matrices in QAR'],
    outputs: ['Brief Quotation (1-2 Pages)', 'Comprehensive Technical Proposal', 'Draft Payment Schedule (50% Advance / 50% Final)'],
    businessLogic: [
      'Standard payment terms enforce 50% advance invoice upon contract signing, and 50% final fee note prior to final deliverable release',
      'Comprehensive proposals automatically embed verified credentials and portfolio track record'
    ],
    controlsAndGates: ['Partner review and approval required before external email dispatch to client'],
    industrialBestPractice: {
      title: 'Fee Dependency Ceiling Rule (<15% Firm Revenue)',
      standard: 'IESBA Code of Ethics Sec. 410',
      description: 'Automatically calculates client fee percentage against total firm revenue to ensure compliance with the 15% independence threat ceiling.',
      isOptional: true
    },
    upstreamNodeIds: ['node-lead'],
    downstreamNodeIds: ['node-dualkey'],
    iconName: 'FileSpreadsheet',
    stageIndex: 2
  },
  'node-dualkey': {
    id: 'node-dualkey',
    moduleId: 'mod-1',
    moduleName: 'Commercial & CRM',
    title: 'Dual-Key Acceptance Gatekeeper',
    shortDesc: 'Enforces 2-key state machine lock: Commercial + AML/KYC Clearance',
    fullDescription: 'Automated state machine gatekeeper strictly preventing Engagement Letter creation until two independent authorization keys are certified: Key 1 (Commercial Approval: client digitally confirms quoted fees) and Key 2 (Risk Clearance: Partner signs off on AML/KYC background checks, UBO, and independence checklist per ISA 220).',
    category: 'Governance Gate',
    personas: ['APPROVER', 'CLIENT'],
    isaStandards: ['ISA 220 & ISQM 1', 'IESBA Code'],
    inputs: ['Client commercial quote confirmation', 'Partner AML / KYC verification checklist', 'Ultimate Beneficial Ownership (UBO) declaration'],
    outputs: ['Dual-Key Cryptographic State Flag = CLEARED', 'Audit acceptance clearance token'],
    businessLogic: [
      'HARD BLOCK: If Key 1 is missing, pipeline halts with "Awaiting Client Acceptance"',
      'HARD BLOCK: If Key 2 is missing, pipeline halts with "Awaiting Partner AML Clearance"',
      'Only when BOTH keys evaluate to TRUE does the system unlock Engagement Letter generation'
    ],
    controlsAndGates: ['Dual-authorization barrier: Zero override capability without Partner digital sign-off'],
    industrialBestPractice: {
      title: 'UBO (≥25%) Register & Automated QCB/UN Sanctions Check',
      standard: 'ISQM 1 / Qatar AML Law / FATF',
      description: 'Formal verification of natural individuals holding ≥25% equity/voting rights with automated screening against international and QCB sanction lists.',
      isOptional: false
    },
    upstreamNodeIds: ['node-proposal'],
    downstreamNodeIds: ['node-el', 'node-advance-bill'],
    iconName: 'KeySquare',
    stageIndex: 3
  },
  'node-el': {
    id: 'node-el',
    moduleId: 'mod-1',
    moduleName: 'Commercial & CRM',
    title: 'Engagement Letter Auto-Generation',
    shortDesc: 'ISA 210 standard template binding scope, fees, and deadlines',
    fullDescription: 'Generates the binding audit contract automatically from pre-configured legal templates (External Statutory Audit or ISRS 4400 Agreed-Upon Procedures). Injects legal client entity name, statutory year, agreed fee in QAR, delivery milestones, and applies the Partner digital signature and firm seal.',
    category: 'Legal Contract',
    personas: ['APPROVER', 'CLIENT'],
    isaStandards: ['ISA 210'],
    inputs: ['Cleared Dual-Key token', 'Approved fee quotation', 'Selected template: External Audit vs ISRS 4400'],
    outputs: ['Legally binding Engagement Letter (ISA 210)', 'Digitally stamped contract PDF'],
    businessLogic: [
      'Pulls dynamic clauses based on client corporate legal form (W.L.L., Q.P.S.C., Branch of Foreign Entity)',
      'Embeds statutory reporting deadlines and client responsibilities for financial records preparation'
    ],
    controlsAndGates: ['Partner digital signature applied on generation'],
    upstreamNodeIds: ['node-dualkey'],
    downstreamNodeIds: ['node-directory-prov'],
    iconName: 'ScrollText',
    stageIndex: 4
  },
  'node-advance-bill': {
    id: 'node-advance-bill',
    moduleId: 'mod-1',
    moduleName: 'Commercial & CRM',
    title: '50% Advance Invoicing & Receipt Voucher',
    shortDesc: 'Automated 50% mobilization fee invoice and official receipt generation',
    fullDescription: 'Issues the official 50% mobilization fee tax invoice concurrently with the Engagement Letter. Upon client remittance (cheque, bank wire, or transfer code), the platform records receipt voucher metadata, issues an instant official receipt to the client CFO, and activates portal onboarding.',
    category: 'Billing',
    personas: ['REVIEWER', 'CLIENT'],
    isaStandards: ['ISA 210'],
    inputs: ['Contracted engagement fee in QAR', 'Client payment voucher / wire reference'],
    outputs: ['50% Advance Commercial Invoice', 'Official Firm Payment Receipt Voucher', 'Paid status token in accounts receivable ledger'],
    businessLogic: [
      '50% Advance is calculated strictly as half of the total contracted professional fee',
      'System automatically issues automated receipt upon payment verification'
    ],
    controlsAndGates: ['Payment confirmation is a prerequisite for provisioning the active Client Portal upload window'],
    upstreamNodeIds: ['node-dualkey'],
    downstreamNodeIds: ['node-pbc-portal'],
    iconName: 'Receipt',
    stageIndex: 5
  },
  'node-pbc-portal': {
    id: 'node-pbc-portal',
    moduleId: 'mod-1',
    moduleName: 'Commercial & CRM',
    title: 'Isolated Client Portal (PBC Workspace)',
    shortDesc: 'Tokenized workspace for Provided-by-Client document exchange',
    fullDescription: 'Provisions a segregated, secure external environment for the client audit team. Auto-emails temporary credentials to the Client Audit Liaison, enforces a mandatory first-login password reset, and provides real-time status badges for requested schedules (Pending Upload, Under Review, Approved, Rejected with mandatory reason).',
    category: 'Client Collaboration',
    personas: ['PREPARER', 'CLIENT'],
    isaStandards: ['ISA 210', 'ISA 505'],
    inputs: ['Validated Client Liaison email', 'Standard PBC checklist items (TB, Bank Statements, Fixed Asset Register)'],
    outputs: ['Client Portal URL and auth token', 'Uploaded PBC schedules and voucher evidence', 'Rejection feedback loop with mandatory auditor notes'],
    businessLogic: [
      'Temporal Lock: All client document upload access freezes automatically when the final audit report is released',
      'If an auditor rejects an item, a mandatory rejection reason is required and instantly shown on the client screen'
    ],
    controlsAndGates: ['Mandatory password change on first authentication; upload window closes upon partner opinion release'],
    upstreamNodeIds: ['node-advance-bill'],
    downstreamNodeIds: ['node-tb-ingest'],
    iconName: 'ShieldCheck',
    stageIndex: 6
  },
  'node-governance-track': {
    id: 'node-governance-track',
    moduleId: 'mod-2',
    moduleName: 'Admin & Planning',
    title: 'Dual-Track Acceptance & Continuance Risk Gate',
    shortDesc: 'Track A (New Client AML/UBO) vs Track B (Recurring Client Delta Review)',
    fullDescription: 'Implements rigorous quality control under ISA 220 & ISQC 1. Routes new clients through Track A (thorough UBO, AML, KYC, management integrity, financial viability, and independence conflicts). Routes returning clients through Track B (settlement of prior fees, shareholding changes, new loans, litigation, and fraud inquiries).',
    category: 'Risk Management',
    personas: ['REVIEWER', 'APPROVER'],
    isaStandards: ['ISA 220 & ISQM 1'],
    inputs: ['Track A: UBO register, commercial license, ID proofs', 'Track B: Prior year fee clearance, litigation schedule'],
    outputs: ['Acceptance & Continuance Risk Scorecard', 'Formal Partner Digital Sign-Off Certificate'],
    businessLogic: [
      'Track A requires 100% compliance across all 6 AML/KYC questionnaire sections',
      'Track B blocks progression if prior year professional fees remain unsettled without Partner authorization'
    ],
    controlsAndGates: ['Mandatory Partner digital sign-off blocks project transition to operational planning'],
    industrialBestPractice: {
      title: 'Annual Team Independence & Conflict Re-Certification',
      standard: 'ISQM 1 / ISA 220 (Revised)',
      description: 'Formal written independence declarations submitted by each audit team member confirming zero direct shares, loans, or prohibited advisory relationships.',
      isOptional: false
    },
    upstreamNodeIds: ['node-dualkey'],
    downstreamNodeIds: ['node-directory-prov'],
    iconName: 'UserCheck',
    stageIndex: 7
  },
  'node-directory-prov': {
    id: 'node-directory-prov',
    moduleId: 'mod-2',
    moduleName: 'Admin & Planning',
    title: 'Automated 5-Folder Directory Provisioning',
    shortDesc: 'Instant creation of standardized engagement taxonomy',
    fullDescription: 'Automatically provisions the firm standard 5-folder engagement taxonomy upon risk acceptance: 01_Administration & Planning, 02_Trial Balance & Schedules, 03_Fieldwork & Testing, 04_Drafts & Deliverables, and 05_Final Signed Archive. Enforces zero per-file licensing penalties with unlimited storage.',
    category: 'Architecture',
    personas: ['REVIEWER'],
    isaStandards: ['ISA 230'],
    inputs: ['Engagement identifier and client code', 'Partner risk acceptance confirmation'],
    outputs: ['Standard 5-folder engagement directory tree', 'Workspace file permissions matrix'],
    businessLogic: [
      'Directory 05_Final Signed Archive is write-protected until Partner signature, and sealed read-only after 60-day ISA 230 timer',
      'System supports an unlimited number of client entities and historical engagements with zero license surcharges'
    ],
    controlsAndGates: ['Automated folder creation triggers immediately upon partner sign-off'],
    upstreamNodeIds: ['node-governance-track', 'node-el'],
    downstreamNodeIds: ['node-scheduling'],
    iconName: 'FolderTree',
    stageIndex: 8
  },
  'node-scheduling': {
    id: 'node-scheduling',
    moduleId: 'mod-2',
    moduleName: 'Admin & Planning',
    title: 'Resource Allocation & Scheduling',
    shortDesc: 'Visual capacity calendar assigning Partner, Manager, and Associates',
    fullDescription: 'Maps audit team availability against statutory reporting cutoffs. Allocates explicit roles: Engagement Partner (Approver), Audit Manager (Reviewer), and Associates (Preparers). Sets operational milestones (fieldwork kickoff, draft report deadline, and final signed delivery).',
    category: 'Resource Management',
    personas: ['REVIEWER', 'APPROVER'],
    isaStandards: ['ISA 220 & ISQM 1'],
    inputs: ['Auditor capacity calendars and skills matrix', 'Statutory financial year-end and reporting cutoff date'],
    outputs: ['Engagement Team Allocation Matrix', 'Delivery Milestones Schedule', 'Phase Budgeted Hours'],
    businessLogic: [
      'Calculates phase budget hours to feed practice realization tracking',
      'Prevents double-booking auditors exceeding 40 weekly fieldwork hours'
    ],
    controlsAndGates: ['Reviewer and Preparer must be distinct users to prevent self-review threats'],
    upstreamNodeIds: ['node-directory-prov'],
    downstreamNodeIds: ['node-materiality-calc'],
    iconName: 'CalendarClock',
    stageIndex: 9
  },
  'node-materiality-calc': {
    id: 'node-materiality-calc',
    moduleId: 'mod-2',
    moduleName: 'Admin & Planning',
    title: '3-Tier Materiality Calculation Engine',
    shortDesc: 'Dynamic calculation of PM, TE (50-75%), and SAD (3-5%) with ±5% rounding',
    fullDescription: 'Mathematical engine operating strictly under ISA 320. Connects to ingested Trial Balance to calculate Planning Materiality (PM) from benchmark bases (Profit Before Tax 5-10%, Revenue 0.5-2%, Total Assets 0.5-1%, Equity 1-2%). Calculates Tolerable Error (TE = 50%-75% of PM) and Summary of Audit Differences (SAD = 3%-5% of PM). Allows manager practical rounding within a strict ±5% limit.',
    category: 'Audit Science',
    personas: ['REVIEWER', 'APPROVER'],
    isaStandards: ['ISA 320'],
    inputs: ['Ingested Trial Balance balances in QAR', 'Benchmark selection', 'Risk percentage factor'],
    outputs: [
      'Planning Materiality (PM) in QAR',
      'Tolerable Error (TE) in QAR',
      'SAD Threshold (Trivial Cutoff) in QAR',
      'Visual Color-Coded Risk Stratification (Green / Amber / Red)'
    ],
    businessLogic: [
      'Planning Materiality = Benchmark Base × Chosen %',
      'Tolerable Error (TE) = PM × 50% (High Inherent Risk) to 75% (Low Inherent Risk)',
      'SAD Threshold = PM × 3% to 5% (all unadjusted items below this are considered trivial)',
      'Manager Rounding Tolerance: strictly bounded within ±5.0% of mathematical computation',
      'Color Coding: Green (< TE), Amber (TE to PM), Red (> PM or High Inherent Risk)'
    ],
    controlsAndGates: ['Mandatory Partner sign-off on materiality thresholds before fieldwork begins'],
    industrialBestPractice: {
      title: 'Overall Materiality (OM) vs. Performance Materiality (PM) Alignment',
      standard: 'ISA 320.9 & A13',
      description: 'Standardizes dual naming conventions: Overall Materiality (OM) as the financial statement threshold, and Performance Materiality (PM) at 50-75% to absorb aggregate undetected errors.',
      isOptional: false
    },
    upstreamNodeIds: ['node-scheduling'],
    downstreamNodeIds: ['node-tb-ingest'],
    iconName: 'Calculator',
    stageIndex: 10
  },
  'node-tb-ingest': {
    id: 'node-tb-ingest',
    moduleId: 'mod-3',
    moduleName: 'Fieldwork',
    title: 'Trial Balance Ingestion & FSLI Auto-Mapping',
    shortDesc: 'Excel/CSV upload with automated account mapping and memory',
    fullDescription: 'Ingests Trial Balance exports from external ERPs (QuickBooks, Tally, Zoho, SAP, Oracle). Automatically maps client chart-of-accounts codes to standardized Financial Statement Line Items (FSLI) using historical mapping memory. Validates total debits equal total credits with zero tolerance.',
    category: 'Data Normalization',
    personas: ['PREPARER', 'REVIEWER'],
    isaStandards: ['ISA 320', 'IFRS'],
    inputs: ['Client Trial Balance (Excel / CSV)', 'Prior year mapping dictionary'],
    outputs: ['Normalized FSLI balances in QAR', 'Debit/Credit validation certificate', 'Unmapped accounts exception queue'],
    businessLogic: [
      'Debits minus Credits MUST equal exactly 0.00 QAR; any difference generates a hard upload block',
      'Historical account mapping engine auto-links repeat accounts with >98% accuracy'
    ],
    controlsAndGates: ['Out-of-balance trial balances are rejected immediately'],
    industrialBestPractice: {
      title: 'ISA 315 ITGCs & ISA 240 Presumed Fraud Risk Anchors',
      standard: 'ISA 315 (Revised 2019) / ISA 240',
      description: 'Assesses client ERP IT general controls (access, backups, change logs) and automatically flags Revenue Recognition and Management Override of controls as presumed significant fraud risks.',
      isOptional: false
    },
    upstreamNodeIds: ['node-pbc-portal', 'node-materiality-calc'],
    downstreamNodeIds: ['node-split-dashboard'],
    iconName: 'FileInput',
    stageIndex: 11
  },
  'node-split-dashboard': {
    id: 'node-split-dashboard',
    moduleId: 'mod-3',
    moduleName: 'Fieldwork',
    title: 'Split Financial Statement Dashboard',
    shortDesc: 'Dual P&L / Balance Sheet workspace with row-level concurrency',
    fullDescription: 'Visual fieldwork interface showing the Profit & Loss statement on the upper half and Balance Sheet on the lower half. Displays Current Year, Prior Year, and Percentage Variance per row. Provides dual action triggers: [AR Test] for analytical review and [Audit Workprogram] for substantive procedures. Supports row-level concurrency so multiple team members work in parallel without lockouts.',
    category: 'Workspace',
    personas: ['PREPARER', 'REVIEWER', 'APPROVER'],
    isaStandards: ['ISA 320', 'ISA 540', 'ISA 570', 'IFRS'],
    inputs: ['Mapped FSLI trial balance rows', 'Prior year comparative financial statements'],
    outputs: ['Row-level audit progress states', 'Real-time multi-auditor testing queue', 'Live risk stratification badges'],
    businessLogic: [
      'Row-level locking enables Auditor A on Sales and Auditor B on Fixed Assets simultaneously without conflict',
      'Risk flags update dynamically as trial balance adjustments (AJEs) are posted'
    ],
    controlsAndGates: ['Audit procedures cannot be submitted without completing required assertion steps'],
    industrialBestPractice: {
      title: 'ISA 540 (Revised) Accounting Estimates & Impairment Stress-Testing',
      standard: 'ISA 540 (Revised) / IFRS 9',
      description: 'Explicit procedural steps to challenge management bias in accounting estimates, including historical forecast accuracy retrospective checks and sensitivity models.',
      isOptional: true
    },
    upstreamNodeIds: ['node-tb-ingest'],
    downstreamNodeIds: ['node-ar-engine', 'node-workprograms'],
    iconName: 'SplitSquareVertical',
    stageIndex: 12
  },
  'node-ar-engine': {
    id: 'node-ar-engine',
    moduleId: 'mod-3',
    moduleName: 'Fieldwork',
    title: 'Analytical Review & Going Concern Engine',
    shortDesc: 'Multi-period ratio analysis, variance plausibility, and ISA 570 checklist',
    fullDescription: 'Launched via the [AR Test] trigger on any line item. Computes multi-period variance calculations, gross margin trends, liquidity ratios, and plausibility assessments against industry norms. Includes mandatory ISA 570 Going Concern evaluation checklist (operating cash flows, debt covenants, working capital deficits).',
    category: 'Substantive Analytics',
    personas: ['PREPARER', 'REVIEWER'],
    isaStandards: ['ISA 570'],
    inputs: ['Current and prior year FSLI balances', 'Budget figures and industry benchmarks'],
    outputs: ['Analytical Review working paper (AR Schedule)', 'ISA 570 Going Concern assessment sign-off'],
    businessLogic: [
      'Variances exceeding both TE and 10% mandate a qualitative auditor rationale and corroborating evidence',
      'Going Concern indicators flag automated alert to Engagement Partner if liquidity drops below threshold'
    ],
    controlsAndGates: ['Mandatory Going Concern checklist must be completed before SRM generation'],
    upstreamNodeIds: ['node-split-dashboard'],
    downstreamNodeIds: ['node-three-tier-review'],
    iconName: 'TrendingUp',
    stageIndex: 13
  },
  'node-workprograms': {
    id: 'node-workprograms',
    moduleId: 'mod-3',
    moduleName: 'Fieldwork',
    title: 'Substantive Workprograms & Ad-Hoc Steps',
    shortDesc: 'Pre-loaded assertion tests with dynamic step injection & hybrid evidence linking',
    fullDescription: 'Launched via the [Audit Workprogram] trigger on any line item. Features pre-loaded procedural checklists structured around financial statement assertions (Existence, Completeness, Valuation, Rights & Obligations, Presentation). Allows field auditors to insert custom ad-hoc procedural rows for unique risks, and links both digital files and physical binder index codes (e.g. X-1, Box 3, Shelf B).',
    category: 'Fieldwork Testing',
    personas: ['PREPARER', 'REVIEWER'],
    isaStandards: ['ISA 230', 'ISA 500'],
    inputs: ['Standard workprogram procedures', 'Client voucher populations and sample items'],
    outputs: ['Completed audit working paper', 'Cross-referenced hybrid evidence index', 'Proposed audit adjustment journal entries (AJEs)'],
    businessLogic: [
      'Hybrid Cross-Referencing: Supports both URL/PDF attachment AND physical binder locator [X-1, Box 3]',
      'Field auditors can inject ad-hoc custom steps that inherit the review workflow'
    ],
    controlsAndGates: ['Every procedure must have either a digital attachment or physical index code before submission'],
    upstreamNodeIds: ['node-split-dashboard', 'node-sampling'],
    downstreamNodeIds: ['node-three-tier-review'],
    iconName: 'ClipboardCheck',
    stageIndex: 14
  },
  'node-sampling': {
    id: 'node-sampling',
    moduleId: 'mod-3',
    moduleName: 'Fieldwork',
    title: 'Audit Population & Sampling Engine',
    shortDesc: 'Calculators for MUS, Systematic Random, and Stratified Sampling',
    fullDescription: 'Statistical sampling engine embedded directly in substantive workprograms. Provides three compliant sampling methodologies: Monetary Unit Sampling (MUS), Systematic Random Sampling, and Stratified Attribute Sampling. Automatically calculates sample size based on population value, Tolerable Error (TE), and expected misstatement.',
    category: 'Audit Science',
    personas: ['REVIEWER', 'PREPARER'],
    isaStandards: ['ISA 530'],
    inputs: ['FSLI transaction population in QAR', 'Materiality thresholds (PM, TE, SAD)', 'Confidence level (90% or 95%)'],
    outputs: ['Statistically determined sample size', 'Selected voucher sample list', 'High-value and key item extraction list'],
    businessLogic: [
      'Items exceeding Tolerable Error (TE) are automatically isolated as 100% testing candidates',
      'Sample projection engine estimates total population misstatement from discovered sample errors'
    ],
    controlsAndGates: ['Mathematical sampling parameters logged immutably in working paper audit trail'],
    industrialBestPractice: {
      title: 'Three-Stratum Statistical Sampling Protocol',
      standard: 'ISA 530.A1 - A16',
      description: 'Isolates 100% Key Items (> Performance Materiality), Specific Risk items, and Representative Sample population using standard MUS/Poisson tables.',
      isOptional: true
    },
    upstreamNodeIds: ['node-split-dashboard'],
    downstreamNodeIds: ['node-workprograms'],
    iconName: 'Target',
    stageIndex: 15
  },
  'node-confirmations': {
    id: 'node-confirmations',
    moduleId: 'mod-3',
    moduleName: 'Fieldwork',
    title: 'Third-Party Confirmations & Holding Letter Gatekeeper',
    shortDesc: 'Tracks Bank, AR, AP, and Legal confirmations; blocks release if critical item is missing',
    fullDescription: 'Centralized tracking dashboard for external confirmations under ISA 505 (Bank, Accounts Receivable, Accounts Payable, Inventory in Custody, Legal Counsel). If any confirmation marked as "Critical" remains unreturned or unresolved, the system enforces a HARD BLOCK on final audit opinion release and automatically compiles a "Pending Confirmation / Holding Letter" to client management.',
    category: 'Verification Gate',
    personas: ['REVIEWER', 'APPROVER', 'CLIENT'],
    isaStandards: ['ISA 505'],
    inputs: ['Bank confirmation requests', 'Debtor and creditor confirmation batches', 'Legal counsel inquiry letters'],
    outputs: ['External Confirmation Registry', 'Holding Letter to Client Management (if blocked)', 'Confirmation verification working paper'],
    businessLogic: [
      'CRITICAL BLOCKER: If a Bank or Legal confirmation marked Critical is missing, Opinion release is hard-blocked',
      'System auto-generates formal Holding Letter to client explaining statutory audit delay due to missing third-party reply'
    ],
    controlsAndGates: ['Zero release bypass: Critical confirmations must be marked Received & Verified or Cleared by Partner'],
    industrialBestPractice: {
      title: 'Electronic Direct Confirmation Protocol',
      standard: 'ISA 505.7',
      description: 'Maintains direct chain of custody between auditor and third-party confirming institution, strictly mitigating client intervention risks.',
      isOptional: false
    },
    upstreamNodeIds: ['node-split-dashboard'],
    downstreamNodeIds: ['node-srm-memo'],
    iconName: 'MailCheck',
    stageIndex: 16
  },
  'node-three-tier-review': {
    id: 'node-three-tier-review',
    moduleId: 'mod-3',
    moduleName: 'Fieldwork',
    title: 'Three-Tier Review Matrix & Rejection Loop',
    shortDesc: 'Preparer -> Reviewer (Rework Loop) -> Approver workflow',
    fullDescription: 'Enforces strict separation of audit duties across three tiers: Preparer (Junior Associate), Reviewer (Audit Manager), and Approver (Engagement Partner). Managers can flag individual test steps, input mandatory review notes, and click [Return with Comments], automatically reverting the status to "Under Rework" and notifying the Preparer.',
    category: 'Quality Control',
    personas: ['PREPARER', 'REVIEWER', 'APPROVER'],
    isaStandards: ['ISA 220 & ISQM 1', 'ISA 230'],
    inputs: ['Submitted workprograms', 'Attached evidence', 'Recalculated audit schedules'],
    outputs: ['Review notes thread', 'Approved workprogram tokens', 'Rework assignments with mandatory feedback'],
    businessLogic: [
      'Preparer submits -> Reviewer verifies -> If incomplete, Manager returns with mandatory comments (Under Rework)',
      'Partner specifically conducts direct review of all Red-risk areas and critical estimates'
    ],
    controlsAndGates: ['A workprogram cannot advance to Partner review while any Reviewer comment remains unresolved'],
    industrialBestPractice: {
      title: 'Immutable UTC Sign-Off Timestamps (Anti-Backdating)',
      standard: 'ISA 230.9 / ISQM 1',
      description: 'Records cryptographic user credential hash and UTC server timestamp upon preparation and review sign-offs to pass regulatory inspections.',
      isOptional: false
    },
    upstreamNodeIds: ['node-workprograms', 'node-ar-engine'],
    downstreamNodeIds: ['node-srm-memo'],
    iconName: 'RotateCcw',
    stageIndex: 17
  },
  'node-srm-memo': {
    id: 'node-srm-memo',
    moduleId: 'mod-3',
    moduleName: 'Fieldwork',
    title: 'Summary Review Memorandum (SRM)',
    shortDesc: 'Auto-compiled memo aggregating unadjusted differences, SAD, AJEs, and open risks',
    fullDescription: 'Automatically compiles the comprehensive Summary Review Memorandum once all substantive workprograms are cleared by the Audit Manager. Aggregates all unadjusted audit differences against the SAD threshold and Planning Materiality, compiles proposed Audit Adjustment Journal Entries (AJEs), details significant accounting estimates, and documents the Manager recommendation for Partner sign-off.',
    category: 'Audit Synthesis',
    personas: ['REVIEWER', 'APPROVER'],
    isaStandards: ['ISA 220 & ISQM 1', 'ISA 320'],
    inputs: ['Cleared workprograms', 'Summary of Audit Differences (SAD) register', 'Proposed journal adjustments'],
    outputs: ['Summary Review Memorandum (SRM)', 'Aggregated Error Schedule vs PM/TE', 'Manager formal recommendation for opinion release'],
    businessLogic: [
      'If cumulative unadjusted differences exceed Planning Materiality, the system flags mandatory adjustment or qualification',
      'Partner must review and digitally sign the SRM before accessing the final Opinion selector'
    ],
    controlsAndGates: ['Formal Partner digital sign-off on SRM is the gateway to Module 4 Reporting'],
    upstreamNodeIds: ['node-three-tier-review', 'node-confirmations'],
    downstreamNodeIds: ['node-opinion-engine'],
    iconName: 'FileText',
    stageIndex: 18
  },
  'node-opinion-engine': {
    id: 'node-opinion-engine',
    moduleId: 'mod-4',
    moduleName: 'Reporting',
    title: 'Audit Opinion Selection Engine',
    shortDesc: 'ISA 700/705 4-way opinion dropdown with digital credentials',
    fullDescription: 'Dedicated opinion selector accessible exclusively by the Engagement Partner. Features 4 ISA 700/705 compliant opinion categories: 1. Clean / Unqualified Opinion, 2. Qualified Opinion, 3. Disclaimer of Opinion, 4. Adverse Opinion. Embeds the Partner cryptographic digital signature and official firm stamp PNG on final certified report documents.',
    category: 'Opinion Formulation',
    personas: ['APPROVER'],
    isaStandards: ['ISA 700 & 705'],
    inputs: ['Partner-approved SRM', 'External confirmations clearance flag', 'Signed Letter of Representation'],
    outputs: ['Selected Audit Opinion record', 'Digitally signed auditor opinion certificate', 'Official firm stamp metadata'],
    businessLogic: [
      'Only the authenticated Engagement Partner role has permission to select or modify the audit opinion',
      'Applying the opinion triggers automated compilation of the final 5-part commercial deliverables bundle'
    ],
    controlsAndGates: ['Cryptographic Partner key signature required; cannot be delegated to Manager or Associate'],
    industrialBestPractice: {
      title: 'ISA 701 Key Audit Matters (KAM) & ISQM 1 EQR Second Partner Gate',
      standard: 'ISA 701 / ISQM 1',
      description: 'Mandatory Key Audit Matters (KAM) disclosure for Public Interest Entities (PIEs) and optional Engagement Quality Reviewer (Second Partner) independent concurrence.',
      isOptional: true
    },
    upstreamNodeIds: ['node-srm-memo'],
    downstreamNodeIds: ['node-qualification-builder', 'node-deliverables-bundle'],
    iconName: 'Stamp',
    stageIndex: 19
  },
  'node-qualification-builder': {
    id: 'node-qualification-builder',
    moduleId: 'mod-4',
    moduleName: 'Reporting',
    title: 'Conditional Qualification Builder',
    shortDesc: 'Forces affected FSLI selection & qualitative/quantitative rationale injection',
    fullDescription: 'Dynamic regulatory builder activated whenever the Partner selects a Qualified, Disclaimer, or Adverse opinion. Automatically prompts the Partner to select the specific affected Financial Statement Line Items (e.g. Inventory valuation, Trade Receivables existence) and requires mandatory textual and numeric justification. Injects this text directly into the "Basis for Qualified/Modified Opinion" section per ISA 705.',
    category: 'Regulatory Builder',
    personas: ['APPROVER'],
    isaStandards: ['ISA 700 & 705'],
    inputs: ['Modified opinion type', 'Affected FSLI selection', 'Quantitative discrepancy amount in QAR'],
    outputs: ['ISA 705 compliant "Basis for Modified Opinion" paragraph', 'Audit report qualification metadata'],
    businessLogic: [
      'Mandatory text box requires minimum 50 characters of qualitative rationale and affected QAR figure before report compilation',
      'Auto-formats statutory paragraph references to ISA 705 (Modifications to the Opinion in the Independent Auditor Report)'
    ],
    controlsAndGates: ['Partner cannot generate final bundle until the qualification rationale is fully populated and verified'],
    upstreamNodeIds: ['node-opinion-engine'],
    downstreamNodeIds: ['node-deliverables-bundle'],
    iconName: 'AlertTriangle',
    stageIndex: 20
  },
  'node-deliverables-bundle': {
    id: 'node-deliverables-bundle',
    moduleId: 'mod-4',
    moduleName: 'Reporting',
    title: 'Mandatory 5-Part Commercial Deliverables Bundle',
    shortDesc: 'Generates the certified report, management letter, LOR, audit trail, and fee note',
    fullDescription: 'Once the Partner authorizes the file, the system compiles the complete 5-part package: Deliverable 1 (Independent Auditor Report & Certified Financial Statements PDF), Deliverable 2 (Management Letter with Deficiency -> Impact -> Auditor Recommendation), Deliverable 3 (Letter of Representation LOR formatted for client letterhead), Deliverable 4 (Management Correspondences Audit Trail), Deliverable 5 (Final Balance Fee Note releasing remaining 50% bill).',
    category: 'Deliverables',
    personas: ['APPROVER', 'CLIENT'],
    isaStandards: ['ISA 700 & 705', 'ISA 260', 'ISA 580'],
    inputs: ['Certified financial statements', 'Internal control observations matrix', 'Client confirmation history', 'Contract fee schedule'],
    outputs: [
      'Deliverable 1: Independent Auditor Report & Certified Statements (Signed PDF)',
      'Deliverable 2: Management Letter (Control deficiencies & recommendations)',
      'Deliverable 3: Letter of Representation (LOR for client letterhead)',
      'Deliverable 4: Management Correspondences Audit Trail',
      'Deliverable 5: Final Balance Fee Note (Remaining 50% bill)'
    ],
    businessLogic: [
      'All 5 deliverables are packaged into a secured, tamper-evident bundle with SHA-256 hash',
      'Client document upload access freezes immediately upon bundle compilation to preserve file integrity'
    ],
    controlsAndGates: ['Delivered automatically to client portal in read-only format'],
    industrialBestPractice: {
      title: 'ISA 580 Same-Day MRL/LOR Dating & ISA 560 Subsequent Events',
      standard: 'ISA 580 / ISA 560',
      description: 'Management Letter of Representation (LOR) date must strictly match the audit report release date, verified alongside post-balance sheet subsequent events review.',
      isOptional: false
    },
    upstreamNodeIds: ['node-opinion-engine', 'node-qualification-builder'],
    downstreamNodeIds: ['node-final-billing', 'node-archival-lock'],
    iconName: 'PackageCheck',
    stageIndex: 21
  },
  'node-final-billing': {
    id: 'node-final-billing',
    moduleId: 'mod-4',
    moduleName: 'Reporting',
    title: '50% Final Fee Release & Settlement',
    shortDesc: 'Automated release of final fee note and accounts receivable reconciliation',
    fullDescription: 'Triggered automatically as Deliverable 5 in the commercial bundle. Generates the final 50% professional fee invoice in QAR, matches against the initial 50% advance invoice, and logs the receivable in the firm practice management ledger. Tracks settlement terms and sends reminders to client CFO.',
    category: 'Billing',
    personas: ['REVIEWER', 'CLIENT'],
    isaStandards: ['ISA 210'],
    inputs: ['Total contracted fee in QAR', '50% Advance payment receipt record'],
    outputs: ['50% Final Fee Invoice', 'Updated Client Statement of Account in QAR', 'Practice Accounts Receivable aging record'],
    businessLogic: [
      'Remaining 50% professional fee is automatically billed upon opinion issuance',
      'Feeds practice management ledger to calculate realized cash collection vs accrued work-in-progress'
    ],
    controlsAndGates: ['Dispatched directly to client CFO alongside the certified audit bundle'],
    upstreamNodeIds: ['node-deliverables-bundle'],
    downstreamNodeIds: ['node-timesheet-rates'],
    iconName: 'CreditCard',
    stageIndex: 22
  },
  'node-archival-lock': {
    id: 'node-archival-lock',
    moduleId: 'mod-4',
    moduleName: 'Reporting',
    title: '60-Day Compliance Archival Timer (ISA 230)',
    shortDesc: '60-day regulatory countdown to permanent read-only file lock',
    fullDescription: 'Enforces an automated 60-calendar-day countdown timer starting strictly from the date of the Partner signature, in compliance with ISA 230 (Audit Documentation assembly and archival). Upon timer expiration or explicit manual Partner trigger, converts the entire engagement folder to Read-Only status, sealing all working papers, notes, and evidence against modifications or deletions.',
    category: 'Regulatory Archive',
    personas: ['APPROVER'],
    isaStandards: ['ISA 230'],
    inputs: ['Partner report signature timestamp', 'Archival countdown clock (60 days)'],
    outputs: ['Permanently locked engagement archive', 'Immutable timestamped audit log', 'Regulatory inspection export package'],
    businessLogic: [
      'ISA 230 mandates engagement file assembly completion within 60 days of the auditor report date',
      'Once locked, deletions, modifications, and overwrites are strictly disallowed by system architecture',
      'Maintains complete immutable audit trail of who accessed or exported files post-lock'
    ],
    controlsAndGates: ['Hard system lock: irreversible once locked; only read-only regulator inspection export permitted'],
    upstreamNodeIds: ['node-deliverables-bundle'],
    downstreamNodeIds: [],
    iconName: 'LockKeyhole',
    stageIndex: 23
  },
  'node-timesheet-rates': {
    id: 'node-timesheet-rates',
    moduleId: 'mod-5',
    moduleName: 'Practice Management',
    title: 'Tiered Charge-Out Rates & Time Logging',
    shortDesc: 'Captures daily hours per role: Partner (1,000), Manager (750), Senior (500), Junior (200 QAR/h)',
    fullDescription: 'Captures daily operational hours logged by audit personnel across each engagement phase and FSLI. Enforces standard firm charge-out rates: Engagement Partner (1,000 QAR/h), Audit Manager (750 QAR/h), Audit Senior / Supervisor (500 QAR/h), and Audit Associate / Junior (200 QAR/h). Computes Total Engagement Labor Cost.',
    category: 'Practice Economics',
    personas: ['PREPARER', 'REVIEWER', 'APPROVER'],
    isaStandards: ['ISA 220 & ISQM 1'],
    inputs: ['Daily staff timesheets', 'Standard charge-out rate matrix in QAR/hour'],
    outputs: ['Total Engagement Labor Cost in QAR', 'Hours logged by role and phase', 'Staff utilization percentage'],
    businessLogic: [
      'Total Engagement Labor Cost = Σ (Logged Hours per Role × Role Charge-Out Rate)',
      'Partner rate: 1,000 QAR/h | Manager: 750 QAR/h | Senior: 500 QAR/h | Junior: 200 QAR/h'
    ],
    controlsAndGates: ['Staff must submit daily timesheets before weekend review cutoff'],
    upstreamNodeIds: ['node-final-billing'],
    downstreamNodeIds: ['node-profitability-calc'],
    iconName: 'Clock',
    stageIndex: 24
  },
  'node-profitability-calc': {
    id: 'node-profitability-calc',
    moduleId: 'mod-5',
    moduleName: 'Practice Management',
    title: 'Realization & Profitability Engine',
    shortDesc: 'Contracted fee vs labor costs, realization % & budget variance analysis',
    fullDescription: 'Calculates engagement gross margin and realization metrics in real-time. Evaluates contracted professional fees against total accumulated labor cost (hours × rates) and external disbursements. Analyzes variance between budgeted phase hours and actual hours spent, providing partner-level insight into realization rates.',
    category: 'Practice Economics',
    personas: ['REVIEWER', 'APPROVER'],
    isaStandards: ['ISA 220 & ISQM 1'],
    inputs: ['Contracted engagement fee in QAR', 'Total accumulated labor cost in QAR', 'Budgeted vs actual phase hours'],
    outputs: ['Engagement Profitability in QAR', 'Realization Rate (%)', 'Budget vs Actual Hours Variance Matrix'],
    businessLogic: [
      'Engagement Profitability = Contracted Engagement Fee - Total Engagement Cost',
      'Realization Rate = (Contracted Fee / Standard Value of Time Logged) × 100%',
      'Flags engagements with realization rate below 85% for partner operational review'
    ],
    controlsAndGates: ['Management alerts triggered if actual hours exceed phase budget by >15%'],
    industrialBestPractice: {
      title: '80% & 100% Budget-Burn Variance Alerting',
      standard: 'ISQM 1 Resource Management',
      description: 'Automated notification thresholds at 80% and 100% of allocated phase hours to prevent fee realization dilution and unapproved overtime.',
      isOptional: true
    },
    upstreamNodeIds: ['node-timesheet-rates'],
    downstreamNodeIds: ['node-internal-ledger'],
    iconName: 'BadgePercent',
    stageIndex: 25
  },
  'node-internal-ledger': {
    id: 'node-internal-ledger',
    moduleId: 'mod-5',
    moduleName: 'Practice Management',
    title: 'Practice Ledger & Internal Bookkeeping',
    shortDesc: 'Records office rent, staff salaries, partner drawings, and petty cash',
    fullDescription: 'Maintains the firm internal operational accounting ledger. Records firm operational expenses (Office Rent & Facility, Staff Salaries & End of Service benefits, Overhead & IT, Petty Cash disbursals). Reconciles 50% advance and 50% final billing receipts against firm bank accounts.',
    category: 'Internal Accounting',
    personas: ['REVIEWER', 'APPROVER'],
    isaStandards: ['IFRS'],
    inputs: ['Firm operational expense vouchers', 'Payroll registers and facility invoices in QAR', 'Client payment vouchers'],
    outputs: ['Practice General Ledger accounts', 'Bank reconciliation schedules', 'Accounts Receivable Aging (50% Advance / 50% Final)'],
    businessLogic: [
      'Segregates client trust funds from firm operating accounts',
      'Maintains double-entry compliance for all firm internal disbursements and salary accruals'
    ],
    controlsAndGates: ['Monthly bank reconciliation verified against official bank statements'],
    upstreamNodeIds: ['node-profitability-calc'],
    downstreamNodeIds: ['node-firm-reporting'],
    iconName: 'BookOpenCheck',
    stageIndex: 26
  },
  'node-firm-reporting': {
    id: 'node-firm-reporting',
    moduleId: 'mod-5',
    moduleName: 'Practice Management',
    title: 'Internal Firm Financial Statements',
    shortDesc: 'Generates Firm Monthly Trial Balance, P&L, and AR Aging Schedule',
    fullDescription: 'Produces monthly internal management accounts for firm partners. Outputs the Internal Firm Monthly Trial Balance, Internal Firm Profit & Loss Statement, and Client Accounts Receivable Aging Schedule (stratified into Current, 30 days, 60 days, and 90+ days past due for both 50% advance and 50% final billings).',
    category: 'Executive Reports',
    personas: ['APPROVER'],
    isaStandards: ['IFRS'],
    inputs: ['Practice general ledger balances', 'Engagement profitability actuals'],
    outputs: ['Firm Monthly Trial Balance in QAR', 'Internal Practice P&L Statement', 'Accounts Receivable Aging Schedule'],
    businessLogic: [
      'Provides firm partners with bird-eye view of firm cashflow, fee realization, and partner profit distributions',
      'Tracks total firm revenue in Qatari Riyals (QAR) across all engagements without per-file licensing penalties'
    ],
    controlsAndGates: ['Monthly financial statements presented to Managing Partner by 5th of each month'],
    upstreamNodeIds: ['node-internal-ledger'],
    downstreamNodeIds: [],
    iconName: 'PieChart',
    stageIndex: 27
  }
};

export const STATE_MACHINE_STEPS: StateMachineStep[] = [
  {
    id: 'LEAD_INGESTION',
    stepNumber: 1,
    label: 'Lead Ingestion',
    allowedActions: 'Log inquiry, capture company and contact data, verify registration documents',
    gateCondition: 'Minimum entity and primary contact data validated',
    nextState: 'PROPOSAL_GENERATION',
    moduleId: 'mod-1',
    primaryPersona: 'REVIEWER',
    details: 'Inbound inquiry captured from WhatsApp/Email/Phone. Initial company profiling and authorized signatory verification initiated.'
  },
  {
    id: 'PROPOSAL_GENERATION',
    stepNumber: 2,
    label: 'Proposal Generation',
    allowedActions: 'Build Brief Quote or Comprehensive Proposal, dispatch to client contact',
    gateCondition: 'Proposal dispatched via Email / WhatsApp with confirmed delivery',
    nextState: 'DUAL_KEY_PENDING',
    moduleId: 'mod-1',
    primaryPersona: 'REVIEWER',
    details: 'System compiles 1-2 page quotation or multi-page proposal with CVs, methodology, and fee breakdown in QAR.'
  },
  {
    id: 'DUAL_KEY_PENDING',
    stepNumber: 3,
    label: 'Dual-Key Acceptance Gate',
    allowedActions: 'Complete Client Acceptance Checklist (AML/KYC), record client commercial approval',
    gateCondition: 'Dual-Key Clearance: Both Client Acceptance AND Partner AML Approval confirmed',
    enhancedGateCondition: 'Standard Dual-Key + Predecessor Auditor Clearance & IESBA Independence Declaration',
    enhancedGateDescription: 'Requires affirmative predecessor auditor response (ISA 300/510) and signed team independence declarations confirming no non-audit service conflicts.',
    nextState: 'ADVANCE_BILLING',
    moduleId: 'mod-1',
    primaryPersona: 'APPROVER',
    details: 'Strict 2-key state barrier: Key 1 is client commercial quote acceptance; Key 2 is Partner digital risk sign-off per ISA 220.'
  },
  {
    id: 'ADVANCE_BILLING',
    stepNumber: 4,
    label: 'Advance Billing & Letter',
    allowedActions: 'Generate Engagement Letter (ISA 210) & 50% Advance Commercial Invoice',
    gateCondition: '50% advance payment confirmed and recorded with official receipt',
    nextState: 'PORTAL_ACTIVE_PLANNING',
    moduleId: 'mod-1',
    primaryPersona: 'APPROVER',
    details: 'Binding contract executed with Partner digital stamp; 50% mobilization invoice issued; official receipt generated upon settlement.'
  },
  {
    id: 'PORTAL_ACTIVE_PLANNING',
    stepNumber: 5,
    label: 'Planning & Materiality',
    allowedActions: 'Provision Client Portal, schedule team, ingest Trial Balance, calculate materiality',
    gateCondition: 'Planning signed off by Partner, TB mapped to FSLIs with balanced Debits/Credits',
    enhancedGateCondition: 'Standard Planning + ISA 240 Presumed Fraud Risk Anchors & ITGC Review (ISA 315)',
    enhancedGateDescription: 'Includes formal testing of General IT Controls and mandatory identification of Revenue Recognition and Management Override as presumed fraud risks.',
    nextState: 'FIELDWORK_EXECUTION',
    moduleId: 'mod-2',
    primaryPersona: 'REVIEWER',
    details: 'Standard 5-folder directory created, team allocated, 3-tier materiality (PM, TE, SAD) calculated with manager ±5% rounding.'
  },
  {
    id: 'FIELDWORK_EXECUTION',
    stepNumber: 6,
    label: 'Fieldwork Execution',
    allowedActions: 'Execute workprograms, attach digital/physical evidence [X-1, Box 3], dispatch confirmation requests',
    gateCondition: 'All assigned FSLI procedures submitted by Preparers with evidence cross-references',
    enhancedGateCondition: 'Standard Testing + 100% Key Items (> PM) & ISA 540 Accounting Estimates Stress-Testing',
    enhancedGateDescription: 'Enforces 100% census testing for all transactions exceeding Performance Materiality and documented retrospective checks on management estimates.',
    nextState: 'MANAGERIAL_REVIEW',
    moduleId: 'mod-3',
    primaryPersona: 'PREPARER',
    details: 'Auditors work simultaneously via split dashboard (P&L and B/S) with row-level concurrency, running AR tests and substantive steps.'
  },
  {
    id: 'MANAGERIAL_REVIEW',
    stepNumber: 7,
    label: 'Managerial Review',
    allowedActions: 'Review workpapers, issue review notes or rework loop, compile Summary Review Memo (SRM)',
    gateCondition: 'Zero open review notes, SRM compiled, critical confirmations returned',
    nextState: 'PARTNER_APPROVAL',
    moduleId: 'mod-3',
    primaryPersona: 'REVIEWER',
    details: 'Audit Senior/Manager verifies evidence; flags notes; triggers rework loop if needed; aggregates SAD differences into SRM.'
  },
  {
    id: 'PARTNER_APPROVAL',
    stepNumber: 8,
    label: 'Partner Clearance & Opinion',
    allowedActions: 'Partner inspects SRM, reviews Red-risk areas, selects Audit Opinion (Clean, Qualified, Disclaimer, Adverse)',
    gateCondition: 'Partner applies cryptographic digital signature and official firm seal',
    enhancedGateCondition: 'Standard Clearance + ISQM 1 Second Partner EQR Review (for High Risk / PIEs)',
    enhancedGateDescription: 'Independent Engagement Quality Reviewer (Second Partner) reviews significant audit judgments, risk areas, and proposed opinion prior to certification.',
    nextState: 'DELIVERABLE_RELEASE',
    moduleId: 'mod-4',
    primaryPersona: 'APPROVER',
    details: 'Partner evaluates high-risk line items and SRM; selects ISA 700/705 opinion; populates qualification rationale if modified.'
  },
  {
    id: 'DELIVERABLE_RELEASE',
    stepNumber: 9,
    label: 'Deliverables Bundle Release',
    allowedActions: 'Generate 5-part deliverables package, issue 50% balance invoice, freeze client portal uploads',
    gateCondition: 'Final package generated and delivered to client; portal upload lock activated',
    enhancedGateCondition: 'Standard Release + ISA 580 Exact Same-Day MRL/LOR Date Matching & ISA 560 Review',
    enhancedGateDescription: 'Management representation letter must be signed on the exact same date as the audit report, verified with subsequent events inquiry.',
    nextState: 'COMPLIANCE_COUNTDOWN',
    moduleId: 'mod-4',
    primaryPersona: 'APPROVER',
    details: 'Dispatches 5-part bundle (Auditor Report, Management Letter, LOR, Correspondences, Final Bill). Client portal becomes read-only.'
  },
  {
    id: 'COMPLIANCE_COUNTDOWN',
    stepNumber: 10,
    label: '60-Day Archival Countdown',
    allowedActions: 'Assemble working papers archive; Partner may trigger early permanent lock',
    gateCondition: '60 calendar days elapsed since signature date OR manual Partner lock triggered',
    nextState: 'ARCHIVED_READ_ONLY',
    moduleId: 'mod-4',
    primaryPersona: 'APPROVER',
    details: 'Automated 60-day regulatory timer running under ISA 230. Once elapsed, all files convert permanently to immutable read-only.'
  },
  {
    id: 'ARCHIVED_READ_ONLY',
    stepNumber: 11,
    label: 'Archived (Read-Only)',
    allowedActions: 'Read-only viewing and regulator inspection export',
    gateCondition: 'Terminal State: File is permanently locked; modifications strictly disallowed',
    nextState: 'TERMINAL',
    moduleId: 'mod-4',
    primaryPersona: 'APPROVER',
    details: 'Engagement file permanently sealed against deletions or overwrites. Cryptographic audit trail preserved for regulatory inspection.'
  }
];

export const SAMPLE_FSLIS: FSLIItem[] = [
  // Profit & Loss Items
  {
    id: 'fsli-rev',
    code: 'PL-100',
    name: 'Revenue / Commercial Sales',
    statement: 'PL',
    currentYearQAR: 14850000,
    priorYearQAR: 12400000,
    varianceQAR: 2450000,
    variancePercent: 19.76,
    riskLevel: 'RED',
    assignedTo: 'Tariq Al-Mansoor (Senior)',
    status: 'Ready for Review',
    workprogramSteps: [
      { id: 'step-r1', assertion: 'Completeness', description: 'Reconcile sales journal to general ledger and monthly VAT filings', completed: true, digitalRef: 'PBC_02_VAT_Recon.xlsx', physicalBinderRef: 'Box 1, Binder R-1' },
      { id: 'step-r2', assertion: 'Cut-off', description: 'Perform 15-day pre and post year-end sales cut-off testing on delivery notes', completed: true, digitalRef: 'Cutoff_Sample_Testing.pdf', physicalBinderRef: 'Box 1, Binder R-2' },
      { id: 'step-r3', assertion: 'Valuation', description: 'Sample contract pricing against board-approved price schedules', completed: true, digitalRef: 'Price_Verification_Wp.xlsx', physicalBinderRef: 'X-1, Box 3' }
    ],
    analyticalReview: {
      ratioAssessment: 'Gross Profit Margin improved from 28.2% to 31.4% driven by wholesale supply contracts.',
      plausibilitySummary: 'Revenue growth correlates with 18% increase in shipping volume and confirmed debtor balances.',
      goingConcernImpact: false
    }
  },
  {
    id: 'fsli-cogs',
    code: 'PL-200',
    name: 'Cost of Goods Sold (COGS)',
    statement: 'PL',
    currentYearQAR: 10190000,
    priorYearQAR: 8900000,
    varianceQAR: 1290000,
    variancePercent: 14.49,
    riskLevel: 'AMBER',
    assignedTo: 'Noor Hassan (Associate)',
    status: 'In Progress',
    workprogramSteps: [
      { id: 'step-c1', assertion: 'Valuation', description: 'Test purchase invoice unit costs against vendor contracts and customs duty receipts', completed: true, digitalRef: 'COGS_Purchases_Sample.xlsx', physicalBinderRef: 'Box 2, Binder C-1' },
      { id: 'step-c2', assertion: 'Completeness', description: 'Perform search for unrecorded supplier liabilities and inventory in transit', completed: false, reviewerNote: 'Ensure bill of lading cutoff covers the 5 days following Dec 31' }
    ],
    analyticalReview: {
      ratioAssessment: 'Cost ratio steady at 68.6% of sales compared to 71.8% in prior year.',
      plausibilitySummary: 'Lower unit freight charges in Q3 and Q4 offset local raw material price increases.',
      goingConcernImpact: false
    }
  },
  {
    id: 'fsli-opex',
    code: 'PL-300',
    name: 'Operating & Administrative Expenses',
    statement: 'PL',
    currentYearQAR: 2340000,
    priorYearQAR: 2150000,
    varianceQAR: 190000,
    variancePercent: 8.84,
    riskLevel: 'GREEN',
    assignedTo: 'Sara Mahmoud (Junior Auditor)',
    status: 'Under Rework',
    workprogramSteps: [
      { id: 'step-o1', assertion: 'Existence', description: 'Vouch monthly office lease agreements to signed real estate contracts and lease schedule', completed: true, digitalRef: 'Lease_IFRS16_Schedule.xlsx', physicalBinderRef: 'Box 3, Binder E-1' },
      { id: 'step-o2', assertion: 'Valuation', description: 'Recalculate staff gratuity and end-of-service provision per Qatar Labor Law', completed: true, digitalRef: 'Gratuity_LaborLaw_Recalc.xlsx', physicalBinderRef: 'X-1, Box 4' },
      { id: 'step-o3', assertion: 'Completeness', description: 'Sample utility and communication invoices for year-end accruals', completed: false, reviewerNote: 'Mandatory comment: Telecomm accrual for Dec missing bill attachment. Re-test!' }
    ],
    analyticalReview: {
      ratioAssessment: 'Opex to Sales ratio decreased slightly from 17.3% to 15.8% demonstrating overhead efficiency.',
      plausibilitySummary: 'Staff salary increases (5%) aligned with board approval resolution dated Jan 15.',
      goingConcernImpact: false
    }
  },
  // Balance Sheet Items
  {
    id: 'fsli-ppe',
    code: 'BS-100',
    name: 'Property, Plant & Equipment (PPE)',
    statement: 'BS',
    currentYearQAR: 8650000,
    priorYearQAR: 7800000,
    varianceQAR: 850000,
    variancePercent: 10.90,
    riskLevel: 'AMBER',
    assignedTo: 'Tariq Al-Mansoor (Senior)',
    status: 'Manager Approved',
    workprogramSteps: [
      { id: 'step-p1', assertion: 'Existence', description: 'Physical asset verification sample across Doha warehousing facility', completed: true, digitalRef: 'Physical_Asset_Count_Photos.pdf', physicalBinderRef: 'Box 4, Binder PPE-1' },
      { id: 'step-p2', assertion: 'Valuation', description: 'Recalculate straight-line depreciation schedules and check useful lives against IFRS', completed: true, digitalRef: 'Depreciation_Model_Recalc.xlsx', physicalBinderRef: 'X-2, Box 2' },
      { id: 'step-p3', assertion: 'Rights & Obligations', description: 'Inspect vehicle and equipment registration title deeds with Ministry of Transport', completed: true, digitalRef: 'Title_Deeds_Registry.pdf', physicalBinderRef: 'Box 4, Binder PPE-2' }
    ],
    analyticalReview: {
      ratioAssessment: 'Asset turnover improved from 1.59 to 1.72 times.',
      plausibilitySummary: 'Net additions of 1,250,000 QAR in fleet trucks supported by bank financing.',
      goingConcernImpact: false
    }
  },
  {
    id: 'fsli-inv',
    code: 'BS-200',
    name: 'Merchandise Inventory',
    statement: 'BS',
    currentYearQAR: 4320000,
    priorYearQAR: 3450000,
    varianceQAR: 870000,
    variancePercent: 25.22,
    riskLevel: 'RED',
    assignedTo: 'Noor Hassan (Associate)',
    status: 'Under Rework',
    workprogramSteps: [
      { id: 'step-i1', assertion: 'Existence', description: 'Attend year-end inventory physical count at industrial area logistics hub', completed: true, digitalRef: 'Stocktake_Observation_Memo.pdf', physicalBinderRef: 'Box 5, Binder INV-1' },
      { id: 'step-i2', assertion: 'Valuation', description: 'Test Lower of Cost and Net Realizable Value (NRV) for slow-moving stock lines', completed: false, reviewerNote: 'Mandatory comment: NRV test did not calculate provision for 6-month aging stock.' },
      { id: 'step-i3', assertion: 'Completeness', description: 'Test inventory roll-forward schedule from count date to balance sheet date', completed: true, digitalRef: 'Rollforward_Recon.xlsx', physicalBinderRef: 'Box 5, Binder INV-2' }
    ],
    analyticalReview: {
      ratioAssessment: 'Inventory Days on Hand increased from 141 days to 155 days indicating slower turnover.',
      plausibilitySummary: 'Client built safety buffer for seasonal supply chain lead times.',
      goingConcernImpact: false
    }
  },
  {
    id: 'fsli-ar',
    code: 'BS-300',
    name: 'Trade Accounts Receivable',
    statement: 'BS',
    currentYearQAR: 5120000,
    priorYearQAR: 4200000,
    varianceQAR: 920000,
    variancePercent: 21.90,
    riskLevel: 'RED',
    assignedTo: 'Tariq Al-Mansoor (Senior)',
    status: 'Ready for Review',
    workprogramSteps: [
      { id: 'step-a1', assertion: 'Existence', description: 'Dispatch third-party debtor confirmation requests for top 25 customer balances', completed: true, digitalRef: 'AR_Confirmations_Master.xlsx', physicalBinderRef: 'Box 6, Binder AR-1' },
      { id: 'step-a2', assertion: 'Valuation', description: 'Evaluate IFRS 9 Expected Credit Loss (ECL) provision matrix against historical default rates', completed: true, digitalRef: 'ECL_Model_Validation.xlsx', physicalBinderRef: 'X-3, Box 1' },
      { id: 'step-a3', assertion: 'Cut-off', description: 'Subsequent cash collections testing for 60 days following year-end', completed: true, digitalRef: 'Subsequent_Receipts_Bank.pdf', physicalBinderRef: 'Box 6, Binder AR-2' }
    ],
    analyticalReview: {
      ratioAssessment: 'DSO (Days Sales Outstanding) widened from 123 days to 126 days.',
      plausibilitySummary: 'Government contracting receivables delayed by approval cycles; all subsequently collected.',
      goingConcernImpact: false
    }
  },
  {
    id: 'fsli-cash',
    code: 'BS-400',
    name: 'Cash & Cash Equivalents',
    statement: 'BS',
    currentYearQAR: 2890000,
    priorYearQAR: 1950000,
    varianceQAR: 940000,
    variancePercent: 48.21,
    riskLevel: 'GREEN',
    assignedTo: 'Sara Mahmoud (Junior Auditor)',
    status: 'Ready for Review',
    workprogramSteps: [
      { id: 'step-k1', assertion: 'Existence', description: 'Obtain direct independent bank confirmations for all 4 operating accounts (QNB, CBQ, QIB)', completed: true, digitalRef: 'Bank_Confirmations_Certificates.pdf', physicalBinderRef: 'Box 7, Binder B-1' },
      { id: 'step-k2', assertion: 'Valuation', description: 'Verify monthly bank reconciliations and vouch outstanding cheques to subsequent clearance', completed: true, digitalRef: 'Bank_Reconciliation_Tests.xlsx', physicalBinderRef: 'Box 7, Binder B-2' },
      { id: 'step-k3', assertion: 'Completeness', description: 'Conduct surprise cash count of petty cash floats at head office', completed: true, digitalRef: 'PettyCash_Count_Cert.pdf', physicalBinderRef: 'Box 7, Binder B-3' }
    ],
    analyticalReview: {
      ratioAssessment: 'Current Ratio strengthened from 1.62 to 1.84.',
      plausibilitySummary: 'Operating cash flow generated 2.1M QAR supported by improved fourth-quarter debtor collections.',
      goingConcernImpact: false
    }
  }
];

export const SAMPLE_CONFIRMATIONS: ConfirmationRecord[] = [
  {
    id: 'conf-1',
    partyName: 'Qatar National Bank (QNB) - Main Branch',
    category: 'Bank',
    isCritical: true,
    status: 'Received & Verified',
    sentDate: '2026-01-08',
    amountQAR: 2150400,
    notes: 'Direct certificate confirms accounts, loan facility balances, and letter of guarantee guarantees.'
  },
  {
    id: 'conf-2',
    partyName: 'Commercial Bank of Qatar (CBQ)',
    category: 'Bank',
    isCritical: true,
    status: 'Received & Verified',
    sentDate: '2026-01-08',
    amountQAR: 739600,
    notes: 'Confirmed zero unrecorded liabilities and confirmed current balances.'
  },
  {
    id: 'conf-3',
    partyName: 'Al-Rayyan Infrastructure Holdings Q.P.S.C.',
    category: 'Accounts Receivable',
    isCritical: true,
    status: 'Received & Verified',
    sentDate: '2026-01-12',
    amountQAR: 1850000,
    notes: 'Signed confirmation returned with zero discrepancies.'
  },
  {
    id: 'conf-4',
    partyName: 'Doha Steel & Industrial Supplies W.L.L.',
    category: 'Accounts Payable',
    isCritical: false,
    status: 'Discrepancy Noted',
    sentDate: '2026-01-14',
    amountQAR: 620000,
    notes: 'Discrepancy of 42,000 QAR traced to goods received note on Dec 30 not invoiced until Jan 5.'
  },
  {
    id: 'conf-5',
    partyName: 'Al-Kuwari & Partners Legal Advocates (Lead Counsel)',
    category: 'Legal Counsel',
    isCritical: true,
    status: 'Pending Response',
    sentDate: '2026-01-10',
    notes: 'CRITICAL HOLDING GATE: Pending legal confirmation regarding civil claim for contract breach (est. 450,000 QAR). Opinion release is BLOCKED!'
  }
];

export const PRACTICE_RATES = {
  PARTNER: { role: 'Engagement Partner', ratePerHour: 1000, budgetedHours: 25, loggedHours: 22 },
  MANAGER: { role: 'Audit Manager', ratePerHour: 750, budgetedHours: 45, loggedHours: 48 },
  SENIOR: { role: 'Audit Supervisor / Senior', ratePerHour: 500, budgetedHours: 80, loggedHours: 85 },
  JUNIOR: { role: 'Audit Associate / Junior', ratePerHour: 200, budgetedHours: 120, loggedHours: 110 }
};

export const CONTRACT_PRESET = {
  clientName: 'Al-Watan Trading & Contracting W.L.L.',
  commercialRegNumber: 'CR-104928/DOH',
  taxIdentificationNumber: 'TIN-0094827100',
  contractedFeeQAR: 95000,
  advanceFeeQAR: 47500,
  finalFeeQAR: 47500,
  statutoryYear: 'FY 2025 (Period Ended 31 Dec 2025)',
  trialBalanceTotals: {
    totalRevenueQAR: 14850000,
    profitBeforeTaxQAR: 2320000,
    totalAssetsQAR: 21250000,
    totalEquityQAR: 11400000
  }
};

export type PersonaRole = 'PREPARER' | 'REVIEWER' | 'APPROVER' | 'CLIENT';

export interface PersonaInfo {
  role: PersonaRole;
  title: string;
  badgeColor: string;
  responsibilities: string[];
}

export type ISACategory = 
  | 'ISA 210' 
  | 'ISA 220 & ISQM 1' 
  | 'ISA 230' 
  | 'ISA 240'
  | 'ISA 260'
  | 'ISA 315'
  | 'ISA 320' 
  | 'ISA 500'
  | 'ISA 505' 
  | 'ISA 530'
  | 'ISA 540'
  | 'ISA 560'
  | 'ISA 570' 
  | 'ISA 580'
  | 'ISA 700 & 705'
  | 'ISA 701'
  | 'IESBA Code'
  | 'IFRS';

export interface AuditNode {
  id: string;
  moduleId: string;
  moduleName: string;
  title: string;
  shortDesc: string;
  fullDescription: string;
  category: string;
  personas: PersonaRole[];
  isaStandards: ISACategory[];
  inputs: string[];
  outputs: string[];
  businessLogic: string[];
  controlsAndGates?: string[];
  industrialBestPractice?: {
    title: string;
    standard: string;
    description: string;
    isOptional: boolean;
  };
  upstreamNodeIds: string[];
  downstreamNodeIds: string[];
  iconName: string;
  statusTag?: string;
  stageIndex: number;
}

export interface ModuleData {
  id: string;
  number: number;
  title: string;
  tagline: string;
  accentColor: string; // Tailwind color class or hex
  description: string;
  handshakeToNext?: {
    title: string;
    requirement: string;
    targetModuleId: string;
  };
  nodeIds: string[];
}

export type LifecycleState = 
  | 'LEAD_INGESTION'
  | 'PROPOSAL_GENERATION'
  | 'DUAL_KEY_PENDING'
  | 'ADVANCE_BILLING'
  | 'PORTAL_ACTIVE_PLANNING'
  | 'FIELDWORK_EXECUTION'
  | 'MANAGERIAL_REVIEW'
  | 'PARTNER_APPROVAL'
  | 'DELIVERABLE_RELEASE'
  | 'COMPLIANCE_COUNTDOWN'
  | 'ARCHIVED_READ_ONLY';

export interface StateMachineStep {
  id: LifecycleState;
  stepNumber: number;
  label: string;
  allowedActions: string;
  gateCondition: string;
  enhancedGateCondition?: string;
  enhancedGateDescription?: string;
  nextState: LifecycleState | 'TERMINAL';
  moduleId: string;
  primaryPersona: PersonaRole;
  details: string;
}

export interface FSLIItem {
  id: string;
  code: string;
  name: string;
  statement: 'PL' | 'BS';
  currentYearQAR: number;
  priorYearQAR: number;
  varianceQAR: number;
  variancePercent: number;
  riskLevel: 'GREEN' | 'AMBER' | 'RED';
  assignedTo: string;
  status: 'In Progress' | 'Ready for Review' | 'Under Rework' | 'Manager Approved' | 'Partner Signed Off';
  workprogramSteps: {
    id: string;
    assertion: 'Existence' | 'Completeness' | 'Valuation' | 'Rights & Obligations' | 'Presentation' | 'Cut-off';
    description: string;
    completed: boolean;
    digitalRef?: string;
    physicalBinderRef?: string;
    reviewerNote?: string;
  }[];
  analyticalReview: {
    ratioAssessment: string;
    plausibilitySummary: string;
    goingConcernImpact: boolean;
  };
}

export interface ConfirmationRecord {
  id: string;
  partyName: string;
  category: 'Bank' | 'Accounts Receivable' | 'Accounts Payable' | 'Legal Counsel';
  isCritical: boolean;
  status: 'Dispatched' | 'Received & Verified' | 'Discrepancy Noted' | 'Pending Response';
  sentDate: string;
  amountQAR?: number;
  notes: string;
}

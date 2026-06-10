/** Canonical exploreHVAC client list — single source of truth for React + dashboard.html */
export const EXPLORE_HVAC_CLIENT_NAMES = [
  'Pure Air Solutions',
  'Frosty Systems',
  'Precision HVAC Experts',
  'Elite Air Systems',
  'Keystone Home Comfort',
  'Summit Plumbing & Drain',
  'AllSeason Home Services',
  'ProFlow Plumbing Co.',
  'BlueLine Plumbing Services',
  'Airflow Masters',
  'Comfort Zone Heating & Air',
  'Apex Climate Control',
  'Prime Comfort HVAC',
  'TotalCare Home Solutions',
  'Rapid Response Air',
] as const;

export const DEFAULT_CLIENT = 'Pure Air Solutions';

/** Old mock names → exploreHVAC names (for dashboard.html migration) */
export const LEGACY_CLIENT_NAME_MAP: Record<string, string> = {
  'Foundation Health & Wellness': 'Keystone Home Comfort',
  'JAG Medical Spa': 'ProFlow Plumbing Co.',
  'Vital Roots Functional Medicine': 'Summit Plumbing & Drain',
  'Core Wellness & Recovery': 'TotalCare Home Solutions',
  'Vitality Medical Spa': 'AllSeason Home Services',
  'Inner Calm Therapy Center': 'BlueLine Plumbing Services',
};

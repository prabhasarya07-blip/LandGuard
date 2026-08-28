export const DEMO_PROPERTIES = [
  {
    id: 'prop-1',
    survey_number: '145/2',
    khasra_number: null,
    property_name: 'Whitefield Plot',
    owner_name: 'Rajesh Kumar',
    village: 'Whitefield',
    taluk: 'Bengaluru East',
    district: 'Bengaluru Urban',
    state: 'Karnataka',
    property_type: 'Residential',
    area: '2400 sq ft',
    latitude: 12.9698,
    longitude: 77.7500,
    risk_level: 'HIGH',
    risk_status: 'HIGH PRIORITY',
    verification_status: 'SOURCE VERIFIED',
    signals_count: 4,
    latest_dispute: 'Ownership dispute — Aug 2026',
    monitoring_status: 'ACTIVE',
    created_at: '2026-07-15T10:30:00Z',
  },
  {
    id: 'prop-2',
    survey_number: '88/1',
    khasra_number: '312',
    property_name: 'SG Highway Commercial',
    owner_name: 'Mehta Enterprises',
    village: 'Bodakdev',
    taluk: 'Ahmedabad City',
    district: 'Ahmedabad',
    state: 'Gujarat',
    property_type: 'Commercial',
    area: '5000 sq ft',
    latitude: 23.0350,
    longitude: 72.5114,
    risk_level: 'MEDIUM',
    risk_status: 'REVIEW REQUIRED',
    verification_status: 'AI DETECTED',
    signals_count: 2,
    latest_dispute: 'Boundary dispute — Jul 2026',
    monitoring_status: 'ACTIVE',
    created_at: '2026-06-20T14:00:00Z',
  },
  {
    id: 'prop-3',
    survey_number: '221/A',
    khasra_number: '445/1',
    property_name: 'Dwarka Sector 12 Plot',
    owner_name: 'Sunita Sharma',
    village: 'Dwarka',
    taluk: 'New Delhi',
    district: 'South West Delhi',
    state: 'New Delhi',
    property_type: 'Residential',
    area: '1800 sq ft',
    latitude: 28.5921,
    longitude: 77.0460,
    risk_level: 'LOW',
    risk_status: 'LOW RISK SIGNAL',
    verification_status: 'UNVERIFIED',
    signals_count: 1,
    latest_dispute: 'Encroachment notice — Jun 2026',
    monitoring_status: 'ACTIVE',
    created_at: '2026-08-01T09:15:00Z',
  },
  {
    id: 'prop-4',
    survey_number: '67/3',
    khasra_number: null,
    property_name: 'Jayanagar Farm Land',
    owner_name: 'Prakash Gowda',
    village: 'Kengeri',
    taluk: 'Bengaluru South',
    district: 'Bengaluru Urban',
    state: 'Karnataka',
    property_type: 'Agricultural',
    area: '3 acres',
    latitude: 12.9141,
    longitude: 77.4830,
    risk_level: 'NONE',
    risk_status: 'NO SIGNALS DETECTED',
    verification_status: 'N/A',
    signals_count: 0,
    latest_dispute: null,
    monitoring_status: 'ACTIVE',
    created_at: '2026-08-10T11:00:00Z',
  }
];

export const DEMO_ALERTS = [
  {
    id: 'alert-1',
    property_id: 'prop-1',
    dispute_type: 'Ownership dispute',
    risk_level: 'HIGH',
    date: '2026-08-25T09:00:00Z',
    source: 'Vijaya Karnataka',
    source_page: 7,
    verification_status: 'SOURCE VERIFIED',
    summary: 'A public notice claims absolute ownership of Survey No. 145/2 in Whitefield. This matches your monitored property.',
    read: false,
  },
  {
    id: 'alert-2',
    property_id: 'prop-1',
    dispute_type: 'Court injunction',
    risk_level: 'HIGH',
    date: '2026-08-20T14:30:00Z',
    source: 'Deccan Herald',
    source_page: 12,
    verification_status: 'SOURCE VERIFIED',
    summary: 'A court injunction reference mentioning Survey No. 145/2 was identified in a legal notices section.',
    read: true,
  },
  {
    id: 'alert-3',
    property_id: 'prop-2',
    dispute_type: 'Boundary dispute',
    risk_level: 'MEDIUM',
    date: '2026-07-28T11:00:00Z',
    source: 'Gujarat Samachar',
    source_page: 5,
    verification_status: 'AI DETECTED',
    summary: 'A boundary dispute notice referencing Survey No. 88/1 in Bodakdev was detected. Verification pending.',
    read: false,
  },
  {
    id: 'alert-4',
    property_id: 'prop-3',
    dispute_type: 'Encroachment',
    risk_level: 'LOW',
    date: '2026-06-15T16:00:00Z',
    source: 'Hindustan Times',
    source_page: 9,
    verification_status: 'UNVERIFIED',
    summary: 'A possible encroachment notice was detected near Dwarka Sector 12. Fuzzy location match — review required.',
    read: true,
  },
];

export const DEMO_DISPUTES = [
  {
    id: 'disp-1',
    cluster_id: 'DG-2026-0041',
    property_id: 'prop-1',
    title: 'Public Notice of Ownership Claim',
    dispute_type: 'Ownership dispute',
    source_type: 'Newspaper',
    source_name: 'Vijaya Karnataka',
    source_language: 'Kannada',
    date: '2026-08-25',
    risk_level: 'HIGH',
    survey_number: '145/2',
    village: 'Whitefield',
    district: 'Bengaluru Urban',
    state: 'Karnataka',
    parties: ['Rajesh Kumar', 'Suresh Reddy'],
    court: 'Civil Court, Bengaluru',
    case_number: 'OS/2021/4523',
    extracted_text: 'Notice is hereby given that my client Sri Suresh Reddy claims absolute ownership of the property bearing Survey Number 145/2 situated at Whitefield Village, Bengaluru East Taluk, Bengaluru Urban District. Any person having objection to this claim may file the same within 15 days from the date of publication of this notice.',
    page_number: 7,
    verification_status: 'SOURCE VERIFIED',
    match_confidence: 'HIGH',
    match_explanation: {
      survey_number: 'Exact Match',
      village: 'Exact Match',
      district: 'Exact Match',
    }
  },
  {
    id: 'disp-2',
    cluster_id: 'DG-2026-0041',
    property_id: 'prop-1',
    title: 'Court Injunction Reference',
    dispute_type: 'Court injunction',
    source_type: 'Newspaper',
    source_name: 'Deccan Herald',
    source_language: 'English',
    date: '2026-08-20',
    risk_level: 'HIGH',
    survey_number: '145/2',
    village: 'Whitefield',
    district: 'Bengaluru Urban',
    state: 'Karnataka',
    parties: ['Rajesh Kumar', 'Suresh Reddy'],
    court: 'Civil Court, Bengaluru',
    case_number: 'OS/2021/4523',
    extracted_text: 'In the matter of OS/2021/4523, the Hon\'ble Court has issued an interim injunction restraining any transfer, sale, or encumbrance of property Survey No. 145/2, Whitefield Village, pending final disposal of the ownership suit.',
    page_number: 12,
    verification_status: 'SOURCE VERIFIED',
    match_confidence: 'HIGH',
    match_explanation: {
      survey_number: 'Exact Match',
      case_number: 'Cross-referenced',
      village: 'Exact Match',
    }
  },
  {
    id: 'disp-3',
    cluster_id: 'DG-2026-0042',
    property_id: 'prop-2',
    title: 'Boundary Dispute Notice',
    dispute_type: 'Boundary dispute',
    source_type: 'Newspaper',
    source_name: 'Gujarat Samachar',
    source_language: 'Gujarati',
    date: '2026-07-28',
    risk_level: 'MEDIUM',
    survey_number: '88/1',
    village: 'Bodakdev',
    district: 'Ahmedabad',
    state: 'Gujarat',
    parties: ['Mehta Enterprises', 'Patel Construction'],
    court: null,
    case_number: null,
    extracted_text: 'Public notice regarding boundary demarcation dispute between adjoining properties Survey No. 88/1 and Survey No. 88/2 in Bodakdev area. Concerned parties are requested to present relevant documents.',
    page_number: 5,
    verification_status: 'AI DETECTED',
    match_confidence: 'HIGH',
    match_explanation: {
      survey_number: 'Exact Match',
      village: 'Exact Match',
      district: 'Exact Match',
    }
  },
  {
    id: 'disp-4',
    cluster_id: 'DG-2026-0043',
    property_id: 'prop-3',
    title: 'Possible Encroachment Notice',
    dispute_type: 'Encroachment',
    source_type: 'Newspaper',
    source_name: 'Hindustan Times',
    source_language: 'English',
    date: '2026-06-15',
    risk_level: 'LOW',
    survey_number: 'Plot 45',
    village: 'Sector 12',
    district: 'Dwarka',
    state: 'Delhi',
    parties: ['DDA', 'Unknown Encroachers'],
    court: null,
    case_number: null,
    extracted_text: 'Delhi Development Authority (DDA) hereby issues notice against illegal encroachment activities observed on public and private plots adjacent to Sector 12 Main Road, Dwarka. All unauthorized structures will be demolished within 30 days.',
    page_number: 9,
    verification_status: 'UNVERIFIED',
    match_confidence: 'LOW',
    match_explanation: {
      location: 'Fuzzy Match (Sector 12)',
      district: 'Exact Match',
      parties: 'No Match to Owner'
    }
  },
  {
    id: 'disp-5',
    cluster_id: 'DG-2026-0050',
    property_id: 'prop-1',
    title: 'Title Verification Notice',
    dispute_type: 'Title dispute',
    source_type: 'Newspaper',
    source_name: 'Prajavani',
    source_language: 'Kannada',
    date: '2026-05-12',
    risk_level: 'MEDIUM',
    survey_number: '145/2',
    village: 'Whitefield',
    district: 'Bengaluru Urban',
    state: 'Karnataka',
    parties: ['Rajesh Kumar', 'K. Venkat'],
    court: null,
    case_number: null,
    extracted_text: 'Title verification notice published by advocate K. Venkat on behalf of his client intending to purchase Survey No 145/2. Any person with claims to the title must object within 7 days.',
    page_number: 4,
    verification_status: 'SOURCE VERIFIED',
    match_confidence: 'HIGH',
    match_explanation: { survey_number: 'Exact Match', village: 'Exact Match' }
  },
  {
    id: 'disp-6',
    cluster_id: 'DG-2026-0051',
    property_id: 'prop-2',
    title: 'Legal Heir Partition Claim',
    dispute_type: 'Inheritance/Partition dispute',
    source_type: 'Court Record',
    source_name: 'eCourts Portal',
    source_language: 'English',
    date: '2026-01-20',
    risk_level: 'HIGH',
    survey_number: '88/1',
    village: 'Bodakdev',
    district: 'Ahmedabad',
    state: 'Gujarat',
    parties: ['Ramesh Mehta', 'Dinesh Mehta'],
    court: 'City Civil Court, Ahmedabad',
    case_number: 'CS/2026/88',
    extracted_text: 'Partition suit filed by Dinesh Mehta claiming 50% ancestral share in Survey No 88/1 Bodakdev, challenging the exclusive registration by Mehta Enterprises.',
    page_number: 1,
    verification_status: 'CONFIRMED',
    match_confidence: 'HIGH',
    match_explanation: { survey_number: 'Exact Match', owner_name: 'Partial Match (Mehta)' }
  },
  {
    id: 'disp-7',
    cluster_id: 'DG-2026-0052',
    property_id: 'prop-3',
    title: 'Property Attachment Order',
    dispute_type: 'Mortgage/Attachment',
    source_type: 'Government Portal',
    source_name: 'Sub-Registrar Office',
    source_language: 'English',
    date: '2025-11-05',
    risk_level: 'CRITICAL',
    survey_number: 'Plot 45',
    village: 'Sector 12',
    district: 'Dwarka',
    state: 'Delhi',
    parties: ['Sunita Sharma', 'State Bank of India'],
    court: 'DRT Delhi',
    case_number: 'OA/2025/112',
    extracted_text: 'Order of attachment issued against Plot 45, Sector 12 Dwarka for recovery of dues amounting to Rs. 45,00,000 by State Bank of India.',
    page_number: 2,
    verification_status: 'CONFIRMED',
    match_confidence: 'HIGH',
    match_explanation: { survey_number: 'Exact Match', owner_name: 'Exact Match' }
  },
  {
    id: 'disp-8',
    cluster_id: 'DG-2026-0053',
    property_id: 'prop-1',
    title: 'SARFAESI Possession Notice',
    dispute_type: 'SARFAESI-related notice',
    source_type: 'Newspaper',
    source_name: 'The Hindu (Bengaluru)',
    source_language: 'English',
    date: '2026-03-10',
    risk_level: 'CRITICAL',
    survey_number: '145/2',
    village: 'Whitefield',
    district: 'Bengaluru Urban',
    state: 'Karnataka',
    parties: ['Rajesh Kumar', 'HDFC Bank'],
    court: null,
    case_number: null,
    extracted_text: 'Possession notice under Sec 13(4) of SARFAESI Act. HDFC Bank has taken symbolic possession of Survey No 145/2, Whitefield due to NPA status of loan account.',
    page_number: 14,
    verification_status: 'SOURCE VERIFIED',
    match_confidence: 'HIGH',
    match_explanation: { survey_number: 'Exact Match', owner_name: 'Exact Match' }
  },
  {
    id: 'disp-9',
    cluster_id: 'DG-2026-0054',
    property_id: 'prop-2',
    title: 'Land Acquisition Notification',
    dispute_type: 'Acquisition',
    source_type: 'Government Gazette',
    source_name: 'Gujarat State Gazette',
    source_language: 'Gujarati',
    date: '2026-08-01',
    risk_level: 'HIGH',
    survey_number: '88/1',
    village: 'Bodakdev',
    district: 'Ahmedabad',
    state: 'Gujarat',
    parties: ['State Highway Authority'],
    court: null,
    case_number: null,
    extracted_text: 'Preliminary notification for land acquisition for SG Highway widening project. Survey No 88/1 (partial) is marked for acquisition.',
    page_number: 45,
    verification_status: 'AI DETECTED',
    match_confidence: 'HIGH',
    match_explanation: { survey_number: 'Exact Match', village: 'Exact Match' }
  },
  {
    id: 'disp-10',
    cluster_id: 'DG-2026-0055',
    property_id: 'prop-3',
    title: 'Bank e-Auction Notice',
    dispute_type: 'Auction',
    source_type: 'Newspaper',
    source_name: 'Times of India (Delhi)',
    source_language: 'English',
    date: '2026-08-20',
    risk_level: 'CRITICAL',
    survey_number: 'Plot 45',
    village: 'Sector 12',
    district: 'Dwarka',
    state: 'Delhi',
    parties: ['Sunita Sharma', 'State Bank of India'],
    court: null,
    case_number: null,
    extracted_text: 'E-Auction Sale Notice for Sale of Immovable Assets under SARFAESI Act. Plot 45, Sector 12, Dwarka is put up for e-auction on 15-Sep-2026. Reserve Price: 1.2 Cr.',
    page_number: 11,
    verification_status: 'SOURCE VERIFIED',
    match_confidence: 'HIGH',
    match_explanation: { survey_number: 'Exact Match', owner_name: 'Exact Match' }
  },
];

export const DEMO_TIMELINE: Record<string, Array<{
  year: string; event: string; source: string; dispute_type: string; verification_status: string; date: string;
}>> = {
  'prop-1': [
    { year: '2019', date: '2019-03-15', event: 'Initial ownership claim notice published by Suresh Reddy', source: 'Vijaya Karnataka', dispute_type: 'Ownership dispute', verification_status: 'SOURCE VERIFIED' },
    { year: '2021', date: '2021-06-22', event: 'Ownership suit OS/2021/4523 filed in Civil Court, Bengaluru', source: 'Court Record', dispute_type: 'Ownership dispute', verification_status: 'SOURCE VERIFIED' },
    { year: '2023', date: '2023-01-10', event: 'Public notice regarding pending litigation published', source: 'Deccan Herald', dispute_type: 'Ownership dispute', verification_status: 'SOURCE VERIFIED' },
    { year: '2025', date: '2025-11-05', event: 'Interim injunction issued — restraining property transfer', source: 'Court Order', dispute_type: 'Court injunction', verification_status: 'SOURCE VERIFIED' },
    { year: '2026', date: '2026-08-25', event: 'Latest ownership claim notice detected in Kannada newspaper', source: 'Vijaya Karnataka', dispute_type: 'Ownership dispute', verification_status: 'SOURCE VERIFIED' },
  ],
  'prop-2': [
    { year: '2025', date: '2025-09-12', event: 'Initial boundary demarcation dispute notice', source: 'Gujarat Samachar', dispute_type: 'Boundary dispute', verification_status: 'AI DETECTED' },
    { year: '2026', date: '2026-07-28', event: 'Follow-up boundary dispute notice published', source: 'Gujarat Samachar', dispute_type: 'Boundary dispute', verification_status: 'AI DETECTED' },
  ],
  'prop-3': [
    { year: '2026', date: '2026-06-15', event: 'Possible encroachment notice detected near Dwarka Sector 12', source: 'Hindustan Times', dispute_type: 'Encroachment', verification_status: 'UNVERIFIED' },
  ],
};

export const DEMO_NEWSPAPER_SOURCES = [
  { id: 'src-1', name: 'Deccan Herald', language: 'English', region: 'Karnataka', content_type: 'Digital', status: 'Active', coverage: 'Daily', last_processed: '2026-08-27' },
  { id: 'src-2', name: 'Vijaya Karnataka', language: 'Kannada', region: 'Karnataka', content_type: 'Physical/Digital', status: 'Active', coverage: 'Daily', last_processed: '2026-08-27' },
  { id: 'src-3', name: 'Prajavani', language: 'Kannada', region: 'Karnataka', content_type: 'Digital', status: 'Active', coverage: 'Daily', last_processed: '2026-08-26' },
  { id: 'src-3a', name: 'The Hindu (Bengaluru)', language: 'English', region: 'Karnataka', content_type: 'Digital', status: 'Active', coverage: 'Daily', last_processed: '2026-08-27' },
  { id: 'src-3b', name: 'Udayavani', language: 'Kannada', region: 'Karnataka', content_type: 'Physical/Digital', status: 'Active', coverage: 'Daily', last_processed: '2026-08-27' },
  { id: 'src-3c', name: 'Kannada Prabha', language: 'Kannada', region: 'Karnataka', content_type: 'Digital', status: 'Active', coverage: 'Daily', last_processed: '2026-08-26' },
  { id: 'src-4', name: 'Gujarat Samachar', language: 'Gujarati', region: 'Gujarat', content_type: 'Digital', status: 'Active', coverage: 'Daily', last_processed: '2026-08-27' },
  { id: 'src-5', name: 'Divya Bhaskar', language: 'Gujarati', region: 'Gujarat', content_type: 'Digital', status: 'Active', coverage: 'Daily', last_processed: '2026-08-25' },
  { id: 'src-5a', name: 'Sandesh', language: 'Gujarati', region: 'Gujarat', content_type: 'Physical/Digital', status: 'Active', coverage: 'Daily', last_processed: '2026-08-27' },
  { id: 'src-5b', name: 'Kutchmitra', language: 'Gujarati', region: 'Gujarat', content_type: 'Digital', status: 'Active', coverage: 'Daily', last_processed: '2026-08-26' },
  { id: 'src-5c', name: 'Gujarat Mitra', language: 'Gujarati', region: 'Gujarat', content_type: 'Digital', status: 'Active', coverage: 'Daily', last_processed: '2026-08-27' },
  { id: 'src-6', name: 'Hindustan Times', language: 'English', region: 'New Delhi', content_type: 'Digital', status: 'Active', coverage: 'Daily', last_processed: '2026-08-27' },
  { id: 'src-7', name: 'Navbharat Times', language: 'Hindi', region: 'New Delhi', content_type: 'Digital', status: 'Active', coverage: 'Daily', last_processed: '2026-08-26' },
  { id: 'src-8', name: 'Dainik Jagran', language: 'Hindi', region: 'New Delhi', content_type: 'Physical/Digital', status: 'Inactive', coverage: 'Weekly', last_processed: '2026-07-15' },
  { id: 'src-9', name: 'The Times of India (Delhi)', language: 'English', region: 'New Delhi', content_type: 'Digital', status: 'Active', coverage: 'Daily', last_processed: '2026-08-27' },
  { id: 'src-10', name: 'Punjab Kesari', language: 'Hindi', region: 'New Delhi', content_type: 'Digital', status: 'Active', coverage: 'Daily', last_processed: '2026-08-27' },
  { id: 'src-11', name: 'Amar Ujala', language: 'Hindi', region: 'New Delhi', content_type: 'Digital', status: 'Active', coverage: 'Daily', last_processed: '2026-08-26' },
];

export const DEMO_DOCUMENTS = [
  { id: 'doc-1', filename: 'vijaya_karnataka_25aug2026.pdf', file_type: 'PDF', file_size: '4.2 MB', upload_timestamp: '2026-08-25T10:00:00Z', uploaded_by: 'system', sha256: 'a1b2c3d4e5f6...', processing_status: 'COMPLETED', pages: 24 },
  { id: 'doc-2', filename: 'deccan_herald_20aug2026.pdf', file_type: 'PDF', file_size: '3.8 MB', upload_timestamp: '2026-08-20T15:00:00Z', uploaded_by: 'system', sha256: 'f6e5d4c3b2a1...', processing_status: 'COMPLETED', pages: 20 },
  { id: 'doc-3', filename: 'gujarat_samachar_28jul2026.jpg', file_type: 'JPG', file_size: '1.1 MB', upload_timestamp: '2026-07-28T12:00:00Z', uploaded_by: 'analyst-1', sha256: 'b3c4d5e6f7a8...', processing_status: 'COMPLETED', pages: 1 },
  { id: 'doc-4', filename: 'hindustan_times_15jun2026.pdf', file_type: 'PDF', file_size: '5.0 MB', upload_timestamp: '2026-06-15T17:00:00Z', uploaded_by: 'system', sha256: 'c4d5e6f7a8b9...', processing_status: 'COMPLETED', pages: 28 },
  { id: 'doc-5', filename: 'land_notice_scan.png', file_type: 'PNG', file_size: '2.3 MB', upload_timestamp: '2026-08-26T09:30:00Z', uploaded_by: 'client-upload', sha256: 'd5e6f7a8b9c0...', processing_status: 'PROCESSING', pages: 1 },
];

export const DEMO_VERIFICATION_EVENTS = [
  { id: 've-1', dispute_id: 'disp-1', actor: 'Analyst Priya M.', timestamp: '2026-08-26T10:15:00Z', previous_status: 'AI DETECTED', new_status: 'SOURCE VERIFIED', reason: 'Verified original Kannada newspaper page. OCR text matches extracted content.' },
  { id: 've-2', dispute_id: 'disp-2', actor: 'Analyst Priya M.', timestamp: '2026-08-21T11:30:00Z', previous_status: 'AI DETECTED', new_status: 'SOURCE VERIFIED', reason: 'Cross-referenced with court case number OS/2021/4523. Injunction confirmed.' },
];

export interface PartyIntelligenceData {
  party_name: string;
  total_disputes_involved: number;
  known_aliases: string[];
  risk_classification: 'HIGH_RISK_LITIGANT' | 'SERIAL_CLAIMANT' | 'STANDARD';
  active_jurisdictions: string[];
  historical_claims: Array<{
    property_survey: string;
    village: string;
    date: string;
    case_status: string;
    outcome: string;
  }>;
  network_connections: string[];
}

export const DEMO_PARTY_INTELLIGENCE: Record<string, PartyIntelligenceData> = {
  'Suresh Reddy': {
    party_name: 'Suresh Reddy',
    total_disputes_involved: 5,
    known_aliases: ['S. Reddy', 'Suresh R.'],
    risk_classification: 'SERIAL_CLAIMANT',
    active_jurisdictions: ['Bengaluru East', 'Bengaluru South'],
    historical_claims: [
      { property_survey: '145/2', village: 'Whitefield', date: '2021-06-22', case_status: 'Pending', outcome: 'Ongoing' },
      { property_survey: '142/1', village: 'Whitefield', date: '2023-04-10', case_status: 'Settled', outcome: 'Out of court settlement' },
      { property_survey: '89/3', village: 'Varthur', date: '2024-01-15', case_status: 'Dismissed', outcome: 'Claim rejected by court' },
      { property_survey: '55', village: 'Whitefield', date: '2025-08-01', case_status: 'Pending', outcome: 'Ongoing' },
      { property_survey: '112/A', village: 'Varthur', date: '2026-02-18', case_status: 'Pending', outcome: 'Ongoing' }
    ],
    network_connections: ['Venkatesh Gowda (Co-claimant)', 'Sri Sai Legal Associates (Filing Attorney)']
  }
};

// ──────────────────────────────────────────────────────
// CONFIDENCE SCORING ENGINE DATA
// ──────────────────────────────────────────────────────

export interface ConfidenceScores {
  overall: number;
  identity_match: number;
  source_trust: number;
  corroboration: number;
  severity: number;
}

export interface FalsePositiveIndicator {
  field: string;
  status: 'match' | 'mismatch' | 'partial' | 'unavailable';
  detail: string;
  implication: string;
}

export interface SourceCredibility {
  source_name: string;
  established_year: number;
  publication_type: string;
  legal_section: boolean;
  legal_recognition: string;
  ocr_confidence: number;
  language_original: string;
  translation_verified: boolean;
  physical_copy_verified: boolean;
  reliability_score: number;
}

export interface DisputeImpact {
  severity_tier: 'CRITICAL' | 'HIGH' | 'MODERATE' | 'LOW';
  what_this_means: string;
  financial_exposure: string;
  transaction_advice: string;
  typical_resolution: string;
  litigation_cost_range: string;
  similar_case_outcomes: {
    in_favor_owner: number;
    in_favor_claimant: number;
    settled: number;
  };
}

export interface OwnerVerification {
  registered_owner: string;
  name_in_dispute: string;
  relationship: string;
  analysis: string;
  recommendation: string;
}

export interface CorroborationData {
  level: 'SINGLE_SOURCE' | 'REPEATED' | 'CROSS_SOURCE' | 'COURT_LINKED' | 'GOVERNMENT_LINKED';
  source_count: number;
  sources: Array<{ name: string; date: string; type: string }>;
  court_verified: boolean;
  case_number: string | null;
  case_status: string | null;
  next_hearing: string | null;
  false_positive_probability: string;
}

export interface AreaIntelligence {
  area_name: string;
  district: string;
  total_disputes_detected: number;
  period: string;
  dispute_breakdown: Record<string, number>;
  area_risk_level: string;
  comparison_text: string;
  common_causes: string[];
}

// Per-property confidence scores
export const DEMO_CONFIDENCE_SCORES: Record<string, ConfidenceScores> = {
  'prop-1': { overall: 87, identity_match: 95, source_trust: 88, corroboration: 85, severity: 78 },
  'prop-2': { overall: 62, identity_match: 90, source_trust: 72, corroboration: 40, severity: 45 },
  'prop-3': { overall: 28, identity_match: 35, source_trust: 65, corroboration: 15, severity: 20 },
  'prop-4': { overall: 0, identity_match: 0, source_trust: 0, corroboration: 0, severity: 0 },
};

// Per-property false positive analysis
export const DEMO_FALSE_POSITIVE_INDICATORS: Record<string, FalsePositiveIndicator[]> = {
  'prop-1': [
    { field: 'Survey Number', status: 'match', detail: 'Exact match: 145/2 = 145/2', implication: 'Strong identifier match' },
    { field: 'Village', status: 'match', detail: 'Exact match: Whitefield', implication: 'Location confirmed' },
    { field: 'District', status: 'match', detail: 'Exact match: Bengaluru Urban', implication: 'Jurisdiction confirmed' },
    { field: 'Taluk', status: 'match', detail: 'Bengaluru East Taluk mentioned in notice', implication: 'Sub-district confirmed' },
    { field: 'Owner Name', status: 'mismatch', detail: 'Notice mentions "Suresh Reddy" — your registered owner is "Rajesh Kumar"', implication: 'EXPECTED: This is a third-party claim AGAINST the registered owner. The mismatch is the dispute itself.' },
    { field: 'Court Case', status: 'match', detail: 'Case OS/2021/4523 cross-referenced across 2 sources', implication: 'Independently corroborated' },
  ],
  'prop-2': [
    { field: 'Survey Number', status: 'match', detail: 'Exact match: 88/1 = 88/1', implication: 'Strong identifier match' },
    { field: 'Village', status: 'match', detail: 'Exact match: Bodakdev', implication: 'Location confirmed' },
    { field: 'District', status: 'match', detail: 'Exact match: Ahmedabad', implication: 'Jurisdiction confirmed' },
    { field: 'Owner Name', status: 'partial', detail: '"Mehta Enterprises" is referenced as adjoining owner, not primary party', implication: 'May affect property indirectly' },
    { field: 'Court Case', status: 'unavailable', detail: 'No court case number found in this notice', implication: 'Cannot verify through court records' },
  ],
  'prop-3': [
    { field: 'Survey Number', status: 'partial', detail: 'Partial match: Notice mentions "Sector 12" area but survey 221/A not explicitly stated', implication: 'Weak identifier — could be a different property in the same sector' },
    { field: 'Village', status: 'partial', detail: '"Dwarka" is a large area — notice doesn\'t specify exact sub-locality', implication: 'Multiple properties could match' },
    { field: 'District', status: 'match', detail: 'South West Delhi matches', implication: 'Jurisdiction match only' },
    { field: 'Owner Name', status: 'unavailable', detail: 'Owner name not mentioned in the encroachment notice', implication: 'Cannot verify party connection' },
    { field: 'Court Case', status: 'unavailable', detail: 'No court reference', implication: 'Cannot independently verify' },
  ],
};

// Source credibility data
export const DEMO_SOURCE_CREDIBILITY: Record<string, SourceCredibility> = {
  'Vijaya Karnataka': {
    source_name: 'Vijaya Karnataka', established_year: 1948, publication_type: 'Major Regional Daily',
    legal_section: true, legal_recognition: 'Recognized under CPC Order V Rule 20 for public notices',
    ocr_confidence: 94, language_original: 'Kannada', translation_verified: true,
    physical_copy_verified: true, reliability_score: 88,
  },
  'Deccan Herald': {
    source_name: 'Deccan Herald', established_year: 1948, publication_type: 'Major English Daily',
    legal_section: true, legal_recognition: 'Recognized under CPC Order V Rule 20 for public notices',
    ocr_confidence: 97, language_original: 'English', translation_verified: true,
    physical_copy_verified: true, reliability_score: 92,
  },
  'Gujarat Samachar': {
    source_name: 'Gujarat Samachar', established_year: 1932, publication_type: 'Major Regional Daily',
    legal_section: true, legal_recognition: 'Recognized under CPC Order V Rule 20 for public notices',
    ocr_confidence: 78, language_original: 'Gujarati', translation_verified: false,
    physical_copy_verified: false, reliability_score: 72,
  },
  'Hindustan Times': {
    source_name: 'Hindustan Times', established_year: 1924, publication_type: 'Major National Daily',
    legal_section: false, legal_recognition: 'Nationally recognized publication',
    ocr_confidence: 88, language_original: 'English', translation_verified: true,
    physical_copy_verified: false, reliability_score: 65,
  },
};

// Dispute impact assessments
export const DEMO_DISPUTE_IMPACTS: Record<string, DisputeImpact> = {
  'disp-1': {
    severity_tier: 'HIGH',
    what_this_means: 'A third party is publicly claiming absolute ownership of this property. If upheld, the current registered owner could lose title.',
    financial_exposure: 'Full property value at risk. Any ongoing or planned transactions may be challenged.',
    transaction_advice: 'DO NOT proceed with purchase, sale, or mortgage without comprehensive legal due diligence and court case review.',
    typical_resolution: '3–7 years in Indian civil courts for ownership disputes',
    litigation_cost_range: '₹2–8 lakhs depending on property value and court jurisdiction',
    similar_case_outcomes: { in_favor_owner: 62, in_favor_claimant: 24, settled: 14 },
  },
  'disp-2': {
    severity_tier: 'CRITICAL',
    what_this_means: 'A court has issued an interim injunction RESTRAINING any transfer, sale, or encumbrance of this property. This is a legally binding order.',
    financial_exposure: 'Property is legally frozen. Any transaction completed during injunction period is void and reversible.',
    transaction_advice: 'ABSOLUTELY DO NOT proceed with any financial transaction. Violating a court injunction carries contempt of court penalties.',
    typical_resolution: 'Injunction remains until final disposal of ownership suit — typically 2–5 additional years',
    litigation_cost_range: '₹3–10 lakhs including injunction modification applications',
    similar_case_outcomes: { in_favor_owner: 58, in_favor_claimant: 28, settled: 14 },
  },
  'disp-3': {
    severity_tier: 'MODERATE',
    what_this_means: 'A boundary demarcation dispute affects the edges of this property. The core ownership is not challenged, but the exact boundaries are contested.',
    financial_exposure: 'Partial — only the disputed boundary area is at risk, not the entire property.',
    transaction_advice: 'Transactions can proceed with caution. Ensure survey/demarcation is completed and boundary is settled before closing.',
    typical_resolution: '1–3 years. Many boundary disputes settle through mutual agreement or revenue department intervention.',
    litigation_cost_range: '₹50,000–3 lakhs depending on complexity',
    similar_case_outcomes: { in_favor_owner: 45, in_favor_claimant: 20, settled: 35 },
  },
  'disp-4': {
    severity_tier: 'LOW',
    what_this_means: 'A general notice regarding encroachment was issued for this sector. It may not directly impact your property, but requires vigilance.',
    financial_exposure: 'Low — no direct financial claim against your specific title.',
    transaction_advice: 'You can proceed with transactions, but ensure the physical boundaries of the property are secure and unaffected by recent demolitions.',
    typical_resolution: 'Usually resolved through physical verification or municipal clarification.',
    litigation_cost_range: 'Minimal, unless physical demolition is contested (₹20,000–50,000)',
    similar_case_outcomes: { in_favor_owner: 80, in_favor_claimant: 10, settled: 10 },
  },
  'disp-5': {
    severity_tier: 'MODERATE',
    what_this_means: 'A public notice was issued by a lawyer verifying the title of this property, likely for a potential buyer.',
    financial_exposure: 'No direct exposure, but indicates someone else is attempting to deal with the property.',
    transaction_advice: 'Contact the advocate immediately to file an objection and clarify your ownership.',
    typical_resolution: 'Resolved immediately upon contacting the publishing advocate.',
    litigation_cost_range: '₹5,000 for legal notice response',
    similar_case_outcomes: { in_favor_owner: 90, in_favor_claimant: 5, settled: 5 },
  },
  'disp-6': {
    severity_tier: 'HIGH',
    what_this_means: 'Family members are claiming ancestral rights to the property, challenging the current sole ownership.',
    financial_exposure: 'Risk of having to divide the property or pay off family members.',
    transaction_advice: 'Do not purchase without a registered family settlement deed or court decree.',
    typical_resolution: '3-8 years for partition suits',
    litigation_cost_range: '₹1-5 lakhs',
    similar_case_outcomes: { in_favor_owner: 30, in_favor_claimant: 40, settled: 30 },
  },
  'disp-7': {
    severity_tier: 'CRITICAL',
    what_this_means: 'The property has been legally attached by a bank/court due to unpaid debts.',
    financial_exposure: 'The property cannot be sold or transferred. It is subject to seizure.',
    transaction_advice: 'Zero transactions allowed. Property is encumbered by debt.',
    typical_resolution: 'Requires clearing the debt or fighting the attachment in DRT.',
    litigation_cost_range: 'High (DRT proceedings)',
    similar_case_outcomes: { in_favor_owner: 10, in_favor_claimant: 80, settled: 10 },
  },
  'disp-8': {
    severity_tier: 'CRITICAL',
    what_this_means: 'The bank has taken symbolic possession of the property under the SARFAESI Act to recover a bad loan.',
    financial_exposure: 'The owner has effectively lost possession rights. Property will go to auction.',
    transaction_advice: 'Do not engage. The bank is the de facto controller of the asset.',
    typical_resolution: '6-12 months until auction',
    litigation_cost_range: 'Requires High Court stay order',
    similar_case_outcomes: { in_favor_owner: 5, in_favor_claimant: 90, settled: 5 },
  },
  'disp-9': {
    severity_tier: 'HIGH',
    what_this_means: 'The government has notified this land for compulsory acquisition for a public project.',
    financial_exposure: 'Loss of land. Compensation will be provided based on government rates, which may be below market value.',
    transaction_advice: 'Verify exact acquisition boundaries. You can only transact the unacquired portion.',
    typical_resolution: 'Fixed government timeline',
    litigation_cost_range: 'Varies if challenging compensation amount',
    similar_case_outcomes: { in_favor_owner: 2, in_favor_claimant: 98, settled: 0 },
  },
  'disp-10': {
    severity_tier: 'CRITICAL',
    what_this_means: 'The property is scheduled to be auctioned by the bank to recover dues.',
    financial_exposure: 'Total loss of property imminent.',
    transaction_advice: 'If you are a buyer, you can participate in the auction. If you are the owner, you must pay dues before auction date.',
    typical_resolution: 'Auction completes in 30 days',
    litigation_cost_range: 'Requires urgent DRT stay',
    similar_case_outcomes: { in_favor_owner: 5, in_favor_claimant: 95, settled: 0 },
  },
};

// Owner verification cross-checks
export const DEMO_OWNER_VERIFICATION: Record<string, OwnerVerification> = {
  'prop-1': {
    registered_owner: 'Rajesh Kumar',
    name_in_dispute: 'Suresh Reddy (claimant)',
    relationship: 'Third-party adverse claim',
    analysis: 'Suresh Reddy is NOT the registered owner. He is making an adverse ownership claim. This pattern is typical of inheritance disputes or historical ownership challenges. The registered owner (Rajesh Kumar) is the defendant in case OS/2021/4523.',
    recommendation: 'Verify current RTC/Pahani to confirm Rajesh Kumar is still the registered owner. Check mutation history for any recent changes.',
  },
  'prop-2': {
    registered_owner: 'Mehta Enterprises',
    name_in_dispute: 'Patel Construction (adjoining owner)',
    relationship: 'Neighboring property boundary dispute',
    analysis: 'Patel Construction owns the adjoining property (Survey 88/2) and claims the boundary demarcation is incorrect. Mehta Enterprises is mentioned as the affected adjoining owner, not the primary disputant.',
    recommendation: 'Obtain a fresh survey/demarcation from the revenue department. Compare with original sale deed measurements.',
  },
  'prop-3': {
    registered_owner: 'Sunita Sharma',
    name_in_dispute: 'Not specified in notice',
    relationship: 'Unknown — owner not referenced',
    analysis: 'The encroachment notice does not name any specific party. It references "Dwarka Sector 12" area generally. Without a direct survey number match, this may not be related to your specific property.',
    recommendation: 'Visit the local revenue office to check if any encroachment complaint has been filed against Survey 221/A specifically.',
  },
};

// Corroboration data
export const DEMO_CORROBORATION: Record<string, CorroborationData> = {
  'prop-1': {
    level: 'COURT_LINKED',
    source_count: 3,
    sources: [
      { name: 'Vijaya Karnataka', date: '2026-08-25', type: 'Newspaper public notice' },
      { name: 'Deccan Herald', date: '2026-08-20', type: 'Newspaper legal notices' },
      { name: 'Court Record', date: '2021-06-22', type: 'eCourts case filing' },
    ],
    court_verified: true,
    case_number: 'OS/2021/4523',
    case_status: 'PENDING — Hearing Stage',
    next_hearing: '2026-09-15',
    false_positive_probability: '< 3%',
  },
  'prop-2': {
    level: 'SINGLE_SOURCE',
    source_count: 1,
    sources: [
      { name: 'Gujarat Samachar', date: '2026-07-28', type: 'Newspaper public notice' },
    ],
    court_verified: false,
    case_number: null,
    case_status: null,
    next_hearing: null,
    false_positive_probability: '15–25%',
  },
  'prop-3': {
    level: 'SINGLE_SOURCE',
    source_count: 1,
    sources: [
      { name: 'Hindustan Times', date: '2026-06-15', type: 'News article' },
    ],
    court_verified: false,
    case_number: null,
    case_status: null,
    next_hearing: null,
    false_positive_probability: '40–60%',
  },
};

// Area intelligence
export const DEMO_AREA_INTELLIGENCE: Record<string, AreaIntelligence> = {
  'prop-1': {
    area_name: 'Whitefield', district: 'Bengaluru Urban',
    total_disputes_detected: 47, period: '2024–2026',
    dispute_breakdown: { 'Ownership disputes': 18, 'Boundary disputes': 12, 'Court injunctions': 8, 'Encroachments': 9 },
    area_risk_level: 'MODERATE',
    comparison_text: 'Whitefield has 2.3× more disputes than the average for Bengaluru Urban district',
    common_causes: ['Rapid urbanization', 'Agricultural-to-residential conversion', 'Multiple inheritance claims on ancestral land'],
  },
  'prop-2': {
    area_name: 'Bodakdev', district: 'Ahmedabad',
    total_disputes_detected: 23, period: '2024–2026',
    dispute_breakdown: { 'Boundary disputes': 10, 'Ownership disputes': 7, 'Encroachments': 4, 'Court injunctions': 2 },
    area_risk_level: 'LOW-MODERATE',
    comparison_text: 'Bodakdev has 1.1× the average dispute density for Ahmedabad district',
    common_causes: ['Commercial development expansion', 'SG Highway corridor land value appreciation'],
  },
  'prop-3': {
    area_name: 'Dwarka Sector 12', district: 'South West Delhi',
    total_disputes_detected: 31, period: '2024–2026',
    dispute_breakdown: { 'Encroachments': 14, 'Ownership disputes': 9, 'Boundary disputes': 5, 'Court injunctions': 3 },
    area_risk_level: 'MODERATE',
    comparison_text: 'Dwarka has 1.7× the average dispute density for South West Delhi',
    common_causes: ['DDA land allocation disputes', 'Unauthorized construction', 'Farmland-to-urban conversion'],
  },
};

export const DISPUTE_TYPES = [
  'Title dispute', 'Ownership dispute', 'Boundary dispute', 'Encroachment',
  'Inheritance/Partition dispute', 'Court injunction', 'Mortgage/Attachment',
  'SARFAESI-related notice', 'Acquisition', 'Auction', 'Possession dispute',
  'Other property-related legal notice'
];

export const INDIAN_STATES = ['Karnataka', 'Gujarat', 'New Delhi'];
export const DISTRICTS: Record<string, string[]> = {
  'Karnataka': ['Bengaluru Urban', 'Bengaluru Rural', 'Mysuru', 'Mangaluru', 'Hubli-Dharwad'],
  'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Gandhinagar'],
  'New Delhi': ['Central Delhi', 'South Delhi', 'South West Delhi', 'North Delhi', 'East Delhi'],
};

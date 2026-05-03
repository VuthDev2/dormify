export type DashboardTier = 'normal' | 'pro' | 'premium';

export interface DashboardResident {
  id: string;
  name: string;
  email: string;
  room: string;
  floor: string;
  phone: string;
  status: 'Active' | 'Pending' | 'Moving-Out';
  joinDate: string;
  leaseEnd: string;
  paymentStatus: 'Paid' | 'Pending' | 'Overdue';
  university: string;
  course: string;
  nationality: string;
}

export interface NormalPaymentInvoice {
  id: string;
  name: string;
  room: string;
  amount: string;
  status: 'Paid' | 'Pending' | 'Overdue';
  date: string;
  method: string;
  email: string;
  avatar: string;
}

export interface HubInvoice {
  id: string;
  resident: string;
  amount: string;
  issued: string;
  due: string;
  status: 'Paid' | 'Pending' | 'Overdue' | 'Draft' | 'Sent';
  method: string;
}

export type BillingStatus = 'Completed' | 'Pending' | 'Over Duedate';
export type BillingMethod = 'Cash' | 'ABA' | 'Aclelda' | '-';

export interface ResidentBilling {
  id: string;
  resident: string;
  room: string;
  roomFee: { status: BillingStatus; amount: string; method: BillingMethod; date: string };
  mealFee: { status: BillingStatus; amount: string; method: BillingMethod; date: string };
}

export const DASHBOARD_RESIDENTS: DashboardResident[] = [
  {
    id: 'RES-8820',
    name: 'Sarah Johnson',
    email: 'sarah.j@university.edu',
    room: 'A-402',
    floor: '4',
    phone: '+44 7700 900123',
    status: 'Active',
    joinDate: 'Sept 2024',
    leaseEnd: 'Aug 2026',
    paymentStatus: 'Paid',
    university: 'NYU',
    course: 'MSc Data Science & AI',
    nationality: 'American',
  },
  {
    id: 'RES-8821',
    name: 'Michael Chen',
    email: 'mchen@imperial.ac.uk',
    room: 'B-102',
    floor: '1',
    phone: '+44 7700 900124',
    status: 'Active',
    joinDate: 'Sept 2024',
    leaseEnd: 'Aug 2025',
    paymentStatus: 'Paid',
    university: 'Columbia University',
    course: 'BEng Robotic Systems',
    nationality: 'Singaporean',
  },
  {
    id: 'RES-8822',
    name: 'Emma Wilson',
    email: 'ewilson@lse.ac.uk',
    room: 'C-305',
    floor: '3',
    phone: '+44 7700 900125',
    status: 'Pending',
    joinDate: 'Oct 2024',
    leaseEnd: 'Sept 2026',
    paymentStatus: 'Pending',
    university: 'Princeton',
    course: 'BSc International Relations',
    nationality: 'Canadian',
  },
  {
    id: 'RES-8823',
    name: 'James Porter',
    email: 'jporter@kcl.ac.uk',
    room: 'D-201',
    floor: '2',
    phone: '+44 7700 900126',
    status: 'Active',
    joinDate: 'Sept 2023',
    leaseEnd: 'Aug 2026',
    paymentStatus: 'Paid',
    university: 'Harvard',
    course: 'LLB Law / Global Ethics',
    nationality: 'American',
  },
  {
    id: 'RES-8824',
    name: 'Olivia Martinez',
    email: 'omartinez@arts.ac.uk',
    room: 'A-103',
    floor: '1',
    phone: '+44 7700 900127',
    status: 'Active',
    joinDate: 'Jan 2024',
    leaseEnd: 'Dec 2025',
    paymentStatus: 'Paid',
    university: 'Parsons',
    course: 'BA Fine Art / Digital Media',
    nationality: 'Spanish',
  },
  {
    id: 'RES-8825',
    name: 'Alexander Vogt',
    email: 'avogt@ucl.ac.uk',
    room: 'B-405',
    floor: '4',
    phone: '+44 7700 900128',
    status: 'Moving-Out',
    joinDate: 'Sept 2022',
    leaseEnd: 'Jun 2026',
    paymentStatus: 'Paid',
    university: 'NYU',
    course: 'PhD Quantum Computing',
    nationality: 'German',
  },
  {
    id: 'RES-8826',
    name: 'Yuki Tanaka',
    email: 'y.tanaka@soas.ac.uk',
    room: 'C-202',
    floor: '2',
    phone: '+44 7700 900129',
    status: 'Active',
    joinDate: 'Sept 2024',
    leaseEnd: 'Aug 2027',
    paymentStatus: 'Overdue',
    university: 'Stanford',
    course: 'MA East Asian Studies',
    nationality: 'Japanese',
  },
  {
    id: 'RES-8827',
    name: 'Amara Diop',
    email: 'adiop@qmul.ac.uk',
    room: 'D-501',
    floor: '5',
    phone: '+44 7700 900130',
    status: 'Pending',
    joinDate: 'Oct 2024',
    leaseEnd: 'Sept 2025',
    paymentStatus: 'Pending',
    university: 'Queen Mary University',
    course: 'MSc Global Public Health',
    nationality: 'Senegalese',
  },
];

export const NORMAL_PAYMENT_INVOICES: NormalPaymentInvoice[] = [
  {
    id: 'INV-2001',
    name: 'Sokha Chann',
    room: 'A-204',
    amount: '$325.00',
    status: 'Paid',
    date: 'Apr 20, 2024',
    method: 'ABA Transfer',
    email: 'sokha.c@example.com',
    avatar: 'Sokha',
  },
  {
    id: 'INV-2002',
    name: 'Lina Phan',
    room: 'B-105',
    amount: '$325.00',
    status: 'Pending',
    date: 'Apr 24, 2024',
    method: 'Cash',
    email: 'lina.p@example.com',
    avatar: 'Lina',
  },
  {
    id: 'INV-2003',
    name: 'Dara Mean',
    room: 'A-311',
    amount: '$325.00',
    status: 'Overdue',
    date: 'Apr 15, 2024',
    method: '-',
    email: 'dara.m@example.com',
    avatar: 'Dara',
  },
  {
    id: 'INV-2004',
    name: 'Mey Vanna',
    room: 'C-118',
    amount: '$305.00',
    status: 'Paid',
    date: 'Apr 18, 2024',
    method: 'Credit Card',
    email: 'mey.v@example.com',
    avatar: 'Mey',
  },
  {
    id: 'INV-2005',
    name: 'Rith Srey',
    room: 'B-210',
    amount: '$325.00',
    status: 'Pending',
    date: 'Apr 25, 2024',
    method: 'ABA Transfer',
    email: 'rith.s@example.com',
    avatar: 'Rith',
  },
];

export const HUB_INVOICES: HubInvoice[] = [
  { id: 'INV-2026-8820', resident: 'Sarah Johnson', amount: '1,240.00', issued: 'Mar 25', due: 'Apr 01', status: 'Paid', method: 'Bank Transfer' },
  { id: 'INV-2026-8821', resident: 'Michael Chen', amount: '850.00', issued: 'Mar 25', due: 'Apr 01', status: 'Paid', method: 'Cash' },
  { id: 'INV-2026-8822', resident: 'Emma Wilson', amount: '1,100.00', issued: 'Mar 25', due: 'Apr 01', status: 'Pending', method: 'Transfer In-Flight' },
  { id: 'INV-2026-8823', resident: 'James Porter', amount: '1,240.00', issued: 'Mar 20', due: 'Mar 31', status: 'Overdue', method: '-' },
  { id: 'INV-2026-8824', resident: 'Lisa Anderson', amount: '950.00', issued: 'Mar 28', due: 'Apr 05', status: 'Draft', method: '-' },
];

export const RESIDENT_BILLING_RECORDS: ResidentBilling[] = [
  {
    id: 'RB-101',
    resident: 'Sarah Johnson',
    room: 'A-402',
    roomFee: { status: 'Completed', amount: '1,200.00', method: 'ABA', date: '05/04' },
    mealFee: { status: 'Pending', amount: '450.00', method: '-', date: '-' },
  },
  {
    id: 'RB-102',
    resident: 'Michael Chen',
    room: 'B-105',
    roomFee: { status: 'Completed', amount: '1,150.00', method: 'Cash', date: '08/04' },
    mealFee: { status: 'Completed', amount: '450.00', method: 'Cash', date: '08/04' },
  },
  {
    id: 'RB-103',
    resident: 'Emma Wilson',
    room: 'C-210',
    roomFee: { status: 'Over Duedate', amount: '1,200.00', method: '-', date: '-' },
    mealFee: { status: 'Over Duedate', amount: '450.00', method: '-', date: '-' },
  },
  {
    id: 'RB-104',
    resident: 'James Porter',
    room: 'A-202',
    roomFee: { status: 'Completed', amount: '1,200.00', method: 'Aclelda', date: '02/04' },
    mealFee: { status: 'Over Duedate', amount: '450.00', method: '-', date: '-' },
  },
  {
    id: 'RB-105',
    resident: 'Lisa Anderson',
    room: 'B-304',
    roomFee: { status: 'Pending', amount: '1,150.00', method: '-', date: '-' },
    mealFee: { status: 'Completed', amount: '450.00', method: 'ABA', date: '09/04' },
  },
];

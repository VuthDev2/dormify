import { Home, Utensils, Waves, Wrench, Building2, CreditCard, TrendingUp, Zap, Heart, Key, Users } from 'lucide-react';
import { ReactNode } from 'react';

export const STATS = [
  { label: "Active Residents", value: "250K+" },
  { label: "Partner Universities", value: "120+" },
  { label: "Daily Meals Served", value: "85K+" },
  { label: "System Uptime", value: "99.9%" },
];

export const SERVICES = [
  {
    id: '01',
    title: 'Residents Housing',
    desc: 'Secure room allocation, digital contracts, and key management.',
    icon: Home,
    color: 'from-blue-500/20 to-blue-500/0',
    iconBg: 'bg-blue-50 dark:bg-blue-950',
    iconColor: 'text-blue-600 dark:text-blue-400'
  },
  {
    id: '02',
    title: 'Dining Services',
    desc: 'Meal plan management, inventory tracking, and resident nutrition.',
    icon: Utensils,
    color: 'from-orange-500/20 to-orange-500/0',
    iconBg: 'bg-orange-50 dark:bg-orange-950',
    iconColor: 'text-orange-600 dark:text-orange-400'
  },
  {
    id: '03',
    title: 'Laundry Systems',
    desc: 'Live machine status, maintenance alerts, and automated booking.',
    icon: Waves,
    color: 'from-cyan-500/20 to-cyan-500/0',
    iconBg: 'bg-cyan-50 dark:bg-cyan-950',
    iconColor: 'text-cyan-600 dark:text-cyan-400'
  },
  {
    id: '04',
    title: 'Facility Maintenance',
    desc: 'Asset tracking, ticket priority, and professional team routing.',
    icon: Wrench,
    color: 'from-indigo-500/20 to-indigo-500/0',
    iconBg: 'bg-indigo-50 dark:bg-indigo-950',
    iconColor: 'text-indigo-600 dark:text-indigo-400'
  },
];

export const INSTITUTIONAL_FEATURES = [
  { 
    title: "Smart Asset Tracking", 
    desc: "Monitor infrastructure health and facility status across your entire portfolio in real-time.", 
    icon: Building2 
  },
  { 
    title: "Advanced Revenue Ops", 
    desc: "Automated billing cycles, arrears management, and predictive financial forecasting.", 
    icon: CreditCard 
  },
  { 
    title: "Portfolio Analytics", 
    desc: "Deep-dive insights into occupancy trends, resident satisfaction, and operational ROI.", 
    icon: TrendingUp 
  },
];

export const DINING_FEATURES = [
  { 
    icon: Zap, 
    title: "Predictive Supply", 
    desc: "AI-driven demand forecasting that reduces waste by 30%." 
  },
  { 
    icon: CreditCard, 
    title: "Digital Wallet", 
    desc: "Contactless payments integrated with student IDs." 
  },
  { 
    icon: Heart, 
    title: "Health First", 
    desc: "Real-time allergen tracking for a safer environment." 
  }
];

export const RESIDENT_FEATURES = [
  { 
    title: "Digital Access Control", 
    desc: "Secure room and building entry using encrypted NFC or QR technology on any smartphone.", 
    icon: Key 
  },
  { 
    title: "Smart Service Requests", 
    desc: "Instant maintenance ticketing with photo uploads and real-time status notifications.", 
    icon: Wrench 
  },
  { 
    title: "Social Hub & Events", 
    desc: "Integrated campus community feed to keep residents informed and engaged with local events.", 
    icon: Users 
  },
];

export const PRICING_PLANS = [
  { 
    name: "Normal", 
    price: "0", 
    desc: "Essential for growing dormitory.",
    features: ["1 dorm management", "Up to 30 rooms" ,"Up to 100 residents", "Basic analytics", "Basic Maintenance", "Basic management"],
    cta: "Start Free",
    highlighted: false
  },
  { 
    name: "Pro", 
    price: "50", 
    desc: "High-Quality for whole dorms management.",
    features: ["Up to 5 dorms management", " 300 limit residents", "IoT Laundry Sync", "Advanced meals management ", "Priority Support", "Revenue Ops Suite"],
    cta: "Connect",
    highlighted: true 
  },
  { 
    name: "Premium", 
    price: "80", 
    desc: "Advanced mode with premium features.",
    features: ["Unlimited dorms management", "Unlimited rooms and residents","IoT Laundry Sync", "Meals nutrition tracking","Dedicated Data Analyst", "Priority support", "Advanced finance system", "Audit-Ready Logs"],
    cta: "Connect",
    highlighted: false 
  }
];

export const FAQ_ITEMS = [
  { 
    q: "How long does implementation take?", 
    a: "Most campuses go live in 4-6 weeks with our guided setup." 
  },
  { 
    q: "Is resident data secure?", 
    a: "SOC2 Type II compliant with AES-256 encryption. FERPA/HIPAA ready." 
  },
  { 
    q: "Can we integrate with our SIS?", 
    a: "Yes, we support Banner, PeopleSoft, and Workday via robust APIs." 
  }
];

export const FOOTER_LINKS = [
  {
    title: "Ecosystem",
    links: [
      { label: "Housing", href: "#" },
      { label: "Dining", href: "#" },
      { label: "Laundry", href: "#" },
      { label: "Maintenance", href: "#" },
    ]
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "#" },
      { label: "API Reference", href: "#" },
      { label: "Community", href: "#" },
      { label: "Support", href: "#" },
    ]
  },
  {
    title: "Corporate",
    links: [
      { label: "About Us", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Press", href: "#" },
    ]
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Cookie Policy", href: "#" },
      { label: "Compliance", href: "#" },
    ]
  }
];

export const ANIMATION_VARIANTS = {
  fadeInUp: {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8 } 
    }
  },
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }
} as const;

import { Certificate, CertificateCategory } from "@/types";

/**
 * Categories are derived from the certificates actually held — add a new one
 * here and the sidebar, mobile chips, and counts all pick it up automatically.
 */
export const CERTIFICATE_CATEGORIES: CertificateCategory[] = [
  { id: "networking", label: "Networking" },
  { id: "finance", label: "Finance & Banking" },
  { id: "business", label: "Business" },
  { id: "language", label: "Language" },
  { id: "health", label: "Health & Wellness" },
];

/**
 * Real certificates, transcribed from the original files in /public/certificates.
 * Every field below is taken from the certificate itself — titles, issuers,
 * instructors, dates, and credential IDs are not inferred or filled in.
 * `date` is left out entirely when the certificate states no date, and uses
 * "YYYY-MM" when it states only a month.
 */
export const CERTIFICATES: Certificate[] = [
  {
    id: "ccna-enterprise-networking-security-automation",
    title: "CCNA: Enterprise Networking, Security, and Automation",
    organization: "Cisco Networking Academy",
    provider: "CLS Learning Solutions",
    instructor: "Khalid Marzouk",
    date: "2025-11-04",
    category: "networking",
    file: "/certificates/ccna-enterprise-networking-security-automation.pdf",
    fileType: "pdf",
    description:
      "Awarded for successfully completing CCNA: Enterprise Networking, Security, and Automation, offered by CLS Learning Solutions through the Cisco Networking Academy program.",
  },
  {
    id: "ccna-switching-routing-wireless-essentials",
    title: "CCNA: Switching, Routing, and Wireless Essentials",
    organization: "Cisco Networking Academy",
    provider: "CLS Learning Solutions",
    instructor: "Khalid Marzouk",
    date: "2025-09-15",
    category: "networking",
    file: "/certificates/ccna-switching-routing-wireless-essentials.pdf",
    fileType: "pdf",
    description:
      "Awarded for successfully completing CCNA: Switching, Routing, and Wireless Essentials, offered by CLS Learning Solutions through the Cisco Networking Academy program.",
  },
  {
    id: "ccna-introduction-to-networks",
    title: "CCNA: Introduction to Networks",
    organization: "Cisco Networking Academy",
    provider: "CLS Learning Solutions",
    instructor: "Khalid Marzouk",
    date: "2025-08-17",
    category: "networking",
    file: "/certificates/ccna-introduction-to-networks.pdf",
    fileType: "pdf",
    description:
      "Awarded for successfully completing CCNA: Introduction to Networks, offered by CLS Learning Solutions through the Cisco Networking Academy program.",
  },
  {
    id: "almentor-financial-statement-credit-analysis",
    title: "Financial Statement and Credit Analysis",
    titleArabic: "تحليل القوائم المالية والتحليل الائتماني",
    organization: "almentor",
    partner: "National Bank of Egypt",
    instructor: "Essam Ghallab",
    date: "2026-08-16",
    category: "finance",
    file: "/certificates/almentor-financial-statement-credit-analysis.jpg",
    fileType: "image",
    description:
      "Certificate of completion for the course Financial Statement and Credit Analysis, instructed by Essam Ghallab and authorized by almentor. The certificate carries the National Bank of Egypt logo.",
    credentialId: "rq3irwerk",
  },
  {
    id: "almentor-financial-inclusion",
    title: "Financial Inclusion",
    titleArabic: "الشمول المالي",
    organization: "almentor",
    partner: "National Bank of Egypt",
    instructor: "Ahmad El Ghazaly",
    date: "2026-08-14",
    category: "finance",
    file: "/certificates/almentor-financial-inclusion.jpg",
    fileType: "image",
    description:
      "Certificate of completion for the course Financial Inclusion, instructed by Ahmad El Ghazaly and authorized by almentor. The certificate carries the National Bank of Egypt logo.",
    credentialId: "52r2cr6drl",
  },
  {
    id: "almentor-healthy-habits-during-fasting",
    title: "Healthy Habits During Fasting",
    titleArabic: "العادات الصحية في الصيام",
    organization: "almentor",
    partner: "National Bank of Egypt",
    instructor: "Howaida Abu Haif",
    date: "2026-08-14",
    category: "health",
    file: "/certificates/almentor-healthy-habits-during-fasting.jpg",
    fileType: "image",
    description:
      "Certificate of completion for the course Healthy Habits During Fasting, instructed by Howaida Abu Haif and authorized by almentor. The certificate carries the National Bank of Egypt logo.",
    credentialId: "6w74cr35r2",
  },
  {
    id: "cib-summer-internship-2025",
    title: 'Certificate of Attendance — CIB Summer Program "The Green Leap"',
    organization: "Commercial International Bank (CIB)",
    instructor: "Mohamed El-Senary, Chief Human Resources Officer",
    date: "2025-07",
    category: "business",
    file: "/certificates/cib-summer-internship-2025.pdf",
    fileType: "pdf",
    description:
      'Presented in acknowledgement of participation, completion and understanding of the principles, approaches and best practices of the CIB Summer Program — "The Green Leap", as an integral part of the CIB Summer internship program.',
  },
  {
    id: "auc-english-for-effective-communication-a2d",
    title: "Certificate of Achievement in English for Effective Communication (A2D)",
    organization: "The American University in Cairo",
    provider: "School of Continuing Education",
    category: "language",
    file: "/certificates/auc-english-for-effective-communication-a2d.png",
    fileType: "image",
    description:
      "Certificate of Achievement at Beginner level issued by the AUC School of Continuing Education, an accredited IACET provider. The certificate itself states no date.",
  },
];

import { DocumentEntry } from "@/types";

/**
 * Text content is grounded only in facts already present elsewhere in the app
 * (data/cv.ts, data/projects.ts, AboutWindow) — nothing here invents a new
 * credential, employer, or date.
 */
export const DOCUMENTS: DocumentEntry[] = [
  {
    id: "resume",
    name: "Resume.txt",
    kind: "Text Document — opens CV.txt",
    content: "",
  },
  {
    id: "cover-letter",
    name: "Cover_Letter.txt",
    kind: "Text Document",
    content: `To whoever's hiring,

I'm Mahmoud Maged Ragab, a Business Information Systems (BIS) student at
AASTMT (expected 2027) building toward a career in full-stack software
engineering, based in Cairo, Egypt.

I build responsive web applications with React.js and Next.js, with a strong
focus on performance, usability, and clean UI — this portfolio itself is one
example, built as a fully interactive Windows XP desktop simulation rather
than a static page.

Alongside freelance frontend work I picked up backend exposure through a
PHP/Laravel internship at Pan Arab Media, and I currently work part-time at
Beeviro on their web-builder platform, automation workflows, and AI chatbot
tooling. Internships at Commercial International Bank (CIB) and in Credit
Administration at the National Bank of Egypt gave me direct exposure to
banking and business operations.

I'd welcome the chance to bring that mix of frontend engineering and business
understanding to your team.

Best regards,
Mahmoud Maged Ragab`,
  },
  {
    id: "project-notes",
    name: "Project_Notes.txt",
    kind: "Text Document",
    content: `PROJECT NOTES
=============

Windows XP Portfolio
  This site. Next.js + TypeScript + Tailwind CSS + Framer Motion + Zustand.
  Draggable/resizable-viewport windows, taskbar, Start Menu, desktop icons,
  context menus, a full shutdown/restart/login flow. Fully responsive down
  to phone-sized viewports.

Social Hub
  Facebook-inspired social platform — profiles, posts, likes/comments,
  real-time messaging, a personalized feed. Built with React, TypeScript,
  and Tailwind CSS.

Fresh Cart
  Amazon-inspired e-commerce app — product catalog with search/filtering,
  cart management, authentication, reviews, order tracking. Built with
  Next.js, TypeScript, and Tailwind CSS, deployed on Vercel.

Open items / ideas
  - Keep iterating on this portfolio's "OS completeness" — more accessories,
    more polish, more small authentic details.
  - The Certificates section now lists the real certificates end to end (open
    it from the desktop or Start Menu) - keep it updated as new ones land.`,
  },
  {
    id: "dev-journal",
    name: "Development_Journal.txt",
    kind: "Text Document",
    content: `DEVELOPMENT JOURNAL
===================

Studying Business Information Systems at AASTMT while building frontend
skills on the side turned out to be a good combination — the BIS coursework
keeps me thinking about systems and workflows, which carries over well into
how I structure frontend apps.

Freelancing since 2025 taught me a lot about owning a project end to end:
not just writing components, but making real calls about performance and
UX. The PHP/Laravel internship at Pan Arab Media filled in the other half of
the picture — working inside an existing production codebase, with its MVC
structure and routing, makes you a better frontend developer too.

The part-time work at Beeviro is a different kind of learning: supporting a
web-builder platform, keeping automation workflows running, and using AI
chatbot tooling to cut down manual support work.

The bank internships were another lesson entirely — less code, more process:
CIB on analyzing workflows and operations, and Credit Administration at NBE
on how credit actually moves through a bank. That perspective is easy to
forget as a developer, but it matters for anything FinTech-shaped.

This portfolio itself has been its own small case study in scope control —
it would be easy to keep adding "just one more app," which is exactly what
happened.`,
  },
  {
    id: "learning-roadmap",
    name: "Learning_Roadmap.txt",
    kind: "Text Document",
    content: `LEARNING ROADMAP
================

Currently comfortable with:
  JavaScript (ES6+), React.js, Next.js, HTML5/CSS3, responsive web design,
  PHP/Laravel basics, SQL, Git/GitHub.

Actively deepening:
  - Backend architecture and system design (building on the Pan Arab Media
    Laravel internship).
  - Automated testing — writing more tests instead of manually clicking
    through every change.
  - Accessibility — treating it as a first-class requirement, not a
    follow-up pass.

On the radar:
  - Docker and CI/CD pipelines end-to-end.
  - Going deeper on animation/interaction design (this portfolio's Framer
    Motion work is a step in that direction).`,
  },
  {
    id: "certifications",
    name: "Certifications.txt",
    kind: "Text Document",
    content: `CERTIFICATIONS
==============

- Frontend Development Diploma — React.js, Next.js & JavaScript
  (Route Learning Academy, 2026)
- Full Stack Track — Google Developer Group On Campus, AASTMT Cairo
  (2025–2026)
- Cybersecurity Track — Google Developer Group On Campus, AASTMT Cairo
  (2025–2026)
- English Diploma — The American University in Cairo (AUC), 2024
- CCNA: Introduction to Networks
  (Cisco Networking Academy via CLS Learning Solutions, 17 Aug 2025)
- CCNA: Switching, Routing, and Wireless Essentials
  (Cisco Networking Academy via CLS Learning Solutions, 15 Sep 2025)
- CCNA: Enterprise Networking, Security, and Automation
  (Cisco Networking Academy via CLS Learning Solutions, 04 Nov 2025)
- Financial Statement and Credit Analysis
  (almentor, with National Bank of Egypt, 16 Aug 2026)
- Financial Inclusion
  (almentor, with National Bank of Egypt, 14 Aug 2026)
- Healthy Habits During Fasting
  (almentor, with National Bank of Egypt, 14 Aug 2026)
- Certificate of Attendance — CIB Summer Program "The Green Leap"
  (Commercial International Bank, July 2025)
- Certificate of Achievement in English for Effective Communication (A2D)
  (AUC School of Continuing Education)

Open the Certificates app to view any of these as the original document.
See CV.txt for the full professional summary.`,
  },
  {
    id: "achievements",
    name: "Achievements.txt",
    kind: "Text Document",
    content: `ACHIEVEMENTS
============

- Shipped 3 real projects: this Windows XP portfolio, Social Hub, and
  Fresh Cart.
- Completed the Front-End Diploma (React.js, Next.js, JavaScript).
- Completed the full 3-part CCNA program (Introduction to Networks;
  Switching, Routing & Wireless Essentials; Enterprise Networking,
  Security & Automation).
- Completed an English Diploma at The American University in Cairo.
- Gained hands-on backend experience through the PHP/Laravel internship at
  Pan Arab Media, on top of frontend freelance work.
- Work part-time at Beeviro on their web-builder platform, automation
  workflows, and AI chatbot tooling.
- Interned at Commercial International Bank (CIB) on business operations
  analysis, and in Credit Administration at the National Bank of Egypt.`,
  },
];

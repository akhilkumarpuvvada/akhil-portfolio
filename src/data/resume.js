export const CONTACT = {
  name: 'Akhil Puvvada',
  email: 'pnvakhil13@gmail.com',
  phone: '+49 1629122524',
  location: 'Chemnitz, Deutschland',
  linkedin: 'https://linkedin.com/in/akhilpuvvada',
  github: 'https://github.com/akhilkumarpuvvada',
  website: 'https://akhilpuvvada.info',
}

export const content = {
  en: {
    nav: {
      about: 'About',
      experience: 'Experience',
      skills: 'Skills',
      education: 'Education',
      contact: 'Contact',
    },
    hero: {
      role: 'Full-Stack Developer',
      tagline: 'FinTech & AI Systems',
      summary:
        'Full-stack developer with 4+ years building FinTech and AI systems at a German SaaS company — responsible for core platform development for 15+ enterprise clients and for LLM automations that eliminated 200+ hours of manual work every month. Core stack: React, Node.js, TypeScript, PostgreSQL, Redis and LangGraph.',
      status: 'Permanent residence permit — unrestricted work authorization in Germany. Available immediately.',
      ctaPrimary: 'Get in touch',
      ctaSecondary: 'View work',
      stats: [
        { value: '4+', label: 'Years of experience' },
        { value: '15+', label: 'Enterprise clients' },
        { value: '200+', label: 'Hours/month automated' },
      ],
    },
    experience: {
      title: 'Experience',
      subtitle: 'Where I have shipped production software',
      items: [
        {
          role: 'Independent Projects',
          company: 'Self-employed',
          location: 'Chemnitz, Deutschland',
          period: '09/2025 – Present',
          link: 'https://scoreboxcricket.blog',
          linkLabel: 'scoreboxcricket.blog',
          points: [
            'Built an AI-powered job-application platform (LangGraph, TypeScript, React, Node.js) that has processed 100+ applications — with automated résumé tailoring, dual ATS scoring averaging 15+ points improvement per role, and a pre-filter agent that cuts processing cost by ~95%.',
            'Built a live cricket scoring platform with real-time score updates over SSE and Redis Pub/Sub, deployed on Vercel and Render with GitHub Actions CI/CD, a custom domain and zero-downtime deployments.',
            'Sole developer of both platforms — responsible for system design, full-stack development and production operations with TypeScript, React, Node.js, PostgreSQL, Redis, BullMQ and LangGraph.',
          ],
        },
        {
          role: 'Full-Stack Developer — FinTech & AI',
          company: 'splainX GmbH',
          location: 'Chemnitz, Deutschland',
          period: '03/2024 – 08/2025',
          points: [
            'Built an OCR automation pipeline with Tesseract and TypeScript — reduced manual document-processing time by 45% and eliminated 200+ hours of manual work per month.',
            'Integrated OpenAI LLMs to extract and structure data from 500+ scanned invoices and contracts per month — fully replacing manual data entry.',
            'Designed a modular Next.js frontend with GraphQL and a Node.js backend behind an API gateway — decoupled 4 core services for independent deployments and horizontal scaling.',
            'Containerized all services with Docker and implemented GitLab CI/CD pipelines with automatic rollback — cut deployment time from 2+ hours to under 15 minutes.',
            'Introduced Jest unit and integration tests with 85%+ coverage of core business logic and applied Domain-Driven Design (DDD) — reduced regression bugs by 60%.',
          ],
        },
        {
          role: 'Full-Stack Developer',
          company: 'splainX GmbH',
          location: 'Chemnitz, Deutschland',
          period: '01/2022 – 02/2024',
          points: [
            'Owned core development of the main FinTech product — a multi-party invoice lifecycle platform for 15+ enterprise clients with workflows for suppliers, customers, guarantors and financiers.',
            'Built a reusable React component library with Redux and Tailwind CSS used across 8 frontend modules — shortened UI development time and improved page-load performance by 25%.',
            'Built 5 Node.js microservices for invoice processing and payment management with PostgreSQL and Redis caching — reduced database load on frequent queries by 40%.',
            'Replaced synchronous service calls with Apache Kafka event streams handling 2,000+ daily events — decoupled payment, notification and invoice services and eliminated cascading failures under load.',
            'Mentored 3 junior developers through pair programming and code reviews — shortened onboarding time and established consistent coding standards across the team.',
          ],
        },
      ],
    },
    skills: {
      title: 'Skills',
      subtitle: 'Tools and technologies I work with',
      groups: [
        { name: 'Frontend', items: ['TypeScript', 'JavaScript', 'React.js', 'Next.js', 'Redux', 'Tailwind CSS'] },
        { name: 'Backend', items: ['Node.js', 'Express.js', 'Python', 'GraphQL', 'WebSockets', 'BullMQ', 'Apache Kafka', 'OAuth 2.0'] },
        { name: 'Databases', items: ['PostgreSQL', 'Redis', 'MongoDB', 'Prisma ORM'] },
        { name: 'DevOps & Cloud', items: ['Docker', 'Kubernetes', 'AWS (EC2, S3, Lambda, ECS, Route 53)', 'GitHub Actions', 'GitLab CI/CD'] },
        { name: 'AI & Testing', items: ['LangGraph', 'LangChain', 'Tesseract OCR', 'Jest'] },
      ],
    },
    education: {
      title: 'Education',
      subtitle: 'Academic background',
      items: [
        {
          degree: 'M.Sc. Digital Engineering',
          school: 'Otto von Guericke University',
          location: 'Magdeburg, Deutschland',
          period: '04/2017 – 12/2021',
          focus: 'Focus: Databases, Blockchain, Web Development',
        },
      ],
      languagesTitle: 'Languages',
      languages: [
        { name: 'English', level: 'Fluent — C1', value: 90 },
        { name: 'German', level: 'Conversational — B1', value: 55 },
      ],
      interestsTitle: 'Hobbies & Interests',
      interests: ['Cricket', 'Cooking'],
    },
    contact: {
      title: 'Get in touch',
      subtitle: "I'm open to full-stack and AI engineering roles. Let's talk.",
      emailCta: 'Send an email',
      note: 'References and certificates available on request.',
    },
    footer: {
      built: 'Built with React & Tailwind CSS',
    },
  },

  de: {
    nav: {
      about: 'Über mich',
      experience: 'Erfahrung',
      skills: 'Kenntnisse',
      education: 'Ausbildung',
      contact: 'Kontakt',
    },
    hero: {
      role: 'Full-Stack-Entwickler',
      tagline: 'FinTech- & KI-Systeme',
      summary:
        'Full-Stack-Entwickler mit über 4 Jahren Erfahrung in der Entwicklung von FinTech- und KI-Systemen bei einem deutschen SaaS-Unternehmen — verantwortlich für die Kernentwicklung der Plattform für 15+ Unternehmenskunden und Entwicklung von LLM-Automatisierungen, die monatlich über 200 Stunden manuelle Bearbeitung eliminiert haben. Kern-Stack: React, Node.js, TypeScript, PostgreSQL, Redis und LangGraph.',
      status: 'Unbefristeter Aufenthaltstitel — uneingeschränkte Arbeitserlaubnis in Deutschland. Sofort verfügbar.',
      ctaPrimary: 'Kontakt aufnehmen',
      ctaSecondary: 'Projekte ansehen',
      stats: [
        { value: '4+', label: 'Jahre Erfahrung' },
        { value: '15+', label: 'Unternehmenskunden' },
        { value: '200+', label: 'Stunden/Monat automatisiert' },
      ],
    },
    experience: {
      title: 'Berufserfahrung',
      subtitle: 'Wo ich Software in Produktion gebracht habe',
      items: [
        {
          role: 'Eigenprojekte',
          company: 'Selbstständig',
          location: 'Chemnitz, Deutschland',
          period: '09/2025 – Heute',
          link: 'https://scoreboxcricket.blog',
          linkLabel: 'scoreboxcricket.blog',
          points: [
            'KI-gestützte Stellenbewerbungsplattform (LangGraph, TypeScript, React, Node.js) entwickelt, die 100+ Bewerbungen verarbeitet — mit automatisierter Lebenslaufanpassung, dualem ATS-Scoring mit durchschnittlich 15+ Punkten Verbesserung pro Stelle und einem Vorfilter-Agenten, der die Verarbeitungskosten um ~95 % senkt.',
            'Live-Cricket-Scoring-Plattform entwickelt mit Echtzeit-Spielstandaktualisierungen über SSE und Redis Pub/Sub, bereitgestellt auf Vercel und Render mit GitHub Actions CI/CD, eigener Domain und Zero-Downtime-Deployments.',
            'Als Alleinentwickler beider Plattformen verantwortlich für Systemdesign, Full-Stack-Entwicklung und Produktivbetrieb mit TypeScript, React, Node.js, PostgreSQL, Redis, BullMQ und LangGraph.',
          ],
        },
        {
          role: 'Full-Stack-Entwickler — FinTech & KI',
          company: 'splainX GmbH',
          location: 'Chemnitz, Deutschland',
          period: '03/2024 – 08/2025',
          points: [
            'OCR-Automatisierungspipeline mit Tesseract und TypeScript entwickelt — manuelle Dokumentenverarbeitungszeit um 45 % reduziert und monatlich über 200 Stunden Handarbeit eliminiert.',
            'OpenAI-LLMs integriert, um Daten aus 500+ monatlich gescannten Rechnungen und Verträgen zu extrahieren und zu strukturieren — manuelle Dateneingabe vollständig ersetzt.',
            'Modulares Next.js-Frontend mit GraphQL und Node.js-Backend hinter einem API-Gateway konzipiert — 4 Kerndienste entkoppelt für unabhängige Deployments und horizontale Skalierung.',
            'Alle Dienste mit Docker containerisiert und GitLab CI/CD-Pipelines mit automatischem Rollback implementiert — Deployment-Zeit von über 2 Stunden auf unter 15 Minuten reduziert.',
            'Jest-Unit- und Integrationstests mit 85 %+ Abdeckung der Kerngeschäftslogik eingeführt und Domain-Driven Design (DDD) angewendet — Regressionsfehler um 60 % gesenkt.',
          ],
        },
        {
          role: 'Full-Stack-Entwickler',
          company: 'splainX GmbH',
          location: 'Chemnitz, Deutschland',
          period: '01/2022 – 02/2024',
          points: [
            'Kernentwicklung des FinTech-Hauptprodukts verantwortet — eine mehrparteiliche Rechnungslebenszyklusplattform für 15+ Unternehmenskunden mit Workflows für Lieferanten, Kunden, Bürgen und Finanzierer.',
            'Wiederverwendbare React-Komponentenbibliothek mit Redux und Tailwind CSS entwickelt, die in 8 Frontend-Modulen eingesetzt wird — UI-Entwicklungszeit verkürzt und Seitenladeleistung um 25 % verbessert.',
            '5 Node.js-Microservices für Rechnungsverarbeitung und Zahlungsmanagement entwickelt mit PostgreSQL und Redis-Caching — Datenbankbelastung bei häufigen Abfragen um 40 % reduziert.',
            'Synchrone Service-Aufrufe durch Apache Kafka-Event-Streams mit 2.000+ täglichen Events ersetzt — Zahlungs-, Benachrichtigungs- und Rechnungsdienste entkoppelt und Kaskadenausfälle unter Last eliminiert.',
            '3 Junior-Entwickler durch Pair Programming und Code Reviews mentoriert — Einarbeitungszeit verkürzt und einheitliche Coding-Standards im Team etabliert.',
          ],
        },
      ],
    },
    skills: {
      title: 'Kenntnisse',
      subtitle: 'Werkzeuge und Technologien, mit denen ich arbeite',
      groups: [
        { name: 'Frontend', items: ['TypeScript', 'JavaScript', 'React.js', 'Next.js', 'Redux', 'Tailwind CSS'] },
        { name: 'Backend', items: ['Node.js', 'Express.js', 'Python', 'GraphQL', 'WebSockets', 'BullMQ', 'Apache Kafka', 'OAuth 2.0'] },
        { name: 'Datenbanken', items: ['PostgreSQL', 'Redis', 'MongoDB', 'Prisma ORM'] },
        { name: 'DevOps & Cloud', items: ['Docker', 'Kubernetes', 'AWS (EC2, S3, Lambda, ECS, Route 53)', 'GitHub Actions', 'GitLab CI/CD'] },
        { name: 'KI & Testing', items: ['LangGraph', 'LangChain', 'Tesseract OCR', 'Jest'] },
      ],
    },
    education: {
      title: 'Ausbildung',
      subtitle: 'Akademischer Hintergrund',
      items: [
        {
          degree: 'M.Sc. Digital Engineering',
          school: 'Otto-von-Guericke-Universität',
          location: 'Magdeburg, Deutschland',
          period: '04/2017 – 12/2021',
          focus: 'Schwerpunkte: Datenbanken, Blockchain, Webentwicklung',
        },
      ],
      languagesTitle: 'Sprachen',
      languages: [
        { name: 'Englisch', level: 'Fließend — C1', value: 90 },
        { name: 'Deutsch', level: 'Konversation — B1', value: 55 },
      ],
      interestsTitle: 'Hobbys & Interessen',
      interests: ['Cricket', 'Kochen'],
    },
    contact: {
      title: 'Kontakt aufnehmen',
      subtitle: 'Ich bin offen für Full-Stack- und KI-Engineering-Rollen. Lassen Sie uns sprechen.',
      emailCta: 'E-Mail senden',
      note: 'Zeugnisse und Nachweise auf Anfrage.',
    },
    footer: {
      built: 'Erstellt mit React & Tailwind CSS',
    },
  },
}

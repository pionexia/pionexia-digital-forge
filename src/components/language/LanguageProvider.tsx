
import { createContext, useContext, useState, ReactNode } from "react";

type Language = "fr" | "en";

type LanguageProviderProps = {
  children: ReactNode;
  defaultLanguage?: Language;
  storageKey?: string;
};

type LanguageProviderState = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
};

const translations = {
  fr: {
    "nav.home": "Accueil",
    "nav.services": "Services",
    "nav.solutions": "Solutions IA",
    "nav.why": "Pourquoi nous",
    "nav.contact": "Contact",
    "nav.quote": "Demander un devis",
    "hero.title": "Développement Web, Mobile & IA sur mesure",
    "hero.subtitle": "Des solutions digitales innovantes pour propulser votre business",
    "hero.cta.quote": "Demander un devis",
    "hero.cta.contact": "Nous contacter",
    "hero.cta.portfolio": "Voir nos réalisations",
    "services.title": "Nos Services",
    "services.web.title": "Développement Web",
    "services.web.desc": "Sites vitrine, e-commerce, intranet, applications SaaS avec Laravel, React, Next.js et plus encore.",
    "services.mobile.title": "Développement Mobile",
    "services.mobile.desc": "Applications Android, iOS et hybrides avec React Native ou Flutter, intégrant des fonctionnalités avancées.",
    "services.ai.title": "Agent IA Personnalisé",
    "services.ai.desc": "Chatbots intelligents, assistants vocaux et automatisation de tâches adaptés à vos besoins spécifiques.",
    "services.integration.title": "Intégration & Automatisation",
    "services.integration.desc": "APIs, CRM, ERP et services tiers avec automatisation des flux de travail via IA.",
    "services.design.title": "UI/UX Design",
    "services.design.desc": "Maquettes Figma, design system et prototypes interactifs pour une expérience utilisateur optimale.",
    "solutions.title": "Nos Solutions IA",
    "solutions.subtitle": "Intelligence Artificielle adaptée à vos besoins métier",
    "solutions.schools.title": "IA pour établissements scolaires",
    "solutions.schools.desc": "Assistance pédagogique, automatisation administrative et suivi des élèves.",
    "solutions.business.title": "IA pour entreprises",
    "solutions.business.desc": "Optimisation des processus, analyse de données et prise de décision assistée.",
    "solutions.ecommerce.title": "IA pour e-commerce",
    "solutions.ecommerce.desc": "Recommandations personnalisées, chatbots de support et optimisation des ventes.",
    "solutions.features.nlp": "Compréhension du langage naturel",
    "solutions.features.recognition": "Reconnaissance d'image/voix",
    "solutions.features.automation": "Automatisation intelligente",
    "solutions.features.analytics": "Analytics & amélioration continue",
    "why.title": "Pourquoi Nous Choisir",
    "why.expertise.title": "Expertise technique",
    "why.expertise.desc": "Notre équipe possède une expertise pointue dans les technologies web, mobile et IA les plus récentes.",
    "why.quality.title": "Qualité & délais",
    "why.quality.desc": "Nous nous engageons à livrer des solutions de haute qualité dans les délais impartis.",
    "why.support.title": "Suivi & maintenance",
    "why.support.desc": "Notre accompagnement ne s'arrête pas à la livraison, nous assurons un suivi et une maintenance continue.",
    "why.transparency.title": "Transparence",
    "why.transparency.desc": "Communication claire et régulière tout au long du projet pour garantir votre satisfaction.",
    "contact.title": "Contactez-nous",
    "contact.subtitle": "Discutons de votre projet",
    "contact.name": "Nom",
    "contact.email": "Email",
    "contact.phone": "Téléphone",
    "contact.budget": "Budget estimé",
    "contact.message": "Description du projet",
    "contact.submit": "Envoyer",
    "contact.success": "Message envoyé avec succès!",
    "contact.error": "Une erreur est survenue. Veuillez réessayer.",
    "stats.projects": "Projets réalisés",
    "stats.clients": "Clients satisfaits",
    "stats.years": "Années d'expérience",
    "footer.rights": "Tous droits réservés",
  },
  en: {
    "nav.home": "Home",
    "nav.services": "Services",
    "nav.solutions": "AI Solutions",
    "nav.why": "Why Us",
    "nav.contact": "Contact",
    "nav.quote": "Request a Quote",
    "hero.title": "Custom Web, Mobile & AI Development",
    "hero.subtitle": "Innovative digital solutions to propel your business",
    "hero.cta.quote": "Request a Quote",
    "hero.cta.contact": "Contact Us",
    "hero.cta.portfolio": "See Our Work",
    "services.title": "Our Services",
    "services.web.title": "Web Development",
    "services.web.desc": "Showcase websites, e-commerce, intranet, SaaS applications with Laravel, React, Next.js and more.",
    "services.mobile.title": "Mobile Development",
    "services.mobile.desc": "Android, iOS and hybrid applications with React Native or Flutter, integrating advanced features.",
    "services.ai.title": "Custom AI Agent",
    "services.ai.desc": "Intelligent chatbots, voice assistants and task automation tailored to your specific needs.",
    "services.integration.title": "Integration & Automation",
    "services.integration.desc": "APIs, CRM, ERP and third-party services with AI-powered workflow automation.",
    "services.design.title": "UI/UX Design",
    "services.design.desc": "Figma mockups, design systems and interactive prototypes for optimal user experience.",
    "solutions.title": "Our AI Solutions",
    "solutions.subtitle": "Artificial Intelligence adapted to your business needs",
    "solutions.schools.title": "AI for schools",
    "solutions.schools.desc": "Educational assistance, administrative automation and student monitoring.",
    "solutions.business.title": "AI for businesses",
    "solutions.business.desc": "Process optimization, data analysis and assisted decision-making.",
    "solutions.ecommerce.title": "AI for e-commerce",
    "solutions.ecommerce.desc": "Personalized recommendations, support chatbots and sales optimization.",
    "solutions.features.nlp": "Natural Language Processing",
    "solutions.features.recognition": "Image/Voice Recognition",
    "solutions.features.automation": "Intelligent Automation",
    "solutions.features.analytics": "Analytics & Continuous Improvement",
    "why.title": "Why Choose Us",
    "why.expertise.title": "Technical expertise",
    "why.expertise.desc": "Our team has deep expertise in the latest web, mobile and AI technologies.",
    "why.quality.title": "Quality & timeliness",
    "why.quality.desc": "We are committed to delivering high-quality solutions within agreed timeframes.",
    "why.support.title": "Support & maintenance",
    "why.support.desc": "Our support doesn't end at delivery, we ensure continuous follow-up and maintenance.",
    "why.transparency.title": "Transparency",
    "why.transparency.desc": "Clear and regular communication throughout the project to ensure your satisfaction.",
    "contact.title": "Contact Us",
    "contact.subtitle": "Let's discuss your project",
    "contact.name": "Name",
    "contact.email": "Email",
    "contact.phone": "Phone",
    "contact.budget": "Estimated Budget",
    "contact.message": "Project Description",
    "contact.submit": "Submit",
    "contact.success": "Message sent successfully!",
    "contact.error": "An error occurred. Please try again.",
    "stats.projects": "Projects Completed",
    "stats.clients": "Satisfied Clients",
    "stats.years": "Years of Experience",
    "footer.rights": "All rights reserved",
  },
};

const initialState: LanguageProviderState = {
  language: "fr",
  setLanguage: () => null,
  t: () => "",
};

const LanguageProviderContext = createContext<LanguageProviderState>(initialState);

export function LanguageProvider({
  children,
  defaultLanguage = "fr",
  storageKey = "language",
  ...props
}: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>(
    () => (localStorage.getItem(storageKey) as Language) || defaultLanguage
  );

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  const value = {
    language,
    setLanguage: (language: Language) => {
      localStorage.setItem(storageKey, language);
      setLanguage(language);
    },
    t,
  };

  return (
    <LanguageProviderContext.Provider {...props} value={value}>
      {children}
    </LanguageProviderContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageProviderContext);

  if (context === undefined)
    throw new Error("useLanguage must be used within a LanguageProvider");

  return context;
};

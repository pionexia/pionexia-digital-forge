
import { useState } from "react";
import { useLanguage } from "@/components/language/LanguageProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const projects = [
  {
    id: 1,
    title: "Application E-commerce Moderne",
    category: "webdev",
    client: "BoutiqueXYZ",
    image: "https://placehold.co/600x400/5271ff/ffffff?text=E-commerce+App",
    description: "Site e-commerce responsive avec paiement en ligne, gestion de stock et tableaux de bord.",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    link: "#"
  },
  {
    id: 2,
    title: "Application Mobile de Livraison",
    category: "mobiledev",
    client: "DeliveryFast",
    image: "https://placehold.co/600x400/22C55E/ffffff?text=Delivery+App",
    description: "Application mobile de suivi de livraison en temps réel avec géolocalisation.",
    technologies: ["React Native", "Firebase", "Google Maps API"],
    link: "#"
  },
  {
    id: 3,
    title: "Chatbot d'Assistance Client",
    category: "ai",
    client: "ServicePro",
    image: "https://placehold.co/600x400/7E69AB/ffffff?text=AI+Chatbot",
    description: "Agent conversationnel intelligent pour l'assistance client 24/7 avec intégration CRM.",
    technologies: ["Python", "NLP", "TensorFlow", "API REST"],
    link: "#"
  },
  {
    id: 4,
    title: "Interface Administrateur SaaS",
    category: "design",
    client: "ManageCorp",
    image: "https://placehold.co/600x400/F97316/ffffff?text=Admin+Dashboard",
    description: "Design UX/UI complet d'une plateforme administrative avec tableaux de bord personnalisés.",
    technologies: ["Figma", "Adobe XD", "Tailwind CSS"],
    link: "#"
  },
  {
    id: 5,
    title: "Intégration CRM & Automatisation",
    category: "integration",
    client: "BusinessPlus",
    image: "https://placehold.co/600x400/0D74FF/ffffff?text=CRM+Integration",
    description: "Intégration de systèmes CRM avec automatisation des processus de vente.",
    technologies: ["Zapier", "API", "Webhooks", "Salesforce"],
    link: "#"
  },
  {
    id: 6,
    title: "Site Vitrine Immobilier",
    category: "webdev",
    client: "ImmoLux",
    image: "https://placehold.co/600x400/5271ff/ffffff?text=Real+Estate+Website",
    description: "Site web responsive pour agence immobilière avec recherche avancée de propriétés.",
    technologies: ["Next.js", "PostgreSQL", "Mapbox"],
    link: "#"
  }
];

const Realisations = () => {
  const { t } = useLanguage();
  const [filter, setFilter] = useState("all");
  
  const filteredProjects = filter === "all" 
    ? projects 
    : projects.filter(project => project.category === filter);
  
  return (
    <div className="min-h-screen bg-white dark:bg-pionexia-dark">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{t("portfolio.title") || "Nos Réalisations"}</h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {t("portfolio.subtitle") || "Découvrez notre portfolio de projets digitaux réalisés pour nos clients. Web, Mobile, IA : notre expertise au service de votre réussite."}
            </p>
            <div className="h-1 w-20 bg-pionexia-blue mx-auto mt-4"></div>
          </div>
          
          <Tabs defaultValue="all" className="mb-8">
            <TabsList className="grid grid-cols-3 md:grid-cols-6 max-w-3xl mx-auto">
              <TabsTrigger value="all" onClick={() => setFilter("all")}>Tous</TabsTrigger>
              <TabsTrigger value="webdev" onClick={() => setFilter("webdev")}>Web</TabsTrigger>
              <TabsTrigger value="mobiledev" onClick={() => setFilter("mobiledev")}>Mobile</TabsTrigger>
              <TabsTrigger value="ai" onClick={() => setFilter("ai")}>IA</TabsTrigger>
              <TabsTrigger value="design" onClick={() => setFilter("design")}>Design</TabsTrigger>
              <TabsTrigger value="integration" onClick={() => setFilter("integration")}>Intégration</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredProjects.map((project) => (
              <div 
                key={project.id} 
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold">{project.title}</h3>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Client: {project.client}</p>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, index) => (
                      <span 
                        key={index} 
                        className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs font-medium px-2.5 py-0.5 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full hover:bg-pionexia-blue hover:text-white"
                  >
                    Voir le projet
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Vous avez un projet similaire? Nous pouvons vous aider!
            </p>
            <Button 
              asChild
              className="bg-pionexia-blue hover:bg-pionexia-blue/90 text-white"
            >
              <a href="/devis">Demander un devis</a>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Realisations;

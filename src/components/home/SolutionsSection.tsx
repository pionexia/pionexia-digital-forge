
import { useLanguage } from "@/components/language/LanguageProvider";
import { useEffect, useRef } from "react";
import { GraduationCap, Building, ShoppingBag, MessageSquare, Scan, Zap, AreaChart } from "lucide-react";

const SolutionsSection = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            
            const features = document.querySelectorAll(".feature-item");
            features.forEach((feature, index) => {
              setTimeout(() => {
                feature.classList.add("in-view");
              }, index * 150);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  const solutions = [
    {
      icon: <GraduationCap size={24} />,
      title: t("solutions.schools.title"),
      description: t("solutions.schools.desc"),
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: <Building size={24} />,
      title: t("solutions.business.title"),
      description: t("solutions.business.desc"),
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: <ShoppingBag size={24} />,
      title: t("solutions.ecommerce.title"),
      description: t("solutions.ecommerce.desc"),
      color: "from-green-500 to-green-600",
    },
  ];
  
  const features = [
    {
      icon: <MessageSquare size={20} />,
      title: t("solutions.features.nlp"),
      color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
    },
    {
      icon: <Scan size={20} />,
      title: t("solutions.features.recognition"),
      color: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
    },
    {
      icon: <Zap size={20} />,
      title: t("solutions.features.automation"),
      color: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
    },
    {
      icon: <AreaChart size={20} />,
      title: t("solutions.features.analytics"),
      color: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
    },
  ];
  
  return (
    <section id="solutions-ia" className="section-padding bg-white dark:bg-pionexia-dark">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("solutions.title")}</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">{t("solutions.subtitle")}</p>
          <div className="h-1 w-20 bg-pionexia-blue mx-auto mt-4"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {solutions.map((solution, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-xl shadow-lg"
            >
              <div className={`bg-gradient-to-r ${solution.color} p-6 h-full text-white flex flex-col`}>
                <div className="bg-white/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  {solution.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{solution.title}</h3>
                <p className="text-white/80 flex-grow">{solution.description}</p>
                <a href="#contact" className="mt-4 inline-flex items-center text-white hover:underline">
                  En savoir plus
                  <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
        
        <div className="slide-up" ref={sectionRef}>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 md:p-8">
            <div className="flex flex-wrap gap-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="feature-item slide-up flex items-center gap-2 rounded-full px-4 py-2 ${feature.color}"
                >
                  <div className={`w-8 h-8 rounded-full ${feature.color} flex items-center justify-center`}>
                    {feature.icon}
                  </div>
                  <span>{feature.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;

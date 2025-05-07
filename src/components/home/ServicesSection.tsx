
import { useLanguage } from "@/components/language/LanguageProvider";
import { useEffect, useRef } from "react";
import { Code, Smartphone, Brain, Zap, Palette } from "lucide-react";

const ServicesSection = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = document.querySelectorAll(".service-card");
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add("in-view");
              }, index * 100);
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
  
  const services = [
    {
      icon: <Code size={24} />,
      title: t("services.web.title"),
      description: t("services.web.desc"),
      color: "bg-blue-500",
    },
    {
      icon: <Smartphone size={24} />,
      title: t("services.mobile.title"),
      description: t("services.mobile.desc"),
      color: "bg-purple-500",
    },
    {
      icon: <Brain size={24} />,
      title: t("services.ai.title"),
      description: t("services.ai.desc"),
      color: "bg-green-500",
    },
    {
      icon: <Zap size={24} />,
      title: t("services.integration.title"),
      description: t("services.integration.desc"),
      color: "bg-orange-500",
    },
    {
      icon: <Palette size={24} />,
      title: t("services.design.title"),
      description: t("services.design.desc"),
      color: "bg-pink-500",
    }
  ];
  
  return (
    <section id="services" className="section-padding bg-gray-50 dark:bg-gray-900" ref={sectionRef}>
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("services.title")}</h2>
          <div className="h-1 w-20 bg-pionexia-blue mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card slide-up bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all p-6 border border-gray-100 dark:border-gray-700"
            >
              <div className={`${service.color} w-12 h-12 rounded-lg flex items-center justify-center text-white mb-4`}>
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

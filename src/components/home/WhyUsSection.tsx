
import { useLanguage } from "@/components/language/LanguageProvider";
import { useEffect, useRef } from "react";
import { Award, Clock, Headphones, Eye } from "lucide-react";

const WhyUsSection = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = document.querySelectorAll(".why-item");
            items.forEach((item, index) => {
              setTimeout(() => {
                item.classList.add("in-view");
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
  
  const reasons = [
    {
      icon: <Award className="h-6 w-6" />,
      title: t("why.expertise.title"),
      description: t("why.expertise.desc"),
      color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: t("why.quality.title"),
      description: t("why.quality.desc"),
      color: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
    },
    {
      icon: <Headphones className="h-6 w-6" />,
      title: t("why.support.title"),
      description: t("why.support.desc"),
      color: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
    },
    {
      icon: <Eye className="h-6 w-6" />,
      title: t("why.transparency.title"),
      description: t("why.transparency.desc"),
      color: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
    },
  ];
  
  return (
    <section id="why-us" className="section-padding bg-gray-50 dark:bg-gray-900" ref={sectionRef}>
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("why.title")}</h2>
          <div className="h-1 w-20 bg-pionexia-blue mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="why-item slide-up bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-100 dark:border-gray-700 flex items-start gap-4"
            >
              <div className={`shrink-0 ${reason.color} p-3 rounded-lg`}>
                {reason.icon}
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{reason.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{reason.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;


import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/language/LanguageProvider";
import { Code, Smartphone, Brain } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const technologies = [
    { name: "Web", icon: <Code className="mr-2" size={20} /> },
    { name: "Mobile", icon: <Smartphone className="mr-2" size={20} /> },
    { name: "IA", icon: <Brain className="mr-2" size={20} /> },
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % technologies.length);
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <section className="relative min-h-screen flex items-center py-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white to-blue-50 dark:from-pionexia-dark dark:to-blue-950/30 -z-10"></div>
      
      {/* Animated circles */}
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-pionexia-blue/20 dark:bg-pionexia-blue/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute top-1/4 -right-20 w-60 h-60 bg-pionexia-purple/20 dark:bg-pionexia-purple/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute -bottom-40 left-1/4 w-80 h-80 bg-pionexia-green/10 dark:bg-pionexia-green/5 rounded-full blur-3xl -z-10"></div>
      
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
          <div className="w-full lg:w-1/2 space-y-8 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              {t("hero.title")}
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-xl">
              {t("hero.subtitle")}
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-pionexia-blue hover:bg-pionexia-blue/90 text-white" asChild>
                <Link to="/devis">{t("hero.cta.quote")}</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-pionexia-blue text-pionexia-blue hover:bg-pionexia-blue/10" asChild>
                <Link to="/#contact">{t("hero.cta.contact")}</Link>
              </Button>
              <Button size="lg" variant="link" className="text-pionexia-blue" asChild>
                <Link to="/realisations">{t("hero.cta.portfolio")}</Link>
              </Button>
            </div>
            
            <div className="flex items-center gap-6 pt-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">120+ {t("stats.projects")}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">98% {t("stats.clients")}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">10+ {t("stats.years")}</span>
              </div>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 flex justify-center items-center">
            <div className="relative w-full max-w-xl aspect-[4/3]">
              {/* Code animation */}
              <div className="absolute inset-0 rounded-2xl glass border-2 border-pionexia-blue/20 shadow-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white to-blue-50 dark:from-pionexia-dark dark:to-blue-950/30 -z-10"></div>
                
                <div className="flex items-center gap-2 w-full bg-gray-800 p-2 text-white text-sm">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="ml-2 opacity-80">pionexia-digital-forge.js</span>
                </div>
                
                <div className="p-4 font-mono text-sm text-gray-800 dark:text-gray-200 overflow-hidden h-full">
                  <div className="flex items-center gap-2 text-pionexia-blue mb-4">
                    {technologies[currentIndex].icon}
                    <span className="text-lg font-semibold">Pionexia {technologies[currentIndex].name}</span>
                  </div>
                  
                  <div className="opacity-80">
                    <div className="flex">
                      <span className="text-gray-500 dark:text-gray-400 mr-4">1</span>
                      <span className="text-purple-600 dark:text-purple-400">import</span>
                      <span className="text-white dark:text-gray-300 mx-1">&#123; Pionexia &#125;</span>
                      <span className="text-purple-600 dark:text-purple-400 mr-1">from</span>
                      <span className="text-green-500">'@pionexia/core'</span><span>;</span>
                    </div>
                    
                    <div className="flex mt-1">
                      <span className="text-gray-500 dark:text-gray-400 mr-4">2</span>
                      <span className="text-white dark:text-gray-300"></span>
                    </div>
                    
                    <div className="flex mt-1">
                      <span className="text-gray-500 dark:text-gray-400 mr-4">3</span>
                      <span className="text-purple-600 dark:text-purple-400">const</span>
                      <span className="text-blue-400 mx-1">app</span>
                      <span className="text-white dark:text-gray-300 mx-1">=</span>
                      <span className="text-purple-600 dark:text-purple-400">new</span>
                      <span className="text-yellow-500 mx-1">Pionexia</span>
                      <span className="text-white dark:text-gray-300">(&#123;</span>
                    </div>
                    
                    <div className="flex mt-1">
                      <span className="text-gray-500 dark:text-gray-400 mr-4">4</span>
                      <span className="text-white dark:text-gray-300 ml-8">type:</span>
                      <span className="text-green-500 ml-1">'{technologies[currentIndex].name}'</span><span className="text-white dark:text-gray-300">,</span>
                    </div>
                    
                    <div className="flex mt-1">
                      <span className="text-gray-500 dark:text-gray-400 mr-4">5</span>
                      <span className="text-white dark:text-gray-300 ml-8">features:</span>
                      <span className="text-white dark:text-gray-300 ml-1">[</span>
                    </div>
                    
                    <div className="flex mt-1">
                      <span className="text-gray-500 dark:text-gray-400 mr-4">6</span>
                      <span className="text-white dark:text-gray-300 ml-12"></span>
                      <span className="text-green-500">'innovation'</span><span className="text-white dark:text-gray-300">,</span>
                    </div>
                    
                    <div className="flex mt-1">
                      <span className="text-gray-500 dark:text-gray-400 mr-4">7</span>
                      <span className="text-white dark:text-gray-300 ml-12"></span>
                      <span className="text-green-500">'performance'</span><span className="text-white dark:text-gray-300">,</span>
                    </div>
                    
                    <div className="flex mt-1">
                      <span className="text-gray-500 dark:text-gray-400 mr-4">8</span>
                      <span className="text-white dark:text-gray-300 ml-12"></span>
                      <span className="text-green-500">'security'</span>
                    </div>
                    
                    <div className="flex mt-1">
                      <span className="text-gray-500 dark:text-gray-400 mr-4">9</span>
                      <span className="text-white dark:text-gray-300 ml-8">]</span><span>,</span>
                    </div>
                    
                    <div className="flex mt-1">
                      <span className="text-gray-500 dark:text-gray-400 mr-4">10</span>
                      <span className="text-white dark:text-gray-300">&#125;);</span>
                    </div>
                    
                    <div className="flex mt-1">
                      <span className="text-gray-500 dark:text-gray-400 mr-4">11</span>
                      <span className="text-white dark:text-gray-300"></span>
                    </div>
                    
                    <div className="flex mt-1">
                      <span className="text-gray-500 dark:text-gray-400 mr-4">12</span>
                      <span className="text-blue-400">app</span>
                      <span className="text-white dark:text-gray-300">.</span>
                      <span className="text-yellow-500">launch</span>
                      <span className="text-white dark:text-gray-300">();</span>
                    </div>
                    
                    <div className="flex mt-1">
                      <span className="text-gray-500 dark:text-gray-400 mr-4">13</span>
                      <span className="text-gray-400 italic">// Building the future with Pionexia</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

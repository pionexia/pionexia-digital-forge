
import { useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import HeroSection from "../components/home/HeroSection";
import ServicesSection from "../components/home/ServicesSection";
import SolutionsSection from "../components/home/SolutionsSection";
import WhyUsSection from "../components/home/WhyUsSection";
import ContactSection from "../components/home/ContactSection";
import Footer from "../components/layout/Footer";
import SEO from "../components/layout/SEO";

const Index = () => {
  useEffect(() => {
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Intersection Observer for animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".slide-up");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);
  
  return (
    <div className="min-h-screen bg-white dark:bg-pionexia-dark">
      <SEO 
        title="Pionexia | Agence de Développement Web, Mobile et Solutions IA"
        description="Pionexia est une agence digitale innovante spécialisée dans le développement web, mobile et les solutions IA sur mesure pour transformer votre vision en réalité."
      />
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <SolutionsSection />
        <WhyUsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;


import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "@/components/language/LanguageProvider";

const HeroButtons = () => {
  const { t } = useLanguage();

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-8">
      <Button 
        size="lg" 
        className="bg-pionexia-blue hover:bg-pionexia-blue/90 text-white"
        asChild
      >
        <Link to="/devis">
          {t('hero.cta.quote', 'Demander un devis')}
        </Link>
      </Button>
      
      <Button 
        size="lg" 
        variant="outline" 
        className="border-pionexia-blue text-pionexia-blue hover:bg-pionexia-blue/10"
        onClick={scrollToContact}
      >
        {t('hero.cta.contact', 'Nous contacter')}
      </Button>
      
      <Button 
        size="lg" 
        variant="ghost"
        className="hover:bg-pionexia-blue/10"
        asChild
      >
        <Link to="/realisations">
          {t('hero.cta.portfolio', 'Voir nos réalisations')}
        </Link>
      </Button>
    </div>
  );
};

export default HeroButtons;

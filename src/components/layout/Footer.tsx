
import { useLanguage } from "@/components/language/LanguageProvider";
import { useTheme } from "@/components/theme/ThemeProvider";
import { Link } from "react-router-dom";

const Footer = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 pt-12 pb-6">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img
                src={theme === "dark" ? "/lovable-uploads/pionexia-logo-dark.svg" : "/lovable-uploads/pionexia-logo-blue.svg"}
                alt="Pionexia"
                className="h-10 w-10"
              />
              <span className="text-xl font-heading font-bold text-pionexia-dark dark:text-white">
                Pionexia
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Développement Web, Mobile & IA sur mesure pour propulser votre business dans le futur.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><a href="#services" className="text-gray-600 dark:text-gray-400 hover:text-pionexia-blue dark:hover:text-pionexia-blue transition-colors">Développement Web</a></li>
              <li><a href="#services" className="text-gray-600 dark:text-gray-400 hover:text-pionexia-blue dark:hover:text-pionexia-blue transition-colors">Développement Mobile</a></li>
              <li><a href="#solutions-ia" className="text-gray-600 dark:text-gray-400 hover:text-pionexia-blue dark:hover:text-pionexia-blue transition-colors">Solutions IA</a></li>
              <li><a href="#services" className="text-gray-600 dark:text-gray-400 hover:text-pionexia-blue dark:hover:text-pionexia-blue transition-colors">UI/UX Design</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Entreprise</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-pionexia-blue dark:hover:text-pionexia-blue transition-colors">À propos</Link></li>
              <li><a href="#why-us" className="text-gray-600 dark:text-gray-400 hover:text-pionexia-blue dark:hover:text-pionexia-blue transition-colors">Pourquoi nous</a></li>
              <li><Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-pionexia-blue dark:hover:text-pionexia-blue transition-colors">Blog</Link></li>
              <li><Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-pionexia-blue dark:hover:text-pionexia-blue transition-colors">Carrières</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="text-gray-600 dark:text-gray-400">128 Rue de la République, 75011 Paris</li>
              <li className="text-gray-600 dark:text-gray-400">contact@pionexia.com</li>
              <li className="text-gray-600 dark:text-gray-400">+33 1 23 45 67 89</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-600 dark:text-gray-400 mb-4 md:mb-0">
            &copy; {currentYear} Pionexia. {t("footer.rights")}.
          </div>
          
          <div className="flex gap-6">
            <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-pionexia-blue dark:hover:text-pionexia-blue transition-colors">
              Mentions légales
            </Link>
            <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-pionexia-blue dark:hover:text-pionexia-blue transition-colors">
              Politique de confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

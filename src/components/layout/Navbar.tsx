
import { useState, useEffect } from "react";
import { useTheme } from "@/components/theme/ThemeProvider";
import { Moon, Sun, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { LanguageSwitcher } from "@/components/language/LanguageSwitcher";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "py-3 bg-white/80 dark:bg-pionexia-dark/80 backdrop-blur-lg shadow-md"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img
            src={theme === "dark" ? "/lovable-uploads/pionexia-logo-dark.svg" : "/lovable-uploads/pionexia-logo-blue.svg"}
            alt="Pionexia"
            className="h-10 w-10"
          />
          <span className="text-xl font-heading font-bold text-pionexia-dark dark:text-white">
            Pionexia
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium hover:text-pionexia-blue dark:hover:text-pionexia-blue transition-colors">
            Accueil
          </Link>
          <a href="/#services" className="text-sm font-medium hover:text-pionexia-blue dark:hover:text-pionexia-blue transition-colors">
            Services
          </a>
          <a href="/#solutions-ia" className="text-sm font-medium hover:text-pionexia-blue dark:hover:text-pionexia-blue transition-colors">
            Solutions IA
          </a>
          <Link to="/realisations" className="text-sm font-medium hover:text-pionexia-blue dark:hover:text-pionexia-blue transition-colors">
            Réalisations
          </Link>
          <a href="/#why-us" className="text-sm font-medium hover:text-pionexia-blue dark:hover:text-pionexia-blue transition-colors">
            Pourquoi nous
          </a>
          <a href="/#contact" className="text-sm font-medium hover:text-pionexia-blue dark:hover:text-pionexia-blue transition-colors">
            Contact
          </a>
          <LanguageSwitcher />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </Button>
          <Button className="bg-pionexia-blue hover:bg-pionexia-blue/90 text-white" asChild>
            <Link to="/devis">Demander un devis</Link>
          </Button>
        </nav>

        {/* Mobile Navigation Button */}
        <div className="flex items-center gap-4 md:hidden">
          <LanguageSwitcher />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="fixed inset-0 top-[60px] bg-white dark:bg-pionexia-dark z-40 p-6 md:hidden animate-fade-in">
            <nav className="flex flex-col gap-6">
              <Link 
                to="/" 
                className="text-lg font-medium hover:text-pionexia-blue dark:hover:text-pionexia-blue transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Accueil
              </Link>
              <a 
                href="/#services" 
                className="text-lg font-medium hover:text-pionexia-blue dark:hover:text-pionexia-blue transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </a>
              <a 
                href="/#solutions-ia" 
                className="text-lg font-medium hover:text-pionexia-blue dark:hover:text-pionexia-blue transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Solutions IA
              </a>
              <Link 
                to="/realisations" 
                className="text-lg font-medium hover:text-pionexia-blue dark:hover:text-pionexia-blue transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Réalisations
              </Link>
              <a 
                href="/#why-us" 
                className="text-lg font-medium hover:text-pionexia-blue dark:hover:text-pionexia-blue transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Pourquoi nous
              </a>
              <a 
                href="/#contact" 
                className="text-lg font-medium hover:text-pionexia-blue dark:hover:text-pionexia-blue transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>
              <Button 
                className="bg-pionexia-blue hover:bg-pionexia-blue/90 text-white w-full mt-4"
                asChild
              >
                <Link to="/devis" onClick={() => setIsMenuOpen(false)}>Demander un devis</Link>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;

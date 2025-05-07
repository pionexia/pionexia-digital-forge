
import { useState } from "react";
import { useLanguage } from "@/components/language/LanguageProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Phone, MapPin, Send, User } from "lucide-react";
import { createClient } from "@/integrations/supabase/client";

const ContactSection = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const supabase = createClient();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    budget: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleBudgetChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      budget: value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Envoi du formulaire via l'edge function
      const { data, error } = await supabase.functions.invoke("send-contact", {
        body: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          budget: formData.budget,
          message: formData.message,
        }
      });
      
      if (error) throw error;
      
      toast({
        title: t("contact.success"),
        description: `Merci ${formData.name}, nous vous contacterons bientôt!`,
      });
      
      // Réinitialisation du formulaire
      setFormData({
        name: "",
        email: "",
        phone: "",
        budget: "",
        message: "",
      });
    } catch (error) {
      console.error("Erreur lors de l'envoi:", error);
      toast({
        title: "Erreur lors de l'envoi",
        description: "Veuillez réessayer ou nous contacter directement.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <section id="contact" className="section-padding bg-white dark:bg-pionexia-dark">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("contact.title")}</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">{t("contact.subtitle")}</p>
          <div className="h-1 w-20 bg-pionexia-blue mx-auto mt-4"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 md:p-8">
            <h3 className="text-xl font-semibold mb-6">Pionexia</h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-pionexia-blue text-white p-2 rounded-lg">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-lg font-medium">Téléphone</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    +212 766 39 52 53 (WhatsApp) <br />
                    +212 717 184 490 (Appel)
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-pionexia-blue text-white p-2 rounded-lg">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-lg font-medium">Email</h4>
                  <p className="text-gray-600 dark:text-gray-300">pdg.pionexia@gmail.com</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <h4 className="text-lg font-medium mb-4">Suivez-nous</h4>
              <div className="flex gap-4">
                <a href="https://www.instagram.com/khalildevit/" target="_blank" rel="noopener noreferrer" className="bg-gray-200 dark:bg-gray-700 hover:bg-pionexia-blue hover:text-white transition-colors p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
                  </svg>
                </a>
                <a href="https://x.com/IbrahimaLo407" target="_blank" rel="noopener noreferrer" className="bg-gray-200 dark:bg-gray-700 hover:bg-pionexia-blue hover:text-white transition-colors p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                  </svg>
                </a>
                <a href="https://www.linkedin.com/in/ibrahima-l%C3%B4-3b3a1a248/" target="_blank" rel="noopener noreferrer" className="bg-gray-200 dark:bg-gray-700 hover:bg-pionexia-blue hover:text-white transition-colors p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                  </svg>
                </a>
                <a href="https://web.facebook.com/KhalilDevit" target="_blank" rel="noopener noreferrer" className="bg-gray-200 dark:bg-gray-700 hover:bg-pionexia-blue hover:text-white transition-colors p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 8h-1.35c-.538 0-.65.221-.65.778v1.222h2l-.209 2h-1.791v7h-3v-7h-2v-2h2v-2.308c0-1.769.931-2.692 3.029-2.692h1.971v3z"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  <User size={16} />
                  {t("contact.name")} *
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    <Mail size={16} />
                    {t("contact.email")} *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    <Phone size={16} />
                    {t("contact.phone")}
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="budget" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t("contact.budget")}
                </label>
                <Select value={formData.budget} onValueChange={handleBudgetChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un budget" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="less-5k">Moins de 5 000€</SelectItem>
                    <SelectItem value="5k-10k">5 000€ - 10 000€</SelectItem>
                    <SelectItem value="10k-25k">10 000€ - 25 000€</SelectItem>
                    <SelectItem value="25k-50k">25 000€ - 50 000€</SelectItem>
                    <SelectItem value="more-50k">Plus de 50 000€</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label htmlFor="message" className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  <Send size={16} />
                  {t("contact.message")} *
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full"
                />
              </div>
              
              <Button
                type="submit"
                className="w-full bg-pionexia-blue hover:bg-pionexia-blue/90 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Envoi en cours..." : t("contact.submit")}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

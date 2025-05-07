
import React from "react";
import ContactForm from "./ContactForm";
import { MapPin } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="py-16 bg-gray-50 dark:bg-pionexia-dark-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Contactez-nous</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Prenez contact avec notre équipe pour discuter de votre projet ou pour toute question.
          </p>
          <div className="h-1 w-16 bg-pionexia-blue mx-auto mt-4"></div>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1 bg-white dark:bg-pionexia-dark-accent p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Informations de contact</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Adresse</h4>
                  <div className="flex items-start gap-2 text-gray-600 dark:text-gray-300">
                    <MapPin size={18} className="mt-1 flex-shrink-0" />
                    <span>Avenue Hassan II, Agadir, Maroc</span>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Email</h4>
                  <a 
                    href="mailto:pdg.pionexia@gmail.com"
                    className="text-pionexia-blue hover:underline"
                  >
                    pdg.pionexia@gmail.com
                  </a>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Horaires</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Lun - Ven: 9h - 18h<br />
                    Sam - Dim: Fermé
                  </p>
                </div>
              </div>
              
              <div className="mt-8">
                <h4 className="font-medium mb-3">Suivez-nous</h4>
                <div className="flex gap-4">
                  <a href="#" className="text-pionexia-blue hover:text-pionexia-blue-dark transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                  </a>
                  <a href="#" className="text-pionexia-blue hover:text-pionexia-blue-dark transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                  </a>
                  <a href="#" className="text-pionexia-blue hover:text-pionexia-blue-dark transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
                  </a>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-2 bg-white dark:bg-pionexia-dark-accent p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Envoyez-nous un message</h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

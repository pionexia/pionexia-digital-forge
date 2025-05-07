
import { useState } from "react";
import { useLanguage } from "@/components/language/LanguageProvider";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Mail, User, Building, Phone, MessageSquare } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { supabase } from "@/integrations/supabase/client";

const Devis = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const [step, setStep] = useState(1);
  const totalSteps = 3;
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    projectType: "",
    timeline: "",
    description: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSelectChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };
  
  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    }
  };
  
  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo(0, 0);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Send email via Supabase Edge Function
      const { data, error } = await supabase.functions.invoke("send-devis", {
        body: {
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          service: formData.service,
          projectType: formData.projectType,
          timeline: formData.timeline,
          description: formData.description,
        }
      });
      
      if (error) throw error;
      
      toast({
        title: "Demande envoyée avec succès !",
        description: "Nous reviendrons vers vous très rapidement.",
      });
      
      // Reset form
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        company: "",
        service: "",
        projectType: "",
        timeline: "",
        description: "",
      });
      setStep(1);
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
    <div className="min-h-screen bg-white dark:bg-pionexia-dark">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Demander un devis</h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Parlez-nous de votre projet et recevez un devis personnalisé dans les meilleurs délais.
            </p>
            <div className="h-1 w-20 bg-pionexia-blue mx-auto mt-4"></div>
          </div>
          
          <div className="mb-8">
            <Progress value={step * (100/totalSteps)} className="h-2" />
            <div className="flex justify-between mt-2 text-sm text-gray-500 dark:text-gray-400">
              <span className={step >= 1 ? "font-semibold text-pionexia-blue" : ""}>
                Vos informations
              </span>
              <span className={step >= 2 ? "font-semibold text-pionexia-blue" : ""}>
                Détails du projet
              </span>
              <span className={step >= 3 ? "font-semibold text-pionexia-blue" : ""}>
                Description
              </span>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8 animate-fade-in">
            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold mb-4">Vos informations</h2>
                  
                  <div>
                    <Label htmlFor="fullName" className="flex items-center gap-2 mb-2">
                      <User size={16} />
                      Nom complet *
                    </Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      placeholder="Votre nom complet"
                      className="w-full"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email" className="flex items-center gap-2 mb-2">
                        <Mail size={16} />
                        Email professionnel *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="votre@email.com"
                        className="w-full"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="phone" className="flex items-center gap-2 mb-2">
                        <Phone size={16} />
                        Téléphone *
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="+212 XXXXXXXXX"
                        className="w-full"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="company" className="flex items-center gap-2 mb-2">
                      <Building size={16} />
                      Entreprise (optionnel)
                    </Label>
                    <Input
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Nom de votre entreprise"
                      className="w-full"
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <Button 
                      type="button" 
                      onClick={nextStep}
                      className="bg-pionexia-blue hover:bg-pionexia-blue/90 text-white"
                    >
                      Suivant
                    </Button>
                  </div>
                </div>
              )}
              
              {step === 2 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold mb-4">Détails du projet</h2>
                  
                  <div>
                    <Label htmlFor="service" className="block mb-2">
                      Type de service souhaité *
                    </Label>
                    <Select 
                      value={formData.service} 
                      onValueChange={(value) => handleSelectChange("service", value)}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez un service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="webdev">Développement Web</SelectItem>
                        <SelectItem value="mobiledev">Développement Mobile</SelectItem>
                        <SelectItem value="ai">Solutions IA</SelectItem>
                        <SelectItem value="design">UI/UX Design</SelectItem>
                        <SelectItem value="integration">Intégration & Automatisation</SelectItem>
                        <SelectItem value="other">Autre (à préciser)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label className="block mb-2">
                      Type de projet *
                    </Label>
                    <RadioGroup 
                      onValueChange={(value) => handleSelectChange("projectType", value)}
                      value={formData.projectType}
                      className="grid grid-cols-1 md:grid-cols-2 gap-2"
                      required
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="new" id="new" />
                        <Label htmlFor="new" className="cursor-pointer">Nouveau projet</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="existing" id="existing" />
                        <Label htmlFor="existing" className="cursor-pointer">Amélioration d'un projet existant</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="maintenance" id="maintenance" />
                        <Label htmlFor="maintenance" className="cursor-pointer">Maintenance</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="consulting" id="consulting" />
                        <Label htmlFor="consulting" className="cursor-pointer">Conseil</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div>
                    <Label htmlFor="timeline" className="block mb-2">
                      Délai souhaité *
                    </Label>
                    <Select 
                      value={formData.timeline} 
                      onValueChange={(value) => handleSelectChange("timeline", value)}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez un délai" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="urgent">Urgent ({'<'} 2 semaines)</SelectItem>
                        <SelectItem value="soon">Rapide (2-4 semaines)</SelectItem>
                        <SelectItem value="normal">Standard (1-2 mois)</SelectItem>
                        <SelectItem value="flexible">Flexible ({'>'} 2 mois)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex justify-between">
                    <Button 
                      type="button" 
                      onClick={prevStep}
                      variant="outline"
                    >
                      Précédent
                    </Button>
                    <Button 
                      type="button" 
                      onClick={nextStep}
                      className="bg-pionexia-blue hover:bg-pionexia-blue/90 text-white"
                    >
                      Suivant
                    </Button>
                  </div>
                </div>
              )}
              
              {step === 3 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold mb-4">Description du projet</h2>
                  
                  <div>
                    <Label htmlFor="description" className="flex items-center gap-2 mb-2">
                      <MessageSquare size={16} />
                      Décrivez votre projet *
                    </Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                      rows={8}
                      placeholder="Décrivez en détail vos besoins, objectifs, fonctionnalités souhaitées..."
                      className="w-full resize-none"
                    />
                  </div>
                  
                  <div className="flex justify-between">
                    <Button 
                      type="button" 
                      onClick={prevStep}
                      variant="outline"
                    >
                      Précédent
                    </Button>
                    <Button
                      type="submit"
                      className="bg-pionexia-blue hover:bg-pionexia-blue/90 text-white"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Envoi en cours..." : "Envoyer ma demande"}
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Devis;

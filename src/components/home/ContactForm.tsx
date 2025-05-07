
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Phone, Send, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const ContactForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    budget: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      budget: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate form
      if (!formData.name || !formData.email || !formData.message) {
        throw new Error("Veuillez remplir tous les champs obligatoires");
      }

      // Send email via Supabase Edge Function
      const { data, error } = await supabase.functions.invoke("send-contact", {
        body: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          budget: formData.budget,
          message: formData.message
        }
      });

      if (error) throw error;

      // Show success message
      toast({
        title: "Message envoyé avec succès !",
        description: "Nous vous contacterons très bientôt.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        budget: "",
        message: ""
      });
    } catch (error: any) {
      console.error("Erreur:", error);
      toast({
        title: "Erreur",
        description: error.message || "Une erreur est survenue lors de l'envoi du message",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <User size={16} />
          <label htmlFor="name" className="text-sm font-medium">
            Nom complet <span className="text-red-500">*</span>
          </label>
        </div>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Votre nom"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Mail size={16} />
            <label htmlFor="email" className="text-sm font-medium">
              Email <span className="text-red-500">*</span>
            </label>
          </div>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="votre@email.com"
            required
          />
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <Phone size={16} />
            <label htmlFor="phone" className="text-sm font-medium">
              Téléphone
            </label>
          </div>
          <Input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+212 XXX XXX XXX"
          />
        </div>
      </div>

      <div>
        <label htmlFor="budget" className="block text-sm font-medium mb-2">
          Budget estimé
        </label>
        <Select value={formData.budget} onValueChange={handleSelectChange}>
          <SelectTrigger>
            <SelectValue placeholder="Sélectionnez votre budget" />
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
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          Message <span className="text-red-500">*</span>
        </label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Décrivez votre projet..."
          rows={5}
          required
        />
      </div>

      <Button 
        type="submit" 
        className="w-full bg-pionexia-blue hover:bg-pionexia-blue/90" 
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <span className="flex items-center gap-2">Envoi en cours...</span>
        ) : (
          <span className="flex items-center gap-2">
            <Send size={16} /> Envoyer le message
          </span>
        )}
      </Button>
    </form>
  );
};

export default ContactForm;

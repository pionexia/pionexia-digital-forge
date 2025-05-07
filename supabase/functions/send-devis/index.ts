
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

// Definissez vos en-têtes CORS
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Interface pour la demande de devis
interface DevisRequest {
  name: string;
  email: string;
  phone: string;
  company?: string;
  service: string;
  projectType: string;
  timeline: string;
  description: string;
}

// Fonction principale qui traite la requête
const handler = async (req: Request): Promise<Response> => {
  // Gérer les requêtes OPTIONS (preflight CORS)
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: corsHeaders,
    });
  }

  try {
    // Récupérer les données du formulaire depuis le corps de la requête
    const data: DevisRequest = await req.json();

    // Vérifier que toutes les données requises sont présentes
    if (!data.name || !data.email || !data.phone || !data.service || !data.projectType || !data.timeline || !data.description) {
      throw new Error("Tous les champs requis doivent être remplis");
    }

    // Formatez les données pour l'email
    const emailContent = `
      <h2>Nouvelle demande de devis de ${data.name}</h2>
      
      <h3>Informations de contact:</h3>
      <ul>
        <li><strong>Nom:</strong> ${data.name}</li>
        <li><strong>Email:</strong> ${data.email}</li>
        <li><strong>Téléphone:</strong> ${data.phone}</li>
        ${data.company ? `<li><strong>Entreprise:</strong> ${data.company}</li>` : ''}
      </ul>
      
      <h3>Détails du projet:</h3>
      <ul>
        <li><strong>Service demandé:</strong> ${getServiceName(data.service)}</li>
        <li><strong>Type de projet:</strong> ${getProjectTypeName(data.projectType)}</li>
        <li><strong>Délai souhaité:</strong> ${getTimelineName(data.timeline)}</li>
      </ul>
      
      <h3>Description:</h3>
      <p>${data.description.replace(/\n/g, '<br>')}</p>
    `;

    // Utiliser Resend pour envoyer l'email
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!resendApiKey) {
      console.error("RESEND_API_KEY is not set");
      throw new Error("Configuration du serveur d'email manquante");
    }

    const resend = new Resend(resendApiKey);
    const { data: emailData, error } = await resend.emails.send({
      from: "Pionexia Devis <onboarding@resend.dev>",
      to: ["pdg.pionexia@gmail.com"], // Corrigé l'adresse email - assurez-vous qu'elle est correcte
      subject: `Nouvelle demande de devis de ${data.name}`,
      html: emailContent,
      reply_to: data.email
    });
    
    if (error) {
      console.error("Erreur Resend:", error);
      throw new Error(`Erreur d'envoi: ${error.message}`);
    }
    
    console.log("Email envoyé avec succès:", emailData);

    // Retournez une réponse de succès
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Demande de devis envoyée avec succès" 
      }),
      {
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );

  } catch (error: any) {
    // Gérez les erreurs et retournez une réponse appropriée
    console.error("Erreur lors de l'envoi du devis:", error.message);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  }
};

// Fonctions auxiliaires pour obtenir les noms lisibles
function getServiceName(serviceCode: string): string {
  const services: { [key: string]: string } = {
    webdev: "Développement Web",
    mobiledev: "Développement Mobile",
    ai: "Solutions IA",
    design: "UI/UX Design",
    integration: "Intégration & Automatisation",
    other: "Autre"
  };
  return services[serviceCode] || serviceCode;
}

function getProjectTypeName(typeCode: string): string {
  const types: { [key: string]: string } = {
    new: "Nouveau projet",
    existing: "Amélioration d'un projet existant",
    maintenance: "Maintenance",
    consulting: "Conseil"
  };
  return types[typeCode] || typeCode;
}

function getTimelineName(timelineCode: string): string {
  const timelines: { [key: string]: string } = {
    urgent: "Urgent (moins de 2 semaines)",
    soon: "Rapide (2-4 semaines)",
    normal: "Standard (1-2 mois)",
    flexible: "Flexible (plus de 2 mois)"
  };
  return timelines[timelineCode] || timelineCode;
}

// Démarrer le serveur
serve(handler);


import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

// Define CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Interface pour le formulaire de contact
interface ContactRequest {
  name: string;
  email: string;
  phone?: string;
  budget?: string;
  message: string;
}

// Fonction principale qui traite la requête
const handler = async (req: Request): Promise<Response> => {
  console.log("Début du traitement de la requête de contact");

  // Gérer les requêtes OPTIONS (preflight CORS)
  if (req.method === "OPTIONS") {
    console.log("Requête OPTIONS reçue");
    return new Response(null, {
      headers: corsHeaders,
    });
  }

  if (req.method !== "POST") {
    console.log("Méthode non autorisée:", req.method);
    return new Response(
      JSON.stringify({ success: false, error: "Méthode non autorisée" }),
      {
        status: 405,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  }

  try {
    // Récupérer les données du formulaire depuis le corps de la requête
    const data: ContactRequest = await req.json();
    console.log("Données reçues:", data);

    // Vérifier que toutes les données requises sont présentes
    if (!data.name || !data.email || !data.message) {
      console.log("Données manquantes");
      throw new Error("Tous les champs requis doivent être remplis");
    }

    // Formatez les données pour l'email
    const emailContent = `
      <h2>Nouveau message de contact de ${data.name}</h2>
      
      <h3>Informations de contact:</h3>
      <ul>
        <li><strong>Nom:</strong> ${data.name}</li>
        <li><strong>Email:</strong> ${data.email}</li>
        ${data.phone ? `<li><strong>Téléphone:</strong> ${data.phone}</li>` : ''}
        ${data.budget ? `<li><strong>Budget:</strong> ${getBudgetName(data.budget)}</li>` : ''}
      </ul>
      
      <h3>Message:</h3>
      <p>${data.message.replace(/\n/g, '<br>')}</p>
    `;

    // Utiliser Resend pour envoyer l'email
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!resendApiKey) {
      console.error("RESEND_API_KEY is not set");
      throw new Error("Configuration du serveur d'email manquante");
    }

    console.log("Envoi de l'email avec Resend...");
    const resend = new Resend(resendApiKey);
    const { data: emailData, error } = await resend.emails.send({
      from: "Pionexia Contact <onboarding@resend.dev>",
      to: ["pdg.pionexia@gmail.com"],
      subject: `Nouveau message de contact de ${data.name}`,
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
        message: "Message envoyé avec succès" 
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
    console.error("Erreur lors de l'envoi du message:", error.message);
    
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

// Fonction auxiliaire pour obtenir le nom lisible du budget
function getBudgetName(budgetCode: string): string {
  const budgets: { [key: string]: string } = {
    "less-5k": "Moins de 5 000€",
    "5k-10k": "5 000€ - 10 000€",
    "10k-25k": "10 000€ - 25 000€",
    "25k-50k": "25 000€ - 50 000€",
    "more-50k": "Plus de 50 000€"
  };
  return budgets[budgetCode] || budgetCode;
}

// Démarrer le serveur
serve(handler);

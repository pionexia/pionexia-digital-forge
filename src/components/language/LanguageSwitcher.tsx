
import { Button } from "@/components/ui/button";
import { useLanguage } from "./LanguageProvider";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center space-x-1 text-sm">
      <Button
        variant={language === "fr" ? "default" : "ghost"}
        size="sm"
        className={`px-2 h-8 text-xs ${
          language === "fr"
            ? "bg-pionexia-blue hover:bg-pionexia-blue/90"
            : ""
        }`}
        onClick={() => setLanguage("fr")}
      >
        FR
      </Button>
      <Button
        variant={language === "en" ? "default" : "ghost"}
        size="sm"
        className={`px-2 h-8 text-xs ${
          language === "en"
            ? "bg-pionexia-blue hover:bg-pionexia-blue/90"
            : ""
        }`}
        onClick={() => setLanguage("en")}
      >
        EN
      </Button>
    </div>
  );
}

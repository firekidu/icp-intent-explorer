import { useState, useEffect, useCallback } from "react";
import { Sparkles, Globe, Target, Loader2, Lightbulb, ArrowRight } from "lucide-react";
import { CountrySelector } from "./CountrySelector";
import { CharacterCountTextarea } from "./CharacterCountTextarea";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
const STORAGE_KEY = "icp-generator-draft";
interface FormData {
  companyUrl: string;
  productDetails: string;
  selectedCountries: string[];
}
const defaultFormData: FormData = {
  companyUrl: "",
  productDetails: "",
  selectedCountries: []
};
const exampleData: FormData = {
  companyUrl: "https://slack.com",
  productDetails: "Enterprise team collaboration platform featuring real-time messaging, file sharing, and integrations with 2,500+ business tools. Key benefits include reduced email overload, streamlined workflows, and centralized team communication. Ideal for remote and hybrid teams seeking improved productivity and collaboration.",
  selectedCountries: ["US", "GB", "DE", "CA", "AU"]
};
export function ICPGenerator() {
  const {
    toast
  } = useToast();
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [isGeneratingICP, setIsGeneratingICP] = useState(false);

  // Load draft from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setFormData(parsed);
      } catch {
        // Ignore parse errors
      }
    }
  }, []);

  // Save draft to localStorage on changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }, [formData]);
  const formatUrl = useCallback((url: string): string => {
    let formatted = url.trim();
    if (formatted && !formatted.match(/^https?:\/\//i)) {
      formatted = `https://${formatted}`;
    }
    return formatted;
  }, []);
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      companyUrl: e.target.value
    }));
  };
  const handleUrlBlur = () => {
    if (formData.companyUrl) {
      setFormData(prev => ({
        ...prev,
        companyUrl: formatUrl(prev.companyUrl)
      }));
    }
  };
  const handleGenerateWithAI = async () => {
    if (!formData.companyUrl) {
      toast({
        title: "URL Required",
        description: "Please enter a company website to generate profile with AI.",
        variant: "destructive"
      });
      return;
    }
    setIsGeneratingAI(true);

    // Simulate AI generation (replace with actual API call)
    await new Promise(resolve => setTimeout(resolve, 2000));
    toast({
      title: "AI Analysis Complete",
      description: "Company profile has been generated. Review and customize as needed."
    });
    setFormData(prev => ({
      ...prev,
      productDetails: "AI-generated analysis: This company offers innovative solutions in their industry segment. Key products include enterprise software solutions with focus on scalability and user experience. Primary benefits include cost reduction, improved efficiency, and enhanced team collaboration."
    }));
    setIsGeneratingAI(false);
  };
  const handleGenerateICP = async () => {
    if (!formData.productDetails && !formData.companyUrl) {
      toast({
        title: "Information Required",
        description: "Please enter a company URL or describe your target products/services.",
        variant: "destructive"
      });
      return;
    }
    if (formData.selectedCountries.length === 0) {
      toast({
        title: "Markets Required",
        description: "Please select at least one target market.",
        variant: "destructive"
      });
      return;
    }
    setIsGeneratingICP(true);

    // Simulate ICP generation (replace with actual API call)
    await new Promise(resolve => setTimeout(resolve, 3000));
    toast({
      title: "ICP Generated Successfully!",
      description: "Your Ideal Customer Profile with intent data insights is ready."
    });
    setIsGeneratingICP(false);
  };
  const loadExample = () => {
    setFormData(exampleData);
    toast({
      title: "Example Loaded",
      description: "Sample data has been loaded. Feel free to modify it."
    });
  };
  const canGenerate = (formData.companyUrl || formData.productDetails) && formData.selectedCountries.length > 0;
  return <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <header className="text-center mb-10 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
            <Target className="w-4 h-4" />
            Intent Data Powered
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
            ICP Generator with Intent Data Analysis
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Generate detailed Ideal Customer Profiles enriched with real-time buying intent signals to supercharge your B2B marketing and sales efforts.
          </p>
        </header>

        {/* Main Form Card */}
        <div className="card-elevated p-6 sm:p-8 animate-fade-in" style={{
        animationDelay: "100ms"
      }}>
          {/* Company URL Section */}
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Globe className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">Your Company Website</h2>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <input type="text" value={formData.companyUrl} onChange={handleUrlChange} onBlur={handleUrlBlur} placeholder="e.g., https://example.com or example.com" className="w-full px-4 py-3 rounded-lg border border-input bg-card text-foreground input-focus-ring placeholder:text-muted-foreground" />
              </div>
              <button onClick={handleGenerateWithAI} disabled={isGeneratingAI || !formData.companyUrl} className="btn-ai whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed">
                {isGeneratingAI ? <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Analyzing...
                  </> : <>
                    <Sparkles className="w-4 h-4" />
                    Generate with AI
                  </>}
              </button>
            </div>
            <p className="section-hint">
              Enter a company URL to auto-generate their profile using AI analysis
            </p>
          </section>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-card px-4 text-sm text-muted-foreground">
                Or Specify ICP Details Manually
              </span>
            </div>
          </div>

          {/* Product Details Section */}
          <section className="mb-8">
            <label className="section-label">Your Products, Services, Key Features & Benefits</label>
            <CharacterCountTextarea value={formData.productDetails} onChange={value => setFormData(prev => ({
            ...prev,
            productDetails: value
          }))} maxLength={2000} placeholder="Describe the products/services you want to target, their key features, unique benefits, and use cases..." rows={5} />
            <p className="section-hint">
              Be specific about the value propositions and pain points you're addressing
            </p>
          </section>

          {/* Country Selection Section */}
          <section className="mb-10">
            <label className="section-label">Target Countries</label>
            <CountrySelector selectedCountries={formData.selectedCountries} onChange={countries => setFormData(prev => ({
            ...prev,
            selectedCountries: countries
          }))} />
            <p className="section-hint">
              Select the geographic markets you want to focus on for your ICP analysis
            </p>
          </section>

          {/* Generate Button */}
          <div className="flex flex-col items-center gap-4">
            <button onClick={handleGenerateICP} disabled={!canGenerate || isGeneratingICP} className="btn-generate w-full sm:w-auto">
              {isGeneratingICP ? <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating ICP & Insights...
                </> : <>
                  Generate ICP & Intent Insights
                  <ArrowRight className="w-5 h-5" />
                </>}
            </button>

            {/* Example Data Link */}
            
          </div>
        </div>

        {/* Footer Info */}
        <footer className="mt-8 text-center text-sm text-muted-foreground animate-fade-in" style={{
        animationDelay: "200ms"
      }}>
          <p>
            Your data is processed securely. Draft inputs are saved locally for your convenience.
          </p>
        </footer>
      </div>
    </div>;
}
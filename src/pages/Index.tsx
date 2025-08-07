import { useState } from "react";
import IntegrationSetup from "@/components/IntegrationSetup";

const Index = () => {
  const [showSetup, setShowSetup] = useState(false);

  const mockIntegration = {
    name: "Amazon Web Services",
    category: "Cloud Services",
    logo: "/api/placeholder/40/40",
    description: "Connect your AWS account to enable comprehensive cloud security scanning and compliance monitoring across all your AWS resources."
  };

  if (showSetup) {
    return (
      <IntegrationSetup
        integration={mockIntegration}
        onBack={() => setShowSetup(false)}
      />
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-8">
        <h1 className="text-4xl font-bold mb-4">Cybersecurity Integration Platform</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Comprehensive security monitoring and compliance management
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="/integrations"
            className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors text-center"
          >
            View All Integrations
          </a>
          
          <a 
            href="/dashboard"
            className="bg-secondary text-secondary-foreground px-6 py-3 rounded-lg hover:bg-secondary/90 transition-colors text-center"
          >
            Executive Dashboard
          </a>
          
          <button 
            onClick={() => setShowSetup(true)}
            className="border border-border bg-background hover:bg-accent hover:text-accent-foreground px-6 py-3 rounded-lg transition-colors"
          >
            Demo AWS Setup Flow
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;

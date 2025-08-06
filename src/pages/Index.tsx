import { useState } from "react";
import IntegrationSetup from "@/components/IntegrationSetup";

const Index = () => {
  const [showSetup, setShowSetup] = useState(true);

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
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Cybersecurity Integration Setup</h1>
        <p className="text-xl text-muted-foreground mb-8">Demo of AWS integration setup flow</p>
        <button 
          onClick={() => setShowSetup(true)}
          className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
        >
          View AWS Setup Flow
        </button>
      </div>
    </div>
  );
};

export default Index;

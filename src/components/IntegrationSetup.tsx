import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Shield, Cloud, AlertTriangle, CheckCircle, Key, Settings, ExternalLink } from "lucide-react";

interface IntegrationSetupProps {
  integration: {
    name: string;
    category: string;
    logo: string;
    description: string;
  };
  onBack: () => void;
}

export default function IntegrationSetup({ integration, onBack }: IntegrationSetupProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [connectionMethod, setConnectionMethod] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<"idle" | "testing" | "success" | "error">("idle");

  const steps = [
    { id: 1, title: "Authentication Method", icon: Key },
    { id: 2, title: "Configuration", icon: Settings },
    { id: 3, title: "Permissions", icon: Shield },
    { id: 4, title: "Test Connection", icon: CheckCircle }
  ];

  const permissions = [
    { id: "read-resources", label: "Read cloud resources", description: "Access to view your cloud infrastructure", required: true },
    { id: "read-configs", label: "Read security configurations", description: "Scan security settings and policies", required: true },
    { id: "read-logs", label: "Read audit logs", description: "Access to security and audit logs", required: false },
    { id: "manage-policies", label: "Manage security policies", description: "Create and modify security policies", required: false }
  ];

  const testConnection = async () => {
    setIsConnecting(true);
    setConnectionStatus("testing");
    
    // Simulate connection test
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setConnectionStatus("success");
    setIsConnecting(false);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Choose Authentication Method</h3>
              <p className="text-muted-foreground">Select how you want to connect to {integration.name}</p>
            </div>
            
            <Tabs value={connectionMethod} onValueChange={setConnectionMethod}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="oauth">OAuth 2.0</TabsTrigger>
                <TabsTrigger value="api-key">API Key</TabsTrigger>
                <TabsTrigger value="service-account">Service Account</TabsTrigger>
              </TabsList>
              
              <TabsContent value="oauth" className="space-y-4">
                <Alert>
                  <Shield className="h-4 w-4" />
                  <AlertDescription>
                    Recommended: OAuth provides secure, scoped access without sharing credentials
                  </AlertDescription>
                </Alert>
                <Button className="w-full" variant="outline">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Authorize with {integration.name}
                </Button>
              </TabsContent>
              
              <TabsContent value="api-key" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="api-key">API Key</Label>
                  <Input id="api-key" type="password" placeholder="Enter your API key" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="api-secret">API Secret (if required)</Label>
                  <Input id="api-secret" type="password" placeholder="Enter your API secret" />
                </div>
              </TabsContent>
              
              <TabsContent value="service-account" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="service-account-file">Service Account JSON</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <Cloud className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Drag and drop your service account file here, or click to browse
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Configuration Settings</h3>
              <p className="text-muted-foreground">Configure connection parameters for {integration.name}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="region">Region</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us-east-1">US East (N. Virginia)</SelectItem>
                    <SelectItem value="us-west-2">US West (Oregon)</SelectItem>
                    <SelectItem value="eu-west-1">Europe (Ireland)</SelectItem>
                    <SelectItem value="ap-southeast-1">Asia Pacific (Singapore)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="scan-frequency">Scan Frequency</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1h">Every hour</SelectItem>
                    <SelectItem value="6h">Every 6 hours</SelectItem>
                    <SelectItem value="24h">Daily</SelectItem>
                    <SelectItem value="168h">Weekly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="endpoint">Custom Endpoint (optional)</Label>
              <Input id="endpoint" placeholder="https://custom-endpoint.example.com" />
            </div>
            
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Ensure your {integration.name} account has the necessary permissions for security scanning
              </AlertDescription>
            </Alert>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Required Permissions</h3>
              <p className="text-muted-foreground">Review and grant the following permissions for optimal security coverage</p>
            </div>
            
            <div className="space-y-4">
              {permissions.map((permission) => (
                <div key={permission.id} className="flex items-start space-x-3 p-4 border rounded-lg">
                  <Checkbox
                    id={permission.id}
                    checked={permission.required}
                    disabled={permission.required}
                  />
                  <div className="grid gap-1.5 leading-none flex-1">
                    <div className="flex items-center gap-2">
                      <label
                        htmlFor={permission.id}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {permission.label}
                      </label>
                      {permission.required && (
                        <Badge variant="secondary" className="text-xs">Required</Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {permission.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <Alert>
              <Shield className="h-4 w-4" />
              <AlertDescription>
                All data is encrypted in transit and at rest. We follow SOC 2 Type II compliance standards.
              </AlertDescription>
            </Alert>
          </div>
        );
      
      case 4:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Test Connection</h3>
              <p className="text-muted-foreground">Verify that the integration is working correctly</p>
            </div>
            
            {connectionStatus === "idle" && (
              <Button onClick={testConnection} className="w-full" size="lg">
                Test Connection to {integration.name}
              </Button>
            )}
            
            {connectionStatus === "testing" && (
              <div className="space-y-4">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                  <p className="text-sm text-muted-foreground">Testing connection...</p>
                </div>
                <Progress value={66} className="w-full" />
              </div>
            )}
            
            {connectionStatus === "success" && (
              <div className="space-y-4">
                <Alert className="border-success">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <AlertDescription className="text-success">
                    Connection successful! Your {integration.name} integration is ready.
                  </AlertDescription>
                </Alert>
                
                <div className="p-4 bg-card border rounded-lg space-y-2">
                  <h4 className="font-medium">Connection Details</h4>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div>• Found 247 cloud resources</div>
                    <div>• Discovered 12 security configurations</div>
                    <div>• Access to 3 compliance frameworks</div>
                  </div>
                </div>
                
                <Button className="w-full" size="lg" onClick={onBack}>
                  Complete Setup
                </Button>
              </div>
            )}
            
            {connectionStatus === "error" && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Connection failed. Please check your credentials and try again.
                </AlertDescription>
              </Alert>
            )}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Integrations
              </Button>
              <div className="h-6 w-px bg-border" />
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Cloud className="h-4 w-4 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-lg font-semibold">{integration.name}</h1>
                  <p className="text-sm text-muted-foreground">{integration.category}</p>
                </div>
              </div>
            </div>
            <Badge variant="outline">{integration.category}</Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = currentStep === step.id;
                const isCompleted = currentStep > step.id;
                
                return (
                  <div key={step.id} className="flex items-center">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                      isCompleted
                        ? "bg-primary border-primary text-primary-foreground"
                        : isActive
                        ? "border-primary text-primary"
                        : "border-border text-muted-foreground"
                    }`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="ml-2 hidden sm:block">
                      <p className={`text-sm font-medium ${
                        isActive ? "text-foreground" : "text-muted-foreground"
                      }`}>
                        {step.title}
                      </p>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`w-12 h-px mx-4 ${
                        isCompleted ? "bg-primary" : "bg-border"
                      }`} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Main Content */}
          <Card>
            <CardHeader>
              <CardTitle>Step {currentStep}: {steps[currentStep - 1].title}</CardTitle>
              <CardDescription>
                {integration.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {renderStepContent()}
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
            >
              Previous
            </Button>
            <Button
              onClick={() => {
                if (currentStep === 4) {
                  onBack();
                } else {
                  setCurrentStep(Math.min(4, currentStep + 1));
                }
              }}
              disabled={(currentStep === 1 && !connectionMethod)}
            >
              {currentStep === 4 ? "Finish" : "Next"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
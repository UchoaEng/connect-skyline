import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Search, 
  Filter, 
  Plus, 
  Settings, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Clock,
  Cloud,
  Code,
  Shield,
  FileText,
  Users,
  Zap,
  ExternalLink,
  MoreHorizontal
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import IntegrationSetup from "@/components/IntegrationSetup";

interface Integration {
  id: string;
  name: string;
  category: string;
  description: string;
  status: "connected" | "disconnected" | "error" | "syncing";
  logo: string;
  lastSync?: string;
  resourcesFound?: number;
  isPopular?: boolean;
  isRecommended?: boolean;
  isCritical?: boolean;
}

const Integrations = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);
  const [showSetup, setShowSetup] = useState(false);

  const categories = [
    { id: "cloud", label: "Cloud Services", icon: Cloud, count: 12 },
    { id: "devops", label: "DevOps", icon: Code, count: 8 },
    { id: "identity", label: "Identity & Access", icon: Shield, count: 6 },
    { id: "siem", label: "SIEM & Logging", icon: FileText, count: 5 },
    { id: "collaboration", label: "Collaboration", icon: Users, count: 4 },
    { id: "automation", label: "Automation", icon: Zap, count: 3 }
  ];

  const integrations: Integration[] = [
    // Connected integrations
    {
      id: "aws",
      name: "Amazon Web Services",
      category: "cloud",
      description: "Comprehensive cloud security scanning across all AWS services",
      status: "connected",
      logo: "🅰️",
      lastSync: "2 minutes ago",
      resourcesFound: 247,
      isPopular: true
    },
    {
      id: "azure",
      name: "Microsoft Azure",
      category: "cloud", 
      description: "Monitor and secure your Azure cloud infrastructure",
      status: "connected",
      logo: "🅰️",
      lastSync: "5 minutes ago",
      resourcesFound: 156
    },
    {
      id: "github",
      name: "GitHub",
      category: "devops",
      description: "Code security scanning and vulnerability detection",
      status: "connected",
      logo: "🐙",
      lastSync: "1 hour ago",
      resourcesFound: 24,
      isPopular: true
    },
    {
      id: "okta",
      name: "Okta",
      category: "identity",
      description: "Identity and access management monitoring",
      status: "syncing",
      logo: "🔑",
      lastSync: "Syncing now..."
    },
    
    // Error state
    {
      id: "splunk",
      name: "Splunk",
      category: "siem",
      description: "SIEM data ingestion and security analytics",
      status: "error",
      logo: "📊",
      lastSync: "Failed 3 hours ago",
      isCritical: true
    },
    
    // Available integrations
    {
      id: "gcp",
      name: "Google Cloud Platform",
      category: "cloud",
      description: "Secure your Google Cloud resources and workloads",
      status: "disconnected",
      logo: "☁️",
      isRecommended: true
    },
    {
      id: "jenkins",
      name: "Jenkins",
      category: "devops",
      description: "CI/CD pipeline security and compliance monitoring",
      status: "disconnected",
      logo: "🔧"
    },
    {
      id: "datadog",
      name: "Datadog",
      category: "siem",
      description: "Infrastructure monitoring and security insights",
      status: "disconnected",
      logo: "🐕",
      isPopular: true
    },
    {
      id: "slack",
      name: "Slack",
      category: "collaboration",
      description: "Monitor team communications for security incidents",
      status: "disconnected",
      logo: "💬"
    },
    {
      id: "crowdstrike",
      name: "CrowdStrike",
      category: "siem",
      description: "Endpoint detection and response integration",
      status: "disconnected",
      logo: "🛡️",
      isRecommended: true,
      isCritical: true
    }
  ];

  const filteredIntegrations = integrations.filter(integration => {
    const matchesSearch = integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         integration.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || integration.category === selectedCategory;
    const matchesStatus = selectedStatus === "all" || integration.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const connectedCount = integrations.filter(i => i.status === "connected").length;
  const errorCount = integrations.filter(i => i.status === "error").length;
  const recommendedCount = integrations.filter(i => i.isRecommended && i.status === "disconnected").length;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "connected":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "error":
        return <XCircle className="h-4 w-4 text-destructive" />;
      case "syncing":
        return <Clock className="h-4 w-4 text-warning animate-pulse" />;
      default:
        return <XCircle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "connected":
        return <Badge className="bg-success/10 text-success border-success/20">Connected</Badge>;
      case "error":
        return <Badge variant="destructive">Error</Badge>;
      case "syncing":
        return <Badge className="bg-warning/10 text-warning border-warning/20">Syncing</Badge>;
      default:
        return <Badge variant="outline">Available</Badge>;
    }
  };

  if (showSetup && selectedIntegration) {
    return (
      <IntegrationSetup
        integration={selectedIntegration}
        onBack={() => {
          setShowSetup(false);
          setSelectedIntegration(null);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Integrations</h1>
              <p className="text-muted-foreground mt-1">
                Connect and manage your security tools and cloud services
              </p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Integration
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Connected</p>
                    <p className="text-2xl font-bold text-success">{connectedCount}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-success" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Errors</p>
                    <p className="text-2xl font-bold text-destructive">{errorCount}</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-destructive" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Recommended</p>
                    <p className="text-2xl font-bold text-info">{recommendedCount}</p>
                  </div>
                  <Zap className="h-8 w-8 text-info" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Available</p>
                    <p className="text-2xl font-bold">{integrations.length}</p>
                  </div>
                  <Settings className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Critical Alerts */}
        {errorCount > 0 && (
          <Alert className="mb-6 border-destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>{errorCount} integration{errorCount > 1 ? 's' : ''} require{errorCount === 1 ? 's' : ''} attention.</strong> 
              {" "}Please check your connection settings to ensure continuous security monitoring.
            </AlertDescription>
          </Alert>
        )}

        {/* Recommendations */}
        {recommendedCount > 0 && (
          <Alert className="mb-6 border-info">
            <Zap className="h-4 w-4" />
            <AlertDescription>
              <strong>We recommend connecting {recommendedCount} additional integration{recommendedCount > 1 ? 's' : ''}</strong> 
              {" "}to improve your security coverage based on your current stack.
            </AlertDescription>
          </Alert>
        )}

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search integrations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="All categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.label} ({category.count})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="All status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All status</SelectItem>
              <SelectItem value="connected">Connected</SelectItem>
              <SelectItem value="disconnected">Available</SelectItem>
              <SelectItem value="error">Error</SelectItem>
              <SelectItem value="syncing">Syncing</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Category Tabs */}
        <Tabs defaultValue="all" className="mb-6">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="all">All</TabsTrigger>
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{category.label}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>
          
          <TabsContent value="all" className="mt-6">
            <IntegrationGrid integrations={filteredIntegrations} onConnect={(integration) => {
              setSelectedIntegration(integration);
              setShowSetup(true);
            }} />
          </TabsContent>
          
          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="mt-6">
              <IntegrationGrid 
                integrations={filteredIntegrations.filter(i => i.category === category.id)} 
                onConnect={(integration) => {
                  setSelectedIntegration(integration);
                  setShowSetup(true);
                }}
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

interface IntegrationGridProps {
  integrations: Integration[];
  onConnect: (integration: Integration) => void;
}

const IntegrationGrid = ({ integrations, onConnect }: IntegrationGridProps) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "connected":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "error":
        return <XCircle className="h-4 w-4 text-destructive" />;
      case "syncing":
        return <Clock className="h-4 w-4 text-warning animate-pulse" />;
      default:
        return <XCircle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "connected":
        return <Badge className="bg-success/10 text-success border-success/20">Connected</Badge>;
      case "error":
        return <Badge variant="destructive">Error</Badge>;
      case "syncing":
        return <Badge className="bg-warning/10 text-warning border-warning/20">Syncing</Badge>;
      default:
        return <Badge variant="outline">Available</Badge>;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {integrations.map((integration) => (
        <Card key={integration.id} className="relative group hover:shadow-lg transition-shadow">
          {integration.isRecommended && (
            <div className="absolute -top-2 -right-2 z-10">
              <Badge className="bg-info text-info-foreground">Recommended</Badge>
            </div>
          )}
          
          {integration.isCritical && integration.status === "disconnected" && (
            <div className="absolute -top-2 -left-2 z-10">
              <Badge variant="destructive">Critical</Badge>
            </div>
          )}
          
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">{integration.logo}</div>
                <div>
                  <CardTitle className="text-base">{integration.name}</CardTitle>
                  {integration.isPopular && (
                    <Badge variant="outline" className="text-xs mt-1">Popular</Badge>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {getStatusIcon(integration.status)}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {integration.status === "connected" ? (
                      <>
                        <DropdownMenuItem>
                          <Settings className="mr-2 h-4 w-4" />
                          Configure
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <ExternalLink className="mr-2 h-4 w-4" />
                          View Logs
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Disconnect
                        </DropdownMenuItem>
                      </>
                    ) : (
                      <>
                        <DropdownMenuItem onClick={() => onConnect(integration)}>
                          Connect
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Learn More
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <CardDescription className="mb-4">
              {integration.description}
            </CardDescription>
            
            <div className="flex items-center justify-between">
              {getStatusBadge(integration.status)}
              
              {integration.status === "connected" ? (
                <div className="text-sm text-muted-foreground">
                  {integration.resourcesFound && (
                    <span>{integration.resourcesFound} resources • </span>
                  )}
                  {integration.lastSync}
                </div>
              ) : (
                <Button 
                  size="sm" 
                  onClick={() => onConnect(integration)}
                  className="ml-auto"
                >
                  Connect
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Integrations;
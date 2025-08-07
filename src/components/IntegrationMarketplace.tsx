import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Download, Users, Shield, Clock, ExternalLink, Search, Filter } from "lucide-react";

interface MarketplaceIntegration {
  id: string;
  name: string;
  category: string;
  description: string;
  rating: number;
  reviews: number;
  downloads: number;
  logo: string;
  vendor: string;
  isFeatured?: boolean;
  isVerified?: boolean;
  pricing: "free" | "paid" | "freemium";
  lastUpdated: string;
}

const marketplaceIntegrations: MarketplaceIntegration[] = [
  {
    id: "aws-security-hub",
    name: "AWS Security Hub",
    category: "cloud",
    description: "Comprehensive security posture management for AWS environments",
    rating: 4.8,
    reviews: 1243,
    downloads: 45000,
    logo: "🛡️",
    vendor: "Amazon Web Services",
    isFeatured: true,
    isVerified: true,
    pricing: "paid",
    lastUpdated: "2 days ago"
  },
  {
    id: "kubernetes-scanner",
    name: "Kubernetes Security Scanner",
    category: "devops",
    description: "Runtime security monitoring for Kubernetes clusters",
    rating: 4.6,
    reviews: 856,
    downloads: 23000,
    logo: "☸️",
    vendor: "CNCF Community",
    isVerified: true,
    pricing: "free",
    lastUpdated: "1 week ago"
  },
  {
    id: "compliance-automation",
    name: "Compliance Automation Suite",
    category: "governance",
    description: "Automate compliance reporting for SOC2, GDPR, HIPAA",
    rating: 4.9,
    reviews: 432,
    downloads: 12000,
    logo: "📋",
    vendor: "SecureCompliance Inc.",
    isFeatured: true,
    isVerified: true,
    pricing: "freemium",
    lastUpdated: "3 days ago"
  },
  {
    id: "threat-intel-feed",
    name: "Threat Intelligence Feed",
    category: "siem",
    description: "Real-time threat intelligence from multiple sources",
    rating: 4.4,
    reviews: 678,
    downloads: 34000,
    logo: "🎯",
    vendor: "ThreatWatch",
    pricing: "paid",
    lastUpdated: "5 days ago"
  }
];

export default function IntegrationMarketplace() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [pricingFilter, setPricingFilter] = useState("all");
  const [sortBy, setSortBy] = useState("popularity");

  const filteredIntegrations = marketplaceIntegrations.filter(integration => {
    const matchesSearch = integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         integration.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || integration.category === categoryFilter;
    const matchesPricing = pricingFilter === "all" || integration.pricing === pricingFilter;
    
    return matchesSearch && matchesCategory && matchesPricing;
  });

  const sortedIntegrations = [...filteredIntegrations].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating;
      case "downloads":
        return b.downloads - a.downloads;
      case "recent":
        return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
      default:
        return b.downloads - a.downloads; // popularity
    }
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ));
  };

  const getPricingBadge = (pricing: string) => {
    switch (pricing) {
      case "free":
        return <Badge className="bg-green-100 text-green-800">Free</Badge>;
      case "paid":
        return <Badge className="bg-blue-100 text-blue-800">Paid</Badge>;
      case "freemium":
        return <Badge className="bg-purple-100 text-purple-800">Freemium</Badge>;
      default:
        return <Badge variant="outline">{pricing}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Integration Marketplace</h1>
          <p className="text-muted-foreground">Discover and install security integrations from our community</p>
        </div>
      </div>

      {/* Featured Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Featured Integrations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {marketplaceIntegrations.filter(i => i.isFeatured).map((integration) => (
            <Card key={integration.id} className="relative">
              <div className="absolute top-4 right-4">
                <Badge className="bg-yellow-100 text-yellow-800">Featured</Badge>
              </div>
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{integration.logo}</div>
                  <div>
                    <CardTitle className="text-base flex items-center gap-2">
                      {integration.name}
                      {integration.isVerified && <Shield className="h-4 w-4 text-green-500" />}
                    </CardTitle>
                    <CardDescription className="text-sm">{integration.vendor}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{integration.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    {renderStars(integration.rating)}
                    <span className="text-sm text-muted-foreground ml-2">
                      {integration.rating} ({integration.reviews})
                    </span>
                  </div>
                  {getPricingBadge(integration.pricing)}
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Download className="h-4 w-4" />
                    <span>{integration.downloads.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{integration.lastUpdated}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" className="flex-1">Install</Button>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            placeholder="Search integrations..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="cloud">Cloud</SelectItem>
            <SelectItem value="devops">DevOps</SelectItem>
            <SelectItem value="siem">SIEM</SelectItem>
            <SelectItem value="governance">Governance</SelectItem>
          </SelectContent>
        </Select>
        <Select value={pricingFilter} onValueChange={setPricingFilter}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Pricing" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Pricing</SelectItem>
            <SelectItem value="free">Free</SelectItem>
            <SelectItem value="freemium">Freemium</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="popularity">Popularity</SelectItem>
            <SelectItem value="rating">Rating</SelectItem>
            <SelectItem value="downloads">Downloads</SelectItem>
            <SelectItem value="recent">Recently Updated</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* All Integrations */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">All Integrations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedIntegrations.map((integration) => (
            <Card key={integration.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{integration.logo}</div>
                  <div>
                    <CardTitle className="text-base flex items-center gap-2">
                      {integration.name}
                      {integration.isVerified && <Shield className="h-4 w-4 text-green-500" />}
                    </CardTitle>
                    <CardDescription className="text-sm">{integration.vendor}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{integration.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    {renderStars(integration.rating)}
                    <span className="text-sm text-muted-foreground ml-2">
                      {integration.rating} ({integration.reviews})
                    </span>
                  </div>
                  {getPricingBadge(integration.pricing)}
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Download className="h-4 w-4" />
                    <span>{integration.downloads.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{integration.lastUpdated}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" className="flex-1">Install</Button>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
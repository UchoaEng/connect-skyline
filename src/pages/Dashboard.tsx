import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { Shield, AlertTriangle, CheckCircle, TrendingUp, Cloud, Users, Lock, Eye, Target, Zap } from "lucide-react";

const securityMetrics = [
  { name: "Critical", value: 12, color: "#ef4444", percentage: 15 },
  { name: "High", value: 28, color: "#f97316", percentage: 35 },
  { name: "Medium", value: 45, color: "#eab308", percentage: 30 },
  { name: "Low", value: 89, color: "#22c55e", percentage: 20 }
];

const complianceData = [
  { framework: "SOC 2", score: 92, status: "compliant" },
  { framework: "GDPR", score: 88, status: "compliant" },
  { framework: "HIPAA", score: 76, status: "needs-attention" },
  { framework: "ISO 27001", score: 94, status: "compliant" },
  { framework: "PCI DSS", score: 82, status: "compliant" }
];

const integrationHealth = [
  { day: "Mon", healthy: 45, issues: 3 },
  { day: "Tue", healthy: 47, issues: 1 },
  { day: "Wed", healthy: 48, issues: 0 },
  { day: "Thu", healthy: 46, issues: 2 },
  { day: "Fri", healthy: 48, issues: 0 },
  { day: "Sat", healthy: 48, issues: 0 },
  { day: "Sun", healthy: 48, issues: 0 }
];

const riskTrends = [
  { month: "Jul", critical: 18, high: 32, medium: 42 },
  { month: "Aug", critical: 15, high: 28, medium: 38 },
  { month: "Sep", critical: 12, high: 25, medium: 35 },
  { month: "Oct", critical: 9, high: 22, medium: 32 },
  { month: "Nov", critical: 12, high: 28, medium: 45 },
  { month: "Dec", critical: 8, high: 20, medium: 40 }
];

export default function Dashboard() {
  const totalFindings = securityMetrics.reduce((sum, metric) => sum + metric.value, 0);
  const criticalFindings = securityMetrics.find(m => m.name === "Critical")?.value || 0;
  const riskReduction = 24; // percentage

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Executive Security Dashboard</h1>
          <p className="text-muted-foreground">Real-time visibility into your security posture</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-green-600 border-green-600">
            <CheckCircle className="h-3 w-3 mr-1" />
            All Systems Operational
          </Badge>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Security Score</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">87/100</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              +5 points from last month
            </div>
            <Progress value={87} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Integrations</CardTitle>
            <Cloud className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">48</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <CheckCircle className="h-3 w-3 mr-1 text-green-500" />
              46 healthy, 2 with issues
            </div>
            <Progress value={96} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Findings</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{criticalFindings}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500 rotate-180" />
              -33% from last week
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {totalFindings} total findings
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Risk Reduction</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{riskReduction}%</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <Zap className="h-3 w-3 mr-1 text-green-500" />
              This quarter
            </div>
            <Progress value={riskReduction} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="integrations">Integration Health</TabsTrigger>
          <TabsTrigger value="trends">Risk Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Findings by Severity</CardTitle>
                <CardDescription>Current security posture across all integrations</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={securityMetrics}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label
                    >
                      {securityMetrics.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Risk Trends (6 Months)</CardTitle>
                <CardDescription>Critical and high severity findings over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={riskTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="critical" stroke="#ef4444" strokeWidth={3} />
                    <Line type="monotone" dataKey="high" stroke="#f97316" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Critical Security Alerts</CardTitle>
              <CardDescription>Items requiring immediate attention</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert className="border-red-200 bg-red-50">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">
                  <strong>High Risk:</strong> 3 publicly accessible S3 buckets detected in AWS production environment
                </AlertDescription>
              </Alert>
              <Alert className="border-orange-200 bg-orange-50">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
                <AlertDescription className="text-orange-800">
                  <strong>Medium Risk:</strong> Okta MFA not enforced for 12 administrative users
                </AlertDescription>
              </Alert>
              <Alert className="border-yellow-200 bg-yellow-50">
                <Eye className="h-4 w-4 text-yellow-600" />
                <AlertDescription className="text-yellow-800">
                  <strong>Monitoring:</strong> Unusual login patterns detected across 5 GitHub repositories
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {complianceData.map((framework) => (
              <Card key={framework.framework}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {framework.framework}
                    <Badge variant={framework.status === "compliant" ? "default" : "secondary"}>
                      {framework.status === "compliant" ? "Compliant" : "Needs Attention"}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-2">{framework.score}%</div>
                  <Progress value={framework.score} className="mb-2" />
                  <div className="text-sm text-muted-foreground">
                    {framework.status === "compliant" ? 
                      "All requirements met" : 
                      `${100 - framework.score}% gap to compliance`
                    }
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Integration Health (7 Days)</CardTitle>
              <CardDescription>Daily health status of all connected integrations</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={integrationHealth}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="healthy" stackId="a" fill="#22c55e" />
                  <Bar dataKey="issues" stackId="a" fill="#ef4444" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Risk Trends</CardTitle>
              <CardDescription>6-month trend analysis of security findings</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={riskTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="critical" stackId="a" fill="#ef4444" />
                  <Bar dataKey="high" stackId="a" fill="#f97316" />
                  <Bar dataKey="medium" stackId="a" fill="#eab308" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
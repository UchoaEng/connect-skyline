import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, Download, RefreshCw, AlertTriangle, CheckCircle, Clock, Shield } from "lucide-react";

const logs = [
  { id: 1, timestamp: "2024-01-15 09:23:14", integration: "AWS", action: "Connection established", status: "success", user: "admin@company.com", details: "OAuth authentication successful" },
  { id: 2, timestamp: "2024-01-15 09:15:32", integration: "Azure", action: "Sync completed", status: "success", user: "system", details: "247 resources scanned" },
  { id: 3, timestamp: "2024-01-15 08:45:21", integration: "Okta", action: "Configuration updated", status: "warning", user: "security@company.com", details: "Permissions scope modified" },
  { id: 4, timestamp: "2024-01-15 08:30:15", integration: "Jira", action: "Connection failed", status: "error", user: "admin@company.com", details: "Invalid API key" },
  { id: 5, timestamp: "2024-01-15 07:12:03", integration: "Splunk", action: "Data ingestion", status: "success", user: "system", details: "1.2M events processed" },
];

const auditEvents = [
  { id: 1, timestamp: "2024-01-15 10:15:30", event: "Integration Added", integration: "GitHub", user: "admin@company.com", impact: "high" },
  { id: 2, timestamp: "2024-01-15 09:45:22", event: "Permissions Modified", integration: "AWS", user: "security@company.com", impact: "medium" },
  { id: 3, timestamp: "2024-01-15 08:30:11", event: "Integration Disabled", integration: "ServiceNow", user: "admin@company.com", impact: "low" },
];

export default function Logs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [integrationFilter, setIntegrationFilter] = useState("all");

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success": return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "error": return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case "warning": return <Clock className="h-4 w-4 text-yellow-500" />;
      default: return <Shield className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: { [key: string]: "default" | "destructive" | "secondary" | "outline" } = {
      success: "default",
      error: "destructive", 
      warning: "secondary",
    };
    return <Badge variant={variants[status] || "outline"}>{status}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Logs & Audit Trail</h1>
          <p className="text-muted-foreground">Monitor integration activities and security events</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="activity" className="space-y-6">
        <TabsList>
          <TabsTrigger value="activity">Activity Logs</TabsTrigger>
          <TabsTrigger value="audit">Audit Trail</TabsTrigger>
          <TabsTrigger value="errors">Error Logs</TabsTrigger>
        </TabsList>

        <div className="flex items-center space-x-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Search logs..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="success">Success</SelectItem>
              <SelectItem value="error">Error</SelectItem>
              <SelectItem value="warning">Warning</SelectItem>
            </SelectContent>
          </Select>
          <Select value={integrationFilter} onValueChange={setIntegrationFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Integration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Integrations</SelectItem>
              <SelectItem value="aws">AWS</SelectItem>
              <SelectItem value="azure">Azure</SelectItem>
              <SelectItem value="okta">Okta</SelectItem>
              <SelectItem value="jira">Jira</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Integration Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Integration</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {logs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="font-mono text-sm">{log.timestamp}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{log.integration}</Badge>
                      </TableCell>
                      <TableCell>{log.action}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(log.status)}
                          {getStatusBadge(log.status)}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{log.user}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{log.details}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Audit Trail
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Event</TableHead>
                    <TableHead>Integration</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Impact</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {auditEvents.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell className="font-mono text-sm">{event.timestamp}</TableCell>
                      <TableCell>{event.event}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{event.integration}</Badge>
                      </TableCell>
                      <TableCell className="text-sm">{event.user}</TableCell>
                      <TableCell>
                        <Badge variant={event.impact === "high" ? "destructive" : event.impact === "medium" ? "secondary" : "outline"}>
                          {event.impact}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="errors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                Error Logs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Integration</TableHead>
                    <TableHead>Error</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {logs.filter(log => log.status === "error" || log.status === "warning").map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="font-mono text-sm">{log.timestamp}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{log.integration}</Badge>
                      </TableCell>
                      <TableCell>{log.details}</TableCell>
                      <TableCell>
                        {getStatusBadge(log.status)}
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">Retry</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
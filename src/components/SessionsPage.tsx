import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Users, Activity, Clock, Search, Filter, XCircle, Monitor, Smartphone, Globe } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useLanguage } from "../lib/LanguageContext";
import { MetricCard } from "./MetricCard";

interface Session {
  userId: string;
  name: string;
  email: string;
  loginTime: string;
  ipAddress: string;
  device: string;
  browser: string;
  status: "online" | "offline" | "idle";
  location?: string;
  lastActivity: string;
}

export function SessionsPage() {
  const { t } = useLanguage();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    // Load sessions from localStorage
    const storedSessions = localStorage.getItem("sofia_sessions");
    if (storedSessions) {
      const parsedSessions = JSON.parse(storedSessions);
      setSessions(parsedSessions);
    }
  }, []);

  const metrics = [
    {
      title: t.sessions.activeSessions,
      value: sessions.filter((s) => s.status === "online").length.toString(),
      change: `${sessions.length} ${t.sessions.totalUsers.toLowerCase()}`,
      icon: Activity,
      trend: "neutral" as const,
    },
    {
      title: t.sessions.onlineNow,
      value: sessions.filter((s) => s.status === "online").length.toString(),
      change: `${((sessions.filter((s) => s.status === "online").length / Math.max(sessions.length, 1)) * 100).toFixed(0)}%`,
      icon: Users,
      trend: "up" as const,
    },
    {
      title: t.sessions.totalUsers,
      value: sessions.length.toString(),
      change: `+${sessions.length} ${t.overview.fromLastWeek}`,
      icon: Users,
      trend: "up" as const,
    },
    {
      title: t.sessions.sessionDuration,
      value: "24m",
      change: "promedio",
      icon: Clock,
      trend: "neutral" as const,
    },
  ];

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500/10 text-green-600 dark:text-green-400";
      case "idle":
        return "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400";
      case "offline":
        return "bg-gray-500/10 text-gray-600 dark:text-gray-400";
      default:
        return "";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "online":
        return t.sessions.online;
      case "idle":
        return t.sessions.idle;
      case "offline":
        return t.sessions.offline;
      default:
        return status;
    }
  };

  const getDeviceIcon = (device: string) => {
    if (device.toLowerCase().includes("mobile")) {
      return <Smartphone className="w-4 h-4" />;
    }
    return <Monitor className="w-4 h-4" />;
  };

  const formatLoginTime = (loginTime: string) => {
    const date = new Date(loginTime);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 60) {
      return `${diffMins}m`;
    } else if (diffMins < 1440) {
      return `${Math.floor(diffMins / 60)}h`;
    } else {
      return `${Math.floor(diffMins / 1440)}d`;
    }
  };

  const handleEndSession = (userId: string) => {
    const updatedSessions = sessions.filter((s) => s.userId !== userId);
    setSessions(updatedSessions);
    localStorage.setItem("sofia_sessions", JSON.stringify(updatedSessions));
  };

  const filteredSessions = sessions.filter((session) => {
    const matchesSearch =
      session.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || session.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl text-foreground">{t.sessions.title}</h2>
          <p className="text-muted-foreground mt-1">{t.sessions.subtitle}</p>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <MetricCard key={metric.title} {...metric} />
        ))}
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder={`${t.common.search} ${t.sessions.userName.toLowerCase()}...`}
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-full sm:w-48">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder={t.sessions.filterByStatus} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t.sessions.allSessions}</SelectItem>
              <SelectItem value="online">{t.sessions.online}</SelectItem>
              <SelectItem value="idle">{t.sessions.idle}</SelectItem>
              <SelectItem value="offline">{t.sessions.offline}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Sessions List */}
      {filteredSessions.length === 0 ? (
        <Card className="p-12 text-center">
          <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-foreground">No hay sesiones activas</p>
          <p className="text-sm text-muted-foreground mt-1">
            Las sesiones aparecerán aquí cuando los usuarios inicien sesión
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredSessions.map((session, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white">
                    {session.name.charAt(0).toUpperCase()}
                  </span>
                </div>

                <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4">
                  {/* User Info */}
                  <div className="lg:col-span-3">
                    <div className="flex items-start justify-between mb-1">
                      <div>
                        <h4 className="text-foreground">{session.name}</h4>
                        <p className="text-sm text-muted-foreground">{session.email}</p>
                      </div>
                    </div>
                    <Badge className={`mt-2 ${getStatusBadgeClass(session.status)}`}>
                      <div className="w-1.5 h-1.5 rounded-full bg-current mr-1.5" />
                      {getStatusLabel(session.status)}
                    </Badge>
                  </div>

                  {/* Login Time */}
                  <div className="lg:col-span-2">
                    <p className="text-xs text-muted-foreground mb-1">{t.sessions.loginTime}</p>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <p className="text-sm text-foreground">
                        {formatLoginTime(session.loginTime)} ago
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(session.loginTime).toLocaleString()}
                    </p>
                  </div>

                  {/* Device Info */}
                  <div className="lg:col-span-3">
                    <p className="text-xs text-muted-foreground mb-1">{t.sessions.device}</p>
                    <div className="flex items-center gap-2 mb-1">
                      {getDeviceIcon(session.device)}
                      <p className="text-sm text-foreground">{session.browser}</p>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">
                      {session.device.substring(0, 50)}...
                    </p>
                  </div>

                  {/* Location & IP */}
                  <div className="lg:col-span-2">
                    <p className="text-xs text-muted-foreground mb-1">{t.sessions.ipAddress}</p>
                    <div className="flex items-center gap-2 mb-1">
                      <Globe className="w-4 h-4 text-muted-foreground" />
                      <p className="text-sm text-foreground">{session.ipAddress}</p>
                    </div>
                    {session.location && (
                      <p className="text-xs text-muted-foreground">{session.location}</p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="lg:col-span-2 flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-1 text-destructive hover:text-destructive"
                      onClick={() => handleEndSession(session.userId)}
                    >
                      <XCircle className="w-4 h-4" />
                      {t.sessions.endSession}
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

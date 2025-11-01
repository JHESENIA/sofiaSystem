import { useState } from "react";
import {
  LanguageProvider,
  useLanguage,
} from "./lib/LanguageContext";
import { AuthProvider, useAuth } from "./lib/AuthContext";
import { DashboardLayout } from "./components/DashboardLayout";
import { OverviewPage } from "./components/OverviewPage";
import { AgentConfigPage } from "./components/AgentConfigPage";
import { ConversationsPage } from "./components/ConversationsPage";
import { AnalyticsPage } from "./components/AnalyticsPage";
import { ApiKeysPage } from "./components/ApiKeysPage";
import { TagsPage } from "./components/TagsPage";
import { SessionsPage } from "./components/SessionsPage";
import { LoginPage } from "./components/LoginPage";
import { RegisterPage } from "./components/RegisterPage";

function AppContent() {
  const [currentPage, setCurrentPage] = useState("overview");
  const [authView, setAuthView] = useState<"login" | "register">("login");
  const { t } = useLanguage();
  const { isAuthenticated } = useAuth();

  // If not authenticated, show login/register
  if (!isAuthenticated) {
    if (authView === "login") {
      return <LoginPage onSwitchToRegister={() => setAuthView("register")} />;
    } else {
      return <RegisterPage onSwitchToLogin={() => setAuthView("login")} />;
    }
  }

  const renderPage = () => {
    switch (currentPage) {
      case "overview":
        return <OverviewPage />;
      case "agent":
        return <AgentConfigPage />;
      case "conversations":
        return <ConversationsPage />;
      case "analytics":
        return <AnalyticsPage />;
      case "api":
        return <ApiKeysPage />;
      case "tags":
        return <TagsPage />;
      case "sessions":
        return <SessionsPage />;
      default:
        return <OverviewPage />;
    }
  };

  return (
    <DashboardLayout
      currentPage={currentPage}
      onNavigate={setCurrentPage}
    >
      {renderPage()}
    </DashboardLayout>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </AuthProvider>
  );
}
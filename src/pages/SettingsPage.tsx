import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SettingsSidebar from "@/components/settings/SettingsSidebar";
import SettingsContent from "@/components/settings/SettingsContent";

const SettingsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>(
    location.pathname.split("/").pop() || "api-keys",
  );

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    navigate(`/settings/${tab}`);
  };

  return (
    <div className="flex h-screen bg-white">
      <SettingsSidebar />
      <SettingsContent activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
};

export default SettingsPage;

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ApiKeysPanel from "./ApiKeysPanel";
import { User, Bell, Key, Shield, UserCog } from "lucide-react";

interface SettingsContentProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const SettingsContent = ({
  activeTab = "api-keys",
  onTabChange = () => {},
}: SettingsContentProps) => {
  const [currentTab, setCurrentTab] = useState(activeTab);

  const handleTabChange = (value: string) => {
    setCurrentTab(value);
    onTabChange(value);
  };

  return (
    <div className="bg-gray-50 flex-1 min-h-screen p-6">
      <div className="max-w-5xl mx-auto">
        <Tabs
          value={currentTab}
          onValueChange={handleTabChange}
          className="w-full"
        >
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Settings</h1>
            <p className="text-gray-500">
              Manage your account settings and preferences
            </p>
          </div>

          <TabsList className="grid grid-cols-5 w-full mb-8">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User size={16} />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="flex items-center gap-2"
            >
              <Bell size={16} />
              <span className="hidden sm:inline">Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="api-keys" className="flex items-center gap-2">
              <Key size={16} />
              <span className="hidden sm:inline">API Keys</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield size={16} />
              <span className="hidden sm:inline">Security</span>
            </TabsTrigger>
            <TabsTrigger value="account" className="flex items-center gap-2">
              <UserCog size={16} />
              <span className="hidden sm:inline">Account</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="mt-0">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold mb-6">Profile Settings</h2>
              <p className="text-gray-500">
                This is where profile settings would be displayed. Update your
                name, email, and profile picture.
              </p>
              {/* Profile settings content would go here */}
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="mt-0">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold mb-6">
                Notification Preferences
              </h2>
              <p className="text-gray-500">
                This is where notification settings would be displayed. Manage
                email, push, and in-app notifications.
              </p>
              {/* Notification settings content would go here */}
            </div>
          </TabsContent>

          <TabsContent value="api-keys" className="mt-0">
            <ApiKeysPanel />
          </TabsContent>

          <TabsContent value="security" className="mt-0">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold mb-6">Security Settings</h2>
              <p className="text-gray-500">
                This is where security settings would be displayed. Manage
                password, two-factor authentication, and session management.
              </p>
              {/* Security settings content would go here */}
            </div>
          </TabsContent>

          <TabsContent value="account" className="mt-0">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold mb-6">Account Management</h2>
              <p className="text-gray-500">
                This is where account management settings would be displayed.
                Manage billing, subscription, and account deletion.
              </p>
              {/* Account settings content would go here */}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SettingsContent;

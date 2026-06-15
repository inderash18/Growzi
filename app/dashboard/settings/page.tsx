"use client";

import { useState } from "react";
import { Settings, Save, Lock, Bell, Eye, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input, Label, Select } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast";

export default function StudentSettingsPage() {
  const { toast } = useToast();
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [ticketAlerts, setTicketAlerts] = useState(true);
  const [publicProfile, setPublicProfile] = useState(true);
  const [themeMode, setThemeMode] = useState("DARK");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleSavePreferences = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast("Workspace preferences updated successfully", "success");
    }, 800);
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) {
      toast("Please complete all password fields", "error");
      return;
    }
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setCurrentPassword("");
      setNewPassword("");
      toast("Password credentials modified successfully", "success");
    }, 1000);
  };

  return (
    <div className="space-y-6 animate-fade-in relative z-10 pb-16">
      
      {/* Header */}
      <div className="border-b border-zinc-900 pb-5 select-none">
        <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
          <Settings className="h-6 w-6 text-indigo-500" />
          Workspace Settings
        </h1>
        <p className="text-xs text-zinc-500 mt-1 font-normal">
          Configure security flags, email notifications, theme preferences, and credentials.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left pane: Preferences Form */}
        <div className="lg:col-span-7 space-y-6">
          
          <Card className="bg-zinc-900/10">
            <CardHeader className="border-b border-zinc-900/40 select-none pb-4">
              <span className="text-[10px] font-bold text-zinc-550 uppercase tracking-widest block flex items-center gap-1.5">
                <Bell className="h-4 w-4 text-indigo-400" /> Notification & View Options
              </span>
            </CardHeader>
            <CardContent className="p-6 space-y-5">
              <form onSubmit={handleSavePreferences} className="space-y-5">
                
                <div className="flex items-center justify-between p-4 bg-zinc-950/40 border border-zinc-900 rounded-xl select-none">
                  <div>
                    <span className="text-xs font-bold text-zinc-200 block">Email Alerts</span>
                    <span className="text-[10px] text-zinc-500 block mt-0.5 font-normal">Receive updates when support tickets get replies.</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={emailAlerts}
                    onChange={(e) => setEmailAlerts(e.target.checked)}
                    className="h-4.5 w-4.5 rounded border-zinc-800 text-indigo-650 bg-zinc-950 cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-zinc-950/40 border border-zinc-900 rounded-xl select-none">
                  <div>
                    <span className="text-xs font-bold text-zinc-200 block">Doubt Notifications</span>
                    <span className="text-[10px] text-zinc-500 block mt-0.5 font-normal">Alert status updates flags inside main dashboard sidebar.</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={ticketAlerts}
                    onChange={(e) => setTicketAlerts(e.target.checked)}
                    className="h-4.5 w-4.5 rounded border-zinc-800 text-indigo-650 bg-zinc-950 cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-zinc-950/40 border border-zinc-900 rounded-xl select-none">
                  <div>
                    <span className="text-xs font-bold text-zinc-200 block">Public Portfolios Visibility</span>
                    <span className="text-[10px] text-zinc-500 block mt-0.5 font-normal">Allow search engines to index your custom resume link.</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={publicProfile}
                    onChange={(e) => setPublicProfile(e.target.checked)}
                    className="h-4.5 w-4.5 rounded border-zinc-800 text-indigo-650 bg-zinc-950 cursor-pointer"
                  />
                </div>

                <div className="pt-2 flex justify-end select-none">
                  <Button
                    type="submit"
                    variant="indigo"
                    size="sm"
                    isLoading={isSaving}
                    className="font-semibold"
                  >
                    <Save className="h-4 w-4" /> Save Preferences
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

        </div>

        {/* Right pane: Security Passcode update */}
        <div className="lg:col-span-5 space-y-6">
          
          <Card className="bg-zinc-900/10">
            <CardHeader className="border-b border-zinc-900/40 select-none pb-4">
              <span className="text-[10px] font-bold text-zinc-550 uppercase tracking-widest block flex items-center gap-1.5">
                <Lock className="h-4 w-4 text-indigo-400" /> Modify Passcode Credentials
              </span>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleUpdatePassword} className="space-y-4">
                <div>
                  <Label>Current Password</Label>
                  <Input
                    type="password"
                    required
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="••••••••"
                  />
                </div>

                <div>
                  <Label>New Security Passcode</Label>
                  <Input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                  />
                </div>

                <div className="pt-2 flex justify-end select-none">
                  <Button
                    type="submit"
                    variant="secondary"
                    size="sm"
                    isLoading={isSaving}
                    className="font-semibold"
                  >
                    Update Credentials
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

        </div>

      </div>

    </div>
  );
}

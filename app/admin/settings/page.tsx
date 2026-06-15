"use client";

import React, { useState } from "react";
import { 
  Sliders, 
  Shield, 
  Database, 
  Globe, 
  Save, 
  RefreshCw, 
  Sparkles, 
  Check, 
  Lock, 
  HardDrive 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input, Label, Textarea, Select } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast";

export default function AdminSettingsPage() {
  const { toast } = useToast();
  
  // Tab selector
  const [activeTab, setActiveTab] = useState<'GENERAL' | 'SYSTEM' | 'SECURITY'>('GENERAL');
  const [isSaving, setIsSaving] = useState(false);

  // General branding settings
  const [siteName, setSiteName] = useState("Growzi Platform");
  const [siteDescription, setSiteDescription] = useState("Premium student workspace and service hub");
  const [supportEmail, setSupportEmail] = useState("support@growzi.com");
  const [allowedDomains, setAllowedDomains] = useState("*.edu, *.ac.in, *.org");

  // System settings
  const [maxUploadSize, setMaxUploadSize] = useState("50"); // in MB
  const [allowedFileTypes, setAllowedFileTypes] = useState(".pdf, .zip, .png, .jpg, .pptx");
  const [rateLimit, setRateLimit] = useState("60"); // requests per min
  const [autoApproveBlueprints, setAutoApproveBlueprints] = useState("false");

  // Security parameters
  const [authSessionTimeout, setAuthSessionTimeout] = useState("1440"); // in mins (24 hrs)
  const [enableRecaptcha, setEnableRecaptcha] = useState("true");
  const [allowPublicBrowsing, setAllowPublicBrowsing] = useState("true");
  const [mfaRequirement, setMfaRequirement] = useState("OPTIONAL");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    setTimeout(() => {
      setIsSaving(false);
      toast("Configuration updates saved successfully", "success");
    }, 1000);
  };

  return (
    <div className="space-y-6 animate-fade-in relative z-10 pb-16">
      
      {/* Header */}
      <div className="border-b border-zinc-900 pb-5 shrink-0 select-none">
        <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
          <Sliders className="h-6 w-6 text-rose-500" />
          System Configurations
        </h1>
        <p className="text-xs text-zinc-500 mt-1 font-normal">
          Fine-tune platform metadata constraints, media upload thresholds, API access policies, and security parameters.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-zinc-900 select-none">
        <button
          onClick={() => setActiveTab('GENERAL')}
          className={`px-4 py-2.5 border-b-2 text-xs font-semibold tracking-wider uppercase transition-colors ${
            activeTab === 'GENERAL' 
              ? 'border-rose-500 text-white' 
              : 'border-transparent text-zinc-500 hover:text-zinc-300'
          }`}
        >
          General branding
        </button>
        <button
          onClick={() => setActiveTab('SYSTEM')}
          className={`px-4 py-2.5 border-b-2 text-xs font-semibold tracking-wider uppercase transition-colors ${
            activeTab === 'SYSTEM' 
              ? 'border-rose-500 text-white' 
              : 'border-transparent text-zinc-500 hover:text-zinc-300'
          }`}
        >
          Media & Storage
        </button>
        <button
          onClick={() => setActiveTab('SECURITY')}
          className={`px-4 py-2.5 border-b-2 text-xs font-semibold tracking-wider uppercase transition-colors ${
            activeTab === 'SECURITY' 
              ? 'border-rose-500 text-white' 
              : 'border-transparent text-zinc-500 hover:text-zinc-300'
          }`}
        >
          Security & Access
        </button>
      </div>

      {/* Form Container */}
      <form onSubmit={handleSave} className="space-y-6">
        {activeTab === 'GENERAL' && (
          <Card className="bg-zinc-950 border-zinc-900">
            <CardHeader className="select-none border-b border-zinc-900/60 pb-4">
              <CardTitle className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Globe className="h-4.5 w-4.5 text-indigo-400" /> Branding Parameters
              </CardTitle>
              <CardDescription className="text-[10px] text-zinc-550">
                Setup metadata identifiers displayed across students profiles and main pages layout headers.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Portal Name</Label>
                  <Input 
                    value={siteName} 
                    onChange={(e) => setSiteName(e.target.value)} 
                    placeholder="e.g. Growzi Platform" 
                    required 
                  />
                </div>
                <div>
                  <Label>Support Desk Email Address</Label>
                  <Input 
                    type="email" 
                    value={supportEmail} 
                    onChange={(e) => setSupportEmail(e.target.value)} 
                    placeholder="e.g. support@growzi.com" 
                    required 
                  />
                </div>
              </div>

              <div>
                <Label>Platform Meta Description</Label>
                <Textarea 
                  value={siteDescription} 
                  onChange={(e) => setSiteDescription(e.target.value)} 
                  placeholder="Describe your portal mission keywords..." 
                  rows={3} 
                  required
                />
              </div>

              <div>
                <Label>Allowed Institutional Email Domains (Comma separated)</Label>
                <Input 
                  value={allowedDomains} 
                  onChange={(e) => setAllowedDomains(e.target.value)} 
                  placeholder="e.g. *.edu, *.ac.in" 
                />
                <span className="block text-[9px] text-zinc-550 mt-1.5 leading-relaxed font-normal">
                  Students attempting onboarding sign up must possess email aliases conforming to these glob scopes.
                </span>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'SYSTEM' && (
          <Card className="bg-zinc-950 border-zinc-900">
            <CardHeader className="select-none border-b border-zinc-900/60 pb-4">
              <CardTitle className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <HardDrive className="h-4.5 w-4.5 text-indigo-400" /> Storage Capacity limits
              </CardTitle>
              <CardDescription className="text-[10px] text-zinc-550">
                Limit study resource archives size and setup media whitelist categories.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Maximum File Upload Size Threshold (MB)</Label>
                  <Input 
                    type="number" 
                    value={maxUploadSize} 
                    onChange={(e) => setMaxUploadSize(e.target.value)} 
                    min="1" 
                    max="500" 
                    required 
                  />
                </div>
                <div>
                  <Label>API Rate Limit (Requests/Min per user)</Label>
                  <Input 
                    type="number" 
                    value={rateLimit} 
                    onChange={(e) => setRateLimit(e.target.value)} 
                    min="10" 
                    max="1000" 
                    required 
                  />
                </div>
              </div>

              <div>
                <Label>Allowed Upload File Extensions</Label>
                <Input 
                  value={allowedFileTypes} 
                  onChange={(e) => setAllowedFileTypes(e.target.value)} 
                  placeholder="e.g. .pdf, .zip" 
                  required 
                />
              </div>

              <div>
                <Label>Auto-approve Code Blueprint Uploads</Label>
                <Select 
                  value={autoApproveBlueprints} 
                  onChange={(e) => setAutoApproveBlueprints(e.target.value)}
                >
                  <option value="true">Enable Auto-Approve (Immediate availability)</option>
                  <option value="false">Require Moderator Audit (Staged reviews)</option>
                </Select>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'SECURITY' && (
          <Card className="bg-zinc-950 border-zinc-900">
            <CardHeader className="select-none border-b border-zinc-900/60 pb-4">
              <CardTitle className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Lock className="h-4.5 w-4.5 text-indigo-400" /> Access & Security Policies
              </CardTitle>
              <CardDescription className="text-[10px] text-zinc-550">
                Setup session expiry cycles, bot protection algorithms, and client firewall permissions.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Authentication Token Max TTL (Minutes)</Label>
                  <Input 
                    type="number" 
                    value={authSessionTimeout} 
                    onChange={(e) => setAuthSessionTimeout(e.target.value)} 
                    min="15" 
                    required 
                  />
                </div>
                <div>
                  <Label>Multi-Factor Authentication (MFA)</Label>
                  <Select 
                    value={mfaRequirement} 
                    onChange={(e) => setMfaRequirement(e.target.value)}
                  >
                    <option value="OPTIONAL">Optional (User choice)</option>
                    <option value="REQUIRED">Required for Administrators</option>
                    <option value="MANDATORY_ALL">Mandatory for All Accounts</option>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 select-none">
                <div>
                  <Label>Anti-Bot Protection (Google reCAPTCHA v3)</Label>
                  <Select 
                    value={enableRecaptcha} 
                    onChange={(e) => setEnableRecaptcha(e.target.value)}
                  >
                    <option value="true">Active on Signup and Contact Forms</option>
                    <option value="false">Disabled (Not recommended)</option>
                  </Select>
                </div>
                <div>
                  <Label>Public Brochure Searching Indexing</Label>
                  <Select 
                    value={allowPublicBrowsing} 
                    onChange={(e) => setAllowPublicBrowsing(e.target.value)}
                  >
                    <option value="true">Enable guest access to study notes & projects</option>
                    <option value="false">Force authentication wall redirects</option>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Footer controls */}
        <div className="flex items-center justify-between border-t border-zinc-900 pt-5 select-none">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-zinc-900 bg-rose-950/10 text-[10px] font-bold text-rose-400">
            <Shield className="h-3.5 w-3.5" /> Authorization required to override configs
          </div>
          <Button
            type="submit"
            variant="rose"
            size="sm"
            isLoading={isSaving}
            className="font-semibold"
          >
            <Save className="h-4 w-4" /> Save System Configs
          </Button>
        </div>
      </form>
    </div>
  );
}

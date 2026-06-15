"use client";

import { useState } from "react";
import { Bell, Check, Terminal, Users, ShieldAlert, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/toast";

type NotificationItem = {
  id: string;
  title: string;
  details: string;
  category: 'SERVICES' | 'SUPPORT' | 'SYSTEM';
  isRead: boolean;
  time: string;
};

const initialNotifications: NotificationItem[] = [
  {
    id: "notif-1",
    title: "Stripe website order status reviewed",
    details: "Your order 'Carter Consulting Business Website' is reviewed and marked IN REVIEW.",
    category: "SERVICES",
    isRead: false,
    time: "2 hours ago"
  },
  {
    id: "notif-2",
    title: "Support ticket replied by Coordinator",
    details: "Instructor Sarah Miller responded to your query: CORS issues testing locally.",
    category: "SUPPORT",
    isRead: false,
    time: "1 day ago"
  },
  {
    id: "notif-3",
    title: "Portfolio builder live deployment active",
    details: "Your online CV resume portfolio alex-carter is live at growzi.com/p/alex-carter.",
    category: "SYSTEM",
    isRead: true,
    time: "3 days ago"
  }
];

export default function StudentNotificationsPage() {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);

  const handleMarkRead = (id: string) => {
    setNotifications(prev => prev.map(n => {
      if (n.id === id) return { ...n, isRead: true };
      return n;
    }));
    toast("Notification marked as read", "success");
  };

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    toast("All notifications marked as read", "success");
  };

  const handleDelete = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    toast("Notification cleared", "info");
  };

  const getCategoryIcon = (cat: NotificationItem['category']) => {
    switch(cat) {
      case 'SERVICES': return <Terminal className="h-4.5 w-4.5 text-indigo-400" />;
      case 'SUPPORT': return <Users className="h-4.5 w-4.5 text-rose-455" />;
      case 'SYSTEM': return <Sparkles className="h-4.5 w-4.5 text-amber-500" />;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in relative z-10 pb-16">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-zinc-900 pb-5 select-none">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <Bell className="h-6 w-6 text-indigo-500" />
            Notifications Center
          </h1>
          <p className="text-xs text-zinc-500 mt-1 font-normal">
            Track support ticket responses, billing invoice files reviews, and platform milestones.
          </p>
        </div>

        {notifications.some(n => !n.isRead) && (
          <Button
            onClick={handleMarkAllRead}
            variant="outline"
            size="sm"
            className="font-semibold"
          >
            <Check className="h-3.5 w-3.5" /> Mark all as read
          </Button>
        )}
      </div>

      {/* List Container */}
      <Card className="bg-zinc-900/10">
        <CardContent className="p-0 divide-y divide-zinc-900/60">
          {notifications.length > 0 ? (
            notifications.map((notif) => (
              <div 
                key={notif.id}
                className={`p-5 flex items-start justify-between gap-6 transition-all ${
                  notif.isRead ? "opacity-60 bg-transparent" : "bg-zinc-900/10"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="h-9 w-9 rounded-xl bg-zinc-950 border border-zinc-900 flex items-center justify-center shrink-0 select-none">
                    {getCategoryIcon(notif.category)}
                  </div>
                  
                  <div className="space-y-1">
                    <span className="block text-xs font-bold text-white leading-snug">
                      {notif.title}
                    </span>
                    <p className="text-[11px] text-zinc-400 font-normal leading-relaxed">
                      {notif.details}
                    </p>
                    <span className="block text-[9px] text-zinc-600 font-bold select-none pt-0.5">
                      {notif.time} &bull; {notif.category}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 select-none">
                  {!notif.isRead && (
                    <button
                      onClick={() => handleMarkRead(notif.id)}
                      className="p-1 rounded-md text-zinc-500 hover:text-emerald-450 hover:bg-emerald-950/20 transition-all cursor-pointer"
                      title="Mark as read"
                    >
                      <Check className="h-4 w-4" />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(notif.id)}
                    className="p-1 rounded-md text-zinc-500 hover:text-rose-500 hover:bg-rose-950/20 transition-all cursor-pointer"
                    title="Delete Notification"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-16 text-center select-none">
              <Bell className="h-10 w-10 text-zinc-850 mx-auto mb-4" />
              <h3 className="font-semibold text-white mb-1">Inbox completely clear</h3>
              <p className="text-xs text-zinc-550 max-w-sm mx-auto leading-relaxed">
                You do not have any alerts, messages, or milestones notifications to review.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

    </div>
  );
}

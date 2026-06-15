"use client";

import { useState, useEffect, useRef } from "react";
import { 
  Users, 
  Plus, 
  MessageSquare, 
  Send, 
  X, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Search,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input, Label, Textarea, Select } from "@/components/ui/input";

type Message = {
  id: string;
  sender: 'STUDENT' | 'ADMIN';
  senderName: string;
  message: string;
  createdAt: string;
};

type Ticket = {
  id: string;
  subject: string;
  category: 'DOUBT' | 'TECHNICAL' | 'BILLING' | 'OTHER';
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED';
  createdAt: string;
  messages: Message[];
};

const initialTickets: Ticket[] = [
  {
    id: "tkt-1",
    subject: "CORS issues when testing Stripe checkout webhook locally",
    category: "TECHNICAL",
    status: "IN_PROGRESS",
    createdAt: "2026-06-14",
    messages: [
      {
        id: "msg-1-1",
        sender: "STUDENT",
        senderName: "Alex Carter",
        message: "Hey support team! I'm getting CORS exceptions in Next.js when setting up the Stripe checkout redirect. The API router works perfectly but webhooks are blocked.",
        createdAt: "2026-06-14 10:15"
      },
      {
        id: "msg-1-2",
        sender: "ADMIN",
        senderName: "Emily (Tech Lead)",
        message: "Hi Alex! Make sure you are testing using the Stripe CLI. The CLI forwards webhooks directly to your local endpoint bypassing normal browser CORS rules. Are you running `stripe listen --forward-to localhost:3000/api/webhook`?",
        createdAt: "2026-06-14 11:30"
      },
      {
        id: "msg-1-3",
        sender: "STUDENT",
        senderName: "Alex Carter",
        message: "Oh! I was trying to manually POST to it from my frontend code without forwarding. Let me check with the Stripe CLI route.",
        createdAt: "2026-06-14 12:05"
      }
    ]
  },
  {
    id: "tkt-2",
    subject: "Explain React Server Actions state validation strategies",
    category: "DOUBT",
    status: "OPEN",
    createdAt: "2026-06-15",
    messages: [
      {
        id: "msg-2-1",
        sender: "STUDENT",
        senderName: "Alex Carter",
        message: "Can someone help clarify the difference between `useActionState` (or `useFormState` in Next 14) and client validations using Zod for client-side forms?",
        createdAt: "2026-06-15 08:30"
      }
    ]
  }
];

export default function StudentTicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets);
  const [activeTicketId, setActiveTicketId] = useState<string>("tkt-1");
  const [newTicketModalOpen, setNewTicketModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Forms
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState<'DOUBT' | 'TECHNICAL' | 'BILLING' | 'OTHER'>('DOUBT');
  const [initialMessage, setInitialMessage] = useState("");
  const [replyMessage, setReplyMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const activeTicket = tickets.find(t => t.id === activeTicketId);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when ticket messages update
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeTicket?.messages]);

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !initialMessage.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const newTicketId = "tkt-" + Date.now();
      const newTicket: Ticket = {
        id: newTicketId,
        subject: subject,
        category: category,
        status: "OPEN",
        createdAt: new Date().toISOString().split("T")[0],
        messages: [
          {
            id: "msg-" + Date.now(),
            sender: "STUDENT",
            senderName: "Alex Carter",
            message: initialMessage,
            createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]
      };

      setTickets([newTicket, ...tickets]);
      setActiveTicketId(newTicketId);
      setNewTicketModalOpen(false);
      setSubject("");
      setCategory("DOUBT");
      setInitialMessage("");
      setIsSubmitting(false);
    }, 800);
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyMessage.trim() || !activeTicketId) return;

    const userMessage: Message = {
      id: "msg-user-" + Date.now(),
      sender: "STUDENT",
      senderName: "Alex Carter",
      message: replyMessage,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedTickets = tickets.map(t => {
      if (t.id === activeTicketId) {
        return {
          ...t,
          messages: [...t.messages, userMessage],
          status: 'OPEN' as const
        };
      }
      return t;
    });

    setTickets(updatedTickets);
    setReplyMessage("");

    // Auto admin reply simulator after 2 seconds
    const targetTicketId = activeTicketId;
    setTimeout(() => {
      const adminMessage: Message = {
        id: "msg-admin-" + Date.now(),
        sender: "ADMIN",
        senderName: "Growzi Agent (AI Support)",
        message: `Thanks for the updates, Alex. I have logged this technical update inside our backend pipeline. A technical advisor will review the parameters shortly. Let us know if you have any additional logs or stack traces to provide!`,
        createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setTickets(prev => prev.map(t => {
        if (t.id === targetTicketId) {
          return {
            ...t,
            messages: [...t.messages, adminMessage],
            status: 'IN_PROGRESS' as const
          };
        }
        return t;
      }));
    }, 2000);
  };

  const getStatusColor = (status: Ticket['status']) => {
    switch(status) {
      case 'OPEN': return "bg-sky-950/40 border-sky-900/30 text-sky-400";
      case 'IN_PROGRESS': return "bg-yellow-950/20 border-yellow-900/30 text-yellow-400";
      case 'RESOLVED': return "bg-emerald-950/20 border-emerald-900/30 text-emerald-400";
    }
  };

  const getCategoryColor = (cat: Ticket['category']) => {
    switch(cat) {
      case 'DOUBT': return "bg-purple-950/20 border-purple-900/30 text-purple-400";
      case 'TECHNICAL': return "bg-indigo-950/20 border-indigo-900/30 text-indigo-400";
      case 'BILLING': return "bg-pink-950/20 border-pink-900/30 text-pink-400";
      case 'OTHER': return "bg-zinc-950/40 border-zinc-900 text-zinc-400";
    }
  };

  const filteredTickets = tickets.filter(t => 
    t.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in relative z-10 pb-16 h-[calc(100vh-8rem)] flex flex-col">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-zinc-900 pb-5 shrink-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <Users className="h-6 w-6 text-indigo-500" />
            Support Tickets & Doubts
          </h1>
          <p className="text-xs text-zinc-500 mt-1 font-normal">
            Resolve development bugs, academic questions, and service issues with our team.
          </p>
        </div>

        <div>
          <Button
            onClick={() => setNewTicketModalOpen(true)}
            variant="indigo"
            size="sm"
            className="font-semibold"
          >
            <Plus className="h-4 w-4" /> Ask Doubt / Open Ticket
          </Button>
        </div>
      </div>

      {/* Tickets Layout Grid */}
      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Side: Ticket Lists */}
        <div className="lg:col-span-5 bg-zinc-950 border border-zinc-900 rounded-2xl flex flex-col overflow-hidden">
          <div className="p-4 border-b border-zinc-900 flex gap-2 items-center shrink-0">
            <div className="relative flex-1">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-zinc-650 pointer-events-none">
                <Search className="h-3.5 w-3.5" />
              </span>
              <Input
                type="text"
                placeholder="Search ticket subject..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 py-2 rounded-xl"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-zinc-900/60 custom-scrollbar">
            {filteredTickets.length > 0 ? (
              filteredTickets.map(tkt => {
                const isActive = tkt.id === activeTicketId;
                const lastMsg = tkt.messages[tkt.messages.length - 1];
                return (
                  <button
                    key={tkt.id}
                    onClick={() => setActiveTicketId(tkt.id)}
                    className={`w-full p-4 text-left transition-all hover:bg-zinc-900/20 flex flex-col gap-2 border-l-2 cursor-pointer ${
                      isActive 
                        ? "bg-zinc-900/10 border-indigo-500" 
                        : "border-transparent"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 select-none">
                      <span className={`px-2 py-0.5 rounded-full border text-[8px] font-bold uppercase tracking-wider ${getCategoryColor(tkt.category)}`}>
                        {tkt.category}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full border text-[8px] font-semibold uppercase tracking-wider ${getStatusColor(tkt.status)}`}>
                        {tkt.status}
                      </span>
                    </div>

                    <h3 className={`font-bold text-xs truncate w-full ${isActive ? 'text-indigo-400' : 'text-zinc-200'}`}>
                      {tkt.subject}
                    </h3>

                    {lastMsg && (
                      <p className="text-[10px] text-zinc-500 line-clamp-1 italic leading-relaxed">
                        {lastMsg.sender === "ADMIN" ? "Admin: " : "You: "}{lastMsg.message}
                      </p>
                    )}

                    <span className="text-[9px] text-zinc-600 self-end select-none">
                      Opened: {tkt.createdAt}
                    </span>
                  </button>
                );
              })
            ) : (
              <div className="p-8 text-center text-zinc-600 flex flex-col items-center justify-center h-full">
                <MessageSquare className="h-8 w-8 text-zinc-800 mb-2" />
                <p className="text-xs">No tickets match your filters.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Conversation Thread */}
        <div className="lg:col-span-7 bg-zinc-950 border border-zinc-900 rounded-2xl flex flex-col overflow-hidden h-full">
          {activeTicket ? (
            <>
              {/* Active Ticket Details Header */}
              <div className="p-4 border-b border-zinc-900 bg-zinc-900/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
                <div className="overflow-hidden">
                  <h3 className="font-bold text-sm text-zinc-100 truncate leading-snug">{activeTicket.subject}</h3>
                  <div className="flex items-center gap-2 mt-1 text-[10px] text-zinc-500">
                    <span className="font-bold text-indigo-400">{activeTicket.category}</span>
                    <span>•</span>
                    <span>Created {activeTicket.createdAt}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className={`px-2.5 py-0.5 rounded-full border text-[8px] font-semibold uppercase tracking-wider ${getStatusColor(activeTicket.status)}`}>
                    {activeTicket.status}
                  </span>
                </div>
              </div>

              {/* Chat Thread Messages Box */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-zinc-950/40 custom-scrollbar">
                {activeTicket.messages.map(msg => {
                  const isUser = msg.sender === "STUDENT";
                  return (
                    <div key={msg.id} className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-1`}>
                      <div className="flex items-center gap-1.5 text-[9px] font-bold text-zinc-500">
                        <span>{msg.senderName}</span>
                        <span>•</span>
                        <span>{msg.createdAt}</span>
                      </div>

                      <div className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-xs leading-relaxed whitespace-pre-wrap ${
                        isUser 
                          ? 'bg-indigo-650 text-white rounded-tr-none border border-indigo-500/20' 
                          : 'bg-zinc-900 text-zinc-200 rounded-tl-none border border-zinc-850'
                      }`}>
                        {msg.message}
                      </div>
                    </div>
                  );
                })}
                <div ref={chatEndRef} />
              </div>

              {/* Chat Send Input Box */}
              <form onSubmit={handleSendReply} className="p-4 border-t border-zinc-900 bg-zinc-900/10 flex gap-3 items-end shrink-0">
                <Textarea
                  required
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  placeholder="Type your reply here..."
                  rows={2}
                  className="flex-1 py-2 px-3 rounded-xl"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendReply(e);
                    }
                  }}
                />
                <Button
                  type="submit"
                  variant="indigo"
                  size="sm"
                  className="h-10 w-10 p-0 rounded-xl shrink-0"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-zinc-600 p-8 text-center">
              <MessageSquare className="h-10 w-10 text-zinc-800 mb-3" />
              <h3 className="font-semibold text-zinc-350">No Ticket Selected</h3>
              <p className="text-xs max-w-xs text-zinc-500 mt-1 leading-relaxed">
                Select an active ticket from the sidebar to view dialogue lines or open a new doubt.
              </p>
            </div>
          )}
        </div>

      </div>

      {/* Doubts and Ticket Creation Modal */}
      {newTicketModalOpen && (
        <div className="fixed inset-0 bg-zinc-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-6 select-none">
          <Card className="w-full max-w-lg border-zinc-850 overflow-hidden shadow-2xl animate-scale-in">
            <CardHeader className="h-14 px-6 border-b border-zinc-900 flex flex-row items-center justify-between shrink-0">
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Ask a Doubt / Submit Request</span>
              <button onClick={() => setNewTicketModalOpen(false)} className="text-zinc-400 hover:text-white cursor-pointer p-1">
                <X className="h-5 w-5" />
              </button>
            </CardHeader>

            <form onSubmit={handleCreateTicket} className="p-6 space-y-4 max-h-[85vh] overflow-y-auto select-text">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label>Subject / Query Title</Label>
                  <Input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Next.js router hydration issue on page refresh"
                  />
                </div>

                <div className="md:col-span-2">
                  <Label>Category</Label>
                  <Select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                  >
                    <option value="DOUBT">Doubt Clearing (Academic / Coding Help)</option>
                    <option value="TECHNICAL">Technical Platform Bug</option>
                    <option value="BILLING">Billing / Service Payments</option>
                    <option value="OTHER">Other Query</option>
                  </Select>
                </div>
              </div>

              <div>
                <Label>Explain your Query in Detail</Label>
                <Textarea
                  required
                  value={initialMessage}
                  onChange={(e) => setInitialMessage(e.target.value)}
                  placeholder="Provide logs, describe steps to reproduce, or paste code snippets showing the bug details."
                  rows={5}
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 shrink-0 select-none">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setNewTicketModalOpen(false)}
                  className="font-semibold"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="indigo"
                  size="sm"
                  isLoading={isSubmitting}
                  className="font-semibold"
                >
                  Submit Doubt
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}

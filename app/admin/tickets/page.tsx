"use client";

import { useState, useRef, useEffect } from "react";
import { 
  Users, 
  MessageSquare, 
  Send, 
  Search,
  Check
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
  studentName: string;
  college: string;
  department: string;
  subject: string;
  category: 'DOUBT' | 'TECHNICAL' | 'BILLING' | 'OTHER';
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED';
  createdAt: string;
  messages: Message[];
};

const initialTickets: Ticket[] = [
  {
    id: "tkt-1",
    studentName: "Alex Carter",
    college: "Apex Engineering College",
    department: "Computer Science",
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
    studentName: "Alex Carter",
    college: "Apex Engineering College",
    department: "Computer Science",
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
  },
  {
    id: "tkt-3",
    studentName: "Liam Henderson",
    college: "State Tech University",
    department: "Information Technology",
    subject: "Trouble downloading CSE Semester 4 Question Papers zip",
    category: "TECHNICAL",
    status: "OPEN",
    createdAt: "2026-06-15",
    messages: [
      {
        id: "msg-3-1",
        sender: "STUDENT",
        senderName: "Liam Henderson",
        message: "When I hit download CSE sem 4, it shows network error download interrupted. Do we have alternate server mirrors?",
        createdAt: "2026-06-15 09:40"
      }
    ]
  }
];

export default function AdminTicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets);
  const [activeTicketId, setActiveTicketId] = useState<string>("tkt-2");
  const [searchQuery, setSearchQuery] = useState("");

  // Update states
  const [replyMessage, setReplyMessage] = useState("");
  const [statusSelect, setStatusSelect] = useState<Ticket['status']>("OPEN");
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  const activeTicket = tickets.find(t => t.id === activeTicketId);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages update
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeTicket?.messages]);

  // Set default status value when active ticket changes
  useEffect(() => {
    if (activeTicket) {
      setStatusSelect(activeTicket.status);
    }
  }, [activeTicketId]);

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyMessage.trim() || !activeTicketId) return;

    const adminMsg: Message = {
      id: "msg-admin-" + Date.now(),
      sender: "ADMIN",
      senderName: "Marcus (Lead Instructor)",
      message: replyMessage,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setTickets(prev => prev.map(t => {
      if (t.id === activeTicketId) {
        return {
          ...t,
          status: statusSelect === "OPEN" ? "IN_PROGRESS" : statusSelect, // auto advance to in progress if replying
          messages: [...t.messages, adminMsg]
        };
      }
      return t;
    }));

    if (statusSelect === "OPEN") {
      setStatusSelect("IN_PROGRESS");
    }
    setReplyMessage("");
  };

  const handleUpdateStatus = (newStatus: Ticket['status']) => {
    setIsUpdatingStatus(true);
    setTimeout(() => {
      setTickets(prev => prev.map(t => {
        if (t.id === activeTicketId) {
          return { ...t, status: newStatus };
        }
        return t;
      }));
      setStatusSelect(newStatus);
      setIsUpdatingStatus(false);
    }, 500);
  };

  const getStatusColor = (status: Ticket['status']) => {
    switch(status) {
      case 'OPEN': return "bg-rose-950/20 border-rose-900/30 text-rose-450";
      case 'IN_PROGRESS': return "bg-yellow-950/20 border-yellow-900/30 text-yellow-450";
      case 'RESOLVED': return "bg-emerald-950/20 border-emerald-900/30 text-emerald-400";
    }
  };

  const getCategoryColor = (cat: Ticket['category']) => {
    switch(cat) {
      case 'DOUBT': return "bg-purple-950/20 border-purple-900/30 text-purple-450";
      case 'TECHNICAL': return "bg-indigo-950/20 border-indigo-900/30 text-indigo-400";
      case 'BILLING': return "bg-pink-950/20 border-pink-900/30 text-pink-400";
      case 'OTHER': return "bg-zinc-950/40 border-zinc-900 text-zinc-405";
    }
  };

  const filteredTickets = tickets.filter(t => 
    t.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in relative z-10 pb-16 h-[calc(100vh-8rem)] flex flex-col">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-zinc-900 pb-5 shrink-0 select-none">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <Users className="h-6 w-6 text-rose-500" />
            Support & Doubt Tickets Desk
          </h1>
          <p className="text-xs text-zinc-500 mt-1 font-normal">
            Browse through incoming student code queries, write clarifications, and update doubt resolution flags.
          </p>
        </div>
      </div>

      {/* Split Grid */}
      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Side: Ticket Lists */}
        <div className="lg:col-span-5 bg-zinc-950 border border-zinc-900 rounded-2xl flex flex-col overflow-hidden">
          <div className="p-4 border-b border-zinc-900 flex gap-2 items-center shrink-0">
            <div className="relative flex-1">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-zinc-655 pointer-events-none">
                <Search className="h-3.5 w-3.5" />
              </span>
              <Input
                type="text"
                placeholder="Search queries or students..."
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
                return (
                  <button
                    key={tkt.id}
                    onClick={() => setActiveTicketId(tkt.id)}
                    className={`w-full p-4 text-left transition-all hover:bg-zinc-900/20 flex flex-col gap-2 border-l-2 cursor-pointer ${
                      isActive 
                        ? "bg-zinc-900/10 border-rose-500" 
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

                    <h3 className={`font-bold text-xs truncate w-full ${isActive ? 'text-rose-455' : 'text-zinc-200'}`}>
                      {tkt.subject}
                    </h3>

                    <div className="flex justify-between items-center text-[9px] text-zinc-500 w-full select-none">
                      <span>Student: {tkt.studentName}</span>
                      <span>Opened: {tkt.createdAt}</span>
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="p-8 text-center text-zinc-600 flex flex-col items-center justify-center h-full">
                <MessageSquare className="h-8 w-8 text-zinc-800 mb-2" />
                <p className="text-xs">No tickets match search filters.</p>
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
                    <span className="font-bold text-rose-455">{activeTicket.category}</span>
                    <span>•</span>
                    <span>By {activeTicket.studentName} ({activeTicket.college})</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className={`px-2.5 py-0.5 rounded-full border text-[8px] font-semibold uppercase tracking-wider ${getStatusColor(activeTicket.status)}`}>
                    {activeTicket.status}
                  </span>
                </div>
              </div>

              {/* Status control actions panel */}
              <div className="p-3 bg-zinc-950 border-b border-zinc-900 flex justify-between items-center shrink-0 select-none">
                <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest px-1">Fulfillment status</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleUpdateStatus('OPEN')}
                    className={`px-3 py-1 rounded-lg border text-[9px] font-bold transition-all cursor-pointer ${
                      statusSelect === 'OPEN' 
                        ? 'bg-rose-950/40 border-rose-800 text-rose-450' 
                        : 'border-zinc-850 text-zinc-500 hover:text-zinc-350 bg-transparent'
                    }`}
                  >
                    Open
                  </button>
                  <button
                    onClick={() => handleUpdateStatus('IN_PROGRESS')}
                    className={`px-3 py-1 rounded-lg border text-[9px] font-bold transition-all cursor-pointer ${
                      statusSelect === 'IN_PROGRESS' 
                        ? 'bg-yellow-950/20 border-yellow-850 text-yellow-450' 
                        : 'border-zinc-850 text-zinc-500 hover:text-zinc-350 bg-transparent'
                    }`}
                  >
                    In Progress
                  </button>
                  <button
                    onClick={() => handleUpdateStatus('RESOLVED')}
                    className={`px-3 py-1 rounded-lg border text-[9px] font-bold transition-all cursor-pointer ${
                      statusSelect === 'RESOLVED' 
                        ? 'bg-emerald-950/20 border-emerald-850 text-emerald-400' 
                        : 'border-zinc-850 text-zinc-500 hover:text-zinc-350 bg-transparent'
                    }`}
                  >
                    Resolved
                  </button>
                </div>
              </div>

              {/* Chat Thread Messages Box */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-zinc-950/40 custom-scrollbar">
                {activeTicket.messages.map(msg => {
                  const isAdmin = msg.sender === "ADMIN";
                  return (
                    <div key={msg.id} className={`flex flex-col ${isAdmin ? 'items-end' : 'items-start'} space-y-1`}>
                      <div className="flex items-center gap-1.5 text-[9px] font-bold text-zinc-500">
                        <span>{msg.senderName}</span>
                        <span>•</span>
                        <span>{msg.createdAt}</span>
                      </div>

                      <div className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-xs leading-relaxed whitespace-pre-wrap ${
                        isAdmin 
                          ? 'bg-rose-600 text-white rounded-tr-none border border-rose-500/20' 
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
                  placeholder="Type official admin reply here..."
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
                  variant="rose"
                  size="sm"
                  isLoading={isUpdatingStatus}
                  className="h-10 w-10 p-0 rounded-xl shrink-0 font-bold"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-zinc-605 p-8 text-center">
              <MessageSquare className="h-10 w-10 text-zinc-800 mb-3" />
              <h3 className="font-semibold text-zinc-350">No Ticket Selected</h3>
              <p className="text-xs max-w-xs text-zinc-550 mt-1 leading-relaxed">
                Select an open query ticket from the sidebar to inspect parameters or write response guides.
              </p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}

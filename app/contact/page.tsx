"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { GraduationCap, ArrowLeft, Mail, Send, Loader2, CheckCircle } from "lucide-react";
import { Input, Label, Textarea } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      // Simulate sending feedback and inserting contact record to database
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSent(true);
      
      // Reset
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch(err) {
      setError("Failed to record query. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-zinc-800 relative overflow-hidden font-sans">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-70 pointer-events-none" />

      {/* Header */}
      <header className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between border-b border-zinc-900 select-none">
        <Link href="/" className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors text-xs font-semibold">
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>
        <div className="flex items-center gap-2">
          <GraduationCap className="h-4.5 w-4.5 text-zinc-400" />
          <span className="font-bold text-xs">Growzi</span>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-md mx-auto px-6 py-16">
        <Card className="bg-zinc-900/40 relative z-10 shadow-xl border-zinc-850">
          <CardContent className="p-8">
            <div className="flex flex-col items-center mb-8 text-center">
              <div className="h-10 w-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 mb-3">
                <Mail className="h-5 w-5" />
              </div>
              <h2 className="text-base font-bold text-white uppercase tracking-wider">Contact Support</h2>
              <p className="text-zinc-500 text-[11px] mt-1.5 leading-relaxed">Have a doubt or need assistance? Leave a message below.</p>
            </div>

            {error && (
              <div className="bg-red-950/40 border border-red-500/30 text-red-200 text-xs p-3 rounded-lg mb-6">
                {error}
              </div>
            )}

            {isSent ? (
              <div className="text-center space-y-4 py-4 animate-scale-in">
                <CheckCircle className="h-12 w-12 text-emerald-500 mx-auto" />
                <div className="space-y-1">
                  <h3 className="font-bold text-white text-xs uppercase tracking-wider">Message Sent</h3>
                  <p className="text-[11px] text-zinc-500 max-w-xs mx-auto leading-relaxed">
                    Our administrators have recorded your feedback and will reach out via email.
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setIsSent(false)}
                  className="mt-6 font-semibold"
                  size="sm"
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label>Your Name</Label>
                  <Input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. John Doe"
                  />
                </div>

                <div>
                  <Label>Email Address</Label>
                  <Input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@domain.com"
                  />
                </div>

                <div>
                  <Label>Subject</Label>
                  <Input
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Inquiry on custom project builds"
                  />
                </div>

                <div>
                  <Label>Message / Inquiry</Label>
                  <Textarea
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your issue or custom request specs in detail..."
                    rows={4}
                  />
                </div>

                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  className="w-full font-semibold mt-2"
                  variant="indigo"
                  size="md"
                >
                  {!isSubmitting && <Send className="h-3.5 w-3.5" />} Submit Support Inquiry
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

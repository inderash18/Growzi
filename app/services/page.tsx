"use client";

import Link from "next/link";
import { 
  Globe, 
  ArrowLeft, 
  ArrowRight, 
  Terminal, 
  Layers, 
  DollarSign, 
  Calendar, 
  Sparkles, 
  Check,
  Layout,
  Code2,
  FileCheck,
  Eye
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type WebsiteService = {
  title: string;
  description: string;
  priceRange: string;
  deliveryTime: string;
  technologies: string[];
  features: string[];
  screenshot: string;
};

const servicesList: WebsiteService[] = [
  {
    title: "Portfolio Websites",
    description: "Sleek, recruiter-ready personal portfolios displaying biography, visual projects grids, experience logs, and verified contact links.",
    priceRange: "$100 - $180",
    deliveryTime: "3-5 days",
    technologies: ["Next.js", "Tailwind CSS", "Framer Motion", "Vercel"],
    features: ["Responsive theme profiles", "Dynamic animations transitions", "Email forms integration", "Recruiter links hub"],
    screenshot: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&auto=format&fit=crop&q=60"
  },
  {
    title: "Business Brochure Websites",
    description: "Modern landing pages and information grids showcasing business capabilities, client reviews carousels, and visual quote grids.",
    priceRange: "$180 - $300",
    deliveryTime: "5-7 days",
    technologies: ["React", "PostCSS", "Lucide Icons", "Supabase"],
    features: ["Product catalog sliders", "Calendly appointment sync", "SEO indexable meta layouts", "Framer interactions loops"],
    screenshot: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=60"
  },
  {
    title: "College Community Portals",
    description: "Social forums, code sharing dashboards, study file uploads catalogs, and group announcements timelines.",
    priceRange: "$250 - $400",
    deliveryTime: "7-10 days",
    technologies: ["MERN Stack", "Node.js", "Express", "MongoDB"],
    features: ["Secure JWT session cookies", "Markdown code editor uploads", "Like threads discussion feeds", "Notification sockets trigger"],
    screenshot: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=60"
  },
  {
    title: "Web Applications (Full Stack)",
    description: "Robust database systems, dashboards panels, mock payment stripe checkout processing, and telemetry charts dashboards.",
    priceRange: "$350 - $600",
    deliveryTime: "10-14 days",
    technologies: ["Next.js", "Prisma ORM", "PostgreSQL", "Stripe API"],
    features: ["Stripe payment pipelines", "Interactive chart analytics", "Multi-role authentication gateways", "Cron background integrations"],
    screenshot: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&auto=format&fit=crop&q=60"
  }
];

const galleryList = [
  { title: "Lando Brochure Platform", type: "Brochure Website", img: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=600&auto=format&fit=crop&q=60" },
  { title: "Payable Invoicing SaaS Page", type: "SaaS Application", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=60" },
  { title: "Acme Corporate Portfolio", type: "Personal Hub", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=60" }
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white relative overflow-hidden font-sans flex flex-col justify-between">
      
      <div>
        {/* Navigation */}
        <Header />

        <main className="max-w-6xl mx-auto px-6 py-16 space-y-16 relative z-10">
          
          {/* Intro */}
          <section className="text-center space-y-4 max-w-2xl mx-auto animate-fade-in select-none">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-slate-200 bg-white text-slate-500 text-[10px] font-bold tracking-wider uppercase shadow-sm">
              <Sparkles className="h-3 w-3 text-blue-600" /> Professional Dev Offerings
            </div>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Website Development Services</h1>
            <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
              We design and develop beautiful, responsive static portfolios and complex custom database systems.
            </p>
          </section>

          {/* Previous Work Gallery Section */}
          <section className="space-y-6 select-none">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest border-b border-slate-200 pb-2">Selected Previous Work</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {galleryList.map((gal, idx) => (
                <div key={idx} className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all">
                  <div className="h-44 w-full bg-slate-100 overflow-hidden relative border-b border-slate-100">
                    <img 
                      src={gal.img} 
                      alt={gal.title} 
                      className="object-cover h-full w-full opacity-70 group-hover:scale-102 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <span className="text-[8px] font-bold text-blue-600 uppercase tracking-widest block">{gal.type}</span>
                    <h4 className="text-xs font-bold text-slate-900 mt-1">{gal.title}</h4>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Services Packages Cards Grid */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            {servicesList.map((svc, idx) => (
              <Card key={idx} className="bg-white border-slate-250 hover:border-slate-350 transition-all flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-md">
                <div>
                  {/* Visual Header */}
                  <div className="relative h-44 w-full bg-slate-100 overflow-hidden border-b border-slate-150 select-none">
                    <img 
                      src={svc.screenshot} 
                      alt={svc.title} 
                      className="object-cover h-full w-full opacity-65"
                    />
                    <div className="absolute top-4 left-4 bg-white/95 border border-slate-200 px-3 py-1 rounded-xl shadow-sm">
                      <span className="text-slate-900 text-[10px] font-extrabold tracking-wide uppercase inline-flex items-center gap-0.5">
                        <DollarSign className="h-3.5 w-3.5 text-blue-600" /> {svc.priceRange}
                      </span>
                    </div>
                  </div>

                  <CardHeader className="p-6 pb-2 space-y-2 border-none">
                    <CardTitle className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">{svc.title}</CardTitle>
                    <CardDescription className="text-xs text-slate-500 leading-relaxed font-normal">
                      {svc.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="p-6 pt-2 space-y-4 select-none">
                    {/* Features List */}
                    <div className="space-y-2">
                      {svc.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2 text-[10px] text-slate-600 font-semibold">
                          <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {svc.technologies.map(tech => (
                        <span key={tech} className="px-2 py-0.5 rounded bg-slate-150 border border-slate-200 text-slate-600 text-[8px] uppercase tracking-wider font-bold">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </div>

                {/* Action Button */}
                <div className="p-6 pt-0 select-none">
                  <Link href="/dashboard" className="block">
                    <Button variant="primary" size="sm" className="w-full font-bold gap-1 shadow-md">
                      Request Website Package <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </section>

          {/* Global CTA Section */}
          <section className="bg-white border border-slate-200 rounded-3xl p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 select-none shadow-sm max-w-4xl mx-auto mt-16 animate-scale-in">
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Ready to deploy your system online?</h3>
              <p className="text-xs text-slate-500">
                Log into the student portal dashboard to file a website build order request.
              </p>
            </div>
            <Link href="/dashboard" className="shrink-0">
              <Button variant="primary" size="sm" className="font-bold gap-1.5">
                <Terminal className="h-4 w-4" /> Request a Website <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </section>

        </main>
      </div>

      <Footer />
    </div>
  );
}

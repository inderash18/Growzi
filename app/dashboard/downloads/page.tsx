"use client";

import { useState } from "react";
import Link from "next/link";
import { Download, FileText, Link as LinkIcon, RefreshCw, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/toast";

type DownloadItem = {
  id: string;
  title: string;
  subject: string;
  type: 'PDF' | 'ZIP' | 'LINK';
  date: string;
  size: string;
};

const initialDownloads: DownloadItem[] = [
  {
    id: "dl-1",
    title: "Computer Networks Fundamentals Slide Deck",
    subject: "Computer Networks",
    type: "ZIP",
    date: "2026-06-14",
    size: "4.8 MB"
  },
  {
    id: "dl-2",
    title: "PostgreSQL Database Performance Tuning Cheatsheet",
    subject: "DBMS",
    type: "PDF",
    date: "2026-06-15",
    size: "1.2 MB"
  }
];

export default function StudentDownloadsPage() {
  const { toast } = useToast();
  const [downloads, setDownloads] = useState<DownloadItem[]>(initialDownloads);

  const handleRedownload = (name: string) => {
    toast(`Restarting download parameters for ${name}...`, "success");
  };

  const getIcon = (type: DownloadItem['type']) => {
    switch(type) {
      case 'PDF': return <FileText className="h-4 w-4 text-red-400" />;
      case 'LINK': return <LinkIcon className="h-4 w-4 text-indigo-400" />;
      default: return <Layers className="h-4 w-4 text-blue-400" />;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in relative z-10 pb-16">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-zinc-900 pb-5 select-none">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <Download className="h-6 w-6 text-indigo-500" />
            Downloads Library
          </h1>
          <p className="text-xs text-zinc-500 mt-1 font-normal">
            Your history of lecture notes zip packages, examine pdf files, and syllabus guides.
          </p>
        </div>

        <Link href="/notes" className="shrink-0 select-none">
          <Button variant="outline" size="sm" className="font-semibold">
            Study Resources Directory
          </Button>
        </Link>
      </div>

      {/* Grid */}
      {downloads.length > 0 ? (
        <Card className="overflow-hidden border-zinc-900">
          <div className="overflow-x-auto select-text">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-zinc-900/20 border-b border-zinc-900 text-zinc-500 font-bold uppercase tracking-wider select-none">
                  <th className="p-4 pl-6 font-semibold">Asset Name</th>
                  <th className="p-4 font-semibold">Subject</th>
                  <th className="p-4 font-semibold">Format</th>
                  <th className="p-4 font-semibold">Size</th>
                  <th className="p-4 font-semibold">Download Date</th>
                  <th className="p-4 pr-6 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900/40 text-zinc-350">
                {downloads.map((item) => (
                  <tr key={item.id} className="hover:bg-zinc-900/10 transition-colors">
                    <td className="p-4 pl-6 font-semibold text-white">
                      <span className="flex items-center gap-2">
                        {getIcon(item.type)}
                        {item.title}
                      </span>
                    </td>
                    <td className="p-4">{item.subject}</td>
                    <td className="p-4 select-none">
                      <span className="px-2 py-0.5 rounded bg-zinc-950 border border-zinc-850 text-zinc-500 text-[8px] font-bold">
                        {item.type}
                      </span>
                    </td>
                    <td className="p-4 text-zinc-500">{item.size}</td>
                    <td className="p-4 text-zinc-500">{item.date}</td>
                    <td className="p-4 pr-6 text-right select-none">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRedownload(item.title)}
                        className="font-semibold ml-auto"
                      >
                        <RefreshCw className="h-3.5 w-3.5" /> Fetch File
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      ) : (
        <div className="p-16 bg-zinc-900/10 border border-dashed border-zinc-900 rounded-2xl text-center select-none">
          <Download className="h-10 w-10 text-zinc-750 mx-auto mb-4" />
          <h3 className="font-semibold text-white mb-1">Downloads queue empty</h3>
          <p className="text-xs text-zinc-550 max-w-sm mx-auto leading-relaxed">
            You haven&apos;t downloaded study resources or examinations files archives yet.
          </p>
        </div>
      )}

    </div>
  );
}

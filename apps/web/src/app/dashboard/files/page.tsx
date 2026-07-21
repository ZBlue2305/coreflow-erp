"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  FolderOpen,
  Upload,
  Search,
  FileText,
  File,
  Image,
  Paperclip,
  Download,
  Eye,
  CheckCircle2,
  Folder,
  FileBadge,
  HardDrive,
} from "lucide-react";

interface DocFile {
  id: string;
  name: string;
  category: string;
  size: string;
  type: "pdf" | "doc" | "image" | "sheet" | "other";
  uploadedBy: string;
  date: string;
  tags: string[];
}

const fileData: DocFile[] = [
  { id: "DOC-001", name: "Sharjah-RO-Contract-2026.pdf", category: "Contracts", size: "2.4 MB", type: "pdf", uploadedBy: "Zaid Al-Habsi", date: "2026-07-10", tags: ["Contract", "Active"] },
  { id: "DOC-002", name: "Hydrotech_QC_Certification_2026.pdf", category: "Certifications", size: "870 KB", type: "pdf", uploadedBy: "IT Admin", date: "2026-06-20", tags: ["Compliance", "QC"] },
  { id: "DOC-003", name: "Jebel-Ali-Site-Blueprint.dwg", category: "Technical Drawings", size: "14.7 MB", type: "other", uploadedBy: "Eng. Hassan", date: "2026-07-05", tags: ["Engineering", "Blueprint"] },
  { id: "DOC-004", name: "Payroll-July-2026.xlsx", category: "HR Documents", size: "1.1 MB", type: "sheet", uploadedBy: "HR Team", date: "2026-07-14", tags: ["Payroll", "Confidential"] },
  { id: "DOC-005", name: "Site-Hazard-Assessment-Report.pdf", category: "Safety", size: "5.2 MB", type: "pdf", uploadedBy: "Safety Officer", date: "2026-07-01", tags: ["Safety", "OSHA"] },
  { id: "DOC-006", name: "Project-Milestone-Q2-2026.pptx", category: "Management Reports", size: "3.6 MB", type: "doc", uploadedBy: "Management", date: "2026-07-08", tags: ["Report", "Q2"] },
  { id: "DOC-007", name: "Al-Khaleej-Site-Photos-June.zip", category: "Media", size: "48.3 MB", type: "image", uploadedBy: "Field Agent: Omar", date: "2026-06-30", tags: ["Media", "Field"] },
  { id: "DOC-008", name: "Procurement-PO-2026-031.pdf", category: "Finance", size: "312 KB", type: "pdf", uploadedBy: "Procurement", date: "2026-07-13", tags: ["PO", "Procurement"] },
  { id: "DOC-009", name: "Employee-Handbook-v4.2.pdf", category: "HR Documents", size: "6.8 MB", type: "pdf", uploadedBy: "HR Team", date: "2026-01-15", tags: ["Policy", "HR"] },
  { id: "DOC-010", name: "SCADA-System-Integration-Specs.pdf", category: "Technical Drawings", size: "9.1 MB", type: "pdf", uploadedBy: "IT Admin", date: "2026-05-22", tags: ["IT", "SCADA"] },
];

const categories = ["All", "Contracts", "Certifications", "Technical Drawings", "HR Documents", "Finance", "Safety", "Management Reports", "Media"];

const typeIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  pdf: FileText,
  doc: File,
  image: Image,
  sheet: FileBadge,
  other: Paperclip,
};

const typeColorMap: Record<string, string> = {
  pdf: "text-red-400 bg-red-500/10 border-red-500/20",
  doc: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  image: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  sheet: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  other: "text-slate-400 bg-slate-500/10 border-slate-500/20",
};

export default function FilesPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const filtered = fileData.filter((f) => {
    const matchCat = category === "All" || f.category === category;
    const matchSearch = f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

  const handleUpload = () => {
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      setUploaded(true);
      setTimeout(() => setUploaded(false), 2500);
    }, 1500);
  };

  const handleDownload = (id: string) => {
    setDownloadingId(id);
    setTimeout(() => setDownloadingId(null), 1500);
  };

  const storageUsed = 92.4;
  const storageTotal = 200;

  return (
    <div className="space-y-8 animate-fade-in text-slate-100">
      {/* Header */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Document Management</h1>
          <p className="text-slate-400 text-sm">
            Corporate file repository for contracts, certifications, technical drawings, and operational records.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {uploaded && (
            <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold">
              <CheckCircle2 className="h-4 w-4" /> Upload complete
            </div>
          )}
          <Button onClick={handleUpload} disabled={uploading} className="gap-2">
            <Upload className="h-4 w-4" />
            {uploading ? "Uploading..." : "Upload File"}
          </Button>
        </div>
      </div>

      {/* Storage & Stats Bar */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <Card className="sm:col-span-2 border-slate-800/60 bg-slate-900/40">
          <CardContent className="p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-wider">
                <HardDrive className="h-4 w-4" /> Storage Usage
              </div>
              <span className="text-xs font-mono font-bold text-white">{storageUsed} GB / {storageTotal} GB</span>
            </div>
            <div className="w-full bg-slate-950 rounded-full h-2.5 border border-slate-900">
              <div
                style={{ width: `${(storageUsed / storageTotal) * 100}%` }}
                className="bg-gradient-to-r from-indigo-600 to-indigo-400 h-full rounded-full transition-all"
              />
            </div>
            <p className="text-[10px] text-slate-500">{storageTotal - storageUsed} GB available · Managed on AWS S3 Secure Vault</p>
          </CardContent>
        </Card>
        {[
          { label: "Total Files", value: fileData.length.toString(), icon: FolderOpen, color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20" },
          { label: "Contracts", value: "3 Active", icon: FileText, color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
          { label: "Categories", value: "8 Folders", icon: Folder, color: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
        ].map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <Card key={idx} className="border-slate-800/60 bg-slate-900/40">
              <CardContent className="p-5 flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">{kpi.label}</span>
                  <h3 className="text-xl font-bold text-white">{kpi.value}</h3>
                </div>
                <div className={`h-10 w-10 rounded-lg flex items-center justify-center border ${kpi.color}`}>
                  <Icon className="h-4.5 w-4.5" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Search and Category Filter */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 pointer-events-none" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search files or tags..."
            className="w-full h-10 rounded-lg border border-slate-700 bg-slate-950 pl-9 pr-3 text-sm text-slate-300 placeholder:text-slate-600 focus:ring-2 focus:ring-indigo-500 outline-hidden"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.slice(0, 5).map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider border transition-all ${
                category === cat
                  ? "bg-indigo-600 border-indigo-500 text-white"
                  : "bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Files Table */}
      <Card className="border-slate-800/60 bg-slate-900/40">
        <CardHeader>
          <div className="flex items-center gap-2">
            <FolderOpen className="h-5 w-5 text-indigo-400" />
            <CardTitle>
              {category === "All" ? "All Files" : category}
              <span className="ml-2 text-xs font-normal text-slate-500">({filtered.length} items)</span>
            </CardTitle>
          </div>
          <CardDescription>Secure corporate document repository with access-controlled file management</CardDescription>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-500 font-bold uppercase tracking-wider text-[9px]">
                <th className="py-4 px-4">File</th>
                <th className="py-4 px-4">Category</th>
                <th className="py-4 px-4">Uploaded By</th>
                <th className="py-4 px-4">Date</th>
                <th className="py-4 px-4">Size</th>
                <th className="py-4 px-4">Tags</th>
                <th className="py-4 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40">
              {filtered.map((file) => {
                const Icon = typeIconMap[file.type] || File;
                const colorClass = typeColorMap[file.type] || typeColorMap.other;
                const isDownloading = downloadingId === file.id;
                return (
                  <tr key={file.id} className="hover:bg-slate-950/30 transition-colors group">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className={`h-8 w-8 shrink-0 rounded-lg flex items-center justify-center border ${colorClass}`}>
                          <Icon className="h-3.5 w-3.5" />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="font-semibold text-slate-200 truncate max-w-[200px]">{file.name}</span>
                          <span className="text-[9px] text-slate-600 font-mono">{file.id}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-400 font-medium">{file.category}</td>
                    <td className="py-3.5 px-4 text-slate-400">{file.uploadedBy}</td>
                    <td className="py-3.5 px-4 text-slate-500 font-mono">{file.date}</td>
                    <td className="py-3.5 px-4 text-slate-400 font-mono">{file.size}</td>
                    <td className="py-3.5 px-4">
                      <div className="flex flex-wrap gap-1">
                        {file.tags.map((tag) => (
                          <span key={tag} className="text-[8px] font-bold uppercase px-1.5 py-0.5 rounded-sm bg-slate-800 text-slate-400 border border-slate-700">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center justify-end gap-1.5">
                        <button className="h-7 w-7 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors">
                          <Eye className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => handleDownload(file.id)}
                          className={`h-7 w-7 rounded-md flex items-center justify-center transition-colors ${
                            isDownloading
                              ? "bg-emerald-500/20 text-emerald-400"
                              : "bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
                          }`}
                        >
                          {isDownloading ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Download className="h-3.5 w-3.5" />}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-16 text-center text-slate-600 text-sm">
              No files matching "<span className="text-slate-400">{search}</span>" in <span className="text-slate-400">{category}</span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

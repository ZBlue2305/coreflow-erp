"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Users, Search, Plus, UserPlus, UserCheck, ShieldAlert } from "lucide-react";

interface Employee {
  id: string;
  name: string;
  department: string;
  position: string;
  status: string;
  email: string;
  phone: string;
  salary: string;
}

export default function EmployeesPage() {
  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("ALL");
  const [showAddModal, setShowAddModal] = useState(false);

  // Form states
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newDept, setNewDept] = useState("Engineering Field Ops");
  const [newPosition, setNewPosition] = useState("Water Operations Specialist");
  const [newSalary, setNewSalary] = useState("6500");

  const [employees, setEmployees] = useState<Employee[]>([
    { id: "QA-2026-001", name: "Ahmed Manager", department: "Management", position: "General Manager", status: "ACTIVE", email: "manager@erp.com", phone: "+971 50 123 4567", salary: "AED 15,500" },
    { id: "QA-2026-002", name: "Fatima HR", department: "Human Resources", position: "HR Director", status: "ACTIVE", email: "hr@erp.com", phone: "+971 50 123 4568", salary: "AED 9,500" },
    { id: "QA-2026-003", name: "Zaid Sales", department: "Sales & Marketing", position: "Senior Sales Lead", status: "ACTIVE", email: "sales@erp.com", phone: "+971 50 123 4569", salary: "AED 8,000" },
    { id: "QA-2026-004", name: "Khalid IT", department: "Information Technology", position: "Infrastructure Architect", status: "ACTIVE", email: "it@erp.com", phone: "+971 50 123 4570", salary: "AED 10,500" },
    { id: "QA-2026-005", name: "Yasmin Agent", department: "Engineering Field Ops", position: "Water Operations Specialist", status: "ACTIVE", email: "agent@erp.com", phone: "+971 50 123 4571", salary: "AED 6,200" },
    { id: "QA-2026-006", name: "Salem Al-Harthi", department: "Sales & Marketing", position: "Sales Executive", status: "ACTIVE", email: "salem@erp.com", phone: "+971 50 111 2222", salary: "AED 5,500" },
    { id: "QA-2026-007", name: "Tariq Mahmood", department: "Engineering Field Ops", position: "Senior Hydraulics Engineer", status: "ACTIVE", email: "tariq@erp.com", phone: "+971 50 222 3333", salary: "AED 9,200" },
  ]);

  const handleAddEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFirstName || !newLastName || !newEmail) return;

    const nextIdNum = employees.length + 1;
    const newEmp: Employee = {
      id: `QA-2026-00${nextIdNum}`,
      name: `${newFirstName} ${newLastName}`,
      department: newDept,
      position: newPosition,
      status: "ACTIVE",
      email: newEmail,
      phone: newPhone || "+971 50 000 0000",
      salary: `AED ${Number(newSalary).toLocaleString()}`,
    };

    setEmployees([...employees, newEmp]);
    setShowAddModal(false);

    // reset
    setNewFirstName("");
    setNewLastName("");
    setNewEmail("");
    setNewPhone("");
    setNewSalary("6500");
  };

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch = emp.name.toLowerCase().includes(search.toLowerCase()) || emp.id.toLowerCase().includes(search.toLowerCase()) || emp.position.toLowerCase().includes(search.toLowerCase());
    const matchesDept = deptFilter === "ALL" || emp.department === deptFilter;
    return matchesSearch && matchesDept;
  });

  return (
    <div className="space-y-8 animate-fade-in text-slate-100">
      {/* Header */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Employee Directory</h1>
          <p className="text-slate-400 text-sm">Review, locate, and recruit personnel for all Qimat Almanara divisions.</p>
        </div>
        <div>
          <Button onClick={() => setShowAddModal(true)} className="gap-2.5 font-bold">
            <Plus className="h-4.5 w-4.5" /> Recruit Personnel
          </Button>
        </div>
      </div>

      {/* Filter and search operations bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/40 p-4 rounded-xl border border-slate-800/80 backdrop-blur-md">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute top-3.5 left-3 h-4 w-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search by name, ID or role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-11 w-full rounded-lg border border-slate-700 bg-slate-950/50 pl-9 pr-4 text-xs text-slate-300 placeholder:text-slate-500 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Division:</span>
          <select
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            className="h-11 rounded-lg border border-slate-700 bg-slate-950 px-3 text-slate-300 focus:outline-hidden text-xs font-semibold"
          >
            <option value="ALL">All Departments</option>
            <option value="Management">Management</option>
            <option value="Human Resources">Human Resources</option>
            <option value="Sales & Marketing">Sales & Marketing</option>
            <option value="Information Technology">Information Technology</option>
            <option value="Engineering Field Ops">Engineering Field Ops</option>
          </select>
        </div>
      </div>

      {/* Directory Table */}
      <Card className="border-slate-800/60 bg-slate-900/40">
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-4 px-6">ID & Personnel</th>
                <th className="py-4 px-6">Department</th>
                <th className="py-4 px-6">Position</th>
                <th className="py-4 px-6">Salary Rate</th>
                <th className="py-4 px-6">System Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40">
              {filteredEmployees.map((emp) => (
                <tr key={emp.id} className="hover:bg-slate-950/20 text-slate-300 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-slate-800 border border-slate-700/60 text-slate-300 font-bold flex items-center justify-center shrink-0">
                        {emp.name[0]}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-200">{emp.name}</span>
                        <span className="text-[10px] text-slate-500">{emp.email} • {emp.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 font-medium">{emp.department}</td>
                  <td className="py-4 px-6 text-slate-400 font-medium">{emp.position}</td>
                  <td className="py-4 px-6 text-slate-300 font-mono font-semibold">{emp.salary}</td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wide uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <UserCheck className="h-3 w-3" /> {emp.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <Button variant="outline" size="sm">Edit File</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Recruits onboarding modal form overlay */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-fade-in">
          <Card className="w-full max-w-lg border-slate-800 bg-slate-900 shadow-2xl">
            <CardHeader>
              <div className="flex items-center gap-2">
                <UserPlus className="h-5 w-5 text-indigo-400" />
                <CardTitle>Recruit New Employee</CardTitle>
              </div>
              <CardDescription>Onboard new water engineering or office staff to ERP systems</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddEmployee} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="First Name"
                    value={newFirstName}
                    onChange={(e) => setNewFirstName(e.target.value)}
                    placeholder="Ahmed"
                    required
                  />
                  <Input
                    label="Last Name"
                    value={newLastName}
                    onChange={(e) => setNewLastName(e.target.value)}
                    placeholder="Al-Subaie"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Email Address"
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="name@erp.com"
                    required
                  />
                  <Input
                    label="Phone Number"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    placeholder="+971 50 XXXXXXX"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-300">Department</label>
                    <select
                      value={newDept}
                      onChange={(e) => setNewDept(e.target.value)}
                      className="w-full h-11 rounded-lg border border-slate-700 bg-slate-950 px-3 text-slate-300 text-xs focus:ring-2 focus:ring-indigo-500 outline-hidden"
                    >
                      <option value="Management">Management</option>
                      <option value="Human Resources">Human Resources</option>
                      <option value="Sales & Marketing">Sales & Marketing</option>
                      <option value="Information Technology">Information Technology</option>
                      <option value="Engineering Field Ops">Engineering Field Ops</option>
                    </select>
                  </div>
                  <Input
                    label="Position / Designation"
                    value={newPosition}
                    onChange={(e) => setNewPosition(e.target.value)}
                    placeholder="Lead Hydro-Chemist"
                    required
                  />
                </div>
                <Input
                  label="Monthly Base Salary (AED)"
                  type="number"
                  value={newSalary}
                  onChange={(e) => setNewSalary(e.target.value)}
                  required
                />

                <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-800/60">
                  <Button type="button" variant="outline" size="sm" onClick={() => setShowAddModal(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" size="sm">
                    Complete Onboarding
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

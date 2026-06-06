/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SideBar from "../../sidebar/page";
import {
  BarChart3,
  TrendingUp,
  Users,
  Calendar,
  CreditCard,
  Download,
  Filter,
  Calendar as CalendarIcon,
} from "lucide-react";

type ReportData = {
  period: string;
  totalMembers: number;
  newMembers: number;
  activeEvents: number;
  issuedKTA: number;
  revenue: number;
};

export default function LaporanAdmin() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("sidebar-state");

    if (saved !== null) {
      setSidebarOpen(JSON.parse(saved));
    }
  }, []);
  const [reports, setReports] = useState<ReportData[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterPeriod, setFilterPeriod] = useState("monthly");

  useEffect(() => {
    setTimeout(() => {
      const dummyData: ReportData[] = [
        {
          period: "Januari 2024",
          totalMembers: 1200,
          newMembers: 45,
          activeEvents: 12,
          issuedKTA: 38,
          revenue: 15000000,
        },
        {
          period: "Februari 2024",
          totalMembers: 1245,
          newMembers: 52,
          activeEvents: 15,
          issuedKTA: 45,
          revenue: 18500000,
        },
        {
          period: "Maret 2024",
          totalMembers: 1297,
          newMembers: 58,
          activeEvents: 18,
          issuedKTA: 52,
          revenue: 22000000,
        },
        {
          period: "April 2024",
          totalMembers: 1355,
          newMembers: 63,
          activeEvents: 20,
          issuedKTA: 58,
          revenue: 25500000,
        },
        {
          period: "Mei 2024",
          totalMembers: 1418,
          newMembers: 71,
          activeEvents: 22,
          issuedKTA: 65,
          revenue: 28000000,
        },
        {
          period: "Juni 2024",
          totalMembers: 1489,
          newMembers: 78,
          activeEvents: 25,
          issuedKTA: 72,
          revenue: 32000000,
        },
      ];
      setReports(dummyData);
      setLoading(false);
    }, 800);
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="relative z-10 flex">
        <SideBar onToggle={(open: boolean) => setSidebarOpen(open)} />

        <main
          className={`flex-1 p-4 md:p-8 lg:p-10 transition-[margin] duration-300 ease-in-out ${
            sidebarOpen ? "lg:ml-[288px]" : "lg:ml-[80px]"
          }`}
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-md px-4 py-2 rounded-full border border-slate-200/60 shadow-sm">
                  <BarChart3 className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                    Laporan & Analitik
                  </span>
                </div>
                <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">
                  Laporan Performa Organisasi
                </h1>
                <p className="text-slate-500 font-medium text-sm md:text-base">
                  Analisis dan pantau perkembangan organisasi Anda
                </p>
              </div>

              <button className="group inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-5 py-3 rounded-2xl font-semibold shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 active:scale-[0.98] text-sm md:text-base">
                <Download className="w-4 h-4 group-hover:scale-110 transition-transform" />
                Export Laporan
              </button>
            </div>
          </motion.div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
            {[
              {
                title: "Total Anggota",
                value: "1,489",
                icon: Users,
                color: "blue",
              },
              {
                title: "Event Aktif",
                value: "25",
                icon: Calendar,
                color: "emerald",
              },
              {
                title: "KTA Terbit",
                value: "72",
                icon: CreditCard,
                color: "purple",
              },
              {
                title: "Pendapatan",
                value: "Rp 32M",
                icon: TrendingUp,
                color: "amber",
              },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/70 backdrop-blur-xl border border-slate-200/60 rounded-3xl p-6 shadow-xl shadow-slate-200/50"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`w-10 h-10 bg-${stat.color}-50 rounded-xl flex items-center justify-center`}
                    >
                      <Icon className={`w-5 h-5 text-${stat.color}-600`} />
                    </div>
                    <p className="text-sm font-semibold text-slate-600">
                      {stat.title}
                    </p>
                  </div>
                  <p className="text-2xl font-black text-slate-800">
                    {stat.value}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-6"
          >
            <div className="bg-white/70 backdrop-blur-xl border border-slate-200/60 rounded-2xl p-4 shadow-lg">
              <div className="flex items-center gap-4">
                <Filter className="w-5 h-5 text-slate-400" />
                <select
                  value={filterPeriod}
                  onChange={(e) => setFilterPeriod(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-sm font-semibold text-slate-700"
                >
                  <option value="monthly">Bulanan</option>
                  <option value="quarterly">Triwulan</option>
                  <option value="yearly">Tahunan</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Report Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white/70 backdrop-blur-xl border border-slate-200/60 rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-slate-200/60 bg-gradient-to-r from-slate-50/50 to-transparent">
              <p className="text-sm font-semibold text-slate-600">
                Laporan Periode{" "}
                <span className="text-blue-600">6 Bulan Terakhir</span>
              </p>
            </div>

            <div className="overflow-x-auto">
              {loading ? (
                <div className="p-8 space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 animate-pulse"
                    >
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-slate-200 rounded w-1/3"></div>
                      </div>
                      <div className="h-8 w-20 bg-slate-200 rounded-xl"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-slate-50 to-slate-100/50">
                      <th className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-wider">
                        Periode
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-wider">
                        Total Anggota
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-wider">
                        Anggota Baru
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-wider">
                        Event Aktif
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-wider">
                        KTA Terbit
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-wider">
                        Pendapatan
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {reports.map((report, index) => (
                      <tr
                        key={index}
                        className="group hover:bg-blue-50/40 transition-colors duration-200"
                      >
                        <td className="px-6 py-4">
                          <p className="font-bold text-slate-800 text-sm">
                            {report.period}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm font-semibold text-slate-700">
                            {report.totalMembers.toLocaleString()}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700">
                            +{report.newMembers}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-slate-600">
                            {report.activeEvents}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-slate-600">
                            {report.issuedKTA}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm font-bold text-slate-800">
                            {formatCurrency(report.revenue)}
                          </p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}

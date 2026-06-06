/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/purity */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SideBar from "../../sidebar/page";
import {
  Users,
  Calendar,
  CreditCard,
  TrendingUp,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle,
  AlertCircle,
  BarChart3,
  PieChart,
  CalendarDays,
  CalendarRange,
  CalendarClock,
} from "lucide-react";

type StatCard = {
  title: string;
  value: string;
  change: number;
  icon: any;
  color: string;
};

type RecentActivity = {
  id: number;
  action: string;
  user: string;
  timestamp: string;
  status: "success" | "warning" | "error";
};

type ChartData = {
  label: string;
  value: number;
};

type FilterPeriod = "weekly" | "monthly" | "yearly";

export default function DashboardAdmin() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("sidebar-state");

    if (saved !== null) {
      setSidebarOpen(JSON.parse(saved));
    }
  }, []);
  const skeletonHeights = [45, 60, 75, 55, 85, 65];
  const [stats, setStats] = useState<StatCard[]>([]);
  const [activities, setActivities] = useState<RecentActivity[]>([]);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterPeriod, setFilterPeriod] = useState<FilterPeriod>("monthly");

  // Dummy data untuk setiap periode
  const chartDataByPeriod: Record<FilterPeriod, ChartData[]> = {
    weekly: [
      { label: "Minggu 1", value: 25 },
      { label: "Minggu 2", value: 32 },
      { label: "Minggu 3", value: 28 },
      { label: "Minggu 4", value: 41 },
    ],
    monthly: [
      { label: "Jan", value: 65 },
      { label: "Feb", value: 78 },
      { label: "Mar", value: 90 },
      { label: "Apr", value: 81 },
      { label: "Mei", value: 95 },
      { label: "Jun", value: 110 },
    ],
    yearly: [
      { label: "2021", value: 320 },
      { label: "2022", value: 485 },
      { label: "2023", value: 720 },
      { label: "2024", value: 950 },
      { label: "2025", value: 1240 },
    ],
  };

  const periodLabels: Record<FilterPeriod, string> = {
    weekly: "4 minggu terakhir",
    monthly: "6 bulan terakhir",
    yearly: "5 tahun terakhir",
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setStats([
        {
          title: "Total Anggota",
          value: "147",
          change: 12.5,
          icon: Users,
          color: "blue",
        },
        {
          title: "Event",
          value: "10",
          change: 8.2,
          icon: Calendar,
          color: "emerald",
        },
        {
          title: "KTA",
          value: "100",
          change: -3.1,
          icon: CreditCard,
          color: "purple",
        },
        {
          title: "Pendapatan",
          value: "+15.3%",
          change: 15.3,
          icon: TrendingUp,
          color: "amber",
        },
      ]);

      setActivities([
        {
          id: 1,
          action: "Menambahkan anggota baru",
          user: "Ahmad Rizki",
          timestamp: "2 menit yang lalu",
          status: "success",
        },
        {
          id: 2,
          action: "Mengupdate data event",
          user: "Siti Nurhaliza",
          timestamp: "15 menit yang lalu",
          status: "success",
        },
        {
          id: 3,
          action: "Permintaan KTA pending",
          user: "Budi Santoso",
          timestamp: "1 jam yang lalu",
          status: "warning",
        },
        {
          id: 4,
          action: "Gagal upload dokumen",
          user: "Dewi Lestari",
          timestamp: "2 jam yang lalu",
          status: "error",
        },
        {
          id: 5,
          action: "Menyetujui laporan",
          user: "Admin Pusat",
          timestamp: "3 jam yang lalu",
          status: "success",
        },
      ]);

      setChartData(chartDataByPeriod[filterPeriod]);
      setLoading(false);
    }, 800);
  }, []);

  // Update chart data saat filter berubah
  useEffect(() => {
    if (!loading) {
      setChartData(chartDataByPeriod[filterPeriod]);
    }
  }, [filterPeriod]);

  // Hitung max value untuk scaling chart
  const maxChartValue = Math.max(...chartData.map((d) => d.value), 1);

  const getColorClasses = (color: string) => {
    const colors: Record<
      string,
      { bg: string; text: string; gradient: string }
    > = {
      blue: {
        bg: "bg-blue-50",
        text: "text-blue-600",
        gradient: "from-blue-500 to-blue-600",
      },
      emerald: {
        bg: "bg-emerald-50",
        text: "text-emerald-600",
        gradient: "from-emerald-500 to-emerald-600",
      },
      purple: {
        bg: "bg-purple-50",
        text: "text-purple-600",
        gradient: "from-purple-500 to-purple-600",
      },
      amber: {
        bg: "bg-amber-50",
        text: "text-amber-600",
        gradient: "from-amber-500 to-amber-600",
      },
    };
    return colors[color] || colors.blue;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-emerald-500" />;
      case "warning":
        return <AlertCircle className="w-5 h-5 text-amber-500" />;
      case "error":
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Activity className="w-5 h-5 text-slate-400" />;
    }
  };

  const filterButtons = [
    { id: "weekly" as FilterPeriod, label: "Minggu", icon: CalendarClock },
    { id: "monthly" as FilterPeriod, label: "Bulan", icon: CalendarDays },
    { id: "yearly" as FilterPeriod, label: "Tahun", icon: CalendarRange },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
      {/* Background Decor */}
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
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-md px-4 py-2 rounded-full border border-slate-200/60 shadow-sm mb-4">
              <BarChart3 className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Dashboard Overview
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight mb-2">
              Selamat Datang, Admin!
            </h1>
            <p className="text-slate-500 font-medium text-sm md:text-base">
              Pantau performa organisasi Anda secara real-time
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
            {loading
              ? [...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white/70 backdrop-blur-xl border border-slate-200/60 rounded-3xl p-6 shadow-xl shadow-slate-200/50 animate-pulse"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-slate-200 rounded-2xl"></div>
                      <div className="w-16 h-6 bg-slate-200 rounded-full"></div>
                    </div>
                    <div className="h-4 bg-slate-200 rounded w-2/3 mb-2"></div>
                    <div className="h-8 bg-slate-200 rounded w-1/2"></div>
                  </div>
                ))
              : stats.map((stat, index) => {
                  const colorClasses = getColorClasses(stat.color);
                  const Icon = stat.icon;
                  const isPositive = stat.change > 0;

                  return (
                    <motion.div
                      key={stat.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white/70 backdrop-blur-xl border border-slate-200/60 rounded-3xl p-6 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div
                          className={`w-12 h-12 ${colorClasses.bg} rounded-2xl flex items-center justify-center`}
                        >
                          <Icon className={`w-6 h-6 ${colorClasses.text}`} />
                        </div>
                        <div
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                            isPositive
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-red-50 text-red-700"
                          }`}
                        >
                          {isPositive ? (
                            <ArrowUpRight className="w-3 h-3" />
                          ) : (
                            <ArrowDownRight className="w-3 h-3" />
                          )}
                          {Math.abs(stat.change)}%
                        </div>
                      </div>
                      <p className="text-sm font-semibold text-slate-600 mb-1">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-black text-slate-800">
                        {stat.value}
                      </p>
                    </motion.div>
                  );
                })}
          </div>

          {/* Charts & Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Chart */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-2 bg-white/70 backdrop-blur-xl border border-slate-200/60 rounded-3xl p-6 shadow-xl shadow-slate-200/50"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-800 mb-1">
                    Data Anggota
                  </h3>
                  <p className="text-sm text-slate-500">
                    {periodLabels[filterPeriod]}
                  </p>
                </div>

                {/* Filter Buttons */}
                <div className="inline-flex items-center gap-1 bg-slate-100/80 backdrop-blur-md p-1 rounded-xl border border-slate-200/60">
                  {filterButtons.map((btn) => {
                    const Icon = btn.icon;
                    const isActive = filterPeriod === btn.id;
                    return (
                      <button
                        key={btn.id}
                        onClick={() => setFilterPeriod(btn.id)}
                        className={`relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${
                          isActive
                            ? "bg-white text-blue-600 shadow-sm"
                            : "text-slate-500 hover:text-slate-700"
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        <span>{btn.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="h-64 flex items-end justify-between gap-3">
                {loading
                  ? [...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-slate-200 rounded-t-xl animate-pulse"
                        style={{
                          height: `${skeletonHeights[i] || 50}%`,
                        }}
                      />
                    ))
                  : chartData.map((data, index) => (
                      <motion.div
                        key={`${filterPeriod}-${data.label}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{
                          height: `${(data.value / maxChartValue) * 100}%`,
                          opacity: 1,
                        }}
                        transition={{
                          delay: index * 0.08,
                          duration: 0.5,
                          ease: "easeOut",
                        }}
                        className="flex-1 bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-xl relative group hover:from-blue-700 hover:to-blue-500 transition-all cursor-pointer"
                      >
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs font-bold px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                          {data.value} anggota
                        </div>
                        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-semibold text-slate-500 whitespace-nowrap">
                          {data.label}
                        </div>
                      </motion.div>
                    ))}
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white/70 backdrop-blur-xl border border-slate-200/60 rounded-3xl p-6 shadow-xl shadow-slate-200/50"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-slate-800">
                  Aktivitas Terbaru
                </h3>
                <Clock className="w-5 h-5 text-slate-400" />
              </div>

              <div className="space-y-4">
                {loading
                  ? [...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 animate-pulse"
                      >
                        <div className="w-10 h-10 bg-slate-200 rounded-full flex-shrink-0"></div>
                        <div className="flex-1 space-y-2">
                          <div className="h-3 bg-slate-200 rounded w-3/4"></div>
                          <div className="h-2 bg-slate-100 rounded w-1/2"></div>
                        </div>
                      </div>
                    ))
                  : activities.map((activity, index) => (
                      <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                        className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors"
                      >
                        <div className="flex-shrink-0 mt-0.5">
                          {getStatusIcon(activity.status)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-slate-800 mb-0.5">
                            {activity.action}
                          </p>
                          <p className="text-xs text-slate-500 mb-1">
                            {activity.user}
                          </p>
                          <p className="text-xs text-slate-400">
                            {activity.timestamp}
                          </p>
                        </div>
                      </motion.div>
                    ))}
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}

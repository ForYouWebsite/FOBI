/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SideBar from "../../sidebar/page";
import {
  Users,
  Calendar,
  CreditCard,
  TrendingUp,
  Bell,
  ArrowRight,
  CheckCircle,
  Clock,
  MapPin,
  UserCheck,
  Image as ImageIcon,
} from "lucide-react";

export default function UserDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem("sidebar-state");
    if (saved !== null) {
      setSidebarOpen(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setDashboardData({
        user: {
          name: "Ahmad Rizki",
          role: "Anggota",
          joinDate: "2024-01-15",
          status: "Aktif",
        },
        stats: {
          membershipStatus: "Aktif",
          ktaStatus: "Sudah Terbit",
          activeEvents: 3,
          totalPengurus: 12,
        },
        announcements: [
          {
            id: 1,
            title: "Pendaftaran Anggota Baru Dibuka!",
            content:
              "Segera daftarkan diri Anda untuk menjadi bagian dari FOBI",
            date: "2024-06-15",
            priority: "high",
          },
          {
            id: 2,
            title: "Workshop Leadership",
            content: "Ikuti workshop kepemimpinan pada tanggal 20 Juni 2024",
            date: "2024-06-10",
            priority: "medium",
          },
        ],
        upcomingEvents: [
          {
            id: 1,
            title: "Workshop Public Speaking",
            date: "2024-06-20",
            time: "09:00",
            location: "Aula Sekolah",
            registered: 45,
            quota: 100,
          },
          {
            id: 2,
            title: "Lomba Debat Antar OSIS",
            date: "2024-06-25",
            time: "08:00",
            location: "Gedung Serbaguna",
            registered: 78,
            quota: 150,
          },
          {
            id: 3,
            title: "Bakti Sosial",
            date: "2024-07-01",
            time: "07:00",
            location: "Panti Asuhan",
            registered: 32,
            quota: 50,
          },
        ],
        gallery: [
          { id: 1, url: "/gallery/event1.jpg", title: "Workshop 2024" },
          { id: 2, url: "/gallery/event2.jpg", title: "Lomba Debat" },
          { id: 3, url: "/gallery/event3.jpg", title: "Bakti Sosial" },
          { id: 4, url: "/gallery/event4.jpg", title: "Rapat Koordinasi" },
          { id: 5, url: "/gallery/event5.jpg", title: "Pelantikan" },
          { id: 6, url: "/gallery/event6.jpg", title: "Outbound" },
        ],
      });
      setLoading(false);
    }, 800);
  }, []);

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
          {/* Welcome Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-xl shadow-blue-500/20">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-black mb-2">
                    Halo, {dashboardData?.user.name || "User"}! 👋
                  </h1>
                  <p className="text-blue-100 text-sm md:text-base">
                    Selamat datang kembali di Forum OSIS Banjar Idaman
                  </p>
                  <div className="flex items-center gap-4 mt-4 text-sm">
                    <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full">
                      <CheckCircle className="w-4 h-4" />
                      {dashboardData?.user.status}
                    </span>
                    <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full">
                      <Clock className="w-4 h-4" />
                      Bergabung:{" "}
                      {new Date(
                        dashboardData?.user.joinDate || "",
                      ).toLocaleDateString("id-ID")}
                    </span>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                    <UserCheck className="w-10 h-10" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
            {[
              {
                title: "Status Keanggotaan",
                value: dashboardData?.stats.membershipStatus || "-",
                icon: UserCheck,
                color: "emerald",
                subtitle: "Anggota Aktif",
              },
              {
                title: "Kartu Anggota",
                value: dashboardData?.stats.ktaStatus || "-",
                icon: CreditCard,
                color: "blue",
                subtitle: "KTA Digital",
              },
              {
                title: "Event Aktif",
                value: dashboardData?.stats.activeEvents || 0,
                icon: Calendar,
                color: "purple",
                subtitle: "Sedang berlangsung",
              },
              {
                title: "Total Pengurus",
                value: dashboardData?.stats.totalPengurus || 0,
                icon: Users,
                color: "amber",
                subtitle: "Struktur organisasi",
              },
            ].map((stat, index) => {
              const Icon = stat.icon;
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
                      className={`w-12 h-12 bg-${stat.color}-50 rounded-2xl flex items-center justify-center`}
                    >
                      <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-slate-600 mb-1">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-black text-slate-800 mb-1">
                    {stat.value}
                  </p>
                  <p className="text-xs text-slate-500">{stat.subtitle}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Announcements & Upcoming Events */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Announcements */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/70 backdrop-blur-xl border border-slate-200/60 rounded-3xl p-6 shadow-xl shadow-slate-200/50"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center">
                    <Bell className="w-5 h-5 text-amber-600" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800">
                    Pengumuman Terbaru
                  </h3>
                </div>
              </div>

              <div className="space-y-3">
                {dashboardData?.announcements.map(
                  (announcement: any, index: number) => (
                    <motion.div
                      key={announcement.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className={`p-4 rounded-2xl border-l-4 ${
                        announcement.priority === "high"
                          ? "bg-red-50 border-red-500"
                          : "bg-blue-50 border-blue-500"
                      } hover:shadow-md transition-all cursor-pointer`}
                    >
                      <h4 className="font-bold text-slate-800 text-sm mb-1">
                        {announcement.title}
                      </h4>
                      <p className="text-xs text-slate-600 mb-2">
                        {announcement.content}
                      </p>
                      <p className="text-[10px] text-slate-400 font-semibold">
                        {new Date(announcement.date).toLocaleDateString(
                          "id-ID",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          },
                        )}
                      </p>
                    </motion.div>
                  ),
                )}
              </div>
            </motion.div>

            {/* Upcoming Events */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white/70 backdrop-blur-xl border border-slate-200/60 rounded-3xl p-6 shadow-xl shadow-slate-200/50"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800">
                    Event Mendatang
                  </h3>
                </div>
              </div>

              <div className="space-y-3">
                {dashboardData?.upcomingEvents.map(
                  (event: any, index: number) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-all cursor-pointer group"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-bold text-slate-800 text-sm flex-1">
                          {event.title}
                        </h4>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                      </div>
                      <div className="flex items-center gap-4 text-xs text-slate-600 mb-2">
                        <span className="inline-flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(event.date).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "short",
                          })}{" "}
                          {event.time}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {event.location}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-slate-200 rounded-full h-1.5">
                          <div
                            className="bg-blue-600 h-1.5 rounded-full transition-all"
                            style={{
                              width: `${(event.registered / event.quota) * 100}%`,
                            }}
                          ></div>
                        </div>
                        <span className="text-[10px] font-bold text-slate-600">
                          {event.registered}/{event.quota}
                        </span>
                      </div>
                    </motion.div>
                  ),
                )}
              </div>
            </motion.div>
          </div>

          {/* Gallery */}
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white/70 backdrop-blur-xl border border-slate-200/60 rounded-3xl p-6 shadow-xl shadow-slate-200/50"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
                  <ImageIcon className="w-5 h-5 text-emerald-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-800">
                  Galeri Kegiatan
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {dashboardData?.gallery.map((photo: any, index: number) => (
                <motion.div
                  key={photo.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.05 }}
                  className="aspect-square bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl overflow-hidden group cursor-pointer relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <p className="text-white font-bold text-sm">
                      {photo.title}
                    </p>
                  </div>
                  <ImageIcon className="w-12 h-12 text-slate-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </motion.div>
              ))}
            </div>
          </motion.div> */}
        </main>
      </div>
    </div>
  );
}

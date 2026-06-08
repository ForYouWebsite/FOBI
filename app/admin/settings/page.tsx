"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SideBar from "../../sidebar/page";
import {
  Settings as SettingsIcon,
  Save,
  Upload,
  Globe,
  Mail,
  Bell,
  Shield,
  Palette,
} from "lucide-react";
import toast from "react-hot-toast";

export default function SettingsAdmin() {
  /* eslint-disable react-hooks/set-state-in-effect */

  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("sidebar-state");

    if (saved !== null) {
      setSidebarOpen(JSON.parse(saved));
    }
  }, []);
  const [activeTab, setActiveTab] = useState("general");

  const handleSave = () => {
    toast.success("Pengaturan berhasil disimpan!");
  };

  const tabs = [
    { id: "general", label: "Umum", icon: Globe },
    { id: "email", label: "Email", icon: Mail },
    { id: "notifications", label: "Notifikasi", icon: Bell },
    { id: "security", label: "Keamanan", icon: Shield },
    { id: "appearance", label: "Tampilan", icon: Palette },
  ];

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
            <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-md px-4 py-2 rounded-full border border-slate-200/60 shadow-sm mb-4">
              <SettingsIcon className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Pengaturan Sistem
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight mb-2">
              Konfigurasi Organisasi
            </h1>
            <p className="text-slate-500 font-medium text-sm md:text-base">
              Kelola pengaturan dan preferensi sistem organisasi Anda
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar Tabs */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1"
            >
              <div className="bg-white/70 backdrop-blur-xl border border-slate-200/60 rounded-3xl shadow-xl shadow-slate-200/50 p-4 space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 ${
                        activeTab === tab.id
                          ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                          : "text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-semibold text-sm">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-3"
            >
              <div className="bg-white/70 backdrop-blur-xl border border-slate-200/60 rounded-3xl shadow-xl shadow-slate-200/50 p-6 md:p-8">
                {activeTab === "general" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-bold text-slate-800 mb-4">
                        Informasi Organisasi
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Nama Organisasi
                          </label>
                          <input
                            type="text"
                            defaultValue="Forum OSIS Banjar Idaman"
                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Deskripsi
                          </label>
                          <textarea
                            rows={4}
                            defaultValue="Forum OSIS Banjar Idaman adalah organisasi yang mewadahi siswa-siswi berprestasi..."
                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all resize-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Logo Organisasi
                          </label>
                          <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-blue-500 transition-colors cursor-pointer">
                            <Upload className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                            <p className="text-sm font-semibold text-slate-600 mb-1">
                              Klik untuk upload logo
                            </p>
                            <p className="text-xs text-slate-400">
                              PNG, JPG hingga 5MB
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "email" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-bold text-slate-800 mb-4">
                        Konfigurasi Email
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">
                            SMTP Host
                          </label>
                          <input
                            type="text"
                            defaultValue="smtp.gmail.com"
                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                              SMTP Port
                            </label>
                            <input
                              type="text"
                              defaultValue="587"
                              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                              Encryption
                            </label>
                            <select className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all">
                              <option>TLS</option>
                              <option>SSL</option>
                            </select>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Email Pengirim
                          </label>
                          <input
                            type="email"
                            defaultValue="noreply@forumosis.id"
                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "notifications" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-bold text-slate-800 mb-4">
                        Preferensi Notifikasi
                      </h3>
                      <div className="space-y-4">
                        {[
                          {
                            label: "Notifikasi Email",
                            desc: "Terima notifikasi via email",
                            default: true,
                          },
                          {
                            label: "Notifikasi Push",
                            desc: "Terima notifikasi push browser",
                            default: false,
                          },
                          {
                            label: "Laporan Mingguan",
                            desc: "Terima laporan setiap minggu",
                            default: true,
                          },
                          {
                            label: "Update Sistem",
                            desc: "Notifikasi saat ada update sistem",
                            default: true,
                          },
                        ].map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-4 bg-slate-50 rounded-xl"
                          >
                            <div>
                              <p className="font-semibold text-slate-800 mb-1">
                                {item.label}
                              </p>
                              <p className="text-sm text-slate-500">
                                {item.desc}
                              </p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                defaultChecked={item.default}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "security" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-bold text-slate-800 mb-4">
                        Keamanan Akun
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Password Lama
                          </label>
                          <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Password Baru
                          </label>
                          <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Konfirmasi Password Baru
                          </label>
                          <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                          />
                        </div>
                        {/* <div className="pt-4">
                          <h4 className="font-semibold text-slate-800 mb-3">
                            Two-Factor Authentication
                          </h4>
                          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                            <div>
                              <p className="font-semibold text-slate-800 mb-1">
                                Aktifkan 2FA
                              </p>
                              <p className="text-sm text-slate-500">
                                Tingkatkan keamanan akun Anda
                              </p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" className="sr-only peer" />
                              <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                          </div>
                        </div> */}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "appearance" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-bold text-slate-800 mb-4">
                        Tampilan Sistem
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Tema
                          </label>
                          <div className="grid grid-cols-3 gap-3">
                            {["Light", "Dark", "Auto"].map((theme) => (
                              <button
                                key={theme}
                                className="p-4 border-2 border-slate-200 rounded-xl hover:border-blue-500 transition-colors"
                              >
                                <p className="font-semibold text-slate-700">
                                  {theme}
                                </p>
                              </button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Warna Utama
                          </label>
                          <div className="flex gap-3">
                            {["blue", "purple", "emerald", "amber", "red"].map(
                              (color) => (
                                <button
                                  key={color}
                                  className={`w-12 h-12 rounded-xl bg-${color}-500 hover:scale-110 transition-transform`}
                                />
                              ),
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-end pt-6 border-t border-slate-200">
                  <button
                    onClick={handleSave}
                    className="group inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 active:scale-[0.98]"
                  >
                    <Save className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    Simpan Perubahan
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}

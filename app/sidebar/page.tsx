/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  Calendar,
  CreditCard,
  UserCog,
  BarChart3,
  FolderOpen,
  CalendarCheck,
  Network,
  ChevronRight,
} from "lucide-react";
import toast from "react-hot-toast";

type SideBarProps = {
  onToggle?: (open: boolean) => void;
};

type User = {
  full_name?: string;
  role?: string;
  name?: string;
};

export default function SideBar({ onToggle }: SideBarProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);

    const saved = localStorage.getItem("sidebar-state");

    if (saved !== null) {
      setSidebarOpen(JSON.parse(saved));
    }
  }, []);
  const menuItems = useMemo(() => {
    if (user?.role === "admin") {
      return [
        {
          id: "dashboard",
          label: "Dashboard",
          icon: Home,
          path: "/admin/dashboard",
        },
        {
          id: "event",
          label: "Manajemen Event",
          icon: Calendar,
          path: "/admin/event",
        },
        {
          id: "users",
          label: "Manajemen User",
          icon: Users,
          path: "/admin/users",
        },
        {
          id: "pengurus",
          label: "Data Pengurus",
          icon: UserCog,
          path: "/admin/pengurus",
        },
        {
          id: "kta",
          label: "Manajemen KTA",
          icon: CreditCard,
          path: "/admin/kta",
        },
        {
          id: "laporan",
          label: "Laporan & Analitik",
          icon: BarChart3,
          path: "/admin/laporan",
        },
        {
          id: "settings",
          label: "Pengaturan",
          icon: Settings,
          path: "/admin/settings",
        },
      ];
    }

    if (user?.role === "pengurus") {
      return [
        {
          id: "dashboard",
          label: "Dashboard",
          icon: Home,
          path: "/pengurus/dashboard",
        },
        {
          id: "kta",
          label: "KTA Digital",
          icon: CreditCard,
          path: "/pengurus/kta",
        },
        {
          id: "kegiatan",
          label: "Manajemen Kegiatan",
          icon: CalendarCheck,
          path: "/pengurus/kegiatan",
        },
        {
          id: "anggota",
          label: "Data Anggota",
          icon: Users,
          path: "/pengurus/anggota",
        },
        {
          id: "arsip",
          label: "Arsip Dokumen",
          icon: FolderOpen,
          path: "/pengurus/arsip",
        },
        {
          id: "settings",
          label: "Pengaturan",
          icon: Settings,
          path: "/pengurus/settings",
        },
      ];
    }

    return [
      {
        id: "dashboard",
        label: "Beranda",
        icon: Home,
        path: "/user/dashboard",
      },
      { id: "kta", label: "KTA Saya", icon: CreditCard, path: "/user/kta" },
      {
        id: "profil",
        label: "Profil Saya",
        icon: UserCog,
        path: "/user/profil",
      },
      {
        id: "events",
        label: "Event & Kegiatan",
        icon: Calendar,
        path: "/user/events",
      },
      {
        id: "struktur",
        label: "Struktur Pengurus",
        icon: Network,
        path: "/user/struktur",
      },
      {
        id: "settings",
        label: "Pengaturan",
        icon: Settings,
        path: "/user/settings",
      },
    ];
  }, [user]);

  useEffect(() => {
    const storedUser =
      localStorage.getItem("user") || sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // FIX 1: useEffect ini sekarang hanya untuk sinkronisasi saat pertama load
  // atau navigasi langsung (back/forward browser), bukan saat klik menu biasa.
  // Klik menu sudah di-handle langsung di handleNavigation.
  // useEffect(() => {
  //   const currentPath = pathname || "/";
  //   const activeItem = menuItems.find(
  //     (item) =>
  //       currentPath === item.path ||
  //       currentPath.startsWith(item.path + "/") ||
  //       (item.path === "/dashboard" && currentPath === "/"),
  //   );
  //   if (activeItem) {
  //     setActiveMenu(activeItem.id);
  //   }
  // }, [pathname, menuItems]);

  const activeMenu = useMemo(() => {
    const currentPath = pathname || "/";

    return (
      menuItems.find(
        (item) =>
          currentPath === item.path || currentPath.startsWith(item.path + "/"),
      )?.id ?? ""
    );
  }, [pathname, menuItems]);

  // FIX 2: Set activeMenu LANGSUNG saat klik, sebelum router.push.
  // Ini mencegah Framer Motion animasi dari posisi lama → baru
  // karena state sudah update sebelum re-render berikutnya.
  const handleNavigation = (path: string) => {
    if (pathname === path) return;

    setMobileMenuOpen(false);
    router.push(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    toast.success("Berhasil keluar!");
    setTimeout(() => {
      router.push("/");
    }, 1000);
  };

  const toggleSidebar = () => {
    const newState = !sidebarOpen;

    setSidebarOpen(newState);

    localStorage.setItem("sidebar-state", JSON.stringify(newState));

    onToggle?.(newState);
  };

  const sectionLabel = useMemo(() => {
    if (!user) return "Menu Utama";
    if (user.role === "admin") return "Panel Admin";
    if (user.role === "pengurus") return "Panel Pengurus";
    return "Menu Utama";
  }, [user]);

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarOpen ? 280 : 80 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`
          fixed top-0 left-0 z-50 h-full
          bg-white border-r border-slate-200/50
          flex flex-col
          ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
        // FIX 3: overflow-hidden DIHAPUS dari aside.
        // Dulu overflow-hidden memotong toggle button yang menyembul (-right-3).
        // Sekarang toggle button dipindah ke luar aside (lihat bawah).
        style={{ overflow: "visible" }}
      >
        {/* Logo Section */}
        <div className="p-6 flex items-center gap-3 border-b border-slate-100/50 overflow-hidden">
          <img
            src="/logo.png"
            alt="Logo FOBI"
            className="w-9 h-9 object-contain flex-shrink-0"
          />
          <AnimatePresence>
            {sidebarOpen && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden whitespace-nowrap"
              >
                <h1 className="font-bold text-slate-800 text-base leading-tight">
                  Forum OSIS
                </h1>
                <p className="text-[10px] text-blue-600 font-bold uppercase tracking-widest leading-none mt-0.5">
                  Banjar Idaman
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation Menu */}
        <div className="flex-1 px-4 py-6 space-y-2 overflow-y-auto overflow-x-hidden no-scrollbar">
          <p
            className={`text-[9px] font-black uppercase tracking-[0.2em] mb-4 ml-4 text-slate-400 transition-opacity duration-300 ${
              sidebarOpen ? "opacity-100" : "opacity-0"
            }`}
          >
            {sectionLabel}
          </p>

          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeMenu === item.id;

            return (
              <button
                key={item.id}
                // FIX 2 (lanjutan): pass menuId ke handleNavigation
                onClick={() => handleNavigation(item.path)}
                className={`
                  w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group relative
                  ${
                    isActive
                      ? "bg-blue-600/10 text-blue-700"
                      : "text-slate-400 hover:bg-slate-100"
                  }
                `}
              >
                <Icon
                  size={20}
                  className={`flex-shrink-0 transition-colors duration-300 ${
                    isActive
                      ? "text-blue-700"
                      : "text-slate-400 group-hover:text-slate-700"
                  }`}
                />
                <AnimatePresence>
                  {sidebarOpen && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className="text-sm font-bold whitespace-nowrap"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>

                {isActive && (
                  <motion.div
                    layoutId="sidebar-active-indicator"
                    className="absolute left-0 w-1.5 h-6 rounded-r-full bg-blue-700"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 mt-auto space-y-2 border-t border-slate-100/50 overflow-hidden">
          <AnimatePresence>
            {sidebarOpen ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-2"
              >
                {user && (
                  <div className="flex text-center items-center gap-3 p-3 bg-slate-100/60 rounded-2xl">
                    <div className="flex-1 min-w-0 overflow-hidden">
                      <p className="text-xs font-bold text-slate-800 truncate">
                        {user.full_name || "User"}
                      </p>
                      <p className="text-[10px] text-slate-500 capitalize font-semibold">
                        {user.role || "Member"}
                      </p>
                    </div>
                  </div>
                )}

                <button
                  onClick={handleLogout}
                  className="w-full flex text-center justify-center items-center gap-4 px-4 py-3 rounded-xl text-red-400 hover:bg-red-50 transition-all"
                >
                  <LogOut size={18} className="flex-shrink-0" />
                  <span className="text-xs font-bold uppercase">Logout</span>
                </button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-2"
              >
                <button
                  onClick={handleLogout}
                  className="p-2.5 rounded-xl text-red-400 hover:bg-red-50 transition-colors"
                  title="Logout"
                >
                  <LogOut size={18} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile close button - tetap di dalam aside, tidak perlu keluar */}
        <button
          onClick={() => setMobileMenuOpen(false)}
          className="lg:hidden absolute top-5 right-4 p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors"
        >
          <X size={16} />
        </button>
      </motion.aside>

      {/*
        FIX 3: Toggle button DIPINDAH ke luar <aside>.
        Sekarang posisinya mengikuti lebar sidebar via motion.div wrapper,
        sehingga z-index bekerja dengan benar dan tidak tertimpa sidebar.
      */}
      <motion.div
        className="hidden lg:block fixed top-12 z-[60]"
        initial={false}
        animate={{ left: sidebarOpen ? 280 - 12 : 80 - 12 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <button
          onClick={toggleSidebar}
          className="w-6 h-6 bg-white border border-slate-200 shadow-md rounded-full flex items-center justify-center text-slate-400 hover:text-blue-700 transition-colors"
          aria-label={sidebarOpen ? "Tutup sidebar" : "Buka sidebar"}
        >
          {sidebarOpen ? (
            <ChevronRight className="rotate-180" size={12} />
          ) : (
            <ChevronRight size={12} />
          )}
        </button>
      </motion.div>

      {/* Mobile Menu Button */}
      {!mobileMenuOpen && (
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="lg:hidden fixed top-4 left-4 z-30 p-2 bg-white rounded-lg shadow-md border border-slate-200 text-slate-600"
        >
          <Menu size={18} />
        </button>
      )}
    </>
  );
}

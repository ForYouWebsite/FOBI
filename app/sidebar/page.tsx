/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  Home,
  Settings,
  LogOut,
  Menu,
  X,
  Calendar,
  HelpCircle,
  CreditCard,
  UserCog,
  ShieldCheck,
  BarChart3,
  FolderOpen,
  CalendarCheck,
  Network,
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [activeMenu, setActiveMenu] = useState("dashboard");

  const router = useRouter();
  const pathname = usePathname();

  // Konfigurasi Menu berdasarkan Role
  const menuItems = useMemo(() => {
    if (user?.role === "admin") {
      return [
        {
          id: "dashboard",
          label: "Dashboard",
          icon: LayoutDashboard,
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
          id: "moderasi",
          label: "Moderasi Konten",
          icon: ShieldCheck,
          path: "/admin/moderasi",
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
          label: "Pengaturan Sistem",
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
          icon: LayoutDashboard,
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
          id: "arsip",
          label: "Arsip Dokumen",
          icon: FolderOpen,
          path: "/pengurus/arsip",
        },
        {
          id: "informasi",
          label: "Informasi Data",
          icon: Users,
          path: "/pengurus/informasi",
        },
        {
          id: "struktur",
          label: "Daftar Pengurus",
          icon: Network,
          path: "/pengurus/struktur",
        },
        {
          id: "settings",
          label: "Pengaturan",
          icon: Settings,
          path: "/pengurus/settings",
        },
      ];
    }

    // Default User Role
    return [
      {
        id: "dashboard",
        label: "Beranda",
        icon: Home,
        path: "/user/dashboard",
      },
      { id: "kta", label: "KTA Saya", icon: CreditCard, path: "/user/kta" },
      {
        id: "informasi",
        label: "Informasi Data",
        icon: Users,
        path: "/user/informasi",
      },
      {
        id: "pengurus",
        label: "Daftar Pengurus",
        icon: Network,
        path: "/user/daftar-pengurus",
      },
      {
        id: "events",
        label: "Pendaftaran Event",
        icon: Calendar,
        path: "/user/events",
      },
      {
        id: "settings",
        label: "Pengaturan",
        icon: Settings,
        path: "/user/settings",
      },
      { id: "help", label: "Bantuan", icon: HelpCircle, path: "/user/help" },
    ];
  }, [user]);

  useEffect(() => {
    const storedUser =
      localStorage.getItem("user") || sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const currentPath = pathname || "/";
    const activeItem = menuItems.find(
      (item) =>
        currentPath === item.path ||
        currentPath.startsWith(item.path + "/") ||
        (item.path === "/dashboard" && currentPath === "/"),
    );
    if (activeItem) {
      setActiveMenu(activeItem.id);
    }
  }, [pathname, menuItems]);

  const handleNavigation = (path: string) => {
    router.push(path);
    setMobileMenuOpen(false);
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
    onToggle?.(newState);
  };

  return (
    <div className="min-h-screen font-sans selection:bg-blue-100 bg-[#f8fafc] relative">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full blur-[120px] bg-blue-400/10"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full blur-[100px] bg-indigo-500/10"></div>
      </div>

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

      {/* Sidebar Container */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarOpen ? 288 : 80 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`
          fixed top-0 left-0 z-40 h-full 
          bg-white/95 border-r border-slate-100 backdrop-blur-xl shadow-2xl shadow-blue-900/5
          flex flex-col overflow-hidden
          ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Logo Section */}
        <div className="flex items-center justify-between p-4 border-b border-slate-100 h-20 flex-shrink-0">
          <div className="flex items-center gap-3 overflow-hidden">
            <img
              src="/logo.png"
              alt="Logo FOBI"
              className="w-10 h-10 object-contain drop-shadow-md flex-shrink-0"
            />
            <AnimatePresence>
              {sidebarOpen && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="whitespace-nowrap overflow-hidden"
                >
                  <h1 className="font-black text-sm leading-tight text-slate-800">
                    Forum OSIS
                  </h1>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
                    Banjar Idaman
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={() => {
              toggleSidebar();
              setMobileMenuOpen(false);
            }}
            className="p-2 rounded-xl transition-all hover:bg-slate-100 text-slate-500 hidden lg:flex flex-shrink-0"
          >
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto [&::-webkit-scrollbar]:hidden">
          {user && (
            <>
              <motion.p
                className="text-[10px] font-black uppercase tracking-widest mb-4 ml-2 text-slate-400"
                animate={{ opacity: sidebarOpen ? 1 : 0 }}
              >
                {user.role === "admin"
                  ? "Panel Admin"
                  : user.role === "pengurus"
                    ? "Panel Pengurus"
                    : "Menu Utama"}
              </motion.p>

              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeMenu === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigation(item.path)}
                    className={`
                      relative w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-colors duration-200 group
                      ${isActive ? "text-white" : "text-slate-600 hover:bg-slate-100"}
                      ${!sidebarOpen && "justify-center px-0"}
                    `}
                  >
                    {/* ✨ KUNCI SMOOTHNESS: layoutId membuat background aktif "meluncur" bukan "lompat" */}
                    {isActive && (
                      <motion.div
                        layoutId="active-menu-indicator"
                        className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-lg shadow-blue-500/25"
                        transition={{
                          type: "spring",
                          stiffness: 350,
                          damping: 30,
                        }}
                      />
                    )}

                    <div className="relative z-10 flex-shrink-0">
                      <Icon
                        size={20}
                        className={
                          isActive
                            ? "text-white"
                            : "text-slate-500 group-hover:text-slate-800"
                        }
                      />
                    </div>

                    <AnimatePresence>
                      {sidebarOpen && (
                        <motion.span
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.2 }}
                          className="relative z-10 font-semibold text-sm whitespace-nowrap overflow-hidden"
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>

                    {isActive && sidebarOpen && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="relative z-10 ml-auto w-2 h-2 bg-white rounded-full"
                      />
                    )}
                  </button>
                );
              })}
            </>
          )}
        </nav>

        {/* Sidebar Footer - User & Logout */}
        <div className="p-4 border-t border-slate-100 flex-shrink-0">
          <AnimatePresence mode="wait">
            {sidebarOpen ? (
              <motion.div
                key="expanded"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-3"
              >
                {user && (
                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {user.full_name?.charAt(0) || "U"}
                    </div>
                    <div className="flex-1 min-w-0 overflow-hidden">
                      <p className="font-bold text-sm truncate text-slate-800">
                        {user.full_name || "User"}
                      </p>
                      <p className="text-xs truncate text-slate-500 capitalize">
                        {user.role || "Member"}
                      </p>
                    </div>
                  </div>
                )}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-2xl transition-all text-red-600 hover:bg-red-50"
                >
                  <LogOut size={18} />
                  <span className="font-semibold text-sm">Logout</span>
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="collapsed"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="flex flex-col items-center gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                  {user?.full_name?.charAt(0) || "U"}
                </div>
                <button
                  onClick={handleLogout}
                  className="p-3 rounded-xl transition-all text-red-600 hover:bg-red-50"
                  title="Keluar"
                >
                  <LogOut size={18} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.aside>
    </div>
  );
}

"use client";
import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation"; // ✅ Import router & pathname
import { useMemo } from "react";

import {
  LayoutDashboard,
  Users,
  FileText,
  Home,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  ChevronDown,
  Calendar,
  MessageSquare,
  HelpCircle,
} from "lucide-react";
import toast from "react-hot-toast";

export default function SideBar() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  type User = {
    full_name?: string;
    role?: string;
    name?: string;
  };
  const router = useRouter(); // ✅ Inisialisasi router
  const pathname = usePathname(); // ✅ Untuk sinkronisasi active menu dengan URL
  // Sidebar menu items (with role check)
  const menuItems = useMemo(() => {
    if (user?.role === "admin") {
      return [
        { id: "sistem", label: "Sistem", icon: Home, path: "/admin/dashboard" },
        { id: "event", label: "Event", icon: Bell, path: "/admin/proker" },
      ];
    }

    return [
      { id: "dashboard", label: "Home", icon: Home, path: "/user/dashboard" },
      {
        id: "members",
        label: "Informasi Data",
        icon: Users,
        path: "/user/informasi",
      },
      {
        id: "programs",
        label: "Daftar Pengurus",
        icon: FileText,
        path: "/user/daftar-pengurus",
      },
      {
        id: "calendar",
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
      { id: "help", label: "Bantuan", icon: HelpCircle, path: "/help" },
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
        item.path === currentPath ||
        (item.path === "/dashboard" && currentPath === "/"),
    );
    if (activeItem) {
      setActiveMenu(activeItem.id);
    }
  }, [pathname, menuItems]);
  const [activeMenu, setActiveMenu] = useState("dashboard");

  const handleNavigation = (path: string) => {
    router.push(path);
    setMobileMenuOpen(false);
  };
  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    toast.success("Berhasil keluar!");
    setTimeout(() => {
      router.push("/"); // ✅ Pakai router.push untuk logout
    }, 1000);
  };

  // Stats data for dashboard
  const stats = [
    {
      label: "Total Anggota",
      value: "128",
      change: "+12%",
      icon: Users,
      color: "bg-blue-500",
    },
    {
      label: "Program Aktif",
      value: "8",
      change: "+3",
      icon: FileText,
      color: "bg-indigo-500",
    },
    {
      label: "Event Bulan Ini",
      value: "5",
      change: "2 Mendatang",
      icon: Calendar,
      color: "bg-purple-500",
    },
    {
      label: "Pesan Baru",
      value: "24",
      change: "8 Belum Dibaca",
      icon: MessageSquare,
      color: "bg-emerald-500",
    },
  ];

  // Recent activities
  const activities = [
    {
      id: 1,
      user: "Ahmad Rizki",
      action: "membuat program kerja baru",
      time: "2 jam lalu",
      avatar: "AR",
    },
    {
      id: 2,
      user: "Siti Nurhaliza",
      action: "mengupdate jadwal rapat",
      time: "4 jam lalu",
      avatar: "SN",
    },
    {
      id: 3,
      user: "Budi Santoso",
      action: "mengunggah dokumen proposal",
      time: "6 jam lalu",
      avatar: "BS",
    },
    {
      id: 4,
      user: "Dewi Lestari",
      action: "mengirim pesan ke divisi",
      time: "Kemarin",
      avatar: "DL",
    },
  ];

  return (
    <div
      className={`min-h-screen font-sans selection:bg-blue-100 transition-colors duration-300 bg-[#f8fafc]`}
    >
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full blur-[120px] bg-blue-400/10"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full blur-[100px] bg-indigo-500/10"></div>
      </div>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-40 h-full 
          ${sidebarOpen ? "w-72" : "w-20"} 
          bg-white/95 border-slate-100 border-r backdrop-blur-xl shadow-2xl shadow-blue-900/5
          transition-all duration-300 ease-in-out
          ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Logo Section */}
        <div
          className={`flex items-center ${sidebarOpen ? "justify-between" : "justify-center"} p-4 border-b border-slate-100`}
        >
          {sidebarOpen && (
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="Logo FOBI"
                className="w-10 h-10 object-contain drop-shadow-md"
              />
              <div>
                <h1 className="font-black text-sm leading-tight text-slate-800">
                  Forum OSIS
                </h1>
                <p className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
                  Banjar Idaman
                </p>
              </div>
            </div>
          )}
          {!sidebarOpen && (
            <img
              src="/logo.png"
              alt="Logo FOBI"
              className="w-10 h-10 object-contain drop-shadow-md"
            />
          )}
          <button
            onClick={() => {
              setSidebarOpen(!sidebarOpen);
              setMobileMenuOpen(false);
            }}
            className="p-2 rounded-xl transition-all hover:bg-slate-100 text-slate-500 hidden lg:flex"
          >
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4 space-y-2 overflow-y-auto max-h-[calc(100vh-180px)]">
          {!user
            ? null
            : menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeMenu === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigation(item.path)}
                    className={`
                  w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-200 group
                  ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg shadow-blue-500/25"
                      : "text-slate-600 hover:bg-slate-100"
                  }
                  ${!sidebarOpen && "justify-center px-3"}
                `}
                  >
                    <Icon size={20} className="flex-shrink-0" />
                    {sidebarOpen && (
                      <span className="font-semibold text-sm whitespace-nowrap">
                        {item.label}
                      </span>
                    )}
                    {isActive && sidebarOpen && (
                      <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse" />
                    )}
                  </button>
                );
              })}
        </nav>

        {/* Sidebar Footer - User & Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-100">
          {sidebarOpen ? (
            user && (
              <div className="space-y-3">
                {/* User Profile */}
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50">
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm truncate text-slate-800">
                      {user.full_name}
                    </p>
                    <p className="text-xs truncate text-slate-500">
                      {user.role}
                    </p>
                  </div>
                </div>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all text-slate-500 hover:bg-slate-100"
                >
                  <LogOut size={18} />
                  <span className="font-semibold text-sm">Keluar</span>
                </button>
              </div>
            )
          ) : (
            <div className="flex flex-col items-center gap-4">
              <button
                onClick={handleLogout}
                className="p-3 rounded-xl transition-all text-red-600 hover:bg-red-50"
                title="Keluar"
              >
                <LogOut size={18} />
              </button>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}

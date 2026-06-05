/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import SideBar from "../../sidebar/page";
import {
  Plus,
  Pencil,
  Trash2,
  ClipboardList,
  Search,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Loader2,
  ArrowLeft,
} from "lucide-react";

const API = axios.create({
  baseURL: "https://hmcf55cz-5000.asse.devtunnels.ms/api",
});

type Proker = {
  id: number;
  title: string;
  status: string;
};

export default function ProkerAdmin() {
  const router = useRouter();
  const [prokers, setProkers] = useState<Proker[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const getToken = () => {
    const raw =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    return raw?.replace(/"/g, "").trim();
  };

  const fetchProkers = async () => {
    try {
      setLoading(true);
      const res = await API.get("/proker");
      setProkers(res.data.data);
    } catch (err) {
      console.error("Error fetch proker:", err);
      toast.error("Gagal memuat data proker");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProkers();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus data ini?")) return;

    const token = getToken();
    if (!token) {
      toast.error("Session habis, silakan login ulang");
      return;
    }

    try {
      await API.delete(`/proker/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Data proker berhasil dihapus");
      fetchProkers();
      router.refresh();
    } catch (err: any) {
      console.error("Error delete:", err?.response?.data || err.message);
      toast.error("Gagal menghapus data");
    }
  };

  // Filter prokers based on search
  const filteredProkers = prokers.filter((proker) =>
    `${proker.title} ${proker.status}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase()),
  );

  // Helper untuk status badge
  const getStatusBadge = (status: string) => {
    const baseClass =
      "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold";

    switch (status?.toLowerCase()) {
      case "aktif":
      case "active":
        return `${baseClass} bg-emerald-50 text-emerald-700 border border-emerald-100`;
      case "selesai":
      case "completed":
        return `${baseClass} bg-blue-50 text-blue-700 border border-blue-100`;
      case "pending":
        return `${baseClass} bg-amber-50 text-amber-700 border border-amber-100`;
      default:
        return `${baseClass} bg-slate-100 text-slate-700 border border-slate-200`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
      {/* Background Decor - Sama persis dengan MemberAdmin */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-200/5 to-indigo-200/5 rounded-full blur-[150px]"></div>
      </div>

      <div className="relative z-10 flex">
        {/* Sidebar dengan callback sync */}
        <SideBar onToggle={(open: boolean) => setSidebarOpen(open)} />

        {/* Main Content - Margin sync dengan sidebar */}
        <main
          className={`flex-1 p-4 md:p-8 lg:p-10 transition-[margin] duration-300 ease-in-out will-change-[margin] ${
            sidebarOpen ? "lg:ml-[288px]" : "lg:ml-[80px]"
          }`}
        >
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-md px-4 py-2 rounded-full border border-slate-200/60 shadow-sm">
                  <ClipboardList className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                    Manajemen Program
                  </span>
                </div>
                <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">
                  Data Program Kerja
                </h1>
                <p className="text-slate-500 font-medium text-sm md:text-base">
                  Kelola dan pantau seluruh program kerja organisasi dengan
                  mudah
                </p>
              </div>

              <Link href="/admin/proker/create">
                <button className="group inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-5 py-3 rounded-2xl font-semibold shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 active:scale-[0.98] text-sm md:text-base">
                  <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
                  Tambah Proker
                </button>
              </Link>
            </div>
          </div>

          {/* Search & Actions Bar */}
          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Cari judul atau status proker..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/80 backdrop-blur-md border border-slate-200 rounded-2xl py-3.5 pl-12 pr-4 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all font-medium text-slate-700 text-sm md:text-base shadow-sm"
              />
            </div>
            {/* <button
              onClick={fetchProkers}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 bg-white/80 backdrop-blur-md border border-slate-200 text-slate-700 px-5 py-3 rounded-2xl font-semibold hover:bg-white hover:border-slate-300 transition-all duration-300 shadow-sm disabled:opacity-50"
            >
              <RefreshCw
                className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
              />
              Refresh
            </button> */}
          </div>

          {/* Content Card */}
          <div className="bg-white/70 backdrop-blur-xl border border-slate-200/60 rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden">
            {/* Table Header Stats */}
            <div className="px-6 py-4 border-b border-slate-200/60 bg-gradient-to-r from-slate-50/50 to-transparent">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-600">
                  Total:{" "}
                  <span className="text-blue-600">
                    {filteredProkers.length}
                  </span>{" "}
                  program kerja
                </p>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>Data tersinkronisasi</span>
                </div>
              </div>
            </div>

            {/* Table Content */}
            <div className="overflow-x-auto">
              {loading ? (
                // Loading State - Elegant Skeleton
                <div className="p-8 space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 animate-pulse"
                    >
                      <div className="w-10 h-10 bg-slate-200 rounded-full"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-slate-200 rounded w-1/3"></div>
                        <div className="h-3 bg-slate-100 rounded w-1/4"></div>
                      </div>
                      <div className="h-8 w-20 bg-slate-200 rounded-xl"></div>
                    </div>
                  ))}
                </div>
              ) : filteredProkers.length === 0 ? (
                // Empty State
                <div className="py-16 px-6 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-4">
                    <AlertCircle className="w-8 h-8 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-700 mb-2">
                    {searchQuery
                      ? "Tidak ada hasil ditemukan"
                      : "Belum ada data program kerja"}
                  </h3>
                  <p className="text-slate-500 text-sm mb-6 max-w-md mx-auto">
                    {searchQuery
                      ? "Coba gunakan kata kunci lain untuk menemukan data yang Anda cari."
                      : "Mulai tambahkan program kerja untuk mengelola kegiatan organisasi Anda."}
                  </p>
                  {!searchQuery && (
                    <Link href="/admin/proker/create">
                      <button className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-5 py-2.5 rounded-xl font-semibold text-sm shadow-lg shadow-blue-500/25 hover:shadow-xl transition-all">
                        <Plus className="w-4 h-4" />
                        Tambah Proker Pertama
                      </button>
                    </Link>
                  )}
                </div>
              ) : (
                // Data Table
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-slate-50 to-slate-100/50">
                      <th className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-wider">
                        No
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-wider">
                        Judul Program
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-black text-slate-400 uppercase tracking-wider">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredProkers.map((item, index) => (
                      <tr
                        key={item.id}
                        className="group hover:bg-blue-50/40 transition-colors duration-200"
                      >
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center justify-center w-8 h-8 bg-slate-100 rounded-lg text-sm font-bold text-slate-600">
                            {index + 1}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <p className="font-bold text-slate-800 text-sm md:text-base">
                            {item.title}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <span className={getStatusBadge(item.status)}>
                            <span className="w-1.5 h-1.5 rounded-full bg-current" />
                            {item.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <Link href={`/admin/proker/edit/${item.id}`}>
                              <button
                                className="group inline-flex items-center justify-center w-9 h-9 bg-amber-100 hover:bg-amber-200 text-amber-700 rounded-xl transition-all duration-200 shadow-sm hover:shadow"
                                title="Edit"
                              >
                                <Pencil className="w-4 h-4 group-hover:scale-110 transition-transform" />
                              </button>
                            </Link>
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="group inline-flex items-center justify-center w-9 h-9 bg-red-100 hover:bg-red-200 text-red-600 rounded-xl transition-all duration-200 shadow-sm hover:shadow"
                              title="Hapus"
                            >
                              <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* Table Footer */}
            {!loading && filteredProkers.length > 0 && (
              <div className="px-6 py-4 border-t border-slate-200/60 bg-gradient-to-r from-transparent to-slate-50/50">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <p>
                    Menampilkan {filteredProkers.length} dari {prokers.length}{" "}
                    data
                  </p>
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                    <span>Live data</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

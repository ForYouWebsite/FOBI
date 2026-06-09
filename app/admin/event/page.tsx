/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import SideBar from "../../sidebar/page";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import {
  Plus,
  Pencil,
  Trash2,
  Calendar,
  Search,
  CheckCircle,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  Eye,
  MapPin,
  Users,
  Clock,
  Filter,
  Sparkles,
  TrendingUp,
  FileText,
  MoreVertical,
  Tag,
  X,
} from "lucide-react";

type Event = {
  id: number;
  title: string;
  category: string;
  startDate: string;
  endDate: string;
  location: string;
  quota: number;
  registered: number;
  pic: string;
  status: "draft" | "published" | "completed" | "cancelled";
};

export default function EventAdmin() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<keyof Event>("startDate");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const itemsPerPage = 8;

  useEffect(() => {
    const saved = localStorage.getItem("sidebar-state");
    if (saved !== null) {
      setSidebarOpen(JSON.parse(saved));
    }
  }, []);

  // Dummy Data - Event FOBI yang realistis
  useEffect(() => {
    setTimeout(() => {
      const dummyData: Event[] = [
        {
          id: 1,
          title: "Workshop Public Speaking",
          category: "Workshop",
          startDate: "2024-06-20",
          endDate: "2024-06-20",
          location: "Aula SMK Banjar Idaman",
          quota: 100,
          registered: 87,
          pic: "Eko Prasetyo",
          status: "published",
        },
        {
          id: 2,
          title: "Lomba Debat Antar OSIS Se-Kota",
          category: "Kompetisi",
          startDate: "2024-06-25",
          endDate: "2024-06-26",
          location: "Gedung Serbaguna Kota Banjar",
          quota: 150,
          registered: 142,
          pic: "Ahmad Rizki",
          status: "published",
        },
        {
          id: 3,
          title: "Bakti Sosial Panti Asuhan",
          category: "Sosial",
          startDate: "2024-07-01",
          endDate: "2024-07-01",
          location: "Panti Asuhan Harapan Bangsa",
          quota: 50,
          registered: 32,
          pic: "Hani Susanti",
          status: "published",
        },
        {
          id: 4,
          title: "Leadership Training 3 Hari",
          category: "Training",
          startDate: "2024-06-15",
          endDate: "2024-06-17",
          location: "Villa Pendidikan Cimahi",
          quota: 80,
          registered: 80,
          pic: "Siti Nurhaliza",
          status: "completed",
        },
        {
          id: 5,
          title: "Seminar Pendidikan Karakter",
          category: "Seminar",
          startDate: "2024-05-20",
          endDate: "2024-05-20",
          location: "Aula SMK Banjar Idaman",
          quota: 200,
          registered: 185,
          pic: "Gunawan Wibowo",
          status: "completed",
        },
        {
          id: 6,
          title: "Outbound & Team Building",
          category: "Outbound",
          startDate: "2024-05-10",
          endDate: "2024-05-11",
          location: "Green Canyon Pangandaran",
          quota: 60,
          registered: 58,
          pic: "Fitri Handayani",
          status: "completed",
        },
        {
          id: 7,
          title: "Rapat Koordinasi Divisi",
          category: "Rapat",
          startDate: "2024-07-05",
          endDate: "2024-07-05",
          location: "Ruang OSIS",
          quota: 25,
          registered: 18,
          pic: "Budi Santoso",
          status: "draft",
        },
        {
          id: 8,
          title: "Pelantikan Pengurus Baru",
          category: "Seremonial",
          startDate: "2024-07-15",
          endDate: "2024-07-15",
          location: "Lapangan Upacara",
          quota: 300,
          registered: 0,
          pic: "Ahmad Rizki",
          status: "draft",
        },
        {
          id: 9,
          title: "Festival Seni Budaya",
          category: "Festival",
          startDate: "2024-04-15",
          endDate: "2024-04-17",
          location: "Gedung Kesenian Kota",
          quota: 500,
          registered: 420,
          pic: "Dewi Lestari",
          status: "cancelled",
        },
        {
          id: 10,
          title: "Turnamen Futsal Antar Kelas",
          category: "Kompetisi",
          startDate: "2024-07-20",
          endDate: "2024-07-22",
          location: "Lapangan Futsal Banjar",
          quota: 120,
          registered: 95,
          pic: "Gunawan Wibowo",
          status: "published",
        },
        {
          id: 11,
          title: "Workshop Jurnalistik Dasar",
          category: "Workshop",
          startDate: "2024-07-25",
          endDate: "2024-07-25",
          location: "Lab Komputer",
          quota: 40,
          registered: 28,
          pic: "Fitri Handayani",
          status: "published",
        },
        {
          id: 12,
          title: "Donor Darah Massal",
          category: "Sosial",
          startDate: "2024-08-01",
          endDate: "2024-08-01",
          location: "Aula SMK Banjar Idaman",
          quota: 100,
          registered: 45,
          pic: "Hani Susanti",
          status: "published",
        },
      ];
      setEvents(dummyData);
      setLoading(false);
    }, 800);
  }, []);

  const handleSort = (field: keyof Event) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleSelectAll = () => {
    if (selectedIds.length === paginatedData.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(paginatedData.map((item) => item.id));
    }
  };

  const handleSelectOne = (id: number) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) {
      toast.error("Pilih event yang ingin dihapus");
      return;
    }

    const result = await Swal.fire({
      title: "Hapus Event Terpilih?",
      html: `
        <div class="text-left">
          <p class="text-sm text-slate-600 mb-2">Anda akan menghapus <strong class="text-red-600">${selectedIds.length} event</strong> secara permanen.</p>
          <p class="text-xs text-slate-500">Data peserta yang sudah terdaftar juga akan terhapus.</p>
        </div>
      `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#94a3b8",
      confirmButtonText: "Ya, Hapus",
      cancelButtonText: "Batal",
      reverseButtons: true,
      customClass: { popup: "rounded-2xl" },
    });

    if (result.isConfirmed) {
      const count = selectedIds.length;
      setEvents(events.filter((item) => !selectedIds.includes(item.id)));
      setSelectedIds([]);
      toast.success(`${count} event berhasil dihapus`);
    }
  };

  const handleDelete = async (id: number, title: string) => {
    const result = await Swal.fire({
      title: "Hapus Event?",
      html: `
        <div class="text-left">
          <p class="text-sm text-slate-600 mb-2">Apakah Anda yakin ingin menghapus event:</p>
          <div class="bg-slate-50 border border-slate-200 rounded-xl p-3">
            <p class="font-bold text-slate-800 text-sm">${title}</p>
            <p class="text-xs text-slate-500 mt-1">Tindakan ini tidak dapat dibatalkan</p>
          </div>
        </div>
      `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#94a3b8",
      confirmButtonText: "Ya, Hapus",
      cancelButtonText: "Batal",
      reverseButtons: true,
      customClass: { popup: "rounded-2xl" },
    });

    if (result.isConfirmed) {
      setEvents(events.filter((item) => item.id !== id));
      toast.success("Event berhasil dihapus");
    }
  };

  // Filter & Sort
  const filteredData = events
    .filter((item) => {
      const matchSearch =
        `${item.title} ${item.category} ${item.location} ${item.pic}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
      const matchCategory =
        filterCategory === "all" || item.category === filterCategory;
      const matchStatus =
        filterStatus === "all" || item.status === filterStatus;
      return matchSearch && matchCategory && matchStatus;
    })
    .sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
      if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  // Unique categories for filter
  const categories = Array.from(new Set(events.map((e) => e.category)));

  // Stats
  const totalPublished = events.filter((e) => e.status === "published").length;
  const totalDraft = events.filter((e) => e.status === "draft").length;
  const totalCompleted = events.filter((e) => e.status === "completed").length;
  const totalParticipants = events.reduce((sum, e) => sum + e.registered, 0);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "published":
        return {
          bg: "bg-emerald-50",
          text: "text-emerald-700",
          border: "border-emerald-200",
          dot: "bg-emerald-500",
          label: "Published",
        };
      case "draft":
        return {
          bg: "bg-slate-50",
          text: "text-slate-600",
          border: "border-slate-200",
          dot: "bg-slate-400",
          label: "Draft",
        };
      case "completed":
        return {
          bg: "bg-blue-50",
          text: "text-blue-700",
          border: "border-blue-200",
          dot: "bg-blue-500",
          label: "Selesai",
        };
      case "cancelled":
        return {
          bg: "bg-red-50",
          text: "text-red-700",
          border: "border-red-200",
          dot: "bg-red-500",
          label: "Dibatalkan",
        };
      default:
        return {
          bg: "bg-slate-50",
          text: "text-slate-600",
          border: "border-slate-200",
          dot: "bg-slate-400",
          label: status,
        };
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Workshop: "bg-purple-100 text-purple-700",
      Kompetisi: "bg-orange-100 text-orange-700",
      Sosial: "bg-pink-100 text-pink-700",
      Training: "bg-indigo-100 text-indigo-700",
      Seminar: "bg-cyan-100 text-cyan-700",
      Outbound: "bg-emerald-100 text-emerald-700",
      Rapat: "bg-slate-100 text-slate-700",
      Seremonial: "bg-amber-100 text-amber-700",
      Festival: "bg-rose-100 text-rose-700",
    };
    return colors[category] || "bg-slate-100 text-slate-700";
  };

  const resetFilters = () => {
    setSearchQuery("");
    setFilterCategory("all");
    setFilterStatus("all");
    setCurrentPage(1);
  };

  const hasActiveFilters =
    searchQuery || filterCategory !== "all" || filterStatus !== "all";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="relative z-10 flex overflow-x-hidden">
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
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-md px-4 py-2 rounded-full border border-slate-200/60 shadow-sm">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                    Manajemen Event
                  </span>
                </div>
                <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">
                  Kegiatan FOBI
                </h1>
                <p className="text-slate-500 font-medium text-sm md:text-base">
                  Kelola seluruh program kerja dan kegiatan organisasi
                </p>
              </div>

              <button
                onClick={() =>
                  toast.success("Fitur tambah event akan segera tersedia!")
                }
                className="group inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-5 py-3 rounded-2xl font-semibold shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 active:scale-[0.98] text-sm md:text-base"
              >
                <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
                Buat Event Baru
              </button>
            </div>
          </motion.div>

          {/* Stats Cards - Variatif */}
          {/* <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-5 shadow-lg shadow-blue-500/20 text-white relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <Sparkles className="w-4 h-4 opacity-60" />
                </div>
                <p className="text-xs font-semibold text-blue-100 uppercase tracking-wider mb-1">
                  Total Event
                </p>
                <p className="text-3xl font-black">{events.length}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/70 backdrop-blur-xl border border-slate-200/60 rounded-2xl p-5 shadow-lg shadow-slate-200/50"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                </div>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                  AKTIF
                </span>
              </div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Published
              </p>
              <p className="text-3xl font-black text-slate-800">
                {totalPublished}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="bg-white/70 backdrop-blur-xl border border-slate-200/60 rounded-2xl p-5 shadow-lg shadow-slate-200/50"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center">
                  <FileText className="w-5 h-5 text-amber-600" />
                </div>
                <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-lg">
                  DRAFT
                </span>
              </div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Perlu Review
              </p>
              <p className="text-3xl font-black text-slate-800">{totalDraft}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/70 backdrop-blur-xl border border-slate-200/60 rounded-2xl p-5 shadow-lg shadow-slate-200/50"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
                  <Users className="w-5 h-5 text-purple-600" />
                </div>
                <TrendingUp className="w-4 h-4 text-purple-500" />
              </div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Total Peserta
              </p>
              <p className="text-3xl font-black text-slate-800">
                {totalParticipants.toLocaleString()}
              </p>
            </motion.div>
          </div> */}

          {/* Search & Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="mb-6 space-y-4"
          >
            {/* Search Bar */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Cari event, lokasi, atau PIC..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full bg-white/80 backdrop-blur-md border border-slate-200 rounded-2xl py-3.5 pl-12 pr-4 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all font-medium text-slate-700 text-sm shadow-sm"
                />
              </div>

              {selectedIds.length > 0 && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={handleBulkDelete}
                  className="inline-flex items-center justify-center gap-2 bg-red-500 text-white px-5 py-3 rounded-2xl font-semibold hover:bg-red-600 transition-all shadow-sm"
                >
                  <Trash2 className="w-4 h-4" />
                  Hapus ({selectedIds.length})
                </motion.button>
              )}

              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="inline-flex items-center justify-center gap-2 bg-white/80 backdrop-blur-md border border-slate-200 text-slate-700 px-4 py-3 rounded-2xl font-semibold hover:bg-white transition-all shadow-sm text-sm"
                >
                  <X className="w-4 h-4" />
                  Reset
                </button>
              )}
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-3">
              {/* Category Filter */}
              <div className="flex items-center gap-2 bg-white/70 backdrop-blur-md border border-slate-200 rounded-2xl px-3 py-2 shadow-sm">
                <Tag className="w-4 h-4 text-slate-400" />
                <select
                  value={filterCategory}
                  onChange={(e) => {
                    setFilterCategory(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="bg-transparent outline-none text-sm font-semibold text-slate-700 pr-2"
                >
                  <option value="all">Semua Kategori</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status Filter Pills */}
              <div className="flex items-center gap-1 bg-white/70 backdrop-blur-md border border-slate-200 rounded-2xl p-1 shadow-sm">
                {[
                  { value: "all", label: "Semua" },
                  { value: "published", label: "Published" },
                  { value: "draft", label: "Draft" },
                  { value: "completed", label: "Selesai" },
                  { value: "cancelled", label: "Batal" },
                ].map((status) => (
                  <button
                    key={status.value}
                    onClick={() => {
                      setFilterStatus(status.value);
                      setCurrentPage(1);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      filterStatus === status.value
                        ? "bg-blue-600 text-white shadow-sm"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {status.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/70 backdrop-blur-xl border border-slate-200/60 rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-slate-200/60 bg-gradient-to-r from-slate-50/50 to-transparent">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-600">
                  Menampilkan{" "}
                  <span className="text-blue-600">
                    {paginatedData.length} dari {filteredData.length}
                  </span>{" "}
                  event
                </p>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>Data tersinkronisasi</span>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              {loading ? (
                <div className="p-8 space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 animate-pulse"
                    >
                      <div className="w-10 h-10 bg-slate-200 rounded-xl"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-slate-200 rounded w-1/3"></div>
                        <div className="h-3 bg-slate-100 rounded w-1/4"></div>
                      </div>
                      <div className="h-8 w-20 bg-slate-200 rounded-xl"></div>
                    </div>
                  ))}
                </div>
              ) : filteredData.length === 0 ? (
                <div className="py-16 px-6 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-4">
                    <AlertCircle className="w-8 h-8 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-700 mb-2">
                    {hasActiveFilters
                      ? "Tidak ada event yang cocok"
                      : "Belum ada event"}
                  </h3>
                  <p className="text-slate-500 text-sm mb-6 max-w-md mx-auto">
                    {hasActiveFilters
                      ? "Coba ubah filter atau kata kunci pencarian Anda."
                      : "Mulai buat event pertama untuk organisasi Anda."}
                  </p>
                  {hasActiveFilters ? (
                    <button
                      onClick={resetFilters}
                      className="inline-flex items-center gap-2 bg-slate-100 text-slate-700 px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-slate-200 transition-all"
                    >
                      <X className="w-4 h-4" />
                      Reset Filter
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        toast.success(
                          "Fitur tambah event akan segera tersedia!",
                        )
                      }
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-5 py-2.5 rounded-xl font-semibold text-sm shadow-lg shadow-blue-500/25 hover:shadow-xl transition-all"
                    >
                      <Plus className="w-4 h-4" />
                      Buat Event Pertama
                    </button>
                  )}
                </div>
              ) : (
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-slate-50 to-slate-100/50">
                      <th className="px-6 py-4 text-left w-10">
                        <input
                          type="checkbox"
                          checked={
                            selectedIds.length === paginatedData.length &&
                            paginatedData.length > 0
                          }
                          onChange={handleSelectAll}
                          className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                        />
                      </th>
                      <th
                        onClick={() => handleSort("title")}
                        className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-wider cursor-pointer hover:text-slate-600 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          Event
                          <ArrowUpDown className="w-3 h-3" />
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-wider">
                        Kategori
                      </th>
                      <th
                        onClick={() => handleSort("startDate")}
                        className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-wider cursor-pointer hover:text-slate-600 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          Tanggal
                          <ArrowUpDown className="w-3 h-3" />
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-wider">
                        Lokasi
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-wider">
                        Peserta
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-black text-slate-400 uppercase tracking-wider w-24">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {paginatedData.map((item) => {
                      const statusStyle = getStatusStyle(item.status);
                      const quotaPercent = Math.round(
                        (item.registered / item.quota) * 100,
                      );
                      const isFull = item.registered >= item.quota;

                      return (
                        <tr
                          key={item.id}
                          className={`group hover:bg-blue-50/40 transition-colors duration-200 ${
                            selectedIds.includes(item.id) ? "bg-blue-50/60" : ""
                          }`}
                        >
                          <td className="px-6 py-4">
                            <input
                              type="checkbox"
                              checked={selectedIds.includes(item.id)}
                              onChange={() => handleSelectOne(item.id)}
                              className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                            />
                          </td>
                          <td className="px-6 py-4">
                            <div>
                              <p className="font-bold text-slate-800 text-sm mb-1 line-clamp-1">
                                {item.title}
                              </p>
                              <p className="text-xs text-slate-500">
                                PIC:{" "}
                                <span className="font-semibold text-slate-700">
                                  {item.pic}
                                </span>
                              </p>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold ${getCategoryColor(item.category)}`}
                            >
                              {item.category}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <Clock className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                              <div>
                                <p className="text-sm text-slate-700 font-semibold">
                                  {new Date(item.startDate).toLocaleDateString(
                                    "id-ID",
                                    {
                                      day: "numeric",
                                      month: "short",
                                    },
                                  )}
                                </p>
                                {item.startDate !== item.endDate && (
                                  <p className="text-[10px] text-slate-400">
                                    s/d{" "}
                                    {new Date(item.endDate).toLocaleDateString(
                                      "id-ID",
                                      {
                                        day: "numeric",
                                        month: "short",
                                      },
                                    )}
                                  </p>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                              <p className="text-sm text-slate-600 max-w-[180px] truncate">
                                {item.location}
                              </p>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="min-w-[120px]">
                              <div className="flex items-center justify-between text-xs mb-1.5">
                                <span
                                  className={`font-bold ${isFull ? "text-red-600" : "text-slate-700"}`}
                                >
                                  {item.registered}/{item.quota}
                                </span>
                                <span className="text-slate-400">
                                  {quotaPercent}%
                                </span>
                              </div>
                              <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                                <div
                                  className={`h-1.5 rounded-full transition-all ${
                                    isFull
                                      ? "bg-red-500"
                                      : quotaPercent > 75
                                        ? "bg-amber-500"
                                        : "bg-emerald-500"
                                  }`}
                                  style={{
                                    width: `${Math.min(quotaPercent, 100)}%`,
                                  }}
                                ></div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold border ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`}
                              ></span>
                              {statusStyle.label}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() =>
                                  toast(`Detail: ${item.title}`, {
                                    icon: "📅",
                                    style: {
                                      borderRadius: "12px",
                                      background: "#333",
                                      color: "#fff",
                                    },
                                  })
                                }
                                className="group inline-flex items-center justify-center w-8 h-8 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-all duration-200"
                                title="Lihat Detail"
                              >
                                <Eye className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                              </button>
                              <button
                                onClick={() =>
                                  toast.success(
                                    `Fitur edit untuk "${item.title}" akan segera tersedia!`,
                                  )
                                }
                                className="group inline-flex items-center justify-center w-8 h-8 bg-amber-100 hover:bg-amber-200 text-amber-700 rounded-lg transition-all duration-200"
                                title="Edit"
                              >
                                <Pencil className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                              </button>
                              <button
                                onClick={() =>
                                  handleDelete(item.id, item.title)
                                }
                                className="group inline-flex items-center justify-center w-8 h-8 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition-all duration-200"
                                title="Hapus"
                              >
                                <Trash2 className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>

            {/* Pagination */}
            {!loading && filteredData.length > 0 && (
              <div className="px-6 py-4 border-t border-slate-200/60 bg-gradient-to-r from-transparent to-slate-50/50">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <p className="text-xs text-slate-500">
                    Halaman{" "}
                    <span className="font-bold text-slate-700">
                      {currentPage}
                    </span>{" "}
                    dari{" "}
                    <span className="font-bold text-slate-700">
                      {totalPages}
                    </span>
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        setCurrentPage(Math.max(1, currentPage - 1))
                      }
                      disabled={currentPage === 1}
                      className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`min-w-[36px] h-9 rounded-lg font-semibold text-sm transition-all ${
                            currentPage === pageNum
                              ? "bg-blue-600 text-white shadow-md shadow-blue-500/25"
                              : "border border-slate-200 text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                    <button
                      onClick={() =>
                        setCurrentPage(Math.min(totalPages, currentPage + 1))
                      }
                      disabled={currentPage === totalPages}
                      className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </main>
      </div>
    </div>
  );
}

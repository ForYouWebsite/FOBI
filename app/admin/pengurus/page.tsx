"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SideBar from "../../sidebar/page";
import {
  Plus,
  Pencil,
  Trash2,
  Users,
  Search,
  Filter,
  CheckCircle,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  X,
} from "lucide-react";
import toast from "react-hot-toast";

type Pengurus = {
  id: number;
  name: string;
  position: string;
  email: string;
  phone: string;
  joinDate: string;
  status: "active" | "inactive";
};

export default function PengurusAdmin() {
  /* eslint-disable react-hooks/set-state-in-effect */

  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("sidebar-state");

    if (saved !== null) {
      setSidebarOpen(JSON.parse(saved));
    }
  }, []);
  const [pengurus, setPengurus] = useState<Pengurus[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<keyof Pengurus>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const itemsPerPage = 10;

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const dummyData: Pengurus[] = [
        {
          id: 1,
          name: "Ahmad Rizki Pratama",
          position: "Ketua Umum",
          email: "ahmad.rizki@forumosis.id",
          phone: "081234567890",
          joinDate: "2023-01-15",
          status: "active",
        },
        {
          id: 2,
          name: "Siti Nurhaliza",
          position: "Wakil Ketua",
          email: "siti.nurhaliza@forumosis.id",
          phone: "081234567891",
          joinDate: "2023-01-15",
          status: "active",
        },
        {
          id: 3,
          name: "Budi Santoso",
          position: "Sekretaris",
          email: "budi.santoso@forumosis.id",
          phone: "081234567892",
          joinDate: "2023-02-01",
          status: "active",
        },
        {
          id: 4,
          name: "Dewi Lestari",
          position: "Bendahara",
          email: "dewi.lestari@forumosis.id",
          phone: "081234567893",
          joinDate: "2023-02-01",
          status: "active",
        },
        {
          id: 5,
          name: "Eko Prasetyo",
          position: "Koordinator Event",
          email: "eko.prasetyo@forumosis.id",
          phone: "081234567894",
          joinDate: "2023-03-10",
          status: "inactive",
        },
        {
          id: 6,
          name: "Fitri Handayani",
          position: "Koordinator Humas",
          email: "fitri.handayani@forumosis.id",
          phone: "081234567895",
          joinDate: "2023-03-10",
          status: "active",
        },
        {
          id: 7,
          name: "Gunawan Wibowo",
          position: "Koordinator Pendidikan",
          email: "gunawan.wibowo@forumosis.id",
          phone: "081234567896",
          joinDate: "2023-04-05",
          status: "active",
        },
        {
          id: 8,
          name: "Hani Susanti",
          position: "Koordinator Sosial",
          email: "hani.susanti@forumosis.id",
          phone: "081234567897",
          joinDate: "2023-04-05",
          status: "inactive",
        },
        {
          id: 9,
          name: "Irfan Hakim",
          position: "Staff Event",
          email: "irfan.hakim@forumosis.id",
          phone: "081234567898",
          joinDate: "2023-05-20",
          status: "active",
        },
        {
          id: 10,
          name: "Jasmine Putri",
          position: "Staff Humas",
          email: "jasmine.putri@forumosis.id",
          phone: "081234567899",
          joinDate: "2023-05-20",
          status: "active",
        },
        {
          id: 11,
          name: "Kevin Sanjaya",
          position: "Staff Pendidikan",
          email: "kevin.sanjaya@forumosis.id",
          phone: "081234567800",
          joinDate: "2023-06-15",
          status: "active",
        },
        {
          id: 12,
          name: "Lina Marlina",
          position: "Staff Sosial",
          email: "lina.marlina@forumosis.id",
          phone: "081234567801",
          joinDate: "2023-06-15",
          status: "active",
        },
      ];
      setPengurus(dummyData);
      setLoading(false);
    }, 800);
  }, []);

  const handleSort = (field: keyof Pengurus) => {
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

  const handleBulkDelete = () => {
    if (selectedIds.length === 0) {
      toast.error("Pilih data yang ingin dihapus");
      return;
    }

    if (!confirm(`Yakin ingin menghapus ${selectedIds.length} data?`)) return;

    setPengurus(pengurus.filter((item) => !selectedIds.includes(item.id)));
    setSelectedIds([]);
    toast.success(`${selectedIds.length} data berhasil dihapus`);
  };

  const handleDelete = (id: number) => {
    if (!confirm("Yakin ingin menghapus data ini?")) return;
    setPengurus(pengurus.filter((item) => item.id !== id));
    toast.success("Data berhasil dihapus");
  };

  // Filter & Sort
  const filteredData = pengurus
    .filter((item) =>
      `${item.name} ${item.position} ${item.email}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase()),
    )
    .sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
      if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const getStatusBadge = (status: string) => {
    const baseClass =
      "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold";

    switch (status) {
      case "active":
        return `${baseClass} bg-emerald-50 text-emerald-700 border border-emerald-100`;
      case "inactive":
        return `${baseClass} bg-slate-100 text-slate-700 border border-slate-200`;
      default:
        return `${baseClass} bg-slate-100 text-slate-700 border border-slate-200`;
    }
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
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-md px-4 py-2 rounded-full border border-slate-200/60 shadow-sm">
                  <Users className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                    Manajemen Pengurus
                  </span>
                </div>
                <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">
                  Data Pengurus Organisasi
                </h1>
                <p className="text-slate-500 font-medium text-sm md:text-base">
                  Kelola struktur dan data pengurus organisasi
                </p>
              </div>

              <button className="group inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-5 py-3 rounded-2xl font-semibold shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 active:scale-[0.98] text-sm md:text-base">
                <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
                Tambah Pengurus
              </button>
            </div>
          </motion.div>

          {/* Search & Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6 flex flex-col sm:flex-row gap-4"
          >
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Cari nama, jabatan, atau email..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full bg-white/80 backdrop-blur-md border border-slate-200 rounded-2xl py-3.5 pl-12 pr-4 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all font-medium text-slate-700 text-sm md:text-base shadow-sm"
              />
            </div>

            {selectedIds.length > 0 && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={handleBulkDelete}
                className="inline-flex items-center justify-center gap-2 bg-red-500 text-white px-5 py-3 rounded-2xl font-semibold hover:bg-red-600 transition-all duration-300 shadow-sm"
              >
                <Trash2 className="w-4 h-4" />
                Hapus ({selectedIds.length})
              </motion.button>
            )}
          </motion.div>

          {/* Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/70 backdrop-blur-xl border border-slate-200/60 rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden"
          >
            {/* Table Header Stats */}
            <div className="px-6 py-4 border-b border-slate-200/60 bg-gradient-to-r from-slate-50/50 to-transparent">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-600">
                  Total:{" "}
                  <span className="text-blue-600">{filteredData.length}</span>{" "}
                  pengurus
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
              ) : filteredData.length === 0 ? (
                <div className="py-16 px-6 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-4">
                    <AlertCircle className="w-8 h-8 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-700 mb-2">
                    {searchQuery
                      ? "Tidak ada hasil ditemukan"
                      : "Belum ada data pengurus"}
                  </h3>
                  <p className="text-slate-500 text-sm mb-6 max-w-md mx-auto">
                    {searchQuery
                      ? "Coba gunakan kata kunci lain untuk menemukan data yang Anda cari."
                      : "Mulai tambahkan pengurus untuk mengelola organisasi Anda."}
                  </p>
                </div>
              ) : (
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-slate-50 to-slate-100/50">
                      <th className="px-6 py-4 text-left">
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
                        onClick={() => handleSort("name")}
                        className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-wider cursor-pointer hover:text-slate-600 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          Nama
                          <ArrowUpDown className="w-3 h-3" />
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-wider">
                        Jabatan
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-wider">
                        Email
                      </th>
                      <th
                        onClick={() => handleSort("joinDate")}
                        className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-wider cursor-pointer hover:text-slate-600 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          Tanggal Bergabung
                          <ArrowUpDown className="w-3 h-3" />
                        </div>
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
                    {paginatedData.map((item) => (
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
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                              {item.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-bold text-slate-800 text-sm">
                                {item.name}
                              </p>
                              <p className="text-xs text-slate-500">
                                {item.phone}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="font-semibold text-slate-700 text-sm">
                            {item.position}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-slate-600">{item.email}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-slate-600">
                            {new Date(item.joinDate).toLocaleDateString(
                              "id-ID",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              },
                            )}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <span className={getStatusBadge(item.status)}>
                            <span className="w-1.5 h-1.5 rounded-full bg-current" />
                            {item.status === "active" ? "Aktif" : "Nonaktif"}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              className="group inline-flex items-center justify-center w-9 h-9 bg-amber-100 hover:bg-amber-200 text-amber-700 rounded-xl transition-all duration-200 shadow-sm hover:shadow"
                              title="Edit"
                            >
                              <Pencil className="w-4 h-4 group-hover:scale-110 transition-transform" />
                            </button>
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

            {/* Pagination */}
            {!loading && filteredData.length > 0 && (
              <div className="px-6 py-4 border-t border-slate-200/60 bg-gradient-to-r from-transparent to-slate-50/50">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-slate-500">
                    Menampilkan {startIndex + 1}-
                    {Math.min(startIndex + itemsPerPage, filteredData.length)}{" "}
                    dari {filteredData.length} data
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
                    <span className="text-sm font-semibold text-slate-700 px-3">
                      {currentPage} / {totalPages}
                    </span>
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

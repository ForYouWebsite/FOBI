"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SideBar from "../../sidebar/page";
import {
  Plus,
  Pencil,
  Trash2,
  CreditCard,
  Search,
  CheckCircle,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  Download,
  Eye,
} from "lucide-react";
import toast from "react-hot-toast";

type KTA = {
  id: number;
  memberName: string;
  ktaNumber: string;
  issueDate: string;
  expiryDate: string;
  status: "active" | "expired" | "pending";
};

export default function KTAAdmin() {
  /* eslint-disable react-hooks/set-state-in-effect */

  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("sidebar-state");

    if (saved !== null) {
      setSidebarOpen(JSON.parse(saved));
    }
  }, []);
  const [ktaList, setKtaList] = useState<KTA[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<keyof KTA>("memberName");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const itemsPerPage = 10;

  useEffect(() => {
    setTimeout(() => {
      const dummyData: KTA[] = Array.from({ length: 25 }, (_, i) => ({
        id: i + 1,
        memberName: `Anggota ${i + 1}`,
        ktaNumber: `KTA-${String(2024000 + i).padStart(7, "0")}`,
        issueDate: new Date(2024, 0, 1 + i).toISOString().split("T")[0],
        expiryDate: new Date(2025, 0, 1 + i).toISOString().split("T")[0],
        status: i % 3 === 0 ? "pending" : i % 5 === 0 ? "expired" : "active",
      }));
      setKtaList(dummyData);
      setLoading(false);
    }, 800);
  }, []);

  const handleSort = (field: keyof KTA) => {
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
    setKtaList(ktaList.filter((item) => !selectedIds.includes(item.id)));
    setSelectedIds([]);
    toast.success(`${selectedIds.length} data berhasil dihapus`);
  };

  const handleDelete = (id: number) => {
    if (!confirm("Yakin ingin menghapus data ini?")) return;
    setKtaList(ktaList.filter((item) => item.id !== id));
    toast.success("Data berhasil dihapus");
  };

  const filteredData = ktaList
    .filter((item) =>
      `${item.memberName} ${item.ktaNumber}`
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
      case "expired":
        return `${baseClass} bg-red-50 text-red-700 border border-red-100`;
      case "pending":
        return `${baseClass} bg-amber-50 text-amber-700 border border-amber-100`;
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
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-md px-4 py-2 rounded-full border border-slate-200/60 shadow-sm">
                  <CreditCard className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                    Manajemen KTA
                  </span>
                </div>
                <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">
                  Kartu Tanda Anggota
                </h1>
                <p className="text-slate-500 font-medium text-sm md:text-base">
                  Kelola dan terbitkan KTA untuk seluruh anggota
                </p>
              </div>

              <button className="group inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-5 py-3 rounded-2xl font-semibold shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 active:scale-[0.98] text-sm md:text-base">
                <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
                Terbitkan KTA
              </button>
            </div>
          </motion.div>

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
                placeholder="Cari nama anggota atau nomor KTA..."
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/70 backdrop-blur-xl border border-slate-200/60 rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-slate-200/60 bg-gradient-to-r from-slate-50/50 to-transparent">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-600">
                  Total:{" "}
                  <span className="text-blue-600">{filteredData.length}</span>{" "}
                  KTA
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
                      : "Belum ada data KTA"}
                  </h3>
                  <p className="text-slate-500 text-sm mb-6 max-w-md mx-auto">
                    {searchQuery
                      ? "Coba gunakan kata kunci lain untuk menemukan data yang Anda cari."
                      : "Mulai terbitkan KTA untuk anggota organisasi Anda."}
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
                        onClick={() => handleSort("memberName")}
                        className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-wider cursor-pointer hover:text-slate-600 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          Nama Anggota
                          <ArrowUpDown className="w-3 h-3" />
                        </div>
                      </th>
                      <th
                        onClick={() => handleSort("ktaNumber")}
                        className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-wider cursor-pointer hover:text-slate-600 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          Nomor KTA
                          <ArrowUpDown className="w-3 h-3" />
                        </div>
                      </th>
                      <th
                        onClick={() => handleSort("issueDate")}
                        className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-wider cursor-pointer hover:text-slate-600 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          Tanggal Terbit
                          <ArrowUpDown className="w-3 h-3" />
                        </div>
                      </th>
                      <th
                        onClick={() => handleSort("expiryDate")}
                        className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-wider cursor-pointer hover:text-slate-600 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          Masa Berlaku
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
                          <p className="font-bold text-slate-800 text-sm">
                            {item.memberName}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="font-mono text-sm text-slate-700 font-semibold">
                            {item.ktaNumber}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-slate-600">
                            {new Date(item.issueDate).toLocaleDateString(
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
                          <p className="text-sm text-slate-600">
                            {new Date(item.expiryDate).toLocaleDateString(
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
                            {item.status === "active"
                              ? "Aktif"
                              : item.status === "expired"
                                ? "Kadaluarsa"
                                : "Pending"}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              className="group inline-flex items-center justify-center w-9 h-9 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-xl transition-all duration-200 shadow-sm hover:shadow"
                              title="Lihat"
                            >
                              <Eye className="w-4 h-4 group-hover:scale-110 transition-transform" />
                            </button>
                            <button
                              className="group inline-flex items-center justify-center w-9 h-9 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 rounded-xl transition-all duration-200 shadow-sm hover:shadow"
                              title="Download"
                            >
                              <Download className="w-4 h-4 group-hover:scale-110 transition-transform" />
                            </button>
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

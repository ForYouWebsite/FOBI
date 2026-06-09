/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SideBar from "../../sidebar/page";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import {
  Plus,
  Pencil,
  Trash2,
  Users,
  Search,
  CheckCircle,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  Eye,
  Mail,
  Phone,
  UserCheck,
  Calendar,
} from "lucide-react";

type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  role: "user";
};

export default function UsersAdmin() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<keyof User>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const itemsPerPage = 10;

  useEffect(() => {
    const saved = localStorage.getItem("sidebar-state");
    if (saved !== null) {
      setSidebarOpen(JSON.parse(saved));
    }
  }, []);

  // Dummy Data - Khusus Anggota (role: user)
  useEffect(() => {
    setTimeout(() => {
      const firstNames = [
        "Ahmad",
        "Siti",
        "Budi",
        "Dewi",
        "Eko",
        "Fitri",
        "Gunawan",
        "Hani",
        "Irfan",
        "Jasmine",
        "Kevin",
        "Lina",
        "Muhammad",
        "Nadia",
        "Oscar",
        "Putri",
        "Qori",
        "Rina",
        "Sandi",
        "Tina",
        "Umar",
        "Vina",
        "Wawan",
        "Xena",
        "Yusuf",
        "Zahra",
        "Andi",
        "Bella",
        "Candra",
        "Dina",
      ];
      const lastNames = [
        "Pratama",
        "Nurhaliza",
        "Santoso",
        "Lestari",
        "Prasetyo",
        "Handayani",
        "Wibowo",
        "Susanti",
        "Hakim",
        "Putri",
        "Sanjaya",
        "Marlina",
        "Firmansyah",
        "Ramadhani",
        "Saputra",
        "Wulandari",
        "Hidayat",
        "Permata",
        "Kurniawan",
        "Salsabila",
      ];

      const dummyData: User[] = Array.from({ length: 30 }, (_, i) => {
        const firstName = firstNames[i % firstNames.length];
        const lastName = lastNames[i % lastNames.length];

        return {
          id: i + 1,
          name: `${firstName} ${lastName}`,
          email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@student.smk.sch.id`,
          phone: `08${String(1234567890 + i * 11).slice(0, 10)}`,
          joinDate: new Date(2024, 0, 1 + i * 3).toISOString().split("T")[0],
          role: "user",
        };
      });

      setUsers(dummyData);
      setLoading(false);
    }, 800);
  }, []);

  const handleSort = (field: keyof User) => {
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
      toast.error("Pilih data yang ingin dihapus");
      return;
    }

    const result = await Swal.fire({
      title: "Hapus Data Terpilih?",
      html: `
        <div class="text-left">
          <p class="text-sm text-slate-600 mb-2">Anda akan menghapus <strong class="text-red-600">${selectedIds.length} anggota</strong> secara permanen.</p>
          <p class="text-xs text-slate-500">Tindakan ini tidak dapat dibatalkan.</p>
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
      setUsers(users.filter((item) => !selectedIds.includes(item.id)));
      setSelectedIds([]);
      toast.success(`${count} data anggota berhasil dihapus`);
    }
  };

  const handleDelete = async (id: number, name: string) => {
    const result = await Swal.fire({
      title: "Hapus Anggota?",
      html: `
        <div class="text-left">
          <p class="text-sm text-slate-600 mb-2">Apakah Anda yakin ingin menghapus anggota:</p>
          <div class="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
              ${name.charAt(0)}
            </div>
            <div>
              <p class="font-bold text-slate-800 text-sm">${name}</p>
              <p class="text-xs text-slate-500">Tindakan ini tidak dapat dibatalkan</p>
            </div>
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
      setUsers(users.filter((item) => item.id !== id));
      toast.success("Data anggota berhasil dihapus");
    }
  };

  // Filter & Sort
  const filteredData = users
    .filter((item) => {
      const matchSearch = `${item.name} ${item.email} ${item.phone}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchSearch;
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

  // Stats
  const thisMonthJoin = users.filter((u) => {
    const joinMonth = new Date(u.joinDate).getMonth();
    const currentMonth = new Date().getMonth();
    return joinMonth === currentMonth;
  }).length;

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
                    Manajemen Anggota
                  </span>
                </div>
                <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">
                  Data Anggota FOBI
                </h1>
                <p className="text-slate-500 font-medium text-sm md:text-base">
                  Kelola seluruh anggota organisasi (tidak termasuk pengurus)
                </p>
              </div>

              <button
                onClick={() =>
                  toast.success("Fitur tambah anggota akan segera tersedia!")
                }
                className="group inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-5 py-3 rounded-2xl font-semibold shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 active:scale-[0.98] text-sm md:text-base"
              >
                <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
                Tambah Anggota
              </button>
            </div>
          </motion.div>

          {/* Stats Cards */}
          {/* <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {[
              {
                title: "Total Anggota",
                value: users.length,
                icon: Users,
                color: "blue",
              },
              {
                title: "Anggota Baru Bulan Ini",
                value: thisMonthJoin,
                icon: UserCheck,
                color: "emerald",
              },
              {
                title: "Terdaftar Sejak",
                value:
                  users.length > 0
                    ? new Date(
                        Math.min(
                          ...users.map((u) => new Date(u.joinDate).getTime()),
                        ),
                      ).getFullYear()
                    : "-",
                icon: Calendar,
                color: "purple",
              },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white/70 backdrop-blur-xl border border-slate-200/60 rounded-2xl p-4 shadow-lg shadow-slate-200/50"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 bg-${stat.color}-50 rounded-xl flex items-center justify-center`}
                    >
                      <Icon className={`w-5 h-5 text-${stat.color}-600`} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        {stat.title}
                      </p>
                      <p className="text-xl font-black text-slate-800">
                        {stat.value}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div> */}

          {/* Search & Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6 space-y-4"
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Cari nama, email, atau no HP..."
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
            </div>
          </motion.div>

          {/* Table */}
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
                  anggota
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
                      : "Belum ada data anggota"}
                  </h3>
                  <p className="text-slate-500 text-sm mb-6 max-w-md mx-auto">
                    {searchQuery
                      ? "Coba ubah kata kunci pencarian."
                      : "Mulai tambahkan anggota untuk organisasi Anda."}
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
                          Anggota
                          <ArrowUpDown className="w-3 h-3" />
                        </div>
                      </th>
                      <th
                        onClick={() => handleSort("email")}
                        className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-wider cursor-pointer hover:text-slate-600 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          Email
                          <ArrowUpDown className="w-3 h-3" />
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-wider">
                        No. HP
                      </th>
                      <th
                        onClick={() => handleSort("joinDate")}
                        className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-wider cursor-pointer hover:text-slate-600 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          Bergabung
                          <ArrowUpDown className="w-3 h-3" />
                        </div>
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
                            {/* <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                              {item.name.charAt(0)}
                            </div> */}
                            <div>
                              <p className="font-bold text-slate-800 text-sm">
                                {item.name}
                              </p>
                              <p className="text-xs text-slate-500">Anggota</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Mail className="w-3.5 h-3.5 text-slate-400" />
                            <p className="text-sm text-slate-600 max-w-[200px] truncate">
                              {item.email}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Phone className="w-3.5 h-3.5 text-slate-400" />
                            <p className="text-sm text-slate-600 font-mono">
                              {item.phone}
                            </p>
                          </div>
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
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() =>
                                toast(`Detail: ${item.name}`, {
                                  icon: "👤",
                                  style: {
                                    borderRadius: "12px",
                                    background: "#333",
                                    color: "#fff",
                                  },
                                })
                              }
                              className="group inline-flex items-center justify-center w-9 h-9 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-xl transition-all duration-200 shadow-sm hover:shadow"
                              title="Lihat Detail"
                            >
                              <Eye className="w-4 h-4 group-hover:scale-110 transition-transform" />
                            </button>
                            <button
                              onClick={() =>
                                toast.success(
                                  `Fitur edit untuk ${item.name} akan segera tersedia!`,
                                )
                              }
                              className="group inline-flex items-center justify-center w-9 h-9 bg-amber-100 hover:bg-amber-200 text-amber-700 rounded-xl transition-all duration-200 shadow-sm hover:shadow"
                              title="Edit"
                            >
                              <Pencil className="w-4 h-4 group-hover:scale-110 transition-transform" />
                            </button>
                            <button
                              onClick={() => handleDelete(item.id, item.name)}
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
                <div className="flex items-center justify-between flex-wrap gap-3">
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

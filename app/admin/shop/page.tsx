"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SideBar from "../../sidebar/page";
import {
  Plus,
  Pencil,
  Trash2,
  ShoppingBag,
  Search,
  CheckCircle,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  Eye,
  Package,
  Tag,
  Image as ImageIcon,
  X,
  Save,
  TrendingUp,
  DollarSign,
  Filter,
  Grid3X3,
  List,
} from "lucide-react";
import toast from "react-hot-toast";

type Product = {
  id: number;
  name: string;
  category: "atribut" | "makanan" | "minuman" | "lainnya";
  price: number;
  stock: number;
  sold: number;
  image: string;
  description: string;
  status: "active" | "inactive";
  createdAt: string;
};

type ViewMode = "grid" | "table";

export default function ShopAdmin() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<keyof Product>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [viewMode, setViewMode] = useState<ViewMode>("table");
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [showDetail, setShowDetail] = useState<Product | null>(null);
  const itemsPerPage = 8;

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    category: "atribut" as Product["category"],
    price: 0,
    stock: 0,
    description: "",
    status: "active" as Product["status"],
  });

  /* eslint-disable react-hooks/set-state-in-effect */

  useEffect(() => {
    const saved = localStorage.getItem("sidebar-state");

    if (saved !== null) {
      setSidebarOpen(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      const dummyData: Product[] = [
        {
          id: 1,
          name: "PDH FOBI Premium",
          category: "atribut",
          price: 175000,
          stock: 50,
          sold: 45,
          image: "/products/pdh.jpg",
          description: "PDH berkualitas tinggi dengan bordir logo FOBI",
          status: "active",
          createdAt: "2024-01-15",
        },
        {
          id: 2,
          name: "Lanyard OSIS",
          category: "atribut",
          price: 25000,
          stock: 200,
          sold: 120,
          image: "/products/lanyard.jpg",
          description: "Lanyard dengan desain custom FOBI",
          status: "active",
          createdAt: "2024-01-20",
        },
        {
          id: 3,
          name: "Snack Box Premium",
          category: "makanan",
          price: 25000,
          stock: 100,
          sold: 85,
          image: "/products/snack.jpg",
          description: "Paket snack box untuk acara sekolah",
          status: "active",
          createdAt: "2024-02-01",
        },
        {
          id: 4,
          name: "Kaos FOBI Edition",
          category: "atribut",
          price: 75000,
          stock: 80,
          sold: 67,
          image: "/products/kaos.jpg",
          description: "Kaos cotton combed 30s dengan desain eksklusif",
          status: "active",
          createdAt: "2024-02-10",
        },
        {
          id: 5,
          name: "Pin OSIS Set",
          category: "atribut",
          price: 35000,
          stock: 150,
          sold: 98,
          image: "/products/pin.jpg",
          description: "Set pin enamel logo FOBI (isi 3 pcs)",
          status: "active",
          createdAt: "2024-02-15",
        },
        {
          id: 6,
          name: "Nasi Kotak Spesial",
          category: "makanan",
          price: 25000,
          stock: 50,
          sold: 150,
          image: "/products/nasi.jpg",
          description: "Nasi kotak dengan lauk lengkap untuk acara",
          status: "active",
          createdAt: "2024-03-01",
        },
        {
          id: 7,
          name: "Topi FOBI",
          category: "atribut",
          price: 50000,
          stock: 60,
          sold: 32,
          image: "/products/topi.jpg",
          description: "Topi baseball dengan bordir logo FOBI",
          status: "active",
          createdAt: "2024-03-10",
        },
        {
          id: 8,
          name: "Mineral Water Box",
          category: "minuman",
          price: 30000,
          stock: 30,
          sold: 45,
          image: "/products/water.jpg",
          description: "Air mineral kemasan box (isi 24 botol)",
          status: "active",
          createdAt: "2024-03-15",
        },
        {
          id: 9,
          name: "Tumbler FOBI",
          category: "lainnya",
          price: 85000,
          stock: 40,
          sold: 28,
          image: "/products/tumbler.jpg",
          description: "Tumbler stainless steel custom FOBI",
          status: "inactive",
          createdAt: "2024-03-20",
        },
        {
          id: 10,
          name: "Stiker Pack FOBI",
          category: "atribut",
          price: 15000,
          stock: 300,
          sold: 210,
          image: "/products/stiker.jpg",
          description: "Pack stiker vinyl waterproof (isi 10 pcs)",
          status: "active",
          createdAt: "2024-04-01",
        },
      ];
      setProducts(dummyData);
      setLoading(false);
    }, 800);
  }, []);

  const handleSort = (field: keyof Product) => {
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
      toast.error("Pilih produk yang ingin dihapus");
      return;
    }
    if (!confirm(`Yakin ingin menghapus ${selectedIds.length} produk?`)) return;
    setProducts(products.filter((item) => !selectedIds.includes(item.id)));
    setSelectedIds([]);
    toast.success(`${selectedIds.length} produk berhasil dihapus`);
  };

  const handleDelete = (id: number) => {
    if (!confirm("Yakin ingin menghapus produk ini?")) return;
    setProducts(products.filter((item) => item.id !== id));
    toast.success("Produk berhasil dihapus");
  };

  const handleToggleStatus = (id: number) => {
    setProducts(
      products.map((item) =>
        item.id === id
          ? {
              ...item,
              status: item.status === "active" ? "inactive" : "active",
            }
          : item,
      ),
    );
    toast.success("Status produk berhasil diubah");
  };

  const handleOpenAdd = () => {
    setEditProduct(null);
    setFormData({
      name: "",
      category: "atribut",
      price: 0,
      stock: 0,
      description: "",
      status: "active",
    });
    setShowModal(true);
  };

  const handleOpenEdit = (product: Product) => {
    setEditProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price,
      stock: product.stock,
      description: product.description,
      status: product.status,
    });
    setShowModal(true);
  };

  const handleSaveProduct = () => {
    if (!formData.name || formData.price <= 0) {
      toast.error("Nama dan harga produk wajib diisi");
      return;
    }

    if (editProduct) {
      setProducts(
        products.map((item) =>
          item.id === editProduct.id
            ? {
                ...item,
                ...formData,
              }
            : item,
        ),
      );
      toast.success("Produk berhasil diupdate");
    } else {
      const newProduct: Product = {
        id: Math.max(...products.map((p) => p.id), 0) + 1,
        ...formData,
        sold: 0,
        image: "/products/default.jpg",
        createdAt: new Date().toISOString().split("T")[0],
      };
      setProducts([newProduct, ...products]);
      toast.success("Produk baru berhasil ditambahkan");
    }
    setShowModal(false);
  };

  // Filter & Sort
  const filteredData = products
    .filter((item) => {
      const matchSearch = `${item.name} ${item.description}`
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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getCategoryBadge = (category: string) => {
    const baseClass =
      "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold";
    switch (category) {
      case "atribut":
        return `${baseClass} bg-blue-50 text-blue-700 border border-blue-100`;
      case "makanan":
        return `${baseClass} bg-emerald-50 text-emerald-700 border border-emerald-100`;
      case "minuman":
        return `${baseClass} bg-cyan-50 text-cyan-700 border border-cyan-100`;
      case "lainnya":
        return `${baseClass} bg-slate-100 text-slate-700 border border-slate-200`;
      default:
        return `${baseClass} bg-slate-100 text-slate-700 border border-slate-200`;
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "atribut":
        return "Atribut";
      case "makanan":
        return "Makanan";
      case "minuman":
        return "Minuman";
      case "lainnya":
        return "Lainnya";
      default:
        return category;
    }
  };

  // Summary stats
  const totalProducts = products.length;
  const activeProducts = products.filter((p) => p.status === "active").length;
  const totalStock = products.reduce((sum, p) => sum + p.stock, 0);
  const totalRevenue = products.reduce((sum, p) => sum + p.price * p.sold, 0);

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
                  <ShoppingBag className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                    Manajemen Produk
                  </span>
                </div>
                <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">
                  FOBI Official Store
                </h1>
                <p className="text-slate-500 font-medium text-sm md:text-base">
                  Kelola produk, harga, dan stok toko organisasi
                </p>
              </div>

              <button
                onClick={handleOpenAdd}
                className="group inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-5 py-3 rounded-2xl font-semibold shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 active:scale-[0.98] text-sm md:text-base"
              >
                <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
                Tambah Produk
              </button>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              {
                title: "Total Produk",
                value: totalProducts.toString(),
                icon: Package,
                color: "blue",
              },
              {
                title: "Produk Aktif",
                value: activeProducts.toString(),
                icon: CheckCircle,
                color: "emerald",
              },
              {
                title: "Total Stok",
                value: totalStock.toString(),
                icon: Tag,
                color: "purple",
              },
              {
                title: "Est. Pendapatan",
                value: formatCurrency(totalRevenue),
                icon: DollarSign,
                color: "amber",
              },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/70 backdrop-blur-xl border border-slate-200/60 rounded-3xl p-5 shadow-xl shadow-slate-200/50"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`w-10 h-10 bg-${stat.color}-50 rounded-xl flex items-center justify-center`}
                    >
                      <Icon className={`w-5 h-5 text-${stat.color}-600`} />
                    </div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      {stat.title}
                    </p>
                  </div>
                  <p className="text-xl md:text-2xl font-black text-slate-800">
                    {stat.value}
                  </p>
                </motion.div>
              );
            })}
          </div>

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
                  placeholder="Cari nama atau deskripsi produk..."
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

              {/* View Mode Toggle */}
              <div className="flex items-center gap-1 bg-white/80 backdrop-blur-md border border-slate-200 rounded-2xl p-1.5 shadow-sm">
                <button
                  onClick={() => setViewMode("table")}
                  className={`p-2.5 rounded-xl transition-all ${
                    viewMode === "table"
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-slate-400 hover:text-slate-700"
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2.5 rounded-xl transition-all ${
                    viewMode === "grid"
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-slate-400 hover:text-slate-700"
                  }`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Category & Status Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex items-center gap-2 bg-white/70 backdrop-blur-md border border-slate-200 rounded-2xl px-4 py-2.5 shadow-sm flex-1">
                <Filter className="w-4 h-4 text-slate-400" />
                <select
                  value={filterCategory}
                  onChange={(e) => {
                    setFilterCategory(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="flex-1 bg-transparent outline-none text-sm font-semibold text-slate-700"
                >
                  <option value="all">Semua Kategori</option>
                  <option value="atribut">Atribut</option>
                  <option value="makanan">Makanan</option>
                  <option value="minuman">Minuman</option>
                  <option value="lainnya">Lainnya</option>
                </select>
              </div>

              <div className="flex items-center gap-2 bg-white/70 backdrop-blur-md border border-slate-200 rounded-2xl px-4 py-2.5 shadow-sm flex-1">
                <CheckCircle className="w-4 h-4 text-slate-400" />
                <select
                  value={filterStatus}
                  onChange={(e) => {
                    setFilterStatus(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="flex-1 bg-transparent outline-none text-sm font-semibold text-slate-700"
                >
                  <option value="all">Semua Status</option>
                  <option value="active">Aktif</option>
                  <option value="inactive">Nonaktif</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Products Display */}
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
                  produk
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
                      <div className="w-16 h-16 bg-slate-200 rounded-xl"></div>
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
                      : "Belum ada produk"}
                  </h3>
                  <p className="text-slate-500 text-sm mb-6 max-w-md mx-auto">
                    {searchQuery
                      ? "Coba gunakan kata kunci lain."
                      : "Mulai tambahkan produk untuk toko organisasi Anda."}
                  </p>
                  {!searchQuery && (
                    <button
                      onClick={handleOpenAdd}
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-5 py-2.5 rounded-xl font-semibold text-sm shadow-lg shadow-blue-500/25 hover:shadow-xl transition-all"
                    >
                      <Plus className="w-4 h-4" />
                      Tambah Produk Pertama
                    </button>
                  )}
                </div>
              ) : viewMode === "table" ? (
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
                          Produk
                          <ArrowUpDown className="w-3 h-3" />
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-wider">
                        Kategori
                      </th>
                      <th
                        onClick={() => handleSort("price")}
                        className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-wider cursor-pointer hover:text-slate-600 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          Harga
                          <ArrowUpDown className="w-3 h-3" />
                        </div>
                      </th>
                      <th
                        onClick={() => handleSort("stock")}
                        className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-wider cursor-pointer hover:text-slate-600 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          Stok
                          <ArrowUpDown className="w-3 h-3" />
                        </div>
                      </th>
                      <th
                        onClick={() => handleSort("sold")}
                        className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-wider cursor-pointer hover:text-slate-600 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          Terjual
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
                            <div className="w-12 h-12 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden">
                              <ImageIcon className="w-5 h-5 text-slate-400" />
                            </div>
                            <div>
                              <p className="font-bold text-slate-800 text-sm">
                                {item.name}
                              </p>
                              <p className="text-xs text-slate-500 line-clamp-1 max-w-[200px]">
                                {item.description}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={getCategoryBadge(item.category)}>
                            {getCategoryLabel(item.category)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <p className="font-bold text-slate-800 text-sm">
                            {formatCurrency(item.price)}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-sm font-semibold ${
                                item.stock < 20
                                  ? "text-red-600"
                                  : "text-slate-700"
                              }`}
                            >
                              {item.stock}
                            </span>
                            {item.stock < 20 && (
                              <span className="text-[10px] font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded-full">
                                LOW
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1.5">
                            <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                            <span className="text-sm font-semibold text-slate-700">
                              {item.sold}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleToggleStatus(item.id)}
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                              item.status === "active"
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-100 hover:bg-emerald-100"
                                : "bg-slate-100 text-slate-500 border border-slate-200 hover:bg-slate-200"
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                item.status === "active"
                                  ? "bg-emerald-500"
                                  : "bg-slate-400"
                              }`}
                            />
                            {item.status === "active" ? "Aktif" : "Nonaktif"}
                          </button>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setShowDetail(item)}
                              className="group inline-flex items-center justify-center w-9 h-9 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-xl transition-all duration-200 shadow-sm hover:shadow"
                              title="Lihat Detail"
                            >
                              <Eye className="w-4 h-4 group-hover:scale-110 transition-transform" />
                            </button>
                            <button
                              onClick={() => handleOpenEdit(item)}
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
              ) : (
                <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {paginatedData.map((item) => (
                    <div
                      key={item.id}
                      className={`group bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden transition-all hover:shadow-lg hover:border-blue-200 ${
                        selectedIds.includes(item.id)
                          ? "ring-2 ring-blue-500 border-blue-500"
                          : ""
                      }`}
                    >
                      <div className="relative aspect-square bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                        <ImageIcon className="w-12 h-12 text-slate-400" />
                        <div className="absolute top-3 left-3">
                          <span className={getCategoryBadge(item.category)}>
                            {getCategoryLabel(item.category)}
                          </span>
                        </div>
                        <div className="absolute top-3 right-3">
                          <input
                            type="checkbox"
                            checked={selectedIds.includes(item.id)}
                            onChange={() => handleSelectOne(item.id)}
                            className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 bg-white"
                          />
                        </div>
                        <div
                          className={`absolute bottom-3 right-3 px-2 py-1 rounded-lg text-[10px] font-bold ${
                            item.status === "active"
                              ? "bg-emerald-500 text-white"
                              : "bg-slate-400 text-white"
                          }`}
                        >
                          {item.status === "active" ? "AKTIF" : "NONAKTIF"}
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-slate-800 text-sm mb-1 line-clamp-1">
                          {item.name}
                        </h3>
                        <p className="text-xs text-slate-500 mb-3 line-clamp-2 min-h-[2rem]">
                          {item.description}
                        </p>
                        <div className="flex items-center justify-between mb-3">
                          <p className="font-black text-blue-600">
                            {formatCurrency(item.price)}
                          </p>
                          <div className="flex items-center gap-1 text-xs">
                            <TrendingUp className="w-3 h-3 text-emerald-500" />
                            <span className="font-semibold text-slate-600">
                              {item.sold} terjual
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs text-slate-500">Stok:</span>
                          <span
                            className={`text-xs font-bold ${
                              item.stock < 20
                                ? "text-red-600"
                                : "text-slate-700"
                            }`}
                          >
                            {item.stock} pcs
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setShowDetail(item)}
                            className="flex-1 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-xl text-xs font-semibold transition-all"
                          >
                            Detail
                          </button>
                          <button
                            onClick={() => handleOpenEdit(item)}
                            className="flex-1 py-2 bg-amber-100 hover:bg-amber-200 text-amber-700 rounded-xl text-xs font-semibold transition-all"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="py-2 px-3 bg-red-100 hover:bg-red-200 text-red-600 rounded-xl transition-all"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
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

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between rounded-t-3xl">
                <div>
                  <h3 className="text-lg font-bold text-slate-800">
                    {editProduct ? "Edit Produk" : "Tambah Produk Baru"}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {editProduct
                      ? "Ubah informasi produk"
                      : "Isi detail produk baru"}
                  </p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>

              <div className="p-6 space-y-5">
                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Gambar Produk
                  </label>
                  <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center hover:border-blue-500 transition-colors cursor-pointer group">
                    <ImageIcon className="w-12 h-12 text-slate-400 mx-auto mb-3 group-hover:text-blue-500 transition-colors" />
                    <p className="text-sm font-semibold text-slate-600 mb-1">
                      Klik untuk upload gambar
                    </p>
                    <p className="text-xs text-slate-400">
                      PNG, JPG hingga 5MB
                    </p>
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Nama Produk <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Contoh: PDH FOBI Premium"
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-sm"
                  />
                </div>

                {/* Category & Status */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Kategori <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          category: e.target.value as Product["category"],
                        })
                      }
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-sm"
                    >
                      <option value="atribut">Atribut</option>
                      <option value="makanan">Makanan</option>
                      <option value="minuman">Minuman</option>
                      <option value="lainnya">Lainnya</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          status: e.target.value as Product["status"],
                        })
                      }
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-sm"
                    >
                      <option value="active">Aktif</option>
                      <option value="inactive">Nonaktif</option>
                    </select>
                  </div>
                </div>

                {/* Price & Stock */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Harga (Rp) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={formData.price || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          price: parseInt(e.target.value) || 0,
                        })
                      }
                      placeholder="0"
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Stok
                    </label>
                    <input
                      type="number"
                      value={formData.stock || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          stock: parseInt(e.target.value) || 0,
                        })
                      }
                      placeholder="0"
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-sm"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Deskripsi
                  </label>
                  <textarea
                    rows={4}
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Deskripsi singkat produk..."
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-sm resize-none"
                  />
                </div>
              </div>

              <div className="sticky bottom-0 bg-white border-t border-slate-200 px-6 py-4 flex items-center justify-end gap-3 rounded-b-3xl">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2.5 rounded-xl font-semibold text-sm text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={handleSaveProduct}
                  className="group inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-5 py-2.5 rounded-xl font-semibold text-sm shadow-lg shadow-blue-500/25 hover:shadow-xl transition-all active:scale-[0.98]"
                >
                  <Save className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  {editProduct ? "Simpan Perubahan" : "Tambah Produk"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Detail Modal */}
      <AnimatePresence>
        {showDetail && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowDetail(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
            >
              <div className="aspect-square bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center relative">
                <ImageIcon className="w-20 h-20 text-slate-400" />
                <button
                  onClick={() => setShowDetail(null)}
                  className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-md rounded-xl hover:bg-white transition-colors"
                >
                  <X className="w-5 h-5 text-slate-700" />
                </button>
                <div className="absolute bottom-4 left-4">
                  <span className={getCategoryBadge(showDetail.category)}>
                    {getCategoryLabel(showDetail.category)}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-black text-slate-800 mb-1">
                      {showDetail.name}
                    </h3>
                    <p className="text-xs text-slate-500">
                      Ditambahkan:{" "}
                      {new Date(showDetail.createdAt).toLocaleDateString(
                        "id-ID",
                        {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        },
                      )}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      showDetail.status === "active"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {showDetail.status === "active" ? "Aktif" : "Nonaktif"}
                  </span>
                </div>

                <p className="text-sm text-slate-600 mb-5">
                  {showDetail.description}
                </p>

                <div className="grid grid-cols-3 gap-3 mb-5">
                  <div className="bg-blue-50 rounded-xl p-3 text-center">
                    <p className="text-xs text-blue-600 font-semibold mb-1">
                      Harga
                    </p>
                    <p className="font-black text-blue-700 text-sm">
                      {formatCurrency(showDetail.price)}
                    </p>
                  </div>
                  <div className="bg-purple-50 rounded-xl p-3 text-center">
                    <p className="text-xs text-purple-600 font-semibold mb-1">
                      Stok
                    </p>
                    <p className="font-black text-purple-700 text-sm">
                      {showDetail.stock} pcs
                    </p>
                  </div>
                  <div className="bg-emerald-50 rounded-xl p-3 text-center">
                    <p className="text-xs text-emerald-600 font-semibold mb-1">
                      Terjual
                    </p>
                    <p className="font-black text-emerald-700 text-sm">
                      {showDetail.sold} pcs
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setShowDetail(null);
                      handleOpenEdit(showDetail);
                    }}
                    className="flex-1 py-3 bg-amber-100 hover:bg-amber-200 text-amber-700 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2"
                  >
                    <Pencil className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setShowDetail(null);
                      handleDelete(showDetail.id);
                    }}
                    className="flex-1 py-3 bg-red-100 hover:bg-red-200 text-red-600 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Hapus
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

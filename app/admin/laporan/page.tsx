"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SideBar from "../../sidebar/page";
import {
  BarChart3,
  TrendingUp,
  ShoppingBag,
  DollarSign,
  Package,
  Clock,
  Download,
  Filter,
  Eye,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";

type OrderData = {
  id: string;
  customerName: string;
  customerPhone: string;
  productName: string;
  category: string;
  quantity: number;
  totalPrice: number;
  orderDate: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  paymentMethod: string;
};

type ProductStat = {
  id: number;
  name: string;
  category: string;
  sold: number;
  revenue: number;
};

export default function LaporanTokoAdmin() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  /* eslint-disable react-hooks/set-state-in-effect */

  useEffect(() => {
    const saved = localStorage.getItem("sidebar-state");
    if (saved !== null) {
      setSidebarOpen(JSON.parse(saved));
    }
  }, []);

  const [orders, setOrders] = useState<OrderData[]>([]);
  const [topProducts, setTopProducts] = useState<ProductStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterPeriod, setFilterPeriod] = useState("monthly");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    setTimeout(() => {
      const dummyOrders: OrderData[] = [
        {
          id: "ORD-001",
          customerName: "Ahmad Rizki",
          customerPhone: "081234567890",
          productName: "PDH FOBI Premium",
          category: "Atribut",
          quantity: 2,
          totalPrice: 350000,
          orderDate: "2024-06-15",
          status: "completed",
          paymentMethod: "Transfer Bank",
        },
        {
          id: "ORD-002",
          customerName: "Siti Nurhaliza",
          customerPhone: "081234567891",
          productName: "Lanyard OSIS",
          category: "Atribut",
          quantity: 5,
          totalPrice: 125000,
          orderDate: "2024-06-14",
          status: "confirmed",
          paymentMethod: "Transfer Bank",
        },
        {
          id: "ORD-003",
          customerName: "Budi Santoso",
          customerPhone: "081234567892",
          productName: "Snack Box Premium",
          category: "Makanan",
          quantity: 10,
          totalPrice: 250000,
          orderDate: "2024-06-14",
          status: "pending",
          paymentMethod: "COD",
        },
        {
          id: "ORD-004",
          customerName: "Dewi Lestari",
          customerPhone: "081234567893",
          productName: "Kaos FOBI Edition",
          category: "Atribut",
          quantity: 3,
          totalPrice: 225000,
          orderDate: "2024-06-13",
          status: "completed",
          paymentMethod: "Transfer Bank",
        },
        {
          id: "ORD-005",
          customerName: "Eko Prasetyo",
          customerPhone: "081234567894",
          productName: "Pin OSIS Set",
          category: "Atribut",
          quantity: 1,
          totalPrice: 35000,
          orderDate: "2024-06-13",
          status: "cancelled",
          paymentMethod: "Transfer Bank",
        },
        {
          id: "ORD-006",
          customerName: "Fitri Handayani",
          customerPhone: "081234567895",
          productName: "Nasi Kotak Spesial",
          category: "Makanan",
          quantity: 20,
          totalPrice: 500000,
          orderDate: "2024-06-12",
          status: "completed",
          paymentMethod: "Transfer Bank",
        },
        {
          id: "ORD-007",
          customerName: "Gunawan Wibowo",
          customerPhone: "081234567896",
          productName: "Topi FOBI",
          category: "Atribut",
          quantity: 2,
          totalPrice: 100000,
          orderDate: "2024-06-12",
          status: "confirmed",
          paymentMethod: "COD",
        },
        {
          id: "ORD-008",
          customerName: "Hani Susanti",
          customerPhone: "081234567897",
          productName: "Mineral Water Box",
          category: "Makanan",
          quantity: 5,
          totalPrice: 150000,
          orderDate: "2024-06-11",
          status: "completed",
          paymentMethod: "Transfer Bank",
        },
      ];

      const dummyTopProducts: ProductStat[] = [
        {
          id: 1,
          name: "PDH FOBI Premium",
          category: "Atribut",
          sold: 45,
          revenue: 7875000,
        },
        {
          id: 2,
          name: "Lanyard OSIS",
          category: "Atribut",
          sold: 120,
          revenue: 3000000,
        },
        {
          id: 3,
          name: "Snack Box Premium",
          category: "Makanan",
          sold: 85,
          revenue: 2125000,
        },
        {
          id: 4,
          name: "Kaos FOBI Edition",
          category: "Atribut",
          sold: 67,
          revenue: 5025000,
        },
        {
          id: 5,
          name: "Nasi Kotak Spesial",
          category: "Makanan",
          sold: 150,
          revenue: 3750000,
        },
      ];

      setOrders(dummyOrders);
      setTopProducts(dummyTopProducts);
      setLoading(false);
    }, 800);
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    const baseClass =
      "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold";

    switch (status) {
      case "completed":
        return `${baseClass} bg-emerald-50 text-emerald-700 border border-emerald-100`;
      case "confirmed":
        return `${baseClass} bg-blue-50 text-blue-700 border border-blue-100`;
      case "pending":
        return `${baseClass} bg-amber-50 text-amber-700 border border-amber-100`;
      case "cancelled":
        return `${baseClass} bg-red-50 text-red-700 border border-red-100`;
      default:
        return `${baseClass} bg-slate-100 text-slate-700 border border-slate-200`;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-3.5 h-3.5" />;
      case "confirmed":
        return <CheckCircle className="w-3.5 h-3.5" />;
      case "pending":
        return <Clock className="w-3.5 h-3.5" />;
      case "cancelled":
        return <XCircle className="w-3.5 h-3.5" />;
      default:
        return <AlertCircle className="w-3.5 h-3.5" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "completed":
        return "Selesai";
      case "confirmed":
        return "Dikonfirmasi";
      case "pending":
        return "Menunggu";
      case "cancelled":
        return "Dibatalkan";
      default:
        return status;
    }
  };

  // Filter orders
  const filteredOrders = orders.filter((order) => {
    if (filterStatus === "all") return true;
    return order.status === filterStatus;
  });

  // Calculate summary
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.totalPrice, 0);
  const totalItemsSold = orders.reduce((sum, order) => sum + order.quantity, 0);
  const pendingOrders = orders.filter((o) => o.status === "pending").length;

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
                  <ShoppingBag className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                    FOBI Official Store
                  </span>
                </div>
                <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">
                  Laporan Penjualan Toko
                </h1>
                <p className="text-slate-500 font-medium text-sm md:text-base">
                  Pantau performa penjualan atribut dan produk FOBI
                </p>
              </div>

              <button className="group inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-5 py-3 rounded-2xl font-semibold shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 active:scale-[0.98] text-sm md:text-base">
                <Download className="w-4 h-4 group-hover:scale-110 transition-transform" />
                Export Laporan
              </button>
            </div>
          </motion.div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
            {[
              {
                title: "Total Order",
                value: totalOrders.toString(),
                icon: ShoppingBag,
                color: "blue",
              },
              {
                title: "Total Pendapatan",
                value: formatCurrency(totalRevenue),
                icon: DollarSign,
                color: "emerald",
              },
              {
                title: "Produk Terjual",
                value: totalItemsSold.toString(),
                icon: Package,
                color: "purple",
              },
              {
                title: "Order Pending",
                value: pendingOrders.toString(),
                icon: Clock,
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
                  className="bg-white/70 backdrop-blur-xl border border-slate-200/60 rounded-3xl p-6 shadow-xl shadow-slate-200/50"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`w-10 h-10 bg-${stat.color}-50 rounded-xl flex items-center justify-center`}
                    >
                      <Icon className={`w-5 h-5 text-${stat.color}-600`} />
                    </div>
                    <p className="text-sm font-semibold text-slate-600">
                      {stat.title}
                    </p>
                  </div>
                  <p className="text-2xl font-black text-slate-800">
                    {stat.value}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Top Products */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/70 backdrop-blur-xl border border-slate-200/60 rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden mb-8"
          >
            <div className="px-6 py-4 border-b border-slate-200/60 bg-gradient-to-r from-slate-50/50 to-transparent">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-600">
                  Produk Terlaris
                </p>
                <TrendingUp className="w-4 h-4 text-emerald-500" />
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
              ) : (
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-slate-50 to-slate-100/50">
                      <th className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-wider">
                        Produk
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-wider">
                        Kategori
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-wider">
                        Terjual
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-wider">
                        Pendapatan
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {topProducts.map((product, index) => (
                      <tr
                        key={product.id}
                        className="group hover:bg-blue-50/40 transition-colors duration-200"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xs">
                              {index + 1}
                            </div>
                            <p className="font-bold text-slate-800 text-sm">
                              {product.name}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                            {product.category}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm font-semibold text-slate-700">
                            {product.sold} pcs
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm font-bold text-slate-800">
                            {formatCurrency(product.revenue)}
                          </p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-6"
          >
            <div className="bg-white/70 backdrop-blur-xl border border-slate-200/60 rounded-2xl p-4 shadow-lg">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Filter className="w-5 h-5 text-slate-400 flex-shrink-0" />
                <div className="flex-1 flex flex-col sm:flex-row gap-3 w-full">
                  <select
                    value={filterPeriod}
                    onChange={(e) => setFilterPeriod(e.target.value)}
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 text-sm font-semibold text-slate-700"
                  >
                    <option value="daily">Harian</option>
                    <option value="weekly">Mingguan</option>
                    <option value="monthly">Bulanan</option>
                  </select>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 text-sm font-semibold text-slate-700"
                  >
                    <option value="all">Semua Status</option>
                    <option value="pending">Menunggu</option>
                    <option value="confirmed">Dikonfirmasi</option>
                    <option value="completed">Selesai</option>
                    <option value="cancelled">Dibatalkan</option>
                  </select>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Orders Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white/70 backdrop-blur-xl border border-slate-200/60 rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-slate-200/60 bg-gradient-to-r from-slate-50/50 to-transparent">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-600">
                  Riwayat Transaksi{" "}
                  <span className="text-blue-600">
                    ({filteredOrders.length} order)
                  </span>
                </p>
                <BarChart3 className="w-4 h-4 text-slate-400" />
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
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-slate-200 rounded w-1/3"></div>
                        <div className="h-3 bg-slate-100 rounded w-1/4"></div>
                      </div>
                      <div className="h-8 w-20 bg-slate-200 rounded-xl"></div>
                    </div>
                  ))}
                </div>
              ) : filteredOrders.length === 0 ? (
                <div className="py-16 px-6 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-4">
                    <AlertCircle className="w-8 h-8 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-700 mb-2">
                    Tidak ada data order
                  </h3>
                  <p className="text-slate-500 text-sm max-w-md mx-auto">
                    Belum ada transaksi yang sesuai dengan filter yang dipilih
                  </p>
                </div>
              ) : (
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-slate-50 to-slate-100/50">
                      <th className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-wider">
                        Order ID
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-wider">
                        Produk
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-wider">
                        Qty
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-wider">
                        Total
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-wider">
                        Tanggal
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
                    {filteredOrders.map((order) => (
                      <tr
                        key={order.id}
                        className="group hover:bg-blue-50/40 transition-colors duration-200"
                      >
                        <td className="px-6 py-4">
                          <p className="font-mono text-sm font-bold text-blue-600">
                            {order.id}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-bold text-slate-800 text-sm">
                              {order.customerName}
                            </p>
                            <p className="text-xs text-slate-500">
                              {order.customerPhone}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-semibold text-slate-700 text-sm">
                              {order.productName}
                            </p>
                            <p className="text-xs text-slate-500">
                              {order.category}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm font-semibold text-slate-700">
                            {order.quantity}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm font-bold text-slate-800">
                            {formatCurrency(order.totalPrice)}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-slate-600">
                            {new Date(order.orderDate).toLocaleDateString(
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
                          <span className={getStatusBadge(order.status)}>
                            {getStatusIcon(order.status)}
                            {getStatusLabel(order.status)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              className="group inline-flex items-center justify-center w-9 h-9 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-xl transition-all duration-200 shadow-sm hover:shadow"
                              title="Lihat Detail"
                            >
                              <Eye className="w-4 h-4 group-hover:scale-110 transition-transform" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}

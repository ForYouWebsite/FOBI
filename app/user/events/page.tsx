/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SideBar from "../../sidebar/page";
import {
  Calendar,
  Search,
  Filter,
  MapPin,
  Clock,
  Users,
  ArrowRight,
  X,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  CalendarCheck,
} from "lucide-react";
import toast from "react-hot-toast";

type Event = {
  id: number;
  title: string;
  description: string;
  banner: string;
  startDate: string;
  endDate: string;
  time: string;
  location: string;
  organizer: string;
  quota: number;
  registered: number;
  category: string;
  status: "upcoming" | "ongoing" | "completed";
  isRegistered: boolean;
  price: number;
};

export default function UserEvents() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("sidebar-state");
    if (saved !== null) {
      setSidebarOpen(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      const dummyEvents: Event[] = [
        {
          id: 1,
          title: "Workshop Public Speaking",
          description:
            "Tingkatkan kemampuan berbicara di depan umum bersama trainer profesional. Workshop ini akan membahas teknik-teknik public speaking yang efektif dan praktis.",
          banner: "/events/workshop1.jpg",
          startDate: "2024-06-20",
          endDate: "2024-06-20",
          time: "09:00 - 15:00",
          location: "Aula SMK Banjar Idaman",
          organizer: "Divisi Pendidikan FOBI",
          quota: 100,
          registered: 45,
          category: "Workshop",
          status: "upcoming",
          isRegistered: false,
          price: 0,
        },
        {
          id: 2,
          title: "Lomba Debat Antar OSIS",
          description:
            "Kompetisi debat tingkat regional untuk mengasah kemampuan berpikir kritis dan argumentasi. Terbuka untuk seluruh anggota OSIS se-Banjar.",
          banner: "/events/debate.jpg",
          startDate: "2024-06-25",
          endDate: "2024-06-26",
          time: "08:00 - 17:00",
          location: "Gedung Serbaguna Kota Banjar",
          organizer: "Divisi Akademik FOBI",
          quota: 150,
          registered: 78,
          category: "Kompetisi",
          status: "upcoming",
          isRegistered: true,
          price: 50000,
        },
        {
          id: 3,
          title: "Bakti Sosial",
          description:
            "Kegiatan sosial untuk membantu panti asuhan dan masyarakat kurang mampu. Mari berbagi kebahagiaan bersama!",
          banner: "/events/baksos.jpg",
          startDate: "2024-07-01",
          endDate: "2024-07-01",
          time: "07:00 - 12:00",
          location: "Panti Asuhan Harapan Bangsa",
          organizer: "Divisi Sosial FOBI",
          quota: 50,
          registered: 32,
          category: "Sosial",
          status: "upcoming",
          isRegistered: false,
          price: 0,
        },
        {
          id: 4,
          title: "Leadership Training",
          description:
            "Pelatihan kepemimpinan intensif selama 3 hari untuk membentuk karakter pemimpin muda yang berkualitas.",
          banner: "/events/leadership.jpg",
          startDate: "2024-06-15",
          endDate: "2024-06-17",
          time: "08:00 - 16:00",
          location: "Villa Pendidikan Cimahi",
          organizer: "Divisi Kepemimpinan FOBI",
          quota: 80,
          registered: 80,
          category: "Training",
          status: "ongoing",
          isRegistered: true,
          price: 150000,
        },
        {
          id: 5,
          title: "Seminar Pendidikan",
          description:
            "Seminar tentang pentingnya pendidikan karakter di era digital bersama narasumber berpengalaman.",
          banner: "/events/seminar.jpg",
          startDate: "2024-05-20",
          endDate: "2024-05-20",
          time: "09:00 - 12:00",
          location: "Aula SMK Banjar Idaman",
          organizer: "Divisi Pendidikan FOBI",
          quota: 200,
          registered: 185,
          category: "Seminar",
          status: "completed",
          isRegistered: true,
          price: 0,
        },
        {
          id: 6,
          title: "Outbound & Team Building",
          description:
            "Kegiatan outdoor untuk mempererat solidaritas dan kerjasama tim antar anggota OSIS.",
          banner: "/events/outbound.jpg",
          startDate: "2024-05-10",
          endDate: "2024-05-11",
          time: "06:00 - 18:00",
          location: "Wisata Alam Green Canyon",
          organizer: "Divisi Olahraga FOBI",
          quota: 60,
          registered: 58,
          category: "Outbound",
          status: "completed",
          isRegistered: false,
          price: 100000,
        },
      ];
      setEvents(dummyEvents);
      setLoading(false);
    }, 800);
  }, []);

  const filteredEvents = events.filter((event) => {
    const matchSearch = event.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchStatus = filterStatus === "all" || event.status === filterStatus;
    const matchCategory =
      filterCategory === "all" || event.category === filterCategory;
    return matchSearch && matchStatus && matchCategory;
  });

  const handleRegister = (event: Event) => {
    setSelectedEvent(event);
    setShowRegisterModal(true);
  };

  const confirmRegister = () => {
    if (selectedEvent) {
      setEvents(
        events.map((e) =>
          e.id === selectedEvent.id
            ? { ...e, isRegistered: true, registered: e.registered + 1 }
            : e,
        ),
      );
      toast.success("Berhasil mendaftar event!");
      setShowRegisterModal(false);
      setSelectedEvent(null);
    }
  };

  const getStatusBadge = (status: string) => {
    const baseClass =
      "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold";
    switch (status) {
      case "upcoming":
        return `${baseClass} bg-blue-50 text-blue-700 border border-blue-100`;
      case "ongoing":
        return `${baseClass} bg-emerald-50 text-emerald-700 border border-emerald-100`;
      case "completed":
        return `${baseClass} bg-slate-100 text-slate-600 border border-slate-200`;
      default:
        return `${baseClass} bg-slate-100 text-slate-600 border border-slate-200`;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "upcoming":
        return "Akan Datang";
      case "ongoing":
        return "Sedang Berlangsung";
      case "completed":
        return "Selesai";
      default:
        return status;
    }
  };

  const formatPrice = (price: number) => {
    if (price === 0) return "GRATIS";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
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
            <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-md px-4 py-2 rounded-full border border-slate-200/60 shadow-sm mb-4">
              <Calendar className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Event & Kegiatan
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight mb-2">
              Jelajahi Event Menarik
            </h1>
            <p className="text-slate-500 font-medium text-sm md:text-base">
              Temukan dan daftar event yang sesuai dengan minat Anda
            </p>
          </motion.div>

          {/* Search & Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6 space-y-4"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Cari event..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/80 backdrop-blur-md border border-slate-200 rounded-2xl py-3.5 pl-12 pr-4 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all font-medium text-slate-700 text-sm md:text-base shadow-sm"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex items-center gap-2 bg-white/70 backdrop-blur-md border border-slate-200 rounded-2xl px-4 py-2.5 shadow-sm flex-1">
                <Filter className="w-4 h-4 text-slate-400" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-sm font-semibold text-slate-700"
                >
                  <option value="all">Semua Status</option>
                  <option value="upcoming">Akan Datang</option>
                  <option value="ongoing">Sedang Berlangsung</option>
                  <option value="completed">Selesai</option>
                </select>
              </div>

              <div className="flex items-center gap-2 bg-white/70 backdrop-blur-md border border-slate-200 rounded-2xl px-4 py-2.5 shadow-sm flex-1">
                <CalendarCheck className="w-4 h-4 text-slate-400" />
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-sm font-semibold text-slate-700"
                >
                  <option value="all">Semua Kategori</option>
                  <option value="Workshop">Workshop</option>
                  <option value="Kompetisi">Kompetisi</option>
                  <option value="Sosial">Sosial</option>
                  <option value="Training">Training</option>
                  <option value="Seminar">Seminar</option>
                  <option value="Outbound">Outbound</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Events Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/70 backdrop-blur-xl border border-slate-200/60 rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-slate-200/60 bg-gradient-to-r from-slate-50/50 to-transparent">
              <p className="text-sm font-semibold text-slate-600">
                Total:{" "}
                <span className="text-blue-600">{filteredEvents.length}</span>{" "}
                event
              </p>
            </div>

            <div className="p-6">
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="aspect-video bg-slate-200 rounded-2xl mb-4"></div>
                      <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-slate-100 rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              ) : filteredEvents.length === 0 ? (
                <div className="py-16 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-4">
                    <AlertCircle className="w-8 h-8 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-700 mb-2">
                    Tidak ada event ditemukan
                  </h3>
                  <p className="text-slate-500 text-sm">
                    Coba ubah filter atau kata kunci pencarian
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredEvents.map((event, index) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
                    >
                      {/* Banner */}
                      <div className="aspect-video bg-gradient-to-br from-blue-100 to-indigo-100 relative overflow-hidden">
                        <Calendar className="w-16 h-16 text-blue-300 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                        <div className="absolute top-3 left-3">
                          <span className={getStatusBadge(event.status)}>
                            {getStatusLabel(event.status)}
                          </span>
                        </div>
                        {event.isRegistered && (
                          <div className="absolute top-3 right-3 bg-emerald-500 text-white px-2 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" />
                            TERDAFTAR
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="font-bold text-slate-800 text-sm line-clamp-2 flex-1">
                            {event.title}
                          </h3>
                        </div>

                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2 text-xs text-slate-600">
                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                            <span>
                              {new Date(event.startDate).toLocaleDateString(
                                "id-ID",
                                {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                },
                              )}{" "}
                              • {event.time}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-slate-600">
                            <MapPin className="w-3.5 h-3.5 text-slate-400" />
                            <span className="line-clamp-1">
                              {event.location}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-slate-600">
                            <Users className="w-3.5 h-3.5 text-slate-400" />
                            <span>
                              {event.registered}/{event.quota} peserta
                            </span>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-4">
                          <div className="flex items-center justify-between text-xs mb-1.5">
                            <span className="font-semibold text-slate-600">
                              Kuota
                            </span>
                            <span className="font-bold text-slate-800">
                              {Math.round(
                                (event.registered / event.quota) * 100,
                              )}
                              %
                            </span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full transition-all ${
                                event.registered === event.quota
                                  ? "bg-red-500"
                                  : "bg-blue-600"
                              }`}
                              style={{
                                width: `${(event.registered / event.quota) * 100}%`,
                              }}
                            ></div>
                          </div>
                        </div>

                        {/* Price & Button */}
                        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                          <div>
                            <p className="text-[10px] text-slate-400 font-semibold uppercase">
                              Biaya
                            </p>
                            <p
                              className={`font-black text-sm ${
                                event.price === 0
                                  ? "text-emerald-600"
                                  : "text-slate-800"
                              }`}
                            >
                              {formatPrice(event.price)}
                            </p>
                          </div>
                          <button
                            onClick={() => setSelectedEvent(event)}
                            className="group inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-semibold text-xs transition-all active:scale-95"
                          >
                            Detail
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </main>
      </div>

      {/* Event Detail Modal */}
      <AnimatePresence>
        {selectedEvent && !showRegisterModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              {/* Banner */}
              <div className="aspect-video bg-gradient-to-br from-blue-100 to-indigo-100 relative">
                <Calendar className="w-24 h-24 text-blue-300 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-md rounded-xl hover:bg-white transition-colors"
                >
                  <X className="w-5 h-5 text-slate-700" />
                </button>
                <div className="absolute bottom-4 left-4">
                  <span className={getStatusBadge(selectedEvent.status)}>
                    {getStatusLabel(selectedEvent.status)}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h2 className="text-2xl font-black text-slate-800 mb-4">
                  {selectedEvent.title}
                </h2>

                <p className="text-slate-600 mb-6 leading-relaxed">
                  {selectedEvent.description}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-blue-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <p className="text-xs font-bold text-blue-700 uppercase">
                        Tanggal
                      </p>
                    </div>
                    <p className="font-bold text-slate-800 text-sm">
                      {new Date(selectedEvent.startDate).toLocaleDateString(
                        "id-ID",
                        {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        },
                      )}
                    </p>
                    <p className="text-xs text-slate-600 mt-1">
                      {selectedEvent.time}
                    </p>
                  </div>

                  <div className="bg-purple-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-4 h-4 text-purple-600" />
                      <p className="text-xs font-bold text-purple-700 uppercase">
                        Lokasi
                      </p>
                    </div>
                    <p className="font-bold text-slate-800 text-sm line-clamp-2">
                      {selectedEvent.location}
                    </p>
                  </div>

                  <div className="bg-emerald-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-4 h-4 text-emerald-600" />
                      <p className="text-xs font-bold text-emerald-700 uppercase">
                        Peserta
                      </p>
                    </div>
                    <p className="font-bold text-slate-800 text-sm">
                      {selectedEvent.registered}/{selectedEvent.quota} orang
                    </p>
                  </div>

                  <div className="bg-amber-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-amber-600" />
                      <p className="text-xs font-bold text-amber-700 uppercase">
                        Biaya
                      </p>
                    </div>
                    <p
                      className={`font-bold text-sm ${
                        selectedEvent.price === 0
                          ? "text-emerald-600"
                          : "text-slate-800"
                      }`}
                    >
                      {formatPrice(selectedEvent.price)}
                    </p>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-xl p-4 mb-6">
                  <p className="text-xs font-bold text-slate-600 uppercase mb-1">
                    Penyelenggara
                  </p>
                  <p className="font-bold text-slate-800">
                    {selectedEvent.organizer}
                  </p>
                </div>

                {/* Action Button */}
                {selectedEvent.status === "upcoming" &&
                  !selectedEvent.isRegistered && (
                    <button
                      onClick={() => setShowRegisterModal(true)}
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:shadow-xl transition-all active:scale-[0.98]"
                    >
                      <CheckCircle className="w-5 h-5" />
                      Daftar Event Ini
                    </button>
                  )}

                {selectedEvent.isRegistered && (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-center">
                    <CheckCircle className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                    <p className="font-bold text-emerald-700">
                      Anda sudah terdaftar
                    </p>
                  </div>
                )}

                {selectedEvent.status === "completed" && (
                  <div className="bg-slate-100 border border-slate-200 rounded-2xl p-4 text-center">
                    <AlertCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                    <p className="font-bold text-slate-600">
                      Event sudah selesai
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Register Confirmation Modal */}
      <AnimatePresence>
        {showRegisterModal && selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowRegisterModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8"
            >
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <CalendarCheck className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-black text-slate-800 mb-2">
                  Konfirmasi Pendaftaran
                </h3>
                <p className="text-slate-600 text-sm">
                  Apakah Anda yakin ingin mendaftar event ini?
                </p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-4 mb-6">
                <p className="text-xs font-bold text-slate-500 uppercase mb-1">
                  Event
                </p>
                <p className="font-bold text-slate-800 mb-3">
                  {selectedEvent.title}
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Clock className="w-4 h-4" />
                    <span>
                      {new Date(selectedEvent.startDate).toLocaleDateString(
                        "id-ID",
                        {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        },
                      )}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <MapPin className="w-4 h-4" />
                    <span>{selectedEvent.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <TrendingUp className="w-4 h-4" />
                    <span className="font-bold">
                      {formatPrice(selectedEvent.price)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowRegisterModal(false)}
                  className="flex-1 py-3 rounded-xl font-semibold text-sm text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={confirmRegister}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 rounded-xl font-semibold text-sm shadow-lg shadow-blue-500/25 hover:shadow-xl transition-all active:scale-[0.98]"
                >
                  Ya, Daftar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

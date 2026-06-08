/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SideBar from "../../sidebar/page";
import {
  User,
  Mail,
  Phone,
  School,
  Briefcase,
  FileText,
  Upload,
  Send,
  CheckCircle,
  Star,
  Users,
  Trophy,
  Clock,
  X,
  Sparkles,
} from "lucide-react";
import toast from "react-hot-toast";

type Division = {
  id: string;
  name: string;
  icon: any;
  description: string;
};

export default function UserDaftarPengurus() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedDivision, setSelectedDivision] = useState<string>("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    class: "",
    experience: "",
    motivation: "",
  });

  useEffect(() => {
    const saved = localStorage.getItem("sidebar-state");
    if (saved !== null) {
      setSidebarOpen(JSON.parse(saved));
    }
  }, []);

  // Dummy Data Divisi
  const divisions: Division[] = [
    {
      id: "kepemimpinan",
      name: "Kepemimpinan",
      icon: Trophy,
      description: "Mengarahkan visi dan strategi organisasi",
    },
    {
      id: "pendidikan",
      name: "Pendidikan",
      icon: School,
      description: "Mengembangkan akademik dan pelatihan anggota",
    },
    {
      id: "humas",
      name: "Humas & Media",
      icon: Users,
      description: "Mengelola hubungan eksternal dan publikasi",
    },
    {
      id: "olahraga",
      name: "Olahraga",
      icon: Star,
      description: "Mengkoordinir kegiatan fisik dan kompetisi",
    },
    {
      id: "sosial",
      name: "Sosial",
      icon: HeartIcon,
      description: "Menggerakkan kegiatan bakti sosial",
    },
    {
      id: "kewirausahaan",
      name: "Kewirausahaan",
      icon: Briefcase,
      description: "Mengelola bisnis dan dana organisasi",
    },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedDivision) {
      toast.error("Silakan pilih divisi yang diminati!");
      return;
    }
    if (!agreeTerms) {
      toast.error("Anda harus menyetujui syarat dan ketentuan!");
      return;
    }

    setIsSubmitting(true);

    // Simulasi API Call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccessModal(true);
      toast.success("Pendaftaran berhasil dikirim!");
    }, 2000);
  };

  const resetForm = () => {
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      class: "",
      experience: "",
      motivation: "",
    });
    setSelectedDivision("");
    setAgreeTerms(false);
    setShowSuccessModal(false);
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
              <Users className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Pendaftaran Pengurus
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight mb-2">
              Bergabung Menjadi Pengurus FOBI
            </h1>
            <p className="text-slate-500 font-medium text-sm md:text-base">
              Isi formulir di bawah ini untuk mendaftar sebagai pengurus periode
              2024/2025
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Form Section (Kiri - 2 Kolom) */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-2"
            >
              <form
                onSubmit={handleSubmit}
                className="bg-white/70 backdrop-blur-xl border border-slate-200/60 rounded-3xl shadow-xl shadow-slate-200/50 p-6 md:p-8 space-y-6"
              >
                {/* Data Pribadi */}
                <div>
                  <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <User className="w-5 h-5 text-blue-600" />
                    Data Pribadi
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Nama */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Nama Lengkap <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder="Masukkan nama lengkap"
                          required
                          className="w-full bg-white border border-slate-200 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-sm"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Email Aktif <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="email@contoh.com"
                          required
                          className="w-full bg-white border border-slate-200 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-sm"
                        />
                      </div>
                    </div>

                    {/* No HP */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        No. WhatsApp <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="081234567890"
                          required
                          className="w-full bg-white border border-slate-200 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-sm"
                        />
                      </div>
                    </div>

                    {/* Kelas */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Kelas / Jurusan <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <School className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                          type="text"
                          name="class"
                          value={formData.class}
                          onChange={handleChange}
                          placeholder="Contoh: XII IPA 1"
                          required
                          className="w-full bg-white border border-slate-200 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-200"></div>

                {/* Pilihan Divisi */}
                <div>
                  <h3 className="text-lg font-bold text-slate-800 mb-2 flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-blue-600" />
                    Pilihan Divisi <span className="text-red-500">*</span>
                  </h3>
                  <p className="text-sm text-slate-500 mb-4">
                    Pilih satu divisi yang paling sesuai dengan minat dan bakat
                    Anda
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {divisions.map((div) => {
                      const Icon = div.icon;
                      const isSelected = selectedDivision === div.id;
                      return (
                        <button
                          key={div.id}
                          type="button"
                          onClick={() => setSelectedDivision(div.id)}
                          className={`relative p-4 rounded-2xl border-2 text-left transition-all duration-200 group ${
                            isSelected
                              ? "border-blue-500 bg-blue-50/50 shadow-md"
                              : "border-slate-200 bg-white hover:border-blue-200 hover:bg-slate-50"
                          }`}
                        >
                          {isSelected && (
                            <div className="absolute top-3 right-3 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                              <CheckCircle className="w-3.5 h-3.5 text-white" />
                            </div>
                          )}
                          <div className="flex items-start gap-3">
                            <div
                              className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                                isSelected
                                  ? "bg-blue-500 text-white"
                                  : "bg-slate-100 text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-600"
                              } transition-all`}
                            >
                              <Icon className="w-5 h-5" />
                            </div>
                            <div>
                              <p
                                className={`font-bold text-sm mb-0.5 ${
                                  isSelected
                                    ? "text-blue-700"
                                    : "text-slate-800"
                                }`}
                              >
                                {div.name}
                              </p>
                              <p className="text-xs text-slate-500 leading-relaxed">
                                {div.description}
                              </p>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="border-t border-slate-200"></div>

                {/* Pengalaman & Motivasi */}
                <div>
                  <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-600" />
                    Pengalaman & Motivasi
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Pengalaman Organisasi (Opsional)
                      </label>
                      <textarea
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        rows={3}
                        placeholder="Ceritakan pengalaman organisasi Anda sebelumnya..."
                        className="w-full bg-white border border-slate-200 rounded-xl py-3 px-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-sm resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Alasan Ingin Bergabung{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="motivation"
                        value={formData.motivation}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Mengapa Anda ingin menjadi pengurus FOBI? Apa yang bisa Anda kontribusikan?"
                        required
                        className="w-full bg-white border border-slate-200 rounded-xl py-3 px-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-sm resize-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-200"></div>

                {/* Upload Dokumen */}
                <div>
                  <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <Upload className="w-5 h-5 text-blue-600" />
                    Upload Dokumen Pendukung
                  </h3>
                  <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center hover:border-blue-500 hover:bg-blue-50/30 transition-all cursor-pointer group">
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-slate-100 rounded-2xl mb-4 group-hover:bg-blue-100 transition-colors">
                      <Upload className="w-6 h-6 text-slate-400 group-hover:text-blue-600 transition-colors" />
                    </div>
                    <p className="text-sm font-bold text-slate-700 mb-1">
                      Klik untuk upload CV / Portofolio
                    </p>
                    <p className="text-xs text-slate-500">
                      Format PDF, JPG, atau PNG (Maks. 5MB)
                    </p>
                  </div>
                </div>

                {/* Terms & Submit */}
                <div className="space-y-4 pt-2">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <div className="relative flex items-center mt-0.5">
                      <input
                        type="checkbox"
                        checked={agreeTerms}
                        onChange={(e) => setAgreeTerms(e.target.checked)}
                        className="peer sr-only"
                      />
                      <div className="w-5 h-5 border-2 border-slate-300 rounded-md peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-all flex items-center justify-center">
                        {agreeTerms && (
                          <CheckCircle className="w-3.5 h-3.5 text-white" />
                        )}
                      </div>
                    </div>
                    <span className="text-sm text-slate-600 group-hover:text-slate-800 transition-colors">
                      Saya menyatakan data yang diisi adalah benar dan bersedia
                      mengikuti seluruh tahapan seleksi pengurus FOBI.
                    </span>
                  </label>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                      type="button"
                      onClick={resetForm}
                      className="flex-1 py-3.5 rounded-2xl font-bold text-sm text-slate-700 bg-slate-100 hover:bg-slate-200 transition-all"
                    >
                      Reset Formulir
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-[2] group bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3.5 rounded-2xl font-bold text-sm shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Mengirim Pendaftaran...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          Kirim Pendaftaran
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>

            {/* Info Section (Kanan - 1 Kolom) */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              {/* Benefit Card */}
              <div className="bg-white/70 backdrop-blur-xl border border-slate-200/60 rounded-3xl shadow-xl shadow-slate-200/50 p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-amber-600" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800">
                    Benefit Bergabung
                  </h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "Sertifikat kepengurusan resmi",
                    "Relasi & networking luas",
                    "Soft skill leadership & manajemen",
                    "Akses eksklusif event nasional",
                    "Poin prestasi untuk sekolah",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm text-slate-600"
                    >
                      <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Timeline Card */}
              <div className="bg-white/70 backdrop-blur-xl border border-slate-200/60 rounded-3xl shadow-xl shadow-slate-200/50 p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                    <Clock className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800">
                    Timeline Seleksi
                  </h3>
                </div>
                <div className="space-y-4 relative pl-4 border-l-2 border-slate-200">
                  {[
                    {
                      date: "10 - 20 Jun",
                      title: "Pendaftaran Online",
                      active: true,
                    },
                    {
                      date: "22 - 25 Jun",
                      title: "Seleksi Berkas",
                      active: false,
                    },
                    { date: "28 Jun", title: "Wawancara", active: false },
                    { date: "01 Jul", title: "Pengumuman", active: false },
                  ].map((item, i) => (
                    <div key={i} className="relative pl-4">
                      <div
                        className={`absolute -left-[21px] top-1 w-3 h-3 rounded-full border-2 ${
                          item.active
                            ? "bg-blue-600 border-blue-600"
                            : "bg-white border-slate-300"
                        }`}
                      ></div>
                      <p className="text-xs font-bold text-slate-500 mb-0.5">
                        {item.date}
                      </p>
                      <p
                        className={`text-sm font-semibold ${
                          item.active ? "text-blue-700" : "text-slate-700"
                        }`}
                      >
                        {item.title}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Card */}
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-6 text-white shadow-xl shadow-blue-500/20">
                <h3 className="text-lg font-bold mb-2">Butuh Bantuan?</h3>
                <p className="text-blue-100 text-sm mb-4">
                  Hubungi panitia seleksi jika ada kendala dalam pendaftaran.
                </p>
                <div className="space-y-2 text-sm">
                  <p className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    seleksi@fobi.or.id
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    0812-3456-7890 (Panitia)
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </main>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowSuccessModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 rounded-full mb-6"
              >
                <CheckCircle className="w-10 h-10 text-emerald-600" />
              </motion.div>
              <h3 className="text-2xl font-black text-slate-800 mb-2">
                Pendaftaran Berhasil! 🎉
              </h3>
              <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                Terima kasih telah mendaftar sebagai pengurus FOBI. Tim seleksi
                akan menghubungi Anda melalui email dan WhatsApp dalam 3x24 jam.
              </p>
              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 mb-6 text-left">
                <p className="text-xs font-bold text-blue-700 uppercase mb-1">
                  Info Selanjutnya
                </p>
                <p className="text-xs text-blue-600">
                  Silakan pantau email Anda secara berkala untuk informasi
                  jadwal wawancara.
                </p>
              </div>
              <button
                onClick={resetForm}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3.5 rounded-2xl font-bold text-sm shadow-lg shadow-blue-500/25 hover:shadow-xl transition-all active:scale-[0.98]"
              >
                Kembali ke Beranda
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Helper Icon
function HeartIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

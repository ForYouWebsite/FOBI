/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import SideBar from "@/app/sidebar/page";
import { toast } from "react-hot-toast"; // ✅ Import react-hot-toast
import {
  User,
  Briefcase,
  Building2,
  Hash,
  FileText,
  Image as ImageIcon,
  Save,
  ArrowLeft,
  Sparkles,
  AlertCircle,
  XCircle,
} from "lucide-react";

const API = axios.create({
  baseURL: "https://hmcf55cz-5000.asse.devtunnels.ms/api",
});

export default function CreateMember() {
  const router = useRouter();

  const [form, setForm] = useState({
    full_name: "",
    position: "",
    division: "",
    sort_order: "",
    description: "",
  });

  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileError, setFileError] = useState(false); // ✅ State untuk error file

  // ➕ State untuk sinkronisasi sidebar
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const getToken = () => {
    const raw =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    return raw?.replace(/"/g, "").trim();
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setFileError(false); // Reset error state

    const token = getToken();
    if (!token) {
      toast.error("⚠️ Session habis, silakan login ulang");
      return;
    }

    // ✅ VALIDASI: Semua field wajib diisi termasuk foto
    if (!form.full_name.trim()) {
      toast.error("Nama lengkap wajib diisi");
      return;
    }
    if (!form.position.trim()) {
      toast.error("Jabatan wajib diisi");
      return;
    }
    if (!form.division.trim()) {
      toast.error("Divisi wajib diisi");
      return;
    }
    if (!form.sort_order || Number(form.sort_order) <= 0) {
      toast.error("Urutan tampil wajib diisi dan harus lebih dari 0");
      return;
    }
    if (!form.description.trim()) {
      toast.error("Deskripsi wajib diisi");
      return;
    }
    // ✅ VALIDASI UTAMA: Foto wajib diupload
    if (!file) {
      setFileError(true);
      toast.error(" Foto profil wajib diupload");
      return;
    }

    // Validasi ukuran file (opsional, maksimal 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Ukuran foto maksimal 5MB");
      return;
    }

    try {
      setIsSubmitting(true);
      const formData = new FormData();

      formData.append("full_name", form.full_name);
      formData.append("position", form.position);
      formData.append("division", form.division);
      formData.append("description", form.description);
      formData.append("sort_order", `${Number(form.sort_order)}`);
      formData.append("photo", file); // ✅ Foto selalu dikirim karena sudah divalidasi

      await API.post("/board", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      // ✅ Success toast dengan duration custom
      toast.success(" Data pengurus berhasil ditambahkan!", {
        duration: 3000,
        icon: "",
      });

      // Reset form sebelum redirect
      setForm({
        full_name: "",
        position: "",
        division: "",
        sort_order: "",
        description: "",
      });
      setFile(null);

      // Redirect dengan delay kecil agar toast terlihat
      setTimeout(() => {
        router.push("/admin/member");
        router.refresh(); // ✅ Refresh data di halaman tujuan
      }, 1500);
    } catch (err: any) {
      console.error("Error create member:", err);
      const errorMsg = err?.response?.data?.message || "Gagal menambah data";
      toast.error(`❌ ${errorMsg}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper untuk input styling (reusable)
  const inputBase =
    "w-full bg-white/80 backdrop-blur-md border border-slate-200 rounded-2xl py-3.5 pl-12 pr-4 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all font-medium text-slate-700 text-sm md:text-base shadow-sm placeholder:text-slate-400";
  const inputError =
    "border-red-400 focus:border-red-500 focus:ring-red-500/10";
  const labelBase =
    "block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
      {/* Background Decor */}
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
                <button
                  onClick={() => router.back()}
                  className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-700 transition-colors text-sm font-medium group"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  Kembali
                </button>

                {/* <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-md px-4 py-2 rounded-full border border-slate-200/60 shadow-sm">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                    Tambah Data Baru
                  </span>
                </div> */}

                <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">
                  Form Pengurus
                </h1>
                <p className="text-slate-500 font-medium text-sm md:text-base">
                  Lengkapi informasi anggota baru untuk struktur organisasi
                </p>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-white/70 backdrop-blur-xl border border-slate-200/60 rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden">
            {/* Card Header */}
            <div className="px-6 py-4 border-b border-slate-200/60 bg-gradient-to-r from-slate-50/50 to-transparent">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-blue-500" />
                <p className="text-sm font-semibold text-slate-600">
                  <span className="text-red-500">*</span> Semua field wajib
                  diisi, termasuk foto profil
                </p>
              </div>
            </div>

            {/* Form Content */}
            <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
              {/* Grid Layout for inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nama Lengkap */}
                <div className="space-y-2">
                  <label className={labelBase}>
                    <User className="w-3.5 h-3.5 inline mr-1" />
                    Nama Lengkap <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Contoh: Ahmad Rizki Pratama"
                      className={`${inputBase} ${!form.full_name && fileError ? inputError : ""}`}
                      value={form.full_name}
                      onChange={(e) => {
                        setForm({ ...form, full_name: e.target.value });
                        if (fileError) setFileError(false);
                      }}
                    />
                  </div>
                </div>

                {/* Jabatan */}
                <div className="space-y-2">
                  <label className={labelBase}>
                    <Briefcase className="w-3.5 h-3.5 inline mr-1" />
                    Jabatan / Posisi <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Contoh: Ketua Umum"
                      className={`${inputBase} ${!form.position && fileError ? inputError : ""}`}
                      value={form.position}
                      onChange={(e) => {
                        setForm({ ...form, position: e.target.value });
                        if (fileError) setFileError(false);
                      }}
                    />
                  </div>
                </div>

                {/* Divisi */}
                <div className="space-y-2">
                  <label className={labelBase}>
                    <Building2 className="w-3.5 h-3.5 inline mr-1" />
                    Divisi / Bidang <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Contoh: Divisi Acara"
                      className={`${inputBase} ${!form.division && fileError ? inputError : ""}`}
                      value={form.division}
                      onChange={(e) => {
                        setForm({ ...form, division: e.target.value });
                        if (fileError) setFileError(false);
                      }}
                    />
                  </div>
                </div>

                {/* Sort Order */}
                <div className="space-y-2">
                  <label className={labelBase}>
                    <Hash className="w-3.5 h-3.5 inline mr-1" />
                    Urutan Tampil <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="number"
                      min="1"
                      placeholder="1 = Ketua, 2 = Wakil, dst"
                      className={`${inputBase} ${(!form.sort_order || Number(form.sort_order) <= 0) && fileError ? inputError : ""}`}
                      value={form.sort_order}
                      onChange={(e) => {
                        setForm({ ...form, sort_order: e.target.value });
                        if (fileError) setFileError(false);
                      }}
                    />
                  </div>
                  <p className="text-[10px] text-slate-400 ml-1">
                    Nilai kecil = tampil lebih atas
                  </p>
                </div>
              </div>

              {/* Deskripsi (full width) */}
              <div className="space-y-2">
                <label className={labelBase}>
                  <FileText className="w-3.5 h-3.5 inline mr-1" />
                  Sekolah <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FileText className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
                  <textarea
                    placeholder="Contoh: Siswa kelas XII IPA 2, aktif di organisasi sejak 2023..."
                    className={`${inputBase} ${!form.description && fileError ? inputError : ""} min-h-[120px] pt-4 resize-y`}
                    value={form.description}
                    onChange={(e) => {
                      setForm({ ...form, description: e.target.value });
                      if (fileError) setFileError(false);
                    }}
                    rows={4}
                  />
                </div>
              </div>

              {/* File Upload - Custom Styling + Wajib */}
              <div className="space-y-2">
                <label className={labelBase}>
                  <ImageIcon className="w-3.5 h-3.5 inline mr-1" />
                  Foto Profil <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div
                    className={`
                      border-2 border-dashed rounded-2xl p-6 text-center transition-all duration-200 cursor-pointer
                      ${fileError ? "border-red-400 bg-red-50/50 animate-pulse" : ""}
                      ${
                        file
                          ? "border-emerald-400 bg-emerald-50/50"
                          : "border-slate-300 hover:border-blue-400 hover:bg-blue-50/30"
                      }
                    `}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setFile(e.target.files[0]);
                          setFileError(false); // Reset error saat file dipilih
                        }
                      }}
                    />
                    <div className="flex flex-col items-center gap-2 pointer-events-none">
                      {file ? (
                        <>
                          <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                            <ImageIcon className="w-6 h-6 text-emerald-600" />
                          </div>
                          <p className="text-sm font-semibold text-emerald-700">
                            {file.name}
                          </p>
                          <p className="text-xs text-emerald-500">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setFile(null);
                            }}
                            className="pointer-events-auto mt-2 inline-flex items-center gap-1 text-xs text-red-500 hover:text-red-700 font-medium"
                          >
                            <XCircle className="w-3 h-3" /> Hapus
                          </button>
                        </>
                      ) : (
                        <>
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center ${fileError ? "bg-red-100" : "bg-slate-100"}`}
                          >
                            <ImageIcon
                              className={`w-6 h-6 ${fileError ? "text-red-500" : "text-slate-400"}`}
                            />
                          </div>
                          <p className="text-sm font-medium text-slate-600">
                            Klik atau drag foto ke sini
                          </p>
                          <p className="text-xs text-slate-400">
                            PNG, JPG maksimal 5MB
                          </p>
                          {fileError && (
                            <p className="text-xs text-red-500 font-medium mt-1 animate-bounce">
                              Foto wajib diupload!
                            </p>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-slate-200/60">
                <button
                  type="button"
                  onClick={() => router.back()}
                  disabled={isSubmitting}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-white/80 backdrop-blur-md border border-slate-200 text-slate-700 px-6 py-3.5 rounded-2xl font-semibold hover:bg-white hover:border-slate-300 transition-all duration-300 shadow-sm disabled:opacity-50"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Batal
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 py-3.5 rounded-2xl font-semibold shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Memproses...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Simpan Data
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Helper Info */}
          <div className="mt-6 text-center">
            <p className="text-xs text-slate-400">
              Tips: Gunakan foto dengan rasio 1:1 untuk hasil terbaik
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import SideBar from "@/app/sidebar/page";
import {
  ClipboardList,
  FileText,
  Tag,
  Calendar,
  Image as ImageIcon,
  Save,
  ArrowLeft,
  Sparkles,
  AlertCircle,
  XCircle,
  Loader2,
  CheckCircle2,
} from "lucide-react";

const API = axios.create({
  baseURL: "https://hmcf55cz-5000.asse.devtunnels.ms/api",
});

type FormType = {
  title: string;
  description: string;
  category: string;
  status: string;
  start_date: string;
  end_date: string;
  image_url: string;
};

export default function CreateProker() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  const [form, setForm] = useState<FormType>({
    title: "",
    description: "",
    category: "",
    status: "planned",
    start_date: "",
    end_date: "",
    image_url: "",
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    setMounted(true);
    const storedToken =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    setToken(storedToken);
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Harap pilih file gambar");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Ukuran file maksimal 5MB");
        return;
      }
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
        setForm({
          ...form,
          image_url: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const authToken =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    if (!authToken) {
      toast.error("Token tidak ditemukan, silakan login ulang");
      router.push("/login");
      return;
    }

    // Validasi field wajib
    if (!form.title.trim()) {
      toast.error("Judul program wajib diisi");
      return;
    }
    if (!form.description.trim()) {
      toast.error("Deskripsi wajib diisi");
      return;
    }
    if (!form.category.trim()) {
      toast.error("Kategori wajib diisi");
      return;
    }
    if (!form.start_date) {
      toast.error("Tanggal mulai wajib diisi");
      return;
    }

    try {
      setLoading(true);
      const cleanToken = authToken.trim();

      if (selectedFile) {
        const formData = new FormData();
        formData.append("title", form.title);
        formData.append("description", form.description);
        formData.append("category", form.category);
        formData.append("status", form.status);
        formData.append("start_date", form.start_date);
        formData.append("end_date", form.end_date);
        formData.append("image", selectedFile);

        await API.post("/event", formData, {
          headers: {
            Authorization: `Bearer ${cleanToken}`,
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        await API.post("/event", form, {
          headers: {
            Authorization: `Bearer ${cleanToken}`,
            "Content-Type": "application/json",
          },
        });
      }

      toast.success("Program kerja berhasil ditambahkan");

      setTimeout(() => {
        router.push("/admin/event");
        router.refresh();
      }, 1200);
    } catch (err: any) {
      console.error("ERROR:", err.response?.data || err.message);
      const errorMessage =
        err.response?.data?.message || "Gagal menambah program kerja";
      toast.error(errorMessage);

      if (err.response?.status === 401 || err.response?.status === 403) {
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
        toast.error("Session habis, silakan login ulang");
        setTimeout(() => router.push("/login"), 1500);
      }
    } finally {
      setLoading(false);
    }
  };

  // Reusable styles
  const inputBase =
    "w-full bg-white/80 backdrop-blur-md border border-slate-200 rounded-2xl py-3.5 pl-12 pr-4 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all font-medium text-slate-700 text-sm md:text-base shadow-sm placeholder:text-slate-400";
  const labelBase =
    "block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2";

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
        <div className="flex items-center gap-3 text-slate-600">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="text-sm font-medium">Memuat form...</span>
        </div>
      </div>
    );
  }

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

        {/* Main Content */}
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
                    Tambah Program Baru
                  </span>
                </div> */}

                <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">
                  Form Program Kerja
                </h1>
                <p className="text-slate-500 font-medium text-sm md:text-base">
                  Lengkapi informasi program kerja baru untuk kegiatan
                  organisasi
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
                  Pastikan semua informasi program sudah benar sebelum menyimpan
                </p>
              </div>
            </div>

            {/* Form Content */}
            <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
              {/* Grid Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Title */}
                <div className="md:col-span-2 space-y-2">
                  <label className={labelBase}>
                    <ClipboardList className="w-3.5 h-3.5 inline mr-1" />
                    Judul Program <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <ClipboardList className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      name="title"
                      placeholder="Contoh: Lomba Karya Ilmiah Remaja 2024"
                      className={inputBase}
                      value={form.title}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="md:col-span-2 space-y-2">
                  <label className={labelBase}>
                    <FileText className="w-3.5 h-3.5 inline mr-1" />
                    Deskripsi <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FileText className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
                    <textarea
                      name="description"
                      placeholder="Jelaskan tujuan, target peserta, dan manfaat program..."
                      className={`${inputBase} min-h-[120px] pt-4 resize-y`}
                      value={form.description}
                      onChange={handleChange}
                      rows={4}
                      required
                    />
                  </div>
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <label className={labelBase}>
                    <Tag className="w-3.5 h-3.5 inline mr-1" />
                    Kategori <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      name="category"
                      placeholder="Contoh: Pendidikan, Olahraga, Seni"
                      className={inputBase}
                      value={form.category}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Status - Custom Selector dengan Icon Lucide */}
                <div className="space-y-2">
                  <label className={labelBase}>
                    <CheckCircle2 className="w-3.5 h-3.5 inline mr-1" />
                    Status Program
                  </label>
                  <div className="relative">
                    <CheckCircle2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <select
                      name="status"
                      value={form.status}
                      onChange={handleChange}
                      className={`${inputBase} appearance-none cursor-pointer pr-10`}
                    >
                      <option value="planned">
                        Planned - Dalam Perencanaan
                      </option>
                      <option value="ongoing">Ongoing - Sedang Berjalan</option>
                      <option value="completed">Completed - Selesai</option>
                      <option value="cancelled">Cancelled - Dibatalkan</option>
                    </select>
                    {/* Custom dropdown arrow */}
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg
                        className="w-5 h-5 text-slate-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Start Date */}
                <div className="space-y-2">
                  <label className={labelBase}>
                    <Calendar className="w-3.5 h-3.5 inline mr-1" />
                    Tanggal Mulai <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="date"
                      name="start_date"
                      value={form.start_date}
                      onChange={handleChange}
                      className={inputBase}
                      required
                    />
                  </div>
                </div>

                {/* End Date */}
                <div className="space-y-2">
                  <label className={labelBase}>
                    <Calendar className="w-3.5 h-3.5 inline mr-1" />
                    Tanggal Selesai
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="date"
                      name="end_date"
                      value={form.end_date}
                      onChange={handleChange}
                      className={inputBase}
                    />
                  </div>
                </div>
              </div>

              {/* Image Upload Section */}
              <div className="space-y-3 pt-2 border-t border-slate-200/60">
                <label className={labelBase}>
                  <ImageIcon className="w-3.5 h-3.5 inline mr-1" />
                  Gambar Program
                </label>

                {/* Preview */}
                {previewUrl && (
                  <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200">
                    <div className="relative">
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="w-20 h-20 object-cover rounded-xl shadow-md"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-700 truncate">
                        {selectedFile?.name || "Gambar terpilih"}
                      </p>
                      <p className="text-xs text-slate-500">
                        {selectedFile &&
                          `${(selectedFile.size / 1024 / 1024).toFixed(2)} MB`}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedFile(null);
                        setPreviewUrl("");
                        setForm({ ...form, image_url: "" });
                      }}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                      title="Hapus gambar"
                    >
                      <XCircle className="w-5 h-5" />
                    </button>
                  </div>
                )}

                {/* Upload Zone */}
                <div className="relative">
                  <div
                    className={`
                      border-2 border-dashed rounded-2xl p-6 text-center transition-all duration-200 cursor-pointer
                      ${
                        previewUrl
                          ? "border-emerald-400 bg-emerald-50/50"
                          : "border-slate-300 hover:border-blue-400 hover:bg-blue-50/30"
                      }
                    `}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={handleFileChange}
                    />
                    <div className="flex flex-col items-center gap-2 pointer-events-none">
                      <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
                        <ImageIcon className="w-6 h-6 text-slate-400" />
                      </div>
                      <p className="text-sm font-medium text-slate-600">
                        {previewUrl
                          ? "Ganti gambar?"
                          : "Klik atau drag gambar ke sini"}
                      </p>
                      <p className="text-xs text-slate-400">
                        PNG, JPG, GIF maksimal 5MB • Opsional
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-slate-200/60">
                <button
                  type="button"
                  onClick={() => router.back()}
                  disabled={loading}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-white/80 backdrop-blur-md border border-slate-200 text-slate-700 px-6 py-3.5 rounded-2xl font-semibold hover:bg-white hover:border-slate-300 transition-all duration-300 shadow-sm disabled:opacity-50"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Batal
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 py-3.5 rounded-2xl font-semibold shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Memproses...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Simpan Program
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Helper Info */}
          <div className="mt-6 text-center">
            <p className="text-xs text-slate-400">
              💡 Tip: Gunakan gambar dengan rasio 16:9 untuk tampilan terbaik di
              kartu program
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import SideBar from "../../../../sidebar/page";
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
  Loader2,
} from "lucide-react";

const API = axios.create({
  baseURL: "https://hmcf55cz-5000.asse.devtunnels.ms/api",
});

export default function EditMember() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState<any>({});
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const getToken = () => {
    const raw =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    return raw?.replace(/"/g, "").trim();
  };

  const fetchDetail = async () => {
    try {
      const res = await API.get(`/board/${id}`);
      setForm(res.data.member);
    } catch (err) {
      console.error(err);
      toast.error("Gagal memuat data pengurus");
    }
  };

  useEffect(() => {
    if (id) fetchDetail();
  }, [id]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const token = getToken();
    if (!token) {
      toast.error("Session habis, silakan login ulang");
      return;
    }

    // Validasi field wajib
    if (!form.full_name?.trim()) {
      toast.error("Nama lengkap wajib diisi");
      return;
    }
    if (!form.position?.trim()) {
      toast.error("Jabatan wajib diisi");
      return;
    }
    if (!form.division?.trim()) {
      toast.error("Divisi wajib diisi");
      return;
    }
    if (!form.sort_order || Number(form.sort_order) <= 0) {
      toast.error("Urutan tampil wajib diisi dan harus lebih dari 0");
      return;
    }
    if (!form.description?.trim()) {
      toast.error("Sekolah wajib diisi");
      return;
    }

    // Validasi ukuran file jika ada upload baru
    if (file && file.size > 5 * 1024 * 1024) {
      toast.error("Ukuran foto maksimal 5MB");
      return;
    }

    try {
      setIsSubmitting(true);
      const formData = new FormData();

      formData.append("full_name", form.full_name || "");
      formData.append("position", form.position || "");
      formData.append("division", form.division || "");
      formData.append("description", form.description || "");
      formData.append("sort_order", `${Number(form.sort_order || 0)}`);

      // Upload foto baru jika ada
      if (file) {
        formData.append("photo", file);
      }
      // Jika tidak upload baru, pertahankan foto lama
      else if (form.photo_url) {
        formData.append("photo_url", form.photo_url);
      }

      await API.put(`/board/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Data pengurus berhasil diperbarui");

      setTimeout(() => {
        router.push("/admin/member");
        router.refresh();
      }, 1200);
    } catch (err: any) {
      console.error("ERROR:", err?.response?.data || err.message);
      const errorMsg = err?.response?.data?.message || "Gagal memperbarui data";
      toast.error(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reusable styles
  const inputBase =
    "w-full bg-white/80 backdrop-blur-md border border-slate-200 rounded-2xl py-3.5 pl-12 pr-4 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all font-medium text-slate-700 text-sm md:text-base shadow-sm placeholder:text-slate-400";
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
                    Edit Data
                  </span>
                </div> */}

                <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">
                  Form Edit Pengurus
                </h1>
                <p className="text-slate-500 font-medium text-sm md:text-base">
                  Perbarui informasi anggota untuk menjaga data tetap akurat
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
                  Pastikan semua informasi sudah benar sebelum menyimpan
                  perubahan
                </p>
              </div>
            </div>

            {/* Form Content */}
            <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
              {/* Grid Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nama Lengkap */}
                <div className="space-y-2">
                  <label className={labelBase}>
                    <User className="w-3.5 h-3.5 inline mr-1" />
                    Nama Lengkap
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Contoh: Ahmad Rizki Pratama"
                      className={inputBase}
                      value={form.full_name || ""}
                      onChange={(e) =>
                        setForm({ ...form, full_name: e.target.value })
                      }
                    />
                  </div>
                </div>

                {/* Jabatan */}
                <div className="space-y-2">
                  <label className={labelBase}>
                    <Briefcase className="w-3.5 h-3.5 inline mr-1" />
                    Jabatan / Posisi
                  </label>
                  <div className="relative">
                    <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Contoh: Ketua Umum"
                      className={inputBase}
                      value={form.position || ""}
                      onChange={(e) =>
                        setForm({ ...form, position: e.target.value })
                      }
                    />
                  </div>
                </div>

                {/* Divisi */}
                <div className="space-y-2">
                  <label className={labelBase}>
                    <Building2 className="w-3.5 h-3.5 inline mr-1" />
                    Divisi / Bidang
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Contoh: Divisi Acara"
                      className={inputBase}
                      value={form.division || ""}
                      onChange={(e) =>
                        setForm({ ...form, division: e.target.value })
                      }
                    />
                  </div>
                </div>

                {/* Sort Order */}
                <div className="space-y-2">
                  <label className={labelBase}>
                    <Hash className="w-3.5 h-3.5 inline mr-1" />
                    Urutan Tampil
                  </label>
                  <div className="relative">
                    <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="number"
                      min="1"
                      placeholder="1 = Ketua, 2 = Wakil, dst"
                      className={inputBase}
                      value={form.sort_order || ""}
                      onChange={(e) =>
                        setForm({ ...form, sort_order: e.target.value })
                      }
                    />
                  </div>
                  <p className="text-[10px] text-slate-400 ml-1">
                    Nilai kecil = tampil lebih atas
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <label className={labelBase}>
                  <FileText className="w-3.5 h-3.5 inline mr-1" />
                  Sekolah
                </label>
                <div className="relative">
                  <FileText className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
                  <input
                    placeholder="Contoh: Siswa kelas XII IPA 2, aktif di organisasi sejak 2023..."
                    className={`${inputBase}`}
                    value={form.description || ""}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Foto Section */}
              <div className="space-y-3">
                <label className={labelBase}>
                  <ImageIcon className="w-3.5 h-3.5 inline mr-1" />
                  Foto Profil
                </label>

                {/* Preview Foto Lama */}
                {form.photo_url && !file && (
                  <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200">
                    <div className="relative">
                      <img
                        src={`https://hmcf55cz-5000.asse.devtunnels.ms${form.photo_url}`}
                        alt="Foto saat ini"
                        className="w-20 h-20 object-cover rounded-xl shadow-md"
                      />
                      <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-emerald-500 text-white text-[10px] font-bold rounded-full">
                        Aktif
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-700">
                        Foto profil saat ini
                      </p>
                      <p className="text-xs text-slate-500">
                        Klik area upload di bawah untuk mengganti foto
                      </p>
                    </div>
                  </div>
                )}

                {/* Preview Foto Baru (jika ada) */}
                {file && (
                  <div className="flex items-center gap-4 p-4 bg-emerald-50 rounded-2xl border border-emerald-200">
                    <div className="relative">
                      <img
                        src={URL.createObjectURL(file)}
                        alt="Preview baru"
                        className="w-20 h-20 object-cover rounded-xl shadow-md"
                      />
                      <button
                        type="button"
                        onClick={() => setFile(null)}
                        className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
                        title="Hapus pilihan"
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-emerald-700 truncate">
                        {file.name}
                      </p>
                      <p className="text-xs text-emerald-600">
                        {(file.size / 1024 / 1024).toFixed(2)} MB • Akan
                        menggantikan foto lama
                      </p>
                    </div>
                  </div>
                )}

                {/* Upload Zone */}
                <div className="relative">
                  <div
                    className={`
                      border-2 border-dashed rounded-2xl p-6 text-center transition-all duration-200 cursor-pointer
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
                        }
                      }}
                    />
                    <div className="flex flex-col items-center gap-2 pointer-events-none">
                      <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
                        <ImageIcon className="w-6 h-6 text-slate-400" />
                      </div>
                      <p className="text-sm font-medium text-slate-600">
                        {file ? "Ganti foto?" : "Klik atau drag foto ke sini"}
                      </p>
                      <p className="text-xs text-slate-400">
                        PNG, JPG maksimal 5MB • Opsional
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
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Memproses...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Simpan Perubahan
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Helper Info */}
          <div className="mt-6 text-center">
            <p className="text-xs text-slate-400">
              💡 Tip: Biarkan foto kosong jika tidak ingin mengubah foto profil
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}

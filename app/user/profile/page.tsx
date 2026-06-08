/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SideBar from "../../sidebar/page";
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  //   Instagram,
  //   Linkedin,
  Save,
  Upload,
  Camera,
  CheckCircle,
} from "lucide-react";
import toast from "react-hot-toast";

export default function UserProfile() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profileData, setProfileData] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    birthDate: "",
    gender: "",
    address: "",
    bio: "",
    // instagram: "",
    // linkedin: "",
  });

  useEffect(() => {
    const saved = localStorage.getItem("sidebar-state");
    if (saved !== null) {
      setSidebarOpen(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      const dummyProfile = {
        name: "Ahmad Rizki Pratama",
        email: "ahmad.rizki@student.smk.sch.id",
        phone: "081234567890",
        birthDate: "2006-05-15",
        gender: "Laki-laki",
        address: "Jl. Merdeka No. 123, Banjar",
        bio: "Ketua OSIS SMK Banjar Idaman. Passionate about leadership and technology.",
        // instagram: "@ahmadrizki",
        // linkedin: "ahmad-rizki-pratama",
        photo: "/avatars/user1.jpg",
        joinDate: "2024-01-15",
        status: "Aktif",
      };
      setProfileData(dummyProfile);
      setFormData({
        name: dummyProfile.name,
        email: dummyProfile.email,
        phone: dummyProfile.phone,
        birthDate: dummyProfile.birthDate,
        gender: dummyProfile.gender,
        address: dummyProfile.address,
        bio: dummyProfile.bio,
        // instagram: dummyProfile.instagram,
        // linkedin: dummyProfile.linkedin,
      });
      setLoading(false);
    }, 800);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast.success("Profil berhasil diperbarui!");
    }, 1500);
  };

  const handlePhotoUpload = () => {
    toast.success("Fitur upload foto akan segera tersedia!");
  };

  //   if (loading) {
  //     return (
  //       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 flex items-center justify-center">
  //         <div className="flex flex-col items-center gap-4">
  //           <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
  //           <p className="text-slate-600 font-semibold">Memuat profil...</p>
  //         </div>
  //       </div>
  //     );
  //   }

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
              <User className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Profil Saya
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight mb-2">
              Kelola Profil Anda
            </h1>
            <p className="text-slate-500 font-medium text-sm md:text-base">
              Perbarui informasi pribadi dan preferensi Anda
            </p>
          </motion.div>

          {/* Profile Photo Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/70 backdrop-blur-xl border border-slate-200/60 rounded-3xl p-8 shadow-xl shadow-slate-200/50 mb-6"
          >
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative group">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-4xl font-black shadow-xl">
                  {profileData?.name?.charAt(0) || "U"}
                </div>
                <button
                  onClick={handlePhotoUpload}
                  className="absolute bottom-0 right-0 w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
                >
                  <Camera className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-black text-slate-800 mb-1">
                  {profileData?.name}
                </h2>
                <p className="text-slate-600 mb-3">{profileData?.email}</p>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                  <span className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full text-xs font-bold border border-emerald-100">
                    <CheckCircle className="w-3.5 h-3.5" />
                    {profileData?.status}
                  </span>
                  <span className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-xs font-bold border border-blue-100">
                    <Calendar className="w-3.5 h-3.5" />
                    Bergabung:{" "}
                    {new Date(profileData?.joinDate || "").toLocaleDateString(
                      "id-ID",
                    )}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Profile Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/70 backdrop-blur-xl border border-slate-200/60 rounded-3xl p-6 md:p-8 shadow-xl shadow-slate-200/50"
          >
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <User className="w-5 h-5 text-blue-600" />
              Informasi Pribadi
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nama Lengkap */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Nama Lengkap
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-white border border-slate-200 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-sm"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 outline-none text-sm cursor-not-allowed opacity-60"
                  />
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Email tidak dapat diubah
                </p>
              </div>

              {/* No HP */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Nomor Telepon
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-white border border-slate-200 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-sm"
                  />
                </div>
              </div>

              {/* Tanggal Lahir */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Tanggal Lahir
                </label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="date"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleChange}
                    className="w-full bg-white border border-slate-200 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-sm"
                  />
                </div>
              </div>

              {/* Jenis Kelamin */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Jenis Kelamin
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full bg-white border border-slate-200 rounded-xl py-3 px-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-sm"
                >
                  <option value="">Pilih jenis kelamin</option>
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
              </div>

              {/* Alamat */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Alamat
                </label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-3 w-5 h-5 text-slate-400" />
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows={3}
                    className="w-full bg-white border border-slate-200 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-sm resize-none"
                  />
                </div>
              </div>

              {/* Bio */}
              {/* <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Bio Singkat
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Ceritakan sedikit tentang diri Anda..."
                  className="w-full bg-white border border-slate-200 rounded-xl py-3 px-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-sm resize-none"
                />
              </div> */}
            </div>

            {/* Social Media Section */}
            {/* <div className="mt-8 pt-8 border-t border-slate-200">
              <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Instagram className="w-5 h-5 text-pink-600" />
                Media Sosial
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Instagram
                  </label>
                  <div className="relative">
                    <Instagram className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-pink-500" />
                    <input
                      type="text"
                      name="instagram"
                      value={formData.instagram}
                      onChange={handleChange}
                      placeholder="@username"
                      className="w-full bg-white border border-slate-200 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    LinkedIn
                  </label>
                  <div className="relative">
                    <Linkedin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-600" />
                    <input
                      type="text"
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleChange}
                      placeholder="username"
                      className="w-full bg-white border border-slate-200 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-sm"
                    />
                  </div>
                </div>
              </div>
            </div> */}

            {/* Save Button */}
            <div className="mt-8 flex justify-end gap-3">
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 rounded-xl font-semibold text-sm text-slate-700 hover:bg-slate-100 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="group inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold text-sm shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    Simpan Perubahan
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}

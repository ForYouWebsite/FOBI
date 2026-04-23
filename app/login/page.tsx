"use client";
import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowRight, LogIn } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
export default function App() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const loadingToast = toast.loading("Sedang login...");

    try {
      const res = await axios.post(
        "https://hmcf55cz-5000.asse.devtunnels.ms/api/auth/login",
        {
          email: formData.email,
          password: formData.password,
        },
      );

      toast.dismiss(loadingToast);

      // ✅ simpan token
      const token = res.data.token;
      const user = res.data.user;

      if (formData.rememberMe) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("user", JSON.stringify(user));
      }

      toast.success(res.data.message || "Login berhasil!");

      // ✅ redirect berdasarkan role
      setTimeout(() => {
        if (user.role === "admin") {
          window.location.href = "/admin/dashboard";
        } else {
          window.location.href = "/user/dashboard";
        }
      }, 1200);
    } catch (error: any) {
      toast.dismiss(loadingToast);

      const message =
        error.response?.data?.message || "Email atau password salah";

      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-0 md:p-8 font-sans selection:bg-blue-100 overflow-x-hidden">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none hidden md:block">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="w-full max-w-5xl grid lg:grid-cols-2 bg-white md:rounded-[2.5rem] shadow-2xl shadow-blue-900/5 md:border border-slate-100 overflow-hidden relative z-10 min-h-screen md:min-h-0">
        {/* Left Side: Maskot FOBI (Desktop Only) */}
        <div className="hidden lg:flex flex-col justify-center items-center p-12 bg-gradient-to-br from-[#1e293b] to-[#3b68b3] text-white relative overflow-hidden">
          {/* Efek Cahaya */}
          <div className="absolute w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[100px] animate-pulse"></div>

          <div className="relative z-10 text-center space-y-8">
            <div className="space-y-2">
              <h2 className="text-4xl font-black tracking-tight leading-tight">
                Selamat Datang <br />
                <span className="text-yellow-400">Kembali!</span>
              </h2>
              <p className="text-blue-100/60 font-medium">
                Siap untuk melanjutkan pergerakan hari ini?
              </p>
            </div>

            {/* Area Maskot */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all duration-700"></div>
              <img
                src="24.png"
                alt="Maskot FOBI"
                className="w-72 h-72 object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)] transform group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="pt-8">
              <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/20 backdrop-blur-md">
                <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
                <span className="text-xs font-bold uppercase tracking-widest text-blue-100">
                  Portal Resmi FOBI
                </span>
              </div>
            </div>
          </div>

          <div className="absolute bottom-8 text-[10px] text-blue-200/30 uppercase tracking-[0.3em] font-bold">
            Forum OSIS Banjar Idaman
          </div>
        </div>

        {/* Right Side: Form Login (Responsive) */}
        <div className="p-6 md:p-12 lg:p-16 flex flex-col justify-center bg-white">
          {/* Header untuk Mobile */}
          <div className="lg:hidden flex flex-col items-center mb-8">
            <img
              src="24.png"
              alt="Logo"
              className="w-20 h-20 object-contain mb-4 drop-shadow-md"
            />
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">
              Login Portal
            </h1>
            <p className="text-slate-500 text-sm font-medium text-center px-4">
              Masuk untuk mengakses dasbor keanggotaan kamu
            </p>
          </div>

          <div className="hidden lg:block mb-10">
            <h1 className="text-3xl font-black text-slate-800 mb-2 tracking-tight">
              Masuk Akun
            </h1>
            <p className="text-slate-500 font-medium">
              Silakan masukkan email dan password terdaftar.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
            {/* Input Email */}
            <div className="space-y-1.5 md:space-y-2">
              <label className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
                Email Koordinator/Anggota
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="email@fobi.or.id"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 md:py-4 pl-12 pr-4 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/5 transition-all font-medium text-slate-700 text-sm md:text-base"
                  required
                />
              </div>
            </div>

            {/* Input Password */}
            <div className="space-y-1.5 md:space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest">
                  Password
                </label>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 md:py-4 pl-12 pr-12 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/5 transition-all font-medium text-slate-700 text-sm md:text-base"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-3 px-1">
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="w-5 h-5 rounded-lg border-slate-300 text-blue-600 focus:ring-blue-500 transition-all"
              />
              <label
                htmlFor="rememberMe"
                className="text-sm font-semibold text-slate-600 cursor-pointer select-none"
              >
                Ingat saya di perangkat ini
              </label>
            </div>

            <div className="pt-4 md:pt-6">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:shadow-xl hover:shadow-blue-200 transition-all active:scale-[0.98] group shadow-lg shadow-blue-500/20 text-sm md:text-base"
              >
                Masuk Sekarang
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
            </div>
          </form>

          <div className="mt-8 md:mt-10 text-center">
            <p className="text-slate-500 text-sm font-medium">
              Belum jadi bagian dari FOBI?{" "}
              <a
                href="/register"
                className="text-blue-600 font-black hover:underline underline-offset-4"
              >
                Daftar Akun Baru
              </a>
            </p>
          </div>

          {/* Footer Mobile Only */}
          <div className="mt-auto pt-8 text-center lg:hidden">
            <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">
              &copy; 2024 Forum OSIS Banjar Idaman
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

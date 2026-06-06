/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import axios from "axios";

import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ChevronLeft,
} from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";
export default function App() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Password dan konfirmasi tidak sama!");
      return;
    }

    const loadingToast = toast.loading("Sedang mendaftar...");

    try {
      const res = await axios.post(
        "https://hmcf55cz-5000.asse.devtunnels.ms/api/auth/register",
        {
          full_name: formData.name,
          email: formData.email,
          password: formData.password,
          role: "student",
        },
      );

      toast.dismiss(loadingToast);
      toast.success(res.data.message || "Registrasi berhasil!");

      setTimeout(() => {
        window.location.href = `/verify-otp?email=${formData.email}`;
      }, 1500);
    } catch (error: any) {
      toast.dismiss(loadingToast);

      const message =
        error.response?.data?.message || "Terjadi kesalahan saat register";

      toast.error(message);
    }
  };

  return (
    <div className="h-screen overflow-hidden bg-[#f8fafc] flex items-center justify-center p-0 md:p-8 font-sans selection:bg-blue-100 overflow-x-hidden">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none hidden md:block">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="w-full max-w-5xl grid lg:grid-cols-2 bg-white md:rounded-[2.5rem] shadow-2xl shadow-blue-900/5 md:border border-slate-100 overflow-hidden relative z-10 min-h-screen md:min-h-0">
        {/* Left Side: Maskot FOBI (Desktop Only) */}
        <div className="hidden lg:flex flex-col justify-center items-center p-12 bg-gradient-to-br from-[#3b68b3] to-[#1e293b] text-white relative overflow-hidden">
          {/* Efek Cahaya di belakang Maskot */}
          <div className="absolute w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[100px] animate-pulse"></div>

          <div className="relative z-10 text-center space-y-8">
            <div className="space-y-2">
              <h2 className="text-4xl font-black tracking-tight leading-tight">
                Halo Calon <br />
                <span className="text-yellow-400">Pemimpin Muda!</span>
              </h2>
              <p className="text-blue-100/60 font-medium">
                Ayo bergabung untuk perubahan nyata
              </p>
            </div>

            {/* Area Maskot */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all duration-700"></div>
              <img
                src="cikokecil.png"
                alt="Maskot FOBI"
                className="w-72 h-72 object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)] transform group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="pt-8">
              <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/20 backdrop-blur-md">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-ping"></span>
                <span className="text-xs font-bold uppercase tracking-widest">
                  Pendaftaran Dibuka
                </span>
              </div>
            </div>
          </div>

          <div className="absolute bottom-8 text-[10px] text-blue-200/30 uppercase tracking-[0.3em] font-bold">
            Forum OSIS Banjar Idaman
          </div>
        </div>

        {/* Right Side: Form (Responsive) */}
        <div className="p-6 md:p-12 lg:p-16 flex flex-col justify-center bg-white">
          {/* Header untuk Mobile (Tampilkan Logo/Maskot kecil) */}
          <div className="lg:hidden flex flex-col items-center mb-8">
            <img
              src="logo.png"
              alt="Logo"
              className="w-30 h-30 object-contain mb-4 drop-shadow-md"
            />
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">
              Daftar Akun FOBI
            </h1>
            <p className="text-slate-500 text-sm font-medium">
              Mulai kontribusimu untuk Banjar Idaman
            </p>
          </div>

          <div className="hidden lg:block mb-10">
            <h1 className="text-3xl font-black text-slate-800 mb-2 tracking-tight">
              Buat Akun Baru
            </h1>
            <p className="text-slate-500 font-medium">
              Lengkapi data diri kamu di bawah ini.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
            {/* Input Nama */}
            <div className="space-y-1.5 md:space-y-2">
              <label className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
                Nama Lengkap
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Nama lengkap kamu"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 md:py-4 pl-12 pr-4 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/5 transition-all font-medium text-slate-700 text-sm md:text-base"
                  required
                />
              </div>
            </div>

            {/* Input Email */}
            <div className="space-y-1.5 md:space-y-2">
              <label className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
                Alamat Email
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
                  placeholder="contoh@gmail.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 md:py-4 pl-12 pr-4 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/5 transition-all font-medium text-slate-700 text-sm md:text-base"
                  required
                />
              </div>
            </div>

            {/* Input Password & Confirm (Stack on Mobile, Grid on Desktop) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
              <div className="space-y-1.5 md:space-y-2">
                <label className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
                  Password
                </label>
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

              <div className="space-y-1.5 md:space-y-2">
                <label className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
                  Konfirmasi
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                    <Lock size={18} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 md:py-4 pl-12 pr-4 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/5 transition-all font-medium text-slate-700 text-sm md:text-base"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 md:pt-6">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:shadow-xl hover:shadow-blue-200 transition-all active:scale-[0.98] group shadow-lg shadow-blue-500/20 text-sm md:text-base"
              >
                Buat Akun Sekarang
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
            </div>
          </form>

          <div className="mt-8 md:mt-10 text-center">
            <p className="text-slate-500 text-sm font-medium">
              Sudah punya akun?{" "}
              <a
                href="/login"
                className="text-blue-600 font-black hover:underline underline-offset-4"
              >
                Masuk ke Portal
              </a>
            </p>
            {/* <Link
              href="/"
              className="text-red-600 font-black hover:underline underline-offset-4"
            >
              Kembali
            </Link> */}
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

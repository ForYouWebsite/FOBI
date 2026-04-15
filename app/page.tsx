"use client";

import React, { useState, useEffect } from "react";
import {
  Home,
  Info,
  Layers,
  BarChart3,
  Plus,
  Sparkles,
  Music2,
  ChevronRight,
  Target,
  ArrowRight,
  MapPin,
  Mail,
  Send,
  Bell,
  Calendar,
  ShoppingBag,
  X,
  Upload,
  MessageCircle,
  CheckCircle2,
  QrCode,
  Users,
  ChevronLeft,
} from "lucide-react";

// Mock Data Produk
const PRODUCTS = [
  {
    id: 1,
    name: "PDH (Pakaian Dinas Harian)",
    price: 155000,
    category: "Pakaian",
    img: "ciko1.png",
  },
  {
    id: 2,
    name: "Lanyard & Pin OSIS",
    price: 25000,
    category: "Atribut",
    img: "ciko1.png",
  },
  // {
  //   id: 3,
  //   name: "Lanyard & ID Card Holder",
  //   price: 25000,
  //   category: "Accessories",
  //   img: "https://images.unsplash.com/photo-1623227413711-25ee4388dae3?q=80&w=800&auto=format&fit=crop",
  // },
];
const socialLinks = [
  {
    name: "Instagram",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
        <path d="M320.3 205C256.8 204.8 205.2 256.2 205 319.7C204.8 383.2 256.2 434.8 319.7 435C383.2 435.2 434.8 383.8 435 320.3C435.2 256.8 383.8 205.2 320.3 205zM319.7 245.4C360.9 245.2 394.4 278.5 394.6 319.7C394.8 360.9 361.5 394.4 320.3 394.6C279.1 394.8 245.6 361.5 245.4 320.3C245.2 279.1 278.5 245.6 319.7 245.4zM413.1 200.3C413.1 185.5 425.1 173.5 439.9 173.5C454.7 173.5 466.7 185.5 466.7 200.3C466.7 215.1 454.7 227.1 439.9 227.1C425.1 227.1 413.1 215.1 413.1 200.3zM542.8 227.5C541.1 191.6 532.9 159.8 506.6 133.6C480.4 107.4 448.6 99.2 412.7 97.4C375.7 95.3 264.8 95.3 227.8 97.4C192 99.1 160.2 107.3 133.9 133.5C107.6 159.7 99.5 191.5 97.7 227.4C95.6 264.4 95.6 375.3 97.7 412.3C99.4 448.2 107.6 480 133.9 506.2C160.2 532.4 191.9 540.6 227.8 542.4C264.8 544.5 375.7 544.5 412.7 542.4C448.6 540.7 480.4 532.5 506.6 506.2C532.8 480 541 448.2 542.8 412.3C544.9 375.3 544.9 264.5 542.8 227.5zM495 452C487.2 471.6 472.1 486.7 452.4 494.6C422.9 506.3 352.9 503.6 320.3 503.6C287.7 503.6 217.6 506.2 188.2 494.6C168.6 486.8 153.5 471.7 145.6 452C133.9 422.5 136.6 352.5 136.6 319.9C136.6 287.3 134 217.2 145.6 187.8C153.4 168.2 168.5 153.1 188.2 145.2C217.7 133.5 287.7 136.2 320.3 136.2C352.9 136.2 423 133.6 452.4 145.2C472 153 487.1 168.1 495 187.8C506.7 217.3 504 287.3 504 319.9C504 352.5 506.7 422.6 495 452z" />
      </svg>
    ),
    href: "https://instagram.com/forumosis_kotabanjar",
    color: "hover:bg-pink-600",
  },
  {
    name: "TikTok",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
        <path d="M544.5 273.9C500.5 274 457.5 260.3 421.7 234.7L421.7 413.4C421.7 446.5 411.6 478.8 392.7 506C373.8 533.2 347.1 554 316.1 565.6C285.1 577.2 251.3 579.1 219.2 570.9C187.1 562.7 158.3 545 136.5 520.1C114.7 495.2 101.2 464.1 97.5 431.2C93.8 398.3 100.4 365.1 116.1 336C131.8 306.9 156.1 283.3 185.7 268.3C215.3 253.3 248.6 247.8 281.4 252.3L281.4 342.2C266.4 337.5 250.3 337.6 235.4 342.6C220.5 347.6 207.5 357.2 198.4 369.9C189.3 382.6 184.4 398 184.5 413.8C184.6 429.6 189.7 444.8 199 457.5C208.3 470.2 221.4 479.6 236.4 484.4C251.4 489.2 267.5 489.2 282.4 484.3C297.3 479.4 310.4 469.9 319.6 457.2C328.8 444.5 333.8 429.1 333.8 413.4L333.8 64L421.8 64C421.7 71.4 422.4 78.9 423.7 86.2C426.8 102.5 433.1 118.1 442.4 131.9C451.7 145.7 463.7 157.5 477.6 166.5C497.5 179.6 520.8 186.6 544.6 186.6L544.6 274z" />
      </svg>
    ),
    href: "https://tiktok.com/@fobi.banjar",
    color: "hover:bg-white",
  },
  {
    name: "YouTube",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
        <path d="M581.7 188.1C575.5 164.4 556.9 145.8 533.4 139.5C490.9 128 320.1 128 320.1 128C320.1 128 149.3 128 106.7 139.5C83.2 145.8 64.7 164.4 58.4 188.1C47 231 47 320.4 47 320.4C47 320.4 47 409.8 58.4 452.7C64.7 476.3 83.2 494.2 106.7 500.5C149.3 512 320.1 512 320.1 512C320.1 512 490.9 512 533.5 500.5C557 494.2 575.5 476.3 581.8 452.7C593.2 409.8 593.2 320.4 593.2 320.4C593.2 320.4 593.2 231 581.8 188.1zM264.2 401.6L264.2 239.2L406.9 320.4L264.2 401.6z" />
      </svg>
    ),
    href: "https://youtube.com/@fobimedia",
    color: "hover:bg-red-600",
  },
];
// Mock Data Pengurus/Struktur
const TEAM = [
  {
    name: "Farisha Mutiara Azzahra",
    role: "Ketua Umum",
    sekolah: "SMAN 3 Banjar",
    img: "SLP-6707986.jpg",
  },
  {
    name: "Soleh Saefulloh",
    role: "Ketua 1",
    sekolah: "SMKN 1 Banjar",
    img: "SLP-6708033.jpg",
  },
  {
    name: "Syalwa Cahya Maulida",
    role: "Ketua 1",
    sekolah: "SMAN 1 Banjar",
    img: "SLP-6707974.jpg",
  },
  {
    name: "Sri Mustika",
    role: "Sekretaris Umum",
    sekolah: "SMA 3 Banjar",
    img: "SLP-6707955.jpg",
  },
  {
    name: "Rayvando Riffiand",
    role: "Sekretaris 1",
    sekolah: "SMAN 1 Banjar",
    img: "SLP-6708002.jpg",
  },
  {
    name: "Clarisa",
    role: "Bendahara Umum",
    sekolah: "SMA 3 Banjar",
    img: "SLP-6708008.jpg",
  },
];

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [currentMember, setCurrentMember] = useState(0);
  const prevMember = () =>
    setCurrentMember((prev) => (prev - 1 + TEAM.length) % TEAM.length);
  const nextMember = () => setCurrentMember((prev) => (prev + 1) % TEAM.length);

  // State untuk Toko
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [orderStep, setOrderStep] = useState(1); // 1: Form, 2: Payment
  const [orderData, setOrderData] = useState({
    name: "",
    school: "",
    quantity: 1,
    proof: null as File | null,
  });

  // Handle scroll for Desktop Header & Reveal animations
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);

      const reveals = document.querySelectorAll(".reveal");
      reveals.forEach((el) => {
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < windowHeight - 100) {
          el.classList.add("opacity-100", "translate-y-0");
          el.classList.remove("opacity-0", "translate-y-[30px]");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openOrder = (product: any) => {
    setSelectedProduct(product);
    setOrderStep(1);
    setIsOrderModalOpen(true);
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderStep(2);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setOrderData({ ...orderData, proof: e.target.files[0] });
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen font-sans selection:bg-blue-100 selection:text-blue-600">
      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/6281234567890"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-24 right-6 lg:bottom-10 lg:right-10 z-[60] bg-green-500 text-white p-4 rounded-full shadow-2xl shadow-green-200 hover:scale-110 active:scale-90 transition-all group"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="absolute right-full mr-3 bg-white text-slate-800 text-xs font-bold py-2 px-4 rounded-xl shadow-xl border border-slate-100 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Ada kendala? Chat Admin
        </span>
      </a>

      {/* Desktop Navigation */}
      <header
        className={`fixed w-full z-50 px-4 md:px-10 py-4 hidden lg:block transition-all duration-700`}
      >
        <div
          className={`container mx-auto flex justify-between items-center transition-all duration-500 border border-white/40 backdrop-blur-[15px]
            ${
              scrolled
                ? "bg-white/95 shadow-xl rounded-[2rem] px-10 py-3 max-w-6xl mt-1"
                : "bg-white/70 rounded-b-[40px] px-12 py-5 shadow-lg shadow-blue-900/5"
            }`}
        >
          <div className="flex items-center gap-4">
            <img
              src="logo.png"
              alt="Logo FOBI"
              className="h-10 w-auto transition-transform duration-500"
              style={{ transform: scrolled ? "scale(0.95)" : "scale(1)" }}
            />
            <div>
              <span className="font-extrabold text-xl tracking-tighter text-slate-800 block leading-none">
                FOBI
              </span>
              <span className="text-[8px] text-blue-600 font-bold uppercase tracking-widest">
                Forum OSIS Banjar Idaman
              </span>
            </div>
          </div>
          <nav className="flex items-center gap-10 font-bold text-slate-600">
            {["home", "about", "shop", "proker", "stats"].map((item) => (
              <a
                key={item}
                href={`#${item}`}
                className="relative hover:text-blue-600 transition-colors group text-sm uppercase tracking-wide"
              >
                {item === "proker"
                  ? "Program"
                  : item === "stats"
                    ? "Statistik"
                    : item === "about"
                      ? "Tentang Kami"
                      : item === "shop"
                        ? "Katalog"
                        : "Beranda"}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
              </a>
            ))}
          </nav>
          <button
            className={`bg-gradient-to-r from-blue-600 to-indigo-700 hover:shadow-lg hover:shadow-blue-200 text-white rounded-full text-xs font-bold transition-all active:scale-95 ${scrolled ? "px-7 py-2.5" : "px-8 py-3"}`}
          >
            Daftar Pengurus
          </button>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="fixed top-0 left-0 w-full z-40 bg-white/80 backdrop-blur-lg px-6 py-4 lg:hidden border-b border-slate-100 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img src="logo.png" alt="Logo FOBI" className="h-8 w-auto" />
          <span className="font-black text-xl text-slate-800 tracking-tighter">
            FOBI
          </span>
        </div>
      </header>

      {/* Mobile Nav */}
      <nav className="fixed bottom-0 left-0 w-full z-50 px-4 pb-4 lg:hidden">
        <div className="bg-white/85 backdrop-blur-2xl border-t border-white/30 rounded-[24px] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] flex justify-around items-center py-4 px-2">
          <a
            href="#home"
            onClick={() => setActiveTab("home")}
            className={`flex flex-col items-center gap-1 transition-colors ${activeTab === "home" ? "text-blue-600" : "text-slate-400"}`}
          >
            <Home className="w-5 h-5" />
            <span className="text-[10px] font-bold">Beranda</span>
          </a>
          <a
            href="#about"
            onClick={() => setActiveTab("about")}
            className={`flex flex-col items-center gap-1 transition-colors ${activeTab === "about" ? "text-blue-600" : "text-slate-400"}`}
          >
            <Info className="w-5 h-5" />
            <span className="text-[10px] font-bold">Tentang</span>
          </a>

          <a
            href="#shop"
            onClick={() => setActiveTab("shop")}
            className={`flex flex-col items-center gap-1 transition-colors ${activeTab === "shop" ? "text-blue-600" : "text-slate-400"}`}
          >
            <ShoppingBag className="w-5 h-5" />
            <span className="text-[10px] font-bold">Katalog</span>
          </a>
          <a
            href="#stats"
            onClick={() => setActiveTab("stats")}
            className={`flex flex-col items-center gap-1 transition-colors ${activeTab === "stats" ? "text-blue-600" : "text-slate-400"}`}
          >
            <BarChart3 className="w-5 h-5" />
            <span className="text-[10px] font-bold">Statistik</span>
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex items-center pt-24 lg:pt-0 overflow-hidden bg-gradient-to-br from-[#3b68b3] to-[#1e293b]"
      >
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-400/20 rounded-full -mr-48 -mt-48 blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/10 rounded-full -ml-32 -mb-32 blur-[100px]"></div>
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="text-white space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="inline-flex items-center gap-3 bg-white/10 border border-white/20 px-5 py-2.5 rounded-2xl backdrop-blur-md">
              <span className="text-xs font-bold tracking-widest uppercase">
                Forum Osis Banjar Idaman
              </span>
            </div>
            <h1 className="text-5xl lg:text-5xl font-extrabold leading-[1.1] tracking-tight">
              Kami Pelajar,{" "}
              <span className="text-yellow-400 underline decoration-blue-400/30">
                Kami Bisa
              </span>
              <br />
              Untuk Maju Bersama
            </h1>
            <p className="text-lg text-blue-100/70 max-w-xl leading-relaxed">
              Ayo daftar menjadi pengurus Forum OSIS Banjar Idaman
            </p>
            <div className="flex flex-wrap gap-5 pt-4">
              <a
                href="#proker"
                className="bg-white text-blue-900 px-10 py-4 rounded-2xl font-bold hover:shadow-2xl hover:shadow-white/20 transition-all flex items-center gap-2 group"
              >
                Jelajahi Program{" "}
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
          <div className="hidden lg:flex justify-center items-center">
            <div className="relative">
              <div className="absolute -inset-20 bg-blue-500/20 rounded-full blur-[80px] animate-pulse"></div>
              <img
                src="logo.png"
                alt="Hero Logo"
                className="relative w-full max-w-md drop-shadow-[0_50px_50px_rgba(0,0,0,0.4)]"
              />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] rotate-180">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="relative block w-[calc(100%+1.3px)] h-[120px]"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V46.35C50.62,54.1,105.14,61.76,161.41,62.1,216.49,62.43,266.38,57.19,321.39,56.44Z"
              fill="#f8fafc"
            ></path>
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="py-12 -mt-16 relative z-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: "Sekolah", val: "54" },
              { label: "Kegiatan", val: "12" },
              { label: "Pengurus", val: "Banjar" },
              { label: "Anggota", val: "500+" },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-white/70 backdrop-blur-md border border-white/50 p-10 rounded-[2.5rem] text-center shadow-lg shadow-blue-900/5 transition-all hover:-translate-y-2"
              >
                <p className="text-slate-400 font-bold text-xs uppercase tracking-[0.2em] mb-2">
                  {stat.label}
                </p>
                <h3 className="text-4xl font-black text-blue-600 tracking-tighter">
                  {stat.val}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section & Organizational Structure Slider */}
      <section id="about" className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="lg:w-1/2 reveal opacity-0 translate-y-[30px] transition-all duration-1000">
              <div className="relative group max-w-sm mx-auto">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[3rem] opacity-20 blur-2xl group-hover:opacity-30 transition-all"></div>
                <img
                  src="cikokecil.png"
                  className="w-6/6 mx-auto rounded-[3rem] shadow-2xl relative z-10 grayscale hover:grayscale-0 transition-all duration-700 object-contain aspect-video lg:aspect-square"
                  alt="Kegiatan Pelajar"
                />
              </div>
            </div>
            <div className="lg:w-1/2 space-y-8 reveal opacity-0 translate-y-[30px] transition-all duration-1000 delay-200">
              <div className="w-20 h-1.5 bg-blue-600 rounded-full"></div>
              <h2 className="text-4xl lg:text-5xl font-black text-slate-800 leading-tight">
                Wadah Pemuda Banjar Berpikir dan Beraksi.
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                FOBI merupakan Wadah yang menghimpun pengurus OSIS dari berbagai
                sekolah di Kota Banjar di bawah naungan Forum OSIS Jawa Barat
                (FOJB). Forum ini hadir sebagai sarana untuk memperkuat
                kolaborasi antar sekolah serta mendorong pengembangan karakter
                pelajar.
              </p>

              {/* Compact Organizational Slider */}
              <div className="p-6 rounded-[2.5rem] bg-slate-50 border border-slate-100 relative group/slider">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                    <Users className="w-4 h-4" />
                  </div>
                  <h4 className="font-black text-slate-800 text-sm uppercase tracking-wider">
                    Struktur Organisasi
                  </h4>
                </div>

                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 border-2 border-white shadow-md">
                    <img
                      src={TEAM[currentMember].img}
                      className="w-full h-full object-cover"
                      alt="Member"
                    />
                  </div>
                  <div className="flex-1">
                    <h5 className="font-black text-slate-800 leading-none mb-1">
                      {TEAM[currentMember].name}
                    </h5>
                    <p className="text-xs font-bold text-blue-600 uppercase tracking-tighter">
                      {TEAM[currentMember].role}
                    </p>
                    <p className="text-xs font-bold text-black uppercase tracking-tighter">
                      {TEAM[currentMember].sekolah}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={prevMember}
                      className="w-8 h-8 rounded-full bg-blue-700 shadow-sm border border-slate-100 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={nextMember}
                      className="w-8 h-8 rounded-full bg-blue-700 shadow-sm border border-slate-100 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 p-5 rounded-3xl bg-blue-50 border border-blue-100">
                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shrink-0">
                  <Target className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-800 uppercase tracking-tight">
                    Fokus Masa Depan
                  </h4>
                  <p className="text-sm text-slate-500">
                    Menciptakan kurikulum kepemimpinan yang adaptif.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- NEW: Katalog Produk Section --- */}
      <section id="shop" className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 reveal opacity-0 translate-y-[30px] transition-all duration-1000">
            <div className="max-w-xl">
              <h4 className="text-blue-600 font-black uppercase tracking-widest text-xs mb-4">
                FOBI Official Store
              </h4>
              <h2 className="text-4xl font-black text-slate-800">
                Miliki Atribut Kebanggaan
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:block text-right">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Butuh Bantuan?
                </p>
                <a
                  href="https://wa.me/6281234567890"
                  className="text-sm font-black text-blue-600"
                >
                  Hubungi Admin
                </a>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                <ShoppingBag className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PRODUCTS.map((product, i) => (
              <div
                key={product.id}
                className="group reveal opacity-0 translate-y-[30px] transition-all duration-1000"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="bg-slate-50 rounded-[2.5rem] p-4 border border-slate-100 transition-all hover:bg-white hover:shadow-2xl hover:shadow-blue-900/5 group">
                  <div className="relative aspect-square overflow-hidden rounded-[2rem] mb-6">
                    <img
                      src={product.img}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-blue-600 shadow-sm">
                        {product.category}
                      </span>
                    </div>
                  </div>
                  <div className="px-2 pb-2">
                    <h3 className="text-xl font-black text-slate-800 mb-1 tracking-tight">
                      {product.name}
                    </h3>
                    <p className="text-blue-600 font-black text-lg mb-5">
                      {formatPrice(product.price)}
                    </p>
                    <button
                      onClick={() => openOrder(product)}
                      className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-blue-600 transition-all active:scale-95 group"
                    >
                      Pesan Sekarang
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proker Section */}
      <section id="proker" className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 reveal opacity-0 translate-y-[30px] transition-all duration-1000">
            <div className="max-w-xl">
              <h4 className="text-blue-600 font-black uppercase tracking-widest text-xs mb-4">
                Eksplorasi Program
              </h4>
              <h2 className="text-4xl font-black text-slate-800">
                Agenda Kerja Aktif Kami
              </h2>
            </div>
            <a
              href="#"
              className="text-blue-600 font-bold flex items-center gap-2 hover:translate-x-2 transition-transform group"
            >
              Semua Program <ArrowRight className="w-5 h-5" />
            </a>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                title: "GATHPOS",
                tag: "Learning Center",
                deskripsi:
                  "Inti Acara: Sebuah ajang pertemuan strategis yang dirancang khusus untuk seluruh pengurus OSIS aktif se-Kota Banjar.Fokus Utama: Memperkuat jaringan kerja sama (kolaborasi) dan mempererat hubungan personal antar organisasi siswa di berbagai tingkatan sekolah.  ",
                color: "bg-green-400",
                img: "DSC02375.JPG",
              },
              {
                title:
                  "FRAME (Festival of Remarkable Art and Media Expression)",
                tag: "Media Center",
                deskripsi:
                  "FRAME adalah festival media dan seni kreatif tahunan yang diselenggarakan untuk menampilkan dan mengapresiasi karya-karya terbaik yang dihasilkan oleh pelajar di seluruh Kota Banjar",
                color: "bg-blue-400",
                img: "DSC02740.JPG",
              },
              {
                title: "GAPURA",
                tag: "Sosial Center",
                deskripsi:
                  "Program pengabdian sosial yang dirancang seperti Kuliah Kerja Nyata (KKN) skala mini.",
                color: "bg-yellow-400",
                img: "DSC02313.JPG",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white/70 backdrop-blur-md border border-white/50 rounded-[3rem] p-4 group reveal opacity-0 translate-y-[30px] transition-all duration-1000"
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className="relative h-64 overflow-hidden rounded-[2.5rem] mb-6">
                  <img
                    src={item.img}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    alt={item.title}
                  />
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center bg-white/20 backdrop-blur-md p-3 rounded-2xl border border-white/30">
                    <span className="text-[10px] font-black text-white uppercase tracking-tighter">
                      {item.tag}
                    </span>
                    <span
                      className={`${item.color} w-2 h-2 rounded-full animate-pulse`}
                    ></span>
                  </div>
                </div>
                <div className="px-4 pb-4">
                  <h3 className="text-xl font-black text-slate-800 mb-3 uppercase tracking-tighter">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {item.deskripsi}
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-widest">
                    <Calendar className="w-4 h-4" /> Detail Kegiatan
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-[#0f172a] text-slate-400 pt-32 pb-24 lg:pb-12 border-t border-slate-800">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-16 mb-20">
            {/* Brand Section */}
            <div className="space-y-8">
              <img
                src="logo.png"
                className="h-16 w-auto filter brightness-200"
                alt="Logo Footer"
                // onError={(e) => {
                //   e.target.src =
                //     "https://via.placeholder.com/150x60?text=FOBI+LOGO";
                // }}
              />
              <div className="space-y-4">
                <h3 className="text-3xl font-black text-white leading-tight tracking-tighter">
                  FORUM OSIS
                  <br />
                  BANJAR IDAMAN
                </h3>
                <p className="leading-relaxed text-sm max-w-xs text-slate-400/80">
                  Organisasi wadah aspirasi dan kolaborasi pelajar resmi di
                  bawah naungan Dinas Pendidikan Kota Banjar.
                </p>
              </div>
            </div>

            {/* Quick Links Section */}
            <div className="grid grid-cols-2 gap-10">
              <div className="space-y-6">
                <h4 className="text-white font-bold uppercase tracking-[0.2em] text-[10px]">
                  Menu
                </h4>
                <ul className="space-y-4 text-sm font-medium">
                  {["Home", "About", "Shop", "Proker", "Stats"].map((link) => (
                    <li key={link}>
                      <a
                        href={`#${link.toLowerCase().replace(" ", "-")}`}
                        className="group flex items-center gap-2 hover:text-blue-400 transition-colors"
                      >
                        <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-blue-500 transition-colors" />
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-6">
                <h4 className="text-white font-bold uppercase tracking-[0.2em] text-[10px]">
                  Hubungi Kami
                </h4>
                <div className="space-y-5 text-sm font-medium">
                  <a href="#" className="flex items-start gap-3 group">
                    <MapPin className="w-5 h-5 text-blue-500 shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="group-hover:text-slate-200 transition-colors">
                      Sekretariat Kota Banjar, Jawa Barat
                    </span>
                  </a>
                  <a
                    href="mailto:admin@fobi.id"
                    className="flex items-center gap-3 group"
                  >
                    <Mail className="w-5 h-5 text-blue-500 shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="group-hover:text-slate-200 transition-colors">
                      admin@fobi.id
                    </span>
                  </a>
                </div>
              </div>
            </div>

            {/* Social Media Card */}
            <div className="bg-slate-800/40 p-10 rounded-[2.5rem] border border-slate-700/50 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-blue-600/20 transition-all"></div>

              <h4 className="text-white font-bold mb-4 flex items-center gap-2 relative z-10">
                Media Sosial Kami
              </h4>
              <p className="text-xs mb-8 leading-relaxed text-slate-400 relative z-10">
                Ikuti keseruan program kerja dan informasi terbaru seputar
                pelajar Kota Banjar melalui kanal resmi kami.
              </p>

              <div className="flex gap-4 relative z-10">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 flex items-center justify-center rounded-2xl bg-slate-900 border border-slate-700 text-white transition-all duration-300 transform hover:-translate-y-2 ${social.color}`}
                    title={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="text-center pt-10 border-t border-slate-800 text-[10px] font-bold uppercase tracking-[0.5em] text-slate-500">
            &copy; {new Date().getFullYear()} FOBI MEDIA CENTER - Banjar Idaman.
          </div>
        </div>
      </footer>

      {/* --- ORDER MODAL SYSTEM --- */}
      {isOrderModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-6 overflow-hidden">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-slate-900/80 backdrop-blur-md transition-opacity"
            onClick={() => setIsOrderModalOpen(false)}
          ></div>

          {/* Modal Content */}
          <div className="relative bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden flex flex-col max-h-full animate-in zoom-in-95 duration-300">
            {/* Header Modal */}
            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
                  {orderStep === 1 ? (
                    <ShoppingBag className="w-6 h-6" />
                  ) : (
                    <QrCode className="w-6 h-6" />
                  )}
                </div>
                <div>
                  <h3 className="font-black text-xl text-slate-800 tracking-tight leading-none mb-1">
                    {orderStep === 1
                      ? "Detail Pemesanan"
                      : "Selesaikan Pembayaran"}
                  </h3>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Langkah {orderStep} dari 2
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOrderModalOpen(false)}
                className="w-10 h-10 bg-white border border-slate-100 text-slate-400 rounded-full flex items-center justify-center hover:text-red-500 hover:border-red-100 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body Modal */}
            <div className="p-8 overflow-y-auto">
              {orderStep === 1 ? (
                <form onSubmit={handleNextStep} className="space-y-6">
                  {/* Info Produk */}
                  <div className="flex items-center gap-6 p-4 bg-blue-50/50 rounded-3xl border border-blue-100 mb-8">
                    <img
                      src={selectedProduct?.img}
                      className="w-20 h-20 object-cover rounded-2xl shadow-sm"
                      alt=""
                    />
                    <div>
                      <h4 className="font-black text-slate-800">
                        {selectedProduct?.name}
                      </h4>
                      <p className="text-blue-600 font-bold">
                        {formatPrice(selectedProduct?.price)}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
                        Nama Lengkap
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="Contoh: Muhammad Fulan"
                        className="w-full bg-slate-50 text-black border border-slate-200 rounded-2xl py-4 px-6 text-sm outline-none focus:border-blue-600 transition-all"
                        value={orderData.name}
                        onChange={(e) =>
                          setOrderData({ ...orderData, name: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
                        Asal Sekolah
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="Contoh: SMAN 1 Banjar"
                        className="w-full bg-slate-50 text-black border border-slate-200 rounded-2xl py-4 px-6 text-sm outline-none focus:border-blue-600 transition-all"
                        value={orderData.school}
                        onChange={(e) =>
                          setOrderData({ ...orderData, school: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
                      Jumlah Pesanan
                    </label>
                    <div className="flex items-center gap-4">
                      <input
                        required
                        type="number"
                        // min="1"
                        className="w-full bg-slate-50 text-black border border-slate-200 rounded-2xl py-4 px-6 text-sm outline-none focus:border-blue-600 transition-all"
                        value={orderData.quantity}
                        onChange={(e) =>
                          setOrderData({
                            ...orderData,
                            quantity: parseInt(e.target.value),
                          })
                        }
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-5 rounded-[1.5rem] font-black uppercase tracking-widest text-sm shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95"
                  >
                    Lanjut ke Pembayaran
                  </button>
                </form>
              ) : (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                  {/* QRIS Section */}
                  <div className="text-center">
                    <div className="bg-white p-6 inline-block rounded-[2.5rem] border border-slate-100 shadow-xl mb-6">
                      {/* Ganti dengan URL QRIS aslimu bang */}
                      <img
                        src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=FOBIBANJAR_PAYMENT"
                        alt="QRIS FOBI"
                        className="w-48 h-48 mx-auto grayscale"
                      />
                      <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-center gap-2">
                        <img
                          src="https://upload.wikimedia.org/wikipedia/commons/a/a2/Logo_QRIS.svg"
                          className="h-4"
                          alt="QRIS Logo"
                        />
                      </div>
                    </div>
                    <p className="text-sm text-slate-500 leading-relaxed max-w-sm mx-auto">
                      Silakan scan QRIS di atas melalui aplikasi m-Banking atau
                      E-Wallet (Gopay/OVO/Dana) untuk menyelesaikan pembayaran.
                    </p>
                  </div>

                  {/* Summary */}
                  <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-bold text-slate-400 uppercase">
                        Total Bayar
                      </span>
                      <span className="text-xl font-black text-blue-600">
                        {formatPrice(
                          (selectedProduct?.price || 0) * orderData.quantity,
                        )}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                      Atas Nama: {orderData.name} ({orderData.school})
                    </p>
                  </div>

                  {/* Upload Bukti */}
                  <div className="space-y-3">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
                      Upload Bukti Transfer
                    </label>
                    <label className="relative group cursor-pointer block">
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileUpload}
                      />
                      <div className="w-full border-2 border-dashed border-slate-200 rounded-[2rem] py-8 flex flex-col items-center justify-center gap-3 bg-slate-50/50 group-hover:bg-blue-50/50 group-hover:border-blue-300 transition-all">
                        {orderData.proof ? (
                          <div className="flex flex-col items-center text-green-600">
                            <CheckCircle2 className="w-10 h-10 mb-2" />
                            <span className="text-xs font-bold uppercase tracking-widest">
                              {orderData.proof.name}
                            </span>
                          </div>
                        ) : (
                          <>
                            <Upload className="w-8 h-8 text-slate-300 group-hover:text-blue-500 transition-colors" />
                            <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
                              Klik untuk Pilih Foto
                            </span>
                          </>
                        )}
                      </div>
                    </label>
                  </div>

                  {/* Submit Order */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                    <button
                      onClick={() => {
                        // Logic kirim ke Database/Email/WA bisa di sini
                        setIsOrderModalOpen(false);
                        alert(
                          "Pemesanan Berhasil! Admin akan memvalidasi pembayaran Anda.",
                        );
                      }}
                      disabled={!orderData.proof}
                      className="bg-blue-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95 disabled:opacity-50 disabled:grayscale"
                    >
                      Konfirmasi Pesanan
                    </button>
                    <a
                      href={`https://wa.me/6281234567890?text=Halo%20Admin%20FOBI,%20saya%20${orderData.name}%20ingin%20mengonfirmasi%20pesanan%20${selectedProduct?.name}`}
                      target="_blank"
                      className="bg-green-500 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-green-200 hover:bg-green-600 transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4" /> Hubungi Admin
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

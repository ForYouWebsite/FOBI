/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  Home,
  Info,
  Layers,
  BarChart3,
  ChevronRight,
  ChevronDown,
  LayoutDashboard,
  Settings,
  LogOut,
  Target,
  ArrowRight,
  ArrowLeft,
  MapPin,
  Mail,
  Bell,
  Calendar,
  ShoppingBag,
  X,
  Upload,
  MessageCircle,
  CheckCircle2,
  QrCode,
  Users,
  User,
  ChevronLeft,
  Inbox,
} from "lucide-react";

// ─── Reusable Loading / Empty Components ──────────────────────────────────────

type SpinnerSize = "sm" | "md" | "lg";

interface LoadingSpinnerProps {
  size?: SpinnerSize;
  overlay?: boolean;
  label?: string;
}

const spinnerSize = {
  sm: "w-5 h-5 border-2",
  md: "w-9 h-9 border-[3px]",
  lg: "w-14 h-14 border-4",
};

function LoadingSpinner({
  size = "md",
  overlay = false,
  label,
}: LoadingSpinnerProps) {
  const ring = spinnerSize[size];
  const core = (
    <div className="flex flex-col items-center justify-center gap-3">
      <span
        className={`${ring} border-blue-600 border-t-transparent rounded-full animate-spin block`}
        role="status"
        aria-label="Loading"
      />
      {label && (
        <p className="text-sm text-slate-400 font-medium animate-pulse">
          {label}
        </p>
      )}
    </div>
  );

  if (overlay) {
    return (
      <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/70 backdrop-blur-sm rounded-[inherit]">
        {core}
      </div>
    );
  }
  return (
    <div className="w-full flex items-center justify-center py-16">{core}</div>
  );
}

interface EmptyStateProps {
  title?: string;
  desc?: string;
  icon?: React.ReactNode;
}

function EmptyState({
  title = "Belum ada data",
  desc = "Data akan muncul di sini setelah tersedia.",
  icon,
}: EmptyStateProps) {
  return (
    <div className="w-full flex flex-col items-center justify-center py-16 text-center gap-4">
      <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 mb-2">
        {icon ?? <Inbox className="w-7 h-7" />}
      </div>
      <p className="font-bold text-slate-700 text-lg">{title}</p>
      <p className="text-slate-400 text-sm max-w-xs leading-relaxed">{desc}</p>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-slate-100 rounded-[2.5rem] p-4 animate-pulse min-w-full md:min-w-[400px]">
      <div className="h-64 bg-slate-200 rounded-[2rem] mb-6" />
      <div className="space-y-3 px-2">
        <div className="h-4 bg-slate-200 rounded-full w-3/4" />
        <div className="h-3 bg-slate-200 rounded-full w-1/2" />
        <div className="h-3 bg-slate-200 rounded-full w-2/3" />
      </div>
    </div>
  );
}

function SkeletonEventCard() {
  return (
    <div className="bg-slate-100 rounded-[3rem] overflow-hidden animate-pulse flex flex-col md:flex-row">
      <div className="md:w-2/5 h-64 bg-slate-200" />
      <div className="p-8 md:w-3/5 space-y-4">
        <div className="h-6 bg-slate-200 rounded-full w-3/4" />
        <div className="h-4 bg-slate-200 rounded-full w-1/2" />
        <div className="h-4 bg-slate-200 rounded-full w-2/3" />
        <div className="h-3 bg-slate-200 rounded-full w-full" />
        <div className="h-3 bg-slate-200 rounded-full w-5/6" />
        <div className="h-12 bg-slate-200 rounded-2xl w-40" />
      </div>
    </div>
  );
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const PRODUCTS = [
  {
    id: 1,
    name: "PDH (Pakaian Dinas Harian)",
    price: 150000,
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
];

const socialLinks = [
  {
    name: "Instagram",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 640 640"
        className="w-5 h-5 fill-current"
      >
        <path d="M320.3 205C256.8 204.8 205.2 256.2 205 319.7C204.8 383.2 256.2 434.8 319.7 435C383.2 435.2 434.8 383.8 435 320.3C435.2 256.8 383.8 205.2 320.3 205zM319.7 245.4C360.9 245.2 394.4 278.5 394.6 319.7C394.8 360.9 361.5 394.4 320.3 394.6C279.1 394.8 245.6 361.5 245.4 320.3C245.2 279.1 278.5 245.6 319.7 245.4zM413.1 200.3C413.1 185.5 425.1 173.5 439.9 173.5C454.7 173.5 466.7 185.5 466.7 200.3C466.7 215.1 454.7 227.1 439.9 227.1C425.1 227.1 413.1 215.1 413.1 200.3zM542.8 227.5C541.1 191.6 532.9 159.8 506.6 133.6C480.4 107.4 448.6 99.2 412.7 97.4C375.7 95.3 264.8 95.3 227.8 97.4C192 99.1 160.2 107.3 133.9 133.5C107.6 159.7 99.5 191.5 97.7 227.4C95.6 264.4 95.6 375.3 97.7 412.3C99.4 448.2 107.6 480 133.9 506.2C160.2 532.4 191.9 540.6 227.8 542.4C264.8 544.5 375.7 544.5 412.7 542.4C448.6 540.7 480.4 532.5 506.6 506.2C532.8 480 541 448.2 542.8 412.3C544.9 375.3 544.9 264.5 542.8 227.5zM495 452C487.2 471.6 472.1 486.7 452.4 494.6C422.9 506.3 352.9 503.6 320.3 503.6C287.7 503.6 217.6 506.2 188.2 494.6C168.6 486.8 153.5 471.7 145.6 452C133.9 422.5 136.6 352.5 136.6 319.9C136.6 287.3 134 217.2 145.6 187.8C153.4 168.2 168.5 153.1 188.2 145.2C217.7 133.5 287.7 136.2 320.3 136.2C352.9 136.2 423 133.6 452.4 145.2C472 153 487.1 168.1 495 187.8C506.7 217.3 504 287.3 504 319.9C504 352.5 506.7 422.6 495 452z" />
      </svg>
    ),
    href: "https://instagram.com/forumosisbanjar.id",
    hover: "hover:bg-pink-600 hover:border-pink-600",
  },
  {
    name: "TikTok",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 640 640"
        className="w-5 h-5 fill-current"
      >
        <path d="M544.5 273.9C500.5 274 457.5 260.3 421.7 234.7L421.7 413.4C421.7 446.5 411.6 478.8 392.7 506C373.8 533.2 347.1 554 316.1 565.6C285.1 577.2 251.3 579.1 219.2 570.9C187.1 562.7 158.3 545 136.5 520.1C114.7 495.2 101.2 464.1 97.5 431.2C93.8 398.3 100.4 365.1 116.1 336C131.8 306.9 156.1 283.3 185.7 268.3C215.3 253.3 248.6 247.8 281.4 252.3L281.4 342.2C266.4 337.5 250.3 337.6 235.4 342.6C220.5 347.6 207.5 357.2 198.4 369.9C189.3 382.6 184.4 398 184.5 413.8C184.6 429.6 189.7 444.8 199 457.5C208.3 470.2 221.4 479.6 236.4 484.4C251.4 489.2 267.5 489.2 282.4 484.3C297.3 479.4 310.4 469.9 319.6 457.2C328.8 444.5 333.8 429.1 333.8 413.4L333.8 64L421.8 64C421.7 71.4 422.4 78.9 423.7 86.2C426.8 102.5 433.1 118.1 442.4 131.9C451.7 145.7 463.7 157.5 477.6 166.5C497.5 179.6 520.8 186.6 544.6 186.6L544.6 274z" />
      </svg>
    ),
    href: "https://tiktok.com/@forumosisbanjaridaman.id",
    hover: "hover:bg-slate-600 hover:border-slate-600",
  },
  {
    name: "YouTube",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 640 640"
        className="w-5 h-5 fill-current"
      >
        <path d="M581.7 188.1C575.5 164.4 556.9 145.8 533.4 139.5C490.9 128 320.1 128 320.1 128C320.1 128 149.3 128 106.7 139.5C83.2 145.8 64.7 164.4 58.4 188.1C47 231 47 320.4 47 320.4C47 320.4 47 409.8 58.4 452.7C64.7 476.3 83.2 494.2 106.7 500.5C149.3 512 320.1 512 320.1 512C320.1 512 490.9 512 533.5 500.5C557 494.2 575.5 476.3 581.8 452.7C593.2 409.8 593.2 320.4 593.2 320.4C593.2 320.4 593.2 231 581.8 188.1zM264.2 401.6L264.2 239.2L406.9 320.4L264.2 401.6z" />
      </svg>
    ),
    href: "https://youtube.com/@forumosisbanjar",
    hover: "hover:bg-red-600 hover:border-red-600",
  },
];

const NAV_ITEMS = [
  { id: "home", label: "Home", icon: <Home className="w-4 h-4" /> },
  { id: "about", label: "Tentang", icon: <Info className="w-4 h-4" /> },
  { id: "shop", label: "Shop", icon: <ShoppingBag className="w-4 h-4" /> },
  { id: "event", label: "Event", icon: <Bell className="w-4 h-4" /> },
  { id: "proker", label: "Program", icon: <BarChart3 className="w-4 h-4" /> },
];

// ─── Main App ─────────────────────────────────────────────────────────────────

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0); // 0-1
  const [activeTab, setActiveTab] = useState("home");
  const [profileOpen, setProfileOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin"); // animate kiri-kanan

  // Data states
  const [prokerIndex, setProkerIndex] = useState(0);
  const [ongoingProkers, setOngoingProkers] = useState<any[]>([]);
  const [loadingOngoing, setLoadingOngoing] = useState(true);
  const [prokers, setProkers] = useState<any[]>([]);
  const [loadingProker, setLoadingProker] = useState(true);
  const [members, setMembers] = useState<any[]>([]);
  const [loadingMembers, setLoadingMembers] = useState(true);
  const memberSliderRef = useRef<HTMLDivElement | null>(null); // Tambah ref ini
  const prokerSliderRef = useRef<HTMLDivElement | null>(null);

  // Toko
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [orderStep, setOrderStep] = useState(1);
  const [orderData, setOrderData] = useState({
    name: "",
    school: "",
    quantity: 1,
    proof: null as File | null,
  });

  const FILE_URL = "https://hmcf55cz-5000.asse.devtunnels.ms";
  const BACKEND_URL = "https://hmcf55cz-5000.asse.devtunnels.ms";
  const API = axios.create({ baseURL: `${BACKEND_URL}/api` });

  type User = { full_name: string; role?: string };
  const [user, setUser] = useState<User | null>(null);

  // ─── Data Fetching ──────────────────────────────────────────────────────────

  const fetchProkers = async () => {
    try {
      setLoadingProker(true);
      const res = await API.get("/proker");
      const mapped = res.data.data.map((item: any) => ({
        id: item.id,
        title: item.title,
        deskripsi: item.description,
        tag: item.category || "Program",
        img: item.image_url
          ? `${BACKEND_URL}${item.image_url}`
          : "https://via.placeholder.com/800x600?text=Proker",
        color:
          item.status === "ongoing"
            ? "bg-green-400"
            : item.status === "completed"
              ? "bg-blue-400"
              : item.status === "cancelled"
                ? "bg-red-400"
                : "bg-yellow-400",
      }));
      setProkers(mapped);
    } catch (err) {
      console.error("Fetch proker error:", err);
    } finally {
      setLoadingProker(false);
    }
  };

  const fetchMembers = async () => {
    try {
      setLoadingMembers(true);
      const res = await API.get("/board?is_active=true");
      const data = res.data.members.sort(
        (a: any, b: any) => a.sort_order - b.sort_order,
      );
      setMembers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingMembers(false);
    }
  };

  const fetchOngoingProkers = async () => {
    try {
      setLoadingOngoing(true);
      const res = await API.get("/proker?status=ongoing");
      const mapped = res.data.data.map((item: any) => ({
        id: item.id,
        name: item.title,
        description: item.description,
        img: item.image_url
          ? `${BACKEND_URL}${item.image_url}`
          : "https://via.placeholder.com/800x600?text=Proker",
        price: item.category || "Program",
        date: item.start_date
          ? new Date(item.start_date).toLocaleDateString("id-ID")
          : "-",
        location: "HMC Event",
      }));
      setOngoingProkers(mapped);
    } catch (err) {
      console.error("Fetch ongoing error:", err);
    } finally {
      setLoadingOngoing(false);
    }
  };

  useEffect(() => {
    fetchProkers();
    fetchOngoingProkers();
    fetchMembers();
  }, []);

  // ─── Scroll Handler (performant: RAF + passive) ─────────────────────────────

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const y = window.scrollY;
          setScrolled(y > 80);

          const docH =
            document.documentElement.scrollHeight - window.innerHeight;
          setScrollProgress(docH > 0 ? Math.min(y / docH, 1) : 0);

          // Scroll spy
          const sections = ["home", "about", "org", "shop", "event", "proker"];
          let current = "home";
          for (const id of sections) {
            const el = document.getElementById(id);
            if (el) {
              const top = el.getBoundingClientRect().top + y - 200;
              if (y >= top) current = id;
            }
          }
          setActiveTab(current);

          // Reveal
          document.querySelectorAll(".reveal").forEach((el) => {
            if (el.getBoundingClientRect().top < window.innerHeight - 80) {
              el.classList.add("opacity-100", "translate-y-0");
              el.classList.remove("opacity-0", "translate-y-[30px]");
            }
          });

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ─── Auth ───────────────────────────────────────────────────────────────────

  useEffect(() => {
    const checkAuth = () => {
      const stored =
        localStorage.getItem("user") || sessionStorage.getItem("user");
      const parsed = stored ? JSON.parse(stored) : null;
      setUser((prev) =>
        JSON.stringify(prev) !== JSON.stringify(parsed) ? parsed : prev,
      );
    };
    checkAuth();
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") checkAuth();
    });
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  useEffect(() => {
    if (!profileOpen) return;
    const handler = (e: MouseEvent) => {
      if (!(e.target as Element).closest("[data-profile]"))
        setProfileOpen(false);
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [profileOpen]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    setUser(null);
    setProfileOpen(false);
    window.location.href = "/login";
  };

  // ─── Proker Slider ──────────────────────────────────────────────────────────

  const prevProker = () => {
    prokerSliderRef.current?.scrollBy({
      left: -prokerSliderRef.current.offsetWidth,
      behavior: "smooth",
    });
  };
  const nextProker = () => {
    prokerSliderRef.current?.scrollBy({
      left: prokerSliderRef.current.offsetWidth,
      behavior: "smooth",
    });
  };

  // Hapus fungsi nextMember dan prevMember yang lama, ganti dengan ini:
  const scrollMember = (direction: "prev" | "next") => {
    if (!memberSliderRef.current) return;
    // Scroll sebesar 85% lebar container untuk efek peek yang mulus
    const scrollAmount = memberSliderRef.current.offsetWidth * 0.85;
    memberSliderRef.current.scrollBy({
      left: direction === "next" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  // ─── Order ──────────────────────────────────────────────────────────────────

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
    if (e.target.files?.[0])
      setOrderData({ ...orderData, proof: e.target.files[0] });
  };
  const formatPrice = (price: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);

  // ─── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="bg-[#f8fafc] min-h-screen font-sans selection:bg-blue-100 selection:text-blue-600">
      {/* ── WhatsApp Float ── */}
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

      {/* ════════════════════════════════════════════════════════════
          DESKTOP NAVBAR — Redesigned
          ════════════════════════════════════════════════════════════ */}
      <header className="fixed w-full z-50 hidden lg:block">
        {/* Scroll progress bar */}
        <div
          className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-100 z-10"
          style={{ width: `${scrollProgress * 100}%` }}
        />

        <div
          className={`mx-auto transition-all duration-500 ease-out will-change-transform
          ${scrolled ? "mt-3 max-w-5xl px-2" : "mt-0 max-w-full px-0"}`}
        >
          <div
            className={`flex justify-between items-center transition-all duration-500 ease-out will-change-transform
              ${
                scrolled
                  ? "bg-white/95 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] rounded-2xl border border-white/60 px-8 py-3"
                  : "bg-white/80 backdrop-blur-lg border-b border-white/40 px-12 py-4 shadow-sm"
              }`}
          >
            {/* Logo */}
            <a href="#home" className="flex items-center gap-3 shrink-0">
              <div
                className={`transition-all duration-500 ${scrolled ? "w-8 h-8" : "w-10 h-10"}`}
              >
                <img
                  src="logo.png"
                  alt="FOBI"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="leading-none">
                <span
                  className={`font-black text-slate-800 block tracking-tighter transition-all duration-500 ${scrolled ? "text-lg" : "text-xl"}`}
                >
                  FOBI
                </span>
                <span className="text-[9px] text-blue-500 font-bold uppercase tracking-[0.15em]">
                  Forum OSIS Banjar
                </span>
              </div>
            </a>

            {/* Nav Links — pill indicator style */}
            <nav className="flex items-center gap-1 bg-slate-100/80 rounded-2xl px-1.5 py-1.5">
              {NAV_ITEMS.map((item) => {
                const isActive =
                  activeTab === item.id ||
                  (item.id === "proker" && activeTab === "proker") ||
                  (item.id === "about" &&
                    (activeTab === "about" || activeTab === "org"));
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={() => setActiveTab(item.id)}
                    className={`relative px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-200
                      ${
                        isActive
                          ? "bg-white text-blue-600 shadow-sm shadow-blue-100"
                          : "text-slate-500 hover:text-slate-800"
                      }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>

            {/* Auth — animated slide */}
            <div className="relative shrink-0" data-profile>
              {!user ? (
                <div className="flex items-center gap-2 bg-slate-100 rounded-2xl p-1.5">
                  {/* Sliding pill indicator */}
                  <div className="relative flex gap-1">
                    <button
                      onClick={() => {
                        setAuthMode("signin");
                        window.location.href = "/login";
                      }}
                      className={`cursor-pointer relative z-10 px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-300
                        ${
                          authMode === "signin"
                            ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                            : "text-slate-500 hover:text-slate-700"
                        }`}
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => {
                        setAuthMode("signup");
                        window.location.href = "/register";
                      }}
                      className={`cursor-pointer relative z-10 px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-300
                        ${
                          authMode === "signup"
                            ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                            : "text-slate-500 hover:text-slate-700"
                        }`}
                    >
                      Sign Up
                    </button>
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 transition-all border border-slate-200/60"
                  >
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xs">
                      {user?.full_name?.charAt(0)?.toUpperCase() ?? "U"}
                    </div>
                    <span className="text-sm font-semibold text-slate-700 hidden xl:block max-w-[120px] truncate">
                      {user?.full_name}
                    </span>
                    <ChevronDown
                      size={13}
                      className={`text-slate-400 transition-transform duration-200 ${profileOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {profileOpen && (
                    <div className="absolute right-0 mt-2.5 w-52 bg-white rounded-2xl shadow-xl shadow-slate-200/80 border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                      <div className="px-4 py-3 border-b border-slate-100 mb-1">
                        <p className="font-bold text-sm text-slate-800 truncate">
                          {user?.full_name}
                        </p>
                        <p className="text-xs text-slate-400 mt-0.5">
                          {user?.role || "Anggota"}
                        </p>
                      </div>
                      <a
                        href="/user/dashboard"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                      >
                        <LayoutDashboard size={15} /> Dashboard
                      </a>
                      <a
                        href="/dashboard?tab=settings"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                      >
                        <Settings size={15} /> Pengaturan
                      </a>
                      <div className="my-1.5 border-t border-slate-100" />
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <LogOut size={15} /> Keluar
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ════════════════════════════════════════════════════════════
          MOBILE HEADER
          ════════════════════════════════════════════════════════════ */}
      <header className="fixed top-0 left-0 w-full z-40 bg-white/90 backdrop-blur-xl px-5 py-3.5 lg:hidden border-b border-slate-100/80 flex justify-between items-center shadow-sm">
        <a href="#home" className="flex items-center gap-2">
          <img src="logo.png" alt="FOBI" className="h-7 w-auto" />
          <span className="font-black text-xl text-slate-800 tracking-tighter">
            FOBI
          </span>
        </a>

        <div className="flex items-center gap-2" data-profile>
          {!user ? (
            <div className="flex items-center gap-1 bg-slate-100 rounded-xl p-1">
              <button
                onClick={() => {
                  setAuthMode("signin");
                  window.location.href = "/login";
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${authMode === "signin" ? "bg-blue-600 text-white shadow-sm" : "text-slate-500"}`}
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  setAuthMode("signup");
                  window.location.href = "/register";
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${authMode === "signup" ? "bg-blue-600 text-white shadow-sm" : "text-slate-500"}`}
              >
                Sign Up
              </button>
            </div>
          ) : (
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xs"
            >
              {user?.full_name?.charAt(0)?.toUpperCase() ?? "U"}
            </button>
          )}

          {profileOpen && user && (
            <div className="absolute right-4 top-16 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50">
              <div className="px-4 py-3 border-b border-slate-100">
                <p className="font-bold text-sm text-slate-800 truncate">
                  {user?.full_name}
                </p>
                <p className="text-xs text-slate-400">{user?.role}</p>
              </div>
              <a
                href="/user/dashboard"
                onClick={() => setProfileOpen(false)}
                className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50"
              >
                <LayoutDashboard size={15} /> Dashboard
              </a>
              <a
                href="/dashboard?tab=settings"
                onClick={() => setProfileOpen(false)}
                className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50"
              >
                <Settings size={15} /> Pengaturan
              </a>
              <div className="my-1.5 border-t border-slate-100" />
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50"
              >
                <LogOut size={15} /> Keluar
              </button>
            </div>
          )}
        </div>
      </header>

      {/* ── Mobile Bottom Nav ── */}
      <nav className="fixed bottom-0 left-0 w-full z-50 px-4 pb-4 lg:hidden">
        <div className="bg-white/90 backdrop-blur-2xl border border-white/30 rounded-[22px] shadow-[0_-8px_32px_rgba(0,0,0,0.08)] flex justify-around items-center py-3 px-2">
          {NAV_ITEMS.slice(0, 5).map((item) => {
            const isActive =
              activeTab === item.id ||
              (item.id === "about" && activeTab === "org");
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center gap-1 transition-all duration-200 px-2 py-1 rounded-xl
                  ${isActive ? "text-blue-600" : "text-slate-400"}`}
              >
                {item.icon}
                <span
                  className={`text-[9px] font-bold tracking-wide ${isActive ? "text-blue-600" : "text-slate-400"}`}
                >
                  {item.label}
                </span>
              </a>
            );
          })}
        </div>
      </nav>

      {/* ════════════════════════════════════════════════════════════
          HERO
          ════════════════════════════════════════════════════════════ */}
      <section
        id="home"
        className="relative min-h-screen flex items-center pt-20 lg:pt-0 overflow-hidden bg-gradient-to-br from-[#1e40af] via-[#3b68b3] to-[#1e293b]"
      >
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-blue-400/15 rounded-full -mr-64 -mt-64 blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full -ml-40 -mb-40 blur-[100px]" />
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="text-white space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="inline-flex items-center gap-3 bg-white/10 border border-white/20 px-5 py-2.5 rounded-2xl backdrop-blur-md">
              <span className="w-2 h-2 bg-blue-300 rounded-full animate-pulse" />
              <span className="text-xs font-bold tracking-widest uppercase">
                Forum Osis Banjar Idaman
              </span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight">
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
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#proker"
                className="bg-white text-blue-900 px-10 py-4 rounded-2xl font-bold hover:shadow-2xl hover:shadow-white/20 transition-all flex items-center gap-2 group"
              >
                Jelajahi Program{" "}
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="/register"
                className="bg-blue-500/20 border border-white/20 text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-500/30 transition-all backdrop-blur-sm"
              >
                Daftar Sekarang
              </a>
            </div>
          </div>
          <div className="hidden lg:flex justify-center items-center">
            <div className="relative">
              <div className="absolute -inset-20 bg-blue-500/20 rounded-full blur-[80px] animate-pulse" />
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
            className="relative block w-[calc(100%+1.3px)] h-[80px]"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V46.35C50.62,54.1,105.14,61.76,161.41,62.1,216.49,62.43,266.38,57.19,321.39,56.44Z"
              fill="#f8fafc"
            />
          </svg>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 -mt-10 relative z-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { label: "Sekolah", val: "54" },
              { label: "Kegiatan", val: "12" },
              { label: "Kota", val: "Banjar" },
              { label: "Anggota", val: "500+" },
            ].map((s, i) => (
              <div
                key={i}
                className="bg-white/80 backdrop-blur-md border border-white/60 p-8 rounded-[2rem] text-center shadow-lg shadow-blue-900/5 transition-all hover:-translate-y-1"
              >
                <p className="text-slate-400 font-bold text-xs uppercase tracking-[0.2em] mb-2">
                  {s.label}
                </p>
                <h3 className="text-3xl font-black text-blue-600 tracking-tighter">
                  {s.val}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          ABOUT
          ════════════════════════════════════════════════════════════ */}
      <section id="about" className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="lg:w-1/2 reveal opacity-0 translate-y-[30px] transition-all duration-1000">
              <div className="relative group max-w-sm mx-auto">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[3rem] opacity-20 blur-2xl group-hover:opacity-30 transition-all" />
                <img
                  src="cikokecil.png"
                  className="w-full mx-auto rounded-[3rem] shadow-2xl relative z-10 grayscale hover:grayscale-0 transition-all duration-700 object-contain aspect-video lg:aspect-square"
                  alt="Kegiatan Pelajar"
                />
              </div>
            </div>
            <div className="lg:w-1/2 space-y-8 reveal opacity-0 translate-y-[30px] transition-all duration-1000 delay-200">
              <div className="w-20 h-1.5 bg-blue-600 rounded-full" />
              <h2 className="text-4xl lg:text-5xl font-black text-slate-800 leading-tight">
                Wadah Pemuda Banjar Berpikir dan Beraksi.
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                FOBI merupakan wadah yang menghimpun pengurus OSIS dari berbagai
                sekolah di Kota Banjar di bawah naungan Forum OSIS Jawa Barat
                (FOJB). Forum ini hadir sebagai sarana untuk memperkuat
                kolaborasi antar sekolah serta mendorong pengembangan karakter
                pelajar.
              </p>
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
              {/* <a
                href="#org"
                className="inline-flex items-center gap-2 text-blue-600 font-bold text-sm hover:gap-3 transition-all"
              >
                Lihat Struktur Organisasi <ArrowRight className="w-4 h-4" />
              </a> */}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          STRUKTUR ORGANISASI — SECTION TERSENDIRI
          ════════════════════════════════════════════════════════════ */}
      <section id="org" className="py-24 bg-slate-50 overflow-hidden">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16 reveal opacity-0 translate-y-[30px] transition-all duration-1000">
            <span className="inline-block bg-blue-100 text-blue-700 text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full mb-4">
              Kepengurusan Aktif
            </span>
            <h2 className="text-4xl lg:text-5xl font-black text-slate-800 mb-4">
              Struktur Organisasi
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Dikelola oleh pelajar terbaik dari berbagai sekolah di Kota
              Banjar.
            </p>
          </div>

          {/* Content */}
          {/* Content */}
          {loadingMembers ? (
            /* LOADING STATE: Horizontal Skeleton untuk mencegah Layout Shift (CLS) */
            <div className="flex gap-6 px-6 md:px-12 py-8 overflow-hidden">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="shrink-0 w-[80vw] sm:w-[350px] lg:w-[380px] bg-white rounded-[2.5rem] p-8 animate-pulse flex flex-col items-center gap-4 border border-slate-100"
                >
                  <div className="w-28 h-28 bg-slate-200 rounded-2xl" />
                  <div className="h-5 bg-slate-200 rounded-full w-2/3" />
                  <div className="h-4 bg-slate-200 rounded-full w-1/2" />
                  <div className="h-3 bg-slate-200 rounded-full w-1/3" />
                </div>
              ))}
            </div>
          ) : members.length === 0 ? (
            <EmptyState
              title="Belum ada data pengurus"
              desc="Struktur organisasi akan ditampilkan di sini."
              icon={<Users className="w-7 h-7" />}
            />
          ) : (
            /* MAIN SLIDER */
            <div className="relative group">
              {/* Desktop Navigation Arrows (Hidden di mobile karena user bisa swipe native) */}
              {/* Desktop Navigation Arrows (Hidden di mobile karena user bisa swipe native) */}
              <button
                onClick={() => scrollMember("prev")}
                className="hidden md:flex absolute left-0 lg:-left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white shadow-lg shadow-slate-200/50 items-center justify-center text-slate-600 hover:bg-blue-600 hover:text-white transition-all border border-slate-100"
                aria-label="Previous member"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() => scrollMember("next")}
                className="hidden md:flex absolute right-0 lg:-right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white shadow-lg shadow-slate-200/50 items-center justify-center text-slate-600 hover:bg-blue-600 hover:text-white transition-all border border-slate-100"
                aria-label="Next member"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Slider Track */}
              <div
                ref={memberSliderRef}
                className="flex overflow-x-auto snap-x snap-mandatory gap-6 px-6 md:px-12 py-8 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
              >
                {members.map((member, i) => {
                  const isKetua = i === 0;
                  return (
                    <div
                      key={member.id ?? i}
                      className="snap-center shrink-0 w-[50vw] sm:w-[250px] lg:w-[280px] reveal opacity-0 translate-y-[30px] transition-all duration-700"
                      style={{ transitionDelay: `${i * 50}ms` }}
                    >
                      {isKetua ? (
                        /* Featured Card untuk Ketua */
                        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2.5rem] p-8 text-white text-center shadow-2xl shadow-blue-200/50 relative overflow-hidden h-full flex flex-col items-center justify-center">
                          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full" />
                          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/5 rounded-full" />
                          <div className="relative z-10 w-full">
                            <div className="w-28 h-28 rounded-2xl overflow-hidden mx-auto mb-5 border-4 border-white/30 shadow-xl">
                              <img
                                src={
                                  member.photo_url
                                    ? `${FILE_URL}${member.photo_url}`
                                    : "/no-image.png"
                                }
                                className="w-full h-full object-cover"
                                alt={member.full_name}
                              />
                            </div>
                            <h3 className="font-black text-2xl mb-2 leading-tight">
                              {member.full_name}
                            </h3>
                            <span className="inline-block bg-white/20 backdrop-blur-sm px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-2">
                              {member.position}
                            </span>
                            {member.division && (
                              <p className="text-blue-100 text-sm mt-2 font-medium">
                                {member.division}
                              </p>
                            )}
                          </div>
                        </div>
                      ) : (
                        /* Regular Card untuk Anggota Lain (Layout Vertikal agar lebih elegan di slider) */
                        <div className="bg-white rounded-[2.5rem] p-8 border border-slate-300 flex flex-col items-center text-center hover:shadow-xl hover:shadow-blue-900/5 transition-all hover:-translate-y-1 h-full">
                          <div className="w-24 h-24 rounded-2xl overflow-hidden mb-4 border-4 border-slate-50 shadow-md">
                            <img
                              src={
                                member.photo_url
                                  ? `${FILE_URL}${member.photo_url}`
                                  : "/no-image.png"
                              }
                              className="w-full h-full object-cover"
                              alt={member.full_name}
                            />
                          </div>
                          <h5 className="font-black text-slate-800 text-lg leading-tight mb-1">
                            {member.full_name}
                          </h5>
                          <p className="text-sm font-bold text-blue-600 uppercase tracking-tight">
                            {member.position}
                          </p>
                          {member.division && (
                            <p className="text-xs text-slate-400 mt-1 font-medium">
                              {member.division}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          SHOP
          ════════════════════════════════════════════════════════════ */}
      <section id="shop" className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 reveal opacity-0 translate-y-[30px] transition-all duration-1000">
            <div>
              <h4 className="text-blue-600 font-black uppercase tracking-widest text-xs mb-4">
                FOBI Official Store
              </h4>
              <h2 className="text-4xl font-black text-slate-800">
                Miliki Atribut Kebanggaan
              </h2>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
              <ShoppingBag className="w-6 h-6" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PRODUCTS.map((product, i) => (
              <div
                key={product.id}
                className="group reveal opacity-0 translate-y-[30px] transition-all duration-1000"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="bg-slate-50 rounded-[2.5rem] p-4 border border-slate-100 transition-all hover:bg-white hover:shadow-2xl hover:shadow-blue-900/5">
                  <div className="relative aspect-square overflow-hidden rounded-[2rem] mb-6">
                    <img
                      src={product.img}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-blue-600">
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
                      Pesan Sekarang{" "}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          EVENT — Kegiatan Sedang Dilaksanakan
          ════════════════════════════════════════════════════════════ */}
      <section id="event" className="py-24 bg-white border-y border-slate-100">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16 reveal opacity-0 translate-y-[30px] transition-all">
            <div>
              <h4 className="text-orange-500 font-black uppercase tracking-widest text-xs mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-orange-500 rounded-full animate-ping" />
                LIVE SEKARANG
              </h4>
              <h2 className="text-4xl font-black text-slate-800">
                Kegiatan yang sedang dilaksanakan
              </h2>
              <p className="text-slate-500 mt-2">
                Jangan sampai ketinggalan, daftar sebelum kuota penuh!
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {loadingOngoing ? (
              <>
                <SkeletonEventCard />
                <SkeletonEventCard />
              </>
            ) : ongoingProkers.length === 0 ? (
              <div className="lg:col-span-2">
                <EmptyState
                  title="Tidak ada kegiatan aktif"
                  desc="Saat ini tidak ada kegiatan yang sedang berlangsung. Pantau terus untuk info terbaru!"
                  icon={<Calendar className="w-7 h-7" />}
                />
              </div>
            ) : (
              ongoingProkers.map((event, i) => (
                <div
                  key={event.id}
                  className="bg-slate-50 rounded-[3rem] overflow-hidden border border-slate-100 flex flex-col md:flex-row reveal opacity-0 translate-y-[30px] transition-all"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="md:w-2/5 relative h-64 md:h-auto">
                    <img
                      src={event.img}
                      className="w-full h-full object-cover"
                      alt={event.name}
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-orange-600">
                      {event.price}
                    </div>
                  </div>
                  <div className="p-8 md:w-3/5 space-y-4">
                    <h3 className="text-2xl font-black text-slate-800 leading-tight">
                      {event.name}
                    </h3>
                    <div className="flex flex-col gap-1 text-sm text-slate-500 font-medium">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} className="text-blue-600" />{" "}
                        {event.date}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={14} className="text-blue-600" />{" "}
                        {event.location}
                      </div>
                    </div>
                    <p className="text-slate-500 text-sm line-clamp-3">
                      {event.description}
                    </p>
                    <a
                      href="/login"
                      className="inline-flex items-center gap-3 bg-blue-600 text-white px-8 py-3.5 rounded-2xl font-bold text-sm hover:bg-blue-700 hover:shadow-lg transition-all active:scale-95"
                    >
                      Registration <ArrowRight size={18} />
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          PROKER — Agenda Kerja Aktif
          ════════════════════════════════════════════════════════════ */}
      <section id="proker" className="py-24 bg-slate-50 overflow-hidden">
        <div className="container mx-auto px-6 relative">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div>
              <h4 className="text-blue-600 font-black uppercase tracking-widest text-xs mb-4">
                Eksplorasi Program
              </h4>
              <h2 className="text-4xl font-black text-slate-800">
                Agenda Kerja Aktif Kami
              </h2>
            </div>
          </div>

          {loadingProker ? (
            <div className="flex gap-8 overflow-x-hidden pb-8">
              {[...Array(3)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : prokers.length === 0 ? (
            <EmptyState
              title="Belum ada program kerja"
              desc="Program kerja akan muncul di sini setelah ditambahkan oleh admin."
              icon={<Layers className="w-7 h-7" />}
            />
          ) : (
            <div className="relative group/slider">
              <button
                onClick={prevProker}
                className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white shadow-xl border border-slate-100 hidden md:flex items-center justify-center hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all transform hover:scale-110 active:scale-95 opacity-0 group-hover/slider:opacity-100 text-slate-700"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextProker}
                className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white shadow-xl border border-slate-100 hidden md:flex items-center justify-center hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all transform hover:scale-110 active:scale-95 opacity-0 group-hover/slider:opacity-100 text-slate-700"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              <div
                ref={prokerSliderRef}
                className="flex gap-8 overflow-x-auto snap-x snap-mandatory pb-8 px-2"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {prokers.map((item, i) => (
                  <div
                    key={i}
                    className="min-w-full md:min-w-[400px] snap-center bg-white border border-slate-100 rounded-[3rem] p-4 group transition-all hover:shadow-2xl"
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
                        />
                      </div>
                    </div>
                    <div className="px-4 pb-4">
                      <h3 className="text-xl font-black text-slate-800 mb-3 uppercase tracking-tighter">
                        {item.title}
                      </h3>
                      <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">
                        {item.deskripsi}
                      </p>
                      <div className="mt-6 flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-widest cursor-pointer hover:gap-3 transition-all">
                        <Calendar className="w-4 h-4" /> Detail Kegiatan
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-center gap-4 mt-4 md:hidden">
                <button
                  onClick={prevProker}
                  className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shadow-md active:bg-blue-600 active:text-white transition-all"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextProker}
                  className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shadow-md active:bg-blue-600 active:text-white transition-all"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer
        id="footer"
        className="bg-[#0f172a] text-slate-400 pt-32 pb-24 lg:pb-12 border-t border-slate-800"
      >
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-16 mb-20">
            <div className="space-y-8">
              <img
                src="logo.png"
                className="h-14 w-auto filter brightness-200"
                alt="Logo Footer"
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
            <div className="grid grid-cols-2 gap-10">
              <div className="space-y-6">
                <h4 className="text-white font-bold uppercase tracking-[0.2em] text-[10px]">
                  Menu
                </h4>
                <ul className="space-y-4 text-sm font-medium">
                  {["Home", "About", "Shop", "Event", "Program"].map((link) => (
                    <li key={link}>
                      <a
                        href={`#${link.toLowerCase() === "program" ? "proker" : link.toLowerCase()}`}
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
            <div className="bg-slate-800/40 p-10 rounded-[2.5rem] border border-slate-700/50 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-blue-600/20 transition-all" />
              <h4 className="text-white font-bold mb-4 relative z-10">
                Media Sosial Kami
              </h4>
              <p className="text-xs mb-8 leading-relaxed text-slate-400 relative z-10">
                Ikuti keseruan program kerja dan informasi terbaru seputar
                pelajar Kota Banjar.
              </p>
              <div className="flex gap-3 relative z-10">
                {socialLinks.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={s.name}
                    className={`w-12 h-12 flex items-center justify-center rounded-2xl bg-slate-900 border border-slate-700 text-white transition-all duration-300 transform hover:-translate-y-2 ${s.hover}`}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="text-center pt-10 border-t border-slate-800 text-[10px] font-bold uppercase tracking-[0.5em] text-slate-500">
            &copy; {new Date().getFullYear()} FOBI MEDIA CENTER — Banjar Idaman.
          </div>
        </div>
      </footer>

      {/* ── ORDER MODAL ── */}
      {isOrderModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-6">
          <div
            className="absolute inset-0 bg-slate-900/70 backdrop-blur-md"
            onClick={() => setIsOrderModalOpen(false)}
          />
          <div className="relative bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-300">
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
            <div className="p-8 overflow-y-auto">
              {orderStep === 1 ? (
                <form onSubmit={handleNextStep} className="space-y-6">
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
                    <input
                      required
                      type="number"
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
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-5 rounded-[1.5rem] font-black uppercase tracking-widest text-sm shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95"
                  >
                    Lanjut ke Pembayaran
                  </button>
                </form>
              ) : (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                  <div className="text-center">
                    <div className="bg-white p-6 inline-block rounded-[2.5rem] border border-slate-100 shadow-xl mb-6">
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
                      E-Wallet.
                    </p>
                  </div>
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                    <button
                      onClick={() => {
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

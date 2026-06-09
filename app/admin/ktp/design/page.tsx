/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SideBar from "../../../sidebar/page";
import Swal from "sweetalert2";
import {
  Upload,
  Type,
  Image as ImageIcon,
  Hash,
  Calendar,
  Award,
  QrCode,
  Save,
  Eye,
  RotateCcw,
  Trash2,
  Download,
  Palette,
  Move,
  ZoomIn,
  ZoomOut,
  CheckCircle,
} from "lucide-react";
import toast from "react-hot-toast";

type CardElement = {
  id: string;
  type: "photo" | "name" | "number" | "position" | "date" | "qr";
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  fontSize?: number;
  color?: string;
  visible: boolean;
};

type DesignTemplate = {
  id: string;
  name: string;
  backgroundImage: string | null;
  elements: CardElement[];
  cardWidth: number;
  cardHeight: number;
};

// Default size: 5cm x 8cm (≈ 189px x 302px at 96 DPI)
const DEFAULT_WIDTH = 189;
const DEFAULT_HEIGHT = 302;

export default function KTPDesign() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [template, setTemplate] = useState<DesignTemplate>({
    id: "template-1",
    name: "Kartu Pengurus FOBI 2024",
    backgroundImage: null,
    elements: [
      {
        id: "photo",
        type: "photo",
        label: "Foto Profil",
        x: 20,
        y: 30,
        width: 45,
        height: 55,
        visible: true,
      },
      {
        id: "name",
        type: "name",
        label: "Nama Lengkap",
        x: 75,
        y: 40,
        width: 100,
        height: 20,
        fontSize: 10,
        color: "#1e293b",
        visible: true,
      },
      {
        id: "position",
        type: "position",
        label: "Jabatan",
        x: 75,
        y: 62,
        width: 100,
        height: 15,
        fontSize: 8,
        color: "#3b82f6",
        visible: true,
      },
      {
        id: "number",
        type: "number",
        label: "Nomor KTP",
        x: 20,
        y: 110,
        width: 80,
        height: 12,
        fontSize: 7,
        color: "#64748b",
        visible: true,
      },
      {
        id: "date",
        type: "date",
        label: "Masa Berlaku",
        x: 20,
        y: 125,
        width: 80,
        height: 12,
        fontSize: 6,
        color: "#64748b",
        visible: true,
      },
      {
        id: "qr",
        type: "qr",
        label: "QR Code",
        x: 145,
        y: 110,
        width: 30,
        height: 30,
        visible: true,
      },
    ],
    cardWidth: DEFAULT_WIDTH,
    cardHeight: DEFAULT_HEIGHT,
  });

  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [zoom, setZoom] = useState(100);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("sidebar-state");
    if (saved !== null) {
      setSidebarOpen(JSON.parse(saved));
    }
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        Swal.fire({
          icon: "error",
          title: "File Terlalu Besar!",
          text: "Ukuran file maksimal 5MB",
          confirmButtonColor: "#2563eb",
          customClass: {
            popup: "rounded-2xl",
          },
        });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setTemplate({
          ...template,
          backgroundImage: reader.result as string,
        });
        toast.success("Background berhasil diupload!");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleElementUpdate = (id: string, updates: Partial<CardElement>) => {
    setTemplate({
      ...template,
      elements: template.elements.map((el) =>
        el.id === id ? { ...el, ...updates } : el,
      ),
    });
  };

  const toggleElementVisibility = (id: string) => {
    const element = template.elements.find((el) => el.id === id);
    if (element) {
      handleElementUpdate(id, { visible: !element.visible });
    }
  };

  const resetDesign = async () => {
    const result = await Swal.fire({
      title: "Reset Design?",
      html: `
        <div class="text-left space-y-2">
          <p class="text-sm text-slate-600">Semua perubahan akan dikembalikan ke default:</p>
          <ul class="text-xs text-slate-500 space-y-1 ml-4 list-disc">
            <li>Background dihapus</li>
            <li>Posisi elemen direset</li>
            <li>Ukuran kartu kembali ke 5cm × 8cm</li>
          </ul>
        </div>
      `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#94a3b8",
      confirmButtonText: "Ya, Reset",
      cancelButtonText: "Batal",
      reverseButtons: true,
      customClass: {
        popup: "rounded-2xl",
        title: "font-bold text-slate-800",
        htmlContainer: "text-slate-600",
      },
    });

    if (result.isConfirmed) {
      setTemplate({
        ...template,
        backgroundImage: null,
        cardWidth: DEFAULT_WIDTH,
        cardHeight: DEFAULT_HEIGHT,
        elements: [
          {
            id: "photo",
            type: "photo",
            label: "Foto Profil",
            x: 20,
            y: 30,
            width: 45,
            height: 55,
            visible: true,
          },
          {
            id: "name",
            type: "name",
            label: "Nama Lengkap",
            x: 75,
            y: 40,
            width: 100,
            height: 20,
            fontSize: 10,
            color: "#1e293b",
            visible: true,
          },
          {
            id: "position",
            type: "position",
            label: "Jabatan",
            x: 75,
            y: 62,
            width: 100,
            height: 15,
            fontSize: 8,
            color: "#3b82f6",
            visible: true,
          },
          {
            id: "number",
            type: "number",
            label: "Nomor KTP",
            x: 20,
            y: 110,
            width: 80,
            height: 12,
            fontSize: 7,
            color: "#64748b",
            visible: true,
          },
          {
            id: "date",
            type: "date",
            label: "Masa Berlaku",
            x: 20,
            y: 125,
            width: 80,
            height: 12,
            fontSize: 6,
            color: "#64748b",
            visible: true,
          },
          {
            id: "qr",
            type: "qr",
            label: "QR Code",
            x: 145,
            y: 110,
            width: 30,
            height: 30,
            visible: true,
          },
        ],
      });
      setSelectedElement(null);
      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Design berhasil direset ke default",
        timer: 2000,
        showConfirmButton: false,
        customClass: {
          popup: "rounded-2xl",
        },
      });
    }
  };

  const saveDesign = () => {
    Swal.fire({
      icon: "success",
      title: "Design Tersimpan!",
      text: "Template kartu berhasil disimpan ke database",
      confirmButtonColor: "#2563eb",
      customClass: {
        popup: "rounded-2xl",
      },
    });
  };

  const getIconForType = (type: string) => {
    switch (type) {
      case "photo":
        return <ImageIcon className="w-4 h-4" />;
      case "name":
        return <Type className="w-4 h-4" />;
      case "number":
        return <Hash className="w-4 h-4" />;
      case "position":
        return <Award className="w-4 h-4" />;
      case "date":
        return <Calendar className="w-4 h-4" />;
      case "qr":
        return <QrCode className="w-4 h-4" />;
      default:
        return <Type className="w-4 h-4" />;
    }
  };

  const getDummyValue = (type: string) => {
    switch (type) {
      case "photo":
        return null;
      case "name":
        return "Muhammad Gifar";
      case "number":
        return "KTP-2024-001";
      case "position":
        return "Ketua Umum";
      case "date":
        return "2024 - 2025";
      case "qr":
        return null;
      default:
        return "";
    }
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
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-md px-4 py-2 rounded-full border border-slate-200/60 shadow-sm">
                  <Palette className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                    Design Studio
                  </span>
                </div>
                <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">
                  Design Kartu Pengurus
                </h1>
                <p className="text-slate-500 font-medium text-sm md:text-base">
                  Upload template dan atur posisi elemen kartu (5cm × 8cm)
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={resetDesign}
                  className="group inline-flex items-center gap-2 bg-slate-100 text-slate-700 px-5 py-3 rounded-2xl font-semibold hover:bg-slate-200 transition-all duration-300 text-sm"
                >
                  <RotateCcw className="w-4 h-4 group-hover:rotate-180 transition-transform" />
                  Reset
                </button>
                <button
                  onClick={() => setShowPreview(true)}
                  className="group inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-5 py-3 rounded-2xl font-semibold hover:bg-slate-50 transition-all duration-300 text-sm"
                >
                  <Eye className="w-4 h-4" />
                  Preview
                </button>
                <button
                  onClick={saveDesign}
                  className="group inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-5 py-3 rounded-2xl font-semibold shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 active:scale-[0.98] text-sm"
                >
                  <Save className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  Simpan Design
                </button>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Canvas Preview (Kiri - 2 Kolom) */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-2"
            >
              <div className="bg-white/70 backdrop-blur-xl border border-slate-200/60 rounded-3xl shadow-xl shadow-slate-200/50 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">
                      Preview Kartu
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Ukuran: 5cm × 8cm (Standar ID Card)
                    </p>
                  </div>
                  <div className="flex items-center gap-2 bg-slate-100 rounded-xl p-1">
                    <button
                      onClick={() => setZoom(Math.max(50, zoom - 10))}
                      className="p-2 hover:bg-white rounded-lg transition-colors"
                    >
                      <ZoomOut className="w-4 h-4 text-slate-600" />
                    </button>
                    <span className="text-sm font-bold text-slate-700 px-2">
                      {zoom}%
                    </span>
                    <button
                      onClick={() => setZoom(Math.min(200, zoom + 10))}
                      className="p-2 hover:bg-white rounded-lg transition-colors"
                    >
                      <ZoomIn className="w-4 h-4 text-slate-600" />
                    </button>
                  </div>
                </div>

                {/* Canvas Area */}
                <div
                  className="relative bg-slate-100 rounded-2xl overflow-hidden flex items-center justify-center p-8"
                  style={{ minHeight: "500px" }}
                >
                  <div
                    className="relative bg-white shadow-2xl transition-all"
                    style={{
                      width: `${template.cardWidth}px`,
                      height: `${template.cardHeight}px`,
                      transform: `scale(${zoom / 100})`,
                      transformOrigin: "center",
                    }}
                  >
                    {/* Background Image */}
                    {template.backgroundImage ? (
                      <img
                        src={template.backgroundImage}
                        alt="Background"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center">
                        <div className="text-center text-white">
                          <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
                          <p className="text-xs font-semibold opacity-75">
                            Upload Background
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Card Elements */}
                    {template.elements.map((element) =>
                      element.visible ? (
                        <div
                          key={element.id}
                          onClick={() => setSelectedElement(element.id)}
                          className={`absolute cursor-move transition-all ${
                            selectedElement === element.id
                              ? "ring-2 ring-blue-500 ring-offset-1"
                              : "hover:ring-2 hover:ring-blue-300 hover:ring-offset-1"
                          }`}
                          style={{
                            left: `${element.x}px`,
                            top: `${element.y}px`,
                            width: `${element.width}px`,
                            height: `${element.height}px`,
                          }}
                        >
                          {element.type === "photo" ? (
                            <div className="w-full h-full bg-slate-200 rounded flex items-center justify-center border-2 border-dashed border-slate-400">
                              <ImageIcon className="w-4 h-4 text-slate-400" />
                            </div>
                          ) : element.type === "qr" ? (
                            <div className="w-full h-full bg-white rounded flex items-center justify-center border border-slate-300">
                              <QrCode className="w-5 h-5 text-slate-700" />
                            </div>
                          ) : (
                            <div
                              className="w-full h-full flex items-center justify-center text-center font-bold px-1 leading-tight"
                              style={{
                                fontSize: `${element.fontSize || 8}px`,
                                color: element.color || "#1e293b",
                              }}
                            >
                              {getDummyValue(element.type)}
                            </div>
                          )}
                        </div>
                      ) : null,
                    )}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Controls Panel (Kanan - 1 Kolom) */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              {/* Upload Background */}
              <div className="bg-white/70 backdrop-blur-xl border border-slate-200/60 rounded-3xl shadow-xl shadow-slate-200/50 p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <Upload className="w-5 h-5 text-blue-600" />
                  Upload Template
                </h3>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-300 rounded-2xl p-6 text-center hover:border-blue-500 hover:bg-blue-50/30 transition-all cursor-pointer group"
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-slate-100 rounded-2xl mb-3 group-hover:bg-blue-100 transition-colors">
                    <Upload className="w-6 h-6 text-slate-400 group-hover:text-blue-600 transition-colors" />
                  </div>
                  <p className="text-sm font-bold text-slate-700 mb-1">
                    Klik untuk upload
                  </p>
                  <p className="text-xs text-slate-500">JPG, PNG (Maks. 5MB)</p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>

              {/* Elements List */}
              <div className="bg-white/70 backdrop-blur-xl border border-slate-200/60 rounded-3xl shadow-xl shadow-slate-200/50 p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <Move className="w-5 h-5 text-blue-600" />
                  Elemen Kartu
                </h3>
                <div className="space-y-2">
                  {template.elements.map((element) => (
                    <div
                      key={element.id}
                      className={`p-3 rounded-xl border transition-all cursor-pointer ${
                        selectedElement === element.id
                          ? "border-blue-500 bg-blue-50"
                          : "border-slate-200 hover:border-blue-200"
                      }`}
                      onClick={() => setSelectedElement(element.id)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {getIconForType(element.type)}
                          <span className="text-sm font-semibold text-slate-700">
                            {element.label}
                          </span>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleElementVisibility(element.id);
                          }}
                          className={`p-1.5 rounded-lg transition-colors ${
                            element.visible
                              ? "bg-emerald-100 text-emerald-600"
                              : "bg-slate-100 text-slate-400"
                          }`}
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      {selectedElement === element.id && (
                        <div className="space-y-2 mt-3 pt-3 border-t border-slate-200">
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="text-xs font-semibold text-slate-600">
                                X
                              </label>
                              <input
                                type="number"
                                value={element.x}
                                onChange={(e) =>
                                  handleElementUpdate(element.id, {
                                    x: parseInt(e.target.value) || 0,
                                  })
                                }
                                className="w-full bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-xs outline-none focus:border-blue-500"
                              />
                            </div>
                            <div>
                              <label className="text-xs font-semibold text-slate-600">
                                Y
                              </label>
                              <input
                                type="number"
                                value={element.y}
                                onChange={(e) =>
                                  handleElementUpdate(element.id, {
                                    y: parseInt(e.target.value) || 0,
                                  })
                                }
                                className="w-full bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-xs outline-none focus:border-blue-500"
                              />
                            </div>
                            <div>
                              <label className="text-xs font-semibold text-slate-600">
                                Width
                              </label>
                              <input
                                type="number"
                                value={element.width}
                                onChange={(e) =>
                                  handleElementUpdate(element.id, {
                                    width: parseInt(e.target.value) || 0,
                                  })
                                }
                                className="w-full bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-xs outline-none focus:border-blue-500"
                              />
                            </div>
                            <div>
                              <label className="text-xs font-semibold text-slate-600">
                                Height
                              </label>
                              <input
                                type="number"
                                value={element.height}
                                onChange={(e) =>
                                  handleElementUpdate(element.id, {
                                    height: parseInt(e.target.value) || 0,
                                  })
                                }
                                className="w-full bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-xs outline-none focus:border-blue-500"
                              />
                            </div>
                          </div>
                          {(element.type === "name" ||
                            element.type === "position" ||
                            element.type === "number" ||
                            element.type === "date") && (
                            <>
                              <div>
                                <label className="text-xs font-semibold text-slate-600">
                                  Font Size
                                </label>
                                <input
                                  type="number"
                                  value={element.fontSize || 8}
                                  onChange={(e) =>
                                    handleElementUpdate(element.id, {
                                      fontSize: parseInt(e.target.value) || 8,
                                    })
                                  }
                                  className="w-full bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-xs outline-none focus:border-blue-500"
                                />
                              </div>
                              <div>
                                <label className="text-xs font-semibold text-slate-600">
                                  Color
                                </label>
                                <input
                                  type="color"
                                  value={element.color || "#1e293b"}
                                  onChange={(e) =>
                                    handleElementUpdate(element.id, {
                                      color: e.target.value,
                                    })
                                  }
                                  className="w-full h-8 bg-white border border-slate-200 rounded-lg cursor-pointer"
                                />
                              </div>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Size */}
              <div className="bg-white/70 backdrop-blur-xl border border-slate-200/60 rounded-3xl shadow-xl shadow-slate-200/50 p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <Palette className="w-5 h-5 text-blue-600" />
                  Ukuran Kartu
                </h3>
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 mb-4">
                  <p className="text-xs font-bold text-blue-700 mb-1">
                    📐 Standar ID Card
                  </p>
                  <p className="text-xs text-blue-600">
                    Lebar: 5cm × Tinggi: 8cm
                  </p>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-semibold text-slate-700 mb-2 block">
                      Lebar (px)
                    </label>
                    <input
                      type="number"
                      value={template.cardWidth}
                      onChange={(e) =>
                        setTemplate({
                          ...template,
                          cardWidth: parseInt(e.target.value) || DEFAULT_WIDTH,
                        })
                      }
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-blue-500 text-sm"
                    />
                    <p className="text-xs text-slate-400 mt-1">
                      Default: {DEFAULT_WIDTH}px ≈ 5cm
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-slate-700 mb-2 block">
                      Tinggi (px)
                    </label>
                    <input
                      type="number"
                      value={template.cardHeight}
                      onChange={(e) =>
                        setTemplate({
                          ...template,
                          cardHeight:
                            parseInt(e.target.value) || DEFAULT_HEIGHT,
                        })
                      }
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-blue-500 text-sm"
                    />
                    <p className="text-xs text-slate-400 mt-1">
                      Default: {DEFAULT_HEIGHT}px ≈ 8cm
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </main>
      </div>

      {/* Preview Modal */}
      <AnimatePresence>
        {showPreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowPreview(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between rounded-t-3xl">
                <div>
                  <h3 className="text-lg font-bold text-slate-800">
                    Preview Kartu
                  </h3>
                  <p className="text-xs text-slate-500">5cm × 8cm</p>
                </div>
                <button
                  onClick={() => setShowPreview(false)}
                  className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  <Trash2 className="w-5 h-5 text-slate-500" />
                </button>
              </div>

              <div className="p-8 flex items-center justify-center bg-slate-50">
                <div
                  className="relative shadow-2xl"
                  style={{
                    width: `${template.cardWidth}px`,
                    height: `${template.cardHeight}px`,
                  }}
                >
                  {template.backgroundImage ? (
                    <img
                      src={template.backgroundImage}
                      alt="Background"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-700"></div>
                  )}

                  {template.elements.map((element) =>
                    element.visible ? (
                      <div
                        key={element.id}
                        className="absolute"
                        style={{
                          left: `${element.x}px`,
                          top: `${element.y}px`,
                          width: `${element.width}px`,
                          height: `${element.height}px`,
                        }}
                      >
                        {element.type === "photo" ? (
                          <div className="w-full h-full bg-slate-200 rounded flex items-center justify-center">
                            <ImageIcon className="w-4 h-4 text-slate-400" />
                          </div>
                        ) : element.type === "qr" ? (
                          <div className="w-full h-full bg-white rounded flex items-center justify-center">
                            <QrCode className="w-5 h-5 text-slate-700" />
                          </div>
                        ) : (
                          <div
                            className="w-full h-full flex items-center justify-center text-center font-bold px-1 leading-tight"
                            style={{
                              fontSize: `${element.fontSize || 8}px`,
                              color: element.color || "#1e293b",
                            }}
                          >
                            {getDummyValue(element.type)}
                          </div>
                        )}
                      </div>
                    ) : null,
                  )}
                </div>
              </div>

              <div className="sticky bottom-0 bg-white border-t border-slate-200 px-6 py-4 flex items-center justify-end gap-3 rounded-b-3xl">
                <button
                  onClick={() => setShowPreview(false)}
                  className="px-5 py-2.5 rounded-xl font-semibold text-sm text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  Tutup
                </button>
                <button
                  onClick={() => {
                    Swal.fire({
                      icon: "success",
                      title: "Berhasil!",
                      text: "Kartu berhasil diunduh",
                      timer: 2000,
                      showConfirmButton: false,
                      customClass: { popup: "rounded-2xl" },
                    });
                  }}
                  className="group inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-5 py-2.5 rounded-xl font-semibold text-sm shadow-lg shadow-blue-500/25 hover:shadow-xl transition-all"
                >
                  <Download className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  Download
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

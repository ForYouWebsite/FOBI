"use client";

import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import SideBar from "@/app/sidebar/page";

const API = axios.create({
  baseURL: "https://hmcf55cz-5000.asse.devtunnels.ms/api",
});
const BACKEND_URL = "https://hmcf55cz-5000.asse.devtunnels.ms";

type FormType = {
  title: string;
  description: string;
  category: string;
  status: string;
  start_date: string;
  end_date: string;
  image_url?: string;
};

export default function EditProker() {
  const { id } = useParams();
  const router = useRouter();

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
  const [removeImage, setRemoveImage] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);

  // ✅ Fix: Client-side only
  useEffect(() => {
    setMounted(true);
  }, []);

  // ✅ Fetch data proker by ID
  const fetchDetail = async () => {
    try {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");

      const res = await API.get(`/proker/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = res.data.data;

      // Fix: Pastikan image_url menggunakan URL backend yang benar
      const imageUrl = data.image_url
        ? data.image_url.startsWith("http")
          ? data.image_url
          : `https://hmcf55cz-5000.asse.devtunnels.ms${data.image_url}`
        : "";

      setForm({
        title: data.title || "",
        description: data.description || "",
        category: data.category || "",
        status: data.status || "planned",
        start_date: data.start_date?.split("T")[0] || "",
        end_date: data.end_date?.split("T")[0] || "",
        image_url: data.image_url || "",
      });
      setPreviewUrl(imageUrl);
    } catch (err: any) {
      console.error("Fetch error:", err.response?.data || err.message);
      alert(
        "Gagal ambil data: " + (err.response?.data?.message || err.message),
      );
      router.push("/admin/proker");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id && mounted) fetchDetail();
  }, [id, mounted]);

  // ✅ Handle text inputs
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ Handle file upload dengan preview
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validasi
      if (!file.type.startsWith("image/")) {
        alert("Harap pilih file gambar!");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert("Ukuran file maksimal 5MB!");
        return;
      }

      setSelectedFile(file);
      setRemoveImage(false);

      // Preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // ✅ Handle remove image
  const handleRemoveImage = () => {
    setSelectedFile(null);
    setPreviewUrl("");
    setRemoveImage(true);
    setForm({ ...form, image_url: "" });
  };

  // ✅ Submit handler
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const authToken =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    if (!authToken) {
      alert("Token tidak ditemukan, silakan login ulang");
      router.push("/login");
      return;
    }

    try {
      setSubmitting(true);
      const cleanToken = authToken.trim();

      // Jika ada file baru atau remove image, gunakan FormData
      if (selectedFile || removeImage) {
        const formData = new FormData();
        formData.append("title", form.title);
        formData.append("description", form.description);
        formData.append("category", form.category);
        formData.append("status", form.status);
        formData.append("start_date", form.start_date);
        formData.append("end_date", form.end_date);

        if (selectedFile) {
          formData.append("image", selectedFile);
        }
        if (removeImage) {
          formData.append("remove_image", "true");
        }

        await API.put(`/proker/${id}`, formData, {
          headers: {
            Authorization: `Bearer ${cleanToken}`,
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        // Update biasa tanpa file
        await API.put(`/proker/${id}`, form, {
          headers: {
            Authorization: `Bearer ${cleanToken}`,
            "Content-Type": "application/json",
          },
        });
      }

      alert("Proker berhasil diupdate!");
      router.push("/admin/proker");
    } catch (err: any) {
      console.error("Update error:", err.response?.data || err.message);
      alert("Gagal update: " + (err.response?.data?.message || err.message));

      // Auto logout jika token invalid
      if (err.response?.status === 401 || err.response?.status === 403) {
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
        setTimeout(() => router.push("/login"), 2000);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex">
      <SideBar />

      <div className="p-6 w-full">
        <h1 className="text-xl font-bold mb-4">Edit Proker</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-lg">
          {/* Title */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Judul *</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Deskripsi</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
          </div>

          {/* Category */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Kategori</label>
            <input
              type="text"
              name="category"
              value={form.category}
              onChange={handleChange}
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Status */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="planned">Planned</option>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Tanggal Mulai</label>
              <input
                type="date"
                name="start_date"
                value={form.start_date || ""}
                onChange={handleChange}
                className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Tanggal Selesai</label>
              <input
                type="date"
                name="end_date"
                value={form.end_date || ""}
                onChange={handleChange}
                className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Image Upload Section */}
          <div className="flex flex-col gap-2 pt-2 border-t">
            <label className="text-sm font-medium">Gambar Proker</label>

            {/* Preview Image */}
            {previewUrl && !removeImage && (
              <div className="relative">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="max-w-full h-48 object-cover rounded border"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded hover:bg-red-600"
                >
                  ✕ Hapus
                </button>
              </div>
            )}

            {/* File Input */}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="border p-2 rounded file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            <p className="text-xs text-gray-500">
              Format: JPG, PNG, GIF (Max 5MB) • Kosongkan jika tidak ingin
              mengubah gambar
            </p>

            {removeImage && (
              <p className="text-sm text-orange-600">
                ⚠️ Gambar akan dihapus. Pilih file baru untuk upload gambar
                pengganti.
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            className="bg-green-500 text-white p-2 rounded hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed mt-2 transition"
          >
            {submitting ? "Menyimpan..." : "Update Proker"}
          </button>

          {/* Cancel Button */}
          <button
            type="button"
            onClick={() => router.push("/admin/proker")}
            className="bg-gray-300 text-gray-700 p-2 rounded hover:bg-gray-400 transition"
          >
            Batal
          </button>
        </form>
      </div>
    </div>
  );
}

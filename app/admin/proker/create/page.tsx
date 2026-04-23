"use client";

import { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

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

  // ✅ Fix: Akses localStorage hanya di client-side
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
      // Validasi file
      if (!file.type.startsWith("image/")) {
        alert("Harap pilih file gambar!");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert("Ukuran file maksimal 5MB!");
        return;
      }

      setSelectedFile(file);

      // Preview gambar
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
        setForm({
          ...form,
          image_url: reader.result as string, // Base64 string
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // ✅ Fix: Cek token saat submit
    const authToken =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    console.log(
      "TOKEN:",
      authToken ? `${authToken.substring(0, 20)}...` : "NULL",
    );

    if (!authToken) {
      alert("Token tidak ditemukan, silakan login ulang");
      router.push("/login");
      return;
    }

    try {
      setLoading(true);

      // ✅ Fix: Trim token untuk hapus spasi
      const cleanToken = authToken.trim();

      // Jika ada file, kirim sebagai FormData
      if (selectedFile) {
        const formData = new FormData();
        formData.append("title", form.title);
        formData.append("description", form.description);
        formData.append("category", form.category);
        formData.append("status", form.status);
        formData.append("start_date", form.start_date);
        formData.append("end_date", form.end_date);
        formData.append("image", selectedFile);

        const res = await API.post("/proker", formData, {
          headers: {
            Authorization: `Bearer ${cleanToken}`,
            "Content-Type": "multipart/form-data",
          },
        });

        console.log("Response:", res.data);
        alert("Proker berhasil ditambahkan");
        router.push("/admin/proker");
      } else {
        // Kirim sebagai JSON jika tidak ada file
        const res = await API.post("/proker", form, {
          headers: {
            Authorization: `Bearer ${cleanToken}`,
            "Content-Type": "application/json",
          },
        });

        console.log("Response:", res.data);
        alert("Proker berhasil ditambahkan");
        router.push("/admin/proker");
      }
    } catch (err: any) {
      console.error("ERROR RESPONSE:", err.response);
      console.error("ERROR DATA:", err.response?.data);

      const errorMessage = err.response?.data?.message || "Gagal tambah proker";
      alert(errorMessage);

      // ✅ Fix: Jika token invalid, redirect ke login
      if (err.response?.status === 401 || err.response?.status === 403) {
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
        setTimeout(() => router.push("/login"), 2000);
      }
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fix: Render null sampai client mounted
  if (!mounted) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex">
      <div className="p-6 w-full">
        <h1 className="text-xl font-bold mb-4">Tambah Proker</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-lg">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <textarea
            name="description"
            placeholder="Deskripsi"
            value={form.description}
            onChange={handleChange}
            className="border p-2 rounded"
            rows={3}
          />

          <input
            type="text"
            name="category"
            placeholder="Kategori"
            value={form.category}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="planned">Planned</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <input
            type="date"
            name="start_date"
            value={form.start_date}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            type="date"
            name="end_date"
            value={form.end_date}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          {/* File Upload Input */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Gambar Proker</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="border p-2 rounded file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            <p className="text-xs text-gray-500">
              Format: JPG, PNG, GIF (Max 5MB)
            </p>
          </div>

          {/* Preview Gambar */}
          {previewUrl && (
            <div className="mt-2">
              <p className="text-sm font-medium mb-2">Preview:</p>
              <img
                src={previewUrl}
                alt="Preview"
                className="max-w-full h-48 object-cover rounded border"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-400 mt-4"
          >
            {loading ? "Menyimpan..." : "Simpan"}
          </button>
        </form>
      </div>
    </div>
  );
}

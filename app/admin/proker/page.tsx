"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import SideBar from "../../sidebar/page";

import Link from "next/link";

const API = axios.create({
  baseURL: "https://hmcf55cz-5000.asse.devtunnels.ms/api",
});

// ✅ Type data proker
type Proker = {
  id: number;
  title: string;
  status: string;
};

export default function ProkerAdmin() {
  const [prokers, setProkers] = useState<Proker[]>([]);
  const [loading, setLoading] = useState(true);

  // ambil token
  const getToken = () => {
    const raw =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    return raw?.replace(/"/g, "").trim();
  };

  // ambil data
  const fetchProkers = async () => {
    try {
      setLoading(true);
      const res = await API.get("/proker");
      setProkers(res.data.data);
    } catch (err) {
      console.error("Error fetch proker:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProkers();
  }, []);

  // delete
  const handleDelete = async (id: number) => {
    if (!confirm("Yakin hapus?")) return;

    const token = getToken();
    if (!token) {
      alert("Session habis, login ulang");
      return;
    }

    try {
      await API.delete(`/proker/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchProkers();
    } catch (err: any) {
      console.error("Error delete:", err?.response?.data || err.message);
      alert("Gagal hapus");
    }
  };

  return (
    <div className="flex">
      <SideBar />

      <div className="p-6 w-full">
        <Link href="/admin/proker/create">
          <button className="bg-blue-500 text-white px-3 py-1 mb-3 rounded">
            + Tambah
          </button>
        </Link>

        <h1 className="text-2xl font-bold mb-4">Data Proker</h1>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2">No</th>
                <th className="p-2">Title</th>
                <th className="p-2">Status</th>
                <th className="p-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {prokers.map((item, index) => (
                <tr key={item.id} className="border-t">
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">{item.title}</td>
                  <td className="p-2">{item.status}</td>
                  <td className="p-2 flex gap-2">
                    <Link href={`/admin/proker/edit/${item.id}`}>
                      <button className="bg-yellow-400 px-2 py-1 rounded">
                        Edit
                      </button>
                    </Link>

                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

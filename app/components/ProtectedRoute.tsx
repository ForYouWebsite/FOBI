"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Loader2 } from "lucide-react";

type ProtectedRouteProps = {
  children: React.ReactNode;
  allowedRoles?: string[]; // ['admin'] atau ['admin', 'pengurus']
  fallback?: string; // halaman redirect jika tidak authorized
};

export default function ProtectedRoute({
  children,
  allowedRoles,
  fallback = "/login",
}: ProtectedRouteProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      // Cek token dari localStorage (sesuai sistem kamu)
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");

      if (!token) {
        // Simpan halaman yang ingin diakses untuk redirect setelah login
        localStorage.setItem("redirectAfterLogin", pathname);
        router.push("/login");
        return;
      }

      // Cek user & role
      const userStr =
        localStorage.getItem("user") || sessionStorage.getItem("user");

      if (!userStr) {
        router.push("/login");
        return;
      }

      try {
        const user = JSON.parse(userStr);

        // Jika ada allowedRoles, cek apakah role user termasuk
        if (allowedRoles && allowedRoles.length > 0) {
          if (!allowedRoles.includes(user.role)) {
            // Role tidak sesuai → redirect
            if (user.role === "admin") {
              router.push("/admin/dashboard");
            } else if (user.role === "pengurus") {
              router.push("/pengurus/dashboard");
            } else {
              router.push("/user/dashboard");
            }
            return;
          }
        }

        setIsAuthorized(true);
      } catch (error) {
        console.error("Error parsing user data:", error);
        router.push("/login");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router, pathname, allowedRoles]);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
          <p className="text-sm font-semibold text-slate-600">
            Memverifikasi akses...
          </p>
        </div>
      </div>
    );
  }

  // Jika tidak authorized, jangan render children
  if (!isAuthorized) {
    return null;
  }

  return <>{children}</>;
}

// components/LoadingSpinner.tsx
// Reusable loading spinner + empty state component
// Penggunaan:
//   <LoadingSpinner />                          → spinner penuh halaman
//   <LoadingSpinner size="sm" />               → spinner kecil inline
//   <LoadingSpinner overlay />                 → overlay di atas konten
//   <EmptyState title="..." desc="..." />      → saat data kosong

import React from "react";
import { Inbox } from "lucide-react";

type SpinnerSize = "sm" | "md" | "lg";

interface LoadingSpinnerProps {
  size?: SpinnerSize;
  /** Tampil sebagai overlay transparan di atas parent (parent harus relative) */
  overlay?: boolean;
  /** Teks opsional di bawah spinner */
  label?: string;
  /** Warna spinner — default blue-600 */
  color?: string;
}

const sizeMap: Record<SpinnerSize, { ring: string; label: string }> = {
  sm: { ring: "w-5 h-5 border-2", label: "text-xs" },
  md: { ring: "w-9 h-9 border-[3px]", label: "text-sm" },
  lg: { ring: "w-14 h-14 border-4", label: "text-base" },
};

export function LoadingSpinner({
  size = "md",
  overlay = false,
  label,
  color = "border-blue-600",
}: LoadingSpinnerProps) {
  const { ring, label: labelSize } = sizeMap[size];

  const spinner = (
    <div className="flex flex-col items-center justify-center gap-3">
      <span
        className={`${ring} ${color} border-t-transparent rounded-full animate-spin`}
        role="status"
        aria-label="Loading"
      />
      {label && (
        <p className={`${labelSize} text-slate-500 font-medium animate-pulse`}>
          {label}
        </p>
      )}
    </div>
  );

  if (overlay) {
    return (
      <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/70 backdrop-blur-sm rounded-inherit">
        {spinner}
      </div>
    );
  }

  return (
    <div className="w-full flex items-center justify-center py-16">
      {spinner}
    </div>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────

interface EmptyStateProps {
  /** Judul utama */
  title?: string;
  /** Deskripsi singkat */
  desc?: string;
  /** Icon opsional (default: Inbox dari lucide) */
  icon?: React.ReactNode;
  /** Tombol aksi opsional */
  action?: React.ReactNode;
  /** Ukuran padding container */
  size?: "sm" | "md" | "lg";
}

const paddingMap = { sm: "py-10", md: "py-16", lg: "py-24" };

export function EmptyState({
  title = "Belum ada data",
  desc = "Data akan muncul di sini setelah tersedia.",
  icon,
  action,
  size = "md",
}: EmptyStateProps) {
  return (
    <div
      className={`w-full flex flex-col items-center justify-center ${paddingMap[size]} text-center gap-4`}
    >
      <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 mb-2">
        {icon ?? <Inbox className="w-7 h-7" />}
      </div>
      <p className="font-bold text-slate-700 text-lg leading-tight">{title}</p>
      <p className="text-slate-400 text-sm max-w-xs leading-relaxed">{desc}</p>
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}

// ─── Skeleton Card (bonus) ────────────────────────────────────────────────────

/** Skeleton placeholder untuk card saat loading */
export function SkeletonCard({ className = "" }: { className?: string }) {
  return (
    <div
      className={`bg-slate-100 rounded-[2.5rem] p-4 animate-pulse ${className}`}
    >
      <div className="h-48 bg-slate-200 rounded-[2rem] mb-6" />
      <div className="space-y-3 px-2">
        <div className="h-4 bg-slate-200 rounded-full w-3/4" />
        <div className="h-3 bg-slate-200 rounded-full w-1/2" />
        <div className="h-3 bg-slate-200 rounded-full w-2/3" />
      </div>
    </div>
  );
}

/** Skeleton list item */
export function SkeletonListItem() {
  return (
    <div className="flex items-center gap-4 p-4 animate-pulse">
      <div className="w-16 h-16 bg-slate-200 rounded-2xl shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-slate-200 rounded-full w-2/3" />
        <div className="h-3 bg-slate-200 rounded-full w-1/3" />
      </div>
    </div>
  );
}

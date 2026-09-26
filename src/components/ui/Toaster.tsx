"use client";

import { useToast } from "@/lib/toast-context";

export default function Toaster() {
  const { toasts } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="toast toast-bottom toast-end z-50">
      {toasts.map((t) => (
        <div key={t.id} className="alert bg-base-200 text-base-content border border-base-300 shadow-lg">
          <span className="text-sm">{t.message}</span>
        </div>
      ))}
    </div>
  );
}

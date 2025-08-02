"use client";

import { Clock } from "lucide-react";

export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
      <div className="flex items-center gap-4 text-gray-700">
        <Clock className="animate-spin h-8 w-8" />
        <span className="text-xl font-semibold">Loading...</span>
      </div>
    </div>
  );
}

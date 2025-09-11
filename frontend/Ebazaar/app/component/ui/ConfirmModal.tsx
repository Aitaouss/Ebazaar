"use client";
import { useState } from "react";
import { FaExclamationTriangle, FaCheck, FaTimes } from "react-icons/fa";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  type?: "warning" | "danger" | "info";
  confirmText?: string;
  cancelText?: string;
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  type = "warning",
  confirmText = "Confirm",
  cancelText = "Cancel",
}: ConfirmModalProps) {
  if (!isOpen) return null;

  const getIconAndColors = () => {
    switch (type) {
      case "danger":
        return {
          icon: <FaExclamationTriangle className="text-red-500 text-2xl" />,
          confirmBg: "bg-red-600 hover:bg-red-700",
          titleColor: "text-red-700",
        };
      case "info":
        return {
          icon: <FaCheck className="text-blue-500 text-2xl" />,
          confirmBg: "bg-blue-600 hover:bg-blue-700",
          titleColor: "text-blue-700",
        };
      default:
        return {
          icon: <FaExclamationTriangle className="text-orange-500 text-2xl" />,
          confirmBg: "bg-[#015B46] hover:bg-[#013f3a]",
          titleColor: "text-[#015B46]",
        };
    }
  };

  const { icon, confirmBg, titleColor } = getIconAndColors();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md mx-4 animate-in zoom-in-95 duration-200 border">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          {icon}
          <h2 className={`text-xl font-bold ${titleColor}`}>{title}</h2>
        </div>

        {/* Message */}
        <p className="text-gray-600 mb-6 leading-relaxed">{message}</p>

        {/* Actions */}
        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="cursor-pointer px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            {cancelText}
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`cursor-pointer px-4 py-2 text-white rounded-lg transition-colors font-medium ${confirmBg}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

// Hook to use the confirm modal
export function useConfirm() {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState<
    Omit<ConfirmModalProps, "isOpen" | "onClose" | "onConfirm">
  >({
    title: "",
    message: "",
  });
  const [resolver, setResolver] = useState<((value: boolean) => void) | null>(
    null
  );

  const confirm = (
    options: Omit<ConfirmModalProps, "isOpen" | "onClose" | "onConfirm">
  ) => {
    return new Promise<boolean>((resolve) => {
      setConfig(options);
      setResolver(() => resolve);
      setIsOpen(true);
    });
  };

  const handleConfirm = () => {
    resolver?.(true);
    setIsOpen(false);
  };

  const handleClose = () => {
    resolver?.(false);
    setIsOpen(false);
  };

  const ConfirmModalComponent = () => (
    <ConfirmModal
      isOpen={isOpen}
      onClose={handleClose}
      onConfirm={handleConfirm}
      {...config}
    />
  );

  return { confirm, ConfirmModal: ConfirmModalComponent };
}

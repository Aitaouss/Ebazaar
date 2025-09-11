"use client";
import { useState } from "react";
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaInfoCircle,
  FaTimes,
} from "react-icons/fa";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message: string;
  type?: "success" | "error" | "warning" | "info";
}

export default function AlertModal({
  isOpen,
  onClose,
  title,
  message,
  type = "info",
}: AlertModalProps) {
  if (!isOpen) return null;

  const getIconAndColors = () => {
    switch (type) {
      case "success":
        return {
          icon: <FaCheckCircle className="text-green-500 text-2xl" />,
          titleColor: "text-green-700",
          borderColor: "border-green-200",
          bgColor: "bg-green-50",
        };
      case "error":
        return {
          icon: <FaExclamationCircle className="text-red-500 text-2xl" />,
          titleColor: "text-red-700",
          borderColor: "border-red-200",
          bgColor: "bg-red-50",
        };
      case "warning":
        return {
          icon: <FaExclamationCircle className="text-orange-500 text-2xl" />,
          titleColor: "text-orange-700",
          borderColor: "border-orange-200",
          bgColor: "bg-orange-50",
        };
      default:
        return {
          icon: <FaInfoCircle className="text-blue-500 text-2xl" />,
          titleColor: "text-blue-700",
          borderColor: "border-blue-200",
          bgColor: "bg-blue-50",
        };
    }
  };

  const { icon, titleColor, borderColor, bgColor } = getIconAndColors();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md mx-4 animate-in zoom-in-95 duration-200">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-100 transition-colors"
        >
          <FaTimes className="text-gray-400 text-sm" />
        </button>

        {/* Content */}
        <div className={`${bgColor} ${borderColor} border rounded-xl p-4`}>
          <div className="flex items-start gap-3">
            {icon}
            <div className="flex-1">
              {title && (
                <h3 className={`font-bold text-lg mb-1 ${titleColor}`}>
                  {title}
                </h3>
              )}
              <p className="text-gray-700 leading-relaxed">{message}</p>
            </div>
          </div>
        </div>

        {/* Action */}
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-[#015B46] text-white rounded-lg hover:bg-[#013f3a] transition-colors font-medium"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}

// Hook to use the alert modal
export function useAlert() {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState<
    Omit<AlertModalProps, "isOpen" | "onClose">
  >({
    message: "",
  });

  const alert = (options: Omit<AlertModalProps, "isOpen" | "onClose">) => {
    setConfig(options);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const AlertModalComponent = () => (
    <AlertModal isOpen={isOpen} onClose={handleClose} {...config} />
  );

  return { alert, AlertModal: AlertModalComponent };
}

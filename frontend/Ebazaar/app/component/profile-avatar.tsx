"use client";

import { useState } from "react";

interface ProfileAvatarProps {
  src?: string;
  alt?: string;
  username?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export default function ProfileAvatar({
  src,
  alt = "Profile",
  username = "User",
  size = "lg",
  className = "",
}: ProfileAvatarProps) {
  const [imageError, setImageError] = useState(false);

  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-12 h-12 text-sm",
    lg: "w-24 h-24 text-xl",
    xl: "w-32 h-32 text-2xl",
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const gradientColors = [
    "from-[#015B46] to-[#014b3c]",
    "from-[#C9A66B] to-[#b8956a]",
    "from-[#A44A3F] to-[#8f3f36]",
    "from-[#015B46] via-[#C9A66B] to-[#A44A3F]",
  ];

  // Generate consistent gradient based on username
  const gradientIndex = username.length % gradientColors.length;
  const gradient = gradientColors[gradientIndex];

  if (src && !imageError) {
    return (
      <div className={`${sizeClasses[size]} ${className} relative`}>
        <img
          src={src || "/placeholder.svg"}
          alt={alt}
          className="w-full h-full rounded-full object-cover border-4 border-[#015B46] shadow-lg"
          onError={() => setImageError(true)}
        />
        {/* Decorative border */}
        <div className="absolute inset-0 rounded-full border-2 border-[#C9A66B] opacity-30"></div>
      </div>
    );
  }

  return (
    <div className={`${sizeClasses[size]} ${className} relative`}>
      {/* Main avatar circle with gradient */}
      <div
        className={`w-full h-full rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-[#FDF9F4] font-bold shadow-lg border-4 border-[#015B46]`}
      >
        {getInitials(username)}
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 rounded-full border-2 border-[#C9A66B] opacity-30"></div>

      {/* Moroccan-inspired pattern overlay */}
      <div className="absolute inset-0 rounded-full opacity-20">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <pattern
              id="moroccan"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="10" cy="10" r="2" fill="#FDF9F4" opacity="0.3" />
              <path
                d="M10,5 L15,10 L10,15 L5,10 Z"
                fill="#FDF9F4"
                opacity="0.2"
              />
            </pattern>
          </defs>
          <circle cx="50" cy="50" r="45" fill="url(#moroccan)" />
        </svg>
      </div>
    </div>
  );
}

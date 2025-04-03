"use client"; // Đây là component client-side

import { usePathname } from "next/navigation";

export function ClientWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname(); // Lấy đường dẫn hiện tại
  const isHomePage = pathname === "/"; // Kiểm tra có phải trang chính không

  return (
    <body className={isHomePage ? "global-styles" : ""}>
      {children}
    </body>
  );
}

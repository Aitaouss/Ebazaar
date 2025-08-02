import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`h-screen w-full flex items-center justify-center flex-col`}
      >
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ThreadPlay - Fleet Battle Dinghy",
  description: "Autonomous fleet battle simulations and games",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
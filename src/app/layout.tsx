import "./globals.css";
import AppContainer from "@/components/AppContainer";
import { Inter } from "next/font/google";  

const inter = Inter({ subsets: ["latin"] }); 

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ backgroundColor: "#D1D1E6" }}>
        <AppContainer>{children}</AppContainer>
      </body>
    </html>
  );
}

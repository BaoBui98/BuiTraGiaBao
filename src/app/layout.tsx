import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/common/providers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HeaderComponent from "@/components/HeaderComponent";
import CustomLayout from "@/components/CustomLayout";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <CustomLayout>
            {children}
            <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </CustomLayout>
        </Providers>
      </body>
    </html>
  );
}

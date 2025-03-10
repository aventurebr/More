
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

interface LayoutProps {
  children: React.ReactNode;
  fullWidth?: boolean;
}

export const Layout = ({ children, fullWidth = false }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className={`flex-grow ${fullWidth ? '' : 'container mx-auto'}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

/** @format */
"use client";
// MainLayout.tsx

import React, { ReactNode } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Session } from "next-auth";

interface MainLayoutProps {
  children: ReactNode;
  session: Session | null;
}

// MainLayout.tsx

interface MainLayoutProps {
  children: ReactNode;
  session: Session | null;
}

function MainLayout({ children, session }: MainLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="bg-gray-200 min-h-screen">{children}</div>
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;

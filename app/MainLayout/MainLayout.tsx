/** @format */
"use client";
import React, { ReactNode } from "react";
import Header from "../Header/Header";
import styled from "styled-components";
import Footer from "../Footer/Footer";

interface MainLayoutProps {
  children: ReactNode;
}

function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen ">
      <Header />
      <main className="flex-grow">
        <div className="bg-gray-200 min-h-screen ">{children}</div>
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;

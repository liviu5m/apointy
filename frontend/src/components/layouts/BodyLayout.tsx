import React from "react";
import type { ReactNode } from "react";
import Header from "../elements/common/Header";
import Footer from "../elements/common/Footer";

type LayoutProps = {
  children: ReactNode;
};

const BodyLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex text-[#121212] bg-[#F9FAFB] min-h-screen">
      <div className="w-full min-w-0">
        <Header />
        <div className="h-[80px]"></div>
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default BodyLayout;

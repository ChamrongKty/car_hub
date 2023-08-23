import { Footer, NavBar } from "@/components";
import React from "react";

const layout = ({children}:{
    children:React.ReactNode
}) => {
  return (
    <div className="relative">
      <NavBar />
      {children}
      <Footer />
    </div>
  );
};

export default layout;

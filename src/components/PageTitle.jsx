// PageTitle.jsx
import React from "react";

export default function PageTitle({ children }) {
  return (
    <h1
      className="
        text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-wide 
        text-center mt-10 mb-8 select-none spider-page-title
      "
    >
      {children}
    </h1>
  );
}

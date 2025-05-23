import React from "react";
import Header from "./Components/Header";
const navLinks = [
  { title: "Home", link: "/" },
  {
    title: "Products",
    children: [
      { title: "CCTV Cameras", link: "/products/cctv" },
      {
        title: "Accessories",
        children: [
          { title: "Cables", link: "/products/accessories/cables" },
          { title: "Connectors", link: "/products/accessories/connectors" },
        ],
      },
    ],
  },
  { title: "Solutions", link: "/solutions" },
  {
    title: "Support",
    children: [
      { title: "FAQs", link: "/support/faqs" },
      { title: "Contact", link: "/support/contact" },
    ],
  },
  { title: "About Us", link: "/about-us" },
];

const App = () => {
  return (
    <div>
      <Header
        navLinks={navLinks}
        dropdownDirection="left"
        colors={{
         primary: "bg-gray-900",
        secondary: "bg-gray-800",
        tertiary: "bg-white text-black",
        }}
      />
    </div>
  );
};

export default App;
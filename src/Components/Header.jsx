import { useEffect, useState } from "react";
import { ChevronDown, ChevronRight, Menu, X } from "lucide-react";
import logo2 from "../assets/logo2.png";

const colors = {
  primary: "bg-gray-600",
  secondary: "bg-gray-800",
  tertiary: "bg-gray-700",
  text: "text-white",
};

export default function Header({ navLinks, direction = "left" }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openParent, setOpenParent] = useState(null);
  const [openChild, setOpenChild] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleParent = (title) => {
    setOpenParent(openParent === title ? null : title);
    setOpenChild(null);
  };

  const toggleChild = (title) => {
    setOpenChild(openChild === title ? null : title);
  };

  const renderDropdown = (items, depth = 0) => (
    <ul
      className={`absolute ${colors.secondary} shadow-lg rounded-md p-2 ${
        direction === "right" ? "left-full top-0" : "left-0 top-3/6 mt-5"
      } z-50 min-w-[180px] whitespace-nowrap`}
    >
      {items.map((item, idx) => (
        <li key={idx} className="relative group/item">
          {item.children ? (
            <>
              <div className="flex justify-between items-center px-3 py-2 cursor-pointer hover:bg-gray-600">
                {item.title}
                <ChevronRight size={14} />
              </div>
              <div className="absolute top-0 left-full hidden group-hover/item:block z-50">
                {renderDropdown(item.children, depth + 1)}
              </div>
            </>
          ) : (
            <a
              href={item.link}
              className="block px-3 py-2 hover:bg-gray-600 rounded"
            >
              {item.title}
            </a>
          )}
        </li>
      ))}
    </ul>
  );

  const renderLinks = (links, isMobileView = false) =>
    links.map((item, idx) => {
      const isParentOpen = openParent === item.title;
      return (
        <li
          key={idx}
          className={`relative group ${
            isMobileView ? "w-full" : "inline-block"
          }`}
        >
          {item.children ? (
            <div
              role="button"
              tabIndex={0}
              aria-haspopup="true"
              aria-expanded={isParentOpen}
              className={`flex items-center justify-between gap-2 px-3 py-2 cursor-pointer hover:bg-gray-700 rounded ${
                isMobileView ? "w-full" : ""
              }`}
              onClick={() => isMobileView && toggleParent(item.title)}
              onKeyDown={(e) =>
                isMobileView && e.key === "Enter" && toggleParent(item.title)
              }
            >
              {item.title}
              <ChevronDown size={16} />
              {!isMobileView && (
                <div className="absolute hidden group-hover:block z-50">
                  {renderDropdown(item.children)}
                </div>
              )}
            </div>
          ) : (
            <a
              href={item.link}
              className="block px-3 py-2 hover:bg-gray-700 rounded"
            >
              {item.title}
            </a>
          )}

          {isMobileView && item.children && isParentOpen && (
            <ul className="ml-4 mt-2">
              {item.children.map((child, idx2) => {
                const isChildOpen = openChild === child.title;
                return (
                  <li key={idx2}>
                    {child.children ? (
                      <>
                        <div
                          className="flex items-center justify-between px-2 py-1 cursor-pointer hover:bg-gray-600 rounded"
                          onClick={() => toggleChild(child.title)}
                        >
                          {child.title}
                          <ChevronDown size={14} />
                        </div>
                        {isChildOpen && (
                          <ul className="ml-4 mt-1">
                            {child.children.map((sub, idx3) => (
                              <li key={idx3}>
                                <a
                                  href={sub.link}
                                  className="block px-2 py-1 hover:bg-gray-600 rounded"
                                >
                                  {sub.title}
                                </a>
                              </li>
                            ))}
                          </ul>
                        )}
                      </>
                    ) : (
                      <a
                        href={child.link}
                        className="block px-2 py-1 hover:bg-gray-600 rounded"
                      >
                        {child.title}
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </li>
      );
    });

  return (
    <header className={`${colors.primary} ${colors.text}`}>
      <div className="max-w-7xl mx-auto px-4  flex justify-between items-center">
        <div className="flex items-center">
          <img src={logo2} alt="CCTV Secure Logo" className="h-20 w-auto max-h-48 object-contain" />
        </div>
        <nav className="hidden md:flex space-x-4">{renderLinks(navLinks)}</nav>
        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>
      {mobileOpen && (
        <div className={`md:hidden px-4 pb-4 ${colors.tertiary}`}>
          <ul>{renderLinks(navLinks, true)}</ul>
        </div>
      )}
    </header>
  );
}

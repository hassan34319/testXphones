import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";


interface NavbarProps {
  menuCategories: {
    title: string;
    products: { name: string; _id: string }[];
  }[];
  pages: {
    title: string;
    pageName: { current: string };
    order: number;
  }[];
  isOpen: boolean;
  toggleSidebar: () => void;
}

const SidebarModal: React.FC<NavbarProps> = ({
  isOpen,
  toggleSidebar,
  menuCategories,
  pages,
}) => {
  const [isSubModalOpen, setIsSubModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("");
  const [activeProduct, setActiveProduct] = useState("");

  const sidebarRef = useRef<HTMLDivElement>(null);
  const subModalRef = useRef<HTMLDivElement>(null);

  // Sort pages by order
  const sortedPages = [...(pages || [])].sort((a, b) => a.order - b.order);
  

  useEffect(() => {
    if (isOpen || isSubModalOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen, isSubModalOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const isOutsideSidebar = sidebarRef.current && !sidebarRef.current.contains(target);
      const isOutsideSubModal = subModalRef.current && !subModalRef.current.contains(target);

      if (isSubModalOpen && isOutsideSubModal && isOutsideSidebar) {
        setIsSubModalOpen(false);
        setActiveCategory("");
      } else if (!isSubModalOpen && isOutsideSidebar) {
        toggleSidebar();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, isSubModalOpen, toggleSidebar]);

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    setIsSubModalOpen(true);
  };

  const handleProductClick = (productId: string) => {
    setActiveProduct(productId);
    setIsSubModalOpen(false);
    toggleSidebar();
  };

  const closeSubModal = () => {
    setIsSubModalOpen(false);
    setActiveCategory("");
  };
  const uniqueMenuCategories = Array.from(
    new Set(menuCategories.map(cat => cat.title))
  ).map(title => 
    menuCategories.find(cat => cat.title === title)
  );

  return (
    <>
      {isOpen && (
        <div className="fixed top-0 md:top-[6rem] left-0 w-full h-full bg-black opacity-50 z-40" />
      )}
      
      <div
        ref={sidebarRef}
        className={`fixed top-0 md:top-[6rem] left-0 w-full md:w-[15%] h-full md:max-h-fit bg-white z-50 shadow-lg ${
          isOpen ? "block" : "hidden"
        } overflow-y-auto md:rounded-b-xl`}
      >
        <button
          className="lg:hidden absolute top-0 right-0 m-4 p-2 bg-transparent rounded-full cursor-pointer"
          onClick={toggleSidebar}
        >
          <svg
            className="w-6 h-6 text-[#AE3033]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              d="M6 18L18 6M6 6l12 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        
        <div className="p-4">
          <div className="flex justify-center">
          <Button 
  href="/" 
  onClick={() => {
    setIsSubModalOpen(false);
    toggleSidebar();
  }}
>
  <img src="/logo0.jpeg" alt="Logo" className="flex items-center w-[10rem] md:w-[10rem]" />
</Button>
          </div>
          
          <ul className="pl-4 mt-2">
            {uniqueMenuCategories.map((category) => (
              <li
              key={`category-${category?.title}-${category?.title}`} // Added index to make it unique
              className={`flex items-center py-2 border-t border-gray-200 cursor-pointer ${
                activeCategory === category.title ? "bg-gray-100" : ""
              }`}
              onClick={() => handleCategoryClick(category.title)}
            >
                <span className="mr-2">{category.title}</span>
                <svg
                  className={`w-4 h-4 ml-auto fill-current -rotate-90 ${
                    activeCategory === category.title ? "transform rotate-0" : ""
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M6 9l6 6 6-6z" />
                </svg>
              </li>
            ))}
            {sortedPages.map((page) => (
              <li>
              <Link
                key={page.pageName.current}
                href={`/${page.pageName}`}
                className="flex items-center py-2 border-t border-b border-gray-200 cursor-pointer hover:bg-gray-100"
                onClick={toggleSidebar}
              >
                <span className="mr-2">{page.title}</span>
              </Link>
              </li>
            ))}
            
          </ul>
        </div>
      </div>

      {isSubModalOpen && (
        <div
          ref={subModalRef}
          className={`fixed top-0 md:top-[6rem] left-0 md:left-[15%] w-full md:w-[20%] h-full md:max-h-fit bg-white z-50 shadow-lg ${
            isOpen ? "block" : "hidden"
          } overflow-y-auto md:rounded-b-xl`}
        >
          <button
            className="lg:hidden absolute top-0 right-0 m-4 p-2 bg-transparent rounded-full cursor-pointer"
            onClick={closeSubModal}
          >
            <svg
              className="w-6 h-6 text-[#AE3033]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                d="M6 18L18 6M6 6l12 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div className="p-4">
            {activeCategory && (
              <>
                <h2 className="font-bold text-lg text-[#AE3033] relative flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-[#AE3033] cursor-pointer absolute left-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    onClick={closeSubModal}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.75 19.5L3 12l6.75-7.5M3 12h18"
                    />
                  </svg>
                  <div>
                    {activeCategory}
                  </div>
                </h2>
                <ul className="pl-4 mt-2">
                  {uniqueMenuCategories
                    .find((category) => category.title === activeCategory)
                    ?.products.map((product) => (
                      <Link
                        key={product._id}
                        href={`/products/${product._id}`}
                        className={`block py-2 border-t border-b border-gray-200 cursor-pointer ${
                          activeProduct === product._id ? "bg-gray-100" : ""
                        }`}
                        onClick={() => handleProductClick(product._id)}
                      >
                        <span>{product.name}</span>
                      </Link>
                    ))}
                </ul>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SidebarModal;
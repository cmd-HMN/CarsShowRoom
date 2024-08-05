import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const HomeDropDown = () => {
  const [isMenu, setIsMenu] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMenu(window.innerWidth < 640);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMouseEnter = (menuName: string) => {
    setHoveredMenu(menuName);
    if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = window.setTimeout(() => {
      setHoveredMenu(null);
    }, 200);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="flex flex-row text-sm text-white font-light">
      {isMenu ? (
        <div className="relative inline-block text-left">
          <div className="inline-flex items-center">
            <Link to="/" className="text-white text-[10px]">
              Home
            </Link>
            <div 
              className="relative group z-20"
              onMouseEnter={() => handleMouseEnter('mobile')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm bg-transparent text-[10px] font-medium hover:text-gray-300 focus:outline-none ml-1"
                id="options-menu"
                aria-haspopup="true"
              >
                v
              </button>
              <div className={`origin-top-right absolute right-0 mt-2 w-20 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-opacity duration-300 ease-out transform translate-y-0 hover:z-30 ${hoveredMenu === 'mobile' ? 'opacity-100 block' : 'opacity-0 hidden'}`}>
                <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <div className="group relative">
                    <Link
                      to={"/blogs"}
                      className="block px-4 py-2 text-[10px] text-gray-700 hover:bg-gray-100"
                    >
                      Blogs
                    </Link>
                  </div>
                  <div className="group relative">
                    <Link
                      to={"/shop"}
                      className="block px-4 py-2 text-[10px] text-gray-700 hover:bg-gray-100"
                    >
                      Shop
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <nav className="flex space-x-4 py-4">
          <div className="flex items-center border-r border-gray-600 pr-4">
            <Link to={"/"} className="text-white hover:text-gray-300">
              Home
            </Link>
          </div>

          <div 
            className="flex items-center border-r border-gray-600 pr-4"
            onMouseEnter={() => handleMouseEnter('shop')}
            onMouseLeave={handleMouseLeave}
          >
            <Link to={"/shop"} className="text-white hover:text-gray-300">
              Shop
            </Link>
          </div>
          <div 
            className="flex items-center relative group"
          >
            <Link
              to={"blogs"}
              className="text-white hover:text-gray-300"
            >
              Blogs
            </Link>
            </div>
        </nav>
      )}
    </div>
  );
};

export default HomeDropDown;
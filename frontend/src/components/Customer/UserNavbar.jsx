import React, { useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { FaRegHeart } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import { HiMenu, HiX } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../AxiosInstance";
import { toast } from "react-toastify";

function UserNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [token, setToken] = useState();
  const [name, setName] = useState("");

  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

  // 🔥 Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🔥 Get User Profile
  const getCustomerDetail = async () => {
    try {
      const res = await axiosInstance.get("/user/profile");
      setName(res.data.data.userObj.name);
    } catch (error) {
      localStorage.removeItem("token");
      setToken(null);
      setName("");
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    try {
      navigate(`/search?query=${searchQuery}`);
    } catch (error) {
      console.log(error);
    }
  };

  // 🔥 Check Token
  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      setToken(storedToken);
      getCustomerDetail();
    } else {
      setToken(null);
      setName("");
    }
  }, []);

  // 🔥 Get Categories
  const getCategories = async () => {
    try {
      const res = await axiosInstance.get("/category/categories");
      setCategories(res.data.data);
    } catch (error) {
      toast.error("Failed to load categories");
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  // 🔥 Convert Flat → Tree
  const buildCategoryTree = (data) => {
    const map = {};
    const roots = [];

    data.forEach((cat) => {
      map[cat._id] = { ...cat, children: [] };
    });

    data.forEach((cat) => {
      if (cat.parentCategoryId) {
        map[cat.parentCategoryId._id]?.children.push(map[cat._id]);
      } else {
        roots.push(map[cat._id]);
      }
    });

    return roots;
  };

  const categoryTree = buildCategoryTree(categories);

  return (
    <>
      {/* NAVBAR */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 h-16 flex items-center justify-between px-6 md:px-16 transition-all duration-300 ${
          scrolled ? "bg-white/70 backdrop-blur-md shadow-md" : "bg-white"
        }`}
      >
        {/* LEFT */}
        <div className="flex items-center gap-10">
          <h1
            className="text-2xl md:text-3xl text-teal-600 cursor-pointer"
            style={{ fontFamily: "Pacifico, cursive" }}
            onClick={() => navigate("/")}
          >
            Wear Web
          </h1>

          {/* DESKTOP MENU */}
          <ul className="hidden md:flex gap-10 text-gray-700 font-medium relative">
            {categoryTree.map((mainCat) => (
              <li className="group relative cursor-pointer px-1 py-4 hover:text-teal-600">
                {mainCat.name}

                {/* UNDERLINE */}
                <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-teal-600 transition-all duration-300 group-hover:w-full"></span>

                {/* DROPDOWN */}
                <div className="absolute left-0 top-full mt-1 w-max min-w-[400px] bg-white shadow-lg p-6 hidden group-hover:flex gap-10 z-[999] border-t-2 border-gray-200">
                  {[...(mainCat.children || [])]
                    .sort((a, b) => {
                      const order = ["Top-Wear", "Bottom-Wear", "Foot-Wear"];

                      return order.indexOf(a.name) - order.indexOf(b.name);
                    })
                    .map((subCat) => (
                      <div
                        key={subCat._id}
                        className="flex flex-col min-w-[150px]"
                      >
                        <h3 className="text-red-500 font-semibold mb-2">
                          {subCat.name}
                        </h3>

                        <ul className="space-y-1 text-gray-600">
                          {subCat.children?.map((child) => (
                            <li
                              key={child._id}
                              onClick={() =>
                                navigate(`/products/category/${child._id}`)
                              }
                              className="hover:text-teal-600 cursor-pointer"
                            >
                              {child.name}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT */}
        <div className="hidden md:flex items-center gap-8 text-gray-600">
          {/* 🔥 SEARCH BAR */}
          <div className="hidden md:flex items-center bg-gray-100 px-4 py-2 rounded-md w-[350px]">
            <IoMdSearch className="text-gray-500 text-lg mr-2" />

            <input
              type="text"
              placeholder="Search for products, brands and more"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
              className="bg-transparent outline-none w-full text-sm"
            />
          </div>

          {token ? (
            <button
              className="w-10 h-10 bg-teal-600 rounded-full text-white"
              onClick={() => navigate("/profile")}
            >
              {name?.charAt(0)}
            </button>
          ) : (
            <button
              className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-md"
              onClick={() => navigate("/login")}
            >
              <CgProfile />
              LOGIN
            </button>
          )}

          <FaRegHeart
            onClick={() => (token ? navigate("/wishlist") : navigate("/login"))}
            className="text-xl cursor-pointer hover:text-teal-600"
          />

          <TiShoppingCart
            onClick={() => (token ? navigate("/cart") : navigate("/login"))}
            className="text-xl cursor-pointer hover:text-teal-600"
          />
        </div>

        {/* MOBILE MENU BUTTON */}
        <div className="md:hidden text-2xl">
          {menuOpen ? (
            <HiX onClick={() => setMenuOpen(false)} />
          ) : (
            <HiMenu onClick={() => setMenuOpen(true)} />
          )}
        </div>
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="fixed top-16 left-0 w-full bg-white shadow-md md:hidden z-40">
          <ul className="flex flex-col items-center gap-6 py-6 text-gray-700 font-medium">
            {categoryTree.map((cat) => (
              <li key={cat._id}>{cat.name}</li>
            ))}

            <button
              className="bg-teal-600 text-white px-6 py-2 rounded-md"
              onClick={() => navigate("/login")}
            >
              LOGIN
            </button>
          </ul>
        </div>
      )}

      {/* SPACER */}
      <div className="h-16"></div>
    </>
  );
}

export default UserNavbar;

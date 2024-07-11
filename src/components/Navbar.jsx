import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";
import { FaHome } from "react-icons/fa";

const Navbar = ({ status }) => {
  const [currentTheme, setCurrentThmeme] = useState("");
  const handleLogout = () => {
    localStorage.removeItem("led1");
    localStorage.removeItem("led2");
    localStorage.removeItem("led3");
    localStorage.removeItem("led4");
    localStorage.removeItem("led5");
    localStorage.removeItem("led6");
    localStorage.removeItem("led7");
    localStorage.removeItem("led8");
    localStorage.removeItem("led9");
    localStorage.removeItem("led10");
    localStorage.removeItem("fan1");
    localStorage.removeItem("fan2");
    localStorage.removeItem("fan3");
    localStorage.removeItem("fan4");
    localStorage.removeItem("door1");
    localStorage.removeItem("door2");
    localStorage.removeItem("door3");
    localStorage.removeItem("window");
    localStorage.removeItem("garden");
    sessionStorage.clear();
    location.pathname = "/";
  };
  const handleGuest = () => {
    sessionStorage.removeItem("Guest");
    location.pathname = "/";
  };
  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      setCurrentThmeme("dark");
    } else {
      document.documentElement.classList.remove("dark");
      setCurrentThmeme("light");
    }
  }, []);
  const changeTheme = (theme) => {
    if (theme == "light") {
      localStorage.theme = "light";
      document.documentElement.classList.remove("dark");
      setCurrentThmeme("light");
    } else {
      localStorage.theme = "dark";
      document.documentElement.classList.add("dark");
      setCurrentThmeme("dark");
    }
  };

  return (
    <nav className="bg-white dark:bg-black sm:px-10 px-6 w-full flex items-center py-5 fixed top-0 z-20 ">
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to={"/"}
          className="flex items-center gap-2"
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          <FaHome className="w-9 h-9 dark:text-white" />
          <p className="text-black dark:text-white-100 text-[18px] font-bold cursor-pointer flex ">
            IoT&nbsp;
            <span className="sm:hidden">|&nbsp;SMART HOME </span>
          </p>
        </Link>
        <ul className=" list-none sm:flex lg:flex md:flex flex flex-row gap-10 md:gap-7 justify-center items-center sm:gap-3">
          <li className="ml-2 md:ml-5 sm:mr-5 ">
            {currentTheme === "dark" ? (
              <BsFillSunFill
                className="cursor-pointer text-[1.6rem] hover:text-black hover:scale-110 transition-all dark:text-gray-200 "
                onClick={() => changeTheme("light")}
              />
            ) : (
              <BsFillMoonFill
                className="cursor-pointer text-[1.6rem] hover:text-black hover:scale-110 transition-all dark:text-gray-200 "
                onClick={() => changeTheme("dark")}
              />
            )}
          </li>
          {status == !"login" || status == !"guest" ? (
            <>
              <li>
                <button
                  onClick={handleLogout}
                  className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-semibold rounded-lg text-[0.9rem] w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                >
                  Logout
                </button>
              </li>
            </>
          ) : status === "guest" ? (
            <li>
              <button
                onClick={handleGuest}
                className="text-white font-semibold bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                Login
              </button>
            </li>
          ) : (
            <></>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

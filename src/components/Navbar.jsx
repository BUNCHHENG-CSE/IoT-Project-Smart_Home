import { useState, useEffect } from "react";
import { Link} from "react-router-dom";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";
import { FaHome } from "react-icons/fa";
const Navbar = ({ status }) => {
  //const [active, setActive] = useState("");
  // const [toggle, setToggle] = useState(false);
  const [currentTheme, setCurrentThmeme] = useState("");
  const handleLogout = () => {
    sessionStorage.removeItem("Email");
    sessionStorage.removeItem("Password");
    location.pathname = "/"

  };
  const handleGuest = () => {
    sessionStorage.removeItem("Guest");
    location.pathname = "/"
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
    <nav className="bg-white dark:bg-black sm:px-16 px-6 w-full flex items-center py-5 fixed top-0 z-20 ">
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to={"/"}
          className="flex items-center gap-2"
          onClick={() => {
            //setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <FaHome className="w-9 h-9 dark:text-white" />
          <p className="text-black dark:text-white-100 text-[18px] font-bold cursor-pointer flex ">
            IoT&nbsp;
            <span className="sm:block hidden">|&nbsp;SMART HOME </span>
          </p>
        </Link>
        <ul className=" list-none hidden sm:flex flex-row gap-10 justify-center items-center">
          <li className="ml-2 md:ml-5 ">
            {currentTheme === "dark" ? (
              <BsFillSunFill
                className="cursor-pointer text-lg hover:text-black hover:scale-110 transition-all dark:text-gray-200 "
                onClick={() => changeTheme("light")}
              />
            ) : (
              <BsFillMoonFill
                className="cursor-pointer text-lg hover:text-black hover:scale-110 transition-all dark:text-gray-200 "
                onClick={() => changeTheme("dark")}
              />
            )}
          </li>
          {status == !"login" || status == !"guest" ? (
            <li>
              <button
                onClick={handleLogout}
                className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
              >
                Logout
              </button>
            </li>
          ) : status === "guest" ? (
            <li>
              <button
                onClick={handleGuest}
                className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                Login
              </button>
            </li>
          ) : (
            <></>
          )}
        </ul>
        {/* <div className="sm:hidden flex flex-1 justify-end items-center">
          <img
            src={toggle ? "../assets/close.svg" : "../assets/menu.svg"}
            alt="menu"
            className="w-[28px] h-[28px] object-contain cursor-pointer "
            onClick={() => {
              setToggle(!toggle);
            }}
          />
          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[180px] z-10 rounded-xl`}
          >
            <ul className=" list-none flex justify-end items-start flex-col gap-4">
            <li className='ml-2 md:ml-5 '> 
                {
                    currentTheme === "dark" ? (<BsFillSunFill
                        className='cursor-pointer text-lg hover:text-black hover:scale-110 transition-all dark:text-gray-200 '
                        onClick={()=>changeTheme('light')}/>) : (<BsFillMoonFill 
                        className='cursor-pointer text-lg hover:text-black hover:scale-110 transition-all dark:text-gray-200 '
                        onClick={()=>changeTheme('dark')}/>)
                }
                </li>
            </ul>
          </div>
        </div> */}
      </div>
    </nav>
  );
};

export default Navbar;

import { Link } from "react-router-dom";
import { FaTemperatureHigh } from "react-icons/fa";
import { MdCastConnected, MdConnectWithoutContact } from "react-icons/md";
import { BsFan } from "react-icons/bs";
import { PiLampPendantFill } from "react-icons/pi";
import { GiLockedDoor } from "react-icons/gi";
const LeftSidebar = () => {
  return (
    <div className=" bg-inherit dark:bg-inherit h-full w-[15%]">
      <div className=" flex flex-col relative top-12">
        <div className="pb-4">
          <Link
            to={"/"}
            className="hover:text-black dark:before:bg-white dark:hover:text-white dark:bg-inherit dark:text-[#2d3436] active flex items-center  ml-8 gap-x-4 relative h-14 transition-all duration-300 ease "
          >
            <span className=" text-2xl transition-all duration-300 ease-in hover:ml-6 ">
            <PiLampPendantFill />
            </span>
            <h2 className=" font-bold">Control Led 1 Floor</h2>
          </Link>
        </div>

        <div className="pb-4">
          <Link
            to={"/secondfloor"}
            className="hover:text-black dark:before:bg-white dark:hover:text-white dark:bg-inherit dark:text-[#2d3436] active flex items-center  ml-8 gap-x-4 relative h-14 transition-all duration-300 ease "
          >
            <span className=" text-2xl transition-all duration-300 ease-in hover:ml-6 ">
            <PiLampPendantFill />
            </span>
            <h2 className=" font-bold">Control Led 2 Floor</h2>
          </Link>
        </div>
        <div className="pb-4">
          <Link
            to={"/controlfan"}
            className="hover:text-black dark:before:bg-white dark:hover:text-white dark:bg-inherit dark:text-[#2d3436] active flex items-center  ml-8 gap-x-4 relative h-14 transition-all duration-300 ease "
          >
            <span className=" text-2xl transition-all duration-300 ease-in hover:ml-6 ">
            <BsFan />
            </span>
            <h2 className=" font-bold">Control Fan</h2>
          </Link>
        </div>
        <div className="pb-4">
          <Link
            to={"/controldoor"}
            className="hover:text-black dark:before:bg-white dark:hover:text-white dark:bg-inherit dark:text-[#2d3436] active flex items-center  ml-8 gap-x-4 relative h-14 transition-all duration-300 ease "
          >
            <span className=" text-2xl transition-all duration-300 ease-in hover:ml-6 ">
            <GiLockedDoor />
            </span>
            <h2 className=" font-bold">Control D & W</h2>
          </Link>
        </div>
        <div className="">
          <Link
            to={"/temperature"}
            className="hover:text-black dark:before:bg-white dark:hover:text-white  dark:bg-inherit dark:text-[#2d3436]  active flex items-center  ml-8 gap-x-4 relative h-14 transition-all duration-300 ease "
          >
            <span className=" text-2xl transition-all duration-300 ease-in hover:ml-6">
              {" "}
              <FaTemperatureHigh />{" "}
            </span>
            <h2 className=" font-bold">Temperature</h2>
          </Link>
        </div>
        <div className="mt-[23rem]">
          <Link
            to={"/subcribe"}
            className="hover:text-black dark:before:bg-white dark:hover:text-white dark:bg-inherit dark:text-[#2d3436] active flex items-center  ml-8 gap-x-4 relative h-14 transition-all duration-300 ease "
          >
            <span className=" text-2xl transition-all duration-300 ease-in hover:ml-6 ">
              <MdConnectWithoutContact />
            </span>
            <h2 className=" font-bold">Subcribe</h2>
          </Link>
        </div>
        <div className=" mt-[2rem]">
          <Link
            to={"/connect"}
            className="hover:text-black dark:before:bg-white dark:hover:text-white dark:bg-inherit dark:text-[#2d3436] active flex items-center  ml-8 gap-x-4 relative h-14 transition-all duration-300 ease "
          >
            <span className=" text-2xl transition-all duration-300 ease-in hover:ml-6 ">
              <MdCastConnected />
            </span>
            <h2 className=" font-bold">Connect</h2>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;

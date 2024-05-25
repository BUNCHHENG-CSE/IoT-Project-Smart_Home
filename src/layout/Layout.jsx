import LeftSidebar from "../components/LeftSidebar";
import Navbar from "../components/Navbar";
import StarsCanvas from "../components/canvas/Starcanvas";

const Layout = ({ children, status = "" }) => {
  return (
    <div className=" relative z-0 bg-gray-200 dark:bg-gray-950 h-lvh">
      <div className="  bg-hero-pattern bg-cover bg-no-repeat bg-center">
        <Navbar status={status} />
      </div>
      <div className=" relative w-full h-screen mx-auto">
        <StarsCanvas />
        {status === "login" ? (
          <div>{children}</div>
        ) : status === "guest" ? (
          <div className=" sm:pl-20 absolute inset-0 top-24 flex flex-row gap-5 "> {children}</div>
        ) : (
          <div className=" sm:pl-20 absolute inset-0 top-24 flex flex-row gap-5 ">
            <LeftSidebar />
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export default Layout;

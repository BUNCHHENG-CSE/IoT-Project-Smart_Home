import { useState } from "react";
import Layout from "../layout/Layout";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = ({ setToken, setGuest }) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const emailcheck = "demo@gmail.com";
  const passcheck = "demo12345";
  const checkEmailAndPass = (e) => {
    e.preventDefault();
    if (email === emailcheck && pass === passcheck) {
      setToken(true);
      sessionStorage.setItem("Email", emailcheck);
      sessionStorage.setItem(
        "Password",
        "YVhRZ2FYTnVKM1FnWVNCd1lYTnpkMjl5WkE9PQ=="
      );
    } else {
      toast.error("Enter again", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
 
      <Layout status={"login"}>
        <ToastContainer
          className="w-[25%] h-[2rem] text-[1.15rem] font-extrabold"
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable={false}
          pauseOnHover
          theme="colored"
          stacked
        />
        <form onSubmit={checkEmailAndPass}>
          <div className=" flex items-center justify-center ">
            <div className=" bg-inherit flex items-center justify-center mt-[17rem] sm:mt-[14rem] h-[25rem] px-10 py-7 rounded-3xl shadow-lg shadow-zinc-800  dark:shadow-zinc-700  transition-all duration-300 ease hover:shadow-none border border-opacity-0  border-stone-950 hover:border-opacity-100 dark:border-white dark:border-opacity-0 dark:hover:border-opacity-100">
              <div className=" grid items-center grid-flow-row">
                <FaHome className="w-14 h-14 dark:text-white place-self-center" />
                <h1 className=" place-self-center mb-2 text-[1.3rem] text-black dark:text-white">
                  Smart Home
                </h1>
                <h1 className=" place-self-center mb-2 text-[1.3rem] text-black dark:text-white">
                  Login your Account
                </h1>

                <div className=" grid items-center grid-flow-row">
                  <input
                    type="text"
                    placeholder="Email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border border-black w-[17rem] h-[3rem] rounded-xl px-3 mb-3"
                  />
                  <input
                    type="password"
                    placeholder="Password..."
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    className="border border-black w-[17rem] h-[3rem] rounded-xl px-3"
                  />
                </div>
                <div className="flex justify-center  items-center mt-5">
                  <Link
                    to={"/guest"}
                    onClick={() =>
                      setGuest(true, sessionStorage.setItem("Guest", "Yes"))
                    }
                    className="mr-10 border border-black rounded-xl text-center pt-3 w-[7rem] h-[3rem] bg-green-400"
                  >
                    <span className=" font-medium text-[1rem]">Guest</span>
                  </Link>
                  <button
                    className=" border border-black rounded-xl w-[7rem] h-[3rem] bg-cyan-300"
                    onClick={checkEmailAndPass}
                  >
                    <span className=" font-medium text-[1rem]">Login</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Layout>
    
  );
};

export default Login;

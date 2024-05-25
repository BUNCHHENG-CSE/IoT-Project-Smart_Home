import { useState } from "react";
import Layout from "../layout/Layout";
import { FaHome } from "react-icons/fa";
import {Link} from "react-router-dom";
const Login = ({ setToken,setGuest }) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const emailcheck = "demo@gmail.com";
  const passcheck = "demo12345";
  const checkEmailAndPass = () => {
    if (email === emailcheck && pass === passcheck) { 
      setToken(true);
      sessionStorage.setItem("Email",emailcheck)
      sessionStorage.setItem("Password","YVhRZ2FYTnVKM1FnWVNCd1lYTnpkMjl5WkE9PQ==")
    } else {
      alert("Enter Again");
    }
  };

  return (
    <Layout status={"login"}>
      <form onSubmit={checkEmailAndPass}>
        <div className=" flex items-center justify-center ">
          <div className=" bg-inherit flex items-center justify-center mt-[17rem] h-[25rem] px-10 py-7 rounded-3xl shadow-lg shadow-zinc-800  dark:shadow-zinc-700  transition-all duration-300 ease hover:shadow-none border border-opacity-0  border-stone-950 hover:border-opacity-100 dark:border-white dark:border-opacity-0 dark:hover:border-opacity-100">
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
                <button
                  className="mr-10 border border-black rounded-xl w-[6rem] h-[2rem] bg-cyan-300"
                  onClick={checkEmailAndPass}
                >
                  Login
                </button>
                <Link to={"/guest"} onClick={()=>setGuest(true,sessionStorage.setItem("Guest","Yes"))}>
                <button className=" border border-black rounded-xl  w-[6rem] h-[2rem] bg-green-400">
                  Guest
                </button>
                </Link>
                
              </div>
            </div>
          </div>
        </div>
      </form>
    </Layout>
  );
};

export default Login;

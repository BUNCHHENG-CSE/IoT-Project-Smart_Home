import React from "react";
import Layout from "../layout/Layout";
import { div } from "three/examples/jsm/nodes/Nodes.js";

const GuestPage = ({ status }) => {
  const botPhoto = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];
  return (
    <Layout status={"guest"}>
      <div className=" overflow-auto w-full">
      <div className="h-[10%] w-full"><h1 className="text-black dark:text-white">Welcome to Our IoT Project</h1></div>
      <section className="py-6 dark:bg-gray-100">
        <div className="container flex flex-col justify-center p-4 mx-auto">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 sm:grid-cols-2">
            {botPhoto.map((b) => (
              <img
                className=" blur-sm hover:blur-none object-cover w-full dark:bg-gray-500 aspect-square"
                src={`./images/botRin${b}.jpg`}
              />
            ))}
          </div>
        </div>
      </section>
      </div>
      
      {/*
      <div className=' grid grid-cols-7 gap-6'>
      
          <img src={`./images/botRin${b}.jpg`} alt="" className=' blur-sm hover:blur-none object-contain w-[10rem] h-[15rem]' />
         ))
      }
      </div> */}
    </Layout>
  );
};

export default GuestPage;

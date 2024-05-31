import React from "react";
import Layout from "../layout/Layout";
import { useState } from "react";
import { IoWater, IoWaterOutline } from "react-icons/io5";
import { FaTemperatureLow } from "react-icons/fa6";
const Garden = ({ publish, payload }) => {
  // if temp > 40 water auto
  // if soild auto < 400
  const [temperature, setTemperature] = useState(0);
  const [waterPumbToggle, setWaterPumbToggle] = useState(
    sessionStorage.getItem("garden") === null
      ? sessionStorage.setItem("garden", "OFF")
      : sessionStorage.getItem("garden")
  );
  return (
    <Layout>
      {" "}
      <div className=" w-full grid lg:grid-cols-3 gap-6 md:grid-cols-2 sm:grid-col-1">
      <div
        className=" col-span-2 h-max w-lg px-10 py-7 rounded-3xl mt-4 shadow-lg shadow-zinc-800  dark:shadow-zinc-700  transition-all duration-300 ease hover:shadow-none border border-opacity-0  border-stone-950 hover:border-opacity-100 dark:border-white dark:border-opacity-0 dark:hover:border-opacity-100"
        onClick={() =>
          setWaterPumbToggle(
            waterPumbToggle === "OFF" ? "ON" : "OFF",
            publish({
              topic: "esp32/smarthome",
              qos: 0,
              payload: JSON.stringify({
                garden: waterPumbToggle === "OFF" ? "ON" : "OFF",
              }),
            }),
            sessionStorage.setItem(
              "garden",
              waterPumbToggle === "OFF" ? "ON" : "OFF"
            )
          )
        }
      >
        <div className="flex items-center flex-col">
          <div className="">
            <h2 className="mt-4 mb-1 dark:text-white font-extrabold">
              Water Pumb
            </h2>
          </div>
          <div className="icon">
            <span className=" p-2 rounded-full text-black text-3xl dark:text-white">
              {waterPumbToggle === "OFF" ? (
                <IoWaterOutline className="text-[4rem] sm:text-[3rem]" />
              ) : (
                <IoWater className="text-[4rem] sm:text-[3rem]" />
              )}
            </span>
          </div>
        </div>
      </div>
      <div
        className={` col-span-1 h-max w-lg px-10 py-7 rounded-3xl mt-4 shadow-2xl shadow-zinc-800  dark:shadow-zinc-700  transition-all duration-300 ease hover:shadow-none bg-[#63D123]`}
      >
        <div className="flex items-center justify-between">
          <div className=" mr-5">
            <h2 className="mt-4 mb-1 ">Temperature</h2>
            <h1>
              {temperature}&#8451;
            </h1>
          </div>
          <div className="icon">
            <span className=" p-2 rounded-full text-black text-3xl ">
            <FaTemperatureLow />
            </span>
          </div>
        </div>
      </div>
      </div>
     
    </Layout>
  );
};

export default Garden;

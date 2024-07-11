import React from "react";
import Layout from "../layout/Layout";
import { useState } from "react";
import { IoWater, IoWaterOutline } from "react-icons/io5";
import { FaTemperatureLow } from "react-icons/fa6";
import Data from "../../src/AW_weather.json";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
Chart.register(CategoryScale);
const Garden = ({ publish, payload }) => {
  // if temp > 40 water auto
  // if soild auto < 400
  const [temperature, setTemperature] = useState(0);
  const [waterPumbToggle, setWaterPumbToggle] = useState(
    localStorage.getItem("garden") === null
      ? localStorage.setItem("garden", "OFF")
      : localStorage.getItem("garden")
  );
  return (
    <Layout>
      <div className="bg-inherit dark:bg-inherit h-full w-[85%] overflow-y-scroll right-0 sm:pr-3 mx-5 ">
      <div className=" h-[18%]">
          <h1 className="font-black lg:text-[70px] sm:text-[30px] md:text-[50px] text-[30px] lg:leading-[98px] mt-2 dark:text-white text-black relative">
            Iot <span className="bg-gradient-to-t from-[#30cfd0] to-[#330867]  bg-clip-text text-transparent">Smart Home</span>
            
          </h1>
          <p className="font-medium lg:text-[20px] sm:text-[16px] text-[16px] lg:leading-[40px] mt-2 dark:text-white-100 text-black-100">
            Garden
          </p>
        </div>
        <div className="h-[18%] w-full grid lg:grid-cols-1 gap-6 md:grid-cols-1 sm:grid-col-1 sm:mt-10 sm:ml-2 md:ml-2">
          <div
            className={`self-center mb-7 h-[12rem] w-[50%] sm:w-[92%] md:w-[70%] sm:mt-10 sm:h-max px-10 py-7 rounded-3xl mt-4 shadow-2xl shadow-zinc-800  dark:shadow-zinc-700  transition-all duration-300 ease hover:shadow-none bg-[#30fffa]`}
          >
            <div className="flex items-center justify-between">
              <div className=" mr-5">
                <h2 className="mt-4 mb-1 font-bold">Temperature</h2>
                <h1>{temperature} &#8451;</h1>
              </div>
              <div className="icon">
                <span className=" p-2 rounded-full text-black text-3xl ">
                  <FaTemperatureLow className="text-[3rem]" />
                </span>
              </div>
            </div>
          </div>
          <div
            className=" col-span-1 h-[12rem] sm:h-max w-[50%] md:w-[70%] sm:w-[92%] px-10 py-7 rounded-3xl mt-4 shadow-lg shadow-zinc-800  dark:shadow-zinc-700  transition-all duration-300 ease hover:shadow-none border border-opacity-0  border-stone-950 hover:border-opacity-100 dark:border-white dark:border-opacity-0 dark:hover:border-opacity-100"
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
                localStorage.setItem(
                  "garden",
                  waterPumbToggle === "OFF" ? "ON" : "OFF"
                )
              )
            }
          >
            <div className="flex items-center flex-col">
              <div className="">
                <h2 className=" dark:text-white font-extrabold">Water Pumb</h2>
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
        </div>
      </div>
    </Layout>
  );
};

export default Garden;

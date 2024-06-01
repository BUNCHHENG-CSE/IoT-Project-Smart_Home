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
      <div className="bg-inherit dark:bg-inherit h-full w-[85%] overflow-y-scroll right-0 sm:pr-3">
        <div className="h-[18%] w-full grid lg:grid-cols-3 gap-6 md:grid-cols-2 sm:grid-col-1">
          <div
            className=" col-span-1 h-[10rem] w-lg px-10 py-7 rounded-3xl mt-4 shadow-lg shadow-zinc-800  dark:shadow-zinc-700  transition-all duration-300 ease hover:shadow-none border border-opacity-0  border-stone-950 hover:border-opacity-100 dark:border-white dark:border-opacity-0 dark:hover:border-opacity-100"
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
                    <IoWaterOutline className="text-[3rem] sm:text-[2rem]" />
                  ) : (
                    <IoWater className="text-[3rem] sm:text-[2rem]" />
                  )}
                </span>
              </div>
            </div>
          </div>
          <div
            className={`sm:col-span-1 md:col-span-1 lg:col-span-2 h-max w-lg px-10 py-7 rounded-3xl mt-4 shadow-2xl shadow-zinc-800  dark:shadow-zinc-700  transition-all duration-300 ease hover:shadow-none bg-[#63D123]`}
          >
            <div className="flex items-center justify-between">
              <div className=" mr-5">
                <h2 className="mt-4 mb-1 ">Temperature</h2>
                <h1>{temperature}&#8451;</h1>
              </div>
              <div className="icon">
                <span className=" p-2 rounded-full text-black text-3xl ">
                  <FaTemperatureLow />
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="h-[100rem] w-full md:mt-10 sm:mt-60">
        <Line
                  data={{
                    labels: Data.DailyForecasts.map((d) => d.Date),
                    datasets: [
                      {
                        label: "Maximum Temperature",
                        data: Data.DailyForecasts.map(
                          (dMaxT) =>
                            (dMaxT.Temperature.Maximum.Value - 32) / 1.8
                        ),
                        backgroundColor: "#064FF0",
                        borderColor: "#064FF0",
                      },
                      {
                        label: "Minimum Temperature",
                        data: Data.DailyForecasts.map(
                          (dMinT) =>
                            (dMinT.Temperature.Minimum.Value - 32) / 1.8
                        ),
                        backgroundColor: "#FF3030",
                        borderColor: "#FF3030",
                      },
                    ],
                  }}
                  options={{
                    elements: {
                      line: {
                        tension: 0.5,
                      },
                    },
                    plugins: {
                      title: {
                        display: true,
                        text: "Daily Maximum & Minimum Temperature",
                      },
                    },
                  }}
                />
        </div>
      </div>
    </Layout>
  );
};

export default Garden;

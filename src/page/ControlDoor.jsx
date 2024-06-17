import React from "react";
import { useState } from "react";
import Layout from "../layout/Layout";
import { FaDoorClosed } from "react-icons/fa6";
import { FaDoorOpen } from "react-icons/fa6";
const ControlDoor = ({ publish, payload }) => {
  const [gateToggle, setGateToggle] = useState(
    localStorage.getItem("door1") === null
      ? localStorage.setItem("door1", "OFF1")
      : localStorage.getItem("door1")
  );
  const [doorToggle, setDoorToggle] = useState(
    localStorage.getItem("door2") === null
      ? localStorage.setItem("door2", "OFF2")
      : localStorage.getItem("door2")
  );
  const [garageToggle, setGarageToggle] = useState(
    localStorage.getItem("door3") === null
      ? localStorage.setItem("door3", "OFF3")
      : localStorage.getItem("door3")
  );
  const [windowToggle, setWindowToggle] = useState(
    localStorage.getItem("window") === null
      ? localStorage.setItem("window", "OFF")
      : localStorage.getItem("window")
  );
  const doorLists = [
    {
      id: 1,
      name: "Gate",
      value: gateToggle,
      setv: setGateToggle,
      dclose: <FaDoorClosed className="text-[4rem] sm:text-[3rem]" />,
      dopen: <FaDoorOpen className="text-[4rem] sm:text-[3rem]" />,
    },
    {
      id: 2,
      name: "House",
      value: doorToggle,
      setv: setDoorToggle,
      dclose: <FaDoorClosed className="text-[4rem] sm:text-[3rem]" />,
      dopen: <FaDoorOpen className="text-[4rem] sm:text-[3rem]" />,
    },
    {
      id: 3,
      name: "Garage",
      value: garageToggle,
      setv: setGarageToggle,
      dclose: <FaDoorClosed className="text-[4rem] sm:text-[3rem]" />,
      dopen: <FaDoorOpen className="text-[4rem] sm:text-[3rem]" />,
    },
  ];
  return (
    <Layout>
      <div className="bg-inherit dark:bg-inherit h-full w-[85%] overflow-y-scroll right-0 sm:pr-3">
        <div className=" h-[18%]">
          <h1 className="font-black lg:text-[70px] sm:text-[30px] md:text-[50px] text-[30px] lg:leading-[98px] mt-2 dark:text-white text-black">
            Iot <span className="text-[#915eff]">Smart Home</span>
          </h1>
          <p className="font-medium lg:text-[20px] sm:text-[16px] text-[16px] lg:leading-[40px] mt-2 dark:text-white-100 text-black-100">
            Iot Project | Smart Home
          </p>
        </div>
        <div className="h-[100rem] w-full sm:-mt-7">
          <div className=" flex pt-6 flex-col">
            <div className="w-full grid lg:grid-cols-3 gap-6 md:grid-cols-2 sm:grid-col-1">
              {doorLists.map((d) => (
                <div
                  className="h-[29.4rem] sm:h-[18rem] w-lg px-10 py-7 rounded-3xl mt-4 shadow-lg shadow-zinc-800  dark:shadow-zinc-700  transition-all duration-300 ease hover:shadow-none border border-opacity-0  border-stone-950 hover:border-opacity-100 dark:border-white dark:border-opacity-0 dark:hover:border-opacity-100"
                  onClick={() =>
                    d.setv(
                      d.value === "OFF" + d.id ? "ON" + d.id : "OFF" + d.id,
                      publish({
                        topic: "esp32/smarthome",
                        qos: 0,
                        payload: JSON.stringify({
                          door:
                            d.value === "OFF" + d.id
                              ? "ON" + d.id
                              : "OFF" + d.id,
                        }),
                      }),
                      localStorage.setItem(
                        "door" + d.id,
                        d.value === "OFF" + d.id ? "ON" + d.id : "OFF" + d.id
                      )
                    )
                  }
                >
                  <div className="h-full flex items-center flex-col">
                    <div className="h-[70%]">
                      <h2 className="mt-4 mb-1 dark:text-white font-extrabold">
                        {d.name}
                      </h2>
                    </div>
                    <div className="">
                      <span className=" p-2 rounded-full text-black text-3xl dark:text-white">
                        {d.value === "OFF" + d.id ? d.dclose : d.dopen}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-10">
              <div
                className="h-[29.4rem]  sm:h-[18rem] w-[60%] sm:w-full px-10 py-7 rounded-3xl mt-4 shadow-lg shadow-zinc-800  dark:shadow-zinc-700  transition-all duration-300 ease hover:shadow-none border border-opacity-0  border-stone-950 hover:border-opacity-100 dark:border-white dark:border-opacity-0 dark:hover:border-opacity-100"
                onClick={() =>
                  setWindowToggle(
                    windowToggle === "OFF" ? "ON" : "OFF",
                    publish({
                      topic: "esp32/smarthome",
                      qos: 0,
                      payload: JSON.stringify({
                        window: windowToggle === "OFF" ? "ON" : "OFF",
                      }),
                    }),
                    localStorage.setItem(
                      "window",
                      windowToggle === "OFF" ? "ON" : "OFF"
                    )
                  )
                }
              >
                <div className="h-full flex items-center flex-col">
                  <div className="h-[70%] ">
                    <h2 className="mt-4 mb-1 dark:text-white font-extrabold">
                      Window
                    </h2>
                  </div>
                  <div className="">
                    <span className=" p-2 rounded-full text-black text-3xl dark:text-white">
                      {windowToggle === "OFF" ? (
                        <FaDoorClosed className="text-[4rem] sm:text-[3rem]" />
                      ) : (
                        <FaDoorOpen className="text-[4rem] sm:text-[3rem]" />
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ControlDoor;

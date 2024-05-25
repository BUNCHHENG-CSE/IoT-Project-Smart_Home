import React from "react";
import { useState } from "react";
import Layout from "../layout/Layout";
import { FaDoorClosed } from "react-icons/fa6";
import { FaDoorOpen } from "react-icons/fa6";
const ControlDoor = ({ publish, payload }) => {
  const [gateToggle, setGateToggle] = useState("OFF1");
  const [doorToggle, setDoorToggle] = useState("OFF2");
  const [garageToggle, setGarageToggle] = useState("OFF3");
  const [windowToggle, setWindowToggle] = useState("OFF");
  const doorLists = [
    { id: 1, name: "Gate", value: gateToggle, setv: setGateToggle, },
    { id: 2, name: "House", value: doorToggle, setv: setDoorToggle, },
    {
      id: 3,
      name: "Garage",
      value: garageToggle,
      setv: setGarageToggle,
    },
  ];
  return (
    <Layout>
      <div className="bg-inherit dark:bg-inherit h-full w-[85%] overflow-y-scroll right-0">
        <div className=" h-[18%]">
          <h1 className="font-black lg:text-[70px] sm:text-[50px] xs:text-[40px] text-[30px] lg:leading-[98px] mt-2 dark:text-white text-black">
            Iot <span className="text-[#915eff]">Smart Home</span>
          </h1>
          <p className="font-medium lg:text-[20px] sm:text-[16px] xs:text-[10px] text-[16px] lg:leading-[40px] mt-2 dark:text-white-100 text-black-100">
            Iot Project | Smart Home
          </p>
        </div>
        <div className="h-[100rem] w-full">
          <div className=" flex pt-6 flex-col">
            <div className="w-full grid grid-cols-3 gap-6 ">
              {doorLists.map((d) => (
                <div
                  className="h-[29.4rem] w-lg px-10 py-7 rounded-3xl mt-4 shadow-lg shadow-zinc-800  dark:shadow-zinc-700  transition-all duration-300 ease hover:shadow-none border border-opacity-0  border-stone-950 hover:border-opacity-100 dark:border-white dark:border-opacity-0 dark:hover:border-opacity-100"
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
                      })
                    )
                  }
                >
                  <div className="h-full flex items-center flex-col">
                    <div className="h-[70%]">
                      <h2 className="mt-4 mb-1 dark:text-white font-extrabold">{d.name}</h2>
                    </div>
                    <div className="">
                      <span className=" p-2 rounded-full text-black text-3xl dark:text-white">
                        {d.value === "OFF" + d.id ? (
                          <FaDoorClosed className="text-[4rem]"/>
                        ) : (
                          <FaDoorOpen className="text-[4rem]"/>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-10">
            <div
              className="h-[29.4rem] w-[60%] px-10 py-7 rounded-3xl mt-4 shadow-lg shadow-zinc-800  dark:shadow-zinc-700  transition-all duration-300 ease hover:shadow-none border border-opacity-0  border-stone-950 hover:border-opacity-100 dark:border-white dark:border-opacity-0 dark:hover:border-opacity-100"
              onClick={() =>
                setWindowToggle(
                  windowToggle === "OFF" ? "ON" : "OFF",
                  publish({
                    topic: "esp32/smarthome",
                    qos: 0,
                    payload: JSON.stringify({
                      window: windowToggle === "OFF" ? "ON" : "OFF",
                    }),
                  })
                )
              }
            >
              <div className="h-full flex items-center flex-col">
                <div className="h-[70%]">
                  <h2 className="mt-4 mb-1 dark:text-white font-extrabold">Window </h2>
                </div>
                <div className="">
                  <span className=" p-2 rounded-full text-black text-3xl dark:text-white">
                    {windowToggle === "OFF" ? <FaDoorClosed className="text-[4rem]"/> : <FaDoorOpen className="text-[4rem]"/>}
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

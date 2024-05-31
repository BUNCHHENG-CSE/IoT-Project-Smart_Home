import React from "react";
import { useState } from "react";
import Layout from "../layout/Layout";
import { PiFanFill } from "react-icons/pi";

const ControlFan = ({ publish, payload }) => {
  const [fan1Toggle, setFan1Toggle] = useState(
    localStorage.getItem("fan1") === null
      ? localStorage.setItem("fan1", "OFF1")
      : localStorage.getItem("fan1")
  );
  const [fan2Toggle, setFan2Toggle] = useState(
    localStorage.getItem("fan2") === null
      ? localStorage.setItem("fan2", "OFF2")
      : localStorage.getItem("fan2")
  );
  const [fan3Toggle, setFan3Toggle] = useState(
    localStorage.getItem("fan3") === null
      ? localStorage.setItem("fan3", "OFF3")
      : localStorage.getItem("fan3")
  );
  const [fan4Toggle, setFan4Toggle] = useState(
    localStorage.getItem("fan4") === null
      ? localStorage.setItem("fan4", "OFF4")
      : localStorage.getItem("fan4")
  );
  const fanLists = [
    { id: 1, name: "Fan 1", value: fan1Toggle, setv: setFan1Toggle },
    { id: 2, name: "Fan 2", value: fan2Toggle, setv: setFan2Toggle },
    { id: 3, name: "Fan 3", value: fan3Toggle, setv: setFan3Toggle },
    { id: 4, name: "Fan 4", value: fan4Toggle, setv: setFan4Toggle },
  ];
  return (
    <Layout>
      <div className="bg-inherit dark:bg-inherit h-full w-[85%]  overflow-y-scroll right-0 sm:pr-3">
        <div className=" h-[18%]">
          <h1 className="font-black lg:text-[70px] sm:text-[30px] md:text-[50px]  text-[30px] lg:leading-[98px] mt-2 dark:text-white text-black">
            Iot <span className="text-[#915eff]">Smart Home</span>
          </h1>
          <p className="font-medium lg:text-[20px] sm:text-[16px] text-[16px] lg:leading-[40px] mt-2 dark:text-white-100 text-black-100">
            Iot Project | Smart Home
          </p>
        </div>
        <div className="h-[100rem] w-full sm:-mt-7">
          <div className=" flex pt-6">
            <div className=" w-full grid lg:grid-cols-3 gap-6 md:grid-cols-2 sm:grid-col-1">
              {fanLists.map((fan) => (
                <div
                  className=" h-max w-lg px-10 py-7 rounded-3xl mt-4 shadow-lg shadow-zinc-800  dark:shadow-zinc-700  transition-all duration-300 ease hover:shadow-none border border-opacity-0  border-stone-950 hover:border-opacity-100 dark:border-white dark:border-opacity-0 dark:hover:border-opacity-100"
                  key={fan.id}
                  onClick={() =>
                    fan.setv(
                      fan.value === "OFF" + fan.id
                        ? "ON" + fan.id
                        : "OFF" + fan.id,
                      publish({
                        topic: "esp32/smarthome",
                        qos: 0,
                        payload: JSON.stringify({
                          fan:
                            fan.value === "OFF" + fan.id
                              ? "ON" + fan.id
                              : "OFF" + fan.id,
                        }),
                      }),
                      localStorage.setItem(
                        "fan" + fan.id,
                        fan.value === "OFF" + fan.id
                          ? "ON" + fan.id
                          : "OFF" + fan.id
                      )
                    )
                  }
                >
                  <div className="flex items-center flex-col">
                    <div className="">
                      <h2 className="mt-4 mb-1 dark:text-white font-extrabold">
                        {fan.name}
                      </h2>
                    </div>
                    <div className="icon">
                      <span className=" p-2 rounded-full text-black text-3xl dark:text-white">
                        {fan.value === "OFF" + fan.id ? (
                          <PiFanFill className="text-[4rem] sm:text-[3rem]" />
                        ) : (
                          <PiFanFill className=" animate-spin text-[4rem] sm:text-[3rem]" />
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ControlFan;

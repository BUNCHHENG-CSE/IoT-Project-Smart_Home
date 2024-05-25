import { useState, useEffect } from "react";
import Layout from "../layout/Layout";
import { FaLightbulb } from "react-icons/fa";
import { FaRegLightbulb } from "react-icons/fa";

const ControlLedSecondFloor = ({ publish, payload }) => {
    
  const [be2ledToggle, setBe2LedToggle] = useState("OFF5");
  const [ba2ledToggle, setBa2LedToggle] = useState("OFF6");

  const [s1ledToggle, setSLedToggle] = useState("OFF7");

  const ledLists = [
    {
      id: 5,
      name: "Bedroom",
      value: be2ledToggle,
      setv: setBe2LedToggle,
      floor:"2",
    },
    {
      id: 6,
      name: "Bathroom",
      value: ba2ledToggle,
      setv: setBa2LedToggle,
      floor:"2",
    },
    {
      id: 7,
      name: "Study Room",
      value: s1ledToggle,
      setv: setSLedToggle,
      floor:"2",
    },
   
  ];
  return (
    <Layout>
      <div className="bg-inherit dark:bg-inherit h-full w-[85%]  overflow-y-scroll right-0">
        <div className=" h-[18%]">
          <h1 className="font-black lg:text-[70px] sm:text-[50px] xs:text-[40px] text-[30px] lg:leading-[98px] mt-2 dark:text-white text-black">
            Iot <span className="text-[#915eff]">Smart Home</span>
          </h1>
          <p className="font-medium lg:text-[20px] sm:text-[16px] xs:text-[10px] text-[16px] lg:leading-[40px] mt-2 dark:text-white-100 text-black-100">
            Iot Project | Smart Home
          </p>
        </div>
        <div className="h-[100rem] w-full">
          <div className="grid grid-cols-3 gap-6">
            {ledLists.map((led) => (
              <div
                className=" h-max w-lg px-10 py-7 rounded-3xl mt-4 shadow-lg shadow-zinc-800  dark:shadow-zinc-700  transition-all duration-300 ease hover:shadow-none border border-opacity-0  border-stone-950 hover:border-opacity-100 dark:border-white dark:border-opacity-0 dark:hover:border-opacity-100"
                key={led.id}
                onClick={() =>
                  led.setv(
                    led.value === "OFF" + led.id
                      ? "ON" + led.id
                      : "OFF" + led.id,
                    publish({
                      topic: "esp32/smarthome",
                      qos: 0,
                      payload: JSON.stringify({
                        led:
                          led.value === "OFF" + led.id
                            ? "ON" + led.id
                            : "OFF" + led.id,
                      }),
                    })
                  )
                }
              >
                <div className="flex items-center flex-col">
                  <div className="">
                    <h2 className="mt-4 mb-1 dark:text-white font-extrabold">{led.name}</h2>
                  </div>
                  <div className="icon">
                    <span className=" p-2 rounded-full text-black text-3xl dark:text-white">
                      {led.value === "OFF" + led.id ? (
                        <FaRegLightbulb className="text-[4rem]" />
                      ) : (
                        <FaLightbulb className="text-[4rem]"/>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ControlLedSecondFloor
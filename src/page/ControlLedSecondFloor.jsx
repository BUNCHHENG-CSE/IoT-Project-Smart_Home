import { useState, useEffect } from "react";
import Layout from "../layout/Layout";
import { FaLightbulb } from "react-icons/fa";
import { FaRegLightbulb } from "react-icons/fa";

const ControlLedSecondFloor = ({ publish, payload }) => {
    
  const [be1ledToggle, setBe1LedToggle] = useState(localStorage.getItem("led5")===null? localStorage.setItem("led5","OFF5"):localStorage.getItem("led5"));
  const [ba1ledToggle, setBa1LedToggle] = useState(localStorage.getItem("led6")===null? localStorage.setItem("led6","OFF6"):localStorage.getItem("led6"));
  const [wwledToggle, setWWLedToggle] = useState(localStorage.getItem("led7")===null? localStorage.setItem("led7","OFF7"):localStorage.getItem("led7"));
  const [be2ledToggle, setBe2LedToggle] = useState(localStorage.getItem("led8")===null? localStorage.setItem("led8","OFF8"):localStorage.getItem("led8"));
  const [ba2ledToggle, setBa2LedToggle] = useState(localStorage.getItem("led9")===null? localStorage.setItem("led9","OFF9"):localStorage.getItem("led9"));
  const [offledToggle, setOffLedToggle] = useState(localStorage.getItem("led10")===null? localStorage.setItem("led10","OFF10"):localStorage.getItem("led10"));


  const ledLists = [
    {
      id: 5,
      name: "Bedroom",
      value: be1ledToggle,
      setv: setBe1LedToggle,
      floor:"2",
    },
    {
      id: 6,
      name: "Bathroom",
      value: ba1ledToggle,
      setv: setBa1LedToggle,
      floor:"2",
    },
    {
      id: 7,
      name: "Walkway",
      value: wwledToggle,
      setv: setWWLedToggle,
      floor:"2",
    },
    {
      id: 8,
      name: "Bedroom",
      value: be2ledToggle,
      setv: setBe2LedToggle,
      floor:"2",
    },
    {
      id: 9,
      name: "Bathroom",
      value: ba2ledToggle,
      setv: setBa2LedToggle,
      floor:"2",
    },
    {
      id: 10,
      name: "Office",
      value: offledToggle,
      setv: setOffLedToggle,
      floor:"2",
    },
   
  ];
  return (
    <Layout>
      <div className="bg-inherit dark:bg-inherit h-full w-[85%]  overflow-y-scroll right-0 sm:pr-3">
        <div className=" h-[18%]">
          <h1 className="font-black lg:text-[70px] sm:text-[30px] md:text-[50px] text-[30px] lg:leading-[98px] mt-2 dark:text-white text-black">
            Iot <span className="text-[#915eff]">Smart Home</span>
          </h1>
          <p className="font-medium lg:text-[20px] sm:text-[16px]  text-[16px] lg:leading-[40px] mt-2 dark:text-white-100 text-black-100">
            Iot Project | Smart Home
          </p>
        </div>
        <div className="h-[100rem] w-full md:mt-10 sm:-mt-7">
          <div className="grid lg:grid-cols-3 gap-6 md:grid-cols-2 sm:grid-col-1">
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
                    }),localStorage.setItem("led"+led.id,led.value === "OFF" + led.id? "ON" + led.id: "OFF" + led.id,)
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
                        <FaRegLightbulb className="text-[4rem] sm:text-[3rem]" />
                      ) : (
                        <FaLightbulb className="text-[4rem] sm:text-[3rem]"/>
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
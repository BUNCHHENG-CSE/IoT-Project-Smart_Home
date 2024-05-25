import React from "react";
import { useState } from "react";
import Layout from "../layout/Layout";
import { PiFanFill } from "react-icons/pi";
import { FaDoorClosed } from "react-icons/fa6";
import { FaDoorOpen } from "react-icons/fa6";

const ControlFan = () => {
  const [fan1Toggle, setFan1Toggle] = useState(false);
  const [fan2Toggle, setFan2Toggle] = useState(false);
  const [fan3Toggle, setFan3Toggle] = useState(false);
  const [fan4Toggle, setFan4Toggle] = useState(false);
  const [doorToggle, setDoorToggle] = useState(false);
  const fanLists = [
    { id: 1, name: "Fan 1", value: fan1Toggle, setv: setFan1Toggle },
    { id: 2, name: "Fan 2", value: fan2Toggle, setv: setFan2Toggle },
    { id: 3, name: "Fan 3", value: fan3Toggle, setv: setFan3Toggle },
    { id: 4, name: "Fan 4", value: fan4Toggle, setv: setFan4Toggle },
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
          <div className=" flex pt-6">
            <div className=" w-full grid grid-cols-2 gap-6">
              {fanLists.map((fan) => (
                <div
                  className=" h-max w-lg px-10 py-7 rounded-3xl mt-4 shadow-lg shadow-zinc-800  dark:shadow-zinc-700  transition-all duration-300 ease hover:shadow-none border border-opacity-0  border-stone-950 hover:border-opacity-100 dark:border-white dark:border-opacity-0 dark:hover:border-opacity-100"
                  key={fan.id}
                  onClick={() => fan.setv(!fan.value)}
                >
                  <div className="flex items-center flex-col">
                    <div className="">
                      <h2 className="mt-4 mb-1 dark:text-white font-extrabold">{fan.name}</h2>
                    </div>
                    <div className="icon">
                      <span className=" p-2 rounded-full text-black text-3xl dark:text-white">
                        {fan.value ? (
                          <PiFanFill className=" animate-spin text-[4rem]" />
                        ) : (
                          <PiFanFill className="text-[4rem]" />
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

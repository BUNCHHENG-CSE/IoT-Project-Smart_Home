import { useState, useEffect, memo, useCallback } from "react";
import Layout from "../layout/Layout";
import { FaLightbulb } from "react-icons/fa";
import { FaRegLightbulb } from "react-icons/fa";

const ControlLedFirstFloor = ({ publish, payload }) => {
  const [kledToggle, setKLedToggle] = useState(
    localStorage.getItem("led1") === null
      ? localStorage.setItem("led1", "OFF1")
      : localStorage.getItem("led1")
  );
  const [be1ledToggle, setBe1LedToggle] = useState(
    localStorage.getItem("led2") === null
      ? localStorage.setItem("led2", "OFF2")
      : localStorage.getItem("led2")
  );
  const [ba1ledToggle, setBa1LedToggle] = useState(
    localStorage.getItem("led3") === null
      ? localStorage.setItem("led3", "OFF3")
      : localStorage.getItem("led3")
  );
  const [gledToggle, setGLedToggle] = useState(
    localStorage.getItem("led4") === null
      ? localStorage.setItem("led4", "OFF4")
      : localStorage.getItem("led4")
  );

  const [tempDataKey, setTempDataKey] = useState([]);
  const [tempDataValue, setTempDataValue] = useState([]);

  useEffect(() => {
    if (payload.topic) {
      setTempDataKey(Object.keys(JSON.parse(payload.message)));
      //console.log(tempDataKey)
      setTempDataValue(Object.values(JSON.parse(payload.message)));
      // console.log(tempDataValue)
      // console.log(tempDataKey[0] == "led")
      if (tempDataKey[0] == "led") {
        if (tempDataValue == "ON1" || tempDataValue == "OFF1") {
          setKLedToggle(tempDataValue[0]);
          setTempDataValue("");
        } else if (tempDataValue == "ON2" || tempDataValue == "OFF2") {
          setBe1LedToggle(tempDataValue[0]);
          setTempDataValue("");
        } else if (tempDataValue == "ON3" || tempDataValue == "OFF3") {
          setBa1LedToggle(tempDataValue[0]);
          setTempDataValue("");
        } else if (tempDataValue == "ON4" || tempDataValue == "OFF4") {
          setGLedToggle(tempDataValue[0]);
          setTempDataValue("");
        }
        setTempDataKey([]);
      }
    }
  }, [payload]);

  const ledLists = [
    {
      id: 1,
      name: "Kitchen",
      value: kledToggle,
      setv: setKLedToggle,
      floor: "1",
    },
    {
      id: 2,
      name: " Bedroom",
      value: be1ledToggle,
      setv: setBe1LedToggle,
      floor: "1",
    },
    {
      id: 3,
      name: "Bathroom",
      value: ba1ledToggle,
      setv: setBa1LedToggle,
      floor: "2",
    },
    {
      id: 4,
      name: "Garage",
      value: gledToggle,
      setv: setGLedToggle,
      floor: "1",
    },
  ];
  // console.log(typeof(JSON.parse(payload.message)))
  // console.log(JSON.parse(payload.message))
  //console.log(messages.map((m)=>m.message))

  // console.log("Payload"+payload)
  //console.log(messages[0].temperature);
  // console.log(Object.keys(temperaryData)[0] === "temperature")
  return (
    <Layout>
      <div className="bg-inherit dark:bg-inherit h-full w-[85%] overflow-y-scroll right-0 sm:pr-3">
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
                    }),
                    localStorage.setItem(
                      "led" + led.id,
                      led.value === "OFF" + led.id
                        ? "ON" + led.id
                        : "OFF" + led.id
                    )
                  )
                }
              >
                <div className="flex items-center flex-col">
                  <div className="">
                    <h2 className="mt-4 mb-1 dark:text-white font-extrabold">
                      {led.name}
                    </h2>
                  </div>
                  <div className="icon">
                    <span className=" p-2 rounded-full text-black text-3xl dark:text-white">
                      {led.value === "OFF" + led.id ? (
                        <FaRegLightbulb className="text-[4rem] sm:text-[3rem]" />
                      ) : (
                        <FaLightbulb className="text-[4rem] sm:text-[3rem]" />
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
  );
};

export default memo(ControlLedFirstFloor);

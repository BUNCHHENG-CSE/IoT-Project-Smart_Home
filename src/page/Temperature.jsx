import Layout from "../layout/Layout";
import { FaTemperatureLow } from "react-icons/fa6";
import { WiHumidity } from "react-icons/wi";
import { IoMdSpeedometer } from "react-icons/io";
import { useState, useEffect } from "react";

const Temperature = ({ payload }) => {
  const [temperature, setTemperature] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [tempDataKey, setTempDataKey] = useState([]);
  const [tempDataValue, setTempDataValue] = useState([]);

  useEffect(() => {
    if (payload.topic) {
      setTempDataKey(Object.keys(JSON.parse(payload.message)));
      setTempDataValue(Object.values(JSON.parse(payload.message)));
      if (tempDataKey[0] == "temperature"&& tempDataKey[1]=="humidity") {
        setTemperature(tempDataValue[0]);
        setHumidity(tempDataValue[1]);
        setTempDataValue([]);
        setTempDataKey([])
      } 
    }
  }, [payload]);

  const tempLists = [
    {
      id: 1,
      name: "Temperature",
      data: `${temperature.toFixed(2)}`,
      icon: <FaTemperatureLow />,
      bgc: " bg-[#63D123]",
    },
    {
      id: 2,
      name: "Humidity",
      data: `${humidity.toFixed(2)}`,
      icon: <WiHumidity />,
      bgc: " bg-[#E9F53B]",
    },
    {
      id: 3,
      name: "Pressure",
      data: "1010.98 hPa",
      icon: <IoMdSpeedometer />,
      bgc: " bg-[#CC3443]",
    },
  ];
  return (
    <Layout>
      <main className="w-[85%]  h-full flex ">
        <div className="w-[75%] h-full">
          <div className="grid grid-cols-3 gap-6 w-[100%] h-[20%]">
            {tempLists.map((tl) => (
              <div
                className={`  w-lg px-10 py-7 rounded-3xl mt-4 shadow-2xl shadow-zinc-800  dark:shadow-zinc-700  transition-all duration-300 ease hover:shadow-none ${tl.bgc}`}
                key={tl.id}
              >
                <div className="flex items-center justify-between">
                  <div className=" mr-5">
                    <h2 className="mt-4 mb-1 ">{tl.name}</h2>
                    <h1>
                      {tl.data}{" "}
                      {tl.name === "Temperature" ? (
                        <>&#8451;</>
                      ) : tl.name === "Humidity" ? (
                        <>&#37;</>
                      ) : (
                        <></>
                      )}
                    </h1>
                  </div>
                  <div className="icon">
                    <span className=" p-2 rounded-full text-black text-3xl ">
                      {tl.icon}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className=" h-[80%]">
            <h2>Heloo</h2>
          </div>
        </div>
        <div className=" w-[25%] h-full">
          <h1>Hello world</h1>
        </div>
      </main>
    </Layout>
  );
};

export default Temperature;

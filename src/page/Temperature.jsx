import Layout from "../layout/Layout";
import { FaTemperatureLow } from "react-icons/fa6";
import { WiHumidity } from "react-icons/wi";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useState, useEffect } from "react";
import Data from "../../src/AW_weather.json";
import { Line } from "react-chartjs-2";

Chart.register(CategoryScale);

const Temperature = ({ payload }) => {
  const [temperature, setTemperature] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [tempDataKey, setTempDataKey] = useState([]);
  const [tempDataValue, setTempDataValue] = useState([]);

  useEffect(() => {
    if (payload.topic) {
      setTempDataKey(Object.keys(JSON.parse(payload.message)));
      setTempDataValue(Object.values(JSON.parse(payload.message)));
      if (tempDataKey[0] == "temperature" && tempDataKey[1] == "humidity") {
        setTemperature(tempDataValue[0]);
        setHumidity(tempDataValue[1]);
        setTempDataValue([]);
        setTempDataKey([]);
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
  ];
  return (
    <Layout>
      <main className="w-[85%]  h-full flex ">
        <div className="w-[75%] h-full sm:w-full sm:mr-2">
          <div className="grid grid-cols-2 gap-6 w-[100%] h-[20%] sm:grid-cols-1 sm:gap-2 sm:mb-52">
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
          <div className="h-[80%] ">
            <h2>Historical Charts</h2>
            <div className="w-[100%] grid grid-cols-2 gap-10 ">
              {/* <div className=" bg-white rounded-lg p-7 text-center shadow-2xl shadow-zinc-800  dark:shadow-zinc-700  transition-all duration-300 ease hover:shadow-none">
                1
              </div>
              <div className=" bg-white rounded-lg p-7 text-center shadow-2xl shadow-zinc-800  dark:shadow-zinc-700  transition-all duration-300 ease hover:shadow-none">
                2
              </div> */}
              <Line
          
                data={{
                  labels: Data.DailyForecasts.map((d) => d.Date),
                  datasets: [
                    {
                      label: "Maximum Temperature",
                      data: Data.DailyForecasts.map(
                        (dMaxT) => (dMaxT.Temperature.Maximum.Value -32 )/1.8
                      ),
                      backgroundColor: "#064FF0",
                      borderColor: "#064FF0",
                    },
                    {
                      label: "Minimum Temperature",
                      data: Data.DailyForecasts.map(
                        (dMinT) => (dMinT.Temperature.Minimum.Value- 32 ) / 1.8
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
        </div>
        <div className=" mx-5 w-[25%] h-full sm:hidden">
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
      </main>
    </Layout>
  );
};

export default Temperature;

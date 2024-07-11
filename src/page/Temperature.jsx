import Layout from "../layout/Layout";
import axios from "axios";
import { FaTemperatureLow } from "react-icons/fa6";
import { WiHumidity } from "react-icons/wi";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useState, useEffect } from "react";
import Data from "../../src/AW_weather.json";
import { Line } from "react-chartjs-2";
import { base_url } from "../BaseUrl";
Chart.register(CategoryScale);

const Temperature = ({ payload }) => {
  const [data, setData] = useState([]);
  const [temperature, setTemperature] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [tempDataKey, setTempDataKey] = useState([]);
  const [tempDataValue, setTempDataValue] = useState([]);
  const [postData, SetPostData] = useState({});

  useEffect(() => {
    if (payload.topic) {
      setTempDataKey(Object.keys(JSON.parse(payload.message)));
      setTempDataValue(Object.values(JSON.parse(payload.message)));
      if (tempDataKey[0] == "temperature" && tempDataKey[1] == "humidity") {
        setTemperature(tempDataValue[0]);
        setHumidity(tempDataValue[1]);
        SetPostData({
          temperature: Number(tempDataValue[0]),
          humidity: Number(tempDataValue[1]),
        });
        setTempDataValue([]);
        setTempDataKey([]);
      }
    }
  }, [payload]);

  useEffect(() => {
    // Fetch data using GET request
    axios
      .get(`${base_url}/getData`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);
  // console.log(data)
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (postData !== null) {
        axios
          .post(`${base_url}/postData`, postData)
          .then((response) => {
            setData([...data, response.data]);
          })
          .catch((error) => {
            console.error("There was an error adding the data!", error);
          });
      }
    }, 20000);
    return () => clearInterval(interval);
  }, []);
  const tempLists = [
    {
      id: 1,
      name: "Temperature",
      data: `${temperature.toFixed(2)}`,
      icon: <FaTemperatureLow className="text-[3rem]" />,
      bgc: " bg-[#30fffa]",
    },
    {
      id: 2,
      name: "Humidity",
      data: `${humidity.toFixed(2)}`,
      icon: <WiHumidity className="text-[3rem]" />,
      bgc: " bg-[#8093b1]",
    },
  ];
  return (
    <Layout>
      <main className="w-[85%]  h-full flex overflow-y-scroll">
        <div className="lg:w-[75%] md:w-full h-full sm:w-full sm:mx-2 sm:mt-16">
          <div className="grid grid-cols-2 gap-6 w-[100%] h-[20%] sm:grid-cols-1 sm:gap-2 sm:mb-52 lg:hidden sm:block">
            {tempLists.map((tl) => (
              <div
                className={` sm:w-88  w-lg px-10 py-7 rounded-3xl mt-4 shadow-2xl shadow-zinc-800  dark:shadow-zinc-700  transition-all duration-300 ease hover:shadow-none ${tl.bgc}`}
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
                    <span className=" p-2 rounded-full text-black  ">
                      {tl.icon}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="h-[80%] sm:hidden block">
            <h2 className="text-[1.5rem] font-semibold mb-5 text-black dark:text-white">
              Historical Charts of Temperature and Humidity
            </h2>
            <div className="w-[100%] sm:w-[90%] flex flex-col gap-20">
              <div className="h-[50%]">
                <Line
                  data={{
                    labels: data.map((d) => formatDate(d.timestamp)),
                    datasets: [
                      {
                        label: "Temperature",
                        data: data.map((dT) => dT.temperature),
                        backgroundColor: "#30fffa",
                        borderColor: "#30fffa",
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
                        text: "Temperature Data",
                        font: {
                          family: "Poppins",
                          size: 20,
                          weight: "bold",
                          lineHeight: 1.2,
                        },
                      },
                    },
                  }}
                />
              </div>
              <div className="h-[50%]">
                <Line
                  data={{
                    labels: data.map((d) => formatDate(d.timestamp)),
                    datasets: [
                      {
                        label: "Humidity",
                        data: data.map((dH) => dH.humidity),
                        backgroundColor: "#8093b1",
                        borderColor: "#8093b1",
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
                        text: "Humidity Data",
                        font: {
                          family: "Poppins",
                          size: 20,
                          weight: "bold",
                          lineHeight: 1.2,
                        },
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-[25%] h-full sm:hidden md:hidden lg:block mx-5">
          {tempLists.map((tl) => (
            <div
              className={` w-lg px-10 py-7 rounded-3xl mt-4 shadow-2xl shadow-zinc-800  dark:shadow-zinc-700  transition-all duration-300 ease hover:shadow-none ${tl.bgc}`}
              key={tl.id}
            >
              <div className="flex items-center justify-between">
                <div className=" mr-5">
                  <h2 className="mt-4 mb-1 font-bold ">{tl.name}</h2>
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

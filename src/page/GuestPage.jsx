import React, { useState } from "react";
import Layout from "../layout/Layout";
import { IoIosArrowUp,IoIosArrowDown } from "react-icons/io";
const GuestPage = ({ status }) => {
  const [moreToggle, setMoreToggle] = useState(false);
  const botPhoto = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];
  return (
    <Layout status={"guest"}>
      <div className=" overflow-auto w-full">
        <div className="h-[10%] w-full">
          <h1 className="text-black dark:text-white">
            Welcome to Our IoT Project
          </h1>
          <section className="py-6 bg-inherit dark:bg-inherit dark:text-white">
            <div className=" container flex flex-col items-center justify-center p-4 mx-auto sm:p-10">
              <p className="p-2 text-sm font-medium tracking-wider text-center uppercase">
                Project Members
              </p>
              <h1 className="text-4xl font-bold leading-none text-center sm:text-2xl sm:leading-normal">
                The people behind the project
              </h1>
              <div className="flex flex-col flex-wrap justify-center mt-8">
                <div className="grid place-content-center">
                  <div className="flex flex-col  justify-center w-full px-8 mx-6 my-12 text-center rounded-md md:w-96 lg:w-80 xl:w-64 ">
                    <img
                      alt=""
                      className="self-center  w-24 h-24 -mt-12 bg-center bg-cover rounded-full dark:bg-inherit"
                      src="./chart.png"
                    />
                    <div className="flex-1 my-4">
                      <p className="text-xl font-semibold leading-snug">
                        Keo Sivphanchart
                      </p>
                      <p className=" text-base">
                        <span className=" font-semibold">Leader</span> |
                        Hardware & Software
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
                  <div className="flex flex-col justify-center w-full px-8 mx-6 my-12 text-center rounded-md md:w-96 lg:w-80 xl:w-64 ">
                    <img
                      alt=""
                      className="self-center  w-24 h-24 -mt-12 bg-center bg-cover rounded-full dark:bg-inherit"
                      src="./images/botRin8.jpg"
                    />
                    <div className="flex-1 my-4">
                      <p className="text-xl font-semibold leading-snug">
                        Houy Norin
                      </p>
                      <p className=" text-base">
                        <span className=" font-semibold">Co-Leader</span> |
                        Design Home Template
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center w-full px-8 mx-6 my-12 text-center rounded-md md:w-96 lg:w-80 xl:w-64 ">
                    <img
                      alt=""
                      className="self-center  w-24 h-24 -mt-12 bg-center bg-cover rounded-full dark:bg-inherit"
                      src="./pin.png"
                    />
                    <div className="flex-1 my-4">
                      <p className="text-xl font-semibold leading-snug">
                        Chhean Silapin
                      </p>
                      <p className=" text-base">
                        <span className=" font-semibold">Co-Leader</span> |
                        Design Home Template
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center w-full px-8 mx-6 my-12 text-center rounded-md md:w-96 lg:w-80 xl:w-64 ">
                    <img
                      alt=""
                      className="self-center  w-24 h-24 -mt-12 bg-center bg-cover rounded-full  dark:bg-inherit"
                      src="./van.png"
                    />
                    <div className="flex-1 my-4">
                      <p className="text-xl font-semibold leading-snug">
                        Kea Sorvan
                      </p>
                      <p className=" text-base">
                        <span className=" font-semibold">Co-Leader</span> |
                        Design Home Template
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center w-full px-8 mx-6 my-12 text-center rounded-md md:w-96 lg:w-80 xl:w-64  ">
                    <img
                      alt=""
                      className="self-center w-24 h-24 -mt-12 bg-center bg-cover rounded-full dark:bg-inherit"
                      src="./me.png"
                    />
                    <div className="flex-1 my-4">
                      <p className="text-xl font-semibold leading-snug">N/A</p>
                      <p className=" text-base">
                        <span className=" font-semibold">Member</span> |
                        Chilling guy
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div className=" grid place-content-center">
            <button
              onClick={() => setMoreToggle(!moreToggle)}
              className=" text-black dark:text-white font-bold text-lg"
            >
              {moreToggle ? (
                <div className="flex flex-row justify-center items-center">
                  <span >Less</span> <IoIosArrowUp className="font-bold text-lg ml-2 "/>
                </div>
              ) : (
                <div className="flex flex-row justify-center items-center">
                  <span >More</span> <IoIosArrowDown className="font-bold text-lg ml-2 "/>
                </div>
              )}
            </button>
          </div>
          {moreToggle ? (
            <section className={`bg-inherit py-6 dark:bg-inherit`}>
              <div className="container flex flex-col justify-center p-4 mx-auto">
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 sm:grid-cols-2">
                  {botPhoto.map((b) => (
                    <img
                      className=" blur-sm hover:blur-none object-cover w-full dark:bg-inherit aspect-square"
                      src={`./images/botRin${b}.jpg`}
                    />
                  ))}
                </div>
              </div>
            </section>
          ) : (
            <></>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default GuestPage;

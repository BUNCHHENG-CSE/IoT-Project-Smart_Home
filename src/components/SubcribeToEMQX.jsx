import { useState } from "react";
import Layout from "../layout/Layout";

const SubcribeToEMQX = ({ sub,showSub }) => {
  const [topic, setTopic] = useState("");
  const [qos, setQos] = useState(0);
  const handleSubcribe = (e) => {
    e.preventDefault();
    sub({ topic: topic, qos: qos });
  };
  return (
    <Layout>
      <form
        className=" h-max lg:w-[60%] sm:w-full px-10 py-7 rounded-3xl mt-16 ml-24 sm:mx-2 shadow-lg shadow-zinc-800  dark:shadow-zinc-700  transition-all duration-300 ease hover:shadow-none border border-opacity-0  border-stone-950 hover:border-opacity-100 dark:border-white dark:border-opacity-0 dark:hover:border-opacity-100"
        action=""
      >
        <h1 className="text-black dark:text-white sm:text-[1.2rem]">Connect To EMQX Subcribe</h1>

        {/*Host */}
        <div className="mb-5">
          <label
            htmlFor="topic"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Topic
          </label>
          <input
            type="text"
            id="topic"
            value={topic}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="yourTopic/something..."
            required
            onChange={(e) => setTopic(e.target.value)}
          />
        </div>
        {/*Port */}
        <div className="mb-5">
          <label
            htmlFor="qos"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Port
          </label>
          <input
            type="number"
            id="qos"
            value={qos}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            onChange={(e) => setQos(e.target.value)}
          />
        </div>

        <div className="flex justify-between">
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto lg:w-fit px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={handleSubcribe}
          >
            {showSub? "Subcribed":"Subcribe"}
          </button>
        </div>
      </form>
    </Layout>
  );
};

export default SubcribeToEMQX;

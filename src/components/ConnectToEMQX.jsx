import React, { useState } from "react";
import Layout from "../layout/Layout";

const ConnectToEMQX = ({ connect, disconnect, connectBtn }) => {
  const [protocol, setProtocol] = useState("wss");
  const [host, setHost] = useState("");
  const [port, setPort] = useState("8084");
  const [clientID, setClientID] = useState(
    "emqx_react_" + Math.random().toString(16).substring(2, 8)
  );
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleConnect = (e) => {
    e.preventDefault();
    const url = `${protocol}://${host}:${port}/mqtt`;
    const options = {
      clientID,
      username,
      password,
      clean: true,
      reconnectPeriod: 1000, // ms
      connectTimeout: 30 * 1000, // ms
    };
    // console.log(url);
    // console.log(options);
    connect(url, options);
    //console.log(connect)
    //submit();
  };

  const handleDisconnect = (e) => {
    e.preventDefault();
    alert("disconnect")
    console.log("disconnect");
    disconnect();
    setProtocol("wss")
    setPort("8084")
    setHost("")
    setClientID("emqx_react_" + Math.random().toString(16).substring(2, 8))
    setUsername("")
    setPassword("")
  };
  return (
    <Layout>
      <form
        className=" h-max w-[60%] px-10 py-7 rounded-3xl mt-20 shadow-lg shadow-zinc-800  dark:shadow-zinc-700  transition-all duration-300 ease hover:shadow-none border border-opacity-0  border-stone-950 hover:border-opacity-100 dark:border-white dark:border-opacity-0 dark:hover:border-opacity-100"
        action=""
      >
        <h1 className="text-black dark:text-white">Connect to EMQX</h1>
        {/*Protocol */}
        <div className="mb-5 mt-10">
          <label
            htmlFor="protocol"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Protocol
          </label>
          <select
            id="protocol"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={protocol}
            onChange={(e) => setProtocol(e.target.value)}
          >
            {/* <option selected>Choose a protocol</option> */}
            <option value="wss">wss</option>
            <option value="ws">ws</option>
          </select>
        </div>
        {/*Host */}
        <div className="mb-5">
          <label
            htmlFor="host"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Host
          </label>
          <input
            type="text"
            id="host"
            value={host}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="broker.emqx.io"
            required
            onChange={(e) => setHost(e.target.value)}
          />
        </div>
        {/*Port */}
        <div className="mb-5">
          <label
            htmlFor="host"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Port
          </label>
          <input
            type="text"
            id="host"
            value={port}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="broker.emqx.io"
            required
            onChange={(e) => setHost(e.target.value)}
          />
        </div>
        {/*Client ID */}
        <div className="mb-5">
          <label
            htmlFor="clientid"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Client ID
          </label>
          <input
            type="text"
            id="clientid"
            value={clientID}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="client_react"
            required
            onChange={(e) => setClientID(e.target.value)}
          />
        </div>
        {/*Username */}
        <div className="mb-5">
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="admin"
            required
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        {/*Password */}
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="flex justify-between">
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={handleConnect}
          >
            {connectBtn}
          </button>
          <button
            className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            onClick={handleDisconnect}
          >
            Disconnect
          </button>
        </div>
        <h3 className=" text-red-800">
          ***Note:: protocol: wss = port: 8084 | protocol: ws = port: 8083
        </h3>
      </form>
    </Layout>
  );
};

export default ConnectToEMQX;

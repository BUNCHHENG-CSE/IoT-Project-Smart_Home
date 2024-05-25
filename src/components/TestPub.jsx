import React from "react";
import Layout from "../layout/Layout";

const TestPub = ({ publish, payload, sub }) => {
  let data = {
    topic: "esp32/smarthome",
    qos: 0,
    payload: JSON.stringify({ message: "1" }),
  };
  let res = {
    topic: "esp32/smarthome",
    qos: 0,
  };
  console.log(publish);
  console.log(payload);
  return (
    <>
    <Layout>
    <h1>Testpub</h1>
      <button onClick={() => sub(res)}>subcribe</button>
      <hr />
      <button className=" bg-yellow-400 mr-7" onClick={() => publish(data)}>click</button>
    </Layout>
     
    </>
  );
};

export default TestPub;

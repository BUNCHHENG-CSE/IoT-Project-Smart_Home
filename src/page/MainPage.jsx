import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import mqtt from "mqtt";
import ControlLedFirstFloor from "./ControlLedFirstFloor";
import ControlLedSecondFloor from "./ControlLedSecondFloor";
import Temperature from "./Temperature";
import ControlFan from "./ControlFan";
import ConnectToEMQX from "../components/ConnectToEMQX";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import SubcribeToEMQX from "../components/SubcribeToEMQX";
import ControlDoor from "./ControlDoor";
import Garden from "./Garden";
import SignTracking from "./SignTracking";

const MainPage = ({ token }) => {
  const [client, setClient] = useState(null);
  const [isSubed, setIsSub] = useState(false);
  const [payload, setPayload] = useState({});
  const [connectStatus, setConnectStatus] = useState("Connect");
  const [payloadDataKey, setPayloadDataKey] = useState([]);
 // const [payloadDataValue, setPayloadDataValue] = useState([]);
  const mqttConnect = (host, mqttOption) => {
    setConnectStatus("Connecting...");
    setClient(mqtt.connect(host, mqttOption));
  };

  useEffect(() => {
    if (client) {
      client.on("connect", () => {
        setConnectStatus("Connected");
        console.log("connection successfull");
        toast.info("Connect successfull to EMQX Platform ", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          font: "Poppins",
        });
      });
      client.on("error", (err) => {
        console.error("Connection error: ", err);
        client.end();
      });
      client.on("reconnect", () => {
        setConnectStatus("Reconnecting");
      });
      client.on("message", (topic, message) => {
        const payload = { topic, message: message.toString() };
        setPayload(payload);
        if (payload.topic) {
          setPayloadDataKey(Object.keys(JSON.parse(payload.message)));
         // setPayloadDataValue(Object.values(JSON.parse(payload.message)));
          if (payloadDataKey[2] === "fire") {
            for (i = 0; i < 3; i++) {
              toast.error("Fire !!!", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                font: "Poppins",
              });
            }
            setTempDataValue([]);
            setTempDataKey([]);
          }
        }
        console.log(`received message: ${message} from topic: ${topic}`);
      });
    }
  }, [client]);

  const mqttDisconnect = () => {
    if (client) {
      try {
        client.end(false, () => {
          setConnectStatus("Connect");
          console.log("disconnected successfully");
          
        });
      } catch (error) {
        console.log("disconnect error:", error);
      }
    }
  };

  const mqttPublish = (context) => {
    if (client) {
      // topic, QoS & payload for publishing message
      const { topic, qos, payload } = context;
      client.publish(topic, payload, { qos }, (error) => {
        if (error) {
          console.log("Publish error: ", error);
        }
      });
    }
  };

  const mqttSub = (subscription) => {
    if (client) {
      // topic & QoS for MQTT subscribing
      const { topic, qos } = subscription;
      // subscribe topic
      // https://github.com/mqttjs/MQTT.js#mqttclientsubscribetopictopic-arraytopic-object-options-callback
      client.subscribe(topic, { qos }, (error) => {
        if (error) {
          console.log("Subscribe to topics error", error);
          return;
        }
        console.log(`Subscribe to topics: ${topic}`);
        setIsSub(true);
      });
    }
  };

  const mqttUnSub = (subscription) => {
    if (client) {
      const { topic, qos } = subscription;
      client.unsubscribe(topic, { qos }, (error) => {
        if (error) {
          console.log("Unsubscribe error", error);
          return;
        }
        console.log(`unsubscribed topic: ${topic}`);
        setIsSub(false);
      });
    }
  };
  return (
    <>
      <ToastContainer
        className="w-[55%] h-[2rem] text-[1.15rem] font-extrabold"
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        stacked
      />
      <Routes>
        <Route
          path="/"
          element={
            <ControlLedFirstFloor publish={mqttPublish} payload={payload} />
          }
        />
        <Route
          path="/secondfloor"
          element={
            <ControlLedSecondFloor publish={mqttPublish} payload={payload} />
          }
        />
        <Route path="/about" element={<h1>Not found</h1>} />
        <Route
          path="/temperature"
          element={<Temperature payload={payload} />}
        />
        <Route
          path="/controlfan"
          element={<ControlFan publish={mqttPublish} payload={payload} />}
        />
        <Route
          path="/controldoor"
          element={<ControlDoor publish={mqttPublish} payload={payload} />}
        />
        <Route
          path="/garden"
          element={<Garden publish={mqttPublish} payload={payload} />}
        />
        <Route
          path="/signtracking"
          element={<SignTracking publish={mqttPublish} />}
        />

        <Route
          path="/connect"
          element={
            <ConnectToEMQX
              connect={mqttConnect}
              disconnect={mqttDisconnect}
              connectBtn={connectStatus}
            />
          }
        />
        <Route
          path="/subcribe"
          element={<SubcribeToEMQX sub={mqttSub} showSub={isSubed} />}
        />
      </Routes>
    </>
  );
};

export default MainPage;

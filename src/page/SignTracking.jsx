// Import dependencies
import { useRef, useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import Webcam from "react-webcam";
import { drawRect } from "../Utils";
import Layout from "../layout/Layout";

const SignTracking = ({ publish }) => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [func, setFunc] = useState();
  const [component, setComponent] = useState();
  const [ledb1ON, setLedB1ON] = useState(0);
  const [doorON, setDoorON] = useState(0);
  const [fanb1ON, setFanB1ON] = useState(0);
  const [ledb1OFF, setLedB1OFF] = useState(0);
  const [doorOFF, setDoorOFF] = useState(0);
  const [fanb1OFF, setFanB1OFF] = useState(0);
  const [getText, setGetText] = useState();
  // Main function
  const runCoco = async () => {
    const net = await tf.loadGraphModel(
      "https://tensorflowrealtimesigntracking.s3.jp-tok.cloud-object-storage.appdomain.cloud/model.json"
    );

    //  Loop and detect hands
    setInterval(() => {
      detect(net);
    }, 16.7);
  };
  useEffect(() => {
    if (getText === "Open" && ledb1ON === 0) {
      console.log("Led Bedroom 1 ON");
      publish({
        topic: "esp32/smarthome",
        qos: 0,
        payload: JSON.stringify({
          led: "ON5",
        }),
      });
      setLedB1ON(1);
      setLedB1OFF(0);
      setDoorOFF(0);
      setDoorON(0);
      setFanB1OFF(0);
      setFanB1ON(0);
    } else if (getText === "One" && ledb1OFF === 0) {
      console.log("Led Bedroom 1 OFF");
      publish({
        topic: "esp32/smarthome",
        qos: 0,
        payload: JSON.stringify({
          led: "OFF5",
        }),
      });
      setLedB1ON(0);
      setLedB1OFF(1);
      setDoorOFF(0);
      setDoorON(0);
      setFanB1OFF(0);
      setFanB1ON(0);
    } else if (getText === "Two" && doorON === 0) {
      console.log("Door ON");

      publish({
        topic: "esp32/smarthome",
        qos: 0,
        payload: JSON.stringify({
          door: "ON2",
        }),
      });
      setLedB1ON(0);
      setLedB1OFF(0);
      setDoorOFF(0);
      setDoorON(1);
      setFanB1OFF(0);
      setFanB1ON(0);
    } else if (getText === "Three" && doorOFF === 0) {
      console.log("Door OFF");
      publish({
        topic: "esp32/smarthome",
        qos: 0,
        payload: JSON.stringify({
          door: "OFF2",
        }),
      });
      setLedB1ON(0);
      setLedB1OFF(0);
      setDoorOFF(1);
      setDoorON(0);
      setFanB1OFF(0);
      setFanB1ON(0);
    } else if (getText === "Four" && fanb1ON === 0) {
      console.log("Fan Bedroom 1 ON");
      publish({
        topic: "esp32/smarthome",
        qos: 0,
        payload: JSON.stringify({
          fan: "ON2",
        }),
      });
      setLedB1ON(0);
      setLedB1OFF(0);
      setDoorOFF(0);
      setDoorON(0);
      setFanB1OFF(0);
      setFanB1ON(1);
    } else if (getText === "Five" && fanb1OFF === 0) {
      console.log("Fan Bedroom 1 OFF");
      publish({
        topic: "esp32/smarthome",
        qos: 0,
        payload: JSON.stringify({
          fan: "OFF2",
        }),
      });
      setLedB1ON(0);
      setLedB1OFF(0);
      setDoorOFF(0);
      setDoorON(0);
      setFanB1OFF(1);
      setFanB1ON(0);
    } else {
      console.log("Testing");
      setLedB1ON(0);
      setLedB1OFF(0);
      setDoorOFF(0);
      setDoorON(0);
      setFanB1OFF(0);
      setFanB1ON(0);
    }
  }, [getText]);
  const getLabel = (l) => {
    setGetText(l);
  };
  const detect = async (net) => {
    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // 4. TODO - Make Detections
      const img = tf.browser.fromPixels(video);
      const resized = tf.image.resizeBilinear(img, [640, 480]);
      const casted = resized.cast("int32");
      const expanded = casted.expandDims(0);
      const obj = await net.executeAsync(expanded);

      const boxes = await obj[3].array(); // 3
      const classes = await obj[5].array(); // 5
      const scores = await obj[1].array(); // 1

      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");

      // 5. TODO - Update drawing utility
      // drawSomething(obj, ctx)
      requestAnimationFrame(() => {
        drawRect(
          boxes[0],
          classes[0],
          scores[0],
          0.88,
          videoWidth,
          videoHeight,
          ctx,
          getLabel
        );
      });

      tf.dispose(img);
      tf.dispose(resized);
      tf.dispose(casted);
      tf.dispose(expanded);
      tf.dispose(obj);
    }
  };

  useEffect(() => {
    runCoco();
  }, []);

  return (
    <Layout>
      <div className="bg-inherit dark:bg-inherit h-full w-[95%] ">
        <header className="h-full  sm:w-[50%] mx-5 mt-5 flex flex-col items-center justify-center text-white font-[calc(10px + 2vmin)]">
          <Webcam
            ref={webcamRef}
            muted={true}
            style={{
              position: "absolute",
              marginLeft: "auto",
              marginRight: "auto",
              left: 0,
              right: 0,
              textAlign: "center",
              zindex: 9,
              width: 640,
              height: 480,
            }}
          />

          <canvas
            ref={canvasRef}
            style={{
              position: "absolute",
              marginLeft: "auto",
              marginRight: "auto",
              left: 0,
              right: 0,
              textAlign: "center",
              zindex: 8,
              width: 640,
              height: 480,
            }}
          />
        </header>
      </div>
    </Layout>
  );
};

export default SignTracking;

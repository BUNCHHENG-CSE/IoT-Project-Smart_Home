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
  const getLabel = (l) => {
    if (l == "Close" || l == "Open") {
      setComponent("");
      setFunc(l);
    } else if (func == "Close" && l !== "Close") {
      setComponent(l);
    } else if (func == "Open" && l !== "Open") {
      setComponent(l);
    }
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
     // console.log(obj);

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
          0.7,
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
  useEffect(() => {
    if (func === "Close") {
      if (component === "One") {
        console.log("Close One")
        // publish({
        //   topic: "esp32/smarthome",
        //   qos: 0,
        //   payload: JSON.stringify({
        //     window: "OFF",
        //   }),
        // });
      } else if (component === "Two") {
        console.log("Close Two")
        // publish({
        //   topic: "esp32/smarthome",
        //   qos: 0,
        //   payload: JSON.stringify({
        //     window: "OFF",
        //   }),
        // });
      } else if (component === "Three") {
        console.log("Close Three")
        // publish({
        //   topic: "esp32/smarthome",
        //   qos: 0,
        //   payload: JSON.stringify({
        //     window: "OFF",
        //   }),
        // });
      } else if (component === "Four") {
        console.log("Close Four")
        // publish({
        //   topic: "esp32/smarthome",
        //   qos: 0,
        //   payload: JSON.stringify({
        //     window: "OFF",
        //   }),
        // });
      } else if (component === "Five") {
        console.log("Close Five")
        // publish({
        //   topic: "esp32/smarthome",
        //   qos: 0,
        //   payload: JSON.stringify({
        //     window: "OFF",
        //   }),
        // });
      }
    } else if (func === "Open") {
      if (component === "One") {
        console.log("Open One")
        // publish({
        //   topic: "esp32/smarthome",
        //   qos: 0,
        //   payload: JSON.stringify({
        //     window: "ON",
        //   }),
        // });
      } else if (component === "Two") {
        console.log("Open Two")
        // publish({
        //   topic: "esp32/smarthome",
        //   qos: 0,
        //   payload: JSON.stringify({
        //     window: "ON",
        //   }),
        // });
      } else if (component === "Three") {
        console.log("Open Three")
        // publish({
        //   topic: "esp32/smarthome",
        //   qos: 0,
        //   payload: JSON.stringify({
        //     window: "ON",
        //   }),
        // });
      } else if (component === "Four") {
        console.log("Open Four")
        // publish({
        //   topic: "esp32/smarthome",
        //   qos: 0,
        //   payload: JSON.stringify({
        //     window: "ON",
        //   }),
        // });
      } else if (component === "Five") {
        console.log("Open Five")
        // publish({
        //   topic: "esp32/smarthome",
        //   qos: 0,
        //   payload: JSON.stringify({
        //     window: "ON",
        //   }),
        // });
      }
    }
  }, [func, component]);
  return (
    <Layout>
      <div className="bg-inherit dark:bg-inherit h-full w-[85%]">
        <header className="h-[90%] lg:w-[80%] sm:w-[50%] mx-5 mt-5 flex flex-col items-center justify-center text-white font-[calc(10px + 2vmin)]">
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

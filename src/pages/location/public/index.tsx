import { useRef, useState, useEffect } from "react";
// import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert";
import { useParams } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";

import { IData } from "../../../services/api/interfaces";
import { RadialChart } from "../components/RadialChart";
const Location = () => {
  const params = useParams();
  const deviceId = params.id || "";
  const socketRef = useRef<Socket | null>(null);
  const [realTimeData, setRealTimeData] = useState<IData>();
  useEffect(() => {
    socketRef.current = io(
      `${import.meta.env.VITE_SOCKET_URL}/publicDevices/${deviceId}`
    );
    socketRef.current.on("connect", () =>
      console.log("socket connected yay from location public")
    );
    socketRef.current.on("disconnect", () => console.log("disconnected"));
    socketRef.current.on("data", (data: IData) => {
      console.log(data);
      setRealTimeData(data);
    });

    return () => {
      socketRef.current?.off("connect", () => console.log("connected"));
      socketRef.current?.off("disconnect", () => console.log("disconnected"));
    };
  }, []);
  return (
    <div className="container flex items-start justify-center mx-auto px-4 md:px-6 py-8 pt-[10rem] min-h-[100vh]">
      <div className="">
        <div className="w-full flex justify-between mb-3">
          <h1 className="text-xl font-bold mb-4">
            Real time statistics on the GO !
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-4">
          <RadialChart
            value={realTimeData?.AQI || 0}
            readType={"AQI"}
            readKey="AQI"
          />
          <RadialChart
            value={realTimeData?.dustPercentage || 0}
            readType={"Pollution Percentage"}
            readKey="dustPercentage"
          />
          <RadialChart
            value={realTimeData?.temperatureC || 0}
            readType={"Temperature °C"}
            readKey="temperatureC"
          />
          <RadialChart
            value={realTimeData?.humidity || 0}
            readType={"Humidity Percentage"}
            readKey="humidity"
          />
        </div>
      </div>
    </div>
  );
};
export default Location;

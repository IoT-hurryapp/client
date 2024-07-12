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
          <h1 className="text-xl font-bold mb-4">قراءات متعددة بشكل لحظي</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-4">
          <div>
            <RadialChart
              value={realTimeData?.AQI || 0}
              readType={"فهرس جودة الهواء"}
              readKey="AQI"
            />
            <div className="flex items justify-center gap-2 p-3 m-0">
              <p className="bg-emerald-500 p-1 rounded-sm text-sm font-bold text-white">
                0-100
              </p>
              <p className="bg-yellow-500 p-1 rounded-sm text-sm font-bold text-white">
                101-200
              </p>
              <p className="bg-red-500 p-1 rounded-sm text-sm font-bold text-white">
                201-300
              </p>
              <p className="bg-red-600 p-1 rounded-sm text-sm font-bold text-white">
                301-500
              </p>
            </div>
          </div>
          <div>
            <RadialChart
              value={realTimeData?.dustPercentage || 0}
              readType={"نسبة التلوث"}
              readKey="dustPercentage"
            />
            <div className="flex items justify-center gap-2 p-3 m-0">
              <p className="bg-emerald-500 p-1 rounded-sm text-sm font-bold text-white">
                0-100
              </p>
              <p className="bg-yellow-500 p-1 rounded-sm text-sm font-bold text-white">
                101-200
              </p>
              <p className="bg-red-500 p-1 rounded-sm text-sm font-bold text-white">
                201-300
              </p>
              <p className="bg-red-600 p-1 rounded-sm text-sm font-bold text-white">
                301-500
              </p>
            </div>
          </div>
          <div>
            <RadialChart
              value={realTimeData?.temperatureC || 0}
              readType={"الحرارة °C"}
              readKey="temperatureC"
            />
            <div className="flex items justify-center gap-2 p-3 m-0">
              <p className="bg-sky-400 p-1 rounded-sm text-sm font-bold text-white">
                0
              </p>
              <p className="bg-emerald-500 p-1 rounded-sm text-sm font-bold text-white">
                0-16
              </p>
              <p className="bg-yellow-500 p-1 rounded-sm text-sm font-bold text-white">
                17-32
              </p>
              <p className="bg-red-500 p-1 rounded-sm text-sm font-bold text-white">
                40-60
              </p>
            </div>
          </div>
          <div>
            <RadialChart
              value={realTimeData?.humidity || 0}
              readType={"نسبة الرطوبة"}
              readKey="humidity"
            />
            <div className="flex items justify-center gap-2 p-3 m-0">
              <p className="bg-emerald-500 p-1 rounded-sm text-sm font-bold text-white">
                0-25
              </p>
              <p className="bg-yellow-500 p-1 rounded-sm text-sm font-bold text-white">
                25-50
              </p>
              <p className="bg-red-500 p-1 rounded-sm text-sm font-bold text-white">
                50-75
              </p>
              <p className="bg-red-600 p-1 rounded-sm text-sm font-bold text-white">
                75-100
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Location;

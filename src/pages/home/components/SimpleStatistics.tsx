import { Card, CardContent } from "../../../components/ui/card";
import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { IData } from "../../../services/api/interfaces";
import NumberTicker from "../../../components/magic-ui/number-ticker";

export default function Component() {
  const [realTimeData, setRealTimeData] = useState<IData>();
  const socketRef = useRef<Socket | null>(null);
  useEffect(() => {
    socketRef.current = io(
      `${import.meta.env.VITE_SOCKET_URL}/publicDevices/2`,
      {
        autoConnect: true,
      }
    );
    socketRef.current.on("connect", () => console.log("socket connected yay"));
    socketRef.current.on("disconnect", () => console.log("disconnected"));
    socketRef.current.on("data", (data: IData) => {
      setRealTimeData(data);
    });

    return () => {
      socketRef.current?.off("connect", () => console.log("connected"));
      socketRef.current?.off("disconnect", () => console.log("disconnected"));
      socketRef.current?.off("data", () => console.log("disconnect data"));
    };
  }, []);
  return (
    <div className="w-full max-w-4xl mx-auto py-12 md:py-16 lg:py-20 px-4 md:px-6 z-[100]">
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold">
            جودة الهواء من حولك
            <span> (Baghdad)</span>
          </h1>
          <p className="text-muted-foreground mt-2 max-w-md mx-auto">
            لمحة بسيطة عن جودة الهواء الموجودة حاليا في موقعك
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 justify-center gap-10">
          <Card className="">
            <CardContent className="flex flex-col items-center justify-center p-6 min-w-fit">
              {/* <ThermometerIcon className="w-8 h-8 text-primary" /> */}
              <div className="sm:text-3xl md:text-4xl font-bold mt-2">
                <NumberTicker value={realTimeData?.temperatureC || 1} />
                °C
              </div>
              <p className="text-muted-foreground text-sm mt-2 min-w-fit text-center text-nowrap">
                الحرارة
              </p>
            </CardContent>
          </Card>
          <Card className="px-4">
            <CardContent className="flex flex-col items-center justify-center p-6">
              {/* <CloudFogIcon className="w-8 h-8 text-primary" /> */}
              <div className="sm:text-3xl md:text-4xl font-bold mt-2">
                <NumberTicker value={realTimeData?.humidity || 1} />%
              </div>
              <p className="text-muted-foreground text-sm mt-2 min-w-fit text-center text-wrap">
                الرطوبة
              </p>
            </CardContent>
          </Card>
          <Card className="px-4">
            <CardContent className="flex flex-col items-center justify-center p-6">
              {/* <CloudFogIcon className="w-8 h-8 text-primary" /> */}
              <div className="sm:text-3xl md:text-4xl font-bold mt-2">
                <NumberTicker value={realTimeData?.dustPercentage || 1} />%
              </div>
              <p className="text-muted-foreground text-sm mt-2 min-w-fit text-center text-nowrap">
                نسبة التلوث
              </p>
            </CardContent>
          </Card>
          <Card className="px-4">
            <CardContent className="flex flex-col items-center justify-center p-6">
              {/* <CloudFogIcon className="w-8 h-8 text-primary" /> */}
              <div className="sm:text-3xl md:text-4xl font-bold mt-2">
                <NumberTicker value={realTimeData?.AQI || 1} />
              </div>
              <p className="text-muted-foreground text-sm mt-2 min-w-fit text-center text-nowrap">
                فهرس جودة الهواء
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

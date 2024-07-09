import { Card, CardContent } from "../../../components/ui/card";
import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { IData } from "../../../services/api/interfaces";
import NumberTicker from "../../../components/magic-ui/number-ticker";

export default function Component() {
  const [realTimeData, setRealTimeData] = useState<IData>();
  const socketRef = useRef<Socket | null>(null);
  useEffect(() => {
    socketRef.current = io(import.meta.env.VITE_SOCKET_URL);
    socketRef.current.on("connect", () => console.log("socket connected"));
    socketRef.current.on("disconnect", () => console.log("disconnected"));
    socketRef.current.on(`data-1`, (data: IData) => {
      console.log(data);
      setRealTimeData(data);
    });
    return () => {
      socketRef.current?.off("connect", () => console.log("connected"));
      socketRef.current?.off("disconnect", () => console.log("disconnected"));
    };
  }, []);
  return (
    <div className="w-full max-w-4xl mx-auto py-12 md:py-16 lg:py-20 px-4 md:px-6 z-[100]">
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold">
            Air Quality Around You
            <span> (Baghdad)</span>
          </h1>
          <p className="text-muted-foreground mt-2 max-w-md mx-auto">
            An overview of the key air quality metrics for your location.
          </p>
        </div>
        <div className="grid grid-cols-4 justify-center gap-10">
          <Card className="">
            <CardContent className="flex flex-col items-center justify-center p-6 min-w-fit">
              {/* <ThermometerIcon className="w-8 h-8 text-primary" /> */}
              <div className="text-4xl font-bold mt-2">
                <NumberTicker value={realTimeData?.temperatureC || 1} />
                °C
              </div>
              <p className="text-muted-foreground text-sm mt-2 min-w-fit text-center text-nowrap">
                Current Temperature
              </p>
            </CardContent>
          </Card>
          <Card className="px-4">
            <CardContent className="flex flex-col items-center justify-center p-6">
              {/* <CloudFogIcon className="w-8 h-8 text-primary" /> */}
              <div className="text-4xl font-bold mt-2">
                <NumberTicker value={realTimeData?.humidity || 1} />%
              </div>
              <p className="text-muted-foreground text-sm mt-2 min-w-fit text-center text-wrap">
                Humidity
              </p>
            </CardContent>
          </Card>
          <Card className="px-4">
            <CardContent className="flex flex-col items-center justify-center p-6">
              {/* <CloudFogIcon className="w-8 h-8 text-primary" /> */}
              <div className="text-4xl font-bold mt-2">
                <NumberTicker value={realTimeData?.dustPercentage || 1} />%
              </div>
              <p className="text-muted-foreground text-sm mt-2 min-w-fit text-center text-nowrap">
                Dust percentage
              </p>
            </CardContent>
          </Card>
          <Card className="px-4">
            <CardContent className="flex flex-col items-center justify-center p-6">
              {/* <CloudFogIcon className="w-8 h-8 text-primary" /> */}
              <div className="text-4xl font-bold mt-2">
                <NumberTicker value={realTimeData?.AQI || 1} />%
              </div>
              <p className="text-muted-foreground text-sm mt-2 min-w-fit text-center text-nowrap">
                Air quality index
              </p>
            </CardContent>
          </Card>
        </div>
        {/* <div>
          <Alert className="">
            <Rocket className="h-4 w-4" />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>
              {realTimeData?.mq135_statys || "0"}
            </AlertDescription>
          </Alert>
        </div> */}
        {/* <div>
          <h2 className="text-2xl font-bold mb-4">Additional Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Forecast</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  The weather forecast for the next 5 days shows a mix of sun
                  and clouds, with a chance of rain on Wednesday.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>UV Index</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  The current UV index is 6, which is considered moderate. It's
                  recommended to wear sunscreen when spending time outdoors.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Pollen Count</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  The pollen count is currently high, which may cause issues for
                  those with allergies. It's a good idea to check the pollen
                  forecast before going outside.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Air Quality</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  The air quality index is currently in the "good" range,
                  indicating that the air is clean and safe to breathe.
                </p>
              </CardContent>
            </Card>
          </div>
        </div> */}
      </div>
    </div>
  );
}

import { useRef, useState, useEffect, useMemo } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../shadcn-components/ui/card";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "../shadcn-components/ui/alert";

// <<<<<<< HEAD
import { useParams } from "react-router-dom";
import {
  getDeviceDataQuery,
  getLocationQuery,
} from "../services/queries/locations";
import { io, Socket } from "socket.io-client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../shadcn-components/ui/select";
import Loader from "../components/Loader";
// import {  } from "../services/api/locations";
import DataLogs from "../components/DataLogs";
import { Rocket } from "lucide-react";
interface IDeviceData {
  connectedDevicesId: string;
  createdAt: Date;
  deviceId: null;
  dust_concentration: number;
  humidity: number;
  id: string;
  mq135_statys: "GOOD" | "MODERATE" | "DANGEROUS";
  mq135_value: string;
  temperature_c: string;
  temperature_f: string;
}

const Location = () => {
  const params = useParams();
  const locationId = params.id || "";
  const location = getLocationQuery(locationId);
  const socketRef = useRef<Socket | null>(null);
  const [realTimeData, setRealTimeData] = useState<IDeviceData>();
  const [deviceId, selectDeviceId] = useState("1");
  const analysisData = getDeviceDataQuery(locationId, deviceId);
  useEffect(() => {
    socketRef.current = io("http://localhost:2020");
    socketRef.current.on("connect", () => console.log("socket connected"));
    socketRef.current.on("disconnect", () => console.log("disconnected"));
    socketRef.current.on(`data-${deviceId}`, (data: IDeviceData) => {
      setRealTimeData(data);
    });
    return () => {
      socketRef.current?.off("connect", () => console.log("connected"));
      socketRef.current?.off("disconnect", () => console.log("disconnected"));
    };
  }, []);
  if (location.isLoading) {
    return <Loader />;
  }
  if (analysisData.isLoading) {
    return <Loader />;
  }
  return (
    <div className="container mx-auto px-4 md:px-6 py-8 pt-[10rem]">
      <div>
        <div className="w-full flex justify-between mb-3">
          <h1 className="text-xl font-bold mb-4">
            Real time statistics on the GO !
          </h1>
          <SelectDevices
            selectDeviceId={selectDeviceId}
            devicesList={location.data?.devices as any}
          />
        </div>
        <div>
          {realTimeData?.mq135_statys && (
            <Alert
              className={`border-${
                realTimeData?.mq135_statys === "GOOD" ? "emerald" : "red"
              }-300 mb-8`}
            >
              <Rocket className="h-4 w-4" />
              <AlertTitle>Heads up!</AlertTitle>
              <AlertDescription>{realTimeData?.mq135_statys}</AlertDescription>
            </Alert>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Pollution Levels</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">
                <span className="text-primary">
                  {realTimeData?.dust_concentration}
                </span>
                <span className="text-muted-foreground text-lg">/100</span>
              </div>
              <p className="text-muted-foreground">Current pollution index</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Air Quality Index</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">
                <span className="text-primary">
                  {realTimeData?.mq135_value}
                </span>
                <span className="text-muted-foreground text-lg">/100</span>
              </div>
              <p className="text-muted-foreground">Current air quality index</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Temprnature</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">
                <span className="text-primary">
                  {realTimeData?.temperature_c}
                </span>
                <span className="text-muted-foreground text-lg">°C</span>
              </div>
              <p className="text-muted-foreground">Current Temperature</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Humidity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">
                <span className="text-primary">{realTimeData?.humidity}</span>
                <span className="text-muted-foreground text-lg">%</span>
              </div>
              <p className="text-muted-foreground">Current Humidity rate</p>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="w-full  mt-8">
        <h2 className="text-xl font-bold mb-4">Detailed Visualizations</h2>
        <div className="w-full">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Pollution Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <DataLogs data={analysisData.data?.slice(0, 50) || []} />
            </CardContent>
          </Card>
        </div>
      </div>
      <div></div>
    </div>
  );
};
export function SelectDevices({
  devicesList,
  selectDeviceId,
}: {
  devicesList: Array<{
    id: string;
    connectedDevicesId: number;
    locationId: string;
  }>;
  selectDeviceId: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <Select onValueChange={(value) => selectDeviceId(value)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a device" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Devices</SelectLabel>
          {devicesList?.map((device) => (
            <SelectItem value={device.connectedDevicesId.toString()}>
              #{device.connectedDevicesId}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
export default Location;

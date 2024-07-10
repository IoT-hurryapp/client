import { useRef, useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "../../components/ui/card";
// import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { useParams } from "react-router-dom";
import {
  getDeviceDataQuery,
  getLocationQuery,
} from "../../services/queries/locations";
import { io, Socket } from "socket.io-client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import Loader from "../../components/Loader";
import DataLogs from "./components/DataLogs";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";

import { Button } from "../../components/ui/button";
import { AreaChart } from "./components/AreaChart";
import { IData } from "../../services/api/interfaces";
import { SelectDevices } from "./components/SelectDevices";
import { RadialChart } from "./components/RadialChart";
import jsCookie from "js-cookie";
import csvHeaders from "../../constants/csvHeaders";
import { File } from "lucide-react";
import ExportCSV from "./components/ExportCSV";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { DialogFooter, DialogHeader } from "../../components/ui/dialog";

const Location = () => {
  const params = useParams();
  const locationId = params.id || "";
  const location = getLocationQuery(locationId);
  const socketRef = useRef<Socket | null>(null);
  const [page, setPage] = useState(1);
  const [tempUnit, setTempUnit] = useState<"°C" | "°F">("°C");
  const [realTimeData, setRealTimeData] = useState<IData>();
  const defaultDeviceId = location.data?.devices[0].id;
  const [selectedDevice, setSelectedDevice] = useState(defaultDeviceId || "");
  const [isDownloadReady, setIsDownloadReady] = useState(false);
  const [csvData, setCsvData] = useState<Array<{}>>([{}]);
  const analysisData = getDeviceDataQuery({
    locationId,
    deviceId: defaultDeviceId || "",
    page,
  });
  useEffect(() => {
    if (defaultDeviceId) {
      const token = jsCookie.get("access_token");
      socketRef.current = io(
        `${import.meta.env.VITE_SOCKET_URL}/devices/${
          selectedDevice || defaultDeviceId
        }`,
        {
          auth: {
            token,
          },
          autoConnect: true,
        }
      );
      socketRef.current.on("connect", () =>
        console.log("socket connected yay")
      );
      socketRef.current.on("disconnect", () => console.log("disconnected"));
      socketRef.current.on("data", (data: IData) => {
        setRealTimeData(data);
      });
      console.log(socketRef.current);
    }
    return () => {
      socketRef.current?.off("connect", () => console.log("connected"));
      socketRef.current?.off("disconnect", () => console.log("disconnected"));
    };
  }, [defaultDeviceId]);
  if (location.isLoading || analysisData.isLoading) {
    return <Loader />;
  }
  const handleDownloadCSV = () => {
    let newData: Array<{}> = [];
    analysisData.data?.data.forEach((entry: any) => {
      let filteredEntry: any = {};
      csvHeaders.forEach((header: { label: string; key: string }) => {
        if (!entry[header.key] && entry[header.key] !== 0) return;
        filteredEntry[header.key] = entry[header.key];
      });
      newData.push(filteredEntry);
    });
    setCsvData(newData);
    setIsDownloadReady(true);
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-8 pt-[10rem]">
      <div>
        <div className="w-full flex justify-between mb-3">
          <h1 className="text-xl font-bold mb-4">
            Real time statistics on the GO !
          </h1>
          <SelectDevices
            selectDeviceId={setSelectedDevice}
            devicesList={location.data?.devices as any}
          />
        </div>
        <Tabs defaultValue="radial" className="w-full">
          <TabsList className="grid grid-cols-2 w-[300px]">
            <TabsTrigger value="radial">Radial</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
            {/* <TabsTrigger value="notifications">Notifications</TabsTrigger> */}
          </TabsList>
          <TabsContent value="radial" className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-4">
              <RadialChart
                value={realTimeData?.dustPercentage || 0}
                readType={"Pollution Levels"}
              />
              <RadialChart
                value={realTimeData?.AQI || 0}
                readType={"Air quality index"}
              />
              <RadialChart
                value={realTimeData?.temperatureC || 0}
                readType={"Temperature c"}
              />
              <RadialChart
                value={realTimeData?.humidity || 0}
                readType={"Humidity Levels"}
              />
            </div>
          </TabsContent>
          <TabsContent value="analysis">
            <AreaChart />
          </TabsContent>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Pollution Levels</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">
                <span className="text-primary">
                  {realTimeData?.dustPercentage || 0}
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
                <span className="text-primary">{realTimeData?.AQI || 0}</span>
                <span className="text-muted-foreground text-lg">/100</span>
              </div>
              <p className="text-muted-foreground">Current air quality index</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between flex-row">
                Temperature
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button variant={"secondary"} className="max-h-9 ml-auto">
                      {tempUnit}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setTempUnit("°C")}>
                      °C
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTempUnit("°F")}>
                      °F
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">
                <span className="text-primary">
                  {(tempUnit === "°C"
                    ? realTimeData?.temperatureC
                    : realTimeData?.temperatureF) || 0}
                </span>
                <span className="text-muted-foreground text-lg">
                  {tempUnit === "°C" ? "°C" : "°F"}
                </span>
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
                <span className="text-primary">
                  {realTimeData?.humidity || 0}
                </span>
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
            <CardHeader className="w-full flex flex-row items-center justify-between">
              <CardTitle>Pollution Logs</CardTitle>
              <div>
                <Button
                  onClick={handleDownloadCSV}
                  size="sm"
                  variant="outline"
                  className="h-8 gap-1"
                >
                  <File className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Export
                  </span>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <DataLogs data={analysisData.data?.data || []} />
              <div className="lg:w-[70%] flex justify-between items-center mx-auto mt-4">
                <Button
                  onClick={() => setPage((prev) => prev - 1)}
                  className="px-8"
                  variant={"outline"}
                  disabled={page === 1}
                >
                  Prev
                </Button>
                <span className="text-sm font-medium opacity-50">
                  Current page {page}
                </span>
                <Button
                  onClick={() => setPage((prev) => prev + 1)}
                  className="px-8"
                  variant={"outline"}
                  disabled={page === analysisData.data?.pages}
                >
                  Next
                </Button>
              </div>
            </CardContent>
          </Card>
          <Dialog onOpenChange={setIsDownloadReady} open={isDownloadReady}>
            <DialogTrigger asChild>
              <Button className="sr-only" variant="default">
                Download
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Your link is ready</DialogTitle>
                <DialogDescription>
                  go ahead and download it !
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4"></div>
              <DialogFooter>
                <DialogClose asChild>
                  <ExportCSV
                    isDownloadReady={isDownloadReady}
                    setIsDownloadReady={setIsDownloadReady}
                    csvData={csvData}
                    filename={`page-${page}-${new Date()}`}
                  />
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};
export default Location;

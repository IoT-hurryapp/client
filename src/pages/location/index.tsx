import { useRef, useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/ui/card";
// import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert";
import { useParams } from "react-router-dom";
import {
  getDeviceDataQuery,
  getLocationQuery,
} from "../../services/queries/locations";
import { io, Socket } from "socket.io-client";
import Loader from "../../components/Loader";
import DataLogs from "./components/DataLogs";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";

import { Button } from "../../components/ui/button";
import AreaChart from "./components/AreaChart";
import { IData } from "../../services/api/interfaces";
import { SelectDevices } from "./components/SelectDevices";
import { RadialChart } from "./components/RadialChart";
import jsCookie from "js-cookie";
import csvHeaders from "../../constants/csvHeaders";
import { File } from "lucide-react";
import ExportCSV from "./components/ExportCSV";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { DialogHeader } from "../../components/ui/dialog";
import { DataReadingKey } from "../../interfaces/global";
const Location = () => {
  const params = useParams();
  const locationId = params.id || "";
  const location = getLocationQuery(locationId);
  const socketRef = useRef<Socket | null>(null);
  const [page, setPage] = useState(1);
  const [realTimeData, setRealTimeData] = useState<IData>();
  const defaultDeviceId = location.data?.devices[0].id;
  const [selectedDevice, setSelectedDevice] = useState(defaultDeviceId || "");
  const [chartKey, setChartKey] = useState<DataReadingKey>("AQI");
  const [csvData, setCsvData] = useState<Array<{}>>([]);
  const [isDownloadReady, setIsDownloadReady] = useState(false);
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
    }
    return () => {
      socketRef.current?.off("connect", () => console.log("connected"));
      socketRef.current?.off("disconnect", () => console.log("disconnected"));
    };
  }, [defaultDeviceId]);
  if (location.isLoading || analysisData.isLoading) {
    return <Loader />;
  }
  const dataToCSV = () => {
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
          <h1 className="text-xl font-bold mb-4">قراءات متعددة بشكل لحظي</h1>
          <SelectDevices
            selectDeviceId={setSelectedDevice}
            devicesList={location.data?.devices as any}
          />
        </div>
        <Tabs defaultValue="radial" className="w-full">
          <TabsList className="grid grid-cols-2 w-[300px]">
            <TabsTrigger value="radial">القراءات</TabsTrigger>
            <TabsTrigger value="graph">المخطط البياني</TabsTrigger>
          </TabsList>
          <TabsContent value="radial" className="w-full">
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
                  <p className="bg-sky-500 p-1 rounded-sm text-sm font-bold text-white">
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
          </TabsContent>
          <TabsContent value="graph">
            <AreaChart
              chartKey={chartKey}
              setChartKey={setChartKey}
              data={(analysisData.data?.data || []).map((entry) => ({
                month: new Date(entry.createdAt).toLocaleString("default", {
                  month: "long",
                }),
                [chartKey]: entry[chartKey],
              }))}
              config={{
                [chartKey]: {
                  label: chartKey,
                  color: "hsl(var(--chart-1))",
                },
              }}
            />
          </TabsContent>
        </Tabs>
      </div>
      <div className="w-full mt-8">
        <div className="w-full">
          <Dialog onOpenChange={setIsDownloadReady} open={isDownloadReady}>
            <DialogTrigger asChild>
              <Button className="sr-only" variant="default">
                حمل الفايل
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader className="ml-auto mt-5">
                <DialogTitle className="ml-auto">حمل الفايل</DialogTitle>
                <DialogDescription>
                  رابط التحميل الخاص بك جاهز
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <ExportCSV
                  csvData={csvData}
                  setIsDownloadReady={setIsDownloadReady}
                  isDownloadReady={isDownloadReady}
                  filename={`page-${page}-${new Date()}`}
                />
              </div>
            </DialogContent>
          </Dialog>
          <Card className="w-full">
            <CardHeader className="w-full flex flex-row items-center justify-between">
              <CardTitle>تاريخ القراءات</CardTitle>
              <Button
                onClick={dataToCSV}
                size="sm"
                variant="outline"
                className="h-8 gap-1"
              >
                <File className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  صدر CSV
                </span>
              </Button>
            </CardHeader>
            <CardContent>
              <DataLogs data={analysisData.data?.data || []} />
              <div className="lg:w-[70%] flex justify-between items-center mx-auto mt-4">
                <Button
                  onClick={() => setPage((prev) => prev - 1)}
                  className="sm:text-[.75rem] md:text-sm md:px-8"
                  variant={"outline"}
                  disabled={page === 1}
                >
                  السابق
                </Button>
                <span className="text-sm font-medium opacity-50">
                  الصفحة الحالية {analysisData.data?.pages}/{page}
                </span>
                <Button
                  onClick={() => setPage((prev) => prev + 1)}
                  className="sm:text-[.75rem] md:text-sm md:px-8"
                  variant={"outline"}
                  disabled={page === analysisData.data?.pages}
                >
                  التالي
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default Location;

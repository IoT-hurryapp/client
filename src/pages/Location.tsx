import { useRef, useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../shadcn-components/ui/card";
import { ResponsiveLine } from "@nivo/line";
import { useParams } from "react-router-dom";
import { getLocationQuery } from "../services/queries/locations";
import { io, Socket } from "socket.io-client";
interface IDeviceData {
  id: string;
  humidity: number;
  temperature_c: number;
  temperature_f: number;
  mq135_value: number;
  dust_concentration: number;
}
const Location = () => {
  const params = useParams();
  const locationId = params.id || "";
  const getLocation = getLocationQuery(locationId);
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  useEffect(() => {
    console.log("connect the socket");

    socketRef.current = io("http://192.168.45.159:2020");
    socketRef.current.connect();
    socketRef.current.on("connect", () => console.log("connect"));
    socketRef.current.on("disconnect", () => setIsConnected(false));
    socketRef.current.on(
      "data-089477f2-5249-4e58-b105-03ee8178b7c8" || `data-${"device id"}`,
      (data: IDeviceData) => {
        console.log(data);
      }
    );
    console.log(isConnected);

    return () => {
      socketRef.current?.off("connect", () => setIsConnected(true));
      socketRef.current?.off("disconnect", () => setIsConnected(false));
    };
  }, []);
  return (
    <div className="container mx-auto px-4 md:px-6 py-8 pt-[10rem]">
      <div>
        <h1 className="text-xl font-bold mb-4">Statistics on the GO !</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Pollution Levels</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">
                <span className="text-primary">42</span>
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
                <span className="text-primary">87</span>
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
                <span className="text-primary">4.2</span>
                <span className="text-muted-foreground text-lg">tons/day</span>
              </div>
              <p className="text-muted-foreground">Current CO2 emission rate</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Humidity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">
                <span className="text-primary">4.2</span>
                <span className="text-muted-foreground text-lg">tons/day</span>
              </div>
              <p className="text-muted-foreground">Current CO2 emission rate</p>
            </CardContent>
          </Card>
        </div>
      </div>
      <div>
        <h2 className="text-xl font-bold mt-8 mb-4">Real time statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Pollution Levels</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">
                <span className="text-primary">42</span>
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
                <span className="text-primary">87</span>
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
                <span className="text-primary">4.2</span>
                <span className="text-muted-foreground text-lg">tons/day</span>
              </div>
              <p className="text-muted-foreground">Current CO2 emission rate</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Humidity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">
                <span className="text-primary">4.2</span>
                <span className="text-muted-foreground text-lg">tons/day</span>
              </div>
              <p className="text-muted-foreground">Current CO2 emission rate</p>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Detailed Visualizations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Pollution Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <LineChart className="aspect-[4/3]" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Air Quality Map</CardTitle>
            </CardHeader>
            <CardContent>
              <LineChart className="aspect-[4/3]" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

function LineChart(props: any) {
  return (
    <div {...props}>
      <ResponsiveLine
        data={[
          {
            id: "Desktop",
            data: [
              { x: "Jan", y: 43 },
              { x: "Feb", y: 137 },
              { x: "Mar", y: 61 },
              { x: "Apr", y: 145 },
              { x: "May", y: 26 },
              { x: "Jun", y: 154 },
            ],
          },
          {
            id: "Mobile",
            data: [
              { x: "Jan", y: 60 },
              { x: "Feb", y: 48 },
              { x: "Mar", y: 177 },
              { x: "Apr", y: 78 },
              { x: "May", y: 96 },
              { x: "Jun", y: 204 },
            ],
          },
        ]}
        margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
        xScale={{
          type: "point",
        }}
        yScale={{
          type: "linear",
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 5,
          tickPadding: 16,
        }}
        colors={["#2563eb", "#e11d48"]}
        pointSize={6}
        useMesh={true}
        gridYValues={6}
        theme={{
          tooltip: {
            chip: {
              borderRadius: "9999px",
            },
            container: {
              fontSize: "12px",
              textTransform: "capitalize",
              borderRadius: "6px",
            },
          },
          grid: {
            line: {
              stroke: "#f3f4f6",
            },
          },
        }}
        role="application"
      />
    </div>
  );
}

export default Location;

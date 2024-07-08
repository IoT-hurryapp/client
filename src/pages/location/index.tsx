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
	DropdownMenuLabel,
	DropdownMenuSeparator,
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
// import {  } from "../services/api/locations";
import DataLogs from "./components/DataLogs";
import { Rocket } from "lucide-react";
import { RadialChart } from "./components/RadialChart";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "../../components/ui/tabs";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { AreaChart } from "./components/AreaChart";
import { IData } from "../../services/api/interfaces";
import { DataTableDemo } from "./components/Table";

const Location = () => {
	const params = useParams();
	const locationId = params.id || "";
	const location = getLocationQuery(locationId);
	const socketRef = useRef<Socket | null>(null);
	const [realTimeData, setRealTimeData] = useState<IData>();
	const [deviceId, selectDeviceId] = useState("1");
	const analysisData = getDeviceDataQuery(locationId, deviceId);
	useEffect(() => {
		socketRef.current = io(import.meta.env.VITE_SOCKET_URL);
		socketRef.current.on("connect", () => console.log("socket connected"));
		socketRef.current.on("disconnect", () => console.log("disconnected"));
		socketRef.current.on(`data-${deviceId}`, (data: IData) => {
			console.log(data);
			setRealTimeData(data);
		});
		return () => {
			socketRef.current?.off("connect", () => console.log("connected"));
			socketRef.current?.off("disconnect", () =>
				console.log("disconnected")
			);
		};
	}, []);
	if (location.isLoading || analysisData.isLoading) {
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
				<Tabs defaultValue="radial" className="w-full">
					<TabsList className="grid grid-cols-3 w-[400px]">
						<TabsTrigger value="radial">Radial</TabsTrigger>
						<TabsTrigger value="analysis">Analysis</TabsTrigger>
						<TabsTrigger value="notifications">Notifications</TabsTrigger>
					</TabsList>
					<TabsContent value="radial" className="w-full">
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-4">
							<RadialChart />
							<RadialChart />
							<RadialChart />
							<RadialChart />
						</div>
					</TabsContent>
					<TabsContent value="analysis">
						<AreaChart />
					</TabsContent>
					<TabsContent value="notifications">
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
								<span className="text-muted-foreground text-lg">
									/100
								</span>
							</div>
							<p className="text-muted-foreground">
								Current pollution index
							</p>
						</CardContent>
					</Card>
					<Card>
						<CardHeader>
							<CardTitle>Air Quality Index</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="text-4xl font-bold">
								<span className="text-primary">
									{realTimeData?.AQI || 0}
								</span>
								<span className="text-muted-foreground text-lg">
									/100
								</span>
							</div>
							<p className="text-muted-foreground">
								Current air quality index
							</p>
						</CardContent>
					</Card>
					<Card>
						<CardHeader>
							<CardTitle className="flex justify-between flex-row">
								Temperature{" "}
								<DropdownMenu>
									<DropdownMenuTrigger>
										<Button
											variant={"secondary"}
											className="max-h-9 ml-auto"
										>
											°C
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent>
										<DropdownMenuItem>°C</DropdownMenuItem>

										<DropdownMenuItem>°F</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="text-4xl font-bold">
								<span className="text-primary">
									{realTimeData?.temperatureC || 0}
								</span>
								<span className="text-muted-foreground text-lg">
									°C
								</span>
							</div>
							<p className="text-muted-foreground">
								Current Temperature
							</p>
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
								<span className="text-muted-foreground text-lg">
									%
								</span>
							</div>
							<p className="text-muted-foreground">
								Current Humidity rate
							</p>
						</CardContent>
					</Card>
				</div>
			</div>
			<div className="w-full  mt-8">
				<h2 className="text-xl font-bold mb-4">
					Detailed Visualizations
				</h2>
				<div className="w-full">
					<Card className="w-full">
						<CardHeader>
							<CardTitle>Pollution Logs</CardTitle>
						</CardHeader>
						<CardContent>
							{/* <DataLogs
								data={analysisData.data?.slice(0, 50) || []}
							/> */}
							<DataTableDemo />
						</CardContent>
					</Card>
				</div>
			</div>
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
						<SelectItem
							value={device.connectedDevicesId.toString()}
						>
							#{device.connectedDevicesId}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}
export default Location;

/**
 * 	<div>
					{realTimeData?.mq135_statys && (
						<Alert
							className={`border-${
								realTimeData?.mq135_statys === "GOOD"
									? "emerald"
									: "red"
							}-300 mb-8`}
						>
							<Rocket className="h-4 w-4" />
							<AlertTitle>Heads up!</AlertTitle>
							<AlertDescription>
								{realTimeData?.mq135_statys}
							</AlertDescription>
						</Alert>
					)}
				</div>
 */

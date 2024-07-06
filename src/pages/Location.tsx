import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
} from "../shadcn-components/ui/card";
import { ResponsiveLine } from "@nivo/line";
import axios from "axios";
import { Flashlight, Lightbulb, Sparkle } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const Location = () => {
	const [loading, setLoading] = useState(true);
	const [location, setLocation] = useState();

	useEffect(() => {
		let config = {
			method: "get",
			maxBodyLength: Infinity,
			url: "http://localhost:5050/locations/33c30af4-22a0-4c85-b514-9a0e322c92a1",
		};

		axios
			.request(config)
			.then((response) => {
				setLocation(response.data);
				setLoading(false);
				console.log(JSON.stringify(response.data, null, 2));
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);
  const {id} = useParams();
	return loading ? (
		"Loading..."
	) : (
		<div className="container mx-auto px-4 md:px-6 py-8 pt-[10rem]">
			<div>
				<h1 className="text-4xl font-bold mb-4">{location.name}</h1>

				{location.devices.map((device) => (
					<div className="relative flex flex-col bg-clip-border rounded-xl bg-gradient-to-tr from-gray-900 to-gray-800 text-white shadow-gray-900/20 shadow-md w-full max-w-[20rem] p-8">
						<div className="relative pb-8 m-0 mb-8 overflow-hidden text-center text-gray-700 bg-transparent border-b rounded-none shadow-none bg-clip-border border-white/10">
							<h1 className="flex justify-center gap-1 mt-6 font-sans antialiased font-normal tracking-normal text-white text-7xl">
								#{device.connectedDevicesId}
								<span className="self-end text-4xl">
									/device
								</span>
							</h1>
						</div>
						<div className="p-0"></div>
						<div className="p-0">
							<a href={`/locations/${id}/${device.id}`}>
              <button
								className="align-middle text-zi select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm py-3.5 px-7 rounded-lg bg-white text-blue-gray-900 shadow-md shadow-blue-gray-500/10 hover:shadow-lg hover:shadow-blue-gray-500/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none block w-full hover:scale-[1.02] focus:scale-[1.02] active:scale-100"
								type="button"
							>
								Buy Now
							</button>
              </a>
						</div>
					</div>
				))}
			</div>

			<div className="mt-8">
				<h2 className="text-xl font-bold mb-4">
					Detailed Visualizations
				</h2>
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

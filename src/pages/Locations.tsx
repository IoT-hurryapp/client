import React, { useEffect, useState } from "react";
import { Button } from "../shadcn-components/ui/button";
import { Separator } from "../shadcn-components/ui/separator";
import LocationList from "../components/LocationList";
import AddLocationDialog from "../components/AddLocationDialog";
import axios from "axios";
import { Loader } from "lucide-react";
const Locations = () => {
	const [loading, setLoading] = useState(true);
	const [locations, setLocations] = useState([]);
	useEffect(() => {
		axios
			.get("http://localhost:5050/locations", {
				withCredentials: true,
			})
			.then((response) => {
				setLocations(response.data);
				setLoading(false);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	return (
		<section className="pt-[10rem]">
			<div className="container mx-auto px-4 md:px-6">
				<h1 className="text-xl font-bold mb-4">
					Browse and add your locations !
				</h1>
				<AddLocationDialog />
				<Separator className="mt-8" />
				<ul>
					<div className="flex flex-col gap-5">
						{loading
							? "Loading..."
							: locations.map((location) => (
									<a href={"/locations/" + location.id}>
										<div className="flex justify-between bg-slate-200 py-4 px-8 rounded font-bold cursor-pointer">
											<p className="leading-7 ">
												{location.name}
											</p>
											<p className="leading-7 ">
												{location.devices.length == 0
													? "There is no device connected to this locations"
													: `${location.devices.length} device connected`}
											</p>
										</div>
									</a>
							  ))}
					</div>
				</ul>
			</div>
		</section>
	);
};

export default Locations;

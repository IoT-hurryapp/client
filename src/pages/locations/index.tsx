import { useState } from "react";
import { Separator } from "../../components/ui/separator";
// import LocationList from "./components/LocationList";
import AddLocationDialog from "./components/AddLocationDialog";
import {
	getLocationsQuery,
	useAttachDeviceMutation,
	useCreateLocationMutation,
} from "../../services/queries/locations";
import { Loader } from "lucide-react";
import { toast } from "../../components/ui/use-toast";
import { ILocation } from "../../services/api/interfaces";
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";
const Locations = () => {
	const [newLocationName, setNewLocationName] = useState("");
	const [newLocationDevice, setNewLocationDevice] = useState("");
	const createLocationMutation = useCreateLocationMutation();
	const getLocations = getLocationsQuery();
	const attachDeviceMutation = useAttachDeviceMutation();
	if (getLocations.isLoading) {
		return <Loader />;
	}
	if (getLocations.isError) {
		const error = getLocations.error.message;
		toast({
			title: "Erorr while getting locations",
			description: error,
		});
	}
	const handleCreateLocation = async () => {
		if (!newLocationDevice || !newLocationName) return;
		try {
			const creationData = await createLocationMutation.mutateAsync({
				name: newLocationName,
			});
			const attachData = await attachDeviceMutation.mutateAsync({
				locationId: creationData.id || "",
				deviceId: newLocationDevice,
			});
			setNewLocationDevice("");
			setNewLocationName("");
		} catch (err) {
			console.log(err);
			toast({
				title: "Erorr while getting devices",
				description: "Try again",
			});
		}
	};

	/**
	 * 1. name
	 * 2. notifications
	 * 3. devices connected
	 */

	return (
		<section className="pt-[10rem] container">
			<div className="w-[95%]">
				<h1 className="text-xl font-bold mb-4">
					Browse and add your locations !
				</h1>
				<AddLocationDialog
					handleCreateLocation={handleCreateLocation}
					newLocationName={newLocationName}
					setNewLocationName={setNewLocationName}
					setNewLocationDevice={setNewLocationDevice}
				/>
				<Separator className="mt-8" />
				<ul className="space-y-4">
					<LocationsList locations={getLocations.data || []} />
				</ul>
			</div>
		</section>
	);
};
export default Locations;

function LocationsList({ locations }: { locations: ILocation[] }) {
	return (
		<ul
			role="list"
			className="divide-y divide-gray-100 dark:divide-gray-800"
		>
			{locations.map((location) => (
				<Link to={"/locations/" + location.id}>
					<li
						key={location.id}
						className="flex justify-between gap-x-6 py-5 hover:bg-gray-800 px-5 rounded cursor-pointer transition-colors"
					>
						<div className="flex min-w-0 gap-x-4">
							{/* <img
							alt=""
							src={person.imageUrl}
							className="h-12 w-12 flex-none rounded-full bg-gray-50"
						/> */}
							<div className="min-w-0 flex-auto">
								<p className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-200">
									{location.name}
								</p>
								<p className="mt-1 truncate text-xs leading-5 text-gray-500 dark:text-gray-400">
									10 notifications
								</p>
							</div>
						</div>
						<div className="shrink-0 flex flex-row items-end gap-5">
							<div className="mt-1 flex items-center gap-x-1.5 h-full">
								<div className="flex-none rounded-full bg-emerald-500/20 p-1">
									<div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
								</div>
								<p className="text-xs leading-5 text-gray-500 dark:text-gray-400">
									10 Online devices
								</p>
							</div>
						</div>
					</li>
				</Link>
			))}
		</ul>
	);
}

import React, { useState } from "react";
import { Separator } from "../shadcn-components/ui/separator";
import LocationList from "../components/LocationList";
import AddLocationDialog from "../components/AddLocationDialog";
// <<<<<<< HEAD
import {
  getDevicesQuery,
  getLocationsQuery,
  useAttachDeviceMutation,
  useCreateLocationMutation,
} from "../services/queries/locations";
import { Loader } from "lucide-react";
import { toast } from "../shadcn-components/ui/use-toast";
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
  return (
    <section className="pt-[10rem]">
      <div className="w-[95%] mx-auto px-4 md:px-6">
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
          {getLocations.data?.map(({ name, id }) => (
            <LocationList key={id} id={id} name={name} />
          ))}
        </ul>
      </div>
    </section>
  );
};
export default Locations;

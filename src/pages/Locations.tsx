import { useState } from "react";
import { Button } from "../shadcn-components/ui/button";
import { Separator } from "../shadcn-components/ui/separator";
import LocationList from "../components/LocationList";
import AddLocationDialog from "../components/AddLocationDialog";
import {
  getLocationsQuery,
  useCreateLocationMutation,
} from "../services/queries/locations";
import { Loader } from "lucide-react";
import { toast } from "../shadcn-components/ui/use-toast";
const Locations = () => {
  const [newLocationName, setNewLocationName] = useState("");
  const [devicesList, setDevicesList] = useState<Array<string>>([]);
  const createLocationMutation = useCreateLocationMutation();
  const dummy = [
    "location one",
    "location one",
    "location one",
    "location one",
    "location one",
  ];
  const getLocations = getLocationsQuery();
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
  const handleCreateLocation = () => {
    createLocationMutation.mutate({ name: newLocationName });
  };
  if (createLocationMutation.isSuccess) {
    toast({
      title: "Sucess",
      description: "Location was created successfully",
    });
  }
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
        />
        <Separator className="mt-8" />
        <ul className="space-y-4">
          {dummy.map((title: string) => (
            <LocationList title={title} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Locations;

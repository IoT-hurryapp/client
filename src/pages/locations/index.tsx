import { lazy, useState } from "react";
import { Separator } from "../../components/ui/separator";
import {
  getLocationsQuery,
  useAttachDeviceMutation,
  useCreateLocationMutation,
} from "../../services/queries/locations";
import { Loader } from "lucide-react";
import { toast } from "../../components/ui/use-toast";
import LocationsList from "./components/LocationList";
const AddLocationDialog = lazy(() => import("./components/AddLocationDialog"));
const AttachDeviceDialog = lazy(
  () => import("./components/AttachDeviceDialog")
);
import LoadWhenNeeded from "../../components/LoadWhenNeeded";
const Locations = () => {
  const getLocations = getLocationsQuery();
  const attachDeviceMutation = useAttachDeviceMutation();
  const createLocationMutation = useCreateLocationMutation();
  const [newLocationName, setNewLocationName] = useState("");
  const [deviceIdToAttach, setDeviceIdToAttach] = useState("");
  const [locationIdToAttachDeviceOn, setLocationIdToAttachDeviceOn] =
    useState("");
  const [openAddLocationDialog, setOpenAddLocationDialog] = useState(false);
  const [openAttachDeviceDialog, setOpenAttachDeviceDialog] = useState(false);
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
  const handleAttachDevice = async () => {
    try {
      if (!deviceIdToAttach || !locationIdToAttachDeviceOn) return;
      const attachData = await attachDeviceMutation.mutateAsync({
        locationId: locationIdToAttachDeviceOn,
        deviceId: deviceIdToAttach,
      });
      if (attachData.success) {
        toast({
          title: "Success",
          description: "The device was added successfully",
        });
      }
      setDeviceIdToAttach("");
    } catch (err) {
      console.log(err);
    }
  };
  const handleCreateLocation = async () => {
    if (!deviceIdToAttach || !newLocationName) return;
    try {
      const creationData = await createLocationMutation.mutateAsync({
        name: newLocationName,
      });
      const attachData = await attachDeviceMutation.mutateAsync({
        locationId: creationData.id || "",
        deviceId: deviceIdToAttach,
      });
      console.log("attach");

      if (attachData.success) {
        toast({
          title: "Success",
          description: "The device was added successfully",
        });
      }
      setNewLocationName("");
      setDeviceIdToAttach("");
    } catch (err) {
      toast({
        title: attachDeviceMutation.isError
          ? "Please check your device id"
          : "Erorr while adding a location",
        description: "Try again",
      });
    }
  };

  return (
    <section className="pt-[10rem] container min-h-[100vh]">
      <div className="w-[95%]">
        <h1 className="text-xl font-bold mb-4">
          Browse and add your locations !
        </h1>
        <LoadWhenNeeded
          setIsVisible={setOpenAddLocationDialog}
          isVisible={openAddLocationDialog}
          buttonText="Add locations"
          buttonClasses="bg-[#16a34a] hover:bg-[#168e42]"
          children={
            <AddLocationDialog
              onOpenChange={setOpenAddLocationDialog}
              open={openAddLocationDialog}
              handleCreateLocation={handleCreateLocation}
              newLocationName={newLocationName}
              deviceIdToAttach={deviceIdToAttach}
              setNewLocationName={setNewLocationName}
              setDeviceIdToAttach={setDeviceIdToAttach}
            />
          }
        />
        <LoadWhenNeeded
          setIsVisible={setOpenAttachDeviceDialog}
          isVisible={openAttachDeviceDialog}
          buttonText="Attach devices"
          buttonClasses="bg-[#16a34a] hover:bg-[#168e42] hidden"
          children={
            <AttachDeviceDialog
              onOpenChange={setOpenAttachDeviceDialog}
              open={openAttachDeviceDialog}
              handleAttachDevice={handleAttachDevice}
              deviceIdToAttach={deviceIdToAttach}
              setDeviceIdToAttach={setDeviceIdToAttach}
            />
          }
        />
        <Separator className="mt-8" />
        <div className="space-y-4 mt-3">
          <LocationsList
            setOpenAttachDeviceDialog={setOpenAttachDeviceDialog}
            locations={getLocations.data || []}
            setLocationIdToAttachDeviceOn={setLocationIdToAttachDeviceOn}
          />
        </div>
      </div>
    </section>
  );
};
export default Locations;

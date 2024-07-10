import { useState } from "react";
import { Separator } from "../../components/ui/separator";
import AddLocationDialog from "./components/AddLocationDialog";
import {
  getLocationsQuery,
  useAttachDeviceMutation,
  useCreateLocationMutation,
} from "../../services/queries/locations";
import { Loader } from "lucide-react";
import { toast } from "../../components/ui/use-toast";
import LocationsList from "./components/LocationList";
import AttachDeviceDialog from "./components/AttachDeviceDialog";
const Locations = () => {
  const [newLocationName, setNewLocationName] = useState("");
  const [deviceIdToAttach, setDeviceIdToAttach] = useState("");
  const createLocationMutation = useCreateLocationMutation();
  const getLocations = getLocationsQuery();
  const attachDeviceMutation = useAttachDeviceMutation();
  const [openAddLocationDialog, setOpenAddLocationDialog] = useState(false);
  const [openAttachDeviceDialog, setOpenAttachDeviceDialog] = useState(false);
  const [locationIdToAttachDeviceOn, setLocationIdToAttachDeviceOn] =
    useState("");
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
        <AddLocationDialog
          onOpenChange={setOpenAddLocationDialog}
          open={openAddLocationDialog}
          handleCreateLocation={handleCreateLocation}
          newLocationName={newLocationName}
          deviceIdToAttach={deviceIdToAttach}
          setNewLocationName={setNewLocationName}
          setDeviceIdToAttach={setDeviceIdToAttach}
        />
        {openAttachDeviceDialog && (
          <AttachDeviceDialog
            onOpenChange={setOpenAttachDeviceDialog}
            open={openAttachDeviceDialog}
            handleAttachDevice={handleAttachDevice}
            deviceIdToAttach={deviceIdToAttach}
            setDeviceIdToAttach={setDeviceIdToAttach}
          />
        )}

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

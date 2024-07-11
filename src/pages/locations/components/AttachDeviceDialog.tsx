import { Button } from "../../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "../../../components/ui/dialog";
import { Label } from "../../../components/ui/label";
import { getDevicesQuery } from "../../../services/queries/locations";
import SelectDevice from "./SelectDevice";
import { Loader } from "lucide-react";
import QrDialog from "./QrDialog";
const AddLocationDialog = ({
  deviceIdToAttach,
  handleAttachDevice,
  setDeviceIdToAttach,
  onOpenChange,
  open,
}: {
  setDeviceIdToAttach: React.Dispatch<React.SetStateAction<string>>;
  handleAttachDevice: () => void;
  deviceIdToAttach: string;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
}) => {
  const getDevices = getDevicesQuery();
  if (getDevices.isLoading) {
    return <Loader />;
  }

  return (
    <Dialog onOpenChange={onOpenChange} open={open} defaultOpen={open}>
      <DialogTrigger asChild className="sr-only">
        <Button variant="default">Add Device</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add device</DialogTitle>
          <DialogDescription>
            Add your device into this location
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 items-center gap-4 relative">
            <div>
              <Label htmlFor="devices">Devices List</Label>
              <SelectDevice
                deviceIdToAttach={deviceIdToAttach}
                list={getDevices.data || []}
                setDeviceIdToAttach={setDeviceIdToAttach}
              />
            </div>
            <div>
              <Label>or use the Qr code</Label>
              <br />

              <QrDialog
                scannedResult={deviceIdToAttach}
                setScannedResult={setDeviceIdToAttach}
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              onClick={handleAttachDevice}
              className="mr-auto"
              type="submit"
            >
              Add
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default AddLocationDialog;

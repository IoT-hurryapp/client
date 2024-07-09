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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Loader } from "lucide-react";
import { useState } from "react";
import QrReader from "./QrReader";
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
              <Label htmlFor="devices" className="">
                Devices List
              </Label>
              <SelectDevice
                deviceIdToAttach={deviceIdToAttach}
                list={getDevices.data || []}
                setDeviceIdToAttach={setDeviceIdToAttach}
              />
            </div>
            <div>
              <Label htmlFor="open-scanner" className="">
                or use the Qr code
              </Label>
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
const QrDialog = ({
  scannedResult,
  setScannedResult,
}: {
  setScannedResult: React.Dispatch<React.SetStateAction<string>>;
  scannedResult: string;
}) => {
  const [openQrCode, setOpenQrCode] = useState(false);
  return (
    <Dialog onOpenChange={setOpenQrCode} open={openQrCode}>
      <DialogTrigger asChild>
        <Button variant="outline">Open qr code</Button>
      </DialogTrigger>
      <DialogContent className="min-w-fit bg-none sm:max-w-[425px] min-h-[50vh]">
        <DialogHeader>
          <DialogTitle className="sr-only">Add device</DialogTitle>
          <DialogDescription className="sr-only">
            select your device name
          </DialogDescription>
        </DialogHeader>
        <QrReader
          scannedResult={scannedResult}
          setScannedResult={setScannedResult}
          setOpenQrCode={setOpenQrCode}
        />
      </DialogContent>
    </Dialog>
  );
};
const SelectDevice = ({
  list,
  setDeviceIdToAttach,
  deviceIdToAttach,
}: {
  deviceIdToAttach: string;
  list: Array<{ id: string }>;
  setDeviceIdToAttach: React.Dispatch<React.SetStateAction<string>>;
}) => {
  console.log(deviceIdToAttach);

  return (
    <Select
      defaultValue={deviceIdToAttach}
      onValueChange={(value) => setDeviceIdToAttach(value)}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a device" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Devices</SelectLabel>
          {list.map((device) => (
            <SelectItem key={device.id} value={device.id}>
              # {device.id}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
export default AddLocationDialog;

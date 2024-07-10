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
import { Input } from "../../../components/ui/input";
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
  newLocationName,
  deviceIdToAttach,
  setNewLocationName,
  handleCreateLocation,
  setDeviceIdToAttach,
  onOpenChange,
  open,
}: {
  newLocationName: string;
  setNewLocationName: React.Dispatch<React.SetStateAction<string>>;
  setDeviceIdToAttach: React.Dispatch<React.SetStateAction<string>>;
  handleCreateLocation: () => void;
  deviceIdToAttach: string;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
}) => {
  const getDevices = getDevicesQuery();
  if (getDevices.isLoading) {
    return <Loader />;
  }

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogTrigger asChild>
        <Button className="bg-[#16a34a] hover:bg-[#168e42]" variant="default">
          Add Locations
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add location</DialogTitle>
          <DialogDescription>
            select your location name and the devices avilable in it
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid items-center gap-4">
            <Label htmlFor="title" className="">
              Title
            </Label>
            <Input
              id="title"
              placeholder="enter a location name"
              value={newLocationName}
              onChange={(e) => setNewLocationName(e.target.value)}
              className="col-span-3"
            />
          </div>
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
              onClick={handleCreateLocation}
              className="w-full bg-[#16a34a] hover:bg-[#168e42]"
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
          <DialogTitle className="sr-only">Add location</DialogTitle>
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
  deviceIdToAttach,
  setDeviceIdToAttach,
}: {
  deviceIdToAttach: string;
  list: Array<{ id: string }>;
  setDeviceIdToAttach: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <Select
      // defaultValue={deviceIdToAttach}
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

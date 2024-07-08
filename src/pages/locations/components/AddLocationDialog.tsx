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
const SelectDevice = ({
  list,
  setNewLocationDevice,
}: {
  list: Array<{ id: string }>;
  setNewLocationDevice: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <Select onValueChange={(value) => setNewLocationDevice(value)}>
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
const AddLocationDialog = ({
  newLocationName,
  setNewLocationName,
  handleCreateLocation,
  setNewLocationDevice,
}: {
  newLocationName: string;
  setNewLocationName: React.Dispatch<React.SetStateAction<string>>;
  setNewLocationDevice: React.Dispatch<React.SetStateAction<string>>;
  handleCreateLocation: () => void;
}) => {
  const getDevices = getDevicesQuery();
  if (getDevices.isLoading) {
    return <Loader />;
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Add Locations</Button>
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
          <div className="grid items-center gap-4">
            <Label htmlFor="devices" className="">
              Devices List
            </Label>
            <SelectDevice
              list={getDevices.data || []}
              setNewLocationDevice={setNewLocationDevice}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              onClick={handleCreateLocation}
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

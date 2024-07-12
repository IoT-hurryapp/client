import { Button } from "../../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "../../../components/ui/dialog";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { getDevicesQuery } from "../../../services/queries/locations";
import { Loader } from "lucide-react";
import SelectDevice from "./SelectDevice";
import QrDialog from "./QrDialog";
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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="ml-auto">
          <DialogTitle className="ml-auto">اضف موقعا</DialogTitle>
          <DialogDescription>
            اضف اسم موقعك و اضف بعدها الاجهزة الخاصة بك
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid items-center gap-4">
            <Label htmlFor="title" className="">
              العنوان
            </Label>
            <Input
              id="title"
              placeholder="اضف اسم الموقع"
              value={newLocationName}
              onChange={(e) => setNewLocationName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-2 items-center gap-4 relative">
            <div>
              <Label htmlFor="devices">الاجهزة</Label>
              <SelectDevice
                deviceIdToAttach={deviceIdToAttach}
                list={getDevices.data || []}
                setDeviceIdToAttach={setDeviceIdToAttach}
              />
            </div>
            <div>
              <Label>او استخدم qr code</Label>
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

export default AddLocationDialog;

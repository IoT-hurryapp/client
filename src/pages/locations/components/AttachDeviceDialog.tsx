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
        <Button variant="default">اضف جهازا</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="ml-auto">
          <DialogTitle className="ml-auto">اضف جهازا</DialogTitle>
          <DialogDescription>اضف جهازك الى هذا الموقع</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
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
              onClick={handleAttachDevice}
              className="w-full bg-[#16a34a] hover:bg-[#168e42]"
              type="submit"
            >
              اضف
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default AddLocationDialog;

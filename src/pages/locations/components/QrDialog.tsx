import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "../../../components/ui/dialog";
import { DialogHeader } from "../../../components/ui/dialog";
import QrReader from "./QrReader";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "../../../components/ui/button";
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
        <DialogHeader className="ml-auto mt-5">
          <DialogTitle className="sr-only">اضف موقعا</DialogTitle>
          <DialogDescription className="sr-only">
            اختر موقعك و من ثم اضف اليه جهازك
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
export default QrDialog;

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { IDevice } from "../../../interfaces/global";

export function SelectDevices({
  devicesList,
  selectDeviceId,
}: {
  devicesList: Array<IDevice>;
  selectDeviceId: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <Select onValueChange={(value) => selectDeviceId(value)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a device" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Devices</SelectLabel>
          {devicesList?.map((device) => (
            <SelectItem key={device.id} value={device.id}>
              #{device.connectedDevicesId}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";

export function SelectDevices({
  devicesList,
  selectDeviceId,
}: {
  devicesList: Array<{
    id: string;
    connectedDevicesId: number;
    locationId: string;
  }>;
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
            <SelectItem
              key={device.connectedDevicesId}
              value={device.connectedDevicesId.toString()}
            >
              #{device.connectedDevicesId}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

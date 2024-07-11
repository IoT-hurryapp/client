import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
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
export default SelectDevice;

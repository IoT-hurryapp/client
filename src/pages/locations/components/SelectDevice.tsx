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
  setNewLocationDevice,
  newLocationDevice,
}: {
  newLocationDevice: string;
  list: Array<{ id: string }>;
  setNewLocationDevice: React.Dispatch<React.SetStateAction<string>>;
}) => {
  console.log(newLocationDevice);

  return (
    <Select
      defaultValue={newLocationDevice}
      onValueChange={(value) => setNewLocationDevice(value)}
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

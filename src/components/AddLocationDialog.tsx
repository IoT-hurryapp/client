import { Button } from "../shadcn-components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../shadcn-components/ui/dialog";
import { Input } from "../shadcn-components/ui/input";
import { Label } from "../shadcn-components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../shadcn-components/ui/select";
export function SelectDemo({ list }: { list: Array<string> }) {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Devices</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

const AddLocationDialog = () => {
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
            <Input id="title" value="Pedro Duarte" className="col-span-3" />
          </div>
          {/* <div className="grid items-center gap-4">
            <Label htmlFor="devices" className="">
              Devices List
            </Label>
            <SelectDemo list={[""]} />
          </div> */}
        </div>
        <DialogFooter>
          <Button className="mr-auto" type="submit">
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default AddLocationDialog;

import React, { useState } from "react";
import { Button } from "../shadcn-components/ui/button";
import { Separator } from "../shadcn-components/ui/separator";
import LocationList from "../components/LocationList";
import AddLocationDialog from "../components/AddLocationDialog";
const Locations = () => {
  const [newLocationTitle, setNewLocationTitle] = useState("");
  const [devicesList, setDevicesList] = useState<Array<string>>([]);
  const dummy = [
    "location one",
    "location one",
    "location one",
    "location one",
    "location one",
  ];
  return (
    <section className="pt-[10rem]">
      <div className="container mx-auto px-4 md:px-6">
        <h1 className="text-xl font-bold mb-4">
          Browse and add your locations !
        </h1>
        <AddLocationDialog />
        <Separator className="mt-8" />
        <ul>
          {dummy.map((title: string) => (
            <LocationList title={title} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Locations;

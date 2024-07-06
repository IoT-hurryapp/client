import React from "react";
import { Button } from "../shadcn-components/ui/button";
import { Separator } from "../shadcn-components/ui/separator";
import LocationList from "../components/LocationList";
const Locations = () => {
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
        <Button>Add new location</Button>
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

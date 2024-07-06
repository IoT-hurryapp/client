import React from "react";
import { Button } from "../shadcn-components/ui/button";
import { Separator } from "../shadcn-components/ui/Separator";
const Locations = () => {
  return (
    <section className="pt-[10rem]">
      <div className="container mx-auto px-4 md:px-6">
        <h1 className="text-xl font-bold mb-4">
          Browse and add your locations !
        </h1>
        <Button>Add new location</Button>
      </div>
      <Separator />
    </section>
  );
};

export default Locations;

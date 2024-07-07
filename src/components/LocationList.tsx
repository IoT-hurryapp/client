import React from "react";
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardFooter,
} from "../shadcn-components/ui/card";
import { Link } from "react-router-dom";
const LocationList = ({ name, id }: { id: string; name: string }) => {
  return (
    <Card className="w-full">
      <CardHeader className="sr-only">
        <CardTitle>Card title</CardTitle>
      </CardHeader>
      <CardContent className="w-full flex items-center justify-between p-3 px-8">
        <div className="flex items-center justify-center h-fit p-0 pt-0">
          <Link className="hover:underline" to={`/location/${id}`}>
            <span>{name}</span>
          </Link>
        </div>
        {/* <div>
          <Button className="h-fit" variant={"destructive"}>
            Delete
          </Button>
        </div> */}
      </CardContent>
    </Card>
  );
};
export default LocationList;

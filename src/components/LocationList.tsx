import React from "react";
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardFooter,
} from "../shadcn-components/ui/card";
import { Button } from "../shadcn-components/ui/button";
const LocationList = ({ title }: { title: string }) => {
  return (
    <Card className="w-full">
      <CardHeader className="sr-only">
        <CardTitle>Card title</CardTitle>
      </CardHeader>
      <CardContent className="w-full flex items-center justify-between p-3 px-8">
        <div className="flex items-center justify-center h-fit p-0 pt-0">
          <p>{title}</p>
          <span>Icon</span>
        </div>
        <div>
          <Button className="h-fit" variant={"destructive"}>
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
export default LocationList;

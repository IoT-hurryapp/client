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
    <Card className="w-full flex items-center justify-between">
      <CardHeader className="sr-only">
        <CardTitle>Card title</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        <p>{title}</p>
        <span>Icon</span>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <Button variant={"destructive"}>Delete</Button>
      </CardFooter>
    </Card>
  );
};
export default LocationList;

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "../shadcn-components/ui/alert";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../shadcn-components/ui/card";
import { Rocket } from "lucide-react";
export default function Component() {
  return (
    <div className="w-full max-w-4xl mx-auto py-12 md:py-16 lg:py-20 px-4 md:px-6">
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold">
            Air Quality Around You
            <span> (Baghdad)</span>
          </h1>
          <p className="text-muted-foreground mt-2 max-w-md mx-auto">
            An overview of the key air quality metrics for your location.
          </p>
        </div>
        <div className="flex justify-center gap-10">
          <Card className="px-4">
            <CardContent className="flex flex-col items-center justify-center p-6">
              {/* <ThermometerIcon className="w-8 h-8 text-primary" /> */}
              <div className="text-4xl font-bold mt-2">72°C</div>
              <p className="text-muted-foreground text-sm mt-1">
                Current Temperature
              </p>
            </CardContent>
          </Card>
          <Card className="px-4">
            <CardContent className="flex flex-col items-center justify-center p-6">
              {/* <CloudFogIcon className="w-8 h-8 text-primary" /> */}
              <div className="text-4xl font-bold mt-2">65%</div>
              <p className="text-muted-foreground text-sm mt-1">Humidity</p>
            </CardContent>
          </Card>
        </div>
        <div>
          <Alert className="border-red-400">
            <Rocket className="h-4 w-4" />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>be aware of your surroundings</AlertDescription>
          </Alert>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Additional Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Forecast</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  The weather forecast for the next 5 days shows a mix of sun
                  and clouds, with a chance of rain on Wednesday.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>UV Index</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  The current UV index is 6, which is considered moderate. It's
                  recommended to wear sunscreen when spending time outdoors.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Pollen Count</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  The pollen count is currently high, which may cause issues for
                  those with allergies. It's a good idea to check the pollen
                  forecast before going outside.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Air Quality</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  The air quality index is currently in the "good" range,
                  indicating that the air is clean and safe to breathe.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

// function CloudFogIcon(props : any) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       s

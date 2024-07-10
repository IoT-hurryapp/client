import { Separator } from "../../../components/ui/separator";
import { getLocationsQuery } from "../../../services/queries/locations";
import { Loader } from "lucide-react";
import { toast } from "../../../components/ui/use-toast";
import LocationsList from "../components/LocationList";
const Locations = () => {
  const getLocations = getLocationsQuery();
  if (getLocations.isLoading) {
    return <Loader />;
  }
  if (getLocations.isError) {
    const error = getLocations.error.message;
    toast({
      title: "Erorr while getting locations",
      description: error,
    });
  }
  console.log("hello ?");

  return (
    <section className="pt-[10rem] container min-h-[100vh]">
      <div className="w-[95%]">
        <h1 className="text-xl font-bold mb-4">
          Browse the available public locations !
        </h1>
        <Separator className="mt-8" />
        <div className="space-y-4 mt-3">
          <LocationsList locations={getLocations.data || []} />
        </div>
      </div>
    </section>
  );
};
export default Locations;

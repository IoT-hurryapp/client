import { Separator } from "../../../components/ui/separator";
import { getPublicLocationsQuery } from "../../../services/queries/locations";
import { Loader } from "lucide-react";
import { toast } from "../../../components/ui/use-toast";
import { Link } from "react-router-dom";
const Locations = () => {
  const publicLocations = getPublicLocationsQuery();
  if (publicLocations.isLoading) {
    return <Loader />;
  }
  if (publicLocations.isError) {
    const error = publicLocations.error.message;
    toast({
      title: "Erorr while getting locations",
      description: error,
    });
  }
  return (
    <section className="pt-[10rem] container min-h-[100vh]">
      <div className="w-[95%]">
        <h1 className="text-xl font-bold mb-4">
          Browse the available public locations !
        </h1>
        <Separator className="mt-8" />
        <div className="space-y-4 mt-3">
          <ul>
            {publicLocations.data?.map((location) => (
              <li
                key={location.id}
                className="flex justify-between gap-x-6 py-5 hover:bg-gray-100 hover:dark:bg-gray-800 px-5 rounded cursor-pointer transition-colors"
              >
                <div className="flex min-w-0 gap-x-4">
                  <div className="min-w-0 flex  items-center gap-5">
                    <Link
                      key={location.id}
                      to={`/locations/public/${location.id}`}
                    >
                      <div className="flex items-center gap-3">
                        <p className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-200">
                          {location.name}
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>
                <Link key={location.id} to={`/locations/${location.id}`}>
                  <div className="shrink-0 flex flex-row items-end gap-5">
                    <div className="mt-1 flex items-center gap-x-1.5 h-full">
                      <div className="flex-none rounded-full bg-emerald-500/20 p-1 animate-pulse">
                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      </div>
                      <p className="text-xs leading-5 text-gray-500 dark:text-gray-400">
                        Online devices
                        <span> ({1})</span>
                      </p>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
export default Locations;

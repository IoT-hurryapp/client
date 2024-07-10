import { Link } from "react-router-dom";
import { ILocation } from "../../../interfaces/global";
import { Button } from "../../../components/ui/button";
interface ILocationsListProps {
  locations: ILocation[];
  setOpenAttachDeviceDialog?: React.Dispatch<React.SetStateAction<boolean>>;
  setLocationIdToAttachDeviceOn?: React.Dispatch<React.SetStateAction<string>>;
}
const LocationsList = ({
  locations,
  setOpenAttachDeviceDialog,
  setLocationIdToAttachDeviceOn,
}: ILocationsListProps) => {
  return (
    <ul role="list" className="divide-y divide-gray-100 dark:divide-gray-800">
      {(locations || []).map((location) => (
        <li
          key={location.id}
          className="flex justify-between gap-x-6 py-5 hover:bg-gray-100 hover:dark:bg-gray-800 px-5 rounded cursor-pointer transition-colors"
        >
          <div className="flex min-w-0 gap-x-4">
            <div className="min-w-0 flex  items-center gap-5">
              <Link key={location.id} to={`/locations/${location.id}`}>
                <div className="flex items gap-3 justify-center">
                  <p className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-200">
                    {location.name}
                  </p>
                </div>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500 dark:text-gray-400">
                  <span>{location.notifications.length}</span> notifications
                </p>
              </Link>
              <div>
                {location.devices.length < 1 && (
                  <Button
                    className="text-[.7rem]"
                    variant={"outline"}
                    onClick={() => {
                      setLocationIdToAttachDeviceOn &&
                        setLocationIdToAttachDeviceOn(location.id);
                      setOpenAttachDeviceDialog &&
                        setOpenAttachDeviceDialog(true);
                    }}
                  >
                    Add device
                  </Button>
                )}
              </div>
            </div>
          </div>
          <Link key={location.id} to={`/locations/${location.id}`}>
            <div className="shrink-0 flex flex-row items-end gap-5">
              <div className="mt-1 flex items-center gap-x-1.5 h-full">
                {location.devices.length > 0 ? (
                  <>
                    <div className="flex-none rounded-full bg-emerald-500/20 p-1 animate-pulse">
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    </div>
                    <p className="text-xs leading-5 text-gray-500 dark:text-gray-400">
                      Online devices
                      <span> ({location.devices.length})</span>
                    </p>
                  </>
                ) : (
                  <p className="text-xs leading-5 text-gray-500 dark:text-gray-400">
                    Attach a device
                  </p>
                )}
              </div>
            </div>
          </Link>
        </li>
      ))}
      {locations.length < 1 && (
        <li>
          <span className="text-sm font-semibold opacity-70">
            There is no locations avilable
          </span>
        </li>
      )}
    </ul>
  );
};
export default LocationsList;

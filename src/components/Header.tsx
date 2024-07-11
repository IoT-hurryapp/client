import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Link, useNavigate } from "react-router-dom";
import { X, Menu, Leaf, Bell } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggle";
import { cn } from "../lib/utils";
import React from "react";
import { useLogoutMutation } from "../services/queries/auth";
import { toast } from "./ui/use-toast";
const Header = ({ username }: { username: string }) => {
  const logoutMutation = useLogoutMutation();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const res = await logoutMutation.mutateAsync({});
      if (res.success) {
        toast({
          title: "Success !",
          description: "Logged out successfully!",
        });
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (err) {
      console.log(err);
      toast({
        title: "Error !",
        description: "Error while Logging out!",
      });
    }
  };
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav
        aria-label="Global"
        className="container flex items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <Link to="/" className={`-m-1.5 p-1.5`}>
            <span className="sr-only">Logo</span>
            <Leaf />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <Sheet>
            <SheetTrigger className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
              <span className="sr-only">Open main menu</span>
              <Menu aria-hidden="true" className="h-6 w-6" />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="sr-only">Sheet title</SheetTitle>
                <SheetClose>
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      className="ml-auto -m-2.5 rounded-md p-2.5 text-gray-700"
                    >
                      <span className="sr-only">Close menu</span>
                      <X aria-hidden="true" className="h-6 w-6" />
                    </button>
                  </div>
                </SheetClose>
              </SheetHeader>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-gray-500/10">
                  <div className="space-y-2 py-6"></div>
                  {username ? (
                    <div className="flex flex-col gap-3">
                      <div className="flex w-full justify-between pb-2 border-b">
                        <p className="text-xl">My Account</p>
                        <Notifications />
                      </div>
                      <ul className="flex flex-col gap-2 mt-2">
                        <li className="hover:text-blue-500 hover:underline">
                          <Link to={"/locations"}>Locations</Link>
                        </li>

                        <li className="hover:text-blue-500 hover:underline">
                          <Link to={"/locations/public"}>Public locations</Link>
                        </li>
                        <li>
                          <Button
                            onClick={handleLogout}
                            variant={"destructive"}
                          >
                            logout
                          </Button>
                        </li>
                      </ul>
                    </div>
                  ) : (
                    <div className={`py-6`}>
                      <Link
                        to="/login"
                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      >
                        Log in
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <div className="hidden lg:flex lg:gap-x-12"></div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-4 items-center">
          {username ? (
            <>
              <Dropdown handleLogout={handleLogout} username={username} />
              <Notifications />
            </>
          ) : (
            <Link to={"/login"}>
              <Button variant={"link"}>Login</Button>
            </Link>
          )}
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
};
const Notifications = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <Button variant="outline" size="icon" className="h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink>
              <ul className="grid gap-3 p-6 sm:w-[90vw] md:w-[400px] lg:w-[700px] lg:grid-cols-[.75fr_1fr]">
                <NotificationItem
                  date="Oct 11 at 06:57 p.m."
                  color="red"
                  status="DANGER"
                  title="Baghdad/Iraq"
                >
                  Warning air quality is
                </NotificationItem>
                <NotificationItem
                  date="Oct 11 at 06:57 p.m."
                  color="red"
                  status="DANGER"
                  title="Baghdad/Iraq"
                >
                  Warning air quality is
                </NotificationItem>
                <NotificationItem
                  date="Oct 11 at 06:57 p.m."
                  color="red"
                  status="DANGER"
                  title="Baghdad/Iraq"
                >
                  Warning air quality is
                </NotificationItem>
                {/* <NotificationItem
                  date="Oct 11 at 06:57 p.m."
                  color="red"
                  status="DANGER"
                  title="Baghdad/Iraq"
                >
                  Warning air quality is
                </NotificationItem> */}
                {/* <NotificationItem
                  date="Oct 11 at 06:57 p.m."
                  color="red"
                  status="DANGER"
                  title="Baghdad/Iraq"
                >
                  Warning air quality is
                </NotificationItem>
                <NotificationItem
                  date="Oct 11 at 06:57 p.m."
                  color="red"
                  status="DANGER"
                  title="Baghdad/Iraq"
                >
                  Warning air quality is
                </NotificationItem> */}
                {/* <NotificationItem
                  date="Oct 11 at 06:57 p.m."
                  color="red"
                  status="DANGER"
                  title="Baghdad/Iraq"
                >
                  Warning air quality is
                </NotificationItem>
                <NotificationItem
                  date="Oct 11 at 06:57 p.m."
                  color="red"
                  status="DANGER"
                  title="Baghdad/Iraq"
                >
                  Warning air quality is
                </NotificationItem>
                <NotificationItem
                  date="Oct 11 at 06:57 p.m."
                  color="red"
                  status="DANGER"
                  title="Baghdad/Iraq"
                >
                  Warning air quality is
                </NotificationItem>
                <NotificationItem
                  date="Oct 11 at 06:57 p.m."
                  color="red"
                  status="DANGER"
                  title="Baghdad/Iraq"
                >
                  Warning air quality is
                </NotificationItem>
                <NotificationItem
                  date="Oct 11 at 06:57 p.m."
                  color="red"
                  status="DANGER"
                  title="Baghdad/Iraq"
                >
                  Warning air quality is
                </NotificationItem>
                <NotificationItem
                  date="Oct 11 at 06:57 p.m."
                  color="red"
                  status="DANGER"
                  title="Baghdad/Iraq"
                >
                  Warning air quality is
                </NotificationItem>
                <NotificationItem
                  date="Oct 11 at 06:57 p.m."
                  color="red"
                  status="DANGER"
                  title="Baghdad/Iraq"
                >
                  Warning air quality is
                </NotificationItem> */}
              </ul>
            </NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
const Dropdown = ({
  username,
  handleLogout,
}: {
  username: string;
  handleLogout: () => void;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{username || "Login"}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link to={"/locations"}>Locations</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to={"/locations/public"}>Public locations</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Button onClick={handleLogout} variant={"destructive"}>
            Logout
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export function NotificationItem({
  status,
  children,
  date,
  color,
  ...props
}: Parameters<typeof ListItem>[0] & {
  status: string;
  date: string;
  color: string;
}) {
  return (
    <ListItem {...props}>
      <div className="flex flex-col gap-3">
        <div>
          {children}{" "}
          <span className={`font-bold text-${color}-400`}>{status}</span>
        </div>
        <div className="text-sm leading-none text-zinc-500 font-semibold flex items-center gap-2">
          <div className="w-[6px] h-[6px] rounded bg-blue-500" />
          <div>{date}</div>
        </div>
      </div>
    </ListItem>
  );
}
export const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
export default Header;

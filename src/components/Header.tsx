import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Link } from "react-router-dom";
import { X, Menu, Leaf, Bell } from "lucide-react";
import { Protected } from "./Protected";
import { useAppState } from "../utils/mobx/state";
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
import { observer } from "mobx-react-lite";
import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggle";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { cn } from "../lib/utils";
import React from "react";
const Header = observer(() => {
  const app = useAppState();
  //logout mutation
  return (
    // <NavigationMenuDemo />

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
                  <Protected
                    fallback={<>Loading</>}
                    error={
                      <div className={`py-6`}>
                        <Link
                          to="/login"
                          className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        >
                          Log in
                        </Link>
                      </div>
                    }
                  >
                    <div className="flex flex-col ga-3">
                      <p className="text-xl pb-2 border-b">My Account</p>
                      <ul className="flex flex-col gap-2 mt-2">
                        <li className="hover:text-blue-500 hover:underline">
                          <Link to={"/locations"}>Locations</Link>
                        </li>

                        <li className="hover:text-blue-500 hover:underline">
                          <Link to={"/locations"}>Public locations</Link>
                        </li>
                        <li>
                          <Button variant={"destructive"}>logout</Button>
                        </li>
                      </ul>
                    </div>
                  </Protected>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <div className="hidden lg:flex lg:gap-x-12"></div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-2">
          <Protected
            error={
              <Link to={"/login"}>
                <Button variant={"link"}>Login</Button>
              </Link>
            }
          >
            <Dropdown username={app.auth.user?.username || ""} />
          </Protected>
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
                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[700px] lg:grid-cols-[.75fr_1fr]">
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
                      </NotificationItem>
                      <NotificationItem
                        date="Oct 11 at 06:57 p.m."
                        color="red"
                        status="DANGER"
                        title="Baghdad/Iraq"
                      >
                        Warning air quality is
                      </NotificationItem>
                    </ul>
                  </NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
});
const Dropdown = ({ username }: { username: string }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{username || "H?"}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link to={"/locations"}>Locations</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to={"/locations"}>Public locations</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default Header;

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

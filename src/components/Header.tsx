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
import React, { useEffect, useRef, useState } from "react";
import { useLogoutMutation } from "../services/queries/auth";
import { toast } from "./ui/use-toast";
import { INotification } from "../interfaces/global";
import { Socket, io } from "socket.io-client";
import jsCookie from "js-cookie";
import Loader from "./Loader";
const Header = ({
  username,
  notifications,
}: {
  username: string;
  notifications: INotification[];
}) => {
  const logoutMutation = useLogoutMutation();
  const [isLogoutLoading, setIsLogoutLoading] = useState(false);
  const navigate = useNavigate();
  const handleLogout = async () => {
    setIsLogoutLoading(true);
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
      setIsLogoutLoading(false);
    } catch (err) {
      console.log(err);
      toast({
        title: "Error !",
        description: "Error while Logging out!",
      });
    }
  };
  const socketRef = useRef<Socket | null>(null);
  const [incomingNotifications, setIncomingNotifications] = useState<
    Array<INotification>
  >([]);
  useEffect(() => {
    if (username) {
      const token = jsCookie.get("access_token");
      socketRef.current = io(
        `${import.meta.env.VITE_SOCKET_URL}/notifications`,
        {
          auth: {
            token,
          },
        }
      );
      socketRef.current.on("connect", () =>
        console.log("socket connected yay")
      );
      socketRef.current.on("disconnect", () => console.log("disconnected"));
      socketRef.current.on("notification", (data: INotification) => {
        setIncomingNotifications((prev) => [...prev, data]);
        toast({
          title: data.location.name,
          className: "border-2 border-red-400",
          description: (
            <div className="flex flex-col gap-2">
              <span>{data.title}</span>
              <time dateTime={data.createdAt}>Created at {data.createdAt}</time>
            </div>
          ),
        });
      });
    }
    return () => {
      socketRef.current?.off("connect", () => console.log("connected"));
      socketRef.current?.off("disconnect", () => console.log("disconnected"));
      socketRef.current?.off("notification", () =>
        console.log("disconnect data")
      );
    };
  }, [username]);
  if (isLogoutLoading) {
    return <Loader />;
  }
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav
        aria-label="Global"
        className="container flex items-center justify-between p-6 lg:px-8"
        dir="ltr"
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
                  <span className="sr-only">Close menu</span>
                  <X aria-hidden="true" className="h-6 w-6" />
                </SheetClose>
              </SheetHeader>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-gray-500/10">
                  <div className="space-y-2 py-6"></div>
                  {username ? (
                    <div className="flex flex-col gap-3">
                      <div className="flex w-full justify-between pb-2 border-b">
                        <p className="text-xl">My Account</p>
                        <Notifications notifications={notifications} />
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
              <Notifications
                notifications={[...notifications, ...incomingNotifications]}
              />
            </>
          ) : (
            <Link to={"/login"}>
              <Button variant={"link"}>سجل الدخول</Button>
            </Link>
          )}
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
};
const Notifications = ({
  notifications,
}: {
  notifications: INotification[];
}) => {
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
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <NotificationItem
                      key={notification.id}
                      date={notification.createdAt}
                      color="red"
                      status={notification.status}
                      title={notification.location.name}
                    >
                      {notification.description}
                    </NotificationItem>
                  ))
                ) : (
                  <li>
                    <span className="text-sm font-bold opacity-50">
                      لا تمتلك اي شعارات في اللحظة
                    </span>
                  </li>
                )}
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
        <DropdownMenuLabel>حسابي</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link to={"/locations"}>المواقع</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to={"/locations/public"}>المواقع العامة</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Button onClick={handleLogout} variant={"destructive"}>
            سجل الخروج
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

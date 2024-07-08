import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "./ui/sheet";
import { Link } from "react-router-dom";
import { X, Menu, Leaf } from "lucide-react";
import { Protected } from "./Protected";
import { useAppState } from "../utils/mobx/state";
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
const Header = observer(() => {
	const app = useAppState();
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
								<SheetTitle className="sr-only">
									Sheet title
								</SheetTitle>
								<SheetClose>
									<div className="flex items-center justify-between">
										<button
											type="button"
											className="ml-auto -m-2.5 rounded-md p-2.5 text-gray-700"
										>
											<span className="sr-only">
												Close menu
											</span>
											<X
												aria-hidden="true"
												className="h-6 w-6"
											/>
										</button>
									</div>
								</SheetClose>
							</SheetHeader>
							<div className="mt-6 flow-root">
								<div className="-my-6 divide-y divide-gray-500/10">
									<div className="space-y-2 py-6"></div>
									<Protected
										fallback={<>Loading</>}
										error={
											<div className={`py-6`}>
												<Link
													to="/auth/login"
													className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
												>
													Log in
												</Link>
											</div>
										}
									>
										<div className={`py-6`}>Logged in</div>
									</Protected>
								</div>
							</div>
						</SheetContent>
					</Sheet>
				</div>
				<div className="hidden lg:flex lg:gap-x-12"></div>
				<div className="hidden lg:flex lg:flex-1 lg:justify-end">
					<Protected
						error={
							<Link to={"/auth/login"}>
								<Button variant={'link'}>Login</Button>
							</Link>
						}
					>
						<DropdownMenu>
							<DropdownMenuTrigger>
								{app.auth.user?.username || "H?"}
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuLabel>
									My Account
								</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuItem>Locations</DropdownMenuItem>
								<DropdownMenuItem>
									Public devices
								</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem>Logout</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</Protected>
					<ModeToggle />
				</div>
			</nav>
		</header>
	);
});

export default Header;

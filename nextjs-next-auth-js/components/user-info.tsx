import { auth } from "@/auth";
// import { SignIn, SignOut } from "./auth-component";
import { SignOut } from "./auth-component";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import CustomLink from "./custom-link";

export default async function UserInfo() {
    const session = await auth();
    if (!session?.user) {
        return (
            <CustomLink href="/auth/signin">
                <Button>Sign In</Button>
            </CustomLink>
        )
    }
    return (
        <div className="flex gap-2 items-center">
            <span className="hidden text-sm sm:inline-flex">
                {session.user.email}
            </span>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="relative w-8 h-8 rounded-full">
                        <Avatar className="w-8 h-8">
                            <AvatarImage
                                src={
                                    session.user.image ??
                                    "https://api.dicebear.com/7.x/pixel-art/svg"
                                }
                                alt={session.user.name ?? ""}
                            />
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">
                                {session.user.name}
                            </p>
                            <p className="text-xs leading-none text-muted-foreground">
                                {session.user.email}
                            </p>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuItem className="justify-center">
                        <SignOut />
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
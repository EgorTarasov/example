import { Bell, Settings } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Link, useNavigate } from "@tanstack/react-router";
import { rootStore } from "@/stores/RootStore.ts";

export function Navbar() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await rootStore.logout();
        navigate({
            to: "/login",
        })

    }
    return (
        <nav className="border-b">
            <div className="flex h-16 items-center px-4">
                <Link href="/" className="font-semibold">
                    Larek.tech
                </Link>
                <div className="ml-auto flex items-center space-x-4">
                    <Button variant="ghost" size="icon">
                        <Bell className="h-5 w-5" />
                        <span className="sr-only">Notifications</span>
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                <img
                                    src="https://avatars.githubusercontent.com/u/124599?v=4"
                                    alt="User"
                                    className="rounded-full"
                                    width={32}
                                    height={32}
                                />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56" align="end" forceMount>
                            <DropdownMenuItem asChild>
                                <Link to="/settings" className="flex w-full items-center">
                                    <Settings className="mr-2 h-4 w-4" />
                                    <span>Settings</span>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Button onClick={handleLogout}>
                                    Logout
                                </Button>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </nav>
    )
}
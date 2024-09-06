import Link from "next/link";
import Image from "next/image";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
    navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu"

export default function Header() {
    return (
        <header className="bg-[#FFCC00] text-black h-[110px]">
            <div className="container mx-auto px-4 py-6 flex justify-between items-center">
            <Link href="/">
                <div className="flex items-center space-x-2 cursor-pointer">
                    <Image src="/koempellogo_nieuw.gif" alt="FC Roda Logo" width={50} height={50} className="rounded-full" />
                    <span className="text-2xl font-bold">Koempel</span>
                </div>
            </Link>
                <NavigationMenu>
                    <NavigationMenuList className="flex space-x-4">
                        <NavigationMenuItem>
                            <NavigationMenuLink href="/" className="hover:underline">Home</NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink href="/fotos" className="hover:underline">Foto's</NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink href="/audio" className="hover:underline">Audio</NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink href="/overige" className="hover:underline">Overige</NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                                <NavigationMenuTrigger className="flex items-center space-x-3 pl-0 ml-0">
                                    <span className={"hover:underline" + navigationMenuTriggerStyle()}>Transfers</span>
                                    <NavigationMenuIndicator />
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <NavigationMenuLink href="/transfers/2023-2024" className="block px-4 py-2 hover:bg-gray-100">2023/2024</NavigationMenuLink>
                                    <NavigationMenuLink href="/transfers/2022-2023" className="block px-4 py-2 hover:bg-gray-100">2022/2023</NavigationMenuLink>
                                    <NavigationMenuLink href="/transfers/2021-2022" className="block px-4 py-2 hover:bg-gray-100">2021/2022</NavigationMenuLink>
                                    <NavigationMenuLink href="/transfers/2020-2021" className="block px-4 py-2 hover:bg-gray-100">2020/2021</NavigationMenuLink>
                                    <NavigationMenuLink href="/transfers/2019-2020" className="block px-4 py-2 hover:bg-gray-100">2019/2020</NavigationMenuLink>
                                    <NavigationMenuLink href="/transfers/2018-2019" className="block px-4 py-2 hover:bg-gray-100">2018/2019</NavigationMenuLink>
                                </NavigationMenuContent>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                                    <NavigationMenuViewport/>
                </NavigationMenu>
            </div>
        </header>
    )
}

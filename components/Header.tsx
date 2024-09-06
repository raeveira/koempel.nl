'use client'

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import axios from 'axios';
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
} from "@/components/ui/navigation-menu";

export default function Header() {
    const [galleryYears, setGalleryYears] = useState<any[]>([]);
    const [selectedYear, setSelectedYear] = useState<any | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchGalleryYears() {
            try {
                const response = await axios.get('/api/folders');
                console.log("response : ", response)
                if (response.data) {
                    setGalleryYears(response.data);
                } else {
                    setError('No folders found');
                }
            } catch (error) {
                console.error('Error fetching gallery years:', error);
                setError('Failed to fetch gallery data');
            }
        }
        fetchGalleryYears();
    }, []);

    useEffect(() => {
        console.log("selectedYear : ", selectedYear)

    }, [selectedYear])

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
                            <NavigationMenuTrigger className="hover:underline">Foto&apos;s</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                {error ? (
                                    <span className="block px-4 py-2 text-red-500">{error}</span>
                                ) : galleryYears.length > 0 ? (
                                    galleryYears.map((year: any, index: number) => (
                                        <NavigationMenuLink
                                            href={`/fotos/${year.order}`}
                                            key={index}
                                            className="block px-4 py-2 hover:bg-gray-100"
                                            onClick={() => setSelectedYear(year)}
                                        >
                                            {year.folder}
                                        </NavigationMenuLink>
                                    ))
                                ) : (
                                    <span className="block px-4 py-2">Loading...</span>
                                )}
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink href="/audio" className="hover:underline">Audio</NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink href="/overige" className="hover:underline">Overige</NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger className="flex items-center space-x-3 pl-0 ml-0 relative">
                                <span className={"hover:underline" + navigationMenuTriggerStyle()}>Transfers</span>
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
                    <NavigationMenuIndicator />
                    <NavigationMenuViewport />
                </NavigationMenu>
            </div>
        </header>
    );
}

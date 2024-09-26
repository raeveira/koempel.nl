'use client';

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import axios from 'axios';
import { AlignJustify } from 'lucide-react';  // Import the icon
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuTrigger
} from "@/components/ui/navigation-menu";

export default function Header() {
    const [galleryYears, setGalleryYears] = useState<any[]>([]);
    const [selectedYear, setSelectedYear] = useState<any | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State to control mobile menu

    useEffect(() => {
        async function fetchGalleryYears() {
            try {
                const response = await axios.get('/api/folders');
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

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header className="bg-[#FFCC00] text-black h-[110px]">
            <div className="container mx-auto px-4 py-6 flex justify-between items-center">
                <Link href="/">
                    <div className="flex items-center space-x-2 cursor-pointer">
                        <Image src="/koempellogo_nieuw.gif" alt="FC Roda Logo" width={50} height={50} className="rounded-full" />
                        <span className="text-2xl font-bold">Koempel</span>
                    </div>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:block">
                    <NavigationMenu>
                        <NavigationMenuList className="flex space-x-4">
                            <NavigationMenuItem>
                                <NavigationMenuLink href="/" className="hover:underline">Home</NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="hover:underline text-base">Foto&apos;s</NavigationMenuTrigger>
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
                                <NavigationMenuLink href="/football-standings" className="hover:underline">Stand</NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="flex items-center space-x-3 pl-0 ml-0 relative">
                                    <span className={"hover:underline text-base"}>Transfers</span>
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                <NavigationMenuLink href="/transfers/2022-2023" className="block px-4 py-2 hover:bg-gray-100">2022/2023</NavigationMenuLink>
                                <NavigationMenuLink href="/transfers/2021-2022" className="block px-4 py-2 hover:bg-gray-100">2021/2022</NavigationMenuLink>
                                <NavigationMenuLink href="/transfers/2020-2021" className="block px-4 py-2 hover:bg-gray-100">2020/2021</NavigationMenuLink>
                                <NavigationMenuLink href="/transfers/2019-2020" className="block px-4 py-2 hover:bg-gray-100">2019/2020</NavigationMenuLink>
                                <NavigationMenuLink href="/transfers/2018-2019" className="block px-4 py-2 hover:bg-gray-100">2018/2019</NavigationMenuLink>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                {/* Mobile Menu Trigger */}
                <div className="md:hidden">
                    <button onClick={toggleMobileMenu} className="text-black">
                        <AlignJustify size={32} />
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-[#FFCC00] text-black z-10 relative">
                    <nav className="flex flex-col items-start px-4 py-2 space-y-2">
                        <Link href="/" className="hover:underline" onClick={toggleMobileMenu}>Home</Link>
                        <div>
                            <span className="font-bold">Foto&apos;s</span>
                            <div className="pl-4">
                                {error ? (
                                    <span className="text-red-500">{error}</span>
                                ) : galleryYears.length > 0 ? (
                                    galleryYears.map((year: any, index: number) => (
                                        <Link
                                            href={`/fotos/${year.order}`}
                                            key={index}
                                            className="block hover:underline"
                                            onClick={toggleMobileMenu}
                                        >
                                            {year.folder}
                                        </Link>
                                    ))
                                ) : (
                                    <span>Loading...</span>
                                )}
                            </div>
                        </div>
                        <Link href="/audio" className="hover:underline" onClick={toggleMobileMenu}>Audio</Link>
                        <Link href="/overige" className="hover:underline" onClick={toggleMobileMenu}>Overige</Link>
                        <div>
                            <span className="font-bold">Transfers</span>
                            <div className="pl-4">
                                <Link href="/transfers/2023-2024" className="block px-4 py-2 hover:underline" onClick={toggleMobileMenu}>2023/2024</Link>
                                <Link href="/transfers/2022-2023" className="block px-4 py-2 hover:underline" onClick={toggleMobileMenu}>2022/2023</Link>
                                <Link href="/transfers/2021-2022" className="block px-4 py-2 hover:underline" onClick={toggleMobileMenu}>2021/2022</Link>
                                <Link href="/transfers/2020-2021" className="block px-4 py-2 hover:underline" onClick={toggleMobileMenu}>2020/2021</Link>
                                <Link href="/transfers/2019-2020" className="block px-4 py-2 hover:underline" onClick={toggleMobileMenu}>2019/2020</Link>
                                <Link href="/transfers/2018-2019" className="block px-4 py-2 hover:underline" onClick={toggleMobileMenu}>2018/2019</Link>
                            </div>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
}

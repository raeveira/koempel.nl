import { Facebook, Instagram, Twitter } from "lucide-react"
import Link from "next/link"

export default function Footer() {
    return (
        <footer className="bg-[#FFCC00] text-black py-6">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-start">
                    <div className="mb-4 md:mb-0">
                        <p>&copy; 2024 FC Roda Fan Page. All rights reserved.</p>
                    </div>
                    <div className="space-y-2 md:space-y-4">
                        <h6 className="font-bold text-lg">Contact</h6>
                        <Link href="mailto:koempel@koempel.nl" className="hover:underline">
                            koempel@koempel.nl
                        </Link>
                    </div>
                    <nav>
                    <div className="text-center mb-4">
                        <h6 className="font-bold text-lg">Links</h6>
                    </div>
                    <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <li><Link href="/fotos" className="hover:underline">Foto's</Link></li>
                        <li><Link href="/audio" className="hover:underline">Audio</Link></li>
                        <li><Link href="/overige" className="hover:underline">Overige</Link></li>
                        <li><Link href="/verslagen" className="hover:underline">Verslagen</Link></li>
                        <li><Link href="/interactief" className="hover:underline">Interactief</Link></li>
                        <li><Link href="/links" className="hover:underline">Links</Link></li>
                    </ul>
                </nav>
                </div>
            </div>
        </footer>
    )
}
'use client'
import FolderList, { FolderData } from "@/components/FolderList";
import axios from "axios";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function PhotoPage() {
  const pathname = usePathname();

  const [foldersData, setFoldersData] = useState<FolderData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchGalleryYears() {
      try {
        const response = await axios.get('/api/folders');
        console.log("response : ", response)
        if (response.data) {
          response.data.map((folder: FolderData) => {
            
            if (`/fotos/${folder.order}` == pathname) { 
              console.log("PATHNAME", pathname)
            console.log("folder : ", folder)
            console.log("PATH", `/fotos/${folder.order}`)
              setFoldersData(folder.subfolders);
              
            }
          })
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

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Foto Galerij</h1>
          <FolderList foldersData={foldersData} />
        </div>
      </main>
    </div>
  );
}

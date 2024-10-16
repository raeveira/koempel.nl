'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ImageModal } from '@/components/ImagesModal'
import { ChevronsLeft } from 'lucide-react'
import LazyLoad from 'react-lazyload'

interface ImageComment {
  src: string
  description: string
}

interface SubfolderData {
  folder: string
  folderPath: string
  subfolders: SubfolderData[]
  images: { src: string; comments: ImageComment[] }[]
  home?: string
  out?: string
  order?: number
}

export interface FolderData extends SubfolderData {}

interface FolderListProps {
  foldersData: FolderData[]
}

export default function FolderList({ foldersData }: FolderListProps) {
  const [currentFolder, setCurrentFolder] = useState<FolderData | null>(null)
  const [previousFolder, setPreviousFolder] = useState<FolderData | null>(null)
  const [selectedImage, setSelectedImage] = useState<{ src: string; comments: ImageComment[] } | null>(null)
  const [visibleFolders, setVisibleFolders] = useState<FolderData[]>([])
  const [page, setPage] = useState(1)
  const itemsPerPage = 10

  useEffect(() => {
    const loadMoreFolders = () => {
      const newVisibleFolders = foldersData.slice(0, page * itemsPerPage)
      setVisibleFolders(newVisibleFolders)
    }

    loadMoreFolders()
  }, [page, foldersData])

  const handleFolderClick = (folder: FolderData) => {
    setPreviousFolder(currentFolder)
    setCurrentFolder(folder)
  }

  const handleBackClick = () => {
    setCurrentFolder(previousFolder)
    setPreviousFolder(null)
  }

  const handleImageClick = (image: { src: string; comments: ImageComment[] }) => {
    setSelectedImage(image)
  }

  const handleModalClose = () => {
    setSelectedImage(null)
  }

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return
    setPage(prevPage => prevPage + 1)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const renderFolders = (folders: FolderData[]) => (
      <div className="flex flex-col gap-2 max-h-[calc(100svh-500px)] sm:max-h-[calc(100svh-500px)] overflow-y-auto overflow-x-hidden p-3 rounded-sm">
        {folders.length > 0 ? (
            folders.map((folder) => (
                <div key={folder.folderPath} className="border p-4 h-max rounded-md cursor-pointer" onClick={() => handleFolderClick(folder)}>
                  <h3 className="text-lg font-semibold mb-2">
                    {folder.folder} <br />
                  </h3>
                  {folder.subfolders.length > 0 && (
                      <p className="text-zinc-500">
                        {folder.subfolders.length} subfolders
                      </p>
                  )}
                  {folder.images.length > 0 && (
                      <p className="text-zinc-500">
                        {folder.images.length} images
                      </p>
                  )}
                </div>
            ))
        ) : (
            <p>Geen mappen beschikbaar of aan het laden...</p>
        )}
      </div>
  )

  return (
      <div className={`p-4 ${currentFolder?.images.length ?? 0 > 0 ? "space-y-4" : ""}`}>
        {currentFolder ? (
            <>
              <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4">
                <Button
                    onClick={handleBackClick}
                    variant="link"
                    className="text-xl hover:underline mb-2 sm:mb-0"
                >
                  <ChevronsLeft />
                  Terug naar vorige
                </Button>
                <h2 className="text-xl font-bold sm:text-right sm:flex-1">
                  Afbeeldingen binnen {currentFolder.folder}
                </h2>
              </div>

              {currentFolder.subfolders.length > 0 && (
                  <div className="mb-4">{renderFolders(currentFolder.subfolders)}</div>
              )}

              <div>
                <div className="flex flex-col sm:flex-row flex-wrap gap-2 max-h-[calc(100svh-200px)] sm:max-h-[calc(100svh-300px)] overflow-y-auto overflow-x-hidden">
                  {currentFolder.images.length > 0 ? (
                      currentFolder.images.map((image, index) => (
                          <LazyLoad key={index} height={200} offset={100}>
                            <div
                                className="relative group cursor-pointer overflow-hidden rounded-md shadow-md transition-transform duration-200 ease-in-out hover:scale-105 aspect-square"
                                onClick={() => handleImageClick(image)}
                            >
                              <img
                                  src={image.src}
                                  alt={image.comments.map(comment => comment.description).join(', ')}
                                  className="w-full h-full object-cover"
                              />
                              {image.comments && image.comments.length > 0 && (
                                  <div
                                      className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end">
                                    <div className="p-4 text-white w-full">
                                      {image.comments.map((comment, idx) => (
                                          <p key={idx} className="text-sm mb-1 line-clamp-2">
                                            {comment.description}
                                          </p>
                                      ))}
                                    </div>
                                  </div>
                              )}
                            </div>
                          </LazyLoad>
                      ))
                  ) : (
                      <p>Geen afbeeldingen beschikbaar of aan het laden...</p>
                  )}
                </div>
              </div>

              {selectedImage && (
                  <ImageModal
                      imageSrc={selectedImage.src}
                      comments={selectedImage.comments}
                      onClose={handleModalClose}
                  />
              )}
            </>
        ) : (
            renderFolders(visibleFolders)
        )}
      </div>
  )
}
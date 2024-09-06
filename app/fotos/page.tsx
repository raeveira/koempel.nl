import FolderList from "@/components/FolderList";

export default function photoPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Foto Galerij</h1>
          <FolderList />
        </div>
      </main>
    </div>
  );
}

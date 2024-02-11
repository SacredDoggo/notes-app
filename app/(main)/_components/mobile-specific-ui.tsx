import { Image } from "lucide-react";
import { useParams } from "next/navigation";

import { useImageDropzone } from "@/hooks/use-image-dropzone";

import { Item } from "./item";

export const MobileSpecificUI = () => {
  const params = useParams();
  const imageDropzone = useImageDropzone();

  if (!params.documentId) {
    return;
  }

  const handleAddCover = () => {
    imageDropzone.onOpen();
  }

  return (
    <div className="py-2">
      <Item icon={Image} title="Add Cover" />
    </div>
  );
}
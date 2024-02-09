"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "./ui/button";
import { ImageIcon, X } from "lucide-react";
import { useImageDropzone } from "@/hooks/use-image-dropzone";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { useState } from "react";
import { useEdgeStore } from "@/lib/edgestore";

interface CoverImageProps {
  url?: string;
}

export const CoverImage = ({ url }: CoverImageProps) => {
  const removeCoverImage = useMutation(api.documents.removeCoverImage);
  const params = useParams();
  const imageDropzone = useImageDropzone();

  const { edgestore } = useEdgeStore();

  const [alterating, setAlterating] = useState(false);

  const handleReplaceCover = () => {
    imageDropzone.onReplace(url);
  }

  const handleRemoveCoverImage = async () => {
    if (!url) return;
    setAlterating(true);
    await edgestore.publicFiles.delete({
      url: url,
    });
    await removeCoverImage({
      id: params.documentId as Id<"documents">,
    });
    setAlterating(false);
  }

  return (
    <div className={cn(
      "relative w-full h-[35vh] group",
      !url && "h-0",
      url && "bg-muted"
    )}>
      {!!url && (
        <Image
          src={url}
          fill
          alt="Cover Image"
          className={cn(
            "object-cover",
            alterating && "opacity-75"
          )}
        />
      )}
      {!!url && !alterating && (
        <div className="opacity-0 group-hover:opacity-100 flex items-center absolute right-5 bottom-5 transition gap-x-2">
          <Button
            variant="outline"
            size="sm"
            className="text-xs text-muted-foreground"
            onClick={handleReplaceCover}
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            Change cover
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-xs text-muted-foreground"
            onClick={handleRemoveCoverImage}
          >
            <X className="h-4 w-4 mr-2" />
            Remove
          </Button>
        </div>
      )}
    </div>
  );
}
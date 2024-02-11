"use client";

import { useRouter } from "next/navigation";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { toast } from "sonner";
import { useMediaQuery } from "usehooks-ts";
import { ImageIcon, MoreHorizontal, Trash, X } from "lucide-react";

import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import { useEdgeStore } from "@/lib/edgestore";

import { useImageDropzone } from "@/hooks/use-image-dropzone";
import { useIconPicker } from "@/hooks/use-icon-picker-mobile";

interface NavMenuProps {
  documentId: Id<"documents">;
  coverImageUrl?: string;
  icon?: string;
}

export const NavMenu = ({ documentId, coverImageUrl, icon }: NavMenuProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const router = useRouter();
  const { user } = useUser();

  const { edgestore } = useEdgeStore();

  const archive = useMutation(api.documents.archive);
  const removeCoverImage = useMutation(api.documents.removeCoverImage);
  const update = useMutation(api.documents.update);
  const removeIcon = useMutation(api.documents.removeIcon);

  const imageDropzone = useImageDropzone();
  const iconPicker = useIconPicker();

  const onArchive = () => {
    const promise = archive({ id: documentId });

    toast.promise(promise, {
      loading: "Moving to trash...",
      success: "Note moved to trash!",
      error: "Failed to archive note."
    });

    router.push("/documents");
  };

  const handleCoverImageChange = () => {
    imageDropzone.onReplace(coverImageUrl);
  };

  const handleAddCoverImage = () => {
    imageDropzone.onOpen();
  };

  const handleRemoveCoverImage = () => {
    if (coverImageUrl) {
      edgestore.publicFiles.delete({
        url: coverImageUrl
      })
      removeCoverImage({
        id: documentId
      });
    }
  };

  const handleIconChange = () => {
    iconPicker.onOpen();
  };

  const handleRemoveIcon = () => {
    removeIcon({
      id: documentId,
    });
  };


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="sm"
          variant="ghost"
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-60"
        align="end"
        alignOffset={8}
        forceMount
      >
        <DropdownMenuItem onClick={onArchive}>
          <Trash className="h-4 w-4 mr-2 " />
          Delete
        </DropdownMenuItem>
        {isMobile && (
          <>
            <DropdownMenuSeparator />
            {coverImageUrl ? (
              <>
                <DropdownMenuItem onClick={handleCoverImageChange}>
                  <ImageIcon className="h-4 w-4 mr-2" />
                  Change Cover
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleRemoveCoverImage}>
                  <X className="h-4 w-4 mr-2" />
                  Remove Cover
                </DropdownMenuItem>
              </>
            ) : (
              <DropdownMenuItem onClick={handleAddCoverImage}>
                <ImageIcon className="h-4 w-4 mr-2" />
                Add Cover
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            {icon ? (
              <>
                <DropdownMenuItem onClick={handleIconChange}>
                    <ImageIcon className="h-4 w-4 mr-2" />
                    Change Icon
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleRemoveIcon}>
                  <X className="h-4 w-4 mr-2" />
                  Remove Icon
                </DropdownMenuItem>
              </>
            ) : (
              <DropdownMenuItem onClick={handleIconChange}>
                <ImageIcon className="h-4 w-4 mr-2" />
                Add Icon
              </DropdownMenuItem>
            )}
          </>
        )}
        <DropdownMenuSeparator />
        <div className="text-xs text-muted-foreground p-2">
          Last edited by: {user?.fullName}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};


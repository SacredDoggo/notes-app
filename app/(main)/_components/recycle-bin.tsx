"use client";

import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { useMediaQuery } from "usehooks-ts";

import { File, FileX, Search, Trash, Undo } from "lucide-react";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";

import { Item } from "./item";

import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Spinner } from "@/components/spinner";
import { CoverImage } from "@/components/cover-image";
import { useEdgeStore } from "@/lib/edgestore";

export const RecycleBin = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const params = useParams();
  const router = useRouter();
  const deletedDocuments = useQuery(api.documents.getUserDeletedDocuments);
  const remove = useMutation(api.documents.remove);
  const restore = useMutation(api.documents.restore);
  const { edgestore } = useEdgeStore();

  const [searchVal, setSearchVal] = useState<string>("");

  const filteredSearchDocuments = deletedDocuments?.filter((document) => {
    return document.title.toLowerCase().includes(searchVal.trim().toLowerCase());
  })


  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, id: string) => {
    router.push(`/documents/${id}`);
  }

  const handleRestore = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, id: Id<"documents">) => {
    event?.stopPropagation();

    const promise = restore({ id: id });

    toast.promise(promise, {
      loading: "Restoring note...",
      success: "Note restored!",
      error: "Failed to restore note."
    });
  };

  const handleRemove = (id: Id<"documents">, coverImageUrl?: string) => {
    if (params.documentId === id) router.push("/documents/");

    if (coverImageUrl) edgestore.publicFiles.delete({
      url: coverImageUrl,
    });

    const promise = remove({ id: id });

    toast.promise(promise, {
      loading: "Deleting note...",
      success: "Note deleted!",
      error: "Failed to delete note."
    });
  };

  if (deletedDocuments === undefined) {
    return (
      <div className="flex items-center justify-center w-full">
        <Spinner />
      </div>
    )
  }

  return (
    <div className="my-2 w-full">
      <Popover>
        <PopoverTrigger className="w-full">
          <Item icon={Trash} title="Recycle bin" />
        </PopoverTrigger>
        <PopoverContent
          className="w-72 p-0"
          side={isMobile ? "bottom" : "right"}
        >
          <div className="w-full p-2">
            <div className="flex gap-x-1 items-center">
              <Search className="h-4 w-4" />
              <Input
                className="h-7 text-sm focus-visible:ring-transparent bg-secondary"
                placeholder="Filter by note title..."
                onChange={(e) => setSearchVal(e.target.value)}
                value={searchVal}
              />
            </div>
            <div className="flex flex-col mt-3">
              <span className="hidden last:block text-xs text-center text-muted-foreground">No notes found.</span>
              {filteredSearchDocuments?.map((document) => (
                <div
                  key={document._id}
                  className="flex items-center hover:bg-primary/5 rounded-sm h-7 pl-2"
                  role="button"
                  onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => handleClick(event, document._id as string)}
                >
                  <File className="h-[18px] text-muted-foreground mr-2 shrink-0" />
                  <span className={cn(
                    "text-sm w-full truncate",
                    params.documentId !== document._id && "text-muted-foreground"
                  )}>
                    {document.title}
                  </span>
                  <div className="flex  justify-end">
                    <div
                      className="hover:bg-neutral-300 dark:hover:bg-neutral-600 p-1 m-1 rounded-sm"
                      role="button"
                      onClick={(event) => handleRestore(event, document._id)}
                    >
                      <Undo className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <ConfirmModal onConfirm={() => handleRemove(document._id, document.coverImage)}>
                      <div
                        className="hover:bg-neutral-300 dark:hover:bg-neutral-600 p-1 m-1 rounded-sm"
                        role="button"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FileX className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </ConfirmModal>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
"use client";

import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { useMutation, useQuery } from "convex/react";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

import { File } from "lucide-react";

import { Item } from "./item";

export const DocumentList = () => {
  const params = useParams();
  const router = useRouter();
  const documents = useQuery(api.documents.getUserDocuments);
  const create = useMutation(api.documents.create);
  const archive = useMutation(api.documents.archive);

  const handleClick = (id: string) => {
    router.push(`/documents/${id}`);
  }

  const handleArchive = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, id: Id<"documents">) => {
    event?.stopPropagation();

    const promise = archive({ id: id });

    toast.promise(promise, {
      loading: "Deleting note...",
      success: "Note deleted!",
      error: "Failed to delete note."
    });
  };

  return (
    <div className="flex flex-col mt-4">
      {documents?.map((document) => (
        <Item
          key={document._id}
          active={params.documentId === document._id}
          document={true}
          icon={File}
          title={document.title}
          onClick={() => handleClick(document._id as string)}
          onArchive={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => handleArchive(event, document._id)}
        />
      ))}

    </div>
  );
}